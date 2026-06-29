// WHSmith Travel — UK specialist with European and Asia-Pacific presence
// Airports: LHR, LGW, MAN, STN, BRS, GLA, EDI, BHX, CDG, AMS, FRA, MAD, BCN, FCO, SIN, HKG, SYD, MEL

const STORE_NAMES = [
  "WH Smith Travel",
  "WH Smith Books & Gifts",
  "WHSmith Premium",
];

function calculateStoresPerAirport(pax) {
  if (pax >= 200000) return 2;
  if (pax >= 150000) return 2;
  if (pax >= 100000) return 1;
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
  { code: "LHR", name: "London Heathrow", city: "London", country: "United Kingdom", daily_pax: 216438, annual_pax: 78999870, stores: assignStoresToAirport(216438) },
  { code: "LGW", name: "London Gatwick", city: "London", country: "United Kingdom", daily_pax: 109589, annual_pax: 39999885, stores: assignStoresToAirport(109589) },
  { code: "MAN", name: "Manchester", city: "Manchester", country: "United Kingdom", daily_pax: 82192, annual_pax: 29999080, stores: assignStoresToAirport(82192) },
  { code: "STN", name: "London Stansted", city: "London", country: "United Kingdom", daily_pax: 76712, annual_pax: 27999880, stores: assignStoresToAirport(76712) },
  { code: "BRS", name: "Bristol Airport", city: "Bristol", country: "United Kingdom", daily_pax: 24110, annual_pax: 8800150, stores: assignStoresToAirport(24110) },
  { code: "GLA", name: "Glasgow", city: "Glasgow", country: "United Kingdom", daily_pax: 21096, annual_pax: 7699040, stores: assignStoresToAirport(21096) },
  { code: "EDI", name: "Edinburgh", city: "Edinburgh", country: "United Kingdom", daily_pax: 39726, annual_pax: 14500590, stores: assignStoresToAirport(39726) },
  { code: "BHX", name: "Birmingham", city: "Birmingham", country: "United Kingdom", daily_pax: 35616, annual_pax: 13000240, stores: assignStoresToAirport(35616) },
  { code: "CDG", name: "Paris Charles de Gaulle", city: "Paris", country: "France", daily_pax: 185205, annual_pax: 67599825, stores: assignStoresToAirport(185205) },
  { code: "AMS", name: "Amsterdam Schiphol", city: "Amsterdam", country: "Netherlands", daily_pax: 169589, annual_pax: 61899885, stores: assignStoresToAirport(169589) },
  { code: "FRA", name: "Frankfurt", city: "Frankfurt", country: "Germany", daily_pax: 162740, annual_pax: 59399700, stores: assignStoresToAirport(162740) },
  { code: "MAD", name: "Madrid Barajas", city: "Madrid", country: "Spain", daily_pax: 164932, annual_pax: 60199920, stores: assignStoresToAirport(164932) },
  { code: "BCN", name: "Barcelona El Prat", city: "Barcelona", country: "Spain", daily_pax: 144110, annual_pax: 52580150, stores: assignStoresToAirport(144110) },
  { code: "FCO", name: "Rome Fiumicino", city: "Rome", country: "Italy", daily_pax: 110959, annual_pax: 40499995, stores: assignStoresToAirport(110959) },
  { code: "SIN", name: "Singapore Changi", city: "Singapore", country: "Singapore", daily_pax: 161370, annual_pax: 58900050, stores: assignStoresToAirport(161370) },
  { code: "HKG", name: "Hong Kong International", city: "Hong Kong", country: "Hong Kong", daily_pax: 128767, annual_pax: 46998155, stores: assignStoresToAirport(128767) },
  { code: "SYD", name: "Sydney Kingsford Smith", city: "Sydney", country: "Australia", daily_pax: 121644, annual_pax: 44400460, stores: assignStoresToAirport(121644) },
  { code: "MEL", name: "Melbourne", city: "Melbourne", country: "Australia", daily_pax: 100548, annual_pax: 36699920, stores: assignStoresToAirport(100548) },
];

export function getWHSmithRetailerData() {
  return {
    name: "WHSmith Travel",
    airports: AIRPORTS_FULL,
    storeCount: AIRPORTS_FULL.reduce((sum, apt) => sum + apt.stores.length, 0),
  };
}