// DutyCredit Redemption Model — Tiered Linear Interpolation
//
// Discount scales linearly within each tier based on actual spend:
//   Boarding DutyCredit  — €70–€99    → €5  to €10  (min saving to max saving)
//   Priority DutyCredit  — €100–€199  → €10 to €30
//   Lounge DutyCredit    — €200–€299  → €30 to €45
//   VIP DutyCredit       — €300–€500+ → €45 to €60 (capped at €60)
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

// Linear interpolation helper
function lerp(value, minVal, maxVal, minOut, maxOut) {
  const t = Math.min(1, (value - minVal) / (maxVal - minVal));
  return Math.round((minOut + t * (maxOut - minOut)) * 100) / 100;
}

// Tiered linear basket credit calculation
export function calcBasketCredit(basketValue) {
  if (!basketValue || basketValue < 70) return 0;
  if (basketValue >= 300) return lerp(basketValue, 300, 500, 45, 60);  // VIP DutyCredit (capped at €60)
  if (basketValue >= 200) return lerp(basketValue, 200, 299, 30, 45);  // Lounge DutyCredit
  if (basketValue >= 100) return lerp(basketValue, 100, 199, 10, 30);  // Priority DutyCredit
  return lerp(basketValue, 70, 99, 5, 10);                             // Boarding DutyCredit
}

// Return the tier name for display purposes
export function getBasketTierLabel(basketValue) {
  if (!basketValue || basketValue < 70) return null;
  const credit = calcBasketCredit(basketValue);
  if (basketValue >= 300) return `VIP DutyCredit — €${credit} reward`;
  if (basketValue >= 200) return `Lounge DutyCredit — €${credit} reward`;
  if (basketValue >= 100) return `Priority DutyCredit — €${credit} reward`;
  return `Boarding DutyCredit — €${credit} reward`;
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