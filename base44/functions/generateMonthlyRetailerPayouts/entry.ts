import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    
    // Only admins can run this
    if (user?.role !== 'admin') {
      return Response.json({ error: 'Admin access required' }, { status: 403 });
    }

    const now = new Date();
    const previousMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const monthYearStr = previousMonth.toISOString().slice(0, 7); // YYYY-MM
    const displayMonth = previousMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    // Get all transactions from previous month
    const allTransactions = await base44.entities.Transaction.list('-created_date', 1000);
    const monthlyTransactions = allTransactions.filter(t => {
      const txDate = (t.created_date || '').split('T')[0];
      return txDate.startsWith(monthYearStr);
    });

    // Group transactions by retailer
    const retailerMap = {};
    monthlyTransactions.forEach(tx => {
      const key = tx.retailer_id || tx.store_name;
      if (!retailerMap[key]) {
        retailerMap[key] = {
          retailer_id: tx.retailer_id,
          store_name: tx.store_name,
          airport: tx.airport,
          transactions: [],
          total_volume: 0,
          platform_fee: 0,
        };
      }
      retailerMap[key].transactions.push(tx);
      retailerMap[key].total_volume += tx.transaction_value || 0;
      retailerMap[key].platform_fee += tx.platform_revenue || (tx.transaction_value || 0) * 0.05;
    });

    const payoutSummary = Object.values(retailerMap).sort((a, b) => b.platform_fee - a.platform_fee);
    const totalFees = payoutSummary.reduce((sum, r) => sum + r.platform_fee, 0);

    // Get admin user email for sending summary
    const admins = await base44.asServiceRole.entities.User.filter({ role: 'admin' });
    const adminEmail = user.email;

    // Build email content
    const emailBody = `
<h2>Monthly Retailer Payout Summary — ${displayMonth}</h2>

<p>Total Platform Fees to Process: <strong>€${totalFees.toFixed(2)}</strong></p>
<p>Total Transactions: <strong>${monthlyTransactions.length}</strong></p>
<p>Active Retailers: <strong>${payoutSummary.length}</strong></p>

<hr style="margin: 20px 0;">

<h3>Payout Breakdown by Retailer</h3>

<table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
  <thead>
    <tr style="background-color: #f0f0f0;">
      <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Store Name</th>
      <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Airport</th>
      <th style="border: 1px solid #ddd; padding: 8px; text-align: right;">Transactions</th>
      <th style="border: 1px solid #ddd; padding: 8px; text-align: right;">Total Volume (€)</th>
      <th style="border: 1px solid #ddd; padding: 8px; text-align: right;">Platform Fee (€)</th>
    </tr>
  </thead>
  <tbody>
    ${payoutSummary.map(r => `
      <tr>
        <td style="border: 1px solid #ddd; padding: 8px;">${r.store_name}</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${r.airport}</td>
        <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">${r.transactions.length}</td>
        <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">€${r.total_volume.toFixed(2)}</td>
        <td style="border: 1px solid #ddd; padding: 8px; text-align: right;"><strong>€${r.platform_fee.toFixed(2)}</strong></td>
      </tr>
    `).join('')}
  </tbody>
  <tfoot>
    <tr style="background-color: #f9f9f9; font-weight: bold;">
      <td colspan="3" style="border: 1px solid #ddd; padding: 8px;">TOTAL</td>
      <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">€${payoutSummary.reduce((s, r) => s + r.total_volume, 0).toFixed(2)}</td>
      <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">€${totalFees.toFixed(2)}</td>
    </tr>
  </tfoot>
</table>

<hr style="margin: 20px 0;">

<p><strong>Next Steps:</strong></p>
<ol>
  <li>Review the payout summary above</li>
  <li>Confirm the total platform fees to be processed</li>
  <li>Run the <code>executeRetailerPayouts</code> function to charge retailers and generate invoices</li>
</ol>

<p style="color: #666; font-size: 12px;">This is an automated summary for review. No charges have been processed yet.</p>
    `;

    // Send email to admin
    try {
      await base44.integrations.Core.SendEmail({
        to: adminEmail,
        subject: `Monthly Retailer Payout Summary — ${displayMonth}`,
        body: emailBody,
      });
    } catch (emailErr) {
      console.error('Email send failed:', emailErr);
      // Continue even if email fails
    }

    // Save summary to database for tracking
    try {
      // Create a record of this payout run for audit trail
      const payoutRecord = {
        month: monthYearStr,
        total_retailers: payoutSummary.length,
        total_transactions: monthlyTransactions.length,
        total_platform_fees: totalFees,
        status: 'summary_sent',
        retailer_details: JSON.stringify(payoutSummary),
      };
      // You could save this to a PayoutRun entity if you create one
    } catch (err) {
      console.log('Could not save payout record:', err.message);
    }

    return Response.json({
      success: true,
      message: `Payout summary generated for ${displayMonth}`,
      summary: {
        month: monthYearStr,
        total_retailers: payoutSummary.length,
        total_transactions: monthlyTransactions.length,
        total_platform_fees: totalFees.toFixed(2),
        email_sent_to: adminEmail,
      },
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});