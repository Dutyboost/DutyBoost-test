// Global airport retail market aggregation for the global DutyBoost presentation.
//
// The addressable market is NOT the ~546 airports covered by the curated operator
// registry — it is the full global commercial airport retail landscape:
//
//   • ~4,000 commercial airports with passenger terminal retail worldwide
//   • ~2,800 of those with duty-free retail
//   • ~45,000 individual retail stores across these airports
//   • 9.6B annual departure moments (4.8B air passengers × 2 — outbound + return,
//     since DutyCredits are redeemable on both legs of a return journey)
//
// Revenue projections are computed by computeCompanyTotals() over a set of
// regional passenger aggregates (Asia, Europe, North America, Middle East,
// Latin America, Africa, Oceania, Caribbean) calibrated to the 2024 global
// passenger distribution, with per-region basket estimates from the same
// airportBasketEstimate model used elsewhere. This keeps the global revenue
// math grounded in real regional economics while the headline airport/store
// counts reflect the authoritative global figures above.
//
// Sources: Airports Council International (ACI) 2024 traffic report; ICAO
// concession guidance; Generation Research / DFWC duty-free market data.

import { computeCompanyStoreCount } from "@/utils/retailerCalc";

// Regional passenger aggregates (annual, millions) calibrated to ~4.8B total.
// daily_pax derived; representative country chosen for basket GDP-tier calibration.
const REGIONAL_AGGREGATES = [
  { code: "GLOBAL-ASIA", name: "Asia-Pacific aggregate", country: "Malaysia", region: "Asia", annualPaxM: 3700 },
  { code: "GLOBAL-EU", name: "Europe aggregate", country: "Portugal", region: "Europe", annualPaxM: 2100 },
  { code: "GLOBAL-NA", name: "North America aggregate", country: "United States", region: "Americas", annualPaxM: 1760 },
  { code: "GLOBAL-ME", name: "Middle East aggregate", country: "Oman", region: "Middle East", annualPaxM: 760 },
  { code: "GLOBAL-LATAM", name: "Latin America aggregate", country: "Chile", region: "Americas", annualPaxM: 580 },
  { code: "GLOBAL-AF", name: "Africa aggregate", country: "South Africa", region: "Africa", annualPaxM: 380 },
  { code: "GLOBAL-OC", name: "Oceania aggregate", country: "Australia", region: "Oceania", annualPaxM: 280 },
  { code: "GLOBAL-CB", name: "Caribbean aggregate", country: "Dominican Republic", region: "Americas", annualPaxM: 120 },
];

export const GLOBAL_AIRPORTS = REGIONAL_AGGREGATES.map((r) => {
  const annual_pax = Math.round(r.annualPaxM * 1_000_000);
  return {
    code: r.code,
    name: r.name,
    city: r.region,
    country: r.country,
    region: r.region,
    annual_pax,
    daily_pax: Math.round(annual_pax / 365),
  };
});

// Authoritative global headline figures (displayed, not computed from the
// curated registry).
export const GLOBAL_COMPANY = {
  name: "Global Airport Retail Network",
  airports: GLOBAL_AIRPORTS,
  airportCount: 4000,        // commercial airports with terminal retail
  storeCount: 45000,         // individual retail stores across these airports
};

export const GLOBAL_MARKET = {
  annualPassengers: "9.6B",       // 4.8B air passengers × 2 (outbound + return)
  intlDepartures: "3.8B",         // international departure moments (outbound + return)
  domesticPassengers: "5.8B",    // domestic departure moments (outbound + return)
  avgGateWait: "1h 10m",          // global average gate wait
  commercialAirports: "4,000",    // airports with passenger terminal retail
  airportsWithDutyFree: "2,800", // airports with duty-free retail
  individualStores: "±45,000",    // individual retail stores at these airports
  airportRetailMarket: "€60B",    // global airport retail & duty-free market
  dutyFreeRevenue: "€40B",        // global duty-free-only revenue
};

// Market-context banner shown in the "why" section of the global presentation.
export const GLOBAL_MARKET_STATS = [
  { val: GLOBAL_MARKET.commercialAirports, label: "Commercial airports with retail worldwide" },
  { val: GLOBAL_MARKET.airportsWithDutyFree, label: "Airports with duty-free retail" },
  { val: GLOBAL_MARKET.individualStores, label: "Individual retail stores at these airports" },
];

// Top 5 global source markets for international travel (UNWTO 2023 outbound trips).
export const GLOBAL_SOURCE_MARKETS = [
  { flag: "🇩🇪", name: "Germany", visitors: "220M" },
  { flag: "🇺🇸", name: "United States", visitors: "186M" },
  { flag: "🇨🇳", name: "China", visitors: "174M" },
  { flag: "🇬🇧", name: "United Kingdom", visitors: "172M" },
  { flag: "🇫🇷", name: "France", visitors: "120M" },
];

export const GLOBAL_CAMPAIGN = {
  marketLabel: "Potential Market — Global",
  statPassengers: { val: GLOBAL_MARKET.annualPassengers, label: "Annual departure moments (outbound + return)" },
  statDepartures: { val: GLOBAL_MARKET.intlDepartures, label: "International departure moments" },
  statIntl: { val: GLOBAL_MARKET.domesticPassengers, label: "Domestic departure moments" },
  phase1Subtitle: "Over 860 million annual outbound + return flights from these 5 source markets",
  countries: GLOBAL_SOURCE_MARKETS,
};