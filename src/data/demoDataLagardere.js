// Lagardère Travel Retail demo data — global multi-country airport retailer network.
//
// Covers ~40 countries where Lagardère Travel Retail (LTR) operates:
//   Europe (23 countries), Middle East & Africa (11), Asia-Pacific (14), Americas (6)
//
// Retailer names are real LTR store brands and fashion partners operating
// across the Lagardère network (source: lagardere-tr.com/locations).
// Revenue is calculated using the same model as the RetailerCalculator:
//   dailyRedemptions = daily_pax × 3%
//   monthlyRedemptions = dailyRedemptions × 365 / 12
//   basket = estimateAvgBasketSpend(airport)  → [€35, €150]
//   grossRevenue = redemptions × basket
// Net revenue / savings / fee computed in the dashboard (calculator model).

import { estimateAvgBasketSpend } from "../utils/airportBasketEstimate";

const CONVERSION_RATE = 3;
const PLATFORM_FEE_PCT = 0.025;

// ── Amsterdam Schiphol specific stores (Today Duty Free flagship + fashion) ──
const SCHIPHOL_STORES = [
  "Today Duty Free",
  "Aelia Duty Free",
  "Relay Schiphol",
  "So Coffee",
  "Hub Convenience",
  "Hermès",
  "Gucci",
  "Burberry",
  "Hugo Boss",
  "Lacoste",
  "Guess",
  "Polo Ralph Lauren",
  "Salvatore Ferragamo",
  "Tumi",
  "Zegna",
  "UGG",
  "Longchamp",
  "Victoria's Secret",
  "The Body Shop",
  "Rituals",
];

// ── LTR store brands operating across all other airports ───────────────────
const LTR_STORE_CHAINS = [
  "Aelia Duty Free",
  "Relay",
  "So Coffee",
  "Hub Convenience",
  "Marché Restaurant",
  "Hermès",
  "Gucci",
  "Burberry",
  "Hugo Boss",
  "Lacoste",
  "Guess",
  "Polo Ralph Lauren",
  "Salvatore Ferragamo",
  "Tumi",
  "Zegna",
  "UGG",
  "Longchamp",
  "Victoria's Secret",
  "The Body Shop",
  "Rituals",
  "Sunglass Hut",
  "Swarovski",
  "Samsonite",
  "Desigual",
  "Tech2Go",
  "World Duty Free",
  "The Fashion Place",
  "Beauty & You",
];

// ── Number of retailers per airport, based on annual passenger volume ────────
function retailerCount(annualPax) {
  if (annualPax >= 60_000_000) return 8;
  if (annualPax >= 30_000_000) return 6;
  if (annualPax >= 15_000_000) return 5;
  if (annualPax >= 5_000_000)  return 4;
  if (annualPax >= 1_000_000)  return 3;
  return 2;
}

// Revenue distribution weights among retailers at the same airport
const WEIGHTS = {
  2: [0.55, 0.45],
  3: [0.40, 0.35, 0.25],
  4: [0.32, 0.28, 0.22, 0.18],
  5: [0.28, 0.24, 0.20, 0.16, 0.12],
  6: [0.24, 0.21, 0.18, 0.15, 0.12, 0.10],
  8: [0.20, 0.16, 0.13, 0.12, 0.10, 0.10, 0.09, 0.10],
};

