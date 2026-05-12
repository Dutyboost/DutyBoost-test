import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import {
  Building2, User, Mail, Search, Shield, Store, Plane, Plus, Send,
  Hotel, Car, Ship, Train, ChevronDown
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const PARTNER_TYPES = [
  {
    value: "Travel Partner",
    label: "Flight / Travel Partner",
    icon: Plane,
    color: "bg-blue-50 border-blue-200 text-blue-700",
    iconColor: "text-blue-600",
    role: "agency",
    desc: "Travel agencies, flight booking platforms",
    fields: ["kvk", "website"],
  },
  {
    value: "Hotel Partner",
    label: "Hotel Partner",
    icon: Hotel,
    color: "bg-purple-50 border-purple-200 text-purple-700",
    iconColor: "text-purple-600",
    role: "user",
    desc: "Hotels and hospitality partners",
    fields: ["city", "website"],
  },
  {
    value: "Car Rental Partner",
    label: "Car Rental Partner",
    icon: Car,
    color: "bg-green-50 border-green-200 text-green-700",
    iconColor: "text-green-600",
    role: "user",
    desc: "Car rental companies at airports",
    fields: ["airport", "website"],
  },
  {
    value: "Airport Retailer",
    label: "Airport Retail Partner",
    icon: Store,
    color: "bg-orange-50 border-orange-200 text-orange-700",
    iconColor: "text-orange-600",
    role: "retailer",
    desc: "Shops and stores inside airport terminals",
    fields: ["airport", "store_category"],
  },
];

const ROLE_CONFIG = {
  admin: { label: "Admin", color: "bg-purple-100 text-purple-700", icon: Shield },
  retailer: { label: "Retailer", color: "bg-orange-100 text-orange-700", icon: Store },
  agency: { label: "Travel Partner", color: "bg-blue-100 text-blue-700", icon: Plane },
  user: { label: "Partner", color: "bg-muted text-muted-foreground", icon: User },
};

const EMPTY_FORM = {
  full_name: "", email: "", company: "", business_type: "",
  website: "", airport: "", store_category: "", kvk: "", vat: "", city: ""
};

export default function AdminAccountsView() {
  const [users, setUsers] = useState([]);
  const [retailers, setRetailers] = useState([]);
  const [vouchers, setVouchers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [createOpen, setCreateOpen] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [creating, setCreating] = useState(false);
  const [selectedType, setSelectedType] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    Promise.all([
      base44.entities.User.list(),
      base44.entities.Retailer.list(),
      base44.entities.Voucher.list(),
      base44.entities.Transaction.list("-created_date", 200),
    ]).then(([u, r, v, t]) => {
      setUsers(u || []);
      setRetailers(r || []);
      setVouchers(v || []);
      setTransactions(t || []);
      setLoading(false);
    });
  };

  const filtered = users.filter(u =>
    !search ||
    u.full_name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase()) ||
    u.company?.toLowerCase().includes(search.toLowerCase())
  );

  const getAccountStats = (user) => {
    if (user.role === "agency") {
      const userVouchers = vouchers.filter(v => v.agency_email === user.email);
      const redeemed = userVouchers.filter(v => v.status === "redeemed").length;
      return { primary: `${userVouchers.length} DutyCredits`, secondary: `${redeemed} redeemed` };
    }
    if (user.role === "retailer") {
      const userRetailers = retailers.filter(r => r.owner_email === user.email);
      const userTxns = transactions.filter(t => userRetailers.some(r => r.store_name === t.store_name));
      const revenue = userTxns.reduce((s, t) => s + (t.transaction_value || 0), 0);
      return { primary: `${userRetailers.length} store(s)`, secondary: `€${revenue.toFixed(0)} revenue` };
    }
    return { primary: "—", secondary: "" };
  };

  const openCreate = () => {
    setForm(EMPTY_FORM);
    setSelectedType(null);
    setCreateOpen(true);
  };

  const selectPartnerType = (pt) => {
    setSelectedType(pt);
    setForm(f => ({ ...f, business_type: pt.value }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.full_name || !form.email || !form.company || !form.business_type) {
      toast.error("Please fill in all required fields");
      return;
    }
    setCreating(true);
    try {
      const app = await base44.entities.SignupApplication.create({
        full_name: form.full_name,
        email: form.email,
        company: form.company,
        business_type: form.business_type,
        website: form.website || null,
        airport: form.airport || form.city || null,
        store_category: form.store_category || null,
        kvk: form.kvk || null,
        vat: form.vat || null,
        status: "pending",
      });

      const res = await base44.functions.invoke("approveApplication", { applicationId: app.id, action: "approve" });
      if (res.data?.success) {
        toast.success(`Account created & login email sent to ${form.email}`);
        setCreateOpen(false);
        setForm(EMPTY_FORM);
        setSelectedType(null);
        loadData();
      } else {
        toast.error(res.data?.error || "Failed to send invite");
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setCreating(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center py-20"><div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-lg font-heading font-semibold">All Accounts</h2>
          <p className="text-sm text-muted-foreground">{users.length} registered accounts on the platform</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search accounts..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
          </div>
          <Button onClick={openCreate} className="gap-2">
            <Plus className="w-4 h-4" /> Create Account
          </Button>
        </div>
      </div>

      {/* Create Account Dialog */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create Partner Account</DialogTitle>
            <p className="text-sm text-muted-foreground">Select the partner type, fill in their details, and they'll receive a login link automatically.</p>
          </DialogHeader>

          {/* Step 1: Partner type selection */}
          <div className="space-y-3 mt-2">
            <Label className="text-sm font-semibold">Partner Type <span className="text-destructive">*</span></Label>
            <div className="grid grid-cols-2 gap-3">
              {PARTNER_TYPES.map(pt => {
                const Icon = pt.icon;
                const isSelected = selectedType?.value === pt.value;
                return (
                  <button
                    key={pt.value}
                    type="button"
                    onClick={() => selectPartnerType(pt)}
                    className={`flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all hover:shadow-sm ${
                      isSelected
                        ? `${pt.color} border-current shadow-sm`
                        : "bg-card border-border hover:border-primary/30"
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${isSelected ? "bg-white/60" : "bg-muted"}`}>
                      <Icon className={`w-5 h-5 ${isSelected ? pt.iconColor : "text-muted-foreground"}`} />
                    </div>
                    <div>
                      <p className={`font-semibold text-sm ${isSelected ? "" : "text-foreground"}`}>{pt.label}</p>
                      <p className={`text-xs mt-0.5 ${isSelected ? "opacity-80" : "text-muted-foreground"}`}>{pt.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Form fields (shown after type is selected) */}
          {selectedType && (
            <form onSubmit={handleCreate} className="space-y-4 mt-2 pt-4 border-t border-border">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Full Name <span className="text-destructive">*</span></Label>
                  <Input value={form.full_name} onChange={e => setForm({...form, full_name: e.target.value})} placeholder="John Doe" required />
                </div>
                <div className="space-y-1.5">
                  <Label>Email <span className="text-destructive">*</span></Label>
                  <Input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="john@company.com" required />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label>Company / Business Name <span className="text-destructive">*</span></Label>
                <Input value={form.company} onChange={e => setForm({...form, company: e.target.value})} placeholder="Company name" required />
              </div>

              {/* Type-specific fields */}
              <div className="grid grid-cols-2 gap-4">
                {selectedType.fields.includes("website") && (
                  <div className="space-y-1.5">
                    <Label>Website</Label>
                    <Input value={form.website} onChange={e => setForm({...form, website: e.target.value})} placeholder="https://..." />
                  </div>
                )}
                {selectedType.fields.includes("airport") && (
                  <div className="space-y-1.5">
                    <Label>Airport Code(s)</Label>
                    <Input value={form.airport} onChange={e => setForm({...form, airport: e.target.value})} placeholder="AMS, BRU, CDG..." />
                  </div>
                )}
                {selectedType.fields.includes("city") && (
                  <div className="space-y-1.5">
                    <Label>City / Location</Label>
                    <Input value={form.city} onChange={e => setForm({...form, city: e.target.value})} placeholder="Amsterdam" />
                  </div>
                )}
                {selectedType.fields.includes("kvk") && (
                  <div className="space-y-1.5">
                    <Label>KVK Number</Label>
                    <Input value={form.kvk} onChange={e => setForm({...form, kvk: e.target.value})} placeholder="12345678" />
                  </div>
                )}
                {selectedType.fields.includes("store_category") && (
                  <div className="space-y-1.5">
                    <Label>Store Category</Label>
                    <Select value={form.store_category} onValueChange={v => setForm({...form, store_category: v})}>
                      <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Fashion">Fashion</SelectItem>
                        <SelectItem value="Electronics">Electronics</SelectItem>
                        <SelectItem value="Food & Beverage">Food & Beverage</SelectItem>
                        <SelectItem value="Beauty & Perfume">Beauty & Perfume</SelectItem>
                        <SelectItem value="Duty Free">Duty Free</SelectItem>
                        <SelectItem value="Gifts & Souvenirs">Gifts & Souvenirs</SelectItem>
                        <SelectItem value="Retail">Retail</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-700">
                <strong>What happens:</strong> The account will be created and <strong>{form.email || "the partner"}</strong> will receive an email with a link to access their dashboard.
              </div>

              <div className="flex gap-2 justify-end pt-1">
                <Button type="button" variant="outline" onClick={() => { setCreateOpen(false); setForm(EMPTY_FORM); setSelectedType(null); }}>
                  Cancel
                </Button>
                <Button type="submit" disabled={creating} className="gap-2">
                  <Send className="w-4 h-4" />
                  {creating ? "Creating & Sending..." : "Create & Send Login"}
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Summary row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Accounts", value: users.length, color: "text-primary" },
          { label: "Travel Partners", value: users.filter(u => u.role === "agency").length, color: "text-blue-600" },
          { label: "Retailers", value: users.filter(u => u.role === "retailer").length, color: "text-orange-600" },
          { label: "Admins", value: users.filter(u => u.role === "admin").length, color: "text-purple-600" },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-card border border-border rounded-xl p-4 text-center">
            <p className={`text-3xl font-heading font-bold ${color}`}>{value}</p>
            <p className="text-xs text-muted-foreground mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Accounts table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-muted/30">
              <tr>
                <th className="text-left py-3 px-4 text-xs text-muted-foreground font-medium">Name</th>
                <th className="text-left py-3 px-4 text-xs text-muted-foreground font-medium">Email</th>
                <th className="text-left py-3 px-4 text-xs text-muted-foreground font-medium">Company</th>
                <th className="text-left py-3 px-4 text-xs text-muted-foreground font-medium">Role</th>
                <th className="text-left py-3 px-4 text-xs text-muted-foreground font-medium">Activity</th>
                <th className="text-left py-3 px-4 text-xs text-muted-foreground font-medium">Member Since</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(u => {
                const stats = getAccountStats(u);
                const roleConf = ROLE_CONFIG[u.role] || ROLE_CONFIG.user;
                const RoleIcon = roleConf.icon;
                return (
                  <tr key={u.id} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                    <td className="py-3 px-4 font-medium">{u.full_name || "—"}</td>
                    <td className="py-3 px-4 text-muted-foreground text-xs">{u.email}</td>
                    <td className="py-3 px-4 text-muted-foreground">{u.company || "—"}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-semibold ${roleConf.color}`}>
                        <RoleIcon className="w-3 h-3" /> {roleConf.label}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-medium text-xs">{stats.primary}</p>
                      <p className="text-xs text-muted-foreground">{stats.secondary}</p>
                    </td>
                    <td className="py-3 px-4 text-xs text-muted-foreground">
                      {u.created_date ? new Date(u.created_date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "—"}
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="py-12 text-center text-muted-foreground text-sm">No accounts found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}