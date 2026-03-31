import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { applicationId, paymentMethod, redirectUrl, email, fullName } = await req.json();

    if (!applicationId || !paymentMethod || !redirectUrl) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const mollieApiKey = Deno.env.get('MOLLIE_API_KEY');
    if (!mollieApiKey) {
      return Response.json({ error: 'Mollie API key not configured' }, { status: 500 });
    }

    // Create or get Mollie customer
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

    // Create first payment to establish mandate (€0.01 verification)
    const paymentBody = {
      amount: { currency: 'EUR', value: '0.01' },
      description: 'DutyBoost account verification & billing mandate setup',
      sequenceType: 'first',
      customerId: customer.id,
      redirectUrl: `${redirectUrl}?applicationId=${applicationId}&customerId=${customer.id}`,
      webhookUrl: null,
      method: paymentMethod,
      metadata: { applicationId, customerId: customer.id },
    };

    const paymentRes = await fetch('https://api.mollie.com/v2/payments', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${mollieApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentBody),
    });
    const payment = await paymentRes.json();

    if (!paymentRes.ok) {
      return Response.json({ error: payment.detail || 'Failed to create Mollie payment' }, { status: 500 });
    }

    // Save the Mollie customer ID to the application
    await base44.asServiceRole.entities.SignupApplication.update(applicationId, {
      mollie_customer_id: customer.id,
      mollie_payment_id: payment.id,
    });

    return Response.json({ checkoutUrl: payment._links.checkout.href, paymentId: payment.id });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});