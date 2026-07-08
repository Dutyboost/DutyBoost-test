// Enterprise ROI Calculator data layer — retailer profiles, airport grouping,
// benchmark estimation, and financial projections with confidence indicators.

import { AIRPORT_RETAIL_COMPANIES, RETAIL_AIRPORTS } from "./airportRetailCompanies";
import { estimateAvgBasketSpend } from "../utils/airportBasketEstimate";
import { calcSaving, PLATFORM_FEE_PCT, PLATFORM_FEE_CAP } from "../utils/retailerCalc";

// Demo data exports — real retailer store data (names, redemptions, baskets, revenue)
import { RETAILERS as LTR_RETAILERS, STORE_COUNT as LTR_STORE_COUNT } from "./demoDataLagardere";
import { RETAILERS as AVOLTA_RETAILERS, STORE_COUNT as AVOLTA_STORE_COUNT } from "./demoDataAvolta";
import { RETAILERS as HEINEMANN_RETAILERS } from "./demoDataHeinemann";

const byName = Object.fromEntries(AIRPORT_RETAIL_COMPANIES.map((c) => [c.name, c]));

// ── King Power (Thailand-focused — not in existing dataset) ──────────────────
const KING_POWER_AIRPORTS = [
  { code: "BKK", name: "Bangkok Suvarnabhumi", city: "Bangkok", country: "Thailand", region: "Asia", annual_pax: 65000000, daily_pax: 178082 },
  { code: "DMK", name: "Bangkok Don Mueang", city: "Bangkok", country: "Thailand", region: "Asia", annual_pax: 25000000, daily_pax: 68493 },
  { code: "HKT", name: "Phuket International", city: "Phuket", country: "Thailand", region: "Asia", annual_pax: 18300000, daily_pax: 50137 },
  { code: "CNX", name: "Chiang Mai International", city: "Chiang Mai", country: "Thailand", region: "Asia", annual_pax: 11000000, daily_pax: 30137 },
  { code: "KBV", name: "Krabi International", city: "Krabi", country: "Thailand", region: "Asia", annual_pax: 5000000, daily_pax: 13699 },
  { code: "HDY", name: "Hat Yai International", city: "Hat Yai", country: "Thailand", region: "Asia", annual_pax: 4000000, daily_pax: 10959 },
  { code: "CEI", name: "Chiang Rai International", city: "Chiang Rai", country: "Thailand", region: "Asia", annual_pax: 3000000, daily_pax: 8219 },
  { code: "UTP", name: "U-Tapao International", city: "Rayong", country: "Thailand", region: "Asia", annual_pax: 3000000, daily_pax: 8219 },
];

const OTHER_AIRPORTS = Object.values(RETAIL_AIRPORTS);

