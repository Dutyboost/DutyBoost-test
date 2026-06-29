// Top airport retail companies worldwide and the airports where they operate.
//
// The four companies with demo dashboards (Lagardère, Avolta, Heinemann, Aena)
// reuse the EXACT airport lists from the demo data files, so airport counts and
// revenue figures always match the demos. Other companies use the curated
// RETAIL_AIRPORTS registry below (approximate daily departing/transfer volumes).

import { AIRPORTS_FULL as LTR_AIRPORTS_FULL } from "./demoDataLagardere";
import { AIRPORTS_FULL as AVOLTA_AIRPORTS_FULL } from "./demoDataAvolta";
import { AIRPORTS_FULL as HEINEMANN_AIRPORTS_FULL } from "./demoDataHeinemann";
import { AIRPORTS_FULL as AENA_AIRPORTS_FULL } from "./demoDataSpain";

// ── Region resolver (mirrors estimateAvgBasketSpend logic) ───────────────────
function regionForCountry(country) {
  const ME = ["United Arab Emirates", "Qatar", "Saudi Arabia", "Oman", "Bahrain", "Kuwait", "Jordan", "Lebanon", "Israel"];
  if (ME.includes(country)) return "Middle East";
  const NA = ["United States", "Canada"];
  if (NA.includes(country)) return "Americas";
  const ASIA = ["Singapore", "Malaysia", "China", "Hong Kong", "Japan", "South Korea", "Taiwan", "Thailand", "Indonesia", "Philippines", "Vietnam", "India", "Cambodia", "Sri Lanka"];
  if (ASIA.includes(country)) return "Asia";
  const OCEANIA = ["Australia", "New Zealand"];
  if (OCEANIA.includes(country)) return "Oceania";
  const AFRICA = ["Kenya", "Nigeria", "South Africa", "Morocco", "Egypt", "Tanzania", "Ghana"];
  if (AFRICA.includes(country)) return "Africa";
  const LATAM = ["Mexico", "Brazil", "Argentina", "Chile", "Colombia", "Uruguay", "Ecuador", "Dominican Republic", "Barbados", "Antigua", "Bahamas"];
  if (LATAM.includes(country)) return "Americas";
  return "Europe";
}

const A = (code, name, city, country, daily_pax) => ({
  code,
  name,
  city,
  country,
  daily_pax,
  annual_pax: Math.round(daily_pax * 365),
  region: regionForCountry(country),
});

