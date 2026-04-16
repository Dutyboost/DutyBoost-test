import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { TrendingUp, Store, ArrowLeft, Receipt, Wallet, DollarSign, ChevronDown, ChevronUp, Calendar } from "lucide-react";
import DutyBoostLogo from "../components/DutyBoostLogo";
import { RETAILERS, TRAVEL_AGENCIES, MONTHLY_DATA, YEARLY_DATA, AIRPORTS } from "../data/demoData";

// Base 6-month totals from demo data
const BASE_RETAILER_REVENUE = RETAILERS.reduce((s, r) => s + r.revenue, 0);
const BASE_AGENCY_PAYOUT = TRAVEL_AGENCIES.reduce((s, a) => s + a.commission, 0);
const PERIOD_MULTIPLIERS = { daily: 7 / 180, monthly: 1, yearly: 2 };

const byAirport = AIRPORTS.map(ap => {
  const apRetailers = RETAILERS.filter(r => r.airport === ap.code);
  const rev = apRetailers.reduce((s, r) => s + r.revenue, 0);
  const fee = rev * 0.025;
  const payout = fee * 0.20;
  return { airport: ap.name, code: ap.code, revenue: rev, fee, payout, profit: fee * 0.80 };
});

const byCategory = ["Retail", "Food & Beverage"].map(cat => {
  const catRetailers = RETAILERS.filter(r => r.category === cat);
  const rev = catRetailers.reduce((s, r) => s + r.revenue, 0);
  return { name: cat, revenue: rev, fee: rev * 0.025 };
});

const topRetailers = [...RETAILERS].sort((a, b) => b.revenue - a.revenue);
const topAgencies = [...TRAVEL_AGENCIES].sort((a, b) => b.commission - a.commission).slice(0, 8);

const PIE_COLORS = ["#1f6fff", "#ff7a00", "#00c48c", "#9b5de5", "#f15bb5"];

