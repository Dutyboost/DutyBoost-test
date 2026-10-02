import {
  TicketPercent,
  CreditCard,
  TrendingUp,
  Store,
  Users,
  Landmark,
  ScanLine,
} from "lucide-react";

/**
 * One entry per stakeholder dashboard. Each partner type runs the same shell —
 * period picker, KPIs, breakdown, units, benchmarks, aggregation and profile —
 * and this config decides the wording, the metric set and how transactions are
 * linked back to the partner.
 */
export const PARTNER_DASHBOARDS = {
  pos: {
    key: "pos",
    partnerType: "POS Partner",
    label: "POS Partner",
    title: "POS Partner Dashboard",
    blurb:
      "Every DutyCredit validated through your platform, and the channel commission your network earns on the sales it converts.",
    accent: "#7C3AED",
    unitHeading: "Your POS platforms",
    unitBlurb: "Platforms you have live with airport retailers. Activation is managed by the DutyBoost team.",
    groupBy: "store_name",
    groupHeading: "Redemption activity by store",
    scopeNoun: "your platforms",
    commissionField: "pos_channel_commission",
    kpis: [
      { label: "Redemptions Processed", metric: "redemptions", icon: ScanLine },
      { label: "Gross Sales Facilitated", metric: "grossVolume", money: true, icon: TrendingUp },
      { label: "Channel Commission", metric: "commission", money: true, icon: Landmark },
      { label: "Average Basket", metric: "avgBasket", money: true, icon: CreditCard },
    ],
  },
  corporate: {
    key: "corporate",
    partnerType: "Corporate Partner",
    label: "Corporate Partner",
    title: "Corporate Partner Dashboard",
    blurb:
      "DutyCredits issued to your travellers, the airport retail spend they convert, and the savings your travel budget keeps.",
    accent: "#059669",
    unitHeading: "Your departments",
    unitBlurb: "Departments and cost centres under this agreement. Activation is managed by the DutyBoost team.",
    groupBy: "airport",
    groupHeading: "Spend converted by airport",
    scopeNoun: "your departments",
    commissionField: "agency_commission",
    kpis: [
      { label: "DutyCredits Issued", metric: "creditsIssued", icon: TicketPercent },
      { label: "Travellers Activated", metric: "passengers", icon: Users },
      { label: "Airport Spend Converted", metric: "grossVolume", money: true, icon: TrendingUp },
      { label: "Traveller Savings", metric: "savings", money: true, icon: Landmark },
    ],
  },
  travel: {
    key: "travel",
    partnerType: "Travel Partner",
    label: "Travel Partner",
    title: "Travel Partner Dashboard",
    blurb:
      "Every DutyCredit your bookings activate, the airport spend they convert, and the commission your channels earn on it.",
    accent: "#2563EB",
    unitHeading: "Your booking channels",
    unitBlurb: "Channels and branches under this agreement. Activation is managed by the DutyBoost team.",
    groupBy: "airport",
    groupHeading: "Redemption activity by airport",
    scopeNoun: "your channels",
    commissionField: "agency_commission",
    kpis: [
      { label: "DutyCredits Activated", metric: "creditsIssued", icon: TicketPercent },
      { label: "Travellers Reached", metric: "passengers", icon: Users },
      { label: "Airport Spend Converted", metric: "grossVolume", money: true, icon: TrendingUp },
      { label: "Commission Earned", metric: "commission", money: true, icon: Landmark },
    ],
  },
};

export const PARTNER_DASHBOARD_LIST = Object.values(PARTNER_DASHBOARDS);

const TYPE_TO_KEY = {
  "POS Partner": "pos",
  "Airport Partner": "airport",
  "Corporate Partner": "corporate",
  "Wholesale Partner": "wholesale",
  "Travel Partner": "travel",
};

/**
 * Partner types that share in the platform fee and therefore get their own
 * dashboard. Airports and wholesale partners sit outside the fee sharing
 * programme and get none.
 */
const DASHBOARD_TYPES = {
  "POS Partner": "pos",
  "Corporate Partner": "corporate",
  "Travel Partner": "travel",
};

export const PARTNER_NO_DASHBOARD_TYPES = ["Airport Partner", "Wholesale Partner"];

/** Maps a partner type on record to its dashboard key, or null when it has none. */
export const partnerTypeToKey = (partnerType) => DASHBOARD_TYPES[partnerType] || null;

/** Resolves the scope key for any partner type — travel falls back to the booking-email link. */
export const scopeKeyForType = (partnerType) => TYPE_TO_KEY[partnerType] || "travel";