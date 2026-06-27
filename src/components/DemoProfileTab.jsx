import { useState } from "react";
import { jsPDF } from "jspdf";
import { Building2, Download, Landmark, User, FileText, CheckCircle2, Pencil, X, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

// ─── Region configuration ───────────────────────────────────────────────────

const REGION_CONFIG = {
  nl: {
    locale: "nl-NL",
    regKey: "kvk",
    regLabel: "KVK Number",
    vatLabel: "VAT Number",
    dutyboostHeader: "DutyBoost B.V. · hello@dutyboost.com · dutyboost.com",
    dutyboostFooter: "DutyBoost B.V. · KVK: 12345678 · VAT: NL123456789B01 · IBAN: NL91ABNA0417164300",
    invoiceTitle: "Invoice",
    retailerLabel: "Retailer",
    issuedLabel: "Issued",
    generatedLabel: "Generated",
    breakdownTitle: "Redemption Breakdown by Airport",
    vouchers: "Vouchers",
    transValue: "Trans. Value",
    feeHeader: "2.5% Platform Fee",
    totalLabel: "Total",
    feeExclVat: "Platform fee excl. VAT:",
    vatPdf: "VAT 21%:",
    totalDue: "Total Due (incl. VAT):",
    statusLabel: "Status:",
    footer1: "All DutyBoost fees are exclusive of VAT. VAT (21%) is added separately as shown above.",
    footer2: "This invoice is issued by DutyBoost B.V. for tax and accounting purposes.",
    accountInfo: "Account Information",
    contactPerson: "Contact Person",
    email: "Email",
    company: "Company",
    phone: "Phone Number",
    companyBilling: "Company & Billing Details",
    address: "Street Address",
    postalCity: "Postal Code & City",
    website: "Website",
    airportCode: "Airport Code",
    invoiceHistory: "Invoice History",
    issued: "Issued",
    edit: "Edit",
    save: "Save",
    cancel: "Cancel",
    savedMsg: "Saved successfully!",
    bankTitle: "Bank Account (Payout)",
    accountHolder: "Account Holder",
    iban: "IBAN",
    bankOnFile: "Bank details on file:",
    payoutHistory: "Payout History",
    paidOut: "Paid out",
  },
  es: {
    locale: "es-ES",
    regKey: "cif",
    regLabel: "CIF",
    vatLabel: "NIF-IVA",
    dutyboostHeader: "DutyBoost Spain S.L. · hola@dutyboost.com · dutyboost.com",
    dutyboostFooter: "DutyBoost Spain S.L. · CIF: B87654321 · IVA: ESB87654321 · IBAN: ES9121000418450200051332",
    invoiceTitle: "Factura",
    retailerLabel: "Comercio",
    issuedLabel: "Emitida",
    generatedLabel: "Generada",
    breakdownTitle: "Desglose de canjes por aeropuerto",
    vouchers: "Cupones",
    transValue: "Valor trans.",
    feeHeader: "Comisión 2,5%",
    totalLabel: "Total",
    feeExclVat: "Comisión sin IVA:",
    vatPdf: "IVA 21%:",
    totalDue: "Total a pagar (IVA incl.):",
    statusLabel: "Estado:",
    footer1: "Todas las comisiones de DutyBoost excluyen IVA. El IVA (21%) se añade aparte como se muestra arriba.",
    footer2: "Esta factura es emitida por DutyBoost Spain S.L. para fines fiscales y contables.",
    accountInfo: "Información de la cuenta",
    contactPerson: "Persona de contacto",
    email: "Correo electrónico",
    company: "Empresa",
    phone: "Teléfono",
    companyBilling: "Datos fiscales y de facturación",
    address: "Dirección",
    postalCity: "Código postal y ciudad",
    website: "Sitio web",
    airportCode: "Aeropuerto",
    invoiceHistory: "Historial de facturas",
    issued: "Emitida",
    edit: "Editar",
    save: "Guardar",
    cancel: "Cancelar",
    savedMsg: "¡Guardado correctamente!",
    bankTitle: "Cuenta bancaria (Pago)",
    accountHolder: "Titular de la cuenta",
    iban: "IBAN",
    bankOnFile: "Datos bancarios registrados:",
    payoutHistory: "Historial de pagos",
    paidOut: "Pagado",
  },
};

// ─── Agency profiles (NL only) ──────────────────────────────────────────────

const AGENCY_PROFILES = {
  ag1: { company: "Horizon Travel Group B.V.", kvk: "34156789", vat: "NL123456789B01", address: "Wilhelminaplein 12", postal_city: "3072 DE Rotterdam", website: "www.horizontravel.nl", phone: "+31 10 456 7890", iban: "NL91ABNA0417164300", holder: "Horizon Travel Group B.V.", airport: "" },
  ag2: { company: "Skybound Holidays B.V.", kvk: "27384950", vat: "NL987654321B02", address: "Koningskade 8", postal_city: "2596 AA Den Haag", website: "www.skyboundholidays.nl", phone: "+31 70 312 5500", iban: "NL44RABO0123456789", holder: "Skybound Holidays B.V.", airport: "" },
  ag3: { company: "Compass Reizen B.V.", kvk: "19283746", vat: "NL567891234B01", address: "Barendrechtseweg 5", postal_city: "2992 LA Barendrecht", website: "www.compassreizen.nl", phone: "+31 180 643 210", iban: "NL18INGB0001234567", holder: "Compass Reizen B.V.", airport: "" },
  default: { company: "Demo Travel Agency B.V.", kvk: "12345678", vat: "NL000000000B01", address: "Damrak 1", postal_city: "1012 LG Amsterdam", website: "www.demoagency.nl", phone: "+31 20 000 0000", iban: "NL91ABNA0000000000", holder: "Demo Agency B.V.", airport: "" },
};

// ─── Dutch retailer profiles ───────────────────────────────────────────────

const RETAILER_PROFILES_NL = {
  r1: { company: "The Style Loft B.V.", kvk: "98765432", vat: "NL111222333B01", address: "Schiphol Plaza, Gate E9", postal_city: "1118 AV Schiphol", website: "www.thestyleloft.nl", phone: "+31 20 601 2345", iban: "NL91ABNA0417164300", holder: "The Style Loft B.V.", airport: "AMS" },
  r4: { company: "Gateway Duty Free N.V.", kvk: "11223344", vat: "NL444555666B01", address: "Schiphol Central Hall", postal_city: "1118 AV Schiphol", website: "www.gatewaydf.nl", phone: "+31 20 601 9900", iban: "NL44RABO0123456789", holder: "Gateway Duty Free N.V.", airport: "AMS" },
  default: { company: "Demo Retailer B.V.", kvk: "55566677", vat: "NL777888999B01", address: "Airport Terminal 1", postal_city: "1118 AV Schiphol", website: "www.demoretailer.nl", phone: "+31 20 000 1111", iban: "NL18INGB0001234567", holder: "Demo Retailer B.V.", airport: "AMS" },
};

// ─── Spanish airport address data ───────────────────────────────────────────

const ES_AIRPORT_INFO = {
  MAD: { address: "Aeropuerto Adolfo Suárez Madrid-Barajas, T4", postal: "28042 Madrid", phone: "+34 91 321 0000" },
  BCN: { address: "Aeropuerto Josep Tarradellas Barcelona-El Prat, T1", postal: "08820 El Prat de Llobregat", phone: "+34 93 321 0000" },
  PMI: { address: "Aeropuerto de Palma de Mallorca", postal: "07611 Palma de Mallorca", phone: "+34 971 789 000" },
  AGP: { address: "Aeropuerto de Málaga-Costa del Sol, T3", postal: "29004 Málaga", phone: "+34 952 048 000" },
  ALC: { address: "Aeropuerto de Alicante-Elche", postal: "03195 Alicante", phone: "+34 965 689 000" },
  TFS: { address: "Aeropuerto de Tenerife Sur, T1", postal: "38610 Granadilla", phone: "+34 922 759 000" },
  LPA: { address: "Aeropuerto de Gran Canaria, T1", postal: "35230 Las Palmas", phone: "+34 928 579 000" },
  VLC: { address: "Aeropuerto de Valencia, T1", postal: "46940 Manises", phone: "+34 961 521 000" },
  IBZ: { address: "Aeropuerto de Ibiza", postal: "07830 Ibiza", phone: "+34 971 801 000" },
  MAH: { address: "Aeropuerto de Menorca", postal: "07748 Mahón", phone: "+34 971 157 000" },
  default: { address: "Terminal del Aeropuerto", postal: "28042 Madrid", phone: "+34 91 000 0000" },
};

function buildEsRetailerProfile(entity) {
  const info = ES_AIRPORT_INFO[entity?.airport] || ES_AIRPORT_INFO.default;
  const name = entity?.name || "Comercio Aeropuerto";
  const slug = name.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 20) || "comercio";
  const seed = (entity?.id || entity?.name || "").split("").reduce((s, c) => s + c.charCodeAt(0), 0);
  const cifNum = String(10000000 + (seed * 7919) % 89999999).slice(0, 8);
  return {
    company: name,
    cif: `B${cifNum}`,
    vat: `ESB${cifNum}`,
    address: info.address,
    postal_city: info.postal,
    website: `www.${slug}.es`,
    phone: info.phone,
    iban: "ES9121000418450200051332",
    holder: `${name} S.L.`,
    airport: entity?.airport || "MAD",
  };
}

