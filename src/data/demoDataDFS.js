// DFS Group — duty free operations in Americas, Asia-Pacific, and select European hubs
// Airports: LAX, SFO, JFK, HKG, SIN, SYD, ICN, NRT, AKL, BKK

const RETAIL_CONVERSION_RATE = 0.0001; // 0.01% — DutyBoost incremental uplift
const STORE_NAMES = [
  "DFS Galeria",
  "DFS T Galleria",
  "DFS Galleria (Guam Style)",
];

function calculateStoresPerAirport(pax) {
  if (pax >= 200000) return 3;
  if (pax >= 150000) return 2;
  if (pax >= 100000) return 2;
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
  {
    code: "LAX",
    name: "Los Angeles International",
    city: "Los Angeles",
    country: "United States",
    daily_pax: 207945,
    annual_pax: 75842425,
    stores: assignStoresToAirport(207945),
  },
  {
    code: "SFO",
    name: "San Francisco International",
    city: "San Francisco",
    country: "United States",
    daily_pax: 136986,
    annual_pax: 50000390,
    stores: assignStoresToAirport(136986),
  },
  {
    code: "JFK",
    name: "John F. Kennedy International",
    city: "New York",
    country: "United States",
    daily_pax: 171233,
    annual_pax: 62535045,
    stores: assignStoresToAirport(171233),
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
    code: "SIN",
    name: "Singapore Changi",
    city: "Singapore",
    country: "Singapore",
    daily_pax: 161370,
    annual_pax: 58900050,
    stores: assignStoresToAirport(161370),
  },
  {
    code: "SYD",
    name: "Sydney Kingsford Smith",
    city: "Sydney",
    country: "Australia",
    daily_pax: 121644,
    annual_pax: 44400460,
    stores: assignStoresToAirport(121644),
  },
  {
    code: "ICN",
    name: "Seoul Incheon International",
    city: "Seoul",
    country: "South Korea",
    daily_pax: 194521,
    annual_pax: 71000165,
    stores: assignStoresToAirport(194521),
  },
  {
    code: "NRT",
    name: "Narita International",
    city: "Tokyo",
    country: "Japan",
    daily_pax: 120548,
    annual_pax: 43999820,
    stores: assignStoresToAirport(120548),
  },
  {
    code: "AKL",
    name: "Auckland Airport",
    city: "Auckland",
    country: "New Zealand",
    daily_pax: 56164,
    annual_pax: 20509860,
    stores: assignStoresToAirport(56164),
  },
  {
    code: "BKK",
    name: "Bangkok Suvarnabhumi",
    city: "Bangkok",
    country: "Thailand",
    daily_pax: 178356,
    annual_pax: 65100040,
    stores: assignStoresToAirport(178356),
  },
];

export function getDFSRetailerData() {
  return {
    name: "DFS Group",
    airports: AIRPORTS_FULL,
    storeCount: AIRPORTS_FULL.reduce((sum, apt) => sum + apt.stores.length, 0),
  };
}