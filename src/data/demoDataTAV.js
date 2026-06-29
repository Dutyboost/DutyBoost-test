// TAV Airports Retail — Turkey, South Caucasus, and Eastern Europe specialist
// Airports: IST, SAW, TLV, TBS, SKP, RIX, KIV

const STORE_NAMES = [
  "TAV Travel Retail",
  "TAV Duty Free",
];

function calculateStoresPerAirport(pax) {
  if (pax >= 150000) return 2;
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
  { code: "IST", name: "Istanbul Airport", city: "Istanbul", country: "Turkey", annual_pax: 63949830, stores: assignStoresToAirport(175342) },
  { code: "SAW", name: "Istanbul Sabiha Gökçen", city: "Istanbul", country: "Turkey", annual_pax: 34974350, stores: assignStoresToAirport(95890) },
  { code: "TLV", name: "Tel Aviv Ben Gurion", city: "Tel Aviv", country: "Israel", annual_pax: 23999885, stores: assignStoresToAirport(65753) },
  { code: "TBS", name: "Tbilisi International", city: "Tbilisi", country: "Georgia", annual_pax: 3285000, stores: assignStoresToAirport(9000) },
  { code: "SKP", name: "Skopje International", city: "Skopje", country: "North Macedonia", annual_pax: 2555000, stores: assignStoresToAirport(7000) },
  { code: "RIX", name: "Riga International", city: "Riga", country: "Latvia", annual_pax: 4745000, stores: assignStoresToAirport(13000) },
  { code: "KIV", name: "Chișinău International", city: "Chișinău", country: "Moldova", annual_pax: 1460000, stores: assignStoresToAirport(4000) },
];

export function getTAVRetailerData() {
  return {
    name: "TAV Airports Retail",
    airports: AIRPORTS_FULL,
    storeCount: AIRPORTS_FULL.reduce((sum, apt) => sum + apt.stores.length, 0),
  };
}