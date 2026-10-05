import DutyBoostLogo from "@/components/DutyBoostLogo";
import { ACCENT, GridBg, SlideWrapper } from "../Shared";
import { useDeckLang } from "../LanguageContext";

export default function SlideGetStarted() {
  const { t } = useDeckLang();
  const c = t.retail.getStarted;

  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-5 md:px-12 md:py-5 relative">
        <GridBg />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: `radial-gradient(circle, ${ACCENT} 0%, transparent 70%)` }}
        />
        <div className="relative z-10 text-center">
          <div className="flex justify-center mb-3">
            <div className="bg-white rounded-2xl px-6 py-2 shadow-xl border border-slate-200">
              <DutyBoostLogo height={56} linkTo="/retailer-showcase" />
            </div>
          </div>
          <div className="mb-3">
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: ACCENT }}>{c.eyebrow}</span>
            <h2 className="text-2xl md:text-4xl font-heading font-bold text-[#0a0f1e] mt-1.5 leading-tight">
              {c.title}
              <br />
              <span style={{ color: ACCENT }}>{c.titleAccent}</span>
            </h2>
          </div>
          <p className="text-slate-600 text-lg max-w-4xl mx-auto leading-relaxed mb-6">{c.subtitle}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto mb-6">
            {c.cards.map((card) => (
              <div key={card.title} className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-left">
                <div className="font-bold text-base mb-1.5" style={{ color: ACCENT }}>{card.title}</div>
                <div className="text-slate-600 text-sm leading-snug">{card.desc}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-lg md:text-2xl font-bold" style={{ color: ACCENT }}>{c.footer1}</p>
            <p className="text-slate-700 text-base md:text-lg font-semibold">{c.footer2}</p>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}