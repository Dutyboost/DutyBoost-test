export const AIRPORTS = [
  { code: "AMS", name: "Amsterdam Schiphol", city: "Amsterdam" },
  { code: "RTM", name: "Rotterdam The Hague", city: "Rotterdam" },
  { code: "EIN", name: "Eindhoven Airport", city: "Eindhoven" },
  { code: "GRQ", name: "Groningen Airport Eelde", city: "Groningen" },
  { code: "MST", name: "Maastricht Aachen Airport", city: "Maastricht" },
];

export const TRAVEL_AGENCIES = [
  { id: "ag1", name: "Sunweb Group", city: "Rotterdam", bookings: 4820, travelers: 9640, redeemed: 2104, commission: 1261.20 },
  { id: "ag2", name: "TUI Netherlands", city: "Rijswijk", bookings: 6310, travelers: 12620, redeemed: 3456, commission: 2073.60 },
  { id: "ag3", name: "Corendon", city: "Barendrecht", bookings: 3780, travelers: 7560, redeemed: 1820, commission: 1092.00 },
  { id: "ag4", name: "D-reizen", city: "Amsterdam", bookings: 2940, travelers: 5880, redeemed: 1102, commission: 661.20 },
  { id: "ag5", name: "Neckermann Reizen", city: "Amsterdam", bookings: 2150, travelers: 4300, redeemed: 945, commission: 567.00 },
  { id: "ag6", name: "Jetair Nederland", city: "Eindhoven", bookings: 1880, travelers: 3760, redeemed: 730, commission: 438.00 },
  { id: "ag7", name: "ANWB Reizen", city: "Den Haag", bookings: 3310, travelers: 6620, redeemed: 1540, commission: 924.00 },
  { id: "ag8", name: "VakantieXperts", city: "Groningen", bookings: 1420, travelers: 2840, redeemed: 540, commission: 324.00 },
  { id: "ag9", name: "Prijsvrij Vakanties", city: "Maastricht", bookings: 2600, travelers: 5200, redeemed: 1095, commission: 657.00 },
  { id: "ag10", name: "Transavia Holidays", city: "Amsterdam", bookings: 5100, travelers: 10200, redeemed: 2680, commission: 1608.00 },
  { id: "ag11", name: "Exploreo", city: "Amsterdam", bookings: 2280, travelers: 4560, redeemed: 1035, commission: 621.00 },
];

