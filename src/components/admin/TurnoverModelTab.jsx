import { useEffect, useMemo, useState } from "react";
import { base44 } from "@/api/base44Client";
import { Loader2 } from "lucide-react";
import { VERTICALS } from "@/components/admin/dutyCreditFields";
import { DEFAULT_BENCHMARKS } from "@/data/retailTurnoverModel";
import TurnoverAttributed from "@/components/admin/turnover/TurnoverAttributed";
import TurnoverPartnerModel from "@/components/admin/turnover/TurnoverPartnerModel";
import TurnoverSensitivity from "@/components/admin/turnover/TurnoverSensitivity";

const termsFor = (vertical) => ({ ...(DEFAULT_BENCHMARKS[vertical] || DEFAULT_BENCHMARKS.all) });

export default function TurnoverModelTab() {
  const [tokens, setTokens] = useState(null);
  const [vertical, setVertical] = useState("all");
  const [partnerTerms, setPartnerTerms] = useState(() => termsFor("all"));
  const [uplift, setUplift] = useState("1");

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

  const handleVerticalChange = (id) => {
    setVertical(id);
    setPartnerTerms(termsFor(id));
    setUplift("1");
  };

  const setPartnerField = (key, value) =>
    setPartnerTerms((current) => ({ ...current, [key]: value }));

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
          The chain every travel retailer plans with: turnover is the product of five levers. Read it twice, once on
          what DutyBoost measurably moved and once on the partner's own estate, and never blend the two.
        </p>
        <p className="text-xs text-muted-foreground mt-2 font-mono">
          Turnover = Flow × Penetration × Conversion × Multiple sale × Average price
        </p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {VERTICALS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => handleVerticalChange(id)}
            className={`flex items-center gap-1.5 whitespace-nowrap text-xs px-3 py-2 rounded-full border transition-all ${
              vertical === id ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:border-primary/50"
            }`}
          >
            <Icon className="w-3.5 h-3.5" /> {label}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-4 items-start">
        <TurnoverAttributed key={`attributed-${vertical}`} tokens={scoped} vertical={vertical} />
        <div className="space-y-4">
          <TurnoverPartnerModel
            vertical={vertical}
            terms={partnerTerms}
            onChange={setPartnerField}
            uplift={uplift}
            onUpliftChange={setUplift}
          />
          <TurnoverSensitivity terms={partnerTerms} />
        </div>
      </div>
    </div>
  );
}