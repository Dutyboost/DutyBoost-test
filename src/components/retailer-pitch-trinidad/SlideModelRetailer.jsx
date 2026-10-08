import { CheckCircle, Percent } from "lucide-react";
import { SlideWrapper, GridBg, ACCENT } from "./Shared";
import { MODEL, TIER_ROWS } from "./retailerModel";

export default function SlideModelRetailer() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-5 md:px-10 md:py-5 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-3">
            <span className="text-xs md:text-sm font-semibold uppercase tracking-widest" style={{ color: ACCENT }}>
              Business Model
            </span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-1.5">
              Performance-Based. <span style={{ color: ACCENT }}>Zero Upfront Cost.</span>
            </h2>
            <p className="text-slate-500 mt-1 text-sm md:text-base">
              Revenue is created only when a qualifying transaction is validated through your Enterprise POS — and
              the retailer keeps the sale.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-slate-800 text-white rounded-2xl p-4 sm:p-5">
              <h3 className="font-bold text-white text-base md:text-lg mb-3">The DutyCredit Tier Structure</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-slate-500 mb-1 px-2">
                <span>Tier</span>
                <span>Basket</span>
                <span>Discount</span>
                <span className="sm:text-right">Traveller Saves</span>
              </div>
              <div className="space-y-1">
                {TIER_ROWS.map((row, i) => (
                  <div
                    key={row.tier}
                    className={`grid grid-cols-2 sm:grid-cols-4 gap-x-2 gap-y-0.5 py-1 px-2 rounded-lg text-xs ${
                      i === 0 ? "bg-purple-800/60" : "hover:bg-white/5"
                    }`}
                  >
                    <span className="text-purple-300 font-semibold">{row.tier}</span>
                    <span className="text-slate-300">{row.range}</span>
                    <span className="text-yellow-300">{row.disc}</span>
                    <span className="text-green-300 font-semibold sm:text-right">{row.save}</span>
                  </div>
                ))}
              </div>
              <p className="text-slate-400 text-[10px] mt-2 leading-snug">
                Qualifying spend is capped at $1,000 and the traveller discount at $60 — spend above the cap stays
                with the retailer.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4 sm:p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Percent className="w-5 h-5" style={{ color: ACCENT }} />
                  <h3 className="font-bold text-purple-900">The 2.5% Platform Fee — Your Only Cost</h3>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-3">
                  A single {Math.round(MODEL.platformFee * 1000) / 10}% fee on DutyBoost-validated transactions only
                  — never on your existing sales. At the Entry tier the retailer keeps 92.5% of every qualifying
                  sale.
                </p>
                <div className="space-y-2 text-sm">
                  {[
                    "Applied only when a DutyCredit redemption is validated through your POS",
                    "No impact on your shelf prices or your non-DutyBoost sales",
                    "Attributed and reported per transaction, automatically",
                    "No setup, subscription or integration fees — ever",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: ACCENT }} />
                      <span className="text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
                <h3 className="font-bold text-green-900 mb-2">The Retailer Economics</h3>
                <div className="space-y-1.5 text-sm">
                  {[
                    { metric: "Retailer keeps", val: "92.5% of every qualifying sale (Entry tier)" },
                    { metric: "Upfront cost", val: "$0 — no setup, subscription or integration fees" },
                    { metric: "Customer acquisition", val: "Funded by DutyBoost before the traveller arrives" },
                    { metric: "Payment terms", val: "Performance-based — only on validated transactions" },
                  ].map((row) => (
                    <div key={row.metric} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-slate-700 font-semibold">{row.metric}: </span>
                        <span className="text-slate-600">{row.val}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}