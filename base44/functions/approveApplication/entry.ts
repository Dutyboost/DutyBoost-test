import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    const user = await base44.auth.me();
    if (user?.role !== 'admin') {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { applicationId, action, rejectionReason } = await req.json();

    if (!applicationId || !action) {
      return Response.json({ error: 'Missing applicationId or action' }, { status: 400 });
    }

    const apps = await base44.asServiceRole.entities.SignupApplication.filter({ id: applicationId });
    const application = apps[0];

    if (!application) {
      return Response.json({ error: 'Application not found' }, { status: 404 });
    }

    if (action === 'reject') {
      await base44.asServiceRole.entities.SignupApplication.update(applicationId, { status: 'rejected' });

      const rejectionBody = `<div style="font-family: Inter, sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a2e;"><div style="padding: 32px 0 16px;"><span style="font-size: 24px; font-weight: 800; color: #1a1a2e;">Duty</span><span style="font-size: 24px; font-weight: 800; color: #6c5ce7;">Boost</span></div><h1 style="font-size: 22px; font-weight: 700; margin-bottom: 8px;">Hi ${application.full_name},</h1><p style="color: #666; line-height: 1.6;">Thank you for your interest in DutyBoost. After reviewing your application, we're unable to proceed at this time.</p>${rejectionReason ? `<div style="background: #f8f7ff; border-left: 4px solid #6c5ce7; padding: 16px; margin: 16px 0; border-radius: 4px;"><p style="font-weight: 600; margin: 0 0 8px; color: #1a1a2e;">Reason:</p><p style="color: #666; margin: 0; line-height: 1.5;">${rejectionReason}</p></div>` : ''}<p style="color: #666; line-height: 1.6;">If you have questions or believe this is an error, please reach out at <a href="mailto:hello@dutyboost.com" style="color: #6c5ce7;">hello@dutyboost.com</a>.</p><hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" /><p style="color: #bbb; font-size: 12px;">© 2026 DutyBoost B.V. All rights reserved.</p></div>`;

      await base44.integrations.Core.SendEmail({
        to: application.email,
        subject: "Update on your DutyBoost application",
        body: rejectionBody
      });

      return Response.json({ success: true, action: 'rejected' });
    }

    // Approve: update status first, then invite & send email
    const userRole = application.business_type === 'Travel Agency' ? 'agency' : 'retailer';
    const dashboardPath = application.business_type === 'Travel Agency' ? '/dashboard' : '/retailer-dashboard';

    // Update status to invited immediately
    await base44.asServiceRole.entities.SignupApplication.update(applicationId, { status: 'invited' });

    // Auto-assign Airport Retailer to matching airport
    if (application.business_type === 'Airport Retailer' && application.airport) {
      const airports = await base44.asServiceRole.entities.Airport.filter({ code: application.airport });
      const airport = airports[0];
      
      if (airport) {
        await base44.asServiceRole.entities.Retailer.create({
          store_name: application.company,
          airport: application.airport,
          category: application.store_category || 'Retail',
          description: `${application.company} at ${application.airport}`,
          owner_email: application.email
        });
      }
    }

    // Invite user via Base44 with redirect to their dashboard
    try {
      await base44.users.inviteUser(application.email, userRole, { nextUrl: dashboardPath });
    } catch (inviteErr) {
      // User may already exist, try updating the role
      const existingUsers = await base44.asServiceRole.entities.User.filter({ email: application.email });
      if (existingUsers.length > 0) {
        await base44.asServiceRole.entities.User.update(existingUsers[0].id, { role: userRole });
      } else {
        console.error('InviteUser error:', inviteErr.message);
        throw inviteErr;
      }
    }

    // Send magic link email via Base44 SendEmail
    try {
      await base44.asServiceRole.functions.invoke('sendMagicLink', {
        email: application.email,
        full_name: application.full_name,
        dashboardPath: dashboardPath
      });
    } catch (magicLinkErr) {
      console.error('Magic link email error:', magicLinkErr.message);
    }

    return Response.json({ success: true, action: 'approved' });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});