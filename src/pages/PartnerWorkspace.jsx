import { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { Loader2, ShieldOff, TicketPercent, ShoppingBag, TrendingUp, Store } from "lucide-react";
import { VERTICAL_BY_KEY } from "@/lib/partnerVerticals";
import PartnerKpiRow from "@/components/partner/PartnerKpiRow";
import PartnerActivityTable from "@/components/partner/PartnerActivityTable";
import TurnoverResult from "@/components/admin/turnover/TurnoverResult";
import { fmtEur, fmtNum } from "@/utils/formatNumber";

/**
 * The dashboard a partner sees. Which one opens is decided by the partner
 * account behind the login, not by the URL, so one partner can never open
 * another company's — or another sector's — figures.
 */
export default function PartnerWorkspace() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.functions
      .invoke("getPartnerDashboard", {})
      .then((res) => setData(res.data || {}))
      .catch(() => setData({ error: true }))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (data?.error) {
    return <p className="text-sm text-muted-foreground py-16 text-center">This dashboard could not be loaded.</p>;
  }

  if (!data?.account) {
    return (
      <div className="max-w-lg mx-auto py-16 text-center space-y-3">
        <ShieldOff className="w-8 h-8 mx-auto text-muted-foreground" />
        <h1 className="font-heading font-bold text-lg">No dashboard linked to this login</h1>
        <p className="text-sm text-muted-foreground">
          Your account has not been assigned a partner dashboard yet. Contact DutyBoost and we will link it to this
          email address.
        </p>
      </div>
    );
  }

  const { account } = data;
  const vertical = VERTICAL_BY_KEY[account.vertical];

  if (data.suspended) {
    return (
      <div className="max-w-lg mx-auto py-16 text-center space-y-3">
        <ShieldOff className="w-8 h-8 mx-auto text-muted-foreground" />
        <h1 className="font-heading font-bold text-lg">{account.company_name}</h1>
        <p className="text-sm text-muted-foreground">
          This dashboard is currently suspended. Contact DutyBoost to have it reopened.
        </p>
      </div>
    );
  }

  const avgBasket = data.redeemed > 0 ? data.bought / data.redeemed : 0;
  const penetration = data.flow > 0 ? (data.claims / data.flow) * 100 : null;

  const kpis = [
    { label: vertical?.side === "retail" ? "DutyCredit Redemptions" : "DutyCredits Activated", value: fmtNum(data.claims), icon: TicketPercent },
    { label: vertical?.side === "retail" ? "Purchases" : "Redeemed", value: fmtNum(data.redeemed), icon: ShoppingBag },
    { label: "Turnover", value: fmtEur(data.bought), icon: TrendingUp },
    { label: vertical?.side === "retail" ? "Stores" : "Departure points", value: fmtNum(data.units), icon: Store },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-5">
      <div>
        <span
          className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full text-white"
          style={{ backgroundColor: vertical?.accent || "#2563EB" }}
        >
          {vertical?.icon ? <vertical.icon className="w-3.5 h-3.5" /> : null}
          {vertical?.label || account.vertical}
        </span>
        <h1 className="font-heading font-bold text-2xl mt-3">{account.company_name}</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Your own DutyBoost performance, and nothing outside your account.
          {penetration === null ? "" : ` Penetration ${fmtNum(penetration, 3)}% of the flow on file.`}
        </p>
      </div>

      <PartnerKpiRow items={kpis} accent={vertical?.accent} />

      <TurnoverResult
        claims={data.claims}
        redeemedCount={data.redeemed}
        bought={data.bought}
        flow={data.flow}
        flowNote={data.flowNote}
      />

      <PartnerActivityTable heading={data.rowHeading} rows={data.rows} />

      <p className="text-xs text-muted-foreground">
        Average basket {fmtEur(avgBasket, 2)} · Flow term: {data.flowLabel}
      </p>
    </div>
  );
}