export const AIRPORTS = [
  { code: "MAD", name: "Madrid Barajas", city: "Madrid" },
  { code: "BCN", name: "Barcelona El Prat", city: "Barcelona" },
  { code: "PMI", name: "Palma de Mallorca", city: "Palma" },
  { code: "AGP", name: "Málaga Costa del Sol", city: "Málaga" },
  { code: "ALC", name: "Alicante-Elche", city: "Alicante" },
];

export const RETAILERS = [
  // Madrid Barajas (15) - 50% of DutyBoost volume
  { id: "r1",  name: "The Style Loft",           airport: "MAD", category: "Retail",          redemptions: 3230,  avg_sale: 185, revenue: 597550 },
  { id: "r2",  name: "Tulip & Souvenir Co.",     airport: "MAD", category: "Retail",          redemptions: 4850,  avg_sale: 68,  revenue: 329800 },
  { id: "r3",  name: "The Amber Tap",            airport: "MAD", category: "Food & Beverage", redemptions: 6840,  avg_sale: 32,  revenue: 218880 },
  { id: "r4",  name: "Gateway Duty Free",        airport: "MAD", category: "Retail",          redemptions: 11780, avg_sale: 220, revenue: 2591600 },
  { id: "r5",  name: "Bloom Beauty Shop",        airport: "MAD", category: "Retail",          redemptions: 4560,  avg_sale: 95,  revenue: 433200 },
  { id: "r6",  name: "Le Petit Bistro",          airport: "MAD", category: "Food & Beverage", redemptions: 3700,  avg_sale: 28,  revenue: 103600 },
  { id: "r7",  name: "Prestige Wines & Spirits", airport: "MAD", category: "Retail",          redemptions: 8170,  avg_sale: 145, revenue: 1184650 },
  { id: "r8",  name: "Elara Fashion MAD",        airport: "MAD", category: "Retail",          redemptions: 2040,  avg_sale: 310, revenue: 632400 },
  { id: "r9",  name: "Riviera Apparel",          airport: "MAD", category: "Retail",          redemptions: 1810,  avg_sale: 180, revenue: 325800 },
  { id: "r10", name: "Lumière Jewels",           airport: "MAD", category: "Retail",          redemptions: 900,   avg_sale: 780, revenue: 702000 },
  { id: "r11", name: "QuickBite Terminal 2",      airport: "MAD", category: "Food & Beverage", redemptions: 8650,  avg_sale: 18,  revenue: 155700 },
  { id: "r12", name: "Frost & Cream",            airport: "MAD", category: "Food & Beverage", redemptions: 6080,  avg_sale: 14,  revenue: 85120 },
  { id: "r13", name: "Cacao House",              airport: "MAD", category: "Retail",          redemptions: 2950,  avg_sale: 55,  revenue: 162250 },
  { id: "r14", name: "Chronos Boutique",         airport: "MAD", category: "Retail",          redemptions: 680,   avg_sale: 940, revenue: 639200 },
  { id: "r15", name: "Crystal & Co.",            airport: "MAD", category: "Retail",          redemptions: 2520,  avg_sale: 120, revenue: 302400 },

  // Barcelona El Prat (7) - 20% of DutyBoost volume
  { id: "r16", name: "Harbor Duty Free",         airport: "BCN", category: "Retail",          redemptions: 3230,  avg_sale: 130, revenue: 419900 },
  { id: "r17", name: "Fresh Stop BCN",           airport: "BCN", category: "Food & Beverage", redemptions: 2280,  avg_sale: 22,  revenue: 50160 },
  { id: "r18", name: "Metro Style",              airport: "BCN", category: "Retail",          redemptions: 1660,  avg_sale: 95,  revenue: 157700 },
  { id: "r19", name: "Delta Gifts",              airport: "BCN", category: "Retail",          redemptions: 2020,  avg_sale: 35,  revenue: 70700 },
  { id: "r20", name: "The Hop House BCN",        airport: "BCN", category: "Food & Beverage", redemptions: 2900,  avg_sale: 25,  revenue: 72500 },
  { id: "r21", name: "Noir Parfumerie",          airport: "BCN", category: "Retail",          redemptions: 1450,  avg_sale: 175, revenue: 253750 },
  { id: "r22", name: "Brewpoint Café",           airport: "BCN", category: "Food & Beverage", redemptions: 3640,  avg_sale: 16,  revenue: 58240 },

  // Palma de Mallorca (6) - 15% of DutyBoost volume
  { id: "r23", name: "Innovate Duty Free",       airport: "PMI", category: "Retail",          redemptions: 2560,  avg_sale: 110, revenue: 281600 },
  { id: "r24", name: "Pixel & Craft Gifts",      airport: "PMI", category: "Retail",          redemptions: 1350,  avg_sale: 42,  revenue: 56700 },
  { id: "r25", name: "Runway Lounge Bar",        airport: "PMI", category: "Food & Beverage", redemptions: 1990,  avg_sale: 24,  revenue: 47760 },
  { id: "r26", name: "Stratos Apparel",          airport: "PMI", category: "Retail",          redemptions: 930,   avg_sale: 160, revenue: 148800 },
  { id: "r27", name: "The Boarding Pantry",      airport: "PMI", category: "Food & Beverage", redemptions: 2520,  avg_sale: 19,  revenue: 47880 },
  { id: "r28", name: "Crafted Works PMI",        airport: "PMI", category: "Retail",          redemptions: 1210,  avg_sale: 78,  revenue: 94380 },

  // Málaga Costa del Sol (4) - 10% of DutyBoost volume
  { id: "r29", name: "Northgate Duty Free",      airport: "AGP", category: "Retail",          redemptions: 1000,  avg_sale: 98,  revenue: 98000 },
  { id: "r30", name: "Costa del Sol Mementos",   airport: "AGP", category: "Retail",          redemptions: 735,   avg_sale: 30,  revenue: 22050 },
  { id: "r31", name: "Café Andaluz",             airport: "AGP", category: "Food & Beverage", redemptions: 1140,  avg_sale: 18,  revenue: 20520 },
  { id: "r32", name: "Iberian Spirits",          airport: "AGP", category: "Retail",          redemptions: 880,   avg_sale: 120, revenue: 105600 },

  // Alicante-Elche (3) - 5% of DutyBoost volume
  { id: "r33", name: "Southgate Duty Free",      airport: "ALC", category: "Retail",          redemptions: 1260,  avg_sale: 105, revenue: 132300 },
  { id: "r34", name: "Côte d'Or Bistro",         airport: "ALC", category: "Food & Beverage", redemptions: 1620,  avg_sale: 30,  revenue: 48600 },
  { id: "r35", name: "Moselle Gift House",       airport: "ALC", category: "Retail",          redemptions: 950,   avg_sale: 48,  revenue: 45600 },
];

export const MONTHLY_DATA = [
  { month: "Oct", redemptions: 12580, revenue: 2224500, commission: 55612.50 },
  { month: "Nov", redemptions: 15960, revenue: 2826000, commission: 70650.00 },
  { month: "Dec", redemptions: 24160, revenue: 4305000, commission: 107625.00 },
  { month: "Jan", redemptions: 14060, revenue: 2488500, commission: 62212.50 },
  { month: "Feb", redemptions: 16820, revenue: 2979000, commission: 74475.00 },
  { month: "Mar", redemptions: 21080, revenue: 3735000, commission: 93375.00 },
];

export const YEARLY_DATA = [
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

export const DAILY_DATA = [
  { day: "28 Mar", redemptions: 640, revenue: 113400 },
  { day: "29 Mar", redemptions: 580, revenue: 102900 },
  { day: "30 Mar", redemptions: 840, revenue: 148800 },
  { day: "31 Mar", redemptions: 930, revenue: 164700 },
  { day: "1 Apr", redemptions: 745, revenue: 132000 },
  { day: "2 Apr", redemptions: 1020, revenue: 180900 },
  { day: "3 Apr", redemptions: 1110, revenue: 196800 },
];