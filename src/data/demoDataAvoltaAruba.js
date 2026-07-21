// Avolta (Aruba) — Queen Beatrix International Airport (AUA) demo data.
//
// Single-airport network: Avolta operates 5 retail stores at AUA
// (World Duty Free, Hudson, Avolta Duty Free, Sunglass Hut, Travel Essentials).
// All F&B excluded.
//
// Passenger figures: 3.4M annual / ~9,315 daily (Aruba Airport Authority 2025).
// Revenue model mirrors demoDataAvolta (0.01% incremental uplift, 2.5% fee).

import { estimateAvgBasketSpend } from "../utils/airportBasketEstimate";

const CONVERSION_RATE = 0.01; // 0.01% — DutyBoost incremental uplift
const PLATFORM_FEE_PCT = 0.025;

const AUA = {
  name: "Queen Beatrix International Airport",
  code: "AUA",
  city: "Queen Beatrix International Airport",
  country: "Aruba",
  region: "Americas",
  annual_pax: 3400000,
  daily_pax: 9315,
};

export const AIRPORTS = [
  { code: AUA.code, name: AUA.name, city: AUA.city, country: AUA.country },
];

// Avolta retail brands present at AUA
const STORE_BRANDS = [
  "World Duty Free Aruba",
  "Hudson Aruba",
  "Avolta Duty Free",
  "Sunglass Hut Aruba",
  "Travel Essentials Aruba",
];

// Zipf-like weights so the flagship duty-free store gets the largest share
const WEIGHTS = [0.34, 0.24, 0.18, 0.14, 0.10];

const basket = estimateAvgBasketSpend(AUA);
const dailyRedemptions = AUA.daily_pax * (CONVERSION_RATE / 100);
const monthlyRedemptions = Math.round(dailyRedemptions * 365 / 12);

let _idCounter = 0;
export const RETAILERS = STORE_BRANDS.map((name, i) => {
  _idCounter++;
  const redemptions = Math.round(monthlyRedemptions * WEIGHTS[i]);
  const revenue = redemptions * basket;
  return {
    id: `aua${_idCounter}`,
    name,
    airport: "AUA",
    category: "Retail",
    redemptions,
    avg_sale: basket,
    revenue,
    contact_person: "Maria Croes",
    email: "aruba@avoltaworld.com",
    company: "Avolta Aruba",
    phone: "+297 582 4800",
  };
});

export const STORE_COUNT = RETAILERS.length;

const baseMonthlyRedemptions = RETAILERS.reduce((s, r) => s + r.redemptions, 0);
const baseMonthlyRevenue = RETAILERS.reduce((s, r) => s + r.revenue, 0);
const baseDailyRedemptions = Math.round(baseMonthlyRedemptions * 12 / 365);
const baseDailyRevenue = Math.round(baseMonthlyRevenue * 12 / 365);

// Aruba seasonality: peak Dec–Apr (US/Canadian winter escapes), trough Sep–Oct
const MONTHLY_SEASONALITY = [
  { month: "Jan", mult: 1.15 }, { month: "Feb", mult: 1.20 }, { month: "Mar", mult: 1.20 },
  { month: "Apr", mult: 1.15 }, { month: "May", mult: 1.00 }, { month: "Jun", mult: 0.95 },
  { month: "Jul", mult: 1.05 }, { month: "Aug", mult: 1.00 }, { month: "Sep", mult: 0.80 },
  { month: "Oct", mult: 0.85 }, { month: "Nov", mult: 0.95 }, { month: "Dec", mult: 1.20 },
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