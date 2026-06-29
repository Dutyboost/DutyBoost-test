// Flemingo Travel Retail — Middle East and Africa specialist with Asia-Pacific presence
// Airports: DXB, DOH, MUS, CMB, NBO, DAR, ACC, LOS, MNL

const STORE_NAMES = [
  "Flemingo Duty Free",
  "Flemingo Premium",
];

function calculateStoresPerAirport(pax) {
  if (pax >= 200000) return 3;
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
  { code: "DXB", name: "Dubai International", city: "Dubai", country: "United Arab Emirates", annual_pax: 87000950, stores: assignStoresToAirport(238630) },
  { code: "DOH", name: "Hamad International Airport", city: "Doha", country: "Qatar", annual_pax: 45874545, stores: assignStoresToAirport(125753) },
  { code: "MUS", name: "Muscat International", city: "Muscat", country: "Oman", annual_pax: 9999805, stores: assignStoresToAirport(27397) },
  { code: "CMB", name: "Colombo Bandaranaike", city: "Colombo", country: "Sri Lanka", annual_pax: 7999770, stores: assignStoresToAirport(21918) },
  { code: "NBO", name: "Nairobi Jomo Kenyatta", city: "Nairobi", country: "Kenya", annual_pax: 7399910, stores: assignStoresToAirport(20274) },
  { code: "DAR", name: "Dar es Salaam", city: "Dar es Salaam", country: "Tanzania", annual_pax: 4380000, stores: assignStoresToAirport(12000) },
  { code: "ACC", name: "Accra Kotoka", city: "Accra", country: "Ghana", annual_pax: 4380000, stores: assignStoresToAirport(12000) },
  { code: "LOS", name: "Lagos Murtala Muhammed", city: "Lagos", country: "Nigeria", annual_pax: 6299900, stores: assignStoresToAirport(17260) },
  { code: "MNL", name: "Manila Ninoy Aquino", city: "Manila", country: "Philippines", annual_pax: 45299150, stores: assignStoresToAirport(124110) },
];

export function getFlemingoDFRetailerData() {
  return {
    name: "Flemingo Travel Retail",
    airports: AIRPORTS_FULL,
    storeCount: AIRPORTS_FULL.reduce((sum, apt) => sum + apt.stores.length, 0),
  };
}