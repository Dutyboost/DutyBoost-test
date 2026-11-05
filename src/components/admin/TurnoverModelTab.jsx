import { useEffect, useMemo, useState } from "react";
import { base44 } from "@/api/base44Client";
import { Loader2 } from "lucide-react";
import { VERTICALS } from "@/components/admin/dutyCreditFields";
import { FLOW_UNITS } from "@/data/retailTurnoverModel";
import { GLOBAL_AIRPORTS } from "@/data/globalAirports";
import TurnoverResult from "@/components/admin/turnover/TurnoverResult";
import TurnoverPartnerResults from "@/components/admin/turnover/TurnoverPartnerResults";

// Annual passenger traffic per IATA code, from the airport directory.
const TRAFFIC = GLOBAL_AIRPORTS.reduce((map, airport) => {
  if (airport.annual_pax) map[airport.code.toUpperCase()] = airport.annual_pax;
  return map;
}, {});

const codeOf = (token) => (String(token.airport || "").match(/^([A-Za-z]{3})\b/)?.[1] || "").toUpperCase();

export default function TurnoverModelTab() {
  const [tokens, setTokens] = useState(null);
  const [vertical, setVertical] = useState("all");

  useEffect(() => {
    base44.entities.DutyCreditToken
      .list("-created_date", 500)
      .then((list) => setTokens(list || []))
      .catch(() => setTokens([]));
  }, []);

  const scoped = useMemo(
    () => (tokens || []).filter((token) => vertical === "all" || token.travel_type === vertical),
    [tokens, vertical]
  );

  const measured = useMemo(() => {
    const redeemed = scoped.filter((token) => token.status === "redeemed");
    const bought = redeemed.reduce((sum, token) => sum + Number(token.basket_value || 0), 0);
    return { redeemedCount: redeemed.length, bought };
  }, [scoped]);

  // Flow can only be read from the airport directory, and only for air travel.
  const flow = useMemo(() => {
    if (vertical !== "all" && vertical !== "flight") return 0;
    const codes = new Set(scoped.map(codeOf).filter((code) => TRAFFIC[code]));
    return [...codes].reduce((sum, code) => sum + TRAFFIC[code], 0);
  }, [scoped, vertical]);

  const flowNote =
    vertical === "all" || vertical === "flight"
      ? flow > 0
        ? `Flow is the annual traffic of the ${FLOW_UNITS.flight.toLowerCase()} airports in scope, from the airport directory.`
        : "Flow appears once the covered airports are recorded."
      : `Flow for ${(FLOW_UNITS[vertical] || "").toLowerCase()} has to come from the partner's own figures, so penetration stays open.`;

  if (!tokens) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-heading font-bold">Retail turnover model</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Philip's chain, computed on live DutyCredit data and shown as a result. Every term is read from a record or a
          directory, nothing is typed in here.
        </p>
        <p className="text-xs text-muted-foreground mt-2 font-mono">
          Turnover = Flow × Penetration × Conversion × Multiple sale × Average price
        </p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {VERTICALS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setVertical(id)}
            className={`flex items-center gap-1.5 whitespace-nowrap text-xs px-3 py-2 rounded-full border transition-all ${
              vertical === id ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:border-primary/50"
            }`}
          >
            <Icon className="w-3.5 h-3.5" /> {label}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        <TurnoverResult
          claims={scoped.length}
          redeemedCount={measured.redeemedCount}
          bought={measured.bought}
          flow={flow}
          flowNote={flowNote}
        />
        <TurnoverPartnerResults tokens={scoped} />
      </div>
    </div>
  );
}