// Caribbean airport retail registry.
//
// Two exports:
//   - CARIBBEAN_AIRPORTS: every commercial Caribbean airport, in the shared
//     airport shape used by RETAIL_AIRPORTS (traffic-derived, no store data).
//   - CARIBBEAN_COMPANY_DEFS: the retail operators documented at those
//     airports and the airport codes each one trades at. International groups
//     tracked elsewhere only list their Caribbean codes here.
//
// Sources: airport shopping pages, operator press releases and trade press
// (Avolta/Dufry releases, Moodie Davitt Report, DFNI). Where no operator is
// publicly documented the airport is still listed, so a new retailer can be
// typed in — no operator is invented for it.

import { A } from "./airportRegionHelpers";

export const CARIBBEAN_AIRPORTS = {
  // ── Greater Antilles ──
  PUJ: A("PUJ", "Punta Cana International", "Punta Cana", "Dominican Republic", 21918),
  SDQ: A("SDQ", "Santo Domingo Las Americas", "Santo Domingo", "Dominican Republic", 10959),
  STI: A("STI", "Santiago Cibao International", "Santiago", "Dominican Republic", 5479),
  LRM: A("LRM", "La Romana International", "La Romana", "Dominican Republic", 1370),
  POP: A("POP", "Puerto Plata International", "Puerto Plata", "Dominican Republic", 4110),
  AZS: A("AZS", "Samaná El Catey", "Samaná", "Dominican Republic", 548),
  JBQ: A("JBQ", "Santo Domingo Isabela", "Santo Domingo", "Dominican Republic", 822),
  MBJ: A("MBJ", "Montego Bay Sangster International", "Montego Bay", "Jamaica", 13699),
  KIN: A("KIN", "Kingston Norman Manley", "Kingston", "Jamaica", 5479),
  HAV: A("HAV", "Havana José Martí", "Havana", "Cuba", 8219),
  VRA: A("VRA", "Varadero Juan Gualberto Gómez", "Varadero", "Cuba", 4110),
  CCC: A("CCC", "Cayo Coco", "Cayo Coco", "Cuba", 2192),
  SNU: A("SNU", "Santa Clara Abel Santamaría", "Santa Clara", "Cuba", 1370),
  CMW: A("CMW", "Camagüey Ignacio Agramonte", "Camagüey", "Cuba", 1370),
  HOG: A("HOG", "Holguín Frank País", "Holguín", "Cuba", 2192),
  SCU: A("SCU", "Santiago de Cuba Antonio Maceo", "Santiago de Cuba", "Cuba", 1370),
  SJU: A("SJU", "San Juan Luis Muñoz Marín", "San Juan", "Puerto Rico", 27397),
  BQN: A("BQN", "Aguadilla Rafael Hernández", "Aguadilla", "Puerto Rico", 4110),
  PSE: A("PSE", "Ponce Mercedita", "Ponce", "Puerto Rico", 822),
  STT: A("STT", "St. Thomas Cyril E. King", "Charlotte Amalie", "US Virgin Islands", 4110),
  STX: A("STX", "St. Croix Henry E. Rohlsen", "Christiansted", "US Virgin Islands", 1096),
  PAP: A("PAP", "Port-au-Prince Toussaint Louverture", "Port-au-Prince", "Haiti", 4110),
  CAP: A("CAP", "Cap-Haïtien International", "Cap-Haïtien", "Haiti", 548),

  // ── Bahamas, Turks & Caicos ──
  NAS: A("NAS", "Nassau Lynden Pindling", "Nassau", "Bahamas", 10959),
  FPO: A("FPO", "Freeport Grand Bahama", "Freeport", "Bahamas", 1370),
  GGT: A("GGT", "Georgetown Exuma", "George Town", "Bahamas", 822),
  MHH: A("MHH", "Marsh Harbour", "Marsh Harbour", "Bahamas", 548),
  ELH: A("ELH", "North Eleuthera", "Eleuthera", "Bahamas", 411),
  TCB: A("TCB", "Treasure Cay", "Treasure Cay", "Bahamas", 274),
  PLS: A("PLS", "Providenciales International", "Providenciales", "Turks and Caicos", 2740),
  GDT: A("GDT", "Grand Turk JAGS McCartney", "Grand Turk", "Turks and Caicos", 274),

  // ── Leeward Islands ──
  AUA: A("AUA", "Queen Beatrix International", "Oranjestad", "Aruba", 7671),
  CUR: A("CUR", "Curaçao Hato International", "Willemstad", "Curacao", 5479),
  BON: A("BON", "Bonaire Flamingo International", "Kralendijk", "Bonaire", 1644),
  SXM: A("SXM", "Princess Juliana International", "Philipsburg", "Sint Maarten", 6849),
  SBH: A("SBH", "St. Barths Gustaf III", "Gustavia", "Saint Barthelemy", 548),
  SFG: A("SFG", "Grand Case", "Grand Case", "Saint Martin", 274),
  AXA: A("AXA", "The Valley Clayton J. Lloyd", "The Valley", "Anguilla", 274),
  EIS: A("EIS", "Road Town Terrance B. Lettsome", "Road Town", "British Virgin Islands", 548),
  SKB: A("SKB", "Basseterre Robert L. Bradshaw", "Basseterre", "Saint Kitts and Nevis", 1918),
  NEV: A("NEV", "Newcastle", "Newcastle", "Saint Kitts and Nevis", 548),
  ANU: A("ANU", "St. John's V.C. Bird International", "St. John's", "Antigua", 2740),
  DOM: A("DOM", "Roseau Douglas-Charles", "Roseau", "Dominica", 548),
  DCF: A("DCF", "Canefield", "Canefield", "Dominica", 274),

  // ── Windward Islands ──
  PTP: A("PTP", "Pointe-à-Pitre Le Raizet", "Pointe-à-Pitre", "Guadeloupe", 4110),
  FDF: A("FDF", "Fort-de-France Aimé Césaire", "Fort-de-France", "Martinique", 4110),
  BGI: A("BGI", "Bridgetown Grantley Adams", "Bridgetown", "Barbados", 6027),
  POS: A("POS", "Port of Spain Piarco", "Port of Spain", "Trinidad and Tobago", 8219),
  TAB: A("TAB", "Tobago A.N.R. Robinson", "Scarborough", "Trinidad and Tobago", 1370),
  GND: A("GND", "St. George's Maurice Bishop", "St. George's", "Grenada", 1918),
  UVF: A("UVF", "Vieux Fort Hewanorra", "Vieux Fort", "Saint Lucia", 2466),
  SLU: A("SLU", "Castries George F. L. Charles", "Castries", "Saint Lucia", 1096),
  SVD: A("SVD", "Kingstown E.T. Joshua", "Kingstown", "Saint Vincent and the Grenadines", 1096),
  CAY: A("CAY", "Cayenne Félix Eboué", "Cayenne", "French Guiana", 1370),
};

export const CARIBBEAN_COMPANY_DEFS = [
  // ── International groups (Caribbean footprint) ──
  { name: "Dufry / Avolta — Caribbean", codes: ["SDQ", "STI", "LRM", "AZS", "MBJ", "SJU", "POS"] },
  { name: "Duty Free Americas (DFA) — Caribbean", codes: ["PUJ", "PAP"] },
  { name: "Penha Duty Free — Curaçao", codes: ["CUR"] },

  // ── Island operators ──
  { name: "St. Thomas Duty Free (A.H. Riise)", codes: ["STT"] },
  { name: "Port of Call Duty Free (Kingston)", codes: ["KIN"] },
  { name: "Turquoise Duty Free (Providenciales)", codes: ["PLS"] },
  { name: "Grenada Duty Free", codes: ["GND"] },
  { name: "Nassau Duty Free", codes: ["NAS"] },
  { name: "700 Wines and Spirits (Nassau)", codes: ["NAS"] },
  { name: "Caribbean Lighthouse (Nassau)", codes: ["NAS"] },
];