import { useMemo } from "react";
import { Check, Info } from "lucide-react";
import { useTranslation } from "react-i18next";
import { groupAirportsByRegion } from "@/data/enterpriseCalculator";
import RegionNode from "./RegionNode";
import OwnerBreakdown from "./OwnerBreakdown";

export default function NetworkSelector({ airports, selectedCodes, onToggleCodes, onSelectOnly, airportOwners, onSetAirportOwner }) {
  const { t } = useTranslation();
  const regions = useMemo(() => groupAirportsByRegion(airports), [airports]);
  const allCodes = useMemo(() => airports.map((a) => a.code), [airports]);
  const allSelected = allCodes.length > 0 && allCodes.every((c) => selectedCodes.has(c));
  const totalCount = allCodes.length;
  const selectedCount = allCodes.filter((c) => selectedCodes.has(c)).length;

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
      <p className="text-sm text-slate-900 font-medium flex items-start gap-1.5 mb-1">
        <Info className="w-4 h-4 mt-0.5 shrink-0 text-slate-700" />
        {t("entCalc.owner_hint")}
      </p>
      {regions.map((r) => (
        <RegionNode
          key={r.region}
          region={r.region}
          countries={r.countries}
          selectedCodes={selectedCodes}
          onToggleCodes={onToggleCodes}
          onSelectOnly={onSelectOnly}
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