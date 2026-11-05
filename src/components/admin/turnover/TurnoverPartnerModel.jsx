import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TurnoverFormula from "@/components/admin/turnover/TurnoverFormula";
import { fmtEur, fmtNum } from "@/utils/formatNumber";
import { FLOW_UNITS, turnoverOf } from "@/data/retailTurnoverModel";
import { PLATFORM_FEE_PCT, feeOf } from "@/data/dutyCreditFees";

const FIELDS = [
  { key: "flow", label: "Flow", step: "1" },
  { key: "penetration", label: "Penetration (%)", step: "0.5" },
  { key: "conversion", label: "Conversion (%)", step: "0.5" },
  { key: "multipleSale", label: "Multiple sale", step: "0.1" },
  { key: "averagePrice", label: "Average price (€)", step: "0.5" },
];

export default function TurnoverPartnerModel({ vertical, terms, onChange, uplift, onUpliftChange }) {
  const turnover = turnoverOf(terms);
  const points = Number(uplift) || 0;
  const boosted = turnoverOf({
    ...terms,
    penetration: Number(terms.penetration || 0) + points,
    conversion: Number(terms.conversion || 0) + points,
  });
  const incremental = boosted - turnover;

  const chain = [
    { label: "Flow", value: fmtNum(Number(terms.flow) || 0) },
    { label: "Penetration", value: `${fmtNum(Number(terms.penetration) || 0, 1)}%` },
    { label: "Conversion", value: `${fmtNum(Number(terms.conversion) || 0, 1)}%` },
    { label: "Multiple sale", value: fmtNum(Number(terms.multipleSale) || 0, 2) },
    { label: "Average price", value: fmtEur(Number(terms.averagePrice) || 0, 2) },
  ];

  return (
    <div className="bg-card rounded-2xl border border-border p-5 sm:p-6 space-y-4">
      <div>
        <h3 className="font-heading font-bold">The partner's own turnover model</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Their estate, their levers. Replace these starting assumptions with the figures the partner gives you; nothing
          here is ours. Flow is {(FLOW_UNITS[vertical] || FLOW_UNITS.all).toLowerCase()} for the period.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {FIELDS.map((field) => (
          <div key={field.key}>
            <Label className="text-xs text-muted-foreground mb-1.5 block">{field.label}</Label>
            <Input
              type="number"
              min="0"
              step={field.step}
              value={terms[field.key]}
              onChange={(event) => onChange(field.key, event.target.value)}
            />
          </div>
        ))}
      </div>

      <TurnoverFormula terms={chain} result={fmtEur(turnover)} resultLabel="Modelled turnover" resultNote="annual" />

      <div className="rounded-xl border border-border bg-muted/40 p-4 space-y-3">
        <p className="text-sm font-semibold">If DutyBoost lifts both middle levers</p>
        <div className="flex flex-wrap items-end gap-4">
          <div className="w-40">
            <Label className="text-xs text-muted-foreground mb-1.5 block">Points on each lever</Label>
            <Input type="number" min="0" step="0.5" value={uplift} onChange={(event) => onUpliftChange(event.target.value)} />
          </div>
          <div className="flex-1 min-w-[180px] grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-muted-foreground">Extra turnover</p>
              <p className="text-sm font-bold tabular-nums">{fmtEur(incremental)}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Platform fee ({PLATFORM_FEE_PCT}%)</p>
              <p className="text-sm font-bold tabular-nums">{fmtEur(feeOf(incremental))}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}