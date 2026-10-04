import { SlideWrapper, GridBg, SlideHeader, CARD } from "@/components/phygrid-pitch/Shared";
import { Plug, ToggleRight, CheckCircle2, Zap, ShieldCheck } from "lucide-react";

export default function SlideSimplicity() {
  const steps = [
    { step: "1", title: "One endpoint", desc: "Phygrid adds a single DutyBoost API call to its existing POS integration — one HTTPS request at checkout." },
    { step: "2", title: "Stores toggle on", desc: "Each participating store activates DutyBoost from a toggle. No per-store development, no code changes." },
    { step: "3", title: "No hardware, no downtime", desc: "Works with the terminals, networks and POS stack already in place. Nothing is replaced or migrated." },
    { step: "4", title: "Toggle off anytime", desc: "If a store opts out, the feature simply switches off — zero residual impact on the operation." },
  ];

  const nots = [
    "Not a POS replacement — it sits alongside your existing stack",
    "No PCI burden — DutyBoost never touches card data",
    "No data migration and no store-side development",
    "No impact on ordinary, non-DutyBoost transactions",
  ];

  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <SlideHeader
            eyebrow="Integration Simplicity"
            title={<>Non-Invasive. <span className="text-[#00E5FF]">Toggle-Only. One Call.</span></>}
            subtitle="DutyBoost enters at the POS layer as an opt-in feature. Integrate once, then deploy across every store, airport and market Phygrid serves — without touching the core platform."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className={`${CARD} p-5 md:p-6`}>
              <div className="flex items-center gap-3 mb-4">
                <ToggleRight className="w-7 h-7 text-[#00E5FF]" />
                <h3 className="font-bold text-white text-base md:text-lg">How It Works</h3>
              </div>
              <div className="space-y-4">
                {steps.map((s) => (
                  <div key={s.step} className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-[#00E5FF] flex items-center justify-center text-[#0a0b0d] text-xs font-bold flex-shrink-0 mt-0.5">
                      {s.step}
                    </div>
                    <div>
                      <div className="text-white font-semibold text-sm">{s.title}</div>
                      <div className="text-slate-400 text-xs mt-0.5 leading-relaxed">{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className={`${CARD} p-5`}>
                <div className="flex items-center gap-2 mb-3">
                  <ShieldCheck className="w-5 h-5 text-[#00E5FF]" />
                  <h3 className="font-bold text-white">Why It's Non-Invasive</h3>
                </div>
                <div className="space-y-2">
                  {nots.map((n) => (
                    <div key={n} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#00E5FF] flex-shrink-0 mt-0.5" />
                      <span className="text-slate-300 text-sm">{n}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl p-5 bg-gradient-to-br from-[#00E5FF] to-cyan-500 text-[#0a0b0d]">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-5 h-5" />
                  <h3 className="font-bold">Integrate Once. Deploy Repeatedly.</h3>
                </div>
                <p className="text-[#0a0b0d]/80 text-sm leading-relaxed">
                  A single integration enables DutyBoost across every store in Phygrid's network — fundamentally better scaling economics than per-retailer work.
                </p>
                <div className="mt-3 flex items-center gap-2 text-[#0a0b0d] text-sm font-semibold">
                  <Plug className="w-4 h-4" />
                  <span>1 API call → unlimited store activation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}