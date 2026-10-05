import { CheckCircle, Store } from "lucide-react";
import { RETAIL, SlideShell } from "./Shared";
import { MODEL, PER_STORE, discountFor, numShort, usdShort } from "./figures";
import { useDeckLang } from "./LanguageContext";

export default function SlideRetailers() {
  const { t } = useDeckLang();
  const c = t.retailers;

  const activated = PER_STORE.travellers * PER_STORE.activation;
  const baskets = activated * PER_STORE.redemption;
  const gross = baskets * PER_STORE.basket;
  const saving = gross * discountFor(PER_STORE.basket);
  const fee = gross * MODEL.platformFee;
  const retailerNet = gross - saving - fee;

  const VALUES = [numShort(baskets), usdShort(gross), usdShort(retailerNet)];

  return (
    <SlideShell
      eyebrow={c.eyebrow}
      eyebrowColor={RETAIL}
      title={
        <>
          {c.title} <span style={{ color: RETAIL }}>{c.titleAccent}</span>
        </>
      }
      subtitle={c.subtitle}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        {c.kpis.map((k, i) => (
          <div key={k.label} className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
            <div className={`text-3xl font-bold ${i === 0 ? "text-[#0a0f1e]" : "text-blue-700"}`}>
              {VALUES[i]}
            </div>
            <p className="text-slate-600 text-sm mt-2 leading-snug">{k.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Store className="w-5 h-5" style={{ color: RETAIL }} />
            <h3 className="font-bold text-slate-800">{c.pointsTitle}</h3>
          </div>
          <div className="space-y-2">
            {c.points.map((p) => (
              <div key={p} className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-slate-600 text-sm leading-snug">{p}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="rounded-2xl p-5 text-white" style={{ background: RETAIL }}>
            <p className="font-bold leading-snug text-lg">{c.cardTitle(usdShort(retailerNet))}</p>
            <p className="text-blue-100 text-sm mt-2 leading-relaxed">{c.cardBody}</p>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
            <h3 className="font-bold text-slate-800 mb-2">{c.multiplierTitle}</h3>
            <p className="text-slate-600 text-sm leading-relaxed">{c.multiplierBody}</p>
          </div>
        </div>
      </div>

      <p className="text-slate-400 text-xs mt-3">{c.footnote}</p>
    </SlideShell>
  );
}