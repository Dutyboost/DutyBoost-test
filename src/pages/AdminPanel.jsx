import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import StatsCard from "../components/StatsCard";
import { ShieldCheck, TicketPercent, Store, Plane, CreditCard, Users, DollarSign, TrendingUp } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";

export default function AdminPanel() {
  const [vouchers, setVouchers] = useState([]);
  const [retailers, setRetailers] = useState([]);
  const [airports, setAirports] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [users, setUsers] = useState([]);
  const [redeemOpen, setRedeemOpen] = useState(false);
  const [redeemForm, setRedeemForm] = useState({ voucher_code: "", retailer_id: "", transaction_value: "" });

  const loadAll = async () => {
    const [v, r, a, t, u] = await Promise.all([
      base44.entities.Voucher.list('-created_date', 200),
      base44.entities.Retailer.list(),
      base44.entities.Airport.list(),
      base44.entities.Transaction.list('-created_date', 200),
      base44.entities.User.list(),
    ]);
    setVouchers(v);
    setRetailers(r);
    setAirports(a);
    setTransactions(t);
    setUsers(u);
  };

  useEffect(() => { loadAll(); }, []);

  const totalRevenue = transactions.reduce((s, t) => s + (t.platform_revenue || 0), 0);
  const totalTransactionValue = transactions.reduce((s, t) => s + (t.transaction_value || 0), 0);
  const activeVouchers = vouchers.filter(v => v.status === 'active').length;
  const redeemedVouchers = vouchers.filter(v => v.status === 'redeemed').length;

  const handleRedeem = async (e) => {
    e.preventDefault();
    const voucher = vouchers.find(v => v.voucher_code === redeemForm.voucher_code && v.status === 'active');
    if (!voucher) {
      toast.error("Travel Yield not found or already used");
      return;
    }
    const retailer = retailers.find(r => r.id === redeemForm.retailer_id);
    const txnValue = parseFloat(redeemForm.transaction_value);
    const discountAmount = (txnValue * voucher.discount_percentage) / 100;
    const platformRevenue = txnValue * 0.05; // 5% platform revenue share

    await base44.entities.Transaction.create({
      voucher_code: voucher.voucher_code,
      retailer_id: redeemForm.retailer_id,
      store_name: retailer?.store_name || "Unknown",
      transaction_value: txnValue,
      discount_applied: voucher.discount_percentage,
      discount_amount: discountAmount,
      platform_revenue: platformRevenue,
      airport: voucher.airport,
    });

    await base44.entities.Voucher.update(voucher.id, { status: 'redeemed' });
    toast.success(`Travel Yield redeemed! Platform revenue: €${platformRevenue.toFixed(2)}`);
    setRedeemOpen(false);
    setRedeemForm({ voucher_code: "", retailer_id: "", transaction_value: "" });
    loadAll();
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold tracking-tight flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-primary" /> Admin Panel
          </h1>
          <p className="text-muted-foreground mt-1">Complete platform overview and management.</p>
        </div>
        <Dialog open={redeemOpen} onOpenChange={setRedeemOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2"><CreditCard className="w-4 h-4" /> Redeem Travel Yield</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Redeem Travel Yield</DialogTitle></DialogHeader>
            <form onSubmit={handleRedeem} className="space-y-4">
              <div className="space-y-2">
                <Label>Travel Yield Code</Label>
                <Input value={redeemForm.voucher_code} onChange={e => setRedeemForm({...redeemForm, voucher_code: e.target.value.toUpperCase()})} required placeholder="DB-XXXXXXXX" />
              </div>
              <div className="space-y-2">
                <Label>Retailer</Label>
                <Select value={redeemForm.retailer_id} onValueChange={v => setRedeemForm({...redeemForm, retailer_id: v})}>
                  <SelectTrigger><SelectValue placeholder="Select store" /></SelectTrigger>
                  <SelectContent>
                    {retailers.map(r => (
                      <SelectItem key={r.id} value={r.id}>{r.store_name} ({r.airport})</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Transaction Value (EUR)</Label>
                <Input type="number" min="0" step="0.01" value={redeemForm.transaction_value} onChange={e => setRedeemForm({...redeemForm, transaction_value: e.target.value})} required />
              </div>
              <Button type="submit" className="w-full">Redeem & Log Transaction</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Platform Revenue" value={`€${totalRevenue.toFixed(2)}`} icon={DollarSign} />
        <StatsCard title="Transaction Volume" value={`€${totalTransactionValue.toFixed(0)}`} icon={TrendingUp} />
        <StatsCard title="Active Travel Yields" value={activeVouchers} icon={TicketPercent} />
        <StatsCard title="Redeemed" value={redeemedVouchers} icon={CreditCard} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Total Users" value={users.length} icon={Users} />
        <StatsCard title="Retailers" value={retailers.length} icon={Store} />
        <StatsCard title="Airports" value={airports.length} icon={Plane} />
        <StatsCard title="Total Travel Yields" value={vouchers.length} icon={TicketPercent} />
      </div>

      <Tabs defaultValue="vouchers">
        <TabsList>
          <TabsTrigger value="vouchers">All Travel Yields</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>

        <TabsContent value="vouchers" className="mt-4">
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Code</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Booking</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Discount</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Airport</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Expires</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {vouchers.map(v => (
                    <tr key={v.id} className="hover:bg-muted/30">
                      <td className="px-4 py-3 font-mono">{v.voucher_code}</td>
                      <td className="px-4 py-3">{v.booking_id}</td>
                      <td className="px-4 py-3 font-semibold">{v.discount_percentage}%</td>
                      <td className="px-4 py-3">{v.airport}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          v.status === 'active' ? 'bg-green-100 text-green-700' :
                          v.status === 'redeemed' ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-500'
                        }`}>{v.status}</span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{v.expiration_date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="transactions" className="mt-4">
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Voucher</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Store</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Value</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Discount</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Revenue</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {transactions.map(t => (
                    <tr key={t.id} className="hover:bg-muted/30">
                      <td className="px-4 py-3 font-mono">{t.voucher_code}</td>
                      <td className="px-4 py-3">{t.store_name}</td>
                      <td className="px-4 py-3">€{t.transaction_value?.toFixed(2)}</td>
                      <td className="px-4 py-3">{t.discount_applied}% (€{t.discount_amount?.toFixed(2)})</td>
                      <td className="px-4 py-3 font-semibold text-primary">€{t.platform_revenue?.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="users" className="mt-4">
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Name</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Email</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Role</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {users.map(u => (
                    <tr key={u.id} className="hover:bg-muted/30">
                      <td className="px-4 py-3">{u.full_name}</td>
                      <td className="px-4 py-3 text-muted-foreground">{u.email}</td>
                      <td className="px-4 py-3">
                        <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary capitalize">{u.role || "user"}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}