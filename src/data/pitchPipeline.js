// The pitch pipeline: every commercial pitch DutyBoost has built, the market it
// addresses, and the platform revenue it would bring at the standard model.
//
// One formula, applied identically to every row:
//   baskets = addressed passenger movements × pre-activation × redemption
//   revenue = 2.5% of the qualifying basket — capped at $1,000 spend / $25 fee
//
// Two scenarios are shown side by side:
//   Minimum  — half the pre-activation and a lower redemption than any deck assumes
//   Modelled — the standard the decks themselves use (2% / 30%)
//
// "Movements" is the addressable traffic the deck is built on: passenger
// movements (arrivals + departures) where the deck counts them that way, and
// passengers carried where the counterparty is a carrier.

export const PLATFORM_FEE = 0.025;
export const FEE_CAP = 25;
export const BASKET_CAP = 1000;

export const SCENARIOS = {
  minimum: { activation: 0.01, redemption: 0.25 },
  modelled: { activation: 0.02, redemption: 0.3 },
};

export const basketsFor = (movements, scenario) =>
  movements * scenario.activation * scenario.redemption;

export const platformRevenue = (movements, basket, scenario, fee = PLATFORM_FEE) => {
  const baskets = basketsFor(movements, scenario);
  const qualifying = Math.min(basket, BASKET_CAP);
  return Math.min(baskets * qualifying * fee, baskets * FEE_CAP);
};

export const CATEGORIES = ["Retailer", "Travel Partner", "Airline", "Airport", "Wholesale"];

export const STATUSES = ["Identified", "Deck ready", "Sent", "In discussion", "Pilot", "Signed"];

export const PITCHES = [
  {
    id: "dr-retailer",
    name: "Dominican Republic — Retailer Deck",
    route: "/dominican-republic-pitch",
    category: "Retailer",
    territory: "Dominican Republic",
    movements: 18400000,
    basket: 35,
    basis: "18.4M passenger movements in 2025 across PUJ, SDQ and STI.",
    status: "In discussion",
  },
  {
    id: "trinidad-retailer",
    name: "Trinidad & Tobago — Retailer Deck",
    route: "/retailer-pitch-trinidad-tobago",
    category: "Retailer",
    territory: "Trinidad & Tobago",
    movements: 3000000,
    basket: 135,
    basis: "3M movements across Piarco and Tobago (Airports Authority of T&T).",
    status: "Sent",
  },
  {
    id: "martinique-retailer",
    name: "Martinique — Retailer Deck",
    route: "/retailer-pitch-martinique",
    category: "Retailer",
    territory: "Martinique",
    movements: 1860000,
    basket: 23,
    basis: "1.86M movements at Aimé Césaire (FDF), latest full year.",
    status: "Sent",
  },
  {
    id: "sxm-retailer",
    name: "Sint Maarten — Caribbean Retailer Deck",
    route: "/retailer-pitch-sxm",
    category: "Retailer",
    territory: "Sint Maarten",
    movements: 1711988,
    basket: 23,
    basis: "855,994 arrivals at SXM in 2025, counted in and out.",
    status: "In discussion",
  },
  {
    id: "aruba-retailer",
    name: "Aruba — Avolta Retailer Deck",
    route: "/retailer-pitch-avolta-aruba",
    category: "Retailer",
    territory: "Aruba",
    movements: 3000000,
    basis: "3M+ passengers at Queen Beatrix International (AUA).",
    basket: 23,
    status: "Sent",
  },
  {
    id: "lagardere-retailer",
    name: "Lagardère Travel Retail — Group Deck",
    route: "/retailer-pitch-lagardere",
    category: "Retailer",
    territory: "Group — Schiphol anchor",
    movements: 71700000,
    basket: 23,
    basis: "71.7M passengers at Schiphol (AMS), the group's joint-venture anchor in the deck.",
    status: "Sent",
  },
  {
    id: "schiphol-retailer",
    name: "Schiphol Airport Retail — Deck",
    route: "/schiphol-retailer-presentation",
    category: "Retailer",
    territory: "Netherlands",
    movements: 71700000,
    basket: 23,
    basis: "71.7M passengers through Schiphol in 2024.",
    status: "Sent",
  },
  {
    id: "afklm-partner",
    name: "Air France-KLM — Travel Partner Deck",
    route: "/travel-partner-pitch-afklm",
    category: "Travel Partner",
    territory: "France / Netherlands",
    movements: 102800000,
    basket: 135,
    basis: "102.8M passengers carried by the AF-KLM Group in 2025.",
    status: "Sent",
  },
  {
    id: "caribbean-airlines",
    name: "Caribbean Airlines — Triple-Sided Deck",
    route: "/caribbean-airlines-revenue-pitch",
    category: "Airline",
    territory: "Caribbean",
    movements: 3650000,
    basket: 135,
    basis: "10,000 passengers a day on the carrier's network (deck default), both directions.",
    status: "In discussion",
  },
  {
    id: "aruba-airport",
    name: "Aruba Airport — Airport Deck",
    route: "/airport-pitch-aruba",
    category: "Airport",
    territory: "Aruba",
    movements: 3000000,
    basket: 23,
    basis: "3M+ passengers at AUA; airport-level pitch on the same traffic.",
    status: "Sent",
  },
  {
    id: "sxm-supplier",
    name: "Sint Maarten — Wholesale Supplier Deck",
    route: "/retailer-supplier-pitch-sxm",
    category: "Wholesale",
    territory: "Sint Maarten",
    movements: 1711988,
    basket: 23,
    basis: "855,994 arrivals at SXM in 2025, counted in and out.",
    status: "In discussion",
  },
];

