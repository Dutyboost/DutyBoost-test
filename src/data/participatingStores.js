import { STORE_NAMES as SXM_STORES } from "./demoDataSintMaarten";
import { AIRPORT_STORES } from "./airportStores";

// Airport-specific real store lists — when present these ARE the participating
// stores. Only verified, airport-specific data is used here; airports without
// verified data show no store list rather than invented brand names.
const AIRPORT_SPECIFIC_STORES = {
  SXM: SXM_STORES,
  ...AIRPORT_STORES,
};

// DutyBoost is retail and travel retail only — no food and beverage.
const FNB_CATEGORY = /food|beverage|drink|restaurant|cafe|café|coffee|bar\b|snack|bakery|deli|bistro|grill|kitchen|grocery|supermarket|eatery/i;
// ...and outlet names that are unmistakably food or drink brands.
const FNB_NAME = /haribo|lolly|dulce|gourmet|nespresso|starbucks|caf[eé]|coffee|bistro|restaurant|grill|bakery|snack|deli\b|ice cream|gelato|pizza|burger|supermarket|grocery/i;

/**
 * Build the participating-store list for an airport.
 * Order of precedence: verified airport-specific stores, then real retailers
 * registered in the database for that airport. Airports with neither show an
 * empty list.
 *
 * Each entry is { name, category, departure_hall }. Sources that carry no
 * location (the hand-verified name lists) are enriched from a later source
 * that does, so the same shop is never listed twice with less detail.
 */
export function buildParticipatingStores(airportCode, airportCity, dbStores = []) {
  const byName = new Map();

  const add = (name, category, departureHall) => {
    const key = name.toLowerCase();
    const existing = byName.get(key);
    if (!existing) {
      byName.set(key, {
        name,
        category: category || '',
        departure_hall: departureHall || '',
      });
      return;
    }
    if (!existing.category && category) existing.category = category;
    if (!existing.departure_hall && departureHall) existing.departure_hall = departureHall;
  };

  const specific = AIRPORT_SPECIFIC_STORES[(airportCode || '').toUpperCase()] || [];
  specific.forEach((name) => add(name, '', ''));

  (dbStores || []).forEach((s) => {
    const name = s.store_name || s.name;
    if (!name) return;
    if (s.category && FNB_CATEGORY.test(s.category)) return;
    if (FNB_NAME.test(name)) return;
    add(name, s.category, s.departure_hall);
  });

  return [...byName.values()];
}