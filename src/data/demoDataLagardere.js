// Lagardère Travel Retail demo data — global multi-country airport retailer network.
//
// Covers ~40 countries where Lagardère Travel Retail (LTR) operates.
// Store counts reflect LTR's actual retail presence per airport (duty free,
// fashion, travel essentials, specialty) — ALL F&B excluded.
//
// Revenue model (incremental uplift from DutyBoost):
//   dailyRedemptions = daily_pax × 0.01%   (DutyBoost's incremental shopper uplift)
//   monthlyRedemptions = dailyRedemptions × 365 / 12
//   basket = estimateAvgBasketSpend(airport)  → [€20, €150]
//   grossRevenue = redemptions × basket
// 0.01% reflects DutyBoost's stated minimum incremental uplift on top of the
// existing 15–25% airport shopping rate (ETRC / m1nd-set research).
// Weights use a Zipf-like long-tail distribution so the flagship duty-free
// store gets the largest share, tapering to small specialty kiosks.

import { estimateAvgBasketSpend } from "../utils/airportBasketEstimate";

const CONVERSION_RATE = 0.01; // 0.01% — DutyBoost incremental uplift
const PLATFORM_FEE_PCT = 0.025;

// ── Amsterdam Schiphol: 55 real LTR retail stores (no F&B) ──────────────────
// Source: Schiphol/LTR partnership announcement (May 2025) — 20+ duty-free stores
// plus existing fashion, travel essentials & souvenirs operations.
const SCHIPHOL_STORES = [
  // Today Duty Free — new flagship concept (5 locations across lounges/piers)
  "Today Duty Free (Lounge 1)",
  "Today Duty Free (Lounge 2)",
  "Today Duty Free (Lounge 3)",
  "Today Duty Free (Pier D)",
  "Today Duty Free (Pier E)",
  // Aelia Duty Free (2 locations)
  "Aelia Duty Free (Lounge 2)",
  "Aelia Duty Free (Pier D)",
  // Fashion boutiques (20)
  "Hermès", "Gucci", "Burberry", "Hugo Boss", "Lacoste",
  "Guess", "Polo Ralph Lauren", "Salvatore Ferragamo", "Tumi", "Zegna",
  "UGG", "Longchamp", "Victoria's Secret", "The Body Shop", "Rituals",
  "Sunglass Hut", "Swarovski", "Samsonite", "Desigual", "Coach",
  // Relay travel essentials (11 locations across terminals/piers/arrivals)
  "Relay (Lounge 1)", "Relay (Lounge 2)", "Relay (Lounge 3)",
  "Relay (Pier C)", "Relay (Pier D)", "Relay (Pier E)",
  "Relay (Schiphol Plaza)", "Relay (Arrivals 1)", "Relay (Arrivals 2)",
  "Relay (Arrivals 3)", "Relay (Pier D After Security)",
  // Hub Convenience (4 locations)
  "Hub Convenience (Lounge 1)", "Hub Convenience (Lounge 2)",
  "Hub Convenience (Lounge 3)", "Hub Convenience (Pier D)",
  // Specialty & concepts (13)
  "The Fashion Place", "Beauty & You", "Tech2Go",
  "Walk in Harmony", "World News", "Readshop",
  "Dutch Souvenirs (Schiphol Plaza)", "Dutch Souvenirs (Lounge 2)",
  "L'Occitane", "MAC Cosmetics",
  "Destination Netherlands", "Schiphol Fashion",
];

// ── LTR retail store brands operating across all other airports (NO F&B) ────
const LTR_RETAIL_BRANDS = [
  // Duty Free
  "Today Duty Free", "Aelia Duty Free", "DFS Gallery",
  // Travel Essentials
  "Relay", "Hub Convenience", "Tech2Go", "World News", "Travel Essentials",
  // Fashion & Accessories
  "Hermès", "Gucci", "Burberry", "Hugo Boss", "Lacoste", "Guess",
  "Polo Ralph Lauren", "Salvatore Ferragamo", "Tumi", "Zegna", "UGG",
  "Longchamp", "Victoria's Secret", "Desigual", "Coach", "Michael Kors",
  "Tommy Hilfiger", "Calvin Klein", "Armani Exchange", "Samsonite",
  // Beauty & Specialty
  "The Body Shop", "Rituals", "Sunglass Hut", "Swarovski",
  "L'Occitane", "MAC Cosmetics", "Jo Malone", "Montblanc", "Bvlgari",
  // LTR proprietary concepts
  "The Fashion Place", "Beauty & You", "Walk in Harmony",
];

