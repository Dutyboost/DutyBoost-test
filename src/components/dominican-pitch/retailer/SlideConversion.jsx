import { ArrowRight } from "lucide-react";
import { numShort, usdShort } from "../figures";
import { ACCENT, GridBg, SlideWrapper } from "../Shared";
import StoreFunnel from "../StoreFunnel";
import { useDeckLang } from "../LanguageContext";

const M1NDSET_LINK = "https://www.gtrmag.com/blog/gtr-magazine-looks-at-the-state-of-travel-and-tourism-in-the-caribbean";
const NON_PURCHASING = 13432000;
const BASKET = 23;
const NET_SHARE = 0.925;

const ROWS = [
  { pp: 0.0001, label: "+0.01 pp" },
  { pp: 0.001, label: "+0.1 pp" },
  { pp: 0.005, label: "+0.5 pp" },
  { pp: 0.01, label: "+1 pp" },
  { pp: 0.02, label: "+2 pp" },
  { pp: 0.05, label: "+5 pp" },
].map((r) => {
  const txns = NON_PURCHASING * r.pp;
  const retail = txns * BASKET;
  return { ...r, txns, retail, net: retail * NET_SHARE };
});

export default function SlideConversion() {
  const { t } = useDeckLang();
  const c = t.retail.conversion;

  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6">
        <div className="mb-6">
          <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: ACCENT }}>{c.eyebrow}</span>
          <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
            {c.title} <span style={{ color: ACCENT }}>{c.titleAccent}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-5">
          <div>
            <div className="bg-red-50 border border-red-200 rounded-2xl p-5 mb-4">
              <div className="flex items-center gap-4">
                <div>
                  <div className="text-3xl md:text-5xl font-bold text-red-600">{c.nonPurchase}</div>
                  <div className="text-slate-600 font-semibold text-sm mt-1">{c.nonPurchaseLabel}</div>
                  <div className="text-slate-400 text-xs mt-1">{c.unreached}</div>
                </div>
                <div className="flex-1 text-right">
                  <div className="text-3xl md:text-5xl font-bold text-green-600">{c.purchase}</div>
                  <div className="text-slate-600 font-semibold text-sm mt-1">{c.purchaseLabel}</div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-red-200/60">
                <a href={M1NDSET_LINK} target="_blank" rel="noopener noreferrer" className="font-semibold underline" style={{ color: ACCENT }}>
                  {c.source}
                </a>
              </div>
            </div>

            <div className="rounded-2xl p-5" style={{ background: `${ACCENT}0d`, border: `1px solid ${ACCENT}33` }}>
              <h3 className="font-bold mb-3" style={{ color: ACCENT }}>{c.tableTitle}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-slate-400 mb-1 px-2">
                {c.headers.map((h) => <span key={h}>{h}</span>)}
              </div>
              <div className="space-y-1.5">
                {ROWS.map((row, i) => (
                  <div
                    key={row.label}
                    className={`grid grid-cols-2 sm:grid-cols-4 gap-x-2 gap-y-0.5 text-sm py-1.5 px-2 rounded-lg ${i === 3 ? "bg-white font-semibold" : ""}`}
                  >
                    <span style={{ color: ACCENT }}>{row.label}</span>
                    <span className="text-slate-600">{numShort(row.txns)} txns</span>
                    <span className="text-slate-600">{usdShort(row.retail)}</span>
                    <span className="text-green-700 font-semibold">{usdShort(row.net)}</span>
                  </div>
                ))}
              </div>
              <p className="text-slate-400 text-[10px] mt-2 leading-snug">{c.tableNote}</p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="bg-slate-800 text-white rounded-2xl p-6 flex-1 flex flex-col">
              <h3 className="font-bold text-white text-lg mb-4">{c.propositionTitle}</h3>
              <div className="flex-1 flex flex-col justify-center gap-3">
                {c.propositionRows.map((row) => (
                  <div key={row.from} className="grid grid-cols-[1fr,auto,1fr] gap-2 items-stretch text-sm">
                    <span className="text-red-300 bg-red-900/30 rounded-lg px-3 py-2.5 text-center flex items-center justify-center leading-snug">{row.from}</span>
                    <ArrowRight size={16} className="text-slate-400 flex-shrink-0 self-center" />
                    <span className="text-green-300 bg-green-900/30 rounded-lg px-3 py-2.5 text-center flex items-center justify-center leading-snug">{row.to}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl p-5 text-white" style={{ background: `linear-gradient(135deg, ${ACCENT} 0%, #6b1f66 100%)` }}>
              <div className="text-sm font-semibold opacity-80 mb-1">{c.questionTitle}</div>
              <p className="text-lg font-bold leading-snug">{c.question}</p>
              <p className="text-sm mt-2 opacity-80">{c.questionAnswer}</p>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <StoreFunnel />
        </div>
      </div>
    </SlideWrapper>
  );
}