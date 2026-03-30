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
      from: 'DutyBoost <onboarding@resend.dev>',
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

    const { email, fullName, businessType } = await req.json();

    if (!email || !fullName || !businessType) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const appId = Deno.env.get('BASE44_APP_ID');
    const dashboardPath = businessType === 'Travel Agency' ? '/dashboard' : '/retailer-dashboard';
    const loginUrl = `https://${appId}.base44.app/login?next=${dashboardPath}`;

    await sendEmail({
      to: email,
      subject: `Welcome to DutyBoost — your account is ready! 🎉`,
      html: `
        <div style="font-family: Inter, sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a2e;">
          <div style="padding: 32px 0 16px;">
            <span style="font-size: 24px; font-weight: 800; color: #1a1a2e;">Duty</span><span style="font-size: 24px; font-weight: 800; color: #6c5ce7;">Boost</span>
          </div>
          <h1 style="font-size: 22px; font-weight: 700; margin-bottom: 8px;">Welcome, ${fullName}! 🎉</h1>
          <p style="color: #666; line-height: 1.6; margin-bottom: 16px;">
            Your DutyBoost account has been approved. You're now a registered <strong>${businessType}</strong> on the platform.
          </p>
          <div style="background: #f8f7ff; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
            <p style="font-weight: 600; margin: 0 0 8px;">Access your dashboard:</p>
            <p style="color: #555; margin: 0 0 16px; font-size: 14px;">
              You'll also receive a separate login email from our platform — click the magic link in that email to verify your account. After logging in, you'll land directly in your <strong>${businessType}</strong> dashboard.
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
    });

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});