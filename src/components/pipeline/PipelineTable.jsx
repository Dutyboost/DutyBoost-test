import React from "react";
import PipelineRow from "@/components/pipeline/PipelineRow";
import { usd } from "@/data/pitchPipeline";

const HEADERS = [
  { label: "Pitch", align: "left" },
  { label: "Category", align: "left" },
  { label: "Market", align: "left" },
  { label: "Movements / yr", align: "right" },
  { label: "Baskets / yr", align: "right" },
  { label: "Minimum / yr", align: "right" },
  { label: "Modelled / yr", align: "right" },
  { label: "Status", align: "left" },
];

export default function PipelineTable({ rows, totals, onUpdate }) {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[980px] text-left">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              {HEADERS.map((h) => (
                <th
                  key={h.label}
                  className={`px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground ${
                    h.align === "right" ? "text-right" : "text-left"
                  }`}
                >
                  {h.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <PipelineRow key={row.id} row={row} onUpdate={onUpdate} />
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-muted/50 border-t border-border">
              <td className="px-4 py-3 font-semibold text-foreground" colSpan={3}>
                Pipeline total
              </td>
              <td className="px-4 py-3" />
              <td className="px-4 py-3" />
              <td className="px-4 py-3 text-right font-bold tabular-nums text-foreground">
                {usd(totals.min)}
              </td>
              <td className="px-4 py-3 text-right font-bold tabular-nums text-primary">
                {usd(totals.modelled)}
              </td>
              <td className="px-4 py-3" />
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}