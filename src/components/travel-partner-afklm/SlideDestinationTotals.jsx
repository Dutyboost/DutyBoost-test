import * as F from "./figures";

const ACCENT = "text-green-600";

// Full Air France-KLM group passenger base (102.8M carried in 2025).
const GROUP_PAX = 102844000;

// Each uplift level converts a share of the total passenger base into new
// airport-retail transactions, priced at the €20 Entry-tier minimum basket.
function scenario(pp) {
  const txns = GROUP_PAX * (pp / 100);
  const retail = txns * F.ENTRY_BASKET;
  return {
    nonPurchasing: GROUP_PAX * F.NON_PURCHASE_RATE,
    txns,
    retail,
    partner: retail * F.PARTNER_SHARE_OF_BASKET,
  };
}

const SCENARIOS = [0.5, 1, 2].map((pp) => ({ pp, ...scenario(pp) }));
const BASE = SCENARIOS[0];

export default function SlideDestinationTotals() {
  return (
    <div className="w-full flex flex-col overflow-y-auto lg:overflow-hidden bg-white text-[#052e16]">
      <div className="flex-1 flex flex-col justify-center px-5 py-5 md:px-12 md:py-6">
        <div className="mb-4">
          <span className={`${ACCENT} text-sm font-semibold uppercase tracking-widest`}>Total Potential</span>
          <h2 className="text-xl md:text-3xl font-heading font-bold mt-2">
            The Full {F.GROUP_PASSENGERS} Passenger Base, <span className={ACCENT}>At Every Uplift Level</span>
          </h2>
          <p className="text-slate-500 mt-1 text-sm">
            Aggregated across all {F.GROUP_PASSENGERS} Air France-KLM group passengers carried in 2025 — the entire network,
            not a single destination list.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 mb-4">
          <table className="w-full text-sm">
            <thead className="bg-slate-100 text-slate-600">
              <tr>
                <th className="text-left px-4 py-3 font-semibold">Conversion uplift</th>
                <th className="text-right px-4 py-3 font-semibold">Passenger base</th>
                <th className="text-right px-4 py-3 font-semibold">Non-buying ({F.NON_PURCHASE_SHARE})</th>
                <th className="text-right px-4 py-3 font-semibold">New transactions</th>
                <th className="text-right px-4 py-3 font-semibold">Airport retail</th>
                <th className="text-right px-4 py-3 font-semibold">AF-KLM share</th>
              </tr>
            </thead>
            <tbody>
              {SCENARIOS.map((s) => (
                <tr key={s.pp} className={`border-t border-slate-200 ${s.pp === 1 ? "bg-green-50" : ""}`}>
                  <td className="px-4 py-3 font-bold text-[#052e16] whitespace-nowrap">+{s.pp} pp</td>
                  <td className="px-4 py-3 text-right text-slate-600">{F.GROUP_PASSENGERS}</td>
                  <td className="px-4 py-3 text-right text-slate-500">{F.fmtCount(s.nonPurchasing)}</td>
                  <td className="px-4 py-3 text-right font-bold text-green-700">{F.fmtCount(s.txns)}</td>
                  <td className="px-4 py-3 text-right text-slate-600">{F.fmtEur(s.retail)}</td>
                  <td className="px-4 py-3 text-right font-bold text-orange-600">{F.fmtEur(s.partner)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {SCENARIOS.map((s) => (
            <div
              key={s.pp}
              className={`rounded-2xl p-5 border ${s.pp === 1 ? "bg-green-50 border-green-300" : "bg-slate-50 border-slate-200"}`}
            >
              <div className="text-xs font-semibold text-green-600 uppercase tracking-wide mb-1">+{s.pp} pp uplift</div>
              <div className="text-2xl md:text-3xl font-bold text-green-700 mb-1">{F.fmtEur(s.partner)}</div>
              <div className="text-green-600 text-xs font-medium mb-3">annual Air France-KLM share</div>
              <div className="border-t border-slate-200 pt-2 space-y-1 text-xs text-slate-500">
                <div>{F.fmtCount(s.txns)} new transactions</div>
                <div>{F.fmtEur(s.retail)} airport retail</div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
          <p className="text-slate-600 text-sm leading-relaxed">
            At +0.5 pp, {F.fmtCount(BASE.txns)} of the {F.GROUP_PASSENGERS} passengers become new transactions —{" "}
            {F.fmtEur(BASE.retail)} of incremental airport retail that does not happen today. Every level scales the same way,
            at zero cost to Air France-KLM and zero cost to its travellers.
          </p>
          <p className="text-slate-400 text-xs mt-3">
            Modelled on the €20 Entry-tier minimum basket, {F.NON_PURCHASE_SHARE} of travellers leaving without a purchase
            (m1nd-set / TFWA) and a 0.5% partner share of the qualifying basket.
          </p>
        </div>
      </div>
    </div>
  );
}