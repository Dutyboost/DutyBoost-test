// JAT Retail — Balkans specialist
// Airports: BEG, ZAG

const STORE_NAMES = [
  "JAT Duty Free",
];

function calculateStoresPerAirport(pax) {
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
  { code: "BEG", name: "Belgrade Nikola Tesla", city: "Belgrade", country: "Serbia", annual_pax: 7499820, stores: assignStoresToAirport(20548) },
  { code: "ZAG", name: "Zagreb Airport", city: "Zagreb", country: "Croatia", annual_pax: 3700005, stores: assignStoresToAirport(10137) },
];

export function getJATRetailerData() {
  return {
    name: "JAT Retail",
    airports: AIRPORTS_FULL,
    storeCount: AIRPORTS_FULL.reduce((sum, apt) => sum + apt.stores.length, 0),
  };
}