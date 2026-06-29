// Intershop (Switzerland) — Swiss specialist with limited airport network
// Airports: ZRH, GVA, BSL

const STORE_NAMES = [
  "Intershop",
  "Intershop Premium",
];

function calculateStoresPerAirport(pax) {
  if (pax >= 75000) return 1;
  return 1;
}

function assignStoresToAirport(pax) {
  const storeCount = calculateStoresPerAirport(pax);
  const stores = [];
  for (let i = 0; i < storeCount; i++) {
    const brandIndex = i % STORE_NAMES.length;
    stores.push({
      name: STORE_NAMES[brandIndex],
      pax,
      weight: 1 / storeCount,
    });
  }
  return stores;
}

export const AIRPORTS_FULL = [
  { code: "ZRH", name: "Zürich Airport", city: "Zürich", country: "Switzerland", daily_pax: 87123, annual_pax: 31799895, stores: assignStoresToAirport(87123) },
  { code: "GVA", name: "Geneva Airport", city: "Geneva", country: "Switzerland", daily_pax: 48767, annual_pax: 17799955, stores: assignStoresToAirport(48767) },
  { code: "BSL", name: "Basel EuroAirport", city: "Basel", country: "Switzerland", daily_pax: 13000, annual_pax: 4745000, stores: assignStoresToAirport(13000) },
];

export function getIntershopRetailerData() {
  return {
    name: "Intershop (Switzerland)",
    airports: AIRPORTS_FULL,
    storeCount: AIRPORTS_FULL.reduce((sum, apt) => sum + apt.stores.length, 0),
  };
}