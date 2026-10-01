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

// A full year of activity per store (≈24 redemptions a month), so that the
// dashboard's Daily / Monthly / Yearly / Custom views each show their own total.
const PER_STORE = 288;
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

  const transactions = retailers.flatMap((r, si) =>
    Array.from({ length: PER_STORE }, (_, i) => {
      const value = Math.round(r.avg_sale * (0.7 + ((si + i) % 6) * 0.1) * 100) / 100;
      const d = new Date();
      d.setDate(d.getDate() - Math.floor((i / PER_STORE) * WINDOW_DAYS));
      const saving = calcSaving(value);
      const platformFee = Math.min(Math.round(value * 0.025 * 100) / 100, 25);
      return {
        id: `demo-${r.id}-${i}`,
        store_name: r.name,
        airport: r.airport,
        transaction_value: value,
        discount_amount: saving,
        platform_revenue: platformFee,
        // Per-transaction aggregate figures used by the Custom Aggregation view
        count: 1,
        total_savings: saving,
        total_commission: platformFee,
        refund_status: "none",
        refunded_amount: 0,
        date: d.toISOString().split("T")[0],
        created_date: d.toISOString(),
      };
    })
  );

  // Minimum DutyCredit value for the company's market: €20 in Europe, $23 in USD markets.
  // Credit amounts are already expressed in the company's currency (not EUR base).
  const minCredit = company.currency === "EUR" ? 20 : 23;
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