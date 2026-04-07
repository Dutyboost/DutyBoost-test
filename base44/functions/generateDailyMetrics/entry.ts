import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    
    if (user?.role !== 'admin') {
      return Response.json({ error: 'Admin access required' }, { status: 403 });
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const dateStr = yesterday.toISOString().split('T')[0];

    // Get all transactions from yesterday
    const allTransactions = await base44.asServiceRole.entities.Transaction.list('-created_date', 100000);
    const dayTransactions = allTransactions.filter(t => {
      const txDate = (t.created_date || '').split('T')[0];
      return txDate === dateStr;
    });

    if (dayTransactions.length === 0) {
      return Response.json({ message: 'No transactions to aggregate' });
    }

    // Group by retailer and aggregate
    const aggregateMap = {};
    dayTransactions.forEach(tx => {
      const key = `${tx.retailer_id || tx.store_name}|${tx.airport}`;
      if (!aggregateMap[key]) {
        aggregateMap[key] = {
          date: dateStr,
          retailer_id: tx.retailer_id,
          store_name: tx.store_name,
          airport: tx.airport,
          transaction_count: 0,
          total_volume: 0,
          total_discount: 0,
          platform_revenue: 0,
        };
      }
      aggregateMap[key].transaction_count += 1;
      aggregateMap[key].total_volume += tx.transaction_value || 0;
      aggregateMap[key].total_discount += (tx.discount_amount || 0);
      aggregateMap[key].platform_revenue += tx.platform_revenue || (tx.transaction_value || 0) * 0.05;
    });

    // Bulk create aggregates
    const aggregates = Object.values(aggregateMap);
    if (aggregates.length > 0) {
      await base44.asServiceRole.entities.TransactionAggregate.bulkCreate(aggregates);
    }

    // Clean up old raw transactions (keep last 90 days)
    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
    const oldDateStr = ninetyDaysAgo.toISOString().split('T')[0];
    
    const oldTransactions = allTransactions.filter(t => {
      const txDate = (t.created_date || '').split('T')[0];
      return txDate < oldDateStr;
    });

    if (oldTransactions.length > 0) {
      for (const tx of oldTransactions.slice(0, 1000)) {
        try {
          await base44.asServiceRole.entities.Transaction.delete(tx.id);
        } catch (e) {
          // Continue on delete failures
        }
      }
    }

    return Response.json({
      success: true,
      date: dateStr,
      aggregates_created: aggregates.length,
      old_transactions_deleted: Math.min(oldTransactions.length, 1000),
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});