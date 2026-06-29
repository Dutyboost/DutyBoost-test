// Travel Retail Sweden — Nordic region specialist
// Airports: ARN, CPH, OSL, HEL

const STORE_NAMES = [
  "Travel Retail Sweden",
  "Nordic Duty Free",
];

function calculateStoresPerAirport(pax) {
  if (pax >= 70000) return 1;
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
  { code: "ARN", name: "Stockholm Arlanda", city: "Stockholm", country: "Sweden", daily_pax: 68767, annual_pax: 25097455, stores: assignStoresToAirport(68767) },
  { code: "CPH", name: "Copenhagen Airport", city: "Copenhagen", country: "Denmark", daily_pax: 82740, annual_pax: 30200100, stores: assignStoresToAirport(82740) },
  { code: "OSL", name: "Oslo Gardermoen", city: "Oslo", country: "Norway", daily_pax: 78082, annual_pax: 28499970, stores: assignStoresToAirport(78082) },
  { code: "HEL", name: "Helsinki Airport", city: "Helsinki", country: "Finland", daily_pax: 41918, annual_pax: 15299570, stores: assignStoresToAirport(41918) },
];

export function getTravelRetailSwedenData() {
  return {
    name: "Travel Retail Sweden",
    airports: AIRPORTS_FULL,
    storeCount: AIRPORTS_FULL.reduce((sum, apt) => sum + apt.stores.length, 0),
  };
}