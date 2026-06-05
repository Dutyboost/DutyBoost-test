// DutyCredit Redemption Model — Fixed rewards per spend tier
//
// Tier structure (minimum basket: €35):
//   Entry DutyCredit     — €35–€69    → €2.50 flat
//   Boarding DutyCredit  — €70–€99    → €5.00 flat
//   Standard DutyCredit  — €100–€149  → €10.00 flat
//   Plus DutyCredit      — €150–€199  → €20.00 flat
//   Lounge DutyCredit    — €200–€249  → €30.00 flat
//   Premium DutyCredit   — €250–€299  → €45.00 flat
//   VIP DutyCredit       — €300+      → €60.00 flat
//
// DutyBoost platform fee: 2.5% of gross spend (paid by retailer).
// Travel Partner share:   0.5% of gross spend (paid from platform fee).
// DutyBoost revenue:      2.0% of gross spend (retained after partner share).

export const DUTY_CREDIT_CONFIG = {
  shortHaul: { basePerTraveler: 2.50 },
  longHaul:  { basePerTraveler: 7.00 },
  floor: 2.50,
  cap: 60,
  minBasket: 35,
};

export const PLATFORM_FEE_PCT = 0.025;       // 2.5% of basket
export const PLATFORM_FEE_CAP = 25;          // €25 max per transaction
export const AGENCY_COMMISSION_PCT = 0.005;  // 0.5% of basket (travel partner share)
export const AGENCY_COMMISSION_CAP = 5;      // €5 max per transaction

// Legacy alias — kept for backward compatibility
export const AGENCY_COMMISSION_SHARE = 0.20;

// Fixed reward per tier
export function calcBasketCredit(basketValue) {
  if (!basketValue || basketValue < 35) return 0;
  if (basketValue >= 300) return 60.00;  // VIP
  if (basketValue >= 250) return 45.00;  // Premium
  if (basketValue >= 200) return 30.00;  // Lounge
  if (basketValue >= 150) return 20.00;  // Plus
  if (basketValue >= 100) return 10.00;  // Standard
  if (basketValue >= 70)  return 5.00;   // Boarding
  return 2.50;                           // Entry (€35–€69)
}

// Return the tier name for display purposes
export function getBasketTierLabel(basketValue) {
  if (!basketValue || basketValue < 35) return null;
  const credit = calcBasketCredit(basketValue).toFixed(2);
  if (basketValue >= 300) return `VIP DutyCredit — €60.00 reward`;
  if (basketValue >= 250) return `Premium DutyCredit — €45.00 reward`;
  if (basketValue >= 200) return `Lounge DutyCredit — €30.00 reward`;
  if (basketValue >= 150) return `Plus DutyCredit — €20.00 reward`;
  if (basketValue >= 100) return `Standard DutyCredit — €10.00 reward`;
  if (basketValue >= 70)  return `Boarding DutyCredit — €5.00 reward`;
  return `Entry DutyCredit — €2.50 reward`;
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