function StatCard({ label, value, sub, icon: Icon, color = "text-primary", bg = "bg-primary/10" }) {
  return (
    <div className="bg-card border border-border rounded-xl p-5 flex items-start gap-4">
      <div className={`w-11 h-11 rounded-lg ${bg} flex items-center justify-center shrink-0`}>
        <Icon className={`w-5 h-5 ${color}`} />
      </div>
      <div>
        <p className="text-xs text-muted-foreground font-medium">{label}</p>
        <p className={`text-2xl font-heading font-bold ${color}`}>{value}</p>
        {sub && <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

function Section({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-center justify-between px-6 py-4 hover:bg-muted/30 transition-colors">
        <h2 className="font-heading font-semibold text-base">{title}</h2>
        {open ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
      </button>
      {open && <div className="px-6 pb-6">{children}</div>}
    </div>
  );
}

const fmt = (n) => `€ ${n.toLocaleString("nl-NL", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export default function DemoAdminDashboard() {
  const [period, setPeriod] = useState("monthly");
  const [customStart, setCustomStart] = useState("2025-10-01");
  const [customEnd, setCustomEnd] = useState("2026-03-31");

  const periodMultiplier = useMemo(() => {
    if (period === "custom") {
      const days = Math.max(1, (new Date(customEnd) - new Date(customStart)) / 86400000);
      return days / 180;
    }
    return PERIOD_MULTIPLIERS[period];
  }, [period, customStart, customEnd]);

  const periodRevenue = BASE_RETAILER_REVENUE * periodMultiplier;
  const periodFee = periodRevenue * 0.025;
  const periodAgencyPayout = BASE_AGENCY_PAYOUT * periodMultiplier;
  const periodNetProfit = periodFee - periodAgencyPayout;

  const chartData = (period === "yearly" ? YEARLY_DATA : MONTHLY_DATA).map(m => ({
    month: m.month,
    fee: m.revenue * 0.025,
    payout: m.revenue * 0.025 * 0.20,
    profit: m.revenue * 0.025 * 0.80,
  }));

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <nav className="border-b border-border px-6 h-16 flex items-center justify-between sticky top-0 bg-background/95 backdrop-blur z-10">
        <Link to="/"><DutyBoostLogo height={130} /></Link>
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground bg-muted px-3 py-1 rounded-full">Admin · Demo Mode</span>
          <Link to="/demo" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto w-full px-4 py-8 space-y-8">
        <div>
          <h1 className="text-2xl font-heading font-bold">Platform Finance Overview</h1>
          <p className="text-muted-foreground text-sm mt-1">All figures are based on demo data. Revenue = retailer transaction value. DutyBoost earns 2.5% fee; 20% of that is paid out to travel agencies.</p>
        </div>

        {/* Period selector */}
        <div className="flex items-center gap-2 flex-wrap">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground font-medium">Period:</span>
          {[{v:"daily",l:"Daily"},{v:"monthly",l:"Monthly"},{v:"yearly",l:"Yearly"},{v:"custom",l:"Custom"}].map(({v,l}) => (
            <button key={v} onClick={() => setPeriod(v)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                period === v ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:border-primary/50"
              }`}>{l}
            </button>
          ))}
          {period === "custom" && (
            <div className="flex items-center gap-2 ml-2">
              <input type="date" value={customStart} onChange={e => setCustomStart(e.target.value)}
                className="text-xs border border-input rounded-lg px-2 py-1.5 bg-background" />
              <span className="text-xs text-muted-foreground">to</span>
              <input type="date" value={customEnd} onChange={e => setCustomEnd(e.target.value)}
                className="text-xs border border-input rounded-lg px-2 py-1.5 bg-background" />
            </div>
          )}
        </div>

        {/* KPI row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Retailer Revenue" value={fmt(periodRevenue)} sub={`2.5% fee basis`} icon={Store} color="text-primary" bg="bg-primary/10" />
          <StatCard label="Platform Fees Invoiced" value={fmt(periodFee)} sub="2.5% of retailer revenue" icon={Receipt} color="text-amber-600" bg="bg-amber-50" />
          <StatCard label="Agency Payouts" value={fmt(periodAgencyPayout)} sub="20% of platform fee" icon={Wallet} color="text-indigo-600" bg="bg-indigo-50" />
          <StatCard label="Net Platform Profit" value={fmt(periodNetProfit)} sub="Fees minus payouts" icon={DollarSign} color="text-emerald-600" bg="bg-emerald-50" />
        </div>


        {/* Trend chart */}
        <Section title={`${period === "yearly" ? "12-Month" : period === "daily" ? "Recent" : "Monthly"} Platform Financials`}>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={chartData} barCategoryGap="30%">
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `€${(v/1000).toFixed(1)}k`} />
              <Tooltip formatter={(v, n) => [fmt(v), n]} />
              <Legend />
              <Bar dataKey="fee" name="Platform Fee" fill="#1f6fff" radius={[3,3,0,0]} />
              <Bar dataKey="payout" name="Agency Payout" fill="#9b5de5" radius={[3,3,0,0]} />
              <Bar dataKey="profit" name="Net Profit" fill="#00c48c" radius={[3,3,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </Section>

        {/* By airport */}
        <Section title="Invoices & Payouts by Airport">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs text-muted-foreground">
                  <th className="pb-2 font-medium">Airport</th>
                  <th className="pb-2 font-medium text-right">Retailer Revenue</th>
                  <th className="pb-2 font-medium text-right">Platform Fee (2.5%)</th>
                  <th className="pb-2 font-medium text-right">Agency Payout (20%)</th>
                  <th className="pb-2 font-medium text-right">Net Profit (80%)</th>
                </tr>
              </thead>
              <tbody>
                {byAirport.map((row, i) => (
                  <tr key={row.code} className={`border-b border-border/50 ${i % 2 === 0 ? "bg-muted/20" : ""}`}>
                    <td className="py-2.5 font-medium">{row.airport} <span className="text-xs text-muted-foreground">({row.code})</span></td>
                    <td className="py-2.5 text-right">{fmt(row.revenue)}</td>
                    <td className="py-2.5 text-right text-amber-700 font-semibold">{fmt(row.fee)}</td>
                    <td className="py-2.5 text-right text-indigo-600">{fmt(row.payout)}</td>
                    <td className="py-2.5 text-right text-emerald-600 font-semibold">{fmt(row.profit)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-muted/40 font-bold text-sm">
                  <td className="py-2.5">Total</td>
                  <td className="py-2.5 text-right">{fmt(BASE_RETAILER_REVENUE)}</td>
                  <td className="py-2.5 text-right text-amber-700">{fmt(BASE_RETAILER_REVENUE * 0.025)}</td>
                  <td className="py-2.5 text-right text-indigo-600">{fmt(BASE_AGENCY_PAYOUT)}</td>
                  <td className="py-2.5 text-right text-emerald-600">{fmt(BASE_RETAILER_REVENUE * 0.025 - BASE_AGENCY_PAYOUT)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </Section>

        {/* Category breakdown + pie */}
        <Section title="Revenue by Retailer Category">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={byCategory} dataKey="fee" nameKey="name" cx="50%" cy="50%" outerRadius={90}
                  label={({ percent }) => `${(percent*100).toFixed(0)}%`}
                  labelLine={false}>
                  {byCategory.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                </Pie>
                <Tooltip formatter={(v) => fmt(v)} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-3 self-center">
              {byCategory.map((c, i) => (
                <div key={c.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ background: PIE_COLORS[i] }} />
                    <span>{c.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{fmt(c.fee)} <span className="text-xs font-normal text-muted-foreground">fee</span></p>
                    <p className="text-xs text-muted-foreground">{fmt(c.revenue)} revenue</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Top retailers */}
        <Section title="All Retailers — Invoice Overview">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs text-muted-foreground">
                  <th className="pb-2 font-medium">Store</th>
                  <th className="pb-2 font-medium">Airport</th>
                  <th className="pb-2 font-medium">Category</th>
                  <th className="pb-2 font-medium text-right">Revenue</th>
                  <th className="pb-2 font-medium text-right">Invoice (2.5%)</th>
                  <th className="pb-2 font-medium text-right">+VAT 21%</th>
                </tr>
              </thead>
              <tbody>
                {topRetailers.map((r, i) => {
                  const fee = r.revenue * 0.025;
                  return (
                    <tr key={r.id} className={`border-b border-border/50 ${i % 2 === 0 ? "bg-muted/20" : ""}`}>
                      <td className="py-2.5 font-medium">{r.name}</td>
                      <td className="py-2.5 text-muted-foreground">{r.airport}</td>
                      <td className="py-2.5"><span className="text-xs px-2 py-0.5 rounded-full bg-muted">{r.category}</span></td>
                      <td className="py-2.5 text-right">{fmt(r.revenue)}</td>
                      <td className="py-2.5 text-right text-amber-700 font-semibold">{fmt(fee)}</td>
                      <td className="py-2.5 text-right text-muted-foreground">{fmt(fee * 1.21)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Section>

        {/* Top agencies */}
        <Section title="Top Travel Agencies — Payout Overview">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs text-muted-foreground">
                  <th className="pb-2 font-medium">Agency</th>
                  <th className="pb-2 font-medium">City</th>
                  <th className="pb-2 font-medium text-right">Redemptions</th>
                  <th className="pb-2 font-medium text-right">Commission Payout</th>
                  <th className="pb-2 font-medium text-right">% of Total Payout</th>
                </tr>
              </thead>
              <tbody>
                {topAgencies.map((ag, i) => (
                  <tr key={ag.id} className={`border-b border-border/50 ${i % 2 === 0 ? "bg-muted/20" : ""}`}>
                    <td className="py-2.5 font-medium">{ag.name}</td>
                    <td className="py-2.5 text-muted-foreground">{ag.city}</td>
                    <td className="py-2.5 text-right">{ag.redeemed.toLocaleString()}</td>
                    <td className="py-2.5 text-right text-indigo-600 font-semibold">{fmt(ag.commission)}</td>
                    <td className="py-2.5 text-right text-muted-foreground">{((ag.commission / BASE_AGENCY_PAYOUT) * 100).toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <p className="text-center text-xs text-muted-foreground pb-4">Demo data only. No real transactions are represented.</p>
      </div>
    </div>
  );
}