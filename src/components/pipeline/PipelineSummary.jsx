import React from "react";
import { usdShort, CATEGORIES } from "@/data/pitchPipeline";

export default function PipelineSummary({ byCategory, totals, pitchCount }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      {CATEGORIES.map((cat) => (
        <div key={cat} className="bg-card border border-border rounded-xl p-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{cat}</div>
          <div className="font-heading font-bold text-xl text-foreground mt-2 tabular-nums">
            {usdShort(byCategory[cat]?.min || 0)}
          </div>
          <div className="text-xs text-muted-foreground mt-0.5">
            min / yr · {usdShort(byCategory[cat]?.modelled || 0)} modelled
          </div>
        </div>
      ))}
      <div className="bg-primary text-primary-foreground rounded-xl p-4">
        <div className="text-xs font-semibold uppercase tracking-wider opacity-80">
          Pipeline — {pitchCount} pitches
        </div>
        <div className="font-heading font-bold text-xl mt-2 tabular-nums">{usdShort(totals.min)}</div>
        <div className="text-xs opacity-80 mt-0.5">
          minimum / yr · {usdShort(totals.modelled)} modelled
        </div>
      </div>
    </div>
  );
}