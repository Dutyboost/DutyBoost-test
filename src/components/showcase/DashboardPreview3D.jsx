import { useRef } from "react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
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
      { month: "Jan", issued: 36000, redeemed: 5400, commission: 5900 },
      { month: "Feb", issued: 40500, redeemed: 6075, commission: 6600 },
      { month: "Mar", issued: 49000, redeemed: 7350, commission: 8000 },
      { month: "Apr", issued: 52500, redeemed: 7875, commission: 8600 },
      { month: "May", issued: 57000, redeemed: 8550, commission: 9300 },
      { month: "Jun", issued: 65000, redeemed: 9750, commission: 10600 },
      { month: "Jul", issued: 74000, redeemed: 11100, commission: 12100 },
      { month: "Aug", issued: 69500, redeemed: 10425, commission: 11400 },
      { month: "Sep", issued: 51000, redeemed: 7650, commission: 8300 },
      { month: "Oct", issued: 44500, redeemed: 6675, commission: 7300 },
      { month: "Nov", issued: 48000, redeemed: 7200, commission: 7800 },
      { month: "Dec", issued: 37000, redeemed: 5550, commission: 6000 },
    ],
    seriesKeys: [
      { key: "issued", tKey: "s1", color: "#93c5fd" },
      { key: "redeemed", tKey: "s2", color: "#1F6FFF" },
      { key: "commission", tKey: "s3", color: "#00C48C" },
    ],
    kpiValues: ["624.000", "157.200", "€786.000"],
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
    kpiValues: ["€148", "143.000", "€19.464.000"],
  },
  accommodation: {
    color: "#3b82f6",
    chart: "composed-stacked",
    chartData: [
      { month: "Jan", issued: 24000, redeemed: 3600, commission: 3900 },
      { month: "Feb", issued: 27000, redeemed: 4050, commission: 4400 },
      { month: "Mar", issued: 34000, redeemed: 5100, commission: 5600 },
      { month: "Apr", issued: 39000, redeemed: 5850, commission: 6400 },
      { month: "May", issued: 43500, redeemed: 6525, commission: 7100 },
      { month: "Jun", issued: 48000, redeemed: 7200, commission: 7800 },
      { month: "Jul", issued: 51000, redeemed: 7650, commission: 8300 },
      { month: "Aug", issued: 49500, redeemed: 7425, commission: 8100 },
      { month: "Sep", issued: 34000, redeemed: 5100, commission: 5600 },
      { month: "Oct", issued: 29000, redeemed: 4350, commission: 4700 },
      { month: "Nov", issued: 31000, redeemed: 4650, commission: 5100 },
      { month: "Dec", issued: 27000, redeemed: 4050, commission: 4400 },
    ],
    seriesKeys: [
      { key: "issued", tKey: "s1", color: "#93c5fd" },
      { key: "redeemed", tKey: "s2", color: "#3b82f6" },
      { key: "commission", tKey: "s3", color: "#0891b2" },
    ],
    kpiValues: ["412.000", "98.800", "€494.000"],
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
      { month: "Jan", issued: 18000, redeemed: 2700, commission: 2900 },
      { month: "Feb", issued: 19500, redeemed: 2925, commission: 3200 },
      { month: "Mar", issued: 24000, redeemed: 3600, commission: 3900 },
      { month: "Apr", issued: 28000, redeemed: 4200, commission: 4600 },
      { month: "May", issued: 32000, redeemed: 4800, commission: 5200 },
      { month: "Jun", issued: 36000, redeemed: 5400, commission: 5900 },
      { month: "Jul", issued: 39000, redeemed: 5850, commission: 6400 },
      { month: "Aug", issued: 37000, redeemed: 5550, commission: 6000 },
      { month: "Sep", issued: 26000, redeemed: 3900, commission: 4300 },
      { month: "Oct", issued: 22000, redeemed: 3300, commission: 3600 },
      { month: "Nov", issued: 23000, redeemed: 3450, commission: 3700 },
      { month: "Dec", issued: 19000, redeemed: 2850, commission: 3100 },
    ],
    seriesKeys: [
      { key: "issued", tKey: "s1", color: "#fca5a5" },
      { key: "redeemed", tKey: "s2", color: "#ef4444" },
      { key: "commission", tKey: "s3", color: "#be123c" },
    ],
    kpiValues: ["306.000", "64.200", "€321.000"],
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
          {p.name}: {typeof p.value === "number" && p.name.includes("€") ? `€${p.value.toLocaleString("nl-NL")}` : p.value.toLocaleString("nl-NL")}
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

  // Charts must shrink with the viewport: the fixed bar widths and full-width
  // axes overflowed the plot area on phones, so scale them down there.
  const isMobile = useIsMobile();
  const tickFont = isMobile ? 9 : 10;
  const yAxisWidth = isMobile ? 34 : 60;
  const xInterval = isMobile ? 1 : 0;
  const chartHeight = isMobile ? 180 : 200;
  const barSize = isMobile ? 5 : 14;

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
            className="relative rounded-2xl overflow-hidden shadow-lg border border-border bg-background p-3 sm:p-4 space-y-3 sm:space-y-4"
          >
            {/* KPI row */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              {kpis.map((kpi, i) => (
                <div key={i} className="bg-card rounded-xl border border-border px-2 py-3 sm:px-4 sm:py-4">
                  <p className="text-[10px] sm:text-xs text-muted-foreground mb-1 leading-tight">{kpi.label}</p>
                  <p className="text-sm sm:text-2xl font-heading font-bold text-foreground break-all leading-tight">{kpi.value}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendIcon trend={kpi.trend} />
                    <span className="text-[10px] sm:text-xs text-muted-foreground leading-tight">{kpi.sub}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Chart area */}
            <div className="bg-card rounded-xl border border-border px-2.5 sm:px-5 pt-4 sm:pt-5 pb-5 sm:pb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                <h3 className="text-sm font-semibold font-heading text-foreground">{t(`${dp}.chartTitle`)}</h3>
                <div className="flex flex-wrap gap-x-3 gap-y-1">
                  {series.map((s) => (
                    <div key={s.key} className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
                      <span className="text-xs text-muted-foreground">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <ResponsiveContainer width="100%" height={chartHeight}>
                {chartData.chart === "composed" && role === "retailer" ? (
                  <ComposedChart data={chartData.chartData} margin={{ top: 4, right: isMobile ? 24 : 40, bottom: 0, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" tick={{ fontSize: tickFont }} interval={xInterval} axisLine={false} tickLine={false} />
                    <YAxis
                      yAxisId="revenue"
                      orientation="left"
                      width={yAxisWidth}
                      tick={{ fontSize: tickFont }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(v) => v >= 1000000 ? `€${(v / 1000000).toFixed(1).replace(".", ",")}M` : v >= 1000 ? `€${(v / 1000).toFixed(0)}.000` : `€${v}`}
                    />
                    <YAxis
                      yAxisId="redemptions"
                      orientation="right"
                      width={yAxisWidth}
                      tick={{ fontSize: tickFont }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(v) => v >= 1000 ? `${(v / 1000).toFixed(0)}.000` : v}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar yAxisId="revenue" dataKey="revenue" name={series.find(s => s.key === "revenue")?.label || "Revenue (€)"} fill="#f97316" radius={[4, 4, 0, 0]} opacity={0.85} />
                    <Line yAxisId="redemptions" type="monotone" dataKey="redemptions" name={series.find(s => s.key === "redemptions")?.label || "Redemptions"} stroke="#fdba74" strokeWidth={2.5} dot={false} />
                  </ComposedChart>
                ) : chartData.chart === "composed-stacked" ? (
                  <BarChart data={chartData.chartData} margin={{ top: 4, right: isMobile ? 4 : 8, bottom: 0, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" tick={{ fontSize: tickFont }} interval={xInterval} axisLine={false} tickLine={false} />
                    <YAxis
                      width={yAxisWidth}
                      tick={{ fontSize: tickFont }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(v) => v >= 1000 ? `${(v / 1000).toFixed(0)}.000` : v}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey={chartData.barKey1} name={series.find(s => s.key === chartData.barKey1)?.label} fill={chartData.barColor1} radius={[4, 4, 0, 0]} barSize={barSize} />
                    <Bar dataKey={chartData.barKey2} name={series.find(s => s.key === chartData.barKey2)?.label} fill={chartData.barColor2} radius={[4, 4, 0, 0]} barSize={barSize} />
                    <Bar dataKey={chartData.lineKey} name={series.find(s => s.key === chartData.lineKey)?.label} fill={chartData.lineColor} radius={[4, 4, 0, 0]} barSize={barSize} />
                  </BarChart>
                ) : chartData.chart === "bar" ? (
                  <BarChart data={chartData.chartData} margin={{ top: 4, right: 4, bottom: 0, left: isMobile ? -6 : -20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" tick={{ fontSize: tickFont }} interval={xInterval} axisLine={false} tickLine={false} />
                    <YAxis width={yAxisWidth} tick={{ fontSize: tickFont }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    {series.map((s) => (
                      <Bar key={s.key} dataKey={s.key} name={s.label} fill={s.color} radius={[4, 4, 0, 0]} />
                    ))}
                  </BarChart>
                ) : (
                  <AreaChart data={chartData.chartData} margin={{ top: 4, right: 4, bottom: 0, left: isMobile ? -6 : -20 }}>
                    <defs>
                      {series.map((s) => (
                        <linearGradient key={s.key} id={`grad-${s.key}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={s.color} stopOpacity={0.25} />
                          <stop offset="95%" stopColor={s.color} stopOpacity={0} />
                        </linearGradient>
                      ))}
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" tick={{ fontSize: tickFont }} interval={xInterval} axisLine={false} tickLine={false} />
                    <YAxis width={yAxisWidth} tick={{ fontSize: tickFont }} axisLine={false} tickLine={false} />
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