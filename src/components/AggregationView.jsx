import { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { TrendingUp, Euro, Store, ScanLine } from "lucide-react";

export default function AggregationView({ transactions, vouchers, period, entityType = "retailer", onPeriodChange }) {
  const aggregatedMetrics = useMemo(() => {
    // Calculate period factor
    let periodFactor = 1;
    if (period === "daily") periodFactor = 1 / 30;
    else if (period === "yearly") periodFactor = 12;

    // Total redemptions (count of transactions)
    const totalRedemptions = Math.round(transactions.length * periodFactor);

    // Gross revenue (sum of transaction values)
    const grossRevenue = transactions.reduce((sum, t) => sum + (t.transaction_value || 0), 0) * periodFactor;

    // Platform fee (2.5% for retailers, but varies for agencies — use agency_commission if present)
    const platformFee = entityType === "retailer"
      ? grossRevenue * 0.025
      : transactions.reduce((sum, t) => sum + (t.platform_revenue || 0), 0) * periodFactor;

    // Average sales per DutyCredit
    const avgSalesPerCredit = totalRedemptions > 0 ? (grossRevenue / totalRedemptions) : 0;

    // Average discount applied (for retailers, shows effective discount %; for agencies, shows discount amount)
    const avgDiscount = transactions.length > 0
      ? (transactions.reduce((sum, t) => sum + (t.discount_applied || t.discount_amount || 0), 0) / transactions.length)
      : 0;

    return {
      totalRedemptions,
      grossRevenue: grossRevenue.toFixed(2),
      platformFee: platformFee.toFixed(2),
      avgSalesPerCredit: avgSalesPerCredit.toFixed(2),
      avgDiscount: avgDiscount.toFixed(1),
      vouchersIssued: vouchers.length,
    };
  }, [transactions, vouchers, period, entityType]);

  // Distribution by airport (if available)
  const airportBreakdown = useMemo(() => {
    const breakdown = {};
    transactions.forEach(t => {
      const airport = t.airport || "Unknown";
      if (!breakdown[airport]) {
        breakdown[airport] = { airport, redemptions: 0, revenue: 0 };
      }
      breakdown[airport].redemptions += 1;
      breakdown[airport].revenue += t.transaction_value || 0;
    });
    return Object.values(breakdown).sort((a, b) => b.revenue - a.revenue);
  }, [transactions]);

  const COLORS = ["#2563eb", "#f97316", "#10b981", "#8b5cf6", "#ec4899", "#06b6d4"];

  return (
    <div className="space-y-6">
      {/* Aggregation metrics header */}
      <div>
        <h2 className="text-xl font-heading font-bold mb-4">Custom Aggregation — All Stores</h2>
        <p className="text-muted-foreground text-sm mb-4">Combined metrics across all your {entityType === "retailer" ? "retail locations" : "bookings"}.</p>
      </div>

      {/* Period selector */}
      {onPeriodChange && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-muted-foreground font-medium">Period:</span>
          {[{v:"daily",l:"Daily"},{v:"monthly",l:"Monthly"},{v:"yearly",l:"Yearly"}].map(({v,l}) => (
            <button key={v} onClick={() => onPeriodChange(v)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                period === v ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:border-primary/50"
              }`}>{l}
            </button>
          ))}
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground font-medium">Total Redemptions</p>
            <ScanLine className="w-4 h-4 text-blue-500" />
          </div>
          <p className="text-2xl font-heading font-bold">{parseInt(aggregatedMetrics.totalRedemptions).toLocaleString()}</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground font-medium">Gross Revenue</p>
            <Euro className="w-4 h-4 text-orange-500" />
          </div>
          <p className="text-2xl font-heading font-bold">€{parseFloat(aggregatedMetrics.grossRevenue).toLocaleString("nl-NL")}</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground font-medium">Avg. Sales per DutyCredit</p>
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-heading font-bold">€{parseFloat(aggregatedMetrics.avgSalesPerCredit).toLocaleString("nl-NL")}</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground font-medium">{entityType === "retailer" ? "Platform Fee (2.5%)" : "Commission Earned"}</p>
            <Store className="w-4 h-4 text-purple-500" />
          </div>
          <p className="text-2xl font-heading font-bold">€{parseFloat(aggregatedMetrics.platformFee).toLocaleString("nl-NL")}</p>
        </div>
      </div>

      {/* Secondary metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-card border border-border rounded-xl p-5 space-y-3">
          <p className="text-sm font-semibold">{entityType === "retailer" ? "Total Active DutyCredits" : "Total DutyCredits Issued"}</p>
          <p className="text-3xl font-heading font-bold">{aggregatedMetrics.vouchersIssued}</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-5 space-y-3">
          <p className="text-sm font-semibold">Average Discount Applied</p>
          <p className="text-3xl font-heading font-bold">{aggregatedMetrics.avgDiscount}%</p>
          <p className="text-xs text-muted-foreground mt-2">Per transaction</p>
        </div>
      </div>

      {/* Airport breakdown chart */}
      {airportBreakdown.length > 0 && (
        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <p className="font-semibold">Redemptions by Airport</p>
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
          <p className="font-semibold">Airport Performance Summary</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-3 text-xs text-muted-foreground font-medium">Airport</th>
                  <th className="text-right py-2 px-3 text-xs text-muted-foreground font-medium">Redemptions</th>
                  <th className="text-right py-2 px-3 text-xs text-muted-foreground font-medium">Gross Revenue</th>
                  <th className="text-right py-2 px-3 text-xs text-muted-foreground font-medium">Avg per Sale</th>
                </tr>
              </thead>
              <tbody>
                {airportBreakdown.map((ap, i) => (
                  <tr key={ap.airport} className="border-b border-border last:border-0 hover:bg-muted/30">
                    <td className="py-2.5 px-3 font-semibold text-foreground">{ap.airport}</td>
                    <td className="py-2.5 px-3 text-right text-blue-500 font-semibold">{ap.redemptions}</td>
                    <td className="py-2.5 px-3 text-right font-semibold">€{ap.revenue.toLocaleString("nl-NL")}</td>
                    <td className="py-2.5 px-3 text-right text-muted-foreground">€{(ap.revenue / ap.redemptions).toFixed(0)}</td>
                  </tr>
                ))}
                <tr className="border-t-2 border-border bg-muted/20 font-semibold">
                  <td className="py-2.5 px-3">TOTAL</td>
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