// ── Comprehensive Lagardère airport list across ~40 countries ────────────────
// Each entry: [name, code, city, country, annual_pax]
// Source: lagardere-tr.com locations + ACI passenger data (2023–2024)
const LTR_AIRPORTS_RAW = [
  // ── Netherlands ──
  ["Amsterdam Airport Schiphol", "AMS", "Amsterdam", "Netherlands", 61900000],
  ["Eindhoven Airport", "EIN", "Eindhoven", "Netherlands", 6500000],
  ["Rotterdam The Hague Airport", "RTM", "Rotterdam", "Netherlands", 2100000],

  // ── France ──
  ["Paris Charles de Gaulle Airport", "CDG", "Paris", "France", 67600000],
  ["Paris Orly Airport", "ORY", "Paris", "France", 33100000],
  ["Nice Côte d'Azur Airport", "NCE", "Nice", "France", 14400000],
  ["Lyon-Saint Exupéry Airport", "LYS", "Lyon", "France", 12000000],
  ["Marseille Provence Airport", "MRS", "Marseille", "France", 10000000],
  ["Bordeaux-Mérignac Airport", "BOD", "Bordeaux", "France", 3000000],
  ["Toulouse-Blagnac Airport", "TLS", "Toulouse", "France", 9900000],
  ["Nantes Atlantique Airport", "NTE", "Nantes", "France", 7300000],

  // ── Germany ──
  ["Frankfurt Airport", "FRA", "Frankfurt", "Germany", 59400000],
  ["Munich Airport", "MUC", "Munich", "Germany", 47900000],
  ["Berlin Brandenburg Airport", "BER", "Berlin", "Germany", 25700000],
  ["Hamburg Airport", "HAM", "Hamburg", "Germany", 14600000],
  ["Düsseldorf Airport", "DUS", "Düsseldorf", "Germany", 19200000],
  ["Cologne Bonn Airport", "CGN", "Cologne", "Germany", 10600000],
  ["Stuttgart Airport", "STR", "Stuttgart", "Germany", 10600000],

  // ── Spain ──
  ["Adolfo Suárez Madrid-Barajas Airport", "MAD", "Madrid", "Spain", 60200000],
  ["Barcelona-El Prat Airport", "BCN", "Barcelona", "Spain", 52600000],
  ["Málaga-Costa del Sol Airport", "AGP", "Málaga", "Spain", 24900000],
  ["Valencia Airport", "VLC", "Valencia", "Spain", 10000000],
  ["Palma de Mallorca Airport", "PMI", "Palma", "Spain", 31900000],
  ["Alicante-Elche Airport", "ALC", "Alicante", "Spain", 15700000],

  // ── United Kingdom ──
  ["London Luton Airport", "LTN", "London", "United Kingdom", 16000000],
  ["Manchester Airport", "MAN", "Manchester", "United Kingdom", 30000000],
  ["Edinburgh Airport", "EDI", "Edinburgh", "United Kingdom", 14500000],
  ["Birmingham Airport", "BHX", "Birmingham", "United Kingdom", 13000000],
  ["Glasgow Airport", "GLA", "Glasgow", "United Kingdom", 7700000],
  ["Bristol Airport", "BRS", "Bristol", "United Kingdom", 8800000],

  // ── Italy ──
  ["Leonardo da Vinci–Fiumicino Airport", "FCO", "Rome", "Italy", 40500000],
  ["Malpensa Airport", "MXP", "Milan", "Italy", 26100000],
  ["Florence Peretola Airport", "FLR", "Florence", "Italy", 2900000],
  ["Venice Marco Polo Airport", "VCE", "Venice", "Italy", 11500000],
  ["Naples International Airport", "NAP", "Naples", "Italy", 11000000],
  ["Pisa International Airport", "PSA", "Pisa", "Italy", 5500000],

  // ── Belgium ──
  ["Brussels Airport", "BRU", "Brussels", "Belgium", 22100000],
  ["Brussels South Charleroi Airport", "CRL", "Charleroi", "Belgium", 8300000],

  // ── Switzerland ──
  ["Zurich Airport", "ZRH", "Zurich", "Switzerland", 31800000],
  ["Geneva Airport", "GVA", "Geneva", "Switzerland", 17800000],

  // ── Poland ──
  ["Warsaw Chopin Airport", "WAW", "Warsaw", "Poland", 21200000],
  ["Kraków John Paul II Airport", "KRK", "Kraków", "Poland", 9400000],
  ["Gdańsk Lech Wałęsa Airport", "GDN", "Gdańsk", "Poland", 5400000],

  // ── Austria ──
  ["Vienna International Airport", "VIE", "Vienna", "Austria", 31700000],
  ["Salzburg Airport", "SZG", "Salzburg", "Austria", 4700000],

  // ── Romania ──
  ["Bucharest Henri Coandă Airport", "OTP", "Bucharest", "Romania", 15500000],
  ["Cluj-Napoca Airport", "CLJ", "Cluj-Napoca", "Romania", 3300000],

  // ── Czech Republic ──
  ["Prague Václav Havel Airport", "PRG", "Prague", "Czech Republic", 17800000],

  // ── Denmark ──
  ["Copenhagen Airport", "CPH", "Copenhagen", "Denmark", 30200000],
  ["Aalborg Airport", "AAL", "Aalborg", "Denmark", 1500000],

  // ── Sweden ──
  ["Stockholm Arlanda Airport", "ARN", "Stockholm", "Sweden", 25100000],
  ["Gothenburg Landvetter Airport", "GOT", "Gothenburg", "Sweden", 6500000],

  // ── Norway ──
  ["Oslo Airport, Gardermoen", "OSL", "Oslo", "Norway", 28500000],
  ["Bergen Airport, Flesland", "BGO", "Bergen", "Norway", 6300000],

  // ── Finland ──
  ["Helsinki Airport", "HEL", "Helsinki", "Finland", 15300000],

  // ── Hungary ──
  ["Budapest Ferenc Liszt Airport", "BUD", "Budapest", "Hungary", 15200000],

  // ── Slovakia ──
  ["Bratislava Airport", "BTS", "Bratislava", "Slovakia", 2300000],

  // ── Greece ──
  ["Athens International Airport", "ATH", "Athens", "Greece", 28100000],
  ["Thessaloniki Airport", "SKG", "Thessaloniki", "Greece", 7300000],
  ["Heraklion Airport", "HER", "Heraklion", "Greece", 8100000],

  // ── Portugal ──
  ["Lisbon Humberto Delgado Airport", "LIS", "Lisbon", "Portugal", 33700000],
  ["Porto Airport", "OPO", "Porto", "Portugal", 15600000],
  ["Faro Airport", "FAO", "Faro", "Portugal", 9100000],

  // ── Ireland ──
  ["Dublin Airport", "DUB", "Dublin", "Ireland", 32900000],
  ["Cork Airport", "ORK", "Cork", "Ireland", 2700000],

  // ── Luxembourg ──
  ["Luxembourg Airport", "LUX", "Luxembourg", "Luxembourg", 4900000],

  // ── Bulgaria ──
  ["Sofia Airport", "SOF", "Sofia", "Bulgaria", 8000000],
  ["Varna Airport", "VAR", "Varna", "Bulgaria", 2100000],

  // ── United Arab Emirates ──
  ["Dubai International Airport", "DXB", "Dubai", "United Arab Emirates", 87100000],
  ["Abu Dhabi International Airport", "AUH", "Abu Dhabi", "United Arab Emirates", 22400000],

  // ── Saudi Arabia ──
  ["King Abdulaziz International Airport", "JED", "Jeddah", "Saudi Arabia", 41000000],
  ["King Khalid International Airport", "RUH", "Riyadh", "Saudi Arabia", 32100000],

  // ── Qatar ──
  ["Hamad International Airport", "DOH", "Doha", "Qatar", 45900000],

  // ── Kuwait ──
  ["Kuwait International Airport", "KWI", "Kuwait City", "Kuwait", 15900000],

  // ── Bahrain ──
  ["Bahrain International Airport", "BAH", "Manama", "Bahrain", 9800000],

  // ── Oman ──
  ["Muscat International Airport", "MCT", "Muscat", "Oman", 10000000],

  // ── South Africa ──
  ["O.R. Tambo International Airport", "JNB", "Johannesburg", "South Africa", 21000000],
  ["Cape Town International Airport", "CPT", "Cape Town", "South Africa", 10600000],

  // ── Morocco ──
  ["Mohammed V International Airport", "CMN", "Casablanca", "Morocco", 10500000],
  ["Marrakech Menara Airport", "RAK", "Marrakech", "Morocco", 6300000],

  // ── Egypt ──
  ["Cairo International Airport", "CAI", "Cairo", "Egypt", 14500000],
  ["Hurghada Airport", "HRG", "Hurghada", "Egypt", 7100000],

  // ── Kenya ──
  ["Jomo Kenyatta International Airport", "NBO", "Nairobi", "Kenya", 7400000],

  // ── Nigeria ──
  ["Murtala Muhammed International Airport", "LOS", "Lagos", "Nigeria", 6300000],

  // ── Singapore ──
  ["Singapore Changi Airport", "SIN", "Singapore", "Singapore", 58900000],

  // ── Malaysia ──
  ["Kuala Lumpur International Airport", "KUL", "Kuala Lumpur", "Malaysia", 62400000],
  ["Penang International Airport", "PEN", "Penang", "Malaysia", 7800000],

  // ── China ──
  ["Beijing Capital International Airport", "PEK", "Beijing", "China", 100000000],
  ["Shanghai Pudong International Airport", "PVG", "Shanghai", "China", 76000000],
  ["Guangzhou Baiyun International Airport", "CAN", "Guangzhou", "China", 73400000],

  // ── Hong Kong ──
  ["Hong Kong International Airport", "HKG", "Hong Kong", "Hong Kong", 47000000],

  // ── Japan ──
  ["Tokyo Narita International Airport", "NRT", "Tokyo", "Japan", 44000000],
  ["Kansai International Airport", "KIX", "Osaka", "Japan", 28000000],

  // ── South Korea ──
  ["Incheon International Airport", "ICN", "Seoul", "South Korea", 71000000],

  // ── Taiwan ──
  ["Taiwan Taoyuan International Airport", "TPE", "Taipei", "Taiwan", 48700000],

  // ── Thailand ──
  ["Suvarnabhumi Airport", "BKK", "Bangkok", "Thailand", 65200000],
  ["Phuket International Airport", "HKT", "Phuket", "Thailand", 18300000],

  // ── Indonesia ──
  ["Soekarno-Hatta International Airport", "CGK", "Jakarta", "Indonesia", 54300000],
  ["Ngurah Rai International Airport", "DPS", "Denpasar", "Indonesia", 24300000],

  // ── Philippines ──
  ["Ninoy Aquino International Airport", "MNL", "Manila", "Philippines", 45300000],
  ["Mactan-Cebu International Airport", "CEB", "Cebu", "Philippines", 10600000],

  // ── Vietnam ──
  ["Tan Son Nhat International Airport", "SGN", "Ho Chi Minh City", "Vietnam", 32500000],
  ["Noi Bai International Airport", "HAN", "Hanoi", "Vietnam", 22000000],

  // ── India ──
  ["Indira Gandhi International Airport", "DEL", "New Delhi", "India", 73700000],
  ["Chhatrapati Shivaji International Airport", "BOM", "Mumbai", "India", 52800000],

  // ── Australia ──
  ["Sydney Kingsford Smith Airport", "SYD", "Sydney", "Australia", 44400000],
  ["Melbourne Airport", "MEL", "Melbourne", "Australia", 36700000],
  ["Brisbane Airport", "BNE", "Brisbane", "Australia", 22500000],

  // ── New Zealand ──
  ["Auckland Airport", "AKL", "Auckland", "New Zealand", 20500000],
  ["Christchurch Airport", "CHC", "Christchurch", "New Zealand", 6900000],

  // ── United States (Paradies Lagardère) ──
  ["Hartsfield-Jackson Atlanta International Airport", "ATL", "Atlanta", "United States", 104600000],
  ["John F. Kennedy International Airport", "JFK", "New York", "United States", 62500000],
  ["Los Angeles International Airport", "LAX", "Los Angeles", "United States", 75900000],
  ["O'Hare International Airport", "ORD", "Chicago", "United States", 73900000],

  // ── Canada ──
  ["Toronto Pearson International Airport", "YYZ", "Toronto", "Canada", 50500000],
  ["Vancouver International Airport", "YVR", "Vancouver", "Canada", 26400000],

  // ── Brazil ──
  ["São Paulo–Guarulhos International Airport", "GRU", "São Paulo", "Brazil", 42000000],
  ["Rio de Janeiro/Galeão Airport", "GIG", "Rio de Janeiro", "Brazil", 7400000],

  // ── Mexico ──
  ["Mexico City International Airport", "MEX", "Mexico City", "Mexico", 50300000],
  ["Cancún International Airport", "CUN", "Cancún", "Mexico", 30700000],

  // ── Chile ──
  ["Arturo Merino Benítez International Airport", "SCL", "Santiago", "Chile", 24000000],

  // ── Colombia ──
  ["El Dorado International Airport", "BOG", "Bogotá", "Colombia", 35400000],
];

