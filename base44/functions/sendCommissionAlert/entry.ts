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

    const { agency_email, amount, month_year } = data;

    const emailBody = `
      <h2>Commission Earned!</h2>
      <p>Great news! You've earned a commission from your bookings.</p>
      <p><strong>Commission Amount:</strong> €${amount.toFixed(2)}</p>
      <p><strong>Period:</strong> ${month_year}</p>
      <p>Log in to your dashboard to view detailed breakdown and payment status.</p>
      <p>Thank you for partnering with DutyBoost!</p>
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
        to: agency_email,
        subject: `You've Earned a Commission - €${amount.toFixed(2)}`,
        html: emailBody,
      }),
    });

    const result = await response.json();
    return Response.json({ success: true, emailId: result.id });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});