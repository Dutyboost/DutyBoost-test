import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import {
  UtensilsCrossed, Building2, CreditCard, FileText, ShieldCheck,
  Plus, Download, Search, CheckCircle, XCircle, Loader2, ArrowLeft, Briefcase
} from "lucide-react";
import { Link } from "react-router-dom";

const TABS = [
  { id: "overview", label: "Overview", icon: Briefcase },
  { id: "merchants", label: "Merchants", icon: UtensilsCrossed },
  { id: "credits", label: "F&B DutyCredits", icon: CreditCard },
  { id: "transactions", label: "Audit Log", icon: FileText },
  { id: "policies", label: "Corporate Policies", icon: ShieldCheck },
];

export default function BusinessTravel() {
  const [activeTab, setActiveTab] = useState("overview");
  const [merchants, setMerchants] = useState([]);
  const [credits, setCredits] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modalType, setModalType] = useState(null); // 'merchant' | 'credit' | 'policy'
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({});

  useEffect(() => {
    Promise.all([
      base44.entities.FnbMerchant.list("-created_date", 200),
      base44.entities.FnbDutyCredit.list("-created_date", 200),
      base44.entities.FnbTransaction.list("-created_date", 500),
      base44.entities.CorporatePolicy.list("-created_date", 100),
    ]).then(([m, c, t, p]) => {
      setMerchants(m || []);
      setCredits(c || []);
      setTransactions(t || []);
      setPolicies(p || []);
      setLoading(false);
    });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      if (modalType === "merchant") {
        const saved = await base44.entities.FnbMerchant.create(form);
        setMerchants(prev => [saved, ...prev]);
        toast.success("Merchant added");
      } else if (modalType === "credit") {
        const tokenId = `FNB-${Date.now()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
        const saved = await base44.entities.FnbDutyCredit.create({ ...form, token_id: tokenId, credit_type: "FNB_ONLY", remaining_balance: parseFloat(form.balance), status: "active" });
        setCredits(prev => [saved, ...prev]);
        toast.success("F&B DutyCredit issued");
      } else if (modalType === "policy") {
        const saved = await base44.entities.CorporatePolicy.create({ ...form, status: "active", allowed_categories: "F&B" });
        setPolicies(prev => [saved, ...prev]);
        toast.success("Policy created");
      }
      setModalType(null);
      setForm({});
    } catch {
      toast.error("Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const exportCSV = () => {
    const headers = ["Transaction ID", "Traveler", "Merchant", "Amount", "Airport", "Status", "Timestamp"];
    const rows = transactions.map(t => [t.token_id, t.traveler_email || "-", t.merchant_name || t.merchant_id, `€${t.amount}`, t.airport || "-", t.status, t.timestamp]);
    const csv = [headers, ...rows].map(r => r.map(c => `"${c}"`).join(",")).join("\n");
    const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    a.download = `fnb-audit-${new Date().toISOString().split("T")[0]}.csv`; a.click();
    toast.success("Exported");
  };

  const filtered = (list, keys) => list.filter(item => keys.some(k => (item[k] || "").toLowerCase().includes(search.toLowerCase())));

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
    </div>
  );

  const approved = transactions.filter(t => t.status === "approved");
  const rejected = transactions.filter(t => t.status === "rejected");
  const totalSpend = approved.reduce((s, t) => s + (t.amount || 0), 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-6 py-10">
        <div className="max-w-7xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-1.5 text-primary-foreground/70 hover:text-primary-foreground text-sm mb-4">
            <ArrowLeft className="w-4 h-4" /> Back to Platform
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <Briefcase className="w-5 h-5" />
            </div>
            <h1 className="text-3xl font-heading font-bold">Business Travel Mode</h1>
          </div>
          <p className="text-primary-foreground/80 max-w-xl">
            F&B-restricted DutyCredits for corporate travelers. Controlled spending, guaranteed F&B conversion, and full audit compliance.
          </p>
          <div className="flex gap-6 mt-6 text-sm">
            <div><span className="text-2xl font-bold">{credits.filter(c => c.status === "active").length}</span><p className="text-primary-foreground/70">Active Credits</p></div>
            <div><span className="text-2xl font-bold">{merchants.filter(m => m.status === "active" && m.category === "F&B").length}</span><p className="text-primary-foreground/70">F&B Merchants</p></div>
            <div><span className="text-2xl font-bold">€{totalSpend.toFixed(0)}</span><p className="text-primary-foreground/70">Total Spend</p></div>
            <div><span className="text-2xl font-bold">{approved.length}</span><p className="text-primary-foreground/70">Approved Tx</p></div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border bg-card sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 flex gap-1 overflow-x-auto">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => { setActiveTab(id); setSearch(""); }}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-all ${activeTab === id ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
              <Icon className="w-4 h-4" /> {label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* OVERVIEW */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <h2 className="text-xl font-heading font-semibold">How Business Travel Mode Works</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { step: "01", title: "Issue F&B DutyCredits", desc: "Corporate admins issue FNB_ONLY credits to business travelers with balance limits, airport restrictions, and expiry times.", icon: CreditCard, color: "bg-blue-50 text-blue-600" },
                { step: "02", title: "Traveler Pays at F&B", desc: "Traveler scans QR at any registered F&B merchant. System validates merchant category, balance, token validity, and corporate policy in real-time.", icon: UtensilsCrossed, color: "bg-orange-50 text-orange-600" },
                { step: "03", title: "Instant Approval or Rejection", desc: "Transaction is approved or rejected with a reason. Non-F&B merchants, expired tokens, and exceeded limits are automatically blocked.", icon: ShieldCheck, color: "bg-green-50 text-green-600" },
              ].map(({ step, title, desc, icon: Icon, color }) => (
                <div key={step} className="bg-card rounded-2xl border border-border p-6">
                  <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center mb-4`}><Icon className="w-5 h-5" /></div>
                  <p className="text-3xl font-heading font-bold text-primary/20 mb-2">{step}</p>
                  <h3 className="font-semibold mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card rounded-2xl border border-border p-6 space-y-3">
                <h3 className="font-semibold flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Validation Rules</h3>
                {["Merchant must be category F&B and status active", "Token must not be expired or already used", "Airport restriction must match merchant airport", "Balance must cover transaction amount", "Corporate daily & per-transaction limits enforced", "Time-window rules (breakfast/lunch/dinner) if configured"].map(r => (
                  <div key={r} className="flex items-start gap-2 text-sm"><div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />{r}</div>
                ))}
              </div>
              <div className="bg-card rounded-2xl border border-border p-6 space-y-3">
                <h3 className="font-semibold flex items-center gap-2"><XCircle className="w-4 h-4 text-red-500" /> Rejection Triggers</h3>
                {["Non-F&B merchant category", "Expired QR token", "Token already used", "Exceeded daily limit", "Exceeded per-transaction limit", "Airport mismatch", "Outside meal time window"].map(r => (
                  <div key={r} className="flex items-start gap-2 text-sm"><div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />{r}</div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Total Credits Issued", value: credits.length },
                { label: "Active Credits", value: credits.filter(c => c.status === "active").length },
                { label: "Approved Transactions", value: approved.length },
                { label: "Rejected Transactions", value: rejected.length },
              ].map(({ label, value }) => (
                <div key={label} className="bg-card rounded-xl border border-border p-4 text-center">
                  <p className="text-3xl font-bold text-primary">{value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MERCHANTS */}
        {activeTab === "merchants" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search merchants..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
              </div>
              <Button onClick={() => { setForm({ category: "F&B", status: "active" }); setModalType("merchant"); }} className="gap-2">
                <Plus className="w-4 h-4" /> Add Merchant
              </Button>
            </div>
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead className="border-b border-border">
                  <tr>{["Merchant", "Airport", "Category", "Status", "Contact"].map(h => <th key={h} className="px-4 py-3 text-left font-semibold">{h}</th>)}</tr>
                </thead>
                <tbody>
                  {filtered(merchants, ["merchant_name", "airport_code", "category"]).map(m => (
                    <tr key={m.id} className="border-b border-border hover:bg-muted/40">
                      <td className="px-4 py-3 font-medium">{m.merchant_name}</td>
                      <td className="px-4 py-3">{m.airport_code}</td>
                      <td className="px-4 py-3"><Badge className={m.category === "F&B" ? "bg-orange-100 text-orange-700 border-0" : "bg-secondary"}>{m.category}</Badge></td>
                      <td className="px-4 py-3"><Badge className={m.status === "active" ? "bg-green-100 text-green-700 border-0" : "bg-red-100 text-red-700 border-0"}>{m.status}</Badge></td>
                      <td className="px-4 py-3 text-muted-foreground">{m.contact_email || "-"}</td>
                    </tr>
                  ))}
                  {filtered(merchants, ["merchant_name", "airport_code", "category"]).length === 0 && (
                    <tr><td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">No merchants yet</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* CREDITS */}
        {activeTab === "credits" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search credits..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
              </div>
              <Button onClick={() => { setForm({ credit_type: "FNB_ONLY" }); setModalType("credit"); }} className="gap-2">
                <Plus className="w-4 h-4" /> Issue Credit
              </Button>
            </div>
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead className="border-b border-border">
                  <tr>{["Token ID", "Traveler", "Balance", "Remaining", "Airport", "Expiry", "Status"].map(h => <th key={h} className="px-4 py-3 text-left font-semibold">{h}</th>)}</tr>
                </thead>
                <tbody>
                  {filtered(credits, ["token_id", "traveler_email", "airport"]).map(c => (
                    <tr key={c.id} className="border-b border-border hover:bg-muted/40">
                      <td className="px-4 py-3 font-mono text-xs">{c.token_id}</td>
                      <td className="px-4 py-3">{c.traveler_email || "-"}</td>
                      <td className="px-4 py-3">€{c.balance}</td>
                      <td className="px-4 py-3 font-medium text-green-600">€{c.remaining_balance ?? c.balance}</td>
                      <td className="px-4 py-3">{c.airport || "Any"}</td>
                      <td className="px-4 py-3 text-muted-foreground">{c.expiry ? new Date(c.expiry).toLocaleDateString() : "-"}</td>
                      <td className="px-4 py-3"><Badge className={c.status === "active" ? "bg-green-100 text-green-700 border-0" : c.status === "used" ? "bg-slate-100 text-slate-600 border-0" : "bg-red-100 text-red-700 border-0"}>{c.status}</Badge></td>
                    </tr>
                  ))}
                  {filtered(credits, ["token_id", "traveler_email", "airport"]).length === 0 && (
                    <tr><td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">No credits issued yet</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* AUDIT LOG */}
        {activeTab === "transactions" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search transactions..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
              </div>
              <Button variant="outline" onClick={exportCSV} className="gap-2"><Download className="w-4 h-4" /> Export CSV</Button>
            </div>
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead className="border-b border-border">
                  <tr>{["Token ID", "Traveler", "Merchant", "Amount", "Airport", "Status", "Reason", "Time"].map(h => <th key={h} className="px-4 py-3 text-left font-semibold">{h}</th>)}</tr>
                </thead>
                <tbody>
                  {filtered(transactions, ["token_id", "traveler_email", "merchant_name", "airport"]).map(t => (
                    <tr key={t.id} className="border-b border-border hover:bg-muted/40">
                      <td className="px-4 py-3 font-mono text-xs">{t.token_id}</td>
                      <td className="px-4 py-3">{t.traveler_email || "-"}</td>
                      <td className="px-4 py-3">{t.merchant_name || t.merchant_id}</td>
                      <td className="px-4 py-3 font-medium">€{t.amount}</td>
                      <td className="px-4 py-3">{t.airport || "-"}</td>
                      <td className="px-4 py-3"><Badge className={t.status === "approved" ? "bg-green-100 text-green-700 border-0" : "bg-red-100 text-red-700 border-0"}>{t.status}</Badge></td>
                      <td className="px-4 py-3 text-muted-foreground text-xs">{t.rejection_reason || "-"}</td>
                      <td className="px-4 py-3 text-muted-foreground text-xs">{t.timestamp ? new Date(t.timestamp).toLocaleString() : "-"}</td>
                    </tr>
                  ))}
                  {filtered(transactions, ["token_id", "traveler_email", "merchant_name", "airport"]).length === 0 && (
                    <tr><td colSpan={8} className="px-4 py-8 text-center text-muted-foreground">No transactions yet</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* POLICIES */}
        {activeTab === "policies" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search policies..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
              </div>
              <Button onClick={() => { setForm({}); setModalType("policy"); }} className="gap-2">
                <Plus className="w-4 h-4" /> New Policy
              </Button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {filtered(policies, ["policy_name", "company_name"]).map(p => (
                <div key={p.id} className="bg-card rounded-xl border border-border p-5 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">{p.policy_name}</h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-1"><Building2 className="w-3.5 h-3.5" />{p.company_name}</p>
                    </div>
                    <Badge className={p.status === "active" ? "bg-green-100 text-green-700 border-0" : "bg-secondary"}>{p.status}</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="bg-muted/50 rounded-lg p-2"><p className="text-xs text-muted-foreground">Daily Limit</p><p className="font-medium">€{p.daily_limit}</p></div>
                    <div className="bg-muted/50 rounded-lg p-2"><p className="text-xs text-muted-foreground">Per Transaction</p><p className="font-medium">€{p.per_transaction_limit}</p></div>
                  </div>
                  {(p.breakfast_window || p.lunch_window || p.dinner_window) && (
                    <div className="text-xs text-muted-foreground space-y-0.5">
                      {p.breakfast_window && <p>🌅 Breakfast: {p.breakfast_window}</p>}
                      {p.lunch_window && <p>☀️ Lunch: {p.lunch_window}</p>}
                      {p.dinner_window && <p>🌙 Dinner: {p.dinner_window}</p>}
                    </div>
                  )}
                </div>
              ))}
              {filtered(policies, ["policy_name", "company_name"]).length === 0 && (
                <div className="col-span-2 text-center py-12 text-muted-foreground">No policies yet</div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Add Modal */}
      <Dialog open={!!modalType} onOpenChange={() => { setModalType(null); setForm({}); }}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {modalType === "merchant" ? "Add F&B Merchant" : modalType === "credit" ? "Issue F&B DutyCredit" : "Create Corporate Policy"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            {modalType === "merchant" && (
              <>
                <Field label="Merchant Name" name="merchant_name" form={form} setForm={setForm} placeholder="e.g. Café Amsterdam" />
                <Field label="Airport Code" name="airport_code" form={form} setForm={setForm} placeholder="e.g. AMS" />
                <SelectField label="Category" name="category" form={form} setForm={setForm} options={["F&B", "Retail", "Mixed"]} />
                <SelectField label="Status" name="status" form={form} setForm={setForm} options={["active", "inactive"]} />
                <Field label="Contact Email" name="contact_email" form={form} setForm={setForm} placeholder="merchant@example.com" />
              </>
            )}
            {modalType === "credit" && (
              <>
                <Field label="Traveler Email" name="traveler_email" form={form} setForm={setForm} placeholder="traveler@company.com" />
                <Field label="Traveler Name" name="traveler_name" form={form} setForm={setForm} placeholder="Full name" />
                <Field label="Balance (€)" name="balance" form={form} setForm={setForm} placeholder="50" type="number" />
                <Field label="Airport Restriction (optional)" name="airport" form={form} setForm={setForm} placeholder="e.g. AMS (leave blank for any)" />
                <Field label="Expiry" name="expiry" form={form} setForm={setForm} type="datetime-local" />
                <Field label="Corporate Policy ID (optional)" name="corporate_policy_id" form={form} setForm={setForm} placeholder="Policy ID" />
              </>
            )}
            {modalType === "policy" && (
              <>
                <Field label="Policy Name" name="policy_name" form={form} setForm={setForm} placeholder="Standard Business Meal Policy" />
                <Field label="Company Name" name="company_name" form={form} setForm={setForm} placeholder="Acme Corp" />
                <Field label="Daily Spend Limit (€)" name="daily_limit" form={form} setForm={setForm} placeholder="50" type="number" />
                <Field label="Per Transaction Limit (€)" name="per_transaction_limit" form={form} setForm={setForm} placeholder="25" type="number" />
                <Field label="Breakfast Window (optional)" name="breakfast_window" form={form} setForm={setForm} placeholder="06:00-10:00" />
                <Field label="Lunch Window (optional)" name="lunch_window" form={form} setForm={setForm} placeholder="11:00-14:00" />
                <Field label="Dinner Window (optional)" name="dinner_window" form={form} setForm={setForm} placeholder="17:00-21:00" />
              </>
            )}
            <Button className="w-full mt-2 gap-2" onClick={handleSave} disabled={saving}>
              {saving && <Loader2 className="w-4 h-4 animate-spin" />}
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Field({ label, name, form, setForm, placeholder, type = "text" }) {
  return (
    <div className="space-y-1">
      <Label className="text-sm">{label}</Label>
      <Input type={type} value={form[name] || ""} onChange={e => setForm(p => ({ ...p, [name]: e.target.value }))} placeholder={placeholder} />
    </div>
  );
}

function SelectField({ label, name, form, setForm, options }) {
  return (
    <div className="space-y-1">
      <Label className="text-sm">{label}</Label>
      <select value={form[name] || ""} onChange={e => setForm(p => ({ ...p, [name]: e.target.value }))}
        className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring">
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}