import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Download, FileBarChart, Store, Users, Cpu, Building2, Loader2 } from "lucide-react";
import { jsPDF } from "jspdf";
import { splitSurveyGroups } from "@/lib/surveyUtils";

const GROUP_LABELS = {
  retailer: "Airport Retailers",
  partner: "Travel Partners",
  pos: "POS Providers",
  corporate: "Corporate Partners",
};
const GROUP_ICON = { retailer: Store, partner: Users, pos: Cpu, corporate: Building2 };
const GROUP_ACCENT = { retailer: "#f97316", partner: "#10b981", pos: "#8b5cf6", corporate: "#6366f1" };

// Each report is tailored to one audience and shows the OTHER groups that reacted.
const AUDIENCES = [
  {
    key: "retailer",
    label: "Airport Retailers",
    blurb: "Travel Partner & Corporate Partner results",
    groups: ["partner", "corporate"],
  },
  {
    key: "pos",
    label: "POS Providers",
    blurb: "Retailer, Travel Partner & Corporate Partner results",
    groups: ["retailer", "partner", "corporate"],
  },
  {
    key: "partner",
    label: "Travel Partners",
    blurb: "POS Partner & Retailer results",
    groups: ["pos", "retailer"],
  },
  {
    key: "corporate",
    label: "Corporate Partners",
    blurb: "POS Partner & Retailer results",
    groups: ["pos", "retailer"],
  },
];

// ── Tally helper ───────────────────────────────────────────────────────────────
function tally(arr, key) {
  const map = {};
  arr.forEach((r) => {
    const val = (r[key] || "Unknown").split("–")[0].trim();
    map[val] = (map[val] || 0) + 1;
  });
  return Object.entries(map)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
}

