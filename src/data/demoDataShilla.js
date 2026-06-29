// The Shilla Duty Free — premium Asian and select US operations
// Airports: ICN, SIN, HKG, BKK, JFK, LAX

const STORE_NAMES = [
  "The Shilla Duty Free",
  "Shilla Premium",
];

function calculateStoresPerAirport(pax) {
  if (pax >= 200000) return 2;
  if (pax >= 150000) return 2;
  if (pax >= 100000) return 1;
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
    code: "ICN",
    name: "Seoul Incheon International",
    city: "Seoul",
    country: "South Korea",
    annual_pax: 71000165,
    stores: assignStoresToAirport(194521),
  },
  {
    code: "SIN",
    name: "Singapore Changi",
    city: "Singapore",
    country: "Singapore",
    annual_pax: 58900050,
    stores: assignStoresToAirport(161370),
  },
  {
    code: "HKG",
    name: "Hong Kong International",
    city: "Hong Kong",
    country: "Hong Kong",
    annual_pax: 46998155,
    stores: assignStoresToAirport(128767),
  },
  {
    code: "BKK",
    name: "Bangkok Suvarnabhumi",
    city: "Bangkok",
    country: "Thailand",
    annual_pax: 65100040,
    stores: assignStoresToAirport(178356),
  },
  {
    code: "JFK",
    name: "John F. Kennedy International",
    city: "New York",
    country: "United States",
    annual_pax: 62535045,
    stores: assignStoresToAirport(171233),
  },
  {
    code: "LAX",
    name: "Los Angeles International",
    city: "Los Angeles",
    country: "United States",
    annual_pax: 75842425,
    stores: assignStoresToAirport(207945),
  },
];

export function getShillaRetailerData() {
  return {
    name: "The Shilla Duty Free",
    airports: AIRPORTS_FULL,
    storeCount: AIRPORTS_FULL.reduce((sum, apt) => sum + apt.stores.length, 0),
  };
}