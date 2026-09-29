import { useState } from "react";
import * as F from "./figures";

const ACCENT = "text-green-600";

const LONG_TOTAL = F.LONG_HAUL.reduce((s, d) => s + d.pax, 0);
const SHORT_TOTAL = F.SHORT_HAUL.reduce((s, d) => s + d.pax, 0);

export default function SlideDestinationTotals() {
  const [pp, setPp] = useState(1);

  const long = F.uplift(LONG_TOTAL, pp);
  const short = F.uplift(SHORT_TOTAL, pp);
  const total = F.uplift(LONG_TOTAL + SHORT_TOTAL, pp);

  const rows = [
    { name: "Long-haul destinations", count: F.LONG_HAUL.length, pax: LONG_TOTAL, u: long },
    { name: "Europe & short-haul destinations", count: F.SHORT_HAUL.length, pax: SHORT_TOTAL, u: short },
  ];

  return (
    <div className="w-full flex flex-col overflow-y-auto lg:overflow-hidden bg-white text-[#052e16]">
      <div className="flex-1 flex flex-col justify-center px-5 py-5 md:px-12 md:py-6">
        <div className="mb-4">
          <span className={`${ACCENT} text-sm font-semibold uppercase tracking-widest`}>Total Potential</span>
          <h2 className="text-xl md:text-3xl font-heading font-bold mt-2">
            What Both Destination Lists <span className={ACCENT}>Add Up To</span>
          </h2>
          <p className="text-slate-500 mt-1 text-sm">
            The aggregated totals across the {F.LONG_HAUL.length} long-haul and {F.SHORT_HAUL.length} Europe & short-haul
            destinations shown on the two previous slides.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="text-slate-500 text-xs uppercase tracking-wide mr-1">Conversion uplift of non-purchasing travellers</span>
          {[0.5, 1, 2].map((v) => (
            <button
              key={v}
              onClick={() => setPp(v)}
              className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                pp === v ? "bg-green-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              +{v} pp
            </button>
          ))}
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 mb-4">
          <table className="w-full text-sm">
            <thead className="bg-slate-100 text-slate-600">
              <tr>
                <th className="text-left px-4 py-3 font-semibold">Destination group</th>
                <th className="text-right px-4 py-3 font-semibold">Destinations</th>
                <th className="text-right px-4 py-3 font-semibold">Passengers / yr</th>
                <th className="text-right px-4 py-3 font-semibold">Non-buying</th>
                <th className="text-right px-4 py-3 font-semibold">+{pp} pp transactions</th>
                <th className="text-right px-4 py-3 font-semibold">Airport retail</th>
                <th className="text-right px-4 py-3 font-semibold">AF-KLM share</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.name} className="border-t border-slate-200">
                  <td className="px-4 py-3 font-medium text-[#052e16] whitespace-nowrap">{r.name}</td>
                  <td className="px-4 py-3 text-right text-slate-500">{r.count}</td>
                  <td className="px-4 py-3 text-right text-slate-600">{r.pax.toLocaleString("en-US")}</td>
                  <td className="px-4 py-3 text-right text-slate-500">{F.fmtCount(r.u.nonPurchasing)}</td>
                  <td className="px-4 py-3 text-right font-semibold text-green-700">{F.fmtCount(r.u.txns)}</td>
                  <td className="px-4 py-3 text-right text-slate-600">{F.fmtEur(r.u.retail)}</td>
                  <td className="px-4 py-3 text-right font-semibold text-orange-600">{F.fmtEur(r.u.partner)}</td>
                </tr>
              ))}
              <tr className="border-t-2 border-slate-300 bg-green-50">
                <td className="px-4 py-3 font-bold text-[#052e16]">Total — both lists</td>
                <td className="px-4 py-3 text-right font-bold text-[#052e16]">{F.LONG_HAUL.length + F.SHORT_HAUL.length}</td>
                <td className="px-4 py-3 text-right font-bold text-[#052e16]">{(LONG_TOTAL + SHORT_TOTAL).toLocaleString("en-US")}</td>
                <td className="px-4 py-3 text-right font-bold text-[#052e16]">{F.fmtCount(total.nonPurchasing)}</td>
                <td className="px-4 py-3 text-right font-bold text-green-700">{F.fmtCount(total.txns)}</td>
                <td className="px-4 py-3 text-right font-bold text-[#052e16]">{F.fmtEur(total.retail)}</td>
                <td className="px-4 py-3 text-right font-bold text-orange-600">{F.fmtEur(total.partner)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[0.5, 1, 2].map((v) => {
            const u = F.uplift(LONG_TOTAL + SHORT_TOTAL, v);
            return (
              <div
                key={v}
                className={`rounded-2xl p-5 border ${
                  pp === v ? "bg-green-50 border-green-300" : "bg-slate-50 border-slate-200"
                }`}
              >
                <div className="text-xs font-semibold text-green-600 uppercase tracking-wide mb-1">+{v} pp uplift</div>
                <div className="text-2xl md:text-3xl font-bold text-green-700 mb-1">{F.fmtEur(u.partner)}</div>
                <div className="text-green-600 text-xs font-medium mb-3">annual Air France-KLM share</div>
                <div className="border-t border-slate-200 pt-2 space-y-1 text-xs text-slate-500">
                  <div>{F.fmtCount(u.txns)} transactions</div>
                  <div>{F.fmtEur(u.retail)} airport retail</div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-slate-400 text-xs mt-3">
          Totals aggregate the two destination lists only. Modelled on the €20 Entry-tier minimum basket, {F.NON_PURCHASE_SHARE} of
          travellers leaving without a purchase (m1nd-set / TFWA) and a 0.5% partner share of the qualifying basket.
        </p>
      </div>
    </div>
  );
}