// ── PDF generator ──────────────────────────────────────────────────────────────
function exportBenchmarkPDF(audience, groupData) {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const W = 210, H = 297, M = 12;
  const accent = GROUP_ACCENT[audience.key];

  const txt = (s, x, y, color, size = 8, style = "normal") => {
    doc.setTextColor(color);
    doc.setFontSize(size);
    doc.setFont("helvetica", style);
    doc.text(String(s ?? ""), x, y);
  };
  const rtxt = (s, x, y, color, size = 8, style = "normal") => {
    doc.setTextColor(color);
    doc.setFontSize(size);
    doc.setFont("helvetica", style);
    doc.text(String(s ?? ""), x, y, { align: "right" });
  };
  const band = (color, x, y, w, h, r = 2) => {
    doc.setFillColor(color);
    doc.roundedRect(x, y, w, h, r, r, "F");
  };
  const hline = (y, x1 = M, x2 = W - M, color = "#e2e8f0") => {
    doc.setDrawColor(color);
    doc.setLineWidth(0.2);
    doc.line(x1, y, x2, y);
  };
  const newPage = () => {
    doc.addPage();
    doc.setFillColor("#ffffff");
    doc.rect(0, 0, W, H, "F");
    // header strip
    band("#0f172a", 0, 0, W, 10);
    txt("DutyBoost Benchmark — " + audience.label, M, 6.5, "#ffffff", 8, "bold");
    rtxt("Confidential", W - M, 6.5, "#94a3b8", 7);
  };

  // ═══ Cover page ══════════════════════════════════════════════════════════════
  doc.setFillColor("#ffffff");
  doc.rect(0, 0, W, H, "F");
  band(accent, 0, 0, W, 6);
  band("#0f172a", M, 20, W - M * 2, 30, 3);
  txt("DutyBoost", M + 4, 33, "#ffffff", 16, "bold");
  txt("Benchmark Report", M + 4, 41, "#cbd5e1", 11, "bold");
  txt("Prepared for outreach to " + audience.label.toLowerCase(), M + 4, 47, "#94a3b8", 8);

  const dateStr = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });
  rtxt("Generated " + dateStr, W - M - 4, 33, "#94a3b8", 8);
  rtxt("hello@dutyboost.com", W - M - 4, 41, "#64748b", 7);

  // Audience summary box
  let cy = 58;
  band("#f1f5f9", M, cy, W - M * 2, 22, 2);
  txt("Who this report is for", M + 4, cy + 7, "#475569", 8, "bold");
  txt(audience.label + " — " + audience.blurb + ".", M + 4, cy + 13, "#0f172a", 8);
  txt("The data below was self-reported by survey respondents across the DutyBoost ecosystem.", M + 4, cy + 18, "#475569", 7);
  cy += 28;

  // Overview table — counts per group included in this report
  band("#0f172a", M, cy, W - M * 2, 9, 2);
  txt("Respondent group", M + 4, cy + 6, "#ffffff", 7, "bold");
  rtxt("Responses", W - M - 4, cy + 6, "#ffffff", 7, "bold");
  rtxt("Wants demo", W - M - 40, cy + 6, "#ffffff", 7, "bold");
  cy += 11;
  audience.groups.forEach((gk, idx) => {
    const rs = groupData[gk] || [];
    if (idx % 2 === 1) band("#f8fafc", M, cy - 4, W - M * 2, 8, 0);
    txt(GROUP_LABELS[gk], M + 4, cy + 2, "#0f172a", 7.5, "bold");
    rtxt(String(rs.length), W - M - 4, cy + 2, accent, 7.5, "bold");
    rtxt(String(rs.filter((r) => r.wants_demo).length), W - M - 40, cy + 2, "#10b981", 7.5);
    cy += 8;
  });
  cy += 4;
  txt("All values are normalized to English. Volumes are self-reported unless a verified public source exists.", M, cy, "#94a3b8", 6.5, "italic");

  // ═══ Per-group detail pages ═══════════════════════════════════════════════════
  audience.groups.forEach((gk) => {
    const responses = groupData[gk] || [];
    newPage();
    let y = 18;

    // Group header
    band(accent, M, y, W - M * 2, 14, 2);
    txt(GROUP_LABELS[gk], M + 4, y + 6, "#ffffff", 11, "bold");
    txt(responses.length + " respondent" + (responses.length === 1 ? "" : "s"), M + 4, y + 11, "#ffffff", 7.5);
    y += 19;

    if (responses.length === 0) {
      txt("No responses recorded for this group yet.", M, y + 4, "#94a3b8", 8, "italic");
      return;
    }

    // KPI row
    const wantsDemo = responses.filter((r) => r.wants_demo).length;
    const kpis = [
      { label: "Total responses", value: String(responses.length) },
      { label: "Wants follow-up", value: String(wantsDemo) },
      { label: "Follow-up rate", value: responses.length ? Math.round((wantsDemo / responses.length) * 100) + "%" : "—" },
      { label: "Distinct types", value: String(new Set(responses.map((r) => r.company_type)).size) },
    ];
    const kpiW = (W - M * 2 - 6) / 4;
    kpis.forEach((k, i) => {
      const x = M + i * (kpiW + 2);
      band("#f1f5f9", x, y, kpiW, 14, 2);
      txt(k.label, x + 2, y + 5, "#64748b", 6);
      txt(k.value, x + 2, y + 11, "#0f172a", 10, "bold");
    });
    y += 19;

    // Tally mini-tables (3 columns)
    const tallyCols = [
      { title: "Interest level", data: tally(responses, "interest_level") },
      { title: "Value-prop attractiveness", data: tally(responses, "commission_attractive") },
      { title: "Integration willingness", data: tally(responses, "snippet_willingness") },
    ];
    const colW = (W - M * 2 - 6) / 3;
    tallyCols.forEach((c, ci) => {
      const x = M + ci * (colW + 3);
      band("#0f172a", x, y, colW, 7, 1);
      txt(c.title, x + 2, y + 5, "#ffffff", 6.5, "bold");
      let ry = y + 11;
      c.data.slice(0, 6).forEach((d, di) => {
        if (di % 2 === 1) band("#f8fafc", x, ry - 3.5, colW, 5.5, 0);
        txt(d.name.substring(0, 38), x + 2, ry, "#0f172a", 6.5);
        rtxt(String(d.value), x + colW - 2, ry, accent, 6.5, "bold");
        ry += 5.5;
      });
    });
    y += 12 + Math.min(6, Math.max(...tallyCols.map((c) => c.data.slice(0, 6).length))) * 5.5 + 4;

    // Respondent detail blocks (two-column flow)
    const blockW = (W - M * 2 - 4) / 2;
    const blockGap = 4;
    let leftTop = y;
    let rightTop = y;
    responses.forEach((r) => {
      // recompute block height
      const lines = [];
      lines.push(r.company_name || "Anonymous");
      lines.push("Type: " + (r.company_type || "—"));
      lines.push("Website: " + (r.company_website || "—"));
      lines.push("Volume: " + (r.annual_bookings || "—"));
      lines.push("Interest: " + (r.interest_level || "—"));
      lines.push("Value-prop: " + (r.commission_attractive || "—"));
      lines.push("Integration: " + (r.snippet_willingness || "—"));
      lines.push("Challenge: " + (r.biggest_challenge || "—"));
      lines.push("Loyalty: " + (r.current_loyalty || "—"));
      if (r.pos_provider) lines.push("POS: " + r.pos_provider);
      if (r.travel_platform) lines.push("T&E platform: " + r.travel_platform);
      if (Array.isArray(r.retailers_served) && r.retailers_served.length)
        lines.push("Retailers served: " + r.retailers_served.join(", "));
      if (r.full_name || r.email || r.phone)
        lines.push("Contact: " + [r.full_name, r.email, r.phone].filter(Boolean).join(" · "));
      if (r.created_date) lines.push("Submitted: " + new Date(r.created_date).toLocaleDateString("en-GB"));
      const bh = 7 + lines.length * 4.6 + 2;

      // pick shorter column
      const useRight = rightTop < leftTop;
      let x = useRight ? M + blockW + blockGap : M;
      let anchor = useRight ? rightTop : leftTop;

      if (anchor + bh > H - M) {
        // start a new page, reset both columns
        newPage();
        leftTop = 18;
        rightTop = 18;
        x = M;
        anchor = 18;
        useRight && (x = M + blockW + blockGap);
      }

      band("#f8fafc", x, anchor, blockW, bh, 2);
      doc.setFillColor(accent);
      doc.roundedRect(x, anchor, 1.4, bh, 0.7, 0.7, "F");
      txt(lines[0].substring(0, 40), x + 3, anchor + 5, "#0f172a", 8, "bold");
      if (r.wants_demo) rtxt("● demo", x + blockW - 3, anchor + 5, "#10b981", 6.5, "bold");
      hline(anchor + 7, x + 3, x + blockW - 3, "#e2e8f0");
      lines.slice(1).forEach((l, i) => {
        txt(l.substring(0, 58), x + 3, anchor + 11 + i * 4.6, "#334155", 6.6);
      });

      if (useRight) rightTop = anchor + bh + 3;
      else leftTop = anchor + bh + 3;
    });
  });

  // footer page numbers
  const pages = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pages; i++) {
    doc.setPage(i);
    if (i > 1) {
      // already drew header; add page number at bottom
      txt(String(i) + " / " + String(pages), W - M - 4, H - 6, "#94a3b8", 7);
    } else {
      txt(String(i) + " / " + String(pages), W - M - 4, H - 6, "#94a3b8", 7);
      txt("DutyBoost · hello@dutyboost.com · www.dutyboost.com", M, H - 6, "#94a3b8", 7);
    }
  }

  doc.save(`dutyboost-benchmark-${audience.key}-${new Date().toISOString().slice(0, 10)}.pdf`);
}

