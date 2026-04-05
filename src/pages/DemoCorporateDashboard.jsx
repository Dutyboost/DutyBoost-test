import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { Users, Building2, DollarSign, TrendingUp, Utensils, ArrowLeft, Calendar } from "lucide-react";
import DutyBoostLogo from "../components/DutyBoostLogo";

const COLORS = ["#1F6FFF", "#FF7A00", "#00C48C", "#6366f1", "#f43f5e"];

const demoTravelers = [
  { full_name: "Emma Johnson", email: "e.johnson@acmecorp.com", department: "Sales", cost_center: "CC-100", status: "active", daily_fnb_budget: 60, per_transaction_limit: 30 },
  { full_name: "Luca Bianchi", email: "l.bianchi@acmecorp.com", department: "Finance", cost_center: "CC-200", status: "active", daily_fnb_budget: 45, per_transaction_limit: 25 },
  { full_name: "Sophie Müller", email: "s.muller@acmecorp.com", department: "Engineering", cost_center: "CC-300", status: "active", daily_fnb_budget: 50, per_transaction_limit: 25 },
  { full_name: "Ahmed Al-Farsi", email: "a.alfarsi@acmecorp.com", department: "Sales", cost_center: "CC-100", status: "active", daily_fnb_budget: 60, per_transaction_limit: 30 },
  { full_name: "Chloe Dupont", email: "c.dupont@acmecorp.com", department: "HR", cost_center: "CC-400", status: "suspended", daily_fnb_budget: 40, per_transaction_limit: 20 },
  { full_name: "Marcus Lee", email: "m.lee@acmecorp.com", department: "Engineering", cost_center: "CC-300", status: "active", daily_fnb_budget: 50, per_transaction_limit: 25 },
];

const deptData = [
  { department: "Sales", budget: 120, spend: 87 },
  { department: "Finance", budget: 45, spend: 38 },
  { department: "Engineering", budget: 100, spend: 62 },
  { department: "HR", budget: 40, spend: 12 },
];

const creditPie = [
  { name: "Active", value: 38 },
  { name: "Partially Used", value: 24 },
  { name: "Used", value: 61 },
  { name: "Expired", value: 9 },
];

const spendTrend = [
  { day: "Mon", spend: 142 }, { day: "Tue", spend: 198 }, { day: "Wed", spend: 175 },
  { day: "Thu", spend: 210 }, { day: "Fri", spend: 289 }, { day: "Sat", spend: 88 }, { day: "Sun", spend: 45 },
];

const ccData = [
  { cost_center: "CC-100", travelers: 2, budget: 120 },
  { cost_center: "CC-200", travelers: 1, budget: 45 },
  { cost_center: "CC-300", travelers: 2, budget: 100 },
  { cost_center: "CC-400", travelers: 1, budget: 40 },
];

const allTxns = [
  { traveler: "e.johnson@acmecorp.com", merchant: "The Kitchen Bar", airport: "AMS", amount: 28.50, status: "approved", date: "2026-04-05" },
  { traveler: "l.bianchi@acmecorp.com", merchant: "Sky Lounge Bistro", airport: "CDG", amount: 41.00, status: "approved", date: "2026-04-04" },
  { traveler: "s.muller@acmecorp.com", merchant: "Gate 7 Café", airport: "FRA", amount: 15.80, status: "approved", date: "2026-04-03" },
  { traveler: "a.alfarsi@acmecorp.com", merchant: "La Piazza AMS", airport: "AMS", amount: 56.20, status: "rejected", date: "2026-04-02" },
  { traveler: "m.lee@acmecorp.com", merchant: "Terminal Grill", airport: "LHR", amount: 22.40, status: "approved", date: "2026-04-01" },
  { traveler: "e.johnson@acmecorp.com", merchant: "Café Central", airport: "AMS", amount: 19.90, status: "approved", date: "2026-03-28" },
  { traveler: "l.bianchi@acmecorp.com", merchant: "Brasserie Gate 12", airport: "CDG", amount: 33.50, status: "approved", date: "2026-03-15" },
];

