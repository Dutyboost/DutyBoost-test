import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { email, fullName, company, businessType, website, kvk, vat, bookingSystem, airport, storeCategory } = await req.json();

    if (!email) {
      return Response.json({ error: 'Email is required' }, { status: 400 });
    }

    // Send welcome email to the applicant
    await base44.asServiceRole.integrations.Core.SendEmail({
      to: email,
      from_name: "DutyBoost",
      subject: "Welcome to DutyBoost — We've received your application",
      body: `
        <div style="font-family: Inter, sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a2e;">
          <div style="padding: 32px 0 16px;">
            <h2 style="font-size: 24px; font-weight: 700; margin: 0 0 8px;">Hi ${fullName || 'there'},</h2>
            <p style="color: #555; line-height: 1.6;">Thank you for applying to join <strong>DutyBoost</strong> as a <strong>${businessType}</strong>.</p>
          </div>

          <div style="background: #f5f4ff; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
            <p style="font-weight: 600; margin: 0 0 8px;">What happens next?</p>
            <ol style="color: #555; line-height: 1.8; padding-left: 20px; margin: 0;">
              <li>Our team will review your application within <strong>1 business day</strong>.</li>
              <li>We will send you a <strong>platform invite</strong> to activate your account.</li>
              <li>Once activated, your DutyBoost integration will be fully set up — no technical work needed on your end.</li>
            </ol>
          </div>

          <p style="color: #555; line-height: 1.6;">In the meantime, feel free to reach out to us at <a href="mailto:hello@dutyboost.com" style="color: #5b4fcf;">hello@dutyboost.com</a> if you have any questions.</p>

          <p style="color: #555; margin-top: 24px;">See you at the gate,<br/><strong>The DutyBoost Team</strong></p>
        </div>
      `
    });

    // Notify DutyBoost internal team
    await base44.asServiceRole.integrations.Core.SendEmail({
      to: "hello@dutyboost.com",
      from_name: "DutyBoost Signups",
      subject: `New ${businessType} application: ${company || email}`,
      body: `
        <h3>New signup received</h3>
        <ul>
          <li><strong>Name:</strong> ${fullName}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Company:</strong> ${company}</li>
          <li><strong>Business Type:</strong> ${businessType}</li>
          ${website ? `<li><strong>Website:</strong> ${website}</li>` : ''}
          ${kvk ? `<li><strong>KVK:</strong> ${kvk}</li>` : ''}
          ${vat ? `<li><strong>VAT:</strong> ${vat}</li>` : ''}
          ${bookingSystem ? `<li><strong>Booking System:</strong> ${bookingSystem}</li>` : ''}
          ${airport ? `<li><strong>Airport:</strong> ${airport}</li>` : ''}
          ${storeCategory ? `<li><strong>Store Category:</strong> ${storeCategory}</li>` : ''}
        </ul>
        <p>Please send a platform invite to: <strong>${email}</strong></p>
      `
    });

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});