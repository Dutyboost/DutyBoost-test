import { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { TrendingUp, Euro, Store, ScanLine, Calendar } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function AggregationView({ transactions, vouchers, period, customStart, customEnd, entityType = "retailer", onPeriodChange }) {
  const { t } = useTranslation();
  // Filter transactions only for custom period; others use full data with divisors
  const filteredTransactions = useMemo(() => {
    // Only filter for custom period with dates
    if (period === "custom" && customStart && customEnd) {
      const start = new Date(customStart);
      const end = new Date(customEnd); 
      end.setDate(end.getDate() + 1);
      return transactions.filter(t => {
        const d = new Date(t.created_date);
        return d >= start && d < end;
      });
    }
    // For day/month/year, use all transactions and apply divisors in display
    return transactions;
  }, [transactions, period, customStart, customEnd]);

  const aggregatedMetrics = useMemo(() => {
    let totalRedemptions = filteredTransactions.reduce((sum, t) => sum + (t.count || 1), 0);
    let grossRevenue = filteredTransactions.reduce((sum, t) => sum + (t.transaction_value || 0), 0);
    
    // Apply period divisors for day/month projections
    let divisor = 1;
    if (period === "day") divisor = 365;
    else if (period === "month") divisor = 12;
    
    if (divisor > 1) {
      totalRedemptions = Math.round(totalRedemptions / divisor);
      grossRevenue = grossRevenue / divisor;
    }
    
    const platformFee = entityType === "retailer"
      ? grossRevenue * 0.025
      : filteredTransactions.reduce((sum, t) => sum + (t.platform_revenue || 0), 0) / divisor;
    const avgSalesPerCredit = totalRedemptions > 0 ? (grossRevenue / totalRedemptions) : 0;
    const avgDiscount = totalRedemptions > 0
      ? (filteredTransactions.reduce((sum, t) => sum + (t.discount_applied || 0) * (t.count || 1), 0) / totalRedemptions)
      : 0;
    const totalSavings = totalRedemptions * avgDiscount * avgSalesPerCredit / 100;
    const netRevenue = grossRevenue - totalSavings - platformFee;

    return {
      totalRedemptions,
      grossRevenue: grossRevenue.toFixed(2),
      platformFee: platformFee.toFixed(2),
      avgSalesPerCredit: avgSalesPerCredit.toFixed(2),
      avgDiscount: avgDiscount.toFixed(1),
      vouchersIssued: vouchers.length,
      totalSavings: totalSavings.toFixed(2),
      netRevenue: netRevenue.toFixed(2),
    };
  }, [filteredTransactions, vouchers, entityType, period]);

  const airportBreakdown = useMemo(() => {
    const breakdown = {};
    filteredTransactions.forEach(t => {
      const airport = t.airport || "Unknown";
      if (!breakdown[airport]) {
        breakdown[airport] = { airport, redemptions: 0, revenue: 0 };
      }
      breakdown[airport].redemptions += t.count || 1;
      breakdown[airport].revenue += t.transaction_value || 0;
    });
    
    // Apply period divisors for projections
    let divisor = 1;
    if (period === "day") divisor = 365;
    else if (period === "month") divisor = 12;
    
    const scaled = Object.values(breakdown).map(item => ({
      ...item,
      redemptions: divisor > 1 ? Math.round(item.redemptions / divisor) : item.redemptions,
      revenue: divisor > 1 ? item.revenue / divisor : item.revenue,
    }));
    
    return scaled.sort((a, b) => b.revenue - a.revenue);
  }, [filteredTransactions, period]);

  const COLORS = ["#2563eb", "#f97316", "#10b981", "#8b5cf6", "#ec4899", "#06b6d4"];

  return (
    <div className="space-y-6">
      {/* Aggregation metrics header */}
       <div>
        <h2 className="text-xl font-heading font-bold mb-2">{t('common.custom_aggregation') || 'Custom Aggregation — All Stores'}</h2>
        <p className="text-muted-foreground text-sm mb-4">{t('common.aggregation_desc') || 'Combined metrics across all your retail locations.'}</p>
        
        {/* Period selector */}
        <div className="flex items-center gap-2 flex-wrap mt-4">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground font-medium">{t('demo.period') || 'Period'}</span>
          {[
            { v: "day", l: t('demo.daily') },
            { v: "month", l: t('demo.monthly') },
            { v: "year", l: t('demo.yearly') },
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
        </div>
      </div>



      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground font-medium">{t('demo.total_redemptions') || 'Total Redemptions'}</p>
            <ScanLine className="w-4 h-4 text-blue-500" />
          </div>
          <p className="text-2xl font-heading font-bold">{parseInt(aggregatedMetrics.totalRedemptions).toLocaleString()}</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground font-medium">{t('demo.gross_revenue') || 'Gross Revenue'}</p>
            <Euro className="w-4 h-4 text-orange-500" />
          </div>
          <p className="text-2xl font-heading font-bold">€{parseFloat(aggregatedMetrics.grossRevenue).toLocaleString("nl-NL")}</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground font-medium">{t('demo.avg_sale_label') || 'Avg. Sales per DutyCredit'}</p>
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-heading font-bold">€{parseFloat(aggregatedMetrics.avgSalesPerCredit).toLocaleString("nl-NL")}</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground font-medium">{entityType === "retailer" ? (t('demo.platform_fee') || 'Platform Fee (2.5%)') : (t('demo.commission_earned') || 'Commission Earned')}</p>
            <Store className="w-4 h-4 text-purple-500" />
          </div>
          <p className="text-2xl font-heading font-bold">€{parseFloat(aggregatedMetrics.platformFee).toLocaleString("nl-NL")}</p>
        </div>
      </div>

      {/* Secondary metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-card border border-border rounded-xl p-5 space-y-3">
          <p className="text-sm font-semibold">{entityType === "retailer" ? (t('common.total_redeemable') || 'Total Redeemable DutyCredits Available for your Airports') : (t('demo.dutycredits_issued') || 'Total DutyCredits Issued')}</p>
          <p className="text-3xl font-heading font-bold">{entityType === "retailer" ? (aggregatedMetrics.vouchersIssued * 450).toLocaleString() : aggregatedMetrics.vouchersIssued}</p>
          {entityType === "retailer" && <p className="text-xs text-muted-foreground">{t('common.across_all_retailers')}</p>}
        </div>

        <div className="bg-card border border-border rounded-xl p-5 space-y-3">
          <p className="text-sm font-semibold">{t('common.avg_discount') || 'Average Discount Applied'}</p>
          <p className="text-3xl font-heading font-bold">{parseFloat(aggregatedMetrics.avgDiscount).toLocaleString("nl-NL", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%</p>
          <p className="text-xs text-muted-foreground mt-2">{t('common.per_transaction') || 'Per transaction'}</p>
        </div>
      </div>

      {/* Revenue Breakdown */}
      <div className="bg-card border border-border rounded-xl p-6 space-y-4">
        <p className="font-semibold">{t('demo.revenue_breakdown') || 'Revenue Breakdown'}</p>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">{t('demo.gross_sales') || 'Gross Sales'}</span>
            <span className="font-semibold">€{parseFloat(aggregatedMetrics.grossRevenue).toLocaleString("nl-NL")}</span>
          </div>
          <div className="flex justify-between items-center text-rose-600">
            <span>{t('demo.traveler_savings_dc') || 'Traveler Savings (DutyCredit)'}</span>
            <span className="font-semibold">- €{parseFloat(aggregatedMetrics.totalSavings).toLocaleString("nl-NL")}</span>
          </div>
          <div className="flex justify-between items-center text-destructive">
            <span>{entityType === "retailer" ? (t('demo.platform_fee') || 'Platform Fee') : (t('demo.commission_earned') || 'Commission')}</span>
            <span className="font-semibold">- €{parseFloat(aggregatedMetrics.platformFee).toLocaleString("nl-NL")}</span>
          </div>
          <div className="border-t border-border pt-2 flex justify-between items-center">
            <span className="font-semibold">{t('demo.your_net_revenue') || 'Your Net Revenue'}</span>
            <span className="font-bold text-emerald-600">€{parseFloat(aggregatedMetrics.netRevenue).toLocaleString("nl-NL")}</span>
          </div>
        </div>
      </div>

      {/* Airport breakdown chart */}
      {airportBreakdown.length > 0 && (
        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <p className="font-semibold">{t('demo.redemptions_by_airport') || 'Redemptions by Airport'}</p>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={airportBreakdown} margin={{ top: 4, right: 16, bottom: 40, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="airport" tick={{ fontSize: 11 }} angle={-45} textAnchor="end" height={80} />
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
          <div className="overflow-x-auto">
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
                    <td className="py-2.5 px-3 font-semibold text-foreground">{ap.airport}</td>
                    <td className="py-2.5 px-3 text-right text-blue-500 font-semibold">{ap.redemptions}</td>
                    <td className="py-2.5 px-3 text-right font-semibold">€{ap.revenue.toLocaleString("nl-NL")}</td>
                    <td className="py-2.5 px-3 text-right text-muted-foreground">€{(ap.revenue / ap.redemptions).toLocaleString("nl-NL", { maximumFractionDigits: 0 })}</td>
                  </tr>
                ))}
                <tr className="border-t-2 border-border bg-muted/20 font-semibold">
                  <td className="py-2.5 px-3">{t('common.total_label') || 'TOTAL'}</td>
                  <td className="py-2.5 px-3 text-right">{aggregatedMetrics.totalRedemptions}</td>
                  <td className="py-2.5 px-3 text-right">€{parseFloat(aggregatedMetrics.grossRevenue).toLocaleString("nl-NL")}</td>
                  <td className="py-2.5 px-3 text-right">€{parseFloat(aggregatedMetrics.avgSalesPerCredit).toLocaleString("nl-NL")}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}