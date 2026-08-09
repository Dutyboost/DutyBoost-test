/**
 * generateMonthlyInvoices — runs on the 1st of each month (scheduled automation)
 *
 * For every retailer with transactions in the previous month:
 * 1. Creates a MonthlyInvoice record
 * 2. Sends the invoice by email to the retailer's invoice email address
 */

import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    // This function runs as a scheduled automation (no user session).
    // Auth check is skipped; it uses service role throughout.

    const now = new Date();
    const prevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const prevMonthStr = `${prevMonth.getFullYear()}-${String(prevMonth.getMonth() + 1).padStart(2, '0')}`;
    const monthLabel = prevMonth.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });

    const invoiceDate = new Date(now.getFullYear(), now.getMonth(), 1);
    const dueDate = new Date(invoiceDate);
    dueDate.setDate(dueDate.getDate() + 14);
    const invoiceDateStr = invoiceDate.toISOString().substring(0, 10);
    const dueDateStr = dueDate.toISOString().substring(0, 10);

    // Load all retailers, transactions and signup applications (for invoice email)
    const [retailers, transactions, applications] = await Promise.all([
      base44.asServiceRole.entities.Retailer.list(),
      base44.asServiceRole.entities.Transaction.list(),
      base44.asServiceRole.entities.SignupApplication.list(),
    ]);

    // Group platform_revenue by retailer owner_email for prev month
    const retailerMap = {};
    for (const r of retailers) {
      if (!r.owner_email) continue; // skip retailers with no owner email
      if (!retailerMap[r.owner_email]) {
        retailerMap[r.owner_email] = { name: r.store_name, total: 0 };
      }
    }

    for (const t of transactions) {
      const txnDate = t.created_date?.substring(0, 7);
      if (txnDate !== prevMonthStr) continue;
      // Match by retailer_id first, fall back to store_name
      const retailer = retailers.find(r => r.id === t.retailer_id) || retailers.find(r => r.store_name === t.store_name);
      if (!retailer || !retailer.owner_email) continue;
      retailerMap[retailer.owner_email].total += (t.platform_revenue || 0);
    }

    const postmarkToken = Deno.env.get('PostMark');
    const mollieKey = Deno.env.get('MOLLIE_API_KEY');
    let created = 0;

    for (const [ownerEmail, data] of Object.entries(retailerMap)) {
      if (data.total <= 0) continue;

      // Don't duplicate
      const existing = await base44.asServiceRole.entities.MonthlyInvoice.filter({
        retailer_email: ownerEmail,
        month_year: prevMonthStr,
      });
      if (existing.length > 0) continue;

      const amount = parseFloat(data.total.toFixed(2));

      await base44.asServiceRole.entities.MonthlyInvoice.create({
        retailer_email: ownerEmail,
        retailer_name: data.name,
        amount,
        month_year: prevMonthStr,
        invoice_date: invoiceDateStr,
        due_date: dueDateStr,
        status: 'pending',
      });
      created++;

      // Create Mollie payment link for iDEAL + Bancontact (Wero) + bank transfer
      let paymentLinkUrl = null;
      if (mollieKey) {
        const mollieRes = await fetch('https://api.mollie.com/v2/payment-links', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${mollieKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            description: `DutyBoost Platform Fee — ${monthLabel} — ${data.name}`,
            amount: { currency: 'EUR', value: amount.toFixed(2) },
            redirectUrl: 'https://dutyboost.com/retailer-portal',
            webhookUrl: 'https://dutyboost.com/api/functions/mollieInvoiceWebhook',
            allowedMethods: ['ideal', 'bancontact', 'banktransfer'],
            expiresAt: `${dueDateStr}T23:59:59+00:00`,
            metadata: {
              retailer_email: ownerEmail,
              invoice_month_year: prevMonthStr,
            },
          }),
        });
        if (mollieRes.ok) {
          const mollieData = await mollieRes.json();
          paymentLinkUrl = mollieData._links?.paymentLink?.href;
        } else {
          const err = await mollieRes.text();
          console.error('Mollie payment link creation failed:', err);
        }
      }

      // Send invoice email
      const invoiceEmail = ownerEmail;
      if (postmarkToken && invoiceEmail) {
        const payNowButton = paymentLinkUrl
          ? `<div style="text-align: center; margin: 28px 0;">
               <a href="${paymentLinkUrl}" style="display: inline-block; background: #1e40af; color: #ffffff; font-size: 16px; font-weight: 700; padding: 14px 36px; border-radius: 8px; text-decoration: none; letter-spacing: 0.3px;">
                 💳 Pay now — iDEAL / Bancontact / Bank Transfer
               </a>
               <p style="margin: 10px 0 0; font-size: 12px; color: #6b7280;">Secure payment via Mollie. Link expires ${dueDateStr}.</p>
             </div>`
          : `<div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
               <p style="margin: 0 0 8px; font-weight: 600; color: #1e40af; font-size: 14px;">Payment Details</p>
               <p style="margin: 0; color: #1e40af; font-size: 13px; line-height: 1.7;">
                 Please contact <a href="mailto:hello@dutyboost.com">hello@dutyboost.com</a> to arrange payment.<br/>
                    Reference: <strong>INV-${prevMonthStr}-${ownerEmail.split('@')[0].toUpperCase()}</strong>
               </p>
             </div>`;

        await fetch('https://api.postmarkapp.com/email', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-Postmark-Server-Token': postmarkToken,
          },
          body: JSON.stringify({
            From: 'hello@dutyboost.com',
            To: invoiceEmail,
            Subject: `DutyBoost Invoice — ${monthLabel} — €${amount.toFixed(2)}`,
            HtmlBody: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 16px;">
                <div style="text-align: center; margin-bottom: 32px;">
                  <div style="font-size: 22px; font-weight: 800; color: #1e40af;">DutyBoost</div>
                  <div style="font-size: 12px; color: #9ca3af; margin-top: 2px;">The Circular Revenue Infrastructure for Global Travel</div>
                </div>

                <div style="background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 32px;">
                  <div style="display: flex; justify-content: space-between; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid #e5e7eb;">
                    <div>
                      <div style="font-size: 18px; font-weight: 700;">Invoice</div>
                      <div style="color: #6b7280; font-size: 13px; margin-top: 2px;">Period: ${monthLabel}</div>
                    </div>
                    <div style="text-align: right;">
                      <div style="font-size: 13px; color: #6b7280;">Invoice date: ${invoiceDateStr}</div>
                      <div style="font-size: 13px; color: #6b7280;">Due date: <strong style="color: #dc2626;">${dueDateStr}</strong></div>
                    </div>
                  </div>

                  <p style="color: #374151; font-size: 14px; margin: 0 0 16px;">Dear <strong>${data.name}</strong>,</p>
                  <p style="color: #374151; font-size: 14px; margin: 0 0 24px; line-height: 1.6;">
                    Please find below your DutyBoost platform fee invoice for <strong>${monthLabel}</strong>,
                    based on DutyCredit vouchers redeemed at your store(s) during this period.
                  </p>

                  <table width="100%" style="border: 1px solid #e5e7eb; border-radius: 8px; border-collapse: collapse; overflow: hidden; margin-bottom: 8px;">
                    <thead>
                      <tr style="background: #f9fafb;">
                        <th style="text-align: left; padding: 10px 16px; font-size: 13px; color: #374151;">Description</th>
                        <th style="text-align: right; padding: 10px 16px; font-size: 13px; color: #374151;">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style="padding: 12px 16px; font-size: 14px; color: #374151;">DutyBoost Platform Fee — ${monthLabel}<br/>
                          <span style="font-size: 12px; color: #6b7280;">2.5% of gross DutyCredit redemption value at your store(s), capped at €25 per transaction</span>
                        </td>
                        <td style="padding: 12px 16px; font-size: 14px; font-weight: 700; color: #1e40af; text-align: right;">€${amount.toFixed(2)}</td>
                      </tr>
                    </tbody>
                  </table>

                  ${payNowButton}

                  <p style="margin: 0; font-size: 12px; color: #9ca3af; border-top: 1px solid #e5e7eb; padding-top: 16px;">
                    DutyBoost B.V. · Amsterdam, The Netherlands · KVK: 94891234 · VAT: NL866038978B01 · hello@dutyboost.com<br/>
                    Questions? Reply to this email or contact <a href="mailto:hello@dutyboost.com" style="color:#1e40af;">hello@dutyboost.com</a>
                  </p>
                </div>
              </div>
            `,
            MessageStream: 'outbound',
          }),
        });
      }
    }

    console.log(`generateMonthlyInvoices: created ${created} invoices for ${prevMonthStr}`);
    return Response.json({ success: true, created, month: prevMonthStr });

  } catch (error) {
    console.error('generateMonthlyInvoices error:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});