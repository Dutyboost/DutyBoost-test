// Illustrative DutyCredit activity at Princess Juliana International (SXM).
// Passenger volume: PJIAE — ±1.77M a year, ±4,836 a day. Pre-activation is
// entered at 35% and the standard 30% redemption is applied on top, so the
// slide shows a live-market scenario rather than the 2% planning assumption.
export const SXM_PASSENGERS_DAY = 4836;
export const SXM_ACTIVATION = 0.35;
export const SXM_REDEMPTION = 0.3;

const preActivated = SXM_PASSENGERS_DAY * SXM_ACTIVATION;

export const SXM_REDEMPTIONS = {
  passengers: SXM_PASSENGERS_DAY,
  activationPct: Math.round(SXM_ACTIVATION * 100),
  redemptionPct: Math.round(SXM_REDEMPTION * 100),
  preActivated: Math.round(preActivated),
  redeemed: Math.round(preActivated * SXM_REDEMPTION),
};

// A sample of the premium duty-free baskets redeemed on a single day at SXM,
// in USD — liquor, spirits, tobacco, fragrances and cosmetics.
export const SXM_BASKETS = [
  { basket: 148, store: "Dutch Delight Store" },
  { basket: 116, store: "ILTT Liquor & Tobacco" },
  { basket: 92, store: "Dutch Delight Store" },
  { basket: 74, store: "ILTT Liquor & Tobacco" },
  { basket: 58, store: "Dutch Delight Store" },
  { basket: 41, store: "ILTT Liquor & Tobacco" },
];