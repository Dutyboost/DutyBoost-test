export const AIRPORTS = [
  { code: "AMS", name: "Amsterdam Schiphol", city: "Amsterdam" },
  { code: "RTM", name: "Rotterdam The Hague", city: "Rotterdam" },
  { code: "EIN", name: "Eindhoven Airport", city: "Eindhoven" },
  { code: "GRQ", name: "Groningen Airport Eelde", city: "Groningen" },
  { code: "MST", name: "Maastricht Aachen Airport", city: "Maastricht" },
];

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

export const RETAILERS = [
  // Amsterdam Schiphol (15) - 60% of total retail market (Schiphol ~60% of Dutch airport traffic)
  { id: "r1",  name: "The Style Loft",           airport: "AMS", category: "Retail",          redemptions: 680,  avg_sale: 185, revenue: 125800 },
  { id: "r2",  name: "Tulip & Souvenir Co.",     airport: "AMS", category: "Retail",          redemptions: 1020, avg_sale: 68,  revenue: 69360 },
  { id: "r3",  name: "The Amber Tap",            airport: "AMS", category: "Food & Beverage", redemptions: 1440, avg_sale: 32,  revenue: 46080 },
  { id: "r4",  name: "Gateway Duty Free",        airport: "AMS", category: "Retail",          redemptions: 2480, avg_sale: 220, revenue: 545600 },
  { id: "r5",  name: "Bloom Beauty Shop",        airport: "AMS", category: "Retail",          redemptions: 960,  avg_sale: 95,  revenue: 91200 },
  { id: "r6",  name: "Le Petit Bistro",          airport: "AMS", category: "Food & Beverage", redemptions: 780,  avg_sale: 28,  revenue: 21840 },
  { id: "r7",  name: "Prestige Wines & Spirits", airport: "AMS", category: "Retail",          redemptions: 1720, avg_sale: 145, revenue: 249400 },
  { id: "r8",  name: "Elara Fashion AMS",        airport: "AMS", category: "Retail",          redemptions: 430,  avg_sale: 310, revenue: 133300 },
  { id: "r9",  name: "Riviera Apparel",          airport: "AMS", category: "Retail",          redemptions: 380,  avg_sale: 180, revenue: 68400 },
  { id: "r10", name: "Lumière Jewels",           airport: "AMS", category: "Retail",          redemptions: 190,  avg_sale: 780, revenue: 148200 },
  { id: "r11", name: "QuickBite Terminal 2",     airport: "AMS", category: "Food & Beverage", redemptions: 1820, avg_sale: 18,  revenue: 32760 },
  { id: "r12", name: "Frost & Cream",            airport: "AMS", category: "Food & Beverage", redemptions: 1280, avg_sale: 14,  revenue: 17920 },
  { id: "r13", name: "Cacao House",              airport: "AMS", category: "Retail",          redemptions: 620,  avg_sale: 55,  revenue: 34100 },
  { id: "r14", name: "Chronos Boutique",         airport: "AMS", category: "Retail",          redemptions: 144,  avg_sale: 940, revenue: 135360 },
  { id: "r15", name: "Crystal & Co.",            airport: "AMS", category: "Retail",          redemptions: 530,  avg_sale: 120, revenue: 63600 },

  // Rotterdam The Hague (7) - 16% of total market
  { id: "r16", name: "Harbor Duty Free",         airport: "RTM", category: "Retail",          redemptions: 680,  avg_sale: 130, revenue: 88400 },
  { id: "r17", name: "Fresh Stop RTM",           airport: "RTM", category: "Food & Beverage", redemptions: 480,  avg_sale: 22,  revenue: 10560 },
  { id: "r18", name: "Metro Style",              airport: "RTM", category: "Retail",          redemptions: 350,  avg_sale: 95,  revenue: 33250 },
  { id: "r19", name: "Delta Gifts",              airport: "RTM", category: "Retail",          redemptions: 425,  avg_sale: 35,  revenue: 14875 },
  { id: "r20", name: "The Hop House RTM",        airport: "RTM", category: "Food & Beverage", redemptions: 610,  avg_sale: 25,  revenue: 15250 },
  { id: "r21", name: "Noir Parfumerie",          airport: "RTM", category: "Retail",          redemptions: 305,  avg_sale: 175, revenue: 53375 },
  { id: "r22", name: "Brewpoint Café",           airport: "RTM", category: "Food & Beverage", redemptions: 765,  avg_sale: 16,  revenue: 12240 },

  // Eindhoven (6) - 12% of total market
  { id: "r23", name: "Innovate Duty Free",       airport: "EIN", category: "Retail",          redemptions: 540,  avg_sale: 110, revenue: 59400 },
  { id: "r24", name: "Pixel & Craft Gifts",      airport: "EIN", category: "Retail",          redemptions: 285,  avg_sale: 42,  revenue: 11970 },
  { id: "r25", name: "Runway Lounge Bar",        airport: "EIN", category: "Food & Beverage", redemptions: 420,  avg_sale: 24,  revenue: 10080 },
  { id: "r26", name: "Stratos Apparel",          airport: "EIN", category: "Retail",          redemptions: 195,  avg_sale: 160, revenue: 31200 },
  { id: "r27", name: "The Boarding Pantry",      airport: "EIN", category: "Food & Beverage", redemptions: 530,  avg_sale: 19,  revenue: 10070 },
  { id: "r28", name: "Crafted Works EIN",        airport: "EIN", category: "Retail",          redemptions: 255,  avg_sale: 78,  revenue: 19890 },

  // Groningen (4) - 7% of total market
  { id: "r29", name: "Northgate Duty Free",      airport: "GRQ", category: "Retail",          redemptions: 210,  avg_sale: 98,  revenue: 20580 },
  { id: "r30", name: "Eelde Mementos",           airport: "GRQ", category: "Retail",          redemptions: 155,  avg_sale: 30,  revenue: 4650  },
  { id: "r31", name: "Café Noorderzon",          airport: "GRQ", category: "Food & Beverage", redemptions: 240,  avg_sale: 18,  revenue: 4320  },
  { id: "r32", name: "Nordic Spirits",           airport: "GRQ", category: "Retail",          redemptions: 185,  avg_sale: 120, revenue: 22200 },

  // Maastricht (3) - 5% of total market
  { id: "r33", name: "Southgate Duty Free",      airport: "MST", category: "Retail",          redemptions: 265,  avg_sale: 105, revenue: 27825 },
  { id: "r34", name: "Côte d'Or Bistro",         airport: "MST", category: "Food & Beverage", redemptions: 340,  avg_sale: 30,  revenue: 10200 },
  { id: "r35", name: "Moselle Gift House",       airport: "MST", category: "Retail",          redemptions: 200,  avg_sale: 48,  revenue: 9600  },
];



