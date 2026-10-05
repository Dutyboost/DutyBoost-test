import { CheckCircle, TrendingUp } from "lucide-react";
import { SlideWrapper, GridBg } from "@/components/phygrid-pitch/Shared";
import { usd, usd2, usdShort, numShort } from "@/components/phygrid-pitch/model";
import {
  useEstateInputs,
  computeEstate,
  perStoreAtActivation,
} from "@/components/phygrid-pitch/EstateContext";

const SENSITIVITY = [0.01, 0.02, 0.05];

export default function SlideEstate() {
  const { inputs } = useEstateInputs();
  const { stores, activation, perStore, estate } = computeEstate(inputs);

  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">
              Across the Store Estate
            </span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              {usd2(perStore.pos)} Per Store. <span className="text-blue-600">Multiplied by Your Whole Estate.</span>
            </h2>
            <p className="text-slate-500 mt-1 text-sm">
              The commission is identical in every store, because the work is done once. Scale is the only
              variable — and it is the one a POS provider already owns.
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 text-center mb-5 ring-2 ring-blue-500 max-w-3xl mx-auto">
            <div className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-2">
              {numShort(stores)} stores
            </div>
            <div className="text-3xl md:text-4xl font-bold text-blue-700 mb-1">{usdShort(estate.pos)}</div>
            <div className="text-blue-600 text-sm font-medium">POS provider commission per year</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
              <div className="text-slate-500 text-xs">
                {usdShort(estate.gross)} incremental retail value across the estate
              </div>
              <div className="text-slate-500 text-xs">
                {usdShort(estate.retailerNet)} retailer net across the estate
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-slate-800">Activation Is the Lever, Not Price</h3>
              </div>
              <p className="text-slate-600 text-sm mb-3">
                The commercial terms never change. What moves the number is how many travellers are activated
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
                        isCurrent ? "bg-blue-100 border-blue-200 font-semibold" : "bg-white border-slate-100"
                      }`}
                    >
                      <span className="text-slate-600">At {Math.round(a * 100)}% activation</span>
                      <span className="text-slate-700">{numShort(Math.round(r.baskets))} baskets</span>
                      <span className="text-blue-700 font-bold">{usd2(r.pos)} / store</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
                <h3 className="font-bold text-green-900 mb-3">Why This Is Pure Upside for Phygrid</h3>
                <div className="space-y-2 text-sm">
                  {[
                    "100% incremental — earned on sales that would not otherwise exist",
                    "Zero upfront cost — no build, no licence, no store-level project",
                    "No change to the checkout, pricing or inventory logic you already run",
                    "Attributed and reported per transaction, automatically",
                    "Every store added to your estate compounds the same revenue",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-5 text-white">
                <p className="font-bold leading-snug">
                  The retailer earns {usd(perStore.retailerNet)} a year for every {usd2(perStore.pos)} you earn.
                </p>
                <p className="text-blue-100 text-sm mt-2">
                  Same transactions, same checkout, no argument about who benefits — the value is created, not
                  redistributed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}