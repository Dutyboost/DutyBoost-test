import DutyBoostPresentation from "./DutyBoostPresentation";
import { GLOBAL_COMPANY, GLOBAL_MARKET, GLOBAL_CAMPAIGN } from "@/data/globalAirportRetailMarket";

// Global DutyBoost presentation.
//
// Renders the shared DutyBoost presentation with GLOBAL market numbers instead
// of a single airport retail company:
//   - Global air passengers, global airport retail market, global duty-free revenue
//   - DutyBoost's addressable network = all airports operated by the tracked
//     airport retail operators, de-duplicated, with store counts estimated
//     per airport from passenger volume.
//
// The curiosity campaign uses global source markets (UNWTO 2023) instead of a
// single country (e.g. AENA Spain).
export default function DutyBoostPresentationGlobal() {
  return (
    <DutyBoostPresentation
      company={GLOBAL_COMPANY}
      stat3Val={GLOBAL_MARKET.avgGateWait}
      stat4Val={GLOBAL_MARKET.airportRetailMarket}
      stat5Val={GLOBAL_MARKET.dutyFreeRevenue}
      hideCompanySelector
      campaignData={GLOBAL_CAMPAIGN}
      currency="EUR"
    />
  );
}