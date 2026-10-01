import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Store, TrendingUp, Euro, ScanLine, Calendar, Star, LayoutDashboard, UserCircle, CreditCard, Settings, Info, Sparkles, Users } from "lucide-react";
import DemoProfileTab from "./DemoProfileTab";
import AggregationView from "./AggregationView";
import CountryAggregation from "./CountryAggregation";
import RedemptionHeatmap from "./RedemptionHeatmap";
import RedemptionRateSlider from "./RedemptionRateSlider";
import { base44 } from "@/api/base44Client";
import { RETAILER_COMPANY_PROFILES } from "@/data/retailerCompanyProfiles";
import DutyBoostLogo from "./DutyBoostLogo";
import DemoPill from "./DemoPill";
import LanguageSwitcher from "./LanguageSwitcher";
import { fmtNum, fmtMoney } from "../utils/formatNumber";
import { calcSaving } from "@/utils/retailerCalc";

const COLORS = ["#2563eb", "#f97316", "#10b981", "#8b5cf6", "#ec4899"];
const CAT_COLORS = { "Retail": "#2563eb" };

function calcPlatformFee(basket) {
  if (basket > 1000) return 0;
  return Math.min(Math.round(basket * 0.025 * 100) / 100, 25);
}

export default function DemoRetailerDashboardView({ AIRPORTS, RETAILERS, MONTHLY_DATA, DAILY_DATA, YEARLY_DATA, defaultAirport, region = "nl", companyKey, storeCount, currency = "EUR", logoUrl }) {
  const { t, i18n } = useTranslation();
  const companyName = companyKey ? RETAILER_COMPANY_PROFILES[companyKey]?.company : null;
  const [, setLanguage] = useState(i18n.language);
  const [selectedAirport, setSelectedAirport] = useState(defaultAirport);
  
  useEffect(() => {
    const handleLanguageChange = () => {
      setLanguage(i18n.language);
    };
    i18n.on('languageChanged', handleLanguageChange);
    return () => i18n.off('languageChanged', handleLanguageChange);
  }, [i18n]);
  const [selectedRetailer, setSelectedRetailer] = useState(RETAILERS[0]);
  const [selectedCountry, setSelectedCountry] = useState(() => {
    const ap = AIRPORTS.find(a => a.code === defaultAirport);
    return ap?.country || AIRPORTS[0]?.country || "Spain";
  });
  const [showRedemptions, setShowRedemptions] = useState(true);
  const [showRevenue, setShowRevenue] = useState(true);
  const [period, setPeriod] = useState("daily");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [customStart, setCustomStart] = useState("2025-10-01");
  const [customEnd, setCustomEnd] = useState("2026-03-31");
  const [redemptionRate, setRedemptionRate] = useState(0.01);
  const rateMultiplier = redemptionRate / 0.01;
  const cur = (v, d = 0) => fmtMoney(v, currency, d);
  const curLabel = currency === "AWG" ? "Afl." : currency === "USD" ? "$" : "€";
  const minDcValue = currency === "EUR" ? 20 : 23;

  const airportRetailers = RETAILERS.filter(r => r.airport === selectedAirport);
  const selectedAirportInfo = AIRPORTS.find(a => a.code === selectedAirport);
  const annualPax = selectedAirportInfo?.annual_pax || (selectedAirportInfo?.daily_pax ? selectedAirportInfo.daily_pax * 365 : 0);

  const countries = useMemo(() => [...new Set(AIRPORTS.map(a => a.country))].sort(), [AIRPORTS]);
  const airportsInCountry = useMemo(() => AIRPORTS.filter(a => a.country === selectedCountry), [AIRPORTS, selectedCountry]);

  const handleAirportChange = (code) => {
    setSelectedAirport(code);
    const ap = AIRPORTS.find(a => a.code === code);
    if (ap) setSelectedCountry(ap.country);
    const first = RETAILERS.find(r => r.airport === code);
    if (first) setSelectedRetailer(first);
  };

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    const firstAirport = AIRPORTS.find(a => a.country === country);
    if (firstAirport) handleAirportChange(firstAirport.code);
  };

  const basket = selectedRetailer.avg_sale;
  const savingPerTx = calcSaving(basket);
  const commissionPerTx = calcPlatformFee(basket);
  const netPerTx = Math.round((basket - savingPerTx - commissionPerTx) * 100) / 100;

  const totalRedemptions = RETAILERS.reduce((s, r) => s + r.redemptions, 0);
  const redemptionRatio = selectedRetailer.redemptions / totalRedemptions;

  const baseData = period === "daily" ? DAILY_DATA : period === "yearly" ? YEARLY_DATA : MONTHLY_DATA;
  const dataKey = period === "daily" ? "day" : "month";

  const scaledMonthly = baseData.map(m => {
    const redemptions = Math.round(m.redemptions * redemptionRatio * rateMultiplier);
    return {
      ...m,
      redemptions,
      revenue: Math.round(redemptions * netPerTx),
    };
  });

  const periodMultiplier = useMemo(() => {
    if (period === "daily") return 7 / 30;
    if (period === "yearly") return 12;
    if (period === "custom") {
      const days = Math.max(1, (new Date(customEnd) - new Date(customStart)) / 86400000);
      return days / 30;
    }
    return 1;
  }, [period, customStart, customEnd]);

  const periodRedemptions = Math.round(selectedRetailer.redemptions * periodMultiplier * rateMultiplier);
  const periodGrossRevenue = Math.round(periodRedemptions * basket);
  const periodSavings = Math.round(periodRedemptions * savingPerTx * 100) / 100;
  const periodFee = Math.round(periodRedemptions * commissionPerTx * 100) / 100;
  const periodNetRevenue = Math.round((periodGrossRevenue - periodSavings - periodFee) * 100) / 100;
  const periodAvg = basket;

  const catBreakdown = ["Retail"].map(cat => ({
    name: cat,
    value: airportRetailers.filter(r => r.category === cat).reduce((s, r) => s + r.redemptions, 0),
  })).filter(c => c.value > 0);

  const recentScans = useMemo(() => {
    const retailerId = selectedRetailer.id.replace(/\D/g, '') || '1000';
    const baseCodes = [4821, 4790, 4744, 4710, 4688];
    
    const generateTime = (daysAgo) => {
      if (daysAgo === 0) {
        const hour = Math.floor(Math.random() * 24);
        const min = Math.floor(Math.random() * 60);
        return `Today, ${String(hour).padStart(2, '0')}:${String(min).padStart(2, '0')}`;
      } else if (daysAgo === 1) {
        const hour = Math.floor(Math.random() * 24);
        const min = Math.floor(Math.random() * 60);
        return `Yesterday, ${String(hour).padStart(2, '0')}:${String(min).padStart(2, '0')}`;
      } else {
        const date = new Date();
        date.setDate(date.getDate() - daysAgo);
        return `${date.getDate()} ${["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][date.getMonth()]}, ${String(Math.floor(Math.random() * 24)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`;
      }
    };
    
    return baseCodes.map((code, i) => {
      const saleValue = 50 + Math.floor(Math.random() * 400);
      const saving = calcSaving(saleValue);
      const discountPct = saleValue > 0 ? Math.round((saving / saleValue) * 100) : 0;
      return {
        code: `DC-${selectedAirport}-${retailerId}${code}`,
        time: generateTime(i),
        discount: `${discountPct}%`,
        sale: cur(saleValue, 0),
        saved: cur(saving, 0)
      };
    });
  }, [selectedRetailer, selectedAirport]);

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="bg-card border-b border-border px-6 h-16 flex items-center justify-between gap-6 sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <DutyBoostLogo height={45} />
        </div>
        <div className="flex items-center gap-3">
          {activeTab === "custom" ? (
            <>
              <span className="text-xs font-semibold uppercase tracking-widest text-indigo-700 bg-indigo-100 px-3 py-1 rounded-full">{t('demo.tabs_aggregation')}</span>
              <span className="text-sm text-muted-foreground font-medium px-3 py-1.5 bg-muted rounded-lg">
                {countries.length} {t('demo.countries')} · {AIRPORTS.length} {t('demo.airports')} · {storeCount ?? RETAILERS.length} {t('demo.stores')}
              </span>
            </>
          ) : (
            <>
              <select
                className="text-sm border border-input rounded-lg px-3 py-1.5 bg-background"
                value={selectedCountry}
                onChange={e => handleCountryChange(e.target.value)}
              >
                {countries.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <select
                className="text-sm border border-input rounded-lg px-3 py-1.5 bg-background max-w-[220px]"
                value={selectedAirport}
                onChange={e => handleAirportChange(e.target.value)}
              >
                {countries.map(country => (
                  <optgroup key={country} label={country}>
                    {AIRPORTS.filter(a => a.country === country).map(a => (
                      <option key={a.code} value={a.code}>{a.name} ({a.code})</option>
                    ))}
                  </optgroup>
                ))}
              </select>
              <select
                className="text-sm border border-input rounded-lg px-3 py-1.5 bg-background"
                value={selectedRetailer.id}
                onChange={e => setSelectedRetailer(RETAILERS.find(r => r.id === e.target.value))}
              >
                {airportRetailers.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
              </select>
            </>
          )}
          <LanguageSwitcher />
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6 md:p-8 space-y-6">
        {companyName && (
          <div className="flex items-center gap-2 text-sm">
            <Store className="w-4 h-4 text-orange-500" />
            <span className="font-heading font-bold text-foreground">{companyName}</span>
            <DemoPill />
          </div>
        )}
        {/* Tabs */}
         <div className="flex gap-1 border-b border-border overflow-x-auto">
            {[{ id: "dashboard", label: t('demo.tabs_dashboard'), icon: LayoutDashboard }, { id: "custom", label: t('demo.tabs_aggregation'), icon: Settings }, { id: "profile", label: t('demo.tabs_profile'), icon: UserCircle }].map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => {
                setActiveTab(id);
                if (id === "custom") {
                  setPeriod("yearly");
                  setRedemptionRate(15);
                }
              }}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-all ${
                activeTab === id ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
              }`}>
              <Icon className="w-4 h-4" /> {label}
            </button>
          ))}
        </div>

        {activeTab === "profile" ? <DemoProfileTab key={companyKey} entity={selectedRetailer} entityType="retailer" region={region} retailers={RETAILERS} companyKey={companyKey} currency={currency} rateMultiplier={rateMultiplier} /> : activeTab === "custom" ? (
          <AggregationView 
            airports={AIRPORTS}
            companyName={companyName}
            transactions={RETAILERS.map(r => {
              const saving = calcSaving(r.avg_sale);
              const commission = calcPlatformFee(r.avg_sale);
              const scaledRevenue = Math.round(r.revenue * periodMultiplier * rateMultiplier);
              const scaledRedemptions = Math.round(r.redemptions * periodMultiplier * rateMultiplier);
              return {
                transaction_value: scaledRevenue,
                total_savings: Math.round(saving * scaledRedemptions),
                total_commission: Math.round(commission * scaledRedemptions),
                airport: r.airport,
                count: scaledRedemptions,
              };
            })}
            vouchers={RETAILERS}
            period={period}
            customStart={customStart}
            customEnd={customEnd}
            entityType="retailer"
            onPeriodChange={setPeriod}
            onCustomStartChange={setCustomStart}
            onCustomEndChange={setCustomEnd}
            redemptionRate={redemptionRate}
            onRedemptionRateChange={setRedemptionRate}
            currency={currency}
          />
        ) : (<>
        {/* Welcome */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-heading font-bold">{t('demo.title_retailer').replace('{name}', selectedRetailer.name)}</h1>
            <p className="text-muted-foreground text-sm mt-1">
              {AIRPORTS.find(a => a.code === selectedAirport)?.name} · {selectedRetailer.category}
            </p>
          </div>
          {logoUrl && (
            <img src={logoUrl} alt={companyName || "Partner logo"} className="h-[75px] w-auto object-contain shrink-0" />
          )}
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

        {/* Redemption rate slider */}
        <RedemptionRateSlider rate={redemptionRate} onChange={setRedemptionRate} />

        {/* KPI cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {/* Yearly passengers + redemption rate */}
          <div className="bg-card border border-border rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground font-medium">Yearly Passengers</p>
              <Users className="w-4 h-4 text-cyan-500" />
            </div>
            <p className="text-2xl font-heading font-bold">{fmtNum(annualPax)}</p>
          </div>
          {[
            { label: t('demo.total_redemptions'), value: fmtNum(periodRedemptions), icon: ScanLine, color: "text-blue-500" },
            { label: t('demo.net_revenue'), value: cur(periodNetRevenue, 0), icon: Euro, color: "text-orange-500" },
            { label: t('demo.min_dc_value'), value: cur(minDcValue, 2), icon: TrendingUp, color: "text-emerald-500" },
            { label: t('demo.platform_fee'), value: cur(periodFee, 0), icon: Store, color: "text-purple-500" },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-card border border-border rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground font-medium">{label}</p>
                <Icon className={`w-4 h-4 ${color}`} />
              </div>
              <p className="text-2xl font-heading font-bold">{value}</p>
            </div>
          ))}
          {/* DutyBoost Potential tile — Min. DC Value with uplift */}
          <div className="bg-card border border-border rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground font-medium">{t('demo.dutyboost_potential')}</p>
              <Sparkles className="w-4 h-4 text-indigo-500" />
            </div>
            <p className="text-lg md:text-2xl font-heading font-bold">
              {cur(minDcValue, 2)}
              <span className="text-muted-foreground text-sm font-normal mx-1">→</span>
              <span className="text-indigo-600">{cur(minDcValue * (1 + redemptionRate / 100), 2)}</span>
            </p>
          </div>
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
                {showRedemptions && <Bar yAxisId="left" dataKey="redemptions" name={t('demo.redemptions')} fill="#dbeafe" radius={[4,4,0,0]} />}
                {showRevenue && <Bar yAxisId="right" dataKey="revenue" name={`${t('demo.revenue')} (${curLabel})`} fill="#2563eb" radius={[4,4,0,0]} />}
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 space-y-4">
            <p className="font-semibold">{t('demo.revenue_breakdown')}</p>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">{t('demo.gross_sales')}</span>
                <span className="font-semibold">{cur(periodGrossRevenue, 0)}</span>
                </div>
                <div className="flex justify-between items-center text-rose-600">
                <span>{t('demo.traveler_savings_dc')}</span>
                <span className="font-semibold">- {cur(periodSavings, 0)}</span>
                </div>
                <div className="flex justify-between items-center text-destructive">
                <span>{t('demo.dutyboost_fee')}</span>
                <span className="font-semibold">- {cur(periodFee, 0)}</span>
                </div>
                <div className="border-t border-border pt-2 flex justify-between items-center">
                <span className="font-semibold">{t('demo.your_net_revenue')}</span>
                <span className="font-bold text-emerald-600">{cur(periodNetRevenue, 0)}</span>
              </div>
            </div>
            <div className="bg-blue-50 text-blue-700 rounded-lg p-3 text-xs">
              {t('demo.fee_note')}
            </div>
          </div>
        </div>

        {/* Country Aggregation */}
        <CountryAggregation
          AIRPORTS={AIRPORTS}
          RETAILERS={RETAILERS}
          periodMultiplier={periodMultiplier * rateMultiplier}
          selectedCountry={selectedCountry}
          onSelectCountry={handleCountryChange}
          currency={currency}
        />

        {/* Airport overview */}
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
                <p className="text-sm font-medium">{r.name}</p>
                <p className="text-sm font-semibold">{fmtNum(Math.round(r.redemptions * periodMultiplier * rateMultiplier))} {t('demo.scans')}</p>
              </div>
            ))}
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




        </> )}
      </div>
    </div>
  );
}