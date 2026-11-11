const ROWS = [
  ["Entry", "$20–$49", "$1–$2.50"],
  ["Boarding", "$50–$99", "$2.50–$5"],
  ["Standard", "$100–$149", "$5–$10"],
  ["Plus", "$150–$199", "$10–$20"],
  ["Lounge", "$200–$249", "$20–$30"],
  ["Premium", "$250–$299", "$30–$45"],
  ["VIP", "$300+", "$60"],
];

export default function ProposalSavings() {
  return (
    <section>
      <h2 className="font-heading text-2xl font-bold mb-4">The traveller's savings</h2>
      <div className="rounded-xl border border-border overflow-hidden bg-card">
        <table className="w-full text-sm">
          <thead className="bg-foreground text-background">
            <tr>
              <th className="text-left p-3">DutyCredit</th>
              <th className="text-left p-3">Qualifying spend</th>
              <th className="text-left p-3">Savings</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map(([a, b, c]) => (
              <tr key={a} className="border-t border-border even:bg-muted/50">
                <td className="p-3 font-semibold">{a}</td>
                <td className="p-3">{b}</td>
                <td className="p-3">{c}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-muted-foreground mt-2">
        Applicable DutyCredit values and redemption conditions are determined by the agreed campaign.
      </p>
    </section>
  );
}