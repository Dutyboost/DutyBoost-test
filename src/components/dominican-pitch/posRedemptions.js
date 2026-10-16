import { MODEL } from "./figures";

// Illustrative DutyCredit activity at Piarco International (POS) for Caribbean
// Duty Free. Passenger volume: ±2.6M movements a year at Piarco (Airports
// Authority of Trinidad and Tobago), ±7,123 a day. Pre-activation is entered at
// the standard 2% planning assumption, with 15% redemption applied on top — the
// market went live on 15 October 2026, so the run is one day old.
export const POS_PASSENGERS_DAY = 7123;
export const POS_ACTIVATION = 0.02;
export const POS_REDEMPTION = 0.15;

const preActivated = POS_PASSENGERS_DAY * POS_ACTIVATION;

export const POS_REDEMPTIONS = {
  passengers: POS_PASSENGERS_DAY,
  activationPct: Math.round(POS_ACTIVATION * 100),
  redemptionPct: Math.round(POS_REDEMPTION * 100),
  preActivated: Math.round(preActivated),
  redeemed: Math.round(preActivated * POS_REDEMPTION),
};

// Live since 15 October 2026. The reported window runs 15 → 16 October 2026 —
// one day of redemptions at the tills.
export const POS_LAUNCH = "2026-10-15";
export const POS_REPORT_END = "2026-10-16";

// Blended basket across the baskets redeemed, in USD — the Trinidad & Tobago
// model's blended basket.
export const POS_BASKET_AVG = 135;

const DAY_MS = 86_400_000;
const daysLive = Math.max(
  1,
  Math.round((new Date(POS_REPORT_END).getTime() - new Date(POS_LAUNCH).getTime()) / DAY_MS)
);
const redeemedSinceLaunch = POS_REDEMPTIONS.redeemed * daysLive;

export const POS_SINCE_LAUNCH = {
  days: daysLive,
  redeemed: redeemedSinceLaunch,
  retailValue: redeemedSinceLaunch * POS_BASKET_AVG,
  platformFee: redeemedSinceLaunch * POS_BASKET_AVG * MODEL.platformFee,
};

// A sample of the baskets redeemed on a single day at Piarco, in USD — labelled
// by the product category redeemed, not by the store that sold it.
export const POS_BASKETS = [
  { basket: 290, cat: "spirits" },
  { basket: 230, cat: "fragrance" },
  { basket: 185, cat: "spirits" },
  { basket: 155, cat: "cigars" },
  { basket: 135, cat: "fragrance" },
  { basket: 120, cat: "spirits" },
  { basket: 105, cat: "fragrance" },
  { basket: 90, cat: "cigars" },
  { basket: 75, cat: "spirits" },
  { basket: 58, cat: "fragrance" },
  { basket: 42, cat: "cigars" },
];