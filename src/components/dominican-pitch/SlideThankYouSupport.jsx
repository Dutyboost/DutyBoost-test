import DutyBoostLogo from "@/components/DutyBoostLogo";
import PositioningLine from "@/components/shared/PositioningLine";
import { ACCENT, GridBg, SlideWrapper } from "./Shared";
import { useDeckLang } from "./LanguageContext";

// The closing slide: a thank-you to the Dominican Republic and a clear
// statement that DutyBoost is ready to support the country's travel sector.
export default function SlideThankYouSupport() {
  const { t } = useDeckLang();
  const c = t.closing;

  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-4 md:px-12 md:py-6 relative">
        <GridBg />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[620px] h-[620px] rounded-full opacity-10 pointer-events-none"
          style={{ background: `radial-gradient(circle, ${ACCENT} 0%, transparent 70%)` }}
        />
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="bg-white rounded-2xl px-5 py-2 shadow-2xl border border-slate-200 mb-4">
            <DutyBoostLogo height={52} />
          </div>

          <span className="text-xs md:text-sm font-semibold uppercase tracking-widest" style={{ color: ACCENT }}>
            {c.eyebrow}
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-[#0a0f1e] mt-2 leading-tight max-w-5xl">
            {c.title} <span style={{ color: ACCENT }}>{c.titleAccent}</span>
          </h2>
          <p className="text-slate-600 text-base md:text-lg max-w-3xl leading-snug mt-3">{c.body}</p>

          <div
            className="rounded-2xl px-6 py-5 text-white max-w-3xl mt-5"
            style={{ background: `linear-gradient(135deg, ${ACCENT} 0%, #6b1f66 100%)` }}
          >
            <p className="font-bold text-lg md:text-2xl leading-snug mb-1.5">{c.closingTitle}</p>
            <p className="text-white/80 text-sm md:text-base">{c.closingBody}</p>
          </div>

          <PositioningLine className="mt-5 max-w-4xl" text={t.positioning} />

          <div className="mt-3 text-slate-500 text-[10px]">
            {t.chrome.confidential} — 2026 | Chamber of Commerce: 42053088 | VAT: NL869492068B01
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}