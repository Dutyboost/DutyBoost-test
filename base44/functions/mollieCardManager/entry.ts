import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

const MOLLIE_API_KEY = Deno.env.get('MOLLIE_API_KEY');
const MOLLIE_BASE = 'https://api.mollie.com/v2';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { action, mollie_customer_id, card_name, card_number, card_expiry } = await req.json();

    if (action === 'create') {
      // Create Mollie customer
      const customerRes = await fetch(`${MOLLIE_BASE}/customers`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${MOLLIE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: user.full_name,
          email: user.email,
        }),
      });
      const customer = await customerRes.json();
      return Response.json({ customer_id: customer.id });
    }

    if (action === 'get_card') {
      // Get card details from Mollie customer
      const custRes = await fetch(`${MOLLIE_BASE}/customers/${mollie_customer_id}`, {
        headers: { 'Authorization': `Bearer ${MOLLIE_API_KEY}` },
      });
      const customer = await custRes.json();

      // Fetch methods (cards) for this customer
      const methodsRes = await fetch(`${MOLLIE_BASE}/customers/${mollie_customer_id}/methods?resource=customers`, {
        headers: { 'Authorization': `Bearer ${MOLLIE_API_KEY}` },
      });
      const methods = await methodsRes.json();

      const card = methods._embedded?.methods?.[0];
      return Response.json({
        customer_id: customer.id,
        card: card ? {
          holder_name: card.cardHolder || '—',
          last_four: card.details?.cardNumber?.slice(-4) || '—',
          expiry: card.details?.cardExpiry || '—',
        } : null,
      });
    }

    return Response.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});