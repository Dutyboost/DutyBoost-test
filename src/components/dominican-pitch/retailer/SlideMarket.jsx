import { Check } from "lucide-react";
import { ACCENT, GridBg, SlideWrapper } from "../Shared";
import { useDeckLang } from "../LanguageContext";

const CMI_LINK = "https://www.coherentmarketinsights.com/market-insight/caribbean-duty-free-retailing-market-4934";

export default function SlideMarket() {
  const { t } = useDeckLang();
  const c = t.retail.market;

  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-3 md:px-10 md:py-4 overflow-hidden">
        <div className="mb-2.5">
          <span className="text-xs md:text-sm font-semibold uppercase tracking-widest" style={{ color: ACCENT }}>{c.eyebrow}</span>
          <h2 className="text-lg md:text-2xl font-heading font-bold text-[#0a0f1e] mt-1">
            {c.title} <span style={{ color: ACCENT }}>{c.titleAccent}</span>
          </h2>
          <p className="text-slate-500 mt-1 text-xs md:text-sm leading-snug">{c.subtitle}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 mb-2.5">
          {c.kpis.map((m) => (
            <div key={m.label} className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 md:p-3 text-center">
              <div className="text-lg md:text-2xl font-bold mb-1" style={{ color: m.color }}>{m.value}</div>
              <div className="font-semibold text-slate-700 mb-0.5 text-[11px] md:text-xs leading-tight">{m.label}</div>
              <div className="text-slate-500 text-[10px] md:text-[11px] leading-tight">{m.sub}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 md:p-4">
            <h3 className="font-bold text-slate-700 text-sm md:text-base mb-0.5">{c.categoriesTitle}</h3>
            <p className="text-slate-500 text-[10px] md:text-[11px] mb-2 leading-tight">{c.categoriesNote}</p>
            <div className="space-y-1.5">
              {c.categories.map((row) => (
                <div key={row.cat}>
                  <div className="flex items-center justify-between">
                    <div className="text-slate-700 text-xs md:text-sm font-semibold">{row.cat}</div>
                    <div className="text-slate-700 text-xs md:text-sm font-semibold">{row.share}</div>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-1.5 mt-0.5">
                    <div className="h-1.5 rounded-full" style={{ width: `${row.pct}%`, background: ACCENT }} />
                  </div>
                  <div className="text-slate-500 text-[10px] leading-tight">{row.note}</div>
                </div>
              ))}
            </div>
            <div className="text-slate-400 text-[10px] mt-2">
              <a href={CMI_LINK} target="_blank" rel="noopener noreferrer" className="font-semibold underline" style={{ color: ACCENT }}>
                CMI
              </a>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 md:p-4 flex flex-col">
            <h3 className="font-bold text-slate-700 text-sm md:text-base mb-2">{c.createTitle}</h3>
            <div className="flex-1 flex flex-col justify-evenly gap-1.5">
              {c.createItems.map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <div className="w-4 h-4 rounded-full bg-green-100 border border-green-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-green-600" strokeWidth={3} />
                  </div>
                  <span className="text-slate-700 text-xs md:text-sm leading-snug">{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-2 bg-green-100 border border-green-300 rounded-lg p-2.5">
              <p className="text-green-800 text-xs md:text-sm font-semibold leading-snug">{c.createFooter}</p>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}