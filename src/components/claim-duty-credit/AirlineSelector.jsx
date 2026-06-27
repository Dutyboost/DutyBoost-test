import { useState, useMemo, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, Plane, CheckCircle2 } from "lucide-react";
import { AIRLINES } from "../../data/airlines";

/**
 * Searchable airline picker — mirrors the airport selector UX on ClaimDutyCredit.
 * Controlled component: parent owns the selected value.
 */
export default function AirlineSelector({ value, onChange, label, placeholder, noResultsText }) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return AIRLINES.slice(0, 8);
    return AIRLINES.filter(a =>
      a.company_name.toLowerCase().includes(q) ||
      a.country.toLowerCase().includes(q) ||
      (a.hubs || []).some(h => h.toLowerCase().includes(q))
    ).slice(0, 8);
  }, [query]);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSelect = (airline) => {
    onChange(airline.company_name);
    setQuery('');
    setOpen(false);
  };

  return (
    <div>
      {label && <Label className="text-sm font-medium mb-1.5 block">{label}</Label>}
      <div ref={ref} className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            value={open ? query : value}
            onChange={(e) => {
              setQuery(e.target.value);
              onChange('');
              setOpen(true);
            }}
            onFocus={() => { setOpen(true); setQuery(''); }}
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
              filtered.map((a) => (
                <button
                  key={a.company_name}
                  onClick={() => handleSelect(a)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-muted transition-colors border-b border-border last:border-b-0"
                >
                  <Plane className="w-4 h-4 text-muted-foreground shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{a.company_name}</p>
                    <p className="text-xs text-muted-foreground">{a.country}</p>
                  </div>
                  {a.hubs && a.hubs.length > 0 && (
                    <span className="text-xs font-bold text-primary shrink-0">{a.hubs[0]}</span>
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