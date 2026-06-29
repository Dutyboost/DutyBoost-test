// Flemingo India — Indian subcontinent specialist
// Airports: DEL, BOM, BLR, HYD, MAA, CCU

const STORE_NAMES = [
  "Flemingo India",
  "Flemingo Duty Free",
];

function calculateStoresPerAirport(pax) {
  if (pax >= 150000) return 2;
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
  { code: "DEL", name: "Delhi Indira Gandhi", city: "Delhi", country: "India", daily_pax: 201918, annual_pax: 73700070, stores: assignStoresToAirport(201918) },
  { code: "BOM", name: "Mumbai", city: "Mumbai", country: "India", daily_pax: 144658, annual_pax: 52799370, stores: assignStoresToAirport(144658) },
  { code: "BLR", name: "Bengaluru", city: "Bengaluru", country: "India", daily_pax: 92877, annual_pax: 33899805, stores: assignStoresToAirport(92877) },
  { code: "HYD", name: "Hyderabad", city: "Hyderabad", country: "India", daily_pax: 54795, annual_pax: 20000075, stores: assignStoresToAirport(54795) },
  { code: "MAA", name: "Chennai", city: "Chennai", country: "India", daily_pax: 38356, annual_pax: 13999960, stores: assignStoresToAirport(38356) },
  { code: "CCU", name: "Kolkata", city: "Kolkata", country: "India", daily_pax: 30137, annual_pax: 11000005, stores: assignStoresToAirport(30137) },
];

export function getFlemingIndiaRetailerData() {
  return {
    name: "Flemingo India",
    airports: AIRPORTS_FULL,
    storeCount: AIRPORTS_FULL.reduce((sum, apt) => sum + apt.stores.length, 0),
  };
}