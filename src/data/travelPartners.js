/**
 * Travel Partner dataset — publicly known annual booking/passenger/reservation volumes.
 * Sources: company annual reports, IATA statistics, corporate press releases.
 * Figures are approximate and rounded for estimation purposes only.
 *
 * Each entry:
 *  - company_name:  Official brand name
 *  - country:       Headquarters country
 *  - continent:     Continent for filtering
 *  - vertical:      "flight" | "accommodation" | "car"
 *  - annual_bookings:  Annual volume (passengers, reservations, or rentals)
 *  - booking_unit:   "passengers" | "reservations" | "rentals"
 *  - hubs:           (airlines only) IATA codes of main hub airports
 *  - description:    Short context string
 */

const FLIGHT_PARTNERS = [
  // ── Europe ──────────────────────────────────────────────────────────
  { company_name: "KLM", country: "Netherlands", continent: "Europe", annual_bookings: 34500000, booking_unit: "passengers", hubs: ["AMS"], description: "Flag carrier of the Netherlands" },
  { company_name: "Air France", country: "France", continent: "Europe", annual_bookings: 90000000, booking_unit: "passengers", hubs: ["CDG", "ORY"], description: "Flag carrier of France (group)" },
  { company_name: "Lufthansa", country: "Germany", continent: "Europe", annual_bookings: 130000000, booking_unit: "passengers", hubs: ["FRA", "MUC"], description: "Flag carrier of Germany (group)" },
  { company_name: "British Airways", country: "United Kingdom", continent: "Europe", annual_bookings: 45000000, booking_unit: "passengers", hubs: ["LHR", "LGW"], description: "Flag carrier of the United Kingdom" },
  { company_name: "Ryanair", country: "Ireland", continent: "Europe", annual_bookings: 168000000, booking_unit: "passengers", hubs: ["DUB", "STN"], description: "Largest low-cost carrier in Europe" },
  { company_name: "easyJet", country: "United Kingdom", continent: "Europe", annual_bookings: 82000000, booking_unit: "passengers", hubs: ["LGW", "LTN"], description: "British low-cost carrier" },
  { company_name: "Vueling", country: "Spain", continent: "Europe", annual_bookings: 33000000, booking_unit: "passengers", hubs: ["BCN", "MAD"], description: "Spanish low-cost carrier (IAG)" },
  { company_name: "Norwegian Air Shuttle", country: "Norway", continent: "Europe", annual_bookings: 18000000, booking_unit: "passengers", hubs: ["OSL", "BG"], description: "Scandinavian low-cost carrier" },
  { company_name: "SAS Scandinavian Airlines", country: "Sweden", continent: "Europe", annual_bookings: 25000000, booking_unit: "passengers", hubs: ["CPH", "ARN", "OSL"], description: "Flag carrier of Scandinavia" },
  { company_name: "Finnair", country: "Finland", continent: "Europe", annual_bookings: 10000000, booking_unit: "passengers", hubs: ["HEL"], description: "Flag carrier of Finland" },
  { company_name: "TAP Air Portugal", country: "Portugal", continent: "Europe", annual_bookings: 14000000, booking_unit: "passengers", hubs: ["LIS", "OPO"], description: "Flag carrier of Portugal" },
  { company_name: "Iberia", country: "Spain", continent: "Europe", annual_bookings: 20000000, booking_unit: "passengers", hubs: ["MAD", "BCN"], description: "Flag carrier of Spain (IAG)" },
  { company_name: "Air Europa", country: "Spain", continent: "Europe", annual_bookings: 12000000, booking_unit: "passengers", hubs: ["MAD", "PMI"], description: "Spanish airline (Globalia)" },
  { company_name: "ITA Airways", country: "Italy", continent: "Europe", annual_bookings: 13000000, booking_unit: "passengers", hubs: ["FCO", "LIN"], description: "Flag carrier of Italy" },
  { company_name: "Swiss International Air Lines", country: "Switzerland", continent: "Europe", annual_bookings: 19000000, booking_unit: "passengers", hubs: ["ZRH", "GVA"], description: "Flag carrier of Switzerland (Lufthansa Group)" },
  { company_name: "Austrian Airlines", country: "Austria", continent: "Europe", annual_bookings: 10000000, booking_unit: "passengers", hubs: ["VIE"], description: "Flag carrier of Austria (Lufthansa Group)" },
  { company_name: "Brussels Airlines", country: "Belgium", continent: "Europe", annual_bookings: 8000000, booking_unit: "passengers", hubs: ["BRU"], description: "Flag carrier of Belgium (Lufthansa Group)" },
  { company_name: "Aer Lingus", country: "Ireland", continent: "Europe", annual_bookings: 12000000, booking_unit: "passengers", hubs: ["DUB"], description: "Flag carrier of Ireland (IAG)" },
  { company_name: "Turkish Airlines", country: "Turkey", continent: "Europe", annual_bookings: 72000000, booking_unit: "passengers", hubs: ["IST"], description: "Flag carrier of Türkiye" },
  { company_name: "Pegasus Airlines", country: "Turkey", continent: "Europe", annual_bookings: 30000000, booking_unit: "passengers", hubs: ["SAW"], description: "Turkish low-cost carrier" },
  { company_name: "Wizz Air", country: "Hungary", continent: "Europe", annual_bookings: 50000000, booking_unit: "passengers", hubs: ["BUD", "WAW"], description: "Hungarian low-cost carrier" },
  { company_name: "Corendon Airlines", country: "Netherlands", continent: "Europe", annual_bookings: 6000000, booking_unit: "passengers", hubs: ["AMS", "AYT"], description: "Dutch-Turkish leisure carrier" },
  { company_name: "Transavia", country: "Netherlands", continent: "Europe", annual_bookings: 13000000, booking_unit: "passengers", hubs: ["AMS", "ORY"], description: "Low-cost carrier (Air France–KLM)" },
  { company_name: "TUI fly", country: "Germany", continent: "Europe", annual_bookings: 8000000, booking_unit: "passengers", hubs: ["FRA", "CGN"], description: "German leisure airline (TUI Group)" },
  { company_name: "Condor", country: "Germany", continent: "Europe", annual_bookings: 6000000, booking_unit: "passengers", hubs: ["FRA"], description: "German leisure airline" },
  { company_name: "Eurowings", country: "Germany", continent: "Europe", annual_bookings: 20000000, booking_unit: "passengers", hubs: ["CGN", "DUS"], description: "Lufthansa Group low-cost carrier" },
  { company_name: "Jet2.com", country: "United Kingdom", continent: "Europe", annual_bookings: 17000000, booking_unit: "passengers", hubs: ["LBA", "MAN"], description: "British leisure airline" },
  { company_name: "Volotea", country: "Spain", continent: "Europe", annual_bookings: 5000000, booking_unit: "passengers", hubs: ["BCN", "MRS"], description: "European regional low-cost carrier" },

  // ── Middle East ─────────────────────────────────────────────────────
  { company_name: "Emirates", country: "United Arab Emirates", continent: "Middle East", annual_bookings: 58000000, booking_unit: "passengers", hubs: ["DXB"], description: "Flag carrier of Dubai" },
  { company_name: "Qatar Airways", country: "Qatar", continent: "Middle East", annual_bookings: 40000000, booking_unit: "passengers", hubs: ["DOH"], description: "Flag carrier of Qatar" },
  { company_name: "Etihad Airways", country: "United Arab Emirates", continent: "Middle East", annual_bookings: 14000000, booking_unit: "passengers", hubs: ["AUH"], description: "Flag carrier of Abu Dhabi" },
  { company_name: "flydubai", country: "United Arab Emirates", continent: "Middle East", annual_bookings: 12000000, booking_unit: "passengers", hubs: ["DXB"], description: "Dubai low-cost carrier" },
  { company_name: "Saudia", country: "Saudi Arabia", continent: "Middle East", annual_bookings: 30000000, booking_unit: "passengers", hubs: ["JED", "RUH"], description: "Flag carrier of Saudi Arabia" },
  { company_name: "Gulf Air", country: "Bahrain", continent: "Middle East", annual_bookings: 5000000, booking_unit: "passengers", hubs: ["BAH"], description: "Flag carrier of Bahrain" },
  { company_name: "Oman Air", country: "Oman", continent: "Middle East", annual_bookings: 5000000, booking_unit: "passengers", hubs: ["MCT"], description: "Flag carrier of Oman" },

  // ── Asia-Pacific ────────────────────────────────────────────────────
  { company_name: "Singapore Airlines", country: "Singapore", continent: "Asia", annual_bookings: 18000000, booking_unit: "passengers", hubs: ["SIN"], description: "Flag carrier of Singapore" },
  { company_name: "Cathay Pacific", country: "Hong Kong", continent: "Asia", annual_bookings: 15000000, booking_unit: "passengers", hubs: ["HKG"], description: "Flag carrier of Hong Kong" },
  { company_name: "ANA All Nippon Airways", country: "Japan", continent: "Asia", annual_bookings: 50000000, booking_unit: "passengers", hubs: ["HND", "NRT"], description: "Flag carrier of Japan" },
  { company_name: "Japan Airlines (JAL)", country: "Japan", continent: "Asia", annual_bookings: 28000000, booking_unit: "passengers", hubs: ["HND", "NRT"], description: "Japanese flag carrier" },
  { company_name: "Korean Air", country: "South Korea", continent: "Asia", annual_bookings: 22000000, booking_unit: "passengers", hubs: ["ICN"], description: "Flag carrier of South Korea" },
  { company_name: "Asiana Airlines", country: "South Korea", continent: "Asia", annual_bookings: 14000000, booking_unit: "passengers", hubs: ["ICN"], description: "South Korean carrier" },
  { company_name: "China Eastern Airlines", country: "China", continent: "Asia", annual_bookings: 120000000, booking_unit: "passengers", hubs: ["PVG", "SHA"], description: "Major Chinese carrier" },
  { company_name: "China Southern Airlines", country: "China", continent: "Asia", annual_bookings: 140000000, booking_unit: "passengers", hubs: ["CAN", "PEK"], description: "Largest airline in China by fleet" },
  { company_name: "Air China", country: "China", continent: "Asia", annual_bookings: 100000000, booking_unit: "passengers", hubs: ["PEK", "CTU"], description: "Flag carrier of China" },
  { company_name: "Thai Airways", country: "Thailand", continent: "Asia", annual_bookings: 12000000, booking_unit: "passengers", hubs: ["BKK"], description: "Flag carrier of Thailand" },
  { company_name: "Malaysia Airlines", country: "Malaysia", continent: "Asia", annual_bookings: 14000000, booking_unit: "passengers", hubs: ["KUL"], description: "Flag carrier of Malaysia" },
  { company_name: "Qantas", country: "Australia", continent: "Oceania", annual_bookings: 46000000, booking_unit: "passengers", hubs: ["SYD", "MEL"], description: "Flag carrier of Australia" },
  { company_name: "Air New Zealand", country: "New Zealand", continent: "Oceania", annual_bookings: 15000000, booking_unit: "passengers", hubs: ["AKL"], description: "Flag carrier of New Zealand" },
  { company_name: "Air India", country: "India", continent: "Asia", annual_bookings: 30000000, booking_unit: "passengers", hubs: ["DEL", "BOM"], description: "Flag carrier of India (Tata Group)" },
  { company_name: "IndiGo", country: "India", continent: "Asia", annual_bookings: 78000000, booking_unit: "passengers", hubs: ["DEL", "BOM"], description: "Largest airline in India by market share" },
  { company_name: "Garuda Indonesia", country: "Indonesia", continent: "Asia", annual_bookings: 10000000, booking_unit: "passengers", hubs: ["CGK"], description: "Flag carrier of Indonesia" },

  // ── Americas ───────────────────────────────────────────────────────
  { company_name: "Delta Air Lines", country: "United States", continent: "North America", annual_bookings: 190000000, booking_unit: "passengers", hubs: ["ATL", "JFK"], description: "Major US carrier" },
  { company_name: "American Airlines", country: "United States", continent: "North America", annual_bookings: 200000000, booking_unit: "passengers", hubs: ["DFW", "ORD"], description: "Largest airline in the world by fleet" },
  { company_name: "United Airlines", country: "United States", continent: "North America", annual_bookings: 162000000, booking_unit: "passengers", hubs: ["ORD", "EWR"], description: "Major US carrier" },
  { company_name: "Southwest Airlines", country: "United States", continent: "North America", annual_bookings: 137000000, booking_unit: "passengers", hubs: ["DAL", "MDW"], description: "Largest US low-cost carrier" },
  { company_name: "JetBlue Airways", country: "United States", continent: "North America", annual_bookings: 42000000, booking_unit: "passengers", hubs: ["JFK", "BOS"], description: "US low-cost carrier" },
  { company_name: "Air Canada", country: "Canada", continent: "North America", annual_bookings: 50000000, booking_unit: "passengers", hubs: ["YYZ", "YUL"], description: "Flag carrier of Canada" },
  { company_name: "WestJet", country: "Canada", continent: "North America", annual_bookings: 20000000, booking_unit: "passengers", hubs: ["YYC", "YYZ"], description: "Canadian low-cost carrier" },
  { company_name: "Aeroméxico", country: "Mexico", continent: "North America", annual_bookings: 20000000, booking_unit: "passengers", hubs: ["MEX", "GDL"], description: "Flag carrier of Mexico" },
  { company_name: "LATAM Airlines", country: "Chile", continent: "Latin America", annual_bookings: 67000000, booking_unit: "passengers", hubs: ["SCL", "LIM"], description: "Largest airline group in Latin America" },
  { company_name: "GOL Linhas Aéreas", country: "Brazil", continent: "Latin America", annual_bookings: 30000000, booking_unit: "passengers", hubs: ["GRU", "BSB"], description: "Brazilian low-cost carrier" },
  { company_name: "Azul Brazilian Airlines", country: "Brazil", continent: "Latin America", annual_bookings: 25000000, booking_unit: "passengers", hubs: ["GRU", "VCP"], description: "Brazilian carrier" },
  { company_name: "Avianca", country: "Colombia", continent: "Latin America", annual_bookings: 25000000, booking_unit: "passengers", hubs: ["BOG", "MDE"], description: "Flag carrier of Colombia" },
  { company_name: "Copa Airlines", country: "Panama", continent: "Latin America", annual_bookings: 14000000, booking_unit: "passengers", hubs: ["PTY"], description: "Flag carrier of Panama" },

  // ── Africa ─────────────────────────────────────────────────────────
  { company_name: "South African Airways", country: "South Africa", continent: "Africa", annual_bookings: 5000000, booking_unit: "passengers", hubs: ["JNB", "CPT"], description: "Flag carrier of South Africa" },
  { company_name: "EgyptAir", country: "Egypt", continent: "Africa", annual_bookings: 8000000, booking_unit: "passengers", hubs: ["CAI"], description: "Flag carrier of Egypt" },
  { company_name: "Ethiopian Airlines", country: "Ethiopia", continent: "Africa", annual_bookings: 12000000, booking_unit: "passengers", hubs: ["ADD"], description: "Flag carrier of Ethiopia" },
  { company_name: "Royal Air Maroc", country: "Morocco", continent: "Africa", annual_bookings: 7000000, booking_unit: "passengers", hubs: ["CMN"], description: "Flag carrier of Morocco" },
  { company_name: "Kenya Airways", country: "Kenya", continent: "Africa", annual_bookings: 4000000, booking_unit: "passengers", hubs: ["NBO"], description: "Flag carrier of Kenya" },
];

