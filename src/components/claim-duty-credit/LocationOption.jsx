import { MapPin } from "lucide-react";

export default function LocationOption({ place, onSelect }) {
  return (
    <button type="button" onClick={() => onSelect(place)} className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-muted transition-colors border-b border-border last:border-b-0">
      <MapPin className="w-4 h-4 text-muted-foreground shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{place.name}</p>
        {(place.city || place.country) && <p className="text-xs text-muted-foreground">{[place.city, place.country].filter(Boolean).join(", ")}</p>}
      </div>
      {place.code && <span className="text-sm font-bold text-primary shrink-0">{place.code}</span>}
    </button>
  );
}