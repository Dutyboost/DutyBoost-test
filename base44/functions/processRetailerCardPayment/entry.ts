import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

// Creates a Mollie hosted checkout for credit card — retailer flow.
// Raw card details must NEVER be sent to backend (PCI). Mollie handles card entry on their hosted page.
Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json();

    const { applicationId, redirectUrl, email, fullName } = body;

    if (!applicationId || !redirectUrl || !email || !fullName) {
      return Response.json({ error: 'Missing required fields: applicationId, redirectUrl, email, fullName' }, { status: 400 });
    }

    const mollieApiKey = Deno.env.get('MOLLIE_API_KEY');
    if (!mollieApiKey) {
      return Response.json({ error: 'Mollie API key not configured' }, { status: 500 });
    }

    // Step 1: Create or reuse Mollie customer
    const customerRes = await fetch('https://api.mollie.com/v2/customers', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${mollieApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: fullName, email }),
    });
    const customer = await customerRes.json();

    if (!customerRes.ok) {
      return Response.json({ error: customer.detail || 'Failed to create Mollie customer' }, { status: 500 });
    }

    // Step 2: Create a first payment (€0.01 verification) via Mollie hosted checkout
    // sequenceType: 'first' establishes a mandate for future recurring charges
    const paymentRes = await fetch('https://api.mollie.com/v2/payments', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${mollieApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: { currency: 'EUR', value: '0.01' },
        description: 'DutyBoost card verification & billing mandate — Airport Retailer',
        method: 'creditcard',
        sequenceType: 'first',
        customerId: customer.id,
        redirectUrl: `${redirectUrl}?applicationId=${applicationId}&customerId=${customer.id}`,
        metadata: { applicationId, customerId: customer.id },
      }),
    });
    const payment = await paymentRes.json();

    if (!paymentRes.ok) {
      return Response.json({ error: payment.detail || 'Failed to create payment' }, { status: 500 });
    }

    // Step 3: Save customer/payment IDs to the application
    await base44.asServiceRole.entities.SignupApplication.update(applicationId, {
      mollie_customer_id: customer.id,
      mollie_payment_id: payment.id,
      payment_method: 'creditcard',
    });

    return Response.json({
      success: true,
      checkoutUrl: payment._links.checkout.href,
      paymentId: payment.id,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});