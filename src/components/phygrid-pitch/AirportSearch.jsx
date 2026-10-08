import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { GLOBAL_AIRPORTS } from "@/data/globalAirports";
import { walkedPerDay, numShort } from "@/components/phygrid-pitch/model";

// Search over the app's global airport database. Picking an airport sets the
// traveller base of the model from that airport's own published traffic.
export default function AirportSearch({ selected, onSelect }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return GLOBAL_AIRPORTS.slice(0, 8);
    return GLOBAL_AIRPORTS.filter(
      (a) =>
        (a.name || "").toLowerCase().includes(q) ||
        (a.code || "").toLowerCase().includes(q) ||
        (a.city || "").toLowerCase().includes(q) ||
        (a.country || "").toLowerCase().includes(q)
    ).slice(0, 8);
  }, [query]);

  const choose = (a) => {
    onSelect(a);
    setQuery("");
    setOpen(false);
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onBlur={() => setTimeout(() => setOpen(false), 150)}
            placeholder="Search the global airport database — name, city or code"
            className="w-full rounded-xl border border-green-300 bg-white pl-11 pr-3 py-2.5 text-base font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500/40"
          />
        </div>
        {selected && (
          <button
            type="button"
            onClick={() => onSelect(null)}
            className="flex items-center gap-1.5 rounded-xl border border-green-300 bg-white px-3 py-2.5 text-base font-semibold text-slate-700 hover:border-slate-400"
          >
            <X className="w-4 h-4" /> Clear
          </button>
        )}
      </div>

      {open && matches.length > 0 && (
        <div className="absolute z-30 mt-1 w-full max-h-72 overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-xl">
          {matches.map((a) => (
            <button
              key={a.code}
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                choose(a);
              }}
              className="flex w-full items-center justify-between gap-4 border-b border-slate-100 px-4 py-2.5 text-left last:border-b-0 hover:bg-green-50"
            >
              <span className="min-w-0">
                <span className="block truncate text-base font-semibold text-slate-800">
                  {a.city} — {a.name}
                </span>
                <span className="block text-sm text-slate-500">
                  {a.code} · {a.country}
                </span>
              </span>
              <span className="shrink-0 text-right">
                <span className="block text-base font-bold text-green-700">
                  {numShort(walkedPerDay(a.annual_pax))}
                </span>
                <span className="block text-xs text-slate-500">to gates / day</span>
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}