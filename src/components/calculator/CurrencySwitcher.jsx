import { useCurrency } from "./CurrencyContext";

// Read-only badge — currency auto-follows the selected airport/country.
// No manual switching needed.
export default function CurrencySwitcher() {
  const { currency, flag, activeCountry } = useCurrency();
  return (
    <div
      className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg px-2.5 py-1.5"
      title={activeCountry ? `${activeCountry} — ${currency}` : currency}
    >
      <span className="text-base leading-none">{flag}</span>
      <span className="text-sm font-semibold text-slate-700">{currency}</span>
    </div>
  );
}