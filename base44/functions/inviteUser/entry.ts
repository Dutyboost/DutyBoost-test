import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { email, fullName, company, businessType, website, kvk, vat, bookingSystem, airport, storeCategory } = await req.json();

    if (!email || !fullName || !company || !businessType) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Save application to database
    await base44.asServiceRole.entities.SignupApplication.create({
      full_name: fullName,
      email,
      company,
      business_type: businessType,
      website: website || null,
      kvk: kvk || null,
      vat: vat || null,
      booking_system: bookingSystem || null,
      airport: airport || null,
      store_category: storeCategory || null,
      status: 'pending'
    });

    // Send confirmation email to applicant
    await base44.asServiceRole.integrations.Core.SendEmail({
      to: email,
      from_name: "DutyBoost",
      subject: "We've received your DutyBoost application!",
      body: `
        <div style="font-family: Inter, sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a2e;">
          <div style="padding: 32px 0 16px;">
            <span style="font-size: 24px; font-weight: 800; color: #1a1a2e;">Duty</span><span style="font-size: 24px; font-weight: 800; color: #6c5ce7;">Boost</span>
          </div>
          <h1 style="font-size: 22px; font-weight: 700; margin-bottom: 8px;">Hi ${fullName}, your application is in! ✈️</h1>
          <p style="color: #666; line-height: 1.6; margin-bottom: 16px;">
            Thank you for applying to join DutyBoost as a <strong>${businessType}</strong>. We've received your details and our team will review your application within <strong>1 business day</strong>.
          </p>
          <div style="background: #f8f7ff; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
            <p style="font-weight: 600; margin: 0 0 12px;">What happens next?</p>
            <ol style="margin: 0; padding-left: 20px; color: #555; line-height: 2;">
              <li>Our team reviews your application</li>
              <li>You receive an activation email with your login link</li>
              <li>Click the link — you're in your DutyBoost dashboard instantly</li>
            </ol>
          </div>
          <p style="color: #888; font-size: 14px;">
            Questions? Reach us at <a href="mailto:hello@dutyboost.com" style="color: #6c5ce7;">hello@dutyboost.com</a>
          </p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
          <p style="color: #bbb; font-size: 12px;">© 2026 DutyBoost B.V. All rights reserved.</p>
        </div>
      `
    });

    // Notify DutyBoost team
    await base44.asServiceRole.integrations.Core.SendEmail({
      to: "hello@dutyboost.com",
      from_name: "DutyBoost Platform",
      subject: `New ${businessType} application: ${company}`,
      body: `
        <div style="font-family: Inter, sans-serif; max-width: 560px; margin: 0 auto;">
          <h2>New Partner Application</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px; color: #888;">Type</td><td style="padding: 8px; font-weight: 600;">${businessType}</td></tr>
            <tr><td style="padding: 8px; color: #888;">Name</td><td style="padding: 8px;">${fullName}</td></tr>
            <tr><td style="padding: 8px; color: #888;">Email</td><td style="padding: 8px;">${email}</td></tr>
            <tr><td style="padding: 8px; color: #888;">Company</td><td style="padding: 8px;">${company}</td></tr>
            ${website ? `<tr><td style="padding: 8px; color: #888;">Website</td><td style="padding: 8px;">${website}</td></tr>` : ''}
            ${kvk ? `<tr><td style="padding: 8px; color: #888;">KVK</td><td style="padding: 8px;">${kvk}</td></tr>` : ''}
          </table>
          <p>Log in to the admin panel to approve or reject this application.</p>
        </div>
      `
    });

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});