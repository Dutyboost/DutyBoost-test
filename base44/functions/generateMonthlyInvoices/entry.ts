import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (user?.role !== 'admin') {
      return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    // Get all retailers and transactions from previous month
    const now = new Date();
    const prevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const prevMonthStr = `${prevMonth.getFullYear()}-${String(prevMonth.getMonth() + 1).padStart(2, '0')}`;

    const [retailers, transactions, applications] = await Promise.all([
      base44.asServiceRole.entities.Retailer.list(),
      base44.asServiceRole.entities.Transaction.list(),
      base44.asServiceRole.entities.SignupApplication.filter({ payment_method: 'monthly_invoice' }),
    ]);

    // Only generate for retailers who chose monthly invoice
    const monthlyInvoiceEmails = new Set(applications.map(a => a.email));

    // Group transactions by retailer owner_email
    const retailerMap = {};
    for (const r of retailers) {
      if (!monthlyInvoiceEmails.has(r.owner_email)) continue;
      if (!retailerMap[r.owner_email]) {
        retailerMap[r.owner_email] = { name: r.store_name, total: 0 };
      }
    }

    for (const t of transactions) {
      const txnDate = t.created_date?.substring(0, 7);
      if (txnDate !== prevMonthStr) continue;
      const retailer = retailers.find(r => r.store_name === t.store_name);
      if (!retailer || !monthlyInvoiceEmails.has(retailer.owner_email)) continue;
      retailerMap[retailer.owner_email].total += (t.platform_revenue || 0);
    }

    const invoiceDate = new Date(now.getFullYear(), now.getMonth(), 1);
    const dueDate = new Date(invoiceDate);
    dueDate.setDate(dueDate.getDate() + 14);

    const invoiceDateStr = invoiceDate.toISOString().substring(0, 10);
    const dueDateStr = dueDate.toISOString().substring(0, 10);

    let created = 0;
    for (const [email, data] of Object.entries(retailerMap)) {
      if (data.total <= 0) continue;
      // Don't duplicate
      const existing = await base44.asServiceRole.entities.MonthlyInvoice.filter({ retailer_email: email, month_year: prevMonthStr });
      if (existing.length > 0) continue;

      await base44.asServiceRole.entities.MonthlyInvoice.create({
        retailer_email: email,
        retailer_name: data.name,
        amount: parseFloat(data.total.toFixed(2)),
        month_year: prevMonthStr,
        invoice_date: invoiceDateStr,
        due_date: dueDateStr,
        status: 'pending',
      });
      created++;
    }

    return Response.json({ success: true, created, month: prevMonthStr });
  } catch (error) {
    console.error(error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});