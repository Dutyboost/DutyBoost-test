import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Globe2, Search, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { translateRegion, translateCountry } from "./i18nHelpers";
import CountryNode from "./CountryNode";

export default function RegionNode({ region, countries, selectedCodes, onToggleCodes, onSelectOnly, airportOwners, onSetAirportOwner }) {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  const allCodes = countries.flatMap((c) => c.airports.map((a) => a.code));
  const selectedCount = allCodes.filter((c) => selectedCodes.has(c)).length;
  const allSelected = selectedCount === allCodes.length;
  const someSelected = selectedCount > 0 && !allSelected;

  const [search, setSearch] = useState("");
  const hasSearch = search.trim().length > 0;
  const filteredCountries = useMemo(() => {
    if (!hasSearch) return countries;
    const q = search.trim().toLowerCase();
    return countries.filter((c) =>
      c.country.toLowerCase().includes(q) ||
      translateCountry(c.country).toLowerCase().includes(q) ||
      c.airports.some((a) =>
        (a.city || "").toLowerCase().includes(q) ||
        (a.name || "").toLowerCase().includes(q) ||
        (a.code || "").toLowerCase().includes(q)
      )
    );
  }, [countries, search, hasSearch]);

  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden">
      <div className="flex items-center gap-2 px-3 py-2.5 bg-slate-50">
        <input
          type="checkbox"
          checked={allSelected}
          ref={(el) => { if (el) el.indeterminate = someSelected; }}
          onChange={() => {
            onToggleCodes(allCodes, !allSelected);
            if (!allSelected) setExpanded(true);
          }}
          className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary shrink-0"
        />
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 text-sm font-semibold text-slate-800 hover:text-slate-900 flex-1 min-w-0 text-left"
        >
          <ChevronRight className={`w-4 h-4 transition-transform shrink-0 ${expanded ? "rotate-90" : ""}`} />
          <Globe2 className="w-4 h-4 text-primary shrink-0" />
          <span className="truncate">{translateRegion(t, region)}</span>
          <span className="text-xs text-slate-400 shrink-0">
            {t("entCalc.countries_count", { count: countries.length })} · {t("entCalc.airports_count_short", { count: allCodes.length })}
          </span>
        </button>
        <span className="text-xs font-medium text-primary shrink-0">{t("entCalc.selected_count", { count: selectedCount })}</span>
      </div>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden px-3 py-2"
          >
            <div className="relative mb-2">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t("entCalc.search_country_placeholder")}
                className="w-full pl-8 pr-8 py-1.5 text-sm border border-slate-200 rounded-lg outline-none focus:border-primary bg-white"
              />
              {hasSearch && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            {hasSearch ? (
              filteredCountries.length > 0 ? (
                filteredCountries.map((c) => (
                  <CountryNode
                    key={c.country}
                    country={c.country}
                    airports={c.airports}
                    selectedCodes={selectedCodes}
                    onToggleCodes={onToggleCodes}
                    onSelectOnly={onSelectOnly}
                    searchActive={hasSearch}
                    airportOwners={airportOwners}
                    onSetAirportOwner={onSetAirportOwner}
                    forceExpanded
                  />
                ))
              ) : (
                <p className="text-xs text-slate-400 py-3 text-center">{t("entCalc.search_no_results")}</p>
              )
            ) : (
              <p className="text-xs text-slate-400 py-2 text-center">{t("entCalc.search_country_placeholder")}</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}