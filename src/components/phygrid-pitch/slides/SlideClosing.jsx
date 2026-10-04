import DutyBoostLogo from "@/components/DutyBoostLogo";
import { SlideWrapper, GridBg, Glow } from "@/components/phygrid-pitch/Shared";
import { RATIO, eur, PER_STORE } from "@/components/phygrid-pitch/model";
import { Store, ArrowRight } from "lucide-react";

export default function SlideClosing() {
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
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-[#0a0f1e] leading-tight mb-4">
              Airport Stores,<br />
              <span className="text-blue-600">Now a Measurable Revenue Contributor</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-500 max-w-3xl leading-relaxed mx-auto">
              One integration turns the POS layer Phygrid already runs inside those stores into incremental retail revenue for the retailer — and a performance-based income line for Phygrid.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 sm:gap-8 w-full max-w-2xl">
            {[
              { label: "Per store, incremental sales", value: eur(PER_STORE.gross) },
              { label: "Retailer vs Phygrid, per transaction", value: `€${RATIO} : €1` },
              { label: "Phygrid's share of the platform fee", value: "10%" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-lg sm:text-2xl font-bold text-blue-600">{s.value}</div>
                <div className="text-xs sm:text-sm text-slate-500 mt-1 leading-snug">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center gap-1.5">
            <p className="text-blue-600 text-base lg:text-xl font-bold">
              No setup fee. No subscription. No risk. Only incremental revenue.
            </p>
            <p className="text-slate-700 text-sm lg:text-base font-semibold flex items-center gap-2">
              <Store className="w-4 h-4 text-blue-600" />
              Every store Phygrid connects is another {eur(PER_STORE.gross)} opportunity.
              <ArrowRight className="w-4 h-4 text-blue-600" />
            </p>
          </div>

          <h2 className="text-4xl md:text-6xl font-heading font-bold text-blue-600 tracking-tight">THANK YOU</h2>

          <div className="mt-1 text-xs text-slate-500 border border-slate-300 rounded px-4 py-2">
            CONFIDENTIAL — 2026 | Chamber of Commerce: 42053181 | VAT: NL869492068B01
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}