import { Building2, Mail, Phone, MapPin, CreditCard, Download, Landmark, User, FileText, CheckCircle2 } from "lucide-react";

const AGENCY_PROFILES = {
  ag1: { company: "Horizon Travel Group B.V.", kvk: "34156789", vat: "NL123456789B01", address: "Wilhelminaplein 12", city: "Rotterdam", postal: "3072 DE", iban: "NL91ABNA0417164300", holder: "Horizon Travel Group B.V." },
  ag2: { company: "Skybound Holidays B.V.", kvk: "27384950", vat: "NL987654321B02", address: "Koningskade 8", city: "Rijswijk", postal: "2596 AA", iban: "NL44RABO0123456789", holder: "Skybound Holidays B.V." },
  ag3: { company: "Compass Reizen B.V.", kvk: "19283746", vat: "NL567891234B01", address: "Barendrechtseweg 5", city: "Barendrecht", postal: "2992 LA", iban: "NL18INGB0001234567", holder: "Compass Reizen B.V." },
  default: { company: "Demo Travel Agency B.V.", kvk: "12345678", vat: "NL000000000B01", address: "Damrak 1", city: "Amsterdam", postal: "1012 LG", iban: "NL91ABNA0000000000", holder: "Demo Agency B.V." },
};

const RETAILER_PROFILES = {
  r1: { company: "The Style Loft B.V.", kvk: "98765432", vat: "NL111222333B01", address: "Schiphol Plaza, Gate E9", city: "Schiphol", postal: "1118 AV", iban: "NL91ABNA0417164300", holder: "The Style Loft B.V." },
  r4: { company: "Gateway Duty Free N.V.", kvk: "11223344", vat: "NL444555666B01", address: "Schiphol Central Hall", city: "Schiphol", postal: "1118 AV", iban: "NL44RABO0123456789", holder: "Gateway Duty Free N.V." },
  default: { company: "Demo Retailer B.V.", kvk: "55566677", vat: "NL777888999B01", address: "Airport Terminal 1", city: "Schiphol", postal: "1118 AV", iban: "NL18INGB0001234567", holder: "Demo Retailer B.V." },
};

const DEMO_INVOICES = [
  { month: "March 2026", amount: "€ 312.50", status: "Paid", date: "1 Apr 2026" },
  { month: "February 2026", amount: "€ 275.00", status: "Paid", date: "1 Mar 2026" },
  { month: "January 2026", amount: "€ 198.75", status: "Paid", date: "1 Feb 2026" },
  { month: "December 2025", amount: "€ 410.00", status: "Paid", date: "1 Jan 2026" },
];

export default function DemoProfileTab({ entity, entityType = "agency" }) {
  const profiles = entityType === "agency" ? AGENCY_PROFILES : RETAILER_PROFILES;
  const profile = profiles[entity?.id] || profiles.default;

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Account Info */}
      <div className="bg-card border border-border rounded-xl p-6 space-y-4">
        <h3 className="font-heading font-semibold text-base flex items-center gap-2">
          <User className="w-4 h-4 text-primary" /> Account Information
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          {[
            { label: "Contact Person", value: "Demo User" },
            { label: "Email", value: "demo@dutyboost.com" },
            { label: "Company", value: profile.company },
            { label: "Account Type", value: entityType === "agency" ? "Travel Agency" : "Airport Retailer" },
            { label: "Status", value: "Active Partner ✓" },
            { label: "Member Since", value: "October 2025" },
          ].map(({ label, value }) => (
            <div key={label} className="space-y-1">
              <p className="text-xs text-muted-foreground font-medium">{label}</p>
              <p className="font-medium">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Company Details */}
      <div className="bg-card border border-border rounded-xl p-6 space-y-4">
        <h3 className="font-heading font-semibold text-base flex items-center gap-2">
          <Building2 className="w-4 h-4 text-primary" /> Company & Billing Details
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          {[
            { label: "Legal Name", value: profile.company },
            { label: "KVK Number", value: profile.kvk },
            { label: "VAT Number", value: profile.vat },
            { label: "Address", value: `${profile.address}, ${profile.postal} ${profile.city}` },
          ].map(({ label, value }) => (
            <div key={label} className="space-y-1">
              <p className="text-xs text-muted-foreground font-medium">{label}</p>
              <p className="font-medium">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bank Details */}
      <div className="bg-card border border-border rounded-xl p-6 space-y-3">
        <h3 className="font-heading font-semibold text-base flex items-center gap-2">
          <Landmark className="w-4 h-4 text-emerald-600" /> Bank Account (Payout)
        </h3>
        <div className="flex items-center gap-2 text-sm text-emerald-700 bg-emerald-50 rounded-lg px-3 py-2">
          <CheckCircle2 className="w-4 h-4" />
          Bank details on file: <span className="font-mono font-medium ml-1">{profile.iban}</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground font-medium">Account Holder</p>
            <p className="font-medium">{profile.holder}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground font-medium">IBAN</p>
            <p className="font-mono font-medium">{profile.iban}</p>
          </div>
        </div>
      </div>

      {/* Invoices */}
      <div className="bg-card border border-border rounded-xl p-6 space-y-4">
        <h3 className="font-heading font-semibold text-base flex items-center gap-2">
          <FileText className="w-4 h-4 text-primary" /> Invoice History
        </h3>
        <div className="space-y-2">
          {DEMO_INVOICES.map(inv => (
            <div key={inv.month} className="flex items-center justify-between p-3 rounded-lg bg-muted/40 hover:bg-muted/60 transition-colors">
              <div>
                <p className="text-sm font-medium">{inv.month}</p>
                <p className="text-xs text-muted-foreground">Issued {inv.date}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold">{inv.amount}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-semibold">{inv.status}</span>
                <button className="text-xs text-primary hover:underline flex items-center gap-1">
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