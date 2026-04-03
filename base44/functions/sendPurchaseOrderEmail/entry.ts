import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

const AGENCY_COMMISSION = "2.5%";
const RETAILER_COMMISSION = "5%–25%";

function generatePOHtml(businessType, formData, poNumber) {
  const isAgency = businessType === "Travel Agency";
  const today = new Date().toLocaleDateString("nl-NL", { day: "2-digit", month: "long", year: "numeric" });
  const commission = isAgency ? AGENCY_COMMISSION : RETAILER_COMMISSION;

  const serviceRows = isAgency ? `
    <tr>
      <td style="padding:12px 16px;font-weight:500;">DutyBoost Platform Access</td>
      <td style="padding:12px 16px;color:#666;">Access to the DutyBoost platform, dashboard, and API integration for issuing DutyCredits to travelers.</td>
      <td style="padding:12px 16px;text-align:right;font-weight:500;">€0 setup</td>
    </tr>
    <tr style="border-top:1px solid #e5e7eb;">
      <td style="padding:12px 16px;font-weight:500;">DutyCredit Redemption Commission</td>
      <td style="padding:12px 16px;color:#666;">Commission per confirmed DutyCredit redemption at a participating airport retailer, calculated on the total ticket value.</td>
      <td style="padding:12px 16px;text-align:right;font-weight:600;color:#2563eb;">${commission} per redemption</td>
    </tr>
  ` : `
    <tr>
      <td style="padding:12px 16px;font-weight:500;">DutyBoost Platform Access</td>
      <td style="padding:12px 16px;color:#666;">Listing on the DutyBoost retailer network, dashboard access for scanning, voucher management, and monthly reporting.</td>
      <td style="padding:12px 16px;text-align:right;font-weight:500;">€0 setup</td>
    </tr>
    <tr style="border-top:1px solid #e5e7eb;">
      <td style="padding:12px 16px;font-weight:500;">Voucher Redemption Platform Fee</td>
      <td style="padding:12px 16px;color:#666;">Platform fee per confirmed DutyCredit voucher redemption in your store, calculated on the total transaction value at point of sale.</td>
      <td style="padding:12px 16px;text-align:right;font-weight:600;color:#2563eb;">${commission} per redemption</td>
    </tr>
  `;

  const paymentTerms = isAgency ? `
    <li>Fees are charged per confirmed DutyCredit redemption only — no upfront or monthly costs.</li>
    <li>Invoices are generated monthly and collected automatically via your registered payment method.</li>
    <li>A one-time €0.01 mandate verification will be processed upon registration (refunded immediately).</li>
  ` : `
    <li>Fees are charged per confirmed voucher redemption only — no upfront or monthly costs (unless opted for Monthly Invoice billing).</li>
    <li>Monthly Invoice customers receive an invoice on the 1st of each month; payment due within 14 days.</li>
    <li>A one-time €0.01 mandate verification will be processed upon registration (refunded immediately).</li>
  `;

  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"></head>
    <body style="font-family:Inter,Arial,sans-serif;background:#f3f4f6;margin:0;padding:32px 16px;">
      <div style="max-width:700px;margin:0 auto;background:#fff;border-radius:12px;padding:40px;border:1px solid #e5e7eb;">

        <!-- Header -->
        <div style="display:flex;justify-content:space-between;align-items:flex-start;padding-bottom:24px;border-bottom:1px solid #e5e7eb;margin-bottom:24px;">
          <div>
            <div style="font-size:22px;font-weight:800;color:#1e40af;letter-spacing:-0.5px;">DutyBoost</div>
            <div style="font-size:11px;color:#9ca3af;margin-top:2px;">Travel Retail Conversion Platform</div>
          </div>
          <div style="text-align:right;">
            <div style="font-size:18px;font-weight:700;">Purchase Order</div>
            <div style="font-size:12px;color:#6b7280;margin-top:2px;">PO-${poNumber}</div>
            <div style="font-size:12px;color:#6b7280;">Date: ${today}</div>
          </div>
        </div>

        <!-- Parties -->
        <table width="100%" style="margin-bottom:24px;">
          <tr>
            <td width="50%" style="vertical-align:top;padding-right:16px;">
              <div style="font-size:10px;font-weight:600;color:#9ca3af;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:8px;">From (Service Provider)</div>
              <div style="font-weight:600;">DutyBoost B.V.</div>
              <div style="color:#6b7280;font-size:13px;">Amsterdam, The Netherlands</div>
              <div style="color:#6b7280;font-size:13px;">KVK: 94891234</div>
              <div style="color:#6b7280;font-size:13px;">VAT: NL866038978B01</div>
              <div style="color:#6b7280;font-size:13px;">hello@dutyboost.com</div>
            </td>
            <td width="50%" style="vertical-align:top;padding-left:16px;">
              <div style="font-size:10px;font-weight:600;color:#9ca3af;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:8px;">To (Client)</div>
              <div style="font-weight:600;">${formData.company}</div>
              <div style="color:#6b7280;font-size:13px;">${formData.fullName}</div>
              <div style="color:#6b7280;font-size:13px;">${formData.email}</div>
              ${formData.kvk ? `<div style="color:#6b7280;font-size:13px;">KVK: ${formData.kvk}</div>` : ''}
              ${formData.vat ? `<div style="color:#6b7280;font-size:13px;">VAT: ${formData.vat}</div>` : ''}
            </td>
          </tr>
        </table>

        <!-- Services Table -->
        <div style="margin-bottom:24px;">
          <div style="font-size:10px;font-weight:600;color:#9ca3af;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:8px;">Service Description</div>
          <table width="100%" style="border:1px solid #e5e7eb;border-radius:8px;border-collapse:collapse;overflow:hidden;">
            <thead>
              <tr style="background:#f9fafb;">
                <th style="text-align:left;padding:10px 16px;font-size:13px;">Service</th>
                <th style="text-align:left;padding:10px 16px;font-size:13px;">Description</th>
                <th style="text-align:right;padding:10px 16px;font-size:13px;">Fee</th>
              </tr>
            </thead>
            <tbody>${serviceRows}</tbody>
          </table>
        </div>

        <!-- Payment Terms -->
        <div style="margin-bottom:24px;">
          <div style="font-size:10px;font-weight:600;color:#9ca3af;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:8px;">Payment Terms</div>
          <div style="background:#f9fafb;border-radius:8px;padding:16px;">
            <ul style="color:#6b7280;font-size:13px;padding-left:16px;margin:0;line-height:1.8;">
              ${paymentTerms}
              <li>This agreement is governed by Dutch law. Disputes submitted to the courts of Amsterdam.</li>
            </ul>
          </div>
        </div>

        <!-- Footer -->
        <div style="padding-top:16px;border-top:1px solid #e5e7eb;font-size:12px;color:#9ca3af;text-align:center;">
          DutyBoost B.V. · Amsterdam, The Netherlands · hello@dutyboost.com · dutyboost.com
        </div>
      </div>
    </body>
    </html>
  `;
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { applicationId, businessType, formData, poNumber } = await req.json();

    const htmlContent = generatePOHtml(businessType, formData, poNumber);

    await base44.integrations.Core.SendEmail({
      to: formData.email,
      subject: `Your DutyBoost Purchase Order — PO-${poNumber}`,
      body: htmlContent,
      from_name: "DutyBoost",
    });

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});