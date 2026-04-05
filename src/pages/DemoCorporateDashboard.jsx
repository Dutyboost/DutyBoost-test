import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import {
  Users, Building2, DollarSign, TrendingUp, Utensils, ArrowLeft, Calendar,
  ShieldCheck, BarChart3, CheckCircle, XCircle, CreditCard, Clock, Layers
} from "lucide-react";
import DutyBoostLogo from "../components/DutyBoostLogo";

const COLORS = ["#1F6FFF", "#FF7A00", "#00C48C", "#6366f1", "#f43f5e"];

const demoTravelers = [
  { full_name: "Emma Johnson", email: "e.johnson@acmecorp.com", department: "Sales", cost_center: "CC-100", status: "active", daily_fnb_budget: 60, per_transaction_limit: 30, trips_ytd: 18 },
  { full_name: "Luca Bianchi", email: "l.bianchi@acmecorp.com", department: "Finance", cost_center: "CC-200", status: "active", daily_fnb_budget: 45, per_transaction_limit: 25, trips_ytd: 11 },
  { full_name: "Sophie Müller", email: "s.muller@acmecorp.com", department: "Engineering", cost_center: "CC-300", status: "active", daily_fnb_budget: 50, per_transaction_limit: 25, trips_ytd: 9 },
  { full_name: "Ahmed Al-Farsi", email: "a.alfarsi@acmecorp.com", department: "Sales", cost_center: "CC-100", status: "active", daily_fnb_budget: 60, per_transaction_limit: 30, trips_ytd: 22 },
  { full_name: "Chloe Dupont", email: "c.dupont@acmecorp.com", department: "HR", cost_center: "CC-400", status: "suspended", daily_fnb_budget: 40, per_transaction_limit: 20, trips_ytd: 4 },
  { full_name: "Marcus Lee", email: "m.lee@acmecorp.com", department: "Engineering", cost_center: "CC-300", status: "active", daily_fnb_budget: 50, per_transaction_limit: 25, trips_ytd: 14 },
];

const deptData = [
  { department: "Sales", budget: 120, spend: 87, travelers: 2 },
  { department: "Finance", budget: 45, spend: 38, travelers: 1 },
  { department: "Engineering", budget: 100, spend: 62, travelers: 2 },
  { department: "HR", budget: 40, spend: 12, travelers: 1 },
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
  { cost_center: "CC-100", department: "Sales", travelers: 2, annual_budget: 43800, spent_ytd: 9124, remaining: 34676 },
  { cost_center: "CC-200", department: "Finance", travelers: 1, annual_budget: 16425, spent_ytd: 3840, remaining: 12585 },
  { cost_center: "CC-300", department: "Engineering", travelers: 2, annual_budget: 36500, spent_ytd: 6720, remaining: 29780 },
  { cost_center: "CC-400", department: "HR", travelers: 1, annual_budget: 14600, spent_ytd: 980, remaining: 13620 },
];

const allTxns = [
  { traveler: "Emma Johnson", email: "e.johnson@acmecorp.com", dept: "Sales", merchant: "The Kitchen Bar", airport: "AMS", amount: 28.50, status: "approved", date: "2026-04-05", limit_check: "pass" },
  { traveler: "Luca Bianchi", email: "l.bianchi@acmecorp.com", dept: "Finance", merchant: "Sky Lounge Bistro", airport: "CDG", amount: 41.00, status: "approved", date: "2026-04-04", limit_check: "pass" },
  { traveler: "Sophie Müller", email: "s.muller@acmecorp.com", dept: "Engineering", merchant: "Gate 7 Café", airport: "FRA", amount: 15.80, status: "approved", date: "2026-04-03", limit_check: "pass" },
  { traveler: "Ahmed Al-Farsi", email: "a.alfarsi@acmecorp.com", dept: "Sales", merchant: "La Piazza AMS", airport: "AMS", amount: 56.20, status: "rejected", date: "2026-04-02", limit_check: "fail" },
  { traveler: "Marcus Lee", email: "m.lee@acmecorp.com", dept: "Engineering", merchant: "Terminal Grill", airport: "LHR", amount: 22.40, status: "approved", date: "2026-04-01", limit_check: "pass" },
  { traveler: "Emma Johnson", email: "e.johnson@acmecorp.com", dept: "Sales", merchant: "Café Central", airport: "AMS", amount: 19.90, status: "approved", date: "2026-03-28", limit_check: "pass" },
  { traveler: "Luca Bianchi", email: "l.bianchi@acmecorp.com", dept: "Finance", merchant: "Brasserie Gate 12", airport: "CDG", amount: 33.50, status: "approved", date: "2026-03-15", limit_check: "pass" },
];

