export default function EmailPreview() {
  const creditAmount = 14.00;
  const voucherCode = "DB-X7K2M4NP";
  const departure_airport = "AMS";
  const agencyLabel = "Holland Travel Agency";
  const travelerLabel = "John";
  const formattedDate = "15 May 2026";
  const formattedExpiry = "16 May 2026";
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=10&data=${encodeURIComponent(voucherCode)}`;

  const html = `
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
            <p style="margin:0 0 12px;color:#111827;font-size:14px;font-weight:700;">💶 How your discount is calculated at the airport retailer:</p>
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:10px;overflow:hidden;font-size:14px;">
              <thead>
                <tr style="background:#1e40af;">
                  <th style="text-align:left;padding:10px 16px;color:#ffffff;font-weight:600;">Your spend at the store</th>
                  <th style="text-align:right;padding:10px 16px;color:#ffffff;font-weight:600;">Discount applied</th>
                </tr>
              </thead>
              <tbody>
                <tr style="background:#f9fafb;">
                  <td style="padding:10px 16px;color:#374151;border-top:1px solid #e5e7eb;">€70 – €99</td>
                  <td style="padding:10px 16px;color:#374151;font-weight:600;text-align:right;border-top:1px solid #e5e7eb;">max €9.99</td>
                </tr>
                <tr>
                  <td style="padding:10px 16px;color:#374151;border-top:1px solid #e5e7eb;">€100 – €299</td>
                  <td style="padding:10px 16px;color:#1e40af;font-weight:700;text-align:right;border-top:1px solid #e5e7eb;">max €14.00</td>
                </tr>
                <tr style="background:#f9fafb;">
                  <td style="padding:10px 16px;color:#374151;border-top:1px solid #e5e7eb;">€300 and above</td>
                  <td style="padding:10px 16px;color:#059669;font-weight:700;text-align:right;border-top:1px solid #e5e7eb;">max €25.00 🏆</td>
                </tr>
              </tbody>
            </table>
            <p style="margin:10px 0 0;color:#6b7280;font-size:12px;">The discount is calculated automatically at checkout when you scan your code. Your maximum possible saving is €25.00.</p>
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
            <p style="margin:4px 0 0;color:#9ca3af;font-size:11px;">Powered by <strong style="color:#1e40af;">DutyBoost</strong> — Airport Retail Incentive Platform · © 2026 DutyBoost B.V., Amsterdam</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

  return (
    <div className="min-h-screen bg-slate-300 p-6">
      <div className="max-w-3xl mx-auto mb-4">
        <div className="bg-white rounded-xl p-4 border border-slate-300 text-sm text-slate-600 font-mono space-y-1 shadow">
          <div><span className="text-slate-400">From: </span>DutyBoost &lt;noreply@dutyboost.com&gt;</div>
          <div><span className="text-slate-400">To: </span>john@example.com</div>
          <div><span className="text-slate-400">Subject: </span><strong className="text-slate-800">Your DutyCredit for {departure_airport} — save up to €{creditAmount.toFixed(2)} at the airport</strong></div>
        </div>
      </div>
      <div className="max-w-3xl mx-auto rounded-xl overflow-hidden shadow-lg border border-slate-300">
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  );
}