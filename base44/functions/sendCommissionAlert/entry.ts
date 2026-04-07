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

    const response = await fetch('https://api.postmarkapp.com/email', {
      method: 'POST',
      headers: {
        'X-Postmark-Server-Token': postmarkToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        From: 'hello@dutyboost.com',
        To: agency_email,
        Subject: `You've Earned a Commission - €${amount.toFixed(2)}`,
        HtmlBody: emailBody,
      }),
    });

    const result = await response.json();
    return Response.json({ success: true, emailId: result.id });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});