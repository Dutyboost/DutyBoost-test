import DutyBoostLogo from "@/components/DutyBoostLogo";
import PositioningLine from "@/components/shared/PositioningLine";
import { SlideWrapper, GridBg, Glow, PhygridMark } from "@/components/phygrid-pitch/Shared";

export default function SlideCover() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col items-center justify-center px-6 md:px-16 text-center relative">
        <GridBg />
        <Glow className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[640px]" />
        <div className="relative z-10 flex flex-col items-center gap-7 w-full">
          <div className="bg-white rounded-2xl px-6 py-3 shadow-2xl border border-white/20">
            <DutyBoostLogo height={40} linkTo={null} />
          </div>

          <PhygridMark className="text-3xl md:text-4xl" />

          <div>
            <PositioningLine className="mb-3" dark />
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-white leading-tight mb-4">
              Avolta's Stores.<br />
              <span className="text-[#00E5FF]">A New Revenue Line for Phygrid.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-3xl leading-relaxed mx-auto">
              DutyBoost converts airport travellers into purchasers inside Avolta-operated stores — and shares its platform fee with Phygrid on every validated sale.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 sm:gap-8 mt-2 w-full max-w-2xl">
            {[
              { label: "Countries with live deployments", value: "50+" },
              { label: "Data points per month", value: "1.5B+" },
              { label: "Purchases driven per month", value: "35M+" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-xl sm:text-3xl font-bold text-[#00E5FF]">{s.value}</div>
                <div className="text-xs sm:text-sm text-slate-400 mt-1 leading-snug">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-1 text-xs text-slate-500 border border-white/10 rounded px-4 py-2">
            PREPARED FOR PHYGRID — 9 OCTOBER 2026 | CONFIDENTIAL
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}