// DutyCredit Redemption Model — Tiered Flat Reward
//
// Tiers (absolute flat rewards):
//   Boarding DutyCredit  — €70–€99   → €10
//   Priority DutyCredit  — €100–€199 → €30
//   Lounge DutyCredit    — €200–€299 → €45
//   VIP DutyCredit       — €300+     → €60
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

// Tiered flat basket credit calculation
export function calcBasketCredit(basketValue) {
  if (!basketValue || basketValue < 70) return 0;
  if (basketValue >= 300) return 60;  // VIP DutyCredit
  if (basketValue >= 200) return 45;  // Lounge DutyCredit
  if (basketValue >= 100) return 30;  // Priority DutyCredit
  return 10;                          // Boarding DutyCredit (€70–€99)
}

// Return the tier name for display purposes
export function getBasketTierLabel(basketValue) {
  if (!basketValue || basketValue < 70) return null;
  if (basketValue >= 300) return "VIP DutyCredit — €60 reward";
  if (basketValue >= 200) return "Lounge DutyCredit — €45 reward";
  if (basketValue >= 100) return "Priority DutyCredit — €30 reward";
  return "Boarding DutyCredit — €10 reward";
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