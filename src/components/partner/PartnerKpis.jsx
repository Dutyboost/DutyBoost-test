import StatsCard from "@/components/StatsCard";

const fmtMoney = (v) =>
  `€ ${Number(v || 0).toLocaleString("nl-NL", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

/** KPI row for a partner dashboard — the metric set comes from the partner config. */
export default function PartnerKpis({ kpis = [], metrics = {} }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map(({ label, metric, money, icon }) => (
        <StatsCard
          key={label}
          title={label}
          value={money ? fmtMoney(metrics[metric]) : Number(metrics[metric] || 0).toLocaleString("nl-NL")}
          icon={icon}
        />
      ))}
    </div>
  );
}