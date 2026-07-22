// DFP World (Duty Free Stores Zimbabwe) — demo dashboard data.
// 3-airport network: HRE (Harare), VFA (Victoria Falls), BUQ (Bulawayo).
// Currency: USD (values are computed in EUR via basket estimator, then
// formatted as USD by the dashboard view's fmtMoney helper).

import { estimateAvgBasketSpend } from "../utils/airportBasketEstimate";
import { AIRPORTS_FULL } from "./demoDataDFPWorld";

const CONVERSION_RATE = 0.01; // 0.01% — DutyBoost incremental uplift
const PLATFORM_FEE_PCT = 0.025;

export const AIRPORTS = AIRPORTS_FULL.map(a => ({
  code: a.code,
  name: a.name,
  city: a.city,
  country: a.country,
}));

// Distinct outlet/concession names per airport (6 outlets across the network).
// Each name represents a specific store type within the terminal, mirroring how
// other demos list individual outlets rather than just the company name.
const STORE_LAYOUT = {
  HRE: ["DFP World Departures", "DFP World Arrivals", "DFP World Liquor & Tobacco"],
  VFA: ["DFP World Departures", "DFP World Gifts & Souvenirs"],
  BUQ: ["DFP World Duty Free"],
};

// Zipf-like weights so the flagship departures store gets the largest share.
const WEIGHTS = {
  HRE: [0.40, 0.35, 0.25],
  VFA: [0.60, 0.40],
  BUQ: [1.0],
};

let _idCounter = 0;
export const RETAILERS = AIRPORTS_FULL.flatMap(airport => {
  const brands = STORE_LAYOUT[airport.code] || [];
  const weights = WEIGHTS[airport.code] || [];
  const basket = estimateAvgBasketSpend(airport);
  const dailyRedemptions = airport.daily_pax * (CONVERSION_RATE / 100);
  const monthlyRedemptions = Math.round(dailyRedemptions * 365 / 12);
  return brands.map((name, i) => {
    _idCounter++;
    const redemptions = Math.round(monthlyRedemptions * weights[i]);
    const revenue = redemptions * basket;
    return {
      id: `${airport.code.toLowerCase()}${_idCounter}`,
      name,
      airport: airport.code,
      category: "Retail",
      redemptions,
      avg_sale: basket,
      revenue,
      contact_person: "Tendai Moyo",
      email: "info@dfpworld.co.zw",
      company: "DFP World (Duty Free Stores Zimbabwe)",
      phone: "+263 242 575 021",
    };
  });
});

export const STORE_COUNT = RETAILERS.length;

const baseMonthlyRedemptions = RETAILERS.reduce((s, r) => s + r.redemptions, 0);
const baseMonthlyRevenue = RETAILERS.reduce((s, r) => s + r.revenue, 0);
const baseDailyRedemptions = Math.round(baseMonthlyRedemptions * 12 / 365);
const baseDailyRevenue = Math.round(baseMonthlyRevenue * 12 / 365);

// Zimbabwe tourism seasonality: peak Jun–Oct (dry-season safari season),
// trough Jan–Feb (rains).
const MONTHLY_SEASONALITY = [
  { month: "Jan", mult: 0.75 }, { month: "Feb", mult: 0.70 }, { month: "Mar", mult: 0.85 },
  { month: "Apr", mult: 0.95 }, { month: "May", mult: 1.05 }, { month: "Jun", mult: 1.15 },
  { month: "Jul", mult: 1.25 }, { month: "Aug", mult: 1.25 }, { month: "Sep", mult: 1.20 },
  { month: "Oct", mult: 1.15 }, { month: "Nov", mult: 1.00 }, { month: "Dec", mult: 0.90 },
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