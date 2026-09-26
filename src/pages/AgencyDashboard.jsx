import { useState, useEffect, useMemo } from "react";
import { base44 } from "@/api/base44Client";
import StatsCard from "../components/StatsCard";
import ProfileTab from "../components/ProfileTab";
import VoucherCard from "../components/VoucherCard";
import { TicketPercent, AlertCircle, Calendar, Landmark, CheckCircle2, LayoutDashboard, UserCircle, BookOpen, ArrowRight, Code2, Mail, Zap, BarChart2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

import {
  BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import NotificationPreferences from "../components/NotificationPreferences";
import PartnerIncentiveReceipts from "../components/partner/PartnerIncentiveReceipts";
import AggregationView from "../components/AggregationView";



export default function AgencyDashboard() {
  const [vouchers, setVouchers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [user, setUser] = useState(null);
  const [companyName, setCompanyName] = useState("");

  const [activeTab, setActiveTab] = useState("dashboard");
  const [period, setPeriod] = useState("monthly");
  const [customStart, setCustomStart] = useState(() => { const d = new Date(); d.setDate(d.getDate() - 30); return d.toISOString().split("T")[0]; });
  const [customEnd, setCustomEnd] = useState(() => new Date().toISOString().split("T")[0]);

  const loadData = async () => {
    const u = await base44.auth.me();
    setUser(u);
    const [allVouchers, allTxns, apps] = await Promise.all([
      base44.entities.Voucher.filter({ agency_email: u.email }, '-created_date', 100),
      base44.entities.Transaction.filter({ agency_email: u.email }, '-created_date', 200),
      base44.entities.SignupApplication.filter({ email: u.email }, '-created_date', 1),
    ]);
    setVouchers(allVouchers);
    setTransactions(allTxns);
    if (apps && apps.length > 0) setCompanyName(apps[0].company || "");
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

  const totalPassengers = filteredVouchers.reduce((s, v) => s + (v.traveler_count || 0), 0);
  
  // Real commission earned from redeemed transactions
  const filteredTxns = useMemo(() =>
    transactions.filter(t => { const d = (t.created_date || "").split("T")[0]; return d >= startDate && d <= endDate; }),
    [transactions, startDate, endDate]
  );
  const totalCommissionEarned = filteredTxns.reduce((s, t) => s + (t.agency_commission || 0), 0);
  const totalGrossVolume = filteredTxns.reduce((s, t) => s + (t.transaction_value || 0), 0);

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
    { id: "custom", label: "Custom Aggregation", icon: BarChart2 },
    { id: "implementation", label: "Implementation Guide", icon: BookOpen },
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
        <ProfileTab
          user={user}
          onUserUpdate={setUser}
          bankTitle="Bank Details for Incentive Payments"
          bankBlurb="Your monthly share of the platform fee is transferred here."
          invoiceHeading="Monthly Incentive Receipts"
          invoiceComponent={
            <PartnerIncentiveReceipts
              transactions={transactions}
              commissionField="agency_commission"
              partnerLabel="Travel Partner"
              user={user}
            />
          }
        />
      ) : activeTab === "custom" ? (
        <AggregationView transactions={filteredTxns} vouchers={filteredVouchers} period={period} entityType="agency" />
      ) : activeTab === "implementation" ? (
        <div className="max-w-2xl space-y-8 py-4">
          <div className="space-y-2">
            <h1 className="text-2xl font-heading font-bold">Implementation Guide</h1>
            <p className="text-muted-foreground">Everything your technical team needs to integrate DutyBoost into your booking platform — so every confirmed booking automatically generates a DutyCredit for the traveler.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { icon: Code2, title: 'Single API call', desc: 'One POST request after every confirmed booking. Works with any booking system or language.' },
              { icon: Zap, title: '~30 min integration', desc: 'Simple endpoint with a ready-to-paste code snippet in JS, Python, and PHP.' },
              { icon: Mail, title: 'Automatic email', desc: 'DutyBoost emails the traveler their QR voucher automatically — no extra work needed.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-card border border-border rounded-xl p-4 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center"><Icon className="w-4 h-4 text-primary" /></div>
                <p className="font-semibold text-sm">{title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 space-y-4">
            <p className="text-sm text-muted-foreground">The full guide covers: API authentication, request & response field reference, code examples (JS/Node, Python, PHP), email embedding, discount calculation logic, webhook setup for redemption notifications, and a testing checklist.</p>
            <Link to="/travel-partner-integration-guide">
              <button className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors">
                Open Full Implementation Guide <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
          <div className="bg-card border border-border rounded-xl p-4 text-sm">
            <p className="font-semibold mb-1">Need help?</p>
            <p className="text-muted-foreground">Contact our integration team at <a href="mailto:integrations@dutyboost.com" className="text-primary underline">integrations@dutyboost.com</a> — we can assist with setup, provide sandbox credentials, or review your implementation.</p>
          </div>
        </div>
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
        <div className="flex items-baseline gap-3 flex-wrap">
          <h1 className="text-2xl font-heading font-bold tracking-tight">
            Travel Partner Dashboard — Welcome, <span className="text-primary">{user?.full_name?.split(' ')[0] || 'Partner'}</span>!
          </h1>
          {companyName && (
            <span className="text-base font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">{companyName}</span>
          )}
        </div>
        <p className="text-muted-foreground mt-1">
          Track your DutyCredit performance and earn commission on every airport retail conversion from your travelers.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Total Passengers" value={totalPassengers} icon={TicketPercent} />
        <StatsCard title="Active DutyCredits" value={activeVouchers} icon={TicketPercent} />
        <StatsCard title="DutyCredits Redeemed" value={redeemedVouchers} icon={TicketPercent} />
        <StatsCard title="Commission Earned" value={`€ ${totalCommissionEarned.toLocaleString("nl-NL", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} subtitle={`0,5% of €${totalGrossVolume.toLocaleString("nl-NL", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} gross sales`} icon={Landmark} />
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
            {filteredVouchers.slice(0, 6).map((v) => <VoucherCard key={v.id} voucher={v} />)}
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
      </>)}
    </div>
  );
}