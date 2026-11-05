import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TurnoverFormula from "@/components/admin/turnover/TurnoverFormula";
import { fmtEur, fmtNum } from "@/utils/formatNumber";
import { ATTRIBUTED_DEFAULT_FLOW, FLOW_UNITS } from "@/data/retailTurnoverModel";

export default function TurnoverAttributed({ tokens, vertical }) {
  const [flow, setFlow] = useState(String(ATTRIBUTED_DEFAULT_FLOW));
  const [items, setItems] = useState("1");

  const claims = tokens.length;
  const redeemed = tokens.filter((token) => token.status === "redeemed");
  const bought = redeemed.reduce((sum, token) => sum + Number(token.basket_value || 0), 0);

  const flowN = Number(flow) || 0;
  const itemsN = Number(items) || 1;
  const penetration = flowN > 0 ? (claims / flowN) * 100 : 0;
  const conversion = claims > 0 ? (redeemed.length / claims) * 100 : 0;
  const basketPerRedemption = redeemed.length > 0 ? bought / redeemed.length : 0;
  const averagePrice = itemsN > 0 ? basketPerRedemption / itemsN : 0;

  const terms = [
    { label: "Flow", value: fmtNum(flowN) },
    { label: "Penetration", value: `${fmtNum(penetration, 2)}%` },
    { label: "Conversion", value: `${fmtNum(conversion, 2)}%` },
    { label: "Multiple sale", value: fmtNum(itemsN, 2) },
    { label: "Average price", value: fmtEur(averagePrice, 2) },
  ];

  return (
    <div className="bg-card rounded-2xl border border-border p-5 sm:p-6 space-y-4">
      <div>
        <h3 className="font-heading font-bold">What DutyBoost actually moved</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Measured on our own data: {fmtNum(claims)} DutyCredits claimed, {fmtNum(redeemed.length)} redeemed at a
          participating retailer. Only the two levers we cannot see from our side, reach and items per basket, are inputs.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <Label className="text-xs text-muted-foreground mb-1.5 block">
            Flow · {FLOW_UNITS[vertical] || FLOW_UNITS.all} in the period
          </Label>
          <Input type="number" min="0" value={flow} onChange={(event) => setFlow(event.target.value)} />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground mb-1.5 block">Multiple sale · items per redemption</Label>
          <Input type="number" min="1" step="0.1" value={items} onChange={(event) => setItems(event.target.value)} />
        </div>
      </div>

      <TurnoverFormula
        terms={terms}
        result={fmtEur(bought)}
        resultLabel="Attributed turnover"
        resultNote="redeemed baskets"
      />

      <p className="text-xs text-muted-foreground">
        The chain reconciles with the {fmtEur(bought, 2)} of redeemed baskets already on record, so a wrong assumption
        shows up immediately instead of flattering the number.
      </p>
    </div>
  );
}