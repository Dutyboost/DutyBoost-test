import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { BarChart2, TrendingUp, MapPin, CreditCard, Percent, Calendar, LayoutDashboard, Users, Contact, X } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import LeadsAdmin from "./LeadsAdmin";
import AdminAccountsView from "../components/AdminAccountsView";
import RedemptionHeatmap from "../components/RedemptionHeatmap";
import StatsCard from "../components/StatsCard";

const COLORS = ["#1F6FFF", "#FF7A00", "#00C48C", "#6366f1", "#f43f5e", "#8b5cf6"];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(null);
  const [vouchers, setVouchers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [fnbCredits, setFnbCredits] = useState([]);
  const [fnbTransactions, setFnbTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [period, setPeriod] = useState("month");
  const [customStart, setCustomStart] = useState(() => { const d = new Date(); d.setDate(d.getDate() - 30); return d.toISOString().split("T")[0]; });
  const [customEnd, setCustomEnd] = useState(() => new Date().toISOString().split("T")[0]);
  const [selectedAirports, setSelectedAirports] = useState([]);
  const [airports, setAirports] = useState([]);

  const TOP_AIRPORTS = [
    { code: 'LHR', name: 'London Heathrow' },
    { code: 'CDG', name: 'Paris Charles de Gaulle' },
    { code: 'AMS', name: 'Amsterdam Schiphol' },
    { code: 'FRA', name: 'Frankfurt am Main' },
    { code: 'MAD', name: 'Madrid Barajas' },
    { code: 'BCN', name: 'Barcelona El Prat' },
    { code: 'FCO', name: 'Rome Fiumicino' },
    { code: 'MXP', name: 'Milan Malpensa' },
    { code: 'ORY', name: 'Paris Orly' },
    { code: 'LGW', name: 'London Gatwick' },
    { code: 'DUB', name: 'Dublin Airport' },
    { code: 'VCE', name: 'Venice Marco Polo' },
    { code: 'ZRH', name: 'Zurich Airport' },
    { code: 'CPH', name: 'Copenhagen Airport' },
    { code: 'MUC', name: 'Munich Airport' },
    { code: 'STR', name: 'Stuttgart Airport' },
    { code: 'VIE', name: 'Vienna International' },
    { code: 'DUS', name: 'Dusseldorf International' },
    { code: 'EDI', name: 'Edinburgh Airport' },
    { code: 'AGP', name: 'Málaga Costa del Sol' },
    { code: 'PMI', name: 'Palma de Mallorca' },
    { code: 'IBZ', name: 'Ibiza Airport' },
    { code: 'PRG', name: 'Prague Václav Havel' },
    { code: 'WAW', name: 'Warsaw Chopin' },
  ];

  useEffect(() => {
    base44.auth.me().then(user => {
      if (!user || user.role !== "admin") { navigate("/"); return; }
      setIsAdmin(true);
      Promise.all([
        base44.entities.Voucher.list("-created_date", 500),
        base44.entities.Transaction.list("-created_date", 500),
        base44.entities.FnbDutyCredit.list("-created_date", 500),
        base44.entities.FnbTransaction.list("-created_date", 500),
      ]).then(([v, t, fc, ft]) => {
        setVouchers(v || []);
        setTransactions(t || []);
        setFnbCredits(fc || []);
        setFnbTransactions(ft || []);
        setLoading(false);
      });
    });
  }, [navigate]);

  const { startDate, endDate } = useMemo(() => {
    const now = new Date();
    if (period === "day") {
      const s = now.toISOString().split("T")[0];
      return { startDate: s, endDate: s };
    }
    if (period === "month") {
      const s = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split("T")[0];
      return { startDate: s, endDate: now.toISOString().split("T")[0] };
    }
    if (period === "year") {
      const s = new Date(now.getFullYear(), 0, 1).toISOString().split("T")[0];
      return { startDate: s, endDate: now.toISOString().split("T")[0] };
    }
    return { startDate: customStart, endDate: customEnd };
  }, [period, customStart, customEnd]);

  const filteredTransactions = useMemo(() =>
    transactions.filter(t => { const d = (t.created_date || "").split("T")[0]; return d >= startDate && d <= endDate; }),
    [transactions, startDate, endDate]
  );
  const filteredVouchers = useMemo(() =>
    vouchers.filter(v => { 
      const d = (v.created_date || "").split("T")[0];
      const dateMatch = d >= startDate && d <= endDate;
      const airportMatch = selectedAirports.length === 0 || selectedAirports.includes(v.airport);
      return dateMatch && airportMatch;
    }),
    [vouchers, startDate, endDate, selectedAirports]
  );

  // FnB (Hotels/Car Rentals) filtered data
  const filteredFnbCredits = useMemo(() =>
    fnbCredits.filter(c => { const d = (c.created_date || "").split("T")[0]; return d >= startDate && d <= endDate; }),
    [fnbCredits, startDate, endDate]
  );
  const filteredFnbTransactions = useMemo(() =>
    fnbTransactions.filter(t => { const d = (t.timestamp || "").split("T")[0]; return d >= startDate && d <= endDate; }),
    [fnbTransactions, startDate, endDate]
  );

  // FnB aggregates
  const fnbData = useMemo(() => {
    const fnbByCategory = {};
    filteredFnbCredits.forEach(c => {
      const cat = c.traveler_name?.includes("HOTEL") || filteredFnbTransactions.some(t => t.token_id === c.token_id && t.category === "Hotel") ? "Hotel Partners" : "Car Rental Partners";
      if (!fnbByCategory[cat]) fnbByCategory[cat] = { category: cat, issued: 0, used: 0, revenue: 0 };
      fnbByCategory[cat].issued++;
      if (c.status === "used" || c.status === "partially_used") fnbByCategory[cat].used++;
    });
    filteredFnbTransactions.forEach(t => {
      const cat = t.category === "Hotel" ? "Hotel Partners" : "Car Rental Partners";
      if (fnbByCategory[cat]) fnbByCategory[cat].revenue += t.amount || 0;
    });
    return Object.values(fnbByCategory);
  }, [filteredFnbCredits, filteredFnbTransactions]);

  // --- Redemption rate per airport ---
  const airportMap = {};
  filteredVouchers.forEach(v => {
    if (!v.airport) return;
    if (!airportMap[v.airport]) airportMap[v.airport] = { airport: v.airport, issued: 0, redeemed: 0 };
    airportMap[v.airport].issued++;
    if (v.status === "redeemed") airportMap[v.airport].redeemed++;
  });
  const airportData = Object.values(airportMap).map(d => ({
    ...d,
    rate: d.issued > 0 ? Math.round((d.redeemed / d.issued) * 100) : 0,
  })).sort((a, b) => b.issued - a.issued);

  // --- Transaction volume for selected period ---
  const dayCount = Math.max(1, Math.round((new Date(endDate) - new Date(startDate)) / 86400000)) + 1;
  const periodDays = Array.from({ length: dayCount }, (_, i) => {
    const d = new Date(startDate);
    d.setDate(d.getDate() + i);
    return d.toISOString().split("T")[0];
  }).slice(-30);
  const txByDay = {};
  filteredTransactions.forEach(t => {
    const day = (t.created_date || "").split("T")[0];
    if (!txByDay[day]) txByDay[day] = { date: day, volume: 0, revenue: 0, count: 0 };
    txByDay[day].volume += t.transaction_value || 0;
    txByDay[day].revenue += t.platform_revenue || 0;
    txByDay[day].count++;
  });
  const dailyData = periodDays.map(d => ({
    date: d.slice(5),
    volume: Math.round(txByDay[d]?.volume || 0),
    revenue: parseFloat((txByDay[d]?.revenue || 0).toFixed(2)),
    count: txByDay[d]?.count || 0,
  }));

  // --- Voucher status breakdown (pie) ---
  const statusCounts = { active: 0, redeemed: 0, expired: 0 };
  filteredVouchers.forEach(v => { if (statusCounts[v.status] !== undefined) statusCounts[v.status]++; });
  const pieData = [
    { name: "Active", value: statusCounts.active },
    { name: "Redeemed", value: statusCounts.redeemed },
    { name: "Expired", value: statusCounts.expired },
  ].filter(d => d.value > 0);

  // --- Travel type split ---
  const travelTypeCounts = {};
  filteredVouchers.forEach(v => {
    const t = v.travel_type || "Unknown";
    travelTypeCounts[t] = (travelTypeCounts[t] || 0) + 1;
  });
  const travelTypePie = Object.entries(travelTypeCounts).map(([name, value]) => ({ name, value }));

  const totalRevenue = filteredTransactions.reduce((s, t) => s + (t.platform_revenue || 0), 0);
  const redemptionRate = filteredVouchers.length > 0
    ? Math.round((statusCounts.redeemed / filteredVouchers.length) * 100)
    : 0;

  if (!isAdmin || loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin" />
      </div>
    );
  }

  const tabs = [
    { id: "dashboard", label: "Analytics", icon: LayoutDashboard },
    { id: "accounts", label: "All Accounts", icon: Users },
    { id: "leads", label: "Leads", icon: Contact },
  ];

  return (
    <div className="space-y-6">
      {/* Tab bar */}
      <div className="flex gap-1 border-b border-border">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button key={id} onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-all ${
              activeTab === id ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
            }`}>
            <Icon className="w-4 h-4" /> {label}
          </button>
        ))}
      </div>

      {activeTab === "accounts" ? <AdminAccountsView /> : activeTab === "leads" ? <LeadsAdmin /> : (<>
      <div>
         <h1 className="text-2xl font-heading font-bold tracking-tight flex items-center gap-2">
          <BarChart2 className="w-6 h-6 text-primary" /> Analytics Dashboard
        </h1>
        <p className="text-muted-foreground mt-1">Platform-wide metrics and performance insights.</p>
      </div>

      {/* Airport selector */}
      <div className="bg-card rounded-xl border border-border p-4 space-y-3">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium">Airport Code(s)</span>
        </div>
        <div className="flex gap-2 items-start">
          <Select onValueChange={(value) => {
            if (!selectedAirports.includes(value)) {
              setSelectedAirports([...selectedAirports, value]);
            }
          }}>
            <SelectTrigger className="w-64"><SelectValue placeholder="Search and select airport..." /></SelectTrigger>
            <SelectContent>
              {TOP_AIRPORTS.map(a => (
                <SelectItem key={a.code} value={a.code}>
                  {a.code} — {a.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex flex-wrap gap-2">
            {selectedAirports.map(code => {
              const airport = TOP_AIRPORTS.find(a => a.code === code);
              return (
                <div key={code} className="bg-primary/10 border border-primary/30 rounded-full px-3 py-1.5 text-sm font-medium flex items-center gap-2">
                  {code}
                  <button onClick={() => setSelectedAirports(selectedAirports.filter(c => c !== code))} className="text-primary hover:opacity-70">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Period selector */}
      <div className="flex items-center gap-2 flex-wrap">
        <Calendar className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground font-medium">Period:</span>
        {[
          { key: "day", label: "Day" },
          { key: "month", label: "Month" },
          { key: "year", label: "Year" },
          { key: "custom", label: "Custom" },
        ].map(({ key, label }) => (
          <button key={key} onClick={() => setPeriod(key)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
              period === key ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:border-primary/50"
            }`}>{label}
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

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Total DutyCredits" value={filteredVouchers.length} icon={CreditCard} />
        <StatsCard title="Redemption Rate" value={`${redemptionRate}%`} icon={Percent} />
        <StatsCard title="Platform Revenue" value={`€ ${totalRevenue.toLocaleString("nl-NL", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} icon={TrendingUp} />
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
              formatter={(val, name) => [name === "volume" ? `€ ${val.toLocaleString("nl-NL")}` : name === "revenue" ? `€ ${val.toLocaleString("nl-NL")}` : val, name]}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Line type="monotone" dataKey="volume" stroke="#1F6FFF" strokeWidth={2} dot={false} name="Volume (€)" />
            <Line type="monotone" dataKey="revenue" stroke="#FF7A00" strokeWidth={2} dot={false} name="Revenue (€)" />
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
              <Bar dataKey="issued" fill="#1F6FFF" name="Issued" radius={[4, 4, 0, 0]} />
              <Bar dataKey="redeemed" fill="#00C48C" name="Redeemed" radius={[4, 4, 0, 0]} />
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

      {/* Spatial heatmap */}
      <RedemptionHeatmap vouchers={filteredVouchers} />

      {/* Hotel Partners & Car Rental Partners */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h2 className="font-heading font-semibold mb-4">Hotel Partners & Car Rental Partners Performance</h2>
        {fnbData.length === 0 ? (
          <p className="text-muted-foreground text-sm py-8 text-center">No hotel or car rental data yet.</p>
        ) : (
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={fnbData} margin={{ top: 4, right: 16, bottom: 40, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="category" tick={{ fontSize: 11 }} angle={-15} textAnchor="end" height={80} />
              <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} formatter={(v, n) => n === "revenue" ? [`€ ${v.toLocaleString("nl-NL", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, "Revenue"] : [v, n === "issued" ? "Credits Issued" : "Credits Used"]} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="issued" fill="#dbeafe" radius={[4, 4, 0, 0]} name="Credits Issued" />
              <Bar dataKey="used" fill="#2563eb" radius={[4, 4, 0, 0]} name="Credits Used" />
              <Bar dataKey="revenue" fill="#10b981" radius={[4, 4, 0, 0]} name="Revenue (€)" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
      </> )}
    </div>
  );
}