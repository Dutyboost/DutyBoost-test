import { Badge } from "@/components/ui/badge";
import { EyeOff, Briefcase, Plane } from "lucide-react";

const HIDDEN_FEATURES = [
  {
    id: "business-travel",
    icon: Briefcase,
    title: "Business Travel & Corporate F&B Programme",
    status: "hidden",
    reason: "Business model under review",
    description: "Full corporate travel module: cost center tracking, policy engine, daily F&B limits per traveler, real-time budget dashboard, and expense exports.",
    pages: [
      { label: "Landing page", path: "/business-travel" },
      { label: "Get Started", path: "/business-travel/get-started" },
      { label: "Corporate Dashboard", path: "/demo/corporate" },
      { label: "Corporate Admin", path: "/corporate-admin" },
      { label: "Corporate Budget Allocation", path: "/corporate-budget" },
      { label: "Corporate Travel Dashboard", path: "/corporate-dashboard" },
    ],
    howToRestore: [
      "In App.jsx: uncomment the Business Travel & Corporate routes in both the publicPaths block and the main Routes block.",
      "In pages/LandingPage.jsx: uncomment the 'For Business Travel' nav button.",
      "In pages/DemoLanding.jsx: uncomment the Corporate Travel demo card.",
    ],
    files: [
      "pages/BusinessTravel.jsx",
      "pages/BusinessTravelGetStarted.jsx",
      "pages/DemoCorporateDashboard.jsx",
      "pages/CorporateTravelAdmin.jsx",
      "pages/CorporateTravelDashboard.jsx",
      "pages/CorporateBudgetAllocation.jsx",
      "components/CorporateExpenseExport.jsx",
      "components/CorporateAirportSpendMap.jsx",
    ],
  },
  {
    id: "airline-inflight",
    icon: Plane,
    title: "Airline & Inflight Integration",
    status: "hidden",
    reason: "Strategic future channel — positioning and rollout defined",
    description: `DutyBoost is not a retail tech feature or airport promotion. It is a revenue layer that connects booking, airport, and inflight into one monetization flow. The positioning: "We increase revenue per passenger beyond the flight itself."

JOURNEY MAP:
• Booking → Reward is generated (post-booking confirmation email / airline app / boarding pass wallet)
• Pre-flight → Reward is redeemed at airport retailer (minimum €50 spend)
• Inflight → Reminder & activation (WiFi portal, entertainment system, onboard magazine)

INTEGRATION POINTS:
A. Post-booking (primary entry): "You've unlocked €X to use at your departure airport" — intent is created here.
B. Pre-flight (conversion moment): Passenger scans QR, meets minimum spend. Revenue is generated here.
C. Inflight (activation layer): WiFi portal first screen, IFE reminder, digital content — reinforces usage on next trip.

WHY AIRLINES CARE — Third revenue layer beyond tickets and inflight sales:
• Conversion 20% of 100k pax = 20,000 conversions
• Avg spend €50 = €1,000,000 gross
• Commission 2.5% = €25,000 / Airline share 20% = €5,000 incremental
• Loyalty: tangible immediate value vs abstract points
• Data: airport purchase behaviour, category performance, conversion timing

KEY MESSAGE: Do not say "we help airport retail." Say: "We increase revenue per passenger beyond the flight itself."

ROLLOUT:
Phase 1 — Booking confirmation + QR reward at single airport.
Phase 2 — Inflight reminders via WiFi portal or onboard content.
Phase 3 — Expand across routes and airports.`,
    pages: [],
    howToRestore: [
      "Create an airline partner onboarding page (pages/AirlinePartner.jsx) with the positioning deck and integration options.",
      "Add post-booking webhook endpoint that airline booking systems can call to auto-generate DutyCredits for passengers.",
      "Build an inflight WiFi portal landing page (public, no login) that shows 'You have an unused reward waiting at the airport'.",
      "Add airline as a user role/partner type in SignupApplication entity.",
      "Create airline analytics dashboard showing pax conversion, airport spend, and revenue share.",
      "Add airline partner routes to App.jsx and expose via LandingPage nav.",
    ],
    files: [],
  },
];

const statusColors = {
  hidden: "bg-red-100 text-red-700 border-red-200",
  live: "bg-green-100 text-green-700 border-green-200",
  partial: "bg-amber-100 text-amber-700 border-amber-200",
};

export default function HiddenFeaturesPanel() {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 border border-border rounded-xl px-4 py-3">
        <EyeOff className="w-4 h-4 shrink-0" />
        <p>These features exist in the codebase but are not exposed to public users. Follow the restore instructions to re-enable each one.</p>
      </div>

      {HIDDEN_FEATURES.map((feature) => {
        const Icon = feature.icon;
        return (
          <div key={feature.id} className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-border flex items-center gap-3">
              <div className="w-9 h-9 bg-muted rounded-xl flex items-center justify-center shrink-0">
                <Icon className="w-4.5 h-4.5 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-heading font-semibold text-sm">{feature.title}</h3>
                  <Badge className={`text-xs ${statusColors[feature.status]}`}>{feature.status}</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{feature.reason}</p>
              </div>
            </div>

            <div className="px-5 py-4 space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{feature.description}</p>

              {feature.pages.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Routes</p>
                  <div className="flex flex-wrap gap-2">
                    {feature.pages.map((page) => (
                      <span key={page.path} className="text-xs font-mono bg-muted px-2.5 py-1 rounded-lg border border-border">{page.path}</span>
                    ))}
                  </div>
                </div>
              )}

              {feature.files.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Key Files</p>
                  <div className="flex flex-wrap gap-2">
                    {feature.files.map((f) => (
                      <span key={f} className="text-xs font-mono bg-primary/5 text-primary px-2.5 py-1 rounded-lg border border-primary/20">{f}</span>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">How to restore</p>
                <ol className="space-y-1.5">
                  {feature.howToRestore.map((step, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-xs font-bold text-primary mt-0.5 shrink-0">{i + 1}.</span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}