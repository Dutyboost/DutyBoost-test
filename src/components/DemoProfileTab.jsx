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

// Commission model: transaction value × 5% (DutyBoost fee) × 20% (agency share) = payout
// So commission per airport = transactionValue × 0.01
const DEMO_INVOICES = [
  {
    month: "March 2026", status: "Paid", date: "1 Apr 2026",
    breakdown: [
      { airport: "Amsterdam Schiphol (AMS)", vouchers: 45, transactionValue: 18750 },
      { airport: "Rotterdam The Hague (RTM)", vouchers: 30, transactionValue: 7500 },
      { airport: "Eindhoven Airport (EIN)", vouchers: 25, transactionValue: 5000 },
    ]
  },
  {
    month: "February 2026", status: "Paid", date: "1 Mar 2026",
    breakdown: [
      { airport: "Amsterdam Schiphol (AMS)", vouchers: 39, transactionValue: 16250 },
      { airport: "Rotterdam The Hague (RTM)", vouchers: 25, transactionValue: 6250 },
      { airport: "Eindhoven Airport (EIN)", vouchers: 20, transactionValue: 5000 },
    ]
  },
  {
    month: "January 2026", status: "Paid", date: "1 Feb 2026",
    breakdown: [
      { airport: "Amsterdam Schiphol (AMS)", vouchers: 27, transactionValue: 11250 },
      { airport: "Rotterdam The Hague (RTM)", vouchers: 20, transactionValue: 4375 },
      { airport: "Eindhoven Airport (EIN)", vouchers: 18, transactionValue: 4250 },
    ]
  },
  {
    month: "December 2025", status: "Paid", date: "1 Jan 2026",
    breakdown: [
      { airport: "Amsterdam Schiphol (AMS)", vouchers: 58, transactionValue: 24500 },
      { airport: "Rotterdam The Hague (RTM)", vouchers: 36, transactionValue: 9000 },
      { airport: "Eindhoven Airport (EIN)", vouchers: 30, transactionValue: 7500 },
    ]
  },
].map(inv => {
  const totalCommission = inv.breakdown.reduce((s, r) => s + r.transactionValue * 0.01, 0);
  return { ...inv, amount: `€ ${totalCommission.toFixed(2)}` };
});

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

