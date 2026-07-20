import { useCurrency } from "./CurrencyContext";

export default function CurrencySwitcher() {
  const { currency, setCurrency, currencies } = useCurrency();
  return (
    <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg px-2.5 py-1.5">
      <span className="text-xs text-slate-400 font-medium">CUR</span>
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        className="text-sm font-semibold text-slate-700 bg-transparent outline-none cursor-pointer"
      >
        {currencies.map((c) => (
          <option key={c.code} value={c.code}>
            {c.symbol.trim()} {c.code}
          </option>
        ))}
      </select>
    </div>
  );
}