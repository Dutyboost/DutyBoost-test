import { Fragment } from "react";
import { ArrowDown, Plane, Store, Cpu } from "lucide-react";
import { PARTNER, POS, RETAIL, SlideShell } from "./Shared";

const LOOP = [
  { label: "Caribbean Airlines Website", tone: "brand" },
  { label: "Activate Traveller", tone: "plain" },
  { label: "DutyCredits", tone: "brand" },
  { label: "Caribbean Duty Free", tone: "brand" },
  { label: "Purchase & Redemption", tone: "plain" },
  { label: "POS Integration", tone: "accent" },
  { label: "More DutyBoost Travellers", tone: "plain" },
  { label: "Incremental Retail Revenue", tone: "success" },
];

function toneStyles(tone) {
  if (tone === "brand") return { background: RETAIL, color: "#ffffff" };
  if (tone === "accent") return { background: POS, color: "#ffffff" };
  if (tone === "success") return { background: "#dcfce7", color: "#166534", border: "1px solid #86efac" };
  return { background: "#f1f5f9", color: "#334155", border: "1px solid #e2e8f0" };
}

export default function SlideCommercialLoop() {
  return (
    <SlideShell
      eyebrow="The Commercial Loop"
      title={<>Every Step Feeds <span style={{ color: RETAIL }}>the Next One</span></>}
      subtitle="The traveller journey and the commercial loop are the same loop."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col items-center gap-1">
          {LOOP.map((step, i) => (
            <Fragment key={step.label}>
              <div
                className="w-full max-w-xs text-center rounded-xl px-4 py-2 text-sm font-semibold"
                style={toneStyles(step.tone)}
              >
                {step.label}
              </div>
              {i < LOOP.length - 1 && <ArrowDown className="w-4 h-4 text-slate-400" />}
            </Fragment>
          ))}
        </div>

        <div className="flex flex-col gap-4 justify-center">
          <div className="text-center text-xs font-semibold uppercase tracking-widest text-slate-400">At the same time</div>
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${PARTNER}1a` }}>
                <Plane className="w-5 h-5" style={{ color: PARTNER }} />
              </div>
              <span className="font-heading font-bold text-[#0a0f1e]">Caribbean Airlines earns as a Travel Partner</span>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              Its activated passengers redeem in the network — including at stores it does not own.
            </p>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${RETAIL}1a` }}>
                <Store className="w-5 h-5" style={{ color: RETAIL }} />
              </div>
              <span className="font-heading font-bold text-[#0a0f1e]">Caribbean Duty Free generates incremental retail revenue as a Retailer</span>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              Activated travellers arrive with purchase intent and a financial reason to enter the store.
            </p>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
            <div className="flex items-center gap-3">
              <Cpu className="w-5 h-5 flex-shrink-0 text-amber-600" />
              <p className="text-slate-700 text-sm leading-relaxed">
                POS integration then widens the retailer's reach to the full DutyBoost traveller ecosystem — compounding both sides.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SlideShell>
  );
}