// ── UI component ───────────────────────────────────────────────────────────────
export default function BenchmarkReports({ allResponses, loading }) {
  const groups = useMemo(() => splitSurveyGroups(allResponses || []), [allResponses]);

  return (
    <div className="space-y-6">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5 space-y-1">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <FileBarChart className="w-5 h-5 text-yellow-400" /> Benchmark Reports
        </h2>
        <p className="text-sm text-slate-400">
          Download a tailored benchmark PDF for each audience. Each report shows the survey results of the
          other respondent groups — ready to attach to your next outreach email.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {AUDIENCES.map((aud) => {
          const Icon = GROUP_ICON[aud.key];
          const accent = GROUP_ACCENT[aud.key];
          const total = aud.groups.reduce((s, g) => s + (groups[g]?.length || 0), 0);
          return (
            <div key={aud.key} className="bg-slate-800 border border-slate-700 rounded-2xl p-5 space-y-4">
              <div className="flex items-start gap-3">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: accent + "22" }}
                >
                  <Icon className="w-6 h-6" style={{ color: accent }} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-white font-semibold">{aud.label}</h3>
                  <p className="text-xs text-slate-400">{aud.blurb}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {aud.groups.map((g) => (
                  <span
                    key={g}
                    className="text-xs px-2 py-1 rounded-full bg-slate-700/60 text-slate-300"
                  >
                    {GROUP_LABELS[g]}: <span className="font-semibold text-white">{groups[g]?.length || 0}</span>
                  </span>
                ))}
              </div>

              <Button
                size="sm"
                onClick={() => exportBenchmarkPDF(aud, groups)}
                disabled={loading || total === 0}
                className="gap-2 text-white border-0"
                style={{ background: accent }}
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                Download PDF
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}