// ── Country → region mapping (for basket estimation) ─────────────────────────
const COUNTRY_REGION = {
  // Europe
  "Netherlands": "Europe", "France": "Europe", "Germany": "Europe", "Spain": "Europe",
  "United Kingdom": "Europe", "Italy": "Europe", "Belgium": "Europe", "Switzerland": "Europe",
  "Poland": "Europe", "Austria": "Europe", "Romania": "Europe", "Czech Republic": "Europe",
  "Denmark": "Europe", "Sweden": "Europe", "Norway": "Europe", "Finland": "Europe",
  "Hungary": "Europe", "Slovakia": "Europe", "Greece": "Europe", "Portugal": "Europe",
  "Ireland": "Europe", "Luxembourg": "Europe", "Bulgaria": "Europe",
  // Middle East
  "United Arab Emirates": "Middle East", "Saudi Arabia": "Middle East",
  "Qatar": "Middle East", "Kuwait": "Middle East", "Bahrain": "Middle East", "Oman": "Middle East",
  // Africa
  "South Africa": "Africa", "Morocco": "Africa", "Egypt": "Africa", "Kenya": "Africa", "Nigeria": "Africa",
  // Asia
  "Singapore": "Asia", "Malaysia": "Asia", "China": "Asia", "Hong Kong": "Asia",
  "Japan": "Asia", "South Korea": "Asia", "Taiwan": "Asia", "Thailand": "Asia",
  "Indonesia": "Asia", "Philippines": "Asia", "Vietnam": "Asia", "India": "Asia",
  // Oceania
  "Australia": "Oceania", "New Zealand": "Oceania",
  // Americas
  "United States": "Americas", "Canada": "Americas", "Brazil": "Americas",
  "Mexico": "Americas", "Chile": "Americas", "Colombia": "Americas",
};

