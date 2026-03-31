import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { toast } from "sonner";
import StatsCard from "../components/StatsCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Clock, CreditCard, Plane, ShieldCheck, Store, TrendingUp, Users, XCircle, FileText } from "lucide-react";

export default function AdminPanel() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(null);
  const [vouchers, setVouchers] = useState([]);
  const [retailers, setRetailers] = useState([]);
  const [travelAgencies, setTravelAgencies] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [users, setUsers] = useState([]);
  const [applications, setApplications] = useState([]);
  const [redeemOpen, setRedeemOpen] = useState(false);
  const [redeemForm, setRedeemForm] = useState({ voucher_code: "", retailer_id: "", transaction_value: "" });
  const [approvingId, setApprovingId] = useState(null);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [rejectingId, setRejectingId] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [selectedApps, setSelectedApps] = useState(new Set());
  const [invoices, setInvoices] = useState([]);

  const toggleSelectAll = () => {
    if (selectedApps.size === applications.length) {
      setSelectedApps(new Set());
    } else {
      setSelectedApps(new Set(applications.map(a => a.id)));
    }
  };

  const toggleAppSelection = (id) => {
    setSelectedApps(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const user = await base44.auth.me();
        if (!user || user.role !== 'admin') {
          setIsAdmin(false);
          navigate('/');
          return;
        }
        setIsAdmin(true);
        loadAll();
      } catch (error) {
        console.error('Admin check error:', error);
        setIsAdmin(false);
        navigate('/');
      }
    };
    checkAdmin();
  }, [navigate]);

  const loadAll = async () => {
    try {
      const [v, r, a, t, u, ap, inv] = await Promise.all([
        base44.entities.Voucher.list('-created_date', 200),
        base44.entities.Retailer.list(),
        base44.entities.TravelAgency.list(),
        base44.entities.Transaction.list('-created_date', 200),
        base44.entities.User.list(),
        base44.entities.SignupApplication.list('-created_date', 200),
        base44.entities.MonthlyInvoice.list('-created_date', 200),
      ]);
      setVouchers(v || []);
      setRetailers(r || []);
      setTravelAgencies(a || []);
      setTransactions(t || []);
      setUsers(u || []);
      setApplications(ap || []);
      setInvoices(inv || []);
    } catch (error) {
      console.error('Error loading admin data:', error);
      toast.error('Failed to load admin data');
    }
  };

  const totalRevenue = transactions.reduce((s, t) => s + (t.platform_revenue || 0), 0);
  const totalTransactionValue = transactions.reduce((s, t) => s + (t.transaction_value || 0), 0);
  const activeVouchers = vouchers.filter(v => v.status === 'active').length;
  const redeemedVouchers = vouchers.filter(v => v.status === 'redeemed').length;
  const avgRevenuePer20Basket = (20 * 0.05).toFixed(2);

  const handleSendAgain = async (applicationId) => {
    setApprovingId(applicationId);
    try {
      const res = await base44.functions.invoke('sendMagicLink', { applicationId });
      if (res.data?.success) {
        toast.success('Magic link email resent!');
      } else {
        toast.error(res.data?.error || 'Failed to resend email');
      }
    } catch (error) {
      toast.error('Failed to resend email');
    } finally {
      setApprovingId(null);
    }
  };

  const handleApplicationAction = async (applicationId, action, reason = null) => {
    setApprovingId(applicationId);
    try {
      const payload = { applicationId, action };
      if (action === 'reject' && reason) {
        payload.rejectionReason = reason;
      }
      const res = await base44.functions.invoke('approveApplication', payload);
      if (res.data?.success) {
        toast.success(action === 'approve' ? 'Application approved — magic link sent!' : 'Application rejected.');
        loadAll();
      } else {
        toast.error(res.data?.error || 'Something went wrong');
      }
    } finally {
      setApprovingId(null);
    }
  };

  const handleRejectClick = (applicationId) => {
    setRejectingId(applicationId);
    setRejectionReason("");
    setRejectDialogOpen(true);
  };

  const handleRejectSubmit = async () => {
    if (!rejectionReason.trim()) {
      toast.error("Please provide a rejection reason");
      return;
    }
    setRejectDialogOpen(false);
    await handleApplicationAction(rejectingId, 'reject', rejectionReason);
    setRejectingId(null);
  };

  const handleDeleteAllApplications = async () => {
    if (!window.confirm('Are you sure? This will delete all applications.')) return;
    try {
      const res = await base44.functions.invoke('deleteAllApplications', {});
      if (res.data?.success) {
        toast.success(`Deleted ${res.data.deleted} applications`);
        loadAll();
      } else {
        toast.error(res.data?.error || 'Failed to delete applications');
      }
    } catch (error) {
      toast.error('Failed to delete applications');
    }
  };

  const handleRedeem = async (e) => {
    e.preventDefault();
    const voucher = vouchers.find(v => v.voucher_code === redeemForm.voucher_code && v.status === 'active');
    if (!voucher) {
      toast.error("DutyCredit not found or already used");
      return;
    }
    const retailer = retailers.find(r => r.id === redeemForm.retailer_id);
    const txnValue = parseFloat(redeemForm.transaction_value);
    const discountAmount = (txnValue * voucher.discount_percentage) / 100;
    const platformRevenue = txnValue * 0.05;

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
    toast.success(`DutyCredit redeemed! Platform revenue: €${platformRevenue.toFixed(2)}`);
    setRedeemOpen(false);
    setRedeemForm({ voucher_code: "", retailer_id: "", transaction_value: "" });
    loadAll();
  };

  if (isAdmin === false) {
    return null;
  }

  if (isAdmin === null) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

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
            <Button className="gap-2"><CreditCard className="w-4 h-4" /> Redeem DutyCredit</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Redeem DutyCredit</DialogTitle></DialogHeader>
            <form onSubmit={handleRedeem} className="space-y-4">
              <div className="space-y-2">
                <Label>DutyCredit Code</Label>
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
        <StatsCard title="Actual Platform Revenue" value={`€${totalRevenue.toFixed(2)}`} icon={TrendingUp} />
        <StatsCard title="Forecast Revenue Value" value={`€${avgRevenuePer20Basket}`} subtitle="Per €20 avg basket" icon={TrendingUp} />
        <StatsCard title="Transaction Volume" value={`€${totalTransactionValue.toFixed(0)}`} icon={TrendingUp} />
        <StatsCard title="Active DutyCredits" value={activeVouchers} icon={CreditCard} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Total Users" value={users.length} icon={Users} />
        <StatsCard title="Airport Retailers" value={retailers.length} icon={Store} />
        <StatsCard title="Travel Agencies" value={travelAgencies.length} icon={Plane} />
        <StatsCard title="Total DutyCredits" value={vouchers.length} icon={CreditCard} />
      </div>

      <Tabs defaultValue="applications">
        <div className="flex items-center justify-between mb-4">
          <TabsList>
            <TabsTrigger value="applications">
              Applications
              {applications.filter(a => a.status === 'pending').length > 0 && (
                <span className="ml-2 bg-primary text-primary-foreground text-xs rounded-full px-1.5 py-0.5">{applications.filter(a => a.status === 'pending').length}</span>
              )}
            </TabsTrigger>
            <TabsTrigger value="vouchers">All DutyCredits</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="invoices">
              Invoices
              {invoices.filter(i => i.status === 'overdue').length > 0 && (
                <span className="ml-2 bg-destructive text-destructive-foreground text-xs rounded-full px-1.5 py-0.5">{invoices.filter(i => i.status === 'overdue').length}</span>
              )}
            </TabsTrigger>
          </TabsList>
          {applications.length > 0 && (
            <Button variant="destructive" size="sm" className="h-8 text-xs" onClick={handleDeleteAllApplications}>
              Delete All Applications
            </Button>
          )}
        </div>

        <TabsContent value="applications" className="mt-4">
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                      <input
                        type="checkbox"
                        checked={selectedApps.size > 0 && selectedApps.size === applications.length}
                        onChange={toggleSelectAll}
                        className="rounded"
                      />
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Name</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Email</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Company</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Type</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {applications.map(app => (
                    <tr key={app.id} className="hover:bg-muted/30">
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={selectedApps.has(app.id)}
                          onChange={() => toggleAppSelection(app.id)}
                          className="rounded"
                        />
                      </td>
                      <td className="px-4 py-3 font-medium">{app.full_name}</td>
                      <td className="px-4 py-3 text-muted-foreground">{app.email}</td>
                      <td className="px-4 py-3">{app.company}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          app.business_type === 'Travel Agency' ? 'bg-violet-100 text-violet-700' : 'bg-amber-100 text-amber-700'
                        }`}>{app.business_type}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 w-fit ${
                          app.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                          app.status === 'invited' ? 'bg-green-100 text-green-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {app.status === 'pending' && <Clock className="w-3 h-3" />}
                          {app.status === 'invited' && <CheckCircle className="w-3 h-3" />}
                          {app.status === 'rejected' && <XCircle className="w-3 h-3" />}
                          {app.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {app.status === 'pending' && (
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              className="h-7 text-xs gap-1"
                              disabled={approvingId === app.id}
                              onClick={() => handleApplicationAction(app.id, 'approve')}
                            >
                              <CheckCircle className="w-3 h-3" />
                              {approvingId === app.id ? 'Sending...' : 'Approve'}
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              className="h-7 text-xs gap-1"
                              disabled={approvingId === app.id}
                              onClick={() => handleRejectClick(app.id)}
                            >
                              <XCircle className="w-3 h-3" /> Reject
                            </Button>
                          </div>
                        )}
                        {app.status === 'invited' && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 text-xs gap-1"
                            disabled={approvingId === app.id}
                            onClick={() => handleSendAgain(app.id)}
                          >
                            Send Again
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                  {applications.length === 0 && (
                    <tr><td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">No applications yet.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="vouchers" className="mt-4">
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Code</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Booking</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Incentive</th>
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
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">DutyCredit</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Store</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Value</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Incentive</th>
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

        <TabsContent value="invoices" className="mt-4">
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Retailer</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Period</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Amount</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Due Date</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {invoices.map(inv => (
                    <tr key={inv.id} className="hover:bg-muted/30">
                      <td className="px-4 py-3">
                        <div className="font-medium">{inv.retailer_name}</div>
                        <div className="text-xs text-muted-foreground">{inv.retailer_email}</div>
                      </td>
                      <td className="px-4 py-3">{inv.month_year}</td>
                      <td className="px-4 py-3 font-semibold">€{inv.amount?.toFixed(2)}</td>
                      <td className="px-4 py-3 text-muted-foreground">{inv.due_date}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          inv.status === 'paid' ? 'bg-green-100 text-green-700' :
                          inv.status === 'overdue' ? 'bg-red-100 text-red-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>{inv.status}</span>
                      </td>
                      <td className="px-4 py-3">
                        {inv.status !== 'paid' && (
                          <Button size="sm" className="h-7 text-xs" onClick={async () => {
                            await base44.entities.MonthlyInvoice.update(inv.id, { status: 'paid' });
                            toast.success('Invoice marked as paid');
                            loadAll();
                          }}>Mark Paid</Button>
                        )}
                      </td>
                    </tr>
                  ))}
                  {invoices.length === 0 && (
                    <tr><td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">No invoices yet.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Reject Application</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Provide a reason for rejecting this application. This will be sent to the applicant.</p>
            <div className="space-y-2">
              <Label>Rejection Reason</Label>
              <textarea
                className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                placeholder="e.g., Missing required documentation, Business not eligible, Unable to verify information..."
                rows={4}
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setRejectDialogOpen(false)}>Cancel</Button>
              <Button variant="destructive" onClick={handleRejectSubmit}>Confirm Rejection</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}