// Estimated average duty-free transaction value (basket spend) per airport.
//
// Sources & calibration:
//  - ETRC EU Economic Impact Report (Apr 2025): Europe avg duty-free sales per
//    departing international passenger = €20–28 depending on airport size.
//  - DFWC Economic Impact of Duty Free in the Americas: ~US$9 per departing
//    international passenger at the largest airports.
//  - Arthur D. Little "Mastering Airport Retail": target €18–20 per departing pax.
//  - Calibration anchor: Madrid Barajas (MAD) average duty-free transaction ≈ €75.
//
// Model: per-transaction = regional_base × country_GDP_multiplier × airport_size_multiplier
// Regional bases are calibrated so that a typical large European hub (like MAD) lands ≈ €75.

// ── Country → GDP-per-capita tier ───────────────────────────────────────────
// Tiers relative to regional baseline; richer countries spend more per transaction.
const GDP_TIERS = {
  // Ultra-high (>$70k GDP/capita) — 1.20×
  ultra: 1.20,
  // Very high (>$40k) — 1.08×
  veryHigh: 1.08,
  // High (>$25k) — 1.0× (baseline)
  high: 1.0,
  // Upper-middle (>$15k) — 0.88×
  upperMiddle: 0.88,
  // Lower-middle (>$5k) — 0.75×
  lowerMiddle: 0.75,
  // Low (<$5k) — 0.65×
  low: 0.65,
};

const COUNTRY_GDP_TIER = {
  // Ultra-high
  "Luxembourg": "ultra", "Qatar": "ultra", "Singapore": "ultra",
  "United Arab Emirates": "ultra", "Switzerland": "ultra", "Norway": "ultra",
  "Ireland": "ultra", "Iceland": "ultra", "Monaco": "ultra",
  // Very high
  "Netherlands": "veryHigh", "Germany": "veryHigh", "United Kingdom": "veryHigh",
  "France": "veryHigh", "Belgium": "veryHigh", "Austria": "veryHigh",
  "Denmark": "veryHigh", "Sweden": "veryHigh", "Finland": "veryHigh",
  "Australia": "veryHigh", "New Zealand": "veryHigh", "Canada": "veryHigh",
  "Israel": "veryHigh", "Japan": "veryHigh", "South Korea": "veryHigh",
  "Italy": "veryHigh", "Spain": "veryHigh", "Malta": "veryHigh", "Cyprus": "veryHigh",
  "Kuwait": "veryHigh", "Saudi Arabia": "veryHigh", "Bahrain": "veryHigh",
  "Puerto Rico": "veryHigh", "United States": "veryHigh",
  // High
  "Portugal": "high", "Greece": "high", "Slovenia": "high", "Czech Republic": "high",
  "Czechia": "high", "Estonia": "high", "Latvia": "high", "Lithuania": "high",
  "Poland": "high", "Slovakia": "high", "Croatia": "high", "Hungary": "high",
  "Turkey": "high", "Chile": "high", "Uruguay": "high", "Panama": "high",
  "Malaysia": "high", "Taiwan": "high", "Oman": "high", "Cayman Islands": "high",
  // Upper-middle
  "China": "upperMiddle", "Mexico": "upperMiddle", "Brazil": "upperMiddle",
  "Argentina": "upperMiddle", "Thailand": "upperMiddle", "Bulgaria": "upperMiddle",
  "Romania": "upperMiddle", "Russia": "upperMiddle", "Kazakhstan": "upperMiddle",
  "Botswana": "upperMiddle", "Gabon": "upperMiddle", "Mauritius": "upperMiddle",
  "Seychelles": "upperMiddle", "Maldives": "upperMiddle", "Montenegro": "upperMiddle",
  "Serbia": "upperMiddle", "North Macedonia": "upperMiddle", "Albania": "upperMiddle",
  "Belarus": "upperMiddle", "Colombia": "upperMiddle", "Costa Rica": "upperMiddle",
  "Dominican Republic": "upperMiddle", "St. Kitts and Nevis": "upperMiddle",
  "Antigua and Barbuda": "upperMiddle", "St. Lucia": "upperMiddle",
  "Grenada": "upperMiddle", "Turks and Caicos": "upperMiddle",
  "British Virgin Islands": "upperMiddle", "Guam": "upperMiddle",
  "Northern Mariana Islands": "upperMiddle", "Bosnia and Herzegovina": "upperMiddle",
  // Lower-middle
  "India": "lowerMiddle", "Indonesia": "lowerMiddle", "Vietnam": "lowerMiddle",
  "Philippines": "lowerMiddle", "Morocco": "lowerMiddle", "Egypt": "lowerMiddle",
  "Tunisia": "lowerMiddle", "South Africa": "lowerMiddle", "Sri Lanka": "lowerMiddle",
  "Bangladesh": "lowerMiddle", "Pakistan": "lowerMiddle", "Uzbekistan": "lowerMiddle",
  "Georgia": "lowerMiddle", "Armenia": "lowerMiddle", "Azerbaijan": "lowerMiddle",
  "Moldova": "lowerMiddle", "Bolivia": "lowerMiddle", "Ecuador": "lowerMiddle",
  "Peru": "lowerMiddle", "Paraguay": "lowerMiddle", "El Salvador": "lowerMiddle",
  "Honduras": "lowerMiddle", "Guatemala": "lowerMiddle", "Nicaragua": "lowerMiddle",
  "Cuba": "lowerMiddle", "Jamaica": "lowerMiddle", "Papua New Guinea": "lowerMiddle",
  "Fiji": "lowerMiddle", "Vanuatu": "lowerMiddle", "Solomon Islands": "lowerMiddle",
  "Samoa": "lowerMiddle", "Tonga": "lowerMiddle", "American Samoa": "lowerMiddle",
  // Low
  "Nepal": "low", "Cambodia": "low", "Myanmar": "low", "Laos": "low",
  "Syria": "low", "Yemen": "low", "Sudan": "low", "Ethiopia": "low",
  "Kenya": "low", "Nigeria": "low", "Ghana": "low", "Senegal": "low",
  "Ivory Coast": "low", "Cameroon": "low", "Uganda": "low", "Tanzania": "low",
  "Madagascar": "low", "Mozambique": "low", "Zimbabwe": "low", "Mali": "low",
  "Burkina Faso": "low", "Rwanda": "low", "Haiti": "low", "Côte d'Ivoire": "low",
  "Democratic Republic of the Congo": "low", "Congo": "low", "Angola": "lowerMiddle",
  "Zambia": "lowerMiddle", "Namibia": "upperMiddle", "Lesotho": "lowerMiddle",
  "Eswatini": "lowerMiddle",
};

