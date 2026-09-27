import { ToggleRight, Plug, Shield, Zap, Cpu, CheckCircle } from "lucide-react";
import { SlideWrapper, GridBg } from "./Shared";

export default function SlidePosToggle() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">Technical Approach</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              Non-Invasive. <span className="text-blue-600">Toggle-Only. POS-Level.</span>
            </h2>
            <p className="text-slate-500 mt-2 text-sm">DutyBoost enters at the POS layer as an opt-in feature — no new hardware, no POS overhaul, no disruption to existing operations.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-5">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <ToggleRight className="w-9 h-9 text-blue-600" />
                <h3 className="font-bold text-slate-800 text-xl">How the Toggle Works</h3>
              </div>
              <div className="flex-1 flex flex-col justify-between gap-4">
                {[
                  { step: "1", title: "POS Provider integrates once", desc: "A single API call adds DutyBoost as a feature to the POS platform" },
                  { step: "2", title: "Each retailer toggles on", desc: "Participating retailers activate DutyBoost with a toggle — no code changes per store" },
                  { step: "3", title: "Toggle off anytime", desc: "If a retailer opts out, the toggle simply switches off — zero residual impact" },
                  { step: "4", title: "No hardware, no downtime", desc: "Works with existing POS infrastructure — no new terminals, no new network" },
                ].map((s) => (
                  <div key={s.step} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-0.5">{s.step}</div>
                    <div>
                      <div className="text-slate-800 font-semibold text-base">{s.title}</div>
                      <div className="text-slate-500 text-sm leading-relaxed">{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <h3 className="font-bold text-blue-900">Why It's Non-Invasive</h3>
                </div>
                <div className="space-y-2">
                  {[
                    "No changes to shelf prices or existing sales flow",
                    "No new hardware, terminals, or network infrastructure",
                    "No POS system overhaul — existing system stays intact",
                    "No impact on non-DutyBoost transactions",
                    "No data migration or retailer-side development",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-5 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-5 h-5" />
                  <h3 className="font-bold">Integrate Once. Deploy Repeatedly.</h3>
                </div>
                <p className="text-blue-50 text-sm leading-relaxed">
                  A single Enterprise POS integration enables DutyBoost across multiple retailers, stores, airports and geographic markets — fundamentally better scaling economics than per-retailer integrations.
                </p>
                <div className="mt-3 flex items-center gap-2 text-blue-100 text-sm font-semibold">
                  <Cpu className="w-4 h-4" />
                  <Plug className="w-4 h-4" />
                  <span>1 API call → unlimited retailer activation</span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4">
            <p className="text-slate-700 text-sm font-medium">
              <span className="font-bold">Design principle:</span> DutyBoost is an activation layer, not a replacement layer. It sits alongside existing POS operations and can be toggled on or off without affecting any existing functionality.
            </p>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}