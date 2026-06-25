// Combined global airport dataset — merges all regional datasets
import { EUROPEAN_AIRPORTS } from "./europeanAirports";
import { AFRICAN_AIRPORTS } from "./africanAirports";
import { AMERICAS_AIRPORTS } from "./americasAirports";
import { CARIBBEAN_AIRPORTS } from "./caribbeanAirports";
import { ASIAN_AIRPORTS } from "./asianAirports";
import { OCEANIA_AIRPORTS } from "./oceaniaAirports";

// Ensure European airports also carry a region tag
EUROPEAN_AIRPORTS.forEach(a => {
  if (!a.region) a.region = "Europe";
});

export const GLOBAL_AIRPORTS = [
  ...EUROPEAN_AIRPORTS,
  ...AFRICAN_AIRPORTS,
  ...AMERICAS_AIRPORTS,
  ...CARIBBEAN_AIRPORTS,
  ...ASIAN_AIRPORTS,
  ...OCEANIA_AIRPORTS,
];

// Sort by annual passengers descending
GLOBAL_AIRPORTS.sort((a, b) => b.annual_pax - a.annual_pax);

export default GLOBAL_AIRPORTS;