import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Building2, User, Mail, Search, Shield, Store, Plane } from "lucide-react";
import { Input } from "@/components/ui/input";

const ROLE_CONFIG = {
  admin: { label: "Admin", color: "bg-purple-100 text-purple-700", icon: Shield },
  retailer: { label: "Retailer", color: "bg-orange-100 text-orange-700", icon: Store },
  agency: { label: "Agency", color: "bg-blue-100 text-blue-700", icon: Plane },
  user: { label: "User", color: "bg-muted text-muted-foreground", icon: User },
};

export default function AdminAccountsView() {
  const [users, setUsers] = useState([]);
  const [retailers, setRetailers] = useState([]);
  const [vouchers, setVouchers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
  }, []);

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
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search accounts..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
        </div>
      </div>

      {/* Summary row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Accounts", value: users.length, color: "text-primary" },
          { label: "Travel Agencies", value: users.filter(u => u.role === "agency").length, color: "text-blue-600" },
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