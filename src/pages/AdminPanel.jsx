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
import { CheckCircle, Clock, CreditCard, Plane, ShieldCheck, Store, TrendingUp, Users, XCircle, FileText, BarChart2, EyeOff } from "lucide-react";
import HiddenFeaturesPanel from "../components/HiddenFeaturesPanel";
import PartnerOnboardingPanel from "../components/onboarding/PartnerOnboardingPanel";
import BatchPayoutApproval from "../components/BatchPayoutApproval";
import AggregationView from "../components/AggregationView";
import { Link } from "react-router-dom";

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
  const [deletions, setDeletions] = useState([]);
  const [user, setUser] = useState(null);
  const [aggPeriod, setAggPeriod] = useState("month");
  const [aggCustomStart, setAggCustomStart] = useState(() => { const d = new Date(); d.setDate(d.getDate() - 30); return d.toISOString().split("T")[0]; });
  const [aggCustomEnd, setAggCustomEnd] = useState(() => new Date().toISOString().split("T")[0]);

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
        setUser(user);
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
      const [v, r, a, t, u, ap, inv, del] = await Promise.all([
        base44.entities.Voucher.list('-created_date', 200),
        base44.entities.Retailer.list(),
        base44.entities.TravelAgency.list(),
        base44.entities.Transaction.list('-created_date', 200),
        base44.entities.User.list(),
        base44.entities.SignupApplication.list('-created_date', 200),
        base44.entities.MonthlyInvoice.list('-created_date', 200),
        base44.entities.AccountDeletion.list('-created_date', 200),
      ]);
      setVouchers(v || []);
      setRetailers(r || []);
      setTravelAgencies(a || []);
      setTransactions(t || []);
      setUsers(u || []);
      setApplications(ap || []);
      setInvoices(inv || []);
      setDeletions(del || []);
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
      const app = applications.find(a => a.id === applicationId);
      if (!app) { toast.error('Application not found'); return; }
      const dashboardPath = app.business_type === 'Travel Agency' ? '/agency-portal' : '/retailer-portal';
      const res = await base44.functions.invoke('sendMagicLink', {
        email: app.email,
        full_name: app.full_name,
        dashboardPath,
        reInvite: true,
      });
      if (res.data?.success) {
        toast.success('Login link resent to ' + app.email);
      } else {
        toast.error(res.data?.error || 'Failed to resend email');
      }
    } catch (error) {
      toast.error('Failed to resend email: ' + error.message);
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

  const handleDeleteSelectedApplications = async () => {
    if (selectedApps.size === 0) {
      toast.error('No applications selected');
      return;
    }
    if (!window.confirm(`Delete ${selectedApps.size} application${selectedApps.size !== 1 ? 's' : ''}?`)) return;
    try {
      const appsToDelete = Array.from(selectedApps);
      let deleted = 0;
      for (const appId of appsToDelete) {
        await base44.entities.SignupApplication.delete(appId);
        deleted++;
      }
      toast.success(`Deleted ${deleted} application${deleted !== 1 ? 's' : ''}`);
      setSelectedApps(new Set());
      loadAll();
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
    // discount_percentage stores the euro credit amount (not a percentage)
    const discountAmount = parseFloat((voucher.discount_percentage || 0).toFixed(2));
    const platformRevenue = txnValue * 0.025;

    await base44.entities.Transaction.create({
      voucher_code: voucher.voucher_code,
      retailer_id: redeemForm.retailer_id,
      store_name: retailer?.store_name || "Unknown",
      transaction_value: txnValue,
      discount_applied: txnValue > 0 ? parseFloat(((discountAmount / txnValue) * 100).toFixed(2)) : 0,
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
        <div className="flex items-center gap-2">
        <Link to="/admin-dashboard">
          <Button variant="outline" className="gap-2"><BarChart2 className="w-4 h-4" /> Analytics</Button>
        </Link>
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
            <TabsTrigger value="aggregation">Aggregation</TabsTrigger>
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
            <TabsTrigger value="batch-payouts">Batch Payouts</TabsTrigger>
            <TabsTrigger value="deletions" className="gap-1.5">
              Deletions {deletions.length > 0 && <span className="ml-1 bg-destructive text-destructive-foreground text-xs rounded-full px-1.5 py-0.5">{deletions.length}</span>}
            </TabsTrigger>
            <TabsTrigger value="onboarding" className="gap-1.5">
              <Store className="w-3.5 h-3.5" /> Partner Onboarding
            </TabsTrigger>
            <TabsTrigger value="hidden-features" className="gap-1.5">
              <EyeOff className="w-3.5 h-3.5" /> Hidden Features
            </TabsTrigger>
          </TabsList>
          {selectedApps.size > 0 && (
            <Button variant="destructive" size="sm" className="h-8 text-xs" onClick={handleDeleteSelectedApplications}>
              Delete {selectedApps.size} Selected
            </Button>
          )}
        </div>

        <TabsContent value="aggregation" className="mt-4">
          <div className="flex items-center gap-2 flex-wrap mb-4">
            <span className="text-sm text-muted-foreground font-medium">Period:</span>
            {[
              { key: "day", label: "Day" },
              { key: "month", label: "Month" },
              { key: "year", label: "Year" },
              { key: "custom", label: "Custom" },
            ].map(({ key, label }) => (
              <button key={key} onClick={() => setAggPeriod(key)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                  aggPeriod === key ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:border-primary/50"
                }`}>{label}
              </button>
            ))}
            {aggPeriod === "custom" && (
              <div className="flex items-center gap-2 ml-2">
                <input type="date" value={aggCustomStart} onChange={e => setAggCustomStart(e.target.value)}
                  className="text-xs border border-border rounded-lg px-2 py-1.5 bg-card focus:outline-none focus:ring-1 focus:ring-primary" />
                <span className="text-xs text-muted-foreground">to</span>
                <input type="date" value={aggCustomEnd} onChange={e => setAggCustomEnd(e.target.value)}
                  className="text-xs border border-border rounded-lg px-2 py-1.5 bg-card focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>
            )}
          </div>
          <AggregationView
            transactions={transactions}
            vouchers={vouchers}
            period={aggPeriod}
            customStart={aggCustomStart}
            customEnd={aggCustomEnd}
            entityType="admin"
          />
        </TabsContent>

        <TabsContent value="applications" className="mt-4">
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                      <input
                        type="checkbox"
                        checked={applications.length > 0 && selectedApps.size === applications.length}
                        indeterminate={selectedApps.size > 0 && selectedApps.size < applications.length}
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
                          app.business_type === 'Travel Agency' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'
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
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">DutyCredit Code</th>
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
                          'bg-orange-100 text-orange-700'
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
        <TabsContent value="deletions" className="mt-4">
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Email</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">User Type</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Reason</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Details</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {deletions.map(d => (
                    <tr key={d.id} className="hover:bg-muted/30">
                      <td className="px-4 py-3 text-muted-foreground">{d.email}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-1 rounded-full ${d.user_type === 'Travel Partner' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'}`}>{d.user_type}</span>
                      </td>
                      <td className="px-4 py-3">{d.reason}</td>
                      <td className="px-4 py-3 text-muted-foreground text-xs">{d.other_reason || "—"}</td>
                      <td className="px-4 py-3 text-muted-foreground text-xs">{new Date(d.created_date).toLocaleDateString()}</td>
                    </tr>
                  ))}
                  {deletions.length === 0 && (
                    <tr><td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">No account deletions yet.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="batch-payouts" className="mt-4">
          {isAdmin && <BatchPayoutApproval user={user} />}
        </TabsContent>
        <TabsContent value="onboarding" className="mt-4">
          <PartnerOnboardingPanel />
        </TabsContent>
        <TabsContent value="hidden-features" className="mt-4">
          <HiddenFeaturesPanel />
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