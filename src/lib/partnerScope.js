/**
 * Links platform activity back to a single partner. Each partner type is joined
 * to transactions through a different field — the booking email for travel and
 * corporate partners, the channel partner for POS, the airport for airports and
 * the stocked category for suppliers — so the matching rules live here and are
 * shared by the partner dashboards and the admin directory.
 */
const norm = (v) => (v == null ? "" : String(v).trim().toLowerCase());

const matchesAny = (value, list) => {
  const v = norm(value);
  if (!v) return false;
  return list.some((x) => {
    const n = norm(x);
    return n && (v.includes(n) || n.includes(v));
  });
};

const sameEmail = (a, b) => norm(a) !== "" && norm(a) === norm(b);

/**
 * @param type scope key (pos | airport | wholesale | travel | corporate)
 * @param ctx  { user, units, transactions, vouchers, stores }
 */
export function resolvePartnerScope(type, { user, units = [], transactions = [], vouchers = [], stores = [] }) {
  const company = units[0]?.company_name || "";
  const unitNames = [...new Set(units.map((u) => u.unit_name).filter(Boolean))];
  const codes = [...new Set(units.map((u) => u.airport_code).filter(Boolean))];
  const categories = [...new Set(units.map((u) => u.category).filter(Boolean))];
  const emails = [...new Set([user?.email, units[0]?.contact_email].filter(Boolean))];
  const base = { company, unitNames, codes, categories };

  if (type === "pos") {
    const keys = [company, ...unitNames, ...codes].filter(Boolean);
    return {
      ...base,
      transactions: transactions.filter((t) => matchesAny(t.pos_channel_partner, keys)),
      vouchers: [],
      stores: [],
    };
  }

  if (type === "airport") {
    const keys = [company, ...unitNames, ...codes].filter(Boolean);
    const scopedStores = stores.filter(
      (s) => matchesAny(s.airport_code, codes) || matchesAny(s.airport_name, [company, ...unitNames])
    );
    const storeNames = new Set(scopedStores.map((s) => s.store_name));
    return {
      ...base,
      transactions: transactions.filter(
        (t) => matchesAny(t.airport, keys) || storeNames.has(t.store_name)
      ),
      vouchers: vouchers.filter((v) => matchesAny(v.airport, keys)),
      stores: scopedStores,
    };
  }

  if (type === "wholesale") {
    const scopedStores = categories.length
      ? stores.filter((s) => matchesAny(s.category, categories))
      : [];
    const storeNames = new Set(scopedStores.map((s) => s.store_name));
    return {
      ...base,
      transactions: transactions.filter(
        (t) => storeNames.has(t.store_name) || matchesAny(t.store_name, unitNames)
      ),
      vouchers: [],
      stores: scopedStores,
    };
  }

  // Travel and corporate partners are linked through the booking email.
  return {
    ...base,
    transactions: transactions.filter((t) => emails.some((e) => sameEmail(e, t.agency_email))),
    vouchers: vouchers.filter((v) => emails.some((e) => sameEmail(e, v.agency_email))),
    stores: [],
  };
}

export function buildPartnerMetrics({
  transactions = [],
  vouchers = [],
  stores = [],
  units = [],
  commissionField = "platform_revenue",
}) {
  const sum = (list, key) => list.reduce((s, x) => s + (Number(x[key]) || 0), 0);
  const redemptions = transactions.length;
  const grossVolume = sum(transactions, "transaction_value");
  const creditsIssued = vouchers.length;
  const creditsRedeemed = vouchers.filter((v) => v.status === "redeemed").length;

  return {
    redemptions,
    grossVolume,
    platformFee: sum(transactions, "platform_revenue"),
    commission: sum(transactions, commissionField),
    savings: sum(transactions, "discount_amount"),
    passengers: sum(vouchers, "traveler_count"),
    creditsIssued,
    creditsRedeemed,
    activeCredits: vouchers.filter((v) => v.status === "active").length,
    avgBasket: redemptions ? grossVolume / redemptions : 0,
    redemptionRate: creditsIssued ? (creditsRedeemed / creditsIssued) * 100 : 0,
    storesInScope: stores.length,
    unitsTotal: units.length,
    unitsLive: units.filter((u) => u.activated).length,
  };
}