function downloadPayoutPDF(inv, entity, profile) {
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

  // Agency address block
  doc.setFontSize(10);
  doc.setTextColor(60);
  doc.text(`Agency: ${profile?.company || entity?.name || "Travel Agency"}`, 20, 55);
  let ay = 55;
  if (profile?.address) { ay += 7; doc.text(profile.address, 20, ay); }
  if (profile?.postal_city) { ay += 7; doc.text(profile.postal_city, 20, ay); }
  if (profile?.kvk) { ay += 7; doc.text(`KVK: ${profile.kvk}`, 20, ay); }
  doc.setTextColor(80);
  ay += 7; doc.text(`Paid out: ${inv.date}`, 20, ay);
  ay += 6; doc.text(`Generated: ${new Date().toLocaleDateString("nl-NL")}`, 20, ay);
  const payoutBoxY = ay + 10;

  // Airport breakdown — derived from inv.breakdown, all numbers chain correctly
  // transactionValue × 5% = DutyBoost fee; fee × 20% = agency commission
  const abSectionY = payoutBoxY;
  doc.setFontSize(12);
  doc.setTextColor(28,28,60);
  doc.text("Commission by Airport / Retailer", 20, abSectionY);
  doc.setDrawColor(200);
  doc.line(20, abSectionY + 3, 190, abSectionY + 3);

  // Column header
  doc.setFillColor(235, 242, 255);
  doc.rect(20, abSectionY + 6, 170, 8, "F");
  doc.setFontSize(8);
  doc.setTextColor(80);
  doc.text("Airport", 22, abSectionY + 12);
  doc.text("Vouchers", 88, abSectionY + 12);
  doc.text("Trans. Value", 108, abSectionY + 12);
  doc.text("5% Fee", 140, abSectionY + 12);
  doc.text("Your 20%", 163, abSectionY + 12);

  let abY = abSectionY + 22;
  (inv.breakdown || []).forEach(({ airport, vouchers, transactionValue }, i) => {
    if (i % 2 === 0) { doc.setFillColor(245,249,255); doc.rect(20, abY - 5, 170, 8, "F"); }
    const fee = transactionValue * 0.05;
    const commission = fee * 0.20;
    doc.setFontSize(8);
    doc.setTextColor(28,28,60);
    doc.text(airport, 22, abY);
    doc.setTextColor(80);
    doc.text(String(vouchers), 88, abY);
    doc.text(`€ ${transactionValue.toLocaleString("nl-NL")}`, 108, abY);
    doc.text(`€ ${fee.toFixed(2)}`, 140, abY);
    doc.setTextColor(0,140,80);
    doc.text(`€ ${commission.toFixed(2)}`, 163, abY);
    abY += 8;
  });

  // Totals row
  const totalTrans = (inv.breakdown || []).reduce((s, r) => s + r.transactionValue, 0);
  const totalFeeAll = totalTrans * 0.05;
  const totalCommAll = totalFeeAll * 0.20;
  doc.setFillColor(220, 235, 255);
  doc.rect(20, abY - 4, 170, 9, "F");
  doc.setFontSize(8);
  doc.setFont(undefined, "bold");
  doc.setTextColor(28,28,60);
  doc.text("Total", 22, abY + 2);
  doc.text(`€ ${totalTrans.toLocaleString("nl-NL")}`, 108, abY + 2);
  doc.text(`€ ${totalFeeAll.toFixed(2)}`, 140, abY + 2);
  doc.setTextColor(0,140,80);
  doc.text(`€ ${totalCommAll.toFixed(2)}`, 163, abY + 2);
  doc.setFont(undefined, "normal");
  abY += 14;

  doc.setFontSize(9);
  doc.setTextColor(150);
  const payoutLineY = abY + 4;
  doc.line(20, payoutLineY, 190, payoutLineY);
  doc.text("This payout statement is issued by DutyBoost B.V. for tax and accounting purposes.", 20, payoutLineY + 7);
  doc.text("DutyBoost B.V. · KVK: 12345678 · VAT: NL123456789B01 · IBAN: NL91ABNA0417164300", 20, payoutLineY + 14);

  doc.save(`DutyBoost_Payout_${inv.month.replace(/ /g, "_")}.pdf`);
}

