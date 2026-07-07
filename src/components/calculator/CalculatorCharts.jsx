import { useTranslation } from "react-i18next";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, Cell } from "recharts";
import { ChartBar, TrendingUp, MapPin } from "lucide-react";
import { fmtCompact, fmtEurCompact } from "@/data/enterpriseCalculator";
import { translateRegion, translateMonth } from "./i18nHelpers";

const CHART_COLORS = ["#1A6BFF", "#FF8000", "#10b981", "#8b5cf6", "#ef4444", "#06b6d4", "#eab308"];

function ChartCard({ icon: Icon, title, children, confidence }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <Icon className="w-4 h-4 text-primary" />
        <h3 className="font-semibold text-slate-900 text-sm">{title}</h3>
      </div>
      {children}
    </div>
  );
}

export default function CalculatorCharts({ regionBreakdown, monthlyData, topAirports }) {
  const { t } = useTranslation();
  const hasData = regionBreakdown.length > 0;

  if (!hasData) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center">
        <ChartBar className="w-8 h-8 text-slate-300 mx-auto mb-2" />
        <p className="text-sm text-slate-400">{t("entCalc.select_for_charts")}</p>
      </div>
    );
  }

  const localizedRegionData = regionBreakdown.map((d) => ({ ...d, regionLabel: translateRegion(t, d.region) }));
  const localizedMonthlyData = monthlyData.map((d) => ({ ...d, monthLabel: translateMonth(t, d.month) }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <ChartCard icon={MapPin} title={t("entCalc.chart_revenue_region")}>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={localizedRegionData} layout="vertical" margin={{ left: 10, right: 20, top: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
            <XAxis type="number" tickFormatter={fmtEurCompact} tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <YAxis type="category" dataKey="regionLabel" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} width={120} />
            <Tooltip formatter={(v) => fmtEurCompact(v)} contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 12 }} />
            <Bar dataKey="netRevenue" radius={[0, 4, 4, 0]}>
              {localizedRegionData.map((_, i) => (
                <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard icon={TrendingUp} title={t("entCalc.chart_monthly")}>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={localizedMonthlyData} margin={{ left: 0, right: 10, top: 5, bottom: 0 }}>
            <defs>
              <linearGradient id="colorNet" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="monthLabel" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <YAxis tickFormatter={fmtEurCompact} tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <Tooltip formatter={(v) => fmtEurCompact(v)} contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 12 }} />
            <Area type="monotone" dataKey="netRevenue" stroke="#10b981" strokeWidth={2} fill="url(#colorNet)" />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard icon={ChartBar} title={t("entCalc.chart_top_airports")}>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={topAirports} layout="vertical" margin={{ left: 10, right: 20, top: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
            <XAxis type="number" tickFormatter={fmtCompact} tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} width={80} />
            <Tooltip formatter={(v) => fmtCompact(v) + " " + t("entCalc.pax")} contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 12 }} />
            <Bar dataKey="annualPax" radius={[0, 4, 4, 0]} fill="#1A6BFF" />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard icon={MapPin} title={t("entCalc.chart_pax_distribution")}>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={localizedRegionData} margin={{ left: 0, right: 10, top: 5, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="regionLabel" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} interval={0} angle={-15} textAnchor="end" height={50} />
            <YAxis tickFormatter={fmtCompact} tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <Tooltip formatter={(v) => fmtCompact(v) + " " + t("entCalc.pax")} contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 12 }} />
            <Bar dataKey="annualPax" radius={[4, 4, 0, 0]}>
              {localizedRegionData.map((_, i) => (
                <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}