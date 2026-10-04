import { CheckCircle, Percent } from "lucide-react";
import { SlideWrapper, GridBg } from "@/components/phygrid-pitch/Shared";
import { MODEL } from "@/components/phygrid-pitch/model";
import EstateCalculator from "@/components/phygrid-pitch/slides/EstateCalculator";

const TIERS = [
  { tier: "Entry", range: "$23–$56", disc: "5%–7.5%", save: "$1.14–$3.64" },
  { tier: "Boarding", range: "$57–$113", disc: "7.5%–10%", save: "$4.28–$10.73" },
  { tier: "Standard", range: "$114–$170", disc: "10%–12.5%", save: "$11.40–$20.81" },
  { tier: "Plus", range: "$171–$227", disc: "12.5%–15%", save: "$21.38–$33.11" },
  { tier: "Lounge", range: "$228–$284", disc: "15%–17.5%", save: "$34.20–$48.74" },
  { tier: "Premium", range: "$285–$341", disc: "17.5%–20%", save: "$49.88–$64.98" },
  { tier: "VIP", range: "$342+", disc: "20% capped", save: "Up to $68" },
];

export default function SlideModel() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">Business Model</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              Performance-Based. <span className="text-blue-600">Zero Upfront Cost.</span>
            </h2>
            <p className="text-slate-500 mt-1 text-sm">
              Revenue is created only when a qualifying transaction is validated through the POS — and the POS
              provider takes a share of the platform fee on every one of them.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-slate-800 text-white rounded-2xl p-4 sm:p-6">
              <h3 className="font-bold text-white text-lg mb-3 sm:mb-4">The DutyCredit Tier Structure</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-slate-500 mb-1 px-2">
                <span>Tier</span>
                <span>Basket</span>
                <span>Discount</span>
                <span className="sm:text-right">Traveller Saves</span>
              </div>
              <div className="space-y-1">
                {TIERS.map((row, i) => (
                  <div
                    key={row.tier}
                    className={`grid grid-cols-2 sm:grid-cols-4 gap-x-2 gap-y-0.5 py-1.5 px-2 rounded-lg text-xs ${
                      i === 0 ? "bg-blue-800/60" : "hover:bg-white/5"
                    }`}
                  >
                    <span className="text-blue-300 font-semibold">{row.tier}</span>
                    <span className="text-slate-300">{row.range}</span>
                    <span className="text-yellow-300">{row.disc}</span>
                    <span className="text-green-300 font-semibold sm:text-right">{row.save}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Percent className="w-5 h-5 text-blue-600" />
                  <h3 className="font-bold text-blue-900">The 2.5% Platform Fee — The Only Cost</h3>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-3">
                  A single 2.5% fee on DutyBoost-validated transactions only — never on existing sales. The POS
                  provider earns {Math.round(MODEL.posShare * 100)}% of that fee on every validated sale.
                </p>
                <div className="space-y-2 text-sm">
                  {[
                    "Applied only when a DutyCredit redemption is validated through the POS",
                    "No impact on shelf prices or non-DutyBoost sales",
                    "Settled transparently — attributed and reported per transaction",
                    "Nothing to build per store and nothing to pay upfront",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            <div className="md:col-span-2">
              <EstateCalculator />
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}