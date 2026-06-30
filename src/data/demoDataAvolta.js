// Avolta (formerly Dufry) demo data — global airport retailer network.
//
// Covers airports where Avolta operates retail stores (World Duty Free,
// Dufry, Hudson, Hellenic Duty Free, Nuance, RegStaer, specialty) — ALL F&B excluded.
//
// Sources: Dufry Corporate Brochure 2022 (pages 10-13 full location list),
// avoltaworld.com, hudsongroup.com, Wikipedia.
// Avolta operates 5,100+ outlets across 1,000+ locations in 70+ countries.
// This file covers AIRPORT locations only (no border crossings, cruise ships,
// ports, railway stations, or downtown shops).
//
// Revenue model (same as RetailerCalculator):
//   dailyRedemptions = daily_pax × 3%
//   monthlyRedemptions = dailyRedemptions × 365 / 12
//   basket = estimateAvgBasketSpend(airport)  → [€35, €150]
//   grossRevenue = redemptions × basket
// Weights use a Zipf-like long-tail distribution so the flagship duty-free
// store gets the largest share, tapering to small specialty kiosks.

import { estimateAvgBasketSpend } from "../utils/airportBasketEstimate";

const CONVERSION_RATE = 3;
const PLATFORM_FEE_PCT = 0.025;

// ── Avolta retail store brands (NO F&B) ──────────────────────────────────────
const AVOLTA_RETAIL_BRANDS = [
  // Duty Free
  "World Duty Free", "Dufry Duty Free", "World Duty Free Express",
  "Dufry Express", "Avolta Duty Free", "Hellenic Duty Free",
  // Hudson (Americas convenience)
  "Hudson", "Hudson Nonstop", "Ink by Hudson",
  "Hudson News", "The Bookstore by Hudson", "Hudson Convenience",
  // Fashion & Accessories
  "Hermès", "Gucci", "Burberry", "Hugo Boss", "Lacoste", "Guess",
  "Polo Ralph Lauren", "Samsonite", "Tumi", "Longchamp",
  "Victoria's Secret", "Desigual", "Coach", "Michael Kors",
  "Tommy Hilfiger", "Calvin Klein",
  // Beauty & Specialty
  "The Body Shop", "Sunglass Hut", "Swarovski",
  "L'Occitane", "MAC Cosmetics", "Montblanc",
  // Travel Essentials
  "Relay", "WHSmith", "Tech2Go", "Travel Essentials",
  "Dufry Collection", "World Duty Free Beauty", "Colombian Emeralds",
];

const LOCATION_SUFFIXES = [
  "(Terminal 1)", "(Terminal 2)", "(Terminal 3)", "(Terminal 4)", "(Terminal 5)",
  "(Concourse A)", "(Concourse B)", "(Concourse C)", "(Gate Area)", "(Arrivals)",
  "(Departures)", "(Duty Free Area)", "(Pier A)", "(Pier B)",
];

// ── Store count per airport — based on Avolta's actual retail presence ──────
function retailerCount(annualPax, code) {
  const EXPLICIT = {
    // UK (World Duty Free)
    "LHR": 25, "LGW": 10, "STN": 6, "MAN": 8, "EDI": 6, "BHX": 5,
    "BRS": 4, "GLA": 4, "LBA": 3, "LTN": 5, "BFS": 4, "NCL": 4,
    // Spain (World Duty Free)
    "MAD": 12, "BCN": 10, "PMI": 6, "AGP": 5, "ALC": 4, "LPA": 4,
    "TFS": 3, "VLC": 3, "SVQ": 3, "IBZ": 3, "ACE": 3, "TFN": 3,
    // Italy
    "MXP": 10, "LIN": 4, "BGY": 2, "NAP": 2, "FLR": 2, "GOA": 2, "PSA": 2, "VRN": 2,
    // Greece (Hellenic Duty Free)
    "ATH": 8, "SKG": 4, "HER": 3, "RHO": 3, "KGS": 2, "CFU": 2, "CHQ": 2,
    // Switzerland
    "ZRH": 6, "GVA": 3,
    // Other Europe
    "CPH": 5, "HEL": 3, "NCE": 4, "TLS": 3,
    // Russia (RegStaer)
    "DME": 5, "SVO": 5, "VKO": 3, "LED": 4,
    // Middle East & Africa
    "KWI": 2, "NBO": 2, "AMM": 2, "SHJ": 2, "EVN": 2,
    // Asia Pacific
    "SIN": 3, "HKG": 6, "PVG": 5, "WUH": 4, "PUS": 2, "PNH": 2, "CMB": 2, "BLR": 3,
    // USA (Hudson Group) — major hubs
    "ATL": 20, "JFK": 15, "LAX": 15, "ORD": 12, "MIA": 15, "DFW": 10, "DEN": 10,
    "BOS": 8, "LAS": 8, "MCO": 10, "EWR": 8, "PHL": 6, "IAH": 6, "PHX": 6,
    "SEA": 6, "SFO": 6, "MSP": 5, "DTW": 5, "CLT": 8, "FLL": 5, "BWI": 4,
    "SLC": 4, "SAN": 4, "MDW": 5, "LGA": 6, "IAD": 4, "DCA": 4,
    // Canada (Hudson)
    "YYZ": 6, "YVR": 4, "YUL": 3, "YYC": 3, "YOW": 2,
    // Latin America (Dufry)
    "GRU": 6, "GIG": 4, "EZE": 4, "MVD": 2, "SCL": 4, "GYE": 2,
    // Mexico
    "MEX": 4, "CUN": 4, "GDL": 3, "MTY": 3, "PVR": 3, "SJD": 3,
    // Caribbean
    "AUA": 2, "ANU": 1, "NAS": 1, "BGI": 1, "POP": 1,
    // Tunisia (15 stores across 5 airports)
    "TUN": 4, "DJE": 2, "MIR": 2,
  };
  if (EXPLICIT[code]) return EXPLICIT[code];

  if (annualPax >= 60_000_000) return 6;
  if (annualPax >= 30_000_000) return 4;
  if (annualPax >= 15_000_000) return 3;
  if (annualPax >= 5_000_000)  return 2;
  return 1;
}

