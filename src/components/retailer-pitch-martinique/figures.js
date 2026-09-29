// Shared figures for the Martinique retailer presentation.
// Basis: passenger movements (arrivals + departures) at Martinique Aimé
// Césaire International Airport (FDF) — 1,859,392 passengers in 2023, the
// latest full year published, presented as 1.86M.

export const TOTAL_MOVEMENTS = "1.86M";
export const AIRPORT_COUNT = "1";
export const NON_PURCHASE_RATE = "73%";
export const PURCHASE_RATE = "27%";
export const NON_PURCHASING_MOVEMENTS = "1.36M";

// 2024 tourism volume (INSEE): 988,301 visitors in total, of which 571,511
// stayover tourists. Share of the Caribbean stayover market: 571,511 / 35M
// ≈ 1.63%, applied to the €2.39B Caribbean DF&TR market (CMI, $2.72B at
// €1 = $1.14) ≈ €39M.
export const TOTAL_VISITORS = "988,301";
export const STAYOVER_VISITORS = "571,511";
export const REGIONAL_MARKET_EUR = "€2.39B";
export const LOCAL_MARKET_EUR = "€39M";

export const FDF_LINK = "https://www.martinique.aeroport.fr/";
export const INSEE_LINK = "https://www.insee.fr/fr/statistiques/8566673?sommaire=8354931";
export const CMI_LINK = "https://www.coherentmarketinsights.com/market-insight/caribbean-duty-free-retailing-market-4934";
export const M1NDSET_LINK = "https://www.gtrmag.com/blog/gtr-magazine-looks-at-the-state-of-travel-and-tourism-in-the-caribbean";
export const CTO_LINK = "https://www.onecaribbean.org/caribbean-tourism-shows-resilient-growth-amid-global-headwinds-in-2025/";
export const AVOLTA_LINK = "https://www.avoltaworld.com/";
export const AVOLTA_MARTINIQUE_LINK = "https://martinique.shopdutyfree.com/en/156/";

// Revenue split of the Martinique airport assortment, applied to the €39M
// Martinique DF&TR market using CMI Caribbean category shares. Categories as
// carried by Avolta's Martinique Duty Free store at FDF (750 m², opened 2023):
// rhums, gastronomy, chocolate, spices, leather goods, jewellery and perfumes.
export const ASSORTMENT_SPLIT = [
  { cat: "Fragrances & Cosmetics", value: "€13M", share: "34%", pct: 100, note: "Perfumes, skincare and cosmetics" },
  { cat: "Wines & Spirits", value: "€9M", share: "22%", pct: 65, note: "Martinique rhums, aged agricole and premium spirits" },
  { cat: "Fashion & Accessories", value: "€6M", share: "16%", pct: 48, note: "Leather goods, watches, jewellery and accessories" },
  { cat: "Local Gastronomy & Specialities", value: "€2M", share: "6%", pct: 18, note: "Chocolate, spices and Antillean gourmet products" },
];

// Incremental potential from the 1.36M non-purchasing movements at FDF: €20
// Entry-tier minimum basket, retailer keeps 92.5% of every qualifying sale
// (5% traveller discount at the Entry tier).
export const CONVERSION_ROWS = [
  { conv: "+0.01 pp", txns: "136", retail: "€2.7K", ret: "€2.5K" },
  { conv: "+0.1 pp", txns: "1.36K", retail: "€27.2K", ret: "€25.1K" },
  { conv: "+0.5 pp", txns: "6.79K", retail: "€136K", ret: "€126K" },
  { conv: "+1 pp", txns: "13.6K", retail: "€272K", ret: "€251K" },
  { conv: "+2 pp", txns: "27.2K", retail: "€543K", ret: "€502K" },
  { conv: "+5 pp", txns: "67.9K", retail: "€1.36M", ret: "€1.26M" },
];