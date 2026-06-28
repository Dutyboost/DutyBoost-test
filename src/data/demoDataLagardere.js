// Lagardère Travel Retail demo data — multi-country airport retailer network.
//
// Covers 5 countries where Lagardère Travel Retail (LTR) operates:
//   Netherlands, France, Germany, Spain, United Kingdom
//
// Retailer names are real LTR store brands and fashion partners operating
// across the Lagardère network (source: lagardere-tr.com, schiphol.com).
// Revenue is calculated using the same model as the RetailerCalculator:
//   dailyRedemptions = daily_pax × 3%
//   monthlyRedemptions = dailyRedemptions × 365 / 12
//   basket = estimateAvgBasketSpend(airport)  → [€35, €150]
//   grossRevenue = redemptions × basket
// Net revenue / savings / fee computed in the dashboard (calculator model).

import { GLOBAL_AIRPORTS } from "./globalAirports";
import { estimateAvgBasketSpend } from "../utils/airportBasketEstimate";

const CONVERSION_RATE = 3;
const PLATFORM_FEE_PCT = 0.025;

// ── Amsterdam Schiphol specific stores (Today Duty Free flagship + fashion) ──
const SCHIPHOL_STORES = [
  "Today Duty Free",
  "Aelia Duty Free",
  "Relay Schiphol",
  "So Coffee",
  "Hub Convenience",
  "Hermès",
  "Gucci",
  "Burberry",
  "Hugo Boss",
  "Lacoste",
  "Guess",
  "Polo Ralph Lauren",
  "Salvatore Ferragamo",
  "Tumi",
  "Zegna",
  "UGG",
  "Longchamp",
  "Victoria's Secret",
  "The Body Shop",
  "Rituals",
];

// ── LTR store brands operating across all other airports ───────────────────
const LTR_STORE_CHAINS = [
  "Aelia Duty Free",
  "Relay",
  "So Coffee",
  "Hub Convenience",
  "Marché Restaurant",
  "Hermès",
  "Gucci",
  "Burberry",
  "Hugo Boss",
  "Lacoste",
  "Guess",
  "Polo Ralph Lauren",
  "Salvatore Ferragamo",
  "Tumi",
  "Zegna",
  "UGG",
  "Longchamp",
  "Victoria's Secret",
  "The Body Shop",
  "Rituals",
  "Sunglass Hut",
  "Swarovski",
  "Samsonite",
  "Desigual",
];

// ── Number of retailers per airport, based on annual passenger volume ────────
function retailerCount(annualPax) {
  if (annualPax >= 60_000_000) return 8;
  if (annualPax >= 30_000_000) return 6;
  if (annualPax >= 15_000_000) return 5;
  if (annualPax >= 5_000_000)  return 4;
  if (annualPax >= 1_000_000)  return 3;
  return 2;
}

// Revenue distribution weights among retailers at the same airport
const WEIGHTS = {
  2: [0.55, 0.45],
  3: [0.40, 0.35, 0.25],
  4: [0.32, 0.28, 0.22, 0.18],
  5: [0.28, 0.24, 0.20, 0.16, 0.12],
  6: [0.24, 0.21, 0.18, 0.15, 0.12, 0.10],
  8: [0.20, 0.16, 0.13, 0.12, 0.10, 0.10, 0.09, 0.10],
};

// ── Lagardère Travel Retail airport codes across 5 countries ────────────────
// LTR operates airport stores in these countries (source: lagardere-tr.com/locations)
const LTR_AIRPORT_CODES = [
  // Netherlands
  "AMS", "EIN", "RTM",
  // France
  "CDG", "ORY", "NCE", "LYS", "MRS", "BOD",
  // Germany
  "FRA", "MUC", "BER", "HAM", "DUS",
  // Spain
  "MAD", "BCN", "AGP", "VLC",
  // United Kingdom
  "LTN", "MAN", "EDI", "BHX",
];

