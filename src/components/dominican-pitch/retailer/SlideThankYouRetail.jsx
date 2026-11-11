import { ArrowRight, CheckCircle, Store } from "lucide-react";
import DutyBoostLogo from "@/components/DutyBoostLogo";
import PositioningLine from "@/components/shared/PositioningLine";
import { ACCENT, GridBg, SlideWrapper } from "../Shared";
import { useDeckLang } from "../LanguageContext";

const ICONS = [Store, CheckCircle, ArrowRight];

export default function SlideThankYouRetail() {
  const { t } = useDeckLang();
  const c = t.retail.retailThankYou;

  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-4 md:px-12 md:py-4 relative">
        <GridBg />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: `radial-gradient(circle, ${ACCENT} 0%, transparent 70%)` }}
        />
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="bg-white rounded-2xl px-5 py-2 shadow-2xl border border-slate-200 mb-3">
            <DutyBoostLogo height={52} linkTo="/retailer-showcase" />
          </div>

          <PositioningLine hero size="xl" className="max-w-4xl mb-3" text={t.positioning} />

          <div className="mb-2.5">
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: ACCENT }}>{c.eyebrow}</span>
            <h2 className="text-2xl md:text-4xl font-heading font-bold text-[#0a0f1e] mt-1 leading-tight">
              {c.title} <span style={{ color: ACCENT }}>{c.titleAccent}</span>
            </h2>
          </div>

          <p className="text-slate-600 text-base md:text-lg max-w-4xl leading-snug mb-5">{c.body}</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-5xl w-full mb-5">
            {c.cards.map((card, i) => {
              const Icon = ICONS[i];
              return (
                <div key={card.title} className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-left">
                  <Icon className="w-8 h-8 mb-2" style={{ color: ACCENT }} />
                  <div className="font-bold text-base mb-1" style={{ color: ACCENT }}>{card.title}</div>
                  <div className="text-slate-600 text-sm leading-snug">{card.desc}</div>
                </div>
              );
            })}
          </div>

          <div className="rounded-2xl px-6 py-5 text-white max-w-3xl" style={{ background: `linear-gradient(135deg, ${ACCENT} 0%, #6b1f66 100%)` }}>
            <p className="font-bold text-lg md:text-2xl leading-snug mb-1.5">{c.closingTitle}</p>
            <p className="text-white/80 text-sm md:text-base">{c.closingBody}</p>
          </div>

          <div className="mt-3 text-slate-500 text-[10px]">
            {t.chrome.confidential} — 2026 | Chamber of Commerce: 42053188 | VAT: NL869492068B01
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}