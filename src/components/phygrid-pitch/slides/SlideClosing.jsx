import { Cpu, TrendingUp, Store } from "lucide-react";
import DutyBoostLogo from "@/components/DutyBoostLogo";
import PositioningLine from "@/components/shared/PositioningLine";
import { SlideWrapper, GridBg, Glow } from "@/components/phygrid-pitch/Shared";
import { ESTATE, PER_STORE, usdShort } from "@/components/phygrid-pitch/model";

const CARDS = [
  {
    Icon: Cpu,
    title: "One Activation",
    desc: "Flip the DutyBoost switch in your POS dashboard — no integration programme required.",
  },
  {
    Icon: TrendingUp,
    title: "Commission Per Sale",
    desc: "Earn a share of the platform fee on every validated transaction across your estate.",
  },
  {
    Icon: Store,
    title: "A Better Retailer Offer",
    desc: "Bring your retailers incremental revenue they cannot create alone, at zero cost to them.",
  },
];

export default function SlideClosing() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-4 md:px-12 md:py-4 relative">
        <GridBg />
        <Glow className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]" />
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="bg-white rounded-2xl px-5 py-2 shadow-2xl border border-slate-200 mb-3">
            <DutyBoostLogo height={38} linkTo={null} />
          </div>

          <PositioningLine hero size="xl" className="max-w-4xl mb-3" />

          <div className="mb-2.5">
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">Thank You</span>
            <h2 className="text-xl md:text-2xl font-heading font-bold text-[#0a0f1e] mt-1 leading-tight">
              Activate DutyBoost.{" "}
              <span className="text-blue-600">Turn the 73% Into Your Estate's Revenue.</span>
            </h2>
          </div>

          <p className="text-slate-600 text-sm max-w-3xl leading-snug mb-3">
            The estate is already there — 5,100+ outlets, ~2.5B travellers, and 73% of them leaving without a
            purchase. DutyBoost activates those travellers before they reach the airport and settles every
            transaction through the POS you already run. One activation, no upfront cost, and a commission on
            every incremental sale.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 max-w-3xl w-full mb-3">
            {CARDS.map((card) => (
              <div key={card.title} className="bg-slate-50 border border-slate-200 rounded-2xl p-3 text-left">
                <card.Icon className="w-6 h-6 mb-1 text-blue-600" />
                <div className="text-blue-700 font-bold text-sm mb-0.5">{card.title}</div>
                <div className="text-slate-600 text-xs leading-snug">{card.desc}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-6 mb-3 w-full max-w-2xl">
            {[
              { label: "Stores (illustrative estate)", value: ESTATE[1].toLocaleString("en-US") },
              { label: "POS commission per year", value: usdShort(PER_STORE.pos * ESTATE[1]) },
              { label: "Upfront cost", value: "$0" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-base sm:text-2xl font-bold text-blue-600">{s.value}</div>
                <div className="text-xs sm:text-sm text-slate-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl px-5 py-3 text-white max-w-2xl bg-gradient-to-br from-blue-600 to-indigo-700">
            <p className="font-bold text-sm md:text-base leading-snug mb-0.5">
              Ready to put DutyBoost in front of every retailer running your POS?
            </p>
            <p className="text-blue-50 text-xs">
              Performance-based. Zero upfront cost. One API call, and the whole estate is live.
            </p>
          </div>

          <div className="mt-4 text-slate-500 text-[10px]">
            CONFIDENTIAL — 2026 | Chamber of Commerce: 42053181 | VAT: NL869492068B01
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}