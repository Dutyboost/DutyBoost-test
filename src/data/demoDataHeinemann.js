// Gebr. Heinemann demo data — global airport retailer network.
//
// Covers airports where Gebr. Heinemann operates retail stores (duty free,
// travel value, fashion, specialty) — ALL F&B excluded.
//
// Sources: gebr-heinemann.de (Facts & Figures), Heinemann Annual Report 2024,
// heinemann-shop.com locations, press releases.
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

// ── Frankfurt Airport: 27 Heinemann retail stores (via FAR JV) ──────────────
// Source: Gebr. Heinemann press release (Jan 2017) — FAR operates all 27
// Heinemann Duty Free & Travel Value Shops and Concept Stores at FRA.
const FRA_STORES = [
  "Heinemann Duty Free (Terminal 1, A)",
  "Heinemann Duty Free (Terminal 1, B)",
  "Heinemann Duty Free (Terminal 1, C)",
  "Heinemann Duty Free (Terminal 2, D)",
  "Heinemann Duty Free (Terminal 2, E)",
  "Heinemann Walkthrough (Terminal 1)",
  "Heinemann Walkthrough (Terminal 2)",
  "Frankfurt Airport Retail — Luxury",
  "Frankfurt Airport Retail — Fashion",
  "Frankfurt Airport Retail — Spirits",
  "Frankfurt Airport Retail — Beauty",
  "Frankfurt Airport Retail — Confectionery",
  "Heinemann Travel Value (Pier A)",
  "Heinemann Travel Value (Pier B)",
  "Heinemann Travel Value (Pier C)",
  "Heinemann Travel Value (Pier D)",
  "Heinemann Travel Value (Pier E)",
  "Heinemann Concept Store (T1 A)",
  "Heinemann Concept Store (T1 B)",
  "Heinemann Concept Store (T1 Z)",
  "Heinemann Concept Store (T2 D)",
  "Heinemann Concept Store (T2 E)",
  "Heinemann Beauty (T1 A)",
  "Heinemann Beauty (T1 Z)",
  "Heinemann Fashion (T1 B)",
  "Heinemann Fashion (T2 D)",
  "Heinemann Duty Free (Arrivals T1)",
];

// ── Heinemann retail store brands (NO F&B) ──────────────────────────────────
const HEINEMANN_RETAIL_BRANDS = [
  // Duty Free & Travel Value
  "Heinemann Duty Free", "Heinemann Duty Free & Travel Value",
  "Heinemann Walkthrough", "Heinemann Travel Value",
  "Heinemann Concept Store",
  // JV brands
  "Unifree Duty Free", "ATU Duty Free", "Frankfurt Airport Retail",
  // Fashion & Accessories
  "Hermès", "Gucci", "Burberry", "Hugo Boss", "Lacoste", "Guess",
  "Polo Ralph Lauren", "Samsonite", "Tumi", "Longchamp",
  "Victoria's Secret", "Desigual", "Coach", "Michael Kors",
  // Beauty & Specialty
  "The Body Shop", "Rituals", "Sunglass Hut", "Swarovski",
  "L'Occitane", "MAC Cosmetics", "Montblanc", "Jo Malone",
  // Travel Essentials
  "Relay", "Tech2Go", "World News", "Heinemann Express",
];

const LOCATION_SUFFIXES = [
  "(Terminal 1)", "(Terminal 2)", "(Terminal 3)", "(Pier A)", "(Pier B)",
  "(Pier C)", "(Concourse A)", "(Concourse B)", "(Gate Area)", "(Arrivals)",
  "(Departures)", "(Duty Free Area)",
];

