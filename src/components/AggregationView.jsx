import { Fragment, useMemo, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { TrendingUp, Euro, Store, ScanLine, Calendar, Info, Sparkles, Users, ChevronDown, ChevronRight, Coins, Wallet } from "lucide-react";
import { useTranslation } from "react-i18next";
import RedemptionRateSlider from "./RedemptionRateSlider";
import { DEFAULT_PERIOD_OPTIONS } from "../data/dashboardPeriods";
import { fmtMoney, fmtCurrencyNative } from "../utils/formatNumber";

export default function AggregationView({ transactions, vouchers, period, customStart, customEnd, entityType = "retailer", onPeriodChange, onCustomStartChange, onCustomEndChange, airports = [], companyName, redemptionRate, onRedemptionRateChange, currency = "EUR", periodOptions = DEFAULT_PERIOD_OPTIONS }) {
  const { t } = useTranslation();
  const [expandedAirport, setExpandedAirport] = useState(null);
  const fmtC = (v) => fmtMoney(Number(v), currency, 2);
  const curLabel = currency === "AWG" ? "Afl." : "€";
  // Minimum DutyCredit value — a market price point, not an FX conversion: €20 in Europe, $23 in USD markets.
  const minDcValue = currency === "EUR" ? 20 : 23;
  const fmtDc = (v) => fmtCurrencyNative(v, currency, 0);
  // The Estimated Redemption Rate slider scales the volume shown: 0% shows nothing,
  // and every figure rises from there as the slider moves.
  const rateMultiplier = (redemptionRate ?? 0) / 0.01;
  // Transactions are pre-scaled by the parent for the selected period (incl. custom date range)
  const filteredTransactions = useMemo(
    () => (rateMultiplier === 1 ? transactions : transactions.map(t => ({
      ...t,
      count: Math.round((t.count || 1) * rateMultiplier),
      transaction_value: (t.transaction_value || 0) * rateMultiplier,
      total_savings: (t.total_savings || 0) * rateMultiplier,
      total_commission: (t.total_commission || 0) * rateMultiplier,
      platform_revenue: (t.platform_revenue || 0) * rateMultiplier,
      credit_value: (t.credit_value ?? t.transaction_value ?? 0) * rateMultiplier,
    }))),
    [transactions, rateMultiplier]
  );

  const aggregatedMetrics = useMemo(() => {
    let totalRedemptions = filteredTransactions.reduce((sum, t) => sum + (t.count ?? 1), 0);
    let grossRevenue = filteredTransactions.reduce((sum, t) => sum + (t.transaction_value || 0), 0);
    let totalSavings = filteredTransactions.reduce((sum, t) => sum + (t.total_savings || 0), 0);
    let totalCommission = filteredTransactions.reduce((sum, t) => sum + (t.total_commission || 0), 0);

    const platformFee = entityType === "retailer"
      ? totalCommission
      : filteredTransactions.reduce((sum, t) => sum + (t.platform_revenue || 0), 0);
    const avgSalesPerCredit = totalRedemptions > 0 ? (grossRevenue / totalRedemptions) : 0;
    const avgDiscountEur = totalRedemptions > 0 ? (totalSavings / totalRedemptions) : 0;
    const avgDiscountPct = avgSalesPerCredit > 0 ? (avgDiscountEur / avgSalesPerCredit * 100) : 0;
    const netRevenue = grossRevenue - totalSavings - platformFee;

    // Total value of DutyCredits actually redeemed in the period, and the average
    // value per redemption.
    const actualDcValue = filteredTransactions.reduce((sum, t) => sum + (t.credit_value ?? t.transaction_value ?? 0), 0);
    const averageDcValue = totalRedemptions > 0 ? actualDcValue / totalRedemptions : 0;

    return {
      totalRedemptions,
      actualDcValue,
      averageDcValue,
      grossRevenue: grossRevenue.toFixed(2),
      platformFee: platformFee.toFixed(2),
      avgSalesPerCredit: avgSalesPerCredit.toFixed(2),
      avgDiscount: avgDiscountPct.toFixed(1),
      vouchersIssued: vouchers.length,
      totalSavings: totalSavings.toFixed(2),
      netRevenue: netRevenue.toFixed(2),
    };
  }, [filteredTransactions, vouchers, entityType, period]);

  const airportBreakdown = useMemo(() => {
    const breakdown = {};
    const airportOrder = [];
    
    // Get unique airports from vouchers (represents all available airports)
    const allAirports = [...new Set(vouchers.map(v => v.airport || "Unknown"))];
    
    // Initialize all airports in order, then add filtered transaction data
    allAirports.forEach(airport => {
      if (!breakdown[airport]) {
        breakdown[airport] = { airport, redemptions: 0, revenue: 0 };
        airportOrder.push(airport);
      }
    });
    
    // Add filtered transaction data
    filteredTransactions.forEach(t => {
      const airport = t.airport || "Unknown";
      if (!breakdown[airport]) {
        breakdown[airport] = { airport, redemptions: 0, revenue: 0 };
        airportOrder.push(airport);
      }
      breakdown[airport].redemptions += t.count ?? 1;
      breakdown[airport].revenue += t.transaction_value || 0;
    });
    
    const sorted = airportOrder
      .map(airport => breakdown[airport])
      .sort((a, b) => b.redemptions - a.redemptions);

    const airportNameMap = {};
    airports.forEach(a => { airportNameMap[a.code] = a; });
    return sorted.map(ap => {
      const info = airportNameMap[ap.airport];
      return {
        ...ap,
        airportLabel: info ? `${info.name} (${info.country})` : ap.airport,
      };
    });
  }, [filteredTransactions, period, airports]);

  const storeBreakdownByAirport = useMemo(() => {
    const map = {};
    filteredTransactions.forEach((t) => {
      const airport = t.airport || "Unknown";
      const store = t.store_name || "Unnamed store";
      if (!map[airport]) map[airport] = {};
      if (!map[airport][store]) map[airport][store] = { store, redemptions: 0, revenue: 0 };
      map[airport][store].redemptions += t.count ?? 1;
      map[airport][store].revenue += t.transaction_value || 0;
    });
    return Object.fromEntries(
      Object.entries(map).map(([airport, stores]) => [
        airport,
        Object.values(stores).sort((a, b) => b.revenue - a.revenue),
      ])
    );
  }, [filteredTransactions]);

  const totalAnnualPax = useMemo(() => airports.reduce((s, a) => s + (a.annual_pax || (a.daily_pax ? a.daily_pax * 365 : 0)), 0), [airports]);


  const COLORS = ["#2563eb", "#f97316", "#10b981", "#8b5cf6", "#ec4899", "#06b6d4"];

  return (
    <div className="space-y-6">
      {/* Aggregation metrics header */}
       <div>
        <h2 className="text-xl font-heading font-bold mb-2">
          {t('common.custom_aggregation') || 'Aggregation — All Retail Stores of all Airports'}
        </h2>
        <p className="text-muted-foreground text-sm mb-4">{t('common.aggregation_desc') || 'Combined metrics across all your retail locations.'}</p>
        
        {/* Period selector */}
        <div className="flex items-center gap-2 flex-wrap mt-4">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground font-medium">{t('demo.period') || 'Period'}</span>
          {periodOptions.map(({ value, labelKey }) => (
            <button
              key={value}
              onClick={() => onPeriodChange(value)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                period === value ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:border-primary/50"
              }`}
            >
              {t(labelKey)}
            </button>
          ))}
          {period === "custom" && (
            <div className="flex items-center gap-2 ml-2">
              <input type="date" value={customStart || ""} onChange={e => onCustomStartChange?.(e.target.value)}
                className="text-xs border border-input rounded-lg px-2 py-1.5 bg-background" />
              <span className="text-xs text-muted-foreground">{t('demo.to') || 'to'}</span>
              <input type="date" value={customEnd || ""} onChange={e => onCustomEndChange?.(e.target.value)}
                className="text-xs border border-input rounded-lg px-2 py-1.5 bg-background" />
            </div>
          )}
        </div>
      </div>

      {/* Redemption rate slider */}
      {onRedemptionRateChange && (
        <RedemptionRateSlider rate={redemptionRate} onChange={onRedemptionRateChange} />
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Yearly passengers + redemption rate */}
        <div className="bg-card border border-border rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground font-medium">Yearly Passengers</p>
            <Users className="w-4 h-4 text-cyan-500" />
          </div>
          <p className="text-sm md:text-base font-heading font-bold whitespace-nowrap">{parseInt(totalAnnualPax).toLocaleString()}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground font-medium">{t('demo.total_redemptions') || 'Total Redemptions'}</p>
            <ScanLine className="w-4 h-4 text-blue-500" />
          </div>
          <p className="text-sm md:text-base font-heading font-bold whitespace-nowrap">{parseInt(aggregatedMetrics.totalRedemptions).toLocaleString()}</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground font-medium">{t('demo.gross_revenue') || 'Gross Revenue'}</p>
            <Euro className="w-4 h-4 text-orange-500" />
          </div>
          <p className="text-sm md:text-base font-heading font-bold whitespace-nowrap">{fmtC(aggregatedMetrics.grossRevenue)}</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground font-medium">{t('demo.min_dc_value')}</p>
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-sm md:text-base font-heading font-bold whitespace-nowrap">{fmtDc(minDcValue)}</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground font-medium">Average DC Value</p>
            <Coins className="w-4 h-4 text-teal-500" />
          </div>
          <p className="text-sm md:text-base font-heading font-bold whitespace-nowrap">{fmtDc(aggregatedMetrics.averageDcValue)}</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground font-medium">Actual DC Value</p>
            <Wallet className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-sm md:text-base font-heading font-bold whitespace-nowrap">{fmtC(aggregatedMetrics.actualDcValue)}</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground font-medium">{entityType === "retailer" ? (t('demo.platform_fee') || 'Platform Fee (2.5%)') : (t('demo.commission_earned') || 'Commission Earned')}</p>
            <Store className="w-4 h-4 text-purple-500" />
          </div>
          <p className="text-sm md:text-base font-heading font-bold whitespace-nowrap">{fmtC(aggregatedMetrics.platformFee)}</p>
        </div>

        {/* DutyBoost Potential tile — Min. DC Value with uplift */}
        <div className="bg-card border border-border rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground font-medium">{t('demo.dutyboost_potential')}</p>
            <Sparkles className="w-4 h-4 text-indigo-500" />
          </div>
          <p className="text-sm md:text-base font-heading font-bold whitespace-nowrap">
            {fmtDc(minDcValue)}
            <span className="text-muted-foreground text-sm font-normal mx-1">→</span>
            <span className="text-indigo-600">{fmtDc(minDcValue * (1 + (redemptionRate ?? 0) / 100))}</span>
          </p>
        </div>
      </div>

      {/* Secondary metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {entityType !== "retailer" && (
          <div className="bg-card border border-border rounded-xl p-5 space-y-3">
            <p className="text-sm font-semibold">{t('demo.dutycredits_issued') || 'Total DutyCredits Issued'}</p>
            <p className="text-xl md:text-3xl font-heading font-bold whitespace-nowrap">{aggregatedMetrics.vouchersIssued}</p>
          </div>
        )}

        <div className={`bg-card border border-border rounded-xl p-5 space-y-3 ${entityType === "retailer" ? "md:col-span-2" : ""}`}>
          <p className="text-sm font-semibold">{t('common.avg_discount') || 'Average Discount Applied'}</p>
          <p className="text-xl md:text-3xl font-heading font-bold whitespace-nowrap">{parseFloat(aggregatedMetrics.avgDiscount).toLocaleString("nl-NL", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%</p>
          <p className="text-xs text-muted-foreground mt-2">{t('common.per_transaction') || 'Per transaction'}</p>
        </div>
      </div>

      {/* Revenue Breakdown */}
      <div className="bg-card border border-border rounded-xl p-6 space-y-4">
        <p className="font-semibold">{t('demo.revenue_breakdown') || 'Revenue Breakdown'}</p>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">{t('demo.gross_sales') || 'Gross Sales'}</span>
            <span className="font-semibold">{fmtC(aggregatedMetrics.grossRevenue)}</span>
          </div>
          <div className="flex justify-between items-center text-rose-600">
            <span>{t('demo.traveler_savings_dc') || 'Traveler Savings (DutyCredit)'}</span>
            <span className="font-semibold">- {fmtC(aggregatedMetrics.totalSavings)}</span>
          </div>
          <div className="flex justify-between items-center text-destructive">
            <span>{entityType === "retailer" ? (t('demo.platform_fee') || 'Platform Fee') : (t('demo.commission_earned') || 'Commission')}</span>
            <span className="font-semibold">- {fmtC(aggregatedMetrics.platformFee)}</span>
          </div>
          <div className="border-t border-border pt-2 flex justify-between items-center">
            <span className="font-semibold">{t('demo.your_net_revenue') || 'Your Net Revenue'}</span>
            <span className="font-bold text-emerald-600">{fmtC(aggregatedMetrics.netRevenue)}</span>
          </div>
        </div>
      </div>

      {/* Airport breakdown chart */}
      {airportBreakdown.length > 0 && (
        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <p className="font-semibold">{t('demo.redemptions_by_airport') || 'Redemptions by Airport'} <span className="text-xs font-normal text-muted-foreground ml-1">(Top 15)</span></p>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={airportBreakdown.slice(0, 15)} margin={{ top: 4, right: 16, bottom: 80, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="airportLabel" tick={{ fontSize: 10 }} angle={-45} textAnchor="end" height={100} interval={0} />
              <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} formatter={(v, n) => n === "revenue" ? [fmtC(v), "Revenue"] : [v, "Redemptions"]} />
              <Bar dataKey="redemptions" fill="#dbeafe" radius={[4, 4, 0, 0]} name="Redemptions" />
              <Bar dataKey="revenue" fill="#2563eb" radius={[4, 4, 0, 0]} name={`Revenue (${curLabel})`} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Detailed table */}
      {airportBreakdown.length > 0 && (
        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <div>
            <p className="font-semibold">{t('common.airport_performance') || 'Airport Performance Summary'}</p>
            <p className="text-xs text-muted-foreground mt-1">{t('common.drilldown_hint') || 'Click an airport to drill down to its stores.'}</p>
          </div>
          <div className="overflow-x-auto max-h-96 overflow-y-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-3 text-xs text-muted-foreground font-medium">{t('demo.col_airport') || 'Airport'}</th>
                  <th className="text-right py-2 px-3 text-xs text-muted-foreground font-medium">{t('demo.redemptions') || 'Redemptions'}</th>
                  <th className="text-right py-2 px-3 text-xs text-muted-foreground font-medium">{t('demo.gross_revenue') || 'Gross Revenue'}</th>
                  <th className="text-right py-2 px-3 text-xs text-muted-foreground font-medium">{t('common.avg_per_sale') || 'Avg per Sale'}</th>
                </tr>
              </thead>
              <tbody>
                {airportBreakdown.map((ap) => {
                  const isOpen = expandedAirport === ap.airport;
                  const stores = storeBreakdownByAirport[ap.airport] || [];
                  return (
                    <Fragment key={ap.airport}>
                      <tr
                        onClick={() => setExpandedAirport(isOpen ? null : ap.airport)}
                        className="border-b border-border last:border-0 hover:bg-muted/30 cursor-pointer"
                      >
                        <td className="py-2.5 px-3 font-semibold text-foreground">
                          <span className="inline-flex items-center gap-2">
                            {isOpen ? (
                              <ChevronDown className="w-3.5 h-3.5 text-primary" />
                            ) : (
                              <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
                            )}
                            {ap.airportLabel}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-right text-blue-500 font-semibold">{ap.redemptions.toLocaleString("de-DE")}</td>
                        <td className="py-2.5 px-3 text-right font-semibold">{fmtC(ap.revenue)}</td>
                        <td className="py-2.5 px-3 text-right text-muted-foreground">{fmtC(ap.revenue / ap.redemptions)}</td>
                      </tr>
                      {isOpen && (
                        <tr className="bg-muted/20">
                          <td colSpan={4} className="px-3 pb-3 pt-1">
                            {stores.length === 0 ? (
                              <p className="text-xs text-muted-foreground py-2">
                                {t('common.no_store_detail') || 'No store-level detail for this airport in the selected period.'}
                              </p>
                            ) : (
                              <div className="rounded-lg border border-border bg-card overflow-hidden">
                                <table className="w-full text-xs">
                                  <thead className="bg-muted/50">
                                    <tr>
                                      <th className="text-left py-2 px-3 font-medium text-muted-foreground">{t('demo.col_store') || 'Store'}</th>
                                      <th className="text-right py-2 px-3 font-medium text-muted-foreground">{t('demo.redemptions') || 'Redemptions'}</th>
                                      <th className="text-right py-2 px-3 font-medium text-muted-foreground">{t('demo.gross_revenue') || 'Gross Revenue'}</th>
                                      <th className="text-right py-2 px-3 font-medium text-muted-foreground">{t('common.avg_per_sale') || 'Avg per Sale'}</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {stores.map((s) => (
                                      <tr key={s.store} className="border-t border-border">
                                        <td className="py-2 px-3 font-medium">{s.store}</td>
                                        <td className="py-2 px-3 text-right">{s.redemptions.toLocaleString("de-DE")}</td>
                                        <td className="py-2 px-3 text-right">{fmtC(s.revenue)}</td>
                                        <td className="py-2 px-3 text-right text-muted-foreground">{fmtC(s.revenue / s.redemptions)}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            )}
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  );
                })}
                <tr className="border-t-2 border-border bg-muted/20 font-semibold">
                  <td className="py-2.5 px-3">{t('common.total_label') || 'TOTAL'}</td>
                  <td className="py-2.5 px-3 text-right">{parseInt(aggregatedMetrics.totalRedemptions).toLocaleString("de-DE")}</td>
                  <td className="py-2.5 px-3 text-right">{fmtC(aggregatedMetrics.grossRevenue)}</td>
                  <td className="py-2.5 px-3 text-right">{fmtC(aggregatedMetrics.avgSalesPerCredit)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}