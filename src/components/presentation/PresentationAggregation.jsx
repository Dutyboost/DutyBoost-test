import { useMemo } from "react";
import { Globe, PlaneTakeoff, Store, TrendingUp, Euro, ScanLine, Users } from "lucide-react";
import { fmtNum, fmtEur } from "@/utils/formatNumber";
import { computeCompanyTotals, computeCompanyStoreCount, numFontClass } from "@/utils/retailerCalc";

export default function PresentationAggregation({ company, conversionRate = 3, compact = false }) {
  const totals = useMemo(
    () => computeCompanyTotals(company.airports, conversionRate),
    [company, conversionRate]
  );
  const storeCount = useMemo(
    () => company.storeCount ?? computeCompanyStoreCount(company.airports),
    [company]
  );
  const airportCount = company.airports.length;

  if (compact) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-xl p-5 text-center space-y-2">
          <PlaneTakeoff className="w-6 h-6 text-blue-500 mx-auto" />
          <p className="text-2xl font-heading font-bold">{fmtNum(airportCount)}</p>
          <p className="text-xs text-muted-foreground">Airports</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-5 text-center space-y-2">
          <Store className="w-6 h-6 text-orange-500 mx-auto" />
          <p className="text-2xl font-heading font-bold">{fmtNum(storeCount)}</p>
          <p className="text-xs text-muted-foreground">Stores</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-5 text-center space-y-2">
          <TrendingUp className="w-6 h-6 text-emerald-500 mx-auto" />
          <p className={`font-heading font-bold ${numFontClass(fmtEur(totals.annualNet, 0))}`}>{fmtEur(totals.annualNet, 0)}</p>
          <p className="text-xs text-muted-foreground">Annual Net Revenue</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-5 text-center space-y-2">
          <Euro className="w-6 h-6 text-purple-500 mx-auto" />
          <p className={`font-heading font-bold ${numFontClass(fmtEur(totals.annualFee, 0))}`}>{fmtEur(totals.annualFee, 0)}</p>
          <p className="text-xs text-muted-foreground">Annual Platform Fee</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-xl p-5 space-y-2">
          <div className="flex items-center justify-between">
            <PlaneTakeoff className="w-5 h-5 text-blue-500" />
            <p className="text-xs text-muted-foreground">Airports</p>
          </div>
          <p className="text-2xl font-heading font-bold">{fmtNum(airportCount)}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-5 space-y-2">
          <div className="flex items-center justify-between">
            <Store className="w-5 h-5 text-orange-500" />
            <p className="text-xs text-muted-foreground">Stores</p>
          </div>
          <p className="text-2xl font-heading font-bold">{fmtNum(storeCount)}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-5 space-y-2">
          <div className="flex items-center justify-between">
            <Users className="w-5 h-5 text-indigo-500" />
            <p className="text-xs text-muted-foreground">Daily Travelers</p>
          </div>
          <p className="text-2xl font-heading font-bold">{fmtNum(totals.totalDailyTravelers)}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-5 space-y-2">
          <div className="flex items-center justify-between">
            <ScanLine className="w-5 h-5 text-cyan-500" />
            <p className="text-xs text-muted-foreground">Daily Redemptions</p>
          </div>
          <p className="text-2xl font-heading font-bold">{fmtNum(totals.dailyRedemptions)}</p>
        </div>
      </div>

      {/* Revenue projection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-xl p-5 space-y-2">
          <p className="text-xs text-muted-foreground uppercase tracking-widest">Daily Net Revenue</p>
          <p className={`font-heading font-bold text-foreground ${numFontClass(fmtEur(totals.dailyNet, 0))}`}>{fmtEur(totals.dailyNet, 0)}</p>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 space-y-2">
          <p className="text-xs text-emerald-600 uppercase tracking-widest">Monthly Net Revenue</p>
          <p className={`font-heading font-bold text-emerald-700 ${numFontClass(fmtEur(totals.monthlyNet, 0))}`}>{fmtEur(totals.monthlyNet, 0)}</p>
        </div>
        <div className="bg-emerald-100 border border-emerald-300 rounded-xl p-5 space-y-2">
          <p className="text-xs text-emerald-700 uppercase tracking-widest">Annual Net Revenue</p>
          <p className={`font-heading font-bold text-emerald-800 ${numFontClass(fmtEur(totals.annualNet, 0))}`}>{fmtEur(totals.annualNet, 0)}</p>
        </div>
      </div>

      {/* Platform fee projection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-xl p-5 space-y-2">
          <p className="text-xs text-muted-foreground uppercase tracking-widest">Daily Fee (2.5%)</p>
          <p className={`font-heading font-bold text-orange-500 ${numFontClass(fmtEur(totals.dailyFee, 0))}`}>{fmtEur(totals.dailyFee, 0)}</p>
        </div>
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-5 space-y-2">
          <p className="text-xs text-orange-600 uppercase tracking-widest">Monthly Fee</p>
          <p className={`font-heading font-bold text-orange-600 ${numFontClass(fmtEur(totals.monthlyFee, 0))}`}>{fmtEur(totals.monthlyFee, 0)}</p>
        </div>
        <div className="bg-orange-100 border border-orange-300 rounded-xl p-5 space-y-2">
          <p className="text-xs text-orange-700 uppercase tracking-widest">Annual Fee</p>
          <p className={`font-heading font-bold text-orange-700 ${numFontClass(fmtEur(totals.annualFee, 0))}`}>{fmtEur(totals.annualFee, 0)}</p>
        </div>
      </div>

      {/* Avg basket */}
      <div className="bg-card border border-border rounded-xl p-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Globe className="w-5 h-5 text-blue-500" />
          <div>
            <p className="text-sm font-semibold">Traffic-Weighted Avg Basket</p>
            <p className="text-xs text-muted-foreground">Across all {fmtNum(airportCount)} airports</p>
          </div>
        </div>
        <p className="text-2xl font-heading font-bold text-primary">€{totals.avgBasket.toFixed(2)}</p>
      </div>
    </div>
  );
}