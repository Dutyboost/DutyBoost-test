import { useRef } from "react";
import { motion } from "framer-motion";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from "recharts";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

// ── Travel Partner data ────────────────────────────────────────────────────────
const agencyData = {
  color: "#1F6FFF",
  gradient: ["#1F6FFF", "#0891b2"],
  kpis: [
    { label: "DutyCredits Generated", value: "12,480", sub: "+18% vs last year", trend: "up" },
    { label: "DutyCredits Redeemed", value: "3,144", sub: "25.2% redemption rate", trend: "up" },
    { label: "Commission Earned", value: "€15,720", sub: "+22% vs last year", trend: "up" },
  ],
  chartTitle: "Monthly Performance 2025",
  chart: "area",
  chartData: [
    { month: "Jan", generated: 720, redeemed: 168, commission: 840 },
    { month: "Feb", generated: 810, redeemed: 198, commission: 990 },
    { month: "Mar", generated: 980, redeemed: 245, commission: 1225 },
    { month: "Apr", generated: 1050, redeemed: 270, commission: 1350 },
    { month: "May", generated: 1140, redeemed: 298, commission: 1490 },
    { month: "Jun", generated: 1300, redeemed: 344, commission: 1720 },
    { month: "Jul", generated: 1480, redeemed: 406, commission: 2030 },
    { month: "Aug", generated: 1390, redeemed: 380, commission: 1900 },
    { month: "Sep", generated: 1020, redeemed: 260, commission: 1300 },
    { month: "Oct", generated: 890, redeemed: 218, commission: 1090 },
    { month: "Nov", generated: 960, redeemed: 238, commission: 1190 },
    { month: "Dec", generated: 740, redeemed: 119, commission: 595 },
  ],
  series: [
    { key: "generated", label: "Generated", color: "#93c5fd" },
    { key: "redeemed", label: "Redeemed", color: "#1F6FFF" },
    { key: "commission", label: "Commission (€)", color: "#00C48C" },
  ],
};

// ── Airport Retailer data ──────────────────────────────────────────────────────
const retailerData = {
  color: "#f97316",
  gradient: ["#f97316", "#ea580c"],
  kpis: [
    { label: "Basket Spend (avg)", value: "€148", sub: "+12% vs last year", trend: "up" },
    { label: "Vouchers Redeemed", value: "2,860", sub: "This year", trend: "up" },
    { label: "Net Revenue", value: "€389,280", sub: "After DutyBoost fee", trend: "up" },
  ],
  chartTitle: "Monthly Basket & Revenue 2025",
  chart: "bar",
  chartData: [
    { month: "Jan", basket: 118, revenue: 22100, redemptions: 188 },
    { month: "Feb", basket: 122, revenue: 25400, redemptions: 208 },
    { month: "Mar", basket: 134, revenue: 30100, redemptions: 225 },
    { month: "Apr", basket: 140, revenue: 33600, redemptions: 240 },
    { month: "May", basket: 148, revenue: 36900, redemptions: 249 },
    { month: "Jun", basket: 162, revenue: 42800, redemptions: 264 },
    { month: "Jul", basket: 178, revenue: 50400, redemptions: 283 },
    { month: "Aug", basket: 171, revenue: 47200, redemptions: 276 },
    { month: "Sep", basket: 144, revenue: 33800, redemptions: 235 },
    { month: "Oct", basket: 136, revenue: 28900, redemptions: 212 },
    { month: "Nov", basket: 142, revenue: 31600, redemptions: 223 },
    { month: "Dec", basket: 130, revenue: 26480, redemptions: 257 },
  ],
  series: [
    { key: "redemptions", label: "Redemptions", color: "#fdba74" },
    { key: "basket", label: "Avg Basket (€)", color: "#f97316" },
  ],
};

// ── Hotel data ─────────────────────────────────────────────────────────────────
const hotelData = {
  color: "#3b82f6",
  gradient: ["#3b82f6", "#0891b2"],
  kpis: [
    { label: "DutyCredits Issued", value: "8,240", sub: "Booking + check-out", trend: "up" },
    { label: "Redeemed by Guests", value: "1,976", sub: "24% redemption rate", trend: "up" },
    { label: "Commission Earned", value: "€9,880", sub: "+16% vs last year", trend: "up" },
  ],
  chartTitle: "Monthly Guest Credits 2025",
  chart: "area",
  chartData: [
    { month: "Jan", issued: 480, redeemed: 106, commission: 530 },
    { month: "Feb", issued: 540, redeemed: 122, commission: 610 },
    { month: "Mar", issued: 680, redeemed: 156, commission: 780 },
    { month: "Apr", issued: 780, redeemed: 182, commission: 910 },
    { month: "May", issued: 870, redeemed: 210, commission: 1050 },
    { month: "Jun", issued: 960, redeemed: 234, commission: 1170 },
    { month: "Jul", issued: 1020, redeemed: 256, commission: 1280 },
    { month: "Aug", issued: 990, redeemed: 248, commission: 1240 },
    { month: "Sep", issued: 680, redeemed: 160, commission: 800 },
    { month: "Oct", issued: 580, redeemed: 134, commission: 670 },
    { month: "Nov", issued: 620, redeemed: 146, commission: 730 },
    { month: "Dec", issued: 540, redeemed: 122, commission: 610 },
  ],
  series: [
    { key: "issued", label: "Issued", color: "#93c5fd" },
    { key: "redeemed", label: "Redeemed", color: "#3b82f6" },
    { key: "commission", label: "Commission (€)", color: "#0891b2" },
  ],
};

