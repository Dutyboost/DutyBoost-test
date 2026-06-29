// Emirates Leisure Retail — Gulf region specialist
// Airports: DXB, AUH, DOH

const STORE_NAMES = [
  "Emirates Leisure Retail",
  "Emirates Premium",
];

function calculateStoresPerAirport(pax) {
  if (pax >= 200000) return 4;
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
  { code: "DXB", name: "Dubai International", city: "Dubai", country: "United Arab Emirates", annual_pax: 87000950, stores: assignStoresToAirport(238630) },
  { code: "AUH", name: "Abu Dhabi International", city: "Abu Dhabi", country: "United Arab Emirates", annual_pax: 22400050, stores: assignStoresToAirport(61370) },
  { code: "DOH", name: "Hamad International Airport", city: "Doha", country: "Qatar", annual_pax: 45874545, stores: assignStoresToAirport(125753) },
];

export function getEmiratesLeisureRetailerData() {
  return {
    name: "Emirates Leisure Retail",
    airports: AIRPORTS_FULL,
    storeCount: AIRPORTS_FULL.reduce((sum, apt) => sum + apt.stores.length, 0),
  };
}