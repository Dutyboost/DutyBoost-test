// Shared figures for the Trinidad & Tobago retailer presentation.
// Basis: passenger movements (arrivals + departures) across the two airports
// combined — Piarco International Airport and A.N.R. Robinson International
// Airport, Tobago — per the Airports Authority of Trinidad and Tobago.

export const TOTAL_MOVEMENTS = "3M";
export const AIRPORT_COUNT = "2";
export const NON_PURCHASE_RATE = "73%";
export const PURCHASE_RATE = "27%";
export const NON_PURCHASING_MOVEMENTS = "2.19M";

// USD presentation of the pricing — shared conversion for the USD decks.
export { EUR_USD_RATE, EUR_USD_NOTE } from "@/lib/eurUsd";

export const AATT_LINK = "https://tntairports.com/";
export const CSO_LINK = "https://cso.gov.tt/subjects/travel-and-tourism/travel-statistics/";

// Revenue split of the airport assortment, combined across both airports
// (Piarco International Airport and A.N.R. Robinson International Airport,
// Tobago) — the four categories Caribbean Airlines Duty Free carries at both
// airports, applied to the combined $29M Trinidad & Tobago DF&TR market using
// CMI Caribbean category shares. The balance is tobacco, fashion and other
// categories outside this assortment.
export const ASSORTMENT_SPLIT = [
  { cat: "Fragrances & Cosmetics", value: "$9.9M", share: "34%", pct: 100, note: "Boss, Burberry, Coach, Armani, Jimmy Choo" },
  { cat: "Wines & Spirits", value: "$6.4M", share: "22%", pct: 65, note: "Angostura aged rums, premium spirits" },
  { cat: "Confectionery", value: "$2.3M", share: "8%", pct: 24, note: "Lindor and premium chocolate" },
  { cat: "Novelty & Souvenirs", value: "$1.7M", share: "6%", pct: 18, note: "Gift and novelty items" },
];

// Incremental potential from the 2.19M non-purchasing movements at the two
// airports: $100 average basket, retailer keeps 87.5% of every qualifying sale.
export const CONVERSION_ROWS = [
  { conv: "+0.5 pp", txns: "11.0K", retail: "$1.10M", ret: "$958K" },
  { conv: "+1 pp", txns: "21.9K", retail: "$2.19M", ret: "$1.92M" },
  { conv: "+2 pp", txns: "43.8K", retail: "$4.38M", ret: "$3.83M" },
  { conv: "+5 pp", txns: "109.5K", retail: "$10.95M", ret: "$9.58M" },
];