import { createContext, useContext, useMemo, useState } from "react";
import { MODEL, discountFor } from "./dealModel";

// Fallbacks used when the calculator on the model slide is left blank, so the
// transaction and network slides always show a sensible scenario.
export const DEFAULT_PASSENGERS_DAY = 10000;
export const DEFAULT_ACTIVATION = Math.round(MODEL.activation * 100);
export const DEFAULT_REDEMPTION = Math.round(MODEL.redemption * 100);
export const DEFAULT_BASKET = MODEL.basket;

export const BLANK_INPUTS = {
  passengers: "",
  activation: "",
  redemption: "",
  basket: "",
};

const DealContext = createContext(null);

// Holds the figures typed on the model slide so the transaction and network
// slides always read the same scenario.
export function DealProvider({ children }) {
  const [inputs, setInputs] = useState(BLANK_INPUTS);
  const value = useMemo(
    () => ({
      inputs,
      set: (key, v) => setInputs((p) => ({ ...p, [key]: v })),
    }),
    [inputs]
  );
  return <DealContext.Provider value={value}>{children}</DealContext.Provider>;
}

export function useDealInputs() {
  return useContext(DealContext) || { inputs: BLANK_INPUTS, set: () => {} };
}

export const readInput = (inputs, key, fallback) =>
  inputs[key] === "" || inputs[key] == null ? fallback : Number(inputs[key]);

// Per-day and per-year economics across the Caribbean Airlines network, derived
// from the figures entered on the model slide.
export function computeDeal(inputs) {
  const passengersDay = readInput(inputs, "passengers", DEFAULT_PASSENGERS_DAY);
  const activation = readInput(inputs, "activation", DEFAULT_ACTIVATION) / 100;
  const redemption = readInput(inputs, "redemption", DEFAULT_REDEMPTION) / 100;
  const basket = readInput(inputs, "basket", DEFAULT_BASKET);

  const discount = discountFor(basket);

  const activatedDay = passengersDay * activation;
  const basketsDay = activatedDay * redemption;
  const grossDay = basketsDay * basket;
  const savingDay = grossDay * discount;
  const feeDay = grossDay * MODEL.platformFee;
  const rebateDay = feeDay * MODEL.partnerRebate;
  const retailerNetDay = grossDay - savingDay - feeDay;

  const day = {
    passengers: passengersDay,
    activated: activatedDay,
    baskets: basketsDay,
    gross: grossDay,
    travellerSaving: savingDay,
    fee: feeDay,
    rebate: rebateDay,
    retailerNet: retailerNetDay,
  };

  const year = {};
  Object.keys(day).forEach((k) => {
    year[k] = day[k] * 365;
  });
  year.groupNet = year.retailerNet + year.rebate;

  return { passengersDay, activation, redemption, basket, discount, day, year };
}

// Annual economics at an arbitrary activation rate, for the sensitivity table.
export function atActivation(inputs, rate) {
  const passengers = readInput(inputs, "passengers", DEFAULT_PASSENGERS_DAY) * 365;
  const redemption = readInput(inputs, "redemption", DEFAULT_REDEMPTION) / 100;
  const basket = readInput(inputs, "basket", DEFAULT_BASKET);

  const baskets = passengers * rate * redemption;
  const gross = baskets * basket;
  const fee = gross * MODEL.platformFee;
  const rebate = fee * MODEL.partnerRebate;
  const retailerNet = gross - gross * discountFor(basket) - fee;

  return { baskets, gross, fee, rebate, retailerNet, groupNet: retailerNet + rebate };
}