export const ENTERPRISE_RETAILERS = [
  // ── Demo-backed companies (exact airport lists from the demos) ──
  { key: "lagardere", name: "Lagardère Travel Retail", airports: byName["Lagardère Travel Retail"]?.airports || [], storeCount: LTR_STORE_COUNT, demoRetailers: LTR_RETAILERS, hqCountry: "France", description: "Global travel retailer across 61 countries" },
  { key: "avolta", name: "Avolta", airports: byName["Avolta (incl. World Duty Free, Hudson, Dufry)"]?.airports || [], storeCount: AVOLTA_STORE_COUNT, demoRetailers: AVOLTA_RETAILERS, hqCountry: "Switzerland", description: "World's largest airport retailer — 5,100+ outlets in 70+ countries" },
  { key: "heinemann", name: "Gebr. Heinemann", airports: byName["Gebr. Heinemann"]?.airports || [], storeCount: HEINEMANN_RETAILERS.length, demoRetailers: HEINEMANN_RETAILERS, hqCountry: "Germany", description: "Family-owned duty free retailer across 50+ countries" },
  { key: "dfs", name: "DFS Group", airports: byName["DFS Group"]?.airports || [], hqCountry: "Hong Kong", description: "Luxury travel retailer — LVMH-owned" },
  { key: "lotte", name: "Lotte Duty Free", airports: byName["Lotte Duty Free"]?.airports || [], hqCountry: "South Korea", description: "Leading Asian duty free retailer" },
  { key: "shilla", name: "The Shilla Duty Free", airports: byName["The Shilla Duty Free"]?.airports || [], hqCountry: "South Korea", description: "Samsung affiliate — luxury duty free" },
  { key: "cdfg", name: "China Duty Free Group (CDFG)", airports: byName["China Duty Free Group (CDFG)"]?.airports || [], hqCountry: "China", description: "China's state-owned duty free group" },
  { key: "dubai_df", name: "Dubai Duty Free", airports: byName["Dubai Duty Free"]?.airports || [], hqCountry: "United Arab Emirates", description: "One of the world's largest single-airport duty free operations" },
  { key: "qatar_df", name: "Qatar Duty Free", airports: byName["Qatar Duty Free"]?.airports || [], hqCountry: "Qatar", description: "Luxury duty free at Hamad International Airport" },
  { key: "whsmith", name: "WHSmith Travel", airports: byName["WHSmith Travel"]?.airports || [], hqCountry: "United Kingdom", description: "Travel essentials and duty free across global airports" },
  { key: "ari", name: "Aer Rianta International (ARI)", airports: byName["Aer Rianta International (ARI)"]?.airports || [], hqCountry: "Ireland", description: "Airport retail specialist in 30+ countries" },
  { key: "flemingo", name: "Flemingo Travel Retail", airports: byName["Flemingo Travel Retail"]?.airports || [], hqCountry: "United Arab Emirates", description: "Duty free retailer across Middle East & Asia" },
  { key: "emirates_leisure", name: "Emirates Leisure Retail", airports: byName["Emirates Leisure Retail"]?.airports || [], hqCountry: "United Arab Emirates", description: "Dubai-based airport F&B and retail operator" },
  { key: "tav", name: "TAV Airports Retail", airports: byName["TAV Airports Retail"]?.airports || [], hqCountry: "Turkey", description: "Turkish airport retail operator" },
  { key: "rimas", name: "Rimas Colombia", airports: byName["Rimas Colombia"]?.airports || [], hqCountry: "Colombia", description: "Colombian airport retail specialist" },
  { key: "travel_retail_sweden", name: "Travel Retail Sweden", airports: byName["Travel Retail Sweden"]?.airports || [], hqCountry: "Sweden", description: "Swedish airport travel retail operator" },
  { key: "intershop", name: "Intershop (Switzerland)", airports: byName["Intershop (Switzerland)"]?.airports || [], hqCountry: "Switzerland", description: "Swiss duty free and travel retailer" },
  { key: "jat", name: "JAT Retail", airports: byName["JAT Retail"]?.airports || [], hqCountry: "Serbia", description: "Belgrade-based airport retail operator" },
  { key: "flemingo_india", name: "Flemingo India", airports: byName["Flemingo India"]?.airports || [], hqCountry: "India", description: "Indian airport duty free operator" },
  // ── Additional ──
  { key: "king_power", name: "King Power", airports: KING_POWER_AIRPORTS, hqCountry: "Thailand", description: "Thailand's leading duty free retailer" },
  { key: "other", name: "Other", airports: OTHER_AIRPORTS, hqCountry: null, description: "Custom — select from global airport network" },
];

export function getRetailerByKey(key) {
  return ENTERPRISE_RETAILERS.find((r) => r.key === key) || null;
}

// ── Region normalization ─────────────────────────────────────────────────────
function normalizeRegion(region) {
  if (region === "Asia" || region === "Oceania") return "Asia-Pacific";
  if (region === "Middle East" || region === "Africa") return "Middle East & Africa";
  if (region === "Americas") return "Americas";
  return "Europe";
}

const REGION_ORDER = ["Europe", "Americas", "Asia-Pacific", "Middle East & Africa"];

export function groupAirportsByRegion(airports) {
  const regions = {};
  airports.forEach((a) => {
    const region = normalizeRegion(a.region || "Europe");
    if (!regions[region]) regions[region] = {};
    if (!regions[region][a.country]) regions[region][a.country] = [];
    regions[region][a.country].push(a);
  });
  return REGION_ORDER.filter((r) => regions[r]).map((region) => ({
    region,
    countries: Object.entries(regions[region])
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([country, aps]) => ({ country, airports: aps.sort((a, b) => (b.annual_pax || 0) - (a.annual_pax || 0)) })),
  }));
}