// ─── Seasonality + invoice builder ──────────────────────────────────────────

const RETAILER_SEASONALITY = [
  { month: "March 2026", date: "1 Apr 2026", mult: 0.90 },
  { month: "April 2026", date: "1 May 2026", mult: 0.95 },
  { month: "May 2026", date: "1 Jun 2026", mult: 1.00 },
  { month: "June 2026", date: "1 Jul 2026", mult: 1.10 },
];

function buildRetailerInvoices(entity, locale) {
  if (!entity || !entity.redemptions || !entity.avg_sale) return [];
  const basket = entity.avg_sale;
  const feePerTx = Math.min(Math.round(basket * 0.025 * 100) / 100, 25);
  return RETAILER_SEASONALITY.map(({ month, date, mult }) => {
    const redemptions = Math.round(entity.redemptions * mult);
    const transactionValue = Math.round(redemptions * basket);
    const platformFee = Math.round(redemptions * feePerTx * 100) / 100;
    return {
      month,
      date,
      status: "Paid",
      amount: `€ ${platformFee.toLocaleString(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      breakdown: [{ airport: entity.airport || "—", vouchers: redemptions, transactionValue }],
    };
  });
}

// Agency invoices: commission model (NL only — no ES agency demo)
const DEMO_INVOICES = [
  { month: "March 2026", status: "Paid", date: "1 Apr 2026", breakdown: [{ airport: "Amsterdam Schiphol (AMS)", vouchers: 45, transactionValue: 18750 }, { airport: "Rotterdam The Hague (RTM)", vouchers: 30, transactionValue: 7500 }, { airport: "Eindhoven Airport (EIN)", vouchers: 25, transactionValue: 5000 }] },
  { month: "February 2026", status: "Paid", date: "1 Mar 2026", breakdown: [{ airport: "Amsterdam Schiphol (AMS)", vouchers: 39, transactionValue: 16250 }, { airport: "Rotterdam The Hague (RTM)", vouchers: 25, transactionValue: 6250 }, { airport: "Eindhoven Airport (EIN)", vouchers: 20, transactionValue: 5000 }] },
  { month: "January 2026", status: "Paid", date: "1 Feb 2026", breakdown: [{ airport: "Amsterdam Schiphol (AMS)", vouchers: 27, transactionValue: 11250 }, { airport: "Rotterdam The Hague (RTM)", vouchers: 20, transactionValue: 4375 }, { airport: "Eindhoven Airport (EIN)", vouchers: 18, transactionValue: 4250 }] },
  { month: "December 2025", status: "Paid", date: "1 Jan 2026", breakdown: [{ airport: "Amsterdam Schiphol (AMS)", vouchers: 58, transactionValue: 24500 }, { airport: "Rotterdam The Hague (RTM)", vouchers: 36, transactionValue: 9000 }, { airport: "Eindhoven Airport (EIN)", vouchers: 30, transactionValue: 7500 }] },
].map(inv => ({ ...inv, amount: `€ ${(inv.breakdown.reduce((s, r) => s + r.transactionValue * 0.01, 0)).toFixed(2)}` }));

// ─── Editable section ──────────────────────────────────────────────────────

function EditableSection({ title, icon: Icon, fields, form, onChange, labels }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState({ ...form });

  const handleSave = () => {
    Object.entries(draft).forEach(([k, v]) => onChange(k, v));
    setEditing(false);
    toast.success(labels.savedMsg);
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
            <Pencil className="w-3 h-3" /> {labels.edit}
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button onClick={handleCancel} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive transition-colors">
              <X className="w-3 h-3" /> {labels.cancel}
            </button>
            <Button size="sm" onClick={handleSave} className="h-7 text-xs gap-1">
              <Save className="w-3 h-3" /> {labels.save}
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

// ─── PDF generators ────────────────────────────────────────────────────────

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

  const abSectionY = ay + 10;
  doc.setFontSize(12);
  doc.setTextColor(28, 28, 60);
  doc.text("Commission by Airport / Retailer", 20, abSectionY);
  doc.setDrawColor(200);
  doc.line(20, abSectionY + 3, 190, abSectionY + 3);

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
    if (i % 2 === 0) { doc.setFillColor(245, 249, 255); doc.rect(20, abY - 5, 170, 8, "F"); }
    const fee = transactionValue * 0.05;
    const commission = fee * 0.20;
    doc.setFontSize(8);
    doc.setTextColor(28, 28, 60);
    doc.text(airport, 22, abY);
    doc.setTextColor(80);
    doc.text(String(vouchers), 88, abY);
    doc.text(`€ ${transactionValue.toLocaleString("nl-NL")}`, 108, abY);
    doc.text(`€ ${fee.toFixed(2)}`, 140, abY);
    doc.setTextColor(0, 140, 80);
    doc.text(`€ ${commission.toFixed(2)}`, 163, abY);
    abY += 8;
  });

  const totalTrans = (inv.breakdown || []).reduce((s, r) => s + r.transactionValue, 0);
  const totalFeeAll = totalTrans * 0.05;
  const totalCommAll = totalFeeAll * 0.20;
  doc.setFillColor(220, 235, 255);
  doc.rect(20, abY - 4, 170, 9, "F");
  doc.setFontSize(8);
  doc.setFont(undefined, "bold");
  doc.setTextColor(28, 28, 60);
  doc.text("Total", 22, abY + 2);
  doc.text(`€ ${totalTrans.toLocaleString("nl-NL")}`, 108, abY + 2);
  doc.text(`€ ${totalFeeAll.toFixed(2)}`, 140, abY + 2);
  doc.setTextColor(0, 140, 80);
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

function downloadInvoicePDF(inv, entity, profile, cfg) {
  const doc = new jsPDF();
  doc.setFontSize(20);
  doc.setTextColor(31, 111, 255);
  doc.text("DutyBoost", 20, 20);
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(cfg.dutyboostHeader, 20, 28);

  doc.setFontSize(15);
  doc.setTextColor(31, 111, 255);
  doc.text(`${cfg.invoiceTitle} — ${inv.month}`, 20, 45);

  doc.setFontSize(10);
  doc.setTextColor(60);
  doc.text(`${cfg.retailerLabel}: ${profile?.company || entity?.name || "Airport Retailer"}`, 20, 55);
  let iy = 55;
  if (profile?.address) { iy += 7; doc.text(profile.address, 20, iy); }
  if (profile?.postal_city) { iy += 7; doc.text(profile.postal_city, 20, iy); }
  const regVal = profile?.[cfg.regKey];
  if (regVal) { iy += 7; doc.text(`${cfg.regLabel}: ${regVal}`, 20, iy); }
  if (profile?.vat) { iy += 7; doc.text(`${cfg.vatLabel}: ${profile.vat}`, 20, iy); }
  doc.setTextColor(80);
  iy += 7; doc.text(`${cfg.issuedLabel}: ${inv.date}`, 20, iy);
  iy += 6; doc.text(`${cfg.generatedLabel}: ${new Date().toLocaleDateString(cfg.locale)}`, 20, iy);

  const tableY = iy + 12;
  doc.setFontSize(12);
  doc.setTextColor(28, 28, 60);
  doc.text(cfg.breakdownTitle, 20, tableY);
  doc.setDrawColor(200);
  doc.line(20, tableY + 3, 190, tableY + 3);

  doc.setFillColor(235, 242, 255);
  doc.rect(20, tableY + 6, 170, 8, "F");
  doc.setFontSize(8);
  doc.setTextColor(80);
  doc.text("Aeropuerto", 22, tableY + 12);
  doc.text(cfg.vouchers, 100, tableY + 12);
  doc.text(cfg.transValue, 120, tableY + 12);
  doc.text(cfg.feeHeader, 150, tableY + 12);

  let ty = tableY + 22;
  (inv.breakdown || []).forEach(({ airport, vouchers, transactionValue }, i) => {
    if (i % 2 === 0) { doc.setFillColor(245, 249, 255); doc.rect(20, ty - 5, 170, 8, "F"); }
    const fee = transactionValue * 0.025;
    doc.setFontSize(8);
    doc.setTextColor(28, 28, 60);
    doc.text(airport, 22, ty);
    doc.setTextColor(80);
    doc.text(String(vouchers), 100, ty);
    doc.text(`€ ${transactionValue.toLocaleString(cfg.locale)}`, 120, ty);
    doc.setTextColor(31, 111, 255);
    doc.text(`€ ${fee.toFixed(2)}`, 150, ty);
    ty += 8;
  });

  const totalTrans = (inv.breakdown || []).reduce((s, r) => s + r.transactionValue, 0);
  const totalFee = totalTrans * 0.025;
  const totalVat = totalFee * 0.21;
  const totalDue = totalFee + totalVat;

  doc.setFillColor(220, 235, 255);
  doc.rect(20, ty - 4, 170, 9, "F");
  doc.setFontSize(8);
  doc.setFont(undefined, "bold");
  doc.setTextColor(28, 28, 60);
  doc.text(cfg.totalLabel, 22, ty + 2);
  doc.text(`€ ${totalTrans.toLocaleString(cfg.locale)}`, 120, ty + 2);
  doc.setTextColor(31, 111, 255);
  doc.text(`€ ${totalFee.toFixed(2)}`, 158, ty + 2);
  doc.setFont(undefined, "normal");
  ty += 14;

  doc.setFontSize(10);
  doc.setTextColor(80);
  doc.text(cfg.feeExclVat, 110, ty);
  doc.setTextColor(28, 28, 60);
  doc.text(`€ ${totalFee.toFixed(2)}`, 186, ty, { align: "right" });
  ty += 8;
  doc.setTextColor(80);
  doc.text(cfg.vatPdf, 110, ty);
  doc.setTextColor(28, 28, 60);
  doc.text(`€ ${totalVat.toFixed(2)}`, 186, ty, { align: "right" });
  ty += 8;
  doc.setFontSize(11);
  doc.setFont(undefined, "bold");
  doc.setTextColor(31, 111, 255);
  doc.text(cfg.totalDue, 110, ty);
  doc.text(`€ ${totalDue.toFixed(2)}`, 186, ty, { align: "right" });
  doc.setFont(undefined, "normal");
  ty += 8;
  doc.setFontSize(10);
  doc.setTextColor(80);
  doc.text(cfg.statusLabel, 110, ty);
  doc.setTextColor(0, 140, 80);
  doc.text(inv.status, 135, ty);
  ty += 12;

  doc.setFontSize(9);
  doc.setTextColor(150);
  doc.line(20, ty, 190, ty);
  doc.text(cfg.footer1, 20, ty + 7);
  doc.text(cfg.footer2, 20, ty + 13);
  doc.text(cfg.dutyboostFooter, 20, ty + 20);

  doc.save(`DutyBoost_${cfg.invoiceTitle.replace(/ /g, "_")}_${inv.month.replace(/ /g, "_")}.pdf`);
}

// ─── Main component ───────────────────────────────────────────────────────

export default function DemoProfileTab({ entity, entityType = "agency", region = "nl" }) {
  const cfg = REGION_CONFIG[region] || REGION_CONFIG.nl;

  const initialProfile = entityType === "retailer" && region === "es"
    ? buildEsRetailerProfile(entity)
    : (entityType === "agency" ? AGENCY_PROFILES : RETAILER_PROFILES_NL)[entity?.id] || RETAILER_PROFILES_NL.default;

  const [profile, setProfile] = useState({ ...initialProfile, contactName: "Demo User", email: "demo@dutyboost.com", phone: initialProfile.phone });

  const updateField = (key, value) => setProfile(p => ({ ...p, [key]: value }));

  const invoices = entityType === "retailer" ? buildRetailerInvoices(entity, cfg.locale) : DEMO_INVOICES;

  const [bankEditing, setBankEditing] = useState(false);
  const [bankDraft, setBankDraft] = useState({ iban: profile.iban, holder: profile.holder });

  const handleSaveBank = (e) => {
    e.preventDefault();
    setProfile(p => ({ ...p, iban: bankDraft.iban, holder: bankDraft.holder }));
    setBankEditing(false);
    toast.success(cfg.savedMsg);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <EditableSection
        title={cfg.accountInfo}
        icon={User}
        labels={cfg}
        form={{ contactName: profile.contactName, email: profile.email, company: profile.company, phone: profile.phone }}
        onChange={updateField}
        fields={[
          { key: "contactName", label: cfg.contactPerson },
          { key: "email", label: cfg.email, readonly: true },
          { key: "company", label: cfg.company },
          { key: "phone", label: cfg.phone },
        ]}
      />

      <EditableSection
        title={cfg.companyBilling}
        icon={Building2}
        labels={cfg}
        form={{ [cfg.regKey]: profile[cfg.regKey], vat: profile.vat, address: profile.address, postal_city: profile.postal_city, website: profile.website, ...(entityType === "retailer" ? { airport: profile.airport } : {}) }}
        onChange={updateField}
        fields={[
          { key: cfg.regKey, label: cfg.regLabel },
          { key: "vat", label: cfg.vatLabel },
          { key: "address", label: cfg.address },
          { key: "postal_city", label: cfg.postalCity },
          { key: "website", label: cfg.website },
          ...(entityType === "retailer" ? [{ key: "airport", label: cfg.airportCode }] : []),
        ]}
      />

      {/* Bank Details — agencies only (retailers pay DutyBoost, no payouts) */}
      {entityType === "agency" && (
      <div className="bg-card border border-border rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-heading font-semibold text-base flex items-center gap-2">
            <Landmark className="w-4 h-4 text-emerald-600" /> {cfg.bankTitle}
          </h3>
          {!bankEditing && (
            <button onClick={() => { setBankDraft({ iban: profile.iban, holder: profile.holder }); setBankEditing(true); }} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
              <Pencil className="w-3 h-3" /> {cfg.edit}
            </button>
          )}
        </div>
        {!bankEditing ? (
          <>
            <div className="flex items-center gap-2 text-sm text-emerald-700 bg-emerald-50 rounded-lg px-3 py-2">
              <CheckCircle2 className="w-4 h-4" />
              {cfg.bankOnFile} <span className="font-mono font-medium ml-1">{profile.iban}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="space-y-1"><p className="text-xs text-muted-foreground">{cfg.accountHolder}</p><p className="font-medium">{profile.holder}</p></div>
              <div className="space-y-1"><p className="text-xs text-muted-foreground">{cfg.iban}</p><p className="font-mono font-medium">{profile.iban}</p></div>
            </div>
          </>
        ) : (
          <form onSubmit={handleSaveBank} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2"><Label>{cfg.accountHolder}</Label><Input value={bankDraft.holder} onChange={e => setBankDraft(d => ({ ...d, holder: e.target.value }))} required /></div>
              <div className="space-y-2"><Label>{cfg.iban}</Label><Input value={bankDraft.iban} onChange={e => setBankDraft(d => ({ ...d, iban: e.target.value.toUpperCase() }))} required /></div>
            </div>
            <div className="flex gap-2">
              <Button type="submit" size="sm" className="gap-1"><Save className="w-3 h-3" /> {cfg.save}</Button>
              <Button type="button" variant="outline" size="sm" onClick={() => setBankEditing(false)}>{cfg.cancel}</Button>
            </div>
          </form>
        )}
      </div>
      )}

      {/* Invoice / Payout History */}
      <div className="bg-card border border-border rounded-xl p-6 space-y-4">
        <h3 className="font-heading font-semibold text-base flex items-center gap-2">
          <FileText className="w-4 h-4 text-primary" /> {entityType === "agency" ? cfg.payoutHistory : cfg.invoiceHistory}
        </h3>
        <div className="space-y-2">
          {invoices.map(inv => (
            <div key={inv.month} className="flex items-center justify-between p-3 rounded-lg bg-muted/40 hover:bg-muted/60 transition-colors">
              <div>
                <p className="text-sm font-medium">{inv.month}</p>
                <p className="text-xs text-muted-foreground">{entityType === "agency" ? cfg.paidOut : cfg.issued} {inv.date}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold">{inv.amount}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-semibold">{inv.status}</span>
                <button
                  onClick={() => entityType === "agency" ? downloadPayoutPDF(inv, entity, profile) : downloadInvoicePDF(inv, entity, profile, cfg)}
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