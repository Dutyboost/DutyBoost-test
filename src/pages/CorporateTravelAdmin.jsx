import { useState, useEffect, useRef } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import {
  Plus, Upload, Search, Pencil, Trash2, Users, Building2, DollarSign, CheckCircle, XCircle
} from "lucide-react";
import DutyBoostLogo from "../components/DutyBoostLogo";
import { Link } from "react-router-dom";

const EMPTY_FORM = {
  full_name: "", email: "", employee_id: "", department: "",
  cost_center: "", company_name: "", daily_fnb_budget: "", per_transaction_limit: "", notes: ""
};

export default function CorporateTravelAdmin() {
  const [travelers, setTravelers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [bulkText, setBulkText] = useState("");
  const [bulkImporting, setBulkImporting] = useState(false);
  const [bulkPreview, setBulkPreview] = useState([]);
  const fileRef = useRef();

  const load = async () => {
    setLoading(true);
    const data = await base44.entities.CorporateTraveler.list("-created_date", 500);
    setTravelers(data || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => { setEditTarget(null); setForm(EMPTY_FORM); setDialogOpen(true); };
  const openEdit = (t) => { setEditTarget(t); setForm({ ...EMPTY_FORM, ...t }); setDialogOpen(true); };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      ...form,
      daily_fnb_budget: form.daily_fnb_budget ? parseFloat(form.daily_fnb_budget) : undefined,
      per_transaction_limit: form.per_transaction_limit ? parseFloat(form.per_transaction_limit) : undefined,
    };
    if (editTarget) {
      await base44.entities.CorporateTraveler.update(editTarget.id, payload);
      toast.success("Traveler updated");
    } else {
      await base44.entities.CorporateTraveler.create(payload);
      toast.success("Traveler added");
    }
    setSaving(false);
    setDialogOpen(false);
    load();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this traveler?")) return;
    await base44.entities.CorporateTraveler.delete(id);
    toast.success("Deleted");
    load();
  };

  const toggleStatus = async (t) => {
    const next = t.status === "active" ? "suspended" : "active";
    await base44.entities.CorporateTraveler.update(t.id, { status: next });
    toast.success(`Status changed to ${next}`);
    load();
  };

  // --- Bulk import via CSV text ---
  const parseBulk = (text) => {
    const lines = text.trim().split("\n").filter(Boolean);
    return lines.map(line => {
      const [full_name, email, employee_id, department, cost_center, company_name, daily_fnb_budget, per_transaction_limit] = line.split(",").map(s => s.trim());
      return { full_name, email, employee_id, department, cost_center, company_name,
        daily_fnb_budget: daily_fnb_budget ? parseFloat(daily_fnb_budget) : undefined,
        per_transaction_limit: per_transaction_limit ? parseFloat(per_transaction_limit) : undefined,
        status: "active"
      };
    }).filter(r => r.full_name && r.email);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target.result;
      setBulkText(text);
      setBulkPreview(parseBulk(text));
    };
    reader.readAsText(file);
  };

  const handleBulkImport = async () => {
    const rows = parseBulk(bulkText);
    if (!rows.length) { toast.error("No valid rows found"); return; }
    setBulkImporting(true);
    await base44.entities.CorporateTraveler.bulkCreate(rows);
    toast.success(`${rows.length} travelers imported`);
    setBulkImporting(false);
    setBulkText("");
    setBulkPreview([]);
    load();
  };

  const filtered = travelers.filter(t =>
    !search ||
    t.full_name?.toLowerCase().includes(search.toLowerCase()) ||
    t.email?.toLowerCase().includes(search.toLowerCase()) ||
    t.department?.toLowerCase().includes(search.toLowerCase()) ||
    t.cost_center?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="sticky top-0 z-50 backdrop-blur border-b border-border bg-card/80">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <DutyBoostLogo height={100} />
            <span className="text-sm font-medium text-muted-foreground border-l border-border pl-3">Corporate Admin</span>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/corporate-budget">
              <Button variant="outline" size="sm">Budget Allocation</Button>
            </Link>
            <Link to="/corporate-dashboard">
              <Button variant="outline" size="sm">Dashboard</Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={() => base44.auth.redirectToLogin('/corporate-dashboard')}>Sign In</Button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-heading font-bold flex items-center gap-2">
              <Users className="w-6 h-6 text-primary" /> Traveler Management
            </h1>
            <p className="text-muted-foreground mt-1">Add, edit, and bulk-import corporate travelers with individual F&B budgets.</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={openAdd} className="gap-2"><Plus className="w-4 h-4" /> Add Traveler</Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Travelers", value: travelers.length, icon: Users, color: "text-primary" },
            { label: "Active", value: travelers.filter(t => t.status === "active").length, icon: CheckCircle, color: "text-green-600" },
            { label: "Suspended", value: travelers.filter(t => t.status === "suspended").length, icon: XCircle, color: "text-red-500" },
            { label: "Departments", value: [...new Set(travelers.map(t => t.department).filter(Boolean))].length, icon: Building2, color: "text-orange-500" },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-card border border-border rounded-xl p-4 text-center">
              <Icon className={`w-5 h-5 mx-auto mb-1 ${color}`} />
              <p className={`text-3xl font-heading font-bold ${color}`}>{value}</p>
              <p className="text-xs text-muted-foreground mt-1">{label}</p>
            </div>
          ))}
        </div>

        <Tabs defaultValue="travelers">
          <TabsList>
            <TabsTrigger value="travelers">Travelers</TabsTrigger>
            <TabsTrigger value="bulk">Bulk Import</TabsTrigger>
          </TabsList>

          <TabsContent value="travelers" className="mt-4 space-y-4">
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search travelers..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
            </div>

            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted/40 border-b border-border">
                    <tr>
                      {["Name", "Email", "Employee ID", "Department", "Cost Center", "Daily Budget", "Per Txn Limit", "Status", "Actions"].map(h => (
                        <th key={h} className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {loading ? (
                      <tr><td colSpan={9} className="px-4 py-10 text-center text-muted-foreground">Loading...</td></tr>
                    ) : filtered.length === 0 ? (
                      <tr><td colSpan={9} className="px-4 py-10 text-center text-muted-foreground">No travelers found.</td></tr>
                    ) : filtered.map(t => (
                      <tr key={t.id} className="hover:bg-muted/20">
                        <td className="px-4 py-3 font-medium">{t.full_name}</td>
                        <td className="px-4 py-3 text-muted-foreground text-xs">{t.email}</td>
                        <td className="px-4 py-3 font-mono text-xs">{t.employee_id || "—"}</td>
                        <td className="px-4 py-3">{t.department}</td>
                        <td className="px-4 py-3 font-mono text-xs">{t.cost_center}</td>
                        <td className="px-4 py-3">
                          {t.daily_fnb_budget != null ? <span className="text-green-700 font-semibold">€{t.daily_fnb_budget}</span> : "—"}
                        </td>
                        <td className="px-4 py-3">
                          {t.per_transaction_limit != null ? <span className="text-blue-700 font-semibold">€{t.per_transaction_limit}</span> : "—"}
                        </td>
                        <td className="px-4 py-3">
                          <button onClick={() => toggleStatus(t)}>
                            <Badge className={t.status === "active" ? "bg-green-100 text-green-700 border-green-200" : "bg-red-100 text-red-700 border-red-200"}>
                              {t.status}
                            </Badge>
                          </button>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-1">
                            <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => openEdit(t)}><Pencil className="w-3.5 h-3.5" /></Button>
                            <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive hover:text-destructive" onClick={() => handleDelete(t.id)}><Trash2 className="w-3.5 h-3.5" /></Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="bulk" className="mt-4 space-y-4">
            <div className="bg-card border border-border rounded-xl p-6 space-y-4">
              <div>
                <h3 className="font-heading font-semibold mb-1">Bulk Import via CSV</h3>
                <p className="text-sm text-muted-foreground">
                  Upload a CSV file or paste data below. Expected columns (no header row):
                </p>
                <code className="block mt-2 text-xs bg-muted px-3 py-2 rounded-lg">
                  full_name, email, employee_id, department, cost_center, company_name, daily_fnb_budget, per_transaction_limit
                </code>
              </div>

              <div>
                <input type="file" accept=".csv,.txt" ref={fileRef} className="hidden" onChange={handleFileUpload} />
                <Button variant="outline" className="gap-2" onClick={() => fileRef.current?.click()}>
                  <Upload className="w-4 h-4" /> Upload CSV File
                </Button>
              </div>

              <div className="space-y-2">
                <Label>Or paste CSV data</Label>
                <textarea
                  className="w-full h-40 px-3 py-2 rounded-md border border-input bg-background text-sm font-mono focus:outline-none focus:ring-1 focus:ring-ring"
                  placeholder={"Jane Doe,jane@acme.com,EMP001,Sales,CC-100,Acme Corp,50,25\nJohn Smith,john@acme.com,EMP002,Finance,CC-200,Acme Corp,40,20"}
                  value={bulkText}
                  onChange={e => { setBulkText(e.target.value); setBulkPreview(parseBulk(e.target.value)); }}
                />
              </div>

              {bulkPreview.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-green-700">{bulkPreview.length} valid rows detected</p>
                  <div className="bg-muted/40 rounded-lg overflow-hidden">
                    <div className="overflow-x-auto max-h-48">
                      <table className="w-full text-xs">
                        <thead><tr className="border-b border-border">
                          {["Name", "Email", "Dept", "Cost Center", "Budget/day", "Per Txn"].map(h => <th key={h} className="px-3 py-2 text-left font-medium">{h}</th>)}
                        </tr></thead>
                        <tbody>
                          {bulkPreview.map((r, i) => (
                            <tr key={i} className="border-b border-border last:border-0">
                              <td className="px-3 py-1.5">{r.full_name}</td>
                              <td className="px-3 py-1.5 text-muted-foreground">{r.email}</td>
                              <td className="px-3 py-1.5">{r.department}</td>
                              <td className="px-3 py-1.5 font-mono">{r.cost_center}</td>
                              <td className="px-3 py-1.5">{r.daily_fnb_budget != null ? `€${r.daily_fnb_budget}` : "—"}</td>
                              <td className="px-3 py-1.5">{r.per_transaction_limit != null ? `€${r.per_transaction_limit}` : "—"}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <Button onClick={handleBulkImport} disabled={bulkImporting} className="gap-2">
                    <Upload className="w-4 h-4" /> {bulkImporting ? "Importing..." : `Import ${bulkPreview.length} Travelers`}
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add / Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editTarget ? "Edit Traveler" : "Add Traveler"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSave} className="space-y-3">
            {[
              { key: "full_name", label: "Full Name", required: true },
              { key: "email", label: "Email", type: "email", required: true },
              { key: "employee_id", label: "Employee ID" },
              { key: "department", label: "Department", required: true },
              { key: "cost_center", label: "Cost Center Code", required: true },
              { key: "company_name", label: "Company Name", required: true },
            ].map(({ key, label, type = "text", required }) => (
              <div key={key} className="space-y-1">
                <Label>{label}{required && " *"}</Label>
                <Input type={type} value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} required={required} />
              </div>
            ))}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label>Daily F&B Budget (€)</Label>
                <Input type="number" min="0" step="0.01" value={form.daily_fnb_budget} onChange={e => setForm({ ...form, daily_fnb_budget: e.target.value })} placeholder="e.g. 50" />
              </div>
              <div className="space-y-1">
                <Label>Per Transaction Limit (€)</Label>
                <Input type="number" min="0" step="0.01" value={form.per_transaction_limit} onChange={e => setForm({ ...form, per_transaction_limit: e.target.value })} placeholder="e.g. 25" />
              </div>
            </div>
            <div className="space-y-1">
              <Label>Notes</Label>
              <textarea className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring" rows={2} value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} />
            </div>
            <div className="flex gap-2 justify-end pt-2">
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={saving}>{saving ? "Saving..." : editTarget ? "Save Changes" : "Add Traveler"}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}