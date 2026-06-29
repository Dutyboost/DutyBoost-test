// Lotte Duty Free — major Asian and select global operations
// Airports: ICN, NRT, HND, SIN, SYD, AKL, BKK, DEL, DXB, LAX, JFK

const STORE_NAMES = [
  "Lotte Duty Free",
  "Lotte World Duty Free",
  "Lotte Premium",
];

function calculateStoresPerAirport(pax) {
  if (pax >= 240000) return 4;
  if (pax >= 200000) return 3;
  if (pax >= 150000) return 2;
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
    code: "HND",
    name: "Tokyo Haneda",
    city: "Tokyo",
    country: "Japan",
    annual_pax: 87999040,
    stores: assignStoresToAirport(241096),
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
  {
    code: "DEL",
    name: "Delhi Indira Gandhi",
    city: "Delhi",
    country: "India",
    annual_pax: 73700070,
    stores: assignStoresToAirport(201918),
  },
  {
    code: "DXB",
    name: "Dubai International",
    city: "Dubai",
    country: "United Arab Emirates",
    annual_pax: 87000950,
    stores: assignStoresToAirport(238630),
  },
  {
    code: "LAX",
    name: "Los Angeles International",
    city: "Los Angeles",
    country: "United States",
    annual_pax: 75842425,
    stores: assignStoresToAirport(207945),
  },
  {
    code: "JFK",
    name: "John F. Kennedy International",
    city: "New York",
    country: "United States",
    annual_pax: 62535045,
    stores: assignStoresToAirport(171233),
  },
];

export function getLotteRetailerData() {
  return {
    name: "Lotte Duty Free",
    airports: AIRPORTS_FULL,
    storeCount: AIRPORTS_FULL.reduce((sum, apt) => sum + apt.stores.length, 0),
  };
}