// The two Trinidad & Tobago gateways the retailer trades in — Piarco
// International Airport (POS) and A.N.R. Robinson International Airport (TAB,
// Tobago) — plus the combined network. Passenger movements (arrivals +
// departures) per the Airports Authority of Trinidad and Tobago: ±3.0M
// combined, split ±2.6M Piarco / ±0.4M Tobago.

// Caribbean non-purchase rate (m1nd-set) — the travellers who walk straight to
// their gates, and the group the pre-activation rate applies to.
export const NON_PURCHASE_SHARE = 0.73;

export const TT_AIRPORTS = [
  {
    code: "POS",
    name: "Piarco International Airport",
    city: "Port of Spain",
    annual_pax: 2600000,
  },
  {
    code: "TAB",
    name: "A.N.R. Robinson International Airport",
    city: "Scarborough, Tobago",
    annual_pax: 400000,
  },
];

export const TT_NETWORK = {
  code: "TT",
  name: "Both airports",
  city: "Trinidad & Tobago",
  annual_pax: TT_AIRPORTS.reduce((sum, a) => sum + a.annual_pax, 0),
};

export const TT_OPTIONS = [...TT_AIRPORTS, TT_NETWORK];

// Travellers who walk straight to their gates, per day — the airport's own
// traffic at the non-purchase rate.
export const walkedPerDay = (annualPax) =>
  Math.round((annualPax / 365) * NON_PURCHASE_SHARE);