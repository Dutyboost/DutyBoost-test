import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Plane, TrendingUp, Users, TicketPercent, Euro, ArrowLeft, Calendar, LayoutDashboard, UserCircle, LogOut, Settings } from "lucide-react";
import DemoProfileTab from "../components/DemoProfileTab";
import AggregationView from "../components/AggregationView";
import RedemptionHeatmap from "../components/RedemptionHeatmap";
import { base44 } from "@/api/base44Client";
import DutyBoostLogo from "../components/DutyBoostLogo";
import { TRAVEL_AGENCIES, AIRPORTS, AGENCY_MONTHLY, AGENCY_DAILY, AGENCY_YEARLY } from "../data/demoData";

const COLORS = ["#2563eb", "#f97316", "#10b981", "#8b5cf6", "#ec4899"];

const agencyOptions = TRAVEL_AGENCIES;

export default function DemoAgencyDashboard() {
  const { t } = useTranslation();
  const [selectedAgency, setSelectedAgency] = useState(TRAVEL_AGENCIES[0]);
  const [showBookings, setShowBookings] = useState(true);
  const [showRedeemed, setShowRedeemed] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [period, setPeriod] = useState("monthly");
  const [customStart, setCustomStart] = useState("2025-10-01");
  const [customEnd, setCustomEnd] = useState("2026-03-31");

  const conversionRate = ((selectedAgency.redeemed / selectedAgency.travelers) * 100).toFixed(1);
  const pendingEarnings = (selectedAgency.commission * 0.18).toFixed(2);

  const totalBookings = TRAVEL_AGENCIES.reduce((s, a) => s + a.bookings, 0);
  const totalRedeemed = TRAVEL_AGENCIES.reduce((s, a) => s + a.redeemed, 0);
  const bookingRatio = selectedAgency.bookings / totalBookings;
  const redeemedRatio = selectedAgency.redeemed / totalRedeemed;

  const baseData = period === "daily" ? AGENCY_DAILY : period === "yearly" ? AGENCY_YEARLY : AGENCY_MONTHLY;
  const dataKey = period === "daily" ? "day" : "month";

  const scaledMonthly = baseData.map(m => ({
    ...m,
    bookings: Math.round(m.bookings * bookingRatio),
    redeemed: Math.round(m.redeemed * redeemedRatio),
  }));

  const periodMultiplier = useMemo(() => {
    if (period === "daily") return 7 / (AGENCY_MONTHLY.length * 30);
    if (period === "yearly") return 2;
    if (period === "custom") {
      const days = Math.max(1, (new Date(customEnd) - new Date(customStart)) / 86400000);
      return days / (AGENCY_MONTHLY.length * 30);
    }
    return 1;
  }, [period, customStart, customEnd]);

  const periodBookings = Math.round(selectedAgency.bookings * periodMultiplier);
  const periodTravelers = Math.round(selectedAgency.travelers * periodMultiplier);
  const periodRedeemed = Math.round(selectedAgency.redeemed * periodMultiplier);
  const periodCommission = (selectedAgency.commission * periodMultiplier).toFixed(2);

  const airportDist = AIRPORTS.map((a, i) => ({
    name: a.code,
    value: Math.round(selectedAgency.redeemed * [0.48, 0.15, 0.18, 0.09, 0.10][i]),
  }));

  const recentVouchers = [
    { code: "DC-AMS-4821", traveler: "J. van der Berg", airport: "AMS", date: "2 Apr 2026", status: "Redeemed", amount: "€ 214" },
    { code: "DC-RTM-3102", traveler: "M. Jansen", airport: "RTM", date: "1 Apr 2026", status: "Active", amount: "€ 95" },
    { code: "DC-AMS-4790", traveler: "S. de Vries", airport: "AMS", date: "1 Apr 2026", status: "Redeemed", amount: "€ 340" },
    { code: "DC-EIN-2241", traveler: "P. Bakker", airport: "EIN", date: "31 Mar 2026", status: "Active", amount: "€ 180" },
    { code: "DC-AMS-4755", traveler: "L. Smits", airport: "AMS", date: "30 Mar 2026", status: "Expired", amount: "€ 120" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="bg-card border-b border-border px-6 h-16 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <Link to="/demo" className="text-muted-foreground hover:text-foreground flex items-center gap-1 text-sm">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
          <span className="text-border">|</span>
          <DutyBoostLogo height={110} />
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground bg-muted px-3 py-1 rounded-full">{t('demo.agency_badge')}</span>
          <select
            className="text-sm border border-input rounded-lg px-3 py-1.5 bg-background"
            value={selectedAgency.id}
            onChange={e => setSelectedAgency(TRAVEL_AGENCIES.find(a => a.id === e.target.value))}
          >
            {TRAVEL_AGENCIES.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
          </select>
          <button onClick={() => base44.auth.logout('/')} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-destructive transition-colors border border-input rounded-lg px-3 py-1.5 bg-background hover:bg-destructive/5">
            <LogOut className="w-4 h-4" /> {t('demo.logout')}
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6 md:p-8 space-y-6">
        {/* Tabs */}
        <div className="flex gap-1 border-b border-border overflow-x-auto">
          {[{ id: "dashboard", label: t('demo.tabs_dashboard'), icon: LayoutDashboard }, { id: "custom", label: "Aggregation", icon: Settings }, { id: "profile", label: t('demo.tabs_profile'), icon: UserCircle }].map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-all ${
                activeTab === id ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
              }`}>
              <Icon className="w-4 h-4" /> {label}
            </button>
          ))}
        </div>

        {activeTab === "profile" ? <DemoProfileTab entity={selectedAgency} entityType="agency" /> : activeTab === "custom" ? (
          <AggregationView 
            transactions={TRAVEL_AGENCIES.flatMap(a =>
              Array(a.redeemed).fill(null).map(() => ({
                transaction_value: (a.commission / a.redeemed),
                discount_applied: 0.5,
                airport: "AMS"
              }))
            )}
            vouchers={TRAVEL_AGENCIES}
            period={period}
            entityType="agency"
          />
        ) : (<>
        {/* Welcome */}
        <div>
          <h1 className="text-2xl font-heading font-bold">{selectedAgency.name} — Travel Partner Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-1">{t('demo.your_performance')} · {selectedAgency.city}</p>
        </div>

        {/* Period selector */}
        <div className="flex items-center gap-2 flex-wrap">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground font-medium">{t('demo.period')}</span>
          {[{v:"daily",l:t('demo.daily')},{v:"monthly",l:t('demo.monthly')},{v:"yearly",l:t('demo.yearly')},{v:"custom",l:t('demo.custom')}].map(({v,l}) => (
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
              <span className="text-xs text-muted-foreground">{t('demo.to')}</span>
              <input type="date" value={customEnd} onChange={e => setCustomEnd(e.target.value)}
                className="text-xs border border-input rounded-lg px-2 py-1.5 bg-background" />
            </div>
          )}
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: t('demo.total_bookings'), value: periodBookings.toLocaleString(), icon: Plane, color: "text-blue-500" },
            { label: t('demo.dutycredits_issued'), value: periodTravelers.toLocaleString(), icon: TicketPercent, color: "text-orange-500" },
            { label: t('demo.dutycredits_redeemed'), value: periodRedeemed.toLocaleString(), icon: Users, color: "text-emerald-500" },
            { label: t('demo.commission_earned'), value: `€ ${parseFloat(periodCommission).toLocaleString("nl-NL", { minimumFractionDigits: 2 })}`, icon: Euro, color: "text-purple-500" },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-card border border-border rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground font-medium">{label}</p>
                <Icon className={`w-4 h-4 ${color}`} />
              </div>
              <p className="text-2xl font-heading font-bold">{value}</p>
            </div>
          ))}
        </div>

        {/* Conversion + pending */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card border border-border rounded-xl p-5 flex flex-col justify-between">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{t('demo.redemption_rate')}</p>
            <div>
              <p className="text-4xl font-heading font-bold text-primary">{conversionRate}%</p>
              <p className="text-xs text-muted-foreground mt-1">{t('demo.of_issued')}</p>
            </div>
            <div className="w-full bg-muted rounded-full h-2 mt-3">
              <div className="bg-primary h-2 rounded-full" style={{ width: `${conversionRate}%` }} />
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-5 flex flex-col justify-between">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{t('demo.pending_payout')}</p>
            <div>
              <p className="text-4xl font-heading font-bold text-emerald-600">€ {pendingEarnings}</p>
              <p className="text-xs text-muted-foreground mt-1">Due by 15 Apr 2026</p>
            </div>
            <div className="text-xs text-muted-foreground mt-2 bg-emerald-50 text-emerald-700 rounded-lg p-2">{t('demo.of_dutybooost_fee')}</div>
          </div>
          <div className="bg-card border border-border rounded-xl p-5">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-3">{t('demo.redemptions_by_airport')}</p>
            <ResponsiveContainer width="100%" height={120}>
              <PieChart>
                <Pie data={airportDist} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false} fontSize={10}>
                  {airportDist.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly chart */}
        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <p className="font-semibold">{period === "daily" ? t('demo.performance_daily') : period === "custom" ? t('demo.performance_custom') : t('demo.performance_monthly')}</p>
            <div className="flex gap-2">
              {[
                { label: t('demo.bookings'), color: "#dbeafe", active: showBookings, toggle: () => setShowBookings(v => !v) },
                { label: t('demo.redeemed'), color: "#2563eb", active: showRedeemed, toggle: () => setShowRedeemed(v => !v) },
              ].map(({ label, color, active, toggle }) => (
                <button key={label} onClick={toggle}
                  className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border transition-all ${
                    active ? "bg-card border-border font-semibold" : "bg-muted border-transparent text-muted-foreground"
                  }`}>
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: active ? color : "#d1d5db" }} />
                  {label}
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground w-full">{period === "daily" ? t('demo.last_7_days') : period === "custom" ? `${customStart} – ${customEnd}` : "Oct 2025 – Mar 2026"}</p>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={scaledMonthly}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey={dataKey} tick={{ fontSize: 12 }} />
              <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
              <Tooltip />
              {showBookings && <Bar yAxisId="left" dataKey="bookings" name="Bookings" fill="#dbeafe" radius={[4,4,0,0]} />}
              {showRedeemed && <Bar yAxisId="left" dataKey="redeemed" name="Redeemed" fill="#2563eb" radius={[4,4,0,0]} />}
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent vouchers */}
        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <p className="font-semibold">{t('demo.recent_dutycredits')}</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-3 text-xs text-muted-foreground font-medium">{t('demo.col_code')}</th>
                  <th className="text-left py-2 px-3 text-xs text-muted-foreground font-medium">{t('demo.col_traveler')}</th>
                  <th className="text-left py-2 px-3 text-xs text-muted-foreground font-medium">{t('demo.col_airport')}</th>
                  <th className="text-left py-2 px-3 text-xs text-muted-foreground font-medium">{t('demo.col_date')}</th>
                  <th className="text-left py-2 px-3 text-xs text-muted-foreground font-medium">{t('demo.col_status')}</th>
                  <th className="text-right py-2 px-3 text-xs text-muted-foreground font-medium">{t('demo.col_sale_value')}</th>
                </tr>
              </thead>
              <tbody>
                {recentVouchers.map(v => (
                  <tr key={v.code} className="border-b border-border last:border-0 hover:bg-muted/30">
                    <td className="py-2.5 px-3 font-mono text-xs">{v.code}</td>
                    <td className="py-2.5 px-3">{v.traveler}</td>
                    <td className="py-2.5 px-3 font-semibold text-primary">{v.airport}</td>
                    <td className="py-2.5 px-3 text-muted-foreground">{v.date}</td>
                    <td className="py-2.5 px-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                        v.status === "Redeemed" ? "bg-emerald-100 text-emerald-700" :
                        v.status === "Active" ? "bg-blue-100 text-blue-700" :
                        "bg-muted text-muted-foreground"
                      }`}>{v.status === 'Redeemed' ? t('demo.status_redeemed') : v.status === 'Active' ? t('demo.status_active') : t('demo.status_expired')}</span>
                    </td>
                    <td className="py-2.5 px-3 text-right font-medium">{v.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* How it works */}
        <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-6 space-y-4">
          <p className="font-semibold font-heading text-lg">{t('demo.how_revenue_share')}</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { step: "1", title: t('demo.rs_step1_title'), desc: t('demo.rs_step1_desc') },
              { step: "2", title: t('demo.rs_step2_title'), desc: t('demo.rs_step2_desc') },
              { step: "3", title: t('demo.rs_step3_title'), desc: t('demo.rs_step3_desc') },
              { step: "4", title: t('demo.rs_step4_title'), desc: t('demo.rs_step4_desc') },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center shrink-0">{step}</div>
                <div>
                  <p className="font-semibold text-sm">{title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <RedemptionHeatmap />
        </> )}
      </div>
    </div>
  );
}