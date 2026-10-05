import { CheckCircle, Percent } from "lucide-react";
import { ACCENT, RETAIL, SlideShell } from "./Shared";
import { MODEL, BASKET_CAP, DISCOUNT_CAP, TIERS, TIER_ROWS, usd } from "./figures";
import NetworkCalculator from "./NetworkCalculator";
import { useDeckLang } from "./LanguageContext";

export default function SlideModel() {
  const { t } = useDeckLang();
  const c = t.model;

  const feePct = Math.round(MODEL.platformFee * 1000) / 10;
  // What the retailer keeps at the Entry tier, after the traveller discount and
  // the platform fee — 92.5% at the standard terms.
  const entryKeep = Math.round((1 - TIERS[0].discMin - MODEL.platformFee) * 1000) / 10;

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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-slate-800 text-white rounded-2xl p-4 sm:p-5">
          <h3 className="font-bold text-white text-base md:text-lg mb-3">{c.tiersTitle}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-slate-400 mb-1 px-2">
            <span>{c.tierHeaders.tier}</span>
            <span>{c.tierHeaders.basket}</span>
            <span>{c.tierHeaders.discount}</span>
            <span className="sm:text-right">{c.tierHeaders.saves}</span>
          </div>
          <div className="space-y-1">
            {TIER_ROWS.map((row, i) => (
              <div
                key={row.tier}
                className={`grid grid-cols-2 sm:grid-cols-4 gap-x-2 gap-y-0.5 py-1 px-2 rounded-lg text-xs ${
                  i === 0 ? "bg-blue-800/50" : "hover:bg-white/5"
                }`}
              >
                <span className="text-blue-300 font-semibold">{row.tier}</span>
                <span className="text-slate-300">{row.range}</span>
                <span className="text-yellow-300">{row.disc}</span>
                <span className="text-green-300 font-semibold sm:text-right">{row.save}</span>
              </div>
            ))}
          </div>
          <p className="text-slate-400 text-[10px] mt-2 leading-snug">
            {c.tiersNote(usd(BASKET_CAP), usd(DISCOUNT_CAP))}
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-2">
            <Percent className="w-5 h-5" style={{ color: ACCENT }} />
            <h3 className="font-bold text-blue-900">{c.feeTitle(feePct)}</h3>
          </div>
          <p className="text-slate-600 text-sm leading-relaxed mb-3">{c.feeBody(feePct, entryKeep)}</p>
          <div className="space-y-2 text-sm">
            {c.feePoints.map((item) => (
              <div key={item} className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: ACCENT }} />
                <span className="text-slate-700">{item}</span>
              </div>
            ))}
          </div>
          <p className="text-sm mt-3 pt-3 border-t border-blue-200 text-slate-700 leading-relaxed">
            <span className="font-bold">{c.darkLead}</span> {c.darkBody}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <NetworkCalculator />
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