// ── Zipf-like weight distribution ───────────────────────────────────────────
function generateWeights(count) {
  const alpha = 0.5;
  const raw = Array.from({ length: count }, (_, i) => 1 / Math.pow(i + 1, alpha));
  const sum = raw.reduce((a, b) => a + b, 0);
  return raw.map(v => v / sum);
}

// ── Generate store names for an airport ─────────────────────────────────────
function generateStoreNames(airport, count) {
  const stores = [];
  const poolSize = AVOLTA_RETAIL_BRANDS.length;
  const offset = (airport.name.length + airport.code.charCodeAt(0)) % poolSize;

  for (let i = 0; i < count; i++) {
    const baseName = AVOLTA_RETAIL_BRANDS[(offset + i) % poolSize];
    if (i >= poolSize) {
      const locIdx = Math.floor((i - poolSize) / poolSize) % LOCATION_SUFFIXES.length;
      stores.push(`${baseName} ${LOCATION_SUFFIXES[locIdx]}`);
    } else {
      stores.push(baseName);
    }
  }
  return stores;
}

// ── Complete Avolta airport list (source: Dufry Corporate Brochure 2022) ─────
// AIRPORT locations only — border crossings, cruise ships, ports, railway
// stations, and downtown shops are excluded.
// Format: [name, code, city, country, annual_pax]
const AVOLTA_AIRPORTS_RAW = [
  // ════════════════════════════════════════════════════════════════════════════
  // EUROPE, MIDDLE EAST & AFRICA
  // ════════════════════════════════════════════════════════════════════════════

  // ── United Kingdom (World Duty Free) ──
  ["London Heathrow Airport", "LHR", "London", "United Kingdom", 79000000],
  ["London Gatwick Airport", "LGW", "London", "United Kingdom", 40000000],
  ["London Stansted Airport", "STN", "London", "United Kingdom", 28000000],
  ["London Luton Airport", "LTN", "London", "United Kingdom", 16000000],
  ["London Southend Airport", "SEN", "London", "United Kingdom", 1000000],
  ["Manchester Airport", "MAN", "Manchester", "United Kingdom", 30000000],
  ["Edinburgh Airport", "EDI", "Edinburgh", "United Kingdom", 14500000],
  ["Birmingham Airport", "BHX", "Birmingham", "United Kingdom", 13000000],
  ["Bristol Airport", "BRS", "Bristol", "United Kingdom", 8800000],
  ["Glasgow Airport", "GLA", "Glasgow", "United Kingdom", 7700000],
  ["Glasgow Prestwick Airport", "PIK", "Glasgow", "United Kingdom", 700000],
  ["Newcastle Airport", "NCL", "Newcastle", "United Kingdom", 5000000],
  ["Leeds Bradford Airport", "LBA", "Leeds", "United Kingdom", 4000000],
  ["Liverpool John Lennon Airport", "LPL", "Liverpool", "United Kingdom", 4000000],
  ["Belfast International Airport", "BFS", "Belfast", "United Kingdom", 6000000],
  ["Aberdeen Airport", "ABZ", "Aberdeen", "United Kingdom", 3000000],
  ["Cardiff Airport", "CWL", "Cardiff", "United Kingdom", 1500000],
  ["East Midlands Airport", "EMA", "Nottingham", "United Kingdom", 4000000],
  ["Bournemouth Airport", "BOH", "Bournemouth", "United Kingdom", 800000],
  ["Humberside Airport", "HUY", "Humberside", "United Kingdom", 300000],
  ["Norwich Airport", "NWI", "Norwich", "United Kingdom", 500000],
  ["Southampton Airport", "SOU", "Southampton", "United Kingdom", 2000000],
  ["Doncaster Sheffield Airport", "DSA", "Doncaster", "United Kingdom", 1000000],

  // ── Spain (World Duty Free) ──
  ["Adolfo Suárez Madrid-Barajas Airport", "MAD", "Madrid", "Spain", 60200000],
  ["Barcelona-El Prat Airport", "BCN", "Barcelona", "Spain", 52600000],
  ["Palma de Mallorca Airport", "PMI", "Palma", "Spain", 31900000],
  ["Málaga-Costa del Sol Airport", "AGP", "Málaga", "Spain", 24900000],
  ["Alicante-Elche Airport", "ALC", "Alicante", "Spain", 15700000],
  ["Gran Canaria Airport", "LPA", "Las Palmas", "Spain", 13000000],
  ["Tenerife South Airport", "TFS", "Tenerife", "Spain", 12000000],
  ["Valencia Airport", "VLC", "Valencia", "Spain", 10000000],
  ["Sevilla Airport", "SVQ", "Sevilla", "Spain", 7500000],
  ["Ibiza Airport", "IBZ", "Ibiza", "Spain", 8000000],
  ["Lanzarote Airport", "ACE", "Arrecife", "Spain", 8000000],
  ["Tenerife North Airport", "TFN", "Tenerife", "Spain", 7000000],
  ["Fuerteventura Airport", "FUE", "Puerto del Rosario", "Spain", 6000000],
  ["Menorca Airport", "MAH", "Menorca", "Spain", 4000000],
  ["Santiago-Rosalía de Castro Airport", "SCQ", "Santiago de Compostela", "Spain", 3000000],
  ["Girona-Costa Brava Airport", "GRO", "Girona", "Spain", 2000000],
  ["Asturias Airport", "OVD", "Avilés", "Spain", 2000000],
  ["La Palma Airport", "SPC", "La Palma", "Spain", 1500000],
  ["Reus Airport", "REU", "Reus", "Spain", 1300000],
  ["A Coruña Airport", "LCG", "A Coruña", "Spain", 1300000],
  ["Santander Airport", "SDR", "Santander", "Spain", 1100000],
  ["Granada-Jaén Airport", "GRX", "Granada", "Spain", 900000],
  ["Jerez Airport", "XRY", "Jerez", "Spain", 800000],
  ["Murcia International Airport", "RMU", "Murcia", "Spain", 600000],

  // ── Italy ──
  ["Malpensa Airport", "MXP", "Milan", "Italy", 26100000],
  ["Milan Linate Airport", "LIN", "Milan", "Italy", 10000000],
  ["Milan Bergamo Airport", "BGY", "Bergamo", "Italy", 14000000],
  ["Naples International Airport", "NAP", "Naples", "Italy", 11000000],
  ["Florence Peretola Airport", "FLR", "Florence", "Italy", 2900000],
  ["Genoa Cristoforo Colombo Airport", "GOA", "Genoa", "Italy", 1500000],
  ["Pisa International Airport", "PSA", "Pisa", "Italy", 5500000],
  ["Verona Villafranca Airport", "VRN", "Verona", "Italy", 3000000],

  // ── Greece (Hellenic Duty Free Shops) ──
  ["Athens International Airport", "ATH", "Athens", "Greece", 28100000],
  ["Thessaloniki Airport", "SKG", "Thessaloniki", "Greece", 7300000],
  ["Heraklion Airport", "HER", "Heraklion", "Greece", 8100000],
  ["Rhodes International Airport", "RHO", "Rhodes", "Greece", 5500000],
  ["Kos International Airport", "KGS", "Kos", "Greece", 3000000],
  ["Corfu International Airport", "CFU", "Corfu", "Greece", 3500000],
  ["Chania International Airport", "CHQ", "Chania", "Greece", 3000000],
  ["Kavala International Airport", "KVA", "Kavala", "Greece", 500000],
  ["Mykonos Island Airport", "JMK", "Mykonos", "Greece", 1000000],
  ["Mytilini International Airport", "MJT", "Mytilini", "Greece", 700000],
  ["Santorini (Thira) Airport", "JTR", "Santorini", "Greece", 1000000],
  ["Skiathos Island Airport", "JSI", "Skiathos", "Greece", 500000],
  ["Zakynthos International Airport", "ZTH", "Zakynthos", "Greece", 1000000],
  ["Kalamata International Airport", "KLX", "Kalamata", "Greece", 200000],
  ["Karpathos Island Airport", "AOK", "Karpathos", "Greece", 300000],
  ["Kastelorizo Airport", "KZS", "Kastelorizo", "Greece", 50000],
  ["Lemnos International Airport", "LXS", "Lemnos", "Greece", 200000],
  ["Kefalonia International Airport", "EFL", "Kefalonia", "Greece", 500000],
  ["Aktio National Airport", "PVK", "Preveza", "Greece", 300000],
  ["Alexandroupolis Airport", "AXD", "Alexandroupoli", "Greece", 300000],
  ["Nea Anchialos National Airport", "VOL", "Volos", "Greece", 200000],
  ["Araxos Airport", "GPA", "Patras", "Greece", 100000],

  // ── France ──
  ["Nice Côte d'Azur Airport", "NCE", "Nice", "France", 14400000],
  ["Toulouse-Blagnac Airport", "TLS", "Toulouse", "France", 9900000],
  ["Cayenne – Félix Eboué Airport", "CAY", "Cayenne", "French Guiana", 500000],
  ["Martinique Aimé Césaire International Airport", "FDF", "Fort-de-France", "Martinique", 1500000],
  ["Pointe-à-Pitre International Airport", "PTP", "Pointe-à-Pitre", "Guadeloupe", 1500000],

  // ── Switzerland (Nuance Group) ──
  ["Zurich Airport", "ZRH", "Zurich", "Switzerland", 31800000],
  ["Geneva Airport", "GVA", "Geneva", "Switzerland", 17800000],
  ["EuroAirport Basel-Mulhouse-Freiburg", "BSL", "Basel", "Switzerland", 9000000],

  // ── Finland ──
  ["Helsinki Airport", "HEL", "Helsinki", "Finland", 15300000],

  // ── Denmark ──
  ["Copenhagen Airport", "CPH", "Copenhagen", "Denmark", 30200000],

  // ── Jersey ──
  ["Jersey Airport", "JER", "Saint Peter", "Jersey", 1500000],

  // ── Armenia ──
  ["Zvartnots International Airport", "EVN", "Yerevan", "Armenia", 3000000],
  ["Shirak International Airport", "LWN", "Gyumri", "Armenia", 200000],

  // ── Bulgaria ──
  ["Burgas Airport", "BOJ", "Burgas", "Bulgaria", 3000000],
  ["Varna Airport", "VAR", "Varna", "Bulgaria", 2000000],

  // ── Cape Verde ──
  ["Amílcar Cabral International Airport", "SID", "Sal", "Cape Verde", 2000000],
  ["Rabil Airport", "BVC", "Boa Vista", "Cape Verde", 500000],
  ["Nelson Mandela International Airport", "RAI", "Praia", "Cape Verde", 500000],

  // ── Cote d'Ivoire ──
  ["Félix-Houphouët-Boigny International Airport", "ABJ", "Abidjan", "Cote d'Ivoire", 2000000],

  // ── Russia (RegStaer) ──
  ["Domodedovo International Airport", "DME", "Moscow", "Russia", 15000000],
  ["Sheremetyevo International Airport", "SVO", "Moscow", "Russia", 36000000],
  ["Vnukovo International Airport", "VKO", "Moscow", "Russia", 12000000],
  ["Pulkovo Airport", "LED", "St. Petersburg", "Russia", 18000000],

  // ── Jordan ──
  ["Queen Alia International Airport", "AMM", "Amman", "Jordan", 9000000],
  ["King Hussein International Airport", "AQJ", "Aqaba", "Jordan", 1000000],

  // ── Kuwait ──
  ["Kuwait International Airport", "KWI", "Kuwait City", "Kuwait", 15900000],

  // ── Kenya ──
  ["Jomo Kenyatta International Airport", "NBO", "Nairobi", "Kenya", 7400000],

  // ── Kazakhstan ──
  ["Astana International Airport", "NQZ", "Astana", "Kazakhstan", 5000000],

  // ── UAE ──
  ["Sharjah International Airport", "SHJ", "Sharjah", "United Arab Emirates", 15000000],

  // ── India ──
  ["Kempegowda International Airport", "BLR", "Bangalore", "India", 37000000],

  // ── Sri Lanka ──
  ["Bandaranaike International Airport", "CMB", "Colombo", "Sri Lanka", 8000000],

  // ── Sweden ──
  ["Jönköping Airport", "JKG", "Jönköping", "Sweden", 100000],

  // ── Tunisia (new 2025 contract — 15 DF stores across 5 airports) ──
  ["Tunis–Carthage Airport", "TUN", "Tunis", "Tunisia", 8000000],
  ["Djerba–Zarzis Airport", "DJE", "Djerba", "Tunisia", 2000000],
  ["Monastir Habib Bourguiba Airport", "MIR", "Monastir", "Tunisia", 2000000],
  ["Sfax–Thyna Airport", "SFA", "Sfax", "Tunisia", 500000],
  ["Tozeur–Nefta Airport", "TZE", "Tozeur", "Tunisia", 300000],

  // ════════════════════════════════════════════════════════════════════════════
  // ASIA PACIFIC
  // ════════════════════════════════════════════════════════════════════════════

  // ── Singapore ──
  ["Singapore Changi Airport", "SIN", "Singapore", "Singapore", 58900000],

  // ── Hong Kong ──
  ["Hong Kong International Airport", "HKG", "Hong Kong", "Hong Kong", 47000000],

  // ── China ──
  ["Shanghai Pudong International Airport", "PVG", "Shanghai", "China", 76000000],
  ["Wuhan Tianhe International Airport", "WUH", "Wuhan", "China", 27000000],

  // ── South Korea ──
  ["Gimhae International Airport", "PUS", "Busan", "South Korea", 10000000],

  // ── Cambodia ──
  ["Phnom Penh International Airport", "PNH", "Phnom Penh", "Cambodia", 6000000],

  // ════════════════════════════════════════════════════════════════════════════
  // AMERICAS
  // ════════════════════════════════════════════════════════════════════════════

  // ── United States (Hudson Group — 90+ airports) ──
  ["Hartsfield-Jackson Atlanta International Airport", "ATL", "Atlanta", "United States", 104600000],
  ["John F. Kennedy International Airport", "JFK", "New York", "United States", 62500000],
  ["Los Angeles International Airport", "LAX", "Los Angeles", "United States", 75900000],
  ["O'Hare International Airport", "ORD", "Chicago", "United States", 73900000],
  ["Miami International Airport", "MIA", "Miami", "United States", 50700000],
  ["Dallas/Fort Worth International Airport", "DFW", "Dallas", "United States", 81000000],
  ["Denver International Airport", "DEN", "Denver", "United States", 69000000],
  ["Boston Logan International Airport", "BOS", "Boston", "United States", 42500000],
  ["Harry Reid International Airport", "LAS", "Las Vegas", "United States", 52700000],
  ["Orlando International Airport", "MCO", "Orlando", "United States", 57700000],
  ["Newark Liberty International Airport", "EWR", "Newark", "United States", 48500000],
  ["Philadelphia International Airport", "PHL", "Philadelphia", "United States", 30800000],
  ["George Bush Intercontinental Airport", "IAH", "Houston", "United States", 45000000],
  ["Phoenix Sky Harbor International Airport", "PHX", "Phoenix", "United States", 48700000],
  ["Seattle-Tacoma International Airport", "SEA", "Seattle", "United States", 50900000],
  ["San Francisco International Airport", "SFO", "San Francisco", "United States", 50000000],
  ["Minneapolis-Saint Paul International Airport", "MSP", "Minneapolis", "United States", 34000000],
  ["Detroit Metropolitan Wayne County Airport", "DTW", "Detroit", "United States", 31400000],
  ["Charlotte Douglas International Airport", "CLT", "Charlotte", "United States", 53000000],
  ["Fort Lauderdale-Hollywood International Airport", "FLL", "Fort Lauderdale", "United States", 35100000],
  ["Baltimore-Washington International Airport", "BWI", "Baltimore", "United States", 26000000],
  ["Salt Lake City International Airport", "SLC", "Salt Lake City", "United States", 26800000],
  ["San Diego International Airport", "SAN", "San Diego", "United States", 24100000],
  ["Chicago Midway International Airport", "MDW", "Chicago", "United States", 31800000],
  ["LaGuardia Airport", "LGA", "New York", "United States", 31000000],
  ["Washington Dulles International Airport", "IAD", "Washington", "United States", 25800000],
  ["Ronald Reagan Washington National Airport", "DCA", "Washington", "United States", 25000000],
  ["Nashville International Airport", "BNA", "Nashville", "United States", 18000000],
  ["Louis Armstrong New Orleans Airport", "MSY", "New Orleans", "United States", 14800000],
  ["Portland International Airport", "PDX", "Portland", "United States", 18500000],
  ["Norman Y. Mineta San José International Airport", "SJC", "San Jose", "United States", 15700000],
  ["Tampa International Airport", "TPA", "Tampa", "United States", 22700000],
  ["Pittsburgh International Airport", "PIT", "Pittsburgh", "United States", 9600000],
  ["Cleveland Hopkins International Airport", "CLE", "Cleveland", "United States", 10000000],
  ["Indianapolis International Airport", "IND", "Indianapolis", "United States", 9700000],
  ["Sacramento International Airport", "SMF", "Sacramento", "United States", 13000000],
  ["Austin-Bergstrom International Airport", "AUS", "Austin", "United States", 21000000],
  ["St. Louis Lambert International Airport", "STL", "St. Louis", "United States", 15400000],
  ["Kansas City International Airport", "MCI", "Kansas City", "United States", 11800000],
  ["John Wayne Airport", "SNA", "Santa Ana", "United States", 12000000],
  ["San Antonio International Airport", "SAT", "San Antonio", "United States", 10700000],
  ["Raleigh-Durham International Airport", "RDU", "Raleigh", "United States", 14500000],
  ["Cincinnati/Northern Kentucky International Airport", "CVG", "Cincinnati", "United States", 9800000],
  ["John Glenn Columbus International Airport", "CMH", "Columbus", "United States", 8800000],
  ["Southwest Florida International Airport", "RSW", "Fort Myers", "United States", 10200000],
  ["William P. Hobby Airport", "HOU", "Houston", "United States", 14800000],
  ["Oakland International Airport", "OAK", "Oakland", "United States", 7000000],
  ["Kahului Airport", "OGG", "Kahului", "United States", 7500000],
  ["Daniel K. Inouye International Airport", "HNL", "Honolulu", "United States", 21000000],
  ["Ontario International Airport", "ONT", "Ontario", "United States", 6500000],
  ["Milwaukee Mitchell International Airport", "MKE", "Milwaukee", "United States", 6500000],
  ["Memphis International Airport", "MEM", "Memphis", "United States", 14000000],
  ["Richmond International Airport", "RIC", "Richmond", "United States", 4900000],
  ["Birmingham-Shuttlesworth International Airport", "BHM", "Birmingham", "United States", 1500000],
  ["Harrisburg International Airport", "MDT", "Harrisburg", "United States", 1400000],
  ["Albuquerque International Sunport", "ABQ", "Albuquerque", "United States", 5000000],
  ["Ted Stevens Anchorage International Airport", "ANC", "Anchorage", "United States", 5000000],
  ["Bill and Hillary Clinton National Airport", "LIT", "Little Rock", "United States", 2500000],
  ["Atlantic City International Airport", "ACY", "Atlantic City", "United States", 1200000],
  ["Hollywood Burbank Airport", "BUR", "Burbank", "United States", 6000000],
  ["Burlington International Airport", "BTV", "Burlington", "United States", 700000],
  ["Charleston International Airport", "CHS", "Charleston", "United States", 5800000],
  ["Corpus Christi International Airport", "CRP", "Corpus Christi", "United States", 800000],
  ["Dallas Love Field Airport", "DAL", "Dallas", "United States", 16000000],
  ["Des Moines International Airport", "DSM", "Des Moines", "United States", 3000000],
  ["Fresno Yosemite International Airport", "FAT", "Fresno", "United States", 1500000],
  ["Gerald R. Ford International Airport", "GRR", "Grand Rapids", "United States", 3800000],
  ["Greater Rochester International Airport", "ROC", "Rochester", "United States", 2500000],
  ["Greenville-Spartanburg International Airport", "GSP", "Greer", "United States", 2600000],
  ["Jackson International Airport", "JAN", "Jackson", "United States", 900000],
  ["Lubbock Preston Smith International Airport", "LBB", "Lubbock", "United States", 1200000],
  ["Manchester-Boston Regional Airport", "MHT", "Manchester", "United States", 1800000],
  ["Mobile Regional Airport", "MOB", "Mobile", "United States", 700000],
  ["Myrtle Beach International Airport", "MYR", "Myrtle Beach", "United States", 3500000],
  ["Newport News/Williamsburg International Airport", "PHF", "Newport News", "United States", 1000000],
  ["Norfolk International Airport", "ORF", "Norfolk", "United States", 2000000],
  ["Eppley Airfield", "OMA", "Omaha", "United States", 5000000],
  ["Orlando Sanford International Airport", "SFB", "Orlando", "United States", 2000000],
  ["Palm Beach International Airport", "PBI", "West Palm Beach", "United States", 7400000],
  ["Palm Springs International Airport", "PSP", "Palm Springs", "United States", 3200000],
  ["Pensacola International Airport", "PNS", "Pensacola", "United States", 2600000],
  ["Portland International Jetport", "PWM", "Portland", "United States", 2000000],
  ["Roanoke-Blacksburg Regional Airport", "ROA", "Roanoke", "United States", 900000],
  ["Savannah/Hilton Head International Airport", "SAV", "Savannah", "United States", 5400000],
  ["St. Pete-Clearwater International Airport", "PIE", "St. Petersburg", "United States", 2000000],
  ["Stewart International Airport", "SWF", "Newburgh", "United States", 500000],
  ["Tucson International Airport", "TUS", "Tucson", "United States", 4300000],
  ["Tulsa International Airport", "TUL", "Tulsa", "United States", 3200000],
  ["Will Rogers World Airport", "OKC", "Oklahoma City", "United States", 4400000],
  ["Colorado Springs Airport", "COS", "Colorado Springs", "United States", 2500000],
  ["El Paso International Airport", "ELP", "El Paso", "United States", 3800000],
  ["Jacksonville International Airport", "JAX", "Jacksonville", "United States", 7200000],
  ["Louisville Muhammad Ali International Airport", "SDF", "Louisville", "United States", 9000000],
  ["Northwest Arkansas National Airport", "XNA", "Bentonville", "United States", 1800000],
  ["McGhee Tyson Airport", "TYS", "Knoxville", "United States", 2900000],
  ["Reno-Tahoe International Airport", "RNO", "Reno", "United States", 4400000],
  ["Boise Airport", "BOI", "Boise", "United States", 2100000],
  ["Bradley International Airport", "BDL", "Hartford", "United States", 8200000],
  ["Columbia Metropolitan Airport", "CAE", "Columbia", "United States", 1500000],
  ["Dayton International Airport", "DAY", "Dayton", "United States", 1400000],
  ["Dane County Regional Airport", "MSN", "Madison", "United States", 2000000],
  ["Huntsville International Airport", "HSV", "Huntsville", "United States", 1300000],

  // ── Canada (Hudson) ──
  ["Toronto Pearson International Airport", "YYZ", "Toronto", "Canada", 50500000],
  ["Vancouver International Airport", "YVR", "Vancouver", "Canada", 26400000],
  ["Montréal–Trudeau Airport", "YUL", "Montreal", "Canada", 21000000],
  ["Calgary International Airport", "YYC", "Calgary", "Canada", 18000000],
  ["Ottawa Macdonald–Cartier Airport", "YOW", "Ottawa", "Canada", 5000000],
  ["Billy Bishop Toronto City Airport", "YTZ", "Toronto", "Canada", 2500000],

  // ── Brazil (Dufry South America) ──
  ["São Paulo–Guarulhos International Airport", "GRU", "São Paulo", "Brazil", 42000000],
  ["Rio de Janeiro/Galeão Airport", "GIG", "Rio de Janeiro", "Brazil", 7400000],
  ["Brasília International Airport", "BSB", "Brasília", "Brazil", 16000000],
  ["Tancredo Neves International Airport", "CNF", "Belo Horizonte", "Brazil", 10000000],
  ["Salvador Airport", "SSA", "Salvador", "Brazil", 10000000],
  ["Porto Alegre Airport", "POA", "Porto Alegre", "Brazil", 8000000],
  ["Fortaleza Airport", "FOR", "Fortaleza", "Brazil", 8000000],
  ["Curitiba Airport", "CWB", "Curitiba", "Brazil", 7000000],
  ["Recife Airport", "REC", "Recife", "Brazil", 9500000],
  ["Florianópolis Airport", "FLN", "Florianópolis", "Brazil", 5000000],

  // ── Argentina (Duty Free Shop Argentina) ──
  ["Ministro Pistarini International Airport", "EZE", "Buenos Aires", "Argentina", 10000000],
  ["Aeroparque Jorge Newbery", "AEP", "Buenos Aires", "Argentina", 13000000],
  ["San Carlos de Bariloche Airport", "BRC", "Bariloche", "Argentina", 2000000],
  ["Córdoba International Airport", "COR", "Córdoba", "Argentina", 3000000],
  ["Mendoza International Airport", "MDZ", "Mendoza", "Argentina", 2000000],
  ["Rosario International Airport", "ROS", "Rosario", "Argentina", 1000000],

  // ── Uruguay (Duty Free Uruguay) ──
  ["Carrasco International Airport", "MVD", "Montevideo", "Uruguay", 2000000],

  // ── Chile ──
  ["Arturo Merino Benítez International Airport", "SCL", "Santiago", "Chile", 24000000],

  // ── Ecuador ──
  ["José Joaquín de Olmedo Airport", "GYE", "Guayaquil", "Ecuador", 4000000],

  // ── Mexico ──
  ["Mexico City International Airport", "MEX", "Mexico City", "Mexico", 50300000],
  ["Cancún International Airport", "CUN", "Cancún", "Mexico", 30700000],
  ["Guadalajara International Airport", "GDL", "Guadalajara", "Mexico", 15000000],
  ["Monterrey International Airport", "MTY", "Monterrey", "Mexico", 13000000],
  ["Puerto Vallarta Airport", "PVR", "Puerto Vallarta", "Mexico", 8000000],
  ["Los Cabos International Airport", "SJD", "Los Cabos", "Mexico", 5000000],
  ["Acapulco International Airport", "ACA", "Acapulco", "Mexico", 1000000],
  ["Cozumel International Airport", "CZM", "Cozumel", "Mexico", 1000000],
  ["Del Bajío International Airport", "BJX", "Guanajuato", "Mexico", 2000000],
  ["Ixtapa-Zihuatanejo International Airport", "ZIH", "Ixtapa", "Mexico", 800000],
  ["Mazatlán International Airport", "MZT", "Mazatlán", "Mexico", 1000000],

  // ── Dominican Republic ──
  ["Puerto Plata Airport", "POP", "Puerto Plata", "Dominican Republic", 1000000],

  // ── Caribbean ──
  ["Queen Beatrix International Airport", "AUA", "Oranjestad", "Aruba", 2500000],
  ["V. C. Bird International Airport", "ANU", "St. John's", "Antigua", 1000000],
  ["Lynden Pindling International Airport", "NAS", "Nassau", "Bahamas", 3000000],
  ["Grantley Adams International Airport", "BGI", "Bridgetown", "Barbados", 2000000],
  ["Grand Turk Airport", "GDT", "Grand Turk", "Turks and Caicos Islands", 50000],

  // ── Bolivia ──
  ["El Alto International Airport", "LPB", "La Paz", "Bolivia", 2000000],
];

