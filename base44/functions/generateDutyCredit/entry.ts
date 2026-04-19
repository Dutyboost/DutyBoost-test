import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

// DutyCredit Calculation Model
// credit = clamp(basePerTraveler × travelers × priceMultiplier, €5, €25)
// No minimum spend — every traveler can redeem, proportionally capped at 15% of basket
// 15% cap: credit applied at till ≤ 15% of basket (retailer always nets ≥ 85%)

const DUTY_CREDIT_CONFIG = {
  shortHaul: { basePerTraveler: 2.50 },
  longHaul:  { basePerTraveler: 7.00 },
  floor: 5,
  cap: 25,
  maxBasketPct: 0.15,
};

function calculateDutyCredit({ ticketPrice, travelers, travelType }) {
  const isLongHaul = travelType === 'Long-haul';
  const base = isLongHaul
    ? DUTY_CREDIT_CONFIG.longHaul.basePerTraveler
    : DUTY_CREDIT_CONFIG.shortHaul.basePerTraveler;

  let multiplier = 1.0;
  if (ticketPrice >= 1000) multiplier = 2.5;
  else if (ticketPrice >= 500) multiplier = 2.0;
  else if (ticketPrice >= 200) multiplier = 1.5;

  const raw = base * travelers * multiplier;
  return Math.min(Math.max(raw, DUTY_CREDIT_CONFIG.floor), DUTY_CREDIT_CONFIG.cap);
}

function generateVoucherCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = 'DB-';
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

