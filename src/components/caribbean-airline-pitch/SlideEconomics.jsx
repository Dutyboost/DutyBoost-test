import { Plane, Store, Check } from "lucide-react";
import { PARTNER, RETAIL, SlideShell } from "./Shared";

// Both sides of the same $23 Entry-tier sale — what Caribbean Airlines pays as
// Retailer, and what it earns back as Travel Partner.
const LINES = [
  { label: "Traveller's qualifying basket", value: "$23.00", bold: true },
  { label: "DutyCredit saving to the traveller (5%)", value: "−$1.15", tone: "amber" },
  { label: "DutyBoost platform fee (2.5%)", value: "−$0.58", tone: "muted" },
  { label: "Travel Partner rebate (20% of the fee)", value: "+$0.12", tone: "teal" },
];

export default function SlideEconomics() {
  return (
    <SlideShell
      eyebrow="Triple-Sided Economics"
      title={<>One $23 Sale, <span style={{ color: RETAIL }}>Both Positions at Once</span></>}
      subtitle="Caribbean Airlines pays the platform fee as Retailer and earns its share back as Travel Partner."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
          <div className="space-y-2">
            {LINES.map((l) => (
              <div key={l.label} className="flex items-center justify-between gap-4 py-1.5 border-b border-slate-200">
                <span className="text-slate-600 text-sm">{l.label}</span>
                <span
                  className={`text-sm font-semibold ${
                    l.tone === "amber" ? "text-amber-600" : l.tone === "teal" ? "text-teal-700" : l.tone === "muted" ? "text-slate-500" : "text-[#0a0f1e]"
                  }`}
                >
                  {l.value}
                </span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between gap-4 mt-3 rounded-xl px-4 py-3" style={{ background: `${RETAIL}14` }}>
            <span className="font-bold text-sm" style={{ color: RETAIL }}>Caribbean Duty Free retains</span>
            <span className="font-bold text-2xl" style={{ color: RETAIL }}>$21.39</span>
          </div>
          <p className="text-slate-400 text-xs mt-2 leading-snug">
            Entry-tier minimum basket, USD. The retailer's keep rate improves at higher tiers, where the platform fee is capped.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-2xl p-6 text-white" style={{ background: `linear-gradient(135deg, ${PARTNER} 0%, ${RETAIL} 100%)` }}>
            <div className="text-sm font-semibold uppercase tracking-widest opacity-80 mb-2">Net platform cost to Caribbean Airlines</div>
            <div className="text-4xl md:text-5xl font-bold mb-2">2.0%</div>
            <p className="text-white/90 text-sm leading-relaxed">
              It pays 2.5% as Retailer and earns 0.5% back as Travel Partner. The only true cost is the discount — which is only ever
              spent on a sale that would otherwise not have happened.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2.5">
            {[
              { Icon: Plane, color: PARTNER, text: "Earns on travellers it activates — even when they buy elsewhere" },
              { Icon: Store, color: RETAIL, text: "Pays only on sales that actually happen, through its own stores" },
              { Icon: Check, color: "#16a34a", text: "Zero upfront cost — no setup, subscription or integration fee" },
            ].map((row) => (
              <div key={row.text} className="flex items-start gap-2.5">
                <row.Icon className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: row.color }} />
                <span className="text-slate-600 text-sm leading-snug">{row.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideShell>
  );
}