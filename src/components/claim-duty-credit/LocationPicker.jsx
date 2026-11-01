import { useState, useMemo, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, MapPin, CheckCircle2 } from "lucide-react";

/**
 * Location field for the claim form. With `options` it is a searchable list of
 * hubs (airports, ports, stations); without them it is a free-text field for a
 * pickup point, city or hotel area.
 */
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
    const q = query.trim().toLowerCase();
    if (!q) return options.slice(0, 8);
    return options
      .filter(
        (o) =>
          o.name.toLowerCase().includes(q) ||
          (o.country || "").toLowerCase().includes(q) ||
          (o.code || "").toLowerCase().includes(q)
      )
      .slice(0, 8);
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
          <div className="absolute z-50 mt-1 w-full max-h-64 overflow-y-auto bg-white border border-border rounded-xl shadow-lg">
            {filtered.length === 0 ? (
              <div className="px-4 py-6 text-sm text-muted-foreground text-center">{noResultsText}</div>
            ) : (
              filtered.map((o) => (
                <button
                  key={`${o.name}-${o.country || ""}`}
                  type="button"
                  onClick={() => {
                    onSelect(o);
                    setQuery("");
                    setOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-muted transition-colors border-b border-border last:border-b-0"
                >
                  <MapPin className="w-4 h-4 text-muted-foreground shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{o.name}</p>
                    {o.country && <p className="text-xs text-muted-foreground">{o.country}</p>}
                  </div>
                  {o.code && (
                    <span className="text-sm font-bold text-primary shrink-0">{o.code}</span>
                  )}
                </button>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}