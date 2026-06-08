import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { CheckCircle2, ChevronDown, Clock, Users, PenLine, Download } from "lucide-react";
import { jsPDF } from "jspdf";

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

    const kvkText = loi.partner_registration_number ? `, registered under number ${loi.partner_registration_number}` : "";
    const vatText = loi.partner_vat ? `, VAT/Tax number ${loi.partner_vat}` : "";
    const titleText = loi.partner_representative_title ? ` – ${loi.partner_representative_title}` : "";
    const addressParts = [loi.partner_street, loi.partner_postal_code && loi.partner_city ? `${loi.partner_postal_code} ${loi.partner_city}` : loi.partner_city].filter(Boolean);
    const fullAddress = addressParts.join(", ") || "";

    const loiText = `DUTYBOOST LETTER OF INTENT

This Letter of Intent ("LOI") is entered into on ${today} by and between:

DutyBoost, having its registered office at DEK 32, 1319BB Almere, The Netherlands, registered with the Dutch Chamber of Commerce under number 42053181, VAT number NL869492068B01, legally represented by:
Jaquelin Beliad Perez – Co-Founder
Raël Martis – Co-Founder
hereinafter referred to as "DutyBoost",

AND

${loi.partner_company_name} having its registered office at ${fullAddress} ${loi.partner_country || ""}${kvkText}${vatText}, legally represented by:
${loi.partner_representative_name || ""}${titleText}
hereinafter referred to as "${loi.partner_company_name}",

DutyBoost and ${loi.partner_company_name} hereinafter jointly referred to as the "Party" or "Parties."

1. Background

DutyBoost has developed an innovative travel retail solution aimed at increasing commercial performance within airport retail environments. The platform creates additional commercial value based on existing traveller flows to airports and travel retail locations.

DutyBoost positions itself as a "Travel Retail Conversion Layer", creating a new commercial revenue stream for travel partners based on the travellers they bring to airports and travel retail environments.

${loi.partner_company_name} operates as a travel partner within the travel, mobility and/or tourism industry and possesses relevant traveller flows and customer relationships that can contribute to additional commercial value within airport environments.

The Parties wish to explore opportunities for a commercial partnership whereby travellers introduced by the travel partner may contribute to additional commercial value and revenue opportunities within airport environments through DutyBoost.

2. Purpose of this Letter of Intent

The purpose of this Letter of Intent is to record the Parties' intention to engage in discussions, evaluations and potential commercial collaborations relating to:
- creating additional commercial value based on traveller flows;
- creating additional revenue streams based on passenger traffic;
- commercial cooperation between DutyBoost and the travel partner;
- potential revenue-sharing models;
- strategic positioning of DutyBoost within the traveller customer journey;
- international commercial rollout opportunities.

3. Exploratory Collaboration

The Parties declare their intention to engage in good-faith discussions regarding a potential collaboration, which may include revenue-sharing models, commercial positioning of DutyBoost within travel retail, and international commercial rollout opportunities.

4. Confidentiality

4.1 All information disclosed by either Party in connection with this Letter of Intent shall be treated as strictly confidential.
4.2 No confidential information shall be disclosed to any third party without the prior written consent of the other Party.
4.3 This confidentiality obligation shall remain in effect for a period of five (5) years following the execution of this Letter of Intent.

5. Exclusivity

For a period of 365 days from the date of execution of this Letter of Intent, the Parties shall engage in good-faith exclusive discussions regarding the proposed collaboration, unless otherwise agreed in writing.

6. Non-Binding Nature

6.1 This Letter of Intent is non-binding with respect to entering into any definitive collaboration agreement.
6.2 Only the provisions relating to confidentiality, intellectual property and exclusivity shall be legally binding.
6.3 Neither Party shall be obligated to enter into a definitive agreement until a formal written agreement has been duly executed.

7. Intellectual Property

7.1 All intellectual property rights relating to DutyBoost shall remain the sole property of DutyBoost.
7.2 Nothing contained in this Letter of Intent shall be construed as a transfer of any intellectual property rights.

8. Costs

Each Party shall bear its own costs and expenses relating to negotiations, meetings, investigations and any potential collaboration process.

9. Term and Termination

9.1 This Letter of Intent shall become effective on the date of execution.
9.2 This Letter of Intent shall automatically expire after 36 months unless extended in writing.
9.3 Either Party may terminate this Letter of Intent at any time by written notice.

10. Governing Law

This Letter of Intent shall be governed exclusively by the laws of The Netherlands. Any dispute arising from or relating to this Letter of Intent shall be submitted to the competent courts of The Netherlands.

---

SIGNATURES

For DutyBoost:                          For ${loi.partner_company_name}:

Jaquelin Beliad Perez                   ${loi.partner_representative_name || ""}
Co-Founder                              ${loi.partner_representative_title || ""}

Raël Martis
Co-Founder

Date: ${today}

[Digitally accepted by ${loi.partner_representative_name || ""} on ${today} via DutyBoost online platform]`;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);

    const lines = doc.splitTextToSize(loiText, maxWidth);
    let y = margin;
    lines.forEach((line) => {
      if (y > 280) {
        doc.addPage();
        y = margin;
      }
      doc.text(line, margin, y);
      y += 5;
    });

    const filename = `LOI_${(loi.partner_company_name || "DutyBoost").replace(/\s+/g, "_")}_${today.replace(/\s/g, "_")}.pdf`;
    doc.save(filename);
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
                {loi.status === "accepted" && (
                  <button
                    onClick={() => downloadLOI(loi)}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-500 text-white text-xs font-semibold rounded-lg transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download Executed Letter of Intent (PDF)
                  </button>
                )}
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