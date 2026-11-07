import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'DutyBoost <onboarding@resend.dev>',
        to: 'israelmartis@gmail.com',
        subject: 'Welcome to DutyBoost — Access Your Dashboard',
        html: `
          <div style="font-family: Inter, sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a2e;">
            <div style="padding: 32px 0 16px;">
              <span style="font-size: 24px; font-weight: 800; color: #1a1a2e;">Duty</span><span style="font-size: 24px; font-weight: 800; color: #6c5ce7;">Boost</span>
            </div>
            <h1 style="font-size: 22px; font-weight: 700; margin-bottom: 8px;">Access Your Dashboard</h1>
            <p style="color: #666; line-height: 1.6; margin-bottom: 24px;">
              Click the link below to access your DutyBoost dashboard:
            </p>
            <div style="background: #f8f7ff; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
              <a href="https://dutyboost.base44.app/dashboard" style="display: inline-block; background: #6c5ce7; color: white; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-weight: 600; font-size: 15px;">
                Go to Dashboard →
              </a>
            </div>
            <p style="color: #888; font-size: 14px; margin-bottom: 16px;">
              If you didn't request this, please ignore this email.
            </p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
            <p style="color: #bbb; font-size: 12px;">© 2026 DutyBoost All rights reserved.</p>
          </div>
        `
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Resend error: ${err}`);
    }

    return Response.json({ success: true, message: 'Test email sent to israelmartis@gmail.com' });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});