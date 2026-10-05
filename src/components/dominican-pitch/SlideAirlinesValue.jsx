import { CheckCircle, Plane } from "lucide-react";
import { AIRLINE, SlideShell } from "./Shared";
import { AIRLINES, num, usd2, usdShort } from "./figures";
import { useNetworkInputs, carrierEarnings } from "./NetworkContext";
import { useDeckLang } from "./LanguageContext";

export default function SlideAirlinesValue() {
  const { t } = useDeckLang();
  const c = t.airlinesValue;
  const a = t.airlines;
  const { inputs } = useNetworkInputs();

  const fmtPax = (carrier) =>
    carrier.passengers === null
      ? a.notPublished
      : `${carrier.under ? a.under : carrier.approx ? a.approx : ""}${num(carrier.passengers)}${
          carrier.plus ? "+" : ""
        }`;

  return (
    <SlideShell
      eyebrow={c.eyebrow}
      eyebrowColor={AIRLINE}
      title={
        <>
          {c.title} <span style={{ color: AIRLINE }}>{c.titleAccent}</span>
        </>
      }
      subtitle={c.subtitle}
    >
      <div className="overflow-x-auto rounded-2xl border border-slate-200">
        <table className="w-full text-sm min-w-[720px]">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wide">
              <th className="text-left px-4 py-3 font-semibold">{c.headers.carrier}</th>
              <th className="text-right px-4 py-3 font-semibold">{c.headers.passengers}</th>
              <th className="text-right px-4 py-3 font-semibold">{c.headers.baskets}</th>
              <th className="text-right px-4 py-3 font-semibold">{c.headers.gross}</th>
              <th className="text-right px-4 py-3 font-semibold">{c.headers.share}</th>
            </tr>
          </thead>
          <tbody>
            {AIRLINES.map((carrier) => {
              const e = carrierEarnings(carrier.passengers, inputs);
              return (
                <tr key={carrier.name} className="border-t border-slate-100">
                  <td className="px-4 py-3 font-semibold text-[#0a0f1e] whitespace-nowrap">
                    {carrier.name}
                  </td>
                  <td className="px-4 py-3 text-right text-slate-500 whitespace-nowrap">
                    {fmtPax(carrier)}
                  </td>
                  <td className="px-4 py-3 text-right text-slate-700 whitespace-nowrap">
                    {e ? num(e.baskets) : "—"}
                  </td>
                  <td className="px-4 py-3 text-right text-slate-700 whitespace-nowrap">
                    {e ? usdShort(e.gross) : "—"}
                  </td>
                  <td className="px-4 py-3 text-right font-bold whitespace-nowrap" style={{ color: AIRLINE }}>
                    {e ? usd2(e.rebate) : "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <Plane className="w-5 h-5" style={{ color: AIRLINE }} />
            <h3 className="font-bold" style={{ color: AIRLINE }}>
              {c.cardTitle}
            </h3>
          </div>
          <p className="text-slate-600 text-sm leading-relaxed">{c.cardBody}</p>
          <p className="text-slate-500 text-sm mt-3 leading-relaxed">{c.cardBody2}</p>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
          <h3 className="font-bold text-slate-800 mb-3">{c.askedTitle}</h3>
          <div className="space-y-2">
            {c.points.map((p) => (
              <div key={p} className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-slate-600 text-sm leading-snug">{p}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="text-slate-400 text-xs mt-3">{c.footnote}</p>
    </SlideShell>
  );
}