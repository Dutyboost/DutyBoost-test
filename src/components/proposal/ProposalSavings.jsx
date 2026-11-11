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
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ca-fuchsia">DutyCredit tiers</p>
      <h2 className="font-heading text-2xl sm:text-3xl font-bold mt-2 mb-5">The traveller&rsquo;s savings</h2>
      <div className="rounded-2xl border border-border overflow-hidden bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-ca-purple text-white">
            <tr>
              <th className="text-left p-3 sm:p-4 font-semibold">DutyCredit</th>
              <th className="text-left p-3 sm:p-4 font-semibold">Qualifying spend</th>
              <th className="text-left p-3 sm:p-4 font-semibold">Savings</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map(([a, b, c]) => (
              <tr key={a} className="border-t border-border even:bg-ca-mist">
                <td className="p-3 sm:p-4 font-semibold text-foreground">{a}</td>
                <td className="p-3 sm:p-4 text-muted-foreground">{b}</td>
                <td className="p-3 sm:p-4 text-ca-fuchsia font-semibold">{c}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}