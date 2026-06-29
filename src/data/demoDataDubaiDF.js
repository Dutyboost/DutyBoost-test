// Dubai Duty Free — single flagship hub operation
// Airports: DXB

const STORE_NAMES = [
  "Dubai Duty Free",
  "Dubai Duty Free Premium",
  "Dubai Duty Free Flagship",
  "Dubai Duty Free Express",
];

function calculateStoresPerAirport(pax) {
  return 8; // Massive operation at DXB
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
    code: "DXB",
    name: "Dubai International",
    city: "Dubai",
    country: "United Arab Emirates",
    daily_pax: 238630,
    annual_pax: 87000950,
    stores: assignStoresToAirport(238630),
  },
];

export function getDubaiDFRetailerData() {
  return {
    name: "Dubai Duty Free",
    airports: AIRPORTS_FULL,
    storeCount: AIRPORTS_FULL.reduce((sum, apt) => sum + apt.stores.length, 0),
  };
}