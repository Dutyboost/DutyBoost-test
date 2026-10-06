import { Landmark, Handshake, Users, PlayCircle, Rocket } from "lucide-react";
import { ACCENT, SlideShell } from "./Shared";
import { useDeckLang } from "./LanguageContext";

const ICONS = [Landmark, Handshake, Users, PlayCircle, Rocket];

export default function SlideNextSteps() {
  const { t } = useDeckLang();
  const c = t.nextSteps;

  return (
    <SlideShell
      eyebrow={c.eyebrow}
      eyebrowColor={ACCENT}
      title={
        <>
          {c.title} <span style={{ color: ACCENT }}>{c.titleAccent}</span>
        </>
      }
      subtitle={c.subtitle}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {c.steps.map((s, i) => {
          const Icon = ICONS[i];
          return (
            <div key={s.title} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col">
              <Icon className="w-6 h-6 mb-2" style={{ color: ACCENT }} />
              <div className="text-[11px] font-bold uppercase tracking-wide text-slate-400">{s.when}</div>
              <h3 className="font-bold text-[#0a0f1e] text-sm mt-1 mb-2">{s.title}</h3>
              <p className="text-slate-600 text-xs leading-relaxed">{s.body}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        <div
          className="rounded-2xl p-5"
          style={{ background: `${ACCENT}0d`, border: `1px solid ${ACCENT}33` }}
        >
          <h3 className="font-bold mb-3" style={{ color: ACCENT }}>
            {c.askTitle}
          </h3>
          <div className="space-y-2 text-sm">
            {c.asks.map((item) => (
              <div key={item} className="flex items-start gap-2">
                <span className="font-bold" style={{ color: ACCENT }}>→</span>
                <span className="text-slate-700">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div
          className="rounded-2xl p-5 text-white"
          style={{ background: `linear-gradient(135deg, ${ACCENT} 0%, #6b1f66 100%)` }}
        >
          <h3 className="font-bold mb-2">{c.nobodyTitle}</h3>
          <p className="text-white/80 text-sm leading-relaxed">{c.nobodyBody}</p>
        </div>
      </div>
    </SlideShell>
  );
}