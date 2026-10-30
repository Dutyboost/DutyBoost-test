// Commercial model for the Cruise & Port Retail Partner calculator.
// Every partner models their own single store — no retailer directory needed —
// and stores can be grouped by island / country / region for the full picture.
// All monetary inputs and outputs are held in EUR (the base currency) and
// displayed in the currency the partner selects.

export const PLATFORM_FEE = 0.025; // the retailer's only cost, on validated transactions
export const PARTNER_COMMISSION = 0.005; // travel partner commission, paid by DutyBoost (20% of the fee)
export const BASKET_CAP = 1000; // qualifying spend cap (EUR)
export const DISCOUNT_CAP = 60; // traveller discount cap (EUR)

// DutyCredit tiers in EUR. The traveller discount rises across each band.
export const TIERS = [
  { tier: "Entry", min: 20, max: 50, discMin: 0.05, discMax: 0.075 },
  { tier: "Boarding", min: 50, max: 100, discMin: 0.075, discMax: 0.1 },
  { tier: "Standard", min: 100, max: 150, discMin: 0.1, discMax: 0.125 },
  { tier: "Plus", min: 150, max: 200, discMin: 0.125, discMax: 0.15 },
  { tier: "Lounge", min: 200, max: 250, discMin: 0.15, discMax: 0.175 },
  { tier: "Premium", min: 250, max: 300, discMin: 0.175, discMax: 0.2 },
  { tier: "VIP", min: 300, max: null, discMin: 0.2, discMax: 0.2 },
];

export const tierFor = (basketEur) =>
  TIERS.find((t) => basketEur <= (t.max ?? Infinity)) || TIERS[TIERS.length - 1];

export const discountFor = (basketEur) => {
  const t = tierFor(basketEur);
  if (!t.max || basketEur <= t.min) return t.discMin;
  const position = (basketEur - t.min) / (t.max - t.min);
  return t.discMin + position * (t.discMax - t.discMin);
};

// One store, exactly as a partner would enter it.
// A new store starts completely blank — the partner fills in their own figures.
export const defaultStore = (n, country = "", port = "") => ({
  id: `store-${Date.now()}-${n}`,
  stores: 1,
  fleet: 1,
  shopsPerShip: 1,
  cruiseDays: 7,
  country,
  port,
  passengersPerShip: "",
  passengersPerCoach: "",
  tripsPerCoach: "",
  passengersPerCall: "",
  callsPerYear: "",
  arrivalsPerYear: "",
  passRate: "",
  activation: "",
  redemption: "",
  basket: "",
});

const n = (v) => (v === "" || v === null || v === undefined ? 0 : Number(v));

// Annual figures for one row, in EUR. A row can stand for several stores at the
// same terminal, so every figure scales with the number of stores entered.
// mode "local" models every traveller arriving in the market, however they
// travel; "seaport" models one terminal's ship calls; "fleet" models a cruise
// line's own ships: the fleet, the passengers each ship carries, the length of
// a cruise (which sets how many cruises a ship sails a year) and its shops;
// "coach" models a touring coach fleet: the coaches, the trips each one runs a
// year and the passengers it carries.
export const computeStore = (store, mode = "seaport") => {
  const isFleet = mode === "fleet";
  const isCoach = mode === "coach";
  const ships = Math.max(1, n(store.fleet) || 1);
  const shopsPerShip = Math.max(1, n(store.shopsPerShip) || 1);
  const units = isCoach
    ? ships
    : isFleet
      ? ships * shopsPerShip
      : Math.max(1, n(store.stores) || 1);
  const cruiseDays = Math.max(1, n(store.cruiseDays) || 7);
  const cruisesPerYear = isFleet ? 365 / cruiseDays : 0;
  const annualPassengers = isCoach
    ? ships * n(store.passengersPerCoach) * n(store.tripsPerCoach)
    : isFleet
      ? ships * n(store.passengersPerShip) * cruisesPerYear
      : mode === "local"
        ? n(store.arrivalsPerYear) * units
        : n(store.passengersPerCall) * n(store.callsPerYear) * units;
  const traffic = annualPassengers * (n(store.passRate) / 100);
  const activated = traffic * (n(store.activation) / 100);
  const redemptions = activated * (n(store.redemption) / 100);
  const basket = n(store.basket);
  const gross = redemptions * basket;
  const discountRate = discountFor(basket);
  const discount = gross * discountRate;
  // A travel partner (touring coach) earns a commission and pays nothing; a
  // retailer pays the platform fee on validated sales.
  const fee = isCoach ? 0 : gross * PLATFORM_FEE;
  const commission = isCoach ? gross * PARTNER_COMMISSION : 0;
  const net = isCoach ? commission : gross - discount - fee;

  return {
    ...store,
    units,
    ships,
    shopsPerShip,
    cruisesPerYear,
    annualPassengers,
    traffic,
    activated,
    redemptions,
    gross,
    discountRate,
    discount,
    fee,
    commission,
    net,
    regionLabel: (store.country || "").trim() || "Unassigned",
  };
};

// Grand totals across every store.
export const computeTotals = (results) =>
  results.reduce(
    (acc, r) => ({
      stores: acc.stores + r.units,
      annualPassengers: acc.annualPassengers + r.annualPassengers,
      traffic: acc.traffic + r.traffic,
      redemptions: acc.redemptions + r.redemptions,
      gross: acc.gross + r.gross,
      discount: acc.discount + r.discount,
      fee: acc.fee + r.fee,
      commission: acc.commission + r.commission,
      net: acc.net + r.net,
    }),
    { stores: 0, annualPassengers: 0, traffic: 0, redemptions: 0, gross: 0, discount: 0, fee: 0, commission: 0, net: 0 }
  );

// Subtotals per island / country / region, in the order the stores were added.
export const groupByRegion = (results) => {
  const groups = new Map();
  results.forEach((r) => {
    if (!groups.has(r.regionLabel)) {
      groups.set(r.regionLabel, { region: r.regionLabel, stores: 0, gross: 0, net: 0, redemptions: 0 });
    }
    const g = groups.get(r.regionLabel);
    g.stores += r.units;
    g.gross += r.gross;
    g.net += r.net;
    g.redemptions += r.redemptions;
  });
  return [...groups.values()];
};

export const CURRENCIES = [
  "EUR",
  "USD",
  "GBP",
  "CHF",
  "NOK",
  "SEK",
  "CAD",
  "MXN",
  "BRL",
  "XCD",
  "BSD",
  "BBD",
  "JMD",
  "TTD",
  "DOP",
  "AWG",
  "SRD",
  "BZD",
  "KYD",
  "AUD",
  "NZD",
  "ZAR",
  "JPY",
];

export const numShort = (v) =>
  v >= 1_000_000
    ? `${+(v / 1_000_000).toFixed(2)}M`
    : v >= 1_000
      ? `${+(v / 1_000).toFixed(1)}K`
      : `${Math.round(v)}`;