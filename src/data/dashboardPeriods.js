// Shared period options so the retailer dashboard and its Aggregation tab offer
// exactly the same choices: Day / Week / Month / Year / Custom.
export const PERIOD_OPTIONS = [
  { value: "daily", labelKey: "demo.period_day" },
  { value: "weekly", labelKey: "demo.period_week" },
  { value: "monthly", labelKey: "demo.period_month" },
  { value: "yearly", labelKey: "demo.period_year" },
  { value: "custom", labelKey: "demo.period_custom" },
];

// Other dashboards reuse the Aggregation view with their own, shorter period set.
export const DEFAULT_PERIOD_OPTIONS = [
  { value: "daily", labelKey: "demo.daily" },
  { value: "monthly", labelKey: "demo.monthly" },
  { value: "yearly", labelKey: "demo.yearly" },
  { value: "custom", labelKey: "demo.custom" },
];