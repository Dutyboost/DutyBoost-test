// Indicative starting figures for the store calculator.
//
// A store owner sitting in a port terminal or a down town store rarely knows
// how many passengers step off each ship, how many calls the port handles a
// year, or what share of those passengers walk past their door. So when they
// pick their country (or island), the calculator pre-fills the six fields with
// industry-scale figures for that market, which they then adjust to what they
// see in their own store.
//
// These are indicative planning figures for a typical large-ship call and a
// typical season, not audited statistics.
//
// `activation`, `redemption` and `basket` (EUR) are the DutyBoost model
// parameters and are the same in every market; the traffic figures vary.

export const DEFAULT_RATES = { activation: 30, redemption: 80, basket: 50 };

// Country / island → typical traffic for one store in that market.
export const COUNTRY_TRAFFIC = {
  // ── Caribbean, Bahamas & Bermuda ──
  Bahamas: { passengersPerCall: 3500, callsPerYear: 700, passRate: 55 },
  Jamaica: { passengersPerCall: 3000, callsPerYear: 400, passRate: 50 },
  "Cayman Islands": { passengersPerCall: 3500, callsPerYear: 500, passRate: 55 },
  Cuba: { passengersPerCall: 2200, callsPerYear: 200, passRate: 45 },
  "Dominican Republic": { passengersPerCall: 2800, callsPerYear: 300, passRate: 45 },
  Haiti: { passengersPerCall: 1200, callsPerYear: 60, passRate: 35 },
  "Puerto Rico": { passengersPerCall: 3000, callsPerYear: 450, passRate: 55 },
  "US Virgin Islands": { passengersPerCall: 3200, callsPerYear: 500, passRate: 55 },
  "British Virgin Islands": { passengersPerCall: 1200, callsPerYear: 150, passRate: 45 },
  Anguilla: { passengersPerCall: 800, callsPerYear: 60, passRate: 40 },
  "Antigua and Barbuda": { passengersPerCall: 2600, callsPerYear: 400, passRate: 50 },
  "Saint Kitts and Nevis": { passengersPerCall: 2500, callsPerYear: 350, passRate: 50 },
  Montserrat: { passengersPerCall: 600, callsPerYear: 40, passRate: 35 },
  Guadeloupe: { passengersPerCall: 2200, callsPerYear: 250, passRate: 50 },
  Dominica: { passengersPerCall: 1500, callsPerYear: 130, passRate: 45 },
  Martinique: { passengersPerCall: 2200, callsPerYear: 250, passRate: 50 },
  "Saint Lucia": { passengersPerCall: 2400, callsPerYear: 350, passRate: 50 },
  "Saint Vincent and the Grenadines": { passengersPerCall: 1500, callsPerYear: 120, passRate: 45 },
  Grenada: { passengersPerCall: 1600, callsPerYear: 150, passRate: 45 },
  Barbados: { passengersPerCall: 2600, callsPerYear: 350, passRate: 55 },
  "Trinidad and Tobago": { passengersPerCall: 1800, callsPerYear: 120, passRate: 40 },
  Aruba: { passengersPerCall: 2600, callsPerYear: 300, passRate: 55 },
  "Curaçao": { passengersPerCall: 2600, callsPerYear: 300, passRate: 55 },
  Bonaire: { passengersPerCall: 1500, callsPerYear: 100, passRate: 45 },
  "Sint Maarten": { passengersPerCall: 3500, callsPerYear: 550, passRate: 60 },
  Saba: { passengersPerCall: 300, callsPerYear: 30, passRate: 35 },
  "Sint Eustatius": { passengersPerCall: 300, callsPerYear: 30, passRate: 35 },
  "Turks and Caicos Islands": { passengersPerCall: 1800, callsPerYear: 150, passRate: 45 },
  "Saint Barthélemy": { passengersPerCall: 800, callsPerYear: 80, passRate: 40 },
  "Saint Martin": { passengersPerCall: 2800, callsPerYear: 400, passRate: 55 },
  Bermuda: { passengersPerCall: 2400, callsPerYear: 150, passRate: 50 },
  Belize: { passengersPerCall: 1600, callsPerYear: 150, passRate: 45 },
  Honduras: { passengersPerCall: 2000, callsPerYear: 250, passRate: 45 },
  Guatemala: { passengersPerCall: 1200, callsPerYear: 60, passRate: 35 },
  "Costa Rica": { passengersPerCall: 1500, callsPerYear: 120, passRate: 40 },
  Panama: { passengersPerCall: 1800, callsPerYear: 150, passRate: 40 },
  Colombia: { passengersPerCall: 2400, callsPerYear: 250, passRate: 45 },
  Venezuela: { passengersPerCall: 1200, callsPerYear: 60, passRate: 35 },
  Suriname: { passengersPerCall: 600, callsPerYear: 30, passRate: 35 },
  Guyana: { passengersPerCall: 600, callsPerYear: 30, passRate: 35 },

  // ── North America ──
  "United States": { passengersPerCall: 2500, callsPerYear: 400, passRate: 50 },
  Canada: { passengersPerCall: 1800, callsPerYear: 200, passRate: 45 },
  Mexico: { passengersPerCall: 4000, callsPerYear: 900, passRate: 50 },
  "Saint Pierre and Miquelon": { passengersPerCall: 400, callsPerYear: 20, passRate: 35 },

  // ── Mediterranean & Southern Europe ──
  Spain: { passengersPerCall: 3500, callsPerYear: 700, passRate: 50 },
  Portugal: { passengersPerCall: 2200, callsPerYear: 250, passRate: 50 },
  France: { passengersPerCall: 2500, callsPerYear: 350, passRate: 50 },
  Italy: { passengersPerCall: 3200, callsPerYear: 800, passRate: 50 },
  Malta: { passengersPerCall: 2600, callsPerYear: 300, passRate: 55 },
  Greece: { passengersPerCall: 2500, callsPerYear: 700, passRate: 50 },
  Croatia: { passengersPerCall: 1800, callsPerYear: 400, passRate: 50 },
  Montenegro: { passengersPerCall: 2000, callsPerYear: 250, passRate: 50 },
  Slovenia: { passengersPerCall: 1200, callsPerYear: 60, passRate: 45 },
  Albania: { passengersPerCall: 1000, callsPerYear: 60, passRate: 40 },
  "Türkiye": { passengersPerCall: 2200, callsPerYear: 300, passRate: 45 },
  Cyprus: { passengersPerCall: 1600, callsPerYear: 120, passRate: 45 },
  Monaco: { passengersPerCall: 700, callsPerYear: 150, passRate: 50 },
  Gibraltar: { passengersPerCall: 1200, callsPerYear: 150, passRate: 45 },
  Ukraine: { passengersPerCall: 1200, callsPerYear: 60, passRate: 35 },
  Georgia: { passengersPerCall: 900, callsPerYear: 40, passRate: 35 },
  Bulgaria: { passengersPerCall: 1200, callsPerYear: 80, passRate: 40 },
  Romania: { passengersPerCall: 900, callsPerYear: 40, passRate: 35 },

  // ── Northern Europe & Baltic ──
  Norway: { passengersPerCall: 1800, callsPerYear: 800, passRate: 45 },
  Denmark: { passengersPerCall: 1800, callsPerYear: 300, passRate: 45 },
  Sweden: { passengersPerCall: 1600, callsPerYear: 250, passRate: 45 },
  Finland: { passengersPerCall: 1500, callsPerYear: 150, passRate: 45 },
  Estonia: { passengersPerCall: 1600, callsPerYear: 200, passRate: 45 },
  Latvia: { passengersPerCall: 1200, callsPerYear: 100, passRate: 40 },
  Lithuania: { passengersPerCall: 1000, callsPerYear: 80, passRate: 40 },
  Poland: { passengersPerCall: 1200, callsPerYear: 120, passRate: 40 },
  Germany: { passengersPerCall: 1800, callsPerYear: 250, passRate: 45 },
  Netherlands: { passengersPerCall: 1800, callsPerYear: 200, passRate: 45 },
  Belgium: { passengersPerCall: 1400, callsPerYear: 100, passRate: 40 },
  Ireland: { passengersPerCall: 1400, callsPerYear: 120, passRate: 40 },
  "United Kingdom": { passengersPerCall: 1800, callsPerYear: 400, passRate: 45 },
  Iceland: { passengersPerCall: 1500, callsPerYear: 200, passRate: 45 },
  Greenland: { passengersPerCall: 900, callsPerYear: 80, passRate: 40 },
  "Faroe Islands": { passengersPerCall: 800, callsPerYear: 60, passRate: 40 },
  "Isle of Man": { passengersPerCall: 700, callsPerYear: 60, passRate: 40 },
  Guernsey: { passengersPerCall: 900, callsPerYear: 80, passRate: 40 },
  Jersey: { passengersPerCall: 900, callsPerYear: 80, passRate: 40 },

  // ── Middle East & North Africa ──
  "United Arab Emirates": { passengersPerCall: 2500, callsPerYear: 250, passRate: 45 },
  Oman: { passengersPerCall: 1200, callsPerYear: 80, passRate: 40 },
  Qatar: { passengersPerCall: 1200, callsPerYear: 80, passRate: 40 },
  Bahrain: { passengersPerCall: 900, callsPerYear: 40, passRate: 35 },
  "Saudi Arabia": { passengersPerCall: 1200, callsPerYear: 60, passRate: 35 },
  Jordan: { passengersPerCall: 1200, callsPerYear: 80, passRate: 40 },
  Israel: { passengersPerCall: 1500, callsPerYear: 120, passRate: 40 },
  Egypt: { passengersPerCall: 2000, callsPerYear: 250, passRate: 40 },
  Morocco: { passengersPerCall: 1500, callsPerYear: 120, passRate: 40 },
  Tunisia: { passengersPerCall: 1500, callsPerYear: 100, passRate: 40 },
  Algeria: { passengersPerCall: 900, callsPerYear: 40, passRate: 35 },

  // ── Africa & Indian Ocean ──
  "South Africa": { passengersPerCall: 1800, callsPerYear: 150, passRate: 45 },
  Namibia: { passengersPerCall: 1000, callsPerYear: 50, passRate: 35 },
  Kenya: { passengersPerCall: 1000, callsPerYear: 60, passRate: 35 },
  "United Republic of Tanzania": { passengersPerCall: 900, callsPerYear: 50, passRate: 35 },
  Mozambique: { passengersPerCall: 800, callsPerYear: 40, passRate: 35 },
  Madagascar: { passengersPerCall: 800, callsPerYear: 40, passRate: 35 },
  Mauritius: { passengersPerCall: 1800, callsPerYear: 100, passRate: 45 },
  Seychelles: { passengersPerCall: 1200, callsPerYear: 60, passRate: 40 },
  Senegal: { passengersPerCall: 900, callsPerYear: 40, passRate: 35 },
  Ghana: { passengersPerCall: 800, callsPerYear: 40, passRate: 35 },

  // ── Asia ──
  China: { passengersPerCall: 2500, callsPerYear: 250, passRate: 40 },
  "Hong Kong SAR": { passengersPerCall: 2200, callsPerYear: 200, passRate: 45 },
  Japan: { passengersPerCall: 2000, callsPerYear: 300, passRate: 45 },
  "Republic of Korea": { passengersPerCall: 2000, callsPerYear: 150, passRate: 40 },
  Taiwan: { passengersPerCall: 1500, callsPerYear: 100, passRate: 40 },
  Singapore: { passengersPerCall: 2500, callsPerYear: 400, passRate: 45 },
  Malaysia: { passengersPerCall: 1800, callsPerYear: 200, passRate: 40 },
  Thailand: { passengersPerCall: 1500, callsPerYear: 150, passRate: 40 },
  "Viet Nam": { passengersPerCall: 1800, callsPerYear: 200, passRate: 40 },
  Indonesia: { passengersPerCall: 1500, callsPerYear: 200, passRate: 40 },
  Philippines: { passengersPerCall: 1200, callsPerYear: 100, passRate: 35 },
  India: { passengersPerCall: 1200, callsPerYear: 100, passRate: 35 },
  "Sri Lanka": { passengersPerCall: 1000, callsPerYear: 60, passRate: 35 },
  Maldives: { passengersPerCall: 900, callsPerYear: 60, passRate: 40 },

  // ── Oceania & Pacific ──
  Australia: { passengersPerCall: 2000, callsPerYear: 300, passRate: 45 },
  "New Zealand": { passengersPerCall: 1500, callsPerYear: 150, passRate: 45 },
  "New Caledonia": { passengersPerCall: 1600, callsPerYear: 120, passRate: 45 },
  Fiji: { passengersPerCall: 1200, callsPerYear: 80, passRate: 40 },
  "Papua New Guinea": { passengersPerCall: 700, callsPerYear: 40, passRate: 35 },
  Samoa: { passengersPerCall: 700, callsPerYear: 30, passRate: 35 },
  Vanuatu: { passengersPerCall: 1000, callsPerYear: 60, passRate: 40 },
  "French Polynesia": { passengersPerCall: 900, callsPerYear: 60, passRate: 40 },
  Guam: { passengersPerCall: 1500, callsPerYear: 80, passRate: 45 },

  // ── South America ──
  Brazil: { passengersPerCall: 2500, callsPerYear: 250, passRate: 45 },
  Argentina: { passengersPerCall: 2200, callsPerYear: 200, passRate: 45 },
  Chile: { passengersPerCall: 1800, callsPerYear: 150, passRate: 45 },
  Uruguay: { passengersPerCall: 1800, callsPerYear: 150, passRate: 45 },
  Peru: { passengersPerCall: 1200, callsPerYear: 80, passRate: 40 },
  Ecuador: { passengersPerCall: 1200, callsPerYear: 80, passRate: 40 },
  "Falkland Islands": { passengersPerCall: 900, callsPerYear: 50, passRate: 45 },
};

// Anywhere not listed above still gets a workable starting point.
const FALLBACK_TRAFFIC = { passengersPerCall: 2000, callsPerYear: 200, passRate: 45 };

// Starting figures for a country / island, or null when nothing is picked yet.
export function trafficDefaultsFor(country) {
  const key = (country || "").trim();
  if (!key) return null;
  return { ...FALLBACK_TRAFFIC, ...(COUNTRY_TRAFFIC[key] || {}), ...DEFAULT_RATES };
}