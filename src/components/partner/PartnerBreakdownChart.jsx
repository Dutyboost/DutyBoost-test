import { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

/** Groups the partner's transactions by store, airport or platform. */
export default function PartnerBreakdownChart({ transactions = [], groupBy, heading, accent = "#1F6FFF" }) {
  const data = useMemo(() => {
    const map = new Map();
    transactions.forEach((t) => {
      const raw = t[groupBy] || "—";
      const key = String(raw);
      const row = map.get(key) || { name: key, sales: 0, fee: 0 };
      row.sales += Number(t.transaction_value) || 0;
      row.fee += Number(t.platform_revenue) || 0;
      map.set(key, row);
    });
    return [...map.values()]
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 8)
      .map((d) => ({
        ...d,
        name: d.name.length > 18 ? `${d.name.slice(0, 17)}…` : d.name,
        sales: Math.round(d.sales),
        fee: Number(d.fee.toFixed(2)),
      }));
  }, [transactions, groupBy]);

  if (data.length === 0) return null;

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <h2 className="font-heading font-semibold mb-4">{heading}</h2>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data} margin={{ top: 4, right: 16, bottom: 4, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="name" tick={{ fontSize: 11 }} tickLine={false} interval={0} />
          <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }}
            formatter={(v, n) => [`€ ${Number(v).toLocaleString("nl-NL")}`, n]}
          />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Bar dataKey="sales" name="Sales (€)" fill={accent} radius={[4, 4, 0, 0]} />
          <Bar dataKey="fee" name="Platform fee (€)" fill="#FF7A00" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}