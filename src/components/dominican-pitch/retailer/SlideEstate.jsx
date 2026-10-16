import { CheckCircle, TrendingUp } from "lucide-react";
import { usd, usdShort, numShort } from "../figures";
import { ACCENT, GridBg, SlideWrapper } from "../Shared";
import { useRetailerRevenue, computeRetailerRevenue, perStoreAtActivation } from "./RetailerRevenueContext";
import { useDeckLang } from "../LanguageContext";

const SENSITIVITY = [0.01, 0.02, 0.05];

export default function SlideEstate() {
  const { t } = useDeckLang();
  const c = t.retail.estate;

  // Everything here comes from the calculator on the business-model slide.
  const { inputs } = useRetailerRevenue();
  const { stores, activation, perStore, estate } = computeRetailerRevenue(inputs);

  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-5 md:px-10 md:py-5 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-3">
            <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: ACCENT }}>{c.eyebrow}</span>
            <h2 className="text-2xl md:text-4xl font-heading font-bold text-[#0a0f1e] mt-1.5">
              {c.title} <span style={{ color: ACCENT }}>{c.titleAccent}</span>
            </h2>
            <p className="text-slate-500 mt-1 text-sm md:text-base">{c.subtitle}</p>
          </div>

          <div className="rounded-2xl p-5 text-center mb-4 max-w-3xl mx-auto" style={{ background: `${ACCENT}0d`, border: `1px solid ${ACCENT}33` }}>
            <div className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: ACCENT }}>
              {numShort(stores)} × {usd(perStore.retailerNet)} — {c.perStore}
            </div>
            <div className="text-3xl md:text-4xl font-bold mb-1" style={{ color: ACCENT }}>{usdShort(estate.retailerNet)}</div>
            <div className="text-sm font-medium" style={{ color: ACCENT }}>{c.estateLabel}</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
              <div className="text-slate-500 text-xs">{usdShort(estate.gross)} {c.grossLabel}</div>
              <div className="text-slate-500 text-xs">{usdShort(estate.travellerSaving)} {c.savingLabel}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-5 h-5" style={{ color: ACCENT }} />
                <h3 className="font-bold text-slate-800">{c.leverTitle}</h3>
              </div>
              <p className="text-slate-600 text-sm mb-3">{c.leverBody}</p>
              <div className="space-y-2 text-sm">
                {SENSITIVITY.map((a) => {
                  const r = perStoreAtActivation(inputs, a);
                  const isCurrent = Math.round(a * 100) === Math.round(activation * 100);
                  return (
                    <div
                      key={a}
                      className={`flex items-center justify-between py-1.5 border-b border-slate-100 last:border-b-0 ${
                        isCurrent ? "font-semibold" : ""
                      }`}
                    >
                      <span className="text-slate-600">{c.atActivation(Math.round(a * 100))}</span>
                      <span className="text-slate-700">{c.baskets(numShort(r.baskets))}</span>
                      <span className="font-bold" style={{ color: ACCENT }}>{c.perStoreShort(usd(r.retailerNet))}</span>
                    </div>
                  );
                })}
              </div>
              <p className="text-slate-400 text-[10px] mt-2 leading-snug">{c.sensitivityNote}</p>
            </div>

            <div className="flex flex-col gap-3">
              <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
                <h3 className="font-bold text-green-900 mb-3">{c.upsideTitle}</h3>
                <div className="space-y-2 text-sm">
                  {c.upside.map((item) => (
                    <div key={item} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl p-5 text-white" style={{ background: `linear-gradient(135deg, ${ACCENT} 0%, #6b1f66 100%)` }}>
                <p className="font-bold leading-snug">{usd(perStore.retailerNet)} {c.closingTitle}</p>
                <p className="text-white/80 text-sm mt-2">{c.closingBody}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}