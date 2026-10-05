import { ACCENT, RETAIL, SlideShell } from "./Shared";
import { MODEL, BASKET_CAP, DISCOUNT_CAP, usd } from "./figures";
import NetworkCalculator from "./NetworkCalculator";

const TERMS = [
  { label: "Pre-activation", value: "2%", note: "of carried passengers, as the modelled default" },
  { label: "Redemption", value: "30%", note: "of pre-activated travellers redeem a basket" },
  { label: "Platform fee", value: "2.5%", note: "paid by the retailer, on validated sales only" },
  { label: "Carrier share", value: "0.5%", note: "returned to the carrier on the same sale" },
];

export default function SlideModel() {
  return (
    <SlideShell
      eyebrow="The Commercial Model"
      eyebrowColor={ACCENT}
      title={
        <>
          Standard Terms, <span style={{ color: RETAIL }}>Zero Upfront Cost</span>
        </>
      }
      subtitle={`The same model in every market DutyBoost operates, with no market-specific levy. Qualifying spend is capped at ${usd(BASKET_CAP)} and the traveller discount at ${usd(DISCOUNT_CAP)}.`}
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        {TERMS.map((t) => (
          <div key={t.label} className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
            <div className="text-2xl font-bold" style={{ color: ACCENT }}>
              {t.value}
            </div>
            <div className="text-slate-700 font-semibold text-sm mt-1">{t.label}</div>
            <div className="text-slate-500 text-xs mt-1 leading-snug">{t.note}</div>
          </div>
        ))}
      </div>

      <NetworkCalculator />

      <div className="mt-4 bg-slate-800 text-white rounded-2xl p-5">
        <p className="text-sm leading-relaxed">
          <span className="font-bold">Nobody pays and nobody earns anything until a sale is validated.</span>{" "}
          There is no fee for the airport, no fee for the carrier, no fee for the traveller and no fee for the
          retailer — the whole model is funded from the incremental margin on transactions that would not
          otherwise have taken place.
        </p>
      </div>

      <p className="text-slate-400 text-xs mt-3">
        Platform fee {Math.round(MODEL.platformFee * 1000) / 10}% of qualifying spend; carrier share{" "}
        {Math.round(MODEL.partnerRebate * 100)}% of that fee ({Math.round(MODEL.partnerRebate * MODEL.platformFee * 1000) / 10}% of the
        sale). Illustrative model, USD.
      </p>
    </SlideShell>
  );
}