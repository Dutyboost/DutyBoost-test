import { Building2, MapPin, Plane, Users, ShoppingBag, TrendingUp, Percent, Euro, Award } from "lucide-react";
import ConfidenceBadge from "./ConfidenceBadge";
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
  return (
    <div className="space-y-3">
      {/* Hero card */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-32 -mt-32" />
        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-widest">Selected Retailer</p>
              <h3 className="text-xl font-bold">{retailer?.name || "—"}</h3>
              <p className="text-xs text-slate-400">{retailer?.description}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-400 uppercase tracking-widest">Estimated Retailer Net Revenue</p>
            <p className="text-3xl sm:text-4xl font-bold text-emerald-400">{fmtEurCompact(projections.retailerNetRevenue)}</p>
            <div className="flex items-center justify-end gap-1.5 mt-1">
              <ConfidenceBadge level="estimated" size="xs" />
            </div>
          </div>
        </div>
      </div>

      {/* Selection stats */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <StatCard icon={MapPin} label="Countries" value={countryCount} confidence="high" />
        <StatCard icon={Plane} label="Airports" value={selectedCount} confidence="high" />
        <StatCard icon={Building2} label="Stores" value={benchmarks.storeCount} confidence={benchmarks.confidence?.storeCount} />
        <StatCard icon={Users} label="Est. Passengers" value={fmtCompact(benchmarks.annualPax)} sub="annual" confidence="high" />
        <StatCard icon={ShoppingBag} label="Avg Basket" value={fmtEurCompact(benchmarks.avgBasket)} sub="per basket" confidence={benchmarks.confidence?.avgBasket} />
      </div>

      {/* Financial projections */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-5 text-white">
          <TrendingUp className="w-5 h-5 text-blue-200 mb-2" />
          <p className="text-xs text-blue-200 mb-1">Potential Incremental Sales</p>
          <p className="text-2xl font-bold">{fmtEurCompact(projections.potentialIncrementalSales)}</p>
          <p className="text-[10px] text-blue-300 mt-1">{fmtCompact(projections.annualRedemptions)} redemptions/yr</p>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-5 text-white">
          <Euro className="w-5 h-5 text-orange-200 mb-2" />
          <p className="text-xs text-orange-200 mb-1">DutyBoost Commission</p>
          <p className="text-2xl font-bold">{fmtEurCompact(projections.dutyBoostCommission)}</p>
          <p className="text-[10px] text-orange-300 mt-1">2.5% · max €25/tx</p>
        </div>
        <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-xl p-5 text-white">
          <Award className="w-5 h-5 text-emerald-200 mb-2" />
          <p className="text-xs text-emerald-200 mb-1">Retailer Net Revenue</p>
          <p className="text-2xl font-bold">{fmtEurCompact(projections.retailerNetRevenue)}</p>
          <p className="text-[10px] text-emerald-300 mt-1">after savings + fee</p>
        </div>
      </div>

      {/* DutyCredit travelers */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Users className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">Estimated DutyCredit Travelers</p>
            <p className="text-xs text-slate-500">Pre-activated shoppers ready to spend</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-primary">{fmtCompact(benchmarks.dutyCreditTravelers)}</p>
          <div className="flex items-center justify-end gap-1.5 mt-0.5">
            <ConfidenceBadge level="estimated" size="xs" showLabel={false} />
            <span className="text-[10px] text-slate-400">{fmtEurCompact(projections.netRevenuePerTx)}/tx net</span>
          </div>
        </div>
      </div>
    </div>
  );
}