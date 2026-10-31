import { useState, useRef, useEffect } from "react";
import { Search, Check, Building2, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ENTERPRISE_RETAILERS } from "@/data/enterpriseCalculator";
import { translateRetailerDesc } from "./i18nHelpers";

export default function RetailerSearchDropdown({ selected, onSelect }) {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setFocused(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const q = query.trim().toLowerCase();
  const filtered = q
    ? ENTERPRISE_RETAILERS.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          (r.hqCountry || "").toLowerCase().includes(q)
      )
    : [];

  const showResults = focused && q.length > 0;

  // The description states the retailer's global footprint; this line makes clear
  // how much of that network is actually modelled in the calculator.
  const coverage =
    selected && selected.airports?.length
      ? {
          airports: selected.airports.length,
          countries: new Set(selected.airports.map((a) => a.country)).size,
        }
      : null;

  return (
    <div ref={ref} className="relative">
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          placeholder={t("entCalc.search_placeholder")}
          className="w-full pl-10 pr-4 py-3.5 text-sm bg-white border border-slate-300 rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
        />
      </div>

      {selected && !q && (
        <div className="mt-2 flex items-center justify-between gap-3 bg-primary/5 border border-primary/20 rounded-xl px-4 py-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-slate-900 text-sm truncate">{selected.name}</p>
              <p className="text-xs text-slate-500 truncate">{translateRetailerDesc(t, selected)}</p>
              {coverage && (
                <p className="text-xs text-slate-400 truncate">
                  {t("entCalc.network_in_calculator", { airports: coverage.airports, countries: coverage.countries })}
                </p>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={() => onSelect(null)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors shrink-0"
            aria-label={t("entCalc.clear_selection")}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {showResults && (
        <div className="absolute z-50 mt-1.5 w-full bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden max-h-72 overflow-y-auto">
          {filtered.map((r) => (
            <button
              key={r.key}
              onClick={() => {
                onSelect(r);
                setQuery("");
                setFocused(false);
              }}
              className={`w-full flex items-center justify-between gap-2 px-4 py-3 hover:bg-slate-50 transition-colors text-left ${
                selected?.key === r.key ? "bg-blue-50" : ""
              }`}
            >
              <div className="min-w-0">
                <p className="font-medium text-slate-900 text-sm truncate">{r.name}</p>
                <p className="text-xs text-slate-500 truncate">
                  {translateRetailerDesc(t, r)}
                  {r.hqCountry && ` · ${t("entCalc.hq")}: ${r.hqCountry}`}
                </p>
              </div>
              {selected?.key === r.key && <Check className="w-4 h-4 text-primary shrink-0" />}
            </button>
          ))}
          {filtered.length === 0 && (
            <p className="px-4 py-6 text-sm text-slate-400 text-center">
              {t("entCalc.no_results", { query })}
            </p>
          )}
        </div>
      )}
    </div>
  );
}