import { fmtEur } from "@/utils/formatNumber";
import { LEVERS, leverUplift, turnoverOf } from "@/data/retailTurnoverModel";
import { PLATFORM_FEE_PCT, feeOf } from "@/data/dutyCreditFees";

export default function TurnoverSensitivity({ terms }) {
  const base = turnoverOf(terms);

  return (
    <div className="bg-card rounded-2xl border border-border p-5 sm:p-6 space-y-3">
      <div>
        <h3 className="font-heading font-bold">What one point of each lever is worth</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Each lever moved on its own, the other four held still, against the partner's modelled turnover of {fmtEur(base)}.
        </p>
      </div>

      <div className="divide-y divide-border">
        {LEVERS.map((lever) => {
          const uplift = leverUplift(terms, lever);
          return (
            <div key={lever.key} className="flex items-center justify-between gap-3 py-2.5">
              <div>
                <p className="text-sm font-medium">{lever.label}</p>
                <p className="text-xs text-muted-foreground">{lever.move}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold tabular-nums">{fmtEur(uplift)}</p>
                <p className="text-xs text-muted-foreground">{fmtEur(feeOf(uplift))} fee at {PLATFORM_FEE_PCT}%</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}