// Indicative market traffic for a local retailer: every traveller who arrives in
// the market, by sea and by air — not just cruise passengers.
//
// Sea arrivals come from the 2025 cruise traffic used by the cruise calculator
// (passengersPerCall × callsPerYear, port authority / CLIA figures); air arrivals
// are the combined annual passenger figures of the market's airports. Both stay
// indicative planning values, not audited statistics.

import { COUNTRY_TRAFFIC, DEFAULT_RATES } from "./cruiseTrafficDefaults";
import { GLOBAL_AIRPORTS } from "./globalAirports";

const n = (v) => Number(v) || 0;

export const seaArrivalsFor = (country) => {
  const t = COUNTRY_TRAFFIC[country];
  return t ? Math.round(n(t.passengersPerCall) * n(t.callsPerYear)) : 0;
};

export const airArrivalsFor = (country) =>
  GLOBAL_AIRPORTS.reduce((sum, a) => (a.country === country ? sum + n(a.annual_pax) : sum), 0);

// Starting figures for one store in that market: the market's total arrivals,
// plus the model rates every market shares.
export const localTrafficFor = (country) => {
  const t = COUNTRY_TRAFFIC[country] || {};
  return {
    arrivalsPerYear: seaArrivalsFor(country) + airArrivalsFor(country),
    passRate: t.passRate ?? 45,
    ...DEFAULT_RATES,
  };
};