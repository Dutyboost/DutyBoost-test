// DutyBoost demo data — Netherlands airports.
//
// Conversion rate: percentage of departing travelers who convert through DutyBoost.
// ETRC/m1nd-Set benchmark: 15–25% of travelers shop before departure.
// DutyBoost target: 0.01% incremental uplift on top of existing shopping rate.
// Retailer data below is scaled from a 15% baseline to reflect the 0.01% target.
// Agency data uses a separate DutyCredit redemption rate (~12%) — unchanged.

const CONVERSION_RATE = 0.01; // 0.01% — DutyBoost incremental uplift
const SCALE = CONVERSION_RATE / 15; // scale from original 15% baseline

export const AIRPORTS = [
  { code: "AMS", name: "Amsterdam Schiphol", city: "Amsterdam", country: "Netherlands" },
  { code: "RTM", name: "Rotterdam The Hague", city: "Rotterdam", country: "Netherlands" },
  { code: "EIN", name: "Eindhoven Airport", city: "Eindhoven", country: "Netherlands" },
  { code: "GRQ", name: "Groningen Airport Eelde", city: "Groningen", country: "Netherlands" },
  { code: "MST", name: "Maastricht Aachen Airport", city: "Maastricht", country: "Netherlands" },
];

// Travel agencies use DutyCredit redemption rate (~12%), not airport conversion — unchanged
export const TRAVEL_AGENCIES = [
  // Based on 2025 Netherlands travel agency market data (€35.9B, ~20M bookings annually)
  { id: "ag1", name: "Horizon Travel Group", city: "Rotterdam", bookings: 8420, travelers: 16840, redeemed: 3856, commission: 2313.60 },
  { id: "ag2", name: "Skybound Holidays", city: "Rijswijk", bookings: 11250, travelers: 22500, redeemed: 6187, commission: 3712.20 },
  { id: "ag3", name: "Compass Reizen", city: "Barendrecht", bookings: 6840, travelers: 13680, redeemed: 3280, commission: 1968.00 },
  { id: "ag4", name: "Voyago Travel", city: "Amsterdam", bookings: 5280, travelers: 10560, redeemed: 1980, commission: 1188.00 },
  { id: "ag5", name: "Bluewave Vakanties", city: "Amsterdam", bookings: 3960, travelers: 7920, redeemed: 1704, commission: 1022.40 },
  { id: "ag6", name: "Windrose Tours", city: "Eindhoven", bookings: 3420, travelers: 6840, redeemed: 1314, commission: 788.40 },
  { id: "ag7", name: "Meridian Reizen", city: "Den Haag", bookings: 5980, travelers: 11960, redeemed: 2772, commission: 1663.20 },
  { id: "ag8", name: "NordVlieg Vakanties", city: "Groningen", bookings: 2560, travelers: 5120, redeemed: 972, commission: 583.20 },
  { id: "ag9", name: "SunRoute Travel", city: "Maastricht", bookings: 4680, travelers: 9360, redeemed: 1972, commission: 1183.20 },
  { id: "ag10", name: "Jetstream Holidays", city: "Amsterdam", bookings: 9180, travelers: 18360, redeemed: 4816, commission: 2889.60 },
  { id: "ag11", name: "Palmera Reizen", city: "Amsterdam", bookings: 4100, travelers: 8200, redeemed: 1861, commission: 1116.60 },
];