const ltrAirportData = LTR_AIRPORTS_RAW.map(([name, code, city, country, annualPax]) => ({
  name,
  code,
  city,
  country,
  region: COUNTRY_REGION[country] || "Europe",
  annual_pax: annualPax,
  daily_pax: Math.round(annualPax / 365),
}));

export const AIRPORTS = ltrAirportData.map(a => ({
  code: a.code,
  name: a.name,
  city: a.city,
  country: a.country,
}));

// ── Generate RETAILERS with real LTR store names ────────────────────────────
let _idCounter = 0;
let _chainIdx = 0;

export const RETAILERS = ltrAirportData.flatMap(airport => {
  const count = retailerCount(airport.annual_pax);
  const basket = estimateAvgBasketSpend(airport);
  const dailyPax = airport.daily_pax || Math.round((airport.annual_pax || 0) / 365);
  const dailyRedemptions = Math.round(dailyPax * (CONVERSION_RATE / 100));
  const monthlyRedemptions = Math.round(dailyRedemptions * 365 / 12);
  const weights = WEIGHTS[count];

  // Schiphol uses its real store list; other airports draw from the LTR chain pool
  const namePool = airport.code === "AMS" ? SCHIPHOL_STORES : LTR_STORE_CHAINS;

  return Array.from({ length: count }, (_, i) => {
    const name = namePool === SCHIPHOL_STORES
      ? SCHIPHOL_STORES[i % SCHIPHOL_STORES.length]
      : LTR_STORE_CHAINS[(_chainIdx++) % LTR_STORE_CHAINS.length];

    _idCounter++;
    const redemptions = Math.round(monthlyRedemptions * weights[i]);
    const revenue = redemptions * basket;

    return {
      id: `r${_idCounter}`,
      name,
      airport: airport.code,
      category: "Retail",
      redemptions,
      avg_sale: basket,
      revenue,
      contact_person: "Sofie van der Meer",
      email: "s.vandermeer@lagardere-tr.nl",
      company: "Lagardère Travel Retail Netherlands B.V.",
      phone: "+31 20 653 55 55",
    };
  });
});

