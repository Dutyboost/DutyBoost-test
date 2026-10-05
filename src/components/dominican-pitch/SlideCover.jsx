import DutyBoostLogo from "@/components/DutyBoostLogo";
import PositioningLine from "@/components/shared/PositioningLine";
import { ACCENT, GridBg, SlideWrapper } from "./Shared";
import { MARKET } from "./figures";
import { useDeckLang } from "./LanguageContext";

export default function SlideCover() {
  const { t } = useDeckLang();
  const c = t.retailCover;
  const s = c.stats;

  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-5 md:px-10 text-center relative">
        <GridBg />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[620px] h-[620px] rounded-full opacity-10"
          style={{ background: `radial-gradient(circle, ${ACCENT} 0%, transparent 70%)` }}
        />
        <div className="relative z-10 w-full max-w-5xl flex flex-col items-center gap-4">
          <div className="bg-white rounded-2xl px-6 py-3 shadow-2xl border border-slate-200">
            <DutyBoostLogo height={44} linkTo="/retailer-showcase" />
          </div>

          <PositioningLine hero size="xl" className="max-w-4xl" text={t.positioning} />

          <div>
            <h1 className="text-2xl md:text-4xl font-heading font-bold text-[#0a0f1e] leading-tight mb-3">
              {c.title}
              <br />
              <span style={{ color: ACCENT }}>{c.titleAccent}</span>
            </h1>
            <p className="text-base md:text-xl text-slate-500 max-w-3xl leading-relaxed">{c.subtitle}</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 w-full max-w-3xl">
            {[
              { label: s.movements, value: MARKET.drPassengers },
              { label: s.airports, value: MARKET.gateways },
              { label: s.nonPurchase, value: "73%" },
              { label: s.cost, value: "$0" },
            ].map((x) => (
              <div key={x.label} className="text-center">
                <div className="text-xl sm:text-3xl font-bold" style={{ color: ACCENT }}>{x.value}</div>
                <div className="text-xs sm:text-sm text-slate-500 mt-1">{x.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-1 text-xs text-slate-500 border border-slate-300 rounded px-4 py-2">
            {t.chrome.confidential} — 2026 | Chamber of Commerce: 42053181 | VAT: NL869492068B01
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}