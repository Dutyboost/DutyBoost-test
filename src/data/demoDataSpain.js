// Aena airport retail demo data — Retail only (no F&B).
//
// Based on the official Aena airport network (source: aena.es company profile):
//   46 airports in Spain + London Luton, Leeds Bradford, Newcastle (UK) +
//   17 airports in Brazil (Aena Brasil) + 12 in Mexico + 2 in Jamaica.
//   Total: 80 airports (source: aena.es/en/corporative/about-aena/annual-figures.html)
//
// Passenger data: Aena/Wikipedia 2024-2025 statistics.
// Revenue model (incremental uplift from DutyBoost):
//   dailyRedemptions = daily_pax × 0.01%   (DutyBoost's incremental shopper uplift)
//   monthlyRedemptions = dailyRedemptions × 365 / 12
//   basket = estimateAvgBasketSpend(airport)  → [€20, €150]
//   grossRevenue = redemptions × basket
//
// 0.01% reflects DutyBoost's stated minimum incremental uplift on top of the
// existing 15–25% airport shopping rate (ETRC / m1nd-set research).

import { estimateAvgBasketSpend } from "../utils/airportBasketEstimate";

const CONVERSION_RATE = 0.01; // 0.01% — DutyBoost incremental uplift
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

// ── Complete Aena airport network (source: aena.es company profile) ──────────
// 46 airports in Spain (excludes 2 heliports: Ceuta, Algeciras), 3 in UK,
// 17 in Brazil, 12 in Mexico, 2 in Jamaica. Total: 80 airports.
// Passenger data: Aena 2024-2025 statistics / Wikipedia.
const AENA_AIRPORTS_RAW = [
  // ── Spain (46 airports — excludes heliports Ceuta & Algeciras only) ──
  ["Adolfo Suárez Madrid-Barajas Airport", "MAD", "Madrid", "Spain", 68179054],
  ["Josep Tarradellas Barcelona-El Prat Airport", "BCN", "Barcelona", "Spain", 57483036],
  ["Palma de Mallorca Airport", "PMI", "Palma de Mallorca", "Spain", 33806427],
  ["Málaga-Costa del Sol Airport", "AGP", "Málaga", "Spain", 26760549],
  ["Alicante-Elche Miguel Hernández Airport", "ALC", "Alicante", "Spain", 19950394],
  ["Gran Canaria Airport", "LPA", "Las Palmas", "Spain", 15826553],
  ["Tenerife South Airport", "TFS", "Tenerife", "Spain", 13969678],
  ["Valencia Airport", "VLC", "Valencia", "Spain", 11847527],
  ["Sevilla Airport", "SVQ", "Sevilla", "Spain", 9686487],
  ["Ibiza Airport", "IBZ", "Ibiza", "Spain", 9138224],
  ["César Manrique-Lanzarote Airport", "ACE", "Lanzarote", "Spain", 8920901],
  ["Tenerife Norte-Ciudad de La Laguna Airport", "TFN", "Tenerife", "Spain", 7174977],
  ["Bilbao Airport", "BIO", "Bilbao", "Spain", 7062681],
  ["Fuerteventura Airport", "FUE", "Fuerteventura", "Spain", 6886935],
  ["Menorca Airport", "MAH", "Menorca", "Spain", 4210152],
  ["Santiago-Rosalía de Castro Airport", "SCQ", "Santiago de Compostela", "Spain", 3120759],
  ["Girona-Costa Brava Airport", "GRO", "Girona", "Spain", 2185561],
  ["Asturias Airport", "OVD", "Avilés", "Spain", 2051342],
  ["La Palma Airport", "SPC", "La Palma", "Spain", 1533355],
  ["Reus Airport", "REU", "Reus", "Spain", 1336826],
  ["A Coruña Airport", "LCG", "A Coruña", "Spain", 1292166],
  ["Seve Ballesteros-Santander Airport", "SDR", "Santander", "Spain", 1100000],
  ["Vigo Airport", "VGO", "Vigo", "Spain", 1000000],
  ["Federico García Lorca Granada-Jaén Airport", "GRX", "Granada", "Spain", 900000],
  ["Jerez Airport", "XRY", "Jerez", "Spain", 800000],
  ["Almería Airport", "LEI", "Almería", "Spain", 1100000],
  ["Internacional Región de Murcia Airport", "RMU", "Murcia", "Spain", 600000],
  ["Valladolid Airport", "VLL", "Valladolid", "Spain", 400000],
  ["Melilla Airport", "MLN", "Melilla", "Spain", 400000],
  ["Pamplona Airport", "PNA", "Pamplona", "Spain", 300000],
  ["San Sebastián Airport", "EAS", "San Sebastián", "Spain", 300000],
  ["Vitoria Airport", "VIT", "Vitoria", "Spain", 300000],
  ["Zaragoza Airport", "ZAZ", "Zaragoza", "Spain", 500000],
  ["El Hierro Airport", "VDE", "El Hierro", "Spain", 200000],
  ["Logroño-Agoncillo Airport", "RJL", "Logroño", "Spain", 100000],
  ["Badajoz Airport", "BJZ", "Badajoz", "Spain", 50000],
  ["La Gomera Airport", "GMZ", "La Gomera", "Spain", 50000],
  ["León Airport", "LEN", "León", "Spain", 40000],
  ["Huesca-Pirineos Airport", "HSK", "Huesca", "Spain", 25000],
  ["Albacete Airport", "ABC", "Albacete", "Spain", 10000],
  ["Burgos Airport", "RGS", "Burgos", "Spain", 10000],
  ["Córdoba Airport", "ODB", "Córdoba", "Spain", 30000],
  ["Salamanca Airport", "SLM", "Salamanca", "Spain", 15000],
  ["Madrid-Cuatro Vientos Airport", "MCV", "Madrid", "Spain", 67360],
  ["Sabadell Airport", "QSA", "Sabadell", "Spain", 1000],
  ["Son Bonet Airport", "SBO", "Mallorca", "Spain", 1000],

  // ── United Kingdom (3 airports) ──
  ["London Luton Airport", "LTN", "London", "United Kingdom", 16000000],
  ["Leeds Bradford Airport", "LBA", "Leeds", "United Kingdom", 4000000],
  ["Newcastle International Airport", "NCL", "Newcastle", "United Kingdom", 5000000],

  // ── Brazil — Aena Brasil Northeast (6 airports, since 2020) ──
  ["Recife Guararapes–Gilberto Freyre International Airport", "REC", "Recife", "Brazil", 9500000],
  ["Maceió–Zumbi dos Palmares International Airport", "MCZ", "Maceió", "Brazil", 2200000],
  ["João Pessoa–Presidente Castro Pinto International Airport", "JPA", "João Pessoa", "Brazil", 900000],
  ["Aracaju–Santa Maria Airport", "AJU", "Aracaju", "Brazil", 2000000],
  ["Juazeiro do Norte–Orlando Bezerra de Menezes Airport", "JDO", "Juazeiro do Norte", "Brazil", 1000000],
  ["Campina Grande–Presidente João Suassuna Airport", "CPV", "Campina Grande", "Brazil", 300000],

  // ── Brazil — Aena Brasil South/Midwest (11 airports, since 2023) ──
  ["São Paulo/Congonhas Airport", "CGH", "São Paulo", "Brazil", 22000000],
  ["Campo Grande International Airport", "CGR", "Campo Grande", "Brazil", 1500000],
  ["Corumbá International Airport", "CMG", "Corumbá", "Brazil", 100000],
  ["Ponta Porã International Airport", "PMG", "Ponta Porã", "Brazil", 50000],
  ["Santarém–Maestro Wilson Fonseca Airport", "STM", "Santarém", "Brazil", 500000],
  ["Marabá–João Correa da Rocha Airport", "MAB", "Marabá", "Brazil", 300000],
  ["Carajás Airport", "CKS", "Parauapebas", "Brazil", 200000],
  ["Altamira Airport", "ATM", "Altamira", "Brazil", 100000],
  ["Uberlândia–Tenente Coronel Aviador César Bombonato Airport", "UDI", "Uberlândia", "Brazil", 2500000],
  ["Uberaba–Mário de Almeida Franco Airport", "UBA", "Uberaba", "Brazil", 500000],
  ["Montes Claros–Mário Ribeiro Airport", "MOC", "Montes Claros", "Brazil", 300000],

  // ── Mexico (12 airports) ──
  ["Aguascalientes International Airport", "AGU", "Aguascalientes", "Mexico", 500000],
  ["Guadalajara International Airport", "GDL", "Guadalajara", "Mexico", 16000000],
  ["Del Bajío International Airport", "BJX", "Guanajuato", "Mexico", 2000000],
  ["Hermosillo International Airport", "HMO", "Hermosillo", "Mexico", 2500000],
  ["Manuel Márquez de León International Airport", "LAP", "La Paz", "Mexico", 1000000],
  ["Los Cabos International Airport", "SJD", "Los Cabos", "Mexico", 5000000],
  ["Federal del Valle del Fuerte International Airport", "LMM", "Los Mochis", "Mexico", 200000],
  ["Playa de Oro International Airport", "ZLO", "Manzanillo", "Mexico", 300000],
  ["Mexicali International Airport", "MXL", "Mexicali", "Mexico", 1000000],
  ["General Francisco J. Mújica International Airport", "MLM", "Morelia", "Mexico", 700000],
  ["Gustavo Díaz Ordaz International Airport", "PVR", "Puerto Vallarta", "Mexico", 5000000],
  ["Tijuana International Airport", "TIJ", "Tijuana", "Mexico", 7000000],

  // ── Jamaica (2 airports) ──
  ["Sangster International Airport", "MBJ", "Montego Bay", "Jamaica", 4500000],
  ["Norman Manley International Airport", "KIN", "Kingston", "Jamaica", 2000000],
];

