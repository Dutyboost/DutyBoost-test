export const AIRPORTS = [
  { code: "AMS", name: "Amsterdam Schiphol", city: "Amsterdam" },
  { code: "RTM", name: "Rotterdam The Hague", city: "Rotterdam" },
  { code: "EIN", name: "Eindhoven Airport", city: "Eindhoven" },
  { code: "GRQ", name: "Groningen Airport Eelde", city: "Groningen" },
  { code: "MST", name: "Maastricht Aachen Airport", city: "Maastricht" },
];

export const TRAVEL_AGENCIES = [
  { id: "ag1", name: "Horizon Travel Group", city: "Rotterdam", bookings: 4820, travelers: 9640, redeemed: 2104, commission: 1261.20 },
  { id: "ag2", name: "Skybound Holidays", city: "Rijswijk", bookings: 6310, travelers: 12620, redeemed: 3456, commission: 2073.60 },
  { id: "ag3", name: "Compass Reizen", city: "Barendrecht", bookings: 3780, travelers: 7560, redeemed: 1820, commission: 1092.00 },
  { id: "ag4", name: "Voyago Travel", city: "Amsterdam", bookings: 2940, travelers: 5880, redeemed: 1102, commission: 661.20 },
  { id: "ag5", name: "Bluewave Vakanties", city: "Amsterdam", bookings: 2150, travelers: 4300, redeemed: 945, commission: 567.00 },
  { id: "ag6", name: "Windrose Tours", city: "Eindhoven", bookings: 1880, travelers: 3760, redeemed: 730, commission: 438.00 },
  { id: "ag7", name: "Meridian Reizen", city: "Den Haag", bookings: 3310, travelers: 6620, redeemed: 1540, commission: 924.00 },
  { id: "ag8", name: "NordVlieg Vakanties", city: "Groningen", bookings: 1420, travelers: 2840, redeemed: 540, commission: 324.00 },
  { id: "ag9", name: "SunRoute Travel", city: "Maastricht", bookings: 2600, travelers: 5200, redeemed: 1095, commission: 657.00 },
  { id: "ag10", name: "Jetstream Holidays", city: "Amsterdam", bookings: 5100, travelers: 10200, redeemed: 2680, commission: 1608.00 },
  { id: "ag11", name: "Palmera Reizen", city: "Amsterdam", bookings: 2280, travelers: 4560, redeemed: 1035, commission: 621.00 },
];

