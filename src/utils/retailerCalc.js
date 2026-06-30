import { estimateAvgBasketSpend } from "./airportBasketEstimate";

export const PLATFORM_FEE_PCT = 0.025;
export const PLATFORM_FEE_CAP = 25;

export function calcSaving(spend) {
  if (spend < 35) return 0;
  if (spend >= 300) return 60.0;
  if (spend >= 250) return 45.0;
  if (spend >= 200) return 30.0;
  if (spend >= 150) return 20.0;
  if (spend >= 100) return 10.0;
  if (spend >= 70) return 5.0;
  return 2.5;
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
  const commission = Math.min(Math.round(basket * PLATFORM_FEE_PCT * 100) / 100, PLATFORM_FEE_CAP);
  const netRevenue = Math.round((basket - saving - commission) * 100) / 100;
  const dailyRedemptions = Math.round(airport.daily_pax * (conversionRate / 100));
  const monthlyNet = Math.round((dailyRedemptions * netRevenue * 365) / 12 * 100) / 100;
  const annualNet = Math.round(monthlyNet * 12 * 100) / 100;
  const dailyNet = Math.round((monthlyNet * 12) / 365 * 100) / 100;
  return { basket, saving, commission, netRevenue, dailyRedemptions, monthlyNet, annualNet, dailyNet };
}

// Global aggregation across a company's airports:
//  - traffic-weighted average basket
//  - total daily travelers
//  - combined net revenue / platform fee projections
export function computeCompanyTotals(airports, conversionRate) {
  let totalPax = 0;
  let weightedBasket = 0;
  let monthlyNet = 0, annualNet = 0, dailyNet = 0;
  let dailyRedemptions = 0, monthlyFee = 0;
  const rows = airports.map((a) => {
    const r = computeAirport(a, conversionRate);
    totalPax += a.daily_pax;
    weightedBasket += a.daily_pax * r.basket;
    monthlyNet += r.monthlyNet;
    annualNet += r.annualNet;
    dailyNet += r.dailyNet;
    dailyRedemptions += r.dailyRedemptions;
    monthlyFee += Math.round((r.dailyRedemptions * r.commission * 365) / 12 * 100) / 100;
    return { airport: a, ...r };
  });
  const avgBasket = totalPax > 0 ? Math.round((weightedBasket / totalPax) * 100) / 100 : 0;
  const annualFee = Math.round(monthlyFee * 12 * 100) / 100;
  const dailyFee = Math.round((monthlyFee * 12) / 365 * 100) / 100;
  return { rows, avgBasket, totalDailyTravelers: totalPax, dailyRedemptions, monthlyNet, annualNet, dailyNet, monthlyFee, annualFee, dailyFee };
}

// Estimate store count per airport based on passenger volume (tiered heuristic)
export function estimateStoreCount(airport) {
  const pax = airport.annual_pax || (airport.daily_pax * 365);
  if (pax >= 80_000_000) return 55;
  if (pax >= 60_000_000) return 42;
  if (pax >= 40_000_000) return 32;
  if (pax >= 30_000_000) return 26;
  if (pax >= 20_000_000) return 22;
  if (pax >= 15_000_000) return 18;
  if (pax >= 10_000_000) return 16;
  if (pax >= 5_000_000)  return 15;
  if (pax >= 1_000_000)  return 13;
  return 11;
}

export function computeCompanyStoreCount(airports) {
  return airports.reduce((s, a) => s + estimateStoreCount(a), 0);
}