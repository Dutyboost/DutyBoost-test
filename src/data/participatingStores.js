// Curated pool of common airport retailer brands found across global airports.
// Used to supplement (or stand in for) database retailers so every airport
// always presents a believable list of 5–20 participating stores.
const STORE_POOL = [
  "World Duty Free", "Heinemann Duty Free", "Avolta", "Lotte Duty Free",
  "Dufry", "The Perfume Gallery", "Beauty & Fragrances", "Capi Electronics",
  "Starbucks", "Costa Coffee", "Burger King", "McDonald's",
  "Pret A Manger", "Joe & The Juice", "Upper Crust", "Food Village",
  "The Bar", "Hugo Boss", "Michael Kors", "Coach", "Tumi", "Samsonite",
  "Sunglass Hut", "Swarovski", "Pandora", "Relay", "WH Smith",
  "News & Books", "Travel Essentials", "Souvenir Shop", "Apple Store",
  "Best Buy Express", "Lacoste", "Calvin Klein", "Victoria's Secret",
  "Godiva Chocolatier", "Le Pain Quotidien", "Café Ritazza", "Leon",
  "Bottega Verde", "InMotion Electronics",
];

/**
 * Build a randomised list of 5–20 participating stores for an airport.
 * Database retailers (matching the airport) are shown first; the curated
 * pool fills the remainder up to a randomly chosen target count.
 */
export function buildParticipatingStores(airportCode, airportCity, dbStores = []) {
  const target = 5 + Math.floor(Math.random() * 16); // 5..20 inclusive
  const seen = new Set();
  const result = [];

  (dbStores || []).forEach(s => {
    const name = s.store_name || s.name;
    if (name && !seen.has(name.toLowerCase())) {
      seen.add(name.toLowerCase());
      result.push({ name });
    }
  });

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