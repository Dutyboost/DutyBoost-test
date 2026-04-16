// DutyCredit Redemption Model
// At the airport, the credit value is calculated from the basket:
//   credit = min(basketValue * 0.05, €25)
//   minimum basket: €50 (gives €2.50), maximum credit: €25 (reached at €500+)
//
// DutyCredit issuance (stored on the voucher) still uses booking-based calc
// and represents the MAX credit the traveler can receive.

export const DUTY_CREDIT_CONFIG = {
  shortHaul: {
    basePerTraveler: 2.50,
  },
  longHaul: {
    basePerTraveler: 7.00,
  },
  floor: 5,
  cap: 25,
  minBasket: 50,       // minimum basket to redeem
  basketRatePct: 0.05, // credit = basketValue * 5%, capped at cap
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

// At redemption: calculate actual credit based on basket size
// €50 basket → €2.50, €500+ basket → €25 (capped), scales linearly at 5%
export function calcBasketCredit(basketValue) {
  if (basketValue < DUTY_CREDIT_CONFIG.minBasket) return 0;
  return Math.min(basketValue * DUTY_CREDIT_CONFIG.basketRatePct, DUTY_CREDIT_CONFIG.cap);
}

export function applyDutyCreditToBasket(creditAmount, basketValue) {
  // Use basket-based credit, but never exceed the issued voucher amount
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

// Legacy alias — kept for any components still using calculateDiscount
export function calculateDiscount({ ticketPrice, travelers, travelType }) {
  return calculateDutyCredit({ ticketPrice, travelers, travelType });
}