// ── Store count per airport — based on Heinemann's actual retail presence ────
function retailerCount(annualPax, code) {
  const EXPLICIT = {
    "FRA": 27,   // FAR JV — 27 Heinemann stores
    "IST": 15,   // Unifree JV — major Istanbul presence
    "TLV": 8,    // ATU JV — Tel Aviv duty free
    "VIE": 6,    // Austria's largest duty free
    "OSL": 5,    // Heinemann Duty Free Norway (TRN JV)
    "CPH": 5,    // Copenhagen Heinemann stores
    "SYD": 5,    // Heinemann Duty Free Sydney
    "BER": 4,    // Berlin Brandenburg
    "HAM": 4,    // Hamburg (HQ city)
    "DUS": 4,    // Düsseldorf
    "BUD": 4,    // Budapest
    "HEL": 3,    // Helsinki
    "BRU": 3,    // Brussels
    "WAW": 3,    // Warsaw
    "MEL": 4,    // Melbourne
    "BGO": 2,    // Bergen
    "SVG": 2,    // Stavanger
    "TRD": 2,    // Trondheim
    "SZG": 2,    // Salzburg
    "BLQ": 2,    // Bologna
    "PRG": 2,    // Prague
    "LIS": 3,    // Lisbon
    "OPO": 2,    // Porto
    "MLA": 2,    // Malta
    "LCA": 2,    // Larnaca
    "AKL": 2,    // Auckland
    "DTM": 1,    // Dortmund
    "HAJ": 1,    // Hanover
    "GRZ": 1,    // Graz
  };
  if (EXPLICIT[code]) return EXPLICIT[code];

  if (annualPax >= 60_000_000) return 5;
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
  if (airport.code === "FRA") return FRA_STORES.slice(0, count);

  const stores = [];
  const poolSize = HEINEMANN_RETAIL_BRANDS.length;
  const offset = (airport.name.length + airport.code.charCodeAt(0)) % poolSize;

  for (let i = 0; i < count; i++) {
    const baseName = HEINEMANN_RETAIL_BRANDS[(offset + i) % poolSize];
    if (i >= poolSize) {
      const locIdx = Math.floor((i - poolSize) / poolSize) % LOCATION_SUFFIXES.length;
      stores.push(`${baseName} ${LOCATION_SUFFIXES[locIdx]}`);
    } else {
      stores.push(baseName);
    }
  }
  return stores;
}

// ── Heinemann airport list across ~30 countries ──────────────────────────────
// Each entry: [name, code, city, country, annual_pax]
const HEINEMANN_AIRPORTS_RAW = [
  // ── Germany ──
  ["Frankfurt Airport", "FRA", "Frankfurt", "Germany", 59400000],
  ["Berlin Brandenburg Airport", "BER", "Berlin", "Germany", 25700000],
  ["Hamburg Airport", "HAM", "Hamburg", "Germany", 14600000],
  ["Düsseldorf Airport", "DUS", "Düsseldorf", "Germany", 19200000],
  ["Dortmund Airport", "DTM", "Dortmund", "Germany", 3000000],
  ["Hannover Airport", "HAJ", "Hanover", "Germany", 6000000],

  // ── Austria ──
  ["Vienna International Airport", "VIE", "Vienna", "Austria", 31700000],
  ["Salzburg Airport", "SZG", "Salzburg", "Austria", 4700000],
  ["Graz Airport", "GRZ", "Graz", "Austria", 1500000],

  // ── Norway ──
  ["Oslo Airport, Gardermoen", "OSL", "Oslo", "Norway", 28500000],
  ["Bergen Airport, Flesland", "BGO", "Bergen", "Norway", 6300000],
  ["Stavanger Airport, Sola", "SVG", "Stavanger", "Norway", 4500000],
  ["Trondheim Airport, Værnes", "TRD", "Trondheim", "Norway", 4500000],

  // ── Denmark ──
  ["Copenhagen Airport", "CPH", "Copenhagen", "Denmark", 30200000],

  // ── Finland ──
  ["Helsinki Airport", "HEL", "Helsinki", "Finland", 15300000],

  // ── Sweden ──
  ["Stockholm Arlanda Airport", "ARN", "Stockholm", "Sweden", 25100000],
  ["Gothenburg Landvetter Airport", "GOT", "Gothenburg", "Sweden", 6500000],

  // ── Hungary ──
  ["Budapest Ferenc Liszt Airport", "BUD", "Budapest", "Hungary", 15200000],

  // ── Czech Republic ──
  ["Prague Václav Havel Airport", "PRG", "Prague", "Czech Republic", 17800000],

  // ── Poland ──
  ["Warsaw Chopin Airport", "WAW", "Warsaw", "Poland", 21200000],

  // ── Belgium ──
  ["Brussels Airport", "BRU", "Brussels", "Belgium", 22100000],

  // ── Italy ──
  ["Bologna Guglielmo Marconi Airport", "BLQ", "Bologna", "Italy", 10000000],

  // ── Portugal ──
  ["Lisbon Humberto Delgado Airport", "LIS", "Lisbon", "Portugal", 33700000],
  ["Porto Airport", "OPO", "Porto", "Portugal", 15600000],

  // ── Malta ──
  ["Malta International Airport", "MLA", "Luqa", "Malta", 7800000],

  // ── Cyprus ──
  ["Larnaca International Airport", "LCA", "Larnaca", "Cyprus", 8700000],

  // ── Turkey (Unifree JV) ──
  ["Istanbul Airport", "IST", "Istanbul", "Turkey", 64000000],
  ["Sabiha Gökçen International Airport", "SAW", "Istanbul", "Turkey", 35000000],

  // ── Israel (ATU JV) ──
  ["Ben Gurion Airport", "TLV", "Tel Aviv", "Israel", 24000000],

  // ── Australia ──
  ["Sydney Kingsford Smith Airport", "SYD", "Sydney", "Australia", 44400000],
  ["Melbourne Airport", "MEL", "Melbourne", "Australia", 36700000],

  // ── New Zealand ──
  ["Auckland Airport", "AKL", "Auckland", "New Zealand", 20500000],

  // ── Singapore (limited) ──
  ["Singapore Changi Airport", "SIN", "Singapore", "Singapore", 58900000],

  // ── Hong Kong (limited) ──
  ["Hong Kong International Airport", "HKG", "Hong Kong", "Hong Kong", 47000000],

  // ── Saudi Arabia (supply + warehouse) ──
  ["King Abdulaziz International Airport", "JED", "Jeddah", "Saudi Arabia", 41000000],
  ["King Khalid International Airport", "RUH", "Riyadh", "Saudi Arabia", 32100000],

  // ── UAE (regional HQ Dubai) ──
  ["Dubai International Airport", "DXB", "Dubai", "United Arab Emirates", 87100000],

  // ── Switzerland ──
  ["Zurich Airport", "ZRH", "Zurich", "Switzerland", 31800000],
  ["Geneva Airport", "GVA", "Geneva", "Switzerland", 17800000],

  // ── Romania ──
  ["Bucharest Henri Coandă Airport", "OTP", "Bucharest", "Romania", 15500000],

  // ── Ukraine ──
  ["Boryspil International Airport", "KBP", "Kyiv", "Ukraine", 9000000],

  // ── Croatia ──
  ["Zagreb Airport", "ZAG", "Zagreb", "Croatia", 3700000],

  // ── United States (Heinemann Americas) ──
  ["Miami International Airport", "MIA", "Miami", "United States", 50000000],

  // ── Canada ──
  ["Toronto Pearson International Airport", "YYZ", "Toronto", "Canada", 50500000],
  ["Vancouver International Airport", "YVR", "Vancouver", "Canada", 26400000],

  // ── Brazil ──
  ["São Paulo–Guarulhos International Airport", "GRU", "São Paulo", "Brazil", 42000000],

  // ── Chile ──
  ["Arturo Merino Benítez International Airport", "SCL", "Santiago", "Chile", 24000000],
];

