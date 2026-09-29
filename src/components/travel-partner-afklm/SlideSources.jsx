import { ExternalLink } from "lucide-react";
import * as F from "./figures";

const ACCENT = "text-green-600";
const linkCls = "text-green-700 font-semibold underline decoration-green-600/40 hover:decoration-green-600 transition-colors";

export default function SlideSources() {
  return (
    <div className="w-full flex flex-col overflow-y-auto bg-white text-[#052e16]">
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-8">
        <div className="mb-5">
          <span className={`${ACCENT} text-sm font-semibold uppercase tracking-widest`}>Sources & Assumptions</span>
          <h2 className="text-xl md:text-3xl font-heading font-bold mt-2">
            Every Figure <span className={ACCENT}>Traced to a Published Source</span>
          </h2>
          <p className="text-slate-500 mt-1 text-sm">
            Air France-KLM network and traffic data, plus the global travel-retail benchmarks behind the conversion model.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
          {F.SOURCES.map((s) => (
            <a
              key={s.url}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 hover:border-green-300 hover:bg-green-50 transition-colors"
            >
              <ExternalLink className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-slate-700 leading-snug">{s.label}</span>
            </a>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
            <h3 className="font-bold text-[#052e16] mb-2">Conversion model assumptions</h3>
            <ul className="space-y-1.5 text-sm text-slate-600">
              <li>• {F.NON_PURCHASE_SHARE} of travellers leave an airport without a purchase (<a href="https://m1nd-set.com/" target="_blank" rel="noopener noreferrer" className={linkCls}>m1nd-set</a> / <a href="https://www.tfwa.com/" target="_blank" rel="noopener noreferrer" className={linkCls}>TFWA</a>)</li>
              <li>• €20 Entry-tier minimum basket, 5% traveller discount</li>
              <li>• DutyBoost platform fee 2.5% of the qualifying basket</li>
              <li>• Partner share 20% of the platform fee (0.5% of basket), capped per transaction</li>
              <li>• Uplift modelled as additional percentage points of non-purchasing travellers converted</li>
            </ul>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
            <h3 className="font-bold text-[#052e16] mb-2">Global market context</h3>
            <ul className="space-y-1.5 text-sm text-slate-600">
              <li>• Global passenger movements in 2025: <span className="font-semibold text-green-700">{F.GLOBAL_PAX_MOVEMENTS}</span> (<a href="https://aci.aero/" target="_blank" rel="noopener noreferrer" className={linkCls}>ACI World</a>)</li>
              <li>• Global duty-free &amp; travel retail sales: <span className="font-semibold text-green-700">{F.GLOBAL_DUTY_FREE}</span> (<a href="https://www.mordorintelligence.com/industry-reports/duty-free-and-travel-retail-market" target="_blank" rel="noopener noreferrer" className={linkCls}>Mordor Intelligence</a>)</li>
              <li>• Air France-KLM group passengers carried 2025: <span className="font-semibold text-green-700">{F.GROUP_PASSENGERS}</span></li>
              <li>• Destination points {F.DESTINATIONS} + in-flight points {F.IFE_AIRCRAFT} = <span className="font-semibold text-green-700">{F.TOTAL_POINTS}</span></li>
            </ul>
            <p className="text-slate-400 text-xs mt-3">
              Route-level passenger volumes are estimates derived from published hub statistics and network capacity; all
              commercial terms are illustrative examples at the Entry-tier basket.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}