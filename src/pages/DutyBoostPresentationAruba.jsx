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

export default function DutyBoostPresentationAruba() {
  return (
    <DutyBoostPresentation
      company={ARUBA_COMPANY}
      stat3Val="1h 45m"
      stat5Val="€42M"
      hideCompanySelector
    />
  );
}