// Spanish airport retailer demo data — Retail only (no F&B).
//
// Generated from the same databases used by the RetailerCalculator:
//   GLOBAL_AIRPORTS (daily_pax) + estimateAvgBasketSpend (basket per tx)
//
// Revenue model mirrors the calculator:
//   dailyRedemptions = daily_pax × 15%
//   monthlyRedemptions = dailyRedemptions × 365 / 12
//   basket = estimateAvgBasketSpend(airport)   [€35–€150]
//   grossRevenue = redemptions × basket
//
// Net revenue, traveler savings, and platform fee are computed in the
// dashboard using the calculator's per-transaction model.

import { GLOBAL_AIRPORTS } from "./globalAirports";
import { estimateAvgBasketSpend } from "../utils/airportBasketEstimate";

const CONVERSION_RATE = 15;          // 15% of daily passengers
const PLATFORM_FEE_PCT = 0.025;      // 2.5% of basket (used for aggregate commission field)

const RETAIL_NAMES = [
  "El Viajero Duty Free", "Ibérica Boutique", "Casa del Sol", "Andalucía Gifts",
  "Madrid Moda", "Cataluña Souvenirs", "La Tienda del Vuelo", "Boutique España",
  "Costa Duty Free", "Plaza Mayor Retail", "Don Quijote Souvenirs", "Alhambra Gifts",
  "Sevillana Boutique", "Gaudí Fashion", "Olé Apparel", "Iberia Luxe",
  "Gran Vía Retail", "El Corte Inglés Travel", "Sunglass Hut España", "Cottet Óptica",
  "Relay España", "Inoteca Wine Shop", "Aldeasa Duty Free", "Diversia Retail",
  "Prestige Wines & Spirits", "Lumière Jewels", "Chronos Boutique", "Crystal & Co.",
  "Noir Parfumerie", "Bloom Beauty Shop",
];

// ── Filter all Spanish airports from the global database ──────────────────────
const spanishAirportData = GLOBAL_AIRPORTS.filter(a => a.country === "Spain");

// ── Generate AIRPORTS list ────────────────────────────────────────────────────
export const AIRPORTS = spanishAirportData.map(a => ({
  code: a.code,
  name: a.name,
  city: a.city,
}));

// ── Generate one Retail store per airport (numbers match the calculator) ────
let _nameIdx = 0;

export const RETAILERS = spanishAirportData.map((airport, i) => {
  const basket = estimateAvgBasketSpend(airport);
  const dailyRedemptions = Math.round(airport.daily_pax * (CONVERSION_RATE / 100));
  const monthlyRedemptions = Math.round(dailyRedemptions * 365 / 12);
  const revenue = monthlyRedemptions * basket;

  return {
    id: `r${i + 1}`,
    name: RETAIL_NAMES[_nameIdx++ % RETAIL_NAMES.length],
    airport: airport.code,
    category: "Retail",
    redemptions: monthlyRedemptions,
    avg_sale: basket,
    revenue,
  };
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

// Last 6 months: Jan–Jun (current month is Jun 2026)
export const MONTHLY_DATA = MONTHLY_SEASONALITY.slice(0, 6).map(({ month, mult }) => {
  const redemptions = Math.round(baseMonthlyRedemptions * mult);
  const revenue = Math.round(baseMonthlyRevenue * mult);
  return { month, redemptions, revenue, commission: Math.round(revenue * PLATFORM_FEE_PCT * 100) / 100 };
});

// Full 12 months: Jul–Jun
export const YEARLY_DATA = [
  ...MONTHLY_SEASONALITY.slice(6),
  ...MONTHLY_SEASONALITY.slice(0, 6),
].map(({ month, mult }) => {
  const redemptions = Math.round(baseMonthlyRedemptions * mult);
  const revenue = Math.round(baseMonthlyRevenue * mult);
  return { month, redemptions, revenue, commission: Math.round(revenue * PLATFORM_FEE_PCT * 100) / 100 };
});

// Last 7 days (day-of-week variation; 27 Jun 2026 is Saturday)
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