// Global airport retail market aggregation.
//
// DutyBoost's addressable network = the union of all airports operated by the
// airport retail companies tracked in AIRPORT_RETAIL_COMPANIES, de-duplicated
// by IATA code. Store counts are estimated per airport from passenger volume.
//
// Global market context figures (global air passengers, global airport retail
// market, global duty-free revenue) are sourced from ACI / Generation Research
// 2024 industry data and exposed as constants for the presentation layer.

import { AIRPORT_RETAIL_COMPANIES } from "./airportRetailCompanies";
import { computeCompanyStoreCount } from "@/utils/retailerCalc";

// Build the de-duplicated global airport list across every company.
function buildGlobalAirports() {
  const byCode = new Map();
  for (const company of AIRPORT_RETAIL_COMPANIES) {
    if (!company?.airports) continue;
    for (const a of company.airports) {
      if (!a) continue;
      const key = a.code || a.iata || a.name;
      if (key && !byCode.has(key)) byCode.set(key, a);
    }
  }
  return Array.from(byCode.values());
}

export const GLOBAL_AIRPORTS = buildGlobalAirports();

export const GLOBAL_COMPANY = {
  name: "Global Airport Retail Network",
  airports: GLOBAL_AIRPORTS,
  storeCount: computeCompanyStoreCount(GLOBAL_AIRPORTS),
};

// Global market context (ACI / Generation Research 2024 figures).
export const GLOBAL_MARKET = {
  annualPassengers: "4.8B",       // 2024 global air passengers
  intlDepartures: "1.9B",         // international departures
  domesticPassengers: "2.9B",     // domestic passengers
  avgGateWait: "1h 10m",          // global average gate wait
  airportRetailMarket: "€95B",    // global airport retail & duty-free market
  dutyFreeRevenue: "€40B",        // global duty-free-only revenue
};

// Top 5 global source markets for international travel (UNWTO 2023 outbound trips).
export const GLOBAL_SOURCE_MARKETS = [
  { flag: "🇩🇪", name: "Germany", visitors: "110M" },
  { flag: "🇺🇸", name: "United States", visitors: "93M" },
  { flag: "🇨🇳", name: "China", visitors: "87M" },
  { flag: "🇬🇧", name: "United Kingdom", visitors: "86M" },
  { flag: "🇫🇷", name: "France", visitors: "60M" },
];

export const GLOBAL_CAMPAIGN = {
  marketLabel: "Potential Market — Global",
  statPassengers: { val: GLOBAL_MARKET.annualPassengers, label: "Annual air passengers" },
  statDepartures: { val: GLOBAL_MARKET.intlDepartures, label: "International departures" },
  statIntl: { val: GLOBAL_MARKET.domesticPassengers, label: "Domestic passengers" },
  phase1Subtitle: "Over 430 million annual international trips come from these 5 source markets",
  countries: GLOBAL_SOURCE_MARKETS,
};