function getExpirationDate(travelDate) {
  const d = new Date(travelDate);
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-api-key',
      },
    });
  }

  const base44 = createClientFromRequest(req);

  const user = await base44.auth.me().catch(() => null);
  if (!user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }
  if (user.role !== 'agency' && user.role !== 'admin') {
    return Response.json({ error: 'Forbidden: Only approved travel partners can generate DutyCredits' }, { status: 403 });
  }

  const agencyEmail = user.email;

  const body = await req.json();
  const {
    booking_id, total_ticket_price, number_of_travelers, travel_type,
    departure_airport, travel_date, traveler_email, traveler_name, agency_name,
  } = body;

  if (!booking_id || !total_ticket_price || !number_of_travelers || !travel_type || !departure_airport || !travel_date || !traveler_email) {
    return Response.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const creditAmount = calculateDutyCredit({
    ticketPrice: total_ticket_price,
    travelers: number_of_travelers,
    travelType: travel_type,
  });

  const voucherCode = generateVoucherCode();
  const expirationDate = getExpirationDate(travel_date);

  await base44.asServiceRole.entities.Booking.create({
    booking_id, total_ticket_price, number_of_travelers, travel_type,
    departure_airport, travel_date, agency_email: agencyEmail,
  });

  await base44.asServiceRole.entities.Voucher.create({
    voucher_code: voucherCode,
    booking_id,
    discount_percentage: creditAmount, // stores euro credit amount
    airport: departure_airport,
    expiration_date: expirationDate,
    status: 'active',
    traveler_count: number_of_travelers,
    ticket_price: total_ticket_price,
    travel_type,
    agency_email: agencyEmail,
    traveler_email,
  });

  const appUrl = `https://${req.headers.get('host')}`;
  const dutyCreditUrl = `${appUrl}/voucher?code=${voucherCode}`;
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&margin=10&data=${encodeURIComponent(dutyCreditUrl)}`;

  const agencyLabel = agency_name || 'Your Travel Agency';
  const travelerLabel = traveler_name || 'Traveler';
  const formattedDate = new Date(travel_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  const formattedExpiry = new Date(expirationDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  const emailBody = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f4f5f9;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f5f9;padding:40px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
        <tr>
          <td style="background:linear-gradient(135deg,#5b4fcf,#7c6be0);padding:36px 40px;text-align:center;">
            <p style="margin:0 0 4px 0;color:rgba(255,255,255,0.75);font-size:13px;letter-spacing:1px;text-transform:uppercase;">Presented by ${agencyLabel} × DutyBoost</p>
            <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:700;letter-spacing:-0.5px;">Your DutyCredit is Ready 🎁</h1>
          </td>
        </tr>
        <tr>
          <td style="padding:36px 40px;">
            <p style="margin:0 0 20px;color:#374151;font-size:15px;line-height:1.6;">Hi ${travelerLabel},</p>
            <p style="margin:0 0 20px;color:#374151;font-size:15px;line-height:1.6;">
              Your booking for <strong>${formattedDate}</strong> from <strong>${departure_airport}</strong> has been confirmed.
              As a thank-you from <strong>${agencyLabel}</strong>, you've earned a <strong style="color:#5b4fcf;">€${creditAmount.toFixed(2)} DutyCredit</strong> — redeemable at participating airport shops on your day of departure.
            </p>
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0eeff;border-radius:12px;margin:0 0 28px 0;">
              <tr>
                <td style="padding:20px 24px;">
                  <p style="margin:0 0 8px;color:#5b4fcf;font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;">✦ What is a DutyCredit?</p>
                  <p style="margin:0;color:#374151;font-size:14px;line-height:1.7;">
                    A DutyCredit is a fixed euro amount (€${creditAmount.toFixed(2)}) you can spend at participating airport shops on your day of departure.
                    Simply scan the QR code below at checkout — no app, no loyalty card needed.
                  </p>
                  <p style="margin:10px 0 0;color:#374151;font-size:14px;line-height:1.7;">
                   No minimum spend required. Your credit is applied up to 15% of your basket value — so even a small purchase earns you a discount.
                  </p>
                </td>
              </tr>
            </table>
            <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 28px 0;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
              <tr>
                <td align="center" style="padding:28px 20px;">
                  <p style="margin:0 0 4px;color:#6b7280;font-size:14px;">Your DutyCredit value</p>
                  <p style="margin:0 0 16px;color:#5b4fcf;font-size:52px;font-weight:800;line-height:1;">€${creditAmount.toFixed(2)}</p>
                  <img src="${qrImageUrl}" alt="DutyCredit QR Code" width="180" height="180" style="display:block;margin:0 auto 16px;border-radius:8px;border:1px solid #e5e7eb;" />
                  <p style="margin:0 0 4px;color:#6b7280;font-size:12px;">Scan this QR code at the till</p>
                  <p style="margin:0;color:#374151;font-size:14px;font-family:monospace;background:#f9fafb;border:1px solid #e5e7eb;border-radius:6px;padding:6px 14px;display:inline-block;letter-spacing:2px;font-weight:600;">${voucherCode}</p>
                </td>
              </tr>
            </table>
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:10px;overflow:hidden;margin:0 0 24px 0;">
              <tr style="background:#f9fafb;">
                <td style="padding:10px 16px;font-size:13px;color:#6b7280;border-bottom:1px solid #e5e7eb;">Travel Date</td>
                <td style="padding:10px 16px;font-size:13px;color:#111827;font-weight:500;border-bottom:1px solid #e5e7eb;">${formattedDate}</td>
              </tr>
              <tr>
                <td style="padding:10px 16px;font-size:13px;color:#6b7280;border-bottom:1px solid #e5e7eb;">Departure Airport</td>
                <td style="padding:10px 16px;font-size:13px;color:#111827;font-weight:500;border-bottom:1px solid #e5e7eb;">${departure_airport}</td>
              </tr>
              <tr style="background:#f9fafb;">
                <td style="padding:10px 16px;font-size:13px;color:#6b7280;border-bottom:1px solid #e5e7eb;">DutyCredit Value</td>
                <td style="padding:10px 16px;font-size:13px;color:#111827;font-weight:500;border-bottom:1px solid #e5e7eb;">€${creditAmount.toFixed(2)} (up to 15% of your basket, no minimum spend)</td>
              </tr>
              <tr>
                <td style="padding:10px 16px;font-size:13px;color:#6b7280;">Valid Until</td>
                <td style="padding:10px 16px;font-size:13px;color:#111827;font-weight:500;">${formattedExpiry} (day of travel only)</td>
              </tr>
            </table>
            <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px 0;">
              <tr>
                <td align="center">
                  <a href="${dutyCreditUrl}" style="display:inline-block;background:#5b4fcf;color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;padding:13px 32px;border-radius:10px;">Open My DutyCredit →</a>
                </td>
              </tr>
            </table>
            <p style="margin:0;color:#9ca3af;font-size:12px;line-height:1.6;border-top:1px solid #e5e7eb;padding-top:16px;">
              Your DutyCredit (€${creditAmount.toFixed(2)}) is redeemable in a single transaction at one participating point of sale.
              No minimum spend required. The credit applied cannot exceed 15% of your basket value.
              It is personal, non-transferable, and expires on <strong>${formattedExpiry}</strong>.
              Having trouble with the QR code? Use voucher code <strong>${voucherCode}</strong> at the till.
            </p>
          </td>
        </tr>
        <tr>
          <td style="background:#f9fafb;padding:20px 40px;text-align:center;border-top:1px solid #e5e7eb;">
            <p style="margin:0;color:#9ca3af;font-size:12px;">Powered by <strong style="color:#5b4fcf;">DutyBoost</strong> — Dynamic Airport Incentive Platform</p>
            <p style="margin:4px 0 0;color:#9ca3af;font-size:11px;">© ${new Date().getFullYear()} DutyBoost B.V., Amsterdam, the Netherlands</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>
`.trim();

  await base44.asServiceRole.integrations.Core.SendEmail({
    to: traveler_email,
    subject: `Your €${creditAmount.toFixed(2)} DutyCredit for ${departure_airport} — from ${agencyLabel}`,
    body: emailBody,
  });

  return Response.json({
    success: true,
    voucher_code: voucherCode,
    credit_amount_eur: creditAmount,
    max_basket_pct: DUTY_CREDIT_CONFIG.maxBasketPct,
    expiration_date: expirationDate,
    duty_credit_url: dutyCreditUrl,
    qr_image_url: qrImageUrl,
    html_snippet: `<!-- DutyBoost DutyCredit Block — paste inside your confirmation email template -->
<table width="100%" cellpadding="0" cellspacing="0" style="margin:32px 0;font-family:Helvetica Neue,Helvetica,Arial,sans-serif;">
  <tr>
    <td style="background:#f0eeff;border-radius:14px;padding:28px 24px;text-align:center;border:1px solid #ddd6fe;">
      <p style="margin:0 0 4px;color:#5b4fcf;font-size:13px;font-weight:700;letter-spacing:0.5px;text-transform:uppercase;">&#x2726; Your DutyCredit — Exclusive Airport Perk</p>
      <p style="margin:0 0 4px;color:#5b4fcf;font-size:36px;font-weight:800;">€${creditAmount.toFixed(2)}</p>
      <p style="margin:0 0 16px;color:#374151;font-size:14px;line-height:1.6;max-width:400px;display:inline-block;">
        Redeemable at participating shops at <strong>${departure_airport}</strong> on your day of departure.<br/>
        No minimum spend required — up to 15% of your basket. Scan the QR code at the till.
      </p>
      <div style="margin:0 0 16px;">
        <img src="${qrImageUrl}" alt="DutyCredit QR Code" width="160" height="160" style="display:block;margin:0 auto;border-radius:8px;border:1px solid #e5e7eb;" />
      </div>
      <p style="margin:0 0 4px;color:#6b7280;font-size:12px;">Voucher code: <strong style="font-family:monospace;letter-spacing:2px;">${voucherCode}</strong></p>
      <p style="margin:0 0 16px;color:#9ca3af;font-size:11px;">Valid until ${formattedExpiry} &bull; Single-use &bull; Non-transferable</p>
      <a href="${dutyCreditUrl}" style="display:inline-block;background:#5b4fcf;color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;padding:11px 28px;border-radius:8px;">View My DutyCredit &rarr;</a>
    </td>
  </tr>
</table>
<!-- End DutyBoost Block -->`,
    message: `DutyCredit of €${creditAmount.toFixed(2)} generated and sent to ${traveler_email}`,
  });
});