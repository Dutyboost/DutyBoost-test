import { Clock, HelpCircle, Tag } from "lucide-react";
import { ACCENT, RETAIL, SlideShell } from "./Shared";
import { useDeckLang } from "./LanguageContext";

const ICONS = [HelpCircle, Tag, Clock];

export default function SlideGap() {
  const { t } = useDeckLang();
  const c = t.gap;

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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {c.reasons.map((r, i) => {
          const Icon = ICONS[i];
          return (
            <div key={r.title} className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
              <Icon className="w-7 h-7 mb-3" style={{ color: ACCENT }} />
              <h3 className="font-bold text-[#0a0f1e] mb-2">{r.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{r.body}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
        <div className="lg:col-span-2 bg-blue-50 border border-blue-200 rounded-2xl p-5">
          <h3 className="font-bold text-blue-900 mb-2">{c.fixTitle}</h3>
          <p className="text-slate-600 text-sm leading-relaxed">{c.fixBody}</p>
          <p className="text-slate-500 text-sm mt-3 leading-relaxed">{c.fixBody2}</p>
        </div>
        <div className="bg-slate-800 text-white rounded-2xl p-5 flex flex-col justify-center">
          <div className="text-3xl font-bold mb-1">{c.statValue}</div>
          <p className="text-slate-300 text-sm leading-relaxed">{c.statBody}</p>
        </div>
      </div>
    </SlideShell>
  );
}