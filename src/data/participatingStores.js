import { STORE_NAMES as SXM_STORES } from "./demoDataSintMaarten";

// Curated pool of common airport retailer brands found across global airports.
// Used to supplement (or stand in for) database retailers so every airport
// always presents a believable list of 5–20 participating stores.
const STORE_POOL = [
  "World Duty Free", "Heinemann Duty Free", "Avolta", "Lotte Duty Free",
  "Dufry", "The Perfume Gallery", "Beauty & Fragrances", "Capi Electronics",
  "Hugo Boss", "Michael Kors", "Coach", "Tumi", "Samsonite",
  "Sunglass Hut", "Swarovski", "Pandora", "Relay", "WH Smith",
  "News & Books", "Travel Essentials", "Souvenir Shop", "Apple Store",
  "Best Buy Express", "Lacoste", "Calvin Klein", "Victoria's Secret",
  "Godiva Chocolatier", "Bottega Verde", "InMotion Electronics",
];

/**
 * Build a randomised list of 5–20 participating stores for an airport.
 * Database retailers (matching the airport) are shown first; the curated
 * pool fills the remainder up to a randomly chosen target count.
 */
// Airport-specific real store lists — when present these ARE the participating
// stores (no generic pool filler), so the claim page shows accurate retailers.
const AIRPORT_SPECIFIC_STORES = {
  SXM: SXM_STORES,
};

export function buildParticipatingStores(airportCode, airportCity, dbStores = []) {
  const seen = new Set();
  const result = [];

  // Airport-specific real stores take priority
  const specific = AIRPORT_SPECIFIC_STORES[(airportCode || '').toUpperCase()] || [];
  specific.forEach(name => {
    if (!seen.has(name.toLowerCase())) {
      seen.add(name.toLowerCase());
      result.push({ name });
    }
  });

  // Database retailers next
  (dbStores || []).forEach(s => {
    const name = s.store_name || s.name;
    if (name && !seen.has(name.toLowerCase())) {
      seen.add(name.toLowerCase());
      result.push({ name });
    }
  });

  // If this airport has a real store list, don't dilute it with the generic pool
  if (specific.length > 0) {
    return result;
  }

  // Otherwise fill from the curated pool so every airport shows 5–20 stores
  const target = 5 + Math.floor(Math.random() * 16); // 5..20 inclusive
  const pool = [...STORE_POOL].sort(() => Math.random() - 0.5);
  for (const name of pool) {
    if (result.length >= target) break;
    if (!seen.has(name.toLowerCase())) {
      seen.add(name.toLowerCase());
      result.push({ name });
    }
  }

  return result.slice(0, target);
}