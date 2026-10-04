import DutyBoostLogo from "@/components/DutyBoostLogo";
import { SlideWrapper, GridBg, Glow, PhygridMark } from "@/components/phygrid-pitch/Shared";
import { RATIO, eur, millions, PER_STORE } from "@/components/phygrid-pitch/model";
import { Store, ArrowRight } from "lucide-react";

export default function SlideClosing() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col items-center justify-center px-6 md:px-16 text-center relative">
        <GridBg />
        <Glow className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[640px]" />
        <div className="relative z-10 flex flex-col items-center gap-7 w-full">
          <div className="bg-white rounded-2xl px-6 py-3 shadow-2xl border border-white/20">
            <DutyBoostLogo height={38} linkTo={null} />
          </div>

          <PhygridMark className="text-2xl md:text-3xl" />

          <div>
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-white leading-tight mb-4">
              Avolta's Stores,<br />
              <span className="text-[#00E5FF]">Now a Measurable Revenue Contributor</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-3xl leading-relaxed mx-auto">
              One integration turns the POS layer Phygrid already runs inside Avolta stores into incremental retail revenue for Avolta — and a performance-based income line for Phygrid.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 sm:gap-8 w-full max-w-2xl">
            {[
              { label: "Per store, incremental sales", value: eur(PER_STORE.gross) },
              { label: "Avolta vs Phygrid, per transaction", value: `€${RATIO} : €1` },
              { label: "Phygrid's share of the platform fee", value: "10%" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-lg sm:text-2xl font-bold text-[#00E5FF]">{s.value}</div>
                <div className="text-xs sm:text-sm text-slate-400 mt-1 leading-snug">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center gap-1.5">
            <p className="text-[#00E5FF] text-base lg:text-xl font-bold">
              No setup fee. No subscription. No risk. Only incremental revenue.
            </p>
            <p className="text-slate-300 text-sm lg:text-base font-semibold flex items-center gap-2">
              <Store className="w-4 h-4 text-[#00E5FF]" />
              Every Avolta store Phygrid connects is another {millions(PER_STORE.gross)} opportunity.
              <ArrowRight className="w-4 h-4 text-[#00E5FF]" />
            </p>
          </div>

          <div className="mt-1 text-xs text-slate-500 border border-white/10 rounded px-4 py-2">
            CONFIDENTIAL — 2026 | Chamber of Commerce: 42053181 | VAT: NL869492068B01
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}