import React from "react";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { usd, num, STATUSES } from "@/data/pitchPipeline";

export default function PipelineRow({ row, onUpdate }) {
  return (
    <tr className="border-b border-border last:border-0 hover:bg-muted/40 transition-colors align-top">
      <td className="px-4 py-3">
        <Link
          to={row.route}
          className="font-semibold text-foreground hover:text-primary inline-flex items-center gap-1.5"
        >
          {row.name}
          <ExternalLink className="w-3.5 h-3.5 opacity-40" />
        </Link>
        <div className="text-xs text-muted-foreground mt-1 max-w-xs leading-snug">{row.basis}</div>
      </td>
      <td className="px-4 py-3">
        <span className="text-xs font-semibold px-2 py-1 rounded-full bg-muted text-muted-foreground whitespace-nowrap">
          {row.category}
        </span>
      </td>
      <td className="px-4 py-3 text-sm text-muted-foreground whitespace-nowrap">{row.territory}</td>
      <td className="px-4 py-3">
        <input
          value={row.movements.toLocaleString("en-US")}
          onChange={(e) =>
            onUpdate(row.id, { movements: Number(e.target.value.replace(/[^0-9]/g, "")) || 0 })
          }
          className="w-28 text-sm text-right tabular-nums rounded-lg border border-input bg-background px-2 py-1 focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </td>
      <td className="px-4 py-3 text-right text-sm tabular-nums text-muted-foreground">
        {num(row.basketsMin)}
      </td>
      <td className="px-4 py-3 text-right font-semibold tabular-nums text-foreground">{usd(row.min)}</td>
      <td className="px-4 py-3 text-right font-semibold tabular-nums text-primary">{usd(row.modelled)}</td>
      <td className="px-4 py-3">
        <select
          value={row.status}
          onChange={(e) => onUpdate(row.id, { status: e.target.value })}
          className="text-xs rounded-lg border border-input bg-background px-2 py-1 focus:outline-none focus:ring-2 focus:ring-ring"
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </td>
    </tr>
  );
}