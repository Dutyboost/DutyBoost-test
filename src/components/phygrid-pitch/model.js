// Single commercial model for the Phygrid presentation.
// Every slide reads from here, so the deck tells one consistent story.

export const MARKET_LINK = "https://www.grandviewresearch.com/industry-analysis/travel-retail-market";
// m1nd-set B1S data published by DFNI: footfall 42%, conversion 63% → purchase rate 27%,
// i.e. 73% of international passengers do not purchase.
export const NON_PURCHASE_LINK =
  "https://www.dfnionline.com/latest-news/m1nd-set-reveals-travel-retail-trends-for-european-travellers-24-07-2025/";

// Illustrative model: one participating store, one year.
export const MODEL = {
  travellers: 250000,
  activation: 0.02,
  conversion: 0.30,
  basket: 100,
  travellerSaving: 0.05,
  platformFee: 0.025,
  posShare: 0.10,
};

const activated = Math.round(MODEL.travellers * MODEL.activation);
const baskets = Math.round(activated * MODEL.conversion);
const gross = baskets * MODEL.basket;
const travellerSaving = gross * MODEL.travellerSaving;
const travellerPays = gross - travellerSaving;
const fee = gross * MODEL.platformFee;
const phygrid = fee * MODEL.posShare;
const dutyboost = fee - phygrid;

export const PER_STORE = {
  travellers: MODEL.travellers,
  activated,
  baskets,
  gross,
  travellerSaving,
  travellerPays,
  fee,
  phygrid,
  dutyboost,
  retailerNet: travellerPays - fee,
};

// The retailer earns this much for every €1 Phygrid earns, on the same transactions.
export const RATIO = Math.round(PER_STORE.retailerNet / PER_STORE.phygrid);

export const ESTATE = [100, 250, 500];

// Per-store Phygrid commission at different activation rates.
export const ACTIVATION_SENSITIVITY = [0.01, 0.02, 0.05];

export const perStoreAt = (activation) => {
  const b = Math.round(MODEL.travellers * activation * MODEL.conversion);
  const g = b * MODEL.basket;
  return { baskets: b, gross: g, phygrid: g * MODEL.platformFee * MODEL.posShare };
};

export const eur = (n) => `€${Math.round(n).toLocaleString("en-GB")}`;
export const eur2 = (n) =>
  `€${n.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
export const millions = (n) => `€${(n / 1_000_000).toFixed(1)}M`;