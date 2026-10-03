import { Plane, Store, ArrowRight, CheckCircle } from "lucide-react";
import { CAL_SITE, CAL_DF_SITE, PARTNER, RETAIL, SlideShell } from "./Shared";

export default function SlideGetStarted() {
  return (
    <SlideShell
      eyebrow="Get Started"
      title={<>Two Tracks. <span style={{ color: RETAIL }}>One Partnership.</span></>}
      subtitle="Both can be activated independently — and each one makes the other more valuable."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${PARTNER}1a` }}>
              <Plane className="w-5 h-5" style={{ color: PARTNER }} />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest" style={{ color: PARTNER }}>Track A</div>
              <div className="font-heading font-bold text-[#0a0f1e]">Travel Partner Activation</div>
            </div>
          </div>
          <p className="text-slate-600 text-sm leading-relaxed mb-3">
            DutyBoost is integrated into the <a href={CAL_SITE} target="_blank" rel="noopener noreferrer" className="font-semibold underline decoration-current/50" style={{ color: PARTNER }}>Caribbean Airlines website</a> and
            booking journey. Every traveller receives a DutyCredit with their confirmation email.
          </p>
          <div className="mt-auto rounded-xl px-4 py-3" style={{ background: `${PARTNER}12` }}>
            <div className="text-sm font-bold" style={{ color: PARTNER }}>Earns 0.5% of the platform fee</div>
            <div className="text-slate-500 text-xs mt-0.5">No POS integration required at this stage</div>
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${RETAIL}1a` }}>
              <Store className="w-5 h-5" style={{ color: RETAIL }} />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest" style={{ color: RETAIL }}>Track B</div>
              <div className="font-heading font-bold text-[#0a0f1e]">Retailer Activation</div>
            </div>
          </div>
          <p className="text-slate-600 text-sm leading-relaxed mb-3">
            DutyBoost is integrated into the <a href={CAL_DF_SITE} target="_blank" rel="noopener noreferrer" className="font-semibold underline decoration-current/50" style={{ color: RETAIL }}>Caribbean Duty Free pre-order environment</a>,
            then extended to POS so any DutyBoost traveller can redeem.
          </p>
          <div className="mt-auto rounded-xl px-4 py-3" style={{ background: `${RETAIL}12` }}>
            <div className="text-sm font-bold" style={{ color: RETAIL }}>Pays 2.5% on generated transactions</div>
            <div className="text-slate-500 text-xs mt-0.5">Only on sales DutyBoost creates</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {[
          { title: "Zero upfront cost", desc: "No setup, subscription or integration fees on either track." },
          { title: "No POS cost at this stage", desc: "The website pre-order service is fully managed — no technical integration cost initially." },
          { title: "Performance-based", desc: "Fees attach only to the commercial activity they generate." },
        ].map((c) => (
          <div key={c.title} className="bg-green-50 border border-green-200 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
              <span className="font-bold text-green-900 text-sm">{c.title}</span>
            </div>
            <p className="text-slate-600 text-xs leading-snug">{c.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-center gap-2 text-sm font-semibold" style={{ color: RETAIL }}>
        Three positions. One traveller. One transaction. <ArrowRight className="w-4 h-4" />
      </div>
    </SlideShell>
  );
}