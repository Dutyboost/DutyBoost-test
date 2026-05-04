import { Badge } from "@/components/ui/badge";
import { EyeOff, Briefcase, Plane, Ship, Train } from "lucide-react";

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
  {
    id: "cruise-ship",
    icon: Ship,
    title: "Cruise Ship & Port Retail Integration",
    status: "hidden",
    reason: "Strategic future channel — business model validated, not yet built",
    description: `DutyBoost for cruise ships mirrors the airline model but with a distinct commercial dynamic: passengers are already at a port, they have free time, and they are high-spend travellers. The positioning: "We turn port excursion time into measurable retail revenue."

JOURNEY MAP:
• Embarkation / Pre-cruise → Reward is generated at booking confirmation (cruise line app, cabin key card, onboard welcome email)
• Port stop (excursion window) → Passenger visits a DutyBoost-partnered airport or port retailer with QR voucher
• Back onboard → Spend confirmation shown on cabin account or loyalty app; eligible for onboard credit on next port

INTEGRATION POINTS:
A. Pre-cruise (intent creation): "At your next port stop, you have €X to spend at participating retailers" — delivered via cruise line app or printed shore excursion card.
B. Port stop (conversion moment): Passenger scans QR at partnered retailer. Spend threshold met. Revenue generated.
C. Post-port (loyalty loop): Cruise line receives data on port retail conversion. Passenger receives optional onboard credit or loyalty points for next cruise.

BUSINESS MODEL:
• Cruise lines earn a revenue share on each redemption (same 2.5% commission structure as airlines)
• Retailers pay only on redemption — no upfront cost
• DutyBoost takes platform fee from retailer transaction volume
• Shore excursion desks can be enrolled as distribution points (physical voucher handout + digital)

WHY CRUISE LINES CARE:
• Average port stop: 6–8 hours per passenger, €80–€200 discretionary spend potential
• Conversion 15% of 3,000 pax (mid-size ship) = 450 conversions
• Avg spend €75 = €33,750 gross per port call
• Commission 2.5% = ~€844 / Cruise line share 20% = ~€169 per port call
• At 180 port calls/year per ship: ~€30,000 passive revenue per vessel
• Fleet of 10 ships: ~€300,000 annual incremental revenue
• Data value: port retail behaviour, category spend, dwell time patterns

AIRPORT CONNECTION:
• Cruise passengers often fly in 1–2 days before embarkation → DutyBoost airport voucher is generated at flight booking, redeemable at departure airport AND the cruise home port retail zone.
• Creates a seamless travel retail loop: fly → airport shop → board → port shop — all under one DutyBoost platform.

KEY DIFFERENTIATORS vs. Airline:
• Longer dwell time per location (hours vs. minutes at airport)
• Higher average transaction value (souvenirs, jewellery, spirits)
• Shore excursion desk as physical distribution channel (not only digital)
• Cabin-level personalisation (cabin number = identity, no app needed)

KEY MESSAGE: Do not say "we help port shops." Say: "We turn every port stop into a measurable retail revenue event for the cruise line."

ROLLOUT:
Phase 1 — Pilot with one cruise line, one home port, two partnered retailers. Digital voucher via embarkation email.
Phase 2 — Expand to 3–5 port stops per itinerary with pre-loaded destination vouchers per port.
Phase 3 — Onboard integration: cabin TV shore excursion screen, loyalty app, physical shore excursion desk cards.
Phase 4 — Cross-channel: fly-cruise packages where airport DutyBoost voucher and port DutyBoost voucher are unified in one wallet.`,
    pages: [
      { label: "Cruise Showcase", path: "/cruise-showcase" },
      { label: "Cruise Portal", path: "/cruise-portal" },
      { label: "Cruise Signup", path: "/cruise-signup" },
      { label: "Demo Cruise Dashboard", path: "/demo/cruise" },
    ],
    howToRestore: [
      "In pages/SelectUserType.jsx: re-add the cruise option (id: 'cruise') back to the options array.",
      "In pages/LandingPage.jsx: re-add CruiseShipIcon to the AdditionalIcons array for the 'agencies' stakeholder card.",
      "Create pages/CruiseShowcase.jsx — a public-facing pitch page for cruise line partnerships (mirrors AgencyShowcase/RetailerShowcase structure).",
      "Create pages/CruisePortal.jsx — a logged-in dashboard for cruise line partners: fleet overview, port call performance, passenger conversion, revenue share.",
      "Create pages/CruiseSignup.jsx — multi-step onboarding for cruise lines (company info, fleet size, home port, bank details, terms).",
      "Add 'Cruise Line' as a business_type option in the SignupApplication entity.",
      "Add a CruiseCredit entity (mirrors FnbDutyCredit) with fields: token_id, cabin_number, ship_name, port_of_call, balance, expiry, status.",
      "Add a CruiseTransaction entity (mirrors FnbTransaction) for port retail redemptions.",
      "Create pages/DemoCruiseDashboard.jsx — demo dashboard showing per-ship and per-port analytics.",
      "Add cruise demo card to pages/DemoLanding.jsx.",
      "Add cruise routes to App.jsx and a 'For Cruise Lines' entry in the LandingPage nav.",
      "Create functions/generateCruiseCredit.js — backend function triggered at cruise booking to issue a port retail voucher via email.",
      "Create components/CruisePortCallMap.jsx — map view of partnered ports with redemption heatmap.",
    ],
    files: [
      "pages/CruiseShowcase.jsx",
      "pages/CruisePortal.jsx",
      "pages/CruiseSignup.jsx",
      "pages/DemoCruiseDashboard.jsx",
      "components/CruisePortCallMap.jsx",
      "functions/generateCruiseCredit.js",
      "entities/CruiseCredit.json",
      "entities/CruiseTransaction.json",
    ],
  },
  {
    id: "train-travel",
    icon: Train,
    title: "Train Travel & Station Retail Integration",
    status: "hidden",
    reason: "Strategic future channel — business model defined, not yet built",
    description: `DutyBoost for train travel adapts the same loyalty-to-retail model to rail passengers. Intercity and international train travelers (Thalys, Eurostar, ICE, Intercity) dwell in large stations with significant retail footprints — but currently receive zero personalized purchase incentive. The positioning: "We turn every train journey into a station retail revenue event."

JOURNEY MAP:
• Booking → DutyCredit generated at booking confirmation (rail operator app, booking confirmation email, digital ticket)
• Departure station (pre-boarding window) → Passenger uses DutyCredit at a participating station retailer before boarding
• Arrival station (optional second window) → If international/long-distance, a second redemption window is unlocked at the destination station
• Return journey → Repeat cycle generates repeat station visits and repeat commission

INTEGRATION POINTS:
A. Post-booking (intent creation): "You've unlocked €X to spend at [station] shops before your train departs" — sent via booking confirmation or rail operator app.
B. Pre-boarding (conversion moment): Passenger scans QR at station retailer. Minimum spend threshold met (e.g. €50). Revenue generated for rail operator and DutyBoost.
C. Arrival / Return (optional loyalty loop): Returning passengers receive a new DutyCredit for their return leg, or a delayed credit valid on next trip.

BUSINESS MODEL:
• Rail operators earn a revenue share on each redemption (same commission structure as airlines/cruise)
• Station retailers pay only on redemption — no upfront cost, no tech investment required
• DutyBoost takes platform fee from retailer transaction volume
• Minimum spend threshold ensures only committed buyers convert (quality traffic, not browsing)
• OTA and rail booking platforms (Trainline, SNCF, NS, DB) can integrate via booking webhook

WHY RAIL OPERATORS CARE:
• Average station dwell time: 20–45 min (intercity), 90+ min (international e.g. Eurostar)
• 10 million+ passengers/year on major intercity corridors (e.g. Amsterdam–Paris, London–Brussels)
• Conversion estimate 8–12% of eligible passengers
• Avg spend €55 = meaningful gross per route per day
• Commission 2.5% → Rail operator share 20% → Passive revenue at scale with zero infrastructure cost
• Station retail partnerships already exist (NS Stations, SNCF Gares & Connexions, Eurostar St. Pancras) — DutyBoost plugs in as the demand-generation layer
• Data value: which stations drive spend, which categories convert, which routes have highest dwell-to-purchase ratio

KEY DIFFERENTIATORS vs. Airport:
• Shorter dwell window → higher urgency → higher conversion rate
• Domestic routes have higher booking frequency per passenger (weekly commuters, regular intercity users)
• Station retail is underserved vs. airport retail — lower baseline promotional activity = more incremental uplift
• Rail travelers are less price-sensitive at point of departure (running late, stressed, convenience-seeking)
• Corporate rail travel is high frequency → corporate DutyCredit programme opportunity (link to Business Travel module)

KEY DIFFERENTIATORS vs. Cruise:
• Higher booking frequency per passenger (monthly vs. once/twice per year)
• Smaller per-transaction amounts but much higher redemption volume
• OTA integration is more standardized (Trainline API, NS API, DB API are well-documented)
• No physical voucher needed — purely digital via booking confirmation

STATION RETAIL PARTNERS:
• Relay / WHSmith (books, snacks, press) — present in most European stations
• Starbucks / Pret A Manger (F&B) — already standard in major stations
• Rituals / Kiehl's / pharmacy chains (personal care) — high-ticket, high-margin
• Local artisan / regional specialty stores — high differentiation vs. airport offers

KEY MESSAGE: Do not say "we help station shops." Say: "We turn every departure into a measurable retail revenue event for the rail operator — without changing anything at the station."

ROLLOUT:
Phase 1 — Pilot with one rail operator (e.g. NS in Netherlands), one major station (Amsterdam Centraal), two category retailers. Digital voucher via booking confirmation email.
Phase 2 — Expand to international routes (Thalys/Eurostar) where dwell is longer and spend potential higher.
Phase 3 — OTA integration: Trainline, SNCF, DB — auto-generate DutyCredits for all bookings above a threshold ticket price.
Phase 4 — Corporate rail module: link to Business Travel programme for frequent corporate travelers on fixed routes.
Phase 5 — Return-leg loyalty: passengers receive a new DutyCredit for their return journey, creating a full round-trip retail loop.`,
    pages: [
      { label: "Train Showcase", path: "/train-showcase" },
      { label: "Train Portal", path: "/train-portal" },
      { label: "Train Signup", path: "/train-signup" },
      { label: "Demo Train Dashboard", path: "/demo/train" },
    ],
    howToRestore: [
      "In pages/SelectUserType.jsx: re-add the train option (id: 'train') back to the options array with icon TrainIcon, colors indigo/violet, path /train-showcase.",
      "In pages/LandingPage.jsx: re-add TrainIcon to the AdditionalIcons array for the 'agencies' stakeholder card.",
      "Create pages/TrainShowcase.jsx — public-facing pitch page for rail operator partnerships (mirror CruiseShowcase structure). Route: /train-showcase.",
      "Create pages/TrainPortal.jsx — logged-in dashboard for rail operator partners: route overview, station performance, passenger conversion, revenue share. Route: /train-portal.",
      "Create pages/TrainSignup.jsx — multi-step onboarding for rail operators (company info, key routes, main stations, bank details, terms). Route: /train-signup.",
      "Create pages/DemoTrainDashboard.jsx — demo dashboard showing per-route and per-station analytics. Route: /demo/train.",
      "Add 'Train Partner' as a business_type option in the SignupApplication entity.",
      "Create entities/TrainCredit.json — mirrors CruiseCredit but with fields: token_id, booking_ref, train_operator, departure_station, arrival_station, balance, expiry, status.",
      "Create entities/TrainTransaction.json — mirrors CruiseTransaction for station retail redemptions.",
      "Create functions/generateTrainCredit.js — backend function triggered at train booking to issue a station retail voucher via email.",
      "Add a TrainIcon component (use Train icon from lucide-react, or a custom SVG).",
      "Add train card to pages/SelectUserType.jsx (same pattern as cruise card). Color: indigo/violet.",
      "Add train demo card to pages/DemoLanding.jsx.",
      "Add train routes to App.jsx and a 'For Rail Partners' entry in the LandingPage nav.",
      "Create components/TrainStationMap.jsx — map view of partnered stations with redemption heatmap (mirror CruisePortCallMap).",
    ],
    files: [
      "pages/TrainShowcase.jsx",
      "pages/TrainPortal.jsx",
      "pages/TrainSignup.jsx",
      "pages/DemoTrainDashboard.jsx",
      "components/TrainStationMap.jsx",
      "functions/generateTrainCredit.js",
      "entities/TrainCredit.json",
      "entities/TrainTransaction.json",
    ],
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