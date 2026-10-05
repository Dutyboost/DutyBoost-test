import { MapPin } from "lucide-react";
import { RETAIL, SlideShell } from "./Shared";
import { AIRPORTS } from "./figures";
import { useDeckLang } from "./LanguageContext";

export default function SlideGateways() {
  const { t } = useDeckLang();
  const c = t.gateways;

  return (
    <SlideShell
      eyebrow={c.eyebrow}
      eyebrowColor={RETAIL}
      title={
        <>
          {c.title} <span style={{ color: RETAIL }}>{c.titleAccent}</span>
        </>
      }
      subtitle={c.subtitle}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {AIRPORTS.map((a) => {
          const copy = c.airports[a.code];
          return (
            <div key={a.code} className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <div
                  className="text-white font-bold rounded-xl px-3 py-1.5 text-sm tracking-wide"
                  style={{ background: RETAIL }}
                >
                  {a.code}
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-[#0a0f1e]">{a.passengers}</div>
                  <div className="text-[11px] text-slate-400 uppercase tracking-wide">
                    {c.passengersLabel}
                  </div>
                </div>
              </div>
              <h3 className="font-heading font-bold text-[#0a0f1e] leading-tight">{a.name}</h3>
              <div className="flex items-center gap-1.5 text-slate-400 text-xs mt-1 mb-3">
                <MapPin className="w-3.5 h-3.5" /> {a.city}
              </div>
              <p className="text-slate-600 text-sm leading-relaxed flex-1">{copy.headline}</p>
              <p className="text-slate-500 text-xs mt-2 leading-relaxed">{copy.detail}</p>
              {copy.growth && (
                <div className="mt-3 inline-flex self-start text-xs font-semibold text-green-700 bg-green-50 border border-green-200 rounded-lg px-2.5 py-1">
                  {copy.growth}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-4 bg-slate-800 text-white rounded-2xl p-5">
        <p className="text-sm leading-relaxed">
          <span className="font-bold">{c.darkTitle}</span> {c.darkBody}
        </p>
      </div>

      <p className="text-slate-400 text-xs mt-3">{c.footnote}</p>
    </SlideShell>
  );
}