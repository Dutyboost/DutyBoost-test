import TurnoverFormula from "@/components/admin/turnover/TurnoverFormula";
import { fmtEur, fmtNum } from "@/utils/formatNumber";
import { ITEMS_PER_REDEMPTION } from "@/data/retailTurnoverModel";

export default function TurnoverResult({ claims, redeemedCount, bought, flow, flowNote }) {
  const penetration = flow > 0 ? (claims / flow) * 100 : null;
  const conversion = claims > 0 ? (redeemedCount / claims) * 100 : 0;
  const averagePrice = redeemedCount > 0 ? bought / redeemedCount / ITEMS_PER_REDEMPTION : 0;

  const terms = [
    { label: "Flow", value: flow > 0 ? fmtNum(flow) : "—" },
    { label: "Penetration", value: penetration === null ? "—" : `${fmtNum(penetration, 3)}%` },
    { label: "Conversion", value: `${fmtNum(conversion, 1)}%` },
    { label: "Multiple sale", value: fmtNum(ITEMS_PER_REDEMPTION, 1) },
    { label: "Average price", value: fmtEur(averagePrice, 2) },
  ];

  return (
    <div className="bg-card rounded-2xl border border-border p-5 sm:p-6 space-y-4">
      <div>
        <h3 className="font-heading font-bold">The formula's result on our own data</h3>
        <p className="text-sm text-muted-foreground mt-1">
          {fmtNum(claims)} DutyCredits claimed, {fmtNum(redeemedCount)} redeemed, {fmtEur(bought)} of redeemed baskets.
          {flowNote ? ` ${flowNote}` : ""}
        </p>
      </div>

      <TurnoverFormula
        terms={terms}
        result={fmtEur(bought)}
        resultLabel="Turnover"
        resultNote="redeemed baskets"
      />

      <p className="text-xs text-muted-foreground">
        Flow cancels out of the chain: penetration is claims over that same flow, so the result lands exactly on the
        redeemed basket value we already report a fee on and a wrong assumption cannot inflate it.
      </p>
    </div>
  );
}