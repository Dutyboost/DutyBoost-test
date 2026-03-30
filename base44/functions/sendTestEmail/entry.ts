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
        subject: 'DutyBoost Test Email',
        html: `
          <div style="font-family: Inter, sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a2e;">
            <div style="padding: 32px 0 16px;">
              <span style="font-size: 24px; font-weight: 800; color: #1a1a2e;">Duty</span><span style="font-size: 24px; font-weight: 800; color: #6c5ce7;">Boost</span>
            </div>
            <h1 style="font-size: 22px; font-weight: 700; margin-bottom: 8px;">Test Email</h1>
            <p style="color: #666; line-height: 1.6;">
              This is a test email from DutyBoost. If you're receiving this, the email system is working correctly.
            </p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
            <p style="color: #bbb; font-size: 12px;">© 2026 DutyBoost B.V. All rights reserved.</p>
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