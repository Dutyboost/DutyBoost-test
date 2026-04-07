import { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, Download, Landmark, CheckCircle2, User, FileText, Pencil, X, Save, CreditCard } from "lucide-react";
import { toast } from "sonner";

function EditableSection({ title, icon: Icon, fields, onSave }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(() => Object.fromEntries(fields.map(f => [f.key, f.value || ""])));
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await onSave(form);
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
          <button onClick={() => setEditing(true)} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
            <Pencil className="w-3 h-3" /> Edit
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button onClick={() => { setEditing(false); setForm(Object.fromEntries(fields.map(f => [f.key, f.value || ""]))); }}
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
        {fields.map(({ key, label, readonly }) => (
          <div key={key} className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">{label}</Label>
            {editing && !readonly ? (
              <Input value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} className="h-8 text-sm" />
            ) : (
              <p className="text-sm font-medium py-1">{form[key] || "—"}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ProfileTab({ user, onUserUpdate, invoiceComponent }) {
  const [bankForm, setBankForm] = useState({
    bank_account_name: user?.bank_account_name || "",
    bank_iban: user?.bank_iban || "",
  });
  const [bankEditing, setBankEditing] = useState(false);
  const [bankSaving, setBankSaving] = useState(false);
  const [cardForm, setCardForm] = useState({
    card_name: user?.card_name || "",
    card_number: user?.card_number || "",
    card_expiry: user?.card_expiry || "",
  });
  const [cardEditing, setCardEditing] = useState(false);
  const [cardSaving, setCardSaving] = useState(false);

  const saveFields = async (data) => {
    await base44.auth.updateMe(data);
    if (onUserUpdate) onUserUpdate({ ...user, ...data });
  };

  const handleSaveBank = async (e) => {
    e.preventDefault();
    setBankSaving(true);
    await base44.auth.updateMe(bankForm);
    if (onUserUpdate) onUserUpdate({ ...user, ...bankForm });
    setBankSaving(false);
    setBankEditing(false);
    toast.success("Bank details saved!");
  };

  const handleSaveCard = async (e) => {
    e.preventDefault();
    setCardSaving(true);
    await base44.auth.updateMe(cardForm);
    if (onUserUpdate) onUserUpdate({ ...user, ...cardForm });
    setCardSaving(false);
    setCardEditing(false);
    toast.success("Card details saved!");
  };

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Account Info - name & email are read-only built-ins */}
      <EditableSection
        title="Account Information"
        icon={User}
        fields={[
          { key: "full_name", label: "Full Name", value: user?.full_name, readonly: true },
          { key: "email", label: "Email", value: user?.email, readonly: true },
          { key: "company", label: "Company", value: user?.company },
          { key: "phone", label: "Phone Number", value: user?.phone },
        ]}
        onSave={saveFields}
      />

      {/* Company Details */}
      <EditableSection
        title="Company Details"
        icon={Building2}
        fields={[
          { key: "kvk", label: "KVK Number", value: user?.kvk },
          { key: "vat", label: "VAT Number", value: user?.vat },
          { key: "website", label: "Website", value: user?.website },
          { key: "airport", label: "Airport / Location", value: user?.airport },
          { key: "address", label: "Street Address", value: user?.address },
          { key: "postal_city", label: "Postal Code & City", value: user?.postal_city },
        ]}
        onSave={saveFields}
      />

      {/* Credit Card (if available) */}
      {user?.card_number && (
        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-heading font-semibold">Credit Card</h3>
                <p className="text-sm text-muted-foreground">Payment method on file.</p>
              </div>
            </div>
            {!cardEditing && (
              <button onClick={() => setCardEditing(true)} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
                <Pencil className="w-3 h-3" /> Edit
              </button>
            )}
          </div>
          {!cardEditing && (
            <div className="flex items-center gap-2 text-sm text-blue-700 bg-blue-50 rounded-lg px-3 py-2">
              <CheckCircle2 className="w-4 h-4" />
              Card ending in <span className="font-mono font-medium ml-1">****{user.card_number.slice(-4)}</span>
            </div>
          )}
          {cardEditing ? (
            <form onSubmit={handleSaveCard} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Cardholder Name</Label>
                  <Input value={cardForm.card_name} onChange={e => setCardForm(f => ({ ...f, card_name: e.target.value }))} required />
                </div>
                <div className="space-y-2">
                  <Label>Card Number</Label>
                  <Input value={cardForm.card_number} onChange={e => setCardForm(f => ({ ...f, card_number: e.target.value }))} required />
                </div>
                <div className="space-y-2">
                  <Label>Expiry Date (MM/YY)</Label>
                  <Input value={cardForm.card_expiry} onChange={e => setCardForm(f => ({ ...f, card_expiry: e.target.value }))} placeholder="MM/YY" required />
                </div>
              </div>
              <div className="flex gap-2">
                <Button type="submit" disabled={cardSaving} size="sm" className="gap-1"><Save className="w-3 h-3" /> {cardSaving ? "Saving..." : "Save"}</Button>
                <Button type="button" variant="outline" size="sm" onClick={() => setCardEditing(false)}>Cancel</Button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1"><p className="text-xs text-muted-foreground">Cardholder</p><p className="text-sm font-medium">{user?.card_name || "—"}</p></div>
              <div className="space-y-1"><p className="text-xs text-muted-foreground">Card Number</p><p className="font-mono text-sm font-medium">****{user.card_number.slice(-4)}</p></div>
              <div className="space-y-1"><p className="text-xs text-muted-foreground">Expiry</p><p className="text-sm font-medium">{user?.card_expiry || "—"}</p></div>
            </div>
          )}
        </div>
      )}

      {/* Bank Details */}
      <div className="bg-card border border-border rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
              <Landmark className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h3 className="font-heading font-semibold">Bank Details for Payouts</h3>
              <p className="text-sm text-muted-foreground">Your earnings are transferred here monthly.</p>
            </div>
          </div>
          {!bankEditing && (
            <button onClick={() => setBankEditing(true)} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
              <Pencil className="w-3 h-3" /> Edit
            </button>
          )}
        </div>
        {user?.bank_iban && !bankEditing && (
          <div className="flex items-center gap-2 text-sm text-emerald-700 bg-emerald-50 rounded-lg px-3 py-2">
            <CheckCircle2 className="w-4 h-4" />
            Bank details on file: <span className="font-mono font-medium ml-1">{user.bank_iban}</span>
          </div>
        )}
        {bankEditing ? (
          <form onSubmit={handleSaveBank} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Account Holder Name</Label>
                <Input value={bankForm.bank_account_name} onChange={e => setBankForm(f => ({ ...f, bank_account_name: e.target.value }))} required />
              </div>
              <div className="space-y-2">
                <Label>IBAN</Label>
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
            <div className="space-y-1"><p className="text-xs text-muted-foreground">Account Holder</p><p className="text-sm font-medium">{user?.bank_account_name || "—"}</p></div>
            <div className="space-y-1"><p className="text-xs text-muted-foreground">IBAN</p><p className="font-mono text-sm font-medium">{user?.bank_iban || "—"}</p></div>
          </div>
        )}
      </div>

      {/* Payout History */}
      {invoiceComponent && (
        <div>
          <h3 className="font-heading font-semibold text-base mb-3 flex items-center gap-2">
            <Download className="w-4 h-4 text-primary" /> Payout History
          </h3>
          {invoiceComponent}
        </div>
      )}
    </div>
  );
}