const policyRules = [
  { rule: "Daily F&B limit per traveler", value: "€40–60 (by department)", status: "active" },
  { rule: "Per-transaction cap", value: "€20–30 (by department)", status: "active" },
  { rule: "Allowed merchant category", value: "F&B only", status: "active" },
  { rule: "Breakfast window", value: "06:00–10:00", status: "active" },
  { rule: "Lunch window", value: "11:00–14:00", status: "active" },
  { rule: "Dinner window", value: "17:00–21:00", status: "active" },
  { rule: "Airport scope", value: "All participating airports", status: "active" },
  { rule: "Non-F&B blocked", value: "Retail, Duty-free, etc.", status: "enforced" },
];

const TABS = [
  { id: "overview", label: "Overview", icon: BarChart3 },
  { id: "budget", label: "Budget & Cost Centers", icon: DollarSign },
  { id: "travelers", label: "Travelers & Policy", icon: Users },
  { id: "transactions", label: "Transactions", icon: CreditCard },
];

export default function DemoCorporateDashboard() {
  const [period, setPeriod] = useState("monthly");
  const [customStart, setCustomStart] = useState(() => { const d = new Date(); d.setDate(d.getDate() - 30); return d.toISOString().split("T")[0]; });
  const [customEnd, setCustomEnd] = useState(() => new Date().toISOString().split("T")[0]);
  const [activeTab, setActiveTab] = useState("overview");

  const { startDate, endDate } = useMemo(() => {
    const now = new Date();
    if (period === "daily") { const s = new Date(now); s.setDate(s.getDate() - 7); return { startDate: s.toISOString().split("T")[0], endDate: now.toISOString().split("T")[0] }; }
    if (period === "monthly") { const s = new Date(now); s.setDate(s.getDate() - 30); return { startDate: s.toISOString().split("T")[0], endDate: now.toISOString().split("T")[0] }; }
    if (period === "yearly") { const s = new Date(now); s.setFullYear(s.getFullYear() - 1); return { startDate: s.toISOString().split("T")[0], endDate: now.toISOString().split("T")[0] }; }
    return { startDate: customStart, endDate: customEnd };
  }, [period, customStart, customEnd]);

  const filteredTxns = allTxns.filter(t => t.date >= startDate && t.date <= endDate);
  const totalSpend = filteredTxns.filter(t => t.status === "approved").reduce((s, t) => s + t.amount, 0);
  const totalBudgetAllocated = ccData.reduce((s, c) => s + c.annual_budget, 0);
  const totalSpentYTD = ccData.reduce((s, c) => s + c.spent_ytd, 0);

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
        {/* Header */}
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-heading font-bold">Corporate F&B Dashboard</h1>
            <p className="text-muted-foreground mt-1">Acme Corp — real-time F&B budget management, cost center tracking, and policy-compliant airport spending.</p>
          </div>
          <Badge className="bg-amber-50 text-amber-700 border-amber-200 px-3 py-1.5 text-sm">Sample data only</Badge>
        </div>

        {/* Period selector */}
        <div className="flex items-center gap-2 flex-wrap">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground font-medium">Period:</span>
          {[{id:"daily",label:"Last 7 days"},{id:"monthly",label:"Last 30 days"},{id:"yearly",label:"Last year"},{id:"custom",label:"Custom"}].map(p => (
            <button key={p.id} onClick={() => setPeriod(p.id)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-all ${period === p.id ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:border-primary/50"}`}>{p.label}</button>
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
            { label: "Annual Budget Allocated", value: `€${(totalBudgetAllocated/1000).toFixed(0)}K`, icon: DollarSign, color: "text-primary", bg: "bg-primary/10" },
            { label: "Spent This Period", value: `€${totalSpend.toFixed(2)}`, icon: Utensils, color: "text-orange-600", bg: "bg-orange-50" },
            { label: "Active Travelers", value: `${demoTravelers.filter(t => t.status === "active").length}`, icon: Users, color: "text-green-600", bg: "bg-green-50" },
            { label: "Policy Compliance Rate", value: `${Math.round((filteredTxns.filter(t=>t.status==="approved").length / Math.max(filteredTxns.length,1)) * 100)}%`, icon: ShieldCheck, color: "text-purple-600", bg: "bg-purple-50" },
          ].map(({ label, value, icon: Icon, color, bg }) => (
            <div key={label} className="bg-card border border-border rounded-xl p-5">
              <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center mb-3`}><Icon className={`w-5 h-5 ${color}`} /></div>
              <p className={`text-3xl font-heading font-bold ${color}`}>{value}</p>
              <p className="text-sm text-muted-foreground mt-1">{label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-border">
          {TABS.map(tab => {
            const Icon = tab.icon;
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 transition-all -mb-px ${activeTab === tab.id ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
                <Icon className="w-3.5 h-3.5" /> {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab: Overview */}
        {activeTab === "overview" && (
          <div className="space-y-6">
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
                <h2 className="font-heading font-semibold mb-4">DutyCredit Status Breakdown</h2>
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
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="font-heading font-semibold mb-4">Weekly F&B Spend Trend</h2>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={spendTrend} margin={{ top: 4, right: 16, bottom: 4, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" tick={{ fontSize: 11 }} tickLine={false} />
                  <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} unit="€" />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} formatter={v => [`€${v}`, "Spend"]} />
                  <Line type="monotone" dataKey="spend" stroke="#FF7A00" strokeWidth={2.5} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Tab: Budget & Cost Centers */}
        {activeTab === "budget" && (
          <div className="space-y-6">
            {/* Budget summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: "Total Annual Budget", value: `€${(totalBudgetAllocated/1000).toFixed(1)}K`, color: "text-primary" },
                { label: "Spent YTD", value: `€${(totalSpentYTD/1000).toFixed(1)}K`, color: "text-orange-600" },
                { label: "Remaining Budget", value: `€${((totalBudgetAllocated-totalSpentYTD)/1000).toFixed(1)}K`, color: "text-green-700" },
              ].map(({ label, value, color }) => (
                <div key={label} className="bg-card border border-border rounded-xl p-5 text-center">
                  <p className={`text-3xl font-heading font-bold ${color}`}>{value}</p>
                  <p className="text-sm text-muted-foreground mt-1">{label}</p>
                </div>
              ))}
            </div>

            {/* Cost center table */}
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="px-5 py-4 border-b border-border flex items-center gap-2">
                <Building2 className="w-4 h-4 text-primary" />
                <h2 className="font-heading font-semibold">Cost Centers</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted/40">
                    <tr>{["Cost Center", "Department", "Travelers", "Annual Budget", "Spent YTD", "Remaining", "Utilisation"].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">{h}</th>
                    ))}</tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {ccData.map(cc => {
                      const pct = Math.round((cc.spent_ytd / cc.annual_budget) * 100);
                      return (
                        <tr key={cc.cost_center} className="hover:bg-muted/20">
                          <td className="px-4 py-3 font-mono font-semibold">{cc.cost_center}</td>
                          <td className="px-4 py-3">{cc.department}</td>
                          <td className="px-4 py-3">{cc.travelers}</td>
                          <td className="px-4 py-3 font-semibold">€{cc.annual_budget.toLocaleString()}</td>
                          <td className="px-4 py-3 text-orange-700 font-semibold">€{cc.spent_ytd.toLocaleString()}</td>
                          <td className="px-4 py-3 text-green-700 font-semibold">€{cc.remaining.toLocaleString()}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                                <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
                              </div>
                              <span className="text-xs font-medium w-9 text-right">{pct}%</span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Budget vs spend chart */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="font-heading font-semibold mb-4">Annual Budget vs Spend YTD by Cost Center</h2>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={ccData.map(c => ({ name: c.cost_center, budget: c.annual_budget, spent: c.spent_ytd }))} margin={{ top: 4, right: 8, bottom: 4, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} tickLine={false} />
                  <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} unit="€" tickFormatter={v => `${(v/1000).toFixed(0)}K`} />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} formatter={v => [`€${v.toLocaleString()}`, ""]} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Bar dataKey="budget" fill="#1F6FFF" name="Annual Budget" radius={[4,4,0,0]} />
                  <Bar dataKey="spent" fill="#FF7A00" name="Spent YTD" radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Tab: Travelers & Policy */}
        {activeTab === "travelers" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Traveler list */}
              <div className="bg-card border border-border rounded-xl overflow-hidden">
                <div className="px-5 py-4 border-b border-border flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" />
                  <h2 className="font-heading font-semibold">Enrolled Travelers</h2>
                  <Badge className="ml-auto text-xs bg-primary/10 text-primary border-primary/20">{demoTravelers.filter(t=>t.status==="active").length} active</Badge>
                </div>
                <div className="divide-y divide-border">
                  {demoTravelers.map(t => (
                    <div key={t.email} className="px-5 py-3.5 flex items-center justify-between hover:bg-muted/20">
                      <div>
                        <p className="font-medium text-sm">{t.full_name}</p>
                        <p className="text-xs text-muted-foreground">{t.department} · {t.cost_center}</p>
                        <p className="text-xs text-muted-foreground">{t.trips_ytd} trips YTD</p>
                      </div>
                      <div className="text-right space-y-1">
                        <p className="text-sm font-semibold text-green-700">€{t.daily_fnb_budget}/day</p>
                        <p className="text-xs text-muted-foreground">max €{t.per_transaction_limit}/txn</p>
                        <Badge className={t.status === "active" ? "bg-green-100 text-green-700 border-green-200 text-xs" : "bg-red-100 text-red-700 border-red-200 text-xs"}>{t.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Policy rules */}
              <div className="bg-card border border-border rounded-xl overflow-hidden">
                <div className="px-5 py-4 border-b border-border flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  <h2 className="font-heading font-semibold">Active Policy Rules</h2>
                </div>
                <div className="divide-y divide-border">
                  {policyRules.map(r => (
                    <div key={r.rule} className="px-5 py-3 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-green-500 shrink-0" />
                        <span className="text-sm font-medium">{r.rule}</span>
                      </div>
                      <span className="text-xs text-muted-foreground text-right shrink-0">{r.value}</span>
                    </div>
                  ))}
                </div>
                <div className="px-5 py-4 bg-red-50 border-t border-border space-y-2">
                  <p className="text-xs font-semibold text-red-700 flex items-center gap-1"><XCircle className="w-3.5 h-3.5" /> Auto-blocked categories</p>
                  <div className="flex flex-wrap gap-1.5">
                    {["Retail", "Duty-Free", "Pharmacy", "Electronics", "Fashion", "Non-F&B"].map(cat => (
                      <span key={cat} className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-700 border border-red-200">{cat}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab: Transactions */}
        {activeTab === "transactions" && (
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="px-6 py-4 border-b border-border flex items-center justify-between">
                <h2 className="font-heading font-semibold">F&B Transactions</h2>
                <Badge variant="outline" className="text-xs">{filteredTxns.length} in period</Badge>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted/40">
                    <tr>{["Date", "Traveler", "Department", "Merchant", "Airport", "Amount", "Policy Check", "Status"].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">{h}</th>
                    ))}</tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredTxns.length === 0 ? (
                      <tr><td colSpan={8} className="px-4 py-8 text-center text-muted-foreground">No transactions in this period.</td></tr>
                    ) : filteredTxns.map((tx, i) => (
                      <tr key={i} className="hover:bg-muted/20">
                        <td className="px-4 py-3 text-xs text-muted-foreground">{tx.date}</td>
                        <td className="px-4 py-3 font-medium text-sm">{tx.traveler}</td>
                        <td className="px-4 py-3 text-xs text-muted-foreground">{tx.dept}</td>
                        <td className="px-4 py-3">{tx.merchant}</td>
                        <td className="px-4 py-3">{tx.airport}</td>
                        <td className="px-4 py-3 font-semibold">€{tx.amount.toFixed(2)}</td>
                        <td className="px-4 py-3">
                          <Badge className={tx.limit_check === "pass" ? "bg-green-100 text-green-700 border-green-200 text-xs" : "bg-red-100 text-red-700 border-red-200 text-xs"}>
                            {tx.limit_check === "pass" ? "Within limits" : "Exceeded limit"}
                          </Badge>
                        </td>
                        <td className="px-4 py-3">
                          <Badge className={tx.status === "approved" ? "bg-green-100 text-green-700 border-green-200" : "bg-red-100 text-red-700 border-red-200"}>{tx.status}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="bg-gradient-to-br from-primary via-primary/90 to-primary/70 rounded-2xl p-8 text-center text-primary-foreground">
          <h3 className="text-2xl font-heading font-bold mb-2">Ready to manage your corporate travelers?</h3>
          <p className="text-primary-foreground/80 mb-4">Set up F&B budgets per cost center, enforce spend policies, and track airport spending in real time — at zero cost to your company.</p>
          <Link to="/business-travel/get-started">
            <Button className="bg-white text-primary hover:bg-white/90 gap-2">Get Started for Business</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}