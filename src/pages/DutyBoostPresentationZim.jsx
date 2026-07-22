import DutyBoostPresentation from "./DutyBoostPresentation";
import { getDFPWorldRetailerData } from "@/data/demoDataDFPWorld";

// DFP World (Duty Free Stores Zimbabwe) — 3-airport network:
//   • HRE — Harare Robert Mugabe International
//   • VFA — Victoria Falls
//   • BUQ — Bulawayo Joshua Nkomo International
// Passenger figures come from the curated DFP World dataset (demoDataDFPWorld.js).
const ZIM_COMPANY = getDFPWorldRetailerData();

export default function DutyBoostPresentationZim() {
  return (
    <DutyBoostPresentation
      company={ZIM_COMPANY}
      hideCompanySelector
      currency="USD"
    />
  );
}