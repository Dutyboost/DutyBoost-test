import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { email, full_name, dashboardPath } = await req.json();

    if (!email || !full_name) {
      return Response.json({ error: 'Missing email or full_name' }, { status: 400 });
    }

    const appUrl = 'https://dutyboost.base44.app';
    const magicLinkUrl = `${appUrl}${dashboardPath || '/dashboard'}`;

    const emailBody = `<div style="font-family: Inter, sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a2e;"><div style="padding: 32px 0 16px;"><span style="font-size: 24px; font-weight: 800; color: #1a1a2e;">Duty</span><span style="font-size: 24px; font-weight: 800; color: #6c5ce7;">Boost</span></div><h1 style="font-size: 22px; font-weight: 700; margin-bottom: 8px;">Hi ${full_name},</h1><p style="color: #666; line-height: 1.6;">Your DutyBoost account has been approved! Click the link below to access your dashboard.</p><div style="background: #f8f7ff; border-radius: 12px; padding: 20px; margin: 24px 0;"><a href="${magicLinkUrl}" style="display: inline-block; background: #6c5ce7; color: white; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-weight: 600; font-size: 15px;">Access Your Dashboard →</a></div><p style="color: #888; font-size: 14px; margin-top: 16px;">Or copy this link: <a href="${magicLinkUrl}" style="color: #6c5ce7; word-break: break-all;">${magicLinkUrl}</a></p><p style="color: #888; font-size: 14px;">Need help? <a href="mailto:hello@dutyboost.com" style="color: #6c5ce7;">hello@dutyboost.com</a></p><hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" /><p style="color: #bbb; font-size: 12px;">© 2026 DutyBoost B.V. All rights reserved.</p></div>`;

    await base44.integrations.Core.SendEmail({
      to: email,
      subject: 'Your DutyBoost Account is Ready — Access Now',
      body: emailBody
    });

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});