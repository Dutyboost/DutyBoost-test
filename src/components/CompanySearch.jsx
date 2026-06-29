import { useState, useMemo } from "react";
import { Search, Store, Check, ChevronDown, ChevronUp } from "lucide-react";
import { fmtNum } from "@/utils/formatNumber";
import { AIRPORT_RETAIL_COMPANIES } from "@/data/airportRetailCompanies";
import { computeCompanyTotals } from "@/utils/retailerCalc";

export default function CompanySearch({ selectedCompany, onSelect, conversionRate, t }) {
  const [query, setQuery] = useState("");
  const [showAll, setShowAll] = useState(false);

  const companies = useMemo(() => {
    return AIRPORT_RETAIL_COMPANIES.map((c) => {
      const totals = computeCompanyTotals(c.airports, conversionRate);
      return { name: c.name, airports: c.airports, ...totals };
    });
  }, [conversionRate]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return companies;
    return companies.filter((c) => c.name.toLowerCase().includes(q));
  }, [companies, query]);

  const visible = showAll ? filtered : filtered.slice(0, 12);
  const selectedName = selectedCompany?.name || null;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
      <div className="text-center space-y-1">
        <h2 className="text-xl font-bold text-slate-900 flex items-center justify-center gap-2">
          <Store className="w-5 h-5 text-orange-500" />
          {t("calculator.company_search_title")}
        </h2>
        <p className="text-slate-600 text-sm max-w-xl mx-auto">{t("calculator.company_search_desc")}</p>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("calculator.company_search_placeholder")}
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-300 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {query.trim() !== "" && (
        filtered.length === 0 ? (
          <p className="text-center text-sm text-slate-500 py-4">{t("calculator.company_no_results")}</p>
        ) : (
          <div className="space-y-2">
            {visible.map((c) => {
              const isSelected = selectedName === c.name;
              return (
                <button
                  key={c.name}
                  onClick={() => onSelect(isSelected ? null : c)}
                  className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl border text-left transition-all ${
                    isSelected ? "bg-blue-600 border-blue-600 text-white" : "bg-white border-slate-200 hover:border-blue-300 hover:bg-blue-50"
                  }`}
                >
                  <div className="min-w-0 flex items-center gap-3">
                    <Store className={`w-5 h-5 shrink-0 ${isSelected ? "text-white" : "text-orange-500"}`} />
                    <div className="min-w-0">
                      <p className={`font-semibold truncate ${isSelected ? "text-white" : "text-slate-900"}`}>{c.name}</p>
                      <p className={`text-xs ${isSelected ? "text-blue-100" : "text-slate-500"}`}>
                        {c.airports.length} {t("calculator.company_airports")} · {fmtNum(c.totalDailyTravelers)} {t("calculator.travelers_label")} / {t("calculator.day_label")}
                      </p>
                    </div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-white shrink-0" />}
                </button>
              );
            })}
            {filtered.length > 12 && !showAll && (
              <button
                onClick={() => setShowAll(true)}
                className="w-full flex items-center justify-center gap-1 py-2 text-sm text-blue-600 font-medium hover:bg-blue-50 rounded-lg transition-colors"
              >
                {t("calculator.company_show_all", { count: filtered.length })}
                <ChevronDown className="w-4 h-4" />
              </button>
            )}
            {showAll && (
              <button
                onClick={() => setShowAll(false)}
                className="w-full flex items-center justify-center gap-1 py-2 text-sm text-blue-600 font-medium hover:bg-blue-50 rounded-lg transition-colors"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
            )}
          </div>
        )
      )}
    </div>
  );
}