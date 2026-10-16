import { MODEL } from "./figures";

// Illustrative DutyCredit activity at Princess Juliana International (SXM).
// Passenger volume: PJIAE — ±1.77M a year, ±4,836 a day. Pre-activation is
// entered at the standard 2% planning assumption, with a 36% redemption applied
// on top — an average of 35 DutyCredits redeemed a day.
export const SXM_PASSENGERS_DAY = 4836;
export const SXM_ACTIVATION = 0.02;
export const SXM_REDEMPTION = 0.36;

const preActivated = SXM_PASSENGERS_DAY * SXM_ACTIVATION;

export const SXM_REDEMPTIONS = {
  passengers: SXM_PASSENGERS_DAY,
  activationPct: Math.round(SXM_ACTIVATION * 100),
  redemptionPct: Math.round(SXM_REDEMPTION * 100),
  preActivated: Math.round(preActivated),
  redeemed: Math.round(preActivated * SXM_REDEMPTION),
};

// Live since 25 September 2026. The reported window runs 25 September →
// 17 October 2026 — 22 days of redemptions, totalling 638 DutyCredits.
export const SXM_LAUNCH = "2026-09-25";
export const SXM_REPORT_END = "2026-10-17";

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

// A sample of the baskets redeemed on a single day at SXM, in USD — labelled
// by the product category redeemed, not by the store that sold it.
export const SXM_BASKETS = [
  { basket: 315, cat: "liquor" },
  { basket: 245, cat: "liquor" },
  { basket: 186, cat: "gifts" },
  { basket: 148, cat: "gifts" },
  { basket: 116, cat: "liquor" },
  { basket: 92, cat: "gifts" },
  { basket: 74, cat: "liquor" },
  { basket: 58, cat: "gifts" },
  { basket: 41, cat: "liquor" },
  { basket: 36, cat: "gifts" },
  { basket: 29, cat: "liquor" },
];