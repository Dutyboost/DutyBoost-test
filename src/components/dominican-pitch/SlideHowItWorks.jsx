import { Plane, Ticket, ShoppingBag, QrCode, BadgeCheck } from "lucide-react";
import { ACCENT, AIRLINE, RETAIL, SlideShell } from "./Shared";
import { useDeckLang } from "./LanguageContext";

const ICONS = [Ticket, Plane, ShoppingBag, QrCode, BadgeCheck];

export default function SlideHowItWorks() {
  const { t } = useDeckLang();
  const c = t.how;

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {c.steps.map((s, i) => {
          const Icon = ICONS[i];
          return (
            <div key={s.step} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <Icon className="w-6 h-6" style={{ color: ACCENT }} />
                <span className="text-slate-300 font-heading font-bold text-lg">{s.step}</span>
              </div>
              <h3 className="font-bold text-[#0a0f1e] text-sm mb-2">{s.title}</h3>
              <p className="text-slate-600 text-xs leading-relaxed">{s.body}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        <div className="rounded-2xl p-5" style={{ background: `${RETAIL}0f` }}>
          <h3 className="font-bold mb-2" style={{ color: RETAIL }}>
            {c.retailerTitle}
          </h3>
          <ul className="text-slate-600 text-sm space-y-1.5 list-disc pl-4">
            {c.retailerPoints.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl p-5" style={{ background: `${AIRLINE}0f` }}>
          <h3 className="font-bold mb-2" style={{ color: AIRLINE }}>
            {c.carrierTitle}
          </h3>
          <ul className="text-slate-600 text-sm space-y-1.5 list-disc pl-4">
            {c.carrierPoints.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
      </div>
    </SlideShell>
  );
}