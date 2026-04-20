import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Store, TrendingUp, Euro, ScanLine, ArrowLeft, Calendar, Star, LayoutDashboard, UserCircle, LogOut, CreditCard, Settings } from "lucide-react";
import DemoProfileTab from "../components/DemoProfileTab";
import AggregationView from "../components/AggregationView";
import RedemptionHeatmap from "../components/RedemptionHeatmap";
import { base44 } from "@/api/base44Client";
import DutyBoostLogo from "../components/DutyBoostLogo";
import { RETAILERS, AIRPORTS, MONTHLY_DATA, DAILY_DATA, YEARLY_DATA } from "../data/demoData";

const COLORS = ["#2563eb", "#f97316", "#10b981", "#8b5cf6", "#ec4899"];
const CAT_COLORS = { "Retail": "#2563eb", "Food & Beverage": "#f97316" };

export default function DemoRetailerDashboard() {
  const { t } = useTranslation();
  const [selectedAirport, setSelectedAirport] = useState("AMS");
  const [selectedRetailer, setSelectedRetailer] = useState(RETAILERS[0]);
  const [showRedemptions, setShowRedemptions] = useState(true);
  const [showRevenue, setShowRevenue] = useState(true);
  const [period, setPeriod] = useState("monthly");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [customStart, setCustomStart] = useState("2025-10-01");
  const [customEnd, setCustomEnd] = useState("2026-03-31");

  const airportRetailers = RETAILERS.filter(r => r.airport === selectedAirport);

  const handleAirportChange = (code) => {
    setSelectedAirport(code);
    const first = RETAILERS.find(r => r.airport === code);
    if (first) setSelectedRetailer(first);
  };

  const platformFee = (selectedRetailer.revenue * 0.025).toFixed(2);
  const netRevenue = (selectedRetailer.revenue * 0.975).toFixed(2);
  const avgPerRedemption = (selectedRetailer.revenue / selectedRetailer.redemptions).toFixed(0);

  const totalRedemptions = RETAILERS.reduce((s, r) => s + r.redemptions, 0);
  const totalRevenue = RETAILERS.reduce((s, r) => s + r.revenue, 0);
  const redemptionRatio = selectedRetailer.redemptions / totalRedemptions;
  const revenueRatio = selectedRetailer.revenue / totalRevenue;

  const baseData = period === "daily" ? DAILY_DATA : period === "yearly" ? YEARLY_DATA : MONTHLY_DATA;
  const dataKey = period === "daily" ? "day" : "month";

  const scaledMonthly = baseData.map(m => ({
    ...m,
    redemptions: Math.round(m.redemptions * redemptionRatio),
    revenue: Math.round(m.revenue * revenueRatio),
  }));

  const periodMultiplier = useMemo(() => {
    if (period === "daily") return 7 / (MONTHLY_DATA.length * 30);
    if (period === "yearly") return 2;
    if (period === "custom") {
      const days = Math.max(1, (new Date(customEnd) - new Date(customStart)) / 86400000);
      return days / (MONTHLY_DATA.length * 30);
    }
    return 1;
  }, [period, customStart, customEnd]);

  const periodRedemptions = Math.round(selectedRetailer.redemptions * periodMultiplier);
  const periodRevenue = Math.round(selectedRetailer.revenue * periodMultiplier);
  const periodFee = (periodRevenue * 0.025).toFixed(2);
  const periodNetRevenue = (periodRevenue * 0.975).toFixed(2);
  const periodAvg = periodRedemptions > 0 ? (periodRevenue / periodRedemptions).toFixed(0) : avgPerRedemption;

  const catBreakdown = ["Retail", "Food & Beverage"].map(cat => ({
    name: cat,
    value: airportRetailers.filter(r => r.category === cat).reduce((s, r) => s + r.redemptions, 0),
  })).filter(c => c.value > 0);

  // Tiered: €50–€99 → 10%, €100–€299 → 15%, €300+ → 20% (cap €25)
  const recentScans = [
    { code: "DC-AMS-4821", time: "Today, 14:32",      discount: "15%", sale: "€ 214", saved: "€ 25" },
    { code: "DC-AMS-4790", time: "Today, 11:08",      discount: "20%", sale: "€ 340", saved: "€ 25" },
    { code: "DC-AMS-4744", time: "Yesterday, 17:45",  discount: "15%", sale: "€ 175", saved: "€ 25" },
    { code: "DC-AMS-4710", time: "Yesterday, 09:12",  discount: "20%", sale: "€ 420", saved: "€ 25" },
    { code: "DC-AMS-4688", time: "2 Apr, 16:20",      discount: "10%", sale: "€ 98",  saved: "€ 10" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="bg-card border-b border-border px-6 h-16 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <Link to="/demo" className="text-muted-foreground hover:text-foreground flex items-center gap-1 text-sm">
            <ArrowLeft className="w-4 h-4" /> {t('demo.demo_home')}
          </Link>
          <span className="text-border">|</span>
          <DutyBoostLogo height={110} />
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground bg-muted px-3 py-1 rounded-full">{t('demo.retailer_badge')}</span>
          <select
            className="text-sm border border-input rounded-lg px-3 py-1.5 bg-background"
            value={selectedAirport}
            onChange={e => handleAirportChange(e.target.value)}
          >
            {AIRPORTS.map(a => <option key={a.code} value={a.code}>{a.name}</option>)}
          </select>
          <select
            className="text-sm border border-input rounded-lg px-3 py-1.5 bg-background"
            value={selectedRetailer.id}
            onChange={e => setSelectedRetailer(RETAILERS.find(r => r.id === e.target.value))}
          >
            {airportRetailers.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
          </select>
          <button onClick={() => base44.auth.logout('/')} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-destructive transition-colors border border-input rounded-lg px-3 py-1.5 bg-background hover:bg-destructive/5">
            <LogOut className="w-4 h-4" /> {t('demo.logout')}
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6 md:p-8 space-y-6">
        {/* Tabs */}
         <div className="flex gap-1 border-b border-border overflow-x-auto">
            {[{ id: "dashboard", label: t('demo.tabs_dashboard'), icon: LayoutDashboard }, { id: "custom", label: "Aggregation", icon: Settings }, { id: "profile", label: t('demo.tabs_profile'), icon: UserCircle }, { id: "scan", label: t('demo.tabs_scan'), icon: ScanLine }].map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-all ${
                activeTab === id ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
              }`}>
              <Icon className="w-4 h-4" /> {label}
            </button>
          ))}
        </div>

        {activeTab === "profile" ? <DemoProfileTab entity={selectedRetailer} entityType="retailer" /> : activeTab === "custom" ? (
          <AggregationView 
            transactions={RETAILERS.flatMap(r => 
              Array(r.redemptions).fill(null).map(() => ({ 
                transaction_value: r.avg_sale,
                discount_applied: 15,
                airport: r.airport
              }))
            )}
            vouchers={RETAILERS}
            period={period}
            entityType="retailer"
            onPeriodChange={setPeriod}
          />
        ) : activeTab === "scan" ? (
          <div className="space-y-4">
            <p className="text-muted-foreground text-sm">{t('demo.scan_desc')}</p>
            <Link to="/retailer-scan-only" target="_blank" className="inline-block bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-all">{t('demo.open_scan')}</Link>
          </div>
        ) : (<>
        {/* Welcome */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-heading font-bold">{selectedRetailer.name}</h1>
            <p className="text-muted-foreground text-sm mt-1">
              {AIRPORTS.find(a => a.code === selectedAirport)?.name} · {selectedRetailer.category}
            </p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">{t('demo.active_partner')}</span>
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
            { label: t('demo.total_redemptions'), value: periodRedemptions.toLocaleString(), icon: ScanLine, color: "text-blue-500" },
            { label: t('demo.gross_revenue'), value: `€ ${periodRevenue.toLocaleString("nl-NL")}`, icon: Euro, color: "text-orange-500" },
            { label: t('demo.avg_sale'), value: `€ ${periodAvg}`, icon: TrendingUp, color: "text-emerald-500" },
            { label: t('demo.platform_fee'), value: `€ ${parseFloat(periodFee).toLocaleString("nl-NL")}`, icon: Store, color: "text-purple-500" },
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

        {/* Net vs fee breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 bg-card border border-border rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <p className="font-semibold">{period === "daily" ? t('demo.daily_rd') : period === "custom" ? t('demo.performance_custom') : t('demo.monthly_rd')}</p>
              <div className="flex gap-2">
                {[
                  { key: "redemptions", label: t('demo.redemptions'), color: "#dbeafe", active: showRedemptions, toggle: () => setShowRedemptions(v => !v) },
                  { key: "revenue", label: t('demo.revenue'), color: "#2563eb", active: showRevenue, toggle: () => setShowRevenue(v => !v) },
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
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={scaledMonthly}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey={dataKey} tick={{ fontSize: 12 }} />
                <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
                <Tooltip />
                {showRedemptions && <Bar yAxisId="left" dataKey="redemptions" name="Redemptions" fill="#dbeafe" radius={[4,4,0,0]} />}
                {showRevenue && <Bar yAxisId="right" dataKey="revenue" name="Revenue (€)" fill="#2563eb" radius={[4,4,0,0]} />}
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 space-y-4">
            <p className="font-semibold">{t('demo.revenue_breakdown')}</p>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">{t('demo.gross_sales')}</span>
                <span className="font-semibold">€ {periodRevenue.toLocaleString("nl-NL")}</span>
              </div>
              <div className="flex justify-between items-center text-destructive">
                <span>DutyBoost fee (2.5%)</span>
                <span className="font-semibold">- € {parseFloat(periodFee).toLocaleString("nl-NL")}</span>
              </div>
              <div className="border-t border-border pt-2 flex justify-between items-center">
                <span className="font-semibold">{t('demo.your_net_revenue')}</span>
                <span className="font-bold text-emerald-600">€ {parseFloat(periodNetRevenue).toLocaleString("nl-NL")}</span>
              </div>
            </div>
            <div className="bg-blue-50 text-blue-700 rounded-lg p-3 text-xs">
              {t('demo.fee_note')}
            </div>
          </div>
        </div>

        {/* Airport overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card border border-border rounded-xl p-6 space-y-4">
            <p className="font-semibold">{t('demo.all_stores_at')} {AIRPORTS.find(a => a.code === selectedAirport)?.name}</p>
            <div className="overflow-y-auto max-h-64 space-y-2">
              {airportRetailers.map(r => (
                <div
                  key={r.id}
                  onClick={() => setSelectedRetailer(r)}
                  className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all ${
                    r.id === selectedRetailer.id ? "bg-primary/10 border border-primary/30" : "hover:bg-muted/40"
                  }`}
                >
                  <div>
                    <p className="text-sm font-medium">{r.name}</p>
                    <p className="text-xs text-muted-foreground">{r.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">{r.redemptions} {t('demo.scans')}</p>
                    <p className="text-xs text-muted-foreground">€ {r.avg_sale} {t('demo.avg_sale_label')}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 space-y-4">
            <p className="font-semibold">{t('demo.redemptions_by_category')} {selectedAirport}</p>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={catBreakdown} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={75} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} fontSize={11}>
                  {catBreakdown.map((c, i) => <Cell key={i} fill={CAT_COLORS[c.name] || COLORS[i]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent scans */}
        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <p className="font-semibold">{t('demo.recent_scans')} — {selectedRetailer.name}</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-3 text-xs text-muted-foreground font-medium">{t('demo.col_code')}</th>
                  <th className="text-left py-2 px-3 text-xs text-muted-foreground font-medium">{t('demo.col_scanned')}</th>
                  <th className="text-left py-2 px-3 text-xs text-muted-foreground font-medium">{t('demo.col_discount')}</th>
                  <th className="text-right py-2 px-3 text-xs text-muted-foreground font-medium">{t('demo.col_sale_value')}</th>
                  <th className="text-right py-2 px-3 text-xs text-muted-foreground font-medium">{t('demo.col_traveler_saved')}</th>
                </tr>
              </thead>
              <tbody>
                {recentScans.map(s => (
                  <tr key={s.code} className="border-b border-border last:border-0 hover:bg-muted/30">
                    <td className="py-2.5 px-3 font-mono text-xs">{s.code}</td>
                    <td className="py-2.5 px-3 text-muted-foreground">{s.time}</td>
                    <td className="py-2.5 px-3 font-semibold text-orange-600">{s.discount}</td>
                    <td className="py-2.5 px-3 text-right font-semibold">{s.sale}</td>
                    <td className="py-2.5 px-3 text-right text-emerald-600 font-medium">{s.saved}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Traveler Ratings */}
        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <p className="font-semibold">{t('demo.traveler_ratings')} — {selectedRetailer.name}</p>
          <div className="flex items-center gap-6 flex-wrap">
            <div className="text-center">
              <p className="text-5xl font-heading font-bold">4.4</p>
              <div className="flex gap-0.5 justify-center mt-1">
                {[1,2,3,4,5].map(s => (
                  <Star key={s} className={`w-5 h-5 ${s <= 4 ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground'}`} />
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-1">87 {t('demo.reviews')}</p>
            </div>
            <div className="flex-1 space-y-1.5 min-w-[160px]">
              {[{star:5,count:41},{star:4,count:28},{star:3,count:11},{star:2,count:5},{star:1,count:2}].map(({ star, count }) => (
                <div key={star} className="flex items-center gap-2 text-xs">
                  <span className="w-3 text-right text-muted-foreground">{star}</span>
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                    <div className="h-2 bg-amber-400 rounded-full" style={{ width: `${(count/87)*100}%` }} />
                  </div>
                  <span className="text-muted-foreground w-5 text-right">{count}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-2 pt-2 border-t border-border">
            <p className="text-sm font-medium">{t('demo.recent_comments')}</p>
            {[
              { rating: 5, comment: "Excellent service! The staff was very helpful and the discount process was seamless." },
              { rating: 4, comment: "Good experience overall. Quick scan and friendly staff." },
              { rating: 3, comment: "It was fine. Took a bit longer than expected to process the DutyCredit." },
            ].map((f, i) => (
              <div key={i} className="bg-muted/40 rounded-lg p-3 text-sm">
                <div className="flex gap-0.5 mb-1">
                  {[1,2,3,4,5].map(s => <Star key={s} className={`w-3 h-3 ${s <= f.rating ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground'}`} />)}
                </div>
                <p className="text-muted-foreground">{f.comment}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 border border-orange-200 rounded-xl p-6 space-y-4">
          <p className="font-semibold font-heading text-lg">{t('demo.how_redemption_works')}</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { step: "1", title: t('demo.rw_step1_title'), desc: t('demo.rw_step1_desc') },
              { step: "2", title: t('demo.rw_step2_title'), desc: t('demo.rw_step2_desc') },
              { step: "3", title: t('demo.rw_step3_title'), desc: t('demo.rw_step3_desc') },
              { step: "4", title: t('demo.rw_step4_title'), desc: t('demo.rw_step4_desc') },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-500 text-white text-sm font-bold flex items-center justify-center shrink-0">{step}</div>
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