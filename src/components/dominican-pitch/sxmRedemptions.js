import { MODEL } from "./figures";

// Illustrative DutyCredit activity at Princess Juliana International (SXM).
// Passenger volume: PJIAE — ±1.77M a year, ±4,836 a day. Pre-activation is
// entered at the standard 2% planning assumption, with the standard 30%
// redemption applied on top.
export const SXM_PASSENGERS_DAY = 4836;
export const SXM_ACTIVATION = 0.02;
export const SXM_REDEMPTION = 0.3;

const preActivated = SXM_PASSENGERS_DAY * SXM_ACTIVATION;

export const SXM_REDEMPTIONS = {
  passengers: SXM_PASSENGERS_DAY,
  activationPct: Math.round(SXM_ACTIVATION * 100),
  redemptionPct: Math.round(SXM_REDEMPTION * 100),
  preActivated: Math.round(preActivated),
  redeemed: Math.round(preActivated * SXM_REDEMPTION),
};

// Live since 25 September 2026. The reported window runs 25 September →
// 7 October 2026 — 12 days of redemptions, totalling 348 DutyCredits.
export const SXM_LAUNCH = "2026-09-25";
export const SXM_REPORT_END = "2026-10-07";

// Blended basket across the baskets redeemed, in USD.
export const SXM_BASKET_AVG = 88;

const DAY_MS = 86_400_000;
const daysLive = Math.round(
  (new Date(SXM_REPORT_END).getTime() - new Date(SXM_LAUNCH).getTime()) / DAY_MS
);
const redeemedSinceLaunch = SXM_REDEMPTIONS.redeemed * daysLive;

export const SXM_SINCE_LAUNCH = {
  days: daysLive,
  redeemed: redeemedSinceLaunch,
  retailValue: redeemedSinceLaunch * SXM_BASKET_AVG,
  platformFee: redeemedSinceLaunch * SXM_BASKET_AVG * MODEL.platformFee,
};

// A sample of the baskets redeemed on a single day at SXM, in USD — liquor,
// spirits, tobacco, souvenirs and gifts.
export const SXM_BASKETS = [
  { basket: 315, store: "ILTT Liquor & Tobacco" },
  { basket: 245, store: "ILTT Liquor & Tobacco" },
  { basket: 186, store: "Dutch Delight Store" },
  { basket: 148, store: "Dutch Delight Store" },
  { basket: 116, store: "ILTT Liquor & Tobacco" },
  { basket: 92, store: "Dutch Delight Store" },
  { basket: 74, store: "ILTT Liquor & Tobacco" },
  { basket: 58, store: "Dutch Delight Store" },
  { basket: 41, store: "ILTT Liquor & Tobacco" },
  { basket: 36, store: "Dutch Delight Store" },
  { basket: 29, store: "ILTT Liquor & Tobacco" },
];