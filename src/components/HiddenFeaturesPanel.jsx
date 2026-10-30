import { Badge } from "@/components/ui/badge";
import { EyeOff, Briefcase, Plane, Package, Train, Bus, Store, Users, Building2 } from "lucide-react";

const HIDDEN_FEATURES = [
  {
    id: "travel-partner-calculator",
    icon: Users,
    title: "Travel Partner ROI Calculator (Tab Hidden)",
    status: "hidden",
    reason: "Not currently pursuing travel partners — tab hidden, code preserved for future re-enablement",
    description: `The Travel Partner ROI Calculator tab was hidden from the Retailer Calculator page. The full TravelPartnerTab component, including the vertical selector (flight, accommodation, car rental), booking sliders, conversion rate controls, and combined revenue projections, is still defined in src/pages/RetailerCalculator.jsx — it is just not rendered.`,
    pages: [
      { label: "Retailer Calculator", path: "/roi-calculator" },
    ],
    howToRestore: [
      "In src/pages/RetailerCalculator.jsx: re-add the useState for activeTab (const [activeTab, setActiveTab] = useState(\"retailer\")).",
      "In src/pages/RetailerCalculator.jsx: re-add the tab switcher JSX (two buttons: 'Airport Retailer' and 'Travel Partner') right before the <EnterpriseCalculator /> line.",
      "In src/pages/RetailerCalculator.jsx: replace <EnterpriseCalculator /> with the conditional: {activeTab === \"retailer\" ? <EnterpriseCalculator /> : <TravelPartnerTab t={t} />}.",
      "In src/pages/RetailerCalculator.jsx: re-add the Store icon to the lucide-react import if it was removed.",
    ],
    files: [
      "pages/RetailerCalculator.jsx",
    ],
  },
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
    id: "wholesale-suppliers",
    icon: Package,
    title: "Wholesale / Retail Suppliers",
    status: "hidden",
    reason: "Channel parked — pages still live at their routes, removed from the home page and partner-type chooser pending go-to-market",
    description: `The Wholesale / Retail Suppliers channel let brands and suppliers supply DutyBoost-listed products into participating airport retailers. It was promoted as a stakeholder card on the landing page and as a partner type on the Get Started page; both entries have been removed so the channel is no longer promoted publicly. The showcase, calculator and partner request pages still exist and remain reachable by their routes.

The supplier proposition: DutyBoost surfaces supplier products to pre-activated travellers at the point of sale — moving stock that would otherwise sit, at no listing cost, and earning the supplier incremental volume.

The cruise ship channel took this slot on the landing page and the Get Started chooser.`,
    pages: [
      { label: "Wholesale Showcase", path: "/wholesale-showcase" },
      { label: "Wholesale Calculator", path: "/wholesale-calculator" },
      { label: "Wholesale Partner Request", path: "/wholesale-partner-request" },
    ],
    howToRestore: [
      "In pages/LandingPage.jsx: re-add the wholesale stakeholder entry (key: 'wholesale', icon: Package, amber palette) to the stakeholders array.",
      "In pages/LandingPage.jsx: re-add the getWholesaleStrings import and the if (s.key === 'wholesale') title/description/benefits block.",
      "In pages/LandingPage.jsx: add 'wholesale' back to the isClickable condition and map it to '/wholesale-showcase' in cardLink.",
      "In pages/SelectUserType.jsx: re-add the wholesale option (id: 'wholesale', icon: Package, path: '/wholesale-showcase') to the options array.",
      "In pages/SelectUserType.jsx: add 'wholesale' back to the fromAgency exclusion list if travel-partner visitors should not see it.",
    ],
    files: [
      "pages/WholesaleShowcase.jsx",
      "pages/WholesaleCalculator.jsx",
      "pages/WholesalePartnerRequest.jsx",
      "lib/i18nWholesale.js",
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
  {
    id: "bus-trip",
    icon: Bus,
    title: "Bus Trip & Coach Station Retail Integration",
    status: "hidden",
    reason: "Strategic future channel — business model defined, not yet built",
    description: `DutyBoost for bus and coach travel extends the platform's loyalty-to-retail model to long-distance and intercity bus passengers. Coach travelers (FlixBus, Eurolines, National Express, regional operators) pass through bus terminals and coach stations with retail potential — but receive zero personalized purchase incentive today. The positioning: "We turn every coach departure into a station retail revenue event."

JOURNEY MAP:
• Booking → DutyCredit generated at booking confirmation (operator app, booking confirmation email, digital ticket)
• Departure terminal (pre-boarding window) → Passenger uses DutyCredit at a participating terminal retailer before boarding
• Arrival terminal (optional second window) → For long-distance routes, a second redemption window at the destination terminal

BUSINESS MODEL:
• Coach operators earn a revenue share on each redemption (same commission structure as rail/airline)
• Terminal retailers pay only on redemption — no upfront cost
• DutyBoost takes platform fee from retailer transaction volume
• OTA and coach booking platforms (FlixBus, Omio, BlaBlaBus) can integrate via booking webhook

WHY COACH OPERATORS CARE:
• Budget travelers are price-sensitive but respond strongly to free credits (high redemption intent)
• Major European coach corridors carry millions of passengers/year
• Coach terminals (Victoria Coach Station London, ZOB Berlin, Gare Routière Paris) have significant retail
• Zero infrastructure cost for operator — purely digital, webhook-based integration

KEY MESSAGE: Do not say "we help bus station shops." Say: "We turn every coach departure into a retail revenue event for the operator."

ROLLOUT:
Phase 1 — Pilot with one coach operator (e.g. FlixBus), one major terminal, two category retailers.
Phase 2 — Expand to international routes where dwell is longer.
Phase 3 — OTA integration: FlixBus, Omio — auto-generate DutyCredits for all bookings above a threshold ticket price.`,
    pages: [],
    howToRestore: [
      "Create pages/BusTripShowcase.jsx — public-facing pitch page for coach operator partnerships.",
      "Create pages/BusTripPortal.jsx — logged-in dashboard for coach operator partners.",
      "Create pages/BusTripSignup.jsx — multi-step onboarding for coach operators.",
      "Create pages/DemoBusTripDashboard.jsx — demo dashboard showing per-route and per-terminal analytics.",
      "Add 'Coach Partner' as a business_type option in the SignupApplication entity.",
      "Create a BusTripCredit entity (mirrors TrainCredit) with fields: token_id, booking_ref, coach_operator, departure_terminal, arrival_terminal, balance, expiry, status.",
      "Create a BusTripTransaction entity for terminal retail redemptions.",
      "Create functions/generateBusTripCredit.js — backend function triggered at coach booking to issue a terminal retail voucher via email.",
      "Add bus trip demo card to pages/DemoLanding.jsx.",
      "Add bus trip routes to App.jsx and a 'For Coach Partners' entry in the LandingPage nav.",
    ],
    files: [
      "pages/BusTripShowcase.jsx",
      "pages/BusTripPortal.jsx",
      "pages/BusTripSignup.jsx",
      "pages/DemoBusTripDashboard.jsx",
      "functions/generateBusTripCredit.js",
    ],
  },
  {
    id: "pos-eligibility-gate",
    icon: Store,
    title: "Retailer POS Eligibility Gate",
    status: "hidden",
    reason: "Feature built and wired — disabled until retail partners go live with DutyBoost POS integration",
    description: `DutyCredits are only truly redeemable at airports where a retail company operating there has implemented DutyBoost in their POS. This feature gates the eligibility check: when a traveler checks eligibility, the system looks up the departing airport's IATA code against the registry of retail companies that have gone live with DutyBoost (src/data/airportRetailCompanies.js). If a live retailer operates at that airport, the traveler is eligible. If not, they see a "not available at this airport yet" message with a notify-me CTA.

The logic lives in src/lib/retailerEligibility.js:
• POS_ELIGIBILITY_CHECK_ENABLED — master flag (false = any future departure qualifies, as today)
• DUTYBOOST_LIVE_RETAILERS — array of retail company names that have integrated DutyBoost into their POS
• isAirportDutyBoostEnabled(code) — returns true if any live retailer operates at the given IATA code

While the flag is false, the eligibility page behaves exactly as before. Flip it to true and populate DUTYBOOST_LIVE_RETAILERS as partners go live to enforce the gate.`,
    pages: [
      { label: "Eligibility Showcase", path: "/eligibility-showcase" },
    ],
    howToRestore: [
      "In src/lib/retailerEligibility.js: set POS_ELIGIBILITY_CHECK_ENABLED = true.",
      "In src/lib/retailerEligibility.js: add retail company names (matching AIRPORT_RETAIL_COMPANIES exactly) to DUTYBOOST_LIVE_RETAILERS as each partner goes live.",
      "Optionally wire the 'Notify me when live' button to a real signup/newsletter flow (currently links to /claim-duty-credit).",
    ],
    files: [
      "lib/retailerEligibility.js",
      "pages/EligibilityShowcase.jsx",
      "lib/i18nEligibility.js",
    ],
  },
  {
    id: "corporate-travel-partner",
    icon: Building2,
    title: "Corporate Travel Partner (Cost-Recovery Model)",
    status: "hidden",
    reason: "Pulled from the entire app pending go-to-market — cards, oval, chooser, showcase, calculator and dashboard all hidden",
    description: `A fourth travel-partner variant: companies with travelling employees onboard as a Corporate Travel Partner (not a buyer). They reuse the standard circular revenue model — the retailer still funds the 2.5% fee and the discount; the company pays nothing and earns a 20% share (0.5% of every validated airport basket) as T&E cost recovery.

The model adds a predictable, recurring traveller pool to the pipeline (each onboarded company = many scheduled business trips) without changing the money flow or requiring a Letter of Intent.

JOURNEY: Approve trip → issue DutyCredit via one snippet in the TMC/expense flow → employee redeems at a participating airport retailer → POS validates → DutyBoost attributes the redemption to the company → monthly commission payout.

This is intentionally distinct from the existing "business-travel" hidden feature (which is a corporate-funded / per-diem-replacement model). That older module remains its own hidden feature; this one is the partner/cost-recovery variant.

No Letter of Intent is used in this flow.

CURRENT STATE: hidden everywhere. The stakeholder card is gone from the landing page, the node is gone from the traveller journey oval and from the Travellers Transaction showcase, the option is gone from the Get Started chooser and from the request-more-information partner types, the admin sidebar no longer lists a Corporate Partner Dashboard, and the two deck entries were pulled from the pitch pipeline. Its routes are disabled, so the showcase, calculator, request form, one-pager, pitch deck and dashboard are no longer reachable by URL either. All page code and strings are untouched.`,
    pages: [
      { label: "Showcase (disabled)", path: "/corporate-partner-showcase" },
      { label: "Calculator (disabled)", path: "/roi-calculator-corporate-partner" },
      { label: "Request form (disabled)", path: "/corporate-partner-request" },
      { label: "One-Pager (disabled)", path: "/corporate-partner-one-pager" },
      { label: "Pitch Deck (disabled)", path: "/corporate-partner-pitch" },
      { label: "Partner Dashboard (disabled)", path: "/corporate-partner-dashboard" },
    ],
    howToRestore: [
      "In src/App.jsx: re-add the imports for CorporatePartnerShowcase, CorporatePartnerCalculator, CorporatePartnerRequest, CorporatePartnerOnePager and CorporatePartnerPitchDeck.",
      "In src/App.jsx: re-add the six routes (/corporate-partner-showcase, /roi-calculator-corporate-partner, /corporate-partner-request, /corporate-partner-one-pager, /corporate-partner-pitch, and /corporate-partner-dashboard rendered as <PartnerDashboard type=\"corporate\" />).",
      "In src/pages/LandingPage.jsx: re-add the 'corporate' entry to the stakeholders array (Building2 icon, slate palette), the if (s.key === 'corporate') block using eco.corporate + corporateOne, and 'corporate' to isClickable and cardLink → '/corporate-partner-showcase'.",
      "In src/components/TravellerJourneyOval.jsx and src/pages/TravellersTransactionShowcase.jsx: re-add the corporate node (Building2, slate palette, link /corporate-partner-showcase).",
      "In src/pages/SelectUserType.jsx: re-add the corporate option (id 'corporate', Building2 icon, slate palette, path /corporate-partner-showcase).",
      "In src/components/Layout.jsx: re-add the 'Corporate Partner Dashboard' admin nav item, its route in the demoPaths list, and the Briefcase import.",
      "In src/pages/RequestDemoPage.jsx: re-add 'Corporate Partners' to PARTNER_TYPES.",
      "In src/data/pitchPipeline.js: re-add the Corporate Partner deck and one-pager entries.",
      "Wire the onboarding flow (partner record → per-trip DutyCredit issuance → attribution → monthly payout) to the existing corporate pages (BusinessTravel / BusinessTravelGetStarted / CorporateTravelDashboard) — no LOI step.",
      "Add 'Corporate Partner' as a business_type option in the SignupApplication entity when opening self-serve signup.",
      "Strings live in src/lib/i18nCorporate.js under the `corporate` namespace (one-pager + pitch deck, all 6 languages).",
    ],
    files: [
      "pages/CorporatePartnerShowcase.jsx",
      "pages/CorporatePartnerCalculator.jsx",
      "pages/CorporatePartnerRequest.jsx",
      "pages/CorporatePartnerOnePager.jsx",
      "pages/CorporatePartnerPitchDeck.jsx",
      "components/calculator/CorporateTravelPartnerTab.jsx",
      "lib/i18nCorporate.js",
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