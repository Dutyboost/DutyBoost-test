import { createContext, useContext, useMemo, useState } from "react";
import { MODEL, discountFor } from "./retailerModel";

// Fallbacks used when the calculator on the business-model slide is left blank,
// so the transaction and estate slides always show a sensible scenario (and the
// PDF/PPTX export never renders zeros).
export const DEFAULT_STORES = 4;
export const DEFAULT_TRAVELLERS_DAY = 2000;
export const DEFAULT_ACTIVATION = Math.round(MODEL.activation * 100);
export const DEFAULT_REDEMPTION = Math.round(MODEL.redemption * 100);
export const DEFAULT_BASKET = MODEL.basket;

export const BLANK_INPUTS = {
  stores: "",
  travellers: "",
  activation: "",
  redemption: "",
  basket: "",
};

const RevenueContext = createContext(null);

// Holds the figures typed on the business-model slide so the transaction and
// estate slides always read the same scenario.
export function RevenueProvider({ children }) {
  const [inputs, setInputs] = useState(BLANK_INPUTS);
  const value = useMemo(
    () => ({
      inputs,
      set: (key, v) => setInputs((p) => ({ ...p, [key]: v })),
    }),
    [inputs]
  );
  return <RevenueContext.Provider value={value}>{children}</RevenueContext.Provider>;
}

export function useRevenueInputs() {
  return useContext(RevenueContext) || { inputs: BLANK_INPUTS, set: () => {} };
}

const read = (inputs, key, fallback) =>
  inputs[key] === "" || inputs[key] == null ? fallback : Number(inputs[key]);

// Per-store, per-year economics derived from the retailer's own inputs.
export function computeRevenue(inputs) {
  const stores = read(inputs, "stores", DEFAULT_STORES);
  const travellersDay = read(inputs, "travellers", DEFAULT_TRAVELLERS_DAY);
  const activation = read(inputs, "activation", DEFAULT_ACTIVATION) / 100;
  const redemption = read(inputs, "redemption", DEFAULT_REDEMPTION) / 100;
  const basket = read(inputs, "basket", DEFAULT_BASKET);

  const travellers = travellersDay * 365;
  const activated = travellers * activation;
  const baskets = activated * redemption;
  const gross = baskets * basket;
  const discount = discountFor(basket);
  const travellerSaving = gross * discount;
  const fee = gross * MODEL.platformFee;
  const retailerNet = gross - travellerSaving - fee;

  const perStore = { travellers, activated, baskets, gross, travellerSaving, fee, retailerNet, discount };

  return {
    stores,
    travellersDay,
    activation,
    redemption,
    basket,
    perStore,
    estate: {
      baskets: perStore.baskets * stores,
      gross: perStore.gross * stores,
      travellerSaving: perStore.travellerSaving * stores,
      fee: perStore.fee * stores,
      retailerNet: perStore.retailerNet * stores,
    },
  };
}

// Per-store economics at an arbitrary activation rate, for the sensitivity table.
export function perStoreAtActivation(inputs, rate) {
  const travellers = read(inputs, "travellers", DEFAULT_TRAVELLERS_DAY) * 365;
  const redemption = read(inputs, "redemption", DEFAULT_REDEMPTION) / 100;
  const basket = read(inputs, "basket", DEFAULT_BASKET);

  const baskets = travellers * rate * redemption;
  const gross = baskets * basket;
  const retailerNet = gross - gross * discountFor(basket) - gross * MODEL.platformFee;
  return { baskets, gross, retailerNet };
}