// ── Car Rental data ────────────────────────────────────────────────────────────
const carData = {
  color: "#ef4444",
  gradient: ["#ef4444", "#be123c"],
  kpis: [
    { label: "DutyCredits Issued", value: "6,120", sub: "Booking + return", trend: "up" },
    { label: "Redeemed by Customers", value: "1,284", sub: "21% redemption rate", trend: "up" },
    { label: "Commission Earned", value: "€6,420", sub: "+14% vs last year", trend: "up" },
  ],
  chartTitle: "Monthly Credits & Earnings 2025",
  chart: "area",
  chartData: [
    { month: "Jan", issued: 360, redeemed: 70, commission: 350 },
    { month: "Feb", issued: 390, redeemed: 78, commission: 390 },
    { month: "Mar", issued: 480, redeemed: 98, commission: 490 },
    { month: "Apr", issued: 560, redeemed: 116, commission: 580 },
    { month: "May", issued: 640, redeemed: 136, commission: 680 },
    { month: "Jun", issued: 720, redeemed: 158, commission: 790 },
    { month: "Jul", issued: 780, redeemed: 172, commission: 860 },
    { month: "Aug", issued: 740, redeemed: 162, commission: 810 },
    { month: "Sep", issued: 520, redeemed: 106, commission: 530 },
    { month: "Oct", issued: 440, redeemed: 88, commission: 440 },
    { month: "Nov", issued: 460, redeemed: 92, commission: 460 },
    { month: "Dec", issued: 380, redeemed: 72, commission: 340 },
  ],
  series: [
    { key: "issued", label: "Issued", color: "#fca5a5" },
    { key: "redeemed", label: "Redeemed", color: "#ef4444" },
    { key: "commission", label: "Commission (€)", color: "#be123c" },
  ],
};

const DATA_MAP = { agency: agencyData, retailer: retailerData, hotel: hotelData, car: carData };

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
  const data = DATA_MAP[role] || agencyData;
  const containerRef = useRef(null);

  const handleMouse = () => {};
  const handleLeave = () => {};
  const rotateX = 0;
  const rotateY = 0;

  const TrendIcon = ({ trend }) => {
    if (trend === "up") return <TrendingUp className="w-3 h-3 text-emerald-400" />;
    if (trend === "down") return <TrendingDown className="w-3 h-3 text-red-400" />;
    return <Minus className="w-3 h-3 text-slate-400" />;
  };

  return (
    <section className="py-10 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <p className="text-center text-sm font-medium text-muted-foreground mb-2 uppercase tracking-wider">Live Dashboard Preview</p>
        <h2 className="text-center text-2xl font-heading font-bold mb-8 text-foreground">
          What your partner dashboard looks like
        </h2>

        {/* 3D tilt wrapper */}
        <div
          ref={containerRef}
          onMouseMove={handleMouse}
          onMouseLeave={handleLeave}
          className="perspective-[1200px] cursor-default"
          style={{ perspective: "1200px" }}
        >
          <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative rounded-2xl overflow-hidden shadow-lg border border-border bg-background p-4 space-y-4"
          >
            {/* KPI row */}
            <div className="grid grid-cols-3 gap-4">
              {data.kpis.map((kpi, i) => (
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
                <h3 className="text-sm font-semibold font-heading text-foreground">{data.chartTitle}</h3>
                <div className="flex gap-3">
                  {data.series.map((s) => (
                    <div key={s.key} className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
                      <span className="text-xs text-muted-foreground">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <ResponsiveContainer width="100%" height={200}>
                {data.chart === "bar" ? (
                  <BarChart data={data.chartData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    {data.series.map((s) => (
                      <Bar key={s.key} dataKey={s.key} name={s.label} fill={s.color} radius={[4, 4, 0, 0]} />
                    ))}
                  </BarChart>
                ) : (
                  <AreaChart data={data.chartData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                    <defs>
                      {data.series.map((s) => (
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
                    {data.series.map((s) => (
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
          Figures are illustrative yearly estimates
        </p>
      </div>
    </section>
  );
}