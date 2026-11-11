const ROLES = [
  {
    name: "Caribbean Airlines",
    tag: "Travel Partner",
    points: [
      "Distributes DutyCredits through its passenger communication channels.",
      "Creates opportunities for in-flight purchases and airport retail purchases.",
      "When a DutyCredit issued by Caribbean Airlines is redeemed at a participating airport retailer, Caribbean Airlines earns 20% of DutyBoost's platform fee.",
    ],
  },
  {
    name: "DutyBoost",
    tag: "Commercial Infrastructure",
    points: [
      "Activates travellers through airline distribution and independent curiosity campaigns.",
      "Connects passengers, travel partners, airport retailers and existing POS systems.",
      "Supports the measurement and validation of qualifying completed transactions across participating channels.",
    ],
  },
  {
    name: "Caribbean Duty Free",
    tag: "Retail Partner",
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
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ca-fuchsia">Roles</p>
      <h2 className="font-heading text-2xl sm:text-3xl font-bold mt-2 mb-5">One ecosystem. Three connected roles.</h2>
      <div className="grid gap-4 lg:grid-cols-3">
        {ROLES.map((r) => (
          <div key={r.name} className="rounded-2xl border border-border bg-white p-6 shadow-sm">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ca-fuchsia">{r.tag}</p>
            <h3 className="font-heading text-lg font-bold mt-1 mb-3 text-foreground">{r.name}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {r.points.map((p) => (
                <li key={p} className="flex gap-2 items-start">
                  <span className="text-ca-purple leading-6" aria-hidden="true">•</span>
                  <span className="leading-6">{p}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}