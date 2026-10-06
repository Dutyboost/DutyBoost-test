// Figures and model constants for the Dominican Republic deck.
// All copy — in English and Spanish — lives in copy.js.

export const SOURCES = {
  puj: "https://www.puntacanainternationalairport.com/en/about-us/news-projects/item/aeropuerto-de-punta-cana-marca-un-hito-historico-y-cierra-2025-con-record-consecutivo-de-vuelos-y-pasajeros",
  jbq: "https://vinci-airports.com/en/our-airports/dominican-republic/la-isabela-airport/",
  sdq: "https://en.wikipedia.org/wiki/Las_Am%C3%A9ricas_International_Airport",
  dr: "https://inmobiliario.do/en/international-airports-handled-more-than-20.3-million-passengers-in-arrivals-and-departures-during-2025/",
  drArrivals: "https://www.arecoa.com/destinos/2026/01/09/record-historico-de-visitantes-para-rd-con-11-6-millones-en-2025/",
  // The store-footfall rate the calculator's travellers figure is built on:
  // m1nd-set's 10-year B1S analysis puts duty free footfall at 36% of
  // international travellers (H1 2026).
  footfall:
    "https://www.trbusiness.com/regional-news/international/m1nd-set-reveals-decade-long-shift-in-duty-free-shopping-behaviour/282698",
};

// The three gateways.
export const AIRPORTS = [
  { code: "PUJ", name: "Punta Cana International", city: "Punta Cana", passengers: "11M+" },
  { code: "SDQ", name: "Las Américas International", city: "Santo Domingo", passengers: "±5.2M" },
  { code: "JBQ", name: "La Isabela International", city: "Santo Domingo", passengers: "42K" },
];

// The country's major airports — the market the whole deck is modelled on.
// PUJ ±11.0M + SDQ ±5.2M + STI ±2.2M in 2025 = ±18.4M passenger movements a year.
export const AIRPORT_PER_DAY = 50400;

// Market context.
export const MARKET = {
  drPassengers: "18.4M",
  gateways: "3",
  purchaseShare: 0.22,
  nonPurchaseShare: 0.78,
};

// ── The in-store funnel — who actually buys once they are inside ─────────────
// m1nd-set's 10-year B1S analysis (H1 2026): 36% of international travellers
// enter a duty free store, 63% of those who enter go on to buy, and the
// remaining 37% walk back out without buying. That last group is the one
// DutyBoost pre-activates. Source: SOURCES.footfall.
export const STORE_FUNNEL = { footfall: 0.36, conversion: 0.63 };

// The country's major airports in 2025, as a number.
export const DR_MOVEMENTS = 18_400_000;

const DR_ENTERING_STORES = DR_MOVEMENTS * STORE_FUNNEL.footfall;

export const DR_STORE_FUNNEL = {
  enter: Math.round(DR_ENTERING_STORES),
  buy: Math.round(DR_ENTERING_STORES * STORE_FUNNEL.conversion),
  leave: Math.round(DR_ENTERING_STORES * (1 - STORE_FUNNEL.conversion)),
};

// ── The DutyBoost model — standard terms, unchanged by market ────────────────
export const MODEL = {
  activation: 0.02, // share of passengers pre-activated with a DutyCredit
  redemption: 0.3, // share of pre-activated travellers who redeem
  basket: 35, // blended basket across the tier mix (USD)
  platformFee: 0.025, // paid by the retailer on validated transactions
};

export const BASKET_CAP = 1000;
export const DISCOUNT_CAP = 60;

export const TIERS = [
  { tier: "Entry", min: 23, max: 56, discMin: 0.05, discMax: 0.075 },
  { tier: "Boarding", min: 57, max: 113, discMin: 0.075, discMax: 0.1 },
  { tier: "Standard", min: 114, max: 170, discMin: 0.1, discMax: 0.125 },
  { tier: "Plus", min: 171, max: 227, discMin: 0.125, discMax: 0.15 },
  { tier: "Lounge", min: 228, max: 284, discMin: 0.15, discMax: 0.175 },
  { tier: "Premium", min: 285, max: 341, discMin: 0.175, discMax: 0.2 },
  { tier: "VIP", min: 342, max: null, discMin: 0.2, discMax: 0.2 },
];

export const tierFor = (basket) =>
  TIERS.find((t) => basket <= (t.max ?? Infinity)) || TIERS[TIERS.length - 1];

export const discountFor = (basket) => {
  const t = tierFor(basket);
  if (!t.max || basket <= t.min) return t.discMin;
  const position = (basket - t.min) / (t.max - t.min);
  return t.discMin + position * (t.discMax - t.discMin);
};

// Per-store illustration for a store inside one of the three gateways.
export const PER_STORE = { travellers: 250000, activation: 0.02, redemption: 0.3, basket: 35 };

export const usd = (n) => `$${Math.round(n).toLocaleString("en-US")}`;

export const usd2 = (n) =>
  `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export const usdShort = (n) =>
  n >= 1_000_000_000
    ? `$${(n / 1_000_000_000).toFixed(2)}B`
    : n >= 1_000_000
      ? `$${(n / 1_000_000).toFixed(2)}M`
      : n >= 1_000
        ? `$${Math.round(n / 1000)}K`
        : usd(n);

export const numShort = (n) =>
  n >= 1_000_000
    ? `${+(n / 1_000_000).toFixed(2)}M`
    : n >= 1_000
      ? `${+(n / 1_000).toFixed(2)}K`
      : `${Math.round(n)}`;

export const num = (n) => Math.round(n).toLocaleString("en-US");

// The tier table as shown on the model slide — built from TIERS so the table and
// the calculator can never disagree.
export const TIER_ROWS = TIERS.map((t) => ({
  tier: t.tier,
  range: t.max ? `$${t.min}–$${t.max}` : `$${t.min}+`,
  disc: t.max ? `${t.discMin * 100}%–${t.discMax * 100}%` : `${t.discMin * 100}% capped`,
  save: t.max
    ? `${usd2(t.min * t.discMin)}–${usd2(Math.min(t.max * t.discMax, DISCOUNT_CAP))}`
    : `Up to ${usd2(DISCOUNT_CAP)}`,
}));