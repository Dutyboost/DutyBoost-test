// Shared figures for the Trinidad & Tobago retailer presentation.
// Basis: passenger movements (arrivals + departures) across the two airports
// combined — Piarco International Airport and A.N.R. Robinson International
// Airport, Tobago — per the Airports Authority of Trinidad and Tobago.

export const TOTAL_MOVEMENTS = "3M";
export const AIRPORT_COUNT = "2";
export const NON_PURCHASE_RATE = "73%";
export const PURCHASE_RATE = "27%";
export const NON_PURCHASING_MOVEMENTS = "2.19M";

export const AATT_LINK = "https://tntairports.com/";
export const CSO_LINK = "https://cso.gov.tt/subjects/travel-and-tourism/travel-statistics/";

// Incremental potential from the 2.19M non-purchasing movements at the two
// airports: $100 average basket, retailer keeps 87.5% of every qualifying sale.
export const CONVERSION_ROWS = [
  { conv: "+0.5 pp", txns: "11.0K", retail: "$1.10M", ret: "$958K" },
  { conv: "+1 pp", txns: "21.9K", retail: "$2.19M", ret: "$1.92M" },
  { conv: "+2 pp", txns: "43.8K", retail: "$4.38M", ret: "$3.83M" },
  { conv: "+5 pp", txns: "109.5K", retail: "$10.95M", ret: "$9.58M" },
];