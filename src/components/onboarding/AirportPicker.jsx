import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";

/**
 * Pick an airport from the directory, or type in a brand-new one. Choosing a
 * directory entry fills code / name / city / country; every field stays
 * editable so the team can enter an airport that is not listed yet.
 */
export default function AirportPicker({ airports, value, onChange }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return airports
      .filter((a) =>
        (a.code || "").toLowerCase().includes(q) ||
        (a.name || "").toLowerCase().includes(q) ||
        (a.city || "").toLowerCase().includes(q)
      )
      .slice(0, 6);
  }, [query, airports]);

  const pick = (a) => {
    onChange({
      code: a.code || "",
      name: a.name || "",
      city: a.city || "",
      country: a.country || "",
    });
    setQuery(`${a.code} — ${a.city}`);
    setOpen(false);
  };

  const set = (field) => (e) => onChange({ ...value, [field]: e.target.value });

  return (
    <div className="space-y-3">
      <div>
        <Label className="text-xs">Find an airport in the directory</Label>
        <div className="relative mt-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
            onFocus={() => setOpen(true)}
            placeholder="Search by code, name or city…"
            className="pl-9"
          />
          {open && matches.length > 0 && (
            <div className="absolute z-50 mt-1 w-full max-h-56 overflow-y-auto bg-popover border border-border rounded-lg shadow-lg">
              {matches.map((a) => (
                <button
                  key={a.id || a.code}
                  type="button"
                  onClick={() => pick(a)}
                  className="w-full flex items-center justify-between gap-3 px-3 py-2 text-left text-sm hover:bg-muted"
                >
                  <span className="truncate">{a.name} · {a.city}, {a.country}</span>
                  <span className="font-mono font-semibold shrink-0">{a.code}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div>
          <Label className="text-xs">IATA code</Label>
          <Input value={value.code} onChange={set("code")} placeholder="SXM" className="mt-1 font-mono uppercase" />
        </div>
        <div>
          <Label className="text-xs">City</Label>
          <Input value={value.city} onChange={set("city")} className="mt-1" />
        </div>
        <div className="col-span-2">
          <Label className="text-xs">Country</Label>
          <Input value={value.country} onChange={set("country")} className="mt-1" />
        </div>
        <div className="col-span-2 sm:col-span-4">
          <Label className="text-xs">Airport name</Label>
          <Input value={value.name} onChange={set("name")} placeholder="Princess Juliana International Airport" className="mt-1" />
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        An airport that is not in the directory yet is added automatically when you save.
      </p>
    </div>
  );
}