// HIDDEN FEATURE — DutyBoost Status Tiers (gamification layer)
// Not connected to any live data. Ready to activate when business model is confirmed.
// To enable: import and render this component inside TravelerApp.jsx

import { Badge } from "@/components/ui/badge";
import { Star, Zap, Crown, Diamond, Lock, ChevronRight } from "lucide-react";

const TIERS = [
  {
    name: "Explorer",
    icon: Star,
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
    gradient: "from-amber-400 to-amber-600",
    trips: 0,
    tripsRequired: 0,
    incentiveBonus: "+0%",
    perks: [
      "Standard DutyCredit on every booking",
      "Access to all participating F&B outlets",
      "Transaction history in app",
    ],
  },
  {
    name: "Voyager",
    icon: Zap,
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
    gradient: "from-blue-400 to-blue-600",
    trips: 5,
    tripsRequired: 5,
    incentiveBonus: "+2%",
    perks: [
      "2% bonus on DutyCredit incentive",
      "Early access to new airport outlets",
      "Priority QR processing",
    ],
  },
  {
    name: "Elite",
    icon: Crown,
    color: "text-purple-600",
    bg: "bg-purple-50",
    border: "border-purple-200",
    gradient: "from-purple-400 to-purple-600",
    trips: 15,
    tripsRequired: 15,
    incentiveBonus: "+5%",
    perks: [
      "5% bonus on DutyCredit incentive",
      "Access to premium lounge partners",
      "Exclusive Elite-only retail offers",
      "Dedicated support channel",
    ],
  },
  {
    name: "Platinum",
    icon: Diamond,
    color: "text-slate-700",
    bg: "bg-slate-100",
    border: "border-slate-300",
    gradient: "from-slate-500 to-slate-700",
    trips: 30,
    tripsRequired: 30,
    incentiveBonus: "+10%",
    perks: [
      "10% bonus on every DutyCredit",
      "Platinum-exclusive airport retail deals",
      "Concierge DutyCredit top-ups",
      "Annual travel summary report",
      "First access to partner airline perks",
    ],
  },
];

export default function TravelerStatusTiers({ currentTrips = 0 }) {
  const currentTier = [...TIERS].reverse().find(t => currentTrips >= t.tripsRequired) || TIERS[0];
  const nextTier = TIERS.find(t => t.tripsRequired > currentTrips);
  const tripsToNext = nextTier ? nextTier.tripsRequired - currentTrips : 0;
  const progressPct = nextTier
    ? Math.min(((currentTrips - currentTier.tripsRequired) / (nextTier.tripsRequired - currentTier.tripsRequired)) * 100, 100)
    : 100;

  const CurrentIcon = currentTier.icon;

  return (
    <div className="space-y-5">
      {/* Current status card */}
      <div className={`relative bg-gradient-to-br ${currentTier.gradient} rounded-3xl p-6 text-white overflow-hidden shadow-lg`}>
        <div className="absolute -top-6 -right-6 w-32 h-32 bg-white/10 rounded-full pointer-events-none" />
        <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-black/10 rounded-full pointer-events-none" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
              <CurrentIcon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs opacity-70 uppercase tracking-wider">DutyBoost Status</p>
              <p className="text-2xl font-heading font-bold">{currentTier.name}</p>
            </div>
          </div>
          <p className="text-3xl font-heading font-bold mb-1">{currentTrips} <span className="text-base opacity-70 font-normal">trips</span></p>
          <p className="text-sm opacity-80">Incentive bonus: <strong>{currentTier.incentiveBonus}</strong></p>

          {nextTier && (
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs opacity-80 mb-1">
                <span>{currentTier.name}</span>
                <span>{nextTier.name} in {tripsToNext} trip{tripsToNext !== 1 ? "s" : ""}</span>
              </div>
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-white/70 rounded-full transition-all" style={{ width: `${progressPct}%` }} />
              </div>
            </div>
          )}
          {!nextTier && (
            <Badge className="mt-3 bg-white/20 text-white border-white/30 text-xs">✦ Maximum Status Reached</Badge>
          )}
        </div>
      </div>

      {/* Tier list */}
      <div className="space-y-3">
        <h3 className="font-heading font-semibold text-sm px-1">All Status Tiers</h3>
        {TIERS.map((tier) => {
          const Icon = tier.icon;
          const isUnlocked = currentTrips >= tier.tripsRequired;
          const isCurrent = tier.name === currentTier.name;
          return (
            <div key={tier.name} className={`bg-card border rounded-2xl p-4 flex items-center gap-4 ${isCurrent ? `${tier.border} border-2` : "border-border"} ${!isUnlocked ? "opacity-60" : ""}`}>
              <div className={`w-10 h-10 rounded-xl ${tier.bg} flex items-center justify-center shrink-0`}>
                {isUnlocked
                  ? <Icon className={`w-5 h-5 ${tier.color}`} />
                  : <Lock className="w-4 h-4 text-muted-foreground" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm">{tier.name}</span>
                  {isCurrent && <Badge className={`text-xs ${tier.bg} ${tier.color} ${tier.border}`}>Current</Badge>}
                  <span className="text-xs text-muted-foreground ml-auto">{tier.incentiveBonus} bonus</span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {tier.tripsRequired === 0 ? "Starting tier" : `Unlocks at ${tier.tripsRequired} trips`}
                </p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
            </div>
          );
        })}
      </div>

      {/* Perks of current tier */}
      <div className="bg-card border border-border rounded-2xl p-5">
        <h3 className="font-heading font-semibold text-sm mb-3">Your {currentTier.name} perks</h3>
        <ul className="space-y-2">
          {currentTier.perks.map((perk) => (
            <li key={perk} className="flex items-start gap-2 text-sm text-muted-foreground">
              <div className={`w-1.5 h-1.5 rounded-full mt-1.5 bg-gradient-to-r ${currentTier.gradient} shrink-0`} />
              {perk}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}