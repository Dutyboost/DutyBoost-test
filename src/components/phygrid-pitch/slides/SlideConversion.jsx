import { SlideWrapper, GridBg } from "@/components/phygrid-pitch/Shared";
import {
  ACI_TRAFFIC_LINK,
  M1NDSET_LINK,
  TFWA_LINK,
  GLOBAL_NON_PURCHASE_M,
  GLOBAL_CONVERTING_M,
  UPLIFT_1PP_TRAVELLERS_M,
  UPLIFT_1PP_VALUE,
  numShort,
  usdShort,
  linkCls,
} from "@/components/phygrid-pitch/model";

export default function SlideConversion() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">
              Conversion Opportunity
            </span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              Small Conversion Gains = <span className="text-blue-600">Enormous Value Across the Estate</span>
            </h2>
            <p className="text-slate-500 mt-1 text-sm">
              The global estate's ~9.8B annual travel moments represent the largest conversion headroom in travel
              retail. Roughly 73% never purchase — DutyBoost activates them before arrival.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-5">
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
              <div className="flex items-center gap-4">
                <div>
                  <div className="text-3xl md:text-5xl font-bold text-red-600">
                    ~{numShort(GLOBAL_NON_PURCHASE_M * 1e6)}
                  </div>
                  <div className="text-slate-600 font-semibold text-sm mt-1">Non-purchasing travel moments</div>
                  <div className="text-slate-400 text-xs mt-1">73% of the global estate's ~9.8B reach</div>
                </div>
                <div className="flex-1 text-right">
                  <div className="text-3xl md:text-5xl font-bold text-green-600">
                    ~{numShort(GLOBAL_CONVERTING_M * 1e6)}
                  </div>
                  <div className="text-slate-600 font-semibold text-sm mt-1">Today's converting base</div>
                  <div className="text-slate-400 text-xs mt-1">the ~27% who currently buy</div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-red-200/60 text-slate-500 text-xs">
                Traveller reach:{" "}
                <a href={ACI_TRAFFIC_LINK} target="_blank" rel="noopener noreferrer" className={linkCls}>
                  ACI World
                </a>
                . 73/27 ratio:{" "}
                <a href={M1NDSET_LINK} target="_blank" rel="noopener noreferrer" className={linkCls}>
                  m1nd-set
                </a>{" "}
                /{" "}
                <a href={TFWA_LINK} target="_blank" rel="noopener noreferrer" className={linkCls}>
                  TFWA
                </a>
                .
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
              <h3 className="font-bold text-blue-800 mb-2">Each +1pp of Conversion</h3>
              <div className="text-3xl md:text-4xl font-bold text-blue-700">
                ~{UPLIFT_1PP_TRAVELLERS_M}M
              </div>
              <div className="text-slate-600 text-sm mt-1">
                additional purchasing travellers across the estate
              </div>
              <div className="text-green-600 font-bold text-xl mt-3">{usdShort(UPLIFT_1PP_VALUE)}</div>
              <div className="text-slate-600 text-sm">
                incremental retail value (illustrative, $23 Entry-tier basket)
              </div>
              <div className="text-slate-400 text-xs mt-3">
                1pp = 1% of the global estate's ~9.8B travel moments converting at the model's qualifying basket.
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
              <h3 className="font-bold text-slate-800 mb-3">What the POS Provider Brings to the Table</h3>
              <ul className="space-y-2 text-sm">
                {[
                  "The checkout layer where every redemption is validated",
                  "Reach into the retailer base — one integration, many merchants",
                  "The transaction data that makes each sale attributable",
                  "No need to acquire a single traveller: DutyBoost does that",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                    <span className="text-slate-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-5 text-white">
              <div className="text-sm font-semibold opacity-80 mb-1">The Core Question</div>
              <p className="text-lg font-bold leading-snug">
                "Is a commission on every incremental sale across your estate — earned without a single store-level
                project — more valuable than earning nothing from the 73% who never convert?"
              </p>
              <p className="text-sm mt-2 opacity-80">Yes. Every time.</p>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}