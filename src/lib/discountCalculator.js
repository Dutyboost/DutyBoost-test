// DutyCredit Redemption Model — Progressive percentage discount
//
// Discount scales from 5% at €20 up to 20% at €300+ (capped at 20%).
// Linear interpolation between breakpoints:
//   €20 → 5%   €50 → 7.5%   €100 → 10%   €150 → 12.5%
//   €200 → 15%   €250 → 17.5%   €300+ → 20%
// Beyond €1000 → 20% discount, €0 platform fee
//
// DutyBoost platform fee: 2.5% of gross spend (paid by retailer), waived above €1000.
// Travel Partner share:   0.5% of gross spend (paid from platform fee).
// DutyBoost revenue:      2.0% of gross spend (retained after partner share).

const DISCOUNT_BREAKPOINTS = [
  { spend: 20,  pct: 0.05 },
  { spend: 50,  pct: 0.075 },
  { spend: 100, pct: 0.10 },
  { spend: 150, pct: 0.125 },
  { spend: 200, pct: 0.15 },
  { spend: 250, pct: 0.175 },
  { spend: 300, pct: 0.20 },
];

export const DUTY_CREDIT_CONFIG = {
  shortHaul: { basePerTraveler: 2.50 },
  longHaul:  { basePerTraveler: 7.00 },
  floor: 2.50,
  cap: 60,
  minBasket: 20,
};

export const PLATFORM_FEE_PCT = 0.025;       // 2.5% of basket
export const PLATFORM_FEE_CAP = 25;          // €25 max per transaction
export const AGENCY_COMMISSION_PCT = 0.005;  // 0.5% of basket (travel partner share)
export const AGENCY_COMMISSION_CAP = 5;      // €5 max per transaction

// Legacy alias — kept for backward compatibility
export const AGENCY_COMMISSION_SHARE = 0.20;

// Platform fee: 2.5% of basket, capped at €25, waived entirely above €1000
export function calcPlatformFee(basket) {
  if (basket > 1000) return 0;
  return Math.min(Math.round(basket * PLATFORM_FEE_PCT * 100) / 100, PLATFORM_FEE_CAP);
}

// Progressive percentage discount — scales from 5% at €20 to 20% at €300+
export function calcBasketCredit(basketValue) {
  if (!basketValue || basketValue < 20) return 0;
  if (basketValue >= 300) return Math.round(basketValue * 0.20 * 100) / 100;
  let lower = DISCOUNT_BREAKPOINTS[0];
  let upper = DISCOUNT_BREAKPOINTS[DISCOUNT_BREAKPOINTS.length - 1];
  for (let i = 0; i < DISCOUNT_BREAKPOINTS.length - 1; i++) {
    if (basketValue >= DISCOUNT_BREAKPOINTS[i].spend && basketValue < DISCOUNT_BREAKPOINTS[i + 1].spend) {
      lower = DISCOUNT_BREAKPOINTS[i];
      upper = DISCOUNT_BREAKPOINTS[i + 1];
      break;
    }
  }
  const t = (basketValue - lower.spend) / (upper.spend - lower.spend);
  const pct = lower.pct + t * (upper.pct - lower.pct);
  return Math.round(basketValue * pct * 100) / 100;
}

// Return a label showing the reward and effective percentage
export function getBasketTierLabel(basketValue) {
  if (!basketValue || basketValue < 20) return null;
  const credit = calcBasketCredit(basketValue).toFixed(2);
  const pct = ((credit / basketValue) * 100).toFixed(1);
  return `DutyCredit — €${credit} reward (${pct}% off)`;
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