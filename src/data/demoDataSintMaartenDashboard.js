// ILTT & Penha Group (Sint Maarten) — Princess Juliana International Airport (SXM)
// demo dashboard data.
//
// Single-airport network: 6 retail stores at SXM operated by a joint venture
// between International Liquor & Tobacco Trading N.V. (ILTT) and the Penha Group.
//
// Passenger figures: ~1.77M annual / ~4,836 daily (PJIAE 2023).
// Revenue model mirrors demoDataAvoltaAruba (0.01% incremental uplift, 2.5% fee).

import { estimateAvgBasketSpend } from "../utils/airportBasketEstimate";
import { AIRPORTS_FULL } from "./demoDataSintMaarten";

const CONVERSION_RATE = 0.01; // 0.01% — DutyBoost incremental uplift
const PLATFORM_FEE_PCT = 0.025;

const SXM = AIRPORTS_FULL[0];

export const AIRPORTS = [
  { code: SXM.code, name: SXM.name, city: SXM.city, country: SXM.country },
];

// Retail brands present at SXM — 3 ILTT outlets + 3 Penha Duty Free outlets
const STORE_BRANDS = [
  "ILTT – Princess Promenade (Liquor & Tobacco)",
  "ILTT – Princess Promenade (Spirits & Wine)",
  "ILTT – Princess Promenade (Beer & Beverages)",
  "Penha Duty Free (Perfumes & Cosmetics)",
  "Penha Duty Free (Skincare & Fragrances)",
  "Penha Duty Free (Luxury Accessories)",
];

// Zipf-like weights: flagship liquor & tobacco gets the largest share,
// followed by perfumes/cosmetics and spirits/wine.
const WEIGHTS = [0.28, 0.20, 0.10, 0.20, 0.12, 0.10];

const basket = estimateAvgBasketSpend(SXM);
const dailyRedemptions = SXM.daily_pax * (CONVERSION_RATE / 100);
const monthlyRedemptions = Math.round(dailyRedemptions * 365 / 12);

let _idCounter = 0;
export const RETAILERS = STORE_BRANDS.map((name, i) => {
  _idCounter++;
  const redemptions = Math.round(monthlyRedemptions * WEIGHTS[i]);
  const revenue = redemptions * basket;
  const isILTT = name.startsWith("ILTT");
  return {
    id: `sxm${_idCounter}`,
    name,
    airport: "SXM",
    category: "Retail",
    redemptions,
    avg_sale: basket,
    revenue,
    contact_person: isILTT ? "ILTT Operations" : "Penha Group Operations",
    email: isILTT ? "operations@ilttsxm.com" : "info@penhagroup.com",
    company: isILTT ? "International Liquor & Tobacco Trading N.V." : "Penha Group",
    phone: "+1 721 545 2000",
  };
});

export const STORE_COUNT = RETAILERS.length;

const baseMonthlyRedemptions = RETAILERS.reduce((s, r) => s + r.redemptions, 0);
const baseMonthlyRevenue = RETAILERS.reduce((s, r) => s + r.revenue, 0);
const baseDailyRedemptions = Math.round(baseMonthlyRedemptions * 12 / 365);
const baseDailyRevenue = Math.round(baseMonthlyRevenue * 12 / 365);

// Sint Maarten seasonality: peak Dec–Apr (US/Canadian winter escapes),
// trough Sep–Oct (peak hurricane season — more pronounced than Aruba).
const MONTHLY_SEASONALITY = [
  { month: "Jan", mult: 1.15 }, { month: "Feb", mult: 1.20 }, { month: "Mar", mult: 1.20 },
  { month: "Apr", mult: 1.15 }, { month: "May", mult: 1.00 }, { month: "Jun", mult: 0.95 },
  { month: "Jul", mult: 1.05 }, { month: "Aug", mult: 1.00 }, { month: "Sep", mult: 0.70 },
  { month: "Oct", mult: 0.75 }, { month: "Nov", mult: 0.90 }, { month: "Dec", mult: 1.20 },
];

export const MONTHLY_DATA = MONTHLY_SEASONALITY.slice(0, 6).map(({ month, mult }) => {
  const redemptions = Math.round(baseMonthlyRedemptions * mult);
  const revenue = Math.round(baseMonthlyRevenue * mult);
  return { month, redemptions, revenue, commission: Math.round(revenue * PLATFORM_FEE_PCT * 100) / 100 };
});

export const YEARLY_DATA = [
  ...MONTHLY_SEASONALITY.slice(6),
  ...MONTHLY_SEASONALITY.slice(0, 6),
].map(({ month, mult }) => {
  const redemptions = Math.round(baseMonthlyRedemptions * mult);
  const revenue = Math.round(baseMonthlyRevenue * mult);
  return { month, redemptions, revenue, commission: Math.round(revenue * PLATFORM_FEE_PCT * 100) / 100 };
});

const DAILY_SEASONALITY = [
  { day: "21 Jun", mult: 1.10 },
  { day: "22 Jun", mult: 0.85 },
  { day: "23 Jun", mult: 0.80 },
  { day: "24 Jun", mult: 0.85 },
  { day: "25 Jun", mult: 0.95 },
  { day: "26 Jun", mult: 1.10 },
  { day: "27 Jun", mult: 1.20 },
];

export const DAILY_DATA = DAILY_SEASONALITY.map(({ day, mult }) => ({
  day,
  redemptions: Math.round(baseDailyRedemptions * mult),
  revenue: Math.round(baseDailyRevenue * mult),
}));