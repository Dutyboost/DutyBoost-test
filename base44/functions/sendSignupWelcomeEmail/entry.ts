import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { event, data } = await req.json();

    if (event.type !== 'create') {
      return Response.json({ success: true });
    }

    const postmarkToken = Deno.env.get('PostMark');
    if (!postmarkToken) {
      return Response.json({ error: 'Postmark API key not configured' }, { status: 500 });
    }

    const { full_name, email, company, business_type } = data;

    const emailBody = `
      <h2>Welcome to DutyBoost!</h2>
      <p>Hi ${full_name},</p>
      <p>Thank you for signing up ${company} as a ${business_type}. We're excited to have you on board.</p>
      <p>Your account is under review. Our team will contact you shortly to verify your details and get you started.</p>
      <p>In the meantime, check out our <a href="https://dutyboost.com/user-guide">User Guide</a> to learn more.</p>
      <p>Best regards,<br/>The DutyBoost Team</p>
    `;

    const response = await fetch('https://api.postmarkapp.com/email', {
      method: 'POST',
      headers: {
        'X-Postmark-Server-Token': postmarkToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        From: 'hello@dutyboost.com',
        To: email,
        Subject: `Welcome to DutyBoost, ${full_name}!`,
        HtmlBody: emailBody,
      }),
    });

    const result = await response.json();
    if (!response.ok) {
      console.error('Postmark error:', JSON.stringify(result));
      return Response.json({ error: 'Postmark failed', details: result }, { status: 500 });
    }
    return Response.json({ success: true, emailId: result.MessageID });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});