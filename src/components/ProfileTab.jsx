import { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, Mail, Phone, MapPin, CreditCard, Download, Landmark, CheckCircle2, User } from "lucide-react";
import { toast } from "sonner";

export default function ProfileTab({ user, onUserUpdate, invoiceComponent }) {
  const [bankForm, setBankForm] = useState({
    bank_account_name: user?.bank_account_name || "",
    bank_iban: user?.bank_iban || "",
  });
  const [saving, setSaving] = useState(false);

  const handleSaveBank = async (e) => {
    e.preventDefault();
    setSaving(true);
    await base44.auth.updateMe(bankForm);
    if (onUserUpdate) onUserUpdate({ ...user, ...bankForm });
    setSaving(false);
    toast.success("Bank details saved!");
  };

  const infoRows = [
    { label: "Full Name", value: user?.full_name },
    { label: "Email", value: user?.email },
    { label: "Company", value: user?.company || "—" },
    { label: "Account Type", value: user?.role === "retailer" ? "Airport Retailer" : "Travel Agency" },
  ];

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Account Info */}
      <div className="bg-card border border-border rounded-xl p-6 space-y-4">
        <h3 className="font-heading font-semibold text-base flex items-center gap-2">
          <User className="w-4 h-4 text-primary" /> Account Information
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {infoRows.map(({ label, value }) => (
            <div key={label} className="space-y-1">
              <p className="text-xs text-muted-foreground font-medium">{label}</p>
              <p className="text-sm font-medium">{value || "—"}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Address & Company (from signup application if available) */}
      <div className="bg-card border border-border rounded-xl p-6 space-y-4">
        <h3 className="font-heading font-semibold text-base flex items-center gap-2">
          <Building2 className="w-4 h-4 text-primary" /> Company Details
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: "KVK Number", value: user?.kvk },
            { label: "VAT Number", value: user?.vat },
            { label: "Website", value: user?.website },
            { label: "Airport / Location", value: user?.airport },
          ].map(({ label, value }) => (
            <div key={label} className="space-y-1">
              <p className="text-xs text-muted-foreground font-medium">{label}</p>
              <p className="text-sm font-medium">{value || "—"}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bank Details */}
      <div className="bg-card border border-border rounded-xl p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
            <Landmark className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <h3 className="font-heading font-semibold">Bank Details for Commission Payouts</h3>
            <p className="text-sm text-muted-foreground">DutyBoost will transfer your earnings directly to this account monthly.</p>
          </div>
        </div>
        {user?.bank_iban && (
          <div className="flex items-center gap-2 text-sm text-emerald-700 bg-emerald-50 rounded-lg px-3 py-2">
            <CheckCircle2 className="w-4 h-4" />
            Bank details on file: <span className="font-mono font-medium ml-1">{user.bank_iban}</span>
          </div>
        )}
        <form onSubmit={handleSaveBank} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Account Holder Name</Label>
              <Input
                placeholder="e.g. My Company B.V."
                value={bankForm.bank_account_name}
                onChange={e => setBankForm(f => ({ ...f, bank_account_name: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>IBAN</Label>
              <Input
                placeholder="e.g. NL91ABNA0417164300"
                value={bankForm.bank_iban}
                onChange={e => setBankForm(f => ({ ...f, bank_iban: e.target.value.toUpperCase() }))}
                required
              />
            </div>
          </div>
          <Button type="submit" disabled={saving}>{saving ? "Saving..." : "Save Bank Details"}</Button>
        </form>
      </div>

      {/* Invoices */}
      {invoiceComponent && (
        <div>
          <h3 className="font-heading font-semibold text-base mb-3 flex items-center gap-2">
            <Download className="w-4 h-4 text-primary" /> Invoices & Reports
          </h3>
          {invoiceComponent}
        </div>
      )}
    </div>
  );
}