// ── Aggregate base figures (average month across all LTR airports) ───────────
const baseMonthlyRedemptions = RETAILERS.reduce((s, r) => s + r.redemptions, 0);
const baseMonthlyRevenue = RETAILERS.reduce((s, r) => s + r.revenue, 0);
const baseDailyRedemptions = Math.round(baseMonthlyRedemptions * 12 / 365);
const baseDailyRevenue = Math.round(baseMonthlyRevenue * 12 / 365);

// ── Seasonal multipliers (global travel patterns) ─────────────────────────────
const MONTHLY_SEASONALITY = [
  { month: "Jan", mult: 0.75 }, { month: "Feb", mult: 0.80 }, { month: "Mar", mult: 0.90 },
  { month: "Apr", mult: 0.95 }, { month: "May", mult: 1.00 }, { month: "Jun", mult: 1.10 },
  { month: "Jul", mult: 1.20 }, { month: "Aug", mult: 1.25 }, { month: "Sep", mult: 1.00 },
  { month: "Oct", mult: 0.90 }, { month: "Nov", mult: 0.85 }, { month: "Dec", mult: 1.15 },
];

export const MONTHLY_DATA = MONTHLY_SEASONALITY.slice(0, 6).map(({ month, mult }) => {
  const redemptions = Math.round(baseMonthlyRedemptions * mult);
  const revenue = Math.round(baseMonthlyRevenue * mult);
  return { month, redemptions, revenue, commission: Math.round(revenue * PLATFORM_FEE_PCT * 100) / 100 };
});

export const YEARLY_DATA = [
  ...MONTHLY_SEASONALITY.slice(6),
  ...MONTHLY_SEASONALITY.slice(0, 6),
].map(({ month, mult }) => {
  const redemptions = Math.round(baseMonthlyRedemptions * mult);
  const revenue = Math.round(baseMonthlyRevenue * mult);
  return { month, redemptions, revenue, commission: Math.round(revenue * PLATFORM_FEE_PCT * 100) / 100 };
});

const DAILY_SEASONALITY = [
  { day: "21 Jun", mult: 1.10 },
  { day: "22 Jun", mult: 0.85 },
  { day: "23 Jun", mult: 0.80 },
  { day: "24 Jun", mult: 0.85 },
  { day: "25 Jun", mult: 0.95 },
  { day: "26 Jun", mult: 1.10 },
  { day: "27 Jun", mult: 1.20 },
];

export const DAILY_DATA = DAILY_SEASONALITY.map(({ day, mult }) => ({
  day,
  redemptions: Math.round(baseDailyRedemptions * mult),
  revenue: Math.round(baseDailyRevenue * mult),
}));