import { useState } from "react";
import { CheckCircle, TrendingUp } from "lucide-react";
import { discountFor, MODEL, PER_STORE, usd, usdShort, numShort } from "../figures";
import { ACCENT, GridBg, SlideWrapper } from "../Shared";
import { useDeckLang } from "../LanguageContext";

const SENSITIVITY = [0.01, 0.02, 0.05];

function compute(travellers, activation, basket) {
  const baskets = travellers * activation * MODEL.redemption;
  const gross = baskets * basket;
  const saving = gross * discountFor(basket);
  const fee = gross * MODEL.platformFee;
  return { baskets, gross, saving, fee, net: gross - saving - fee };
}

export default function SlideEstate() {
  const { t } = useDeckLang();
  const c = t.retail.estate;

  const [stores, setStores] = useState(5);
  const [travellers, setTravellers] = useState(PER_STORE.travellers);
  const [activation, setActivation] = useState(2);

  const per = compute(travellers, activation / 100, MODEL.basket);
  const estateNet = per.net * stores;

  const input = "w-full rounded-lg border border-slate-300 px-2 py-1.5 text-sm text-slate-800 focus:outline-none focus:border-slate-500";

  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-5 md:px-10 md:py-5 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-3">
            <span className="text-xs md:text-sm font-semibold uppercase tracking-widest" style={{ color: ACCENT }}>{c.eyebrow}</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-1.5">
              {c.title} <span style={{ color: ACCENT }}>{c.titleAccent}</span>
            </h2>
            <p className="text-slate-500 mt-1 text-sm md:text-base">{c.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4 max-w-3xl">
            <div>
              <label className="text-xs text-slate-500">{c.storesLabel}</label>
              <input type="number" min="1" value={stores} onChange={(e) => setStores(Math.max(1, Number(e.target.value)))} className={input} />
            </div>
            <div>
              <label className="text-xs text-slate-500">{c.travellersLabel}</label>
              <input type="number" min="0" step="10000" value={travellers} onChange={(e) => setTravellers(Number(e.target.value))} className={input} />
            </div>
            <div>
              <label className="text-xs text-slate-500">{c.activationLabel} (%)</label>
              <input type="number" min="0" max="100" step="0.5" value={activation} onChange={(e) => setActivation(Number(e.target.value))} className={input} />
            </div>
          </div>

          <div className="rounded-2xl p-5 text-center mb-4 max-w-3xl mx-auto" style={{ background: `${ACCENT}0d`, border: `1px solid ${ACCENT}33` }}>
            <div className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: ACCENT }}>
              {numShort(stores)} × {usd(per.net)} — {c.perStore}
            </div>
            <div className="text-3xl md:text-4xl font-bold mb-1" style={{ color: ACCENT }}>{usdShort(estateNet)}</div>
            <div className="text-sm font-medium" style={{ color: ACCENT }}>{c.estateLabel}</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
              <div className="text-slate-500 text-xs">{usdShort(per.gross * stores)} {c.grossLabel}</div>
              <div className="text-slate-500 text-xs">{usdShort(per.saving * stores)} {c.savingLabel}</div>
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
                  const r = compute(travellers, a, MODEL.basket);
                  const isCurrent = Math.round(a * 100) === Math.round(activation);
                  return (
                    <div
                      key={a}
                      className={`flex items-center justify-between py-1.5 px-3 rounded-lg border ${
                        isCurrent ? "font-semibold" : "bg-white border-slate-100"
                      }`}
                      style={isCurrent ? { background: `${ACCENT}1a`, borderColor: `${ACCENT}33` } : undefined}
                    >
                      <span className="text-slate-600">{c.atActivation(Math.round(a * 100))}</span>
                      <span className="text-slate-700">{c.baskets(numShort(r.baskets))}</span>
                      <span className="font-bold" style={{ color: ACCENT }}>{c.perStoreShort(usd(r.net))}</span>
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
                <p className="font-bold leading-snug">{usd(per.net)} {c.closingTitle}</p>
                <p className="text-white/80 text-sm mt-2">{c.closingBody}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}