// Lightweight airport-retail operator registry.
//
// These are real global operators whose airport footprints we map to the
// shared RETAIL_AIRPORTS registry. No bespoke store-level demo data is
// authored here: totals are computed by computeCompanyTotals() from airport
// traffic + the basket-spend model (utils/airportBasketEstimate), so figures
// stay plausible without fabricating per-store numbers. When an operator
// becomes an active prospect, promote them to a full demoData*.js file.
//
// Two exports:
//   - LIGHTWEIGHT_AIRPORTS: airports not yet in the base registry
//   - LIGHTWEIGHT_COMPANY_DEFS: { name, codes[] } resolved against the merged
//     RETAIL_AIRPORTS registry in airportRetailCompanies.js

import { A } from "./airportRegionHelpers";

export const LIGHTWEIGHT_AIRPORTS = {
  // ── Asia & Pacific ──
  HKT: A("HKT", "Phuket", "Phuket", "Thailand", 41000),
  CNX: A("CNX", "Chiang Mai", "Chiang Mai", "Thailand", 16000),
  DPS: A("DPS", "Denpasar Bali", "Denpasar", "Indonesia", 55000),
  SGN: A("SGN", "Ho Chi Minh City", "Ho Chi Minh City", "Vietnam", 42000),
  HAN: A("HAN", "Hanoi Noi Bai", "Hanoi", "Vietnam", 32000),
  CEB: A("CEB", "Cebu Mactan", "Cebu", "Philippines", 12000),
  MLE: A("MLE", "Malé", "Malé", "Maldives", 9000),
  KTM: A("KTM", "Kathmandu", "Kathmandu", "Nepal", 10000),
  ALA: A("ALA", "Almaty", "Almaty", "Kazakhstan", 16000),
  GYD: A("GYD", "Baku Heydar Aliyev", "Baku", "Azerbaijan", 15000),

  // ── Middle East ──
  KWI: A("KWI", "Kuwait", "Kuwait City", "Kuwait", 17000),
  AMM: A("AMM", "Amman Queen Alia", "Amman", "Jordan", 16000),

  // ── Europe ──
  KRK: A("KRK", "Krakow", "Krakow", "Poland", 11000),
  LED: A("LED", "St Petersburg Pulkovo", "St Petersburg", "Russia", 35000),
  DME: A("DME", "Moscow Domodedovo", "Moscow", "Russia", 30000),
  LCA: A("LCA", "Larnaca", "Larnaca", "Cyprus", 12000),
  PFO: A("PFO", "Paphos", "Paphos", "Cyprus", 5000),
  MLA: A("MLA", "Malta", "Malta", "Malta", 16000),
  SOF: A("SOF", "Sofia", "Sofia", "Bulgaria", 10000),
  OTP: A("OTP", "Bucharest Otopeni", "Bucharest", "Romania", 14000),
  TLL: A("TLL", "Tallinn", "Tallinn", "Estonia", 7000),
  VNO: A("VNO", "Vilnius", "Vilnius", "Lithuania", 6000),

  // ── Americas ──
  SCL: A("SCL", "Santiago Arturo Merino", "Santiago", "Chile", 40000),
  LIM: A("LIM", "Lima Jorge Chávez", "Lima", "Peru", 38000),
  EZE: A("EZE", "Buenos Aires Ezeiza", "Buenos Aires", "Argentina", 45000),
  MVD: A("MVD", "Montevideo", "Montevideo", "Uruguay", 6000),

  // ── Africa ──
  CAI: A("CAI", "Cairo International", "Cairo", "Egypt", 38000),
  CMN: A("CMN", "Casablanca Mohammed V", "Casablanca", "Morocco", 18000),
  TUN: A("TUN", "Tunis Carthage", "Tunis", "Tunisia", 10000),
  ADD: A("ADD", "Addis Ababa Bole", "Addis Ababa", "Ethiopia", 18000),
};

export const LIGHTWEIGHT_COMPANY_DEFS = [
  { name: "King Power Group (Thailand)", codes: ["BKK", "HKT", "CNX"] },
  { name: "Duty Free Americas (DFA)", codes: ["MIA", "JFK", "LAX", "ORD", "DFW", "IAH", "BOS", "SEA", "EWR"] },
  { name: "JR Duty Free (James Richardson)", codes: ["TLV", "MEL"] },
  { name: "Baltona Duty Free (Poland)", codes: ["WAW", "KRK"] },
  { name: "Regstaer Duty Free", codes: ["IST", "SAW", "LED", "DME"] },
  { name: "Hellenic Duty Free (Athens)", codes: ["ATH"] },
  { name: "Cyprus Duty Free (Hermes Airports)", codes: ["LCA", "PFO"] },
  { name: "Malta International Duty Free", codes: ["MLA"] },
  { name: "Sofia Airport Duty Free", codes: ["SOF"] },
  { name: "Bucharest Airports Duty Free", codes: ["OTP"] },
  { name: "Tallinn Airport Retail", codes: ["TLL"] },
  { name: "Vilnius Airport Retail", codes: ["VNO"] },
  { name: "Belgrade Duty Free (Aerodrom Beograd)", codes: ["BEG"] },
  { name: "Zagreb Airport Duty Free", codes: ["ZAG"] },
  { name: "Delhi Duty Free Services (DDFS)", codes: ["DEL"] },
  { name: "Colombo Bandaranaike Duty Free", codes: ["CMB"] },
  { name: "Malé Duty Free (Maldives)", codes: ["MLE"] },
  { name: "Kathmandu Duty Free", codes: ["KTM"] },
  { name: "Bali Ngurah Rai Duty Free", codes: ["DPS"] },
  { name: "Vietnam National Trade (NAT) Duty Free", codes: ["SGN", "HAN"] },
  { name: "Duty Free Philippines", codes: ["MNL", "CEB"] },
  { name: "Santiago FAIR Retail", codes: ["SCL"] },
  { name: "Lima Airport Partners Duty Free", codes: ["LIM"] },
  { name: "Interbienes (Buenos Aires)", codes: ["EZE"] },
  { name: "Montevideo Duty Free", codes: ["MVD"] },
  { name: "Cairo Duty Free (EAS)", codes: ["CAI"] },
  { name: "ONDA Casablanca Duty Free", codes: ["CMN"] },
  { name: "Tunis Duty Free", codes: ["TUN"] },
  { name: "Ethiopian Duty Free", codes: ["ADD"] },
  { name: "Kuwait Duty Free", codes: ["KWI"] },
  { name: "Muscat Duty Free", codes: ["MUS"] },
  { name: "Amman Airport Duty Free", codes: ["AMM"] },
  { name: "Baku Duty Free", codes: ["GYD"] },
  { name: "Almaty Duty Free", codes: ["ALA"] },
  { name: "Bahrain Duty Free", codes: ["BAH"] },
  { name: "Karachi Duty Free (Pakistan)", codes: ["KHI"] },
];