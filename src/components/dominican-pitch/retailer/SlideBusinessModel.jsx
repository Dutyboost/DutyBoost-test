import { CheckCircle } from "lucide-react";
import { TIER_ROWS, BASKET_CAP, DISCOUNT_CAP, usd } from "../figures";
import { ACCENT, GridBg, SlideWrapper } from "../Shared";
import { useDeckLang } from "../LanguageContext";

export default function SlideBusinessModel() {
  const { t } = useDeckLang();
  const c = t.retail.businessModel;

  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col px-5 py-4 md:px-10 md:py-4 relative">
        <GridBg />
        <div className="relative z-10 flex-1 flex flex-col justify-center">
          <div className="mb-3 shrink-0">
            <span className="text-sm md:text-base font-semibold uppercase tracking-widest" style={{ color: ACCENT }}>{c.eyebrow}</span>
            <h2 className="text-2xl md:text-4xl font-heading font-bold text-[#0a0f1e] mt-1.5">
              {c.title} <span style={{ color: ACCENT }}>{c.titleAccent}</span>
            </h2>
            <p className="text-slate-500 mt-1 text-base md:text-lg">{c.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-800 text-white rounded-2xl p-4 sm:p-5 flex flex-col">
              <h3 className="font-bold text-white text-base md:text-lg mb-3 shrink-0">{c.tiersTitle}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-slate-400 mb-1 px-2 shrink-0">
                {c.tierHeaders.map((h) => <span key={h}>{h}</span>)}
              </div>
              <div className="flex-1 flex flex-col justify-between gap-1.5">
                {TIER_ROWS.map((row, i) => (
                  <div
                    key={row.tier}
                    className={`grid grid-cols-2 sm:grid-cols-4 gap-x-2 gap-y-0.5 py-1.5 px-2 rounded-lg text-xs ${i === 0 ? "bg-white/10" : "hover:bg-white/5"}`}
                  >
                    <span className="text-slate-200 font-semibold">{row.tier}</span>
                    <span className="text-slate-300">{row.range}</span>
                    <span className="text-amber-300">{row.disc}</span>
                    <span className="text-green-300 font-semibold">{row.save}</span>
                  </div>
                ))}
              </div>
              <p className="text-slate-400 text-[10px] mt-2 leading-snug shrink-0">{c.tiersNote(usd(BASKET_CAP), usd(DISCOUNT_CAP))}</p>
            </div>

            <div className="flex flex-col gap-3">
              <div className="rounded-2xl p-4 grow shrink-0 flex flex-col" style={{ background: `${ACCENT}0d`, border: `1px solid ${ACCENT}33` }}>
                <h3 className="font-bold mb-2" style={{ color: ACCENT }}>{c.feeTitle}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-2">{c.feeBody}</p>
                <div className="space-y-1.5 text-sm mt-auto">
                  {c.feePoints.map((item) => (
                    <div key={item} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: ACCENT }} />
                      <span className="text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-2xl p-4 grow shrink-0 flex flex-col">
                <h3 className="font-bold text-green-900 mb-2">{c.economicsTitle}</h3>
                <div className="space-y-1.5 text-sm mt-auto">
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
        </div>
      </div>
    </SlideWrapper>
  );
}