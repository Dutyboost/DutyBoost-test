import { Plane, Store, Cpu } from "lucide-react";
import { PARTNER, POS, RETAIL, SlideShell } from "./Shared";

export default function SlideWhyItMatters() {
  const steps = [
    { Icon: Plane, color: PARTNER, title: "The airline activates", desc: "Caribbean Airlines uses its existing passenger relationship to activate travellers with DutyCredits." },
    { Icon: Store, color: RETAIL, title: "The retailer converts", desc: "Caribbean Duty Free converts those activated travellers into incremental sales." },
    { Icon: Cpu, color: POS, title: "POS opens the door", desc: "POS integration opens the retailer to DutyBoost travellers arriving from other airlines." },
  ];

  return (
    <SlideShell
      eyebrow="Why This Matters"
      title={<>Caribbean Airlines Does Not Have to Choose <span style={{ color: RETAIL }}>Between Its Airline Business and Its Retail Business</span></>}
      subtitle="DutyBoost connects the two."
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
        {steps.map((s, i) => (
          <div key={s.title} className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${s.color}1a` }}>
                <s.Icon className="w-5 h-5" style={{ color: s.color }} />
              </div>
              <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">Step {i + 1}</span>
            </div>
            <div className="font-heading font-bold text-[#0a0f1e] mb-1.5">{s.title}</div>
            <p className="text-slate-600 text-sm leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl p-6 text-white" style={{ background: "linear-gradient(135deg, #952d8b 0%, #0e7490 100%)" }}>
        <div className="text-sm font-semibold uppercase tracking-widest opacity-80 mb-2">In one sentence</div>
        <p className="text-xl md:text-2xl font-bold leading-snug">
          Caribbean Airlines can earn from bringing the traveller into the ecosystem, while Caribbean Duty Free earns from converting that
          traveller into a purchase.
        </p>
        <p className="text-white/80 text-sm mt-3">That is the triple-sided value of DutyBoost for Caribbean Airlines.</p>
      </div>
    </SlideShell>
  );
}