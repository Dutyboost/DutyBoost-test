// Avolta (formerly Dufry) demo data — global airport retailer network.
//
// Covers airports where Avolta operates retail stores (World Duty Free,
// Dufry, Hudson, specialty) — ALL F&B excluded.
//
// Sources: avoltaworld.com, Dufry Corporate Brochure 2022, Avolta Annual
// Report 2025, hudsongroup.com, Wikipedia.
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
  "Dufry Express", "Avolta Duty Free",
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
  "Dufry Collection", "World Duty Free Beauty",
];

const LOCATION_SUFFIXES = [
  "(Terminal 1)", "(Terminal 2)", "(Terminal 3)", "(Terminal 4)", "(Terminal 5)",
  "(Concourse A)", "(Concourse B)", "(Concourse C)", "(Gate Area)", "(Arrivals)",
  "(Departures)", "(Duty Free Area)", "(Pier A)", "(Pier B)",
];

// ── Store count per airport — based on Avolta's actual retail presence ──────
function retailerCount(annualPax, code) {
  const EXPLICIT = {
    "LHR": 25,   // World Duty Free — massive LHR presence
    "CDG": 15,   // Major Paris duty free
    "ATL": 15,   // Hudson HQ airport
    "JFK": 12,   // Hudson + Dufry
    "MAD": 8,    // World Duty Free Spain
    "MXP": 10,   // Malpensa major Italian hub
    "ORD": 10,   // Chicago O'Hare Hudson
    "LAX": 10,   // Los Angeles Hudson
    "MIA": 12,   // Miami — Dufry Americas HQ
    "MCO": 8,    // Orlando Hudson
    "BCN": 7,    // Barcelona WDF
    "FCO": 8,    // Rome Fiumicino WDF
    "PMI": 4,    // Palma WDF
    "MAN": 6,    // Manchester WDF
    "LIS": 5,    // Lisbon WDF
    "ZRH": 6,    // Zurich — key Swiss market
    "YYZ": 6,    // Toronto Hudson
    "GRU": 6,    // São Paulo Dufry
    "DFW": 8,    // Dallas Fort Worth Hudson
    "DEN": 6,    // Denver Hudson
    "EWR": 6,    // Newark Hudson
    "LAS": 6,    // Las Vegas Hudson
    "SIN": 3,    // Singapore limited
    "PVG": 5,    // Shanghai Pudong — new contract
    "HKG": 6,    // Hong Kong stores
    "ATH": 6,    // Athens — Folli Follie acquisition
    "CPH": 5,    // Copenhagen
    "LGW": 8,    // Gatwick WDF
    "STN": 5,    // Stansted WDF
    "EZE": 4,    // Buenos Aires Dufry
    "MEX": 4,    // Mexico City Dufry
    "CUN": 4,    // Cancún Dufry
    "SCL": 4,    // Santiago — new contract
    "BOS": 5,    // Boston Hudson
    "SFO": 5,    // San Francisco Hudson
    "SEA": 4,    // Seattle Hudson
    "PHX": 4,    // Phoenix Hudson
    "IAH": 4,    // Houston Hudson
    "PHL": 4,    // Philadelphia Hudson
    "YVR": 3,    // Vancouver Hudson
    "YUL": 3,    // Montreal Hudson
    "NCE": 4,    // Nice WDF
    "LIN": 4,    // Milan Linate
    "OPO": 3,    // Porto WDF
    "GVA": 3,    // Geneva
    "EDI": 4,    // Edinburgh WDF
    "BHX": 3,    // Birmingham WDF
    "TFS": 2,    // Tenerife South
    "LPA": 2,    // Las Palmas
    "ALC": 2,    // Alicante
    "VLC": 2,    // Valencia
    "AGP": 3,    // Malaga WDF
    "NAP": 2,    // Naples
    "BGY": 2,    // Bergamo
    "FAO": 2,    // Faro
    "HEL": 3,    // Helsinki
    "AMM": 2,    // Amman
    "KWI": 2,    // Kuwait
    "NBO": 2,    // Nairobi
    "TUN": 4,    // Tunis — new Tunisia contract
    "BNA": 2,    // Nashville Hudson
    "MSY": 2,    // New Orleans Hudson
    "PDX": 2,    // Portland Hudson
    "SLC": 2,    // Salt Lake City Hudson
    "CLE": 2,    // Cleveland Hudson
    "IND": 2,    // Indianapolis Hudson
    "YYC": 2,    // Calgary Hudson
    "YOW": 2,    // Ottawa Hudson
    "GIG": 3,    // Rio Dufry
    "MVD": 2,    // Montevideo Dufry
    "GDL": 2,    // Guadalajara Dufry
    "MTY": 2,    // Monterrey Dufry
    "PVR": 2,    // Puerto Vallarta Dufry
    "UIO": 2,    // Quito Dufry
    "GYE": 2,    // Guayaquil Dufry
    "PUJ": 2,    // Punta Cana Dufry
    "BGI": 1,    // Barbados
    "ANU": 1,    // Antigua
    "NAS": 1,    // Bahamas
    "PUS": 2,    // Busan
    "PNH": 2,    // Phnom Penh
    "CMB": 2,    // Colombo
    "EVN": 2,    // Yerevan
    "SHJ": 2,    // Sharjah
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

// ── Avolta airport list across ~40 countries ────────────────────────────────
const AVOLTA_AIRPORTS_RAW = [
  // ── United Kingdom (World Duty Free) ──
  ["London Heathrow Airport", "LHR", "London", "United Kingdom", 79000000],
  ["London Gatwick Airport", "LGW", "London", "United Kingdom", 40000000],
  ["London Stansted Airport", "STN", "London", "United Kingdom", 28000000],
  ["London Luton Airport", "LTN", "London", "United Kingdom", 16000000],
  ["Manchester Airport", "MAN", "Manchester", "United Kingdom", 30000000],
  ["Edinburgh Airport", "EDI", "Edinburgh", "United Kingdom", 14500000],
  ["Birmingham Airport", "BHX", "Birmingham", "United Kingdom", 13000000],
  ["Glasgow Airport", "GLA", "Glasgow", "United Kingdom", 7700000],
  ["Bristol Airport", "BRS", "Bristol", "United Kingdom", 8800000],
  ["Newcastle Airport", "NCL", "Newcastle", "United Kingdom", 5000000],
  ["Leeds Bradford Airport", "LBA", "Leeds", "United Kingdom", 4000000],
  ["Aberdeen Airport", "ABZ", "Aberdeen", "United Kingdom", 3000000],
  ["Belfast International Airport", "BFS", "Belfast", "United Kingdom", 6000000],
  ["Southampton Airport", "SOU", "Southampton", "United Kingdom", 2000000],

  // ── France ──
  ["Paris Charles de Gaulle Airport", "CDG", "Paris", "France", 67600000],
  ["Nice Côte d'Azur Airport", "NCE", "Nice", "France", 14400000],
  ["Toulouse-Blagnac Airport", "TLS", "Toulouse", "France", 9900000],

  // ── Italy ──
  ["Malpensa Airport", "MXP", "Milan", "Italy", 26100000],
  ["Milan Linate Airport", "LIN", "Milan", "Italy", 10000000],
  ["Leonardo da Vinci–Fiumicino Airport", "FCO", "Rome", "Italy", 40500000],
  ["Naples International Airport", "NAP", "Naples", "Italy", 11000000],
  ["Bergamo Orio al Serio Airport", "BGY", "Bergamo", "Italy", 14000000],
  ["Florence Peretola Airport", "FLR", "Florence", "Italy", 2900000],
  ["Genoa Cristoforo Colombo Airport", "GOA", "Genoa", "Italy", 1500000],
  ["Verona Villafranca Airport", "VRN", "Verona", "Italy", 3000000],
  ["Pisa International Airport", "PSA", "Pisa", "Italy", 5500000],

  // ── Spain (World Duty Free) ──
  ["Adolfo Suárez Madrid-Barajas Airport", "MAD", "Madrid", "Spain", 60200000],
  ["Barcelona-El Prat Airport", "BCN", "Barcelona", "Spain", 52600000],
  ["Málaga-Costa del Sol Airport", "AGP", "Málaga", "Spain", 24900000],
  ["Palma de Mallorca Airport", "PMI", "Palma", "Spain", 31900000],
  ["Alicante-Elche Airport", "ALC", "Alicante", "Spain", 15700000],
  ["Tenerife South Airport", "TFS", "Tenerife", "Spain", 12000000],
  ["Las Palmas Airport", "LPA", "Las Palmas", "Spain", 13000000],
  ["Ibiza Airport", "IBZ", "Ibiza", "Spain", 8000000],
  ["Valencia Airport", "VLC", "Valencia", "Spain", 10000000],

  // ── Portugal ──
  ["Lisbon Humberto Delgado Airport", "LIS", "Lisbon", "Portugal", 33700000],
  ["Porto Airport", "OPO", "Porto", "Portugal", 15600000],
  ["Faro Airport", "FAO", "Faro", "Portugal", 9100000],

  // ── Switzerland ──
  ["Zurich Airport", "ZRH", "Zurich", "Switzerland", 31800000],
  ["Geneva Airport", "GVA", "Geneva", "Switzerland", 17800000],

  // ── Denmark ──
  ["Copenhagen Airport", "CPH", "Copenhagen", "Denmark", 30200000],

  // ── Finland ──
  ["Helsinki Airport", "HEL", "Helsinki", "Finland", 15300000],

  // ── Greece (Folli Follie acquisition) ──
  ["Athens International Airport", "ATH", "Athens", "Greece", 28100000],

  // ── Armenia ──
  ["Zvartnots International Airport", "EVN", "Yerevan", "Armenia", 3000000],

  // ── Jordan ──
  ["Queen Alia International Airport", "AMM", "Amman", "Jordan", 9000000],

  // ── Kuwait ──
  ["Kuwait International Airport", "KWI", "Kuwait City", "Kuwait", 15900000],

  // ── Kenya ──
  ["Jomo Kenyatta International Airport", "NBO", "Nairobi", "Kenya", 7400000],

  // ── UAE ──
  ["Sharjah International Airport", "SHJ", "Sharjah", "United Arab Emirates", 15000000],

  // ── Tunisia (new contract — 15 DF stores across 5 airports) ──
  ["Tunis–Carthage Airport", "TUN", "Tunis", "Tunisia", 8000000],
  ["Djerba–Zarzis Airport", "DJE", "Djerba", "Tunisia", 2000000],
  ["Monastir Habib Bourguiba Airport", "MIR", "Monastir", "Tunisia", 2000000],
  ["Sfax–Thyna Airport", "SFA", "Sfax", "Tunisia", 500000],
  ["Tozeur–Nefta Airport", "TZE", "Tozeur", "Tunisia", 300000],

  // ── Singapore ──
  ["Singapore Changi Airport", "SIN", "Singapore", "Singapore", 58900000],

  // ── Hong Kong ──
  ["Hong Kong International Airport", "HKG", "Hong Kong", "Hong Kong", 47000000],

  // ── China ──
  ["Shanghai Pudong International Airport", "PVG", "Shanghai", "China", 76000000],

  // ── South Korea ──
  ["Gimhae International Airport", "PUS", "Busan", "South Korea", 10000000],

  // ── Cambodia ──
  ["Phnom Penh International Airport", "PNH", "Phnom Penh", "Cambodia", 8000000],

  // ── Sri Lanka ──
  ["Bandaranaike International Airport", "CMB", "Colombo", "Sri Lanka", 8000000],

  // ── United States (Hudson Group) ──
  ["Hartsfield-Jackson Atlanta International Airport", "ATL", "Atlanta", "United States", 104600000],
  ["John F. Kennedy International Airport", "JFK", "New York", "United States", 62500000],
  ["Los Angeles International Airport", "LAX", "Los Angeles", "United States", 75900000],
  ["O'Hare International Airport", "ORD", "Chicago", "United States", 73900000],
  ["Miami International Airport", "MIA", "Miami", "United States", 50000000],
  ["Dallas/Fort Worth International Airport", "DFW", "Dallas", "United States", 73000000],
  ["Denver International Airport", "DEN", "Denver", "United States", 69000000],
  ["Boston Logan International Airport", "BOS", "Boston", "United States", 42000000],
  ["Las Vegas Harry Reid Airport", "LAS", "Las Vegas", "United States", 45000000],
  ["Orlando International Airport", "MCO", "Orlando", "United States", 55000000],
  ["Newark Liberty International Airport", "EWR", "Newark", "United States", 46000000],
  ["Philadelphia International Airport", "PHL", "Philadelphia", "United States", 30000000],
  ["Houston George Bush Airport", "IAH", "Houston", "United States", 43000000],
  ["Phoenix Sky Harbor Airport", "PHX", "Phoenix", "United States", 46000000],
  ["Seattle-Tacoma Airport", "SEA", "Seattle", "United States", 50000000],
  ["San Francisco International Airport", "SFO", "San Francisco", "United States", 50000000],
  ["Nashville International Airport", "BNA", "Nashville", "United States", 18000000],
  ["Louis Armstrong New Orleans Airport", "MSY", "New Orleans", "United States", 13000000],
  ["Portland International Airport", "PDX", "Portland", "United States", 16000000],
  ["Salt Lake City International Airport", "SLC", "Salt Lake City", "United States", 27000000],
  ["Cleveland Hopkins Airport", "CLE", "Cleveland", "United States", 10000000],
  ["Indianapolis International Airport", "IND", "Indianapolis", "United States", 9000000],

  // ── Canada (Hudson) ──
  ["Toronto Pearson International Airport", "YYZ", "Toronto", "Canada", 50500000],
  ["Vancouver International Airport", "YVR", "Vancouver", "Canada", 26400000],
  ["Montréal–Trudeau Airport", "YUL", "Montreal", "Canada", 21000000],
  ["Calgary International Airport", "YYC", "Calgary", "Canada", 18000000],
  ["Ottawa Macdonald–Cartier Airport", "YOW", "Ottawa", "Canada", 5000000],

  // ── Brazil (Dufry South America) ──
  ["São Paulo–Guarulhos International Airport", "GRU", "São Paulo", "Brazil", 42000000],
  ["Rio de Janeiro/Galeão Airport", "GIG", "Rio de Janeiro", "Brazil", 7400000],

  // ── Argentina ──
  ["Ministro Pistarini International Airport", "EZE", "Buenos Aires", "Argentina", 10000000],

  // ── Uruguay ──
  ["Carrasco International Airport", "MVD", "Montevideo", "Uruguay", 2000000],

  // ── Chile ──
  ["Arturo Merino Benítez International Airport", "SCL", "Santiago", "Chile", 24000000],

  // ── Ecuador ──
  ["Mariscal Sucre International Airport", "UIO", "Quito", "Ecuador", 5000000],
  ["José Joaquín de Olmedo Airport", "GYE", "Guayaquil", "Ecuador", 4000000],

  // ── Dominican Republic ──
  ["Punta Cana International Airport", "PUJ", "Punta Cana", "Dominican Republic", 8000000],

  // ── Caribbean ──
  ["Grantley Adams International Airport", "BGI", "Bridgetown", "Barbados", 2000000],
  ["V. C. Bird International Airport", "ANU", "St. John's", "Antigua", 1000000],
  ["Lynden Pindling International Airport", "NAS", "Nassau", "Bahamas", 3000000],

  // ── Mexico ──
  ["Mexico City International Airport", "MEX", "Mexico City", "Mexico", 50300000],
  ["Cancún International Airport", "CUN", "Cancún", "Mexico", 30700000],
  ["Guadalajara International Airport", "GDL", "Guadalajara", "Mexico", 15000000],
  ["Monterrey International Airport", "MTY", "Monterrey", "Mexico", 13000000],
  ["Puerto Vallarta Airport", "PVR", "Puerto Vallarta", "Mexico", 8000000],
];

// ── Country → region mapping ────────────────────────────────────────────────
const COUNTRY_REGION = {
  "United Kingdom": "Europe", "France": "Europe", "Italy": "Europe", "Spain": "Europe",
  "Portugal": "Europe", "Switzerland": "Europe", "Denmark": "Europe", "Finland": "Europe",
  "Greece": "Europe", "Armenia": "Europe",
  "Jordan": "Middle East", "Kuwait": "Middle East", "Kenya": "Africa",
  "United Arab Emirates": "Middle East", "Tunisia": "Africa",
  "Singapore": "Asia", "Hong Kong": "Asia", "China": "Asia",
  "South Korea": "Asia", "Cambodia": "Asia", "Sri Lanka": "Asia",
  "United States": "Americas", "Canada": "Americas", "Brazil": "Americas",
  "Argentina": "Americas", "Uruguay": "Americas", "Chile": "Americas",
  "Ecuador": "Americas", "Dominican Republic": "Americas",
  "Barbados": "Americas", "Antigua": "Americas", "Bahamas": "Americas",
  "Mexico": "Americas",
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