// ── Base retailer data (at 15% baseline) — scaled to 4% at export ─────────────
const _RETAILERS = [
  // Total market: 78.4M passengers, €1.05B retail sales
  // 35 shops total: 15 AMS, 7 RTM, 6 EIN, 4 GRQ, 3 MST

  // Amsterdam Schiphol (15) - 50% of DutyBoost volume
  { id: "r1",  name: "The Style Loft",           airport: "AMS", category: "Retail",          redemptions: 3230,  avg_sale: 185, revenue: 597550 },
  { id: "r2",  name: "Tulip & Souvenir Co.",     airport: "AMS", category: "Retail",          redemptions: 4850,  avg_sale: 68,  revenue: 329800 },
  { id: "r3",  name: "The Amber Tap",            airport: "AMS", category: "Food & Beverage", redemptions: 6840,  avg_sale: 32,  revenue: 218880 },
  { id: "r4",  name: "Gateway Duty Free",        airport: "AMS", category: "Retail",          redemptions: 11780, avg_sale: 220, revenue: 2591600 },
  { id: "r5",  name: "Bloom Beauty Shop",        airport: "AMS", category: "Retail",          redemptions: 4560,  avg_sale: 95,  revenue: 433200 },
  { id: "r6",  name: "Le Petit Bistro",          airport: "AMS", category: "Food & Beverage", redemptions: 3700,  avg_sale: 28,  revenue: 103600 },
  { id: "r7",  name: "Prestige Wines & Spirits", airport: "AMS", category: "Retail",          redemptions: 8170,  avg_sale: 145, revenue: 1184650 },
  { id: "r8",  name: "Elara Fashion AMS",        airport: "AMS", category: "Retail",          redemptions: 2040,  avg_sale: 310, revenue: 632400 },
  { id: "r9",  name: "Riviera Apparel",          airport: "AMS", category: "Retail",          redemptions: 1810,  avg_sale: 180, revenue: 325800 },
  { id: "r10", name: "Lumière Jewels",           airport: "AMS", category: "Retail",          redemptions: 900,   avg_sale: 780, revenue: 702000 },
  { id: "r11", name: "QuickBite Terminal 2",     airport: "AMS", category: "Food & Beverage", redemptions: 8650,  avg_sale: 18,  revenue: 155700 },
  { id: "r12", name: "Frost & Cream",            airport: "AMS", category: "Food & Beverage", redemptions: 6080,  avg_sale: 14,  revenue: 85120 },
  { id: "r13", name: "Cacao House",              airport: "AMS", category: "Retail",          redemptions: 2950,  avg_sale: 55,  revenue: 162250 },
  { id: "r14", name: "Chronos Boutique",         airport: "AMS", category: "Retail",          redemptions: 680,   avg_sale: 940, revenue: 639200 },
  { id: "r15", name: "Crystal & Co.",            airport: "AMS", category: "Retail",          redemptions: 2520,  avg_sale: 120, revenue: 302400 },

  // Rotterdam The Hague (7) - 20% of DutyBoost volume
  { id: "r16", name: "Harbor Duty Free",         airport: "RTM", category: "Retail",          redemptions: 3230,  avg_sale: 130, revenue: 419900 },
  { id: "r17", name: "Fresh Stop RTM",           airport: "RTM", category: "Food & Beverage", redemptions: 2280,  avg_sale: 22,  revenue: 50160 },
  { id: "r18", name: "Metro Style",              airport: "RTM", category: "Retail",          redemptions: 1660,  avg_sale: 95,  revenue: 157700 },
  { id: "r19", name: "Delta Gifts",              airport: "RTM", category: "Retail",          redemptions: 2020,  avg_sale: 35,  revenue: 70700 },
  { id: "r20", name: "The Hop House RTM",        airport: "RTM", category: "Food & Beverage", redemptions: 2900,  avg_sale: 25,  revenue: 72500 },
  { id: "r21", name: "Noir Parfumerie",          airport: "RTM", category: "Retail",          redemptions: 1450,  avg_sale: 175, revenue: 253750 },
  { id: "r22", name: "Brewpoint Café",           airport: "RTM", category: "Food & Beverage", redemptions: 3640,  avg_sale: 16,  revenue: 58240 },

  // Eindhoven (6) - 15% of DutyBoost volume
  { id: "r23", name: "Innovate Duty Free",       airport: "EIN", category: "Retail",          redemptions: 2560,  avg_sale: 110, revenue: 281600 },
  { id: "r24", name: "Pixel & Craft Gifts",      airport: "EIN", category: "Retail",          redemptions: 1350,  avg_sale: 42,  revenue: 56700 },
  { id: "r25", name: "Runway Lounge Bar",        airport: "EIN", category: "Food & Beverage", redemptions: 1990,  avg_sale: 24,  revenue: 47760 },
  { id: "r26", name: "Stratos Apparel",          airport: "EIN", category: "Retail",          redemptions: 930,   avg_sale: 160, revenue: 148800 },
  { id: "r27", name: "The Boarding Pantry",      airport: "EIN", category: "Food & Beverage", redemptions: 2520,  avg_sale: 19,  revenue: 47880 },
  { id: "r28", name: "Crafted Works EIN",        airport: "EIN", category: "Retail",          redemptions: 1210,  avg_sale: 78,  revenue: 94380 },

  // Groningen (4) - 10% of DutyBoost volume
  { id: "r29", name: "Northgate Duty Free",      airport: "GRQ", category: "Retail",          redemptions: 1000,  avg_sale: 98,  revenue: 98000 },
  { id: "r30", name: "Eelde Mementos",           airport: "GRQ", category: "Retail",          redemptions: 735,   avg_sale: 30,  revenue: 22050 },
  { id: "r31", name: "Café Noorderzon",          airport: "GRQ", category: "Food & Beverage", redemptions: 1140,  avg_sale: 18,  revenue: 20520 },
  { id: "r32", name: "Nordic Spirits",           airport: "GRQ", category: "Retail",          redemptions: 880,   avg_sale: 120, revenue: 105600 },

  // Maastricht (3) - 5% of DutyBoost volume
  { id: "r33", name: "Southgate Duty Free",      airport: "MST", category: "Retail",          redemptions: 1260,  avg_sale: 105, revenue: 132300 },
  { id: "r34", name: "Côte d'Or Bistro",         airport: "MST", category: "Food & Beverage", redemptions: 1620,  avg_sale: 30,  revenue: 48600 },
  { id: "r35", name: "Moselle Gift House",       airport: "MST", category: "Retail",          redemptions: 950,   avg_sale: 48,  revenue: 45600 },
];

