import DutyBoostLogo from "@/components/DutyBoostLogo";
import PositioningLine from "@/components/shared/PositioningLine";
import { ACCENT, AIRLINE, GOV, GridBg, RETAIL, SITE, SlideWrapper } from "./Shared";
import { useDeckLang } from "./LanguageContext";

const COLORS = [RETAIL, AIRLINE, GOV];

export default function SlideThankYou() {
  const { t } = useDeckLang();

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

          <h1 className="text-2xl md:text-4xl font-heading font-bold text-[#0a0f1e] leading-tight">
            {t.thankYou.title}
          </h1>

          <div className="flex items-center gap-3 sm:gap-5">
            {t.thankYou.parties.map((label, i) => (
              <div key={label} className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full" style={{ background: COLORS[i] }} />
                <span className="text-xs sm:text-sm font-semibold text-slate-600">{label}</span>
              </div>
            ))}
          </div>

          <a
            href={SITE}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-semibold underline decoration-slate-300 hover:text-slate-700"
            style={{ color: RETAIL }}
          >
            dutyboost.com
          </a>

          <div className="mt-1 text-xs text-slate-500 border border-slate-300 rounded px-4 py-2">
            {t.chrome.confidential} — 2026 | Chamber of Commerce: 42053181 | VAT: NL869492068B01
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}