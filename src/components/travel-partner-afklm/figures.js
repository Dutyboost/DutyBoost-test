// Shared figures for the Air France-KLM travel-partner presentation.
// Basis: Air France-KLM Group full-year 2025 results (published 19 February 2026):
// 102.8M passengers carried (+5.0% YoY), up to 320 destinations in 100 countries,
// hubs at Paris-Charles de Gaulle and Amsterdam-Schiphol.
// Regional passenger splits are FY2025 network-airline figures from the Group's
// published traffic reporting (Q3 2025 year-to-date + Q4 2025).

export const GROUP_PASSENGERS = "102.8M";
// Network airlines = Air France + KLM (76.8M); Transavia carries the remainder.
export const NETWORK_PASSENGERS = "76.8M";
export const AF_PASSENGERS = "42.3M";
export const KLM_PASSENGERS = "34.5M";
export const TRANSAVIA_PASSENGERS = "26.0M";
export const DESTINATIONS = "320";
export const COUNTRIES = "100";
export const FLEET = "596";

// In-flight points. Every long-haul aircraft in the group fleet carries seatback
// in-flight entertainment (Air France 120, KLM 69 = 189). The European fleets
// (Air France A220/A320 family, KLM 737/A321neo, Transavia's 140 aircraft) and the
// regional Embraer fleets have no seatback screens, so they are not counted as points.
// Source: Air France-KLM Group fleet, 31 December 2025.
export const IFE_AIRCRAFT = "189";
export const IFE_BY_CARRIER = [
  { carrier: "Air France", aircraft: "120", note: "A330 · A350 · 777 · 787" },
  { carrier: "KLM", aircraft: "69", note: "A330 · 777 · 787" },
  { carrier: "Transavia", aircraft: "0", note: "No seatback screens" },
];
// Destination points (320) + in-flight points (189).
export const TOTAL_POINTS = "509";
export const AF_DESTINATIONS = "~170";
export const KLM_DESTINATIONS = "160+";
export const LOAD_FACTOR = "87.2%";

export const GLOBAL_PAX_MOVEMENTS = "9.8B";
export const GLOBAL_DUTY_FREE = "€68.2B";
export const NON_PURCHASE_SHARE = "90%";

// Network coverage by region. Destination counts are indicative across the
// group's up-to-320-destination network; passenger figures are FY2025 network
// airline passengers carried.
export const REGIONS = [
  { region: "Europe — short & medium-haul", dest: "~145", pax: "49.7M", share: 65 },
  { region: "North America", dest: "~25", pax: "9.9M", share: 13 },
  { region: "Asia & Middle East", dest: "~50", pax: "6.2M", share: 8 },
  { region: "Africa", dest: "~55", pax: "3.9M", share: 5 },
  { region: "Latin America", dest: "~20", pax: "3.7M", share: 5 },
  { region: "Caribbean & Indian Ocean", dest: "~25", pax: "3.4M", share: 4 },
];

// Long-haul destinations — annual AF-KLM passengers carried (both directions),
// estimated from published hub route statistics (CDG / AMS) and network capacity.
export const LONG_HAUL = [
  { name: "New York (JFK / EWR)", region: "North America", pax: 1250000 },
  { name: "Montreal", region: "North America", pax: 900000 },
  { name: "Los Angeles", region: "North America", pax: 620000 },
  { name: "Toronto", region: "North America", pax: 520000 },
  { name: "Miami", region: "North America", pax: 470000 },
  { name: "Chicago", region: "North America", pax: 430000 },
  { name: "San Francisco", region: "North America", pax: 380000 },
  { name: "Boston", region: "North America", pax: 330000 },
  { name: "Washington, D.C.", region: "North America", pax: 320000 },
  { name: "Atlanta", region: "North America", pax: 250000 },
  { name: "Dubai", region: "Asia & Middle East", pax: 620000 },
  { name: "Tokyo (HND / NRT)", region: "Asia & Middle East", pax: 480000 },
  { name: "Singapore", region: "Asia & Middle East", pax: 400000 },
  { name: "Bangkok", region: "Asia & Middle East", pax: 380000 },
  { name: "Delhi", region: "Asia & Middle East", pax: 340000 },
  { name: "Mumbai", region: "Asia & Middle East", pax: 300000 },
  { name: "Doha", region: "Asia & Middle East", pax: 280000 },
  { name: "Seoul", region: "Asia & Middle East", pax: 240000 },
  { name: "Algiers", region: "Africa", pax: 520000 },
  { name: "Casablanca", region: "Africa", pax: 380000 },
  { name: "Cairo", region: "Africa", pax: 300000 },
  { name: "Johannesburg", region: "Africa", pax: 280000 },
  { name: "Nairobi", region: "Africa", pax: 220000 },
  { name: "São Paulo", region: "Latin America", pax: 420000 },
  { name: "Mexico City", region: "Latin America", pax: 380000 },
  { name: "Buenos Aires", region: "Latin America", pax: 260000 },
  { name: "Bogotá", region: "Latin America", pax: 230000 },
  { name: "Lima", region: "Latin America", pax: 200000 },
  { name: "Pointe-à-Pitre", region: "Caribbean & Indian Ocean", pax: 420000 },
  { name: "Fort-de-France", region: "Caribbean & Indian Ocean", pax: 380000 },
  { name: "Saint-Denis (Réunion)", region: "Caribbean & Indian Ocean", pax: 340000 },
  { name: "Curaçao", region: "Caribbean & Indian Ocean", pax: 260000 },
  { name: "Sint Maarten", region: "Caribbean & Indian Ocean", pax: 220000 },
];

