// Spanish airport retailer demo data — Retail only (no F&B).
//
// Retailer names are real stores operating across the Aena airport network
// (source: aena.es shop directories). Revenue is calculated using the same
// model as the RetailerCalculator:
//   dailyRedemptions = daily_pax × 4%
//   monthlyRedemptions = dailyRedemptions × 365 / 12
//   basket = estimateAvgBasketSpend(airport)  → [€35, €150]
//   grossRevenue = redemptions × basket
// Net revenue / savings / fee computed in the dashboard (calculator model).

import { GLOBAL_AIRPORTS } from "./globalAirports";
import { estimateAvgBasketSpend } from "../utils/airportBasketEstimate";

const CONVERSION_RATE = 4;
const PLATFORM_FEE_PCT = 0.025;

// ── Real retail stores at Madrid Barajas (Aena directory, Retail only) ───────
const MADRID_RETAILERS = [
  "Madrid Duty Free",
  "Express Duty Free",
  "Haute Parfumerie",
  "The Gallery in Madrid",
  "El Mercado Madrid Duty Free",
  "Sunglass Hut",
  "Swarovski",
  "Tous",
  "Mango",
  "Desigual",
  "Lacoste",
  "Boss",
  "Carolina Herrera",
  "Victoria's Secret",
  "The Body Shop",
  "Rituals",
  "Roberto Verino",
  "TAG Heuer",
  "Samsonite",
  "UNOde50",
];

// ── Retail chains operating across Aena airports ───────────────────────────
const AENA_RETAIL_CHAINS = [
  "Duty Free Express",
  "Sunglass Hut",
  "Swarovski",
  "Tous",
  "Mango",
  "Desigual",
  "Lacoste",
  "Boss",
  "Victoria's Secret",
  "The Body Shop",
  "Rituals",
  "La Chinata",
  "Samsonite",
  "Parfois",
  "El Ganso",
  "UNOde50",
  "Longchamp",
  "Marc Jacobs",
  "Victorinox",
  "Relay",
  "WHSmith",
  "InMotion",
  "Point",
  "Natura",
];

// ── Number of retailers per airport, based on annual passenger volume ────────
function retailerCount(annualPax) {
  if (annualPax >= 40_000_000) return 8;
  if (annualPax >= 20_000_000) return 6;
  if (annualPax >= 10_000_000) return 5;
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

// ── Filter all Spanish airports from the global database ─────────────────────
const spanishAirportData = GLOBAL_AIRPORTS.filter(a => a.country === "Spain");

export const AIRPORTS = spanishAirportData.map(a => ({
  code: a.code,
  name: a.name,
  city: a.city,
}));

// ── Generate RETAILERS with real store names ────────────────────────────────
let _idCounter = 0;
let _chainIdx = 0;

export const RETAILERS = spanishAirportData.flatMap(airport => {
  const count = retailerCount(airport.annual_pax);
  const basket = estimateAvgBasketSpend(airport);
  const dailyRedemptions = Math.round(airport.daily_pax * (CONVERSION_RATE / 100));
  const monthlyRedemptions = Math.round(dailyRedemptions * 365 / 12);
  const weights = WEIGHTS[count];

  // Madrid uses its real store list; other airports draw from the Aena chain pool
  const namePool = airport.code === "MAD" ? MADRID_RETAILERS : AENA_RETAIL_CHAINS;

  return Array.from({ length: count }, (_, i) => {
    const name = namePool === MADRID_RETAILERS
      ? MADRID_RETAILERS[i % MADRID_RETAILERS.length]
      : AENA_RETAIL_CHAINS[(_chainIdx++) % AENA_RETAIL_CHAINS.length];

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
      contact_person: "Raul Lorenzo Gomez Garcia-Carpintero",
      email: "rgomez@aena.es",
      company: "AENA S.A.",
      phone: "+34 91 321 10 00",
    };
  });
});

// ── Aggregate base figures (average month across all Spanish airports) ────────
const baseMonthlyRedemptions = RETAILERS.reduce((s, r) => s + r.redemptions, 0);
const baseMonthlyRevenue = RETAILERS.reduce((s, r) => s + r.revenue, 0);
const baseDailyRedemptions = Math.round(baseMonthlyRedemptions * 12 / 365);
const baseDailyRevenue = Math.round(baseMonthlyRevenue * 12 / 365);

// ── Seasonal multipliers (Spanish travel patterns) ────────────────────────────
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