// Single commercial model for the Caribbean Airlines × DutyBoost deck.
// Caribbean Airlines sits on both sides of the same transaction: it pays the
// platform fee as Retailer and earns a share of it back as Travel Partner.

export const MODEL = {
  activation: 0.02, // share of passengers pre-activated with a DutyCredit
  redemption: 0.3, // share of pre-activated travellers who redeem
  basket: 135, // blended basket across the tier mix (USD)
  platformFee: 0.025, // paid by the retailer on validated transactions
  partnerRebate: 0.2, // share of the platform fee returned to the Travel Partner
};

// Qualifying spend is capped at $1,000 — anything above that stays with the
// retailer — and the traveller discount at $60.
export const BASKET_CAP = 1000;
export const DISCOUNT_CAP = 60;

// 20% of the 2.5% fee comes back as Travel Partner — 0.5% of the qualifying sale.
export const PARTNER_RATE = MODEL.platformFee * MODEL.partnerRebate;
export const NET_PLATFORM_RATE = MODEL.platformFee - PARTNER_RATE;

// DutyCredit tiers (USD). The discount rises across each band, so any blended
// basket — from the $23 minimum up to the caps — resolves to a tier and a rate.
export const TIERS = [
  { tier: "Entry", min: 23, max: 56, discMin: 0.05, discMax: 0.075 },
  { tier: "Boarding", min: 57, max: 113, discMin: 0.075, discMax: 0.1 },
  { tier: "Standard", min: 114, max: 170, discMin: 0.1, discMax: 0.125 },
  { tier: "Plus", min: 171, max: 227, discMin: 0.125, discMax: 0.15 },
  { tier: "Lounge", min: 228, max: 284, discMin: 0.15, discMax: 0.175 },
  { tier: "Premium", min: 285, max: 341, discMin: 0.175, discMax: 0.2 },
  { tier: "VIP", min: 342, max: null, discMin: 0.2, discMax: 0.2 },
];

export const tierFor = (basket) =>
  TIERS.find((t) => basket <= (t.max ?? Infinity)) || TIERS[TIERS.length - 1];

export const discountFor = (basket) => {
  const t = tierFor(basket);
  if (!t.max || basket <= t.min) return t.discMin;
  const position = (basket - t.min) / (t.max - t.min);
  return t.discMin + position * (t.discMax - t.discMin);
};

export const usd = (n) => `$${Math.round(n).toLocaleString("en-US")}`;

export const usd2 = (n) =>
  `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export const usdShort = (n) =>
  n >= 1_000_000_000
    ? `$${(n / 1_000_000_000).toFixed(2)}B`
    : n >= 1_000_000
      ? `$${(n / 1_000_000).toFixed(2)}M`
      : n >= 1_000
        ? `$${Math.round(n / 1000)}K`
        : usd(n);

export const numShort = (n) =>
  n >= 1_000_000
    ? `${+(n / 1_000_000).toFixed(2)}M`
    : n >= 1_000
      ? `${+(n / 1_000).toFixed(2)}K`
      : `${Math.round(n)}`;