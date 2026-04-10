import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { email, full_name, dashboardPath, reInvite } = await req.json();

    if (!email || !full_name) {
      return Response.json({ error: 'Missing email or full_name' }, { status: 400 });
    }

    // Re-send the platform invite (sends a real magic link from Base44)
    if (reInvite) {
      try {
        await base44.users.inviteUser(email, 'user');
        console.log(`Re-invited user ${email} via platform invite`);
      } catch (inviteErr) {
        // User may already be registered — that's fine, we'll still send the email below
        console.log(`inviteUser note for ${email}:`, inviteErr.message);
      }
    }

    const appUrl = 'https://dutyboost.base44.app';
    const loginUrl = `${appUrl}${dashboardPath || '/dashboard'}`;

    const postmarkToken = Deno.env.get('PostMark');
    if (!postmarkToken) {
      // Fallback to platform email
      await base44.asServiceRole.integrations.Core.SendEmail({
        to: email,
        subject: 'Your DutyBoost Account is Ready — Access Now',
        body: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e40af;">Hi ${full_name},</h2>
          <p>Your DutyBoost account is approved and ready.</p>
          <p style="margin-top: 24px;">
            <a href="${loginUrl}" style="background: #1e40af; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">Access Your Dashboard</a>
          </p>
          <p style="color: #6b7280; margin-top: 16px;">Or copy this link: <a href="${loginUrl}">${loginUrl}</a></p>
          <p style="color: #6b7280; margin-top: 32px;">— The DutyBoost Team</p>
        </div>`
      });
      return Response.json({ success: true, method: 'platform_email' });
    }

    // Send via Postmark
    const response = await fetch('https://api.postmarkapp.com/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Postmark-Server-Token': postmarkToken,
      },
      body: JSON.stringify({
        From: 'hello@dutyboost.com',
        To: email,
        Subject: 'Your DutyBoost Account is Ready — Access Now',
        HtmlBody: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e40af;">Hi ${full_name},</h2>
          <p>Your DutyBoost account is approved and ready to use.</p>
          <p>Click below to access your dashboard. You will be asked to verify your email on first login.</p>
          <p style="margin-top: 24px;">
            <a href="${loginUrl}" style="background: #1e40af; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">Access Your Dashboard →</a>
          </p>
          <p style="color: #6b7280; margin-top: 16px; font-size: 14px;">Or copy this link: <a href="${loginUrl}" style="color: #1e40af;">${loginUrl}</a></p>
          <p style="color: #6b7280; margin-top: 32px; font-size: 14px;">Questions? Reply to this email or contact <a href="mailto:hello@dutyboost.com">hello@dutyboost.com</a></p>
          <p style="color: #6b7280; font-size: 14px;">— The DutyBoost Team</p>
        </div>`,
        MessageStream: 'outbound',
      }),
    });

    const result = await response.json();
    if (!response.ok) {
      console.error('Postmark error:', JSON.stringify(result));
      return Response.json({ error: 'Email delivery failed', details: result }, { status: 500 });
    }

    console.log(`Magic link sent to ${email} (Postmark MessageID: ${result.MessageID})`);
    return Response.json({ success: true, messageId: result.MessageID });

  } catch (error) {
    console.error('sendMagicLink error:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});