// ── Country → region mapping ─────────────────────────────────────────────────
const COUNTRY_REGION = {
  "Spain": "Europe", "United Kingdom": "Europe",
  "Brazil": "Americas", "Mexico": "Americas", "Jamaica": "Americas",
};

// Normalize per-airport figures to Aena's reported network total of
// 384.8M annual passengers (~1.05M daily) so the presentation and dashboards
// reflect the official figure rather than the sum of inflated raw estimates.
const AENA_TARGET_ANNUAL_PAX = 384_800_000;
const AENA_PAX_SCALE = AENA_TARGET_ANNUAL_PAX / AENA_AIRPORTS_RAW.reduce((s, a) => s + a[4], 0);

const aenaAirportData = AENA_AIRPORTS_RAW.map(([name, code, city, country, annualPax]) => {
  const scaledAnnual = Math.round(annualPax * AENA_PAX_SCALE);
  return {
    name,
    code,
    city,
    country,
    region: COUNTRY_REGION[country] || "Europe",
    annual_pax: scaledAnnual,
    daily_pax: Math.round(scaledAnnual / 365),
  };
});

export const AIRPORTS_FULL = aenaAirportData;

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
  const dailyRedemptions = dailyPax * (CONVERSION_RATE / 100);
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

// ── Store count — official Aena figure: 335 retail shops across its network
export const STORE_COUNT = 335;

// ── Aggregate base figures (average month across all Aena airports) ────────
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