import {
  TicketPercent,
  CreditCard,
  TrendingUp,
  Store,
  Users,
  Landmark,
  Building2,
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
    guide: {
      title: "Implementation Guide",
      blurb:
        "Everything your product team needs to embed DutyCredit validation and redemption inside your POS platform.",
      steps: [
        { title: "Two API calls", desc: "Validate the DutyCredit on scan, then confirm the redemption at checkout." },
        { title: "1–2 day setup", desc: "Works with any POS stack. Code examples in JavaScript and Python." },
        { title: "Automatic reporting", desc: "Every redemption is logged for you — one monthly commission statement per platform." },
      ],
      link: { label: "Open the POS partner one-pager", to: "/pos-partner-one-pager" },
    },
  },
  airport: {
    key: "airport",
    partnerType: "Airport Partner",
    label: "Airport Partner",
    title: "Airport Partner Dashboard",
    blurb:
      "Retail conversion across your terminals, the participating stores live in your airport, and the revenue the programme generates on your concession floor.",
    accent: "#0EA5E9",
    unitHeading: "Your airports",
    unitBlurb: "Airports you operate under this agreement. Activation is managed by the DutyBoost team.",
    groupBy: "store_name",
    groupHeading: "Retail sales by store",
    scopeNoun: "your airports",
    commissionField: "platform_revenue",
    kpis: [
      { label: "Redemptions at Your Airport", metric: "redemptions", icon: ScanLine },
      { label: "Gross Retail Sales", metric: "grossVolume", money: true, icon: TrendingUp },
      { label: "Participating Stores", metric: "storesInScope", icon: Store },
      { label: "Platform Revenue", metric: "platformFee", money: true, icon: Landmark },
    ],
    guide: {
      title: "Onboarding your retailers",
      blurb:
        "How new stores in your terminals go live, and what your commercial team needs to share with DutyBoost.",
      steps: [
        { title: "Share the retail directory", desc: "Send the operator and store list per terminal — DutyBoost researches and prepares it." },
        { title: "Sign the Order Form", desc: "One agreement per operator covers every store under that retailer." },
        { title: "Stores go live", desc: "Stores are activated one by one, and conversion appears here immediately." },
      ],
      link: { label: "Request airport onboarding support", to: "/airport-partner-request" },
    },
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
    guide: {
      title: "Rolling out to your travellers",
      blurb: "How DutyCredits reach your travellers and how departments report on the spend they convert.",
      steps: [
        { title: "Share the traveller list", desc: "Send the booking email or corporate travel policy in scope for the programme." },
        { title: "Credits are issued automatically", desc: "Each eligible booking receives a DutyCredit before the traveller reaches the airport." },
        { title: "Report per department", desc: "Spend, savings and redemption rates are split by department and airport here." },
      ],
      link: { label: "Open the corporate partner showcase", to: "/corporate-partner-showcase" },
    },
  },
  wholesale: {
    key: "wholesale",
    partnerType: "Wholesale Partner",
    label: "Wholesale / Supplier Partner",
    title: "Wholesale Partner Dashboard",
    blurb:
      "How your product categories perform on the airport retail floor, and the incremental sales DutyCredits drive in the stores that stock them.",
    accent: "#D97706",
    unitHeading: "Your brands",
    unitBlurb: "Brands and product lines under this agreement. Activation is managed by the DutyBoost team.",
    groupBy: "store_name",
    groupHeading: "Sales in your categories, by store",
    scopeNoun: "your categories",
    commissionField: "platform_revenue",
    kpis: [
      { label: "Category Redemptions", metric: "redemptions", icon: ScanLine },
      { label: "Gross Retail Sales", metric: "grossVolume", money: true, icon: TrendingUp },
      { label: "Stores in Category", metric: "storesInScope", icon: Store },
      { label: "Average Basket", metric: "avgBasket", money: true, icon: CreditCard },
    ],
    guide: {
      title: "Getting your brands onto the floor",
      blurb: "How supplier brands are linked to participating airport stores and what we need from your account team.",
      steps: [
        { title: "Share your category range", desc: "Send the brands and categories in scope for the travel retail channel." },
        { title: "We map the stores", desc: "DutyBoost links the participating stores that stock your categories." },
        { title: "Track the uplift", desc: "Redemptions and basket value in your categories appear here as they happen." },
      ],
      link: { label: "Open the wholesale showcase", to: "/wholesale-showcase" },
    },
  },
};

export const PARTNER_DASHBOARD_LIST = Object.values(PARTNER_DASHBOARDS);

const TYPE_TO_KEY = {
  "POS Partner": "pos",
  "Airport Partner": "airport",
  "Corporate Partner": "corporate",
  "Wholesale Partner": "wholesale",
};

/** Maps a partner type on record to its dashboard key. Travel partners keep the existing agency dashboard. */
export const partnerTypeToKey = (partnerType) => TYPE_TO_KEY[partnerType] || null;

/** Resolves the scope key for any partner type — travel falls back to the booking-email link. */
export const scopeKeyForType = (partnerType) => TYPE_TO_KEY[partnerType] || "travel";