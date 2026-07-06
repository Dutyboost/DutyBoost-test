import { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { TrendingUp, Euro, Store, ScanLine, Calendar, Info, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function AggregationView({ transactions, vouchers, period, customStart, customEnd, entityType = "retailer", onPeriodChange, onCustomStartChange, onCustomEndChange, airports = [], companyName }) {
  const { t } = useTranslation();
  // Transactions are pre-scaled by the parent for the selected period (incl. custom date range)
  const filteredTransactions = transactions;

  const aggregatedMetrics = useMemo(() => {
    let totalRedemptions = filteredTransactions.reduce((sum, t) => sum + (t.count || 1), 0);
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

    return {
      totalRedemptions,
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
      breakdown[airport].redemptions += t.count || 1;
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

  const COLORS = ["#2563eb", "#f97316", "#10b981", "#8b5cf6", "#ec4899", "#06b6d4"];

  return (
    <div className="space-y-6">
      {/* Aggregation metrics header */}
       <div>
        <h2 className="text-xl font-heading font-bold mb-2">
          {t('common.custom_aggregation') || 'Custom Aggregation — All Retail Stores of all Airports'}
        </h2>
        <p className="text-muted-foreground text-sm mb-4">{t('common.aggregation_desc') || 'Combined metrics across all your retail locations.'}</p>
        
        {/* Period selector */}
        <div className="flex items-center gap-2 flex-wrap mt-4">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground font-medium">{t('demo.period') || 'Period'}</span>
          {[
            { v: "daily", l: t('demo.daily') },
            { v: "monthly", l: t('demo.monthly') },
            { v: "yearly", l: t('demo.yearly') },
            { v: "custom", l: t('demo.custom') },
          ].map(({ v, l }) => (
            <button
              key={v}
              onClick={() => onPeriodChange(v)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                period === v ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:border-primary/50"
              }`}
            >
              {l}
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

      {/* Conversion note */}
      <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-lg px-4 py-2.5">
        <Info className="w-4 h-4 text-blue-600 shrink-0" />
        <p className="text-xs text-blue-700">{t('demo.conversion_note')}</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
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
          <p className="text-sm md:text-base font-heading font-bold whitespace-nowrap">€{parseFloat(aggregatedMetrics.grossRevenue).toLocaleString("nl-NL", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground font-medium">{t('demo.avg_sale_label') || 'Avg. Sales per DutyCredit'}</p>
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-sm md:text-base font-heading font-bold whitespace-nowrap">€{parseFloat(aggregatedMetrics.avgSalesPerCredit).toLocaleString("nl-NL", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground font-medium">{entityType === "retailer" ? (t('demo.platform_fee') || 'Platform Fee (2.5%)') : (t('demo.commission_earned') || 'Commission Earned')}</p>
            <Store className="w-4 h-4 text-purple-500" />
          </div>
          <p className="text-sm md:text-base font-heading font-bold whitespace-nowrap">€{parseFloat(aggregatedMetrics.platformFee).toLocaleString("nl-NL", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        </div>

        {/* DutyBoost Potential tile — Avg Sale with +0.01% uplift */}
        <div className="bg-card border border-border rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground font-medium">{t('demo.dutyboost_potential')}</p>
            <Sparkles className="w-4 h-4 text-indigo-500" />
          </div>
          <p className="text-sm md:text-base font-heading font-bold whitespace-nowrap">
            €{parseFloat(aggregatedMetrics.avgSalesPerCredit).toLocaleString("nl-NL", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            <span className="text-muted-foreground text-sm font-normal mx-1">→</span>
            <span className="text-indigo-600">€{(parseFloat(aggregatedMetrics.avgSalesPerCredit) * 1.0001).toLocaleString("nl-NL", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </p>
        </div>
      </div>

      {/* Secondary metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-card border border-border rounded-xl p-5 space-y-3">
          <p className="text-sm font-semibold">{entityType === "retailer" ? (t('common.total_redeemable') || 'Total Redeemable DutyCredits Available for your Airports') : (t('demo.dutycredits_issued') || 'Total DutyCredits Issued')}</p>
          <p className="text-xl md:text-3xl font-heading font-bold whitespace-nowrap">{entityType === "retailer" ? (aggregatedMetrics.vouchersIssued * 450).toLocaleString("de-DE") : aggregatedMetrics.vouchersIssued}</p>
          {entityType === "retailer" && <p className="text-xs text-muted-foreground">{t('common.across_all_retailers')}</p>}
        </div>

        <div className="bg-card border border-border rounded-xl p-5 space-y-3">
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
            <span className="font-semibold">€{parseFloat(aggregatedMetrics.grossRevenue).toLocaleString("nl-NL", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </div>
          <div className="flex justify-between items-center text-rose-600">
            <span>{t('demo.traveler_savings_dc') || 'Traveler Savings (DutyCredit)'}</span>
            <span className="font-semibold">- €{parseFloat(aggregatedMetrics.totalSavings).toLocaleString("nl-NL", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </div>
          <div className="flex justify-between items-center text-destructive">
            <span>{entityType === "retailer" ? (t('demo.platform_fee') || 'Platform Fee') : (t('demo.commission_earned') || 'Commission')}</span>
            <span className="font-semibold">- €{parseFloat(aggregatedMetrics.platformFee).toLocaleString("nl-NL", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </div>
          <div className="border-t border-border pt-2 flex justify-between items-center">
            <span className="font-semibold">{t('demo.your_net_revenue') || 'Your Net Revenue'}</span>
            <span className="font-bold text-emerald-600">€{parseFloat(aggregatedMetrics.netRevenue).toLocaleString("nl-NL", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
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
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} formatter={(v, n) => n === "revenue" ? [`€${v}`, "Revenue"] : [v, "Redemptions"]} />
              <Bar dataKey="redemptions" fill="#dbeafe" radius={[4, 4, 0, 0]} name="Redemptions" />
              <Bar dataKey="revenue" fill="#2563eb" radius={[4, 4, 0, 0]} name="Revenue (€)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Detailed table */}
      {airportBreakdown.length > 0 && (
        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <p className="font-semibold">{t('common.airport_performance') || 'Airport Performance Summary'}</p>
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
                {airportBreakdown.map((ap, i) => (
                  <tr key={ap.airport} className="border-b border-border last:border-0 hover:bg-muted/30">
                    <td className="py-2.5 px-3 font-semibold text-foreground">{ap.airportLabel}</td>
                    <td className="py-2.5 px-3 text-right text-blue-500 font-semibold">{ap.redemptions.toLocaleString("de-DE")}</td>
                    <td className="py-2.5 px-3 text-right font-semibold">€{parseFloat(ap.revenue).toLocaleString("nl-NL", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    <td className="py-2.5 px-3 text-right text-muted-foreground">€{parseFloat(ap.revenue / ap.redemptions).toLocaleString("nl-NL", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                  </tr>
                ))}
                <tr className="border-t-2 border-border bg-muted/20 font-semibold">
                  <td className="py-2.5 px-3">{t('common.total_label') || 'TOTAL'}</td>
                  <td className="py-2.5 px-3 text-right">{parseInt(aggregatedMetrics.totalRedemptions).toLocaleString("de-DE")}</td>
                  <td className="py-2.5 px-3 text-right">€{parseFloat(aggregatedMetrics.grossRevenue).toLocaleString("nl-NL", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                  <td className="py-2.5 px-3 text-right">€{parseFloat(aggregatedMetrics.avgSalesPerCredit).toLocaleString("nl-NL", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}