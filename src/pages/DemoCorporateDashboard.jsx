import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import {
  Users, Building2, DollarSign, TrendingUp, Utensils, ArrowLeft, Calendar,
  ShieldCheck, BarChart3, CheckCircle, XCircle, CreditCard
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

// Budget charts — scaled to match annual budget context
const deptDataByPeriod = {
  daily:   [{ department: "Sales", budget: 120, spend: 42 }, { department: "Finance", budget: 45, spend: 19 }, { department: "Engineering", budget: 100, spend: 28 }, { department: "HR", budget: 40, spend: 0 }],
  monthly: [{ department: "Sales", budget: 120, spend: 87 }, { department: "Finance", budget: 45, spend: 38 }, { department: "Engineering", budget: 100, spend: 62 }, { department: "HR", budget: 40, spend: 12 }],
  yearly:  [{ department: "Sales", budget: 1440, spend: 9124 * 0.45 }, { department: "Finance", budget: 540, spend: 3840 * 0.22 }, { department: "Engineering", budget: 1200, spend: 6720 * 0.25 }, { department: "HR", budget: 480, spend: 980 * 0.1 }],
  custom:  [{ department: "Sales", budget: 120, spend: 74 }, { department: "Finance", budget: 45, spend: 31 }, { department: "Engineering", budget: 100, spend: 52 }, { department: "HR", budget: 40, spend: 8 }],
};

const creditPieByPeriod = {
  daily:   [{ name: "Active", value: 18 }, { name: "Partially Used", value: 8 }, { name: "Used", value: 9 }, { name: "Expired", value: 2 }],
  monthly: [{ name: "Active", value: 38 }, { name: "Partially Used", value: 24 }, { name: "Used", value: 61 }, { name: "Expired", value: 9 }],
  yearly:  [{ name: "Active", value: 42 }, { name: "Partially Used", value: 71 }, { name: "Used", value: 218 }, { name: "Expired", value: 34 }],
  custom:  [{ name: "Active", value: 28 }, { name: "Partially Used", value: 19 }, { name: "Used", value: 44 }, { name: "Expired", value: 6 }],
};

const spendTrendByPeriod = {
  daily:   [{ day: "Mon", spend: 142 }, { day: "Tue", spend: 198 }, { day: "Wed", spend: 175 }, { day: "Thu", spend: 210 }, { day: "Fri", spend: 289 }, { day: "Sat", spend: 88 }, { day: "Sun", spend: 45 }],
  monthly: [{ day: "W1", spend: 1820 }, { day: "W2", spend: 2140 }, { day: "W3", spend: 1650 }, { day: "W4", spend: 1604 }],
  yearly:  [{ day: "Q1", spend: 7100 }, { day: "Q2", spend: 8250 }, { day: "Q3", spend: 6940 }, { day: "Q4", spend: 6350 }],
  custom:  [{ day: "W1", spend: 1420 }, { day: "W2", spend: 1870 }, { day: "W3", spend: 1490 }],
};

// Spend totals that make sense relative to annual budget (€111,325)
const periodTotals = {
  daily: 1847.60,      // ~5 travel days worth
  monthly: 7214.30,   // ~6.5% of annual
  yearly: 28640.80,   // ~25.7% of annual (YTD, Q1+)
};

const ccData = [
  { cost_center: "CC-100", department: "Sales", travelers: 2, annual_budget: 43800, spent_ytd: 9124, remaining: 34676 },
  { cost_center: "CC-200", department: "Finance", travelers: 1, annual_budget: 16425, spent_ytd: 3840, remaining: 12585 },
  { cost_center: "CC-300", department: "Engineering", travelers: 2, annual_budget: 36500, spent_ytd: 6720, remaining: 29780 },
  { cost_center: "CC-400", department: "HR", travelers: 1, annual_budget: 14600, spent_ytd: 980, remaining: 13620 },
];

// Transactions per period — more transactions for longer periods, realistic amounts
const txnsByPeriod = {
  daily: [
    { traveler: "Emma Johnson", dept: "Sales", merchant: "The Kitchen Bar", airport: "AMS", amount: 28.50, status: "approved", date: "2026-04-05", limit_check: "pass" },
    { traveler: "Luca Bianchi", dept: "Finance", merchant: "Sky Lounge Bistro", airport: "CDG", amount: 41.00, status: "approved", date: "2026-04-04", limit_check: "pass" },
    { traveler: "Sophie Müller", dept: "Engineering", merchant: "Gate 7 Café", airport: "FRA", amount: 15.80, status: "approved", date: "2026-04-03", limit_check: "pass" },
    { traveler: "Ahmed Al-Farsi", dept: "Sales", merchant: "La Piazza AMS", airport: "AMS", amount: 56.20, status: "rejected", date: "2026-04-02", limit_check: "fail" },
    { traveler: "Marcus Lee", dept: "Engineering", merchant: "Terminal Grill", airport: "LHR", amount: 22.40, status: "approved", date: "2026-04-01", limit_check: "pass" },
  ],
  monthly: [
    { traveler: "Emma Johnson", dept: "Sales", merchant: "The Kitchen Bar", airport: "AMS", amount: 28.50, status: "approved", date: "2026-04-05", limit_check: "pass" },
    { traveler: "Luca Bianchi", dept: "Finance", merchant: "Sky Lounge Bistro", airport: "CDG", amount: 41.00, status: "approved", date: "2026-04-04", limit_check: "pass" },
    { traveler: "Sophie Müller", dept: "Engineering", merchant: "Gate 7 Café", airport: "FRA", amount: 15.80, status: "approved", date: "2026-04-03", limit_check: "pass" },
    { traveler: "Ahmed Al-Farsi", dept: "Sales", merchant: "La Piazza AMS", airport: "AMS", amount: 56.20, status: "rejected", date: "2026-04-02", limit_check: "fail" },
    { traveler: "Marcus Lee", dept: "Engineering", merchant: "Terminal Grill", airport: "LHR", amount: 22.40, status: "approved", date: "2026-04-01", limit_check: "pass" },
    { traveler: "Emma Johnson", dept: "Sales", merchant: "Café Central", airport: "AMS", amount: 19.90, status: "approved", date: "2026-03-28", limit_check: "pass" },
    { traveler: "Luca Bianchi", dept: "Finance", merchant: "Brasserie Gate 12", airport: "CDG", amount: 33.50, status: "approved", date: "2026-03-25", limit_check: "pass" },
    { traveler: "Sophie Müller", dept: "Engineering", merchant: "Espresso House FRA", airport: "FRA", amount: 18.40, status: "approved", date: "2026-03-22", limit_check: "pass" },
    { traveler: "Ahmed Al-Farsi", dept: "Sales", merchant: "The Kitchen Bar", airport: "AMS", amount: 29.00, status: "approved", date: "2026-03-20", limit_check: "pass" },
    { traveler: "Marcus Lee", dept: "Engineering", merchant: "Heathrow Bistro", airport: "LHR", amount: 24.60, status: "approved", date: "2026-03-18", limit_check: "pass" },
    { traveler: "Emma Johnson", dept: "Sales", merchant: "Oranje Bar AMS", airport: "AMS", amount: 27.30, status: "approved", date: "2026-03-15", limit_check: "pass" },
    { traveler: "Luca Bianchi", dept: "Finance", merchant: "Gate Café CDG", airport: "CDG", amount: 21.80, status: "approved", date: "2026-03-12", limit_check: "pass" },
    { traveler: "Ahmed Al-Farsi", dept: "Sales", merchant: "Amsterdam Lounge", airport: "AMS", amount: 30.00, status: "approved", date: "2026-03-10", limit_check: "pass" },
  ],
  yearly: [
    { traveler: "Emma Johnson", dept: "Sales", merchant: "The Kitchen Bar", airport: "AMS", amount: 28.50, status: "approved", date: "2026-04-05", limit_check: "pass" },
    { traveler: "Luca Bianchi", dept: "Finance", merchant: "Sky Lounge Bistro", airport: "CDG", amount: 41.00, status: "approved", date: "2026-04-04", limit_check: "pass" },
    { traveler: "Sophie Müller", dept: "Engineering", merchant: "Gate 7 Café", airport: "FRA", amount: 15.80, status: "approved", date: "2026-04-03", limit_check: "pass" },
    { traveler: "Ahmed Al-Farsi", dept: "Sales", merchant: "La Piazza AMS", airport: "AMS", amount: 56.20, status: "rejected", date: "2026-04-02", limit_check: "fail" },
    { traveler: "Marcus Lee", dept: "Engineering", merchant: "Terminal Grill", airport: "LHR", amount: 22.40, status: "approved", date: "2026-04-01", limit_check: "pass" },
    { traveler: "Emma Johnson", dept: "Sales", merchant: "Café Central", airport: "AMS", amount: 19.90, status: "approved", date: "2026-03-28", limit_check: "pass" },
    { traveler: "Luca Bianchi", dept: "Finance", merchant: "Brasserie Gate 12", airport: "CDG", amount: 33.50, status: "approved", date: "2026-03-15", limit_check: "pass" },
    { traveler: "Sophie Müller", dept: "Engineering", merchant: "FRA Bistro", airport: "FRA", amount: 18.40, status: "approved", date: "2026-03-10", limit_check: "pass" },
    { traveler: "Ahmed Al-Farsi", dept: "Sales", merchant: "The Kitchen Bar", airport: "AMS", amount: 29.00, status: "approved", date: "2026-03-05", limit_check: "pass" },
    { traveler: "Marcus Lee", dept: "Engineering", merchant: "Heathrow Bistro", airport: "LHR", amount: 24.60, status: "approved", date: "2026-02-28", limit_check: "pass" },
    { traveler: "Emma Johnson", dept: "Sales", merchant: "Oranje Bar AMS", airport: "AMS", amount: 27.30, status: "approved", date: "2026-02-20", limit_check: "pass" },
    { traveler: "Luca Bianchi", dept: "Finance", merchant: "Gate Café CDG", airport: "CDG", amount: 21.80, status: "approved", date: "2026-02-15", limit_check: "pass" },
    { traveler: "Ahmed Al-Farsi", dept: "Sales", merchant: "Amsterdam Lounge", airport: "AMS", amount: 30.00, status: "approved", date: "2026-02-10", limit_check: "pass" },
    { traveler: "Sophie Müller", dept: "Engineering", merchant: "Munich Café", airport: "MUC", amount: 17.50, status: "approved", date: "2026-02-05", limit_check: "pass" },
    { traveler: "Marcus Lee", dept: "Engineering", merchant: "LHR Costa Coffee", airport: "LHR", amount: 14.20, status: "approved", date: "2026-01-28", limit_check: "pass" },
    { traveler: "Emma Johnson", dept: "Sales", merchant: "La Place AMS", airport: "AMS", amount: 32.40, status: "approved", date: "2026-01-20", limit_check: "pass" },
    { traveler: "Ahmed Al-Farsi", dept: "Sales", merchant: "Vapiano FRA", airport: "FRA", amount: 25.90, status: "approved", date: "2026-01-15", limit_check: "pass" },
    { traveler: "Luca Bianchi", dept: "Finance", merchant: "Sky Café LHR", airport: "LHR", amount: 38.00, status: "approved", date: "2026-01-10", limit_check: "pass" },
    { traveler: "Sophie Müller", dept: "Engineering", merchant: "Gate 7 Café", airport: "FRA", amount: 20.10, status: "approved", date: "2025-12-20", limit_check: "pass" },
    { traveler: "Marcus Lee", dept: "Engineering", merchant: "Terminal Grill LHR", airport: "LHR", amount: 26.70, status: "approved", date: "2025-12-10", limit_check: "pass" },
    { traveler: "Emma Johnson", dept: "Sales", merchant: "Heineken Bar AMS", airport: "AMS", amount: 23.50, status: "approved", date: "2025-12-02", limit_check: "pass" },
    { traveler: "Ahmed Al-Farsi", dept: "Sales", merchant: "Nespresso AMS", airport: "AMS", amount: 12.00, status: "approved", date: "2025-11-25", limit_check: "pass" },
    { traveler: "Luca Bianchi", dept: "Finance", merchant: "Brasserie CDG", airport: "CDG", amount: 44.00, status: "rejected", date: "2025-11-20", limit_check: "fail" },
    { traveler: "Sophie Müller", dept: "Engineering", merchant: "FRA Lounge", airport: "FRA", amount: 19.80, status: "approved", date: "2025-11-15", limit_check: "pass" },
    { traveler: "Marcus Lee", dept: "Engineering", merchant: "Pret A Manger LHR", airport: "LHR", amount: 11.40, status: "approved", date: "2025-11-08", limit_check: "pass" },
    { traveler: "Emma Johnson", dept: "Sales", merchant: "La Place AMS", airport: "AMS", amount: 29.90, status: "approved", date: "2025-10-30", limit_check: "pass" },
    { traveler: "Ahmed Al-Farsi", dept: "Sales", merchant: "The Kitchen Bar", airport: "AMS", amount: 27.60, status: "approved", date: "2025-10-20", limit_check: "pass" },
    { traveler: "Luca Bianchi", dept: "Finance", merchant: "Sky Lounge CDG", airport: "CDG", amount: 31.50, status: "approved", date: "2025-10-12", limit_check: "pass" },
    { traveler: "Sophie Müller", dept: "Engineering", merchant: "Gate Bistro MUC", airport: "MUC", amount: 22.30, status: "approved", date: "2025-09-28", limit_check: "pass" },
    { traveler: "Marcus Lee", dept: "Engineering", merchant: "Terminal Café LHR", airport: "LHR", amount: 16.80, status: "approved", date: "2025-09-15", limit_check: "pass" },
  ],
};

const policyRules = [
  { rule: "Daily F&B limit per traveler", value: "€40–60 (by department)" },
  { rule: "Per-transaction cap", value: "€20–30 (by department)" },
  { rule: "Allowed merchant category", value: "F&B only" },
  { rule: "Breakfast window", value: "06:00–10:00" },
  { rule: "Lunch window", value: "11:00–14:00" },
  { rule: "Dinner window", value: "17:00–21:00" },
  { rule: "Airport scope", value: "All participating airports" },
  { rule: "Non-F&B blocked", value: "Retail, Duty-free, etc." },
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

  const filteredTxns = period === "custom"
    ? txnsByPeriod.monthly.filter(t => t.date >= customStart && t.date <= customEnd)
    : (txnsByPeriod[period] || txnsByPeriod.monthly);

  // For custom period, sum from filtered txns; for presets use pre-calculated realistic totals
  const totalSpend = period === "custom"
    ? filteredTxns.filter(t => t.status === "approved").reduce((s, t) => s + t.amount, 0)
    : (periodTotals[period] || 0);

  const deptData = deptDataByPeriod[period] || deptDataByPeriod.monthly;
  const creditPie = creditPieByPeriod[period] || creditPieByPeriod.monthly;
  const spendTrend = spendTrendByPeriod[period] || spendTrendByPeriod.monthly;

  const totalBudgetAllocated = ccData.reduce((s, c) => s + c.annual_budget, 0);
  const totalSpentYTD = ccData.reduce((s, c) => s + c.spent_ytd, 0);

  const complianceRate = Math.round(
    (filteredTxns.filter(t => t.status === "approved").length / Math.max(filteredTxns.length, 1)) * 100
  );

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
            { label: "Annual Budget Allocated", value: `€${(totalBudgetAllocated/1000).toFixed(0)}K`, sub: "across 4 cost centers", icon: DollarSign, color: "text-primary", bg: "bg-primary/10" },
            { label: "Spent This Period", value: `€${totalSpend.toLocaleString("nl-NL", {minimumFractionDigits:2,maximumFractionDigits:2})}`, sub: `${((totalSpend/totalBudgetAllocated)*100).toFixed(1)}% of annual`, icon: Utensils, color: "text-orange-600", bg: "bg-orange-50" },
            { label: "Active Travelers", value: `${demoTravelers.filter(t => t.status === "active").length}`, sub: "1 suspended", icon: Users, color: "text-green-600", bg: "bg-green-50" },
            { label: "Policy Compliance", value: `${complianceRate}%`, sub: `${filteredTxns.filter(t=>t.status==="rejected").length} rejected`, icon: ShieldCheck, color: "text-purple-600", bg: "bg-purple-50" },
          ].map(({ label, value, sub, icon: Icon, color, bg }) => (
            <div key={label} className="bg-card border border-border rounded-xl p-5">
              <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center mb-3`}><Icon className={`w-5 h-5 ${color}`} /></div>
              <p className={`text-3xl font-heading font-bold ${color}`}>{value}</p>
              <p className="text-sm text-muted-foreground mt-1">{label}</p>
              <p className="text-xs text-muted-foreground/70 mt-0.5">{sub}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-border overflow-x-auto">
          {TABS.map(tab => {
            const Icon = tab.icon;
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 transition-all -mb-px whitespace-nowrap ${activeTab === tab.id ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
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
              <h2 className="font-heading font-semibold mb-1">F&B Spend Trend</h2>
              <p className="text-xs text-muted-foreground mb-4">
                {period === "daily" ? "Daily breakdown" : period === "monthly" ? "Weekly breakdown" : period === "yearly" ? "Quarterly breakdown" : "Weekly breakdown"}
              </p>
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
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="font-heading font-semibold mb-4">Annual Budget vs Spend YTD by Cost Center</h2>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={ccData.map(c => ({ name: c.cost_center, budget: c.annual_budget, spent: c.spent_ytd }))} margin={{ top: 4, right: 8, bottom: 4, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} tickLine={false} />
                  <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} tickFormatter={v => `€${(v/1000).toFixed(0)}K`} />
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
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">{filteredTxns.length} transactions</Badge>
                  <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">€{totalSpend.toLocaleString("nl-NL", {minimumFractionDigits:2,maximumFractionDigits:2})} approved</Badge>
                </div>
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