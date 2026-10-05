import { CheckCircle, TrendingUp } from "lucide-react";
import { AIRLINE, RETAIL, SlideShell } from "./Shared";
import { CARRIER_PER_DAY, usd, usdShort, numShort, num } from "./figures";
import { useNetworkInputs, computeNetwork, atActivation } from "./NetworkContext";
import { useDeckLang } from "./LanguageContext";

const SENSITIVITY = [0.01, 0.02, 0.05];

export default function SlideNetwork() {
  const { t } = useDeckLang();
  const c = t.network;

  const { inputs } = useNetworkInputs();
  const { year, activation } = computeNetwork(inputs);

  return (
    <SlideShell
      eyebrow={c.eyebrow}
      eyebrowColor={RETAIL}
      title={
        <>
          {c.title(usdShort(year.groupNet))} <span style={{ color: RETAIL }}>{c.titleAccent}</span>
        </>
      }
      subtitle={c.subtitle(num(CARRIER_PER_DAY))}
    >
      <div
        className="rounded-2xl p-6 text-white text-center mb-4 max-w-3xl mx-auto ring-2 ring-offset-2 ring-[#002d62]"
        style={{ background: `linear-gradient(135deg, ${RETAIL} 0%, ${AIRLINE} 100%)` }}
      >
        <div className="text-xs font-semibold uppercase tracking-widest opacity-80 mb-2">
          {c.combinedLabel}
        </div>
        <div className="text-4xl md:text-5xl font-bold mb-1">{usdShort(year.groupNet)}</div>
        <p className="text-white/85 text-sm">{c.combinedBody}</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-4 text-xs">
          <div className="text-white/80">{c.combinedLines.gross(usdShort(year.gross))}</div>
          <div className="text-white/80">{c.combinedLines.fee(usdShort(year.fee))}</div>
          <div className="text-white/80">{c.combinedLines.rebate(usdShort(year.rebate))}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5" style={{ color: RETAIL }} />
            <h3 className="font-bold text-slate-800">{c.leverTitle}</h3>
          </div>
          <p className="text-slate-600 text-sm mb-3">{c.leverBody}</p>
          <div className="space-y-2 text-sm">
            {SENSITIVITY.map((rate) => {
              const r = atActivation(inputs, rate);
              const isCurrent = Math.round(rate * 100) === Math.round(activation * 100);
              return (
                <div
                  key={rate}
                  className={`flex items-center justify-between gap-2 py-1.5 px-3 rounded-lg border ${
                    isCurrent ? "bg-blue-100 border-blue-200 font-semibold" : "bg-white border-slate-100"
                  }`}
                >
                  <span className="text-slate-600">{c.atActivation(Math.round(rate * 100))}</span>
                  <span className="text-slate-700">{c.baskets(numShort(r.baskets))}</span>
                  <span className="font-bold" style={{ color: RETAIL }}>
                    {c.perYear(usdShort(r.groupNet))}
                  </span>
                </div>
              );
            })}
          </div>
          <p className="text-slate-400 text-[10px] mt-2 leading-snug">{c.leverNote}</p>
        </div>

        <div className="flex flex-col gap-3">
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
            <h3 className="font-bold text-blue-900 mb-3">{c.upsideTitle}</h3>
            <div className="space-y-2 text-sm">
              {c.upsidePoints.map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-slate-800 text-white rounded-2xl p-5">
            <p className="font-bold leading-snug">{c.closingTitle(usd(year.groupNet))}</p>
            <p className="text-slate-300 text-sm mt-2">{c.closingBody}</p>
          </div>
        </div>
      </div>
    </SlideShell>
  );
}