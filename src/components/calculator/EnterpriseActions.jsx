import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FileDown, Share2, CalendarPlus, Save, Trash2, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { fmtEurCompact } from "@/data/enterpriseCalculator";

const CHART_COLORS = ["#1A6BFF", "#FF8000", "#10b981", "#8b5cf6", "#ef4444", "#06b6d4"];

export default function EnterpriseActions({ retailer, benchmarks, projections, scenarios, onSaveScenario, onDeleteScenario }) {
  const { t } = useTranslation();
  const [shared, setShared] = useState(false);

  const handleExportPDF = () => {
    import("jspdf").then(({ jsPDF }) => {
      const doc = new jsPDF();
      doc.setFillColor(15, 23, 42);
      doc.rect(0, 0, 210, 35, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(22);
      doc.text(t("entCalc.pdf_title"), 20, 18);
      doc.setFontSize(10);
      doc.setTextColor(148, 163, 184);
      doc.text(`${t("entCalc.pdf_retailer")}: ${retailer?.name || "—"}`, 20, 26);
      doc.text(`${t("entCalc.pdf_generated")}: ${new Date().toLocaleDateString()}`, 20, 31);

      doc.setTextColor(15, 23, 42);
      doc.setFontSize(14);
      doc.text(t("entCalc.pdf_exec_summary"), 20, 50);
      doc.setFontSize(10);
      const lines = [
        `${t("entCalc.pdf_annual_pax")}:      ${benchmarks.annualPax.toLocaleString()}`,
        `${t("entCalc.pdf_stores")}:       ${benchmarks.storeCount}`,
        `${t("entCalc.pdf_dc_travelers")}:   ${benchmarks.dutyCreditTravelers.toLocaleString()}`,
        `${t("entCalc.pdf_avg_basket")}:   EUR ${benchmarks.avgBasket.toFixed(2)}`,
        ``,
        `${t("entCalc.pdf_potential_sales")}:  EUR ${projections.potentialIncrementalSales.toLocaleString()}`,
        `${t("entCalc.pdf_db_commission")}:         EUR ${projections.dutyBoostCommission.toLocaleString()}`,
        `${t("entCalc.pdf_net_rev")}:   EUR ${projections.retailerNetRevenue.toLocaleString()}`,
      ];
      lines.forEach((line, i) => doc.text(line, 20, 60 + i * 7));

      doc.setFontSize(8);
      doc.setTextColor(148, 163, 184);
      doc.text(t("entCalc.pdf_confidence_note"), 20, 130);
      doc.text(t("entCalc.pdf_projection_note"), 20, 135);
      doc.text(t("entCalc.pdf_copyright"), 20, 145);
      doc.save(`dutyboost-roi-${retailer?.key || "report"}.pdf`);
    });
  };

  const handleShare = () => {
    const params = new URLSearchParams({ retailer: retailer?.key || "", rate: String(projections.basket) });
    const url = `${window.location.origin}/roi-calculator?${params}`;
    navigator.clipboard.writeText(url).then(() => {
      setShared(true);
      setTimeout(() => setShared(false), 2500);
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <button onClick={handleExportPDF} className="inline-flex items-center gap-2 bg-slate-900 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-slate-800 transition-colors">
          <FileDown className="w-4 h-4" /> {t("entCalc.export_pdf")}
        </button>
        <button onClick={handleShare} className="inline-flex items-center gap-2 bg-white border border-slate-300 text-slate-700 font-semibold px-5 py-2.5 rounded-xl hover:border-primary transition-colors">
          <Share2 className="w-4 h-4" /> {shared ? t("entCalc.link_copied") : t("entCalc.share_report")}
        </button>
        <button onClick={onSaveScenario} className="inline-flex items-center gap-2 bg-white border border-slate-300 text-slate-700 font-semibold px-5 py-2.5 rounded-xl hover:border-primary transition-colors">
          <Save className="w-4 h-4" /> {t("entCalc.save_scenario")}
        </button>
        <Link to="/request-more-information" className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-primary/90 transition-colors">
          <CalendarPlus className="w-4 h-4" /> {t("entCalc.request_meeting")}
        </Link>
      </div>

      {scenarios.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-4 h-4 text-primary" />
            <h3 className="font-semibold text-slate-900 text-sm">{t("entCalc.scenario_comparison")}</h3>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={scenarios} margin={{ left: 0, right: 10, top: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#64748b" }} axisLine={false} tickLine={false} interval={0} angle={-15} textAnchor="end" height={50} />
              <YAxis tickFormatter={fmtEurCompact} tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <Tooltip formatter={(v) => fmtEurCompact(v)} contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 12 }} />
              <Bar dataKey="netRevenue" radius={[4, 4, 0, 0]}>
                {scenarios.map((_, i) => (
                  <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-3 space-y-1.5">
            {scenarios.map((s, i) => (
              <div key={s.id} className="flex items-center justify-between gap-2 text-sm py-1.5 px-2 rounded hover:bg-slate-50">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: CHART_COLORS[i % CHART_COLORS.length] }} />
                  <span className="font-medium text-slate-700 truncate">{s.name}</span>
                  <span className="text-xs text-slate-400 shrink-0">{t("entCalc.airports_count", { count: s.airportCount })}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="font-semibold text-slate-900">{fmtEurCompact(s.netRevenue)}</span>
                  <button onClick={() => onDeleteScenario(s.id)} className="text-slate-300 hover:text-red-500">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}