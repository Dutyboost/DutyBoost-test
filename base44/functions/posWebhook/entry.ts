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

import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

const PLATFORM_FEE_PCT = 0.025;          // 2.5% of gross to DutyBoost (capped at €25)
const AGENCY_COMMISSION_SHARE = 0.20;   // 20% of DutyBoost fee goes to agency (capped at €5)
const PLATFORM_FEE_CAP = 25;            // Maximum DutyBoost fee per transaction
const AGENCY_COMMISSION_CAP = 5;        // Maximum agency commission per transaction (20% of €25 cap)

// Fixed reward per tier (minimum basket: €20)
// Entry: €20–€49 → €2.50 | Boarding: €50–€99 → €5 | Standard: €100–€149 → €10
// Plus: €150–€199 → €20 | Lounge: €200–€249 → €30 | Premium: €250–€299 → €45 | VIP: €300+ → €60
function calcBasketCredit(basketValue) {
  if (!basketValue || basketValue < 20) return 0;
  if (basketValue >= 300) return 60;
  if (basketValue >= 250) return 45;
  if (basketValue >= 200) return 30;
  if (basketValue >= 150) return 20;
  if (basketValue >= 100) return 10;
  if (basketValue >= 50) return 5;
  return 2.5;
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
    if (txnValue < 20) {
      return Response.json({ error: 'Minimum basket value is €20 to redeem a DutyCredit' }, { status: 400 });
    }
    const discountAmount = parseFloat(calcBasketCredit(txnValue).toFixed(2));
    const effectiveDiscount = parseFloat(((discountAmount / txnValue) * 100).toFixed(2));
    const platformRevenue = parseFloat((txnValue > 1000 ? 0 : Math.min(txnValue * PLATFORM_FEE_PCT, PLATFORM_FEE_CAP)).toFixed(2));
    const agencyCommission = parseFloat(Math.min(platformRevenue * AGENCY_COMMISSION_SHARE, AGENCY_COMMISSION_CAP).toFixed(2));
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