export const RETAILERS = [
  // Amsterdam Schiphol (15)
  { id: "r1",  name: "House of Denim",         airport: "AMS", category: "Retail",    redemptions: 342, avg_sale: 187, revenue: 63954 },
  { id: "r2",  name: "Dutch Flowers & Delft",  airport: "AMS", category: "Retail",    redemptions: 510, avg_sale: 68,  revenue: 34680 },
  { id: "r3",  name: "Heineken Experience Bar", airport: "AMS", category: "Food",     redemptions: 720, avg_sale: 32,  revenue: 23040 },
  { id: "r4",  name: "Schiphol Duty Free",      airport: "AMS", category: "Duty-free",redemptions: 1240,avg_sale: 220, revenue: 272800 },
  { id: "r5",  name: "Rituals Cosmetics",       airport: "AMS", category: "Retail",   redemptions: 480, avg_sale: 95,  revenue: 45600 },
  { id: "r6",  name: "La Place Bistro",         airport: "AMS", category: "Food",     redemptions: 390, avg_sale: 28,  revenue: 10920 },
  { id: "r7",  name: "Menken Drinks",           airport: "AMS", category: "Duty-free",redemptions: 860, avg_sale: 145, revenue: 124700 },
  { id: "r8",  name: "Hugo Boss AMS",           airport: "AMS", category: "Retail",   redemptions: 215, avg_sale: 310, revenue: 66650 },
  { id: "r9",  name: "Lacoste Schiphol",        airport: "AMS", category: "Retail",   redemptions: 190, avg_sale: 180, revenue: 34200 },
  { id: "r10", name: "Chopard AMS",             airport: "AMS", category: "Duty-free",redemptions: 95,  avg_sale: 780, revenue: 74100 },
  { id: "r11", name: "McDonald's Terminal 2",   airport: "AMS", category: "Food",     redemptions: 910, avg_sale: 18,  revenue: 16380 },
  { id: "r12", name: "Paradis Ice Cream",       airport: "AMS", category: "Food",     redemptions: 640, avg_sale: 14,  revenue: 8960  },
  { id: "r13", name: "Maison du Chocolat",      airport: "AMS", category: "Retail",   redemptions: 310, avg_sale: 55,  revenue: 17050 },
  { id: "r14", name: "TAG Heuer Boutique",      airport: "AMS", category: "Duty-free",redemptions: 72,  avg_sale: 940, revenue: 67680 },
  { id: "r15", name: "Swarovski AMS",           airport: "AMS", category: "Retail",   redemptions: 265, avg_sale: 120, revenue: 31800 },

  // Rotterdam The Hague (7)
  { id: "r16", name: "Rotterdam Duty Free",     airport: "RTM", category: "Duty-free",redemptions: 310, avg_sale: 130, revenue: 40300 },
  { id: "r17", name: "Fresh Corner RTM",        airport: "RTM", category: "Food",     redemptions: 220, avg_sale: 22,  revenue: 4840  },
  { id: "r18", name: "INNO Fashion",            airport: "RTM", category: "Retail",   redemptions: 160, avg_sale: 95,  revenue: 15200 },
  { id: "r19", name: "Rotterdam Souvenirs",     airport: "RTM", category: "Retail",   redemptions: 195, avg_sale: 35,  revenue: 6825  },
  { id: "r20", name: "Heineken RTM Bar",        airport: "RTM", category: "Food",     redemptions: 280, avg_sale: 25,  revenue: 7000  },
  { id: "r21", name: "Parfums RTM",             airport: "RTM", category: "Duty-free",redemptions: 140, avg_sale: 175, revenue: 24500 },
  { id: "r22", name: "Starbucks RTM",           airport: "RTM", category: "Food",     redemptions: 350, avg_sale: 16,  revenue: 5600  },

  // Eindhoven (6)
  { id: "r23", name: "Eindhoven Duty Free",     airport: "EIN", category: "Duty-free",redemptions: 245, avg_sale: 110, revenue: 26950 },
  { id: "r24", name: "Brainport Gifts",         airport: "EIN", category: "Retail",   redemptions: 130, avg_sale: 42,  revenue: 5460  },
  { id: "r25", name: "EIN Lounge Bar",          airport: "EIN", category: "Food",     redemptions: 190, avg_sale: 24,  revenue: 4560  },
  { id: "r26", name: "Lacoste Eindhoven",       airport: "EIN", category: "Retail",   redemptions: 88,  avg_sale: 160, revenue: 14080 },
  { id: "r27", name: "Traveler's Pantry",       airport: "EIN", category: "Food",     redemptions: 240, avg_sale: 19,  revenue: 4560  },
  { id: "r28", name: "Dutch Design Store EIN",  airport: "EIN", category: "Retail",   redemptions: 115, avg_sale: 78,  revenue: 8970  },

  // Groningen (4)
  { id: "r29", name: "GRQ Duty Free",           airport: "GRQ", category: "Duty-free",redemptions: 95,  avg_sale: 98,  revenue: 9310  },
  { id: "r30", name: "Noord Souvenirs",         airport: "GRQ", category: "Retail",   redemptions: 70,  avg_sale: 30,  revenue: 2100  },
  { id: "r31", name: "Café Groningen",          airport: "GRQ", category: "Food",     redemptions: 110, avg_sale: 18,  revenue: 1980  },
  { id: "r32", name: "Groningen Spirits",       airport: "GRQ", category: "Duty-free",redemptions: 85,  avg_sale: 120, revenue: 10200 },

  // Maastricht (3)
  { id: "r33", name: "MST Duty Free",           airport: "MST", category: "Duty-free",redemptions: 120, avg_sale: 105, revenue: 12600 },
  { id: "r34", name: "Burgundy Bistro",         airport: "MST", category: "Food",     redemptions: 155, avg_sale: 30,  revenue: 4650  },
  { id: "r35", name: "Limburg Gifts",           airport: "MST", category: "Retail",   redemptions: 90,  avg_sale: 48,  revenue: 4320  },
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