import DutyBoostLogo from "@/components/DutyBoostLogo";
import PositioningLine from "@/components/shared/PositioningLine";
import { ACCENT, AIRLINE, GridBg, RETAIL, SlideWrapper } from "./Shared";
import { AIRPORT_PER_DAY, MARKET, num } from "./figures";
import { useDeckLang } from "./LanguageContext";

export default function SlideCover() {
  const { t } = useDeckLang();

  const FLAG = [
    { color: RETAIL, label: t.cover.parties.retailers },
    { color: AIRLINE, label: t.cover.parties.airlines },
    { color: "#ffffff", label: t.cover.parties.government, border: true },
  ];

  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-5 md:px-10 text-center relative">
        <GridBg />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[620px] h-[620px] rounded-full opacity-10"
          style={{ background: `radial-gradient(circle, ${ACCENT} 0%, transparent 70%)` }}
        />
        <div className="relative z-10 w-full max-w-5xl flex flex-col items-center gap-3">
          <div className="bg-white rounded-2xl px-6 py-3 shadow-2xl border border-slate-200">
            <DutyBoostLogo height={42} linkTo="/retailer-showcase" />
          </div>

          <PositioningLine hero size="xl" className="max-w-4xl" text={t.positioning} />

          <div>
            <h1 className="text-2xl md:text-4xl font-heading font-bold text-[#0a0f1e] leading-tight mb-2">
              {t.cover.title}
              <br />
              <span style={{ color: ACCENT }}>{t.cover.titleAccent}</span>
            </h1>
            <p className="text-base md:text-xl text-slate-500 max-w-3xl leading-relaxed">
              {t.cover.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-3 sm:gap-5">
            {FLAG.map((f) => (
              <div key={f.label} className="flex items-center gap-2">
                <span
                  className={`w-4 h-4 rounded-full ${f.border ? "border border-slate-300" : ""}`}
                  style={{ background: f.color }}
                />
                <span className="text-xs sm:text-sm font-semibold text-slate-600">{f.label}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 w-full max-w-3xl">
            {[
              { label: t.cover.stats.gateways, value: MARKET.gateways },
              { label: t.cover.stats.passengers, value: MARKET.drPassengers },
              { label: t.cover.stats.perDay, value: `${num(AIRPORT_PER_DAY)}+` },
              { label: t.cover.stats.cost, value: "$0" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-xl sm:text-3xl font-bold" style={{ color: ACCENT }}>
                  {s.value}
                </div>
                <div className="text-xs sm:text-sm text-slate-500 mt-1">{s.label}</div>
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