import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import StatsCard from "../components/StatsCard";
import { Store, TicketPercent, CreditCard, TrendingUp, Plus, Trash2, AlertTriangle } from "lucide-react";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
} from "recharts";
import RetailerInvoiceDownload from "../components/RetailerInvoiceDownload";
import { Button } from "@/components/ui/button";
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

  const loadData = async () => {
    const user = await base44.auth.me();
    const [rets, txns, vchs, aps, invoices] = await Promise.all([
      base44.entities.Retailer.filter({ owner_email: user.email }),
      base44.entities.Transaction.list('-created_date', 50),
      base44.entities.Voucher.list('-created_date', 100),
      base44.entities.Airport.list(),
      base44.entities.MonthlyInvoice.filter({ retailer_email: user.email, status: 'overdue' }),
    ]);
    setRetailers(rets);
    setAirports(aps);
    const storeNames = rets.map(r => r.store_name);
    setTransactions(txns.filter(t => storeNames.includes(t.store_name)));
    const retailerAirports = rets.map(r => r.airport);
    setVouchers(vchs.filter(v => retailerAirports.includes(v.airport) && v.status === 'active'));
    setOverdueInvoice(invoices.length > 0 ? invoices[0] : null);
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

  const totalRevenue = transactions.reduce((s, t) => s + (t.transaction_value || 0), 0);
  const totalPassengers = vouchers.reduce((s, v) => s + (v.traveler_count || 0), 0);
  const dutyBoostFee = (totalRevenue * 0.05).toFixed(2);
  const revenuePerDay = (totalRevenue / 30).toFixed(2);

  // Daily transaction volume (last 30 days)
  const today = new Date();
  const last30 = Array.from({ length: 30 }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - (29 - i));
    return d.toISOString().split("T")[0];
  });
  const txByDay = {};
  transactions.forEach(t => {
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
  transactions.forEach(t => {
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

  return (
    <div className="space-y-8">
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
                    <SelectItem value="Duty-free">Duty-free</SelectItem>
                    <SelectItem value="Food">Food</SelectItem>
                    <SelectItem value="Retail">Retail</SelectItem>
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
              {vouchers.slice(0, 10).map(v => (
                <div key={v.id} className="bg-card rounded-xl border border-border p-4 flex items-center justify-between">
                  <div>
                    <p className="font-mono text-sm font-medium">{v.voucher_code}</p>
                    <p className="text-sm text-muted-foreground">{v.discount_percentage}% incentive · Expires {v.expiration_date}</p>
                  </div>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">{v.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Charts */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h2 className="font-heading font-semibold mb-4">Daily Transaction Volume (last 30 days)</h2>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={dailyData} margin={{ top: 4, right: 16, bottom: 4, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="date" tick={{ fontSize: 11 }} tickLine={false} />
            <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
            <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} formatter={(v, n) => [`€${v}`, n]} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Line type="monotone" dataKey="volume" stroke="#6366f1" strokeWidth={2} dot={false} name="Volume (€)" />
            <Line type="monotone" dataKey="fee" stroke="#f59e0b" strokeWidth={2} dot={false} name="DutyBoost Fee (€)" />
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
              <Bar dataKey="revenue" fill="#6366f1" radius={[4, 4, 0, 0]} name="Revenue (€)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      <RetailerInvoiceDownload transactions={transactions} retailers={retailers} />
    </div>
  );
}