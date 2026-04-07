import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { event, data } = await req.json();

    if (event.type !== 'create') {
      return Response.json({ success: true });
    }

    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    if (!resendApiKey) {
      return Response.json({ error: 'Resend API key not configured' }, { status: 500 });
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

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'hello@dutyboost.com',
        to: email,
        subject: `Welcome to DutyBoost, ${full_name}!`,
        html: emailBody,
      }),
    });

    const result = await response.json();
    return Response.json({ success: true, emailId: result.id });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});