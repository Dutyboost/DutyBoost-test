// Spanish airport retailer demo data — generated from the same databases
// used by the RetailerCalculator (GLOBAL_AIRPORTS + estimateAvgBasketSpend).
//
// All 42 Spanish airports with travel retail are pulled from GLOBAL_AIRPORTS.
// Revenue is calculated using the calculator's model:
//   dailyRedemptions = daily_pax × conversionRate (15%)
//   monthlyRedemptions = dailyRedemptions × 365 / 12
//   avgSale = estimateAvgBasketSpend(airport)  → [€35, €150]
//   revenue = redemptions × avgSale

import { GLOBAL_AIRPORTS } from "./globalAirports";
import { estimateAvgBasketSpend } from "../utils/airportBasketEstimate";

// ── Calculator constants (mirror RetailerCalculator defaults) ──────────────────
const CONVERSION_RATE = 15;          // 15% of daily passengers
const PLATFORM_FEE_PCT = 0.025;      // 2.5% of basket

// ── Spanish retailer name pools ───────────────────────────────────────────────
const RETAIL_NAMES = [
  "El Viajero Duty Free", "Ibérica Boutique", "Casa del Sol", "Andalucía Gifts",
  "Madrid Moda", "Cataluña Souvenirs", "La Tienda del Vuelo", "Boutique España",
  "Costa Duty Free", "Plaza Mayor Retail", "Don Quijote Souvenirs", "Alhambra Gifts",
  "Sevillana Boutique", "Gaudí Fashion", "Olé Apparel", "Iberia Luxe",
  "Gran Vía Retail", "El Corte Inglés Travel", "Sunglass Hut España", "Cottet Óptica",
  "Relay España", "Inoteca Wine Shop", "Aldeasa Duty Free", "Diversia Retail",
];

const FNB_NAMES = [
  "Café Madrid", "La Taberna del Aeropuerto", "Bocaditos & Co.", "El Rincón del Jamón",
  "Tapas Terminal", "Cafetería del Sol", "La Cantina Española", "Barcelona Bites",
  "Zumo Natural", "Churros & Chocolate", "El Patio F&B", "Paella Express",
  "La Barraca", "Café Gijón", "Mesón del Vuelo", "Bocata & Cía",
  "Rodilla Café", "VIPS Express", "Áreas Food Court", "SSP España",
  "Cervecería Santa Bárbara", "Jamón & Jamón", "El Mediterráneo", "Tapería del Aire",
];

// ── Number of retailers per airport, based on annual passenger volume ─────────
function retailerCount(annualPax) {
  if (annualPax >= 40_000_000) return 6;
  if (annualPax >= 20_000_000) return 5;
  if (annualPax >= 10_000_000) return 4;
  if (annualPax >= 5_000_000)  return 3;
  if (annualPax >= 1_000_000)  return 2;
  return 1;
}

// Revenue distribution weights among retailers at the same airport
const WEIGHTS = {
  1: [1.0],
  2: [0.55, 0.45],
  3: [0.40, 0.35, 0.25],
  4: [0.32, 0.28, 0.22, 0.18],
  5: [0.28, 0.24, 0.20, 0.16, 0.12],
  6: [0.24, 0.21, 0.18, 0.15, 0.12, 0.10],
};

// ── Filter all Spanish airports from the global database ──────────────────────
const spanishAirportData = GLOBAL_AIRPORTS.filter(a => a.country === "Spain");

// ── Generate AIRPORTS list ────────────────────────────────────────────────────
export const AIRPORTS = spanishAirportData.map(a => ({
  code: a.code,
  name: a.name,
  city: a.city,
}));

// ── Generate RETAILERS with Spanish names and calculator-based revenue ───────
let _retailIdx = 0;
let _fnbIdx = 0;
let _idCounter = 0;

export const RETAILERS = spanishAirportData.flatMap(airport => {
  const count = retailerCount(airport.annual_pax);
  const retailBasket = estimateAvgBasketSpend(airport);     // [35, 150] — calculator model
  const fnbBasket = Math.max(35, Math.round(retailBasket * 0.50)); // F&B ~50% of retail, min €35 (DutyCredit activation minimum)
  const dailyRedemptions = Math.round(airport.daily_pax * (CONVERSION_RATE / 100));
  const monthlyRedemptions = Math.round(dailyRedemptions * 365 / 12);
  const weights = WEIGHTS[count];

  return Array.from({ length: count }, (_, i) => {
    const isRetail = i % 2 === 0; // alternate: retail, F&B, retail, ...
    const namePool = isRetail ? RETAIL_NAMES : FNB_NAMES;
    const name = namePool[isRetail ? _retailIdx++ : _fnbIdx++];
    const avgSale = isRetail ? retailBasket : fnbBasket;
    const redemptions = Math.round(monthlyRedemptions * weights[i]);
    const revenue = redemptions * avgSale;

    _idCounter++;
    return {
      id: `r${_idCounter}`,
      name,
      airport: airport.code,
      category: isRetail ? "Retail" : "Food & Beverage",
      redemptions,
      avg_sale: avgSale,
      revenue,
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

// Last 6 months: Jan–Jun (current month is Jun 2026)
export const MONTHLY_DATA = MONTHLY_SEASONALITY.slice(0, 6).map(({ month, mult }) => {
  const redemptions = Math.round(baseMonthlyRedemptions * mult);
  const revenue = Math.round(baseMonthlyRevenue * mult);
  return { month, redemptions, revenue, commission: Math.round(revenue * PLATFORM_FEE_PCT * 100) / 100 };
});

// Full 12 months: Jul–Jun
export const YEARLY_DATA = [
  ...MONTHLY_SEASONALITY.slice(6),  // Jul–Dec
  ...MONTHLY_SEASONALITY.slice(0, 6), // Jan–Jun
].map(({ month, mult }) => {
  const redemptions = Math.round(baseMonthlyRedemptions * mult);
  const revenue = Math.round(baseMonthlyRevenue * mult);
  return { month, redemptions, revenue, commission: Math.round(revenue * PLATFORM_FEE_PCT * 100) / 100 };
});

// Last 7 days (day-of-week variation; 27 Jun 2026 is Saturday)
const DAILY_SEASONALITY = [
  { day: "21 Jun", mult: 1.10 }, // Sun
  { day: "22 Jun", mult: 0.85 }, // Mon
  { day: "23 Jun", mult: 0.80 }, // Tue
  { day: "24 Jun", mult: 0.85 }, // Wed
  { day: "25 Jun", mult: 0.95 }, // Thu
  { day: "26 Jun", mult: 1.10 }, // Fri
  { day: "27 Jun", mult: 1.20 }, // Sat
];

export const DAILY_DATA = DAILY_SEASONALITY.map(({ day, mult }) => ({
  day,
  redemptions: Math.round(baseDailyRedemptions * mult),
  revenue: Math.round(baseDailyRevenue * mult),
}));