export const MONTHLY_DATA = [
  { month: "Oct", redemptions: 820, revenue: 41000, commission: 2050 },
  { month: "Nov", redemptions: 1040, revenue: 52000, commission: 2600 },
  { month: "Dec", redemptions: 1580, revenue: 79000, commission: 3950 },
  { month: "Jan", redemptions: 920, revenue: 46000, commission: 2300 },
  { month: "Feb", redemptions: 1100, revenue: 55000, commission: 2750 },
  { month: "Mar", redemptions: 1380, revenue: 69000, commission: 3450 },
];

export const YEARLY_DATA = [
  { month: "Apr", redemptions: 640, revenue: 32000, commission: 1600 },
  { month: "May", redemptions: 710, revenue: 35500, commission: 1775 },
  { month: "Jun", redemptions: 890, revenue: 44500, commission: 2225 },
  { month: "Jul", redemptions: 1260, revenue: 63000, commission: 3150 },
  { month: "Aug", redemptions: 1420, revenue: 71000, commission: 3550 },
  { month: "Sep", redemptions: 980, revenue: 49000, commission: 2450 },
  { month: "Oct", redemptions: 820, revenue: 41000, commission: 2050 },
  { month: "Nov", redemptions: 1040, revenue: 52000, commission: 2600 },
  { month: "Dec", redemptions: 1580, revenue: 79000, commission: 3950 },
  { month: "Jan", redemptions: 920, revenue: 46000, commission: 2300 },
  { month: "Feb", redemptions: 1100, revenue: 55000, commission: 2750 },
  { month: "Mar", redemptions: 1380, revenue: 69000, commission: 3450 },
];

export const AGENCY_YEARLY = [
  { month: "Apr", bookings: 530, redeemed: 230, earned: 138 },
  { month: "May", bookings: 610, redeemed: 275, earned: 165 },
  { month: "Jun", bookings: 760, redeemed: 360, earned: 216 },
  { month: "Jul", bookings: 1080, redeemed: 520, earned: 312 },
  { month: "Aug", bookings: 1210, redeemed: 580, earned: 348 },
  { month: "Sep", bookings: 830, redeemed: 390, earned: 234 },
  { month: "Oct", bookings: 720, redeemed: 310, earned: 186 },
  { month: "Nov", bookings: 890, redeemed: 420, earned: 252 },
  { month: "Dec", bookings: 1340, redeemed: 680, earned: 408 },
  { month: "Jan", bookings: 760, redeemed: 350, earned: 210 },
  { month: "Feb", bookings: 910, redeemed: 470, earned: 282 },
  { month: "Mar", bookings: 1120, redeemed: 590, earned: 354 },
];

export const AGENCY_MONTHLY = [
  { month: "Oct", bookings: 720, redeemed: 310, earned: 186 },
  { month: "Nov", bookings: 890, redeemed: 420, earned: 252 },
  { month: "Dec", bookings: 1340, redeemed: 680, earned: 408 },
  { month: "Jan", bookings: 760, redeemed: 350, earned: 210 },
  { month: "Feb", bookings: 910, redeemed: 470, earned: 282 },
  { month: "Mar", bookings: 1120, redeemed: 590, earned: 354 },
];

export const DAILY_DATA = [
  { day: "28 Mar", redemptions: 42, revenue: 2100 },
  { day: "29 Mar", redemptions: 38, revenue: 1900 },
  { day: "30 Mar", redemptions: 55, revenue: 2750 },
  { day: "31 Mar", redemptions: 61, revenue: 3050 },
  { day: "1 Apr", redemptions: 49, revenue: 2450 },
  { day: "2 Apr", redemptions: 67, revenue: 3350 },
  { day: "3 Apr", redemptions: 73, revenue: 3650 },
];

export const AGENCY_DAILY = [
  { day: "28 Mar", bookings: 34, redeemed: 14 },
  { day: "29 Mar", bookings: 28, redeemed: 11 },
  { day: "30 Mar", bookings: 45, redeemed: 19 },
  { day: "31 Mar", bookings: 52, redeemed: 22 },
  { day: "1 Apr", bookings: 39, redeemed: 16 },
  { day: "2 Apr", bookings: 58, redeemed: 25 },
  { day: "3 Apr", bookings: 63, redeemed: 27 },
];