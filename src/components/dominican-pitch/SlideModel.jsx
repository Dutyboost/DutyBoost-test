import { ACCENT, RETAIL, SlideShell } from "./Shared";
import { MODEL, BASKET_CAP, DISCOUNT_CAP, usd } from "./figures";
import NetworkCalculator from "./NetworkCalculator";
import { useDeckLang } from "./LanguageContext";

export default function SlideModel() {
  const { t } = useDeckLang();
  const c = t.model;

  return (
    <SlideShell
      eyebrow={c.eyebrow}
      eyebrowColor={ACCENT}
      title={
        <>
          {c.title} <span style={{ color: RETAIL }}>{c.titleAccent}</span>
        </>
      }
      subtitle={c.subtitle(usd(BASKET_CAP), usd(DISCOUNT_CAP))}
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        {c.terms.map((term) => (
          <div key={term.label} className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
            <div className="text-2xl font-bold" style={{ color: ACCENT }}>
              {term.value}
            </div>
            <div className="text-slate-700 font-semibold text-sm mt-1">{term.label}</div>
            <div className="text-slate-500 text-xs mt-1 leading-snug">{term.note}</div>
          </div>
        ))}
      </div>

      <NetworkCalculator />

      <div className="mt-4 bg-slate-800 text-white rounded-2xl p-5">
        <p className="text-sm leading-relaxed">
          <span className="font-bold">{c.darkLead}</span> {c.darkBody}
        </p>
      </div>

      <p className="text-slate-400 text-xs mt-3">
        {c.footnote(
          Math.round(MODEL.platformFee * 1000) / 10,
          Math.round(MODEL.partnerRebate * 100),
          Math.round(MODEL.partnerRebate * MODEL.platformFee * 1000) / 10
        )}
      </p>
    </SlideShell>
  );
}