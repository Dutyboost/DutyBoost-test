import { CONFIDENCE_LEVELS } from "@/data/enterpriseCalculator";

export default function ConfidenceBadge({ level, showLabel = true, size = "sm" }) {
  const conf = CONFIDENCE_LEVELS[level] || CONFIDENCE_LEVELS.estimated;
  const sizeClass = size === "xs" ? "text-[10px] px-1.5 py-0.5 gap-1" : "text-xs px-2 py-0.5 gap-1.5";
  return (
    <span
      className={`inline-flex items-center rounded-full border font-medium ${conf.badge} ${sizeClass}`}
      title={conf.desc}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${conf.dot} shrink-0`} />
      {showLabel && conf.label}
    </span>
  );
}