export const RETAIL_AIRPORTS = {
  // Europe
  AMS: A("AMS", "Amsterdam Schiphol", "Amsterdam", "Netherlands", 169589),
  CDG: A("CDG", "Paris Charles de Gaulle", "Paris", "France", 185205),
  LHR: A("LHR", "London Heathrow", "London", "United Kingdom", 216438),
  LGW: A("LGW", "London Gatwick", "London", "United Kingdom", 109589),
  STN: A("STN", "London Stansted", "London", "United Kingdom", 76712),
  FRA: A("FRA", "Frankfurt", "Frankfurt", "Germany", 162740),
  MUC: A("MUC", "Munich", "Munich", "Germany", 131233),
  BER: A("BER", "Berlin Brandenburg", "Berlin", "Germany", 70411),
  HAM: A("HAM", "Hamburg", "Hamburg", "Germany", 40000),
  DUS: A("DUS", "Düsseldorf", "Düsseldorf", "Germany", 52603),
  STR: A("STR", "Stuttgart", "Stuttgart", "Germany", 29041),
  CGN: A("CGN", "Cologne Bonn", "Cologne", "Germany", 29041),
  MAD: A("MAD", "Madrid Barajas", "Madrid", "Spain", 164932),
  BCN: A("BCN", "Barcelona El Prat", "Barcelona", "Spain", 144110),
  AGP: A("AGP", "Málaga", "Málaga", "Spain", 68219),
  PMI: A("PMI", "Palma de Mallorca", "Palma", "Spain", 87432),
  VLC: A("VLC", "Valencia", "Valencia", "Spain", 27397),
  SVQ: A("SVQ", "Sevilla", "Sevilla", "Spain", 12000),
  ALC: A("ALC", "Alicante", "Alicante", "Spain", 43014),
  FCO: A("FCO", "Rome Fiumicino", "Rome", "Italy", 110959),
  MXP: A("MXP", "Milan Malpensa", "Milan", "Italy", 71507),
  ZRH: A("ZRH", "Zürich", "Zürich", "Switzerland", 87123),
  GVA: A("GVA", "Geneva", "Geneva", "Switzerland", 48767),
  BSL: A("BSL", "Basel EuroAirport", "Basel", "Switzerland", 13000),
  VIE: A("VIE", "Vienna", "Vienna", "Austria", 86712),
  CPH: A("CPH", "Copenhagen", "Copenhagen", "Denmark", 82740),
  OSL: A("OSL", "Oslo Gardermoen", "Oslo", "Norway", 78082),
  ARN: A("ARN", "Stockholm Arlanda", "Stockholm", "Sweden", 68767),
  HEL: A("HEL", "Helsinki", "Helsinki", "Finland", 41918),
  BRU: A("BRU", "Brussels", "Brussels", "Belgium", 60548),
  LIS: A("LIS", "Lisbon", "Lisbon", "Portugal", 92328),
  ATH: A("ATH", "Athens", "Athens", "Greece", 76986),
  WAW: A("WAW", "Warsaw Chopin", "Warsaw", "Poland", 58082),
  BUD: A("BUD", "Budapest", "Budapest", "Hungary", 41644),
  PRG: A("PRG", "Prague", "Prague", "Czech Republic", 48767),
  DUB: A("DUB", "Dublin", "Dublin", "Ireland", 90137),
  BFS: A("BFS", "Belfast International", "Belfast", "United Kingdom", 16438),
  GLA: A("GLA", "Glasgow", "Glasgow", "United Kingdom", 21096),
  EDI: A("EDI", "Edinburgh", "Edinburgh", "United Kingdom", 39726),
  MAN: A("MAN", "Manchester", "Manchester", "United Kingdom", 82192),
  BRS: A("BRS", "Bristol", "Bristol", "United Kingdom", 24110),
  BHX: A("BHX", "Birmingham", "Birmingham", "United Kingdom", 35616),
  LYS: A("LYS", "Lyon", "Lyon", "France", 32877),
  TLS: A("TLS", "Toulouse", "Toulouse", "France", 27123),
  LUX: A("LUX", "Luxembourg", "Luxembourg", "Luxembourg", 1342),
  BEG: A("BEG", "Belgrade", "Belgrade", "Serbia", 20548),
  ZAG: A("ZAG", "Zagreb", "Zagreb", "Croatia", 10137),
  RIX: A("RIX", "Riga", "Riga", "Latvia", 13000),
  SKP: A("SKP", "Skopje", "Skopje", "North Macedonia", 7000),
  TLV: A("TLV", "Tel Aviv Ben Gurion", "Tel Aviv", "Israel", 65753),
  TBS: A("TBS", "Tbilisi", "Tbilisi", "Georgia", 9000),
  KIV: A("KIV", "Chișinău", "Chișinău", "Moldova", 4000),

  // North & South America
  JFK: A("JFK", "New York JFK", "New York", "United States", 171233),
  LAX: A("LAX", "Los Angeles", "Los Angeles", "United States", 207945),
  SFO: A("SFO", "San Francisco", "San Francisco", "United States", 136986),
  ORD: A("ORD", "Chicago O'Hare", "Chicago", "United States", 202466),
  ATL: A("ATL", "Atlanta Hartsfield-Jackson", "Atlanta", "United States", 286575),
  MIA: A("MIA", "Miami", "Miami", "United States", 136986),
  BOS: A("BOS", "Boston Logan", "Boston", "United States", 115068),
  DFW: A("DFW", "Dallas/Fort Worth", "Dallas", "United States", 200000),
  IAH: A("IAH", "Houston George Bush", "Houston", "United States", 117808),
  DEN: A("DEN", "Denver", "Denver", "United States", 189041),
  SEA: A("SEA", "Seattle-Tacoma", "Seattle", "United States", 136986),
  MCO: A("MCO", "Orlando", "Orlando", "United States", 150685),
  EWR: A("EWR", "Newark Liberty", "Newark", "United States", 126027),
  LGA: A("LGA", "New York LaGuardia", "New York", "United States", 87671),
  YYZ: A("YYZ", "Toronto Pearson", "Toronto", "Canada", 138356),
  YVR: A("YVR", "Vancouver", "Vancouver", "Canada", 72329),
  MEX: A("MEX", "Mexico City", "Mexico City", "Mexico", 137808),
  GRU: A("GRU", "São Paulo Guarulhos", "São Paulo", "Brazil", 115068),
  BOG: A("BOG", "Bogotá El Dorado", "Bogotá", "Colombia", 96986),
  CTG: A("CTG", "Cartagena", "Cartagena", "Colombia", 13000),
  MDE: A("MDE", "Medellín", "Medellín", "Colombia", 13000),

  // Asia & Pacific
  SIN: A("SIN", "Singapore Changi", "Singapore", "Singapore", 161370),
  HKG: A("HKG", "Hong Kong", "Hong Kong", "Hong Kong", 128767),
  NRT: A("NRT", "Tokyo Narita", "Tokyo", "Japan", 120548),
  HND: A("HND", "Tokyo Haneda", "Tokyo", "Japan", 241096),
  ICN: A("ICN", "Seoul Incheon", "Seoul", "South Korea", 194521),
  PVG: A("PVG", "Shanghai Pudong", "Shanghai", "China", 208219),
  PEK: A("PEK", "Beijing Capital", "Beijing", "China", 273972),
  CAN: A("CAN", "Guangzhou Baiyun", "Guangzhou", "China", 200000),
  HAK: A("HAK", "Haikou Meilan", "Haikou", "China", 37000),
  BKK: A("BKK", "Bangkok Suvarnabhumi", "Bangkok", "Thailand", 178356),
  KUL: A("KUL", "Kuala Lumpur", "Kuala Lumpur", "Malaysia", 170685),
  CGK: A("CGK", "Jakarta Soekarno-Hatta", "Jakarta", "Indonesia", 148767),
  MNL: A("MNL", "Manila Ninoy Aquino", "Manila", "Philippines", 124110),
  BOM: A("BOM", "Mumbai", "Mumbai", "India", 144658),
  DEL: A("DEL", "Delhi Indira Gandhi", "Delhi", "India", 201918),
  BLR: A("BLR", "Bengaluru", "Bengaluru", "India", 92877),
  HYD: A("HYD", "Hyderabad", "Hyderabad", "India", 54795),
  MAA: A("MAA", "Chennai", "Chennai", "India", 38356),
  CCU: A("CCU", "Kolkata", "Kolkata", "India", 30137),
  SYD: A("SYD", "Sydney Kingsford Smith", "Sydney", "Australia", 121644),
  MEL: A("MEL", "Melbourne", "Melbourne", "Australia", 100548),
  AKL: A("AKL", "Auckland", "Auckland", "New Zealand", 56164),

  // Middle East & Africa
  DXB: A("DXB", "Dubai International", "Dubai", "United Arab Emirates", 238630),
  AUH: A("AUH", "Abu Dhabi", "Abu Dhabi", "United Arab Emirates", 61370),
  DOH: A("DOH", "Doha Hamad", "Doha", "Qatar", 125753),
  IST: A("IST", "Istanbul Airport", "Istanbul", "Turkey", 175342),
  SAW: A("SAW", "Istanbul Sabiha Gökçen", "Istanbul", "Turkey", 95890),
  JED: A("JED", "Jeddah King Abdulaziz", "Jeddah", "Saudi Arabia", 112329),
  RUH: A("RUH", "Riyadh King Khalid", "Riyadh", "Saudi Arabia", 87945),
  MUS: A("MUS", "Muscat", "Muscat", "Oman", 27397),
  CMB: A("CMB", "Colombo Bandaranaike", "Colombo", "Sri Lanka", 21918),
  NBO: A("NBO", "Nairobi Jomo Kenyatta", "Nairobi", "Kenya", 20274),
  DAR: A("DAR", "Dar es Salaam", "Dar es Salaam", "Tanzania", 12000),
  ACC: A("ACC", "Accra Kotoka", "Accra", "Ghana", 12000),
  LOS: A("LOS", "Lagos Murtala Muhammed", "Lagos", "Nigeria", 17260),
  BEY: A("BEY", "Beirut Rafic Hariri", "Beirut", "Lebanon", 21918),
  BAH: A("BAH", "Bahrain", "Manama", "Bahrain", 26849),
  KHI: A("KHI", "Karachi Jinnah", "Karachi", "Pakistan", 21918),
};

