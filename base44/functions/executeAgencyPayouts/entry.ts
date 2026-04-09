import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    // Runs as scheduled automation — no user auth required

    const mollieApiKey = Deno.env.get('MOLLIE_API_KEY');
    if (!mollieApiKey) {
      return Response.json({ error: 'Mollie API key not configured' }, { status: 500 });
    }

    // Get all pending invoices (payout statements)
    const invoices = await base44.asServiceRole.entities.MonthlyInvoice.filter({
      status: 'pending',
    });

    if (invoices.length === 0) {
      return Response.json({ success: true, message: 'No pending payouts to execute' });
    }

    // Get agency details for bank info
    const agencies = await base44.asServiceRole.entities.SignupApplication.filter({
      business_type: 'Travel Agency',
    });

    const agencyMap = {};
    agencies.forEach(a => {
      agencyMap[a.email] = { name: a.company, iban: a.bank_iban };
    });

    const results = [];

    // Execute each payout via Mollie
    for (const invoice of invoices) {
      try {
        const agencyInfo = agencyMap[invoice.retailer_email];
        if (!agencyInfo || !agencyInfo.iban) {
          results.push({ email: invoice.retailer_email, status: 'skipped', reason: 'Missing bank details' });
          continue;
        }

        // Create payout via Mollie Payouts API
        const payoutRes = await fetch('https://api.mollie.com/v2/payouts', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${mollieApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: { currency: 'EUR', value: invoice.amount.toFixed(2) },
            description: `DutyCredit Commission - ${invoice.month_year}`,
            destination: {
              type: 'bank-account',
              beneficiary_name: agencyInfo.name,
              country: 'NL',
              iban: agencyInfo.iban,
            },
            reference: `DUTY-${invoice.id}`,
          }),
        });

        const payout = await payoutRes.json();

        if (payoutRes.ok && payout.id) {
          // Mark invoice as paid
          await base44.asServiceRole.entities.MonthlyInvoice.update(invoice.id, {
            status: 'paid',
          });
          results.push({ email: invoice.retailer_email, status: 'success', payoutId: payout.id, amount: invoice.amount });
        } else {
          results.push({ email: invoice.retailer_email, status: 'failed', reason: payout.detail || 'Mollie error' });
        }
      } catch (error) {
        results.push({ email: invoice.retailer_email, status: 'error', reason: error.message });
      }
    }

    return Response.json({ success: true, results });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});