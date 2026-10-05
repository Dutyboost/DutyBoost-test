import { Plane, TrendingUp, Users } from "lucide-react";
import { ACCENT, RETAIL, SlideShell } from "./Shared";
import ConcourseSplit from "./illustrations/ConcourseSplit";
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
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 md:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <span className="text-sm font-semibold text-slate-700">{c.barTitle}</span>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2 text-xs font-semibold text-blue-800">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: ACCENT }} />
              {c.purchase}
            </span>
            <span className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
              {c.nonPurchase}
            </span>
          </div>
        </div>

        <ConcourseSplit purchaseShare={MARKET.purchaseShare} className="w-full h-auto" />

        <p className="text-slate-500 text-sm mt-2 leading-relaxed">{c.barBody}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
        {STATS.map((s) => (
          <div key={s.value} className="bg-white border border-slate-200 rounded-2xl px-4 py-3">
            <div className="flex items-center gap-2">
              <s.Icon className="w-5 h-5 shrink-0" style={{ color: ACCENT }} />
              <span className="text-xl md:text-2xl font-bold text-[#0a0f1e] leading-none">
                {s.value}
              </span>
            </div>
            <p className="text-slate-600 text-xs mt-2 leading-snug">{s.label}</p>
            <p className="text-slate-400 text-[10px] mt-1.5">
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

      <div className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1 bg-blue-50 border border-blue-200 rounded-2xl px-4 py-3">
        <span className="font-bold text-blue-900 text-sm">{c.missingTitle}</span>
        <span className="text-slate-600 text-sm">{c.missingBody2}</span>
      </div>

      <p className="text-slate-400 text-xs mt-3">{c.footnote}</p>
    </SlideShell>
  );
}