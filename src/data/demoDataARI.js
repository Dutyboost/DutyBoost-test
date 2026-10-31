// Aer Rianta International (ARI) — Irish duty free specialist.
// Network taken from ARI's own location list (ari.ie): 26 airports in 12 countries —
// Ireland, Portugal, Cyprus, Canada, USA, Barbados, Bahrain, Oman, UAE, Lebanon,
// Montenegro and Indonesia. Traffic from the app's global airport dataset.

const STORE_NAMES = [
  "Aer Rianta International",
  "ARI Duty Free",
  "ARI Premium",
];

function calculateStoresPerAirport(pax) {
  if (pax >= 150000) return 2;
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

// code, name, city, country, annual passengers
const NETWORK = [
  // Ireland
  ["DUB", "Dublin Airport", "Dublin", "Ireland", 32900050],
  ["ORK", "Cork Airport", "Cork", "Ireland", 2700000],
  // Portugal (mainland + Madeira + Azores)
  ["LIS", "Lisbon Portela Airport", "Lisbon", "Portugal", 33100000],
  ["OPO", "Porto Airport", "Porto", "Portugal", 13000000],
  ["FAO", "Faro Airport", "Faro", "Portugal", 9000000],
  ["FNC", "Madeira Airport", "Funchal", "Portugal", 2500000],
  ["PDL", "João Paulo II Airport", "Ponta Delgada", "Portugal", 2000000],
  ["HOR", "Horta Airport", "Horta", "Portugal", 350000],
  ["PXO", "Porto Santo Airport", "Porto Santo", "Portugal", 300000],
  ["SMA", "Santa Maria Airport", "Santa Maria", "Portugal", 130000],
  // Canada
  ["YVR", "Vancouver International Airport", "Vancouver", "Canada", 26000000],
  ["YUL", "Montreal-Trudeau International Airport", "Montreal", "Canada", 21000000],
  ["YEG", "Edmonton International Airport", "Edmonton", "Canada", 8000000],
  ["YWG", "Winnipeg Richardson International Airport", "Winnipeg", "Canada", 4000000],
  ["YQB", "Quebec City Jean Lesage Airport", "Quebec City", "Canada", 2000000],
  // Cyprus
  ["LCA", "Larnaca International Airport", "Larnaca", "Cyprus", 11000000],
  ["PFO", "Paphos International Airport", "Paphos", "Cyprus", 3000000],
  // Middle East
  ["AUH", "Abu Dhabi International Airport", "Abu Dhabi", "United Arab Emirates", 22000000],
  ["BAH", "Bahrain International Airport", "Manama", "Bahrain", 10000000],
  ["MCT", "Muscat International Airport", "Muscat", "Oman", 10000000],
  ["BEY", "Beirut Rafic Hariri International Airport", "Beirut", "Lebanon", 8000000],
  // Americas
  ["JFK", "John F. Kennedy International Airport", "New York", "United States", 62500000],
  ["BGI", "Grantley Adams International Airport", "Bridgetown", "Barbados", 2200000],
  // Europe & Asia
  ["TIV", "Tivat Airport", "Tivat", "Montenegro", 1000000],
  ["TGD", "Podgorica Airport", "Podgorica", "Montenegro", 1000000],
  ["CGK", "Jakarta Soekarno-Hatta Airport", "Jakarta", "Indonesia", 54000000],
];

export const AIRPORTS_FULL = NETWORK.map(([code, name, city, country, annualPax]) => {
  const dailyPax = Math.round(annualPax / 365);
  return {
    code,
    name,
    city,
    country,
    daily_pax: dailyPax,
    annual_pax: annualPax,
    stores: assignStoresToAirport(dailyPax),
  };
});

export function getARIRetailerData() {
  return {
    name: "Aer Rianta International (ARI)",
    airports: AIRPORTS_FULL,
    storeCount: AIRPORTS_FULL.reduce((sum, apt) => sum + apt.stores.length, 0),
  };
}