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

// ── Store count per airport — Avolta is the world's largest airport retailer
// (~1,700 retail stores across 400+ airports in 70+ countries). Counts reflect
// the combined footprint of World Duty Free, Dufry, Hudson, Hellenic Duty Free,
// Nuance, and RegStaer brands at each airport.
function retailerCount(annualPax, code) {
  const EXPLICIT = {
    // UK (World Duty Free) — LHR alone has 25+ WDF outlets across 4 terminals
    "LHR": 45, "LGW": 20, "STN": 12, "MAN": 15, "EDI": 10, "BHX": 10,
    "BRS": 8, "GLA": 8, "LBA": 5, "LTN": 8, "BFS": 6, "NCL": 5,
    "EMA": 4, "BOH": 3, "HUY": 2, "NWI": 2, "SOU": 3, "DSA": 2,
    "SEN": 2, "PIK": 2, "ABZ": 3, "CWL": 3,
    // Spain (World Duty Free)
    "MAD": 40, "BCN": 35, "PMI": 18, "AGP": 15, "ALC": 10, "LPA": 10,
    "TFS": 10, "VLC": 8, "SVQ": 8, "IBZ": 8, "ACE": 8, "TFN": 6,
    "FUE": 6, "MAH": 6, "SCQ": 5, "GRO": 4, "OVD": 3, "SPC": 3,
    "REU": 3, "LCG": 3, "SDR": 3, "GRX": 2, "XRY": 2, "RMU": 2,
    // Italy (World Duty Free / Dufry)
    "MXP": 25, "LIN": 10, "BGY": 6, "NAP": 6, "FLR": 4, "GOA": 4, "PSA": 4, "VRN": 4,
    // Greece (Hellenic Duty Free)
    "ATH": 20, "SKG": 8, "HER": 6, "RHO": 6, "KGS": 4, "CFU": 4, "CHQ": 4,
    "KVA": 2, "JMK": 2, "MJT": 2, "JTR": 2, "JSI": 2, "ZTH": 3,
    "KLX": 2, "AOK": 2, "KZS": 2, "LXS": 2, "EFL": 2, "PVK": 2,
    "AXD": 2, "VOL": 2, "GPA": 1,
    // Switzerland (Nuance)
    "ZRH": 15, "GVA": 8, "BSL": 6,
    // Other Europe
    "CPH": 10, "HEL": 8, "NCE": 10, "TLS": 6, "JER": 3, "JKG": 1,
    // Russia (RegStaer)
    "DME": 10, "SVO": 12, "VKO": 6, "LED": 8,
    // Middle East & Africa
    "KWI": 5, "NBO": 4, "AMM": 5, "SHJ": 5, "EVN": 3, "AQJ": 2, "ABJ": 3,
    "SID": 3, "BVC": 2, "RAI": 2,
    // Asia Pacific
    "SIN": 15, "HKG": 15, "PVG": 12, "WUH": 8, "PUS": 4, "PNH": 3, "CMB": 4, "BLR": 8,
    // USA (Hudson Group) — ATL has 50+ Hudson outlets alone
    "ATL": 50, "JFK": 35, "LAX": 40, "ORD": 35, "MIA": 30, "DFW": 30, "DEN": 28,
    "BOS": 20, "LAS": 25, "MCO": 25, "EWR": 22, "PHL": 15, "IAH": 18, "PHX": 18,
    "SEA": 18, "SFO": 18, "MSP": 15, "DTW": 12, "CLT": 20, "FLL": 12, "BWI": 10,
    "SLC": 10, "SAN": 10, "MDW": 12, "LGA": 15, "IAD": 10, "DCA": 8,
    "BNA": 8, "MSY": 8, "PDX": 6, "SJC": 6, "TPA": 10, "PIT": 5, "CLE": 5,
    "IND": 4, "SMF": 5, "AUS": 6, "STL": 5, "MCI": 4, "SNA": 5, "SAT": 5,
    "RDU": 5, "CVG": 4, "CMH": 4, "RSW": 5, "HOU": 6, "OAK": 4, "OGG": 4,
    "HNL": 8, "ONT": 4, "MKE": 4, "MEM": 4, "RIC": 3, "BHM": 2, "MDT": 2,
    "ABQ": 3, "ANC": 3, "LIT": 2, "ACY": 2, "BUR": 3, "BTV": 1, "CHS": 3,
    "CRP": 1, "DAL": 5, "DSM": 2, "FAT": 2, "GRR": 2, "ROC": 2, "GSP": 2,
    "JAN": 1, "LBB": 1, "MHT": 2, "MOB": 1, "MYR": 2, "PHF": 1, "ORF": 2,
    "OMA": 2, "SFB": 2, "PBI": 4, "PSP": 3, "PNS": 2, "PWM": 2, "ROA": 1,
    "SAV": 3, "PIE": 2, "SWF": 1, "TUS": 2, "TUL": 2, "OKC": 3, "COS": 2,
    "ELP": 2, "JAX": 3, "SDF": 3, "XNA": 2, "TYS": 2, "RNO": 3, "BOI": 2,
    "BDL": 4, "CAE": 2, "DAY": 2, "MSN": 2, "HSV": 2,
    // Canada (Hudson)
    "YYZ": 15, "YVR": 12, "YUL": 10, "YYC": 8, "YOW": 5, "YTZ": 3,
    // Latin America (Dufry)
    "GRU": 15, "GIG": 10, "BSB": 8, "CNF": 6, "SSA": 6, "POA": 5, "FOR": 5,
    "CWB": 5, "REC": 5, "FLN": 3, "BEL": 3, "MAO": 3, "GYN": 3, "VIX": 2,
    "NAT": 2, "CGB": 2,
    "EZE": 10, "AEP": 8, "BRC": 3, "COR": 3, "MDZ": 2, "ROS": 2,
    "MVD": 5, "SCL": 10, "GYE": 4, "UIO": 4, "LPB": 3,
    "BOG": 8, "CTG": 4, "MDE": 4, "CLO": 3, "LIM": 8, "ASU": 3,
    // Mexico
    "MEX": 10, "CUN": 12, "GDL": 6, "MTY": 6, "PVR": 6, "SJD": 6,
    "ACA": 2, "CZM": 2, "BJX": 2, "ZIH": 2, "MZT": 2,
    // Central America & Caribbean
    "SJO": 4, "GUA": 3, "PTY": 8, "SAL": 2, "SAP": 2, "MGA": 2,
    "AUA": 4, "ANU": 3, "NAS": 4, "BGI": 3, "POP": 3, "SXM": 3, "CUR": 3,
    "GND": 2, "UVF": 2, "SKB": 2, "DOM": 1, "EIS": 1, "GDT": 1,
    // Tunisia
    "TUN": 6, "DJE": 4, "MIR": 4, "SFA": 2, "TZE": 2,
    // Croatia & Serbia
    "ZAG": 4, "SPU": 3, "DBV": 2, "BEG": 4,
  };
  if (EXPLICIT[code]) {
    // Avolta is the world's largest airport retailer (~5,100 outlets) — scale
    // up explicit store counts to reflect the full outlet footprint per airport
    const base = EXPLICIT[code];
    if (base >= 30) return base + Math.ceil(base * 0.17);
    if (base >= 15) return base + 4;
    if (base >= 8)  return base + 2;
    if (base >= 4)  return base + 1;
    return base;
  }

  // Tiered by passenger volume — Avolta is the world's largest airport retailer,
  // so store density exceeds Lagardère at every tier
  if (annualPax >= 80_000_000) return 55;
  if (annualPax >= 60_000_000) return 42;
  if (annualPax >= 40_000_000) return 32;
  if (annualPax >= 30_000_000) return 26;
  if (annualPax >= 20_000_000) return 22;
  if (annualPax >= 15_000_000) return 18;
  if (annualPax >= 10_000_000) return 16;
  if (annualPax >= 5_000_000)  return 15;
  if (annualPax >= 1_000_000)  return 13;
  return 11;
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

  // ════════════════════════════════════════════════════════════════════════════
  // ADDITIONAL AIRPORTS — Post-2022 expansion & brochure completeness
  // ════════════════════════════════════════════════════════════════════════════

  // ── Colombia (Dufry South America) ──
  ["El Dorado International Airport", "BOG", "Bogotá", "Colombia", 35000000],
  ["Rafael Núñez International Airport", "CTG", "Cartagena", "Colombia", 5000000],
  ["José María Córdova International Airport", "MDE", "Medellín", "Colombia", 7000000],
  ["Alfonso Bonilla Aragón International Airport", "CLO", "Cali", "Colombia", 3000000],

  // ── Peru ──
  ["Jorge Chávez International Airport", "LIM", "Lima", "Peru", 23000000],

  // ── Paraguay ──
  ["Silvio Pettirossi International Airport", "ASU", "Asunción", "Paraguay", 1000000],

  // ── Costa Rica ──
  ["Juan Santamaría International Airport", "SJO", "San José", "Costa Rica", 5000000],

  // ── Guatemala ──
  ["La Aurora International Airport", "GUA", "Guatemala City", "Guatemala", 3000000],

  // ── Panama ──
  ["Tocumen International Airport", "PTY", "Panama City", "Panama", 16000000],

  // ── El Salvador ──
  ["Monseñor Óscar Arnulfo Romero International Airport", "SAL", "San Salvador", "El Salvador", 2000000],

  // ── Honduras ──
  ["Ramón Villeda Morales International Airport", "SAP", "San Pedro Sula", "Honduras", 1000000],

  // ── Nicaragua ──
  ["Augusto C. Sandino International Airport", "MGA", "Managua", "Nicaragua", 1000000],

  // ── Caribbean (Dufry) ──
  ["Princess Juliana International Airport", "SXM", "Sint Maarten", "Sint Maarten", 1500000],
  ["Curaçao International Airport", "CUR", "Willemstad", "Curaçao", 2000000],
  ["Maurice Bishop International Airport", "GND", "St. George's", "Grenada", 500000],
  ["Hewanorra International Airport", "UVF", "Vieux Fort", "Saint Lucia", 500000],
  ["Robert L. Bradshaw International Airport", "SKB", "Basseterre", "Saint Kitts and Nevis", 300000],
  ["Douglas-Charles Airport", "DOM", "Marigot", "Dominica", 100000],
  ["Terrance B. Lettsome International Airport", "EIS", "Tortola", "British Virgin Islands", 200000],

  // ── Croatia (Dufry) ──
  ["Zagreb Airport", "ZAG", "Zagreb", "Croatia", 3500000],
  ["Split Airport", "SPU", "Split", "Croatia", 3000000],
  ["Dubrovnik Airport", "DBV", "Dubrovnik", "Croatia", 2000000],

  // ── Serbia (Dufry) ──
  ["Belgrade Nikola Tesla Airport", "BEG", "Belgrade", "Serbia", 3500000],

  // ── Brazil — additional Dufry South America airports ──
  ["Belém/Val de Cans International Airport", "BEL", "Belém", "Brazil", 3000000],
  ["Manaus/Eduardo Gomes International Airport", "MAO", "Manaus", "Brazil", 3000000],
  ["Goiânia/Santa Genoveva Airport", "GYN", "Goiânia", "Brazil", 3000000],
  ["Vitória Airport", "VIX", "Vitória", "Brazil", 2000000],
  ["Greater Natal International Airport", "NAT", "Natal", "Brazil", 2000000],
  ["Marechal Rondon International Airport", "CGB", "Cuiabá", "Brazil", 1500000],

  // ── Argentina — additional Duty Free Shop Argentina airports ──
  ["Martín Miguel de Güemes International Airport", "SLA", "Salta", "Argentina", 500000],
  ["Cataratas del Iguazú International Airport", "IGR", "Puerto Iguazú", "Argentina", 500000],
  ["Malvinas Argentinas International Airport", "USH", "Ushuaia", "Argentina", 300000],
  ["General Enrique Mosconi International Airport", "CRD", "Comodoro Rivadavia", "Argentina", 400000],
  ["Comandante Armando Tola International Airport", "FTE", "El Calafate", "Argentina", 400000],

  // ── Ecuador — additional ──
  ["Mariscal Sucre International Airport", "UIO", "Quito", "Ecuador", 5000000],
  ["Seymour Airport", "GPS", "Baltra", "Ecuador", 300000],

  // ════════════════════════════════════════════════════════════════════════════
  // ADDITIONAL US AIRPORTS (Hudson Group — 100+ locations)
  // ════════════════════════════════════════════════════════════════════════════
  ["Albany International Airport", "ALB", "Albany", "United States", 1500000],
  ["Buffalo Niagara International Airport", "BUF", "Buffalo", "United States", 3000000],
  ["Bozeman Yellowstone International Airport", "BZN", "Bozeman", "United States", 2000000],
  ["Yeager Airport", "CRW", "Charleston", "United States", 700000],
  ["Chattanooga Metropolitan Airport", "CHA", "Chattanooga", "United States", 500000],
  ["Duluth International Airport", "DLH", "Duluth", "United States", 400000],
  ["Eugene Airport", "EUG", "Eugene", "United States", 1000000],
  ["Evansville Regional Airport", "EVV", "Evansville", "United States", 300000],
  ["Fairbanks International Airport", "FAI", "Fairbanks", "United States", 500000],
  ["Hector International Airport", "FAR", "Fargo", "United States", 900000],
  ["Grand Forks International Airport", "GFK", "Grand Forks", "United States", 200000],
  ["Great Falls International Airport", "GTF", "Great Falls", "United States", 300000],
  ["Green Bay–Austin Straubel International Airport", "GRB", "Green Bay", "United States", 600000],
  ["Gulfport–Biloxi International Airport", "GPT", "Gulfport", "United States", 400000],
  ["Hilo International Airport", "ITO", "Hilo", "United States", 600000],
  ["Jackson Hole Airport", "JAC", "Jackson", "United States", 600000],
  ["Kalamazoo/Battle Creek International Airport", "AZO", "Kalamazoo", "United States", 1000000],
  ["Glacier Park International Airport", "FCA", "Kalispell", "United States", 1000000],
  ["Key West International Airport", "EYW", "Key West", "United States", 500000],
  ["Long Beach Airport", "LGB", "Long Beach", "United States", 3000000],
  ["Long Island MacArthur Airport", "ISP", "Long Island", "United States", 2000000],
  ["Rogue Valley International–Medford Airport", "MFR", "Medford", "United States", 700000],
  ["Orlando Melbourne International Airport", "MLB", "Melbourne", "United States", 400000],
  ["Quad City International Airport", "MLI", "Moline", "United States", 400000],
  ["Monterey Regional Airport", "MRY", "Monterey", "United States", 500000],
  ["Northwest Florida Beaches International Airport", "ECP", "Panama City", "United States", 1000000],
  ["Tri-Cities Airport", "PSC", "Pasco", "United States", 400000],
  ["General Wayne A. Downing Peoria International Airport", "PIA", "Peoria", "United States", 400000],
  ["T. F. Green International Airport", "PVD", "Providence", "United States", 2000000],
  ["Rapid City Regional Airport", "RAP", "Rapid City", "United States", 500000],
  ["Roberts Field", "RDM", "Redmond", "United States", 500000],
  ["Shreveport Regional Airport", "SHV", "Shreveport", "United States", 400000],
  ["Sioux Falls Regional Airport", "FSD", "Sioux Falls", "United States", 700000],
  ["South Bend International Airport", "SBN", "South Bend", "United States", 500000],
  ["Spokane International Airport", "GEG", "Spokane", "United States", 2000000],
  ["Springfield–Branson National Airport", "SGF", "Springfield", "United States", 1000000],
  ["Syracuse Hancock International Airport", "SYR", "Syracuse", "United States", 1000000],
  ["Tallahassee International Airport", "TLH", "Tallahassee", "United States", 500000],
  ["Toledo Express Airport", "TOL", "Toledo", "United States", 400000],
  ["Cherry Capital Airport", "TVC", "Traverse City", "United States", 500000],
  ["Tri-Cities Airport", "TRI", "Bristol", "United States", 400000],
  ["Westchester County Airport", "HPN", "White Plains", "United States", 1500000],
  ["Wichita Dwight D. Eisenhower National Airport", "ICT", "Wichita", "United States", 800000],
  ["Wilmington International Airport", "ILM", "Wilmington", "United States", 500000],
  ["Santa Barbara Airport", "SBA", "Santa Barbara", "United States", 1000000],
  ["Bangor International Airport", "BGR", "Bangor", "United States", 500000],
  ["Bismarck Airport", "BIS", "Bismarck", "United States", 250000],
  ["Fort Wayne International Airport", "FWA", "Fort Wayne", "United States", 400000],
  ["Grand Junction Regional Airport", "GJT", "Grand Junction", "United States", 400000],
  ["Helena Regional Airport", "HLN", "Helena", "United States", 200000],
  ["Idaho Falls Regional Airport", "IDA", "Idaho Falls", "United States", 300000],
  ["Capital Region International Airport", "LAN", "Lansing", "United States", 400000],
  ["Lincoln Airport", "LNK", "Lincoln", "United States", 400000],
  ["Midland International Air and Space Port", "MAF", "Midland", "United States", 500000],
  ["Missoula International Airport", "MSO", "Missoula", "United States", 600000],
  ["University Park Airport", "SCE", "State College", "United States", 200000],
  ["Twin Falls Airport", "TWF", "Twin Falls", "United States", 100000],
  ["Yakima Air Terminal", "YKM", "Yakima", "United States", 200000],
  ["Naples Municipal Airport", "APF", "Naples", "United States", 200000],
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
  "Colombia": "Americas", "Peru": "Americas", "Paraguay": "Americas",
  "Costa Rica": "Americas", "Guatemala": "Americas", "Panama": "Americas",
  "El Salvador": "Americas", "Honduras": "Americas", "Nicaragua": "Americas",
  "Sint Maarten": "Americas", "Curaçao": "Americas", "Grenada": "Americas",
  "Saint Lucia": "Americas", "Saint Kitts and Nevis": "Americas",
  "Dominica": "Americas", "British Virgin Islands": "Americas",
  // Additional European countries
  "Croatia": "Europe", "Serbia": "Europe",
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
  const dailyRedemptions = dailyPax * (CONVERSION_RATE / 100);
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
export const STORE_COUNT = avoltaAirportData.reduce((sum, a) => sum + retailerCount(a.annual_pax, a.code), 0);

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