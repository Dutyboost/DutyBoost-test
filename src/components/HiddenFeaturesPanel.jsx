import { Badge } from "@/components/ui/badge";
import { EyeOff, Briefcase, Hotel, Plane, Navigation } from "lucide-react";

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
    id: "hotels",
    icon: Hotel,
    title: "DutyBoost for Hotels",
    status: "hidden",
    reason: "Future product line — positioning and model defined",
    description: `Hotels use DutyBoost like travel partners, but activation happens after the stay — at departure, when the guest is heading to the airport. Instead of the relationship ending at check-out, the hotel extends the guest journey into the airport and turns that moment into both a loyalty touchpoint and a new revenue stream.

HOW IT WORKS:
When a guest completes their stay, the hotel sends a departure or thank-you email. In that email: "You've unlocked a €X airport reward for your departure today." The reward is a mobile QR code valid at the departure airport, redeemable at a single store with a minimum spend (e.g. €50). Guest scans, purchases, commission is generated and shared with the hotel.

GUEST JOURNEY:
• Booking → No change
• Stay → No change
• Departure → Reward is issued via departure email
• Airport → Reward is redeemed at retailer
• Post-trip → Loyalty reinforcement (guest remembers hotel benefit)

WHY IT WORKS FOR HOTELS:
Hotels already send emails at check-out / post-stay. The departure email is typically underutilized. DutyBoost turns it into a revenue-generating moment with zero operational change — no staff workload, no impact on in-hotel experience.

REVENUE EXAMPLE (per 100k guests):
• Conversion 20% = 20,000 guests
• Avg spend €50 = €1,000,000 gross
• Commission 2.5% = €25,000 / Hotel share 20% = €5,000 incremental

ADDITIONAL VALUE:
• Loyalty: guest leaves with a tangible benefit, increasing repeat bookings
• Extended experience: service continues beyond the hotel into the travel journey
• No friction: no app download, no signup — guest simply receives and uses the reward

KEY MESSAGE: "Turn every departing guest into a revenue opportunity by extending your service beyond the hotel and into the airport."

ROLLOUT:
Phase 1 — Integrate DutyCredit reward into the departure/thank-you email at a single partner hotel and airport.
Phase 2 — Add pre-departure reminder email (sent morning of departure) and expand to more airport retailers.
Phase 3 — Expand across hotel chains, multiple airports, and connect to hotel PMS for automated trigger on check-out.`,
    pages: [],
    howToRestore: [
      "Create pages/HotelPartnerOnboarding.jsx for hotel signup flow (mirrors AgencySignup structure).",
      "Create pages/HotelDashboard.jsx for analytics and voucher issuance management.",
      "Add hotel as a business_type option in SignupApplication entity.",
      "Build backend trigger: on guest check-out, send departure email with DutyCredit QR (mirrors generateDutyCredit function).",
      "Add a 'For Hotels' showcase page and link it from the LandingPage nav.",
      "Register routes in App.jsx and expose public paths.",
    ],
    files: [],
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
  {
    id: "car-rental",
    icon: Navigation,
    title: "DutyBoost for Car Rental",
    status: "hidden",
    reason: "Future product line — positioning and model defined",
    description: `Car rental companies occupy a unique position in the travel journey: they confirm bookings weeks in advance, communicate directly with travelers multiple times before pick-up, and the rental itself often starts or ends at the airport. DutyBoost turns this touchpoint into a retail revenue stream.

HOW IT WORKS:
When a traveler confirms a car rental, the rental company triggers a DutyCredit reward tied to the departure airport. The reward is delivered via the booking confirmation email or a pre-arrival reminder: "You've unlocked €X to spend at your departure airport — as a thank-you from [Rental Brand]."

TRAVELER JOURNEY:
• Booking → DutyCredit is generated and sent via confirmation email
• Pre-departure → Reminder email with QR code (morning of travel)
• Airport → Traveler redeems at participating duty-free or retail store
• Return → Optional: loyalty reward for return trip activation

WHY IT WORKS FOR CAR RENTAL:
Car rental confirmation emails have among the highest open rates in travel (70–85%). The booking window is typically 2–4 weeks out, giving ample time for intent-building. Rental brands already compete heavily on loyalty — DutyBoost adds a tangible, immediate reward with zero operational overhead.

REVENUE EXAMPLE (per 100k rental bookings):
• Conversion 15% = 15,000 travelers
• Avg spend €65 = €975,000 gross
• Commission 2.5% = €24,375 / Rental brand share 20% = €4,875 incremental

DIFFERENTIATION FROM OTHER CHANNELS:
Unlike airlines or hotels, car rental customers already associate their brand with departure logistics. A reward at the departure airport feels natural — not intrusive. This creates a seamless brand extension from "getting there" to "spending there."

ADDITIONAL VALUE:
• Loyalty: departure reward increases brand affinity vs competitors
• Upsell trigger: reminder emails can include upgrade offers alongside the reward
• Data: airport category spend data reveals traveler profiles valuable for future targeting
• B2B lever: corporate accounts can include DutyCredit as part of their travel policy

KEY MESSAGE: "Every rental confirmation is a departure moment. Turn it into a revenue-generating airport touchpoint."

ROLLOUT:
Phase 1 — Integrate DutyCredit into booking confirmation email at one rental brand + one partner airport.
Phase 2 — Add pre-departure reminder (sent 24h before travel date) with QR code refresh.
Phase 3 — Expand to multi-airport, multi-brand, and connect to rental fleet management APIs for automated triggering on confirmed booking status.`,
    pages: [],
    howToRestore: [
      "Create pages/CarRentalPartner.jsx for car rental company onboarding (mirrors AgencySignup structure, with rental-specific fields like fleet_size and booking_volume).",
      "Create pages/CarRentalDashboard.jsx for rental brand analytics: bookings synced, DutyCredits issued, redemption rate, revenue share.",
      "Add 'Car Rental' as a business_type option in the SignupApplication entity.",
      "Build a backend function (functions/generateCarRentalCredit.js) that triggers on confirmed rental booking — mirrors generateDutyCredit but with rental brand fields.",
      "Add pre-departure reminder automation: scheduled function that sends reminder email 24h before travel_date for car rental-linked vouchers.",
      "Create a car rental partner showcase page and link from LandingPage nav under 'For Partners'.",
      "Register routes in App.jsx and expose public paths.",
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