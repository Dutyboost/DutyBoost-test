import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { event, data } = await req.json();

    if (event.type !== 'update') {
      return Response.json({ success: true });
    }

    const postmarkToken = Deno.env.get('POSTMARK_API_KEY');
    if (!postmarkToken) {
      return Response.json({ error: 'Postmark API key not configured' }, { status: 500 });
    }

    // Only notify on status change to 'redeemed'
    if (data.status !== 'redeemed') {
      return Response.json({ success: true });
    }

    const { voucher_code, airport, discount_percentage, traveler_email } = data;

    const emailBody = `
      <h2>DutyCredit Redeemed Successfully!</h2>
      <p>Great news! Your DutyCredit has been redeemed at ${airport}.</p>
      <p><strong>Voucher Code:</strong> ${voucher_code}</p>
      <p><strong>Discount:</strong> ${discount_percentage}%</p>
      <p>Thank you for using DutyBoost. Enjoy your shopping!</p>
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
        To: traveler_email,
        Subject: `Your DutyCredit Has Been Redeemed!`,
        HtmlBody: emailBody,
      }),
    });

    const result = await response.json();
    return Response.json({ success: true, emailId: result.id });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});