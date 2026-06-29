import { useMemo } from "react";
import { Globe, TrendingUp, PlaneTakeoff, Store } from "lucide-react";
import { fmtNum, fmtEur } from "@/utils/formatNumber";
import { computeCompanyTotals, computeCompanyStoreCount, numFontClass } from "@/utils/retailerCalc";

export default function CompanyNetworkView({ company, conversionRate, t }) {
  const totals = useMemo(
    () => computeCompanyTotals(company.airports, conversionRate),
    [company, conversionRate]
  );
  const storeCount = useMemo(
    () => company.storeCount ?? computeCompanyStoreCount(company.airports),
    [company]
  );
  const airportCount = company.airports.length;

  return (
    <div className="bg-slate-900 rounded-2xl p-6 space-y-4">
      <div className="min-w-0">
        <h3 className="font-bold text-white text-lg flex items-center gap-2">
          <Globe className="w-5 h-5 text-blue-400 shrink-0" />
          {t("calculator.company_network_title")}
        </h3>
        <p className="text-xs text-slate-400 mt-0.5">
          {t("calculator.company_network_desc", { company: company.name })}
        </p>
      </div>

      {/* Airports & stores stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-slate-800 rounded-xl p-4 flex items-center gap-3">
          <PlaneTakeoff className="w-8 h-8 text-blue-400 shrink-0" />
          <div className="min-w-0">
            <p className="text-2xl font-bold text-white leading-tight">{fmtNum(airportCount)}</p>
            <p className="text-xs text-slate-400">{t("calculator.company_airports")}</p>
          </div>
        </div>
        <div className="bg-slate-800 rounded-xl p-4 flex items-center gap-3">
          <Store className="w-8 h-8 text-emerald-400 shrink-0" />
          <div className="min-w-0">
            <p className="text-2xl font-bold text-white leading-tight">{fmtNum(storeCount)}</p>
            <p className="text-xs text-slate-400">{t("calculator.company_stores")}</p>
          </div>
        </div>
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
        <span className="text-slate-300 font-semibold">{fmtNum(totals.totalDailyTravelers)}</span> {t("calculator.travelers_label")} / {t("calculator.day_label")} → <span className="text-slate-300 font-semibold">{fmtNum(totals.dailyRedemptions)}</span> {t("calculator.redemptions_label")} / {t("calculator.day_label")}
      </div>
    </div>
  );
}