import { createContext, useContext, useMemo, useState } from "react";
import { MODEL, discountFor } from "../figures";

// Fallbacks used when the calculator on the business-model slide is left blank,
// so the transaction and estate slides always show a sensible scenario (and the
// PDF/PPTX export never renders zeros).
export const DEFAULT_STORES = 4;
export const DEFAULT_TRAVELLERS_DAY = 2000;
export const DEFAULT_ACTIVATION = Math.round(MODEL.activation * 100);
export const DEFAULT_REDEMPTION = Math.round(MODEL.redemption * 100);
export const DEFAULT_BASKET = MODEL.basket;

export const BLANK_INPUTS = {
  airport: "",
  stores: "",
  travellers: "",
  activation: "",
  redemption: "",
  basket: "",
};

const RetailerRevenueContext = createContext(null);

// Holds the figures typed on the business-model slide so the transaction and
// estate slides always read the same scenario.
export function RetailerRevenueProvider({ children }) {
  const [inputs, setInputs] = useState(BLANK_INPUTS);
  const value = useMemo(
    () => ({
      inputs,
      set: (key, v) => setInputs((p) => ({ ...p, [key]: v })),
      setMany: (patch) => setInputs((p) => ({ ...p, ...patch })),
    }),
    [inputs]
  );
  return <RetailerRevenueContext.Provider value={value}>{children}</RetailerRevenueContext.Provider>;
}

export function useRetailerRevenue() {
  return useContext(RetailerRevenueContext) || { inputs: BLANK_INPUTS, set: () => {} };
}

export const readInput = (inputs, key, fallback) =>
  inputs[key] === "" || inputs[key] == null ? fallback : Number(inputs[key]);

// Per-store and estate economics derived from the retailer's own inputs.
export function computeRetailerRevenue(inputs) {
  const stores = readInput(inputs, "stores", DEFAULT_STORES);
  const travellersDay = readInput(inputs, "travellers", DEFAULT_TRAVELLERS_DAY);
  const activation = readInput(inputs, "activation", DEFAULT_ACTIVATION) / 100;
  const redemption = readInput(inputs, "redemption", DEFAULT_REDEMPTION) / 100;
  const basket = readInput(inputs, "basket", DEFAULT_BASKET);

  // The figure entered is the airport's total store footfall, so it is already
  // the traffic through the retailer's stores — the estate, not a per-store count.
  const travellers = travellersDay * 365;
  const activated = travellers * activation;
  const baskets = activated * redemption;
  const gross = baskets * basket;
  const discount = discountFor(basket);
  const travellerSaving = gross * discount;
  const fee = gross * MODEL.platformFee;
  const retailerNet = gross - travellerSaving - fee;

  const estate = { travellers, activated, baskets, gross, travellerSaving, fee, retailerNet };

  return {
    stores,
    travellersDay,
    activation,
    redemption,
    basket,
    perStore: {
      travellers: travellers / stores,
      activated: activated / stores,
      baskets: baskets / stores,
      gross: gross / stores,
      travellerSaving: travellerSaving / stores,
      fee: fee / stores,
      retailerNet: retailerNet / stores,
      discount,
    },
    estate,
  };
}

// Per-store economics at an arbitrary activation rate, for the sensitivity table.
export function perStoreAtActivation(inputs, rate) {
  const stores = readInput(inputs, "stores", DEFAULT_STORES);
  const travellers = (readInput(inputs, "travellers", DEFAULT_TRAVELLERS_DAY) * 365) / stores;
  const redemption = readInput(inputs, "redemption", DEFAULT_REDEMPTION) / 100;
  const basket = readInput(inputs, "basket", DEFAULT_BASKET);

  const baskets = travellers * rate * redemption;
  const gross = baskets * basket;
  const retailerNet = gross - gross * discountFor(basket) - gross * MODEL.platformFee;
  return { baskets, gross, retailerNet };
}