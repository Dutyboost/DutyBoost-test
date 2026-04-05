import { useState, useEffect, useMemo } from "react";
import { base44 } from "@/api/base44Client";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { Users, Building2, DollarSign, TrendingUp, Utensils, Calendar } from "lucide-react";
import DutyBoostLogo from "../components/DutyBoostLogo";

const COLORS = ["#1F6FFF", "#FF7A00", "#00C48C", "#6366f1", "#f43f5e", "#8b5cf6"];

export default function CorporateTravelDashboard() {
  const [travelers, setTravelers] = useState([]);
  const [credits, setCredits] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState("monthly");
  const [customStart, setCustomStart] = useState(() => { const d = new Date(); d.setDate(d.getDate() - 30); return d.toISOString().split("T")[0]; });
  const [customEnd, setCustomEnd] = useState(() => new Date().toISOString().split("T")[0]);

  useEffect(() => {
    Promise.all([
      base44.entities.CorporateTraveler.list("-created_date", 500),
      base44.entities.FnbDutyCredit.list("-created_date", 500),
      base44.entities.FnbTransaction.list("-created_date", 500),
    ]).then(([t, c, tx]) => {
      setTravelers(t || []);
      setCredits(c || []);
      setTransactions(tx || []);
      setLoading(false);
    });
  }, []);

  const { startDate, endDate } = useMemo(() => {
    const now = new Date();
    if (period === "daily") { const s = new Date(now); s.setDate(s.getDate() - 7); return { startDate: s.toISOString().split("T")[0], endDate: now.toISOString().split("T")[0] }; }
    if (period === "monthly") { const s = new Date(now); s.setDate(s.getDate() - 30); return { startDate: s.toISOString().split("T")[0], endDate: now.toISOString().split("T")[0] }; }
    if (period === "yearly") { const s = new Date(now); s.setFullYear(s.getFullYear() - 1); return { startDate: s.toISOString().split("T")[0], endDate: now.toISOString().split("T")[0] }; }
    return { startDate: customStart, endDate: customEnd };
  }, [period, customStart, customEnd]);

  const filteredTransactions = useMemo(() =>
    transactions.filter(t => { const d = (t.timestamp || t.created_date || "").split("T")[0]; return d >= startDate && d <= endDate; }),
    [transactions, startDate, endDate]
  );

  const activeTravelers = travelers.filter(t => t.status === "active").length;
  const totalBudget = travelers.reduce((s, t) => s + (t.daily_fnb_budget || 0), 0);
  const totalSpend = filteredTransactions.filter(t => t.status === "approved").reduce((s, t) => s + (t.amount || 0), 0);
  const utilization = totalBudget > 0 ? Math.round((totalSpend / totalBudget) * 100) : 0;

  // Department breakdown
  const deptMap = {};
  travelers.forEach(t => {
    const d = t.department || "Unknown";
    if (!deptMap[d]) deptMap[d] = { department: d, travelers: 0, budget: 0, spend: 0 };
    deptMap[d].travelers++;
    deptMap[d].budget += t.daily_fnb_budget || 0;
  });
  filteredTransactions.filter(t => t.status === "approved").forEach(tx => {
    const traveler = travelers.find(t => t.email === tx.traveler_email);
    if (traveler?.department) {
      const d = traveler.department;
      if (deptMap[d]) deptMap[d].spend += tx.amount || 0;
    }
  });
  const deptData = Object.values(deptMap).sort((a, b) => b.budget - a.budget);

  // Credit status pie
  const creditStatus = { active: 0, used: 0, expired: 0, partially_used: 0 };
  credits.forEach(c => { if (creditStatus[c.status] !== undefined) creditStatus[c.status]++; });
  const creditPie = Object.entries(creditStatus).filter(([, v]) => v > 0).map(([name, value]) => ({ name, value }));

  // Cost center spending
  const ccMap = {};
  travelers.forEach(t => {
    const cc = t.cost_center || "Unknown";
    if (!ccMap[cc]) ccMap[cc] = { cost_center: cc, budget: 0, travelers: 0 };
    ccMap[cc].budget += t.daily_fnb_budget || 0;
    ccMap[cc].travelers++;
  });
  const ccData = Object.values(ccMap).sort((a, b) => b.budget - a.budget).slice(0, 8);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 backdrop-blur border-b border-border bg-card/80">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <DutyBoostLogo height={100} />
            <span className="text-sm font-medium text-muted-foreground border-l border-border pl-3">Corporate Dashboard</span>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/corporate-admin"><Button variant="outline" size="sm" className="gap-1.5"><Users className="w-3.5 h-3.5" /> Manage Travelers</Button></Link>
            <Button variant="ghost" size="sm" onClick={() => base44.auth.logout('/')}>Sign Out</Button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        <div>
          <h1 className="text-2xl font-heading font-bold">Corporate F&B Dashboard</h1>
          <p className="text-muted-foreground mt-1">Overview of traveler F&B budgets and airport spending.</p>
        </div>

        {/* Period selector */}
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
            { label: "Active Travelers", value: activeTravelers, icon: Users, color: "text-primary", bg: "bg-primary/10" },
            { label: "Total Daily Budget", value: `€${totalBudget.toFixed(0)}`, icon: DollarSign, color: "text-green-600", bg: "bg-green-50" },
            { label: "Total F&B Spend", value: `€${totalSpend.toFixed(2)}`, icon: Utensils, color: "text-orange-600", bg: "bg-orange-50" },
            { label: "Budget Utilization", value: `${utilization}%`, icon: TrendingUp, color: "text-purple-600", bg: "bg-purple-50" },
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

        {/* Charts row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="font-heading font-semibold mb-4">Budget by Department</h2>
            {deptData.length === 0 ? <p className="text-muted-foreground text-sm text-center py-8">No data yet.</p> : (
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
            )}
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="font-heading font-semibold mb-4">F&B Credit Status</h2>
            {creditPie.length === 0 ? <p className="text-muted-foreground text-sm text-center py-8">No credits issued yet.</p> : (
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie data={creditPie} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={3} dataKey="value">
                    {creditPie.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Cost center table */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-border">
            <h2 className="font-heading font-semibold flex items-center gap-2"><Building2 className="w-4 h-4 text-primary" /> Cost Center Breakdown</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/40"><tr>
                {["Cost Center", "Travelers", "Daily Budget Allocation"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">{h}</th>
                ))}
              </tr></thead>
              <tbody className="divide-y divide-border">
                {ccData.length === 0 ? (
                  <tr><td colSpan={3} className="px-4 py-8 text-center text-muted-foreground">No data yet.</td></tr>
                ) : ccData.map((cc, i) => (
                  <tr key={cc.cost_center} className="hover:bg-muted/20">
                    <td className="px-4 py-3 font-mono font-medium">{cc.cost_center}</td>
                    <td className="px-4 py-3">{cc.travelers}</td>
                    <td className="px-4 py-3 font-semibold text-green-700">€{cc.budget.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent transactions */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-border">
            <h2 className="font-heading font-semibold">Recent F&B Transactions</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/40"><tr>
                {["Traveler", "Merchant", "Airport", "Amount", "Status", "Time"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">{h}</th>
                ))}
              </tr></thead>
              <tbody className="divide-y divide-border">
                {filteredTransactions.length === 0 ? (
                  <tr><td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">No transactions in this period.</td></tr>
                ) : filteredTransactions.slice(0, 20).map(tx => (
                  <tr key={tx.id} className="hover:bg-muted/20">
                    <td className="px-4 py-3 text-xs text-muted-foreground">{tx.traveler_email || "—"}</td>
                    <td className="px-4 py-3">{tx.merchant_name || "—"}</td>
                    <td className="px-4 py-3">{tx.airport || "—"}</td>
                    <td className="px-4 py-3 font-semibold">€{(tx.amount || 0).toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <Badge className={tx.status === "approved" ? "bg-green-100 text-green-700 border-green-200" : "bg-red-100 text-red-700 border-red-200"}>
                        {tx.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">
                      {tx.timestamp ? new Date(tx.timestamp).toLocaleString("en-GB", { dateStyle: "short", timeStyle: "short" }) : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}