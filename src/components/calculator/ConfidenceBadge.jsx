import { useTranslation } from "react-i18next";
import { CONFIDENCE_LEVELS } from "@/data/enterpriseCalculator";

const CONFIDENCE_LABEL_KEYS = {
  high: "entCalc.confidence_high",
  medium: "entCalc.confidence_medium",
  estimated: "entCalc.confidence_estimated",
};

const CONFIDENCE_DESC_KEYS = {
  high: "entCalc.confidence_high_desc",
  medium: "entCalc.confidence_medium_desc",
  estimated: "entCalc.confidence_estimated_desc",
};

export default function ConfidenceBadge({ level, showLabel = true, size = "sm" }) {
  const { t } = useTranslation();
  const conf = CONFIDENCE_LEVELS[level] || CONFIDENCE_LEVELS.estimated;
  const labelKey = CONFIDENCE_LABEL_KEYS[level] || CONFIDENCE_LABEL_KEYS.estimated;
  const descKey = CONFIDENCE_DESC_KEYS[level] || CONFIDENCE_DESC_KEYS.estimated;
  const sizeClass = size === "xs" ? "text-[10px] px-1.5 py-0.5 gap-1" : "text-xs px-2 py-0.5 gap-1.5";
  return (
    <span
      className={`inline-flex items-center rounded-full border font-medium ${conf.badge} ${sizeClass}`}
      title={t(descKey)}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${conf.dot} shrink-0`} />
      {showLabel && t(labelKey)}
    </span>
  );
}