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

    // Group by agency_email and calculate commission (1% of transaction value)
    const agencyCommissions = {};
    lastMonthTransactions.forEach(tx => {
      if (!tx.agency_email) return;
      if (!agencyCommissions[tx.agency_email]) {
        agencyCommissions[tx.agency_email] = { amount: 0, count: 0 };
      }
      agencyCommissions[tx.agency_email].amount += tx.agency_commission || Math.min(tx.transaction_value * 0.005, 5);
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
    const dueDate = new Date(payoutDate.getFullYear(), payoutDate.getMonth() + 1, 14);

    // Create monthly invoices (commission statements)
    const invoices = agencies
      .filter(a => a.email && agencyCommissions[a.email])
      .map(a => ({
        retailer_email: a.email, // Reusing field for agency email
        retailer_name: a.company,
        amount: agencyCommissions[a.email].amount,
        month_year: monthYear,
        invoice_date: payoutDate.toISOString().split('T')[0],
        due_date: dueDate.toISOString().split('T')[0],
        status: 'pending',
      }));

    if (invoices.length > 0) {
      await base44.asServiceRole.entities.MonthlyInvoice.bulkCreate(invoices);
    }

    return Response.json({ 
      success: true, 
      message: `Generated ${invoices.length} payout statements for agencies`,
      invoices 
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});