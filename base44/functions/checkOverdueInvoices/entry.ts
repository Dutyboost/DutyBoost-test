import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    // This function runs as a scheduled automation (no user session).
    // Auth check is skipped; it uses service role throughout.
    const today = new Date().toISOString().substring(0, 10);

    const invoices = await base44.asServiceRole.entities.MonthlyInvoice.filter({ status: 'pending' });

    // Only mark RETAILER invoices as overdue — agency payout statements share the same entity
    // and should never be marked overdue (they are processed by executeAgencyPayouts)
    const agencyApps = await base44.asServiceRole.entities.SignupApplication.filter({ business_type: 'Travel Partner' });
    const agencyEmails = new Set(agencyApps.map(a => a.email));

    let updated = 0;
    for (const inv of invoices) {
      if (agencyEmails.has(inv.retailer_email)) continue; // skip agency payout statements
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