/**
 * autoApproveApplication — triggered by entity automation on SignupApplication create
 *
 * Automatically approves applications that have all required fields and accepted terms.
 * Applications missing KVK, VAT, or bank details are left as "pending" for admin review.
 */

import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const payload = await req.json();

    // Only handle create events
    if (payload.event?.type !== 'create') {
      return Response.json({ skipped: true, reason: 'Not a create event' });
    }

    const app = payload.data;
    if (!app) return Response.json({ skipped: true, reason: 'No data' });

    // Auto-approve only if all required fields are present and terms accepted
    const isComplete =
      app.full_name &&
      app.email &&
      app.company &&
      app.business_type &&
      app.kvk &&
      app.vat &&
      app.bank_iban &&
      app.bank_account_name &&
      app.terms_accepted === true;

    if (!isComplete) {
      console.log(`Application ${app.id} from ${app.email} left as pending — incomplete data.`);
      return Response.json({ approved: false, reason: 'Incomplete application — left for admin review' });
    }

    // Mark as invited
    await base44.asServiceRole.entities.SignupApplication.update(app.id, { status: 'invited' });

    // Create retailer record for Airport Retailers
    if (app.business_type === 'Airport Retailer' && app.airport) {
      const existing = await base44.asServiceRole.entities.Retailer.filter({ owner_email: app.email });
      if (existing.length === 0) {
        await base44.asServiceRole.entities.Retailer.create({
          store_name: app.company,
          airport: app.airport,
          category: app.store_category || 'Retail',
          description: `${app.company} at ${app.airport}`,
          owner_email: app.email,
        });
      }
    }

    // Invite user to platform
    await base44.users.inviteUser(app.email, 'user');

    // Set correct role
    try {
      const userRole = app.business_type === 'Travel Agency' ? 'agency' : 'retailer';
      const existingUsers = await base44.asServiceRole.entities.User.filter({ email: app.email });
      if (existingUsers.length > 0) {
        await base44.asServiceRole.entities.User.update(existingUsers[0].id, { role: userRole });
      }
    } catch (e) {
      console.log('Role update error:', e.message);
    }

    // Send welcome email via Postmark
    const postmarkToken = Deno.env.get('PostMark');
    const businessTypeLabel = app.business_type === 'Travel Agency' ? 'agency' : 'retailer';
    const dashboardUrl = app.business_type === 'Travel Agency'
      ? 'https://dutyboost.com/agency-portal'
      : 'https://dutyboost.com/retailer-portal';

    await fetch('https://api.postmarkapp.com/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Postmark-Server-Token': postmarkToken,
      },
      body: JSON.stringify({
        From: 'hello@dutyboost.com',
        To: app.email,
        Subject: `Welcome to DutyBoost — Your ${businessTypeLabel} account is ready`,
        HtmlBody: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1e40af;">Welcome to DutyBoost, ${app.full_name}!</h2>
            <p>Your application for <strong>${app.company}</strong> has been approved.</p>
            <p>You'll receive a separate email with your login link shortly. Once logged in, your ${businessTypeLabel} dashboard will be ready to use.</p>
            <p style="margin-top: 24px;">
              <a href="${dashboardUrl}" style="background: #1e40af; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">Go to Dashboard</a>
            </p>
            <p style="color: #6b7280; margin-top: 32px;">If you have any questions, reply to this email.</p>
            <p style="color: #6b7280;">— The DutyBoost Team</p>
          </div>
        `,
        MessageStream: 'outbound',
      }),
    });

    console.log(`Auto-approved application for ${app.email} (${app.business_type})`);
    return Response.json({ approved: true, email: app.email, business_type: app.business_type });

  } catch (error) {
    console.error('autoApproveApplication error:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});