// Airports not present in GLOBAL_AIRPORTS — added manually with realistic pax data
const LTR_EXTRA_AIRPORTS = [
  // Netherlands (smaller airports not always in global dataset)
  { name: "Rotterdam The Hague Airport", code: "RTM", city: "Rotterdam", country: "Netherlands", annual_pax: 2100000, daily_pax: 5753 },
  { name: "Eindhoven Airport", code: "EIN", city: "Eindhoven", country: "Netherlands", annual_pax: 6500000, daily_pax: 17808 },
  // France
  { name: "Bordeaux-Mérignac Airport", code: "BOD", city: "Bordeaux", country: "France", annual_pax: 3000000, daily_pax: 8219 },
  // United Kingdom
  { name: "London Luton Airport", code: "LTN", city: "London", country: "United Kingdom", annual_pax: 16000000, daily_pax: 43836 },
  { name: "Birmingham Airport", code: "BHX", city: "Birmingham", country: "United Kingdom", annual_pax: 13000000, daily_pax: 35616 },
];

const ltrAirportData = [
  ...GLOBAL_AIRPORTS.filter(a => LTR_AIRPORT_CODES.includes(a.code)),
  ...LTR_EXTRA_AIRPORTS,
].filter((a, i, arr) => arr.findIndex(x => x.code === a.code) === i);

export const AIRPORTS = ltrAirportData.map(a => ({
  code: a.code,
  name: a.name,
  city: a.city,
  country: a.country,
}));

// ── Generate RETAILERS with real LTR store names ────────────────────────────
let _idCounter = 0;
let _chainIdx = 0;

export const RETAILERS = ltrAirportData.flatMap(airport => {
  const count = retailerCount(airport.annual_pax);
  const basket = estimateAvgBasketSpend(airport);
  const dailyPax = airport.daily_pax || Math.round((airport.annual_pax || 0) / 365);
  const dailyRedemptions = Math.round(dailyPax * (CONVERSION_RATE / 100));
  const monthlyRedemptions = Math.round(dailyRedemptions * 365 / 12);
  const weights = WEIGHTS[count];

  // Schiphol uses its real store list; other airports draw from the LTR chain pool
  const namePool = airport.code === "AMS" ? SCHIPHOL_STORES : LTR_STORE_CHAINS;

  return Array.from({ length: count }, (_, i) => {
    const name = namePool === SCHIPHOL_STORES
      ? SCHIPHOL_STORES[i % SCHIPHOL_STORES.length]
      : LTR_STORE_CHAINS[(_chainIdx++) % LTR_STORE_CHAINS.length];

    _idCounter++;
    const redemptions = Math.round(monthlyRedemptions * weights[i]);
    const revenue = redemptions * basket;

    return {
      id: `r${_idCounter}`,
      name,
      airport: airport.code,
      category: "Retail",
      redemptions,
      avg_sale: basket,
      revenue,
      contact_person: "Sofie van der Meer",
      email: "s.vandermeer@lagardere-tr.nl",
      company: "Lagardère Travel Retail Netherlands B.V.",
      phone: "+31 20 653 55 55",
    };
  });
});

// ── Aggregate base figures (average month across all LTR airports) ───────────
const baseMonthlyRedemptions = RETAILERS.reduce((s, r) => s + r.redemptions, 0);
const baseMonthlyRevenue = RETAILERS.reduce((s, r) => s + r.revenue, 0);
const baseDailyRedemptions = Math.round(baseMonthlyRedemptions * 12 / 365);
const baseDailyRevenue = Math.round(baseMonthlyRevenue * 12 / 365);

// ── Seasonal multipliers (European travel patterns) ───────────────────────────
const MONTHLY_SEASONALITY = [
  { month: "Jan", mult: 0.75 }, { month: "Feb", mult: 0.80 }, { month: "Mar", mult: 0.90 },
  { month: "Apr", mult: 0.95 }, { month: "May", mult: 1.00 }, { month: "Jun", mult: 1.10 },
  { month: "Jul", mult: 1.20 }, { month: "Aug", mult: 1.25 }, { month: "Sep", mult: 1.00 },
  { month: "Oct", mult: 0.90 }, { month: "Nov", mult: 0.85 }, { month: "Dec", mult: 1.15 },
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