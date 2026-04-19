import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

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

    const isAgency = business_type === 'Travel Partner';

    const emailBody = isAgency ? `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a2e;">
        <h2 style="color: #1a56ff;">Welcome to DutyBoost, ${full_name}!</h2>
        <p>Your account for <strong>${company}</strong> is now active. You can sign in to your Travel Partner portal right away.</p>

        <h3 style="color: #1a56ff;">Getting Started</h3>
        <p><strong>1. Access your portal</strong><br/>
        Sign in at <a href="https://dutyboost.com/agency-portal" style="color: #1a56ff;">dutyboost.com/agency-portal</a> to manage bookings, view DutyCredits issued to your travelers, and track your commission earnings.</p>

        <p><strong>2. Integrate the booking snippet</strong><br/>
        Inside your portal, navigate to the <strong>"Integration"</strong> tab. There you'll find your unique API snippet to embed into your booking flow. Paste it into your confirmation step and DutyCredits will be auto-generated for every eligible booking.</p>

        <p><strong>3. Track your earnings</strong><br/>
        The <strong>"Dashboard"</strong> tab shows real-time commission earnings per redeemed DutyCredit, broken down by traveler and departure airport.</p>

        <p style="margin-top: 24px;">Increase the number of travelers walking through your store with real spending intent — we're excited to grow alongside you.</p>
        <p>If you have any questions, reach us at <a href="mailto:hello@dutyboost.com" style="color: #1a56ff;">hello@dutyboost.com</a>.</p>
        <p>Welcome aboard,<br/><strong>The DutyBoost Team</strong></p>
      </div>
    ` : `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a2e;">
        <h2 style="color: #1a56ff;">Welcome to DutyBoost, ${full_name}!</h2>
        <p>Your account for <strong>${company}</strong> is now active. You can sign in to your Retailer portal right away.</p>

        <h3 style="color: #1a56ff;">Getting Started</h3>
        <p><strong>1. Access your portal</strong><br/>
        Sign in at <a href="https://dutyboost.com/retailer-portal" style="color: #1a56ff;">dutyboost.com/retailer-portal</a> to view your store dashboard, incoming DutyCredit redemptions, and monthly invoices.</p>

        <p><strong>2. Set up POS integration</strong><br/>
        Inside your portal, go to the <strong>"POS Integration"</strong> tab. You'll find your unique store token and step-by-step instructions to connect DutyBoost to your point-of-sale system. The integration uses a simple QR scan at checkout — no hardware changes required.</p>

        <p><strong>3. Start accepting DutyCredits</strong><br/>
        Once integrated, travelers can redeem their DutyCredits at your store automatically. Each redemption is logged in your dashboard with transaction value and discount details.</p>

        <p style="margin-top: 24px;">Every booking you process is now an opportunity to deepen traveler loyalty and earn on every spend at the airport — we're excited to grow alongside you.</p>
        <p>If you have any questions, reach us at <a href="mailto:hello@dutyboost.com" style="color: #1a56ff;">hello@dutyboost.com</a>.</p>
        <p>Welcome aboard,<br/><strong>The DutyBoost Team</strong></p>
      </div>
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
        Subject: `Your DutyBoost account is ready — ${company}`,
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