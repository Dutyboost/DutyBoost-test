export default function TurnoverFormula({ terms, result, resultLabel = "Turnover", resultNote }) {
  return (
    <div className="flex flex-wrap items-stretch gap-2">
      {terms.map((term, index) => (
        <div key={term.label} className="flex items-stretch gap-2">
          {index > 0 && <span className="self-center text-muted-foreground font-medium">×</span>}
          <div className="rounded-lg border border-border bg-muted/40 px-3 py-2 min-w-[108px]">
            <p className="text-[11px] uppercase tracking-wide text-muted-foreground">{term.label}</p>
            <p className="text-sm font-semibold tabular-nums">{term.value}</p>
          </div>
        </div>
      ))}
      <span className="self-center text-muted-foreground font-medium">=</span>
      <div className="rounded-lg bg-primary text-primary-foreground px-4 py-2 min-w-[150px]">
        <p className="text-[11px] uppercase tracking-wide opacity-80">{resultLabel}</p>
        <p className="text-base font-bold tabular-nums">{result}</p>
        {resultNote && <p className="text-[11px] opacity-80">{resultNote}</p>}
      </div>
    </div>
  );
}