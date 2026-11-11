const ROLES = [
  {
    name: "Caribbean Airlines",
    tag: "Travel Partner",
    box: "bg-primary/10",
    tagColor: "text-primary",
    points: [
      "Distributes DutyCredits through its passenger communication channels.",
      "Creates opportunities for in-flight purchases and airport retail purchases.",
      "When a DutyCredit issued by Caribbean Airlines is redeemed at a participating airport retailer, Caribbean Airlines earns 20% of DutyBoost's platform fee.",
    ],
  },
  {
    name: "DutyBoost",
    tag: "Commercial Infrastructure",
    box: "bg-chart-3/10",
    tagColor: "text-chart-3",
    points: [
      "Activates travellers through airline distribution and independent curiosity campaigns.",
      "Connects passengers, travel partners, airport retailers and existing POS systems.",
      "Supports the measurement and validation of qualifying completed transactions across participating channels.",
    ],
  },
  {
    name: "Caribbean Duty Free",
    tag: "Retail Partner",
    box: "bg-accent/10",
    tagColor: "text-accent",
    points: [
      "Accepts DutyCredits for qualifying airport retail purchases.",
      "Offers travellers the opportunity to pre-order through its website before arriving at the airport.",
      "Converts pre-travel purchase intent into website pre-orders and in-store airport sales.",
      "Pays a 2.5% platform fee on qualifying completed transactions.",
    ],
  },
];

export default function ProposalRoles() {
  return (
    <section>
      <h2 className="font-heading text-2xl font-bold mb-4">One ecosystem. Three connected roles.</h2>
      <div className="grid gap-4 lg:grid-cols-3">
        {ROLES.map((r) => (
          <div key={r.name} className={`rounded-2xl p-6 ${r.box}`}>
            <h3 className="font-heading font-bold uppercase tracking-wide">{r.name}</h3>
            <p className={`text-xs uppercase tracking-wider mb-3 ${r.tagColor}`}>{r.tag}</p>
            <ul className="space-y-2 text-sm text-foreground/90">
              {r.points.map((p) => (
                <li key={p} className="flex gap-2"><span>•</span><span>{p}</span></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}