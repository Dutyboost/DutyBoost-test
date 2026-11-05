// The travel-retail turnover chain, as used across the retail industry:
//
//   Turnover = Flow x Penetration x Conversion x Multiple Sale x Average Price
//
// Kept in one place so the admin tab (and anything built on it later) reads
// from a single definition of the terms, the per-vertical flow units and the
// starting benchmarks.

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

// Editable starting assumptions per travel type. These are placeholders for a
// partner's own estate figures, not measured data. Penetration and conversion
// are percentages, average price is per unit in EUR.
export const DEFAULT_BENCHMARKS = {
  all: { flow: 1000000, penetration: 45, conversion: 38, multipleSale: 1.5, averagePrice: 40 },
  flight: { flow: 1000000, penetration: 45, conversion: 38, multipleSale: 1.5, averagePrice: 42 },
  cruise: { flow: 400000, penetration: 55, conversion: 42, multipleSale: 1.6, averagePrice: 48 },
  train: { flow: 600000, penetration: 35, conversion: 40, multipleSale: 1.5, averagePrice: 28 },
  coach: { flow: 300000, penetration: 35, conversion: 38, multipleSale: 1.4, averagePrice: 25 },
  car_rental: { flow: 250000, penetration: 55, conversion: 45, multipleSale: 1.8, averagePrice: 55 },
  accommodation: { flow: 200000, penetration: 50, conversion: 50, multipleSale: 1.3, averagePrice: 60 },
};

// Travellers a partner reaches in a period: a modest starting value for the
// attributed view, replaced by the partner's real reach.
export const ATTRIBUTED_DEFAULT_FLOW = 50000;

// Penetration and conversion arrive as percentages.
export const turnoverOf = (terms) =>
  Number(terms.flow || 0) *
  (Number(terms.penetration || 0) / 100) *
  (Number(terms.conversion || 0) / 100) *
  Number(terms.multipleSale || 0) *
  Number(terms.averagePrice || 0);

// What one point on a single lever is worth, holding the other four still.
export const LEVERS = [
  { key: "penetration", label: "Penetration", move: "+1 point" },
  { key: "conversion", label: "Conversion", move: "+1 point" },
  { key: "multipleSale", label: "Multiple sale", move: "+0.1 items" },
  { key: "averagePrice", label: "Average price", move: "+5%" },
];

const bump = (terms, key) => {
  if (key === "averagePrice") return Number(terms.averagePrice || 0) * 1.05;
  if (key === "multipleSale") return Number(terms.multipleSale || 0) + 0.1;
  return Number(terms[key] || 0) + 1;
};

export const leverUplift = (terms, lever) =>
  turnoverOf({ ...terms, [lever.key]: bump(terms, lever.key) }) - turnoverOf(terms);