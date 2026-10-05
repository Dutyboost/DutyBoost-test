import { createContext, useContext, useMemo, useState } from "react";
import { MODEL, discountFor, CARRIER_PER_DAY } from "./figures";

// Fallbacks for blank calculator fields, so the transaction and network slides
// always show a meaningful scenario.
export const DEFAULT_PASSENGERS_DAY = CARRIER_PER_DAY;
export const DEFAULT_ACTIVATION = Math.round(MODEL.activation * 100);
export const DEFAULT_REDEMPTION = Math.round(MODEL.redemption * 100);
export const DEFAULT_BASKET = MODEL.basket;

export const BLANK_INPUTS = { passengers: "", activation: "", redemption: "", basket: "" };

const NetworkContext = createContext(null);

// Carries the figures typed on the model slide to the transaction and network
// slides, so the whole deck shows one scenario.
export function NetworkProvider({ children }) {
  const [inputs, setInputs] = useState(BLANK_INPUTS);
  const value = useMemo(
    () => ({
      inputs,
      set: (key, v) => setInputs((p) => ({ ...p, [key]: v })),
    }),
    [inputs]
  );
  return <NetworkContext.Provider value={value}>{children}</NetworkContext.Provider>;
}

export function useNetworkInputs() {
  return useContext(NetworkContext) || { inputs: BLANK_INPUTS, set: () => {} };
}

export const readInput = (inputs, key, fallback) =>
  inputs[key] === "" || inputs[key] == null ? fallback : Number(inputs[key]);

// Network economics per day and per year, across all carriers flying to and
// from the Dominican Republic.
export function computeNetwork(inputs) {
  const passengersDay = readInput(inputs, "passengers", DEFAULT_PASSENGERS_DAY);
  const activation = readInput(inputs, "activation", DEFAULT_ACTIVATION) / 100;
  const redemption = readInput(inputs, "redemption", DEFAULT_REDEMPTION) / 100;
  const basket = readInput(inputs, "basket", DEFAULT_BASKET);

  const discount = discountFor(basket);

  const day = {
    passengers: passengersDay,
    activated: passengersDay * activation,
    baskets: passengersDay * activation * redemption,
    gross: passengersDay * activation * redemption * basket,
    fee: passengersDay * activation * redemption * basket * MODEL.platformFee,
    rebate: passengersDay * activation * redemption * basket * MODEL.platformFee * MODEL.partnerRebate,
  };
  day.travellerSaving = day.gross * discount;
  day.retailerNet = day.gross - day.travellerSaving - day.fee;

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

// Annual carrier-side earnings at a given traffic level — used on the airlines
// slide, where each carrier is modelled on its own passenger numbers.
export function carrierEarnings(passengers, inputs) {
  if (!passengers) return null;
  const redemption = readInput(inputs, "redemption", DEFAULT_REDEMPTION) / 100;
  const basket = readInput(inputs, "basket", DEFAULT_BASKET);
  const baskets = passengers * MODEL.activation * redemption;
  const gross = baskets * basket;
  return { baskets, gross, rebate: gross * MODEL.platformFee * MODEL.partnerRebate };
}