import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const today = new Date().toISOString().substring(0, 10);

    const invoices = await base44.asServiceRole.entities.MonthlyInvoice.filter({ status: 'pending' });

    let updated = 0;
    for (const inv of invoices) {
      if (inv.due_date < today) {
        await base44.asServiceRole.entities.MonthlyInvoice.update(inv.id, { status: 'overdue' });
        updated++;
      }
    }

    return Response.json({ success: true, overdue_marked: updated });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});