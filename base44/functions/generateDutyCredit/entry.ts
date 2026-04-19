import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

// DutyCredit Calculation Model
// Flat-reward tiers: Boarding €10 / Priority €30 / Lounge €45 / VIP €60

const DUTY_CREDIT_CONFIG = {
  shortHaul: { basePerTraveler: 2.50 },
  longHaul:  { basePerTraveler: 7.00 },
  floor: 5,
  cap: 60,
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

  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=10&data=${encodeURIComponent(voucherCode)}`;

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
      <table width="580" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#1e40af,#3b6ef5);padding:36px 40px;text-align:center;">
            <p style="margin:0 0 6px 0;color:rgba(255,255,255,0.8);font-size:13px;letter-spacing:1px;text-transform:uppercase;">Presented by ${agencyLabel} × DutyBoost</p>
            <h1 style="margin:0;color:#ffffff;font-size:30px;font-weight:800;letter-spacing:-0.5px;">Your DutyCredit is Ready 🎁</h1>
            <p style="margin:10px 0 0;color:rgba(255,255,255,0.85);font-size:15px;">A discount waiting for you at the airport</p>
          </td>
        </tr>

        <tr><td style="padding:36px 40px 0;">
          <p style="margin:0 0 16px;color:#374151;font-size:15px;line-height:1.7;">Hi <strong>${travelerLabel}</strong>,</p>
          <p style="margin:0 0 28px;color:#374151;font-size:15px;line-height:1.7;">
            Your booking from <strong>${departure_airport}</strong> on <strong>${formattedDate}</strong> is confirmed.
            As a thank-you from <strong>${agencyLabel}</strong>, you have received a <strong style="color:#1e40af;">DutyCredit</strong> — a discount you can use at participating shops at the airport on your day of departure.
          </p>
        </td></tr>

        <!-- QR Code block -->
        <tr>
          <td style="padding:0 40px 28px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="border:2px solid #1e40af;border-radius:14px;overflow:hidden;">
              <tr>
                <td align="center" style="padding:28px 20px;background:#f8faff;">
                  <p style="margin:0 0 20px;color:#6b7280;font-size:13px;text-transform:uppercase;letter-spacing:0.5px;">Your DutyCredit code</p>
                  <img src="${qrImageUrl}" alt="DutyCredit QR Code" width="200" height="200" style="display:block;margin:0 auto 16px;border-radius:10px;border:1px solid #e5e7eb;" />
                  <p style="margin:0 0 6px;color:#6b7280;font-size:12px;">📱 Show or scan this QR code at the POS terminal</p>
                  <p style="margin:0;color:#111827;font-size:16px;font-family:monospace;background:#ffffff;border:1.5px solid #c7d2fe;border-radius:8px;padding:8px 20px;display:inline-block;letter-spacing:3px;font-weight:700;">${voucherCode}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- How it works -->
        <tr>
          <td style="padding:0 40px 28px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#eff6ff;border-radius:12px;">
              <tr>
                <td style="padding:20px 24px;">
                  <p style="margin:0 0 12px;color:#1e40af;font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;">📋 How to use your DutyCredit</p>
                  <p style="margin:0 0 8px;color:#374151;font-size:14px;line-height:1.7;">
                    1. Go to any participating DutyBoost store at <strong>${departure_airport}</strong> on your day of departure.<br/>
                    2. Shop and bring your purchase to the checkout.<br/>
                    3. Show the QR code above (or give your code <strong>${voucherCode}</strong>) to the cashier.<br/>
                    4. The POS terminal will scan your code and automatically calculate and apply your discount based on your spend.
                  </p>
                  <p style="margin:10px 0 0;color:#1e40af;font-size:13px;font-weight:600;">Minimum spend: €70. Single-use. Valid on your travel date only.</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Discount tier table -->
        <tr>
          <td style="padding:0 40px 28px;">
            <p style="margin:0 0 12px;color:#111827;font-size:14px;font-weight:700;">💶 Your discount at the airport store:</p>
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:10px;overflow:hidden;font-size:14px;">
              <thead>
                <tr style="background:#1e40af;">
                  <th style="text-align:left;padding:10px 16px;color:#ffffff;font-weight:600;">Tier</th>
                  <th style="text-align:left;padding:10px 16px;color:#ffffff;font-weight:600;">Spend</th>
                  <th style="text-align:right;padding:10px 16px;color:#ffffff;font-weight:600;">Max savings</th>
                </tr>
              </thead>
              <tbody>
                <tr style="background:#f9fafb;">
                  <td style="padding:10px 16px;color:#374151;font-weight:600;border-top:1px solid #e5e7eb;">Boarding DutyCredit</td>
                  <td style="padding:10px 16px;color:#6b7280;border-top:1px solid #e5e7eb;">€70 – €99</td>
                  <td style="padding:10px 16px;color:#374151;font-weight:700;text-align:right;border-top:1px solid #e5e7eb;">€10</td>
                </tr>
                <tr>
                  <td style="padding:10px 16px;color:#374151;font-weight:600;border-top:1px solid #e5e7eb;">Priority DutyCredit</td>
                  <td style="padding:10px 16px;color:#6b7280;border-top:1px solid #e5e7eb;">€100 – €199</td>
                  <td style="padding:10px 16px;color:#1e40af;font-weight:700;text-align:right;border-top:1px solid #e5e7eb;">€30</td>
                </tr>
                <tr style="background:#f9fafb;">
                  <td style="padding:10px 16px;color:#374151;font-weight:600;border-top:1px solid #e5e7eb;">Lounge DutyCredit</td>
                  <td style="padding:10px 16px;color:#6b7280;border-top:1px solid #e5e7eb;">€200 – €299</td>
                  <td style="padding:10px 16px;color:#1e40af;font-weight:700;text-align:right;border-top:1px solid #e5e7eb;">€45</td>
                </tr>
                <tr>
                  <td style="padding:10px 16px;color:#374151;font-weight:600;border-top:1px solid #e5e7eb;">VIP DutyCredit</td>
                  <td style="padding:10px 16px;color:#6b7280;border-top:1px solid #e5e7eb;">€300 and above</td>
                  <td style="padding:10px 16px;color:#059669;font-weight:700;text-align:right;border-top:1px solid #e5e7eb;">€60</td>
                </tr>
              </tbody>
            </table>
            <p style="margin:10px 0 0;color:#6b7280;font-size:12px;">Your discount is applied automatically at checkout. Maximum saving: €60 on a spend of €300+.</p>
          </td>
        </tr>

        <!-- Details row -->
        <tr>
          <td style="padding:0 40px 28px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:10px;overflow:hidden;">
              <tr style="background:#f9fafb;">
                <td style="padding:10px 16px;font-size:13px;color:#6b7280;border-bottom:1px solid #e5e7eb;">Travel Date</td>
                <td style="padding:10px 16px;font-size:13px;color:#111827;font-weight:500;border-bottom:1px solid #e5e7eb;">${formattedDate}</td>
              </tr>
              <tr>
                <td style="padding:10px 16px;font-size:13px;color:#6b7280;border-bottom:1px solid #e5e7eb;">Departure Airport</td>
                <td style="padding:10px 16px;font-size:13px;color:#111827;font-weight:500;border-bottom:1px solid #e5e7eb;">${departure_airport}</td>
              </tr>
              <tr style="background:#f9fafb;">
                <td style="padding:10px 16px;font-size:13px;color:#6b7280;">Valid Until</td>
                <td style="padding:10px 16px;font-size:13px;color:#dc2626;font-weight:600;">${formattedExpiry} — travel day only</td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f9fafb;padding:20px 40px;text-align:center;border-top:1px solid #e5e7eb;">
            <p style="margin:0 0 4px;color:#9ca3af;font-size:12px;">Questions? Contact <a href="mailto:hello@dutyboost.com" style="color:#1e40af;text-decoration:none;">hello@dutyboost.com</a></p>
            <p style="margin:4px 0 0;color:#9ca3af;font-size:11px;">Powered by <strong style="color:#1e40af;">DutyBoost</strong> — Airport Retail Incentive Platform · © ${new Date().getFullYear()} DutyBoost B.V., Amsterdam</p>
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
    subject: `Your DutyCredit for ${departure_airport} — save up to €60.00 at the airport`,
    body: emailBody,
  });

  return Response.json({
    success: true,
    voucher_code: voucherCode,
    credit_amount_eur: creditAmount,
    expiration_date: expirationDate,
    qr_image_url: qrImageUrl,
    message: `DutyCredit of €${creditAmount.toFixed(2)} generated and sent to ${traveler_email}`,
  });
});