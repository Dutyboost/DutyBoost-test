// Single commercial model for the Phygrid presentation.
// Every slide reads from here, so the deck tells one consistent story.

// ── Sources ──────────────────────────────────────────────────────────────────
export const AVOLTA_FY2025 =
  "https://www.avoltaworld.com/en/press_release/2026-03-11/avolta-reports-strong-2025-advancing-sales-profits-and-cash-generation";
export const AVOLTA_H1_2025 =
  "https://www.avoltaworld.com/en/press_release/2025-07-31/avolta-reports-another-solid-set-results-first-half-2025";
export const AVOLTA_Q1_2026 =
  "https://www.avoltaworld.com/sites/default/files/document/2026-05/Avolta_Q1%202026%20Presentation.pdf";
export const AVOLTA_SITE = "https://www.avoltaworld.com";
export const M1NDSET_LINK = "https://m1nd-set.com/";
export const TFWA_LINK = "https://www.tfwa.com/";
export const MARKETUS_LINK = "https://market.us/report/global-travel-retail-market/";
export const ETRC_LINK = "https://etrc.org/publications/";
export const KEARNEY_LINK =
  "https://www.kearney.com/about/kearney-in-the-media/press/travel-retails-future-flight-path-turning-heightened-volatility-into-tomorrows-market-edge";
export const ACI_RETAIL_LINK =
  "https://www.aci-asiapac.aero/media-centre/news/airport-travel-retail-witnesses-a-fundamental-shift-as-younger-travelers-emerge-as-the-new-big-spenders";

export const linkCls =
  "text-blue-600 font-semibold underline decoration-blue-600/50 hover:decoration-blue-400 hover:text-blue-500 transition-colors";

// ── The addressable estate — Avolta FY2025 (world's largest travel retailer) ──
export const AVOLTA = {
  turnover: "$16.82B",
  outlets: "5,100+",
  locations: "1,000+",
  countries: "70+",
  airports: "350+",
  passengerReach: "~2.5B",
  ebitda: "$1,622m",
};

export const PURCHASE_SHARE = 0.27;
export const NON_PURCHASE_SHARE = 0.73;

const NETWORK_PAX_M = 2500; // million passengers reached
export const NETWORK_NON_PURCHASE_M = Math.round(NETWORK_PAX_M * NON_PURCHASE_SHARE); // ~1,825M
export const NETWORK_CONVERTING_M = NETWORK_PAX_M - NETWORK_NON_PURCHASE_M; // ~675M
export const UPLIFT_1PP_TRAVELLERS_M = Math.round(NETWORK_PAX_M * 0.01); // ~25M
export const ENTRY_BASKET = 23;
export const UPLIFT_1PP_VALUE = NETWORK_PAX_M * 0.01 * ENTRY_BASKET * 1e6; // ≈ $575M

// ── DutyBoost model — one participating store, one year (USD) ────────────────
export const MODEL = {
  travellers: 250000,
  activation: 0.02,
  conversion: 0.30,
  basket: 135, // blended basket across the tier mix
  discount: 0.141, // blended traveller discount
  platformFee: 0.025,
  posShare: 0.1,
};

const activated = Math.round(MODEL.travellers * MODEL.activation);
const baskets = Math.round(activated * MODEL.conversion);
const gross = baskets * MODEL.basket;
const travellerSaving = gross * MODEL.discount;
const fee = gross * MODEL.platformFee;
const pos = fee * MODEL.posShare;

export const PER_STORE = {
  travellers: MODEL.travellers,
  activated,
  baskets,
  gross,
  travellerSaving,
  fee,
  pos,
  dutyboost: fee - pos,
  retailerNet: gross - travellerSaving - fee,
};

// ── DutyBoost model — the full Avolta estate, one year (USD) ─────────────────
// Basis: 2.5B travellers reach the estate; 27% of them purchase; DutyBoost
// pre-activates 0.1% of those purchasing travellers with a DutyCredit; 30% of
// the pre-activated travellers redeem an incremental basket.
export const ESTATE_STORES = 5100;
export const ESTATE_TRAVELLERS = NETWORK_PAX_M * 1e6; // 2.5B
export const ESTATE_PURCHASING = Math.round(ESTATE_TRAVELLERS * PURCHASE_SHARE); // 675M
export const PRE_ACTIVATION = 0.001;
export const ESTATE_ANNUAL = (() => {
  const travellers = ESTATE_TRAVELLERS;
  const purchasing = ESTATE_PURCHASING;
  const activated = Math.round(purchasing * PRE_ACTIVATION);
  const baskets = Math.round(activated * MODEL.conversion);
  const gross = baskets * MODEL.basket;
  const travellerSaving = gross * MODEL.discount;
  const fee = gross * MODEL.platformFee;
  const pos = fee * MODEL.posShare;
  return {
    stores: ESTATE_STORES,
    travellers,
    purchasing,
    activated,
    baskets,
    gross,
    travellerSaving,
    fee,
    pos,
    dutyboost: fee - pos,
    retailerNet: gross - travellerSaving - fee,
  };
})();

// Store counts a POS provider's estate can realistically reach.
export const ESTATE = [500, 1000, 2500];

// Per-store POS-provider commission at different activation rates.
export const perStoreAt = (activation) => {
  const b = Math.round(MODEL.travellers * activation * MODEL.conversion);
  const g = b * MODEL.basket;
  return { baskets: b, gross: g, pos: g * MODEL.platformFee * MODEL.posShare };
};

export const usd = (n) => `$${Math.round(n).toLocaleString("en-US")}`;
export const usd2 = (n) =>
  `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
export const numShort = (n) =>
  n >= 1_000_000_000
    ? `${+(n / 1_000_000_000).toFixed(2)}B`
    : n >= 1_000_000
      ? `${+(n / 1_000_000).toFixed(2)}M`
      : n.toLocaleString("en-US");
export const usdShort = (n) =>
  n >= 1_000_000_000
    ? `$${(n / 1_000_000_000).toFixed(2)}B`
    : n >= 1_000_000
      ? `$${(n / 1_000_000).toFixed(2)}M`
      : n >= 1_000
        ? `$${Math.round(n / 1000)}K`
        : usd(n);