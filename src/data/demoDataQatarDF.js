// Qatar Duty Free — Doha hub operation
// Airports: DOH

const STORE_NAMES = [
  "Qatar Duty Free",
  "Qatar Premium",
];

function calculateStoresPerAirport(pax) {
  return 5; // Major hub at Hamad
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
  {
    code: "DOH",
    name: "Hamad International Airport",
    city: "Doha",
    country: "Qatar",
    daily_pax: 125753,
    annual_pax: 45874545,
    stores: assignStoresToAirport(125753),
  },
];

export function getQatarDFRetailerData() {
  return {
    name: "Qatar Duty Free",
    airports: AIRPORTS_FULL,
    storeCount: AIRPORTS_FULL.reduce((sum, apt) => sum + apt.stores.length, 0),
  };
}