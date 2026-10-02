import { useState, useEffect, useMemo } from "react";
import { base44 } from "@/api/base44Client";
import StatsCard from "../components/StatsCard";
import { Store, TicketPercent, CreditCard, TrendingUp, Plus, Trash2, AlertTriangle, Calendar, Star, LayoutDashboard, UserCircle, BookOpen, ArrowRight, QrCode, ShieldCheck, Monitor, BarChart as BarChartIcon, RotateCcw, Info, ScanLine, LineChart as LineChartIcon, Coins, Wallet } from "lucide-react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ProfileTab from "../components/ProfileTab";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
} from "recharts";
import RetailerInvoiceDownload from "../components/RetailerInvoiceDownload";
import RetailerStrategyTab from "../components/RetailerStrategyTab";
import PartialRefundManager from "../components/PartialRefundManager";
import AggregationView from "../components/AggregationView";
import RedemptionRateSlider from "../components/RedemptionRateSlider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import DemoProfileTab from "../components/DemoProfileTab";
import DemoDashboardBar from "../components/DemoDashboardBar";
import { buildDemoAccount, RETAILER_DASHBOARD_COMPANIES, DEFAULT_RETAILER_COMPANY } from "../data/retailerDashboardCompanies";
import { STORE_CATEGORIES } from "../data/storeCategories";
import { PERIOD_OPTIONS } from "../data/dashboardPeriods";
import { fmtMoney, fmtCurrencyNative } from "../utils/formatNumber";