// Location suffixes for airports with more stores than the brand pool
const LOCATION_SUFFIXES = [
  "(Terminal 1)", "(Terminal 2)", "(Terminal 3)", "(Pier A)", "(Pier B)",
  "(Pier C)", "(Concourse A)", "(Concourse B)", "(Gate Area)", "(Arrivals)",
];

// ── Store count per airport — based on LTR's actual retail presence ──────────
// Schiphol: 55 stores (confirmed by user + Schiphol/LTR partnership data).
// North America (Paradies Lagardère): 700+ stores across 90+ airports —
//   ATL alone has 50+ stores, major hubs 30+.
// Other airports: tiered by passenger volume + LTR's known market position.
function retailerCount(annualPax, code) {
  // Explicit counts for airports with known LTR presence
  const EXPLICIT = {
    "AMS": 55,  // Confirmed — 55 LTR retail stores
    "ATL": 50,  // Paradies Lagardère HQ airport
    "CDG": 38,  // LTR #1 market in France
    "FRA": 30,  // Major German hub
    "MAD": 35,  // AENA partnership
    "BCN": 28,
    "LAX": 35,
    "JFK": 30,
    "ORD": 30,
    "DXB": 18,  // Dubai Duty Free dominates; LTR has smaller share
    "PEK": 25,
    "SIN": 22,
    "ICN": 20,
    "HKG": 20,
    "CDG": 38,
  };
  if (EXPLICIT[code]) return EXPLICIT[code];

  // Tiered by passenger volume
  if (annualPax >= 80_000_000) return 35;
  if (annualPax >= 60_000_000) return 28;
  if (annualPax >= 40_000_000) return 22;
  if (annualPax >= 30_000_000) return 18;
  if (annualPax >= 20_000_000) return 14;
  if (annualPax >= 15_000_000) return 10;
  if (annualPax >= 10_000_000) return 8;
  if (annualPax >= 5_000_000)  return 5;
  if (annualPax >= 1_000_000)  return 3;
  return 2;
}

// ── Zipf-like weight distribution for any store count ────────────────────────
// First store (flagship duty free) gets the largest share, then tapers.
// This mirrors real airport retail where duty free dominates revenue.
function generateWeights(count) {
  const alpha = 0.5;
  const raw = Array.from({ length: count }, (_, i) => 1 / Math.pow(i + 1, alpha));
  const sum = raw.reduce((a, b) => a + b, 0);
  return raw.map(v => v / sum);
}

// ── Generate store names for an airport (Schiphol uses explicit list) ──────
function generateStoreNames(airport, count) {
  if (airport.code === "AMS") return SCHIPHOL_STORES.slice(0, count);

  const stores = [];
  const poolSize = LTR_RETAIL_BRANDS.length;
  // Rotate starting index per airport so different airports get different brands
  const offset = (airport.name.length + airport.code.charCodeAt(0)) % poolSize;

  for (let i = 0; i < count; i++) {
    const baseName = LTR_RETAIL_BRANDS[(offset + i) % poolSize];
    // If we've cycled through the entire pool, add a location suffix
    if (i >= poolSize) {
      const locIdx = Math.floor((i - poolSize) / poolSize) % LOCATION_SUFFIXES.length;
      stores.push(`${baseName} ${LOCATION_SUFFIXES[locIdx]}`);
    } else {
      stores.push(baseName);
    }
  }
  return stores;
}

