/**
 * mollieInvoiceWebhook
 * Receives Mollie payment link status updates and marks the corresponding
 * MonthlyInvoice as 'paid' when payment is confirmed.
 *
 * Webhook URL to register: https://dutyboost.com/api/functions/mollieInvoiceWebhook
 */

import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.text();
    const params = new URLSearchParams(body);
    const id = params.get('id'); // Mollie sends the payment link payment id

    if (!id) {
      return Response.json({ error: 'Missing id' }, { status: 400 });
    }

    const mollieKey = Deno.env.get('MOLLIE_API_KEY');

    // Fetch payment status from Mollie
    const mollieRes = await fetch(`https://api.mollie.com/v2/payments/${id}`, {
      headers: { Authorization: `Bearer ${mollieKey}` },
    });

    if (!mollieRes.ok) {
      const err = await mollieRes.text();
      console.error('Mollie fetch error:', err);
      return Response.json({ error: 'Failed to fetch payment' }, { status: 500 });
    }

    const payment = await mollieRes.json();
    console.log(`Mollie webhook: payment ${id} status = ${payment.status}`);

    if (payment.status === 'paid') {
      // Extract our reference from the description: "INV-{month}-{ownerPrefix}"
      // or from metadata we stored when creating the payment link
      const metadata = payment.metadata || {};
      const invoiceId = metadata.invoice_month_year;
      const retailerEmail = metadata.retailer_email;

      if (invoiceId && retailerEmail) {
        const invoices = await base44.asServiceRole.entities.MonthlyInvoice.filter({
          retailer_email: retailerEmail,
          month_year: invoiceId,
        });
        if (invoices.length > 0) {
          await base44.asServiceRole.entities.MonthlyInvoice.update(invoices[0].id, {
            status: 'paid',
          });
          console.log(`Marked invoice ${invoices[0].id} as paid for ${retailerEmail}`);
        }
      }
    }

    // Mollie expects a 200 response
    return new Response('OK', { status: 200 });
  } catch (error) {
    console.error('mollieInvoiceWebhook error:', error.message);
    return new Response('OK', { status: 200 }); // Always return 200 to Mollie
  }
});