// ── Country → region mapping ────────────────────────────────────────────────
const COUNTRY_REGION = {
  // Europe
  "United Kingdom": "Europe", "Spain": "Europe", "Italy": "Europe", "Greece": "Europe",
  "France": "Europe", "Switzerland": "Europe", "Finland": "Europe", "Denmark": "Europe",
  "Jersey": "Europe", "Armenia": "Europe", "Bulgaria": "Europe", "Russia": "Europe",
  "Sweden": "Europe",
  // Middle East & Africa
  "Jordan": "Middle East", "Kuwait": "Middle East", "Kenya": "Africa",
  "United Arab Emirates": "Middle East", "Tunisia": "Africa",
  "Cape Verde": "Africa", "Cote d'Ivoire": "Africa",
  "Kazakhstan": "Asia",
  // Asia Pacific
  "Singapore": "Asia", "Hong Kong": "Asia", "China": "Asia",
  "South Korea": "Asia", "Cambodia": "Asia", "Sri Lanka": "Asia", "India": "Asia",
  // Americas
  "United States": "Americas", "Canada": "Americas", "Brazil": "Americas",
  "Argentina": "Americas", "Uruguay": "Americas", "Chile": "Americas",
  "Ecuador": "Americas", "Mexico": "Americas", "Dominican Republic": "Americas",
  "Aruba": "Americas", "Antigua": "Americas", "Bahamas": "Americas",
  "Barbados": "Americas", "Bolivia": "Americas", "Turks and Caicos Islands": "Americas",
  // French territories
  "French Guiana": "Americas", "Martinique": "Americas", "Guadeloupe": "Americas",
};

