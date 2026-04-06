import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

function calculateDiscount({ ticketPrice, travelers, travelType }) {
  let discount = 5;
  if (travelers > 1) discount += (travelers - 1) * 1;
  if (ticketPrice > 2000) discount += 10;
  else if (ticketPrice > 1000) discount += 5;
  if (travelType === 'Long-haul') discount += 5;
  return Math.min(discount, 25);
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
  d.setDate(d.getDate() + 1); // expires day after travel
  return d.toISOString().split('T')[0];
}

Deno.serve(async (req) => {
  // Allow CORS for agency integrations
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

  // Support both authenticated users (dashboard) and API key access
  let agencyEmail = null;

  // Try authenticated user first
  const user = await base44.auth.me().catch(() => null);
  if (user) {
    agencyEmail = user.email;
  }

  const body = await req.json();

  const {
    booking_id,
    total_ticket_price,
    number_of_travelers,
    travel_type,
    departure_airport,
    travel_date,
    traveler_email,   // email to send the DutyCredit to
    traveler_name,    // optional, for personalised email
    agency_name,      // optional, shown in co-branded email
  } = body;

  // Validate required fields
  if (!booking_id || !total_ticket_price || !number_of_travelers || !travel_type || !departure_airport || !travel_date || !traveler_email) {
    return Response.json({
      error: 'Missing required fields: booking_id, total_ticket_price, number_of_travelers, travel_type, departure_airport, travel_date, traveler_email'
    }, { status: 400 });
  }

  if (!agencyEmail) {
    agencyEmail = body.agency_email || 'unknown@agency.com';
  }

  // Calculate discount
  const discountPercentage = calculateDiscount({
    ticketPrice: total_ticket_price,
    travelers: number_of_travelers,
    travelType: travel_type,
  });

  const voucherCode = generateVoucherCode();
  const expirationDate = getExpirationDate(travel_date);

  // Save booking
  await base44.asServiceRole.entities.Booking.create({
    booking_id,
    total_ticket_price,
    number_of_travelers,
    travel_type,
    departure_airport,
    travel_date,
    agency_email: agencyEmail,
  });

  // Save DutyCredit (Voucher)
  await base44.asServiceRole.entities.Voucher.create({
    voucher_code: voucherCode,
    booking_id,
    discount_percentage: discountPercentage,
    airport: departure_airport,
    expiration_date: expirationDate,
    status: 'active',
    traveler_count: number_of_travelers,
    ticket_price: total_ticket_price,
    travel_type,
    agency_email: agencyEmail,
    traveler_email,
  });

  // Construct the DutyCredit URL
  const appUrl = `https://${req.headers.get('host')}`;
  const dutyCreditUrl = `${appUrl}/voucher?code=${voucherCode}`;

  // Send co-branded email to traveler
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
        
        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#5b4fcf,#7c6be0);padding:36px 40px;text-align:center;">
            <p style="margin:0 0 4px 0;color:rgba(255,255,255,0.75);font-size:13px;letter-spacing:1px;text-transform:uppercase;">Presented by ${agencyLabel} × DutyBoost</p>
            <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:700;letter-spacing:-0.5px;">Your DutyCredit is Ready</h1>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:36px 40px;">
            <p style="margin:0 0 20px;color:#374151;font-size:15px;line-height:1.6;">Hi ${travelerLabel},</p>
            <p style="margin:0 0 20px;color:#374151;font-size:15px;line-height:1.6;">
              As part of your upcoming trip on <strong>${formattedDate}</strong> from <strong>${departure_airport}</strong>, 
              you've earned a <strong style="color:#5b4fcf;">${discountPercentage}% DutyCredit</strong> — redeemable at participating airport retailers.
            </p>

            <!-- Discount badge -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin:28px 0;">
              <tr>
                <td align="center" style="background:#f0eeff;border-radius:12px;padding:24px;">
                  <p style="margin:0 0 4px;color:#5b4fcf;font-size:48px;font-weight:800;line-height:1;">${discountPercentage}%</p>
                  <p style="margin:0;color:#6b7280;font-size:14px;">Airport Retail Discount</p>
                  <p style="margin:8px 0 0;color:#374151;font-size:13px;font-family:monospace;background:#fff;border:1px solid #e5e7eb;border-radius:6px;padding:6px 14px;display:inline-block;letter-spacing:2px;">${voucherCode}</p>
                </td>
              </tr>
            </table>

            <p style="margin:0 0 8px;color:#374151;font-size:15px;line-height:1.6;">To redeem your DutyCredit, tap the button below to open your personal QR code and present it at the retailer's till:</p>

            <!-- CTA -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0;">
              <tr>
                <td align="center">
                  <a href="${dutyCreditUrl}" style="display:inline-block;background:#5b4fcf;color:#ffffff;font-size:16px;font-weight:600;text-decoration:none;padding:14px 36px;border-radius:10px;">View My DutyCredit →</a>
                </td>
              </tr>
            </table>

            <!-- Details -->
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:10px;overflow:hidden;margin:24px 0;">
              <tr style="background:#f9fafb;">
                <td style="padding:10px 16px;font-size:13px;color:#6b7280;border-bottom:1px solid #e5e7eb;">Travel Date</td>
                <td style="padding:10px 16px;font-size:13px;color:#111827;font-weight:500;border-bottom:1px solid #e5e7eb;">${formattedDate}</td>
              </tr>
              <tr>
                <td style="padding:10px 16px;font-size:13px;color:#6b7280;border-bottom:1px solid #e5e7eb;">Airport</td>
                <td style="padding:10px 16px;font-size:13px;color:#111827;font-weight:500;border-bottom:1px solid #e5e7eb;">${departure_airport}</td>
              </tr>
              <tr style="background:#f9fafb;">
                <td style="padding:10px 16px;font-size:13px;color:#6b7280;border-bottom:1px solid #e5e7eb;">Discount</td>
                <td style="padding:10px 16px;font-size:13px;color:#111827;font-weight:500;border-bottom:1px solid #e5e7eb;">${discountPercentage}% off at participating stores</td>
              </tr>
              <tr>
                <td style="padding:10px 16px;font-size:13px;color:#6b7280;">Valid Until</td>
                <td style="padding:10px 16px;font-size:13px;color:#111827;font-weight:500;">${formattedExpiry}</td>
              </tr>
            </table>

            <p style="margin:0;color:#9ca3af;font-size:12px;line-height:1.6;border-top:1px solid #e5e7eb;padding-top:16px;">
              Your DutyCredit is redeemable in a single transaction at one point of sale and cannot be split across multiple shops. 
              This DutyCredit is personal, non-transferable, and expires on ${formattedExpiry}.
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f9fafb;padding:20px 40px;text-align:center;border-top:1px solid #e5e7eb;">
            <p style="margin:0;color:#9ca3af;font-size:12px;">Powered by <strong style="color:#5b4fcf;">DutyBoost</strong> — Dynamic Airport Incentive Platform</p>
            <p style="margin:4px 0 0;color:#9ca3af;font-size:11px;">© 2026 DutyBoost B.V., Amsterdam, the Netherlands</p>
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
    subject: `Your ${discountPercentage}% DutyCredit for ${departure_airport} — from ${agencyLabel}`,
    body: emailBody,
  });

  return Response.json({
    success: true,
    voucher_code: voucherCode,
    discount_percentage: discountPercentage,
    expiration_date: expirationDate,
    duty_credit_url: dutyCreditUrl,
    message: `DutyCredit generated and sent to ${traveler_email}`,
  });
});