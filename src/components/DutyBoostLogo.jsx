export default function DutyBoostLogo({ height = 36, inverted = false }) {
  const fontSize = Math.round(height * 0.55);
  const subSize = Math.round(height * 0.28);

  return (
    <div
      className="flex items-baseline gap-0 select-none"
      style={{ color: inverted ? "white" : undefined }}
    >
      <span
        className="font-heading font-bold tracking-tight text-foreground"
        style={{ fontSize: `${fontSize}px`, color: inverted ? "white" : undefined }}
      >
        Duty
      </span>
      <span
        className="font-heading font-bold tracking-tight text-primary"
        style={{ fontSize: `${fontSize}px`, color: inverted ? "rgba(255,255,255,0.85)" : undefined }}
      >
        Boost
      </span>
    </div>
  );
}