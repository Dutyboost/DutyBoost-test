import { useRef } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  AreaChart, Area, BarChart, Bar,
  ComposedChart, Line,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from "recharts";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

// ── Static chart data (numbers don't need translation) ────────────────────────
const CHART_DATA = {
  agency: {
    color: "#1F6FFF",
    chart: "composed-stacked",
    chartData: [
      { month: "Jan", issued: 36000, redeemed: 8400, commission: 42000 },
      { month: "Feb", issued: 40500, redeemed: 9900, commission: 49500 },
      { month: "Mar", issued: 49000, redeemed: 12250, commission: 61250 },
      { month: "Apr", issued: 52500, redeemed: 13500, commission: 67500 },
      { month: "May", issued: 57000, redeemed: 14900, commission: 74500 },
      { month: "Jun", issued: 65000, redeemed: 17200, commission: 86000 },
      { month: "Jul", issued: 74000, redeemed: 20300, commission: 101500 },
      { month: "Aug", issued: 69500, redeemed: 19000, commission: 95000 },
      { month: "Sep", issued: 51000, redeemed: 13000, commission: 65000 },
      { month: "Oct", issued: 44500, redeemed: 10900, commission: 54500 },
      { month: "Nov", issued: 48000, redeemed: 11900, commission: 59500 },
      { month: "Dec", issued: 37000, redeemed: 5950, commission: 29750 },
    ],
    seriesKeys: [
      { key: "issued", tKey: "s1", color: "#93c5fd" },
      { key: "redeemed", tKey: "s2", color: "#1F6FFF" },
      { key: "commission", tKey: "s3", color: "#00C48C" },
    ],
    kpiValues: ["624,000", "157,200", "€786,000"],
    barColor1: "#bfdbfe",
    barColor2: "#1F6FFF",
    lineColor: "#00C48C",
    barKey1: "issued",
    barKey2: "redeemed",
    lineKey: "commission",
  },
  retailer: {
    color: "#f97316",
    chart: "composed",
    chartData: [
      { month: "Jan", redemptions: 9400, revenue: 1109200 },
      { month: "Feb", redemptions: 10400, revenue: 1268800 },
      { month: "Mar", redemptions: 11250, revenue: 1507500 },
      { month: "Apr", redemptions: 12000, revenue: 1680000 },
      { month: "May", redemptions: 12450, revenue: 1842600 },
      { month: "Jun", redemptions: 13200, revenue: 2138400 },
      { month: "Jul", redemptions: 14150, revenue: 2518700 },
      { month: "Aug", redemptions: 13800, revenue: 2359800 },
      { month: "Sep", redemptions: 11750, revenue: 1692000 },
      { month: "Oct", redemptions: 10600, revenue: 1441600 },
      { month: "Nov", redemptions: 11150, revenue: 1583300 },
      { month: "Dec", redemptions: 12850, revenue: 1670500 },
    ],
    seriesKeys: [
      { key: "redemptions", tKey: "s1", color: "#fdba74" },
      { key: "revenue", tKey: "s2", color: "#f97316" },
    ],
    kpiValues: ["€148", "143,000", "€19,464,000"],
  },
  hotel: {
    color: "#3b82f6",
    chart: "composed-stacked",
    chartData: [
      { month: "Jan", issued: 24000, redeemed: 5300, commission: 26500 },
      { month: "Feb", issued: 27000, redeemed: 6100, commission: 30500 },
      { month: "Mar", issued: 34000, redeemed: 7800, commission: 39000 },
      { month: "Apr", issued: 39000, redeemed: 9100, commission: 45500 },
      { month: "May", issued: 43500, redeemed: 10500, commission: 52500 },
      { month: "Jun", issued: 48000, redeemed: 11700, commission: 58500 },
      { month: "Jul", issued: 51000, redeemed: 12800, commission: 64000 },
      { month: "Aug", issued: 49500, redeemed: 12400, commission: 62000 },
      { month: "Sep", issued: 34000, redeemed: 8000, commission: 40000 },
      { month: "Oct", issued: 29000, redeemed: 6700, commission: 33500 },
      { month: "Nov", issued: 31000, redeemed: 7300, commission: 36500 },
      { month: "Dec", issued: 27000, redeemed: 6100, commission: 30500 },
    ],
    seriesKeys: [
      { key: "issued", tKey: "s1", color: "#93c5fd" },
      { key: "redeemed", tKey: "s2", color: "#3b82f6" },
      { key: "commission", tKey: "s3", color: "#0891b2" },
    ],
    kpiValues: ["412,000", "98,800", "€494,000"],
    barColor1: "#bfdbfe",
    barColor2: "#3b82f6",
    lineColor: "#0891b2",
    barKey1: "issued",
    barKey2: "redeemed",
    lineKey: "commission",
  },
  car: {
    color: "#ef4444",
    chart: "composed-stacked",
    chartData: [
      { month: "Jan", issued: 18000, redeemed: 3500, commission: 17500 },
      { month: "Feb", issued: 19500, redeemed: 3900, commission: 19500 },
      { month: "Mar", issued: 24000, redeemed: 4900, commission: 24500 },
      { month: "Apr", issued: 28000, redeemed: 5800, commission: 29000 },
      { month: "May", issued: 32000, redeemed: 6800, commission: 34000 },
      { month: "Jun", issued: 36000, redeemed: 7900, commission: 39500 },
      { month: "Jul", issued: 39000, redeemed: 8600, commission: 43000 },
      { month: "Aug", issued: 37000, redeemed: 8100, commission: 40500 },
      { month: "Sep", issued: 26000, redeemed: 5300, commission: 26500 },
      { month: "Oct", issued: 22000, redeemed: 4400, commission: 22000 },
      { month: "Nov", issued: 23000, redeemed: 4600, commission: 23000 },
      { month: "Dec", issued: 19000, redeemed: 3600, commission: 17000 },
    ],
    seriesKeys: [
      { key: "issued", tKey: "s1", color: "#fca5a5" },
      { key: "redeemed", tKey: "s2", color: "#ef4444" },
      { key: "commission", tKey: "s3", color: "#be123c" },
    ],
    kpiValues: ["306,000", "64,200", "€321,000"],
    barColor1: "#fecaca",
    barColor2: "#ef4444",
    lineColor: "#be123c",
    barKey1: "issued",
    barKey2: "redeemed",
    lineKey: "commission",
  },
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12, padding: "8px 12px" }}>
      <p className="text-muted-foreground mb-1 font-medium">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="font-semibold" style={{ color: p.color }}>
          {p.name}: {typeof p.value === "number" && p.name.includes("€") ? `€${p.value.toLocaleString()}` : p.value.toLocaleString()}
        </p>
      ))}
    </div>
  );
};

