import { SlideWrapper, GridBg } from "@/components/phygrid-pitch/Shared";
import EstateCalculator from "@/components/phygrid-pitch/slides/EstateCalculator";

// The airport-level revenue model. An airport is picked from the global airport
// database, which sets the travellers who walk straight to their gates — the
// group the pre-activation and redemption rates then apply to.
export default function SlideRevenueCalculator() {
  return (
    <SlideWrapper>
      <div className="relative flex flex-1 flex-col px-5 py-5 md:px-12 md:py-6">
        <GridBg />
        <div className="relative z-10 flex min-h-0 flex-1 flex-col">
          <div className="mb-4 shrink-0">
            <span className="text-sm font-semibold uppercase tracking-widest text-blue-600">
              Revenue Potential — Per Day
            </span>
            <h2 className="mt-2 font-heading text-2xl font-bold text-[#0a0f1e] md:text-4xl">
              The Airport Model, <span className="text-blue-600">Per Day</span>
            </h2>
            <p className="mt-1 text-base text-slate-500">
              Pick any airport from the global database — its own passengers set the travellers who walk straight
              to their gates, and the pre-activation and redemption rates do the rest.
            </p>
          </div>

          <div className="flex min-h-0 flex-1">
            <EstateCalculator />
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}