import { useState, useEffect, useMemo } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, Download, Landmark, CheckCircle2, User, FileText, Pencil, X, Save } from "lucide-react";
import { toast } from "sonner";

const LEGAL_SUFFIXES = ["bv", "nv", "gmbh", "ltd", "limited", "inc", "llc", "plc", "sa", "ag", "srl", "spa", "oy", "ab", "as", "corp", "co"];

// Email extension follows the company: website domain first, otherwise the company name.
function companyDomain(company, website) {
  const site = (website || "").trim();
  if (site) {
    const host = site.replace(/^https?:\/\//i, "").replace(/^www\./i, "").split(/[/?#]/)[0];
    if (host.includes(".")) return host.toLowerCase();
  }
  const words = (company || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim().split(/\s+/)
    .filter(w => w && !LEGAL_SUFFIXES.includes(w));
  return words.length ? `${words.join("")}.com` : "";
}

function withDomain(email, domain) {
  const local = (email || "").split("@")[0];
  return local && domain ? `${local}@${domain}` : (email || "");
}

function EditableSection({ title, icon: Icon, fields, values, onChange, onRestore, onSave, emailDomain }) {
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [snapshot, setSnapshot] = useState(null);

  const startEdit = () => {
    setSnapshot(Object.fromEntries(fields.map(f => [f.key, values[f.key] || ""])));
    setEditing(true);
  };

  const cancelEdit = () => {
    if (snapshot) onRestore(snapshot);
    setEditing(false);
  };

  const handleSave = async () => {
    const missing = fields.filter(f => {
      if (f.readonly) return false;
      const v = String(values[f.key] || "").trim();
      if (!v) return true;
      return f.usesDomain && (!v.includes("@") || v.endsWith("@"));
    });
    if (missing.length) {
      toast.error(`Please complete all fields: ${missing.map(f => f.label).join(", ")}`);
      return;
    }
    setSaving(true);
    await onSave();
    setSaving(false);
    setEditing(false);
    toast.success("Saved successfully!");
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-heading font-semibold text-base flex items-center gap-2">
          <Icon className="w-4 h-4 text-primary" /> {title}
        </h3>
        {!editing ? (
          <button onClick={startEdit} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
            <Pencil className="w-3 h-3" /> Edit
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button onClick={cancelEdit}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive transition-colors">
              <X className="w-3 h-3" /> Cancel
            </button>
            <Button size="sm" onClick={handleSave} disabled={saving} className="h-7 text-xs gap-1">
              <Save className="w-3 h-3" /> {saving ? "Saving..." : "Save"}
            </Button>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fields.map(({ key, label, readonly, usesDomain }) => {
          const empty = editing && !readonly && !String(values[key] || "").trim();
          return (
            <div key={key} className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">
                {label} <span className="text-destructive">*</span>
              </Label>
              {editing && !readonly ? (
                usesDomain ? (
                  <div className="flex items-center gap-1">
                    <Input
                      value={(values[key] || "").split("@")[0]}
                      onChange={e => onChange(key, e.target.value ? (emailDomain ? `${e.target.value}@${emailDomain}` : e.target.value) : "")}
                      className={`h-8 text-sm ${empty ? "border-destructive" : ""}`}
                    />
                    <span className="text-xs text-muted-foreground whitespace-nowrap">@{emailDomain || "company.com"}</span>
                  </div>
                ) : (
                  <Input
                    value={values[key] || ""}
                    onChange={e => onChange(key, e.target.value)}
                    className={`h-8 text-sm ${empty ? "border-destructive" : ""}`}
                  />
                )
              ) : (
                <p className="text-sm font-medium py-1">{values[key] || "—"}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function ProfileTab({
  user,
  onUserUpdate,
  invoiceComponent,
  showBankDetails = true,
  invoiceHeading = "Payout History",
  bankTitle = "Bank Details for Payouts",
  bankBlurb = "Your earnings are transferred here monthly.",
  bankKeys = { name: "bank_account_name", iban: "bank_iban" },
}) {
  const [profile, setProfile] = useState({
    contact_name: user?.contact_name || "",
    contact_email: user?.contact_email || "",
    phone: user?.phone || "",
    company: user?.company || "",
    website: user?.website || "",
    kvk: user?.kvk || "",
    vat: user?.vat || "",
  });
  const [bankForm, setBankForm] = useState({
    bank_account_name: user?.[bankKeys.name] || "",
    bank_iban: user?.[bankKeys.iban] || "",
  });
  const [bankEditing, setBankEditing] = useState(false);
  const [bankSaving, setBankSaving] = useState(false);
  useEffect(() => {
    setBankForm({
      bank_account_name: user?.[bankKeys.name] || "",
      bank_iban: user?.[bankKeys.iban] || "",
    });
  }, [user]);

  const emailDomain = useMemo(() => companyDomain(profile.company, profile.website), [profile.company, profile.website]);

  // Keep the email extension in sync with the company name / website.
  useEffect(() => {
    setProfile(p => {
      const synced = withDomain(p.contact_email, emailDomain);
      return synced === p.contact_email ? p : { ...p, contact_email: synced };
    });
  }, [emailDomain]);

  const setField = (key, value) => setProfile(p => ({ ...p, [key]: value }));
  const restoreFields = (snapshot) => setProfile(p => ({ ...p, ...snapshot }));

  const saveProfile = async () => {
    const payload = Object.fromEntries(Object.entries(profile).filter(([, v]) => v !== "" && v != null));
    await base44.auth.updateMe(payload);
    if (onUserUpdate) onUserUpdate({ ...user, ...payload });
  };

  const handleSaveBank = async (e) => {
    e.preventDefault();
    if (!bankForm.bank_account_name.trim() || !bankForm.bank_iban.trim()) {
      toast.error("Please complete all billing fields.");
      return;
    }
    setBankSaving(true);
    const payload = {
      [bankKeys.name]: bankForm.bank_account_name,
      [bankKeys.iban]: bankForm.bank_iban,
    };
    await base44.auth.updateMe(payload);
    if (onUserUpdate) onUserUpdate({ ...user, ...payload });
    setBankSaving(false);
    setBankEditing(false);
    toast.success("Bank details saved!");
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <EditableSection
        title="User Information"
        icon={User}
        emailDomain={emailDomain}
        values={profile}
        onChange={setField}
        onRestore={restoreFields}
        onSave={saveProfile}
        fields={[
          { key: "contact_name", label: "Full Name" },
          { key: "contact_email", label: "Email", usesDomain: true },
          { key: "phone", label: "Phone Number" },
        ]}
      />

      <EditableSection
        title="Company Information"
        icon={Building2}
        emailDomain={emailDomain}
        values={profile}
        onChange={setField}
        onRestore={restoreFields}
        onSave={saveProfile}
        fields={[
          { key: "company", label: "Company Name" },
          { key: "website", label: "Website" },
          { key: "kvk", label: "CoC Number" },
          { key: "vat", label: "VAT Number" },
        ]}
      />

      {showBankDetails && (
      <div className="bg-card border border-border rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
              <Landmark className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h3 className="font-heading font-semibold">{bankTitle}</h3>
              <p className="text-sm text-muted-foreground">{bankBlurb}</p>
            </div>
          </div>
          {!bankEditing && (
            <button onClick={() => setBankEditing(true)} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
              <Pencil className="w-3 h-3" /> Edit
            </button>
          )}
        </div>
        {user?.[bankKeys.iban] && !bankEditing && (
          <div className="flex items-center gap-2 text-sm text-emerald-700 bg-emerald-50 rounded-lg px-3 py-2">
            <CheckCircle2 className="w-4 h-4" />
            Bank details on file: <span className="font-mono font-medium ml-1">{user[bankKeys.iban]}</span>
          </div>
        )}
        {bankEditing ? (
          <form onSubmit={handleSaveBank} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Account Holder Name <span className="text-destructive">*</span></Label>
                <Input value={bankForm.bank_account_name} onChange={e => setBankForm(f => ({ ...f, bank_account_name: e.target.value }))} required />
              </div>
              <div className="space-y-2">
                <Label>IBAN <span className="text-destructive">*</span></Label>
                <Input value={bankForm.bank_iban} onChange={e => setBankForm(f => ({ ...f, bank_iban: e.target.value.toUpperCase() }))} required />
              </div>
            </div>
            <div className="flex gap-2">
              <Button type="submit" disabled={bankSaving} size="sm" className="gap-1"><Save className="w-3 h-3" /> {bankSaving ? "Saving..." : "Save"}</Button>
              <Button type="button" variant="outline" size="sm" onClick={() => setBankEditing(false)}>Cancel</Button>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1"><p className="text-xs text-muted-foreground">Account Holder</p><p className="text-sm font-medium">{user?.[bankKeys.name] || "—"}</p></div>
            <div className="space-y-1"><p className="text-xs text-muted-foreground">IBAN</p><p className="font-mono text-sm font-medium">{user?.[bankKeys.iban] || "—"}</p></div>
          </div>
        )}
      </div>
      )}

      {invoiceComponent && (
        <div>
          <h3 className="font-heading font-semibold text-base mb-3 flex items-center gap-2">
            <Download className="w-4 h-4 text-primary" /> {invoiceHeading}
          </h3>
          {invoiceComponent}
        </div>
      )}
    </div>
  );
}