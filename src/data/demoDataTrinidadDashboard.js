// Caribbean Airlines Duty Free (Trinidad & Tobago) — demo dashboard data.
//
// Two-airport network: POS (Piarco International Airport, Port of Spain) and
// TAB (A.N.R. Robinson International Airport, Tobago). Both airports are served
// by Caribbean Airlines Duty Free — the duty-free arm of the national carrier,
// trading at Piarco and A.N.R. Robinson (dutyfree.caribbean-airlines.com).
//
// Passenger movements: ~3.0M combined (arrivals + departures) across the two
// airports — Airports Authority of Trinidad and Tobago (tntairports.com),
// split ~2.6M Piarco / ~0.4M Tobago.
//
// Outlet mix follows the four-category assortment Caribbean Airlines Duty Free
// carries at both airports — Fragrances & Cosmetics, Wines & Spirits,
// Confectionery and Novelty & Souvenirs — weighted by the CMI Caribbean
// category shares used in the Trinidad & Tobago retailer deck.
//
// Revenue model mirrors the other Caribbean demos (0.01% incremental uplift,
// 2.5% platform fee). Currency: USD.

import { estimateAvgBasketSpend } from "../utils/airportBasketEstimate";

const CONVERSION_RATE = 0.01; // 0.01% — DutyBoost incremental uplift
const PLATFORM_FEE_PCT = 0.025;

const AIRPORTS_FULL = [
  {
    code: "POS",
    name: "Piarco International Airport",
    city: "Port of Spain",
    country: "Trinidad and Tobago",
    region: "Americas",
    annual_pax: 2600000,
    daily_pax: 7123,
  },
  {
    code: "TAB",
    name: "A.N.R. Robinson International Airport",
    city: "Scarborough",
    country: "Trinidad and Tobago",
    region: "Americas",
    annual_pax: 400000,
    daily_pax: 1096,
  },
];

export const AIRPORTS = AIRPORTS_FULL.map(a => ({
  code: a.code,
  name: a.name,
  city: a.city,
  country: a.country,
  annual_pax: a.annual_pax || (a.daily_pax ? a.daily_pax * 365 : 0),
  daily_pax: a.daily_pax || Math.round((a.annual_pax || 0) / 365),
}));

// Outlets per airport. Weights follow the assortment shares of the Trinidad &
// Tobago market (Fragrances & Cosmetics 34%, Wines & Spirits 22%,
// Confectionery 8%, Novelty & Souvenirs 6%), normalised per airport.
const STORE_LAYOUT = {
  POS: [
    "Caribbean Airlines Duty Free – Fragrances & Cosmetics",
    "Caribbean Airlines Duty Free – Wines & Spirits",
    "Caribbean Airlines Duty Free – Confectionery",
    "Caribbean Airlines Duty Free – Novelty & Souvenirs",
  ],
  TAB: [
    "Caribbean Airlines Duty Free – Fragrances & Cosmetics",
    "Caribbean Airlines Duty Free – Wines & Spirits",
    "Caribbean Airlines Duty Free – Confectionery",
  ],
};

const WEIGHTS = {
  POS: [0.49, 0.31, 0.11, 0.09],
  TAB: [0.50, 0.33, 0.17],
};

let _idCounter = 0;
export const RETAILERS = AIRPORTS_FULL.flatMap(airport => {
  const brands = STORE_LAYOUT[airport.code] || [];
  const weights = WEIGHTS[airport.code] || [];
  const basket = estimateAvgBasketSpend(airport);
  const dailyRedemptions = airport.daily_pax * (CONVERSION_RATE / 100);
  const monthlyRedemptions = Math.round(dailyRedemptions * 365 / 12);
  return brands.map((name, i) => {
    _idCounter++;
    const redemptions = Math.round(monthlyRedemptions * weights[i]);
    const revenue = redemptions * basket;
    return {
      id: `${airport.code.toLowerCase()}${_idCounter}`,
      name,
      airport: airport.code,
      category: "Retail",
      redemptions,
      avg_sale: basket,
      revenue,
      contact_person: "Alicia Ramdeen",
      email: "dutyfree@caribbean-airlines.com",
      company: "Caribbean Airlines Duty Free",
      phone: "+1 868 669 3000",
    };
  });
});

export const STORE_COUNT = RETAILERS.length;

const baseMonthlyRedemptions = RETAILERS.reduce((s, r) => s + r.redemptions, 0);
const baseMonthlyRevenue = RETAILERS.reduce((s, r) => s + r.revenue, 0);
const baseDailyRedemptions = Math.round(baseMonthlyRedemptions * 12 / 365);
const baseDailyRevenue = Math.round(baseMonthlyRevenue * 12 / 365);

// Trinidad & Tobago seasonality: peak Jul–Aug (summer diaspora travel) and
// Dec (Christmas), a second lift in Feb (Carnival); trough Sep–Nov (rainy
// season).
const MONTHLY_SEASONALITY = [
  { month: "Jan", mult: 1.00 }, { month: "Feb", mult: 1.15 }, { month: "Mar", mult: 1.00 },
  { month: "Apr", mult: 0.95 }, { month: "May", mult: 0.95 }, { month: "Jun", mult: 1.00 },
  { month: "Jul", mult: 1.20 }, { month: "Aug", mult: 1.15 }, { month: "Sep", mult: 0.80 },
  { month: "Oct", mult: 0.85 }, { month: "Nov", mult: 0.95 }, { month: "Dec", mult: 1.10 },
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