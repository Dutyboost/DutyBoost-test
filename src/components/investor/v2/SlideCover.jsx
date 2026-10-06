import DutyBoostLogo from "@/components/DutyBoostLogo";
import { SlideWrapper, GridBg } from "./Shared";

export default function SlideCover() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col items-center justify-center px-6 md:px-16 text-center relative">
        <GridBg />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #3b82f6 0%, transparent 70%)" }} />
        <div className="relative z-10 flex flex-col items-center gap-8">
          <div className="bg-white rounded-2xl px-8 py-4 shadow-2xl border border-slate-200">
            <DutyBoostLogo height={50} linkTo="/" />
          </div>
          <div>
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-[#0a0f1e] leading-tight mb-4">
              A Performance-based Customer Acquisition<br />
              <span className="text-blue-600">Solution for Global Travel</span>
            </h1>
            <p className="text-xl text-slate-500 max-w-3xl leading-relaxed">
              Stakeholder Ecosystem &amp; Sint Maarten Market Entry
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:gap-6 mt-4 w-full max-w-2xl">
            {[
              { label: "Airport DF&TR Market", value: "€37.1B" },
              { label: "Global Passengers", value: "9.8B" },
              { label: "Non-Purchasing", value: "73%" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-xl sm:text-3xl font-bold text-blue-600">{s.value}</div>
                <div className="text-xs sm:text-sm text-slate-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="mt-2 text-xs text-slate-500 border border-slate-300 rounded px-4 py-2">
            CONFIDENTIAL — 2026 | Chamber of Commerce: 42053181 | VAT: NL869492068B01
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}