import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import StatsCard from "../components/StatsCard";
import { Store, TicketPercent, CreditCard, TrendingUp, Plus, Trash2 } from "lucide-react";
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

  const loadData = async () => {
    const user = await base44.auth.me();
    const [rets, txns, vchs, aps] = await Promise.all([
      base44.entities.Retailer.filter({ owner_email: user.email }),
      base44.entities.Transaction.list('-created_date', 50),
      base44.entities.Voucher.list('-created_date', 100),
      base44.entities.Airport.list(),
    ]);
    setRetailers(rets);
    setAirports(aps);
    // Filter transactions for this retailer's stores
    const storeNames = rets.map(r => r.store_name);
    setTransactions(txns.filter(t => storeNames.includes(t.store_name)));
    // Filter vouchers for this retailer's airports
    const retailerAirports = rets.map(r => r.airport);
    setVouchers(vchs.filter(v => retailerAirports.includes(v.airport) && v.status === 'active'));
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
  const totalDiscountGiven = transactions.reduce((s, t) => s + (t.discount_amount || 0), 0);

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
        <StatsCard title="Incoming DutyCredits" value={vouchers.length} icon={TicketPercent} />
        <StatsCard title="Total Revenue" value={`€${totalRevenue.toFixed(0)}`} icon={CreditCard} />
        <StatsCard title="Incentives Given" value={`€${totalDiscountGiven.toFixed(0)}`} icon={TrendingUp} />
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
    </div>
  );
}