// Scale retailer data from 15% baseline to 4% target conversion rate
export const RETAILERS = _RETAILERS.map(r => ({
  ...r,
  redemptions: Math.round(r.redemptions * SCALE),
  revenue: Math.round(r.redemptions * SCALE) * r.avg_sale,
  contact_person: "Sofie van der Meer",
  email: "sofie.vandermeer@lagardere-travel.com",
  company: "Lagardère Travel Retail Netherlands",
  phone: "+31 20 653 55 55",
}));

// ── Base monthly data (at 15% baseline) — scaled to 4% at export ──────────────
const _MONTHLY_DATA = [
  { month: "Oct", redemptions: 12580, revenue: 2224500, commission: 55612.50 },
  { month: "Nov", redemptions: 15960, revenue: 2826000, commission: 70650.00 },
  { month: "Dec", redemptions: 24160, revenue: 4305000, commission: 107625.00 },
  { month: "Jan", redemptions: 14060, revenue: 2488500, commission: 62212.50 },
  { month: "Feb", redemptions: 16820, revenue: 2979000, commission: 74475.00 },
  { month: "Mar", redemptions: 21080, revenue: 3735000, commission: 93375.00 },
];

export const MONTHLY_DATA = _MONTHLY_DATA.map(m => ({
  ...m,
  redemptions: Math.round(m.redemptions * SCALE),
  revenue: Math.round(m.revenue * SCALE),
  commission: Math.round(m.revenue * SCALE * 0.025 * 100) / 100,
}));

const _YEARLY_DATA = [
  { month: "Apr", redemptions: 9760, revenue: 1728000, commission: 43200 },
  { month: "May", redemptions: 10840, revenue: 1920000, commission: 48000 },
  { month: "Jun", redemptions: 13580, revenue: 2406000, commission: 60150 },
  { month: "Jul", redemptions: 19220, revenue: 3405000, commission: 85125 },
  { month: "Aug", redemptions: 21640, revenue: 3834000, commission: 95850 },
  { month: "Sep", redemptions: 14940, revenue: 2646000, commission: 66150 },
  { month: "Oct", redemptions: 12580, revenue: 2224500, commission: 55612.50 },
  { month: "Nov", redemptions: 15960, revenue: 2826000, commission: 70650.00 },
  { month: "Dec", redemptions: 24160, revenue: 4305000, commission: 107625.00 },
  { month: "Jan", redemptions: 14060, revenue: 2488500, commission: 62212.50 },
  { month: "Feb", redemptions: 16820, revenue: 2979000, commission: 74475.00 },
  { month: "Mar", redemptions: 21080, revenue: 3735000, commission: 93375.00 },
];

