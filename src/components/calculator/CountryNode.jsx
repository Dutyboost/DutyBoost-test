import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import { fmtCompact } from "@/data/enterpriseCalculator";
import AirportOwnerField from "./AirportOwnerField";
import { translateCountry } from "./i18nHelpers";

export default function CountryNode({ country, airports, selectedCodes, onToggleCodes, onSelectOnly, searchActive, airportOwners, onSetAirportOwner, forceExpanded }) {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  const isExpanded = forceExpanded || expanded;
  const codes = airports.map((a) => a.code);
  const selectedCount = codes.filter((c) => selectedCodes.has(c)).length;
  const allSelected = selectedCount === codes.length;
  const someSelected = selectedCount > 0 && !allSelected;

  const isSoleSelection = (cs) => cs.length > 0 && cs.length === selectedCodes.size && cs.every((c) => selectedCodes.has(c));

  const handleCountryToggle = () => {
    if (searchActive) {
      if (allSelected && isSoleSelection(codes)) {
        onToggleCodes(codes, false);
      } else {
        onSelectOnly(codes);
      }
    } else {
      onToggleCodes(codes, !allSelected);
    }
  };

  const handleAirportToggle = (code) => {
    const isSelected = selectedCodes.has(code);
    if (searchActive) {
      if (isSelected && isSoleSelection([code])) {
        onToggleCodes([code], false);
      } else {
        onSelectOnly([code]);
      }
    } else {
      onToggleCodes([code], !isSelected);
    }
  };

  return (
    <div className="ml-4 border-l border-slate-200">
      <div className="flex items-center gap-2 py-2 pl-2">
        <input
          type="checkbox"
          checked={allSelected}
          ref={(el) => { if (el) el.indeterminate = someSelected; }}
          onChange={handleCountryToggle}
          className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary shrink-0"
        />
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-900 flex-1 min-w-0 text-left rounded-lg px-2 py-1.5 hover:bg-slate-50 transition-colors"
        >
          <ChevronRight className={`w-4 h-4 transition-transform shrink-0 ${isExpanded ? "rotate-90" : ""}`} />
          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate">{translateCountry(country)}</span>
          <span className="text-xs text-slate-400 shrink-0">({airports.length})</span>
          {selectedCount > 0 && <span className="text-xs text-primary shrink-0 ml-auto">{selectedCount}/{codes.length}</span>}
        </button>
      </div>
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden ml-4"
          >
            {airports.map((a) => (
              <div key={a.code} className="flex items-center gap-2 py-1.5 pl-2 hover:bg-slate-50 rounded">
                <label className="flex items-center gap-2 cursor-pointer min-w-0">
                  <input
                    type="checkbox"
                    checked={selectedCodes.has(a.code)}
                    onChange={() => handleAirportToggle(a.code)}
                    className="w-3.5 h-3.5 rounded border-slate-300 text-primary focus:ring-primary shrink-0"
                  />
                  <span className="text-xs text-slate-600 truncate">{a.city || a.name}</span>
                  <span className="text-[10px] text-slate-400 font-mono shrink-0">{a.code}</span>
                </label>
                <div className="flex items-center gap-2 ml-auto shrink-0">
                  <span className="text-[10px] text-slate-400">{fmtCompact(a.annual_pax || 0)} {t("entCalc.pax")}</span>
                  <AirportOwnerField code={a.code} owner={airportOwners?.[a.code]} onSetOwner={onSetAirportOwner} />
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}