// ── International passenger % estimation by country ──────────────────────────
function estimateIntlPct(airport) {
  const c = airport.country;
  const HUBS = ["Singapore", "Hong Kong", "United Arab Emirates", "Qatar", "Bahrain", "Kuwait", "Oman"];
  if (HUBS.includes(c)) return 95;
  const SMALL = ["Netherlands", "Belgium", "Switzerland", "Luxembourg", "Ireland", "Denmark", "Norway", "Sweden", "Finland", "Portugal", "Greece", "Croatia", "Slovenia", "Slovakia", "Estonia", "Latvia", "Lithuania", "Iceland", "Malta", "Cyprus", "Jersey", "Armenia", "Cape Verde", "Mauritius"];
  if (SMALL.includes(c)) return 80;
  const MEDIUM = ["Germany", "France", "United Kingdom", "Spain", "Italy", "Poland", "Austria", "Czech Republic", "Hungary", "Romania", "Bulgaria", "Serbia", "Turkey", "Israel", "Tunisia"];
  if (MEDIUM.includes(c)) return 65;
  const LARGE = ["United States", "China", "India", "Brazil", "Australia", "Canada", "Russia", "Japan", "Mexico", "Argentina"];
  if (LARGE.includes(c)) return 30;
  const RESORT = ["Thailand", "Indonesia", "Vietnam", "Philippines", "Cambodia", "Sri Lanka", "Egypt", "Morocco", "Kenya", "Nigeria", "South Africa", "Colombia", "Chile", "Peru", "Ecuador", "Bolivia"];
  if (RESORT.includes(c)) return 75;
  return 60;
}

