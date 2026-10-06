// Illustrative DutyCredit activity at Princess Juliana International (SXM).
// Passenger volume: PJIAE — ±1.77M a year, ±4,836 a day. Pre-activation is
// entered at 15% and the standard 30% redemption is applied on top, so the
// slide shows a live-market scenario rather than the 2% planning assumption.
export const SXM_PASSENGERS_DAY = 4836;
export const SXM_ACTIVATION = 0.15;
export const SXM_REDEMPTION = 0.3;

const preActivated = SXM_PASSENGERS_DAY * SXM_ACTIVATION;

export const SXM_REDEMPTIONS = {
  passengers: SXM_PASSENGERS_DAY,
  activationPct: Math.round(SXM_ACTIVATION * 100),
  redemptionPct: Math.round(SXM_REDEMPTION * 100),
  preActivated: Math.round(preActivated),
  redeemed: Math.round(preActivated * SXM_REDEMPTION),
};

// Live since 25 September 2026 — volumes accumulated since the launch date.
export const SXM_LAUNCH = "2026-09-25";

// Blended basket across the baskets redeemed, in USD.
export const SXM_BASKET_AVG = 88;

const DAY_MS = 86_400_000;
const daysLive = Math.max(
  1,
  Math.floor((Date.now() - new Date(SXM_LAUNCH).getTime()) / DAY_MS)
);
const redeemedSinceLaunch = SXM_REDEMPTIONS.redeemed * daysLive;

export const SXM_SINCE_LAUNCH = {
  days: daysLive,
  redeemed: redeemedSinceLaunch,
  retailValue: redeemedSinceLaunch * SXM_BASKET_AVG,
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