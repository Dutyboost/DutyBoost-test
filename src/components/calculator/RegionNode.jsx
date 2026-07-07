import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Globe2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { translateRegion } from "./i18nHelpers";
import CountryNode from "./CountryNode";

export default function RegionNode({ region, countries, selectedCodes, onToggleCodes, airportOwners, onSetAirportOwner }) {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  const allCodes = countries.flatMap((c) => c.airports.map((a) => a.code));
  const selectedCount = allCodes.filter((c) => selectedCodes.has(c)).length;
  const allSelected = selectedCount === allCodes.length;
  const someSelected = selectedCount > 0 && !allSelected;

  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden">
      <div className="flex items-center gap-2 px-3 py-2.5 bg-slate-50">
        <input
          type="checkbox"
          checked={allSelected}
          ref={(el) => { if (el) el.indeterminate = someSelected; }}
          onChange={() => onToggleCodes(allCodes, !allSelected)}
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
            {countries.map((c) => (
              <CountryNode
                key={c.country}
                country={c.country}
                airports={c.airports}
                selectedCodes={selectedCodes}
                onToggleCodes={onToggleCodes}
                airportOwners={airportOwners}
                onSetAirportOwner={onSetAirportOwner}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}