// Spanish airport retailer demo data — Retail only (no F&B).
//
// Retailer names are real stores operating across the Aena airport network
// (source: aena.es shop directories). Revenue is calculated using the same
// model as the RetailerCalculator:
//   dailyRedemptions = daily_pax × 3%
//   monthlyRedemptions = dailyRedemptions × 365 / 12
//   basket = estimateAvgBasketSpend(airport)  → [€35, €150]
//   grossRevenue = redemptions × basket
// Net revenue / savings / fee computed in the dashboard (calculator model).

import { GLOBAL_AIRPORTS } from "./globalAirports";
import { estimateAvgBasketSpend } from "../utils/airportBasketEstimate";

const CONVERSION_RATE = 3;
const PLATFORM_FEE_PCT = 0.025;

// ── Real retail stores at Madrid Barajas (Aena directory, Retail only) ───────
const MADRID_RETAILERS = [
  "Madrid Duty Free",
  "Express Duty Free",
  "Haute Parfumerie",
  "The Gallery in Madrid",
  "El Mercado Madrid Duty Free",
  "Sunglass Hut",
  "Swarovski",
  "Tous",
  "Mango",
  "Desigual",
  "Lacoste",
  "Boss",
  "Carolina Herrera",
  "Victoria's Secret",
  "The Body Shop",
  "Rituals",
  "Roberto Verino",
  "TAG Heuer",
  "Samsonite",
  "UNOde50",
];

// ── Retail chains operating across Aena airports ───────────────────────────
const AENA_RETAIL_CHAINS = [
  "Duty Free Express",
  "Sunglass Hut",
  "Swarovski",
  "Tous",
  "Mango",
  "Desigual",
  "Lacoste",
  "Boss",
  "Victoria's Secret",
  "The Body Shop",
  "Rituals",
  "La Chinata",
  "Samsonite",
  "Parfois",
  "El Ganso",
  "UNOde50",
  "Longchamp",
  "Marc Jacobs",
  "Victorinox",
  "Relay",
  "WHSmith",
  "InMotion",
  "Point",
  "Natura",
  "World Duty Free",
  "Dufry",
  "Lotte Duty Free",
  "Hudson",
  "Travelista",
];

