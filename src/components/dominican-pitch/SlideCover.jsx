import DutyBoostLogo from "@/components/DutyBoostLogo";
import PositioningLine from "@/components/shared/PositioningLine";
import { ACCENT, AIRLINE, GridBg, RETAIL, SlideWrapper } from "./Shared";
import TerminalScene from "./illustrations/TerminalScene";
import { CARRIER_PER_DAY, MARKET, num } from "./figures";
import { useDeckLang } from "./LanguageContext";

export default function SlideCover() {
  const { t } = useDeckLang();

  const PARTIES = [
    { color: RETAIL, label: t.cover.parties.retailers },
    { color: AIRLINE, label: t.cover.parties.airlines },
    { color: "#ffffff", label: t.cover.parties.government, border: true },
  ];

  const STATS = [
    { label: t.cover.stats.gateways, value: MARKET.gateways },
    { label: t.cover.stats.passengers, value: MARKET.drPassengers },
    { label: t.cover.stats.perDay, value: `${num(CARRIER_PER_DAY)}+` },
    { label: t.cover.stats.cost, value: "$0" },
  ];

  return (
    <SlideWrapper>
      <div className="flex-1 flex items-center px-5 py-6 md:px-12 relative">
        <GridBg />
        <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center">
          <div>
            <div className="inline-block bg-white rounded-2xl px-5 py-2.5 shadow-lg border border-slate-200">
              <DutyBoostLogo height={38} linkTo="/retailer-showcase" />
            </div>

            <PositioningLine hero size="xl" className="mt-5" text={t.positioning} />

            <h1 className="text-2xl md:text-4xl font-heading font-bold text-[#0a0f1e] leading-tight mt-4">
              {t.cover.title}
              <br />
              <span style={{ color: ACCENT }}>{t.cover.titleAccent}</span>
            </h1>

            <p className="text-sm md:text-base text-slate-500 mt-3 max-w-xl leading-relaxed">
              {t.cover.subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-5">
              {PARTIES.map((p) => (
                <div key={p.label} className="flex items-center gap-2">
                  <span
                    className={`w-3.5 h-3.5 rounded-full ${p.border ? "border border-slate-300" : ""}`}
                    style={{ background: p.color }}
                  />
                  <span className="text-xs sm:text-sm font-semibold text-slate-600">{p.label}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 max-w-xl">
              {STATS.map((s) => (
                <div key={s.label}>
                  <div className="text-xl sm:text-2xl font-bold" style={{ color: ACCENT }}>
                    {s.value}
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-500 mt-0.5 leading-snug">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-[11px] text-slate-400">
              {t.chrome.confidential} — 2026 | Chamber of Commerce: 42053181 | VAT: NL869492068B01
            </div>
          </div>

          <div>
            <TerminalScene className="w-full h-auto" />
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}