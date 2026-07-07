import { useState, useRef, useEffect } from "react";
import { Search, ChevronDown, Check, Building2 } from "lucide-react";
import { ENTERPRISE_RETAILERS } from "@/data/enterpriseCalculator";

export default function RetailerSearchDropdown({ selected, onSelect }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filtered = ENTERPRISE_RETAILERS.filter((r) =>
    r.name.toLowerCase().includes(query.toLowerCase()) ||
    (r.hqCountry || "").toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-3 bg-white border border-slate-300 rounded-xl px-4 py-3.5 hover:border-primary transition-colors text-left"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <Building2 className="w-5 h-5 text-primary" />
          </div>
          {selected ? (
            <div className="min-w-0">
              <p className="font-semibold text-slate-900 truncate">{selected.name}</p>
              <p className="text-xs text-slate-500 truncate">{selected.description}</p>
            </div>
          ) : (
            <div className="min-w-0">
              <p className="font-semibold text-slate-700">Airport Retailer</p>
              <p className="text-xs text-slate-400">Select to auto-load network data…</p>
            </div>
          )}
        </div>
        <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform shrink-0 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute z-50 mt-2 w-full bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden">
          <div className="p-3 border-b border-slate-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search retailers or countries…"
                className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 rounded-lg border border-slate-200 outline-none focus:border-primary"
              />
            </div>
          </div>
          <div className="max-h-72 overflow-y-auto">
            {filtered.map((r) => (
              <button
                key={r.key}
                onClick={() => { onSelect(r); setOpen(false); setQuery(""); }}
                className={`w-full flex items-center justify-between gap-2 px-4 py-3 hover:bg-slate-50 transition-colors text-left ${selected?.key === r.key ? "bg-blue-50" : ""}`}
              >
                <div className="min-w-0">
                  <p className="font-medium text-slate-900 text-sm truncate">{r.name}</p>
                  <p className="text-xs text-slate-500 truncate">
                    {r.description}
                    {r.hqCountry && ` · HQ: ${r.hqCountry}`}
                  </p>
                </div>
                {selected?.key === r.key && <Check className="w-4 h-4 text-primary shrink-0" />}
              </button>
            ))}
            {filtered.length === 0 && (
              <p className="px-4 py-6 text-sm text-slate-400 text-center">No retailers found</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}