import { SlideWrapper, GridBg } from "@/components/phygrid-pitch/Shared";
import {
  ACI_TRAFFIC_LINK,
  M1NDSET_LINK,
  TFWA_LINK,
  GLOBAL_NON_PURCHASE_M,
  numShort,
  linkCls,
} from "@/components/phygrid-pitch/model";

export default function SlideFacts() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">
              The Facts — The Estate — The Gap
            </span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              73% of Airport Passengers<br />
              <span className="text-blue-600">Never Make a Purchase</span>
            </h2>
            <p className="text-slate-500 mt-1 text-sm">
              The scale of the global airport retail estate every POS provider sits inside. Penetration benchmarks:{" "}
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mb-5">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">~4.8B</div>
              <div className="text-slate-800 font-semibold">Travellers through the global estate each year</div>
              <div className="text-slate-500 text-sm mt-1">
                Across ±45,000 stores in ~4,000 commercial airports worldwide{" "}
                <a href={ACI_TRAFFIC_LINK} target="_blank" rel="noopener noreferrer" className={linkCls}>
                  (ACI World)
                </a>
              </div>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">27%</div>
              <div className="text-slate-800 font-semibold">Penetration rate</div>
              <div className="text-slate-500 text-sm mt-1">
                The share who convert to a purchase{" "}
                <a href={M1NDSET_LINK} target="_blank" rel="noopener noreferrer" className={linkCls}>
                  (m1nd-set / TFWA)
                </a>
              </div>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
              <div className="text-3xl md:text-4xl font-bold text-red-600 mb-2">
                ~{numShort(GLOBAL_NON_PURCHASE_M * 1e6)}
              </div>
              <div className="text-slate-800 font-semibold">Non-purchasing travellers</div>
              <div className="text-slate-500 text-sm mt-1">73% of the global estate's annual traffic</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
              <h3 className="text-slate-800 font-semibold text-sm mb-3">
                Why the gap never closes on its own
              </h3>
              <ul className="space-y-2">
                {[
                  "Activation starts only after the traveller clears security",
                  "No financial reason for a non-intending buyer to enter a store",
                  "73% of passengers walk straight to the gate",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                    <span className="text-slate-600 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
                <p className="text-blue-700 text-sm leading-relaxed italic">
                  "Large passenger flows do not automatically become retail customers. The 73% is conversion
                  headroom — not a permanent ceiling."
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-5 text-white">
                <p className="font-bold text-sm leading-snug">
                  Every one of those passengers is standing inside a store running somebody's POS. That is the
                  estate a POS provider already controls.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}