// Pitches that carry no market revenue of their own: they open deployment
// capacity, act as templates for a named account, or serve an internal purpose.
export const ENABLER_GROUPS = [
  {
    title: "Technology partners",
    note: "These unlock the retailers on a provider's estate — they carry no revenue line of their own.",
    items: [
      { name: "Phygrid — Store Technology Deck", route: "/phygrid-pitch", role: "±45,000-store global estate" },
    ],
  },
  {
    title: "Templates — no market attached",
    note: "The base decks, ready to be pointed at a named account.",
    items: [
      { name: "Retailer Pitch Deck", route: "/retailer-pitch", role: "Template" },
      { name: "Travel Partner Pitch Deck", route: "/travel-partner-pitch", role: "Template" },
      { name: "Airport Pitch Deck", route: "/airport-pitch", role: "Template" },
      { name: "Retailer Presentation (dark)", route: "/retailer-presentation-dark", role: "Template" },
      { name: "Travel Partner Presentation", route: "/travel-partner-presentation", role: "Template" },
    ],
  },
  {
    title: "Collateral & one-pagers",
    note: "Leave-behinds handed over with a pitch.",
    items: [
      { name: "Why DutyBoost — One Pager", route: "/why-dutyboost", role: "One-pager" },
      { name: "Flight Partner — One Pager", route: "/flight-partner-one-pager", role: "One-pager" },
      { name: "Accommodation Partner — One Pager", route: "/accommodation-partner-one-pager", role: "One-pager" },
      { name: "Car Rental Partner — One Pager", route: "/car-rental-partner-one-pager", role: "One-pager" },
      { name: "Retailer — One Pager", route: "/retailer-one-pager", role: "One-pager" },
      { name: "Travel Stack — One Pager", route: "/agglomeration-travel-partner-one-pager", role: "One-pager" },
    ],
  },
  {
    title: "Internal — no market revenue",
    note: "Not counterparty pitches: they fund, protect or explain the business.",
    items: [
      { name: "Investor Pitch Deck", route: "/investor-pitch", role: "Fundraise" },
      { name: "Investor Pitch Deck V2", route: "/investor-pitch-v2", role: "Fundraise" },
      { name: "Patent Presentation", route: "/patent-presentation", role: "IP" },
      { name: "DutyBoost Presentation — Global", route: "/dutyboost-presentation", role: "Corporate" },
      { name: "DutyBoost Presentation — Aruba", route: "/dutyboost-presentation-aruba", role: "Corporate" },
      { name: "DutyBoost Presentation — Sint Maarten", route: "/dutyboost-presentation-sint-maarten", role: "Corporate" },
      { name: "DutyBoost Presentation — Zimbabwe", route: "/dutyboost-presentation-zim", role: "Corporate" },
    ],
  },
];

export const usd = (n) => `$${Math.round(n).toLocaleString("en-US")}`;

export const usdShort = (n) =>
  n >= 1_000_000
    ? `$${(n / 1_000_000).toFixed(2)}M`
    : n >= 1_000
      ? `$${Math.round(n / 1000)}K`
      : `$${Math.round(n)}`;

export const num = (n) => Math.round(n).toLocaleString("en-US");

export const numShort = (n) =>
  n >= 1_000_000
    ? `${+(n / 1_000_000).toFixed(2)}M`
    : n >= 1_000
      ? `${+(n / 1_000).toFixed(1)}K`
      : `${Math.round(n)}`;