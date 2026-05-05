// DutyCredit Redemption Model — Flat Tiers (matches POS webhook exactly)
//
// Flat reward per tier based on basket spend:
//   Boarding DutyCredit  — €70–€99    → €10 flat
//   Priority DutyCredit  — €100–€199  → €30 flat
//   Lounge DutyCredit    — €200–€299  → €45 flat
//   VIP DutyCredit       — €300+      → €60 flat
//
// Minimum basket: €70.
// DutyBoost platform fee: 2.5% of gross sales, capped at €25 per transaction.
// Agency commission: 20% of DutyBoost fee, capped at €5 per transaction.

export const DUTY_CREDIT_CONFIG = {
  shortHaul: { basePerTraveler: 2.50 },
  longHaul:  { basePerTraveler: 7.00 },
  floor: 5,
  cap: 60,
  minBasket: 70,
};

export const PLATFORM_FEE_PCT = 0.025;
export const PLATFORM_FEE_CAP = 25;          // €25 max per transaction
export const AGENCY_COMMISSION_SHARE = 0.20; // 20% of DutyBoost fee
export const AGENCY_COMMISSION_CAP = 5;      // €5 max per transaction (20% of €25 cap)

// Flat-tier basket credit — matches POS webhook exactly
// Boarding:  €70–€99   → €10
// Priority:  €100–€199 → €30
// Lounge:    €200–€299 → €45
// VIP:       €300+     → €60
export function calcBasketCredit(basketValue) {
  if (!basketValue || basketValue < 70) return 0;
  if (basketValue >= 300) return 60; // VIP DutyCredit
  if (basketValue >= 200) return 45; // Lounge DutyCredit
  if (basketValue >= 100) return 30; // Priority DutyCredit
  return 10;                         // Boarding DutyCredit (€70–€99)
}

// Return the tier name for display purposes
export function getBasketTierLabel(basketValue) {
  if (!basketValue || basketValue < 70) return null;
  if (basketValue >= 300) return `VIP DutyCredit — €60 reward`;
  if (basketValue >= 200) return `Lounge DutyCredit — €45 reward`;
  if (basketValue >= 100) return `Priority DutyCredit — €30 reward`;
  return `Boarding DutyCredit — €10 reward`;
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