function downloadInvoicePDF(inv, entity, profile) {
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

  // Retailer address block (dynamic Y)
  doc.setFontSize(10);
  doc.setTextColor(60);
  doc.text(`Retailer: ${profile?.company || entity?.name || "Airport Retailer"}`, 20, 55);
  let iy = 55;
  if (profile?.address) { iy += 7; doc.text(profile.address, 20, iy); }
  if (profile?.postal_city) { iy += 7; doc.text(profile.postal_city, 20, iy); }
  if (profile?.kvk) { iy += 7; doc.text(`KVK: ${profile.kvk}`, 20, iy); }
  if (profile?.vat) { iy += 7; doc.text(`VAT: ${profile.vat}`, 20, iy); }
  doc.setTextColor(80);
  iy += 7; doc.text(`Issued: ${inv.date}`, 20, iy);
  iy += 6; doc.text(`Generated: ${new Date().toLocaleDateString("nl-NL")}`, 20, iy);

  // Breakdown table: vouchers per airport → transaction value → 5% fee
  const tableY = iy + 12;
  doc.setFontSize(12);
  doc.setTextColor(28, 28, 60);
  doc.text("Redemption Breakdown by Airport", 20, tableY);
  doc.setDrawColor(200);
  doc.line(20, tableY + 3, 190, tableY + 3);

  doc.setFillColor(235, 242, 255);
  doc.rect(20, tableY + 6, 170, 8, "F");
  doc.setFontSize(8);
  doc.setTextColor(80);
  doc.text("Airport", 22, tableY + 12);
  doc.text("Vouchers", 100, tableY + 12);
  doc.text("Trans. Value", 120, tableY + 12);
  doc.text("5% Platform Fee", 158, tableY + 12);

  let ty = tableY + 22;
  (inv.breakdown || []).forEach(({ airport, vouchers, transactionValue }, i) => {
    if (i % 2 === 0) { doc.setFillColor(245, 249, 255); doc.rect(20, ty - 5, 170, 8, "F"); }
    const fee = transactionValue * 0.05;
    doc.setFontSize(8);
    doc.setTextColor(28, 28, 60);
    doc.text(airport, 22, ty);
    doc.setTextColor(80);
    doc.text(String(vouchers), 100, ty);
    doc.text(`€ ${transactionValue.toLocaleString("nl-NL")}`, 120, ty);
    doc.setTextColor(31, 111, 255);
    doc.text(`€ ${fee.toFixed(2)}`, 158, ty);
    ty += 8;
  });

  // Totals row
  const totalTrans = (inv.breakdown || []).reduce((s, r) => s + r.transactionValue, 0);
  const totalFee = totalTrans * 0.05;
  const totalVat = totalFee * 0.21;
  const totalDue = totalFee + totalVat;

  doc.setFillColor(220, 235, 255);
  doc.rect(20, ty - 4, 170, 9, "F");
  doc.setFontSize(8);
  doc.setFont(undefined, "bold");
  doc.setTextColor(28, 28, 60);
  doc.text("Total", 22, ty + 2);
  doc.text(`€ ${totalTrans.toLocaleString("nl-NL")}`, 120, ty + 2);
  doc.setTextColor(31, 111, 255);
  doc.text(`€ ${totalFee.toFixed(2)}`, 158, ty + 2);
  doc.setFont(undefined, "normal");
  ty += 14;

  // VAT + Total Due summary
  doc.setFontSize(10);
  doc.setTextColor(80);
  doc.text("Platform fee excl. VAT:", 110, ty);
  doc.setTextColor(28, 28, 60);
  doc.text(`€ ${totalFee.toFixed(2)}`, 186, ty, { align: "right" });
  ty += 8;
  doc.setTextColor(80);
  doc.text("VAT 21%:", 110, ty);
  doc.setTextColor(28, 28, 60);
  doc.text(`€ ${totalVat.toFixed(2)}`, 186, ty, { align: "right" });
  ty += 8;
  doc.setFontSize(11);
  doc.setFont(undefined, "bold");
  doc.setTextColor(31, 111, 255);
  doc.text("Total Due (incl. VAT):", 110, ty);
  doc.text(`€ ${totalDue.toFixed(2)}`, 186, ty, { align: "right" });
  doc.setFont(undefined, "normal");
  ty += 8;
  doc.setFontSize(10);
  doc.setTextColor(80);
  doc.text("Status:", 110, ty);
  doc.setTextColor(0, 140, 80);
  doc.text(inv.status, 135, ty);
  ty += 12;

  doc.setFontSize(9);
  doc.setTextColor(150);
  doc.line(20, ty, 190, ty);
  doc.text("All DutyBoost fees are exclusive of VAT. VAT (21%) is added separately as shown above.", 20, ty + 7);
  doc.text("This invoice is issued by DutyBoost B.V. for tax and accounting purposes.", 20, ty + 13);
  doc.text("DutyBoost B.V. · KVK: 12345678 · VAT: NL123456789B01 · IBAN: NL91ABNA0417164300", 20, ty + 20);

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
                  onClick={() => entityType === "agency" ? downloadPayoutPDF(inv, entity, profile) : downloadInvoicePDF(inv, entity, profile)}
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