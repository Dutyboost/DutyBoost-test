import { useState } from "react";
import { jsPDF } from "jspdf";
import { Building2, Download, Landmark, User, FileText, CheckCircle2, Pencil, X, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const AGENCY_PROFILES = {
  ag1: { company: "Horizon Travel Group B.V.", kvk: "34156789", vat: "NL123456789B01", address: "Wilhelminaplein 12", postal_city: "3072 DE Rotterdam", website: "www.horizontravel.nl", phone: "+31 10 456 7890", iban: "NL91ABNA0417164300", holder: "Horizon Travel Group B.V.", airport: "" },
  ag2: { company: "Skybound Holidays B.V.", kvk: "27384950", vat: "NL987654321B02", address: "Koningskade 8", postal_city: "2596 AA Den Haag", website: "www.skyboundholidays.nl", phone: "+31 70 312 5500", iban: "NL44RABO0123456789", holder: "Skybound Holidays B.V.", airport: "" },
  ag3: { company: "Compass Reizen B.V.", kvk: "19283746", vat: "NL567891234B01", address: "Barendrechtseweg 5", postal_city: "2992 LA Barendrecht", website: "www.compassreizen.nl", phone: "+31 180 643 210", iban: "NL18INGB0001234567", holder: "Compass Reizen B.V.", airport: "" },
  default: { company: "Demo Travel Agency B.V.", kvk: "12345678", vat: "NL000000000B01", address: "Damrak 1", postal_city: "1012 LG Amsterdam", website: "www.demoagency.nl", phone: "+31 20 000 0000", iban: "NL91ABNA0000000000", holder: "Demo Agency B.V.", airport: "" },
};

const RETAILER_PROFILES = {
  r1: { company: "The Style Loft B.V.", kvk: "98765432", vat: "NL111222333B01", address: "Schiphol Plaza, Gate E9", postal_city: "1118 AV Schiphol", website: "www.thestyleloft.nl", phone: "+31 20 601 2345", iban: "NL91ABNA0417164300", holder: "The Style Loft B.V.", airport: "AMS" },
  r4: { company: "Gateway Duty Free N.V.", kvk: "11223344", vat: "NL444555666B01", address: "Schiphol Central Hall", postal_city: "1118 AV Schiphol", website: "www.gatewaydf.nl", phone: "+31 20 601 9900", iban: "NL44RABO0123456789", holder: "Gateway Duty Free N.V.", airport: "AMS" },
  default: { company: "Demo Retailer B.V.", kvk: "55566677", vat: "NL777888999B01", address: "Airport Terminal 1", postal_city: "1118 AV Schiphol", website: "www.demoretailer.nl", phone: "+31 20 000 1111", iban: "NL18INGB0001234567", holder: "Demo Retailer B.V.", airport: "AMS" },
};

const DEMO_INVOICES = [
  { month: "March 2026", amount: "€ 312.50", status: "Paid", date: "1 Apr 2026" },
  { month: "February 2026", amount: "€ 275.00", status: "Paid", date: "1 Mar 2026" },
  { month: "January 2026", amount: "€ 198.75", status: "Paid", date: "1 Feb 2026" },
  { month: "December 2025", amount: "€ 410.00", status: "Paid", date: "1 Jan 2026" },
];

function EditableSection({ title, icon: Icon, fields, form, onChange }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState({ ...form });

  const handleSave = () => {
    Object.entries(draft).forEach(([k, v]) => onChange(k, v));
    setEditing(false);
    toast.success("Saved successfully!");
  };

  const handleCancel = () => {
    setDraft({ ...form });
    setEditing(false);
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-heading font-semibold text-base flex items-center gap-2">
          <Icon className="w-4 h-4 text-primary" /> {title}
        </h3>
        {!editing ? (
          <button onClick={() => { setDraft({ ...form }); setEditing(true); }} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
            <Pencil className="w-3 h-3" /> Edit
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button onClick={handleCancel} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive transition-colors">
              <X className="w-3 h-3" /> Cancel
            </button>
            <Button size="sm" onClick={handleSave} className="h-7 text-xs gap-1">
              <Save className="w-3 h-3" /> Save
            </Button>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fields.map(({ key, label, readonly }) => (
          <div key={key} className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">{label}</Label>
            {editing && !readonly ? (
              <Input value={draft[key] || ""} onChange={e => setDraft(d => ({ ...d, [key]: e.target.value }))} className="h-8 text-sm" />
            ) : (
              <p className="text-sm font-medium py-1">{form[key] || "—"}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function downloadPayoutPDF(inv, entity) {
  const doc = new jsPDF();
  doc.setFontSize(20);
  doc.setTextColor(31, 111, 255);
  doc.text("DutyBoost", 20, 20);
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text("DutyBoost B.V. · hello@dutyboost.com · dutyboost.com", 20, 28);

  doc.setFontSize(15);
  doc.setTextColor(31, 111, 255);
  doc.text(`Payout Statement — ${inv.month}`, 20, 45);
  doc.setFontSize(10);
  doc.setTextColor(80);
  doc.text(`Agency: ${entity?.name || "Travel Agency"}`, 20, 53);
  doc.text(`Paid out: ${inv.date}`, 20, 59);
  doc.text(`Generated: ${new Date().toLocaleDateString("nl-NL")}`, 20, 65);

  doc.setFillColor(235, 242, 255);
  doc.roundedRect(20, 74, 170, 38, 3, 3, "F");
  doc.setFontSize(10);
  doc.setTextColor(80);
  doc.text("Revenue share from airport retailer commissions (20% of 5% fee):", 25, 84);
  doc.setFontSize(14);
  doc.setTextColor(0, 196, 140);
  doc.setFont(undefined, "bold");
  doc.text(inv.amount, 170, 98, { align: "right" });
  doc.setFont(undefined, "normal");
  doc.setFontSize(10);
  doc.setTextColor(80);
  doc.text("Status:", 25, 106);
  doc.setTextColor(0, 140, 80);
  doc.text(inv.status, 70, 106);

  doc.setFontSize(9);
  doc.setTextColor(150);
  doc.line(20, 120, 190, 120);
  doc.text("This payout statement is issued by DutyBoost B.V. for tax and accounting purposes.", 20, 127);
  doc.text("DutyBoost B.V. · KVK: 12345678 · VAT: NL123456789B01 · IBAN: NL91ABNA0417164300", 20, 133);

  doc.save(`DutyBoost_Payout_${inv.month.replace(/ /g, "_")}.pdf`);
}

function downloadInvoicePDF(inv, entity) {
  const doc = new jsPDF();
  doc.setFontSize(20);
  doc.setTextColor(31, 111, 255);
  doc.text("DutyBoost", 20, 20);
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text("DutyBoost B.V. · hello@dutyboost.com · dutyboost.com", 20, 28);

  doc.setFontSize(15);
  doc.setTextColor(31, 111, 255);
  doc.text(`Invoice — ${inv.month}`, 20, 45);
  doc.setFontSize(10);
  doc.setTextColor(80);
  doc.text(`Retailer: ${entity?.name || "Airport Retailer"}`, 20, 53);
  doc.text(`Issued: ${inv.date}`, 20, 59);
  doc.text(`Generated: ${new Date().toLocaleDateString("nl-NL")}`, 20, 65);

  doc.setFillColor(235, 242, 255);
  doc.roundedRect(20, 74, 170, 38, 3, 3, "F");
  doc.setFontSize(10);
  doc.setTextColor(80);
  doc.text("Platform fee (5% of total redemption value processed via DutyBoost):", 25, 84);
  doc.setFontSize(14);
  doc.setTextColor(31, 111, 255);
  doc.setFont(undefined, "bold");
  doc.text(inv.amount, 170, 98, { align: "right" });
  doc.setFont(undefined, "normal");
  doc.setFontSize(10);
  doc.setTextColor(80);
  doc.text("Status:", 25, 106);
  doc.setTextColor(0, 140, 80);
  doc.text(inv.status, 70, 106);

  doc.setFontSize(9);
  doc.setTextColor(150);
  doc.line(20, 120, 190, 120);
  doc.text("This invoice is issued by DutyBoost B.V. for tax and accounting purposes.", 20, 127);
  doc.text("DutyBoost B.V. · KVK: 12345678 · VAT: NL123456789B01 · IBAN: NL91ABNA0417164300", 20, 133);

  doc.save(`DutyBoost_Invoice_${inv.month.replace(/ /g, "_")}.pdf`);
}

export default function DemoProfileTab({ entity, entityType = "agency" }) {
  const profiles = entityType === "agency" ? AGENCY_PROFILES : RETAILER_PROFILES;
  const initialProfile = profiles[entity?.id] || profiles.default;
  const [profile, setProfile] = useState({ ...initialProfile, contactName: "Demo User", email: "demo@dutyboost.com", phone: initialProfile.phone });

  const updateField = (key, value) => setProfile(p => ({ ...p, [key]: value }));

  const [bankEditing, setBankEditing] = useState(false);
  const [bankDraft, setBankDraft] = useState({ iban: profile.iban, holder: profile.holder });

  const handleSaveBank = (e) => {
    e.preventDefault();
    setProfile(p => ({ ...p, iban: bankDraft.iban, holder: bankDraft.holder }));
    setBankEditing(false);
    toast.success("Bank details saved!");
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <EditableSection
        title="Account Information"
        icon={User}
        form={{ contactName: profile.contactName, email: profile.email, company: profile.company, phone: profile.phone }}
        onChange={updateField}
        fields={[
          { key: "contactName", label: "Contact Person" },
          { key: "email", label: "Email", readonly: true },
          { key: "company", label: "Company" },
          { key: "phone", label: "Phone Number" },
        ]}
      />

      <EditableSection
        title="Company & Billing Details"
        icon={Building2}
        form={{ kvk: profile.kvk, vat: profile.vat, address: profile.address, postal_city: profile.postal_city, website: profile.website, ...(entityType === "retailer" ? { airport: profile.airport } : {}) }}
        onChange={updateField}
        fields={[
          { key: "kvk", label: "KVK Number" },
          { key: "vat", label: "VAT Number" },
          { key: "address", label: "Street Address" },
          { key: "postal_city", label: "Postal Code & City" },
          { key: "website", label: "Website" },
          ...(entityType === "retailer" ? [{ key: "airport", label: "Airport Code" }] : []),
        ]}
      />

      {/* Bank Details */}
      <div className="bg-card border border-border rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-heading font-semibold text-base flex items-center gap-2">
            <Landmark className="w-4 h-4 text-emerald-600" /> Bank Account (Payout)
          </h3>
          {!bankEditing && (
            <button onClick={() => { setBankDraft({ iban: profile.iban, holder: profile.holder }); setBankEditing(true); }} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
              <Pencil className="w-3 h-3" /> Edit
            </button>
          )}
        </div>
        {!bankEditing ? (
          <>
            <div className="flex items-center gap-2 text-sm text-emerald-700 bg-emerald-50 rounded-lg px-3 py-2">
              <CheckCircle2 className="w-4 h-4" />
              Bank details on file: <span className="font-mono font-medium ml-1">{profile.iban}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="space-y-1"><p className="text-xs text-muted-foreground">Account Holder</p><p className="font-medium">{profile.holder}</p></div>
              <div className="space-y-1"><p className="text-xs text-muted-foreground">IBAN</p><p className="font-mono font-medium">{profile.iban}</p></div>
            </div>
          </>
        ) : (
          <form onSubmit={handleSaveBank} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Account Holder</Label><Input value={bankDraft.holder} onChange={e => setBankDraft(d => ({ ...d, holder: e.target.value }))} required /></div>
              <div className="space-y-2"><Label>IBAN</Label><Input value={bankDraft.iban} onChange={e => setBankDraft(d => ({ ...d, iban: e.target.value.toUpperCase() }))} required /></div>
            </div>
            <div className="flex gap-2">
              <Button type="submit" size="sm" className="gap-1"><Save className="w-3 h-3" /> Save</Button>
              <Button type="button" variant="outline" size="sm" onClick={() => setBankEditing(false)}>Cancel</Button>
            </div>
          </form>
        )}
      </div>

      {/* Payout History */}
      <div className="bg-card border border-border rounded-xl p-6 space-y-4">
        <h3 className="font-heading font-semibold text-base flex items-center gap-2">
          <FileText className="w-4 h-4 text-primary" /> {entityType === "agency" ? "Payout History" : "Invoice History"}
        </h3>
        <div className="space-y-2">
          {DEMO_INVOICES.map(inv => (
            <div key={inv.month} className="flex items-center justify-between p-3 rounded-lg bg-muted/40 hover:bg-muted/60 transition-colors">
              <div>
                <p className="text-sm font-medium">{inv.month}</p>
                <p className="text-xs text-muted-foreground">{entityType === "agency" ? "Paid out" : "Issued"} {inv.date}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold">{inv.amount}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-semibold">{inv.status}</span>
                <button
                  onClick={() => entityType === "agency" ? downloadPayoutPDF(inv, entity) : downloadInvoicePDF(inv, entity)}
                  className="text-xs text-primary hover:underline flex items-center gap-1">
                  <Download className="w-3 h-3" /> PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}