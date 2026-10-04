import DutyBoostLogo from "@/components/DutyBoostLogo";
import { SlideWrapper, GridBg, Glow } from "@/components/phygrid-pitch/Shared";
import { PER_STORE, usd2, usd } from "@/components/phygrid-pitch/model";

const CARDS = [
  {
    title: "A New Feature in Your POS",
    desc: "DutyBoost appears as a toggle in your existing POS dashboard. No development, no integration project, no rollout plan.",
  },
  {
    title: "Your Estate Starts Earning",
    desc: `Once switched on, every connected store can redeem DutyCredits immediately — ${usd2(PER_STORE.pos)} per store, per year, at the modelled activation rate.`,
  },
  {
    title: "A Retailer Offer, Not a Cost",
    desc: "You bring retailers incremental revenue they cannot generate on their own, on top of the POS you already sell them.",
  },
  {
    title: "Switch Off Anytime",
    desc: "No lock-in, no cancellation fees, no commitments. If it does not perform, you turn it off.",
  },
];

export default function SlideGetStarted() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-5 md:px-12 md:py-5 relative">
        <GridBg />
        <Glow className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]" />
        <div className="relative z-10 text-center">
          <div className="flex justify-center mb-3">
            <div className="bg-white rounded-2xl px-6 py-2 shadow-xl border border-slate-200">
              <DutyBoostLogo height={42} linkTo={null} />
            </div>
          </div>
          <div className="mb-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">
              Value Realized Quickly
            </span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-1.5 leading-tight">
              Switch It On.<br />
              <span className="text-blue-600">Start Earning. Switch Off Anytime.</span>
            </h2>
          </div>
          <p className="text-slate-600 text-base max-w-3xl mx-auto leading-relaxed mb-4">
            DutyBoost appears as a new feature in your existing POS dashboard — not a project to implement. No
            integration programme, no rollout, no operational change. You switch it on and incremental revenue
            starts flowing across every store on the estate.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-5xl mx-auto mb-4">
            {CARDS.map((card) => (
              <div key={card.title} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left">
                <div className="text-blue-700 font-bold text-sm mb-1">{card.title}</div>
                <div className="text-slate-600 text-xs leading-snug">{card.desc}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <p className="text-base md:text-lg font-bold text-blue-600">
              No setup fee. No subscription. No implementation. Switch it on — earn. Switch it off — stop.
            </p>
            <p className="text-slate-700 text-sm md:text-base font-semibold">
              Always performance-based: {usd(PER_STORE.fee)} of platform fee per store per year at the modelled
              rate, of which {usd2(PER_STORE.pos)} is yours.
            </p>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}