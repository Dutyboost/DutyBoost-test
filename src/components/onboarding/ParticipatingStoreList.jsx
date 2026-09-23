import { useMemo, useState } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { CheckCircle2, CircleSlash, Loader2, MapPin, Search, Trash2 } from "lucide-react";

/**
 * Every store on file, grouped by airport. Only stores switched to Live are
 * shown to travellers in the DutyCredit store locator.
 */
export default function ParticipatingStoreList({ stores, loading, onChanged }) {
  const [query, setQuery] = useState("");
  const [busyId, setBusyId] = useState(null);

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = stores.filter((s) =>
      !q || [s.airport_code, s.airport_city, s.store_name, s.retailer_name]
        .some((v) => (v || "").toLowerCase().includes(q))
    );
    const map = new Map();
    filtered.forEach((s) => {
      const key = s.airport_code || "—";
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(s);
    });
    return [...map.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  }, [stores, query]);

  const toggle = async (store) => {
    setBusyId(store.id);
    try {
      const next = !store.activated;
      await base44.entities.ParticipatingStore.update(store.id, {
        activated: next,
        ...(next ? { activated_date: new Date().toISOString().split("T")[0] } : {}),
      });
      toast.success(next
        ? `${store.store_name} is now live for travellers`
        : `${store.store_name} is hidden from travellers`);
      onChanged();
    } catch (err) {
      toast.error(err.message || "Could not update the store");
    } finally {
      setBusyId(null);
    }
  };

  const remove = async (store) => {
    if (!window.confirm(`Remove ${store.store_name} from ${store.airport_code}?`)) return;
    setBusyId(store.id);
    try {
      await base44.entities.ParticipatingStore.delete(store.id);
      toast.success("Store removed");
      onChanged();
    } catch (err) {
      toast.error(err.message || "Could not remove the store");
    } finally {
      setBusyId(null);
    }
  };

  const live = stores.filter((s) => s.activated).length;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="font-heading font-bold">Participating stores</h2>
          <p className="text-sm text-muted-foreground">
            {stores.length} store{stores.length !== 1 ? "s" : ""} on file · {live} live for travellers
          </p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter by airport, store or retailer…"
            className="pl-9"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-sm text-muted-foreground py-6">
          <Loader2 className="w-4 h-4 animate-spin" /> Loading…
        </div>
      ) : groups.length === 0 ? (
        <div className="bg-card border border-border rounded-xl px-4 py-10 text-center text-sm text-muted-foreground">
          {stores.length === 0
            ? "No participating stores yet — add the first airport and retailer above."
            : "No stores match this filter."}
        </div>
      ) : (
        groups.map(([code, list]) => (
          <div key={code} className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="px-4 py-3 bg-muted/50 flex items-center justify-between gap-3">
              <p className="text-sm font-semibold flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                {code} — {list[0].airport_city || list[0].airport_name}
              </p>
              <span className="text-xs text-muted-foreground">
                {list.filter((s) => s.activated).length}/{list.length} live
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <tbody className="divide-y divide-border">
                  {list.map((s) => (
                    <tr key={s.id} className="hover:bg-muted/30">
                      <td className="px-4 py-3">
                        <div className="font-medium">{s.store_name}</div>
                        <div className="text-xs text-muted-foreground">
                          {s.retailer_name}{s.departure_hall ? ` · ${s.departure_hall}` : ""}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{s.category || "—"}</td>
                      <td className="px-4 py-3">
                        <Badge variant={s.activated ? "default" : "secondary"} className="gap-1">
                          {s.activated ? <CheckCircle2 className="w-3 h-3" /> : <CircleSlash className="w-3 h-3" />}
                          {s.activated ? "Live" : "Not live"}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        <Button
                          size="sm"
                          variant={s.activated ? "outline" : "default"}
                          className="h-7 text-xs mr-2"
                          disabled={busyId === s.id}
                          onClick={() => toggle(s)}
                        >
                          {s.activated ? "Hide" : "Activate"}
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-7 w-7"
                          disabled={busyId === s.id}
                          onClick={() => remove(s)}
                        >
                          <Trash2 className="w-3.5 h-3.5 text-destructive" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))
      )}
    </div>
  );
}