import DutyBoostLogo from "@/components/DutyBoostLogo";
import PositioningLine from "@/components/shared/PositioningLine";
import { SlideWrapper, GridBg, Glow } from "@/components/phygrid-pitch/Shared";

export default function SlideCover() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col items-center justify-center px-6 md:px-16 text-center relative">
        <GridBg />
        <Glow className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[640px]" />
        <div className="relative z-10 flex flex-col items-center gap-7 w-full">
          <div className="bg-white rounded-2xl px-8 py-4 shadow-sm border border-slate-200">
            <DutyBoostLogo height={50} linkTo={null} />
          </div>

          <div>
            <PositioningLine hero size="xl" className="max-w-4xl mb-3" />
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-[#0a0f1e] leading-tight mb-4">
              Convert Airport Travellers<br />
              <span className="text-blue-600">Into Paying Customers.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-500 max-w-3xl leading-relaxed mx-auto">
              Activate travellers before departure and route them into participating stores — Phygrid earns on every completed sale, with no upfront cost.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 sm:gap-8 mt-2 w-full max-w-2xl">
            {[
              { label: "Outlets in the world's largest travel retail estate", value: "5,100+" },
              { label: "Travellers passing through these locations each year", value: "2.5B" },
              { label: "Countries and 6 continents covered by that estate", value: "70" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-xl sm:text-3xl font-bold text-blue-600">{s.value}</div>
                <div className="text-xs sm:text-sm text-slate-500 mt-1 leading-snug">{s.label}</div>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-slate-400 -mt-3">
            Scale of the addressable estate, based on the world's largest travel retailer —{" "}
            <a
              href="https://www.avoltaworld.com/en/investors"
              target="_blank"
              rel="noreferrer"
              className="underline hover:text-slate-500"
            >
              Avolta Annual Report 2024
            </a>
          </p>

          <div className="mt-1 text-xs text-slate-500 border border-slate-300 rounded px-4 py-2">
            PREPARED FOR PHYGRID — 9 OCTOBER 2026 | CONFIDENTIAL
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}