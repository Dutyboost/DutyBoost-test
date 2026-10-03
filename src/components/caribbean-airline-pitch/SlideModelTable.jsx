import { Plane, Store, Cpu } from "lucide-react";
import { PARTNER, POS, RETAIL, SlideShell } from "./Shared";

const ROWS = [
  {
    Icon: Plane,
    color: PARTNER,
    position: "Travel Partner",
    value: "Activates Caribbean Airlines passengers and drives them into the DutyBoost ecosystem",
    economics: "Earns 0.5% share",
    economicsNote: "of applicable DutyBoost platform fee",
  },
  {
    Icon: Store,
    color: RETAIL,
    position: "Retailer",
    value: "Converts DutyBoost travellers into Caribbean Duty Free customers",
    economics: "Pays 2.5% platform fee",
    economicsNote: "on applicable generated transactions",
  },
  {
    Icon: Cpu,
    color: POS,
    position: "POS Integration",
    value: "Opens Caribbean Duty Free to travellers arriving on other airlines",
    economics: "2.5% platform fee",
    economicsNote: "on applicable generated transactions",
  },
];

export default function SlideModelTable() {
  return (
    <SlideShell
      eyebrow="The Triple-Sided Model"
      title={<>Three Positions. <span style={{ color: RETAIL }}>One Commercial Loop.</span></>}
      subtitle="Caribbean Airlines participates on both sides of the same transaction."
    >
      <div className="space-y-3">
        <div className="grid grid-cols-12 gap-3 px-4 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
          <span className="col-span-3">Caribbean Airlines position</span>
          <span className="col-span-6">How DutyBoost creates value</span>
          <span className="col-span-3">Economics</span>
        </div>
        {ROWS.map((r) => (
          <div key={r.position} className="grid grid-cols-12 gap-3 items-center bg-slate-50 border border-slate-200 rounded-2xl p-4">
            <div className="col-span-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${r.color}1a` }}>
                <r.Icon className="w-5 h-5" style={{ color: r.color }} />
              </div>
              <span className="font-heading font-bold text-[#0a0f1e] text-sm">{r.position}</span>
            </div>
            <p className="col-span-6 text-slate-600 text-sm leading-snug">{r.value}</p>
            <div className="col-span-3">
              <div className="font-bold text-sm" style={{ color: r.color }}>{r.economics}</div>
              <div className="text-slate-500 text-xs leading-snug mt-0.5">{r.economicsNote}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 bg-slate-800 text-white rounded-2xl p-5">
        <p className="text-sm leading-relaxed">
          <span className="font-bold">The airline earns as a Travel Partner while the retailer earns as a Retailer</span> — and POS
          integration then opens the retail business to the entire DutyBoost traveller network.
        </p>
      </div>
    </SlideShell>
  );
}