import { Badge } from "@/components/ui/badge";
import { Building2, CheckCircle2, CircleSlash } from "lucide-react";

/** The partner's own units (platforms, airports, brands, departments) and their live status. */
export default function PartnerUnitsCard({ units = [], heading, blurb }) {
  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="px-5 py-4 border-b border-border">
        <h2 className="font-heading font-semibold">{heading}</h2>
        {blurb ? <p className="text-sm text-muted-foreground mt-0.5">{blurb}</p> : null}
      </div>

      {units.length === 0 ? (
        <div className="px-5 py-10 text-center text-sm text-muted-foreground">
          No units on file yet — the DutyBoost team adds them when the agreement is signed.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <tbody className="divide-y divide-border">
              {units.map((u) => (
                <tr key={u.id} className="hover:bg-muted/30">
                  <td className="px-5 py-3">
                    <div className="font-medium flex items-center gap-2">
                      <Building2 className="w-3.5 h-3.5 text-primary" />
                      {u.unit_name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {[u.unit_detail, u.category, u.airport_code, u.platform, u.country]
                        .filter(Boolean)
                        .join(" · ") || "—"}
                    </div>
                  </td>
                  <td className="px-5 py-3 text-muted-foreground hidden sm:table-cell whitespace-nowrap">
                    {u.revenue_share_pct != null ? `${u.revenue_share_pct}% share` : "—"}
                  </td>
                  <td className="px-5 py-3 text-right">
                    <Badge variant={u.activated ? "default" : "secondary"} className="gap-1">
                      {u.activated ? <CheckCircle2 className="w-3 h-3" /> : <CircleSlash className="w-3 h-3" />}
                      {u.activated ? "Live" : "Not live"}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}