const avoltaAirportData = AVOLTA_AIRPORTS_RAW.map(([name, code, city, country, annualPax]) => ({
  name,
  code,
  city,
  country,
  region: COUNTRY_REGION[country] || "Europe",
  annual_pax: annualPax,
  daily_pax: Math.round(annualPax / 365),
}));

export const AIRPORTS_FULL = avoltaAirportData;

export const AIRPORTS = avoltaAirportData.map(a => ({
  code: a.code,
  name: a.name,
  city: a.city,
  country: a.country,
}));

// ── Generate RETAILERS ──────────────────────────────────────────────────────
let _idCounter = 0;

export const RETAILERS = avoltaAirportData.flatMap(airport => {
  const count = retailerCount(airport.annual_pax, airport.code);
  const basket = estimateAvgBasketSpend(airport);
  const dailyPax = airport.daily_pax || Math.round((airport.annual_pax || 0) / 365);
  const dailyRedemptions = Math.round(dailyPax * (CONVERSION_RATE / 100));
  const monthlyRedemptions = Math.round(dailyRedemptions * 365 / 12);
  const weights = generateWeights(count);
  const storeNames = generateStoreNames(airport, count);

  return Array.from({ length: count }, (_, i) => {
    _idCounter++;
    const redemptions = Math.round(monthlyRedemptions * weights[i]);
    const revenue = redemptions * basket;

    return {
      id: `a${_idCounter}`,
      name: storeNames[i],
      airport: airport.code,
      category: "Retail",
      redemptions,
      avg_sale: basket,
      revenue,
      contact_person: "Elena Rossi",
      email: "e.rossi@avoltaworld.com",
      company: "Avolta AG",
      phone: "+41 61 269 31 11",
    };
  });
});

// ── Store count — used by RetailerCalculator to match demo dashboard exactly ─
export const STORE_COUNT = RETAILERS.length;

// ── Aggregate base figures ───────────────────────────────────────────────────
const baseMonthlyRedemptions = RETAILERS.reduce((s, r) => s + r.redemptions, 0);
const baseMonthlyRevenue = RETAILERS.reduce((s, r) => s + r.revenue, 0);
const baseDailyRedemptions = Math.round(baseMonthlyRedemptions * 12 / 365);
const baseDailyRevenue = Math.round(baseMonthlyRevenue * 12 / 365);

// ── Seasonal multipliers ─────────────────────────────────────────────────────
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