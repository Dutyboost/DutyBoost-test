// Researched airport figures for the Dominican Republic deck's revenue calculator.
// Store counts come from each airport's own retail directory; passenger volumes
// are the airports' published traffic. Nothing here is estimated by hand.
import { SOURCES } from "./figures";

// No footfall assumption is made: 0% of an airport's daily passenger movements
// are assumed to enter a store. The retailer enters the store footfall itself.

const AIRPORTS = [
  {
    code: "ALL",
    label: "All airports",
    stores: 31,
    annualPassengers: 18_400_000,
    source: SOURCES.dr,
  },
  {
    code: "PUJ",
    label: "Punta Cana (PUJ)",
    stores: 12,
    annualPassengers: 11_000_000,
    source: SOURCES.puj,
  },
  {
    code: "SDQ",
    label: "Santo Domingo (SDQ)",
    stores: 16,
    annualPassengers: 5_200_000,
    source: SOURCES.sdq,
  },
  {
    code: "STI",
    label: "Santiago (STI)",
    stores: 3,
    annualPassengers: 2_200_000,
    source: "https://cibaoairport.com/duty-free/",
  },
];

// Each airport carries only its researched facts — its store count and its
// published traffic. No store footfall is derived from them.
export const AIRPORT_OPTIONS = AIRPORTS;