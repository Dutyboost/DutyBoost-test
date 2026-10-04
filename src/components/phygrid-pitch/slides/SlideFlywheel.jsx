import { Cpu, BarChart3, Link2, Briefcase, Plane, Package, Store } from "lucide-react";
import { SlideWrapper, GridBg } from "@/components/phygrid-pitch/Shared";
import TravelerIcon from "@/components/TravelerIcon";
import AirportRetailerIcon from "@/components/AirportRetailerIcon";

const STEPS = [
  "More Travel & Corporate Partners",
  "More Travellers Reached",
  "More DutyCredits Distributed",
  "Travellers Self-Generate DutyCredits",
  "More Pre-Airport Activation",
  "More Participating Store Visits",
  "More Validated Transactions",
  "More POS Provider Commission",
  "More Retailer Revenue",
  "More Evidence of Commercial Value",
  "More Retailers Switching It On",
];

const EFFECTS = [
  { Icon: Briefcase, party: "More Travel & Corporate Partners", effect: "→ More travellers reached before airport arrival" },
  { Icon: TravelerIcon, party: "More Self-Generated DutyCredits", effect: "→ Travellers activate directly — no partner required" },
  { Icon: Store, party: "More Retailers Live", effect: "→ More redemption opportunities on the same POS" },
  { Icon: Cpu, party: "One POS Activation", effect: "→ Every connected store goes live at once" },
  { Icon: BarChart3, party: "More Validated Transactions", effect: "→ Stronger commercial evidence for the next retailer" },
  { Icon: Link2, party: "Stronger Evidence", effect: "→ Easier onboarding of the next estate" },
  { Icon: Plane, party: "More Airports", effect: "→ Higher non-aeronautical concession revenue" },
  { Icon: Package, party: "More Wholesale Suppliers", effect: "→ Faster stock rotation and reorder volume" },
];

export default function SlideFlywheel() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-6">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">The Growth Flywheel</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              A Self-Reinforcing <span className="text-blue-600">Circular Ecosystem</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
            <div className="relative flex items-center justify-center" style={{ height: "340px" }}>
              <div className="absolute inset-0 rounded-full border-2 border-blue-200" />
              <div className="bg-blue-600 border-2 border-blue-700 rounded-full w-28 h-28 flex flex-col items-center justify-center text-center z-10">
                <div className="text-white text-xs font-bold leading-tight px-2">
                  Performance-Based Customer Acquisition Infrastructure
                </div>
              </div>
              {STEPS.map((step, i) => {
                const angle = (i / STEPS.length) * 360 - 90;
                const rad = (angle * Math.PI) / 180;
                const r = 145;
                const x = 50 + (r / 3.4) * Math.cos(rad);
                const y = 50 + (r / 3.4) * Math.sin(rad);
                return (
                  <div
                    key={i}
                    className="absolute bg-blue-50 border border-blue-200 rounded-lg px-2 py-1 text-center"
                    style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)", maxWidth: "90px" }}
                  >
                    <div className="text-blue-700 text-xs font-semibold leading-tight">{step}</div>
                  </div>
                );
              })}
              <div
                className="absolute inset-0 rounded-full border-2 border-dashed border-blue-300 animate-spin"
                style={{ animationDuration: "30s" }}
              />
            </div>

            <div className="space-y-4">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                <h3 className="text-slate-800 font-bold mb-3">Network Effects by Participant</h3>
                <div className="space-y-2.5 text-sm">
                  {EFFECTS.map((row) => (
                    <div key={row.party} className="flex items-start gap-2">
                      <row.Icon className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="text-blue-700 font-semibold">{row.party} </span>
                        <span className="text-slate-600">{row.effect}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-5 text-white">
                <p className="font-bold text-lg leading-snug">
                  "A positive flywheel that creates growth for every stakeholder."
                </p>
                <p className="text-blue-100 text-sm mt-2">
                  Each new retailer on your POS makes DutyBoost more valuable for every retailer already on it —
                  and each new traveller makes the offer stronger for the next one.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}