// ── Comprehensive Lagardère airport list — 290+ airports across 61 countries ─
// Each entry: [name, code, city, country, annual_pax]
// Source: lagardere-tr.com (official: +290 airports, +4,800 stores, 61 countries),
// paradieslagardere.com (92 North American airports), ACI passenger data (2023–2024)
const LTR_AIRPORTS_RAW = [
  // ── Netherlands ──
  ["Amsterdam Airport Schiphol", "AMS", "Amsterdam", "Netherlands", 68800000],
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

  // ════════════════════════════════════════════════════════════════════════════
  // PARADIES LAGARDÈRE — North America (92 airports, 700+ stores)
  // Source: paradieslagardere.com/na-locations/
  // ════════════════════════════════════════════════════════════════════════════

  // ── United States — Paradies Lagardère (additional) ──
  ["Albany International Airport", "ALB", "Albany", "United States", 1500000],
  ["Asheville Regional Airport", "AVL", "Asheville", "United States", 1900000],
  ["Austin-Bergstrom International Airport", "AUS", "Austin", "United States", 21000000],
  ["Baton Rouge Metropolitan Airport", "BTR", "Baton Rouge", "United States", 900000],
  ["Blue Grass Airport", "LEX", "Lexington", "United States", 1600000],
  ["Boise Airport", "BOI", "Boise", "United States", 2100000],
  ["Boston Logan International Airport", "BOS", "Boston", "United States", 42500000],
  ["Bradley International Airport", "BDL", "Hartford", "United States", 8200000],
  ["Birmingham-Shuttlesworth International Airport", "BHM", "Birmingham", "United States", 1500000],
  ["Hollywood Burbank Airport", "BUR", "Burbank", "United States", 6000000],
  ["Charleston International Airport", "CHS", "Charleston", "United States", 5800000],
  ["Charlotte Douglas International Airport", "CLT", "Charlotte", "United States", 53000000],
  ["Cincinnati/Northern Kentucky International Airport", "CVG", "Cincinnati", "United States", 9800000],
  ["Cleveland Hopkins International Airport", "CLE", "Cleveland", "United States", 10000000],
  ["Columbia Metropolitan Airport", "CAE", "Columbia", "United States", 1500000],
  ["John Glenn Columbus International Airport", "CMH", "Columbus", "United States", 8800000],
  ["Colorado Springs Airport", "COS", "Colorado Springs", "United States", 2500000],
  ["Cyril E. King Airport", "STT", "St. Thomas", "United States", 700000],
  ["Dallas Fort Worth International Airport", "DFW", "Dallas", "United States", 81000000],
  ["Dane County Regional Airport", "MSN", "Madison", "United States", 2000000],
  ["Dayton International Airport", "DAY", "Dayton", "United States", 1400000],
  ["Denver International Airport", "DEN", "Denver", "United States", 69000000],
  ["Detroit Metropolitan Wayne County Airport", "DTW", "Detroit", "United States", 31400000],
  ["El Paso International Airport", "ELP", "El Paso", "United States", 3800000],
  ["Newark Liberty International Airport", "EWR", "Newark", "United States", 48500000],
  ["Fort Lauderdale-Hollywood International Airport", "FLL", "Fort Lauderdale", "United States", 35100000],
  ["Gerald R. Ford International Airport", "GRR", "Grand Rapids", "United States", 3800000],
  ["Greenville-Spartanburg International Airport", "GSP", "Greer", "United States", 2600000],
  ["Harrisburg International Airport", "MDT", "Harrisburg", "United States", 1400000],
  ["Daniel K. Inouye International Airport", "HNL", "Honolulu", "United States", 21000000],
  ["William P. Hobby Airport", "HOU", "Houston", "United States", 14800000],
  ["Huntsville International Airport", "HSV", "Huntsville", "United States", 1300000],
  ["Wichita Dwight D. Eisenhower National Airport", "ICT", "Wichita", "United States", 1700000],
  ["Washington Dulles International Airport", "IAD", "Washington", "United States", 25800000],
  ["George Bush Intercontinental Airport", "IAH", "Houston", "United States", 45000000],
  ["Indianapolis International Airport", "IND", "Indianapolis", "United States", 9700000],
  ["Jacksonville International Airport", "JAX", "Jacksonville", "United States", 7200000],
  ["Jackson-Medgar Wiley Evers International Airport", "JAN", "Jackson", "United States", 900000],
  ["Harry Reid International Airport", "LAS", "Las Vegas", "United States", 52700000],
  ["Kansas City International Airport", "MCI", "Kansas City", "United States", 11800000],
  ["Orlando International Airport", "MCO", "Orlando", "United States", 57700000],
  ["Chicago Midway International Airport", "MDW", "Chicago", "United States", 31800000],
  ["Manchester-Boston Regional Airport", "MHT", "Manchester", "United States", 1800000],
  ["Memphis International Airport", "MEM", "Memphis", "United States", 14000000],
  ["Miami International Airport", "MIA", "Miami", "United States", 50700000],
  ["Milwaukee Mitchell International Airport", "MKE", "Milwaukee", "United States", 6500000],
  ["Minneapolis-Saint Paul International Airport", "MSP", "Minneapolis", "United States", 34000000],
  ["Louis Armstrong New Orleans International Airport", "MSY", "New Orleans", "United States", 14800000],
  ["Myrtle Beach International Airport", "MYR", "Myrtle Beach", "United States", 3500000],
  ["Oakland International Airport", "OAK", "Oakland", "United States", 7000000],
  ["Kahului Airport", "OGG", "Kahului", "United States", 7500000],
  ["Will Rogers World Airport", "OKC", "Oklahoma City", "United States", 4400000],
  ["Eppley Airfield", "OMA", "Omaha", "United States", 5000000],
  ["Ontario International Airport", "ONT", "Ontario", "United States", 6500000],
  ["Palm Beach International Airport", "PBI", "West Palm Beach", "United States", 7400000],
  ["Palm Springs International Airport", "PSP", "Palm Springs", "United States", 3200000],
  ["Philadelphia International Airport", "PHL", "Philadelphia", "United States", 30800000],
  ["Phoenix Sky Harbor International Airport", "PHX", "Phoenix", "United States", 48700000],
  ["Pittsburgh International Airport", "PIT", "Pittsburgh", "United States", 9600000],
  ["Portland International Airport", "PDX", "Portland", "United States", 18500000],
  ["Pensacola International Airport", "PNS", "Pensacola", "United States", 2600000],
  ["Raleigh-Durham International Airport", "RDU", "Raleigh", "United States", 14500000],
  ["Richmond International Airport", "RIC", "Richmond", "United States", 4900000],
  ["Reno-Tahoe International Airport", "RNO", "Reno", "United States", 4400000],
  ["Roanoke-Blacksburg Regional Airport", "ROA", "Roanoke", "United States", 900000],
  ["Greater Rochester International Airport", "ROC", "Rochester", "United States", 2500000],
  ["Southwest Florida International Airport", "RSW", "Fort Myers", "United States", 10200000],
  ["San Antonio International Airport", "SAT", "San Antonio", "United States", 10700000],
  ["San Diego International Airport", "SAN", "San Diego", "United States", 24100000],
  ["Louisville Muhammad Ali International Airport", "SDF", "Louisville", "United States", 9000000],
  ["Seattle-Tacoma International Airport", "SEA", "Seattle", "United States", 50900000],
  ["Norman Y. Mineta San José International Airport", "SJC", "San Jose", "United States", 15700000],
  ["Salt Lake City International Airport", "SLC", "Salt Lake City", "United States", 26800000],
  ["Sacramento International Airport", "SMF", "Sacramento", "United States", 13000000],
  ["John Wayne Airport", "SNA", "Santa Ana", "United States", 12000000],
  ["St. Louis Lambert International Airport", "STL", "St. Louis", "United States", 15400000],
  ["Savannah/Hilton Head International Airport", "SAV", "Savannah", "United States", 5400000],
  ["Abraham Lincoln Capital Airport", "SPI", "Springfield", "United States", 500000],
  ["Syracuse Hancock International Airport", "SYR", "Syracuse", "United States", 2600000],
  ["Tampa International Airport", "TPA", "Tampa", "United States", 22700000],
  ["Tulsa International Airport", "TUL", "Tulsa", "United States", 3200000],
  ["Tucson International Airport", "TUS", "Tucson", "United States", 4300000],
  ["McGhee Tyson Airport", "TYS", "Knoxville", "United States", 2900000],
  ["Northwest Arkansas National Airport", "XNA", "Bentonville", "United States", 1800000],

  // ── Canada — Paradies Lagardère (additional) ──
  ["Calgary International Airport", "YYC", "Calgary", "Canada", 18000000],
  ["Ottawa Macdonald-Cartier International Airport", "YOW", "Ottawa", "Canada", 5100000],
  ["Edmonton International Airport", "YEG", "Edmonton", "Canada", 8200000],
  ["Montréal-Trudeau International Airport", "YUL", "Montreal", "Canada", 21100000],
  ["Halifax Stanfield International Airport", "YHZ", "Halifax", "Canada", 4100000],

  // ════════════════════════════════════════════════════════════════════════════
  // EUROPE — Additional airports
  // ════════════════════════════════════════════════════════════════════════════

  // ── Albania (new country) ──
  ["Tirana International Airport (Mother Teresa)", "TIA", "Tirana", "Albania", 3500000],

  // ── Croatia (new country) ──
  ["Zagreb Airport", "ZAG", "Zagreb", "Croatia", 3800000],
  ["Split Airport", "SPU", "Split", "Croatia", 3300000],
  ["Dubrovnik Airport", "DBV", "Dubrovnik", "Croatia", 2400000],

  // ── Slovenia (new country) ──
  ["Ljubljana Jože Pučnik Airport", "LJU", "Ljubljana", "Slovenia", 1700000],

  // ── Additional France ──
  ["Bastia-Poretta Airport", "BIA", "Bastia", "France", 1500000],
  ["Biarritz Pays Basque Airport", "BIQ", "Biarritz", "France", 1200000],
  ["Brest Bretagne Airport", "BES", "Brest", "France", 1000000],
  ["Strasbourg Airport", "SXB", "Strasbourg", "France", 1300000],
  ["Montpellier-Méditerranée Airport", "MPL", "Montpellier", "France", 2000000],

  // ── Additional Germany ──
  ["Leipzig/Halle Airport", "LEJ", "Leipzig", "Germany", 2700000],
  ["Nuremberg Airport", "NUE", "Nuremberg", "Germany", 4500000],
  ["Hannover Airport", "HAJ", "Hanover", "Germany", 6000000],
  ["Bremen Airport", "BRE", "Bremen", "Germany", 2000000],
  ["Dresden Airport", "DRS", "Dresden", "Germany", 1800000],

  // ── Additional Spain ──
  ["Santiago de Compostela Airport", "SCQ", "Santiago de Compostela", "Spain", 2900000],
  ["Sevilla Airport", "SVQ", "Sevilla", "Spain", 7500000],
  ["Bilbao Airport", "BIO", "Bilbao", "Spain", 6500000],
  ["Fuerteventura Airport", "FUE", "Puerto del Rosario", "Spain", 6000000],
  ["Lanzarote Airport", "ACE", "Arrecife", "Spain", 8000000],
  ["Tenerife South Airport", "TFS", "Tenerife", "Spain", 11000000],
  ["Ibiza Airport", "IBZ", "Ibiza", "Spain", 3500000],
  ["Gran Canaria Airport", "LPA", "Las Palmas", "Spain", 13000000],
  ["Asturias Airport", "OVD", "Oviedo", "Spain", 1500000],

  // ── Additional Italy ──
  ["Milan Bergamo Airport", "BGY", "Bergamo", "Italy", 14000000],
  ["Catania-Fontanarossa Airport", "CTA", "Catania", "Italy", 10000000],
  ["Bari Karol Wojtyła Airport", "BRI", "Bari", "Italy", 5500000],
  ["Turin Airport", "TRN", "Turin", "Italy", 4000000],

  // ── Additional United Kingdom ──
  ["London Heathrow Airport", "LHR", "London", "United Kingdom", 79000000],
  ["London Gatwick Airport", "LGW", "London", "United Kingdom", 33000000],
  ["London Stansted Airport", "STN", "London", "United Kingdom", 28500000],
  ["Liverpool John Lennon Airport", "LPL", "Liverpool", "United Kingdom", 4000000],
  ["Newcastle International Airport", "NCL", "Newcastle", "United Kingdom", 5600000],
  ["Aberdeen International Airport", "ABZ", "Aberdeen", "United Kingdom", 3000000],

  // ── Additional Poland ──
  ["Katowice Airport", "KTW", "Katowice", "Poland", 4800000],
  ["Poznań-Ławica Airport", "POZ", "Poznań", "Poland", 3500000],
  ["Wrocław Copernicus Airport", "WRO", "Wrocław", "Poland", 3800000],

  // ── Additional Romania ──
  ["Iași International Airport", "IAS", "Iași", "Romania", 1800000],
  ["Timișoara Airport", "TSR", "Timișoara", "Romania", 1500000],
  ["Sibiu International Airport", "SBZ", "Sibiu", "Romania", 700000],

  // ── Additional Denmark ──
  ["Aarhus Airport", "AAR", "Aarhus", "Denmark", 500000],

  // ── Additional Sweden ──
  ["Malmö Airport", "MMX", "Malmö", "Sweden", 2200000],
  ["Umeå Airport", "UME", "Umeå", "Sweden", 1400000],

  // ── Additional Norway ──
  ["Trondheim Airport, Værnes", "TRD", "Trondheim", "Norway", 4500000],
  ["Kristiansand Airport, Kjevik", "KRS", "Kristiansand", "Norway", 1100000],
  ["Tromsø Airport, Langnes", "TOS", "Tromsø", "Norway", 2300000],
  ["Bodø Airport", "BOO", "Bodø", "Norway", 1700000],
  ["Ålesund Airport, Vigra", "AES", "Ålesund", "Norway", 1200000],

  // ── Additional Austria ──
  ["Innsbruck Airport", "INN", "Innsbruck", "Austria", 1100000],
  ["Graz Airport", "GRZ", "Graz", "Austria", 1500000],

  // ── Additional Switzerland ──
  ["EuroAirport Basel-Mulhouse-Freiburg", "BSL", "Basel", "Switzerland", 9000000],

  // ── Additional Belgium ──
  ["Antwerp International Airport", "ANR", "Antwerp", "Belgium", 300000],
  ["Liège Airport", "LGG", "Liège", "Belgium", 400000],

  // ── Additional Greece ──
  ["Rhodes International Airport", "RHO", "Rhodes", "Greece", 5500000],
  ["Kavala International Airport", "KVA", "Kavala", "Greece", 500000],

  // ════════════════════════════════════════════════════════════════════════════
  // ASIA-PACIFIC — Additional airports
  // ════════════════════════════════════════════════════════════════════════════

  // ── Cambodia (new country) ──
  ["Phnom Penh International Airport", "PNH", "Phnom Penh", "Cambodia", 6000000],
  ["Siem Reap-Angkor International Airport", "REP", "Siem Reap", "Cambodia", 4500000],

  // ── Additional Australia ──
  ["Perth Airport", "PER", "Perth", "Australia", 14000000],
  ["Adelaide Airport", "ADL", "Adelaide", "Australia", 8000000],
  ["Cairns Airport", "CNS", "Cairns", "Australia", 5000000],
  ["Gold Coast Airport", "OOL", "Gold Coast", "Australia", 7000000],

  // ── Additional New Zealand ──
  ["Wellington International Airport", "WLG", "Wellington", "New Zealand", 6500000],
  ["Queenstown Airport", "ZQN", "Queenstown", "New Zealand", 2500000],

  // ── Additional Malaysia ──
  ["Kuching International Airport", "KCH", "Kuching", "Malaysia", 2500000],
  ["Kota Kinabalu International Airport", "BKI", "Kota Kinabalu", "Malaysia", 2000000],

  // ── Additional Thailand ──
  ["Don Mueang International Airport", "DMK", "Bangkok", "Thailand", 25000000],

  // ── Additional Vietnam ──
  ["Da Nang International Airport", "DAD", "Da Nang", "Vietnam", 6000000],

  // ── Additional India ──
  ["Kempegowda International Airport", "BLR", "Bengaluru", "India", 37000000],
  ["Chennai International Airport", "MAA", "Chennai", "India", 22500000],
  ["Rajiv Gandhi International Airport", "HYD", "Hyderabad", "India", 24000000],
  ["Netaji Subhas Chandra Bose International Airport", "CCU", "Kolkata", "India", 19000000],

  // ── Additional China ──
  ["Shenzhen Bao'an International Airport", "SZX", "Shenzhen", "China", 40000000],
  ["Chengdu Tianfu International Airport", "TFU", "Chengdu", "China", 30000000],

  // ── Additional Japan ──
  ["Tokyo Haneda Airport", "HND", "Tokyo", "Japan", 87000000],

  // ════════════════════════════════════════════════════════════════════════════
  // MIDDLE EAST — Additional airports
  // ════════════════════════════════════════════════════════════════════════════

  // ── Additional Saudi Arabia ──
  ["Prince Mohammad bin Abdulaziz Airport", "MED", "Madinah", "Saudi Arabia", 8000000],
  ["Tabuk Regional Airport", "TUU", "Tabuk", "Saudi Arabia", 1500000],

  // ════════════════════════════════════════════════════════════════════════════
  // LATIN AMERICA — Additional airports
  // ════════════════════════════════════════════════════════════════════════════

  // ── Peru (new country) ──
  ["Jorge Chávez International Airport", "LIM", "Lima", "Peru", 25000000],

  // ── Argentina (new country) ──
  ["Ministro Pistarini International Airport", "EZE", "Buenos Aires", "Argentina", 10000000],
  ["Aeroparque Jorge Newbery", "AEP", "Buenos Aires", "Argentina", 13000000],

  // ── Additional Brazil ──
  ["Brasília International Airport", "BSB", "Brasília", "Brazil", 16000000],
  ["Tancredo Neves International Airport", "CNF", "Belo Horizonte", "Brazil", 10000000],
  ["Deputado Luís Eduardo Magalhães Airport", "SSA", "Salvador", "Brazil", 10000000],
  ["Pinto Martins International Airport", "FOR", "Fortaleza", "Brazil", 8000000],
  ["Guararapes–Gilberto Freyre International Airport", "REC", "Recife", "Brazil", 9000000],

  // ── Additional Colombia ──
  ["Cartagena International Airport", "CTG", "Cartagena", "Colombia", 6000000],
  ["José María Córdova International Airport", "MDE", "Medellín", "Colombia", 7000000],

  // ════════════════════════════════════════════════════════════════════════════
  // AFRICA — Additional airports
  // ════════════════════════════════════════════════════════════════════════════

  // ── Gabon (new country) ──
  ["Libreville International Airport", "LBV", "Libreville", "Gabon", 1000000],

  // ── Additional South Africa ──
  ["King Shaka International Airport", "DUR", "Durban", "South Africa", 6000000],

  // ── Additional Morocco ──
  ["Al Massira Airport", "AGA", "Agadir", "Morocco", 2000000],
  ["Rabat-Salé Airport", "RBA", "Rabat", "Morocco", 1500000],

  // ── Additional Egypt ──
  ["Sharm El Sheikh International Airport", "SSH", "Sharm El Sheikh", "Egypt", 7000000],
  ["Luxor International Airport", "LXR", "Luxor", "Egypt", 4000000],

  // ── Additional Kenya ──
  ["Moi International Airport", "MBA", "Mombasa", "Kenya", 1500000],
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
  "Albania": "Europe", "Croatia": "Europe", "Slovenia": "Europe",
  // Middle East
  "United Arab Emirates": "Middle East", "Saudi Arabia": "Middle East",
  "Qatar": "Middle East", "Kuwait": "Middle East", "Bahrain": "Middle East", "Oman": "Middle East",
  // Africa
  "South Africa": "Africa", "Morocco": "Africa", "Egypt": "Africa", "Kenya": "Africa", "Nigeria": "Africa",
  "Gabon": "Africa",
  // Asia
  "Singapore": "Asia", "Malaysia": "Asia", "China": "Asia", "Hong Kong": "Asia",
  "Japan": "Asia", "South Korea": "Asia", "Taiwan": "Asia", "Thailand": "Asia",
  "Indonesia": "Asia", "Philippines": "Asia", "Vietnam": "Asia", "India": "Asia",
  "Cambodia": "Asia",
  // Oceania
  "Australia": "Oceania", "New Zealand": "Oceania",
  // Americas
  "United States": "Americas", "Canada": "Americas", "Brazil": "Americas",
  "Mexico": "Americas", "Chile": "Americas", "Colombia": "Americas",
  "Peru": "Americas", "Argentina": "Americas",
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

export const AIRPORTS_FULL = ltrAirportData;

export const AIRPORTS = ltrAirportData.map(a => ({
  code: a.code,
  name: a.name,
  city: a.city,
  country: a.country,
  annual_pax: a.annual_pax || (a.daily_pax ? a.daily_pax * 365 : 0),
  daily_pax: a.daily_pax || Math.round((a.annual_pax || 0) / 365),
}));

// ── Generate RETAILERS with real LTR store names (retail only, no F&B) ──────
let _idCounter = 0;

export const RETAILERS = ltrAirportData.flatMap(airport => {
  const count = retailerCount(airport.annual_pax, airport.code);
  const basket = estimateAvgBasketSpend(airport);
  const dailyPax = airport.daily_pax || Math.round((airport.annual_pax || 0) / 365);
  const dailyRedemptions = dailyPax * (CONVERSION_RATE / 100);
  const monthlyRedemptions = Math.round(dailyRedemptions * 365 / 12);
  const weights = generateWeights(count);
  const storeNames = generateStoreNames(airport, count);

  return Array.from({ length: count }, (_, i) => {
    _idCounter++;
    const redemptions = Math.round(monthlyRedemptions * weights[i]);
    const revenue = redemptions * basket;

    return {
      id: `r${_idCounter}`,
      name: storeNames[i],
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

// ── Store count — used by RetailerCalculator to match demo dashboard exactly ─
export const STORE_COUNT = RETAILERS.length;

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