import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import {
  PlusCircle, Trash2, Save, TrendingUp, DollarSign, PieChart, Layers, Calendar, CheckCircle2, AlertCircle
} from "lucide-react";
import DutyBoostLogo from "../components/DutyBoostLogo";

const CURRENT_YEAR = new Date().getFullYear();
const DEPT_COLORS = ["#1F6FFF", "#FF7A00", "#00C48C", "#6366f1", "#f43f5e"];

export default function CorporateBudgetAllocation() {
  const [allocations, setAllocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState(null);

  // form state
  const [form, setForm] = useState({
    company_name: "", year: CURRENT_YEAR, total_annual_budget: "",
    release_mode: "monthly", monthly_cap: "", saas_fee: "",
    take_rate_pct: 5, unused_expiry_policy: "expire", notes: "", status: "draft"
  });
  const [departments, setDepartments] = useState([
    { name: "Sales", budget: "" },
    { name: "Finance", budget: "" },
    { name: "Engineering", budget: "" },
  ]);

  useEffect(() => {
    loadAllocations();
  }, []);

  const loadAllocations = async () => {
    setLoading(true);
    const data = await base44.entities.BudgetAllocation.list("-created_date", 50);
    setAllocations(data);
    setLoading(false);
  };

  const totalDeptBudget = departments.reduce((s, d) => s + (parseFloat(d.budget) || 0), 0);
  const annualBudget = parseFloat(form.total_annual_budget) || 0;
  const remaining = annualBudget - totalDeptBudget;
  const saasEstimate = parseFloat(form.saas_fee) || 0;
  const takeRateEst = annualBudget * (form.take_rate_pct / 100) * 0.875; // assuming ~87.5% redemption
  const totalRevenueEst = saasEstimate + takeRateEst;

  const deptChartData = departments
    .filter(d => d.name && parseFloat(d.budget) > 0)
    .map(d => ({ name: d.name, budget: parseFloat(d.budget) || 0 }));

  const handleSave = async () => {
    setSaving(true);
    const payload = {
      ...form,
      total_annual_budget: parseFloat(form.total_annual_budget) || 0,
      monthly_cap: parseFloat(form.monthly_cap) || null,
      saas_fee: parseFloat(form.saas_fee) || null,
      take_rate_pct: parseFloat(form.take_rate_pct) || 5,
      year: parseInt(form.year),
      allocated_to_departments: JSON.stringify(
        departments.filter(d => d.name && d.budget).map(d => ({ name: d.name, budget: parseFloat(d.budget) }))
      ),
    };
    if (selected) {
      await base44.entities.BudgetAllocation.update(selected.id, payload);
    } else {
      await base44.entities.BudgetAllocation.create(payload);
    }
    await loadAllocations();
    setSaving(false);
    setShowForm(false);
    setSelected(null);
    resetForm();
  };

  const handleDelete = async (id) => {
    await base44.entities.BudgetAllocation.delete(id);
    await loadAllocations();
  };

  const handleEdit = (a) => {
    setSelected(a);
    setForm({
      company_name: a.company_name, year: a.year, total_annual_budget: a.total_annual_budget,
      release_mode: a.release_mode, monthly_cap: a.monthly_cap || "",
      saas_fee: a.saas_fee || "", take_rate_pct: a.take_rate_pct || 5,
      unused_expiry_policy: a.unused_expiry_policy || "expire", notes: a.notes || "", status: a.status
    });
    const depts = a.allocated_to_departments ? JSON.parse(a.allocated_to_departments) : [];
    setDepartments(depts.length ? depts.map(d => ({ name: d.name, budget: d.budget })) : [{ name: "", budget: "" }]);
    setShowForm(true);
  };

  const resetForm = () => {
    setForm({ company_name: "", year: CURRENT_YEAR, total_annual_budget: "", release_mode: "monthly", monthly_cap: "", saas_fee: "", take_rate_pct: 5, unused_expiry_policy: "expire", notes: "", status: "draft" });
    setDepartments([{ name: "Sales", budget: "" }, { name: "Finance", budget: "" }, { name: "Engineering", budget: "" }]);
  };

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const setDept = (i, k, v) => setDepartments(ds => ds.map((d, idx) => idx === i ? { ...d, [k]: v } : d));

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 backdrop-blur border-b border-border bg-card/80">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <DutyBoostLogo height={100} />
            <span className="text-sm font-medium text-muted-foreground border-l border-border pl-3">Yearly Budget Allocation</span>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-heading font-bold">Yearly Budget Allocation</h1>
            <p className="text-muted-foreground mt-1">Allocate annual F&B travel budgets into DutyCredits — distributed and controlled throughout the year.</p>
          </div>
          {!showForm && (
            <Button onClick={() => { resetForm(); setSelected(null); setShowForm(true); }} className="gap-2">
              <PlusCircle className="w-4 h-4" /> New Allocation
            </Button>
          )}
        </div>

        {showForm && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Form */}
            <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6 space-y-6">
              <h2 className="font-heading font-semibold text-lg">{selected ? "Edit Allocation" : "Create New Allocation"}</h2>

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 space-y-1.5">
                  <Label>Company Name <span className="text-red-500">*</span></Label>
                  <Input placeholder="Acme Corp" value={form.company_name} onChange={e => set("company_name", e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>Year <span className="text-red-500">*</span></Label>
                  <Input type="number" value={form.year} onChange={e => set("year", e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>Status</Label>
                  <Select value={form.status} onValueChange={v => set("status", v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Total Annual Budget (EUR) <span className="text-red-500">*</span></Label>
                  <Input type="number" placeholder="e.g. 1200000" value={form.total_annual_budget} onChange={e => set("total_annual_budget", e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>Credit Release Mode</Label>
                  <Select value={form.release_mode} onValueChange={v => set("release_mode", v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly release</SelectItem>
                      <SelectItem value="quarterly">Quarterly release</SelectItem>
                      <SelectItem value="trip_based">Trip-based release</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {form.release_mode === "monthly" && (
                  <div className="space-y-1.5">
                    <Label>Monthly Release Cap (EUR)</Label>
                    <Input type="number" placeholder="e.g. 100000" value={form.monthly_cap} onChange={e => set("monthly_cap", e.target.value)} />
                  </div>
                )}
                <div className="space-y-1.5">
                  <Label>Unused Credit Policy</Label>
                  <Select value={form.unused_expiry_policy} onValueChange={v => set("unused_expiry_policy", v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="expire">Expire at year-end</SelectItem>
                      <SelectItem value="rollover">Rollover to next year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Annual SaaS Fee (EUR)</Label>
                  <Input type="number" placeholder="e.g. 12000" value={form.saas_fee} onChange={e => set("saas_fee", e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>Take Rate (%)</Label>
                  <Select value={String(form.take_rate_pct)} onValueChange={v => set("take_rate_pct", parseFloat(v))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {[3, 4, 5, 6, 7, 8].map(r => <SelectItem key={r} value={String(r)}>{r}% on redeemed value</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Department allocations */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-semibold">Department Budget Allocations</Label>
                  <Button variant="outline" size="sm" onClick={() => setDepartments(ds => [...ds, { name: "", budget: "" }])}>
                    <PlusCircle className="w-3.5 h-3.5 mr-1" /> Add
                  </Button>
                </div>
                {departments.map((d, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Input placeholder="Department name" value={d.name} onChange={e => setDept(i, "name", e.target.value)} className="flex-1" />
                    <Input type="number" placeholder="EUR" value={d.budget} onChange={e => setDept(i, "budget", e.target.value)} className="w-36" />
                    <Button variant="ghost" size="icon" onClick={() => setDepartments(ds => ds.filter((_, idx) => idx !== i))}>
                      <Trash2 className="w-4 h-4 text-muted-foreground" />
                    </Button>
                  </div>
                ))}
                <div className={`text-sm flex items-center gap-2 mt-1 ${remaining < 0 ? "text-red-600" : remaining === 0 ? "text-green-600" : "text-muted-foreground"}`}>
                  {remaining < 0 ? <AlertCircle className="w-4 h-4" /> : remaining === 0 ? <CheckCircle2 className="w-4 h-4" /> : null}
                  Dept total: €{totalDeptBudget.toLocaleString()} — Remaining: €{remaining.toLocaleString()}
                </div>
              </div>

              <div className="space-y-1.5">
                <Label>Notes</Label>
                <Input placeholder="Optional notes..." value={form.notes} onChange={e => set("notes", e.target.value)} />
              </div>

              <div className="flex gap-3 pt-2">
                <Button variant="outline" onClick={() => { setShowForm(false); setSelected(null); }}>Cancel</Button>
                <Button onClick={handleSave} disabled={saving || !form.company_name || !form.total_annual_budget} className="gap-2">
                  <Save className="w-4 h-4" /> {saving ? "Saving..." : selected ? "Update Allocation" : "Create Allocation"}
                </Button>
              </div>
            </div>

            {/* Revenue estimate panel */}
            <div className="space-y-4">
              <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5 space-y-4">
                <h3 className="font-heading font-semibold text-sm text-primary flex items-center gap-2"><TrendingUp className="w-4 h-4" /> Revenue Estimate</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Annual budget allocated</span>
                    <span className="font-semibold">€{annualBudget.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Est. redemption (87.5%)</span>
                    <span className="font-semibold">€{(annualBudget * 0.875).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Take rate ({form.take_rate_pct}%)</span>
                    <span className="font-semibold text-green-700">€{takeRateEst.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">SaaS fee</span>
                    <span className="font-semibold text-green-700">€{saasEstimate.toLocaleString()}</span>
                  </div>
                  <div className="border-t border-primary/20 pt-3 flex justify-between font-bold">
                    <span>Est. total revenue</span>
                    <span className="text-primary">€{totalRevenueEst.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Unused credits (12.5%)</span>
                    <span className="text-muted-foreground">€{(annualBudget * 0.125).toLocaleString(undefined, { maximumFractionDigits: 0 })} margin upside</span>
                  </div>
                </div>
              </div>

              {deptChartData.length > 0 && (
                <div className="bg-card border border-border rounded-2xl p-5">
                  <h3 className="font-heading font-semibold text-sm mb-3 flex items-center gap-2"><PieChart className="w-4 h-4 text-primary" /> Dept Breakdown</h3>
                  <ResponsiveContainer width="100%" height={160}>
                    <BarChart data={deptChartData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="name" tick={{ fontSize: 10 }} tickLine={false} />
                      <YAxis tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                      <Tooltip contentStyle={{ fontSize: 11 }} formatter={v => [`€${v.toLocaleString()}`, "Budget"]} />
                      <Bar dataKey="budget" fill="#1F6FFF" radius={[3, 3, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Existing allocations */}
        {loading ? (
          <div className="flex items-center justify-center py-16"><div className="w-6 h-6 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>
        ) : allocations.length === 0 && !showForm ? (
          <div className="bg-card border border-border rounded-2xl p-12 text-center">
            <Layers className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <p className="font-semibold mb-1">No budget allocations yet</p>
            <p className="text-sm text-muted-foreground mb-4">Create your first yearly budget allocation to start distributing DutyCredits to corporate travelers.</p>
            <Button onClick={() => { resetForm(); setShowForm(true); }} className="gap-2"><PlusCircle className="w-4 h-4" /> New Allocation</Button>
          </div>
        ) : (
          <div className="space-y-4">
            {allocations.map(a => {
              const depts = a.allocated_to_departments ? JSON.parse(a.allocated_to_departments) : [];
              const takeEst = (a.total_annual_budget * 0.875 * (a.take_rate_pct || 5) / 100);
              const totalRev = takeEst + (a.saas_fee || 0);
              return (
                <div key={a.id} className="bg-card border border-border rounded-2xl p-6">
                  <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-heading font-bold">{a.company_name}</h3>
                        <p className="text-sm text-muted-foreground">{a.year} · {a.release_mode.replace("_", "-")} release</p>
                      </div>
                      <Badge className={
                        a.status === "active" ? "bg-green-100 text-green-700 border-green-200" :
                        a.status === "draft" ? "bg-amber-100 text-amber-700 border-amber-200" :
                        "bg-slate-100 text-slate-600 border-slate-200"
                      }>{a.status}</Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(a)}>Edit</Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(a.id)}>
                        <Trash2 className="w-4 h-4 text-muted-foreground" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    {[
                      { label: "Annual Budget", value: `€${(a.total_annual_budget || 0).toLocaleString()}`, icon: DollarSign, color: "text-primary" },
                      { label: "Take Rate", value: `${a.take_rate_pct || 5}%`, icon: TrendingUp, color: "text-green-700" },
                      { label: "SaaS Fee", value: a.saas_fee ? `€${a.saas_fee.toLocaleString()}` : "—", icon: Layers, color: "text-purple-600" },
                      { label: "Est. Total Revenue", value: `€${totalRev.toLocaleString(undefined, { maximumFractionDigits: 0 })}`, icon: TrendingUp, color: "text-orange-600" },
                    ].map(({ label, value, icon: Icon, color }) => (
                      <div key={label} className="bg-muted/30 rounded-xl p-3">
                        <p className={`text-lg font-bold ${color}`}>{value}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
                      </div>
                    ))}
                  </div>

                  {depts.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {depts.map((d, i) => (
                        <span key={i} className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
                          {d.name}: €{(d.budget || 0).toLocaleString()}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                    <span>Unused policy: <strong className="text-foreground">{a.unused_expiry_policy}</strong></span>
                    {a.monthly_cap && <span>Monthly cap: <strong className="text-foreground">€{a.monthly_cap.toLocaleString()}</strong></span>}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}