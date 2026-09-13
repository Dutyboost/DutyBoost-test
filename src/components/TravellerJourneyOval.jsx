import { Cpu, Building2, PlaneTakeoff, Package, ShieldX, Rocket } from "lucide-react";
// TravellerJourneyOval — stakeholder ecosystem visual
import TravelAgencyIcon from "./TravelAgencyIcon";
import AirportRetailerIcon from "./AirportRetailerIcon";
import TravelerIcon from "./TravelerIcon";
import HotelIcon from "./HotelIcon";
import CarRentalIcon from "./CarRentalIcon";

// 6 stakeholders orbit the central Traveller's Transaction.
// DutyBoost is intentionally excluded from the oval layout.
const NODES = [
  { label: "POS Partners", Icon: Cpu, color: "violet", bg: "bg-violet-50", border: "border-violet-200", fg: "text-violet-600", extraIcons: [] },
  { label: "Airport Retailers", Icon: AirportRetailerIcon, color: "orange", bg: "bg-orange-50", border: "border-orange-200", fg: "text-orange-600", extraIcons: [] },
  { label: "Airport Partners", Icon: PlaneTakeoff, color: "cyan", bg: "bg-cyan-50", border: "border-cyan-200", fg: "text-cyan-600", extraIcons: [] },
  { label: "Wholesale / Suppliers", Icon: Package, color: "amber", bg: "bg-amber-50", border: "border-amber-200", fg: "text-amber-600", extraIcons: [] },
  { label: "Corporate Partners", Icon: Building2, color: "slate", bg: "bg-slate-50", border: "border-slate-200", fg: "text-slate-600", extraIcons: [] },
  { label: "Travel Partners", Icon: TravelAgencyIcon, color: "green", bg: "bg-green-50", border: "border-green-200", fg: "text-green-600", extraIcons: [HotelIcon, CarRentalIcon] },
];

export default function TravellerJourneyOval() {
  return (
    <section className="py-10 sm:py-14 px-4 sm:px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-6 space-y-2">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold border border-primary/20">
            The Circular Revenue Infrastructure for Global Travel
          </span>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold">Every Stakeholder Orbits the <span className="text-primary">Traveller Journey</span></h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
            One validated transaction connects every participant — each earning from the same traveller moment.
          </p>
        </div>

        {/* Why DutyBoost changes the game */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-5 flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
              <ShieldX className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-red-700 text-sm mb-1">In the actual situation</h3>
              <p className="text-red-700/80 text-xs leading-relaxed">
                Engagement only begins when the traveller clears security. By then the intent is set — 73% walk straight to the gate.
              </p>
            </div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-2xl p-5 flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
              <Rocket className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-green-700 text-sm mb-1">DutyBoost: Activated Before Arrival</h3>
              <p className="text-green-700/80 text-xs leading-relaxed">
                DutyBoost engages travellers before they reach the airport, turning the 73% who currently do not purchase into potential incremental customers and creating measurable value across the entire travel-retail ecosystem.
              </p>
            </div>
          </div>
        </div>

        {/* Oval diagram */}
        <div className="relative mx-auto w-full" style={{ maxWidth: "1000px", height: "640px" }}>
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 640" style={{ pointerEvents: "none", zIndex: 0 }}>
            {/* Oval track */}
            <ellipse cx="500" cy="320" rx="440" ry="250" fill="none" stroke="hsl(220 15% 90%)" strokeWidth="2" strokeDasharray="6 5" />
            <ellipse cx="500" cy="320" rx="440" ry="250" fill="none" stroke="hsl(220 100% 56% / 0.08)" strokeWidth="14" />

            {/* Radial connectors: hub ↔ each node */}
            {NODES.map((_, i) => {
              const angle = (i / NODES.length) * 360 - 90;
              const rad = (angle * Math.PI) / 180;
              const x = 500 + 440 * Math.cos(rad);
              const y = 320 + 250 * Math.sin(rad);
              return (
                <line key={i} x1="500" y1="320" x2={x} y2={y}
                  stroke="hsl(220 100% 56% / 0.25)" strokeWidth="1.5" strokeDasharray="4 4" />
              );
            })}
          </svg>

          {/* Central hub — Traveller's Transaction */}
          <div className="absolute z-20 flex flex-col items-center justify-center text-center rounded-full shadow-xl border-4 border-white"
            style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)", width: "320px", height: "320px", background: "linear-gradient(135deg, hsl(220 100% 56%), hsl(243 75% 60%))" }}>
            <TravelerIcon className="w-12 h-12 text-white mb-3" />
            <p className="font-heading font-bold text-white text-xl leading-tight px-6">Traveller's Transaction</p>
            <p className="text-white/80 text-sm mt-2 leading-snug px-6">The moment that connects them all</p>
            <p className="text-white/95 text-sm mt-2 leading-snug px-6 font-semibold">DutyBoost activates it days, weeks or even months before security.</p>
          </div>

          {/* Stakeholder nodes positioned on the oval */}
          {NODES.map((node, i) => {
            const angle = (i / NODES.length) * 360 - 90;
            const rad = (angle * Math.PI) / 180;
            const x = 50 + (440 / 10) * Math.cos(rad);
            const y = 50 + (250 / 6.4) * Math.sin(rad);
            return (
              <div key={node.label} className="absolute z-10"
                style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}>
                <div className={`flex flex-col items-center gap-2 ${node.bg} border ${node.border} rounded-2xl px-4 py-3 shadow-sm`} style={{ width: "170px" }}>
                  <div className="flex items-center gap-1">
                    <div className={`w-9 h-9 rounded-lg bg-white/80 flex items-center justify-center`}>
                      <node.Icon className={`w-5 h-5 ${node.fg}`} />
                    </div>
                    {node.extraIcons.map((AdIcon, idx) => (
                      <div key={idx} className={`w-9 h-9 rounded-lg bg-white/80 flex items-center justify-center`}>
                        <AdIcon className={`w-5 h-5 ${node.fg}`} />
                      </div>
                    ))}
                  </div>
                  <span className={`text-sm font-bold leading-tight text-center whitespace-nowrap`}>{node.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}