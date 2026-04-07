import { useState, useEffect, useMemo } from "react";
import { base44 } from "@/api/base44Client";
import StatsCard from "../components/StatsCard";
import ProfileTab from "../components/ProfileTab";
import RetailerInvoiceDownload from "../components/RetailerInvoiceDownload";
import RedemptionHeatmap from "../components/RedemptionHeatmap";
import VoucherCard from "../components/VoucherCard";
import { TicketPercent, AlertCircle, Calendar, Landmark, CheckCircle2, LayoutDashboard, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

import {
  BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import NotificationPreferences from "../components/NotificationPreferences";
import AgencyCommissionDownload from "../components/AgencyCommissionDownload";
import AgencyStrategyTab from "../components/AgencyStrategyTab";
import { Compass } from "lucide-react";


export default function AgencyDashboard() {
  const [vouchers, setVouchers] = useState([]);
  const [user, setUser] = useState(null);
  const [bankForm, setBankForm] = useState({ bank_account_name: "", bank_iban: "" });
  const [bankSaving, setBankSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [period, setPeriod] = useState("monthly");
  const [customStart, setCustomStart] = useState(() => { const d = new Date(); d.setDate(d.getDate() - 30); return d.toISOString().split("T")[0]; });
  const [customEnd, setCustomEnd] = useState(() => new Date().toISOString().split("T")[0]);

  const loadData = async () => {
    const u = await base44.auth.me();
    setUser(u);
    setBankForm({ bank_account_name: u.bank_account_name || "", bank_iban: u.bank_iban || "" });
    const allVouchers = await base44.entities.Voucher.filter({ agency_email: u.email }, '-created_date', 50);
    setVouchers(allVouchers);
  };

  const handleSaveBank = async (e) => {
    e.preventDefault();
    setBankSaving(true);
    await base44.auth.updateMe(bankForm);
    setBankSaving(false);
    toast.success("Bank details saved!");
  };

  useEffect(() => {
    loadData();
  }, []);

  const { startDate, endDate } = useMemo(() => {
    const now = new Date();
    if (period === "daily") {
      const s = new Date(now); s.setDate(s.getDate() - 7);
      return { startDate: s.toISOString().split("T")[0], endDate: now.toISOString().split("T")[0] };
    }
    if (period === "monthly") {
      const s = new Date(now); s.setDate(s.getDate() - 30);
      return { startDate: s.toISOString().split("T")[0], endDate: now.toISOString().split("T")[0] };
    }
    return { startDate: customStart, endDate: customEnd };
  }, [period, customStart, customEnd]);

  const filteredVouchers = useMemo(() =>
    vouchers.filter(v => { const d = (v.created_date || "").split("T")[0]; return d >= startDate && d <= endDate; }),
    [vouchers, startDate, endDate]
  );

  const activeVouchers = filteredVouchers.filter((v) => v.status === "active").length;
  const redeemedVouchers = filteredVouchers.filter((v) => v.status === "redeemed").length;
  const avgIncentive = filteredVouchers.length
    ? (filteredVouchers.reduce((sum, v) => sum + v.discount_percentage, 0) / filteredVouchers.length).toFixed(1)
    : 0;
  const totalPassengers = filteredVouchers.reduce((s, v) => s + (v.traveler_count || 0), 0);
  
  const commissionPerBasket = 0.20;
  const totalForecastRevenue = (totalPassengers * commissionPerBasket).toFixed(2);

  // Vouchers by airport
  const airportMap = {};
  filteredVouchers.forEach(v => {
    const a = v.airport || "Unknown";
    if (!airportMap[a]) airportMap[a] = { airport: a, active: 0, redeemed: 0, expired: 0 };
    airportMap[a][v.status] = (airportMap[a][v.status] || 0) + 1;
  });
  const airportData = Object.values(airportMap).sort((a, b) => (b.active + b.redeemed) - (a.active + a.redeemed));

  // Status pie
  const COLORS = ["#1F6FFF", "#00C48C", "#94a3b8"];
  const pieData = [
    { name: "Active", value: activeVouchers },
    { name: "Redeemed", value: redeemedVouchers },
    { name: "Expired", value: filteredVouchers.filter(v => v.status === "expired").length },
  ].filter(d => d.value > 0);

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "strategy", label: "Define your agency strategy", icon: Compass },
    { id: "profile", label: "Profile & Billing", icon: UserCircle },
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

      {activeTab === "profile" ? (
        <ProfileTab user={user} onUserUpdate={setUser} invoiceComponent={<AgencyCommissionDownload vouchers={vouchers} agencyName={user?.full_name} user={user} />} />
      ) : activeTab === "strategy" ? (
        <AgencyStrategyTab vouchers={vouchers} />
      ) : (<>
      <div className="flex items-center gap-2 flex-wrap mb-2">
        <Calendar className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground font-medium">Period:</span>
        {["daily", "monthly", "custom"].map(p => (
          <button key={p} onClick={() => setPeriod(p)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
              period === p ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:border-primary/50"
            }`}>{p === "daily" ? "Last 7 days" : p === "monthly" ? "Last 30 days" : "Custom"}
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

      <div>
        <h1 className="text-2xl font-heading font-bold tracking-tight">Agency Dashboard</h1>
        <p className="text-muted-foreground mt-1">Earn commission from airport retail conversions made by travelers who purchased tickets through you.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Total Passengers" value={totalPassengers} icon={TicketPercent} />
        <StatsCard title="Active DutyCredits" value={activeVouchers} icon={TicketPercent} />
        <StatsCard title="DutyCredits Redeemed" value={redeemedVouchers} icon={TicketPercent} />
        <StatsCard title="Forecast Revenue" value={`€${totalForecastRevenue}`} subtitle={`€${commissionPerBasket} per basket × ${totalPassengers} travelers`} icon={TicketPercent} />
      </div>

      <div className="space-y-4">
        <h2 className="font-heading font-semibold text-lg">Your DutyCredits</h2>
        {vouchers.length === 0 ? (
          <div className="bg-card rounded-xl border border-border p-8 text-center text-muted-foreground">
            <AlertCircle className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p className="text-sm">No DutyCredits yet. Once you install the integration script, bookings will automatically generate DutyCredits.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {vouchers.slice(0, 6).map((v) => <VoucherCard key={v.id} voucher={v} />)}
          </div>
        )}
      </div>

      {vouchers.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-card rounded-xl border border-border p-6">
            <h2 className="font-heading font-semibold mb-4">DutyCredit Status</h2>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
                  {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-card rounded-xl border border-border p-6">
            <h2 className="font-heading font-semibold mb-4">DutyCredits by Airport</h2>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={airportData} margin={{ top: 4, right: 16, bottom: 4, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="airport" tick={{ fontSize: 10 }} tickLine={false} />
                <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="active" fill="#1F6FFF" name="Active" radius={[4, 4, 0, 0]} stackId="a" />
                <Bar dataKey="redeemed" fill="#00C48C" name="Redeemed" radius={[4, 4, 0, 0]} stackId="a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      <NotificationPreferences />
      <RedemptionHeatmap vouchers={vouchers} />
      </> )}
    </div>
  );
}