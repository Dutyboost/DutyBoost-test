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
    code: "HND",
    name: "Tokyo Haneda",
    city: "Tokyo",
    country: "Japan",
    daily_pax: 241096,
    annual_pax: 87999040,
    stores: assignStoresToAirport(241096),
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
  {
    code: "DEL",
    name: "Delhi Indira Gandhi",
    city: "Delhi",
    country: "India",
    daily_pax: 201918,
    annual_pax: 73700070,
    stores: assignStoresToAirport(201918),
  },
  {
    code: "DXB",
    name: "Dubai International",
    city: "Dubai",
    country: "United Arab Emirates",
    daily_pax: 238630,
    annual_pax: 87000950,
    stores: assignStoresToAirport(238630),
  },
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
    code: "JFK",
    name: "John F. Kennedy International",
    city: "New York",
    country: "United States",
    daily_pax: 171233,
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