import { useTranslation } from "react-i18next";
import { Building2, MapPin, Plane, Users, ShoppingBag, TrendingUp, Euro, Award } from "lucide-react";
import ConfidenceBadge from "./ConfidenceBadge";
import { translateRetailerDesc } from "./i18nHelpers";
import { fmtCompact, fmtEurCompact } from "@/data/enterpriseCalculator";

function StatCard({ icon: Icon, label, value, sub, confidence, accent = "text-slate-900" }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <Icon className="w-4 h-4 text-slate-400" />
        {confidence && <ConfidenceBadge level={confidence} size="xs" showLabel={false} />}
      </div>
      <p className="text-xs text-slate-500">{label}</p>
      <p className={`text-lg font-bold ${accent} leading-tight`}>{value}</p>
      {sub && <p className="text-[10px] text-slate-400">{sub}</p>}
    </div>
  );
}

export default function SummaryCards({ retailer, selectedCount, countryCount, benchmarks, projections }) {
  const { t } = useTranslation();
  return (
    <div className="space-y-3">
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-32 -mt-32" />
        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-widest">{t("entCalc.selected_retailer")}</p>
              <h3 className="text-xl font-bold">{retailer?.name || "—"}</h3>
              <p className="text-xs text-slate-400">{retailer ? translateRetailerDesc(t, retailer) : ""}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-400 uppercase tracking-widest">{t("entCalc.est_net_revenue")}</p>
            <p className="text-3xl sm:text-4xl font-bold text-emerald-400">{fmtEurCompact(projections.retailerNetRevenue)}</p>
            <div className="flex items-center justify-end gap-1.5 mt-1">
              <ConfidenceBadge level="estimated" size="xs" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <StatCard icon={MapPin} label={t("entCalc.countries")} value={countryCount} confidence="high" />
        <StatCard icon={Plane} label={t("entCalc.airports")} value={selectedCount} confidence="high" />
        <StatCard icon={Building2} label={t("entCalc.stores")} value={benchmarks.storeCount} confidence={benchmarks.confidence?.storeCount} />
        <StatCard icon={Users} label={t("entCalc.est_passengers")} value={fmtCompact(benchmarks.annualPax)} sub={t("entCalc.annual")} confidence="high" />
        <StatCard icon={ShoppingBag} label={t("entCalc.avg_basket")} value={fmtEurCompact(benchmarks.avgBasket)} sub={t("entCalc.per_basket")} confidence={benchmarks.confidence?.avgBasket} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-5 text-white">
          <TrendingUp className="w-5 h-5 text-blue-200 mb-2" />
          <p className="text-xs text-blue-200 mb-1">{t("entCalc.potential_sales")}</p>
          <p className="text-2xl font-bold">{fmtEurCompact(projections.potentialIncrementalSales)}</p>
          <p className="text-[10px] text-blue-300 mt-1">{fmtCompact(projections.annualRedemptions)} {t("entCalc.redemptions_yr")}</p>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-5 text-white">
          <Euro className="w-5 h-5 text-orange-200 mb-2" />
          <p className="text-xs text-orange-200 mb-1">{t("entCalc.db_commission")}</p>
          <p className="text-2xl font-bold">{fmtEurCompact(projections.dutyBoostCommission)}</p>
          <p className="text-[10px] text-orange-300 mt-1">{t("entCalc.commission_note")} · /yr</p>
        </div>
        <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-xl p-5 text-white">
          <Award className="w-5 h-5 text-emerald-200 mb-2" />
          <p className="text-xs text-emerald-200 mb-1">{t("entCalc.retailer_net_rev")}</p>
          <p className="text-2xl font-bold">{fmtEurCompact(projections.retailerNetRevenue)}</p>
          <p className="text-[10px] text-emerald-300 mt-1">{t("entCalc.after_savings")} · /yr</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Users className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">{t("entCalc.est_dc_travelers")}</p>
            <p className="text-xs text-slate-500">{t("entCalc.preactivated_shoppers")}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-primary">{fmtCompact(benchmarks.dutyCreditTravelers)}</p>
          <div className="flex items-center justify-end gap-1.5 mt-0.5">
            <ConfidenceBadge level="estimated" size="xs" showLabel={false} />
            <span className="text-[10px] text-slate-400">{fmtEurCompact(projections.netRevenuePerTx)}{t("entCalc.per_tx_net")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}