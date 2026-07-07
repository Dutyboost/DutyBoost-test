import { useMemo } from "react";
import { Globe, Check, Map, Info } from "lucide-react";
import { useTranslation } from "react-i18next";
import { groupAirportsByRegion } from "@/data/enterpriseCalculator";
import { translateRegion } from "./i18nHelpers";
import RegionNode from "./RegionNode";
import OwnerBreakdown from "./OwnerBreakdown";

export default function NetworkSelector({ airports, selectedCodes, onToggleCodes, mode, airportOwners, onSetAirportOwner }) {
  const { t } = useTranslation();
  const regions = useMemo(() => groupAirportsByRegion(airports), [airports]);
  const allCodes = useMemo(() => airports.map((a) => a.code), [airports]);
  const allSelected = allCodes.length > 0 && allCodes.every((c) => selectedCodes.has(c));
  const totalCount = allCodes.length;
  const selectedCount = allCodes.filter((c) => selectedCodes.has(c)).length;

  if (mode === "quick") {
    return (
      <div className="space-y-3">
        <button
          onClick={() => onToggleCodes(allCodes, !allSelected)}
          className={`w-full flex items-center justify-between gap-3 rounded-xl px-4 py-3.5 border-2 transition-all ${
            allSelected ? "border-primary bg-primary/5" : "border-slate-200 bg-white hover:border-slate-300"
          }`}
        >
          <div className="flex items-center gap-3">
            <Globe className={`w-5 h-5 ${allSelected ? "text-primary" : "text-slate-400"}`} />
            <span className="font-semibold text-slate-900">{t("entCalc.entire_network")}</span>
          </div>
          <span className="text-sm text-slate-500">{t("entCalc.airports_count", { count: totalCount })}</span>
        </button>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {regions.map((r) => {
            const regionCodes = r.countries.flatMap((c) => c.airports.map((a) => a.code));
            const regionSelected = regionCodes.every((c) => selectedCodes.has(c));
            return (
              <button
                key={r.region}
                onClick={() => onToggleCodes(regionCodes, !regionSelected)}
                className={`flex items-center justify-between gap-2 rounded-lg px-3 py-2.5 border transition-all text-left ${
                  regionSelected ? "border-primary bg-primary/5" : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <Map className={`w-4 h-4 shrink-0 ${regionSelected ? "text-primary" : "text-slate-400"}`} />
                  <span className="text-sm font-medium text-slate-700 truncate">{translateRegion(t, r.region)}</span>
                </div>
                <span className="text-xs text-slate-400 shrink-0">{regionCodes.length}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between mb-2">
        <button
          onClick={() => onToggleCodes(allCodes, !allSelected)}
          className={`flex items-center gap-2 text-sm font-semibold transition-colors ${allSelected ? "text-primary" : "text-slate-700"}`}
        >
          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${allSelected ? "border-primary bg-primary" : "border-slate-300"}`}>
            {allSelected && <Check className="w-3 h-3 text-white" />}
          </div>
          {t("entCalc.entire_network")}
        </button>
        <span className="text-xs text-slate-500">
          {t("entCalc.airports_selected", { selected: selectedCount, total: totalCount })}
        </span>
      </div>
      <p className="text-[11px] text-slate-400 flex items-start gap-1 mb-1">
        <Info className="w-3 h-3 mt-0.5 shrink-0" />
        {t("entCalc.owner_hint")}
      </p>
      {regions.map((r) => (
        <RegionNode
          key={r.region}
          region={r.region}
          countries={r.countries}
          selectedCodes={selectedCodes}
          onToggleCodes={onToggleCodes}
          airportOwners={airportOwners}
          onSetAirportOwner={onSetAirportOwner}
        />
      ))}
      <OwnerBreakdown
        selectedAirports={airports.filter((a) => selectedCodes.has(a.code))}
        airportOwners={airportOwners}
      />
    </div>
  );
}