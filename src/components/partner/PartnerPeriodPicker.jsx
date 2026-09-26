import { Calendar } from "lucide-react";

/** Shared period picker used across the partner dashboards and the admin directory. */
export default function PartnerPeriodPicker({
  period,
  onChange,
  customStart,
  customEnd,
  onCustomStartChange,
  onCustomEndChange,
}) {
  const options = [
    { key: "daily", label: "Last 7 days" },
    { key: "monthly", label: "Last 30 days" },
    { key: "custom", label: "Custom" },
  ];

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <Calendar className="w-4 h-4 text-muted-foreground" />
      <span className="text-sm text-muted-foreground font-medium">Period:</span>
      {options.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
            period === key
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-card border-border hover:border-primary/50"
          }`}
        >
          {label}
        </button>
      ))}
      {period === "custom" && (
        <div className="flex items-center gap-2 ml-1">
          <input
            type="date"
            value={customStart}
            onChange={(e) => onCustomStartChange(e.target.value)}
            className="text-xs border border-input rounded-lg px-2 py-1.5 bg-background"
          />
          <span className="text-xs text-muted-foreground">to</span>
          <input
            type="date"
            value={customEnd}
            onChange={(e) => onCustomEndChange(e.target.value)}
            className="text-xs border border-input rounded-lg px-2 py-1.5 bg-background"
          />
        </div>
      )}
    </div>
  );
}