import { Plane, Store } from "lucide-react";
import { PARTNER, RETAIL, SlideShell } from "./Shared";

// Caribbean Airlines is the one participant that sits on both sides of the
// traveller journey — the whole deck follows from that.
export default function SlideDoubleSided() {
  const positions = [
    {
      Icon: Plane,
      color: PARTNER,
      tag: "Position 1",
      title: "As a Travel Partner",
      desc: "Caribbean Airlines earns from traveller activation.",
      detail: "DutyBoost sits inside the booking journey and activates passengers with DutyCredits before they travel.",
    },
    {
      Icon: Store,
      color: RETAIL,
      tag: "Position 2",
      title: "As a Retailer",
      desc: "Caribbean Duty Free generates incremental sales from those activated travellers.",
      detail: "The same travellers arrive with a reason to buy — at Caribbean Duty Free and at participating retailers.",
    },
  ];

  return (
    <SlideShell
      eyebrow="The Opportunity"
      title={<>One Ecosystem. <span style={{ color: RETAIL }}>Two Revenue Positions.</span></>}
      subtitle="Caribbean Airlines is uniquely positioned within the DutyBoost ecosystem because it can participate on both sides of the traveller journey."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        {positions.map((p) => (
          <div key={p.tag} className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `${p.color}1a` }}>
                <p.Icon className="w-6 h-6" style={{ color: p.color }} />
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-widest" style={{ color: p.color }}>{p.tag}</div>
                <div className="text-lg font-heading font-bold text-[#0a0f1e]">{p.title}</div>
              </div>
            </div>
            <p className="text-slate-800 font-semibold text-sm mb-2">{p.desc}</p>
            <p className="text-slate-500 text-sm leading-relaxed">{p.detail}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl p-5 text-white" style={{ background: "linear-gradient(135deg, #952d8b 0%, #0e7490 100%)" }}>
        <p className="font-bold text-lg leading-snug">
          A double-sided commercial opportunity — not a traditional customer-acquisition expense.
        </p>
        <p className="text-white/80 text-sm mt-1.5">
          The airline earns from bringing the traveller into the ecosystem. The retailer earns from converting that traveller into a purchase.
        </p>
      </div>
    </SlideShell>
  );
}