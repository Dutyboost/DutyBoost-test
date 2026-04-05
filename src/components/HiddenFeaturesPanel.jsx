import { Badge } from "@/components/ui/badge";
import { EyeOff, Briefcase, Trophy, Smartphone } from "lucide-react";

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
    id: "traveler-status",
    icon: Trophy,
    title: "DutyBoost Status Tiers (Traveler Gamification)",
    status: "hidden",
    reason: "Ready to activate — pending commercial decision",
    description: "Gamification layer in the Traveler App. Tracks trip count and rewards frequent travelers with Explorer → Voyager → Elite → Platinum tiers. Each tier unlocks higher incentive bonuses (+2% to +10%) and exclusive retail offers.",
    pages: [
      { label: "Traveler App (Status tab)", path: "/traveler" },
    ],
    howToRestore: [
      "In pages/TravelerApp.jsx: import TravelerStatusTiers from '../components/TravelerStatusTiers'.",
      "Add a 'Status' tab to the TABS array: { id: 'status', label: 'Status', icon: Trophy }.",
      "Add a tab content block rendering <TravelerStatusTiers currentTrips={transactions.length} />.",
    ],
    files: [
      "components/TravelerStatusTiers.jsx",
    ],
  },
  {
    id: "traveler-app",
    icon: Smartphone,
    title: "Mobile Traveler App",
    status: "live",
    reason: "Accessible at /traveler — not linked from public nav yet",
    description: "Mobile-first wallet app for employees/travelers. Shows DutyCredit balance, generates time-limited QR codes for F&B payment, transaction history, and outlet finder.",
    pages: [
      { label: "Traveler App", path: "/traveler" },
    ],
    howToRestore: [
      "Add a link to /traveler in the LandingPage or relevant pages to surface it to users.",
    ],
    files: [
      "pages/TravelerApp.jsx",
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
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>

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

              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Key Files</p>
                <div className="flex flex-wrap gap-2">
                  {feature.files.map((f) => (
                    <span key={f} className="text-xs font-mono bg-primary/5 text-primary px-2.5 py-1 rounded-lg border border-primary/20">{f}</span>
                  ))}
                </div>
              </div>

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