export default function RetailerDashboard() {
  const [retailers, setRetailers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [vouchers, setVouchers] = useState([]);
  const [airports, setAirports] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ store_name: "", airport: "", category: "Duty Free", description: "" });

  const [overdueInvoice, setOverdueInvoice] = useState(null);
  const [feedback, setFeedback] = useState([]);
  const [user, setUser] = useState(null);
  const [demoMode, setDemoMode] = useState(false);
  const [demoAccount, setDemoAccount] = useState(null);
  const { company: companySlug } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  // A demo link (a company in the URL, or ?demo=1) always shows the representative
  // data set — including while signed in, so the demo looks the same in the editor
  // preview as it does on the published public link.
  const demoRequested = Boolean(companySlug) || searchParams.get("demo") === "1";
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [period, setPeriod] = useState("monthly");
  const [customStart, setCustomStart] = useState(() => { const d = new Date(); d.setDate(d.getDate() - 30); return d.toISOString().split("T")[0]; });
  const [customEnd, setCustomEnd] = useState(() => new Date().toISOString().split("T")[0]);
  // Demo only: which airport and store the figures are shown for
  const [demoAirport, setDemoAirport] = useState("");
  const [demoStoreId, setDemoStoreId] = useState("all");
  const [redemptionRate, setRedemptionRate] = useState(0);

  const loadData = async () => {
    const u = await base44.auth.me();
    
    // Merge SignupApplication data into user object
    try {
      const apps = await base44.entities.SignupApplication.filter({ email: u.email });
      if (apps && apps.length > 0) {
        const app = apps[0];
        if (app.card_name) u.card_name = app.card_name;
        if (app.card_number) u.card_number = app.card_number;
        if (app.card_expiry) u.card_expiry = app.card_expiry;
        if (app.bank_account_name) u.bank_account_name = app.bank_account_name;
        if (app.bank_iban) u.bank_iban = app.bank_iban;
      }
    } catch (e) {
      // SignupApplication not available
    }
    
    setUser(u);
    
    const aps = await base44.entities.Airport.list();
    const rets = await base44.entities.Retailer.filter({ owner_email: u.email });
    const invoices = await base44.entities.MonthlyInvoice.filter({ retailer_email: u.email, status: 'overdue' });
    const fb = await base44.entities.RetailerFeedback.list();
    
    setAirports(aps);
    setRetailers(rets);
    const storeNames = rets.map(r => r.store_name);
    // Use live Transaction records for accurate real-time stats
    const rawTxns = storeNames.length > 0
      ? await base44.entities.Transaction.filter({ store_name: { $in: storeNames } }, '-created_date', 500)
      : [];
    setTransactions(rawTxns);
    const retailerAirports = rets.map(r => r.airport);
    const vchs = await base44.entities.Voucher.filter({ airport: { $in: retailerAirports }, status: 'active' });
    setVouchers(vchs);
    setOverdueInvoice(invoices.length > 0 ? invoices[0] : null);
    setFeedback(fb.filter(f => retailerAirports.includes(f.airport)));
  };

  useEffect(() => {
    const initLoad = async () => {
      if (demoRequested) {
        // Demo link — never load live records, even when signed in
        try { setUser(await base44.auth.me()); } catch (err) { setUser(null); }
        setDemoMode(true);
        return;
      }
      try {
        const currentUser = await base44.auth.me();
        setUser(currentUser);
        if (currentUser) {
          loadData();
        } else {
          setDemoMode(true);
        }
      } catch (err) {
        // Not signed in — show the demo dashboard instead of the live account
        setDemoMode(true);
      }
    };
    initLoad();
  }, [demoRequested]);

  // Public (shared) link: fill the dashboard from the selected company's data set
  useEffect(() => {
    if (!demoMode) return;
    const acc = buildDemoAccount(companySlug);
    setDemoAccount(acc);
    setAirports(acc.airports);
    setRetailers(acc.stores);
    setTransactions(acc.transactions);
    setDemoAirport("");
    setDemoStoreId("all");

    // DutyCredits are never pre-filled in the demo: only the real ones generated
    // for these airports (the claim flow stores "<CODE> — <city>") are listed.
    setVouchers([]);
    const codes = acc.airports.map(a => a.code);
    // A generated DutyCredit carries "<CODE> — <city>"; store it under the airport code.
    const normalize = v => {
      const code = codes.find(c => (v?.airport || "").toUpperCase().startsWith(c));
      return code ? { ...v, airport: code } : null;
    };
    let cancelled = false;
    let unsubscribe = () => {};
    try {
      base44.entities.Voucher.filter({ status: "active" }, "-created_date", 100)
        .then(live => { if (!cancelled) setVouchers(live.map(normalize).filter(Boolean)); });
      unsubscribe = base44.entities.Voucher.subscribe(event => {
        const credit = event.type === "create" ? normalize(event.data) : null;
        if (credit) setVouchers(prev => [credit, ...prev.filter(v => v.id !== credit.id)]);
      });
    } catch (e) {
      // Public demo — no live DutyCredits to load
    }
    return () => { cancelled = true; unsubscribe(); };
  }, [demoMode, companySlug]);

  useEffect(() => {
    const lang = searchParams.get("lang");
    if (lang) i18n.changeLanguage(lang);
  }, [searchParams, i18n]);

  // Demo only: the selected airport or store scopes the figures shown.
  const selectedStore = useMemo(
    () => retailers.find(r => r.id === demoStoreId) || null,
    [retailers, demoStoreId]
  );
  const scopeAirport = selectedStore?.airport || demoAirport;
  const scopedTransactions = useMemo(() => {
    if (!demoMode || !scopeAirport) return transactions;
    return transactions.filter(t =>
      t.airport === scopeAirport &&
      (!selectedStore || t.store_name === selectedStore.store_name)
    );
  }, [demoMode, transactions, scopeAirport, selectedStore]);
  const scopedVouchers = useMemo(
    () => (demoMode && scopeAirport
      ? vouchers.filter(v => (v.airport || "").toUpperCase().startsWith(scopeAirport.toUpperCase()))
      : vouchers),
    [demoMode, vouchers, scopeAirport]
  );

  const handleCreateStore = async (e) => {
    e.preventDefault();
    if (demoMode) {
      // Shared demo — the store is added for this session only
      const newStore = { id: `demo-${Date.now()}`, ...form, accepts_vouchers: true };
      setRetailers(prev => [newStore, ...prev]);
      toast.success("Store added (demo)");
      setDialogOpen(false);
      setForm({ store_name: "", airport: "", category: "Duty Free", description: "" });
      return;
    }
    const user = await base44.auth.me();
    await base44.entities.Retailer.create({ ...form, owner_email: user.email, accepts_vouchers: true });
    toast.success("Store created!");
    setDialogOpen(false);
    setForm({ store_name: "", airport: "", category: "Duty Free", description: "" });
    loadData();
  };

  const handleDeleteStore = async (store) => {
    if (demoMode) {
      setRetailers(prev => prev.filter(r => r.id !== store.id));
      return;
    }
    await base44.entities.Retailer.delete(store.id);
    toast.success("Store removed");
    loadData();
  };

  const { startDate, endDate } = useMemo(() => {
    const now = new Date();
    const today = now.toISOString().split("T")[0];
    const back = (days) => {
      const s = new Date(now); s.setDate(s.getDate() - days);
      return s.toISOString().split("T")[0];
    };
    if (period === "daily") return { startDate: today, endDate: today };
    if (period === "weekly") return { startDate: back(7), endDate: today };
    if (period === "monthly") return { startDate: back(30), endDate: today };
    if (period === "yearly") return { startDate: back(365), endDate: today };
    return { startDate: customStart, endDate: customEnd };
  }, [period, customStart, customEnd]);

  const inPeriod = (t) => {
    const d = t.date || (t.created_date || "").split("T")[0];
    return d >= startDate && d <= endDate;
  };

  // The Estimated Redemption Rate slider scales the figures shown: 0% shows nothing,
  // and every figure on the dashboard rises from there as the slider moves.
  const rateMultiplier = redemptionRate / 0.01;
  // Each transaction keeps its value per redemption, and the totals are rebuilt from the
  // redemption count that is actually shown — so Revenue Generated and Actual DC Value
  // always tie back exactly to Total Redemptions, with no rounding drift.
  const filteredTransactions = useMemo(() => {
    const inPeriodTx = scopedTransactions.filter(inPeriod);
    return inPeriodTx.map(t => {
      const baseCount = t.count || 1;
      const count = rateMultiplier === 1 ? baseCount : Math.round(baseCount * rateMultiplier);
      const perRedemption = (v) => (v || 0) / baseCount;
      return {
        ...t,
        count,
        transaction_value: count * perRedemption(t.transaction_value),
        platform_revenue: count * perRedemption(t.platform_revenue),
        credit_value: count * perRedemption(t.credit_value ?? t.transaction_value),
      };
    });
  }, [scopedTransactions, startDate, endDate, rateMultiplier]);
  // Custom Aggregation always covers the whole network, not just the selected store
  const networkTransactions = useMemo(
    () => transactions.filter(inPeriod),
    [transactions, startDate, endDate]
  );

  // Daily transaction counts over the last 30 days — independent of the period selector,
  // so partners can always see the recent day-to-day fluctuation.
  const last30DaysData = useMemo(() => {
    const days = Array.from({ length: 30 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (29 - i));
      return d.toISOString().split("T")[0];
    });
    const byDay = {};
    scopedTransactions.forEach(t => {
      const day = t.date || (t.created_date || "").split("T")[0];
      byDay[day] = (byDay[day] || 0) + (t.count || 1) * rateMultiplier;
    });
    return days.map(d => ({ date: d.slice(5), count: Math.round(byDay[d] || 0) }));
  }, [scopedTransactions, rateMultiplier]);

  const totalRedemptions = useMemo(() =>
    filteredTransactions.reduce((s, t) => s + (t.count ?? 1), 0),
    [filteredTransactions]
  );

  // Total value of DutyCredits actually redeemed in the period, and the average
  // value per redemption.
  const actualDcValue = filteredTransactions.reduce((s, t) => s + (t.credit_value ?? t.transaction_value ?? 0), 0);
  const averageDcValue = totalRedemptions > 0 ? actualDcValue / totalRedemptions : 0;

  const totalRevenue = filteredTransactions.reduce((s, t) => s + (t.transaction_value || 0), 0);
  const dutyBoostFee = filteredTransactions.reduce((s, t) => s + (t.platform_revenue || 0), 0);
  const periodDays = period === "daily" ? 1 : period === "weekly" ? 7 : period === "monthly" ? 30 : period === "yearly" ? 365 : Math.max(1, Math.round((new Date(customEnd) - new Date(customStart)) / 86400000));
  const revenuePerDay = totalRevenue / periodDays;

  // Transaction volume for selected period
  const displayDayCount = Math.min(30, Math.max(1, Math.round((new Date(endDate) - new Date(startDate)) / 86400000)) + 1);
  const last30 = Array.from({ length: displayDayCount }, (_, i) => {
    const d = new Date(endDate);
    d.setDate(d.getDate() - (displayDayCount - 1 - i));
    return d.toISOString().split("T")[0];
  });
  const txByDay = {};
  filteredTransactions.forEach(t => {
    const day = (t.created_date || "").split("T")[0];
    if (!txByDay[day]) txByDay[day] = { date: day, volume: 0, fee: 0 };
    txByDay[day].volume += t.transaction_value || 0;
    txByDay[day].fee += t.platform_revenue || 0;
  });
  const dailyData = last30.map(d => ({
    date: d.slice(5),
    volume: Math.round(txByDay[d]?.volume || 0),
    fee: parseFloat((txByDay[d]?.fee || 0).toFixed(2)),
  }));

  // Revenue per store
  const storeRevMap = {};
  filteredTransactions.forEach(t => {
    storeRevMap[t.store_name] = (storeRevMap[t.store_name] || 0) + (t.transaction_value || 0);
  });
  const storeData = Object.entries(storeRevMap).map(([store, revenue]) => ({ store, revenue: Math.round(revenue) }));

  if (overdueInvoice) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="max-w-md w-full text-center space-y-6 p-8 bg-card border border-destructive/30 rounded-2xl">
          <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
            <AlertTriangle className="w-8 h-8 text-destructive" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-heading font-bold text-destructive">Account Suspended</h2>
            <p className="text-muted-foreground text-sm">
              Your account has been suspended due to an unpaid invoice.
            </p>
          </div>
          <div className="bg-muted rounded-xl p-4 text-sm text-left space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Invoice period</span>
              <span className="font-medium">{overdueInvoice.month_year}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Amount due</span>
              <span className="font-bold text-destructive">€ {overdueInvoice.amount?.toLocaleString("nl-NL", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Due date</span>
              <span className="font-medium">{overdueInvoice.due_date}</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Please contact <a href="mailto:hello@dutyboost.com" className="text-primary underline">hello@dutyboost.com</a> to settle your invoice and restore access.
          </p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "custom", label: "Aggregation", icon: BarChartIcon },
    ...(demoMode ? [] : [{ id: "refunds", label: "Returns & Refunds", icon: RotateCcw }]),
    { id: "implementation", label: "Implementation Guide", icon: BookOpen },
    { id: "profile", label: "Profile & Billing", icon: UserCircle },
  ];

  // The demo lists all stores of the selected company by default.
  const listedStores = retailers;
  const currency = demoAccount?.company.currency || "EUR";
  const money = (value, decimals = 0) => fmtMoney(value, currency, decimals);
  // Minimum DutyCredit value — a market price point, not an FX conversion: €20 in Europe, $23 in USD markets.
  const minDcValue = currency === "EUR" ? 20 : 23;

  return (
    <div className={demoMode ? "max-w-7xl mx-auto p-6 md:p-8 space-y-6" : "space-y-6"}>
      {demoMode && demoAccount && (
        <DemoDashboardBar
          companies={RETAILER_DASHBOARD_COMPANIES}
          companySlug={companySlug || DEFAULT_RETAILER_COMPANY}
          company={demoAccount.company}
          onCompanyChange={slug => navigate(`/retailer-dashboard/${slug}`)}
          airports={airports}
          stores={retailers}
          airport={demoAirport}
          onAirportChange={value => { setDemoAirport(value); setDemoStoreId("all"); }}
          storeId={demoStoreId}
          onStoreChange={setDemoStoreId}
          logoUrl={demoAccount.company.logoUrl}
        />
      )}

      {/* Tab bar */}
      <div className="flex gap-1 border-b border-border overflow-x-auto">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button key={id} onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-all shrink-0 whitespace-nowrap ${
              activeTab === id ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
            }`}>
            <Icon className="w-4 h-4" /> {label}
          </button>
        ))}
      </div>

      {!demoMode && retailers.length === 0 && (
        <div className="flex items-start gap-3 bg-primary/5 border border-primary/20 rounded-xl p-4 text-sm">
          <Info className="w-4 h-4 text-primary mt-0.5 shrink-0" />
          <p className="text-muted-foreground">
            No Airport Retailer record is linked to your account yet. Your DutyBoost partner manager links your
            company when the agreement is signed — the figures below cover the whole network until then.
          </p>
        </div>
      )}

      {activeTab === "profile" ? (
        demoMode && demoAccount ? (
          <DemoProfileTab
            entity={demoAccount.retailers[0]}
            entityType="retailer"
            region={demoAccount.company.region}
            retailers={demoAccount.retailers}
            companyKey={demoAccount.company.companyKey}
            currency={demoAccount.company.currency}
          />
        ) : (
          <ProfileTab user={user} onUserUpdate={setUser} showBankDetails={false} invoiceHeading="Invoice History" invoiceComponent={<RetailerInvoiceDownload transactions={transactions} retailers={retailers} user={user} />} />
        )
      ) : activeTab === "custom" ? (
        <AggregationView
          transactions={networkTransactions}
          vouchers={vouchers}
          period={period}
          customStart={customStart}
          customEnd={customEnd}
          entityType="retailer"
          airports={airports}
          currency={currency}
          periodOptions={PERIOD_OPTIONS}
          onPeriodChange={setPeriod}
          onCustomStartChange={setCustomStart}
          onCustomEndChange={setCustomEnd}
          redemptionRate={redemptionRate}
          onRedemptionRateChange={setRedemptionRate}
        />
      ) : activeTab === "implementation" ? (
        <div className="max-w-2xl space-y-8 py-4">
          <div className="space-y-2">
            <h1 className="text-2xl font-heading font-bold">Implementation Guide</h1>
            <p className="text-muted-foreground">Everything your technical team needs to integrate DutyBoost into your POS system — so that DutyCredit vouchers can be validated and redeemed at your till automatically.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { icon: QrCode, title: 'Two API calls', desc: 'Validate on scan, then confirm redemption at checkout. Simple and reliable.' },
              { icon: Monitor, title: '1–2 day setup', desc: 'Works with any POS system. Full code examples in JS and Python.' },
              { icon: ShieldCheck, title: 'Monthly invoicing', desc: 'Transactions are logged automatically. You receive one invoice per month for platform fees.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-card border border-border rounded-xl p-4 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center"><Icon className="w-4 h-4 text-primary" /></div>
                <p className="font-semibold text-sm">{title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 space-y-4">
            <p className="text-sm text-muted-foreground">The full guide covers: three integration options (API / tablet / manual), validate & redeem API reference, full POS code examples, offline fallback handling, billing & reconciliation, webhook setup, and a testing checklist.</p>
            <Link to="/retailer-integration-guide">
              <button className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors">
                Open Full Implementation Guide <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
          <div className="bg-card border border-border rounded-xl p-4 text-sm">
            <p className="font-semibold mb-1">Need help?</p>
            <p className="text-muted-foreground">Contact our integration team at <a href="mailto:integrations@dutyboost.com" className="text-primary underline">integrations@dutyboost.com</a> — we can assist with POS setup, provide sandbox credentials, or connect you with your POS vendor's developer.</p>
          </div>
        </div>
      ) : activeTab === "refunds" ? (
        <PartialRefundManager transactions={transactions} onRefundProcessed={loadData} />
      ) : activeTab === "strategy" ? (
        <RetailerStrategyTab vouchers={vouchers} user={user} />
      ) : (<>
      <div className="flex items-center gap-2 flex-wrap mb-2">
        <Calendar className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground font-medium">{t('demo.period')}</span>
        {PERIOD_OPTIONS.map(({ value, labelKey }) => (
          <button key={value} onClick={() => setPeriod(value)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
              period === value ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:border-primary/50"
            }`}>{t(labelKey)}
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

      <RedemptionRateSlider rate={redemptionRate} onChange={setRedemptionRate} />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-heading font-bold tracking-tight">Airport Retailer Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage your stores and view DutyCredit activity.</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 w-full sm:w-auto"><Plus className="w-4 h-4" /> Add Store</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Add New Store</DialogTitle></DialogHeader>
            <form onSubmit={handleCreateStore} className="space-y-4">
              <div className="space-y-2">
                <Label>Store Name</Label>
                <Input value={form.store_name} onChange={e => setForm({...form, store_name: e.target.value})} required />
              </div>
              <div className="space-y-2">
                <Label>Airport</Label>
                <Select value={form.airport} onValueChange={v => setForm({...form, airport: v})}>
                  <SelectTrigger><SelectValue placeholder="Select airport" /></SelectTrigger>
                  <SelectContent>
                    {airports.map(a => (
                      <SelectItem key={a.id} value={`${a.code} - ${a.name}`}>{a.code} — {a.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={form.category} onValueChange={v => setForm({...form, category: v})}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {STORE_CATEGORIES.map(c => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Description (optional)</Label>
                <Input
                  value={form.description}
                  onChange={e => setForm({...form, description: e.target.value})}
                  placeholder="e.g. Fashion & accessories — Terminal 1, departures"
                />
              </div>
              <Button type="submit" className="w-full">Create Store</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
         <StatsCard title="My Stores" value={listedStores.length} icon={Store} />
         <StatsCard title="Total Redemptions" value={totalRedemptions.toLocaleString("de-DE")} icon={ScanLine} />
        <StatsCard title="Min. DC Value" value={fmtCurrencyNative(minDcValue, currency, 0)} icon={LineChartIcon} />
        <StatsCard title="Average DC Value" value={fmtCurrencyNative(averageDcValue, currency, 0)} icon={Coins} />
        <StatsCard
          title="Actual DC Value"
          value={money(actualDcValue, 2)}
          icon={Wallet}
          hint={`Total value of the DutyCredits redeemed in this period: Total Redemptions × the average credit value of ${fmtCurrencyNative(averageDcValue, currency, 0)}.`}
        />
        <StatsCard
          title="Revenue Generated"
          value={money(totalRevenue, 2)}
          icon={CreditCard}
          hint={`Qualifying sales driven by DutyBoost in this period: Total Redemptions × the Min. DC Value of ${fmtCurrencyNative(minDcValue, currency, 0)}.`}
        />
        <StatsCard title="Platform Fee (2.5%)" value={money(dutyBoostFee, 2)} subtitle={`Avg ${money(revenuePerDay, 2)}/day`} icon={TrendingUp} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h2 className="font-heading font-semibold text-lg mb-4">My Stores</h2>
          {listedStores.length === 0 ? (
            <div className="bg-card rounded-xl border border-border p-8 text-center text-muted-foreground">
              <Store className="w-10 h-10 mx-auto mb-3 opacity-40" />
              <p className="text-sm">No stores yet. Add your first store!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {listedStores.map(r => (
                <div key={r.id} className="bg-card rounded-xl border border-border p-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium">{r.store_name}</p>
                    <p className="text-sm text-muted-foreground">{r.airport} · {r.category}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="shrink-0" onClick={() => handleDeleteStore(r)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <h2 className="font-heading font-semibold text-lg mb-4">Active DutyCredits at My Airports</h2>
          {scopedVouchers.length === 0 ? (
            <div className="bg-card rounded-xl border border-border p-8 text-center text-muted-foreground">
              <TicketPercent className="w-10 h-10 mx-auto mb-3 opacity-40" />
              <p className="text-sm">No active DutyCredits in your area.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {scopedVouchers.map(v => (
                <div key={v.id} className="bg-card rounded-xl border border-border p-4 flex items-center justify-between">
                  <div>
                    <p className="font-mono text-sm font-medium">{v.voucher_code}</p>
                    <p className="text-sm text-muted-foreground">{fmtCurrencyNative(v.discount_percentage, currency, 0)} DutyCredit · Expires {v.expiration_date}</p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full" style={{background:'#00C48C22',color:'#00A876'}}>{v.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Charts */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h2 className="font-heading font-semibold mb-4">
          Transaction Revenue and Platform Fee — {period === "custom"
            ? `${customStart} – ${customEnd}`
            : t(PERIOD_OPTIONS.find(o => o.value === period)?.labelKey)}
        </h2>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={dailyData} margin={{ top: 4, right: 16, bottom: 4, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="date" tick={{ fontSize: 11 }} tickLine={false} />
            <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
            <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} formatter={(v, n) => [money(v), n]} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Line type="monotone" dataKey="volume" stroke="#1F6FFF" strokeWidth={2} dot={dailyData.length === 1} name="Revenue (€)" />
            <Line type="monotone" dataKey="fee" stroke="#FF7A00" strokeWidth={2} dot={dailyData.length === 1} name="Platform Fee (€)" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Total transactions per day — last 30 days */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h2 className="font-heading font-semibold mb-4">Total Transactions per Day — Last 30 Days</h2>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={last30DaysData} margin={{ top: 4, right: 16, bottom: 4, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="date" tick={{ fontSize: 11 }} tickLine={false} />
            <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} allowDecimals={false} />
            <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} formatter={v => [v, "Transactions"]} />
            <Line type="monotone" dataKey="count" stroke="#10B981" strokeWidth={2} dot={last30DaysData.length === 1} name="Transactions" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {storeData.length > 0 && (
        <div className="bg-card rounded-xl border border-border p-6">
          <h2 className="font-heading font-semibold mb-4">Revenue per Store</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={storeData} margin={{ top: 4, right: 16, bottom: 4, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="store" tick={{ fontSize: 11 }} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} formatter={v => [money(v), "Revenue"]} />
              <Bar dataKey="revenue" fill="#1F6FFF" radius={[4, 4, 0, 0]} name="Revenue (€)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Traveler Ratings */}
      {(() => {
        if (feedback.length === 0) return null;
        const avg = feedback.reduce((s, f) => s + f.rating, 0) / feedback.length;
        const counts = [5,4,3,2,1].map(n => ({ star: n, count: feedback.filter(f => f.rating === n).length }));
        return (
          <div className="bg-card rounded-xl border border-border p-6 space-y-4">
            <h2 className="font-heading font-semibold text-lg">Traveler Ratings</h2>
            <div className="flex items-center gap-6 flex-wrap">
              <div className="text-center">
                <p className="text-5xl font-heading font-bold">{avg.toLocaleString("nl-NL", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}</p>
                <div className="flex gap-0.5 justify-center mt-1">
                  {[1,2,3,4,5].map(s => (
                    <Star key={s} className={`w-5 h-5 ${s <= Math.round(avg) ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground'}`} />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-1">{feedback.length} review{feedback.length !== 1 ? 's' : ''}</p>
              </div>
              <div className="flex-1 space-y-1.5 min-w-[160px]">
                {counts.map(({ star, count }) => (
                  <div key={star} className="flex items-center gap-2 text-xs">
                    <span className="w-3 text-right text-muted-foreground">{star}</span>
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                      <div className="h-2 bg-amber-400 rounded-full" style={{ width: feedback.length ? `${(count/feedback.length)*100}%` : '0%' }} />
                    </div>
                    <span className="text-muted-foreground w-5 text-right">{count}</span>
                  </div>
                ))}
              </div>
            </div>
            {feedback.filter(f => f.comment).slice(0, 5).length > 0 && (
              <div className="space-y-2 pt-2 border-t border-border">
                <p className="text-sm font-medium">Recent comments</p>
                {feedback.filter(f => f.comment).slice(0, 5).map(f => (
                  <div key={f.id} className="bg-muted/40 rounded-lg p-3 text-sm">
                    <div className="flex gap-0.5 mb-1">
                      {[1,2,3,4,5].map(s => <Star key={s} className={`w-3 h-3 ${s <= f.rating ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground'}`} />)}
                    </div>
                    <p className="text-muted-foreground">{f.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })()}

      </> )}
    </div>
  );
}