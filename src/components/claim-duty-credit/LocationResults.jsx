import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import LocationOption from "@/components/claim-duty-credit/LocationOption";

export default function LocationResults({ places, query, noResultsText, onSelect }) {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(25);
  useEffect(() => setVisible(25), [places, query]);
  const custom = query.trim();
  const exactMatch = places.some((place) => [place.name, place.code, place.city].some((value) => value && value.toLowerCase() === custom.toLowerCase()));

  return (
    <div className="absolute z-50 mt-1 w-full max-h-64 overflow-y-auto bg-popover border border-border rounded-xl shadow-lg">
      {places.length === 0 && <div className="px-4 py-6 text-sm text-muted-foreground text-center">{noResultsText}</div>}
      {places.slice(0, visible).map((place) => <LocationOption key={`${place.code || place.name}-${place.country || ""}-${place.city || ""}`} place={place} onSelect={onSelect} />)}
      {places.length > visible && (
        <button type="button" onClick={() => setVisible((count) => count + 25)} className="w-full px-4 py-3 text-sm font-medium text-primary hover:bg-muted border-t border-border">
          {t("claimDutyCredit.locations_more")}
        </button>
      )}
      {custom && !exactMatch && (
        <button type="button" onClick={() => onSelect(custom)} className="w-full px-4 py-3 text-left text-sm text-primary hover:bg-muted border-t border-border break-words">
          {t("claimDutyCredit.location_use_custom", { location: custom })}
        </button>
      )}
    </div>
  );
}