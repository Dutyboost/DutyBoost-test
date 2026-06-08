import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { CheckCircle2, ChevronDown, Clock, Users, PenLine, Download, Trash2 } from "lucide-react";
import { jsPDF } from "jspdf";
import en from "../locales/en";
import nl from "../locales/nl";
import fr from "../locales/fr";
import de from "../locales/de";
import es from "../locales/es";
import it from "../locales/it";

const locales = { en, nl, fr, de, es, it };

const KVK_PHRASES = {
  en: (n) => `, registered under number ${n}`,
  nl: (n) => `, ingeschreven onder nummer ${n}`,
  fr: (n) => `, enregistrée sous le numéro ${n}`,
  de: (n) => `, eingetragen unter der Nummer ${n}`,
  es: (n) => `, registrada bajo el número ${n}`,
  it: (n) => `, registrata con il numero ${n}`,
};

const VAT_PHRASES = {
  en: (n) => `, VAT/Tax number ${n}`,
  nl: (n) => `, BTW/belastingnummer ${n}`,
  fr: (n) => `, numéro TVA/fiscal ${n}`,
  de: (n) => `, Umsatzsteuer-/Steuernummer ${n}`,
  es: (n) => `, número de IVA/fiscal ${n}`,
  it: (n) => `, numero IVA/fiscale ${n}`,
};

const getLoiDocument = (lang, loi) => {
  const safeLang = lang?.split('-')[0] || 'en';
  const locale = locales[safeLang] || locales.en;
  const template = locale?.translation?.letterOfIntent?.loi_document || locales.en.translation.letterOfIntent.loi_document;

  const today = loi.signed_date
    ? new Date(loi.signed_date).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })
    : new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });

  const kvkFn = KVK_PHRASES[safeLang] || KVK_PHRASES.en;
  const vatFn = VAT_PHRASES[safeLang] || VAT_PHRASES.en;
  const kvkText = loi.partner_registration_number ? kvkFn(loi.partner_registration_number) : "";
  const vatText = loi.partner_vat ? vatFn(loi.partner_vat) : "";
  const titleText = loi.partner_representative_title ? ` – ${loi.partner_representative_title}` : "";
  const addressParts = [loi.partner_street, loi.partner_postal_code && loi.partner_city ? `${loi.partner_postal_code} ${loi.partner_city}` : loi.partner_city].filter(Boolean);
  const fullAddress = addressParts.join(", ") || "";

  return template
    .replace(/{date}/g, today)
    .replace(/{company}/g, loi.partner_company_name || "")
    .replace(/{address}/g, fullAddress)
    .replace(/{country}/g, loi.partner_country || "")
    .replace(/{kvk_text}/g, kvkText)
    .replace(/{vat_text}/g, vatText)
    .replace(/{representative}/g, loi.partner_representative_name || "")
    .replace(/{title_text}/g, titleText);
};

const STATUS_COLOR = {
  pending: "bg-yellow-500/20 text-yellow-300",
  reviewed: "bg-blue-500/20 text-blue-300",
  accepted: "bg-green-500/20 text-green-300",
  rejected: "bg-red-500/20 text-red-300",
};

