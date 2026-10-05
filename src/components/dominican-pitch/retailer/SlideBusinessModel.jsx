import { CheckCircle } from "lucide-react";
import { TIER_ROWS, BASKET_CAP, DISCOUNT_CAP, usd } from "../figures";
import { ACCENT, GridBg, SlideWrapper } from "../Shared";
import { useDeckLang } from "../LanguageContext";
import RetailerCalculator from "./RetailerCalculator";

export default function SlideBusinessModel() {
  const { t } = useDeckLang();
  const c = t.retail.businessModel;

  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-6">
            <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: ACCENT }}>{c.eyebrow}</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              {c.title} <span style={{ color: ACCENT }}>{c.titleAccent}</span>
            </h2>
            <p className="text-slate-500 mt-1">{c.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-800 text-white rounded-2xl p-5 sm:p-7 flex flex-col">
              <h3 className="font-bold text-white text-xl sm:text-2xl mb-4 sm:mb-5">{c.tiersTitle}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-slate-400 mb-1.5 px-2">
                {c.tierHeaders.map((h) => <span key={h}>{h}</span>)}
              </div>
              <div className="space-y-1.5">
                {TIER_ROWS.map((row, i) => (
                  <div
                    key={row.tier}
                    className={`grid grid-cols-2 sm:grid-cols-4 gap-x-2 gap-y-0.5 py-2.5 px-2 rounded-lg text-sm ${i === 0 ? "bg-white/10" : "hover:bg-white/5"}`}
                  >
                    <span className="text-slate-200 font-semibold">{row.tier}</span>
                    <span className="text-slate-300">{row.range}</span>
                    <span className="text-amber-300">{row.disc}</span>
                    <span className="text-green-300 font-semibold">{row.save}</span>
                  </div>
                ))}
              </div>
              <p className="text-slate-400 text-xs mt-4 leading-snug">{c.tiersNote(usd(BASKET_CAP), usd(DISCOUNT_CAP))}</p>
            </div>

            <div className="flex flex-col gap-4">
              <div className="rounded-2xl p-5" style={{ background: `${ACCENT}0d`, border: `1px solid ${ACCENT}33` }}>
                <h3 className="font-bold mb-3" style={{ color: ACCENT }}>{c.feeTitle}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-3">{c.feeBody}</p>
                <div className="space-y-2 text-sm">
                  {c.feePoints.map((item) => (
                    <div key={item} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: ACCENT }} />
                      <span className="text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-2xl p-4 sm:p-5">
                <h3 className="font-bold text-green-900 mb-3">{c.economicsTitle}</h3>
                <div className="space-y-2.5 text-sm">
                  {c.economics.map((row) => (
                    <div key={row.metric} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-slate-700 font-semibold">{row.metric}: </span>
                        <span className="text-slate-600">{row.val}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <RetailerCalculator />
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}