export default function DashboardPreview3D({ role = "agency" }) {
  const { t } = useTranslation();
  const chartData = CHART_DATA[role] || CHART_DATA.agency;
  const containerRef = useRef(null);
  const rotateX = 0;
  const rotateY = 0;

  const dp = `dashboardPreview.${role}`;

  const kpis = [
    { label: t(`${dp}.kpi1`), value: chartData.kpiValues[0], sub: t(`${dp}.kpi1Sub`), trend: "up" },
    { label: t(`${dp}.kpi2`), value: chartData.kpiValues[1], sub: t(`${dp}.kpi2Sub`), trend: "up" },
    { label: t(`${dp}.kpi3`), value: chartData.kpiValues[2], sub: t(`${dp}.kpi3Sub`), trend: "up" },
  ];

  const series = chartData.seriesKeys.map((s) => ({ ...s, label: t(`${dp}.${s.tKey}`) }));

  const TrendIcon = ({ trend }) => {
    if (trend === "up") return <TrendingUp className="w-3 h-3 text-emerald-400" />;
    if (trend === "down") return <TrendingDown className="w-3 h-3 text-red-400" />;
    return <Minus className="w-3 h-3 text-slate-400" />;
  };

  return (
    <section className="py-10 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <p className="text-center text-sm font-medium text-muted-foreground mb-2 uppercase tracking-wider">
          {t('dashboardPreview.badge')}
        </p>
        <h2 className="text-center text-2xl font-heading font-bold mb-8 text-foreground">
          {t('dashboardPreview.heading')}
        </h2>

        <div
          ref={containerRef}
          className="perspective-[1200px] cursor-default"
          style={{ perspective: "1200px" }}
        >
          <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative rounded-2xl overflow-hidden shadow-lg border border-border bg-background p-4 space-y-4"
          >
            {/* KPI row */}
            <div className="grid grid-cols-3 gap-4">
              {kpis.map((kpi, i) => (
                <div key={i} className="bg-card rounded-xl border border-border px-4 py-4">
                  <p className="text-xs text-muted-foreground mb-1">{kpi.label}</p>
                  <p className="text-2xl font-heading font-bold text-foreground">{kpi.value}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendIcon trend={kpi.trend} />
                    <span className="text-xs text-muted-foreground">{kpi.sub}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Chart area */}
            <div className="bg-card rounded-xl border border-border px-5 pt-5 pb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold font-heading text-foreground">{t(`${dp}.chartTitle`)}</h3>
                <div className="flex gap-3">
                  {series.map((s) => (
                    <div key={s.key} className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
                      <span className="text-xs text-muted-foreground">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <ResponsiveContainer width="100%" height={200}>
                {chartData.chart === "composed" && role === "retailer" ? (
                  <ComposedChart data={chartData.chartData} margin={{ top: 4, right: 40, bottom: 0, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis
                      yAxisId="revenue"
                      orientation="left"
                      tick={{ fontSize: 10 }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(v) => v >= 1000000 ? `€${(v / 1000000).toFixed(1)}M` : v >= 1000 ? `€${(v / 1000).toFixed(0)}K` : `€${v}`}
                    />
                    <YAxis
                      yAxisId="redemptions"
                      orientation="right"
                      tick={{ fontSize: 10 }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(v) => v >= 1000 ? `${(v / 1000).toFixed(0)}K` : v}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar yAxisId="revenue" dataKey="revenue" name={series.find(s => s.key === "revenue")?.label || "Revenue (€)"} fill="#f97316" radius={[4, 4, 0, 0]} opacity={0.85} />
                    <Line yAxisId="redemptions" type="monotone" dataKey="redemptions" name={series.find(s => s.key === "redemptions")?.label || "Redemptions"} stroke="#fdba74" strokeWidth={2.5} dot={false} />
                  </ComposedChart>
                ) : chartData.chart === "composed-stacked" ? (
                  <ComposedChart data={chartData.chartData} margin={{ top: 4, right: 40, bottom: 0, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis
                      yAxisId="left"
                      orientation="left"
                      tick={{ fontSize: 10 }}
                      axisLine={false}
                      tickLine={false}
                      ticks={[0, 50000, 100000, 150000]}
                      domain={[0, 150000]}
                      tickFormatter={(v) => v === 0 ? '0' : `${(v / 1000).toFixed(0)}K`}
                    />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      tick={{ fontSize: 10 }}
                      axisLine={false}
                      tickLine={false}
                      ticks={[0, 50000, 100000, 150000]}
                      domain={[0, 150000]}
                      tickFormatter={(v) => v === 0 ? '0' : `€${(v / 1000).toFixed(0)}K`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar yAxisId="left" dataKey={chartData.barKey1} name={series.find(s => s.key === chartData.barKey1)?.label} fill={chartData.barColor1} radius={[4, 4, 0, 0]} barSize={18} />
                    <Bar yAxisId="left" dataKey={chartData.barKey2} name={series.find(s => s.key === chartData.barKey2)?.label} fill={chartData.barColor2} radius={[4, 4, 0, 0]} barSize={18} stackId="stack" />
                    <Line yAxisId="right" type="monotone" dataKey={chartData.lineKey} name={series.find(s => s.key === chartData.lineKey)?.label} stroke={chartData.lineColor} strokeWidth={2.5} dot={false} />
                  </ComposedChart>
                ) : chartData.chart === "bar" ? (
                  <BarChart data={chartData.chartData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    {series.map((s) => (
                      <Bar key={s.key} dataKey={s.key} name={s.label} fill={s.color} radius={[4, 4, 0, 0]} />
                    ))}
                  </BarChart>
                ) : (
                  <AreaChart data={chartData.chartData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                    <defs>
                      {series.map((s) => (
                        <linearGradient key={s.key} id={`grad-${s.key}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={s.color} stopOpacity={0.25} />
                          <stop offset="95%" stopColor={s.color} stopOpacity={0} />
                        </linearGradient>
                      ))}
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    {series.map((s) => (
                      <Area
                        key={s.key}
                        type="monotone"
                        dataKey={s.key}
                        name={s.label}
                        stroke={s.color}
                        strokeWidth={2}
                        fill={`url(#grad-${s.key})`}
                      />
                    ))}
                  </AreaChart>
                )}
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
        <p className="text-center text-xs text-muted-foreground mt-4">
          {t('dashboardPreview.footnote')}
        </p>
      </div>
    </section>
  );
}