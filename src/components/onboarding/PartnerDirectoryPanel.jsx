import { useEffect, useMemo, useState } from "react";
import { base44 } from "@/api/base44Client";
import { PARTNER_TYPE_LIST } from "./partnerTypes";
import { scopeKeyForType } from "@/lib/partnerDashboards";
import { buildPartnerMetrics, resolvePartnerScope } from "@/lib/partnerScope";
import AggregationView from "@/components/AggregationView";
import PartnerKpis from "@/components/partner/PartnerKpis";
import PartnerPeriodPicker from "@/components/partner/PartnerPeriodPicker";
import SearchCombobox from "./SearchCombobox";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Landmark, Loader2, ScanLine, Search, Store, TrendingUp } from "lucide-react";

const ALL = "__all__";
const day = (v) => (v || "").slice(0, 10);
const inPeriod = (v, start, end) => {
  const d = day(v);
  return d >= start && d <= end;
};
const fmtMoney = (v) =>
  `€ ${Number(v || 0).toLocaleString("nl-NL", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

/**
 * Team-only partner directory: pick a partner type, then a single partner or the
 * whole type, and see the aggregated numbers, a period breakdown and a
 * like-for-like comparison across every partner of that type.
 */
export default function PartnerDirectoryPanel() {
  const [type, setType] = useState(PARTNER_TYPE_LIST[0].value);
  const [selected, setSelected] = useState(ALL);
  const [comboValue, setComboValue] = useState("All partners");
  const [query, setQuery] = useState("");
  const [partners, setPartners] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [vouchers, setVouchers] = useState([]);
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState("monthly");
  const [customStart, setCustomStart] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() - 30);
    return d.toISOString().split("T")[0];
  });
  const [customEnd, setCustomEnd] = useState(() => new Date().toISOString().split("T")[0]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [p, t, v, s] = await Promise.all([
          base44.entities.ParticipatingPartner.list("-created_date", 2000),
          base44.entities.Transaction.list("-created_date", 500),
          base44.entities.Voucher.list("-created_date", 500),
          base44.entities.ParticipatingStore.list("-created_date", 2000),
        ]);
        setPartners(p || []);
        setTransactions(t || []);
        setVouchers(v || []);
        setStores(s || []);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const { startDate, endDate } = useMemo(() => {
    const now = new Date();
    if (period === "daily") {
      const s = new Date(now);
      s.setDate(s.getDate() - 7);
      return { startDate: s.toISOString().split("T")[0], endDate: now.toISOString().split("T")[0] };
    }
    if (period === "monthly") {
      const s = new Date(now);
      s.setDate(s.getDate() - 30);
      return { startDate: s.toISOString().split("T")[0], endDate: now.toISOString().split("T")[0] };
    }
    return { startDate: customStart, endDate: customEnd };
  }, [period, customStart, customEnd]);

  const periodTransactions = useMemo(
    () => transactions.filter((t) => inPeriod(t.date || t.created_date, startDate, endDate)),
    [transactions, startDate, endDate]
  );
  const periodVouchers = useMemo(
    () => vouchers.filter((v) => inPeriod(v.created_date, startDate, endDate)),
    [vouchers, startDate, endDate]
  );

  const scopeKey = scopeKeyForType(type);

  const typePartners = useMemo(() => partners.filter((p) => p.partner_type === type), [partners, type]);

  const companies = useMemo(
    () => [...new Set(typePartners.map((p) => p.company_name).filter(Boolean))].sort((a, b) => a.localeCompare(b)),
    [typePartners]
  );

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return companies
      .filter((c) => !q || c.toLowerCase().includes(q))
      .map((company) => {
        const units = typePartners.filter((p) => p.company_name === company);
        const scope = resolvePartnerScope(scopeKey, {
          user: { email: units[0]?.contact_email },
          units,
          transactions: periodTransactions,
          vouchers: periodVouchers,
          stores,
        });
        const metrics = buildPartnerMetrics({
          transactions: scope.transactions,
          vouchers: scope.vouchers,
          stores: scope.stores,
          units,
        });
        return { company, units, scope, metrics };
      })
      .sort((a, b) => b.metrics.grossVolume - a.metrics.grossVolume);
  }, [companies, typePartners, scopeKey, periodTransactions, periodVouchers, stores, query]);

  const typeTotals = useMemo(() => {
    const grossVolume = rows.reduce((s, r) => s + r.metrics.grossVolume, 0);
    return {
      grossVolume,
      redemptions: rows.reduce((s, r) => s + r.metrics.redemptions, 0),
      platformFee: rows.reduce((s, r) => s + r.metrics.platformFee, 0),
      units: rows.reduce((s, r) => s + r.units.length, 0),
      live: rows.reduce((s, r) => s + r.metrics.unitsLive, 0),
    };
  }, [rows]);

  const selection = useMemo(() => {
    if (selected === ALL) {
      return {
        company: `${companies.length} ${type}${companies.length !== 1 ? "s" : ""}`,
        units: typePartners,
        transactions: rows.flatMap((r) => r.scope.transactions),
        vouchers: rows.flatMap((r) => r.scope.vouchers),
        stores: rows.flatMap((r) => r.scope.stores),
        metrics: buildPartnerMetrics({
          transactions: rows.flatMap((r) => r.scope.transactions),
          vouchers: rows.flatMap((r) => r.scope.vouchers),
          stores: rows.flatMap((r) => r.scope.stores),
          units: typePartners,
        }),
      };
    }
    const row = rows.find((r) => r.company === selected);
    if (!row) return null;
    return {
      company: row.company,
      units: row.units,
      transactions: row.scope.transactions,
      vouchers: row.scope.vouchers,
      stores: row.scope.stores,
      metrics: row.metrics,
    };
  }, [selected, rows, typePartners, companies.length, type]);

  const kpis = [
    { label: "Redemptions", metric: "redemptions", icon: ScanLine },
    { label: "Gross Retail Sales", metric: "grossVolume", money: true, icon: TrendingUp },
    { label: "Platform Revenue", metric: "platformFee", money: true, icon: Landmark },
    { label: "Live Units", metric: "unitsLive", icon: Store },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm text-muted-foreground font-medium">Partner type:</span>
        {PARTNER_TYPE_LIST.map((cfg) => (
          <button
            key={cfg.value}
            onClick={() => {
              setType(cfg.value);
              setSelected(ALL);
              setComboValue("All partners");
            }}
            className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
              type === cfg.value
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card border-border hover:border-primary/50"
            }`}
          >
            {cfg.value}
          </button>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center gap-3">
        <div className="w-full lg:w-80">
          <SearchCombobox
            value={comboValue}
            onChange={setComboValue}
            onPick={(o) => {
              setSelected(o.key);
              setComboValue(o.label);
            }}
            options={[{ key: ALL, label: "All partners" }, ...companies.map((c) => ({ key: c, label: c }))]}
            placeholder="Select a specific partner…"
            emptyText="No partner matches"
          />
        </div>
        <div className="relative w-full lg:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter partners…"
            className="pl-9"
          />
        </div>
        <PartnerPeriodPicker
          period={period}
          onChange={setPeriod}
          customStart={customStart}
          customEnd={customEnd}
          onCustomStartChange={setCustomStart}
          onCustomEndChange={setCustomEnd}
        />
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-sm text-muted-foreground py-6">
          <Loader2 className="w-4 h-4 animate-spin" /> Loading partners…
        </div>
      ) : (
        <>
          <div>
            <h2 className="font-heading font-semibold text-lg">
              {selected === ALL ? `All ${type} accounts` : selected}
            </h2>
            <p className="text-sm text-muted-foreground">
              {typeTotals.units} units on file · {typeTotals.live} live · {fmtMoney(typeTotals.grossVolume)} gross
              retail sales across {companies.length} partner{companies.length !== 1 ? "s" : ""}
            </p>
          </div>

          {selection && <PartnerKpis kpis={kpis} metrics={selection.metrics} />}

          {selection && (
            <AggregationView
              transactions={selection.transactions}
              vouchers={selection.vouchers}
              period={period === "daily" ? "day" : period === "monthly" ? "month" : "custom"}
              customStart={customStart}
              customEnd={customEnd}
              entityType="admin"
            />
          )}

          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="px-5 py-4 border-b border-border">
              <h2 className="font-heading font-semibold">Partner comparison</h2>
              <p className="text-sm text-muted-foreground mt-0.5">
                Like-for-like benchmarks across every {type} in the selected period. Click a partner to scope the
                numbers above.
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-5 py-3 text-left font-medium text-muted-foreground">Partner</th>
                    <th className="px-5 py-3 text-right font-medium text-muted-foreground">Units</th>
                    <th className="px-5 py-3 text-right font-medium text-muted-foreground">Redemptions</th>
                    <th className="px-5 py-3 text-right font-medium text-muted-foreground">Gross sales</th>
                    <th className="px-5 py-3 text-right font-medium text-muted-foreground">Avg basket</th>
                    <th className="px-5 py-3 text-right font-medium text-muted-foreground">Platform revenue</th>
                    <th className="px-5 py-3 text-right font-medium text-muted-foreground">Share</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {rows.map(({ company, units, metrics }) => {
                    const share = typeTotals.grossVolume ? (metrics.grossVolume / typeTotals.grossVolume) * 100 : 0;
                    const active = selected === company;
                    return (
                      <tr
                        key={company}
                        onClick={() => setSelected(active ? ALL : company)}
                        className={`cursor-pointer transition-colors ${
                          active ? "bg-primary/5" : "hover:bg-muted/30"
                        }`}
                      >
                        <td className="px-5 py-3">
                          <div className="font-medium flex items-center gap-2">
                            {company}
                            {active && <Badge variant="default">selected</Badge>}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {metrics.unitsLive}/{units.length} units live ·{" "}
                            {units[0]?.country || "—"}
                          </div>
                        </td>
                        <td className="px-5 py-3 text-right">{units.length}</td>
                        <td className="px-5 py-3 text-right">{metrics.redemptions}</td>
                        <td className="px-5 py-3 text-right font-medium">{fmtMoney(metrics.grossVolume)}</td>
                        <td className="px-5 py-3 text-right text-muted-foreground">{fmtMoney(metrics.avgBasket)}</td>
                        <td className="px-5 py-3 text-right">{fmtMoney(metrics.platformFee)}</td>
                        <td className="px-5 py-3 text-right text-muted-foreground">{share.toFixed(1)}%</td>
                      </tr>
                    );
                  })}
                  {rows.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-5 py-10 text-center text-muted-foreground">
                        No {type} accounts on file yet — add one under Partner Onboarding.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}