import { Fragment } from "react";
import { ArrowRight } from "lucide-react";
import { DR_STORE_FUNNEL, SOURCES } from "./figures";
import { ACCENT } from "./Shared";
import { useDeckLang } from "./LanguageContext";

// The in-store funnel, from m1nd-set's 10-year B1S analysis (H1 2026): 36% of
// international travellers enter a duty free store, 63% of those buy, and 37%
// walk back out without buying. That last group is who DutyBoost pre-activates.
const STEPS = [
  {
    key: "enter",
    pct: "36%",
    count: DR_STORE_FUNNEL.enter,
    box: "bg-white border-slate-200",
    num: "text-slate-800",
  },
  {
    key: "buy",
    pct: "63%",
    count: DR_STORE_FUNNEL.buy,
    box: "bg-green-50 border-green-200",
    num: "text-green-600",
  },
  {
    key: "leave",
    pct: "37%",
    count: DR_STORE_FUNNEL.leave,
    box: "bg-red-50 border-red-200",
    num: "text-red-600",
  },
];

export default function StoreFunnel() {
  const { t } = useDeckLang();
  const c = t.retail.funnel;

  return (
    <div
      className="rounded-2xl p-3 sm:px-4"
      style={{ background: `${ACCENT}0d`, border: `1px solid ${ACCENT}33` }}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5 mb-2">
        <h4 className="text-sm font-bold" style={{ color: ACCENT }}>
          {c.title}
        </h4>
        <a
          href={SOURCES.footfall}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] font-semibold underline"
          style={{ color: ACCENT }}
        >
          {c.source} ↗
        </a>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch gap-1.5">
        {STEPS.map((s, i) => (
          <Fragment key={s.key}>
            {i > 0 && (
              <ArrowRight size={14} className="self-center flex-shrink-0 text-slate-400" />
            )}
            <div className={`flex-1 rounded-xl border px-3 py-2 ${s.box}`}>
              <div className="flex items-baseline gap-2">
                <span className={`text-xl font-bold ${s.num}`}>{s.pct}</span>
                <span className="text-[10px] font-semibold text-slate-500">
                  {c.count(s.count)}
                </span>
              </div>
              <div className="text-[11px] text-slate-700 leading-tight mt-0.5">
                {c.steps[s.key]}
              </div>
            </div>
          </Fragment>
        ))}
      </div>

      <p className="text-[11px] font-semibold mt-2 leading-snug" style={{ color: ACCENT }}>
        {c.target}
      </p>
    </div>
  );
}