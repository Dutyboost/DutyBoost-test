import { SlideWrapper, GridBg, Glow, SlideHeader, CARD } from "@/components/phygrid-pitch/Shared";
import { MODEL, PER_STORE, eur2 } from "@/components/phygrid-pitch/model";
import { Euro, Wallet, CheckCircle2, PieChart } from "lucide-react";

const BASKET = 100;

export default function SlideRevenueSplit() {
  const rows = [
    { label: "Original qualifying retail value", val: eur2(BASKET), style: "text-[#0a0f1e] font-bold" },
    { label: `Traveller DutyCredit saving (${MODEL.travellerSaving * 100}%)`, val: `−${eur2(BASKET * MODEL.travellerSaving)}`, style: "text-amber-600" },
    { label: "Traveller actually pays", val: eur2(BASKET * (1 - MODEL.travellerSaving)), style: "text-slate-700" },
    { label: `DutyBoost platform fee (${MODEL.platformFee * 100}% of retail value)`, val: eur2(BASKET * MODEL.platformFee), style: "text-slate-500" },
    { label: "→ Phygrid share (10% of the fee)", val: eur2(BASKET * MODEL.platformFee * MODEL.posShare), style: "text-blue-600" },
    { label: "→ DutyBoost share (90% of the fee)", val: eur2(BASKET * MODEL.platformFee * (1 - MODEL.posShare)), style: "text-slate-500" },
  ];

  const fee = BASKET * MODEL.platformFee;

  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <Glow className="top-0 right-0 w-[420px] h-[420px]" />
        <div className="relative z-10">
          <SlideHeader
            eyebrow="The Revenue Split"
            title={<>A Proposed <span className="text-blue-600">10% Share of the Platform Fee</span> on Every Validated Basket</>}
            subtitle="DutyBoost charges a 2.5% platform fee on each validated DutyCredit basket and would share 10% of it with the POS provider that validates the transaction. No setup fee, no licence, no subscription — revenue only when a sale actually happens."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            <div className={`${CARD} p-5`}>
              <div className="flex items-center gap-2 mb-4">
                <Euro className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-[#0a0f1e] text-sm md:text-base">How a €100 Basket Splits</h3>
              </div>
              <div className="space-y-1">
                {rows.map((r, i) => (
                  <div key={r.label} className={`flex items-center justify-between py-2 ${i < rows.length - 1 ? "border-b border-slate-200" : ""}`}>
                    <span className={`text-xs md:text-sm ${r.label.startsWith("→") ? "pl-3 text-slate-500" : "text-slate-600"}`}>{r.label}</span>
                    <span className={`text-sm font-semibold ${r.style}`}>{r.val}</span>
                  </div>
                ))}
                <div className="flex items-center justify-between rounded-xl px-4 py-2.5 mt-2 bg-white border border-slate-200">
                  <span className="text-slate-700 font-bold text-xs md:text-sm">Store nets before normal costs</span>
                  <span className="text-[#0a0f1e] font-bold text-lg">{eur2(PER_STORE.retailerNet / PER_STORE.baskets)}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className={`${CARD} p-5`}>
                <div className="flex items-center gap-2 mb-3">
                  <PieChart className="w-5 h-5 text-blue-600" />
                  <h3 className="font-bold text-[#0a0f1e] text-sm md:text-base">Where the {eur2(fee)} Fee Goes</h3>
                </div>
                <div className="space-y-3">
                  {[
                    { party: "Phygrid (POS provider)", share: "10% of the fee", pct: "0.25% of retail value", val: eur2(fee * 0.1), strong: true },
                    { party: "DutyBoost", share: "90% of the fee", pct: "2.25% of retail value", val: eur2(fee * 0.9), strong: false },
                  ].map((row) => (
                    <div
                      key={row.party}
                      className={`flex items-center gap-4 rounded-xl p-4 ${
                        row.strong ? "bg-blue-50 border border-blue-200" : "bg-white border border-slate-200"
                      }`}
                    >
                      <div className={`w-1.5 h-12 rounded-full ${row.strong ? "bg-blue-600" : "bg-slate-300"}`} />
                      <div className="flex-1">
                        <div className={`font-semibold text-sm ${row.strong ? "text-blue-700" : "text-[#0a0f1e]"}`}>{row.party}</div>
                        <div className="text-slate-500 text-xs mt-0.5">{row.share} = {row.pct}</div>
                      </div>
                      <div className={`text-xl font-bold ${row.strong ? "text-blue-700" : "text-slate-700"}`}>{row.val}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <div className="text-slate-500 text-xs uppercase tracking-wide mb-2">Fee distribution</div>
                  <div className="flex h-5 rounded-full overflow-hidden gap-px">
                    <div className="bg-blue-600" style={{ width: "10%" }} />
                    <div className="bg-slate-300" style={{ width: "90%" }} />
                  </div>
                  <div className="flex gap-4 mt-2 flex-wrap text-xs">
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-sm bg-blue-600" />
                      <span className="text-slate-500">Phygrid 10%</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-sm bg-slate-300" />
                      <span className="text-slate-500">DutyBoost 90%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl p-5 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <Wallet className="w-5 h-5 text-blue-600" />
                  <h3 className="text-blue-900 font-bold text-sm md:text-base">Why the Split Works for Phygrid</h3>
                </div>
                <div className="space-y-1.5">
                  {[
                    "You already process the transaction — €0 marginal cost",
                    "Earned only on incremental sales: €0 on non-converters",
                    "No change to your core, payments or merchant contracts",
                    "Attributed and reported transparently per transaction",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-600 text-xs md:text-sm">{item}</span>
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