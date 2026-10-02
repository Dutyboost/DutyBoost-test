import { RETAILERS as lagardereRetailers, AIRPORTS as lagardereAirports } from "./demoDataLagardere";
import { RETAILERS as heinemannRetailers, AIRPORTS as heinemannAirports } from "./demoDataHeinemann";
import { RETAILERS as avoltaRetailers, AIRPORTS as avoltaAirports } from "./demoDataAvolta";
import { RETAILERS as avoltaArubaRetailers, AIRPORTS as avoltaArubaAirports } from "./demoDataAvoltaAruba";
import { RETAILERS as dfpWorldRetailers, AIRPORTS as dfpWorldAirports } from "./demoDataDFPWorldDashboard";
import { RETAILERS as sintMaartenRetailers, AIRPORTS as sintMaartenAirports } from "./demoDataSintMaartenDashboard";
import { RETAILERS as trinidadRetailers, AIRPORTS as trinidadAirports } from "./demoDataTrinidadDashboard";
import { CARIBBEAN_DUTY_FREE_LOGO_URL } from "@/components/retailer-pitch-trinidad/CaribbeanDutyFreeLogo";
import { calcSaving } from "@/utils/retailerCalc";

/**
 * Airport Retailer Dashboard — the companies it can be opened for.
 * The company is taken from the URL extension (/retailer-dashboard/<company>).
 * Signed-in retailers always see their live account; the shared public link
 * shows the selected company's representative data set.
 */
export const RETAILER_DASHBOARD_COMPANIES = {
  lagardere: {
    label: "Lagardère Travel Retail",
    companyKey: "lagardere",
    region: "nl",
    currency: "EUR",
    defaultAirport: "AMS",
    retailers: lagardereRetailers,
    airports: lagardereAirports,
  },
  heinemann: {
    label: "Gebr. Heinemann",
    companyKey: "heinemann",
    region: "de",
    currency: "EUR",
    defaultAirport: "FRA",
    retailers: heinemannRetailers,
    airports: heinemannAirports,
  },
  avolta: {
    label: "Avolta",
    companyKey: "avolta",
    region: "ch",
    currency: "EUR",
    defaultAirport: "LHR",
    retailers: avoltaRetailers,
    airports: avoltaAirports,
  },
  "avolta-aruba": {
    label: "Avolta (Aruba)",
    companyKey: "avolta_aruba",
    region: "americas",
    currency: "AWG",
    defaultAirport: "AUA",
    retailers: avoltaArubaRetailers,
    airports: avoltaArubaAirports,
  },
  "dfp-world": {
    label: "DFP World (Duty Free Stores Zimbabwe)",
    companyKey: "dfp_world",
    region: "africa",
    currency: "USD",
    defaultAirport: "HRE",
    retailers: dfpWorldRetailers,
    airports: dfpWorldAirports,
  },
  "sint-maarten": {
    label: "ILTT & Penha Group (Sint Maarten)",
    companyKey: "sint_maarten",
    region: "americas",
    currency: "USD",
    defaultAirport: "SXM",
    retailers: sintMaartenRetailers,
    airports: sintMaartenAirports,
  },
  "trinidad-tobago": {
    label: "Caribbean Duty Free (Trinidad & Tobago)",
    companyKey: "trinidad_tobago",
    region: "americas",
    currency: "USD",
    defaultAirport: "POS",
    logoUrl: CARIBBEAN_DUTY_FREE_LOGO_URL,
    retailers: trinidadRetailers,
    airports: trinidadAirports,
  },
};

export const DEFAULT_RETAILER_COMPANY = "lagardere";

/** A representative store list spread across the company's airports. */
function pickStores(retailers, limit = 12) {
  const byAirport = new Map();
  retailers.forEach((r) => {
    if (!byAirport.has(r.airport)) byAirport.set(r.airport, []);
    byAirport.get(r.airport).push(r);
  });
  const out = [];
  for (let i = 0; out.length < limit; i++) {
    let added = false;
    for (const list of byAirport.values()) {
      if (!list[i]) continue;
      out.push(list[i]);
      added = true;
      if (out.length >= limit) break;
    }
    if (!added) break;
  }
  return out;
}

// One row per store per day, so every store and airport carries activity in every
// period (Daily / Weekly / Monthly / Yearly / Custom) — never a store or airport
// that comes up empty.
const WINDOW_DAYS = 365;

/** Builds the dashboard data set for one company (used only when nobody is signed in). */
export function buildDemoAccount(slug) {
  const company =
    RETAILER_DASHBOARD_COMPANIES[slug] ||
    RETAILER_DASHBOARD_COMPANIES[DEFAULT_RETAILER_COMPANY];

  const retailers = pickStores(company.retailers);
  const stores = retailers.map((r) => ({
    id: r.id,
    store_name: r.name,
    airport: r.airport,
    category: r.category,
  }));

  // Minimum DutyCredit value for the company's market: €20 in Europe, $23 in USD
  // markets. Every redemption is a qualifying sale worth at least this value, so
  // Revenue Generated always equals Total Redemptions × this value.
  const minCredit = company.currency === "EUR" ? 20 : 23;
  const perRedemptionSaving = calcSaving(minCredit);

  const transactions = retailers.flatMap((r, si) => {
    // Redemption pace follows each store's own weight in the network, so no two
    // stores — and no two airports — show the same figures.
    const dailyRedemptions = Math.max(1, (r.redemptions || 24) / 30);
    return Array.from({ length: WINDOW_DAYS }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (WINDOW_DAYS - 1 - i));
      // Weekday rhythm plus a store-specific wave: day-to-day fluctuation that
      // differs per store and airport.
      const weekday = [0.9, 0.95, 1.0, 1.05, 1.15, 1.25, 1.1][d.getDay()];
      const wave = 0.75 + 0.5 * Math.abs(Math.sin((i + si * 13) / 5.7));
      const count = Math.max(1, Math.round(dailyRedemptions * weekday * wave));
      const value = Math.round(count * minCredit * 100) / 100;
      const saving = Math.round(perRedemptionSaving * count * 100) / 100;
      const platformFee = Math.min(Math.round(value * 0.025 * 100) / 100, 25);
      return {
        id: `demo-${r.id}-${i}`,
        store_name: r.name,
        airport: r.airport,
        transaction_value: value,
        discount_amount: saving,
        platform_revenue: platformFee,
        // Per-transaction aggregate figures used by the Custom Aggregation view
        count,
        total_savings: saving,
        total_commission: platformFee,
        refund_status: "none",
        refunded_amount: 0,
        date: d.toISOString().split("T")[0],
        created_date: d.toISOString(),
      };
    });
  });

  const CREDIT_TIERS = [1, 1.25, 1.5, 2];

  const vouchers = Array.from({ length: 12 }, (_, i) => {
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 14 + i);
    return {
      id: `demo-voucher-${i}`,
      voucher_code: `DC-${stores[i % stores.length].airport}-${4200 + i}`,
      discount_percentage: Math.round(minCredit * CREDIT_TIERS[i % 4]),
      expiration_date: expiry.toISOString().split("T")[0],
      status: "active",
      airport: stores[i % stores.length].airport,
    };
  });

  return {
    company,
    retailers,
    stores,
    transactions,
    vouchers,
    // Full airport records — the aggregation view needs country and passenger volume.
    airports: company.airports.map((a) => ({ ...a, id: a.code, code: a.code })),
  };
}