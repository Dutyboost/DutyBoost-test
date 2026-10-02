import { useEffect, useMemo, useState } from "react";
import { base44 } from "@/api/base44Client";
import { PARTNER_DASHBOARDS } from "@/lib/partnerDashboards";
import { buildPartnerMetrics, resolvePartnerScope } from "@/lib/partnerScope";
import ProfileTab from "@/components/ProfileTab";
import PartnerIncentiveReceipts from "@/components/partner/PartnerIncentiveReceipts";
import AggregationView from "@/components/AggregationView";
import PartnerKpis from "@/components/partner/PartnerKpis";
import PartnerBreakdownChart from "@/components/partner/PartnerBreakdownChart";
import PartnerUnitsCard from "@/components/partner/PartnerUnitsCard";
import PartnerBenchmarks from "@/components/partner/PartnerBenchmarks";
import PartnerPeriodPicker from "@/components/partner/PartnerPeriodPicker";
import DemoAgencyDashboard from "./DemoAgencyDashboard";
import { demoPartnerUnits, demoPartnerTransactions, demoPartnerVouchers } from "@/data/demoPartnerDashboardData";
import { LayoutDashboard, BarChart2, Scale, Store, UserCircle, Loader2, Info } from "lucide-react";

const day = (v) => (v || "").slice(0, 10);
const inPeriod = (v, start, end) => {
  const d = day(v);
  return d >= start && d <= end;
};

/**
 * Standalone dashboard for one partner type (POS, airport, corporate, wholesale).
 * The shell is shared; the config decides wording, metrics and how activity is
 * linked back to the partner.
 */
