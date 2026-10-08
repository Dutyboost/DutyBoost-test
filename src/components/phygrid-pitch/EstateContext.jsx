import { createContext, useContext, useMemo, useState } from "react";
import { MODEL, NON_PURCHASE_PER_STORE_DAY } from "@/components/phygrid-pitch/model";

// Fallbacks used when the calculator on the revenue-potential slide is left
// blank, so the estate slide always has a sensible scenario (and the PDF/PPTX
// export never renders zeros).
export const DEFAULT_STORES = 1000;
export const DEFAULT_ACTIVATION = Math.round(MODEL.activation * 100);
export const DEFAULT_REDEMPTION = Math.round(MODEL.conversion * 100);
export const DEFAULT_BASKET = MODEL.basket;

export const BLANK_INPUTS = {
  controlled: "",
  travellersDay: "",
  activation: "",
  redemption: "",
  basket: "",
};

const EstateContext = createContext(null);

// Holds the estate inputs typed on the revenue-potential slide so every other
// slide can read the same scenario.
export function EstateProvider({ children }) {
  const [inputs, setInputs] = useState(BLANK_INPUTS);
  const value = useMemo(
    () => ({
      inputs,
      set: (key, v) => setInputs((p) => ({ ...p, [key]: v })),
      setMany: (patch) => setInputs((p) => ({ ...p, ...patch })),
    }),
    [inputs]
  );
  return <EstateContext.Provider value={value}>{children}</EstateContext.Provider>;
}

export function useEstateInputs() {
  return useContext(EstateContext) || { inputs: BLANK_INPUTS, set: () => {} };
}

const read = (inputs, key, fallback) =>
  inputs[key] === "" || inputs[key] == null ? fallback : Number(inputs[key]);

// Travellers who walk straight to their gates, per store per day. An airport
// picked from the global database sets the figure from that airport's own
// traffic; with none selected the estate's own average is used.
export function travellersPerStoreDay(inputs, stores) {
  const typed = inputs.travellersDay;
  if (typed === "" || typed == null) return NON_PURCHASE_PER_STORE_DAY;
  return Number(typed) / (stores || 1);
}

// Per-store, per-year economics derived from the calculator inputs.
export function computeEstate(inputs) {
  const stores = read(inputs, "controlled", DEFAULT_STORES);
  const activation = read(inputs, "activation", DEFAULT_ACTIVATION) / 100;
  const redemption = read(inputs, "redemption", DEFAULT_REDEMPTION) / 100;
  const basket = read(inputs, "basket", DEFAULT_BASKET);

  const travellers = travellersPerStoreDay(inputs, stores) * 365;
  const baskets = travellers * activation * redemption;
  const gross = baskets * basket;
  const pos = gross * MODEL.platformFee * MODEL.posShare;

  const perStore = {
    travellers,
    baskets,
    gross,
    pos,
    retailerNet: gross * (1 - MODEL.discount - MODEL.platformFee),
  };

  return {
    stores,
    activation,
    redemption,
    basket,
    perStore,
    estate: {
      baskets: perStore.baskets * stores,
      gross: perStore.gross * stores,
      pos: perStore.pos * stores,
      retailerNet: perStore.retailerNet * stores,
    },
  };
}

// Per-store economics at an arbitrary activation rate, for the sensitivity table.
export function perStoreAtActivation(inputs, rate) {
  const stores = read(inputs, "controlled", DEFAULT_STORES);
  const travellers = travellersPerStoreDay(inputs, stores) * 365;
  const redemption = read(inputs, "redemption", DEFAULT_REDEMPTION) / 100;
  const basket = read(inputs, "basket", DEFAULT_BASKET);
  const baskets = travellers * rate * redemption;
  const gross = baskets * basket;
  return { baskets, gross, pos: gross * MODEL.platformFee * MODEL.posShare };
}