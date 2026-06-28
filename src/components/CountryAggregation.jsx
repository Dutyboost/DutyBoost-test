import { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Globe, TrendingUp, Euro, ScanLine, Store } from "lucide-react";
import { useTranslation } from "react-i18next";
import { fmtNum, fmtEur } from "../utils/formatNumber";

// Tiered DutyCredit saving per transaction — mirrors dashboard model
function calcSaving(spend) {
  if (spend < 35)  return 0;
  if (spend >= 300) return 60.00;
  if (spend >= 250) return 45.00;
  if (spend >= 200) return 30.00;
  if (spend >= 150) return 20.00;
  if (spend >= 100) return 10.00;
  if (spend >= 70)  return 5.00;
  return 2.50;
}

const PLATFORM_FEE_PCT = 0.025;
const PLATFORM_FEE_CAP = 25;

export default function CountryAggregation({ AIRPORTS, RETAILERS, periodMultiplier, selectedCountry, onSelectCountry }) {
  const { t } = useTranslation();

  const countryData = useMemo(() => {
    // Build airport→country map
    const airportCountry = {};
    AIRPORTS.forEach(a => { airportCountry[a.code] = a.country; });

    // Group retailers by country
    const groups = {};
    RETAILERS.forEach(r => {
      const country = airportCountry[r.airport] || "Unknown";
      if (!groups[country]) {
        groups[country] = { country, retailers: [], redemptions: 0, revenue: 0, stores: 0, airports: new Set() };
      }
      groups[country].retailers.push(r);
      groups[country].redemptions += r.redemptions;
      groups[country].revenue += r.revenue;
      groups[country].stores += 1;
      groups[country].airports.add(r.airport);
    });

    // Compute per-country metrics
    return Object.values(groups).map(g => {
      const scaledRedemptions = Math.round(g.redemptions * periodMultiplier);
      const scaledRevenue = Math.round(g.revenue * periodMultiplier);
      const avgBasket = scaledRedemptions > 0 ? scaledRevenue / scaledRedemptions : 0;
      const saving = calcSaving(avgBasket);
      const commission = Math.min(Math.round(avgBasket * PLATFORM_FEE_PCT * 100) / 100, PLATFORM_FEE_CAP);
      const netPerTx = Math.round((avgBasket - saving - commission) * 100) / 100;
      const grossRevenue = scaledRedemptions * avgBasket;
      const totalSavings = Math.round(scaledRedemptions * saving * 100) / 100;
      const totalFee = Math.round(scaledRedemptions * commission * 100) / 100;
      const netRevenue = Math.round((grossRevenue - totalSavings - totalFee) * 100) / 100;

      return {
        country: g.country,
        stores: g.stores,
        airportCount: g.airports.size,
        redemptions: scaledRedemptions,
        grossRevenue,
        netRevenue,
        totalFee,
        avgBasket: Math.round(avgBasket * 100) / 100,
      };
    }).sort((a, b) => b.netRevenue - a.netRevenue);
  }, [AIRPORTS, RETAILERS, periodMultiplier]);

  const totals = useMemo(() => ({
    stores: countryData.reduce((s, c) => s + c.stores, 0),
    redemptions: countryData.reduce((s, c) => s + c.redemptions, 0),
    grossRevenue: countryData.reduce((s, c) => s + c.grossRevenue, 0),
    netRevenue: countryData.reduce((s, c) => s + c.netRevenue, 0),
    totalFee: countryData.reduce((s, c) => s + c.totalFee, 0),
  }), [countryData]);

  const chartData = countryData.slice(0, 12);

  return (
    <div className="bg-card border border-border rounded-xl p-6 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Globe className="w-5 h-5 text-blue-500" />
          <div>
            <p className="font-semibold">{t('demo.country_aggregation_title')}</p>
            <p className="text-xs text-muted-foreground">{t('demo.country_aggregation_desc')}</p>
          </div>
        </div>
        <span className="text-xs text-muted-foreground font-medium px-3 py-1.5 bg-muted rounded-lg">
          {countryData.length} {t('demo.countries')} · {totals.stores} {t('demo.stores')}
        </span>
      </div>

      {/* Summary KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-muted/40 rounded-lg p-3 text-center">
          <ScanLine className="w-4 h-4 text-blue-500 mx-auto mb-1" />
          <p className="text-xs text-muted-foreground mb-0.5">{t('demo.total_redemptions')}</p>
          <p className="text-sm font-heading font-bold">{fmtNum(totals.redemptions)}</p>
        </div>
        <div className="bg-muted/40 rounded-lg p-3 text-center">
          <Euro className="w-4 h-4 text-orange-500 mx-auto mb-1" />
          <p className="text-xs text-muted-foreground mb-0.5">{t('demo.gross_revenue')}</p>
          <p className="text-sm font-heading font-bold">{fmtEur(totals.grossRevenue)}</p>
        </div>
        <div className="bg-muted/40 rounded-lg p-3 text-center">
          <Store className="w-4 h-4 text-purple-500 mx-auto mb-1" />
          <p className="text-xs text-muted-foreground mb-0.5">{t('demo.platform_fee')}</p>
          <p className="text-sm font-heading font-bold">{fmtEur(totals.totalFee)}</p>
        </div>
        <div className="bg-emerald-50 rounded-lg p-3 text-center">
          <TrendingUp className="w-4 h-4 text-emerald-500 mx-auto mb-1" />
          <p className="text-xs text-muted-foreground mb-0.5">{t('demo.net_revenue')}</p>
          <p className="text-sm font-heading font-bold text-emerald-600">{fmtEur(totals.netRevenue)}</p>
        </div>
      </div>

      {/* Bar chart */}
      <div>
        <p className="text-sm font-medium mb-3">{t('demo.net_revenue_by_country')}</p>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={chartData} margin={{ top: 4, right: 16, bottom: 60, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="country" tick={{ fontSize: 10 }} angle={-45} textAnchor="end" height={70} interval={0} />
            <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
            <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} formatter={(v) => [fmtEur(v), t('demo.net_revenue')]} />
            <Bar dataKey="netRevenue" fill="#2563eb" radius={[4, 4, 0, 0]} name={t('demo.net_revenue')} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Detailed table */}
      <div className="overflow-x-auto max-h-80 overflow-y-auto">
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-card">
            <tr className="border-b border-border">
              <th className="text-left py-2 px-3 text-xs text-muted-foreground font-medium">{t('demo.col_country') || 'Country'}</th>
              <th className="text-right py-2 px-3 text-xs text-muted-foreground font-medium">{t('demo.stores')}</th>
              <th className="text-right py-2 px-3 text-xs text-muted-foreground font-medium">{t('demo.airports')}</th>
              <th className="text-right py-2 px-3 text-xs text-muted-foreground font-medium">{t('demo.total_redemptions')}</th>
              <th className="text-right py-2 px-3 text-xs text-muted-foreground font-medium">{t('demo.gross_revenue')}</th>
              <th className="text-right py-2 px-3 text-xs text-muted-foreground font-medium">{t('demo.platform_fee')}</th>
              <th className="text-right py-2 px-3 text-xs text-muted-foreground font-medium">{t('demo.net_revenue')}</th>
              <th className="text-right py-2 px-3 text-xs text-muted-foreground font-medium">{t('demo.avg_sale_label')}</th>
            </tr>
          </thead>
          <tbody>
            {countryData.map(c => (
              <tr
                key={c.country}
                onClick={() => onSelectCountry?.(c.country)}
                className={`border-b border-border last:border-0 cursor-pointer transition-colors ${selectedCountry === c.country ? "bg-primary/10" : "hover:bg-muted/30"}`}
              >
                <td className="py-2.5 px-3 font-semibold text-foreground">{c.country}</td>
                <td className="py-2.5 px-3 text-right text-muted-foreground">{c.stores}</td>
                <td className="py-2.5 px-3 text-right text-muted-foreground">{c.airportCount}</td>
                <td className="py-2.5 px-3 text-right text-blue-500 font-semibold">{fmtNum(c.redemptions)}</td>
                <td className="py-2.5 px-3 text-right font-semibold">{fmtEur(c.grossRevenue)}</td>
                <td className="py-2.5 px-3 text-right text-orange-600">{fmtEur(c.totalFee)}</td>
                <td className="py-2.5 px-3 text-right font-bold text-emerald-600">{fmtEur(c.netRevenue)}</td>
                <td className="py-2.5 px-3 text-right text-muted-foreground">{fmtEur(c.avgBasket)}</td>
              </tr>
            ))}
            <tr className="border-t-2 border-border bg-muted/20 font-semibold">
              <td className="py-2.5 px-3">{t('common.total_label') || 'TOTAL'}</td>
              <td className="py-2.5 px-3 text-right">{totals.stores}</td>
              <td className="py-2.5 px-3 text-right"></td>
              <td className="py-2.5 px-3 text-right">{fmtNum(totals.redemptions)}</td>
              <td className="py-2.5 px-3 text-right">{fmtEur(totals.grossRevenue)}</td>
              <td className="py-2.5 px-3 text-right">{fmtEur(totals.totalFee)}</td>
              <td className="py-2.5 px-3 text-right text-emerald-600">{fmtEur(totals.netRevenue)}</td>
              <td className="py-2.5 px-3 text-right"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}