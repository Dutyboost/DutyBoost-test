// The travel-retail turnover chain Philip Gerzon shared, as used across the
// retail world:
//
//   Turnover = Flow x Penetration x Conversion x Multiple Sale x Average Price
//
// Kept in one place so every surface that reports the formula reads from the
// same term definitions and the same maths.

// What "flow" counts for each way of travelling.
export const FLOW_UNITS = {
  all: "Travellers reached",
  flight: "Departing passengers",
  cruise: "Cruise passengers",
  train: "Rail passengers",
  coach: "Coach passengers",
  car_rental: "Rental days",
  accommodation: "Room nights",
};

// One DutyCredit redeemed at the till is one basket. Item counts arrive with
// the POS feed; until then this term stays at a single basket so the chain
// reconciles with the redeemed basket value we already report a fee on.
export const ITEMS_PER_REDEMPTION = 1;

// Penetration and conversion arrive as percentages.
export const turnoverOf = (terms) =>
  Number(terms.flow || 0) *
  (Number(terms.penetration || 0) / 100) *
  (Number(terms.conversion || 0) / 100) *
  Number(terms.multipleSale || 0) *
  Number(terms.averagePrice || 0);