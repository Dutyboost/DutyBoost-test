import DutyBoostPresentation from "./DutyBoostPresentation";
import { AIRPORTS_FULL as AVOLTA_AIRPORTS_FULL } from "@/data/demoDataAvolta";

// Queen Beatrix International Airport (AUA), Oranjestad, Aruba — operated by Avolta.
// Passenger figures use the app's curated Aruba dataset (2.5M annual pax, ~6,849 daily).
//
// Aruba-specific stat overrides (sourced from Aruba Airport Authority data):
//  • Average wait time at the gate (~1h 45m): derived from AAA's 150-min international
//    arrival advisory minus ~45 min check-in/security/immigration processing.
//  • Duty Free Total Revenue (~€42M): estimated from 2.5M pax × ~€17 avg duty-free
//    spend per passenger (Caribbean airport benchmark).
const AUA = AVOLTA_AIRPORTS_FULL.find(a => a.code === "AUA");
const ARUBA_COMPANY = {
  name: "Avolta (Aruba)",
  airports: AUA ? [AUA] : [],
  storeCount: 5,
};

// Curiosity Campaign — Aruba source-market data (2024 Aruba Tourism Authority figures).
// Aruba has no domestic flights: 100% of passengers are international.
const ARUBA_CAMPAIGN = {
  marketLabel: "Potential Market — Queen Beatrix Airport (AUA), Aruba",
  statPassengers: { val: "2.5M", label: "Annual passengers" },
  statDepartures: { val: "2.5M", label: "International flights (100%)" },
  statIntl: { val: "0", label: "Domestic flights" },
  phase1Subtitle: "Over 1.2 million annual visitors to Aruba arrive from these 5 source markets",
  countries: [
    { flag: "🇺🇸", name: "United States", visitors: "1.06M" },
    { flag: "🇨🇦", name: "Canada", visitors: "70.9K" },
    { flag: "🇳🇱", name: "Netherlands", visitors: "43K" },
    { flag: "🇨🇴", name: "Colombia", visitors: "37K" },
    { flag: "🇧🇷", name: "Brazil", visitors: "28K" },
  ],
};

export default function DutyBoostPresentationAruba() {
  return (
    <DutyBoostPresentation
      company={ARUBA_COMPANY}
      stat3Val="1h 45m"
      stat5Val="€42M"
      hideCompanySelector
      hidePosIntegration
      campaignData={ARUBA_CAMPAIGN}
    />
  );
}