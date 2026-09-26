import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download, Landmark, CheckCircle2, Pencil, Save } from "lucide-react";
import { toast } from "sonner";

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

  const handleSaveBank = async (e) => {
    e.preventDefault();
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