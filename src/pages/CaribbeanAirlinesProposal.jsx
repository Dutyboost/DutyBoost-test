import DutyBoostLogo from "@/components/DutyBoostLogo";
import PageFooter from "@/components/PageFooter";
import ProposalRoles from "@/components/proposal/ProposalRoles";
import ProposalSavings from "@/components/proposal/ProposalSavings";
import ProposalRevenue from "@/components/proposal/ProposalRevenue";

const CA_LOGO = "https://newwebsiteblobs.blob.core.windows.net/brand/corporate_logo_horizontal_fullcolour.png";

const CHANNELS = [
  ["Website", "Pre-orders"],
  ["In-flight", "Purchases"],
  ["Airport", "Retail sales"],
];

const STEPS = [
  ["1", "Airline-driven engagement", "Caribbean Airlines can distribute personalised DutyCredits through booking confirmation emails, return-flight reminders, loyalty initiatives and other passenger communication channels, encouraging travellers to plan their purchases before departure."],
  ["2", "DutyBoost curiosity campaigns", "Independently of airline bookings, DutyBoost runs its own targeted curiosity campaigns to engage travellers who may be flying with any airline, introducing them to participating airport retailers before they arrive."],
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
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-20 bg-white/95 backdrop-blur border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-24 flex items-center justify-between gap-4">
          <DutyBoostLogo height={40} />
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="hidden sm:block text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Partnership Proposal
            </span>
            <span className="hidden sm:block w-px h-6 bg-border" />
            <img src={CA_LOGO} alt="Caribbean Airlines" className="h-10 sm:h-14 w-auto" />
          </div>
        </div>
      </header>

      <section className="bg-gradient-to-r from-ca-purple to-ca-fuchsia text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/80">Commercial Partnership Proposal</p>
          <h1 className="font-heading text-3xl sm:text-5xl font-bold mt-3 leading-tight">
            Caribbean Airlines &amp; Caribbean Duty Free
          </h1>
          <p className="font-heading text-lg sm:text-2xl font-semibold mt-4 text-white/95">One ecosystem. Two revenue opportunities.</p>
          <p className="mt-1 text-white/75">A connected commercial ecosystem powered by DutyBoost.</p>

          <div className="mt-7 rounded-2xl bg-white p-5 sm:p-6 text-foreground shadow-xl max-w-3xl">
            <p className="text-sm sm:text-base leading-relaxed">
              <span className="font-heading font-bold text-ca-purple">Pay for performance, not for activity.</span>{" "}
              Other solutions bill for leads, clicks and impressions with no guarantee of a real customer. DutyBoost charges only when a real end customer completes a qualifying purchase.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-8">
            {CHANNELS.map(([a, b]) => (
              <div key={a} className="rounded-xl border border-white/25 bg-white/10 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/70">{a}</p>
                <p className="font-heading font-semibold mt-1">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-14">
        <section>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ca-fuchsia">The opportunity</p>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold mt-2 mb-5">Connecting the journey end to end</h2>
          <div className="rounded-2xl border border-border bg-white p-6 sm:p-8 text-sm sm:text-base space-y-4 shadow-sm">
            <p>DutyBoost connects Caribbean Airlines and Caribbean Duty Free through one performance-based commercial ecosystem, creating additional commercial opportunities before departure, during the flight and at the airport.</p>
            <p>The objective is to turn passenger engagement into measurable purchases across three connected channels:</p>
            <ul className="space-y-2">
              {["Website pre-orders before airport arrival.", "In-flight purchases during the journey.", "In-store purchases at participating airport retailers."].map((line) => (
                <li key={line} className="flex gap-3 items-start">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ca-fuchsia" aria-hidden="true" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ca-fuchsia">Pre-travel engagement</p>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold mt-2">Activate travellers before they travel</h2>
          <p className="mt-3 text-muted-foreground max-w-3xl">
            DutyBoost engages potential airport shoppers days, weeks or even months before they reach their airport of departure.
          </p>
          <div className="grid gap-4 md:grid-cols-2 mt-6">
            {STEPS.map(([n, title, body]) => (
              <div key={n} className="rounded-2xl border border-border bg-ca-mist p-6">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-ca-purple text-white text-sm font-bold">{n}</span>
                <h3 className="font-heading font-bold mt-3 text-foreground">{title}</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-2xl border border-ca-purple/15 bg-ca-purple/5 p-6">
            <p className="font-heading text-xl font-bold text-ca-purple">They arrive ready to buy.</p>
            <p className="text-sm text-muted-foreground mt-1">
              Caribbean Duty Free can attract customers beyond Caribbean Airlines&rsquo; own passenger base and turn pre-travel engagement into measurable retail sales.
            </p>
          </div>
        </section>

        <ProposalRoles />
        <ProposalSavings />
        <ProposalRevenue />

        <section>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ca-fuchsia">The strategic value</p>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold mt-2 mb-5">Value for every partner</h2>
          <div className="rounded-2xl border border-border bg-white p-6 sm:p-8 grid gap-6 md:grid-cols-3 text-sm shadow-sm">
            {VALUE.map(([name, pts]) => (
              <div key={name}>
                <h3 className="font-heading font-bold mb-3 text-ca-purple">{name}</h3>
                <ul className="space-y-2 text-muted-foreground">
                  {pts.map((p) => (
                    <li key={p} className="flex gap-2 items-start">
                      <span className="text-ca-fuchsia leading-6" aria-hidden="true">•</span>
                      <span className="leading-6">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl bg-gradient-to-r from-ca-purple to-ca-fuchsia text-white p-6 sm:p-10 space-y-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/80">Proposed next step</p>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold">Moving forward together</h2>
          <p className="text-sm sm:text-base text-white/90">
            Align the commercial framework and identify the practical POS and website integration routes required to launch an initial Caribbean Airlines&ndash;Caribbean Duty Free pilot, including the opportunities for in-flight purchases.
          </p>
          <div className="border-t border-white/25 pt-4">
            <h3 className="font-heading text-2xl font-bold">One connected ecosystem.</h3>
            <p className="text-sm text-white/90 mt-1">
              Website pre-orders. In-flight purchases. Airport retail purchases. Creating value for our partners first, with DutyBoost earning through the results we generate together.
            </p>
          </div>
        </section>
      </main>
      <PageFooter />
    </div>
  );
}