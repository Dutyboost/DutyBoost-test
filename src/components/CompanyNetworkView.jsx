import { useState, useMemo } from "react";
import { Globe, TrendingUp, ChevronDown, ChevronUp } from "lucide-react";
import { fmtNum, fmtEur } from "@/utils/formatNumber";
import { computeCompanyTotals, numFontClass } from "@/utils/retailerCalc";

export default function CompanyNetworkView({ company, conversionRate, t }) {
  const [showAllAirports, setShowAllAirports] = useState(false);

  const totals = useMemo(
    () => computeCompanyTotals(company.airports, conversionRate),
    [company, conversionRate]
  );
  const rows = useMemo(
    () => totals.rows.slice().sort((a, b) => b.annualNet - a.annualNet),
    [totals]
  );
  const visibleRows = showAllAirports ? rows : rows.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Combined network revenue */}
      <div className="bg-slate-900 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <h3 className="font-bold text-white text-lg flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-400 shrink-0" />
              {t("calculator.company_network_title")}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {t("calculator.company_network_desc", { company: company.name })}
            </p>
          </div>
          <span className="text-xs text-slate-300 bg-slate-800 px-3 py-1 rounded-full whitespace-nowrap shrink-0">
            {company.airports.length} {t("calculator.company_airports")}
          </span>
        </div>

        {/* Net revenue */}
        <div>
          <p className="text-xs text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> {t("calculator.portfolio_net_revenue")}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-slate-800 rounded-xl p-4 flex sm:flex-col items-center sm:justify-center justify-between gap-2">
              <p className="text-xs text-slate-400">{t("calculator.daily_net")}</p>
              <p className={`${numFontClass(fmtEur(totals.dailyNet, 2))} font-bold text-white break-all`}>{fmtEur(totals.dailyNet, 2)}</p>
            </div>
            <div className="bg-emerald-700 rounded-xl p-4 flex sm:flex-col items-center sm:justify-center justify-between gap-2">
              <p className="text-xs text-emerald-200">{t("calculator.monthly_net")}</p>
              <p className={`${numFontClass(fmtEur(totals.monthlyNet, 2))} font-bold text-white break-all`}>{fmtEur(totals.monthlyNet, 2)}</p>
            </div>
            <div className="bg-emerald-600 rounded-xl p-4 flex sm:flex-col items-center sm:justify-center justify-between gap-2">
              <p className="text-xs text-emerald-100">{t("calculator.annual_net")}</p>
              <p className={`${numFontClass(fmtEur(totals.annualNet, 2))} font-bold text-white break-all`}>{fmtEur(totals.annualNet, 2)}</p>
            </div>
          </div>
        </div>

        {/* Platform fee */}
        <div>
          <p className="text-xs text-slate-400 uppercase tracking-widest mb-2">{t("calculator.platform_fee_projection_title")}</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-slate-800 rounded-xl p-4 flex sm:flex-col items-center sm:justify-center justify-between gap-2">
              <p className="text-xs text-slate-400">{t("calculator.daily_fee")}</p>
              <p className={`${numFontClass(fmtEur(totals.dailyFee, 2))} font-bold text-orange-400 break-all`}>{fmtEur(totals.dailyFee, 2)}</p>
            </div>
            <div className="bg-orange-500 rounded-xl p-4 flex sm:flex-col items-center sm:justify-center justify-between gap-2">
              <p className="text-xs text-orange-100">{t("calculator.monthly_fee")}</p>
              <p className={`${numFontClass(fmtEur(totals.monthlyFee, 2))} font-bold text-white break-all`}>{fmtEur(totals.monthlyFee, 2)}</p>
            </div>
            <div className="bg-orange-600 rounded-xl p-4 flex sm:flex-col items-center sm:justify-center justify-between gap-2">
              <p className="text-xs text-orange-50">{t("calculator.annual_fee")}</p>
              <p className={`${numFontClass(fmtEur(totals.annualFee, 2))} font-bold text-white break-all`}>{fmtEur(totals.annualFee, 2)}</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl px-4 py-3 text-xs text-slate-400 leading-relaxed">
          <span className="text-slate-300 font-semibold">{fmtNum(totals.totalDailyTravelers)}</span> {t("calculator.travelers_label")} → <span className="text-slate-300 font-semibold">{fmtNum(totals.dailyRedemptions)}</span> {t("calculator.redemptions_label")} / {t("calculator.day_label")}
        </div>
      </div>

      {/* Per-airport table — top 5 by default, expand on click */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-slate-600 border-b border-slate-200 bg-slate-50">
                <th className="px-5 py-3">{t("calculator.company_col_airport")}</th>
                <th className="px-4 py-3 text-right">{t("calculator.company_col_travelers")}</th>
                <th className="px-4 py-3 text-right">{t("calculator.company_col_redemptions")}</th>
                <th className="px-4 py-3 text-right">{t("calculator.company_col_monthly")}</th>
                <th className="px-4 py-3 text-right">{t("calculator.company_col_annual")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {visibleRows.map((r) => (
                <tr key={r.airport.code} className="hover:bg-slate-50">
                  <td className="px-5 py-3">
                    <div className="font-medium text-slate-900">{r.airport.name}</div>
                    <div className="text-xs text-slate-500">{r.airport.city}, {r.airport.country} · <span className="font-mono">{r.airport.code}</span></div>
                  </td>
                  <td className="px-4 py-3 text-right text-slate-700">{fmtNum(r.airport.daily_pax)}</td>
                  <td className="px-4 py-3 text-right text-slate-700">{fmtNum(r.dailyRedemptions)}</td>
                  <td className="px-4 py-3 text-right font-semibold text-emerald-700">{fmtEur(r.monthlyNet, 2)}</td>
                  <td className="px-4 py-3 text-right font-bold text-emerald-700">{fmtEur(r.annualNet, 2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {rows.length > 5 && (
          showAllAirports ? (
            <button
              onClick={() => setShowAllAirports(false)}
              className="w-full flex items-center justify-center gap-1 py-3 text-sm text-blue-600 font-medium hover:bg-blue-50 border-t border-slate-200 transition-colors"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => setShowAllAirports(true)}
              className="w-full flex items-center justify-center gap-1 py-3 text-sm text-blue-600 font-medium hover:bg-blue-50 border-t border-slate-200 transition-colors"
            >
              {t("calculator.company_show_all", { count: rows.length })}
              <ChevronDown className="w-4 h-4" />
            </button>
          )
        )}
      </div>
    </div>
  );
}