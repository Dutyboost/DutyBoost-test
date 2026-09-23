import { useMemo, useState } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Building2, CheckCircle2, CircleSlash, Loader2, Search, Trash2 } from "lucide-react";

/**
 * Every travel or corporate partner unit on file, grouped by partner company.
 * Only units switched to Live count towards the shared platform fee.
 */
export default function ParticipatingPartnerList({ records, loading, config, onChanged }) {
  const [query, setQuery] = useState("");
  const [busyId, setBusyId] = useState(null);

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = records.filter(
      (r) =>
        !q ||
        [r.company_name, r.unit_name, r.unit_detail, r.country, r.contact_email]
          .some((v) => (v || "").toLowerCase().includes(q))
    );
    const map = new Map();
    filtered.forEach((r) => {
      const key = r.company_name || "—";
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(r);
    });
    return [...map.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  }, [records, query]);

  const toggle = async (record) => {
    setBusyId(record.id);
    try {
      const next = !record.activated;
      await base44.entities.ParticipatingPartner.update(record.id, {
        activated: next,
        ...(next ? { activated_date: new Date().toISOString().split("T")[0] } : {}),
      });
      toast.success(
        next ? `${record.unit_name} is now live` : `${record.unit_name} is not live`
      );
      onChanged();
    } catch (err) {
      toast.error(err.message || "Could not update the partner");
    } finally {
      setBusyId(null);
    }
  };

  const remove = async (record) => {
    if (!window.confirm(`Remove ${record.unit_name} from ${record.company_name}?`)) return;
    setBusyId(record.id);
    try {
      await base44.entities.ParticipatingPartner.delete(record.id);
      toast.success("Removed");
      onChanged();
    } catch (err) {
      toast.error(err.message || "Could not remove the partner");
    } finally {
      setBusyId(null);
    }
  };

  const live = records.filter((r) => r.activated).length;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="font-heading font-bold">{config.listTitle}</h2>
          <p className="text-sm text-muted-foreground">
            {records.length} on file · {live} live and counted towards the platform fee
          </p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={config.searchPlaceholder}
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
          {records.length === 0 ? config.listEmpty : "Nothing matches this filter."}
        </div>
      ) : (
        groups.map(([company, list]) => (
          <div key={company} className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="px-4 py-3 bg-muted/50 flex items-center justify-between gap-3">
              <p className="text-sm font-semibold flex items-center gap-2">
                <Building2 className="w-4 h-4 text-primary" />
                {company}
                {list[0].country ? (
                  <span className="font-normal text-muted-foreground">— {list[0].country}</span>
                ) : null}
              </p>
              <span className="text-xs text-muted-foreground">
                {list[0].revenue_share_pct != null ? `${list[0].revenue_share_pct}% share · ` : ""}
                {list.filter((r) => r.activated).length}/{list.length} live
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <tbody className="divide-y divide-border">
                  {list.map((r) => (
                    <tr key={r.id} className="hover:bg-muted/30">
                      <td className="px-4 py-3">
                        <div className="font-medium">{r.unit_name}</div>
                        <div className="text-xs text-muted-foreground">
                          {[r.unit_detail, r.agreement_ref].filter(Boolean).join(" · ") || "—"}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">
                        {r.category || "—"}
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant={r.activated ? "default" : "secondary"} className="gap-1">
                          {r.activated ? (
                            <CheckCircle2 className="w-3 h-3" />
                          ) : (
                            <CircleSlash className="w-3 h-3" />
                          )}
                          {r.activated ? "Live" : "Not live"}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        <Button
                          size="sm"
                          variant={r.activated ? "outline" : "default"}
                          className="h-7 text-xs mr-2"
                          disabled={busyId === r.id}
                          onClick={() => toggle(r)}
                        >
                          {r.activated ? "Deactivate" : "Activate"}
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-7 w-7"
                          disabled={busyId === r.id}
                          onClick={() => remove(r)}
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