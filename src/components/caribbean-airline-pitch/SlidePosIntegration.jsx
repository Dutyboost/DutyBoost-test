import { Fragment } from "react";
import { ChevronRight, Store, CheckCircle } from "lucide-react";
import { POS, SlideShell } from "./Shared";

export default function SlidePosIntegration() {
  const flow = ["Receive DutyCredits", "Arrive", "Visit Caribbean Duty Free", "Redeem", "Purchase"];

  return (
    <SlideShell
      eyebrow="Position 3 — POS Integration"
      eyebrowColor={POS}
      title={<>POS Integration Opens the Retailer <span style={{ color: POS }}>to Everyone</span></>}
      subtitle="POS integration takes the opportunity beyond Caribbean Airlines passengers."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-4">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
            <h3 className="text-slate-800 font-semibold mb-3">A traveller flying to Trinidad on another airline can</h3>
            <div className="space-y-2">
              {flow.map((step, i) => (
                <Fragment key={step}>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0" style={{ background: POS }}>
                      {i + 1}
                    </div>
                    <span className="text-slate-700 text-sm font-medium">{step}</span>
                  </div>
                  {i < flow.length - 1 && <div className="ml-3 w-px h-2.5 bg-slate-300" />}
                </Fragment>
              ))}
            </div>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
            <p className="text-slate-700 text-sm leading-relaxed">
              Caribbean Duty Free acquires customers from the <span className="font-bold">wider DutyBoost traveller ecosystem</span> — not
              only from Caribbean Airlines passengers.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 justify-center">
          <div className="rounded-2xl p-6 text-white" style={{ background: `linear-gradient(135deg, ${POS} 0%, #78350f 100%)` }}>
            <div className="text-sm font-semibold uppercase tracking-widest opacity-80 mb-2">Retailer economics</div>
            <div className="text-4xl md:text-5xl font-bold mb-2">2.5%</div>
            <p className="text-white/90 text-sm leading-relaxed">
              Platform fee on applicable DutyBoost-generated transactions — the same fee structure, applied to a far larger pool of
              travellers.
            </p>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
            <div className="flex items-start gap-3">
              <Store className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: POS }} />
              <div>
                <div className="text-slate-800 font-semibold text-sm mb-1">One integration, every airline</div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  With POS integration in place, any DutyBoost traveller arriving at Piarco or Tobago can redeem at Caribbean Duty Free —
                  regardless of who they flew with.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 mt-3">
              <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-green-600" />
              <p className="text-slate-600 text-sm leading-relaxed">
                No change to shelf prices, and no fee on sales that do not come through DutyBoost.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SlideShell>
  );
}