// ── Number of retailers per airport, based on annual passenger volume ────────
function retailerCount(annualPax) {
  if (annualPax >= 40_000_000) return 8;
  if (annualPax >= 20_000_000) return 6;
  if (annualPax >= 10_000_000) return 5;
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

// ── Filter all Aena-managed airports from the global database ────────────────
// Aena manages ~80 airports worldwide: 46 in Spain, 1 in UK (London Luton),
// 17 in Brazil, 12 in Mexico, 2 in Jamaica.
const AENA_AIRPORT_CODES = [
  // Spain
  "MAD","BCN","PMI","AGP","ALC","LPA","VLC","SVQ","BIO","TFS","TFN","SCQ","GRO",
  "OVD","VGO","MAH","IBZ","FUE","ACE","SPC","GMZ","XRY","ODB","RJL","SLZ","BJZ",
  "EAS","GRX","VLL","VDE","RGS","LCG","SDR","REU","VIT","SLM","PNA","ZAZ","MLN",
  // United Kingdom (London Luton)
  "LTN",
  // Brazil
  "GRU","GIG","BSB","CNF","POA","CGB","MAO","BEL","FOR","NAT","MCZ","VCP","SSA","REC","FLN","JPA",
  // Mexico
  "MEX","CUN","GDL","MTY","TIJ","PVR","SJD","MID","BJX","HMO","CUL","CUU",
  // Jamaica
  "MBJ","KIN",
];

// Airports not present in GLOBAL_AIRPORTS — added manually with realistic pax data
const AENA_EXTRA_AIRPORTS = [
  // Spain (smaller regional airports)
  { name: "Andorra-La Seu d'Urgell Airport", code: "LEU", city: "La Seu d'Urgell", country: "Spain", annual_pax: 50000, daily_pax: 137 },
  { name: "Huesca-Pirineos Airport", code: "HSJ", city: "Huesca", country: "Spain", annual_pax: 25000, daily_pax: 68 },
  { name: "León Airport", code: "OBL", city: "León", country: "Spain", annual_pax: 45000, daily_pax: 123 },
  { name: "Castellón Airport", code: "CDT", city: "Castellón", country: "Spain", annual_pax: 200000, daily_pax: 548 },
  { name: "Albacete Airport", code: "ABC", city: "Albacete", country: "Spain", annual_pax: 10000, daily_pax: 27 },
  { name: "Huelva Airport", code: "HUE", city: "Huelva", country: "Spain", annual_pax: 5000, daily_pax: 14 },
  // Brazil (Aena Northeast concession)
  { name: "Goiânia Airport", code: "GYN", city: "Goiânia", country: "Brazil", annual_pax: 5500000, daily_pax: 15068 },
  { name: "Foz do Iguaçu Airport", code: "IGU", city: "Foz do Iguaçu", country: "Brazil", annual_pax: 2500000, daily_pax: 6849 },
  { name: "Aracaju Airport", code: "AJU", city: "Aracaju", country: "Brazil", annual_pax: 2000000, daily_pax: 5479 },
  { name: "Campina Grande Airport", code: "CPV", city: "Campina Grande", country: "Brazil", annual_pax: 300000, daily_pax: 822 },
  { name: "Juazeiro do Norte Airport", code: "JDO", city: "Juazeiro do Norte", country: "Brazil", annual_pax: 1000000, daily_pax: 2740 },
];

const aenaAirportData = [...GLOBAL_AIRPORTS.filter(a => AENA_AIRPORT_CODES.includes(a.code)), ...AENA_EXTRA_AIRPORTS];

export const AIRPORTS = aenaAirportData.map(a => ({
  code: a.code,
  name: a.name,
  city: a.city,
  country: a.country,
}));

// ── Generate RETAILERS with real store names ────────────────────────────────
let _idCounter = 0;
let _chainIdx = 0;

export const RETAILERS = aenaAirportData.flatMap(airport => {
  const count = retailerCount(airport.annual_pax);
  const basket = estimateAvgBasketSpend(airport);
  const dailyPax = airport.daily_pax || Math.round((airport.annual_pax || 0) / 365);
  const dailyRedemptions = Math.round(dailyPax * (CONVERSION_RATE / 100));
  const monthlyRedemptions = Math.round(dailyRedemptions * 365 / 12);
  const weights = WEIGHTS[count];

  // Madrid uses its real store list; other airports draw from the Aena chain pool
  const namePool = airport.code === "MAD" ? MADRID_RETAILERS : AENA_RETAIL_CHAINS;

  return Array.from({ length: count }, (_, i) => {
    const name = namePool === MADRID_RETAILERS
      ? MADRID_RETAILERS[i % MADRID_RETAILERS.length]
      : AENA_RETAIL_CHAINS[(_chainIdx++) % AENA_RETAIL_CHAINS.length];

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
      contact_person: "Raul Lorenzo Gomez Garcia-Carpintero",
      email: "rgomez@aena.es",
      company: "AENA S.A.",
      phone: "+34 91 321 10 00",
    };
  });
});

// ── Aggregate base figures (average month across all Spanish airports) ────────
const baseMonthlyRedemptions = RETAILERS.reduce((s, r) => s + r.redemptions, 0);
const baseMonthlyRevenue = RETAILERS.reduce((s, r) => s + r.revenue, 0);
const baseDailyRedemptions = Math.round(baseMonthlyRedemptions * 12 / 365);
const baseDailyRevenue = Math.round(baseMonthlyRevenue * 12 / 365);

// ── Seasonal multipliers (Spanish travel patterns) ────────────────────────────
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