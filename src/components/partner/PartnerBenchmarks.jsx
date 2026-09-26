import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";

const fmtMoney = (v) =>
  `€ ${Number(v || 0).toLocaleString("nl-NL", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const fmtNumber = (v) => Number(v || 0).toLocaleString("nl-NL");

/** Benchmarks a partner against the whole platform for the same period. */
export default function PartnerBenchmarks({ metrics = {}, network = {}, partnerLabel = "This partner" }) {
  const rows = [
    { label: "Redemptions", you: metrics.redemptions, net: network.redemptions },
    { label: "Gross sales", you: metrics.grossVolume, net: network.grossVolume, money: true },
    { label: "Platform revenue", you: metrics.platformFee, net: network.platformFee, money: true },
    { label: "Average basket", you: metrics.avgBasket, net: network.avgBasket, money: true },
  ];

  const share = network.grossVolume ? (metrics.grossVolume / network.grossVolume) * 100 : 0;

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="px-5 py-4 border-b border-border">
        <h2 className="font-heading font-semibold">Benchmark against the network</h2>
        <p className="text-sm text-muted-foreground mt-0.5">
          {partnerLabel} compared with all DutyBoost airport retail activity in the same period.
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-5 py-3 text-left font-medium text-muted-foreground">Metric</th>
              <th className="px-5 py-3 text-right font-medium text-muted-foreground">{partnerLabel}</th>
              <th className="px-5 py-3 text-right font-medium text-muted-foreground">Network</th>
              <th className="px-5 py-3 text-right font-medium text-muted-foreground">vs network</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map(({ label, you, net, money }) => {
              const fmt = money ? fmtMoney : fmtNumber;
              const diff = Number(net) > 0 ? ((Number(you) - Number(net)) / Number(net)) * 100 : 0;
              const up = diff > 0.5;
              const down = diff < -0.5;
              return (
                <tr key={label} className="hover:bg-muted/30">
                  <td className="px-5 py-3 font-medium">{label}</td>
                  <td className="px-5 py-3 text-right font-semibold">{fmt(you)}</td>
                  <td className="px-5 py-3 text-right text-muted-foreground">{fmt(net)}</td>
                  <td className="px-5 py-3 text-right">
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-medium ${
                        up ? "text-emerald-600" : down ? "text-destructive" : "text-muted-foreground"
                      }`}
                    >
                      {up ? <ArrowUpRight className="w-3 h-3" /> : down ? <ArrowDownRight className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
                      {diff.toFixed(1)}%
                    </span>
                  </td>
                </tr>
              );
            })}
            <tr className="bg-muted/20">
              <td className="px-5 py-3 font-medium">Share of network sales</td>
              <td className="px-5 py-3 text-right font-semibold" colSpan={3}>
                {share.toFixed(2)}%
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}