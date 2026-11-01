import { createClientFromRequest } from 'npm:@base44/sdk@0.8.54';

/**
 * Public traveller lookup: reopen a DutyCredit pass from the code printed on it.
 *
 * No sign-in: the DutyCredit code itself is the credential (DB-XXXXXX-XXX,
 * ~1e14 combinations). Exact match only — no listing, no search by email.
 * Returns only the fields the pass needs, never traveller contact details.
 */
export default async function (req) {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json().catch(() => ({}));
    const raw = typeof body.token_id === 'string' ? body.token_id.trim().toUpperCase().replace(/\s+/g, '') : '';

    if (!raw) {
      return Response.json({ error: 'DutyCredit code is required' }, { status: 400 });
    }
    if (!/^DB-[A-Z0-9]{6}-[A-Z0-9]{3}$/.test(raw)) {
      return Response.json({ error: 'That code format is not valid' }, { status: 400 });
    }

    const matches = await base44.asServiceRole.entities.DutyCreditToken.filter({ token_id: raw });
    const token = matches[0];

    if (!token) {
      return Response.json({ error: 'Not found' }, { status: 404 });
    }

    const expired = token.expiry && new Date(token.expiry).getTime() < Date.now();
    const status = token.status === 'active' && expired ? 'expired' : token.status;

    return Response.json({
      success: true,
      token_id: token.token_id,
      qr_image_url: `https://api.qrserver.com/v1/create-qr-code/?size=300x300&margin=10&data=${encodeURIComponent(token.qr_token)}`,
      airport: token.airport,
      expiry: token.expiry,
      status,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}