const ACCOMMODATION_PARTNERS = [
  // ── Europe ──────────────────────────────────────────────────────────
  { company_name: "NH Hotel Group", country: "Spain", continent: "Europe", annual_bookings: 16000000, booking_unit: "reservations", hubs: [], description: "Spanish hotel group (Minor Hotels)" },
  { company_name: "Meliá Hotels International", country: "Spain", continent: "Europe", annual_bookings: 20000000, booking_unit: "reservations", hubs: [], description: "Spanish hotel group" },
  { company_name: "Accor", country: "France", continent: "Europe", annual_bookings: 120000000, booking_unit: "reservations", hubs: [], description: "French hospitality group" },
  { company_name: "Radisson Hotel Group", country: "Sweden", continent: "Europe", annual_bookings: 15000000, booking_unit: "reservations", hubs: [], description: "Swedish-American hotel group" },
  { company_name: "Kempinski Hotels", country: "Switzerland", continent: "Europe", annual_bookings: 3000000, booking_unit: "reservations", hubs: [], description: "Luxury hotel group" },
  { company_name: "Corendon Hotels & Resorts", country: "Netherlands", continent: "Europe", annual_bookings: 2000000, booking_unit: "reservations", hubs: [], description: "Dutch leisure hotel chain" },
  { company_name: "Riu Hotels & Resorts", country: "Spain", continent: "Europe", annual_bookings: 5000000, booking_unit: "reservations", hubs: [], description: "Spanish resort chain (TUI stake)" },
  { company_name: "Blau Hotels & Resorts", country: "Germany", continent: "Europe", annual_bookings: 1000000, booking_unit: "reservations", hubs: [], description: "German resort chain" },
  { company_name: "Rixos Hotels", country: "Turkey", continent: "Europe", annual_bookings: 2000000, booking_unit: "reservations", hubs: [], description: "Turkish luxury resort chain" },
  { company_name: "Iberostar Hotels & Resorts", country: "Spain", continent: "Europe", annual_bookings: 2000000, booking_unit: "reservations", hubs: [], description: "Spanish hotel & resort chain" },
  { company_name: "Blue Diamond Resorts", country: "Spain", continent: "Europe", annual_bookings: 2000000, booking_unit: "reservations", hubs: [], description: "Caribbean resort brand" },
  { company_name: "Mandarin Oriental Hotel Group", country: "Hong Kong", continent: "Europe", annual_bookings: 1500000, booking_unit: "reservations", hubs: [], description: "Luxury hotel group" },
  { company_name: "TUI Hotels & Resorts", country: "Germany", continent: "Europe", annual_bookings: 21000000, booking_unit: "reservations", hubs: [], description: "Largest leisure hotel group in Europe" },

  // ── North America ──────────────────────────────────────────────────
  { company_name: "Marriott International", country: "United States", continent: "North America", annual_bookings: 160000000, booking_unit: "reservations", hubs: [], description: "Largest hotel chain in the world" },
  { company_name: "Hilton Worldwide", country: "United States", continent: "North America", annual_bookings: 150000000, booking_unit: "reservations", hubs: [], description: "Global hospitality leader" },
  { company_name: "Hyatt Hotels Corporation", country: "United States", continent: "North America", annual_bookings: 30000000, booking_unit: "reservations", hubs: [], description: "US luxury & lifestyle hotel group" },
  { company_name: "IHG Hotels & Resorts", country: "United Kingdom", continent: "Europe", annual_bookings: 100000000, booking_unit: "reservations", hubs: [], description: "InterContinental Hotels Group" },
  { company_name: "Wyndham Hotels & Resorts", country: "United States", continent: "North America", annual_bookings: 80000000, booking_unit: "reservations", hubs: [], description: "Largest hotel franchise company" },
  { company_name: "Choice Hotels International", country: "United States", continent: "North America", annual_bookings: 60000000, booking_unit: "reservations", hubs: [], description: "US hotel franchise company" },
  { company_name: "Four Seasons Hotels and Resorts", country: "Canada", continent: "North America", annual_bookings: 2000000, booking_unit: "reservations", hubs: [], description: "Canadian luxury hotel group" },
  { company_name: "Host Hotels & Resorts", country: "United States", continent: "North America", annual_bookings: 30000000, booking_unit: "reservations", hubs: [], description: "Largest US lodging REIT" },

  // ── Asia-Pacific ────────────────────────────────────────────────────
  { company_name: "Shangri-La Hotels and Resorts", country: "Hong Kong", continent: "Asia", annual_bookings: 3000000, booking_unit: "reservations", hubs: [], description: "Asian luxury hotel group" },
  { company_name: "Jumeirah Group", country: "United Arab Emirates", continent: "Middle East", annual_bookings: 2000000, booking_unit: "reservations", hubs: [], description: "Dubai luxury hotel group" },
  { company_name: "Minor Hotels", country: "Thailand", continent: "Asia", annual_bookings: 20000000, booking_unit: "reservations", hubs: [], description: "Thai hospitality group (Anantara, NH, Avani)" },
];

