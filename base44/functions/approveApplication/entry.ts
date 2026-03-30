import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');

async function sendEmail({ to, subject, html }) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'DutyBoost <hello@dutyboost.com>',
      to,
      subject,
      html,
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Resend error: ${err}`);
  }
  return res.json();
}

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

      await sendEmail({
        to: application.email,
        subject: "Update on your DutyBoost application",
        html: `
          <div style="font-family: Inter, sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a2e;">
            <div style="padding: 32px 0 16px;">
              <span style="font-size: 24px; font-weight: 800; color: #1a1a2e;">Duty</span><span style="font-size: 24px; font-weight: 800; color: #6c5ce7;">Boost</span>
            </div>
            <h1 style="font-size: 22px; font-weight: 700; margin-bottom: 8px;">Hi ${application.full_name},</h1>
            <p style="color: #666; line-height: 1.6;">
              Thank you for your interest in DutyBoost. After reviewing your application, we're unable to proceed at this time.
            </p>
            ${rejectionReason ? `<div style="background: #f8f7ff; border-left: 4px solid #6c5ce7; padding: 16px; margin: 16px 0; border-radius: 4px;">
              <p style="font-weight: 600; margin: 0 0 8px; color: #1a1a2e;">Reason:</p>
              <p style="color: #666; margin: 0; line-height: 1.5;">${rejectionReason}</p>
            </div>` : ''}
            <p style="color: #666; line-height: 1.6;">
              If you have questions or believe this is an error, please reach out at <a href="mailto:hello@dutyboost.com" style="color: #6c5ce7;">hello@dutyboost.com</a>.
            </p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
            <p style="color: #bbb; font-size: 12px;">© 2026 DutyBoost B.V. All rights reserved.</p>
          </div>
        `
      });

      return Response.json({ success: true, action: 'rejected' });
    }

    // Approve: update status first, then invite & send email
    const appId = Deno.env.get('BASE44_APP_ID');
    const userRole = application.business_type === 'Travel Agency' ? 'agency' : 'retailer';
    const dashboardPath = application.business_type === 'Travel Agency' ? '/dashboard' : '/retailer-dashboard';
    const loginUrl = `https://${appId}.base44.app/login?next=${dashboardPath}`;

    // Update status to invited immediately
    await base44.asServiceRole.entities.SignupApplication.update(applicationId, { status: 'invited' });

    // Invite user via Base44 (sends magic link from the platform)
    await base44.users.inviteUser(application.email, userRole);

    // Send our branded welcome email with the dashboard link
    await sendEmail({
      to: application.email,
      subject: `Welcome to DutyBoost — your account is ready! 🎉`,
      html: `
        <div style="font-family: Inter, sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a2e;">
          <div style="padding: 32px 0 16px;">
            <span style="font-size: 24px; font-weight: 800; color: #1a1a2e;">Duty</span><span style="font-size: 24px; font-weight: 800; color: #6c5ce7;">Boost</span>
          </div>
          <h1 style="font-size: 22px; font-weight: 700; margin-bottom: 8px;">Welcome, ${application.full_name}! 🎉</h1>
          <p style="color: #666; line-height: 1.6; margin-bottom: 16px;">
            Your DutyBoost account has been approved. You're now a registered <strong>${application.business_type}</strong> on the platform.
          </p>
          <div style="background: #f8f7ff; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
            <p style="font-weight: 600; margin: 0 0 8px;">Access your dashboard:</p>
            <p style="color: #555; margin: 0 0 16px; font-size: 14px;">
              You'll also receive a separate login email from our platform — click the magic link in that email to verify your account. After logging in, you'll land directly in your <strong>${application.business_type}</strong> dashboard.
            </p>
            <a href="${loginUrl}" style="display: inline-block; background: #6c5ce7; color: white; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-weight: 600; font-size: 15px;">
              Go to My Dashboard →
            </a>
          </div>
          <p style="color: #888; font-size: 14px;">
            Need help? <a href="mailto:hello@dutyboost.com" style="color: #6c5ce7;">hello@dutyboost.com</a>
          </p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
          <p style="color: #bbb; font-size: 12px;">© 2026 DutyBoost B.V. All rights reserved.</p>
        </div>
      `
    }).catch(err => console.error('Email send failed:', err));

    return Response.json({ success: true, action: 'approved' });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});