export default function DemoCorporateDashboard() {
  const [period, setPeriod] = useState("monthly");
  const [customStart, setCustomStart] = useState(() => { const d = new Date(); d.setDate(d.getDate() - 30); return d.toISOString().split("T")[0]; });
  const [customEnd, setCustomEnd] = useState(() => new Date().toISOString().split("T")[0]);

  const { startDate, endDate } = useMemo(() => {
    const now = new Date();
    if (period === "daily") { const s = new Date(now); s.setDate(s.getDate() - 7); return { startDate: s.toISOString().split("T")[0], endDate: now.toISOString().split("T")[0] }; }
    if (period === "monthly") { const s = new Date(now); s.setDate(s.getDate() - 30); return { startDate: s.toISOString().split("T")[0], endDate: now.toISOString().split("T")[0] }; }
    if (period === "yearly") { const s = new Date(now); s.setFullYear(s.getFullYear() - 1); return { startDate: s.toISOString().split("T")[0], endDate: now.toISOString().split("T")[0] }; }
    return { startDate: customStart, endDate: customEnd };
  }, [period, customStart, customEnd]);

  const filteredTxns = allTxns.filter(t => t.date >= startDate && t.date <= endDate);
  const totalSpend = filteredTxns.filter(t => t.status === "approved").reduce((s, t) => s + t.amount, 0);
  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 backdrop-blur border-b border-border bg-card/80">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <DutyBoostLogo height={100} />
            <span className="text-sm font-medium text-muted-foreground border-l border-border pl-3">Corporate Dashboard</span>
            <Badge className="bg-amber-100 text-amber-700 border-amber-200 text-xs">Demo Mode</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/demo"><Button variant="ghost" size="sm" className="gap-1.5"><ArrowLeft className="w-3.5 h-3.5" /> All Demos</Button></Link>
            <Link to="/business-travel/get-started"><Button size="sm">Get Started</Button></Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-heading font-bold">Corporate F&B Dashboard</h1>
            <p className="text-muted-foreground mt-1">Acme Corp — demonstrating real-time F&B spend control across all traveling employees.</p>
          </div>
          <Badge className="bg-amber-50 text-amber-700 border-amber-200 px-3 py-1.5 text-sm">Sample data only — not real transactions</Badge>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground font-medium">Period:</span>
          {[{id:"daily",label:"Last 7 days"},{id:"monthly",label:"Last 30 days"},{id:"yearly",label:"Last year"},{id:"custom",label:"Custom"}].map(p => (
            <button key={p.id} onClick={() => setPeriod(p.id)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                period === p.id ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:border-primary/50"
              }`}>{p.label}</button>
          ))}
          {period === "custom" && (
            <div className="flex items-center gap-2 ml-2">
              <input type="date" value={customStart} onChange={e => setCustomStart(e.target.value)} className="text-xs border border-input rounded-lg px-2 py-1.5 bg-background" />
              <span className="text-xs text-muted-foreground">to</span>
              <input type="date" value={customEnd} onChange={e => setCustomEnd(e.target.value)} className="text-xs border border-input rounded-lg px-2 py-1.5 bg-background" />
            </div>
          )}
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Active Travelers", value: "5", icon: Users, color: "text-primary", bg: "bg-primary/10" },
            { label: "Total F&B Spend", value: `€${totalSpend.toFixed(2)}`, icon: Utensils, color: "text-orange-600", bg: "bg-orange-50" },
            { label: "Total Discounts Given (15%)", value: `€${(totalSpend * 0.15).toFixed(2)}`, icon: DollarSign, color: "text-green-600", bg: "bg-green-50" },
            { label: "Est. Annual Fee (10% of discounts)", value: `€${(totalSpend * 0.15 * 0.10).toFixed(2)}`, icon: TrendingUp, color: "text-purple-600", bg: "bg-purple-50" },
          ].map(({ label, value, icon: Icon, color, bg }) => (
            <div key={label} className="bg-card border border-border rounded-xl p-5">
              <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center mb-3`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <p className={`text-3xl font-heading font-bold ${color}`}>{value}</p>
              <p className="text-sm text-muted-foreground mt-1">{label}</p>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="font-heading font-semibold mb-4">Budget vs Spend by Department</h2>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={deptData} margin={{ top: 4, right: 8, bottom: 4, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="department" tick={{ fontSize: 11 }} tickLine={false} />
                <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} unit="€" />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} formatter={v => [`€${v}`, ""]} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="budget" fill="#1F6FFF" name="Daily Budget (€)" radius={[4,4,0,0]} />
                <Bar dataKey="spend" fill="#00C48C" name="Actual Spend (€)" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="font-heading font-semibold mb-4">F&B Credit Status</h2>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={creditPie} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={3} dataKey="value">
                  {creditPie.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Spend trend */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="font-heading font-semibold mb-4">Weekly F&B Spend Trend</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={spendTrend} margin={{ top: 4, right: 16, bottom: 4, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} unit="€" />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} formatter={v => [`€${v}`, "Spend"]} />
              <Line type="monotone" dataKey="spend" stroke="#FF7A00" strokeWidth={2.5} dot={false} name="Spend (€)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Cost center + travelers side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Cost centers */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-border"><h2 className="font-heading font-semibold flex items-center gap-2"><Building2 className="w-4 h-4 text-primary" /> Cost Centers</h2></div>
            <table className="w-full text-sm">
              <thead className="bg-muted/40"><tr>
                {["Cost Center", "Travelers", "Daily Budget"].map(h => <th key={h} className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">{h}</th>)}
              </tr></thead>
              <tbody className="divide-y divide-border">
                {ccData.map(cc => (
                  <tr key={cc.cost_center} className="hover:bg-muted/20">
                    <td className="px-4 py-2.5 font-mono font-medium">{cc.cost_center}</td>
                    <td className="px-4 py-2.5">{cc.travelers}</td>
                    <td className="px-4 py-2.5 font-semibold text-green-700">€{cc.budget}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Traveler list */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-border"><h2 className="font-heading font-semibold flex items-center gap-2"><Users className="w-4 h-4 text-primary" /> Travelers</h2></div>
            <div className="divide-y divide-border">
              {demoTravelers.map(t => (
                <div key={t.email} className="px-5 py-3 flex items-center justify-between hover:bg-muted/20">
                  <div>
                    <p className="font-medium text-sm">{t.full_name}</p>
                    <p className="text-xs text-muted-foreground">{t.department} · {t.cost_center}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-green-700">€{t.daily_fnb_budget}/day</p>
                    <Badge className={t.status === "active" ? "bg-green-100 text-green-700 border-green-200 text-xs" : "bg-red-100 text-red-700 border-red-200 text-xs"}>{t.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent transactions */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-border"><h2 className="font-heading font-semibold">Recent F&B Transactions</h2></div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/40"><tr>
                {["Traveler", "Merchant", "Airport", "Amount", "Status"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">{h}</th>
                ))}
              </tr></thead>
              <tbody className="divide-y divide-border">
                {filteredTxns.length === 0 ? (
                  <tr><td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">No transactions in this period.</td></tr>
                ) : filteredTxns.map((tx, i) => (
                  <tr key={i} className="hover:bg-muted/20">
                    <td className="px-4 py-3 text-xs text-muted-foreground">{tx.traveler}</td>
                    <td className="px-4 py-3">{tx.merchant}</td>
                    <td className="px-4 py-3">{tx.airport}</td>
                    <td className="px-4 py-3 font-semibold">€{tx.amount.toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <Badge className={tx.status === "approved" ? "bg-green-100 text-green-700 border-green-200" : "bg-red-100 text-red-700 border-red-200"}>{tx.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-primary via-primary/90 to-primary/70 rounded-2xl p-8 text-center text-primary-foreground">
          <h3 className="text-2xl font-heading font-bold mb-2">Ready to manage your corporate travelers?</h3>
          <p className="text-primary-foreground/80 mb-4">Set up individual F&B budgets, enforce cost center policies, and track airport spending in real time.</p>
          <Link to="/business-travel/get-started">
            <Button className="bg-white text-primary hover:bg-white/90 gap-2">Get Started for Business</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}