// ── Confidence levels ────────────────────────────────────────────────────────
export const CONFIDENCE_LEVELS = {
  high: { label: "High", desc: "Based on retailer- or airport-specific data", dot: "bg-emerald-500", badge: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  medium: { label: "Medium", desc: "Based on country averages", dot: "bg-amber-500", badge: "bg-amber-50 text-amber-700 border-amber-200" },
  estimated: { label: "Estimated", desc: "Based on regional or industry benchmarks", dot: "bg-slate-400", badge: "bg-slate-100 text-slate-600 border-slate-200" },
};

const SHOP_RATE = 0.20; // 20% of pax shop at airport retail (ETRC / m1nd-set)
const MONTHLY_SEASONALITY = [
  { month: "Jan", mult: 0.75 }, { month: "Feb", mult: 0.80 }, { month: "Mar", mult: 0.90 },
  { month: "Apr", mult: 0.95 }, { month: "May", mult: 1.00 }, { month: "Jun", mult: 1.10 },
  { month: "Jul", mult: 1.20 }, { month: "Aug", mult: 1.25 }, { month: "Sep", mult: 1.00 },
  { month: "Oct", mult: 0.90 }, { month: "Nov", mult: 0.85 }, { month: "Dec", mult: 1.15 },
];

function estimateStoreCount(airport) {
  const pax = airport.annual_pax || ((airport.daily_pax || 0) * 365);
  if (pax >= 80_000_000) return 35;
  if (pax >= 60_000_000) return 28;
  if (pax >= 40_000_000) return 22;
  if (pax >= 30_000_000) return 18;
  if (pax >= 20_000_000) return 14;
  if (pax >= 15_000_000) return 10;
  if (pax >= 10_000_000) return 8;
  if (pax >= 5_000_000) return 5;
  if (pax >= 1_000_000) return 3;
  return 2;
}

// ── Benchmark computation ────────────────────────────────────────────────────
// When demoRetailers is provided (Lagardère, Avolta, Heinemann), use the real
// store-level data: actual store names, redemption counts, basket values, and
// revenue figures from the demo datasets. Otherwise fall back to heuristics.
export function computeSelectionBenchmarks(airports, demoRetailers) {
  if (!airports || airports.length === 0) {
    return { annualPax: 0, intlPax: 0, domesticPax: 0, avgBasket: 0, avgRetailSpend: 0, dutyCreditTravelers: 0, storeCount: 0, monthlyRedemptions: 0, confidence: {} };
  }
  const totalAnnualPax = airports.reduce((s, a) => s + (a.annual_pax || 0), 0);
  const totalDailyPax = airports.reduce((s, a) => s + (a.daily_pax || Math.round((a.annual_pax || 0) / 365)), 0);
  const intlPax = airports.reduce((s, a) => s + (a.annual_pax || 0) * estimateIntlPct(a) / 100, 0);

  // ── Demo-backed path: use real store data ──
  if (demoRetailers && demoRetailers.length > 0) {
    const selectedCodes = new Set(airports.map((a) => a.code));
    const matchingStores = demoRetailers.filter((r) => selectedCodes.has(r.airport));
    const storeCount = matchingStores.length;

    // Traffic-weighted avg basket (weighted by redemptions per store)
    let weightedBasketSum = 0, totalRedemptions = 0, totalRevenue = 0;
    matchingStores.forEach((r) => {
      weightedBasketSum += r.redemptions * r.avg_sale;
      totalRedemptions += r.redemptions;
      totalRevenue += r.revenue;
    });
    const avgBasket = totalRedemptions > 0 ? weightedBasketSum / totalRedemptions : 0;
    const monthlyRedemptions = totalRedemptions;
    const avgRetailSpend = avgBasket * SHOP_RATE;
    const dutyCreditTravelers = Math.round(totalAnnualPax * 0.01 / 100);

    return {
      annualPax: totalAnnualPax,
      intlPax: Math.round(intlPax),
      domesticPax: Math.round(totalAnnualPax - intlPax),
      avgBasket: Math.round(avgBasket * 100) / 100,
      avgRetailSpend: Math.round(avgRetailSpend * 100) / 100,
      dutyCreditTravelers,
      storeCount,
      monthlyRedemptions,
      monthlyRevenue: Math.round(totalRevenue * 100) / 100,
      confidence: {
        annualPax: "high", intlPax: "estimated", domesticPax: "estimated",
        avgBasket: "high", avgRetailSpend: "high",
        dutyCreditTravelers: "high", storeCount: "high",
      },
    };
  }

  // ── Heuristic path (non-demo retailers) ──
  let weightedBasket = 0;
  airports.forEach((a) => {
    const dp = a.daily_pax || Math.round((a.annual_pax || 0) / 365);
    weightedBasket += dp * estimateAvgBasketSpend(a);
  });
  const avgBasket = totalDailyPax > 0 ? weightedBasket / totalDailyPax : 0;
  const avgRetailSpend = avgBasket * SHOP_RATE;
  const dutyCreditTravelers = Math.round(totalAnnualPax * 0.01 / 100);
  const storeCount = airports.reduce((s, a) => s + estimateStoreCount(a), 0);

  return {
    annualPax: totalAnnualPax,
    intlPax: Math.round(intlPax),
    domesticPax: Math.round(totalAnnualPax - intlPax),
    avgBasket: Math.round(avgBasket * 100) / 100,
    avgRetailSpend: Math.round(avgRetailSpend * 100) / 100,
    dutyCreditTravelers,
    storeCount,
    monthlyRedemptions: 0,
    confidence: {
      annualPax: "high", intlPax: "estimated", domesticPax: "estimated",
      avgBasket: "medium", avgRetailSpend: "estimated",
      dutyCreditTravelers: "estimated", storeCount: "medium",
    },
  };
}

// ── Financial projections ────────────────────────────────────────────────────
export function computeProjections(benchmarks, assumptions) {
  const basket = assumptions.customBasket || benchmarks.avgBasket || 50;
  const redemptionRate = assumptions.redemptionRate ?? 0.01;
  const annualPax = benchmarks.annualPax || 0;

  // When demo data provides baseline monthly redemptions (at 0.01% conversion),
  // scale proportionally with the user's chosen redemption rate.
  const annualRedemptions = benchmarks.monthlyRedemptions > 0
    ? Math.round(benchmarks.monthlyRedemptions * 12 * (redemptionRate / 0.01))
    : Math.round(annualPax * redemptionRate / 100);

  const saving = calcSaving(basket);
  const commission = Math.min(Math.round(basket * PLATFORM_FEE_PCT * 100) / 100, PLATFORM_FEE_CAP);
  const netRevenuePerTx = Math.round((basket - saving - commission) * 100) / 100;
  const potentialIncrementalSales = Math.round(annualRedemptions * basket * 100) / 100;
  const dutyBoostCommission = Math.round(annualRedemptions * commission * 100) / 100;
  const retailerNetRevenue = Math.round(annualRedemptions * netRevenuePerTx * 100) / 100;
  const monthlyData = MONTHLY_SEASONALITY.map(({ month, mult }) => ({
    month,
    netRevenue: Math.round((retailerNetRevenue / 12) * mult * 100) / 100,
    redemptions: Math.round((annualRedemptions / 12) * mult),
  }));
  return { basket, saving, commission, netRevenuePerTx, annualRedemptions, potentialIncrementalSales, dutyBoostCommission, retailerNetRevenue, monthlyData };
}

export function computeRegionBreakdown(airports, assumptions, demoRetailers) {
  const groups = groupAirportsByRegion(airports);
  return groups.map((g) => {
    const regionAirports = g.countries.flatMap((c) => c.airports);
    const bm = computeSelectionBenchmarks(regionAirports, demoRetailers);
    const proj = computeProjections(bm, assumptions);
    return { region: g.region, airportCount: regionAirports.length, annualPax: bm.annualPax, netRevenue: proj.retailerNetRevenue, redemptions: proj.annualRedemptions };
  });
}

export function computeTopAirports(airports, limit = 10) {
  return [...airports].sort((a, b) => (b.annual_pax || 0) - (a.annual_pax || 0)).slice(0, limit).map((a) => ({ name: a.city || a.name, code: a.code, annualPax: a.annual_pax || 0 }));
}

export function getSelectedCountries(airports) {
  return [...new Set(airports.map((a) => a.country))].length;
}

// ── Per-airport basket values (for airports a user manages) ──────────────────
export function computePerAirportBaskets(airports, demoRetailers) {
  if (!airports || airports.length === 0) return {};
  const result = {};
  if (demoRetailers && demoRetailers.length > 0) {
    const byCode = {};
    demoRetailers.forEach((r) => {
      if (!byCode[r.airport]) byCode[r.airport] = [];
      byCode[r.airport].push(r);
    });
    airports.forEach((a) => {
      const stores = byCode[a.code] || [];
      let ws = 0, red = 0;
      stores.forEach((r) => { ws += r.redemptions * r.avg_sale; red += r.redemptions; });
      const basket = red > 0 ? ws / red : 0;
      result[a.code] = {
        basket: Math.round(basket * 100) / 100,
        confidence: stores.length > 0 ? "high" : "estimated",
        dailyPax: a.daily_pax || Math.round((a.annual_pax || 0) / 365),
      };
    });
  } else {
    airports.forEach((a) => {
      result[a.code] = {
        basket: estimateAvgBasketSpend(a),
        confidence: "medium",
        dailyPax: a.daily_pax || Math.round((a.annual_pax || 0) / 365),
      };
    });
  }
  return result;
}

export function computeEffectiveBasket(airports, airportBaskets, customBasketPerAirport, globalCustomBasket, fallbackAvgBasket) {
  const overrides = customBasketPerAirport || {};
  const hasOverrides = airports.some((a) => overrides[a.code] != null);
  if (!hasOverrides) return globalCustomBasket || fallbackAvgBasket || 50;
  let ws = 0, tw = 0;
  airports.forEach((a) => {
    const w = airportBaskets[a.code]?.dailyPax || 1;
    const v = overrides[a.code] != null ? overrides[a.code] : (airportBaskets[a.code]?.basket || fallbackAvgBasket || 50);
    ws += w * v;
    tw += w;
  });
  return tw > 0 ? Math.round((ws / tw) * 100) / 100 : (globalCustomBasket || fallbackAvgBasket || 50);
}

// ── Formatting helpers ───────────────────────────────────────────────────────
export function fmtCompact(n) {
  if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(1) + "B";
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return String(Math.round(n));
}

export function fmtEurCompact(n) {
  if (n >= 1_000_000) return "€" + (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return "€" + (n / 1_000).toFixed(1) + "K";
  return "€" + Math.round(n).toLocaleString("en-US");
}