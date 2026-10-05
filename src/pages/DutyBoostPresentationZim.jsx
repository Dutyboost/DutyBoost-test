import DutyBoostPresentation from "./DutyBoostPresentation";
import { getDFPWorldRetailerData } from "@/data/demoDataDFPWorld";
import { fmtCompact } from "@/utils/formatNumber";

// DFP World (Duty Free Stores Zimbabwe) — 3-airport network:
//   • HRE — Harare Robert Mugabe International
//   • VFA — Victoria Falls
//   • BUQ — Bulawayo Joshua Nkomo International
// Passenger figures come from the curated DFP World dataset (demoDataDFPWorld.js).
const ZIM_COMPANY = getDFPWorldRetailerData();

// Zimbabwe Duty Free Total Revenue (USD):
//   total annual pax × shopping rate (20%, midpoint of the 15–25% airport
//   retail conversion range) × $40 average basket value.
const ZIM_TOTAL_PAX = ZIM_COMPANY.airports.reduce((s, a) => s + (a.annual_pax || 0), 0);
const ZIM_DUTY_FREE_REVENUE = ZIM_TOTAL_PAX * 0.20 * 40;

// Curiosity Campaign — Zimbabwe source-market data.
// All figures are from the Zimbabwe Tourism Authority (ZTA) 2024 Trends &
// Statistics Report (1,613,901 total tourist arrivals; tourism receipts
// US$1.18B). Zimbabwe's airports handle almost exclusively international
// flights; domestic service (HRE↔VFA, HRE↔BUQ) is a small share.
//
// Source-market countries shown are the top OVERSEAS markets — these visitors
// arrive almost exclusively by air, so they represent the addressable audience
// for an airport duty-free curiosity campaign. (Zimbabwe's top African source
// markets — South Africa, Malawi, Zambia, Mozambique, Botswana — arrive
// predominantly by road and are less relevant to airport retail.)
const ZIM_CAMPAIGN = {
  marketLabel: "Potential Market — DFP World Zimbabwe (HRE / VFA / BUQ)",
  statPassengers: { val: fmtCompact(ZIM_TOTAL_PAX), label: "Annual passengers" },
  statDepartures: { val: fmtCompact(ZIM_TOTAL_PAX * 0.97), label: "International flights (±97%)" },
  statIntl: { val: "±80K", label: "Domestic flights (±3%)" },
  phase1Subtitle: "Over 277,000 overseas visitors to Zimbabwe arrive by air from these 5 source markets",
  countries: [
    { flag: "🇺🇸", name: "United States", visitors: "105K" },
    { flag: "🇬🇧", name: "United Kingdom", visitors: "48K" },
    { flag: "🇨🇳", name: "China", visitors: "46K" },
    { flag: "🇩🇪", name: "Germany", visitors: "44K" },
    { flag: "🇦🇺", name: "Australia", visitors: "34K" },
  ],
};

export default function DutyBoostPresentationZim() {
  return (
    <DutyBoostPresentation
      company={ZIM_COMPANY}
      stat4Val="$103B"
      stat5Val={`$${fmtCompact(ZIM_DUTY_FREE_REVENUE, "en", 1)}`}
      hideCompanySelector
      hidePosIntegration
      currency="USD"
      campaignData={ZIM_CAMPAIGN}
    />
  );
}