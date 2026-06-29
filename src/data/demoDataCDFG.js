// China Duty Free Group (CDFG) — major China operations with regional hub
// Airports: PEK, PVG, CAN, HKG, HAK

const STORE_NAMES = [
  "China Duty Free Group",
  "CDFG Premium",
  "CDFG Flagship",
];

function calculateStoresPerAirport(pax) {
  if (pax >= 250000) return 4;
  if (pax >= 200000) return 3;
  if (pax >= 150000) return 2;
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
  {
    code: "PEK",
    name: "Beijing Capital International",
    city: "Beijing",
    country: "China",
    daily_pax: 273972,
    annual_pax: 99999180,
    stores: assignStoresToAirport(273972),
  },
  {
    code: "PVG",
    name: "Shanghai Pudong International",
    city: "Shanghai",
    country: "China",
    daily_pax: 208219,
    annual_pax: 75999935,
    stores: assignStoresToAirport(208219),
  },
  {
    code: "CAN",
    name: "Guangzhou Baiyun International",
    city: "Guangzhou",
    country: "China",
    daily_pax: 200000,
    annual_pax: 73000000,
    stores: assignStoresToAirport(200000),
  },
  {
    code: "HKG",
    name: "Hong Kong International",
    city: "Hong Kong",
    country: "Hong Kong",
    daily_pax: 128767,
    annual_pax: 46998155,
    stores: assignStoresToAirport(128767),
  },
  {
    code: "HAK",
    name: "Haikou Meilan International",
    city: "Haikou",
    country: "China",
    daily_pax: 37000,
    annual_pax: 13505000,
    stores: assignStoresToAirport(37000),
  },
];

export function getCDFGRetailerData() {
  return {
    name: "China Duty Free Group (CDFG)",
    airports: AIRPORTS_FULL,
    storeCount: AIRPORTS_FULL.reduce((sum, apt) => sum + apt.stores.length, 0),
  };
}