export default function EmailPreview() {
  const creditAmount = 14.00;
  const voucherCode = "DB-X7K2M4NP";
  const departure_airport = "AMS";
  const agencyLabel = "Your Travel Agency";
  const travelerLabel = "John";
  const formattedDate = "1 December 2025";
  const formattedExpiry = "2 December 2025";
  const dutyCreditUrl = "https://dutyboost.com/voucher?code=DB-X7K2M4NP";
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&margin=10&data=${encodeURIComponent(dutyCreditUrl)}`;

  const html = `
<div style="background:#f4f5f9;padding:40px 20px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
    <div style="background:linear-gradient(135deg,#5b4fcf,#7c6be0);padding:36px 40px;text-align:center;">
      <p style="margin:0 0 4px 0;color:rgba(255,255,255,0.75);font-size:13px;letter-spacing:1px;text-transform:uppercase;">Presented by ${agencyLabel} × DutyBoost</p>
      <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:700;letter-spacing:-0.5px;">Your DutyCredit is Ready 🎁</h1>
    </div>
    <div style="padding:36px 40px;">
      <p style="margin:0 0 20px;color:#374151;font-size:15px;line-height:1.6;">Hi ${travelerLabel},</p>
      <p style="margin:0 0 20px;color:#374151;font-size:15px;line-height:1.6;">
        Your booking for <strong>${formattedDate}</strong> from <strong>${departure_airport}</strong> has been confirmed.
        As a thank-you from <strong>${agencyLabel}</strong>, you've earned a <strong style="color:#5b4fcf;">€${creditAmount.toFixed(2)} DutyCredit</strong> — redeemable at participating airport shops on your day of departure.
      </p>
      <div style="background:#f0eeff;border-radius:12px;padding:20px 24px;margin:0 0 28px 0;">
        <p style="margin:0 0 8px;color:#5b4fcf;font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;">✦ What is a DutyCredit?</p>
        <p style="margin:0;color:#374151;font-size:14px;line-height:1.7;">
          A DutyCredit is a fixed euro amount (€${creditAmount.toFixed(2)}) you can spend at participating airport shops on your day of departure.
          Simply scan the QR code below at checkout — no app, no loyalty card needed.
        </p>
        <p style="margin:10px 0 0;color:#374151;font-size:14px;line-height:1.7;">
          No minimum spend required. Your credit is applied up to 15% of your basket value — so even a small purchase earns you a discount.
        </p>
      </div>
      <div style="margin:0 0 28px 0;border:1px solid #e5e7eb;border-radius:12px;text-align:center;padding:28px 20px;">
        <p style="margin:0 0 4px;color:#6b7280;font-size:14px;">Your DutyCredit value</p>
        <p style="margin:0 0 16px;color:#5b4fcf;font-size:52px;font-weight:800;line-height:1;">€${creditAmount.toFixed(2)}</p>
        <img src="${qrImageUrl}" alt="DutyCredit QR Code" width="180" height="180" style="display:block;margin:0 auto 16px;border-radius:8px;border:1px solid #e5e7eb;" />
        <p style="margin:0 0 4px;color:#6b7280;font-size:12px;">Scan this QR code at the till</p>
        <p style="margin:0;color:#374151;font-size:14px;font-family:monospace;background:#f9fafb;border:1px solid #e5e7eb;border-radius:6px;padding:6px 14px;display:inline-block;letter-spacing:2px;font-weight:600;">${voucherCode}</p>
      </div>
      <div style="border:1px solid #e5e7eb;border-radius:10px;overflow:hidden;margin:0 0 24px 0;">
        <div style="background:#f9fafb;padding:10px 16px;font-size:13px;border-bottom:1px solid #e5e7eb;display:flex;justify-content:space-between;">
          <span style="color:#6b7280;">Travel Date</span><span style="color:#111827;font-weight:500;">${formattedDate}</span>
        </div>
        <div style="padding:10px 16px;font-size:13px;border-bottom:1px solid #e5e7eb;display:flex;justify-content:space-between;">
          <span style="color:#6b7280;">Departure Airport</span><span style="color:#111827;font-weight:500;">${departure_airport}</span>
        </div>
        <div style="background:#f9fafb;padding:10px 16px;font-size:13px;border-bottom:1px solid #e5e7eb;display:flex;justify-content:space-between;">
          <span style="color:#6b7280;">DutyCredit Value</span><span style="color:#111827;font-weight:500;">€${creditAmount.toFixed(2)} (up to 15% of basket, no min. spend)</span>
        </div>
        <div style="padding:10px 16px;font-size:13px;display:flex;justify-content:space-between;">
          <span style="color:#6b7280;">Valid Until</span><span style="color:#111827;font-weight:500;">${formattedExpiry} (day of travel only)</span>
        </div>
      </div>
      <div style="text-align:center;margin:0 0 24px 0;">
        <a href="${dutyCreditUrl}" style="display:inline-block;background:#5b4fcf;color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;padding:13px 32px;border-radius:10px;">Open My DutyCredit →</a>
      </div>
      <p style="margin:0;color:#9ca3af;font-size:12px;line-height:1.6;border-top:1px solid #e5e7eb;padding-top:16px;">
        Your DutyCredit (€${creditAmount.toFixed(2)}) is redeemable in a single transaction at one participating point of sale.
        No minimum spend required. The credit applied cannot exceed 15% of your basket value.
        It is personal, non-transferable, and expires on <strong>${formattedExpiry}</strong>.
        Having trouble with the QR code? Use voucher code <strong>${voucherCode}</strong> at the till.
      </p>
    </div>
    <div style="background:#f9fafb;padding:20px 40px;text-align:center;border-top:1px solid #e5e7eb;">
      <p style="margin:0;color:#9ca3af;font-size:12px;">Powered by <strong style="color:#5b4fcf;">DutyBoost</strong> — Dynamic Airport Incentive Platform</p>
      <p style="margin:4px 0 0;color:#9ca3af;font-size:11px;">© 2026 DutyBoost B.V., Amsterdam, the Netherlands</p>
    </div>
  </div>
</div>`;

  return (
    <div className="min-h-screen bg-slate-300 p-6">
      <div className="max-w-3xl mx-auto mb-4">
        <div className="bg-white rounded-xl p-4 border border-slate-300 text-sm text-slate-600 font-mono space-y-1 shadow">
          <div><span className="text-slate-400">From: </span>DutyBoost &lt;noreply@dutyboost.com&gt;</div>
          <div><span className="text-slate-400">To: </span>john@example.com</div>
          <div><span className="text-slate-400">Subject: </span><strong className="text-slate-800">Your €{creditAmount.toFixed(2)} DutyCredit for {departure_airport} — from {agencyLabel}</strong></div>
        </div>
      </div>
      <div className="max-w-3xl mx-auto rounded-xl overflow-hidden shadow-lg border border-slate-300">
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  );
}