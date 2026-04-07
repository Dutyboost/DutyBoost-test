import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    // Admin-only function
    if (user?.role !== 'admin') {
      return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

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

    // Group by agency email and calculate commission
    const agencyCommissions = {};
    lastMonthTransactions.forEach(tx => {
      // Assuming SignupApplication links bookings to agencies
      if (!agencyCommissions[tx.voucher_code]) {
        agencyCommissions[tx.voucher_code] = { amount: 0, count: 0 };
      }
      // 20% of 5% platform fee = 1% of transaction value
      agencyCommissions[tx.voucher_code].amount += tx.transaction_value * 0.01;
      agencyCommissions[tx.voucher_code].count += 1;
    });

    // Get all approved agencies
    const agencies = await base44.asServiceRole.entities.SignupApplication.filter({
      business_type: 'Travel Agency',
      status: 'invited',
    });

    const payoutDate = new Date();
    const monthYear = `${payoutDate.getFullYear()}-${String(payoutDate.getMonth()).padStart(2, '0')}`;
    const dueDate = new Date(payoutDate.getFullYear(), payoutDate.getMonth() + 1, 14);

    // Create monthly invoices (commission statements)
    const invoices = agencies
      .filter(a => a.email && a.email in agencyCommissions)
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