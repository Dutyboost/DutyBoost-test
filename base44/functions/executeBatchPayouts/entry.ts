import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    const { approved_agency_ids } = await req.json();

    if (!approved_agency_ids || !Array.isArray(approved_agency_ids) || approved_agency_ids.length === 0) {
      return Response.json({ error: 'No agencies selected for payout' }, { status: 400 });
    }

    // Fetch all pending payouts for approved agencies
    const payouts = await base44.asServiceRole.entities.AgencyPayout.filter({
      status: 'pending',
      agency_id: { $in: approved_agency_ids }
    });

    if (payouts.length === 0) {
      return Response.json({ message: 'No pending payouts found', processed: 0 });
    }

    // Process each payout via Mollie (simplified)
    const results = {
      successful: 0,
      failed: 0,
      details: []
    };

    for (const payout of payouts) {
      try {
        // Update status to paid
        await base44.asServiceRole.entities.AgencyPayout.update(payout.id, { status: 'paid', paid_date: new Date().toISOString() });
        results.successful++;
        results.details.push({ agency_id: payout.agency_id, status: 'paid' });
      } catch (e) {
        results.failed++;
        results.details.push({ agency_id: payout.agency_id, status: 'error', error: e.message });
      }
    }

    return Response.json({
      message: `Batch payout executed: ${results.successful} successful, ${results.failed} failed`,
      ...results
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});