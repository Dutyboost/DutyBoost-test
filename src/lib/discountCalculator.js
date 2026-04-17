// DutyCredit Redemption Model — Tiered Basket Credit
//
// Tiers (applied to basket value, credit capped at €50):
//   €50  – €99  →  10%  (€5.00 – €9.90)
//   €100 – €299 →  15%  (€15   – €44.85, cap reached at €334)
//   €300 – €499 →  20%  (€60   – always capped at €50)
//   €500+       →  25%  (always capped at €50)
//
// Minimum basket: €50. Maximum credit: €50.
// DutyBoost platform fee: 2.5% of gross sales.
// Agency commission: 0.5% of gross sales.

export const DUTY_CREDIT_CONFIG = {
  shortHaul: { basePerTraveler: 2.50 },
  longHaul:  { basePerTraveler: 7.00 },
  floor: 5,
  cap: 50,
  minBasket: 50,
};

// Tiered basket credit calculation
export function calcBasketCredit(basketValue) {
  if (!basketValue || basketValue < DUTY_CREDIT_CONFIG.minBasket) return 0;
  let pct;
  if (basketValue >= 500) pct = 0.25;
  else if (basketValue >= 300) pct = 0.20;
  else if (basketValue >= 100) pct = 0.15;
  else pct = 0.10;
  return Math.min(basketValue * pct, DUTY_CREDIT_CONFIG.cap);
}

// Return the tier label for display purposes
export function getBasketTierLabel(basketValue) {
  if (!basketValue || basketValue < 50) return null;
  if (basketValue >= 500) return "25% credit (€500+ basket)";
  if (basketValue >= 300) return "20% credit (€300–€499 basket)";
  if (basketValue >= 100) return "15% credit (€100–€299 basket)";
  return "10% credit (€50–€99 basket)";
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
  const basketCredit = calcBasketCredit(basketValue);
  return Math.min(basketCredit, creditAmount);
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