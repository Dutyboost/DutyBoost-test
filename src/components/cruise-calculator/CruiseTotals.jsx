import { useCurrency } from "@/components/calculator/CurrencyContext";
import { numShort, PLATFORM_FEE } from "./model";
import { useCalculatorTheme } from "./theme";

// The full picture: every store the partner modelled, combined.
export default function CruiseTotals({ totals }) {
  const th = useCalculatorTheme();
  const { fmt, fmtCompact } = useCurrency();

  const cards = [
    { label: "Stores modelled", val: numShort(totals.stores) },
    { label: "Cruise passengers / yr", val: numShort(totals.annualPassengers) },
    { label: "Passing all stores / yr", val: numShort(totals.traffic) },
    { label: "Incremental baskets / yr", val: numShort(totals.redemptions) },
    { label: "Incremental sales / yr", val: fmtCompact(totals.gross) },
    { label: "Traveller discounts funded", val: fmtCompact(totals.discount) },
    { label: `Platform fee (${PLATFORM_FEE * 100}%) / yr`, val: fmtCompact(totals.fee) },
    { label: "Retailer net / yr", val: fmt(totals.net), highlight: true },
  ];

  return (
    <div className="bg-slate-900 rounded-2xl p-4 sm:p-6">
      <h3 className="font-heading font-bold text-white text-lg">Your full picture</h3>
      <p className="text-slate-400 text-xs mt-0.5 mb-4">
        All stores added together, across every island, country or region.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {cards.map((c) => (
          <div
            key={c.label}
            className={`rounded-xl px-3 py-2.5 border ${
              c.highlight ? th.totalsHighlight : "bg-white/5 border-white/10"
            }`}
          >
            <div className={`font-bold text-base ${c.highlight ? th.totalsHighlightText : "text-white"}`}>{c.val}</div>
            <div className="text-[10px] text-slate-400 leading-tight mt-0.5">{c.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}