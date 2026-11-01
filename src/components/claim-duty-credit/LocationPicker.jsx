import { useState, useMemo, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, CheckCircle2 } from "lucide-react";
import LocationResults from "@/components/claim-duty-credit/LocationResults";

const normalize = (value) => String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();

/** Search the full directory, or enter an unlisted stop, branch or stay. */
export default function LocationPicker({ options, value, onSelect, label, placeholder, noResultsText }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const boxRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = useMemo(() => {
    if (!options) return [];
    const terms = normalize(query).split(/\s+/).filter(Boolean);
    if (!terms.length) return options.slice(0, 8);
    // Search every location BEFORE paginating, never just the initial hubs.
    return options.filter((place) => {
      const text = normalize([place.name, place.country, place.city, place.code].filter(Boolean).join(" "));
      return terms.every((term) => text.includes(term));
    });
  }, [options, query]);

  if (!options) {
    return (
      <div>
        <Label className="text-sm font-semibold mb-2 block">{label}</Label>
        <Input
          type="text"
          value={value}
          onChange={(e) => onSelect(e.target.value)}
          placeholder={placeholder}
          className="h-12 text-base"
        />
      </div>
    );
  }

  return (
    <div>
      <Label className="text-sm font-semibold mb-2 block">{label}</Label>
      <div ref={boxRef} className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            value={open ? query : value}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onFocus={() => {
              setOpen(true);
              setQuery("");
            }}
            placeholder={placeholder}
            className="pl-10 h-12 text-base"
          />
          {value && !open && (
            <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
          )}
        </div>
        {open && (
          <LocationResults
            places={filtered}
            query={query}
            noResultsText={noResultsText}
            onSelect={(place) => {
              onSelect(place);
              setQuery("");
              setOpen(false);
            }}
          />
        )}
      </div>
    </div>
  );
}