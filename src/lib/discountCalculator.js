// DutyCredit Redemption Model — Tiered Basket Credit
//
// Tiers:
//   €70  – €99  →  linear €5.00 (at €70) to €9.99 (at €99)
//   €100 – €299 →  15% of spend, capped at €45.00
//   €300+       →  20% of spend, hard capped at €60.00
//
// Minimum basket: €70.
// DutyBoost platform fee: 2.5% of gross sales.
// Agency commission: 0.5% of gross sales.

export const DUTY_CREDIT_CONFIG = {
  shortHaul: { basePerTraveler: 2.50 },
  longHaul:  { basePerTraveler: 7.00 },
  floor: 5,
  cap: 60,
  minBasket: 70,
};

// Tiered basket credit calculation
export function calcBasketCredit(basketValue) {
  if (!basketValue || basketValue < 70) return 0;
  if (basketValue >= 300) {
    // 20%, hard cap €60
    return Math.min(basketValue * 0.20, 60);
  }
  if (basketValue >= 100) {
    // 15%, cap €45
    return Math.min(basketValue * 0.15, 45);
  }
  // €70–€99: linear scale from €5.00 at €70 to €9.99 at €99
  return parseFloat((5 + (basketValue - 70) * (4.99 / 29)).toFixed(2));
}

// Return the tier label for display purposes
export function getBasketTierLabel(basketValue) {
  if (!basketValue || basketValue < 70) return null;
  if (basketValue >= 300) return "20% credit (€300+ basket, max €60)";
  if (basketValue >= 100) return "15% credit (€100–€299 basket, max €45)";
  return `Linear credit (€70–€99 basket, €5–€9.99)`;
}

export function calculateDutyCredit({ ticketPrice, travelers, travelType }) {
  const isLongHaul = travelType === 'Long-haul';
  const base = isLongHaul
    ? DUTY_CREDIT_CONFIG.longHaul.basePerTraveler
    : DUTY_CREDIT_CONFIG.shortHaul.basePerTraveler;

  let multiplier = 1.0;
  if (ticketPrice >= 1000) multiplier = 2.5;
  else if (ticketPrice >= 500) multiplier = 2.0;
  else if (ticketPrice >= 200) multiplier = 1.5;

  const raw = base * travelers * multiplier;
  return Math.min(Math.max(raw, DUTY_CREDIT_CONFIG.floor), DUTY_CREDIT_CONFIG.cap);
}

export function applyDutyCreditToBasket(creditAmount, basketValue) {
  return calcBasketCredit(basketValue);
}

export function generateVoucherCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = 'DB-';
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// Legacy alias
export function calculateDiscount({ ticketPrice, travelers, travelType }) {
  return calculateDutyCredit({ ticketPrice, travelers, travelType });
}