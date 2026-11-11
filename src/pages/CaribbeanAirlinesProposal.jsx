import DutyBoostLogo from "@/components/DutyBoostLogo";
import PageFooter from "@/components/PageFooter";
import ProposalRoles from "@/components/proposal/ProposalRoles";
import ProposalSavings from "@/components/proposal/ProposalSavings";
import ProposalRevenue from "@/components/proposal/ProposalRevenue";

const CHANNELS = [
  ["Website", "Pre-orders"],
  ["In-flight", "Purchases"],
  ["Airport", "Retail sales"],
];

const VALUE = [
  ["Caribbean Airlines", [
    "Strengthens passenger engagement and creates additional in-flight and airport retail purchase opportunities.",
    "Earns performance-based revenue share when its DutyCredits generate qualifying purchases.",
  ]],
  ["Caribbean Duty Free", [
    "Reaches passengers before airport arrival, including travellers flying with other airlines.",
    "Generates website pre-orders and encourages in-store airport purchases.",
    "Builds purchase intent and creates opportunities for incremental sales and higher customer spend.",
  ]],
  ["DutyBoost", [
    "Provides the commercial infrastructure and passenger acquisition channels connecting the ecosystem.",
    "Measures qualifying performance and rewards stakeholders when purchases are completed.",
  ]],
];

export default function CaribbeanAirlinesProposal() {
  return (
    <div className="min-h-screen bg-background">
      <header className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 flex items-center justify-between">
        <DutyBoostLogo height={48} />
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground hidden sm:block">
          Commercial Partnership Proposal
        </span>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-10">
        <section className="rounded-3xl bg-foreground text-background p-6 sm:p-10">
          <p className="text-xs font-bold uppercase tracking-wider text-chart-3">DutyBoost | Commercial Partnership Proposal</p>
          <h1 className="font-heading text-3xl sm:text-5xl font-bold mt-3">Caribbean Airlines &amp; Caribbean Duty Free</h1>
          <p className="font-heading text-xl sm:text-2xl font-semibold text-chart-3 mt-4">One ecosystem. Two revenue opportunities.</p>
          <p className="mt-2 opacity-90">A connected commercial ecosystem powered by DutyBoost.</p>
          <div className="mt-6 rounded-xl border border-chart-3/40 bg-chart-3/10 p-4 sm:p-5">
            <p className="text-sm sm:text-base">
              <span className="font-bold text-chart-3">Pay for performance, not for activity.</span>{" "}
              Other solutions bill for leads, clicks and impressions with no guarantee of a real customer. DutyBoost charges only when a real end customer completes a qualifying purchase.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3 mt-8">
            {CHANNELS.map(([a, b]) => (
              <div key={a} className="rounded-lg bg-background/10 p-3 sm:p-4">
                <p className="text-sm uppercase">{a}</p>
                <p className="text-xs opacity-70">{b}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-heading text-2xl font-bold mb-4">The opportunity</h2>
          <div className="rounded-2xl border border-border bg-card p-6 text-sm space-y-3">
            <p>DutyBoost connects Caribbean Airlines and Caribbean Duty Free through one performance-based commercial ecosystem, creating additional commercial opportunities before departure, during the flight and at the airport.</p>
            <p>The objective is to turn passenger engagement into measurable purchases across three connected channels:</p>
            <ul className="space-y-1">
              <li>• Website pre-orders before airport arrival.</li>
              <li>• In-flight purchases during the journey.</li>
              <li>• In-store purchases at participating airport retailers.</li>
            </ul>
          </div>
        </section>

        <section className="rounded-2xl bg-chart-3/10 p-6 sm:p-8 text-sm space-y-3">
          <h2 className="font-heading text-2xl font-bold">Activate travellers before they travel</h2>
          <p>DutyBoost engages potential airport shoppers days, weeks or even months before they reach their airport of departure.</p>
          <h3 className="font-bold">1. Airline-driven engagement</h3>
          <p>Caribbean Airlines can distribute personalised DutyCredits through booking confirmation emails, return-flight reminders, loyalty initiatives and other passenger communication channels, encouraging travellers to plan their purchases before departure.</p>
          <h3 className="font-bold">2. DutyBoost curiosity campaigns</h3>
          <p>Independently of airline bookings, DutyBoost runs its own targeted curiosity campaigns to engage travellers who may be flying with any airline. These campaigns introduce potential shoppers to participating airport retailers and encourage them to consider purchases before arriving at the airport.</p>
          <p className="font-heading text-xl font-bold text-chart-3">They arrive ready to buy.</p>
          <p>The result: Caribbean Duty Free can attract customers beyond Caribbean Airlines' own passenger base and turn pre-travel engagement into measurable retail sales.</p>
        </section>

        <ProposalRoles />
        <ProposalSavings />
        <ProposalRevenue />

        <section>
          <h2 className="font-heading text-2xl font-bold mb-4">The strategic value</h2>
          <div className="rounded-2xl border border-border bg-card p-6 grid gap-6 md:grid-cols-3 text-sm">
            {VALUE.map(([name, pts]) => (
              <div key={name}>
                <h3 className="font-bold mb-2">{name}</h3>
                <ul className="space-y-2">
                  {pts.map((p) => (
                    <li key={p} className="flex gap-2">
                      <span aria-hidden="true">•</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl bg-foreground text-background p-6 sm:p-10 space-y-4">
          <p className="text-xs font-bold uppercase tracking-wider text-chart-3">Proposed next step</p>
          <h2 className="font-heading text-2xl font-bold">Moving forward together</h2>
          <p className="text-sm opacity-90">Align the commercial framework and identify the practical POS and website integration routes required to launch an initial Caribbean Airlines–Caribbean Duty Free pilot, including the opportunities for in-flight purchases.</p>
          <div className="border-t border-background/20 pt-4">
            <h3 className="font-heading text-2xl font-bold text-chart-3">One connected ecosystem.</h3>
            <p className="text-sm opacity-90 mt-1">Website pre-orders. In-flight purchases. Airport retail purchases. Creating value for our partners first, with DutyBoost earning through the results we generate together.</p>
          </div>
        </section>
      </main>
      <PageFooter />
    </div>
  );
}