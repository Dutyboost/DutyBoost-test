import { useCurrency } from "@/components/calculator/CurrencyContext";

// Subtotals per island / country / region so a partner operating in several
// places sees each area on its own, plus the combined total.
export default function RegionBreakdown({ regions }) {
  const { fmt, fmtCompact } = useCurrency();

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
      <div className="px-4 sm:px-5 py-3 border-b border-slate-200">
        <h3 className="font-heading font-bold text-slate-900">By island, country or region</h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Name each store's region above and every area is totalled separately.
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-[11px] uppercase tracking-wider text-slate-500 bg-slate-50">
              <th className="text-left font-semibold px-4 sm:px-5 py-2">Region</th>
              <th className="text-right font-semibold px-3 py-2">Stores</th>
              <th className="text-right font-semibold px-3 py-2">Baskets / yr</th>
              <th className="text-right font-semibold px-3 py-2">Incremental sales / yr</th>
              <th className="text-right font-semibold px-4 sm:px-5 py-2">Retailer net / yr</th>
            </tr>
          </thead>
          <tbody>
            {regions.map((r) => (
              <tr key={r.region} className="border-t border-slate-100">
                <td className="px-4 sm:px-5 py-2.5 font-semibold text-slate-800">{r.region}</td>
                <td className="px-3 py-2.5 text-right text-slate-600">{r.stores}</td>
                <td className="px-3 py-2.5 text-right text-slate-600">{Math.round(r.redemptions).toLocaleString()}</td>
                <td className="px-3 py-2.5 text-right text-slate-600">{fmtCompact(r.gross)}</td>
                <td className="px-4 sm:px-5 py-2.5 text-right font-bold text-teal-700">{fmt(r.net)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}