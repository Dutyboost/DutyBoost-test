import DutyBoostPresentation from "./DutyBoostPresentation";
import { getSintMaartenRetailerData } from "@/data/demoDataSintMaarten";
import { fmtCompact } from "@/utils/formatNumber";

// ILTT & Penha Group (Sint Maarten) — single-airport network at Princess
// Juliana International Airport (SXM):
//   • Core duty-free concession operated by a joint venture between
//     International Liquor & Tobacco Trading N.V. (ILTT) and the Penha Group.
//   • ILTT operates the Princess Promenade duty-free stores (liquor, tobacco,
//     spirits, wine, beer & beverages).
//   • Penha Group operates Penha Duty Free stores (perfumes, cosmetics,
//     skincare, luxury accessories).
// Passenger figures come from the curated SXM dataset (demoDataSintMaarten.js).
const SXM_COMPANY = getSintMaartenRetailerData();

// SXM Duty Free Total Revenue (USD):
//   total annual pax × ~$17 avg duty-free spend per passenger
//   (Caribbean airport benchmark, same methodology as the Aruba model).
const SXM_TOTAL_PAX = SXM_COMPANY.airports.reduce((s, a) => s + (a.annual_pax || 0), 0);
const SXM_DUTY_FREE_REVENUE = SXM_TOTAL_PAX * 17;

// Curiosity Campaign — Sint Maarten source-market data.
// Sint Maarten has no domestic flights: 100% of passengers are international.
// Source-market figures based on St. Maarten Tourism Bureau visitor arrival
// data — top 5 overseas markets arriving by air.
const SXM_CAMPAIGN = {
  marketLabel: "Potential Market — Princess Juliana Airport (SXM), Sint Maarten",
  statPassengers: { val: fmtCompact(SXM_TOTAL_PAX), label: "Annual passengers" },
  statDepartures: { val: fmtCompact(SXM_TOTAL_PAX), label: "International flights (100%)" },
  statIntl: { val: "0", label: "Domestic flights" },
  phase1Subtitle: "Over 565,000 annual visitors to Sint Maarten arrive by air from these 5 source markets",
  countries: [
    { flag: "🇺🇸", name: "United States", visitors: "300K" },
    { flag: "🇫🇷", name: "France", visitors: "120K" },
    { flag: "🇳🇱", name: "Netherlands", visitors: "70K" },
    { flag: "🇨🇦", name: "Canada", visitors: "45K" },
    { flag: "🇬🇧", name: "United Kingdom", visitors: "30K" },
  ],
};

export default function DutyBoostPresentationSintMaarten() {
  return (
    <DutyBoostPresentation
      company={SXM_COMPANY}
      stat3Val="1h 30m"
      stat4Val="$95B"
      stat5Val={`$${fmtCompact(SXM_DUTY_FREE_REVENUE, "en", 1)}`}
      hideCompanySelector
      hidePosIntegration
      currency="USD"
      campaignData={SXM_CAMPAIGN}
    />
  );
}