export const YEARLY_DATA = _YEARLY_DATA.map(m => ({
  ...m,
  redemptions: Math.round(m.redemptions * SCALE),
  revenue: Math.round(m.revenue * SCALE),
  commission: Math.round(m.revenue * SCALE * 0.025 * 100) / 100,
}));

const _DAILY_DATA = [
  { day: "28 Mar", redemptions: 640, revenue: 113400 },
  { day: "29 Mar", redemptions: 580, revenue: 102900 },
  { day: "30 Mar", redemptions: 840, revenue: 148800 },
  { day: "31 Mar", redemptions: 930, revenue: 164700 },
  { day: "1 Apr", redemptions: 745, revenue: 132000 },
  { day: "2 Apr", redemptions: 1020, revenue: 180900 },
  { day: "3 Apr", redemptions: 1110, revenue: 196800 },
];

export const DAILY_DATA = _DAILY_DATA.map(d => ({
  ...d,
  redemptions: Math.round(d.redemptions * SCALE),
  revenue: Math.round(d.revenue * SCALE),
}));

// ── Agency data (DutyCredit redemption rate ~12%, not airport conversion) ────
export const AGENCY_YEARLY = [
  // Based on all 11 travel agencies aggregated (avg 12% redemption rate, €0.60 per booking commission)
  { month: "Apr", bookings: 42840, redeemed: 5140, earned: 25704 },
  { month: "May", bookings: 49260, redeemed: 5911, earned: 29556 },
  { month: "Jun", bookings: 61380, redeemed: 7366, earned: 36828 },
  { month: "Jul", bookings: 87120, redeemed: 10454, earned: 52272 },
  { month: "Aug", bookings: 97680, redeemed: 11722, earned: 58608 },
  { month: "Sep", bookings: 67020, redeemed: 8042, earned: 40212 },
  { month: "Oct", bookings: 58140, redeemed: 6977, earned: 34884 },
  { month: "Nov", bookings: 71820, redeemed: 8619, earned: 43092 },
  { month: "Dec", bookings: 108240, redeemed: 12989, earned: 65136 },
  { month: "Jan", bookings: 61380, redeemed: 7366, earned: 36828 },
  { month: "Feb", bookings: 73500, redeemed: 8820, earned: 44100 },
  { month: "Mar", bookings: 90480, redeemed: 10858, earned: 54288 },
];

export const AGENCY_MONTHLY = [
  { month: "Oct", bookings: 58140, redeemed: 6977, earned: 34884 },
  { month: "Nov", bookings: 71820, redeemed: 8619, earned: 43092 },
  { month: "Dec", bookings: 108240, redeemed: 12989, earned: 65136 },
  { month: "Jan", bookings: 61380, redeemed: 7366, earned: 36828 },
  { month: "Feb", bookings: 73500, redeemed: 8820, earned: 44100 },
  { month: "Mar", bookings: 90480, redeemed: 10858, earned: 54288 },
];

export const AGENCY_DAILY = [
  // Aggregated from all 11 agencies
  { day: "28 Mar", bookings: 2745, redeemed: 329 },
  { day: "29 Mar", bookings: 2261, redeemed: 271 },
  { day: "30 Mar", bookings: 3636, redeemed: 436 },
  { day: "31 Mar", bookings: 4199, redeemed: 504 },
  { day: "1 Apr", bookings: 3148, redeemed: 378 },
  { day: "2 Apr", bookings: 4681, redeemed: 562 },
  { day: "3 Apr", bookings: 5088, redeemed: 611 },
];