const CAR_PARTNERS = [
  // ── Europe ──────────────────────────────────────────────────────────
  { company_name: "Sixt SE", country: "Germany", continent: "Europe", annual_bookings: 8000000, booking_unit: "rentals", hubs: [], description: "German car rental company" },
  { company_name: "Europcar Mobility Group", country: "France", continent: "Europe", annual_bookings: 10000000, booking_unit: "rentals", hubs: [], description: "French car rental company" },
  { company_name: "Goldcar", country: "Spain", continent: "Europe", annual_bookings: 2000000, booking_unit: "rentals", hubs: [], description: "Spanish low-cost car rental" },
  { company_name: "OK Mobility", country: "Spain", continent: "Europe", annual_bookings: 1500000, booking_unit: "rentals", hubs: [], description: "Spanish car rental & mobility" },
  { company_name: "Record Go", country: "Spain", continent: "Europe", annual_bookings: 1000000, booking_unit: "rentals", hubs: [], description: "Spanish low-cost car rental" },
  { company_name: "Centauro Rent a Car", country: "Spain", continent: "Europe", annual_bookings: 1000000, booking_unit: "rentals", hubs: [], description: "Spanish car rental company" },

  // ── North America ──────────────────────────────────────────────────
  { company_name: "Hertz", country: "United States", continent: "North America", annual_bookings: 20000000, booking_unit: "rentals", hubs: [], description: "US car rental company" },
  { company_name: "Avis Budget Group", country: "United States", continent: "North America", annual_bookings: 20000000, booking_unit: "rentals", hubs: [], description: "Avis + Budget car rental" },
  { company_name: "Enterprise Holdings", country: "United States", continent: "North America", annual_bookings: 50000000, booking_unit: "rentals", hubs: [], description: "Largest car rental company in the world" },
  { company_name: "National Car Rental", country: "United States", continent: "North America", annual_bookings: 3000000, booking_unit: "rentals", hubs: [], description: "Enterprise Holdings brand" },
  { company_name: "Alamo Rent a Car", country: "United States", continent: "North America", annual_bookings: 5000000, booking_unit: "rentals", hubs: [], description: "Enterprise Holdings brand" },
  { company_name: "Thrifty Car Rental", country: "United States", continent: "North America", annual_bookings: 3000000, booking_unit: "rentals", hubs: [], description: "Hertz brand" },
  { company_name: "Dollar Car Rental", country: "United States", continent: "North America", annual_bookings: 2000000, booking_unit: "rentals", hubs: [], description: "Hertz brand" },
];

// ── Exports ──────────────────────────────────────────────────────────
const ALL_PARTNERS = [...FLIGHT_PARTNERS, ...ACCOMMODATION_PARTNERS, ...CAR_PARTNERS];

export const TRAVEL_PARTNERS = ALL_PARTNERS.map((p) => ({
  ...p,
  monthly_bookings: Math.round(p.annual_bookings / 12),
}));

export const PARTNER_CONTINENTS = [
  ...new Set(ALL_PARTNERS.map((p) => p.continent)),
].sort();

export function getPartnersByVertical(vertical) {
  return TRAVEL_PARTNERS.filter((p) => p.vertical === vertical);
}

export function getPartnersByVerticalAndContinent(vertical, continent) {
  return TRAVEL_PARTNERS.filter(
    (p) => p.vertical === vertical && (continent === "all" || p.continent === continent)
  );
}