/**
 * posWebhook — Real POS Integration Endpoint
 *
 * Called automatically by a retailer's POS system when a traveler presents a QR code.
 * The POS sends the voucher code + basket data. This function validates, calculates,
 * logs the transaction, marks the voucher redeemed, and returns the result — all automatically.
 *
 * POST /posWebhook
 * Body: { voucher_code, transaction_value, num_items, retailer_id, store_name, airport, pos_secret }
 */

import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

const PLATFORM_FEE_PCT = 0.025;          // 2.5% of gross to DutyBoost
const AGENCY_COMMISSION_PCT = 0.005;     // 0.5% of gross = 20% of 2.5%

// Tiered basket credit: €70–€99 → 10%, €100–€299 → 15%, €300+ → 20%, cap €25
function calcBasketCredit(basketValue) {
  if (!basketValue || basketValue < 70) return 0;
  let pct;
  if (basketValue >= 300) pct = 0.20;
  else if (basketValue >= 100) pct = 0.15;
  else pct = 0.10;
  return Math.min(basketValue * pct, 25);
}

Deno.serve(async (req) => {
  try {
    // Validate POS shared secret (retailers get this during onboarding)
    const posSecret = req.headers.get('X-POS-Secret') || (await req.clone().json().catch(() => ({}))).pos_secret;
    const expectedSecret = Deno.env.get('POS_WEBHOOK_SECRET');
    if (!expectedSecret || posSecret !== expectedSecret) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { voucher_code, transaction_value, retailer_id, store_name, airport } = body;

    if (!voucher_code || !transaction_value || !retailer_id) {
      return Response.json({ error: 'Missing required fields: voucher_code, transaction_value, retailer_id' }, { status: 400 });
    }

    const base44 = createClientFromRequest(req);

    // 1. Validate voucher
    const vouchers = await base44.asServiceRole.entities.Voucher.filter({ voucher_code: voucher_code.trim().toUpperCase() });
    if (vouchers.length === 0) {
      return Response.json({ error: 'Voucher not found', voucher_code }, { status: 404 });
    }

    const voucher = vouchers[0];
    if (voucher.status !== 'active') {
      return Response.json({ error: `Voucher is ${voucher.status}`, voucher_code }, { status: 409 });
    }

    // Check expiry
    if (voucher.expiration_date && new Date(voucher.expiration_date) < new Date()) {
      await base44.asServiceRole.entities.Voucher.update(voucher.id, { status: 'expired' });
      return Response.json({ error: 'Voucher has expired', voucher_code }, { status: 409 });
    }

    // 2. Calculate financials
    const txnValue = parseFloat(transaction_value);
    if (txnValue < 70) {
      return Response.json({ error: 'Minimum basket value is €70 to redeem a DutyCredit' }, { status: 400 });
    }
    const discountAmount = parseFloat(calcBasketCredit(txnValue).toFixed(2));
    const effectiveDiscount = parseFloat(((discountAmount / txnValue) * 100).toFixed(2));
    const platformRevenue = parseFloat((txnValue * PLATFORM_FEE_PCT).toFixed(2));
    const agencyCommission = parseFloat((txnValue * AGENCY_COMMISSION_PCT).toFixed(2));
    const amountDue = parseFloat((txnValue - discountAmount).toFixed(2));

    // 3. Log transaction
    const transaction = await base44.asServiceRole.entities.Transaction.create({
      voucher_code: voucher.voucher_code,
      retailer_id,
      store_name: store_name || 'POS Terminal',
      transaction_value: txnValue,
      base_discount: voucher.discount_percentage,
      discount_applied: effectiveDiscount,
      discount_amount: discountAmount,
      platform_revenue: platformRevenue,
      agency_commission: agencyCommission,
      agency_email: voucher.agency_email || null,
      airport: airport || voucher.airport,
    });

    // 4. Mark voucher redeemed
    await base44.asServiceRole.entities.Voucher.update(voucher.id, { status: 'redeemed' });

    // 5. Return full breakdown to POS so it can print receipt
    return Response.json({
      success: true,
      transaction_id: transaction.id,
      voucher_code,
      gross_value: txnValue,
      effective_discount_pct: effectiveDiscount,
      discount_amount: discountAmount,
      amount_due: amountDue,
      platform_fee: platformRevenue,
      agency_commission: agencyCommission,
      message: `DutyCredit applied. Traveler saves €${discountAmount.toFixed(2)}.`,
    });

  } catch (error) {
    console.error('posWebhook error:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});