export const RETAILERS = [
  // Amsterdam Schiphol (15)
  { id: "r1",  name: "The Style Loft",           airport: "AMS", category: "Retail",    redemptions: 342, avg_sale: 187, revenue: 63954 },
  { id: "r2",  name: "Tulip & Souvenir Co.",     airport: "AMS", category: "Retail",    redemptions: 510, avg_sale: 68,  revenue: 34680 },
  { id: "r3",  name: "The Amber Tap",            airport: "AMS", category: "Food",      redemptions: 720, avg_sale: 32,  revenue: 23040 },
  { id: "r4",  name: "Gateway Duty Free",        airport: "AMS", category: "Duty-free", redemptions: 1240,avg_sale: 220, revenue: 272800 },
  { id: "r5",  name: "Bloom Beauty Shop",        airport: "AMS", category: "Retail",    redemptions: 480, avg_sale: 95,  revenue: 45600 },
  { id: "r6",  name: "Le Petit Bistro",          airport: "AMS", category: "Food",      redemptions: 390, avg_sale: 28,  revenue: 10920 },
  { id: "r7",  name: "Prestige Wines & Spirits", airport: "AMS", category: "Duty-free", redemptions: 860, avg_sale: 145, revenue: 124700 },
  { id: "r8",  name: "Elara Fashion AMS",        airport: "AMS", category: "Retail",    redemptions: 215, avg_sale: 310, revenue: 66650 },
  { id: "r9",  name: "Riviera Apparel",          airport: "AMS", category: "Retail",    redemptions: 190, avg_sale: 180, revenue: 34200 },
  { id: "r10", name: "Lumière Jewels",           airport: "AMS", category: "Duty-free", redemptions: 95,  avg_sale: 780, revenue: 74100 },
  { id: "r11", name: "QuickBite Terminal 2",     airport: "AMS", category: "Food",      redemptions: 910, avg_sale: 18,  revenue: 16380 },
  { id: "r12", name: "Frost & Cream",            airport: "AMS", category: "Food",      redemptions: 640, avg_sale: 14,  revenue: 8960  },
  { id: "r13", name: "Cacao House",              airport: "AMS", category: "Retail",    redemptions: 310, avg_sale: 55,  revenue: 17050 },
  { id: "r14", name: "Chronos Boutique",         airport: "AMS", category: "Duty-free", redemptions: 72,  avg_sale: 940, revenue: 67680 },
  { id: "r15", name: "Crystal & Co.",            airport: "AMS", category: "Retail",    redemptions: 265, avg_sale: 120, revenue: 31800 },

  // Rotterdam The Hague (7)
  { id: "r16", name: "Harbor Duty Free",         airport: "RTM", category: "Duty-free", redemptions: 310, avg_sale: 130, revenue: 40300 },
  { id: "r17", name: "Fresh Stop RTM",           airport: "RTM", category: "Food",      redemptions: 220, avg_sale: 22,  revenue: 4840  },
  { id: "r18", name: "Metro Style",              airport: "RTM", category: "Retail",    redemptions: 160, avg_sale: 95,  revenue: 15200 },
  { id: "r19", name: "Delta Gifts",              airport: "RTM", category: "Retail",    redemptions: 195, avg_sale: 35,  revenue: 6825  },
  { id: "r20", name: "The Hop House RTM",        airport: "RTM", category: "Food",      redemptions: 280, avg_sale: 25,  revenue: 7000  },
  { id: "r21", name: "Noir Parfumerie",          airport: "RTM", category: "Duty-free", redemptions: 140, avg_sale: 175, revenue: 24500 },
  { id: "r22", name: "Brewpoint Café",           airport: "RTM", category: "Food",      redemptions: 350, avg_sale: 16,  revenue: 5600  },

  // Eindhoven (6)
  { id: "r23", name: "Innovate Duty Free",       airport: "EIN", category: "Duty-free", redemptions: 245, avg_sale: 110, revenue: 26950 },
  { id: "r24", name: "Pixel & Craft Gifts",      airport: "EIN", category: "Retail",    redemptions: 130, avg_sale: 42,  revenue: 5460  },
  { id: "r25", name: "Runway Lounge Bar",        airport: "EIN", category: "Food",      redemptions: 190, avg_sale: 24,  revenue: 4560  },
  { id: "r26", name: "Stratos Apparel",          airport: "EIN", category: "Retail",    redemptions: 88,  avg_sale: 160, revenue: 14080 },
  { id: "r27", name: "The Boarding Pantry",      airport: "EIN", category: "Food",      redemptions: 240, avg_sale: 19,  revenue: 4560  },
  { id: "r28", name: "Crafted Works EIN",        airport: "EIN", category: "Retail",    redemptions: 115, avg_sale: 78,  revenue: 8970  },

  // Groningen (4)
  { id: "r29", name: "Northgate Duty Free",      airport: "GRQ", category: "Duty-free", redemptions: 95,  avg_sale: 98,  revenue: 9310  },
  { id: "r30", name: "Eelde Mementos",           airport: "GRQ", category: "Retail",    redemptions: 70,  avg_sale: 30,  revenue: 2100  },
  { id: "r31", name: "Café Noorderzon",          airport: "GRQ", category: "Food",      redemptions: 110, avg_sale: 18,  revenue: 1980  },
  { id: "r32", name: "Nordic Spirits",           airport: "GRQ", category: "Duty-free", redemptions: 85,  avg_sale: 120, revenue: 10200 },

  // Maastricht (3)
  { id: "r33", name: "Southgate Duty Free",      airport: "MST", category: "Duty-free", redemptions: 120, avg_sale: 105, revenue: 12600 },
  { id: "r34", name: "Côte d'Or Bistro",         airport: "MST", category: "Food",      redemptions: 155, avg_sale: 30,  revenue: 4650  },
  { id: "r35", name: "Moselle Gift House",       airport: "MST", category: "Retail",    redemptions: 90,  avg_sale: 48,  revenue: 4320  },
];



export const MONTHLY_DATA = [
  { month: "Oct", redemptions: 820, revenue: 41000, commission: 2050 },
  { month: "Nov", redemptions: 1040, revenue: 52000, commission: 2600 },
  { month: "Dec", redemptions: 1580, revenue: 79000, commission: 3950 },
  { month: "Jan", redemptions: 920, revenue: 46000, commission: 2300 },
  { month: "Feb", redemptions: 1100, revenue: 55000, commission: 2750 },
  { month: "Mar", redemptions: 1380, revenue: 69000, commission: 3450 },
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