// Short- and medium-haul destinations — annual AF-KLM passengers carried
// (both directions), estimated from published hub route statistics and capacity.
export const SHORT_HAUL = [
  { name: "Nice", region: "France", pax: 900000 },
  { name: "Barcelona", region: "Southern Europe", pax: 780000 },
  { name: "London (LHR / LGW)", region: "Northern Europe", pax: 700000 },
  { name: "Madrid", region: "Southern Europe", pax: 680000 },
  { name: "Rome", region: "Southern Europe", pax: 640000 },
  { name: "Lisbon", region: "Southern Europe", pax: 620000 },
  { name: "Milan", region: "Southern Europe", pax: 520000 },
  { name: "Geneva", region: "Central Europe", pax: 480000 },
  { name: "Berlin", region: "Central Europe", pax: 450000 },
  { name: "Athens", region: "Southern Europe", pax: 430000 },
  { name: "Toulouse", region: "France", pax: 420000 },
  { name: "Marseille", region: "France", pax: 410000 },
  { name: "Vienna", region: "Central Europe", pax: 380000 },
  { name: "Copenhagen", region: "Northern Europe", pax: 360000 },
  { name: "Munich", region: "Central Europe", pax: 350000 },
  { name: "Dublin", region: "Northern Europe", pax: 340000 },
  { name: "Stockholm", region: "Northern Europe", pax: 320000 },
  { name: "Prague", region: "Central Europe", pax: 300000 },
  { name: "Istanbul", region: "Eastern Europe", pax: 280000 },
  { name: "Porto", region: "Southern Europe", pax: 260000 },
];

// Conversion model. 90% of travellers leave an airport without buying; DutyBoost
// converts a share of those non-purchasing travellers into paying customers at a
// participating store. Figures use the €20 Entry-tier minimum basket (traveller
// saves 5% = €1.00, platform fee 2.5% = €0.50, partner share 20% of the fee).
export const NON_PURCHASE_RATE = 0.9;
export const ENTRY_BASKET = 20;
export const PARTNER_SHARE_OF_BASKET = 0.005; // 0.5% of basket = 20% of the 2.5% fee
export const RETAILER_KEEP_RATE = 0.925;

export function uplift(pax, pp) {
  const nonPurchasing = pax * NON_PURCHASE_RATE;
  const txns = nonPurchasing * (pp / 100);
  const retail = txns * ENTRY_BASKET;
  return {
    nonPurchasing,
    txns,
    retail,
    partner: retail * PARTNER_SHARE_OF_BASKET,
    retailerNet: retail * RETAILER_KEEP_RATE,
  };
}

// Group-wide scenarios, all 102.8M group passengers at 90% non-purchasing.
export const SCALE_ROWS = [0.5, 1, 2, 5].map((pp) => ({
  pp: `+${pp} pp`,
  ...uplift(102844000, pp),
}));

export function fmtEur(v) {
  if (v >= 1000000) return `€${(v / 1000000).toFixed(2)}M`;
  if (v >= 1000) return `€${Math.round(v / 1000)}K`;
  return `€${Math.round(v)}`;
}

export function fmtCount(v) {
  if (v >= 1000000) return `${(v / 1000000).toFixed(2)}M`;
  if (v >= 1000) return `${Math.round(v / 1000).toLocaleString("en-US")}K`;
  return `${Math.round(v)}`;
}

export const SOURCES = [
  { label: "Air France-KLM Group — profile & network", url: "https://www.airfranceklm.com/en/group" },
  { label: "Air France-KLM Group — fleet (31 December 2025)", url: "https://www.airfranceklm.com/en/group/fleet" },
  { label: "Air France-KLM — Full Year 2025 results", url: "https://www.globenewswire.com/news-release/2026/02/19/3240786/0/en/full-year-2025.html" },
  { label: "Air France-KLM — Q3 2025 traffic & regional split", url: "https://www.airfranceklm.com/sites/default/files/2025-11/q3-2025-afklm-results-press-release.pdf" },
  { label: "Air France — Winter 2024-25 network (169 destinations)", url: "https://corporate.airfrance.com/en/news/winter-2024-2025-air-france-serve-nearly-170-destinations-73-countries" },
  { label: "Paris-Charles de Gaulle — 2025 traffic & route statistics", url: "https://en.wikipedia.org/wiki/Charles_de_Gaulle_Airport" },
  { label: "Amsterdam Schiphol — 2025 traffic & route statistics", url: "https://en.wikipedia.org/wiki/Amsterdam_Airport_Schiphol" },
];