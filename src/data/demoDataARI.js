// Aer Rianta International (ARI) — Irish specialist with UK/Africa/Middle East presence
// Airports: DUB, BFS, GLA, EDI, MAN, CMB, BEY, BAH, MUS

const STORE_NAMES = [
  "Aer Rianta International",
  "ARI Duty Free",
  "ARI Premium",
];

function calculateStoresPerAirport(pax) {
  if (pax >= 150000) return 2;
  if (pax >= 100000) return 2;
  if (pax >= 50000) return 1;
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
  { code: "DUB", name: "Dublin Airport", city: "Dublin", country: "Ireland", annual_pax: 32900050, stores: assignStoresToAirport(90137) },
  { code: "BFS", name: "Belfast International", city: "Belfast", country: "United Kingdom", annual_pax: 5999880, stores: assignStoresToAirport(16438) },
  { code: "GLA", name: "Glasgow", city: "Glasgow", country: "United Kingdom", annual_pax: 7699040, stores: assignStoresToAirport(21096) },
  { code: "EDI", name: "Edinburgh", city: "Edinburgh", country: "United Kingdom", annual_pax: 14500590, stores: assignStoresToAirport(39726) },
  { code: "MAN", name: "Manchester", city: "Manchester", country: "United Kingdom", annual_pax: 29999080, stores: assignStoresToAirport(82192) },
  { code: "CMB", name: "Colombo Bandaranaike", city: "Colombo", country: "Sri Lanka", annual_pax: 7999770, stores: assignStoresToAirport(21918) },
  { code: "BEY", name: "Beirut Rafic Hariri", city: "Beirut", country: "Lebanon", annual_pax: 7999770, stores: assignStoresToAirport(21918) },
  { code: "BAH", name: "Bahrain International", city: "Manama", country: "Bahrain", annual_pax: 9799885, stores: assignStoresToAirport(26849) },
  { code: "MUS", name: "Muscat International", city: "Muscat", country: "Oman", annual_pax: 9999805, stores: assignStoresToAirport(27397) },
];

export function getARIRetailerData() {
  return {
    name: "Aer Rianta International (ARI)",
    airports: AIRPORTS_FULL,
    storeCount: AIRPORTS_FULL.reduce((sum, apt) => sum + apt.stores.length, 0),
  };
}