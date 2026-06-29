// DFS Group — duty free operations in Americas, Asia-Pacific, and select European hubs
// Airports: LAX, SFO, JFK, HKG, SIN, SYD, ICN, NRT, AKL, BKK

const RETAIL_CONVERSION_RATE = 0.03; // 3% conversion rate
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
    annual_pax: 75842425,
    stores: assignStoresToAirport(207945),
  },
  {
    code: "SFO",
    name: "San Francisco International",
    city: "San Francisco",
    country: "United States",
    annual_pax: 50000390,
    stores: assignStoresToAirport(136986),
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
    code: "HKG",
    name: "Hong Kong International",
    city: "Hong Kong",
    country: "Hong Kong",
    annual_pax: 46998155,
    stores: assignStoresToAirport(128767),
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
    code: "SYD",
    name: "Sydney Kingsford Smith",
    city: "Sydney",
    country: "Australia",
    annual_pax: 44400460,
    stores: assignStoresToAirport(121644),
  },
  {
    code: "ICN",
    name: "Seoul Incheon International",
    city: "Seoul",
    country: "South Korea",
    annual_pax: 71000165,
    stores: assignStoresToAirport(194521),
  },
  {
    code: "NRT",
    name: "Narita International",
    city: "Tokyo",
    country: "Japan",
    annual_pax: 43999820,
    stores: assignStoresToAirport(120548),
  },
  {
    code: "AKL",
    name: "Auckland Airport",
    city: "Auckland",
    country: "New Zealand",
    annual_pax: 20509860,
    stores: assignStoresToAirport(56164),
  },
  {
    code: "BKK",
    name: "Bangkok Suvarnabhumi",
    city: "Bangkok",
    country: "Thailand",
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