import { Fragment } from "react";
import { ChevronRight, Wifi, CheckCircle } from "lucide-react";
import { CAL_DF_SITE, RETAIL, SlideShell } from "./Shared";

export default function SlideRetailer() {
  const flow = ["Activate", "Pre-order", "Arrive", "Collect"];

  return (
    <SlideShell
      eyebrow="Position 2 — Retailer"
      eyebrowColor={RETAIL}
      title={<>Caribbean Duty Free <span style={{ color: RETAIL }}>Converts Activated Travellers</span></>}
      subtitle={<>DutyBoost can simultaneously be integrated into the <a href={CAL_DF_SITE} target="_blank" rel="noopener noreferrer" className="font-semibold underline decoration-current/50" style={{ color: RETAIL }}>Caribbean Duty Free pre-order environment</a>.</>}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-4">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
            <h3 className="text-slate-800 font-semibold mb-3">From Activation to Purchase</h3>
            <div className="flex flex-wrap items-center gap-1.5">
              {flow.map((step, i) => (
                <Fragment key={step}>
                  <div className="rounded-xl px-3 py-2 text-xs font-semibold text-white" style={{ background: RETAIL }}>
                    {step}
                  </div>
                  {i < flow.length - 1 && <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />}
                </Fragment>
              ))}
            </div>
            <p className="text-slate-600 text-sm leading-relaxed mt-3">
              Travellers are activated before arrival and encouraged to pre-order, with their DutyCredits providing an additional purchase
              incentive.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <Wifi className="w-5 h-5 flex-shrink-0" style={{ color: RETAIL }} />
              <h3 className="text-slate-800 font-semibold">Extends into the aircraft</h3>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              The same journey can continue in the air through inflight Wi-Fi or passenger connectivity — activating travellers while they
              are still captive, hours before arrival.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-2xl p-6 text-white flex-1 flex flex-col justify-center" style={{ background: `linear-gradient(135deg, ${RETAIL} 0%, #6b1f66 100%)` }}>
            <div className="text-sm font-semibold uppercase tracking-widest opacity-80 mb-2">Caribbean Duty Free pays</div>
            <div className="text-4xl md:text-5xl font-bold mb-2">2.5%</div>
            <p className="text-white/90 text-sm leading-relaxed">
              DutyBoost platform fee on applicable transactions generated through the DutyBoost retailer programme.
            </p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-green-600" />
              <p className="text-slate-700 text-sm leading-relaxed">
                <span className="font-bold">No traditional upfront customer-acquisition cost.</span> The platform fee is connected to the
                resulting commercial activity — it is earned by DutyBoost only when the sale happens.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SlideShell>
  );
}