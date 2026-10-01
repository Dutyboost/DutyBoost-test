import { RETAILERS } from "./demoDataLagardere";
import { calcSaving } from "@/utils/retailerCalc";

/**
 * Representative activity for the publicly shared POS and corporate partner
 * dashboards. These figures are only used when nobody is signed in (a shared
 * demo link) — admins and signed-in partners always see live records.
 */

const DEMO_EMAIL = "john.doe@example.com";
const POS_PLATFORM = "Demo POS Platform";
const CORPORATE_ACCOUNT = "Demo Corporate Account";
const PER_STORE = 4;
const DAYS = 28;

const dateFor = (offset) => {
  const d = new Date();
  d.setDate(d.getDate() - (offset % DAYS));
  return d.toISOString().split("T")[0];
};

// A few demo stores per airport, spread across the first four airports
const STORES = [...new Set(RETAILERS.map((r) => r.airport))]
  .slice(0, 4)
  .flatMap((code) => RETAILERS.filter((r) => r.airport === code).slice(0, 3));

const TRANSACTIONS = STORES.flatMap((store, idx) =>
  Array.from({ length: PER_STORE }, (_, i) => {
    const value = Math.round(store.avg_sale * (0.8 + ((idx + i) % 5) * 0.1) * 100) / 100;
    const fee = Math.min(Math.round(value * 0.025 * 100) / 100, 25);
    return {
      store_name: store.name,
      airport: store.airport,
      transaction_value: value,
      discount_amount: calcSaving(value),
      platform_revenue: fee,
      pos_channel_commission: Math.round(fee * 0.1 * 100) / 100,
      agency_commission: Math.round(fee * 0.2 * 100) / 100,
      pos_channel_partner: POS_PLATFORM,
      agency_email: DEMO_EMAIL,
      date: dateFor(idx * PER_STORE + i),
    };
  })
);

const VOUCHERS = Array.from({ length: 30 }, (_, i) => ({
  status: i % 3 === 0 ? "active" : "redeemed",
  traveler_count: 1 + (i % 3),
  agency_email: DEMO_EMAIL,
  airport: STORES[i % STORES.length]?.airport || "AMS",
  created_date: dateFor(i),
}));

/** The demo company shown in the "your units" card, one per partner type. */
export function demoPartnerUnits(type) {
  if (type === "pos") {
    return [
      {
        company_name: POS_PLATFORM,
        unit_name: POS_PLATFORM,
        unit_detail: "Airport retail network",
        partner_type: "POS Partner",
        activated: true,
        contact_email: DEMO_EMAIL,
      },
    ];
  }
  return [
    {
      company_name: CORPORATE_ACCOUNT,
      unit_name: "Corporate travel programme",
      unit_detail: "All departments",
      partner_type: "Corporate Partner",
      activated: true,
      contact_email: DEMO_EMAIL,
    },
  ];
}

export function demoPartnerTransactions() {
  return TRANSACTIONS;
}

export function demoPartnerVouchers() {
  return VOUCHERS;
}