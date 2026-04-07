import { useState, useEffect, useMemo } from "react";
import { base44 } from "@/api/base44Client";
import StatsCard from "../components/StatsCard";
import { Store, TicketPercent, CreditCard, TrendingUp, Plus, Trash2, AlertTriangle, Calendar, Star, LayoutDashboard, UserCircle } from "lucide-react";
import ProfileTab from "../components/ProfileTab";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
} from "recharts";
import RetailerInvoiceDownload from "../components/RetailerInvoiceDownload";
import RedemptionHeatmap from "../components/RedemptionHeatmap";
import RetailerStrategyTab from "../components/RetailerStrategyTab";
import { Button } from "@/components/ui/button";
import { Compass } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";

export default function RetailerDashboard() {
  const [retailers, setRetailers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [vouchers, setVouchers] = useState([]);
  const [airports, setAirports] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ store_name: "", airport: "", category: "Duty-free", description: "" });

  const [overdueInvoice, setOverdueInvoice] = useState(null);
  const [feedback, setFeedback] = useState([]);
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [period, setPeriod] = useState("monthly");
  const [customStart, setCustomStart] = useState(() => { const d = new Date(); d.setDate(d.getDate() - 30); return d.toISOString().split("T")[0]; });
  const [customEnd, setCustomEnd] = useState(() => new Date().toISOString().split("T")[0]);

  const loadData = async () => {
    const u = await base44.auth.me();
    setUser(u);
    const user = u;
    const [rets, txns, vchs, aps, invoices, fb] = await Promise.all([
      base44.entities.Retailer.filter({ owner_email: user.email }),
      base44.entities.Transaction.list('-created_date', 50),
      base44.entities.Voucher.list('-created_date', 100),
      base44.entities.Airport.list(),
      base44.entities.MonthlyInvoice.filter({ retailer_email: user.email, status: 'overdue' }),
      base44.entities.RetailerFeedback.list('-created_date', 200),
    ]);
    setRetailers(rets);
    setAirports(aps);
    const storeNames = rets.map(r => r.store_name);
    setTransactions(txns.filter(t => storeNames.includes(t.store_name)));
    const retailerAirports = rets.map(r => r.airport);
    setVouchers(vchs.filter(v => retailerAirports.includes(v.airport) && v.status === 'active'));
    setOverdueInvoice(invoices.length > 0 ? invoices[0] : null);
    setFeedback(fb.filter(f => retailerAirports.includes(f.airport)));
  };

  useEffect(() => { loadData(); }, []);

  const handleCreateStore = async (e) => {
    e.preventDefault();
    const user = await base44.auth.me();
    await base44.entities.Retailer.create({ ...form, owner_email: user.email, accepts_vouchers: true });
    toast.success("Store created!");
    setDialogOpen(false);
    setForm({ store_name: "", airport: "", category: "Duty-free", description: "" });
    loadData();
  };

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

  const filteredTransactions = useMemo(() =>
    transactions.filter(t => { const d = (t.created_date || "").split("T")[0]; return d >= startDate && d <= endDate; }),
    [transactions, startDate, endDate]
  );

  const totalRevenue = filteredTransactions.reduce((s, t) => s + (t.transaction_value || 0), 0);
  const totalPassengers = vouchers.reduce((s, v) => s + (v.traveler_count || 0), 0);
  const dutyBoostFee = (totalRevenue * 0.05).toFixed(2);
  const periodDays = period === "daily" ? 7 : period === "monthly" ? 30 : Math.max(1, Math.round((new Date(customEnd) - new Date(customStart)) / 86400000));
  const revenuePerDay = (totalRevenue / periodDays).toFixed(2);

  // Transaction volume for selected period
  const today = new Date();
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
    txByDay[day].fee += (t.transaction_value || 0) * 0.05;
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
              <span className="font-bold text-destructive">€{overdueInvoice.amount?.toFixed(2)}</span>
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
    { id: "strategy", label: "Define your Airport Retail strategy", icon: Compass },
    { id: "profile", label: "Profile & Billing", icon: UserCircle },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-[calc(100vh-200px)]">
      {/* Sidebar */}
      <div className="lg:col-span-1">
        <div className="space-y-2 sticky top-6">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setActiveTab(id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all text-left ${
                activeTab === id
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-muted"
              }`}>
              <Icon className="w-4 h-4 shrink-0" /> {label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:col-span-3">
        {activeTab === "profile" ? (
        <ProfileTab user={user} onUserUpdate={setUser} invoiceComponent={<RetailerInvoiceDownload transactions={transactions} retailers={retailers} user={user} />} />
      ) : activeTab === "strategy" ? (
        <RetailerStrategyTab vouchers={vouchers} user={user} />
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

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold tracking-tight">Retailer Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage your stores and view DutyCredit activity.</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2"><Plus className="w-4 h-4" /> Add Store</Button>
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
                    <SelectItem value="Retail">Retail</SelectItem>
                    <SelectItem value="Food & Beverage">Food &amp; Beverage</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Input value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
              </div>
              <Button type="submit" className="w-full">Create Store</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="My Stores" value={retailers.length} icon={Store} />
        <StatsCard title="Total Passengers" value={totalPassengers} icon={TicketPercent} />
        <StatsCard title="Revenue Generated" value={`€${totalRevenue.toFixed(2)}`} icon={CreditCard} />
        <StatsCard title="DutyBoost Fee (5%)" value={`€${dutyBoostFee}`} subtitle={`Avg €${revenuePerDay}/day`} icon={TrendingUp} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h2 className="font-heading font-semibold text-lg mb-4">My Stores</h2>
          {retailers.length === 0 ? (
            <div className="bg-card rounded-xl border border-border p-8 text-center text-muted-foreground">
              <Store className="w-10 h-10 mx-auto mb-3 opacity-40" />
              <p className="text-sm">No stores yet. Add your first store!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {retailers.map(r => (
                <div key={r.id} className="bg-card rounded-xl border border-border p-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium">{r.store_name}</p>
                    <p className="text-sm text-muted-foreground">{r.airport} · {r.category}</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={async () => {
                    await base44.entities.Retailer.delete(r.id);
                    toast.success("Store removed");
                    loadData();
                  }}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <h2 className="font-heading font-semibold text-lg mb-4">Active DutyCredits at My Airports</h2>
          {vouchers.length === 0 ? (
            <div className="bg-card rounded-xl border border-border p-8 text-center text-muted-foreground">
              <TicketPercent className="w-10 h-10 mx-auto mb-3 opacity-40" />
              <p className="text-sm">No active DutyCredits in your area.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {vouchers.map(v => (
                <div key={v.id} className="bg-card rounded-xl border border-border p-4 flex items-center justify-between">
                  <div>
                    <p className="font-mono text-sm font-medium">{v.voucher_code}</p>
                    <p className="text-sm text-muted-foreground">{v.discount_percentage}% DutyCredit · Expires {v.expiration_date}</p>
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
        <h2 className="font-heading font-semibold mb-4">Transaction Volume — {period === "daily" ? "Last 7 days" : period === "monthly" ? "Last 30 days" : `${customStart} – ${customEnd}`}</h2>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={dailyData} margin={{ top: 4, right: 16, bottom: 4, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="date" tick={{ fontSize: 11 }} tickLine={false} />
            <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
            <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} formatter={(v, n) => [`€${v}`, n]} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Line type="monotone" dataKey="volume" stroke="#1F6FFF" strokeWidth={2} dot={false} name="Volume (€)" />
            <Line type="monotone" dataKey="fee" stroke="#FF7A00" strokeWidth={2} dot={false} name="DutyBoost Fee (€)" />
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
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} formatter={v => [`€${v}`, "Revenue"]} />
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
                <p className="text-5xl font-heading font-bold">{avg.toFixed(1)}</p>
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

        <RedemptionHeatmap vouchers={vouchers} />
        </> )}
      </div>
    </div>
  );
}