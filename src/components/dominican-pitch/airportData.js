// Researched airport figures for the Dominican Republic deck's revenue calculator.
// Store counts come from each airport's own retail directory; passenger volumes
// are the airports' published traffic. Nothing here is estimated by hand.
import { SOURCES } from "./figures";

// Share of daily passenger movements assumed to pass through a retail store —
// the only assumption in the footfall figure, stated on the slide.
export const STORE_ENTRY_SHARE = 0.3;

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

// Travellers entering a store per day, per store, derived from the airport's
// own traffic and store count.
export const AIRPORT_OPTIONS = AIRPORTS.map((a) => ({
  ...a,
  travellersPerStoreDay: Math.round(((a.annualPassengers / 365) * STORE_ENTRY_SHARE) / a.stores),
}));