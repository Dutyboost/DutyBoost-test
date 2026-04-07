import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (user?.role !== 'admin') {
      return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

    const oldLeads = await base44.asServiceRole.entities.Lead.filter(
      { created_date: { $lt: ninetyDaysAgo.toISOString() } },
      '-created_date',
      1000
    );

    if (oldLeads.length === 0) {
      return Response.json({ message: 'No old leads to delete', deleted: 0 });
    }

    for (const lead of oldLeads) {
      await base44.asServiceRole.entities.Lead.delete(lead.id);
    }

    return Response.json({
      message: `Successfully deleted ${oldLeads.length} leads older than 90 days`,
      deleted: oldLeads.length,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});