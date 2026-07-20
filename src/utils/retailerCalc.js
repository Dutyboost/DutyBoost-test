import { estimateAvgBasketSpend } from "./airportBasketEstimate";

export const PLATFORM_FEE_PCT = 0.025;
export const PLATFORM_FEE_CAP = 25;

// Progressive percentage discount: scales from 5% at €20 up to 20% at €300+ (capped at 20%).
// Linear interpolation between breakpoints. Discount = spend × effective percentage.
const DISCOUNT_BREAKPOINTS = [
  { spend: 20,  pct: 0.05 },
  { spend: 50,  pct: 0.075 },
  { spend: 100, pct: 0.10 },
  { spend: 150, pct: 0.125 },
  { spend: 200, pct: 0.15 },
  { spend: 250, pct: 0.175 },
  { spend: 300, pct: 0.20 },
];

export function calcSaving(spend) {
  if (!spend || spend < 20) return 0;
  if (spend >= 300) return Math.round(spend * 0.20 * 100) / 100;
  // Linear interpolation between the two surrounding breakpoints
  let lower = DISCOUNT_BREAKPOINTS[0];
  let upper = DISCOUNT_BREAKPOINTS[DISCOUNT_BREAKPOINTS.length - 1];
  for (let i = 0; i < DISCOUNT_BREAKPOINTS.length - 1; i++) {
    if (spend >= DISCOUNT_BREAKPOINTS[i].spend && spend < DISCOUNT_BREAKPOINTS[i + 1].spend) {
      lower = DISCOUNT_BREAKPOINTS[i];
      upper = DISCOUNT_BREAKPOINTS[i + 1];
      break;
    }
  }
  const t = (spend - lower.spend) / (upper.spend - lower.spend);
  const pct = lower.pct + t * (upper.pct - lower.pct);
  return Math.round(spend * pct * 100) / 100;
}

// Platform fee: 2.5% of basket, capped at €25, waived entirely above €1000
export function calcPlatformFee(basket) {
  if (basket > 1000) return 0;
  return Math.min(Math.round(basket * PLATFORM_FEE_PCT * 100) / 100, PLATFORM_FEE_CAP);
}

export function numFontClass(str) {
  const len = String(str).length;
  if (len <= 8) return "text-2xl";
  if (len <= 11) return "text-xl";
  if (len <= 14) return "text-lg";
  return "text-base";
}

export function computeAirport(airport, conversionRate) {
  const basket = estimateAvgBasketSpend(airport);
  const saving = calcSaving(basket);
  const commission = calcPlatformFee(basket);
  const netRevenue = Math.round((basket - saving - commission) * 100) / 100;
  const grossRevenue = Math.round(basket * 100) / 100;
  const dailyRedemptions = Math.round(airport.daily_pax * (conversionRate / 100));
  const monthlyNet = Math.round((dailyRedemptions * netRevenue * 365) / 12 * 100) / 100;
  const annualNet = Math.round(monthlyNet * 12 * 100) / 100;
  const dailyNet = Math.round((monthlyNet * 12) / 365 * 100) / 100;
  const monthlyGross = Math.round((dailyRedemptions * grossRevenue * 365) / 12 * 100) / 100;
  const annualGross = Math.round(monthlyGross * 12 * 100) / 100;
  const dailyGross = Math.round((monthlyGross * 12) / 365 * 100) / 100;
  const monthlySaving = Math.round((dailyRedemptions * saving * 365) / 12 * 100) / 100;
  const annualSaving = Math.round(monthlySaving * 12 * 100) / 100;
  const dailySaving = Math.round((monthlySaving * 12) / 365 * 100) / 100;
  return { basket, saving, commission, netRevenue, grossRevenue, dailyRedemptions, monthlyNet, annualNet, dailyNet, monthlyGross, annualGross, dailyGross, monthlySaving, annualSaving, dailySaving };
}

// Global aggregation across a company's airports:
//  - traffic-weighted average basket
//  - total daily travelers
//  - combined net revenue / platform fee projections
export function computeCompanyTotals(airports, conversionRate) {
  let totalPax = 0;
  let weightedBasket = 0;
  let monthlyNet = 0, annualNet = 0, dailyNet = 0;
  let monthlyGross = 0, annualGross = 0, dailyGross = 0;
  let monthlySaving = 0, annualSaving = 0, dailySaving = 0;
  let dailyRedemptions = 0, monthlyFee = 0;
  const rows = airports.map((a) => {
    const r = computeAirport(a, conversionRate);
    totalPax += a.daily_pax;
    weightedBasket += a.daily_pax * r.basket;
    monthlyNet += r.monthlyNet;
    annualNet += r.annualNet;
    dailyNet += r.dailyNet;
    monthlyGross += r.monthlyGross;
    annualGross += r.annualGross;
    dailyGross += r.dailyGross;
    monthlySaving += r.monthlySaving;
    annualSaving += r.annualSaving;
    dailySaving += r.dailySaving;
    dailyRedemptions += r.dailyRedemptions;
    monthlyFee += Math.round((r.dailyRedemptions * r.commission * 365) / 12 * 100) / 100;
    return { airport: a, ...r };
  });
  const avgBasket = totalPax > 0 ? Math.round((weightedBasket / totalPax) * 100) / 100 : 0;
  const annualFee = Math.round(monthlyFee * 12 * 100) / 100;
  const dailyFee = Math.round((monthlyFee * 12) / 365 * 100) / 100;
  return { rows, avgBasket, totalDailyTravelers: totalPax, dailyRedemptions, monthlyNet, annualNet, dailyNet, monthlyGross, annualGross, dailyGross, monthlySaving, annualSaving, dailySaving, monthlyFee, annualFee, dailyFee };
}

// Estimate store count per airport based on passenger volume (tiered heuristic)
export function estimateStoreCount(airport) {
  const pax = airport.annual_pax || (airport.daily_pax * 365);
  if (pax >= 80_000_000) return 35;
  if (pax >= 60_000_000) return 28;
  if (pax >= 40_000_000) return 22;
  if (pax >= 30_000_000) return 18;
  if (pax >= 20_000_000) return 14;
  if (pax >= 15_000_000) return 10;
  if (pax >= 10_000_000) return 8;
  if (pax >= 5_000_000)  return 5;
  if (pax >= 1_000_000)  return 3;
  return 2;
}

export function computeCompanyStoreCount(airports) {
  return airports.reduce((s, a) => s + estimateStoreCount(a), 0);
}