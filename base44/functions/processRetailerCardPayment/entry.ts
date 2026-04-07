import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json();
    
    const { cardNumber, cardName, expiryDate, cvv, applicationId } = body;
    
    if (!cardNumber || !cardName || !expiryDate || !cvv || !applicationId) {
      return Response.json({ error: 'Missing required card details' }, { status: 400 });
    }

    // Parse expiry date (MM/YY format)
    const [month, year] = expiryDate.split('/');
    const expiryYear = `20${year}`;

    // Call Mollie API to create a payment with card details
    const mollieResponse = await fetch('https://api.mollie.com/v2/payments', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('MOLLIE_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: {
          value: '0.01',
          currency: 'EUR',
        },
        description: 'Card verification charge - Airport Retailer',
        redirectUrl: `${body.redirectUrl || 'https://dutyboost.com'}`,
        method: 'creditcard',
        cardToken: cardNumber, // This would need to be tokenized in production
        // In production, you should tokenize the card first through Mollie's secure endpoint
        // For now, we're sending basic card info
      }),
    });

    const mollieData = await mollieResponse.json();

    if (!mollieResponse.ok) {
      return Response.json(
        { error: 'Payment processing failed', details: mollieData },
        { status: 400 }
      );
    }

    // Store the Mollie payment ID in the application
    await base44.asServiceRole.entities.SignupApplication.update(applicationId, {
      mollie_payment_id: mollieData.id,
    });

    return Response.json({
      success: true,
      paymentId: mollieData.id,
      status: mollieData.status,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});