// Rimas Colombia — Colombian domestic and regional specialist
// Airports: BOG, CTG, MDE

const STORE_NAMES = [
  "Rimas Duty Free",
  "Rimas Colombia",
];

function calculateStoresPerAirport(pax) {
  if (pax >= 100000) return 2;
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
  { code: "BOG", name: "Bogotá El Dorado", city: "Bogotá", country: "Colombia", annual_pax: 35399490, stores: assignStoresToAirport(96986) },
  { code: "CTG", name: "Cartagena", city: "Cartagena", country: "Colombia", annual_pax: 4745000, stores: assignStoresToAirport(13000) },
  { code: "MDE", name: "Medellín", city: "Medellín", country: "Colombia", annual_pax: 4745000, stores: assignStoresToAirport(13000) },
];

export function getRimasColombiaRetailerData() {
  return {
    name: "Rimas Colombia",
    airports: AIRPORTS_FULL,
    storeCount: AIRPORTS_FULL.reduce((sum, apt) => sum + apt.stores.length, 0),
  };
}