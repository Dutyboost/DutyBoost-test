/**
 * processPartialRefund — Handles partial or full returns of goods after a DutyCredit redemption.
 *
 * When a traveler returns goods, the basket is recalculated to the new value.
 * The discount is re-derived for the correct tier, commission is recalculated at 2.5%
 * of the new basket, and the refund to the traveler accounts for the discount adjustment.
 *
 * POST /processPartialRefund
 * Body: { transaction_id, refund_amount, pos_secret }
 *
 * Refund to traveler = Goods returned − (Original discount − New discount)
 */

import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

const PLATFORM_FEE_PCT = 0.025;
const PLATFORM_FEE_CAP = 25;
const AGENCY_COMMISSION_SHARE = 0.20;
const AGENCY_COMMISSION_CAP = 5;

// Fixed reward per tier — mirrors posWebhook calcBasketCredit (minimum basket: €20)
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
    // Validate POS shared secret (same secret as posWebhook)
    const posSecret = req.headers.get('X-POS-Secret') || (await req.clone().json().catch(() => ({}))).pos_secret;
    const expectedSecret = Deno.env.get('POS_WEBHOOK_SECRET');
    if (!expectedSecret || posSecret !== expectedSecret) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { transaction_id, refund_amount } = body;

    if (!transaction_id || !refund_amount) {
      return Response.json({ error: 'Missing required fields: transaction_id, refund_amount' }, { status: 400 });
    }

    const refundAmount = parseFloat(refund_amount);
    if (isNaN(refundAmount) || refundAmount <= 0) {
      return Response.json({ error: 'Refund amount must be a positive number' }, { status: 400 });
    }

    const base44 = createClientFromRequest(req);

    // 1. Fetch original transaction
    const transaction = await base44.asServiceRole.entities.Transaction.get(transaction_id);
    if (!transaction) {
      return Response.json({ error: 'Transaction not found', transaction_id }, { status: 404 });
    }

    // 2. Check if already fully refunded
    if (transaction.refund_status === 'full') {
      return Response.json({ error: 'Transaction is already fully refunded' }, { status: 409 });
    }

    // 3. Calculate adjusted basket (account for any prior partial refunds)
    const originalValue = transaction.transaction_value;
    const alreadyRefunded = transaction.refunded_amount || 0;
    const remainingBasket = originalValue - alreadyRefunded;

    if (refundAmount > remainingBasket) {
      return Response.json({
        error: `Refund amount (€${refundAmount.toFixed(2)}) exceeds remaining basket value (€${remainingBasket.toFixed(2)})`,
        transaction_id,
        remaining_basket: remainingBasket,
      }, { status: 400 });
    }

    const newBasket = remainingBasket - refundAmount;

    // 4. Recalculate discount and commission for adjusted basket
    const originalDiscount = transaction.discount_amount;
    const originalCommission = transaction.platform_revenue;

    const newDiscount = parseFloat(calcBasketCredit(newBasket).toFixed(2));
    const newCommission = parseFloat((newBasket > 1000 ? 0 : Math.min(newBasket * PLATFORM_FEE_PCT, PLATFORM_FEE_CAP)).toFixed(2));
    const newAgencyCommission = parseFloat(Math.min(newCommission * AGENCY_COMMISSION_SHARE, AGENCY_COMMISSION_CAP).toFixed(2));

    // 5. Calculate refund due to traveler
    // Traveler gets back: returned goods value MINUS the discount they no longer qualify for
    const discountAdjustment = parseFloat((originalDiscount - newDiscount).toFixed(2));
    const refundDueToTraveler = parseFloat((refundAmount - discountAdjustment).toFixed(2));

    // 6. Determine refund status
    const totalRefunded = parseFloat((alreadyRefunded + refundAmount).toFixed(2));
    const refundStatus = totalRefunded >= originalValue ? 'full' : 'partial';

    // 7. Update the original transaction with refund info
    await base44.asServiceRole.entities.Transaction.update(transaction_id, {
      refund_status: refundStatus,
      refunded_amount: totalRefunded,
      adjusted_transaction_value: parseFloat(newBasket.toFixed(2)),
      adjusted_discount_amount: newDiscount,
      adjusted_platform_revenue: newCommission,
      refund_due_to_traveler: refundDueToTraveler,
    });

    // 8. Return full breakdown so POS can process the traveler refund
    return Response.json({
      success: true,
      transaction_id,
      original_basket: originalValue,
      refund_amount: refundAmount,
      already_refunded: alreadyRefunded,
      new_basket: parseFloat(newBasket.toFixed(2)),
      original_discount: originalDiscount,
      new_discount: newDiscount,
      discount_adjustment: discountAdjustment,
      original_commission: originalCommission,
      new_commission: newCommission,
      commission_reduction: parseFloat((originalCommission - newCommission).toFixed(2)),
      refund_due_to_traveler: refundDueToTraveler,
      refund_status: refundStatus,
      message: `Refund processed: return €${refundDueToTraveler.toFixed(2)} to traveler (€${refundAmount.toFixed(2)} goods returned − €${discountAdjustment.toFixed(2)} discount adjustment). Commission adjusted from €${originalCommission.toFixed(2)} to €${newCommission.toFixed(2)}.`,
    });

  } catch (error) {
    console.error('processPartialRefund error:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});