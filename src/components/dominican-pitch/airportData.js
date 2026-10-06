// Researched airport figures for the Dominican Republic deck's revenue calculator.
// Store counts come from each airport's own retail directory; passenger volumes
// are the airports' published traffic. Nothing here is estimated by hand.
import { SOURCES } from "./figures";

// Share of an airport's daily passenger movements that walk into a store.
// m1nd-set puts duty-free store footfall at around 36% of international
// travellers; the airport's stores share that footfall between them, so a store
// in a busier airport sees more traffic and the total always stays at the
// industry footfall rate regardless of how many stores the airport has.
export const STORE_FOOTFALL_SHARE = 0.36;

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

// Travellers entering a store per day, per store: the airport's daily movements
// at the industry footfall rate, shared across its stores.
export const AIRPORT_OPTIONS = AIRPORTS.map((a) => ({
  ...a,
  travellersPerStoreDay: Math.round(
    ((a.annualPassengers / 365) * STORE_FOOTFALL_SHARE) / a.stores
  ),
}));