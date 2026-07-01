// Retailer POS eligibility — hidden feature.
//
// DutyCredits are only truly redeemable at airports where a retail company
// operating there has implemented DutyBoost in their POS. This module maps
// IATA airport codes to retail companies that have gone live with DutyBoost.
//
// The feature is gated by POS_ELIGIBILITY_CHECK_ENABLED. While false, the
// eligibility page behaves as before (any future departure qualifies). Flip
// the flag to true to enforce the retailer-POS check.

import { AIRPORT_RETAIL_COMPANIES } from "@/data/airportRetailCompanies";

// Master feature flag — kept off until rollout.
export const POS_ELIGIBILITY_CHECK_ENABLED = false;

// Retail companies that have implemented DutyBoost in their POS.
// Names must match exactly the `name` field in AIRPORT_RETAIL_COMPANIES.
// Start empty — populated as partners go live.
export const DUTYBOOST_LIVE_RETAILERS = [];

// Build a lookup: IATA code → list of live retail company names operating there.
const AIRPORT_TO_LIVE_RETAILERS = (() => {
  const map = {};
  for (const company of AIRPORT_RETAIL_COMPANIES) {
    if (!DUTYBOOST_LIVE_RETAILERS.includes(company.name)) continue;
    for (const airport of company.airports || []) {
      const code = (airport.code || "").toUpperCase();
      if (!code) continue;
      if (!map[code]) map[code] = [];
      map[code].push(company.name);
    }
  }
  return map;
})();

// Returns { enabled: boolean, retailers: string[] } for a given IATA code.
export function getAirportRetailerStatus(airportCode) {
  if (!airportCode) return { enabled: false, retailers: [] };
  const code = airportCode.toUpperCase();
  const retailers = AIRPORT_TO_LIVE_RETAILERS[code] || [];
  return { enabled: retailers.length > 0, retailers };
}

// Convenience: should this airport pass the DutyBoost POS eligibility gate?
export function isAirportDutyBoostEnabled(airportCode) {
  if (!POS_ELIGIBILITY_CHECK_ENABLED) return true;
  return getAirportRetailerStatus(airportCode).enabled;
}