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

export default function DutyBoostPresentationZim() {
  return (
    <DutyBoostPresentation
      company={ZIM_COMPANY}
      stat4Val="$103B"
      stat5Val={`$${fmtCompact(ZIM_DUTY_FREE_REVENUE, "en", 1)}`}
      hideCompanySelector
      currency="USD"
    />
  );
}