// ── Country → region mapping ────────────────────────────────────────────────
const COUNTRY_REGION = {
  "Germany": "Europe", "Austria": "Europe", "Norway": "Europe", "Denmark": "Europe",
  "Finland": "Europe", "Sweden": "Europe", "Hungary": "Europe", "Czech Republic": "Europe",
  "Poland": "Europe", "Belgium": "Europe", "Italy": "Europe", "Portugal": "Europe",
  "Malta": "Europe", "Cyprus": "Europe", "Switzerland": "Europe", "Romania": "Europe",
  "Ukraine": "Europe", "Croatia": "Europe",
  "Turkey": "Middle East", "Israel": "Middle East",
  "Saudi Arabia": "Middle East", "United Arab Emirates": "Middle East",
  "Australia": "Oceania", "New Zealand": "Oceania",
  "Singapore": "Asia", "Hong Kong": "Asia",
  "United States": "Americas", "Canada": "Americas", "Brazil": "Americas", "Chile": "Americas",
};

const heinemannAirportData = HEINEMANN_AIRPORTS_RAW.map(([name, code, city, country, annualPax]) => ({
  name,
  code,
  city,
  country,
  region: COUNTRY_REGION[country] || "Europe",
  annual_pax: annualPax,
  daily_pax: Math.round(annualPax / 365),
}));

export const AIRPORTS_FULL = heinemannAirportData;

export const AIRPORTS = heinemannAirportData.map(a => ({
  code: a.code,
  name: a.name,
  city: a.city,
  country: a.country,
}));

// ── Generate RETAILERS ──────────────────────────────────────────────────────
let _idCounter = 0;

export const RETAILERS = heinemannAirportData.flatMap(airport => {
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
      id: `h${_idCounter}`,
      name: storeNames[i],
      airport: airport.code,
      category: "Retail",
      redemptions,
      avg_sale: basket,
      revenue,
      contact_person: "Maximilian Müller",
      email: "m.mueller@gebr-heinemann.de",
      company: "Gebr. Heinemann SE & Co. KG",
      phone: "+49 40 30 10 20",
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