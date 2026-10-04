import { SlideWrapper, GridBg, Glow, SlideHeader, CARD } from "@/components/phygrid-pitch/Shared";
import { RATIO, PER_STORE, eur } from "@/components/phygrid-pitch/model";
import { Maximize2, Users, Cpu, Euro, ArrowRight, Landmark, Receipt } from "lucide-react";

export default function SlideFootprint() {
  const points = [
    {
      Icon: Users,
      title: "You already sit inside the stores",
      desc: "Phygrid connects in-store devices to POS and enterprise systems — the exact point where an incremental sale is validated.",
    },
    {
      Icon: Cpu,
      title: "Validation is a single call",
      desc: "One HTTPS request confirms the DutyCredit and returns the discount. Nothing in Phygrid's core platform changes.",
    },
    {
      Icon: Euro,
      title: "The retailer gains far more than Phygrid earns",
      desc: `On identical transactions the retailer nets €${RATIO} for every €1 Phygrid earns — a ratio that makes DutyBoost an easy yes inside the retailer relationship.`,
    },
    {
      Icon: Receipt,
      title: "Documented, per transaction",
      desc: "Every validated basket is attributed and reported, so the incremental revenue DutyBoost creates inside those stores is measurable, not anecdotal.",
    },
  ];

  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <Glow className="top-0 right-0 w-[420px] h-[420px]" />
        <div className="relative z-10">
          <SlideHeader
            eyebrow="The Commercial Argument"
            title={<>Proven Value per Store Is <span className="text-blue-600">What Grows Phygrid's Footprint</span></>}
            subtitle="Phygrid does not have to argue for a bigger role in the store estate on capability alone. DutyBoost supplies the numbers: measured incremental retail revenue inside those stores, delivered through the POS layer Phygrid already runs."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            {points.map((p) => (
              <div key={p.title} className={`${CARD} p-5 flex items-start gap-4`}>
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center flex-shrink-0">
                  <p.Icon className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-[#0a0f1e] font-semibold text-sm md:text-base">{p.title}</div>
                  <div className="text-slate-500 text-xs md:text-sm mt-1 leading-relaxed">{p.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl p-5 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 flex items-start gap-4">
            <Maximize2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-slate-700 text-sm md:text-base leading-relaxed">
                <span className="font-bold text-[#0a0f1e]">Every store that proves {eur(PER_STORE.gross)} in DutyBoost-driven sales becomes the case for the next deployment.</span> Phygrid's commission is the smallest line in the equation — the real return is the commercial leverage it buys: additional stores, renewals and expanded scope.
              </p>
              <div className="mt-3 flex items-center gap-2 text-blue-700 text-xs md:text-sm font-semibold">
                <Landmark className="w-4 h-4 flex-shrink-0" />
                Phygrid arrives at the table with evidence, not a proposal.
                <ArrowRight className="w-4 h-4 flex-shrink-0" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}