export default function LOITab() {
  const [lois, setLois] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);

  const downloadLOI = (loi) => {
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const margin = 20;
    const pageWidth = 210;
    const maxWidth = pageWidth - margin * 2;
    const today = loi.signed_date
      ? new Date(loi.signed_date).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })
      : new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });

    const lang = (loi.language || "en").split('-')[0];
    const loiText = getLoiDocument(lang, loi);

    const footerText = "© 2026 DutyBoost  |  All rights reserved  |  Chamber of Commerce: 42053181  |  VAT Number: NL869492068B01";

    const addHeader = (logoDataUrl) => {
      if (logoDataUrl) {
        // Draw logo image: width=40mm, height proportional (~40/4.8 ≈ 8.3mm)
        doc.addImage(logoDataUrl, "JPEG", margin, 5, 40, 8.3);
      }
      // Thin separator line
      doc.setDrawColor(200, 210, 225);
      doc.setLineWidth(0.4);
      doc.line(margin, 17, pageWidth - margin, 17);
    };

    const addFooter = (pageNum, totalPages) => {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7);
      doc.setTextColor(120, 130, 145);
      doc.setDrawColor(200, 210, 225);
      doc.setLineWidth(0.4);
      doc.line(margin, 284, pageWidth - margin, 284);
      doc.text(footerText, pageWidth / 2, 289, { align: "center" });
      doc.text(`Page ${pageNum} of ${totalPages}`, pageWidth - margin, 289, { align: "right" });
      doc.setTextColor(0, 0, 0);
    };

    const renderPDF = (logoDataUrl) => {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);

      const contentTop = 22;
      const contentBottom = 297 - 14 - margin; // A4 = 297mm

      const lines = doc.splitTextToSize(loiText, maxWidth);
      let y = contentTop;

      // First page header
      addHeader(logoDataUrl);

      lines.forEach((line) => {
        if (y > contentBottom) {
          doc.addPage();
          addHeader(logoDataUrl);
          // Reset font after header
          doc.setFont("helvetica", "normal");
          doc.setFontSize(10);
          doc.setTextColor(0, 0, 0);
          y = contentTop;
        }
        doc.text(line, margin, y);
        y += 5;
      });

      // Add footers to all pages
      const totalPages = doc.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        addFooter(i, totalPages);
      }

      const filename = `LOI_${(loi.partner_company_name || "DutyBoost").replace(/\s+/g, "_")}_${today.replace(/\s/g, "_")}.pdf`;
      doc.save(filename);
    };

    // Load logo image then render
    const logoUrl = "https://media.base44.com/images/public/69c97dcd1c1950fa88424690/3fd6a9f3c_UpdatedLogonew.jpg";
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      canvas.getContext("2d").drawImage(img, 0, 0);
      renderPDF(canvas.toDataURL("image/jpeg"));
    };
    img.onerror = () => renderPDF(null);
    img.src = logoUrl;
  };

  useEffect(() => {
    base44.entities.LetterOfIntent.list("-created_date", 200).then(data => {
      setLois(data);
      setLoading(false);
    });
    const unsub = base44.entities.LetterOfIntent.subscribe(() => {
      base44.entities.LetterOfIntent.list("-created_date", 200).then(setLois);
    });
    return () => unsub();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <div className="w-7 h-7 border-4 border-slate-600 border-t-blue-400 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 text-center">
          <PenLine className="w-4 h-4 mx-auto mb-2 text-indigo-300" />
          <p className="text-xs text-slate-400 mb-1">Total Signed LOIs</p>
          <p className="text-2xl font-bold text-white">{lois.length}</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 text-center">
          <Clock className="w-4 h-4 mx-auto mb-2 text-yellow-300" />
          <p className="text-xs text-slate-400 mb-1">Pending Review</p>
          <p className="text-2xl font-bold text-yellow-300">{lois.filter(l => l.status === "pending").length}</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 text-center">
          <CheckCircle2 className="w-4 h-4 mx-auto mb-2 text-green-300" />
          <p className="text-xs text-slate-400 mb-1">Accepted</p>
          <p className="text-2xl font-bold text-green-300">{lois.filter(l => l.status === "accepted").length}</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 text-center">
          <Users className="w-4 h-4 mx-auto mb-2 text-purple-300" />
          <p className="text-xs text-slate-400 mb-1">Companies</p>
          <p className="text-2xl font-bold text-purple-300">{new Set(lois.map(l => l.partner_company_name)).size}</p>
        </div>
      </div>

      {lois.length === 0 ? (
        <p className="text-center text-slate-500 py-16 text-sm">No signed Letters of Intent yet.</p>
      ) : (
        <div className="space-y-3">
          {lois.map(loi => (
            <div key={loi.id} className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden">
              <button
                onClick={() => setExpanded(expanded === loi.id ? null : loi.id)}
                className="w-full flex items-center justify-between px-5 py-4 hover:bg-slate-700/30 transition-colors text-left"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <ChevronDown className={`w-4 h-4 text-slate-500 shrink-0 transition-transform ${expanded === loi.id ? "rotate-180" : ""}`} />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-white font-semibold">{loi.partner_company_name}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs ${STATUS_COLOR[loi.status] || "bg-slate-600 text-slate-300"}`}>
                        {loi.status}
                      </span>
                      {loi.signed && <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />}
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5 truncate">
                      {loi.partner_representative_name} · {loi.partner_email}
                      {loi.signed_date && ` · Signed ${new Date(loi.signed_date).toLocaleDateString()}`}
                    </p>
                  </div>
                </div>
                <div className="shrink-0 ml-3">
                  <select
                    value={loi.status}
                    onChange={async (e) => {
                      e.stopPropagation();
                      await base44.entities.LetterOfIntent.update(loi.id, { status: e.target.value });
                      setLois(prev => prev.map(l => l.id === loi.id ? { ...l, status: e.target.value } : l));
                    }}
                    onClick={e => e.stopPropagation()}
                    className="text-xs bg-slate-700 border border-slate-600 text-slate-300 rounded-lg px-2 py-1 focus:outline-none"
                  >
                    <option value="pending">pending</option>
                    <option value="reviewed">reviewed</option>
                    <option value="accepted">accepted</option>
                    <option value="rejected">rejected</option>
                  </select>
                </div>
              </button>

              {expanded === loi.id && (
                <div className="border-t border-slate-700 px-5 py-4 space-y-4">
                <div className="flex items-center gap-2 flex-wrap">
                  {loi.status === "accepted" && (
                    <button
                      onClick={() => downloadLOI(loi)}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-500 text-white text-xs font-semibold rounded-lg transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Download Executed Letter of Intent (PDF)
                    </button>
                  )}
                  {loi.status === "rejected" && (
                    <button
                      onClick={async () => {
                        if (!confirm(`Delete LOI from ${loi.partner_company_name}? This cannot be undone.`)) return;
                        await base44.entities.LetterOfIntent.delete(loi.id);
                        setLois(prev => prev.filter(l => l.id !== loi.id));
                        setExpanded(null);
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-semibold rounded-lg transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Delete Rejected LOI
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  {[
                    ["Company", loi.partner_company_name],
                    ["Partner Type", loi.partner_type],
                    ["Address", loi.partner_address],
                    ["Country", loi.partner_country],
                    ["Registration Nr.", loi.partner_registration_number],
                    ["VAT / Tax Nr.", loi.partner_vat],
                    ["Representative", loi.partner_representative_name],
                    ["Title", loi.partner_representative_title],
                    ["Email", loi.partner_email],
                    ["Signed Date", loi.signed_date ? new Date(loi.signed_date).toLocaleString() : "—"],
                  ].filter(([, v]) => v).map(([label, value]) => (
                    <div key={label}>
                      <p className="text-slate-500">{label}</p>
                      <p className="text-slate-200 break-all">{value}</p>
                    </div>
                  ))}
                </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}