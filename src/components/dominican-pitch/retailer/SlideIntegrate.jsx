import { CheckCircle } from "lucide-react";
import { ACCENT, GridBg, SlideWrapper } from "../Shared";
import { useDeckLang } from "../LanguageContext";

export default function SlideIntegrate() {
  const { t } = useDeckLang();
  const c = t.retail.integrate;

  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5 lg:mb-8">
            <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: ACCENT }}>{c.eyebrow}</span>
            <h2 className="text-xl md:text-3xl lg:text-4xl font-heading font-bold text-[#0a0f1e] mt-2">
              {c.title}
              <br />
              <span style={{ color: ACCENT }}>{c.titleAccent}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-center">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 lg:p-7">
              <h3 className="text-[#0a0f1e] font-bold lg:text-lg mb-4">{c.dashboardTitle}</h3>
              <div className="space-y-3">
                {c.dashboardPoints.map((text) => (
                  <div key={text} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-600 text-sm">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl p-5 lg:p-7 text-white" style={{ background: `linear-gradient(135deg, ${ACCENT} 0%, #6b1f66 100%)` }}>
              <h3 className="font-bold text-xl lg:text-2xl mb-2">{c.activatedTitle}</h3>
              <p className="text-white/85 text-sm lg:text-base leading-relaxed mb-3 lg:mb-5">{c.activatedBody}</p>
              <div className="grid grid-cols-3 gap-3 text-center">
                {c.stats.map((s) => (
                  <div key={s.label} className="bg-white/10 rounded-xl p-3">
                    <div className="text-white font-bold">{s.val}</div>
                    <div className="text-white/70 text-xs mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}