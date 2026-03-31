import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { BarChart2, TrendingUp, MapPin, CreditCard, Percent } from "lucide-react";
import StatsCard from "../components/StatsCard";

const COLORS = ["#6366f1", "#f59e0b", "#10b981", "#3b82f6", "#f43f5e", "#8b5cf6"];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(null);
  const [vouchers, setVouchers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.auth.me().then(user => {
      if (!user || user.role !== "admin") { navigate("/"); return; }
      setIsAdmin(true);
      Promise.all([
        base44.entities.Voucher.list("-created_date", 500),
        base44.entities.Transaction.list("-created_date", 500),
      ]).then(([v, t]) => {
        setVouchers(v || []);
        setTransactions(t || []);
        setLoading(false);
      });
    });
  }, [navigate]);

  // --- Redemption rate per airport ---
  const airportMap = {};
  vouchers.forEach(v => {
    if (!v.airport) return;
    if (!airportMap[v.airport]) airportMap[v.airport] = { airport: v.airport, issued: 0, redeemed: 0 };
    airportMap[v.airport].issued++;
    if (v.status === "redeemed") airportMap[v.airport].redeemed++;
  });
  const airportData = Object.values(airportMap).map(d => ({
    ...d,
    rate: d.issued > 0 ? Math.round((d.redeemed / d.issued) * 100) : 0,
  })).sort((a, b) => b.issued - a.issued).slice(0, 8);

  // --- Daily transaction volume (last 30 days) ---
  const today = new Date();
  const last30 = Array.from({ length: 30 }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - (29 - i));
    return d.toISOString().split("T")[0];
  });
  const txByDay = {};
  transactions.forEach(t => {
    const day = (t.created_date || "").split("T")[0];
    if (!txByDay[day]) txByDay[day] = { date: day, volume: 0, revenue: 0, count: 0 };
    txByDay[day].volume += t.transaction_value || 0;
    txByDay[day].revenue += t.platform_revenue || 0;
    txByDay[day].count++;
  });
  const dailyData = last30.map(d => ({
    date: d.slice(5),
    volume: Math.round(txByDay[d]?.volume || 0),
    revenue: parseFloat((txByDay[d]?.revenue || 0).toFixed(2)),
    count: txByDay[d]?.count || 0,
  }));

  // --- Voucher status breakdown (pie) ---
  const statusCounts = { active: 0, redeemed: 0, expired: 0 };
  vouchers.forEach(v => { if (statusCounts[v.status] !== undefined) statusCounts[v.status]++; });
  const pieData = [
    { name: "Active", value: statusCounts.active },
    { name: "Redeemed", value: statusCounts.redeemed },
    { name: "Expired", value: statusCounts.expired },
  ].filter(d => d.value > 0);

  // --- Travel type split ---
  const travelTypeCounts = {};
  vouchers.forEach(v => {
    const t = v.travel_type || "Unknown";
    travelTypeCounts[t] = (travelTypeCounts[t] || 0) + 1;
  });
  const travelTypePie = Object.entries(travelTypeCounts).map(([name, value]) => ({ name, value }));

  const totalRevenue = transactions.reduce((s, t) => s + (t.platform_revenue || 0), 0);
  const redemptionRate = vouchers.length > 0
    ? Math.round((statusCounts.redeemed / vouchers.length) * 100)
    : 0;

  if (!isAdmin || loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-heading font-bold tracking-tight flex items-center gap-2">
          <BarChart2 className="w-6 h-6 text-primary" /> Analytics Dashboard
        </h1>
        <p className="text-muted-foreground mt-1">Platform-wide metrics and performance insights.</p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Total DutyCredits" value={vouchers.length} icon={CreditCard} />
        <StatsCard title="Redemption Rate" value={`${redemptionRate}%`} icon={Percent} />
        <StatsCard title="Platform Revenue" value={`€${totalRevenue.toFixed(2)}`} icon={TrendingUp} />
        <StatsCard title="Total Transactions" value={transactions.length} icon={BarChart2} />
      </div>

      {/* Daily transaction volume */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h2 className="font-heading font-semibold mb-4">Daily Transaction Volume (last 30 days)</h2>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={dailyData} margin={{ top: 4, right: 16, bottom: 4, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="date" tick={{ fontSize: 11 }} tickLine={false} />
            <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }}
              formatter={(val, name) => [name === "volume" ? `€${val}` : name === "revenue" ? `€${val}` : val, name]}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Line type="monotone" dataKey="volume" stroke="#6366f1" strokeWidth={2} dot={false} name="Volume (€)" />
            <Line type="monotone" dataKey="revenue" stroke="#f59e0b" strokeWidth={2} dot={false} name="Revenue (€)" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Redemption rate per airport */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h2 className="font-heading font-semibold mb-4 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-primary" /> DutyCredits Issued & Redeemed per Airport
        </h2>
        {airportData.length === 0 ? (
          <p className="text-muted-foreground text-sm py-8 text-center">No airport data yet.</p>
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={airportData} margin={{ top: 4, right: 16, bottom: 4, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="airport" tick={{ fontSize: 11 }} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }}
              />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="issued" fill="#6366f1" name="Issued" radius={[4, 4, 0, 0]} />
              <Bar dataKey="redeemed" fill="#10b981" name="Redeemed" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Redemption rate % per airport */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h2 className="font-heading font-semibold mb-4">Redemption Rate (%) per Airport</h2>
        {airportData.length === 0 ? (
          <p className="text-muted-foreground text-sm py-8 text-center">No airport data yet.</p>
        ) : (
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={airportData} margin={{ top: 4, right: 16, bottom: 4, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="airport" tick={{ fontSize: 11 }} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} unit="%" domain={[0, 100]} />
              <Tooltip
                contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }}
                formatter={(val) => [`${val}%`, "Redemption Rate"]}
              />
              <Bar dataKey="rate" radius={[4, 4, 0, 0]} name="Rate">
                {airportData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Bottom row: pie charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card rounded-xl border border-border p-6">
          <h2 className="font-heading font-semibold mb-4">DutyCredit Status Breakdown</h2>
          {pieData.length === 0 ? (
            <p className="text-muted-foreground text-sm py-8 text-center">No data yet.</p>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
                  {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip
                  contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }}
                />
                <Legend wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="bg-card rounded-xl border border-border p-6">
          <h2 className="font-heading font-semibold mb-4">Travel Type Split</h2>
          {travelTypePie.length === 0 ? (
            <p className="text-muted-foreground text-sm py-8 text-center">No data yet.</p>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={travelTypePie} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
                  {travelTypePie.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip
                  contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }}
                />
                <Legend wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}