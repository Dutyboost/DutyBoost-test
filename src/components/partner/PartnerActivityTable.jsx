import { fmtEur, fmtNum } from "@/utils/formatNumber";
import { ITEMS_PER_REDEMPTION } from "@/data/retailTurnoverModel";

/** Activity for the signed-in partner only, grouped by departure point or store. */
export default function PartnerActivityTable({ heading, rows = [] }) {
  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden">
      <div className="p-5 sm:p-6 pb-3">
        <h3 className="font-heading font-bold">{heading}</h3>
      </div>

      {rows.length === 0 ? (
        <p className="px-5 sm:px-6 pb-6 text-sm text-muted-foreground">No activity recorded on this account yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-y border-border text-xs uppercase tracking-wide text-muted-foreground">
                <th className="text-left font-medium px-5 sm:px-6 py-2">Location</th>
                <th className="text-right font-medium px-3 py-2">DutyCredits</th>
                <th className="text-right font-medium px-3 py-2">Redeemed</th>
                <th className="text-right font-medium px-3 py-2">Avg basket</th>
                <th className="text-right font-medium px-5 sm:px-6 py-2">Turnover</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const avgBasket = row.redeemed > 0 ? row.bought / row.redeemed / ITEMS_PER_REDEMPTION : 0;
                return (
                  <tr key={row.label} className="border-b border-border last:border-0">
                    <td className="px-5 sm:px-6 py-2.5 font-medium">{row.label}</td>
                    <td className="px-3 py-2.5 text-right tabular-nums">{fmtNum(row.claims)}</td>
                    <td className="px-3 py-2.5 text-right tabular-nums">{fmtNum(row.redeemed)}</td>
                    <td className="px-3 py-2.5 text-right tabular-nums">{fmtEur(avgBasket, 2)}</td>
                    <td className="px-5 sm:px-6 py-2.5 text-right font-semibold tabular-nums">{fmtEur(row.bought)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}