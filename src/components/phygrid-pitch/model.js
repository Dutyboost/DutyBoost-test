// Single commercial model for the Phygrid presentation.
// Every slide reads from here, so the deck tells one consistent story.
//
// The addressable estate is the GLOBAL airport retail landscape rather than any
// single operator: ~4,000 commercial airports with terminal retail, ±45,000
// stores, and ~9.8B annual travel moments (ACI World, 2025).

// ── Sources ──────────────────────────────────────────────────────────────────
export const ACI_TRAFFIC_LINK =
  "https://aci.aero/2026/09/23/global-airport-passenger-traffic-reaches-record-9-8-billion-in-2025-airports-council-international-world-reports/";
export const GENERATION_RESEARCH_LINK = "https://www.generationresearch.com/";
export const M1NDSET_LINK =
  "https://www.gtrmag.com/blog/gtr-magazine-looks-at-the-state-of-travel-and-tourism-in-the-caribbean";
export const TFWA_LINK = "https://www.tfwa.com/membership/tfwa-research-podcasts-100017198";
export const ACI_RETAIL_LINK =
  "https://www.aci-asiapac.aero/media-centre/news/airport-travel-retail-witnesses-a-fundamental-shift-as-younger-travelers-emerge-as-the-new-big-spenders";

export const linkCls =
  "text-blue-600 font-semibold underline decoration-blue-600/50 hover:decoration-blue-400 hover:text-blue-500 transition-colors";

// ── The addressable estate — global airport retail ───────────────────────────
export const GLOBAL = {
  stores: "±45,000",
  airports: "±4,000",
  moments: "±9.8B",
  market: "€60B",
};

export const PURCHASE_SHARE = 0.27;
export const NON_PURCHASE_SHARE = 0.73;

const GLOBAL_PAX_M = 9800; // million annual travel moments (passenger movements)
export const GLOBAL_NON_PURCHASE_M = Math.round(GLOBAL_PAX_M * NON_PURCHASE_SHARE); // ~3,504M
export const GLOBAL_CONVERTING_M = GLOBAL_PAX_M - GLOBAL_NON_PURCHASE_M; // ~1,296M
export const UPLIFT_01PP_TRAVELLERS_M = Math.round(GLOBAL_PAX_M * 0.001); // ~10M
export const ENTRY_BASKET = 23;
export const UPLIFT_01PP_VALUE = GLOBAL_PAX_M * 0.001 * ENTRY_BASKET * 1e6; // ≈ $225M

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

// ── DutyBoost model — the global airport retail estate, one year (USD) ───────
// Basis: ~9.8B travel moments reach the estate; DutyBoost pre-activates 0.1% of
// them with a DutyCredit; 30% of the pre-activated travellers redeem an
// incremental basket. 27% of travellers purchase (context only).
export const ESTATE_STORES = 45000;
export const ESTATE_TRAVELLERS = GLOBAL_PAX_M * 1e6; // 9.8B
export const ESTATE_PURCHASING = Math.round(ESTATE_TRAVELLERS * PURCHASE_SHARE); // 1.3B
export const PRE_ACTIVATION = 0.001;
export const ESTATE_ANNUAL = (() => {
  const travellers = ESTATE_TRAVELLERS;
  const purchasing = ESTATE_PURCHASING;
  const activated = Math.round(travellers * PRE_ACTIVATION);
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