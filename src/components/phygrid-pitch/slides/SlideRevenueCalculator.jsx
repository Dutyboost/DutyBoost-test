import { Store, Footprints } from "lucide-react";
import { SlideWrapper, GridBg } from "@/components/phygrid-pitch/Shared";
import EstateCalculator from "@/components/phygrid-pitch/slides/EstateCalculator";
import {
  ACI_TRAFFIC_LINK,
  M1NDSET_LINK,
  TFWA_LINK,
  GLOBAL_CONVERTING_M,
  GLOBAL_NON_PURCHASE_M,
  numShort,
  linkCls,
} from "@/components/phygrid-pitch/model";

// The calculator gets its own slide, and its base is the group DutyBoost exists
// to activate: of the estate's ±9.8B annual travel moments, 78% walk straight to
// their gates without purchasing. The 22% who already buy are not the target.

function StatBox({ icon: Icon, pct, count, label, box, num }) {
  return (
    <div className={`rounded-xl border px-3 py-2 ${box}`}>
      <div className="flex items-baseline gap-2">
        <Icon className={`w-4 h-4 self-center ${num}`} />
        <span className={`text-2xl font-bold ${num}`}>{pct}</span>
        <span className="text-[10px] font-semibold text-slate-500">{numShort(count)}</span>
      </div>
      <div className="text-[11px] text-slate-700 leading-tight mt-0.5">{label}</div>
    </div>
  );
}

export default function SlideRevenueCalculator() {
  const SPLIT = [
    {
      icon: Store,
      pct: "22%",
      count: GLOBAL_CONVERTING_M * 1e6,
      label: "purchase today — the travellers who already convert",
      box: "bg-white border-slate-200",
      num: "text-slate-800",
    },
    {
      icon: Footprints,
      pct: "78%",
      count: GLOBAL_NON_PURCHASE_M * 1e6,
      label: "walk straight to their gates — the group DutyBoost pre-activates",
      box: "bg-red-50 border-red-200",
      num: "text-red-600",
    },
  ];

  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col px-5 py-4 md:px-12 md:py-4 relative">
        <GridBg />
        <div className="relative z-10 flex-1 flex flex-col min-h-0">
          <div className="mb-3 shrink-0">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">
              Revenue Potential — Per Day
            </span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              The Estate Model, <span className="text-blue-600">Per Day</span>
            </h2>
            <p className="text-slate-500 mt-1 text-sm">
              Enter the estate's own figures — the model recalculates, and the transaction and estate slides read
              the same scenario.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 mb-3 shrink-0">
            <h3 className="text-sm font-bold text-slate-800 mb-2">Where the travellers are</h3>
            <div className="grid grid-cols-2 gap-2">
              {SPLIT.map((b) => (
                <StatBox key={b.pct} {...b} />
              ))}
            </div>
            <p className="text-[11px] text-slate-500 mt-2 leading-snug">
              The model's fixed base is the 78% — travellers already inside the terminal who currently buy
              nothing. Traveller reach:{" "}
              <a href={ACI_TRAFFIC_LINK} target="_blank" rel="noopener noreferrer" className={linkCls}>
                ACI World
              </a>
              . 78/22 ratio:{" "}
              <a href={M1NDSET_LINK} target="_blank" rel="noopener noreferrer" className={linkCls}>
                m1nd-set
              </a>{" "}
              /{" "}
              <a href={TFWA_LINK} target="_blank" rel="noopener noreferrer" className={linkCls}>
                TFWA
              </a>
              .
            </p>
          </div>

          <div className="flex-1 min-h-0 flex">
            <EstateCalculator />
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}