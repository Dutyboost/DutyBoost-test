import { useTranslation } from "react-i18next";
import { useCurrency } from "@/components/calculator/CurrencyContext";
import { getCruiseCalculatorStrings } from "@/lib/i18nCruiseCalculator";
import { numShort, PLATFORM_FEE } from "./model";
import { useCalculatorTheme } from "./theme";

// The full picture: every store the partner modelled, combined.
export default function CruiseTotals({ totals, variant = "cruise" }) {
  const th = useCalculatorTheme();
  const { i18n } = useTranslation();
  const strings = getCruiseCalculatorStrings(i18n.language);
  const s = strings.totals;
  const v = strings.variants[variant] || strings.variants.cruise;
  const { fmt, fmtCompact } = useCurrency();

  const cards = [
    { label: s.stores, val: numShort(totals.stores) },
    { label: v.totalsPassengers || s.passengers, val: numShort(totals.annualPassengers) },
    { label: s.traffic, val: numShort(totals.traffic) },
    { label: s.baskets, val: numShort(totals.redemptions) },
    { label: s.sales, val: fmtCompact(totals.gross) },
    { label: s.discounts, val: fmtCompact(totals.discount) },
    { label: s.fee.replace("{fee}", PLATFORM_FEE * 100), val: fmtCompact(totals.fee) },
    { label: s.net, val: fmt(totals.net), highlight: true },
  ];

  return (
    <div className="bg-slate-900 rounded-2xl p-4 sm:p-6">
      <h3 className="font-heading font-bold text-white text-lg">{s.title}</h3>
      <p className="text-slate-400 text-xs mt-0.5 mb-4">{s.sub}</p>
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