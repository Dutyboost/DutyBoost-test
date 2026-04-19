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

    // Build lookup: owner_email -> invoice email (from application bank_account_name field which stores invoice email)
    const invoiceEmailMap = {};
    for (const app of applications) {
      if (app.email) {
        // invoice email stored in bank_account_name for self_pay_invoice retailers
        invoiceEmailMap[app.email] = app.bank_account_name || app.email;
      }
    }

    // Group platform_revenue by retailer owner_email for prev month
    const retailerMap = {};
    for (const r of retailers) {
      if (!retailerMap[r.owner_email]) {
        retailerMap[r.owner_email] = { name: r.store_name, total: 0 };
      }
    }

    for (const t of transactions) {
      const txnDate = t.created_date?.substring(0, 7);
      if (txnDate !== prevMonthStr) continue;
      const retailer = retailers.find(r => r.store_name === t.store_name);
      if (!retailer) continue;
      retailerMap[retailer.owner_email].total += (t.platform_revenue || 0);
    }

    const postmarkToken = Deno.env.get('PostMark');
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

      // Send invoice email
      const invoiceEmail = invoiceEmailMap[ownerEmail] || ownerEmail;
      if (postmarkToken && invoiceEmail) {
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
                  <div style="font-size: 12px; color: #9ca3af; margin-top: 2px;">Travel Retail Conversion Platform</div>
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

                  <table width="100%" style="border: 1px solid #e5e7eb; border-radius: 8px; border-collapse: collapse; overflow: hidden; margin-bottom: 24px;">
                    <thead>
                      <tr style="background: #f9fafb;">
                        <th style="text-align: left; padding: 10px 16px; font-size: 13px; color: #374151;">Description</th>
                        <th style="text-align: right; padding: 10px 16px; font-size: 13px; color: #374151;">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style="padding: 12px 16px; font-size: 14px; color: #374151;">DutyBoost Platform Fee — ${monthLabel}<br/>
                          <span style="font-size: 12px; color: #6b7280;">2.5% of gross DutyCredit redemption value at your store(s)</span>
                        </td>
                        <td style="padding: 12px 16px; font-size: 14px; font-weight: 700; color: #1e40af; text-align: right;">€${amount.toFixed(2)}</td>
                      </tr>
                    </tbody>
                  </table>

                  <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
                    <p style="margin: 0 0 8px; font-weight: 600; color: #1e40af; font-size: 14px;">Payment Details</p>
                    <p style="margin: 0; color: #1e40af; font-size: 13px; line-height: 1.7;">
                      Bank: <strong>ING Bank N.V.</strong><br/>
                      Account holder: <strong>DutyBoost B.V.</strong><br/>
                      IBAN: <strong>NL91 INGB 0001 2345 67</strong><br/>
                      Reference: <strong>INV-${prevMonthStr}-${ownerEmail.split('@')[0].toUpperCase()}</strong>
                    </p>
                    <p style="margin: 12px 0 0; color: #374151; font-size: 12px;">
                      Please pay within <strong>14 days</strong> (by ${dueDateStr}). 
                      If you have any questions, reply to this email or contact <a href="mailto:hello@dutyboost.com" style="color:#1e40af;">hello@dutyboost.com</a>.
                    </p>
                  </div>

                  <p style="margin: 0; font-size: 12px; color: #9ca3af; border-top: 1px solid #e5e7eb; padding-top: 16px;">
                    DutyBoost B.V. · Amsterdam, The Netherlands · KVK: 94891234 · VAT: NL866038978B01 · hello@dutyboost.com
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