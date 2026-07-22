// ILTT & Penha Group (Sint Maarten) — Princess Juliana International Airport (SXM)
//
// Single-airport network: 6 retail stores at SXM operated by a joint venture
// between two local concessionaires:
//   • International Liquor & Tobacco Trading N.V. (ILTT) — Princess Promenade
//     duty-free stores (liquor, tobacco, spirits, wine, beer & beverages)
//   • Penha Group — Caribbean luxury retailer (perfumes, cosmetics, skincare,
//     luxury accessories), founded in Curaçao in 1865
//
// Passenger figures: ~1.77M annual / ~4,836 daily (PJIAE 2023).

const STORE_NAMES = [
  "ILTT – Princess Promenade (Liquor & Tobacco)",
  "ILTT – Princess Promenade (Spirits & Wine)",
  "ILTT – Princess Promenade (Beer & Beverages)",
  "Penha Duty Free (Perfumes & Cosmetics)",
  "Penha Duty Free (Skincare & Fragrances)",
  "Penha Duty Free (Luxury Accessories)",
];

// Zipf-like weights: flagship liquor & tobacco gets the largest share,
// followed by perfumes/cosmetics and spirits/wine.
const WEIGHTS = [0.28, 0.20, 0.10, 0.20, 0.12, 0.10];

export const AIRPORTS_FULL = [
  {
    code: "SXM",
    name: "Princess Juliana International Airport",
    city: "Sint Maarten",
    country: "Sint Maarten",
    region: "Caribbean",
    daily_pax: 4836,
    annual_pax: 1765000,
    stores: STORE_NAMES.map((name, i) => ({ name, weight: WEIGHTS[i] })),
  },
];

// ILTT-only airport entry (3 Princess Promenade duty-free outlets)
export const ILTT_AIRPORTS_FULL = [
  {
    code: "SXM",
    name: "Princess Juliana International Airport",
    city: "Sint Maarten",
    country: "Sint Maarten",
    region: "Caribbean",
    daily_pax: 4836,
    annual_pax: 1765000,
    stores: STORE_NAMES.slice(0, 3).map((name, i) => ({ name, weight: WEIGHTS[i] })),
  },
];

// Penha Duty Free airport entry (3 luxury retail outlets)
export const PENHA_AIRPORTS_FULL = [
  {
    code: "SXM",
    name: "Princess Juliana International Airport",
    city: "Sint Maarten",
    country: "Sint Maarten",
    region: "Caribbean",
    daily_pax: 4836,
    annual_pax: 1765000,
    stores: STORE_NAMES.slice(3).map((name, i) => ({ name, weight: WEIGHTS[i + 3] })),
  },
];

export function getSintMaartenRetailerData() {
  return {
    name: "ILTT & Penha Group (Sint Maarten)",
    airports: AIRPORTS_FULL,
    storeCount: STORE_NAMES.length,
  };
}