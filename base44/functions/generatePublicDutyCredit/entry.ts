import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

/**
 * Zero-friction DutyCredit generation.
 *
 * Public endpoint — no auth required.
 *
 * Direct flow (no ref code):
 *   DutyBoost is the commission partner. Airline + booking number + departure date required.
 *
 * Partner flow (ref code present):
 *   Traveler provides flight_number + traveler_email for duplicate check.
 *   Airline + booking number + departure date also required.
 *   If a DutyCredit already exists for that email+flight combo,
 *   returns { already_exists: true } so the frontend can inform the traveler.
 *   Otherwise, generates a new DutyCredit with the partner as commission partner.
 *
 * Expiry is calculated as departure_date + 30 days (not generation date + 30).
 *
 * Also creates a Voucher record so the existing retailer redemption
 * flow (ScanVoucher / RetailerScanQR) works unchanged.
 */

function generateTokenId() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let id = 'DB-';
  for (let i = 0; i < 6; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  id += '-';
  for (let i = 0; i < 3; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}

function generateQrToken() {
  // A longer random string that goes into the QR — this is what the retailer scans
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let token = 'DB';
  for (let i = 0; i < 12; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
}

Deno.serve(async (req) => {
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

    const body = await req.json();
    const { airport, airline, departure_date, ref, traveler_email, flight_number, partner_booking_ref, campaign_source } = body;

    if (!airport) {
      return Response.json({ error: 'Airport is required' }, { status: 400 });
    }

    const isPartnerFlow = !!ref;

    // ── Duplicate check (partner flow only) ──────────────────────────
    // If a traveler arrives via a partner link and provides their flight
    // number + email, check whether they already have a DutyCredit for
    // that flight. If so, don't issue a second one.
    if (isPartnerFlow && traveler_email && flight_number) {
      const normalizedEmail = traveler_email.trim().toLowerCase();
      const normalizedFlight = flight_number.trim().toUpperCase().replace(/\s+/g, '');

      const existing = await base44.asServiceRole.entities.DutyCreditToken.filter({
        traveler_email: normalizedEmail,
        flight_number: normalizedFlight,
        status: { $in: ['active', 'redeemed'] },
      });

      if (existing.length > 0) {
        const existingToken = existing[0];
        return Response.json({
          success: false,
          already_exists: true,
          existing_token_id: existingToken.token_id,
          airport: existingToken.airport,
          message: 'You already have a DutyCredit for this flight.',
        });
      }
    }

    // ── Generate token ───────────────────────────────────────────────
    const tokenId = generateTokenId();
    const qrToken = generateQrToken();

    // Expiry: departure_date + 30 days (if departure date provided),
    // otherwise generation date + 30 days as fallback.
    let expiry;
    if (departure_date) {
      expiry = new Date(departure_date + 'T00:00:00Z');
      expiry.setDate(expiry.getDate() + 30);
    } else {
      expiry = new Date();
      expiry.setDate(expiry.getDate() + 30);
    }

    const source = isPartnerFlow ? 'partner' : 'dutyboost';
    const commissionPartner = isPartnerFlow ? ref : 'DutyBoost';

    const normalizedEmail = traveler_email ? traveler_email.trim().toLowerCase() : null;
    const normalizedFlight = flight_number ? flight_number.trim().toUpperCase().replace(/\s+/g, '') : null;

    // Create the DutyCreditToken record (session tracking + commission routing)
    await base44.asServiceRole.entities.DutyCreditToken.create({
      token_id: tokenId,
      qr_token: qrToken,
      airport,
      status: 'active',
      source,
      commission_partner: commissionPartner,
      ref_code: ref || null,
      partner_booking_ref: partner_booking_ref ? partner_booking_ref.trim().toUpperCase() : null,
      airline: airline ? airline.trim() : null,
      departure_date: departure_date || null,
      traveler_email: normalizedEmail,
      flight_number: normalizedFlight,
      campaign_source: campaign_source || null,
      expiry: expiry.toISOString(),
    });

    // Also create a Voucher so the existing retailer redemption flow works unchanged.
    // The Voucher's agency_email field carries the commission routing:
    //   - Direct flow → "dutyboost" → DutyBoost keeps the full commission
    //   - Partner flow → the partner's ref code → commission is shared
    await base44.asServiceRole.entities.Voucher.create({
      voucher_code: qrToken,
      booking_id: tokenId,
      discount_percentage: 0, // calculated at redemption based on basket value
      airport,
      expiration_date: expiry.toISOString().split('T')[0],
      status: 'active',
      agency_email: isPartnerFlow ? ref : 'dutyboost',
      traveler_email: normalizedEmail,
    });

    const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&margin=10&data=${encodeURIComponent(qrToken)}`;

    return Response.json({
      success: true,
      token_id: tokenId,
      qr_token: qrToken,
      qr_image_url: qrImageUrl,
      airport,
      expiry: expiry.toISOString(),
      source,
      commission_partner: commissionPartner,
      message: 'DutyCredit generated successfully.',
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});