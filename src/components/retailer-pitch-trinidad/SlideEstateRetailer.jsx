import { CheckCircle, TrendingUp } from "lucide-react";
import { SlideWrapper, GridBg, ACCENT } from "./Shared";
import { usd, usdShort, numShort } from "./retailerModel";
import { useRevenueInputs, computeRevenue, perStoreAtActivation } from "./RevenueContext";

const SENSITIVITY = [0.01, 0.02, 0.05];

export default function SlideEstateRetailer() {
  const { inputs } = useRevenueInputs();
  const { stores, activation, perStore, estate } = computeRevenue(inputs);

  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-5 md:px-10 md:py-5 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-3">
            <span className="text-xs md:text-sm font-semibold uppercase tracking-widest" style={{ color: ACCENT }}>
              Across Your Store Estate
            </span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-1.5">
              {usd(perStore.retailerNet)} Per Store, Per Year.{" "}
              <span style={{ color: ACCENT }}>Multiplied by Every Store You Operate.</span>
            </h2>
            <p className="text-slate-500 mt-1 text-sm md:text-base">
              The economics are identical in every store, because the acquisition work is done once, by DutyBoost.
              Scale is the only variable — and it is the one you already own.
            </p>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-2xl p-5 text-center mb-4 ring-2 ring-[#952d8b] max-w-3xl mx-auto">
            <div className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: ACCENT }}>
              {numShort(stores)} stores
            </div>
            <div className="text-3xl md:text-4xl font-bold mb-1" style={{ color: ACCENT }}>
              {usdShort(estate.retailerNet)}
            </div>
            <div className="text-sm font-medium" style={{ color: ACCENT }}>
              retailer net per year, across your estate
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
              <div className="text-slate-500 text-xs">
                {usdShort(estate.gross)} incremental retail value across your stores
              </div>
              <div className="text-slate-500 text-xs">
                {usdShort(estate.travellerSaving)} returned to travellers as DutyCredit savings
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-5 h-5" style={{ color: ACCENT }} />
                <h3 className="font-bold text-slate-800">Activation Is the Lever, Not Price</h3>
              </div>
              <p className="text-slate-600 text-sm mb-3">
                The commercial terms never change. What moves the number is how many travellers are pre-activated
                before they reach the airport — and that is DutyBoost's job, not yours.
              </p>
              <div className="space-y-2 text-sm">
                {SENSITIVITY.map((a) => {
                  const r = perStoreAtActivation(inputs, a);
                  const isCurrent = Math.round(a * 100) === Math.round(activation * 100);
                  return (
                    <div
                      key={a}
                      className={`flex items-center justify-between py-1.5 px-3 rounded-lg border ${
                        isCurrent ? "bg-purple-100 border-purple-200 font-semibold" : "bg-white border-slate-100"
                      }`}
                    >
                      <span className="text-slate-600">At {Math.round(a * 100)}% activation</span>
                      <span className="text-slate-700">{numShort(r.baskets)} baskets / store</span>
                      <span className="font-bold" style={{ color: ACCENT }}>
                        {usd(r.retailerNet)} / store
                      </span>
                    </div>
                  );
                })}
              </div>
              <p className="text-slate-400 text-[10px] mt-2 leading-snug">
                Per store, per year, at the {numShort(perStore.travellers)} travellers-a-year rate in the model and
                the redemption and basket values on the airport model slide.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
                <h3 className="font-bold text-green-900 mb-3">
                  Why This Is Pure Upside for Caribbean Airlines Duty Free
                </h3>
                <div className="space-y-2 text-sm">
                  {[
                    "100% incremental — earned on sales that would not otherwise exist",
                    "Zero upfront cost — no build, no licence, no store-level project",
                    "No change to your checkout, pricing or inventory logic",
                    "Attributed and reported per transaction, automatically",
                    "Every store you add compounds the same revenue",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div
                className="rounded-2xl p-5 text-white"
                style={{ background: "linear-gradient(135deg, #952d8b 0%, #6b1f66 100%)" }}
              >
                <p className="font-bold leading-snug">
                  {usd(perStore.retailerNet)} a year per store, on transactions that would not have happened.
                </p>
                <p className="text-purple-100 text-sm mt-2">
                  Same checkout, same shelf prices, no acquisition cost — the value is created, not redistributed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}