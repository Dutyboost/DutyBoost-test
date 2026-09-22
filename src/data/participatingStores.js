import { STORE_NAMES as SXM_STORES } from "./demoDataSintMaarten";
import { AIRPORT_STORES } from "./airportStores";

// Airport-specific real store lists — when present these ARE the participating
// stores. Only verified, airport-specific data is used here; airports without
// verified data show no store list rather than invented brand names.
const AIRPORT_SPECIFIC_STORES = {
  SXM: SXM_STORES,
  ...AIRPORT_STORES,
};

/**
 * Build the participating-store list for an airport.
 * Order of precedence: verified airport-specific stores, then real retailers
 * registered in the database for that airport. Airports with neither show an
 * empty list.
 */
export function buildParticipatingStores(airportCode, airportCity, dbStores = []) {
  const seen = new Set();
  const result = [];

  // Verified airport-specific stores
  const specific = AIRPORT_SPECIFIC_STORES[(airportCode || '').toUpperCase()] || [];
  specific.forEach(name => {
    if (!seen.has(name.toLowerCase())) {
      seen.add(name.toLowerCase());
      result.push({ name });
    }
  });

  // Retailers registered in the database for this airport
  (dbStores || []).forEach(s => {
    const name = s.store_name || s.name;
    if (name && !seen.has(name.toLowerCase())) {
      seen.add(name.toLowerCase());
      result.push({ name });
    }
  });

  return result;
}