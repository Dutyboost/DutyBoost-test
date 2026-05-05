import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    // Runs as scheduled automation — no user auth required

    // Get all confirmed redemptions from the previous month
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth(), 0);

    // Fetch all transactions from last month
    const transactions = await base44.asServiceRole.entities.Transaction.filter({});
    
    const lastMonthTransactions = transactions.filter(t => {
      const txDate = new Date(t.created_date);
      return txDate >= startOfMonth && txDate <= endOfMonth;
    });

    // Group by agency_email and sum agency_commission (20% of platform_revenue, capped at €5)
    const agencyCommissions = {};
    lastMonthTransactions.forEach(tx => {
      if (!tx.agency_email) return;
      if (!agencyCommissions[tx.agency_email]) {
        agencyCommissions[tx.agency_email] = { amount: 0, count: 0 };
      }
      // Prefer stored agency_commission; fall back to 20% of platform_revenue (capped at €5)
      const commission = tx.agency_commission != null
        ? tx.agency_commission
        : Math.min(Math.min(tx.transaction_value * 0.025, 25) * 0.20, 5);
      agencyCommissions[tx.agency_email].amount += commission;
      agencyCommissions[tx.agency_email].count += 1;
    });

    // Get all approved agencies
    const agencies = await base44.asServiceRole.entities.SignupApplication.filter({
      business_type: 'Travel Partner',
      status: 'invited',
    });

    const payoutDate = new Date();
    // month is the previous month (this runs at start of current month)
    const prevMonth = new Date(payoutDate.getFullYear(), payoutDate.getMonth() - 1, 1);
    const monthYear = `${prevMonth.getFullYear()}-${String(prevMonth.getMonth() + 1).padStart(2, '0')}`;
    // due date = invoice date + 14 days
    const dueDate = new Date(payoutDate);
    dueDate.setDate(dueDate.getDate() + 14);

    // Create monthly invoices (commission statements), skip duplicates
    const invoicesToCreate = [];
    for (const agency of agencies) {
      if (!agency.email || !agencyCommissions[agency.email]) continue;
      // Duplicate guard
      const existing = await base44.asServiceRole.entities.MonthlyInvoice.filter({
        retailer_email: agency.email,
        month_year: monthYear,
      });
      if (existing.length > 0) continue;
      invoicesToCreate.push({
        retailer_email: agency.email, // reusing field for agency email
        retailer_name: agency.company,
        amount: parseFloat(agencyCommissions[agency.email].amount.toFixed(2)),
        month_year: monthYear,
        invoice_date: payoutDate.toISOString().split('T')[0],
        due_date: dueDate.toISOString().split('T')[0],
        status: 'pending',
      });
    }

    if (invoicesToCreate.length > 0) {
      await base44.asServiceRole.entities.MonthlyInvoice.bulkCreate(invoicesToCreate);
    }
    const invoices = invoicesToCreate;

    return Response.json({ 
      success: true, 
      message: `Generated ${invoices.length} payout statements for agencies`,
      invoices 
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});