export const AIRPORT_RETAIL_COMPANIES = [
  // ── Demo-backed companies (exact airport lists from the demos) ──
  {
    name: "Lagardère Travel Retail",
    airports: LTR_AIRPORTS_FULL,
  },
  {
    name: "Avolta (incl. World Duty Free, Hudson, Dufry)",
    airports: AVOLTA_AIRPORTS_FULL,
  },
  {
    name: "Gebr. Heinemann",
    airports: HEINEMANN_AIRPORTS_FULL,
  },
  {
    name: "Aena (Spanish Airport Retail)",
    airports: AENA_AIRPORTS_FULL,
  },
  // ── Curated companies ──
  {
    name: "DFS Group",
    airports: ["LAX", "SFO", "JFK", "HKG", "SIN", "SYD", "ICN", "NRT", "AKL", "BKK"].map((c) => RETAIL_AIRPORTS[c]).filter(Boolean),
  },
  {
    name: "Lotte Duty Free",
    airports: ["ICN", "NRT", "HND", "SIN", "SYD", "AKL", "BKK", "DEL", "DXB", "LAX", "JFK"].map((c) => RETAIL_AIRPORTS[c]).filter(Boolean),
  },
  {
    name: "The Shilla Duty Free",
    airports: ["ICN", "SIN", "HKG", "BKK", "JFK", "LAX"].map((c) => RETAIL_AIRPORTS[c]).filter(Boolean),
  },
  {
    name: "China Duty Free Group (CDFG)",
    airports: ["PEK", "PVG", "CAN", "HKG", "HAK"].map((c) => RETAIL_AIRPORTS[c]).filter(Boolean),
  },
  {
    name: "Dubai Duty Free",
    airports: ["DXB"].map((c) => RETAIL_AIRPORTS[c]).filter(Boolean),
  },
  {
    name: "Qatar Duty Free",
    airports: ["DOH"].map((c) => RETAIL_AIRPORTS[c]).filter(Boolean),
  },
  {
    name: "WHSmith Travel",
    airports: ["LHR", "LGW", "MAN", "STN", "BRS", "GLA", "EDI", "BHX", "CDG", "AMS", "FRA", "MAD", "BCN", "FCO", "SIN", "HKG", "SYD", "MEL"].map((c) => RETAIL_AIRPORTS[c]).filter(Boolean),
  },
  {
    name: "Aer Rianta International (ARI)",
    airports: ["DUB", "BFS", "GLA", "EDI", "MAN", "CMB", "BEY", "BAH", "MUS"].map((c) => RETAIL_AIRPORTS[c]).filter(Boolean),
  },
  {
    name: "Flemingo Travel Retail",
    airports: ["DXB", "DOH", "MUS", "CMB", "NBO", "DAR", "ACC", "LOS", "MNL"].map((c) => RETAIL_AIRPORTS[c]).filter(Boolean),
  },
  {
    name: "Emirates Leisure Retail",
    airports: ["DXB", "AUH", "DOH"].map((c) => RETAIL_AIRPORTS[c]).filter(Boolean),
  },
  {
    name: "TAV Airports Retail",
    airports: ["IST", "SAW", "TLV", "TBS", "SKP", "RIX", "KIV"].map((c) => RETAIL_AIRPORTS[c]).filter(Boolean),
  },
  {
    name: "Rimas Colombia",
    airports: ["BOG", "CTG", "MDE"].map((c) => RETAIL_AIRPORTS[c]).filter(Boolean),
  },
  {
    name: "Travel Retail Sweden",
    airports: ["ARN", "CPH", "OSL", "HEL"].map((c) => RETAIL_AIRPORTS[c]).filter(Boolean),
  },
  {
    name: "Intershop (Switzerland)",
    airports: ["ZRH", "GVA", "BSL"].map((c) => RETAIL_AIRPORTS[c]).filter(Boolean),
  },
  {
    name: "JAT Retail",
    airports: ["BEG", "ZAG"].map((c) => RETAIL_AIRPORTS[c]).filter(Boolean),
  },
  {
    name: "Flemingo India",
    airports: ["DEL", "BOM", "BLR", "HYD", "MAA", "CCU"].map((c) => RETAIL_AIRPORTS[c]).filter(Boolean),
  },
];