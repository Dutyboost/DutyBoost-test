import { useEffect, useMemo, useState } from "react";
import { base44 } from "@/api/base44Client";
import { Search, Loader2 } from "lucide-react";

/**
 * Searches the researched airport directory and returns the airport together
 * with the number of stores mapped at it, so the calculator can be seeded with
 * real store counts rather than a guess.
 */
export default function AirportStorePicker({ onSelect }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [airports, setAirports] = useState([]);

  useEffect(() => {
    let cancelled = false;

    Promise.all([
      base44.entities.Airport.list("code", 5000),
      base44.entities.AirportStore.list("store_name", 5000),
    ])
      .then(([airportList, storeList]) => {
        if (cancelled) return;

        const counts = {};
        (storeList || []).forEach((s) => {
          const key = (s.airport_code || "").toUpperCase();
          if (key) counts[key] = (counts[key] || 0) + 1;
        });

        setAirports(
          (airportList || [])
            .map((a) => {
              const code = (a.code || "").toUpperCase();
              return { ...a, code, stores: counts[code] || 0 };
            })
            .filter((a) => a.stores > 0)
        );
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, []);

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return airports
      .filter(
        (a) =>
          a.code.toLowerCase().includes(q) ||
          (a.name || "").toLowerCase().includes(q) ||
          (a.city || "").toLowerCase().includes(q)
      )
      .slice(0, 6);
  }, [query, airports]);

  const pick = (a) => {
    onSelect({ code: a.code, name: a.name, city: a.city, country: a.country, stores: a.stores });
    setQuery(`${a.code} — ${a.city} · ${a.stores} stores`);
    setOpen(false);
  };

  return (
    <div className="relative mb-3">
      <span className="block text-[11px] font-semibold text-green-900/70 mb-1">
        Find the airport in the directory — its store count fills in automatically
      </span>
      <span className="relative block">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        {loading && (
          <Loader2 className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 animate-spin" />
        )}
        <input
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          placeholder="Search by code, name or city…"
          className="w-full rounded-lg border border-green-300 bg-white py-1.5 pl-8 pr-8 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500/40"
        />
      </span>

      {open && matches.length > 0 && (
        <div className="absolute z-50 mt-1 w-full max-h-56 overflow-y-auto bg-white border border-green-200 rounded-lg shadow-lg">
          {matches.map((a) => (
            <button
              key={a.id || a.code}
              type="button"
              onMouseDown={() => pick(a)}
              className="w-full flex items-center justify-between gap-3 px-3 py-2 text-left text-sm hover:bg-green-50"
            >
              <span>
                <span className="font-semibold text-slate-800">{a.code}</span>
                <span className="text-slate-500"> — {a.city}, {a.country}</span>
              </span>
              <span className="text-green-700 text-xs font-semibold whitespace-nowrap">
                {a.stores} stores
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}