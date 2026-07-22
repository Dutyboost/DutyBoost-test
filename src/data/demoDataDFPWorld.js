// DFP World (Duty Free Stores Zimbabwe) — Zimbabwean duty-free specialist
// Airports: HRE (Harare), VFA (Victoria Falls), BUQ (Bulawayo)

const STORE_NAMES = [
  "Duty Free Stores Zimbabwe",
  "DFP World",
];

// Duty-free outlets per airport, scaled by passenger volume. A duty-free
// concessionaire typically runs several outlets (departures, arrivals, liquor,
// gifts) at larger airports.
function calculateStoresPerAirport(pax) {
  if (pax >= 4000) return 3;  // major hub (Harare)
  if (pax >= 1500) return 2;  // mid-tier tourist gateway (Victoria Falls)
  return 1;                    // smaller airport (Bulawayo)
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
  { code: "HRE", name: "Harare Robert Mugabe International", city: "Harare", country: "Zimbabwe", region: "Africa", daily_pax: 4500, annual_pax: 1642500, stores: assignStoresToAirport(4500) },
  { code: "VFA", name: "Victoria Falls", city: "Victoria Falls", country: "Zimbabwe", region: "Africa", daily_pax: 1800, annual_pax: 657000, stores: assignStoresToAirport(1800) },
  { code: "BUQ", name: "Bulawayo Joshua Nkomo International", city: "Bulawayo", country: "Zimbabwe", region: "Africa", daily_pax: 1000, annual_pax: 365000, stores: assignStoresToAirport(1000) },
];

export function getDFPWorldRetailerData() {
  return {
    name: "DFP World (Duty Free Stores Zimbabwe)",
    airports: AIRPORTS_FULL,
    storeCount: AIRPORTS_FULL.reduce((sum, apt) => sum + apt.stores.length, 0),
  };
}