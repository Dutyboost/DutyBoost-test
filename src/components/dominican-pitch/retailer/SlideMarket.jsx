import { Check } from "lucide-react";
import { ACCENT, GridBg, SlideWrapper } from "../Shared";
import { useDeckLang } from "../LanguageContext";

const CMI_LINK = "https://www.coherentmarketinsights.com/market-insight/caribbean-duty-free-retailing-market-4934";

export default function SlideMarket() {
  const { t } = useDeckLang();
  const c = t.retail.market;

  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6">
        <div className="mb-5">
          <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: ACCENT }}>{c.eyebrow}</span>
          <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
            {c.title} <span style={{ color: ACCENT }}>{c.titleAccent}</span>
          </h2>
          <p className="text-slate-500 mt-2">{c.subtitle}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-4">
          {c.kpis.map((m) => (
            <div key={m.label} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 md:p-6 text-center">
              <div className="text-xl md:text-3xl font-bold mb-2" style={{ color: m.color }}>{m.value}</div>
              <div className="font-semibold text-slate-700 mb-1 text-xs md:text-sm">{m.label}</div>
              <div className="text-slate-500 text-xs">{m.sub}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
            <h3 className="font-bold text-slate-700 mb-1">{c.categoriesTitle}</h3>
            <p className="text-slate-500 text-xs mb-4">{c.categoriesNote}</p>
            <div className="space-y-3">
              {c.categories.map((row) => (
                <div key={row.cat}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-slate-700 text-sm font-semibold">{row.cat}</div>
                    <div className="text-slate-700 text-sm font-semibold">{row.share}</div>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="h-2 rounded-full" style={{ width: `${row.pct}%`, background: ACCENT }} />
                  </div>
                  <div className="text-slate-500 text-xs mt-1">{row.note}</div>
                </div>
              ))}
            </div>
            <div className="text-slate-400 text-xs mt-3">
              <a href={CMI_LINK} target="_blank" rel="noopener noreferrer" className="font-semibold underline" style={{ color: ACCENT }}>
                CMI
              </a>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
            <h3 className="font-bold text-slate-700 mb-3">{c.createTitle}</h3>
            <div className="space-y-2">
              {c.createItems.map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-green-100 border border-green-300 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-green-600" strokeWidth={3} />
                  </div>
                  <span className="text-slate-600 text-sm">{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 bg-green-100 border border-green-300 rounded-xl p-3">
              <p className="text-green-800 text-sm font-semibold">{c.createFooter}</p>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}