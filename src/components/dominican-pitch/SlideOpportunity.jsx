import { Plane, Users, TrendingUp } from "lucide-react";
import { ACCENT, RETAIL, SlideShell } from "./Shared";
import { CARRIER_PER_DAY, MARKET, SOURCES, num } from "./figures";
import { useDeckLang } from "./LanguageContext";

export default function SlideOpportunity() {
  const { t } = useDeckLang();
  const c = t.opportunity;

  const STATS = [
    { Icon: Users, value: MARKET.drPassengers, source: SOURCES.dr },
    { Icon: Plane, value: `±${num(CARRIER_PER_DAY)}`, source: null },
    { Icon: TrendingUp, value: "+9.9%", source: SOURCES.puj },
  ].map((s, i) => ({ ...s, ...c.stats[i] }));

  return (
    <SlideShell
      eyebrow={c.eyebrow}
      eyebrowColor={ACCENT}
      title={
        <>
          {c.title} <span style={{ color: RETAIL }}>{c.titleAccent}</span>
        </>
      }
      subtitle={c.subtitle}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        {STATS.map((s) => (
          <div key={s.value} className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
            <s.Icon className="w-7 h-7 mb-3" style={{ color: ACCENT }} />
            <div className="text-2xl md:text-3xl font-bold text-[#0a0f1e]">{s.value}</div>
            <p className="text-slate-600 text-sm mt-2 leading-relaxed">{s.label}</p>
            <p className="text-slate-400 text-xs mt-3">
              {s.source ? (
                <a
                  href={s.source}
                  target="_blank"
                  rel="noreferrer"
                  className="underline decoration-slate-300 hover:text-slate-600"
                >
                  {s.sourceLabel}
                </a>
              ) : (
                s.sourceLabel
              )}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
          <div className="flex items-center justify-between text-sm font-semibold mb-2">
            <span className="text-slate-700">{c.barTitle}</span>
            <span className="text-slate-400">{c.barNote}</span>
          </div>
          <div className="flex h-7 rounded-full overflow-hidden">
            <div className="bg-green-500" style={{ width: `${MARKET.purchaseShare * 100}%` }} />
            <div className="bg-slate-300" style={{ width: `${MARKET.nonPurchaseShare * 100}%` }} />
          </div>
          <div className="flex justify-between text-xs mt-2">
            <span className="text-green-700 font-semibold">{c.purchase}</span>
            <span className="text-slate-500 font-semibold">{c.nonPurchase}</span>
          </div>
          <p className="text-slate-500 text-sm mt-3 leading-relaxed">{c.barBody}</p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
          <h3 className="font-bold text-blue-900 mb-2">{c.missingTitle}</h3>
          <p className="text-slate-600 text-sm leading-relaxed">{c.missingBody}</p>
          <p className="text-slate-500 text-sm mt-3 leading-relaxed">{c.missingBody2}</p>
        </div>
      </div>

      <p className="text-slate-400 text-xs mt-3">{c.footnote}</p>
    </SlideShell>
  );
}