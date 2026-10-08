import { SlideWrapper, GridBg, ACCENT } from "./Shared";
import AirportRevenueCalculator from "./AirportRevenueCalculator";

// The airport-level revenue model for Trinidad & Tobago's two gateways — Piarco
// International and A.N.R. Robinson, Tobago — or the two combined.
export default function SlideAirportCalculator() {
  return (
    <SlideWrapper>
      <div className="relative flex flex-1 flex-col px-5 py-5 md:px-10 md:py-5">
        <GridBg />
        <div className="relative z-10 flex min-h-0 flex-1 flex-col">
          <div className="mb-3 shrink-0">
            <span className="text-xs md:text-sm font-semibold uppercase tracking-widest" style={{ color: ACCENT }}>
              The Airport Model — Per Day
            </span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-1.5">
              Piarco and Tobago, <span style={{ color: ACCENT }}>Per Day</span>
            </h2>
            <p className="text-slate-500 mt-1 text-sm md:text-base">
              Pick either of Trinidad &amp; Tobago's two gateways — or both — and its own passengers set the
              travellers who walk straight to their gates.
            </p>
          </div>

          <div className="flex min-h-0 flex-1">
            <AirportRevenueCalculator />
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}