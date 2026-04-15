// DutyCredit Calculation Model
// Credit = clamp(basePerTraveler × travelers × priceMultiplier, €5, €25)
// 15% cap rule: credit applied ≤ 15% of actual basket value (guarantees retailer ≥ 85% net)
// No minimum spend — every traveler can redeem, proportionally on small baskets

export const DUTY_CREDIT_CONFIG = {
  shortHaul: {
    basePerTraveler: 2.50,
  },
  longHaul: {
    basePerTraveler: 7.00,
  },
  floor: 5,
  cap: 25,
  maxBasketPct: 0.15, // credit cannot exceed 15% of basket
};

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
  const maxAllowed = basketValue * DUTY_CREDIT_CONFIG.maxBasketPct;
  return Math.min(creditAmount, maxAllowed);
}

export function generateVoucherCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = 'DB-';
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// Legacy alias — kept for any components still using calculateDiscount
export function calculateDiscount({ ticketPrice, travelers, travelType }) {
  return calculateDutyCredit({ ticketPrice, travelers, travelType });
}