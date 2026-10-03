import DutyBoostLogo from "@/components/DutyBoostLogo";
import PositioningLine from "@/components/shared/PositioningLine";
import CaribbeanDutyFreeLogo from "@/components/retailer-pitch-trinidad/CaribbeanDutyFreeLogo";
import { ACCENT, CalLogo, GridBg, SlideWrapper } from "./Shared";

export default function SlideCover() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-5 md:px-10 text-center relative">
        <GridBg />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: `radial-gradient(circle, ${ACCENT} 0%, transparent 70%)` }}
        />
        <div className="relative z-10 w-full max-w-5xl flex flex-col items-center gap-3">
          <div className="bg-white rounded-2xl px-6 py-3 shadow-2xl border border-slate-200">
            <DutyBoostLogo height={42} linkTo="/retailer-showcase" />
          </div>

          <div className="flex items-center justify-center gap-6 md:gap-10">
            <CalLogo height={52} />
            <div className="w-px h-12 bg-slate-300" />
            <CaribbeanDutyFreeLogo height={52} />
          </div>

          <PositioningLine hero size="xl" className="max-w-4xl" />

          <div>
            <h1 className="text-2xl md:text-4xl font-heading font-bold text-[#0a0f1e] leading-tight mb-2">
              One Ecosystem.<br />
              <span style={{ color: ACCENT }}>Two Revenue Positions.</span>
            </h1>
            <p className="text-base md:text-xl text-slate-500 max-w-3xl leading-relaxed">
              A Presentation for Caribbean Airlines — Travel Partner &amp; Retailer
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 w-full max-w-3xl">
            {[
              { label: "Revenue Positions", value: "2" },
              { label: "Travel Partner Share", value: "0.5%" },
              { label: "Retailer Platform Fee", value: "2.5%" },
              { label: "Upfront Cost", value: "$0" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-xl sm:text-3xl font-bold" style={{ color: ACCENT }}>{s.value}</div>
                <div className="text-xs sm:text-sm text-slate-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-1 text-xs text-slate-500 border border-slate-300 rounded px-4 py-2">
            CONFIDENTIAL — 2026 | Chamber of Commerce: 42053181 | VAT: NL869492068B01
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}