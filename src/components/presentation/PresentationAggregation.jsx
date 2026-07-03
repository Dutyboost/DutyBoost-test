import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Globe, PlaneTakeoff, Store, TrendingUp, Euro, ScanLine, Users, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fmtNum, fmtEur } from "@/utils/formatNumber";
import { computeCompanyTotals, computeCompanyStoreCount, numFontClass } from "@/utils/retailerCalc";

const DEMO_DASHBOARD_ROUTES = {
  "Lagardère Travel Retail": "/demo/retailer-lagardere",
  "Avolta (incl. World Duty Free, Hudson, Dufry)": "/demo/retailer-avolta",
  "Gebr. Heinemann": "/demo/retailer-heinemann",
  "Aena (Spanish Airport Retail)": "/demo/retailer-aena",
};

export default function PresentationAggregation({ company, conversionRate = 3, compact = false }) {
  const { t } = useTranslation();
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
          <p className="text-xs text-muted-foreground">{t('presentation.agg.airports')}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-5 text-center space-y-2">
          <Store className="w-6 h-6 text-orange-500 mx-auto" />
          <p className="text-2xl font-heading font-bold">{fmtNum(storeCount)}</p>
          <p className="text-xs text-muted-foreground">{t('presentation.agg.stores')}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-5 text-center space-y-2">
          <TrendingUp className="w-6 h-6 text-emerald-500 mx-auto" />
          <p className={`font-heading font-bold ${numFontClass(fmtEur(totals.annualNet, 0))}`}>{fmtEur(totals.annualNet, 0)}</p>
          <p className="text-xs text-muted-foreground">{t('presentation.agg.annual_net_revenue')}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-5 text-center space-y-2">
          <Euro className="w-6 h-6 text-purple-500 mx-auto" />
          <p className={`font-heading font-bold ${numFontClass(fmtEur(totals.annualFee, 0))}`}>{fmtEur(totals.annualFee, 0)}</p>
          <p className="text-xs text-muted-foreground">{t('presentation.agg.annual_platform_fee')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-xl p-5 space-y-2">
          <div className="flex items-center justify-between">
            <PlaneTakeoff className="w-5 h-5 text-blue-500" />
            <p className="text-xs text-muted-foreground">{t('presentation.agg.airports')}</p>
          </div>
          <p className="text-2xl font-heading font-bold">{fmtNum(airportCount)}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-5 space-y-2">
          <div className="flex items-center justify-between">
            <Store className="w-5 h-5 text-orange-500" />
            <p className="text-xs text-muted-foreground">{t('presentation.agg.stores')}</p>
          </div>
          <p className="text-2xl font-heading font-bold">{fmtNum(storeCount)}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-5 space-y-2">
          <div className="flex items-center justify-between">
            <Users className="w-5 h-5 text-indigo-500" />
            <p className="text-xs text-muted-foreground">{t('presentation.agg.daily_travelers')}</p>
          </div>
          <p className="text-2xl font-heading font-bold">{fmtNum(totals.totalDailyTravelers)}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-5 space-y-2">
          <div className="flex items-center justify-between">
            <ScanLine className="w-5 h-5 text-cyan-500" />
            <p className="text-xs text-muted-foreground">{t('presentation.agg.daily_redemptions')}</p>
          </div>
          <p className="text-2xl font-heading font-bold">{fmtNum(totals.dailyRedemptions)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-xl p-5 space-y-2">
          <p className="text-xs text-muted-foreground uppercase tracking-widest">{t('presentation.agg.daily_net')}</p>
          <p className={`font-heading font-bold text-foreground ${numFontClass(fmtEur(totals.dailyNet, 0))}`}>{fmtEur(totals.dailyNet, 0)}</p>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 space-y-2">
          <p className="text-xs text-emerald-600 uppercase tracking-widest">{t('presentation.agg.monthly_net')}</p>
          <p className={`font-heading font-bold text-emerald-700 ${numFontClass(fmtEur(totals.monthlyNet, 0))}`}>{fmtEur(totals.monthlyNet, 0)}</p>
        </div>
        <div className="bg-emerald-100 border border-emerald-300 rounded-xl p-5 space-y-2">
          <p className="text-xs text-emerald-700 uppercase tracking-widest">{t('presentation.agg.annual_net')}</p>
          <p className={`font-heading font-bold text-emerald-800 ${numFontClass(fmtEur(totals.annualNet, 0))}`}>{fmtEur(totals.annualNet, 0)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-xl p-5 space-y-2">
          <p className="text-xs text-muted-foreground uppercase tracking-widest">{t('presentation.agg.daily_fee')}</p>
          <p className={`font-heading font-bold text-orange-500 ${numFontClass(fmtEur(totals.dailyFee, 0))}`}>{fmtEur(totals.dailyFee, 0)}</p>
        </div>
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-5 space-y-2">
          <p className="text-xs text-orange-600 uppercase tracking-widest">{t('presentation.agg.monthly_fee')}</p>
          <p className={`font-heading font-bold text-orange-600 ${numFontClass(fmtEur(totals.monthlyFee, 0))}`}>{fmtEur(totals.monthlyFee, 0)}</p>
        </div>
        <div className="bg-orange-100 border border-orange-300 rounded-xl p-5 space-y-2">
          <p className="text-xs text-orange-700 uppercase tracking-widest">{t('presentation.agg.annual_fee')}</p>
          <p className={`font-heading font-bold text-orange-700 ${numFontClass(fmtEur(totals.annualFee, 0))}`}>{fmtEur(totals.annualFee, 0)}</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Globe className="w-5 h-5 text-blue-500" />
          <div>
            <p className="text-sm font-semibold">{t('presentation.agg.avg_basket')}</p>
            <p className="text-xs text-muted-foreground">{t('presentation.agg.across_all', { count: fmtNum(airportCount) })}</p>
          </div>
        </div>
        <p className="text-2xl font-heading font-bold text-primary">€{totals.avgBasket.toFixed(2)}</p>
      </div>

      <div className="text-center">
        <Link to={DEMO_DASHBOARD_ROUTES[company.name] || "/demo"}>
          <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white gap-2">
            <BarChart3 className="w-4 h-4" />
            {t('presentation.agg.view_dashboard')}
          </Button>
        </Link>
      </div>
    </div>
  );
}