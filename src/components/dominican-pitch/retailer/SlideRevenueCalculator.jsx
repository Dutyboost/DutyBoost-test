import { Store, Footprints, ShoppingBag, XCircle } from "lucide-react";
import { DR_MOVEMENTS, STORE_FUNNEL, SOURCES, numShort } from "../figures";
import { ACCENT, GridBg, SlideWrapper } from "../Shared";
import { useDeckLang } from "../LanguageContext";
import RetailerCalculator from "./RetailerCalculator";

// The store footfall split behind the model: of every international traveller
// passing through the concourse, 36% step into a duty free store and 64% walk
// straight to their gate. Of those who do enter, 63% buy and 37% leave without.
const ENTERING = DR_MOVEMENTS * STORE_FUNNEL.footfall;
const WALKED = DR_MOVEMENTS - ENTERING;

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
  const { t } = useDeckLang();
  const c = t.retail.revenueCalculator;

  const FOOTFALL = [
    { icon: Store, pct: "36%", count: ENTERING, label: c.entered, box: "bg-white border-slate-200", num: "text-slate-800" },
    { icon: Footprints, pct: "64%", count: WALKED, label: c.walked, box: "bg-red-50 border-red-200", num: "text-red-600" },
  ];

  const CONVERT = [
    { icon: ShoppingBag, pct: "63%", count: ENTERING * STORE_FUNNEL.conversion, label: c.purchased, box: "bg-green-50 border-green-200", num: "text-green-600" },
    { icon: XCircle, pct: "37%", count: ENTERING * (1 - STORE_FUNNEL.conversion), label: c.left, box: "bg-red-50 border-red-200", num: "text-red-600" },
  ];

  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col px-5 py-4 md:px-10 md:py-4 relative overflow-hidden">
        <GridBg />
        <div className="relative z-10 flex-1 flex flex-col min-h-0">
          <div className="mb-3 shrink-0">
            <span className="text-xs md:text-sm font-semibold uppercase tracking-widest" style={{ color: ACCENT }}>
              {c.slideEyebrow}
            </span>
            <h2 className="text-lg md:text-2xl font-heading font-bold text-[#0a0f1e] mt-1.5">
              {c.slideTitle} <span style={{ color: ACCENT }}>{c.slideTitleAccent}</span>
            </h2>
            <p className="text-slate-500 mt-1 text-sm">{c.slideSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3 shrink-0">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3">
              <h3 className="text-sm font-bold text-slate-800 mb-2">{c.footfallTitle}</h3>
              <div className="grid grid-cols-2 gap-2">
                {FOOTFALL.map((b) => <StatBox key={b.pct} {...b} />)}
              </div>
              <p className="text-[11px] text-slate-500 mt-2 leading-snug">{c.enterNote}</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3">
              <h3 className="text-sm font-bold text-slate-800 mb-2">{c.convertTitle}</h3>
              <div className="grid grid-cols-2 gap-2">
                {CONVERT.map((b) => <StatBox key={b.pct} {...b} />)}
              </div>
              <p className="text-[11px] text-slate-500 mt-2 leading-snug">
                {c.convertNote}{" "}
                <a href={SOURCES.footfall} target="_blank" rel="noopener noreferrer" className="font-semibold underline" style={{ color: ACCENT }}>
                  m1nd-set ↗
                </a>
              </p>
            </div>
          </div>

          <div className="flex-1 min-h-0 flex">
            <RetailerCalculator />
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}