// ── Regional base values (€ per duty-free transaction) ──────────────────────
// Calibrated: Europe base €72, Spain = "veryHigh" tier (1.08), MAD ~60M pax (1.04) → €81
// Adjusted base to €69 → 69 × 1.08 × 1.04 ≈ €77.5 ≈ €75 for Madrid ✓
const REGIONAL_BASE = {
  "Europe": 67,
  "Middle East": 88,   // Premium transit hubs (DXB, DOH, AUH)
  "Asia": 74,
  "North America": 52,
  "Latin America": 48,
  "Caribbean": 52,
  "Africa": 43,
  "Oceania": 62,
};

// ── Middle East detection (airports in Asia dataset that are ME) ─────────────
const MIDDLE_EAST_COUNTRIES = new Set([
  "United Arab Emirates", "Qatar", "Saudi Arabia", "Oman",
  "Bahrain", "Kuwait", "Jordan", "Lebanon", "Israel",
]);

// ── Americas sub-classification ─────────────────────────────────────────────
const NORTH_AMERICA_COUNTRIES = new Set(["United States", "Canada", "Puerto Rico"]);

// ── Airport size multiplier (larger airports → better retail → higher basket) ─
function sizeMultiplier(annualPax) {
  if (annualPax >= 80_000_000) return 1.08;
  if (annualPax >= 40_000_000) return 1.04;
  if (annualPax >= 20_000_000) return 1.0;
  if (annualPax >= 10_000_000) return 0.95;
  if (annualPax >= 5_000_000)  return 0.90;
  if (annualPax >= 1_000_000)  return 0.82;
  return 0.72;
}

// ── Resolve effective region for an airport ─────────────────────────────────
function resolveRegion(airport) {
  // If already tagged with a region, check if we need to override for ME
  if (MIDDLE_EAST_COUNTRIES.has(airport.country)) return "Middle East";
  if (airport.region === "Americas") {
    return NORTH_AMERICA_COUNTRIES.has(airport.country) ? "North America" : "Latin America";
  }
  if (airport.region === "Caribbean") return "Caribbean";
  return airport.region || "Europe";
}

/**
 * Estimate the average duty-free transaction value (basket spend) for a given airport.
 * Returns a value in EUR, clamped to [€35, €150].
 *
 * @param {Object} airport — airport object with at least { country, annual_pax, region }
 * @returns {number} estimated average basket spend in EUR
 */
export function estimateAvgBasketSpend(airport) {
  if (!airport) return 75; // sensible default

  const region = resolveRegion(airport);
  const base = REGIONAL_BASE[region] || 65;
  const tier = COUNTRY_GDP_TIER[airport.country] || "high";
  const gdpMult = GDP_TIERS[tier] || 1.0;
  const sizeMult = sizeMultiplier(airport.annual_pax || 0);

  const value = Math.round(base * gdpMult * sizeMult);

  // Clamp to realistic duty-free transaction range
  return Math.max(35, Math.min(150, value));
}

export default estimateAvgBasketSpend;