export default function PartnerDashboard({ type = "pos" }) {
  const config = PARTNER_DASHBOARDS[type] || PARTNER_DASHBOARDS.pos;
  const [user, setUser] = useState(null);
  const [partners, setPartners] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [vouchers, setVouchers] = useState([]);
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  // Set when the dashboard is opened through a shared public link (no login)
  const [publicView, setPublicView] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
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
        const u = await base44.auth.me().catch(() => null);
        setUser(u);
        if (!u) {
          // Public demo link: show representative activity, never live records
          setPublicView(true);
          setPartners(demoPartnerUnits(type));
          setTransactions(demoPartnerTransactions());
          setVouchers(demoPartnerVouchers());
          return;
        }
        const [p, t, v, s] = await Promise.all([
          base44.entities.ParticipatingPartner.filter({ partner_type: config.partnerType }, "-created_date", 2000),
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
  }, [config.partnerType, type]);

  const myUnits = useMemo(
    () =>
      publicView
        ? partners
        : partners.filter((p) => p.contact_email && user?.email && p.contact_email.toLowerCase() === user.email.toLowerCase()),
    [partners, user, publicView]
  );

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

  const scope = useMemo(
    () => resolvePartnerScope(type, { user, units: myUnits, transactions, vouchers, stores }),
    [type, user, myUnits, transactions, vouchers, stores]
  );

  const scopedTransactions = useMemo(
    () => scope.transactions.filter((t) => inPeriod(t.date || t.created_date, startDate, endDate)),
    [scope.transactions, startDate, endDate]
  );
  const scopedVouchers = useMemo(
    () => scope.vouchers.filter((v) => inPeriod(v.created_date, startDate, endDate)),
    [scope.vouchers, startDate, endDate]
  );
  const networkTransactions = useMemo(
    () => transactions.filter((t) => inPeriod(t.date || t.created_date, startDate, endDate)),
    [transactions, startDate, endDate]
  );

  const metrics = useMemo(
    () =>
      buildPartnerMetrics({
        transactions: scopedTransactions,
        vouchers: scopedVouchers,
        stores: scope.stores,
        units: myUnits,
        commissionField: config.commissionField,
      }),
    [scopedTransactions, scopedVouchers, scope.stores, myUnits, config.commissionField]
  );

  const networkMetrics = useMemo(
    () => buildPartnerMetrics({ transactions: networkTransactions }),
    [networkTransactions]
  );

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "aggregation", label: "Aggregations", icon: BarChart2 },
    { id: "benchmarks", label: "Benchmarks", icon: Scale },
    { id: "units", label: config.unitHeading, icon: Store },
    ...(publicView ? [] : [{ id: "profile", label: "Profile", icon: UserCircle }]),
  ];

  // Public demo link for travel partners — their own dashboard, on its own
  if (publicView && type === "travel") return <DemoAgencyDashboard />;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className={publicView ? "max-w-7xl mx-auto p-6 md:p-8 space-y-6" : "space-y-6"}>
      <div className="flex gap-1 border-b border-border overflow-x-auto">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 whitespace-nowrap transition-all ${
              activeTab === id
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon className="w-4 h-4" /> {label}
          </button>
        ))}
      </div>

      {myUnits.length === 0 && (
        <div className="flex items-start gap-3 bg-primary/5 border border-primary/20 rounded-xl p-4 text-sm">
          <Info className="w-4 h-4 text-primary mt-0.5 shrink-0" />
          <p className="text-muted-foreground">
            No {config.label} record is linked to your account yet. Your DutyBoost partner manager links your
            company when the agreement is signed — the figures below cover the whole network until then.
          </p>
        </div>
      )}

      {activeTab === "profile" ? (
        user ? (
          <ProfileTab
            user={user}
            onUserUpdate={setUser}
            showBankDetails
            bankTitle="Bank Details for Incentive Payments"
            bankBlurb="Your monthly share of the platform fee is transferred here."
            bankKeys={{ name: "partner_bank_account_name", iban: "partner_bank_iban" }}
            invoiceHeading="Monthly Incentive Receipts"
            invoiceComponent={
              <PartnerIncentiveReceipts
                transactions={scope.transactions}
                commissionField={config.commissionField}
                partnerLabel={config.label}
                bankIban={user?.partner_bank_iban}
                user={user}
              />
            }
          />
        ) : null
      ) : activeTab === "units" ? (
        <PartnerUnitsCard units={myUnits} heading={config.unitHeading} blurb={config.unitBlurb} />
      ) : activeTab === "aggregation" ? (
        <div className="space-y-4">
          <PartnerPeriodPicker
            period={period}
            onChange={setPeriod}
            customStart={customStart}
            customEnd={customEnd}
            onCustomStartChange={setCustomStart}
            onCustomEndChange={setCustomEnd}
          />
          <AggregationView
            transactions={scopedTransactions}
            vouchers={scopedVouchers}
            period={period === "daily" ? "day" : period === "monthly" ? "month" : "custom"}
            customStart={customStart}
            customEnd={customEnd}
            entityType="partner"
          />
        </div>
      ) : activeTab === "benchmarks" ? (
        <div className="space-y-4">
          <PartnerPeriodPicker
            period={period}
            onChange={setPeriod}
            customStart={customStart}
            customEnd={customEnd}
            onCustomStartChange={setCustomStart}
            onCustomEndChange={setCustomEnd}
          />
          <PartnerBenchmarks metrics={metrics} network={networkMetrics} partnerLabel="Your network" />
        </div>
      ) : (
        <>
          <PartnerPeriodPicker
            period={period}
            onChange={setPeriod}
            customStart={customStart}
            customEnd={customEnd}
            onCustomStartChange={setCustomStart}
            onCustomEndChange={setCustomEnd}
          />

          <div>
            <h1 className="text-2xl font-heading font-bold tracking-tight">{config.title}</h1>
            <p className="text-muted-foreground mt-1 max-w-3xl">{config.blurb}</p>
            {scope.company ? (
              <span className="inline-block mt-2 text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">
                {scope.company}
              </span>
            ) : null}
          </div>

          <PartnerKpis kpis={config.kpis} metrics={metrics} />

          <PartnerBreakdownChart
            transactions={scopedTransactions}
            groupBy={config.groupBy}
            heading={config.groupHeading}
            accent={config.accent}
          />

          <PartnerUnitsCard units={myUnits} heading={config.unitHeading} blurb={config.unitBlurb} />

          <PartnerBenchmarks metrics={metrics} network={networkMetrics} partnerLabel="Your network" />
        </>
      )}
    </div>
  );
}