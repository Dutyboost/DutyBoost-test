// Combined global airport dataset — merges all regional datasets
import { EUROPEAN_AIRPORTS } from "./europeanAirports";
import { AFRICAN_AIRPORTS } from "./africanAirports";
import { AMERICAS_AIRPORTS } from "./americasAirports";
import { CARIBBEAN_AIRPORTS } from "./caribbeanAirports";
import { ASIAN_AIRPORTS } from "./asianAirports";
import { OCEANIA_AIRPORTS } from "./oceaniaAirports";

// Supplementary datasets — compiled via AI web search (2024-2025)
import { EUROPEAN_AIRPORTS_EXTRA } from "./europeanAirportsExtra";
import { AMERICAS_AIRPORTS_EXTRA } from "./americasAirportsExtra";
import { ASIAN_AIRPORTS_EXTRA } from "./asianAirportsExtra";
import { OCEANIA_AIRPORTS_EXTRA } from "./oceaniaAirportsExtra";
import { ADDITIONAL_AIRPORTS } from "./additionalAirports";

// Ensure European airports also carry a region tag
EUROPEAN_AIRPORTS.forEach(a => {
  if (!a.region) a.region = "Europe";
});

// Merge all datasets
const ALL_AIRPORTS = [
  ...EUROPEAN_AIRPORTS,
  ...EUROPEAN_AIRPORTS_EXTRA,
  ...AFRICAN_AIRPORTS,
  ...AMERICAS_AIRPORTS,
  ...AMERICAS_AIRPORTS_EXTRA,
  ...CARIBBEAN_AIRPORTS,
  ...ASIAN_AIRPORTS,
  ...ASIAN_AIRPORTS_EXTRA,
  ...OCEANIA_AIRPORTS,
  ...OCEANIA_AIRPORTS_EXTRA,
  ...ADDITIONAL_AIRPORTS,
];

// Deduplicate by IATA code — keep the first occurrence (higher-priority dataset)
const seen = new Set();
export const GLOBAL_AIRPORTS = ALL_AIRPORTS.filter(a => {
  if (seen.has(a.code)) return false;
  seen.add(a.code);
  return true;
});

// Sort by annual passengers descending
GLOBAL_AIRPORTS.sort((a, b) => b.annual_pax - a.annual_pax);

export default GLOBAL_AIRPORTS;