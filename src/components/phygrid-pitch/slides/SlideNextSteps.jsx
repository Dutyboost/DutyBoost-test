import { SlideWrapper, GridBg, SlideHeader, CARD } from "@/components/phygrid-pitch/Shared";
import { Rocket } from "lucide-react";

export default function SlideNextSteps() {
  const steps = [
    { step: "01", title: "Technical discovery", desc: "A 45-minute session with Phygrid's engineering team to map the checkout flow inside Avolta stores and confirm the integration point." },
    { step: "02", title: "Sandbox access", desc: "DutyBoost provides test credentials and documentation so Phygrid can validate the call in a non-production environment." },
    { step: "03", title: "Pilot with one Avolta store", desc: "Go live in a single store to measure validation volume, basket lift and commission flow against the model in this deck." },
    { step: "04", title: "Commercial agreement", desc: "Formalise the 10% platform-fee share and scale the toggle across the Avolta estate." },
  ];

  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <SlideHeader
            eyebrow="Next Steps"
            title={<>From Meeting <span className="text-[#00E5FF]">to Live Transaction</span></>}
            subtitle="A low-risk path with no commitment until a pilot proves the numbers inside Phygrid's own environment and Avolta's own stores."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
            {steps.map((s) => (
              <div key={s.step} className={`${CARD} p-5 flex flex-col`}>
                <div className="text-3xl font-heading font-bold text-[#00E5FF]/40 mb-3">{s.step}</div>
                <div className="text-white font-semibold text-sm mb-2">{s.title}</div>
                <div className="text-slate-400 text-xs leading-relaxed">{s.desc}</div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl p-5 bg-gradient-to-r from-[#00E5FF]/15 to-transparent border border-[#00E5FF]/30 flex items-start gap-4">
            <Rocket className="w-6 h-6 text-[#00E5FF] flex-shrink-0 mt-0.5" />
            <p className="text-slate-200 text-sm md:text-base leading-relaxed">
              <span className="font-bold text-white">Nothing is committed before step 3.</span> Steps 1 and 2 require no commercial agreement — they simply establish that the integration works inside Phygrid's stack.
            </p>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}