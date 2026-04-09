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

    const { action, mollie_customer_id } = await req.json();

    if (action === 'create') {
      // Create a Mollie customer for this user
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
      if (!customerRes.ok) {
        return Response.json({ error: customer.detail || 'Failed to create customer' }, { status: 500 });
      }
      return Response.json({ customer_id: customer.id });
    }

    if (action === 'get_card') {
      if (!mollie_customer_id) {
        return Response.json({ error: 'Missing mollie_customer_id' }, { status: 400 });
      }

      // Fetch mandates for this customer — mandates are created after first payment is completed
      const mandateRes = await fetch(`${MOLLIE_BASE}/customers/${mollie_customer_id}/mandates`, {
        headers: { 'Authorization': `Bearer ${MOLLIE_API_KEY}` },
      });
      const mandateData = await mandateRes.json();

      if (!mandateRes.ok) {
        return Response.json({ error: mandateData.detail || 'Failed to fetch mandates' }, { status: 500 });
      }

      // Find the first valid (pending or valid) creditcard mandate
      const mandates = mandateData._embedded?.mandates || [];
      const cardMandate = mandates.find(m => m.method === 'creditcard' && (m.status === 'valid' || m.status === 'pending'));

      return Response.json({
        customer_id: mollie_customer_id,
        card: cardMandate ? {
          holder_name: cardMandate.details?.cardHolder || '—',
          last_four: cardMandate.details?.cardNumber?.slice(-4) || '—',
          expiry: cardMandate.details?.cardExpiryDate || '—',
          status: cardMandate.status,
        } : null,
      });
    }

    return Response.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});