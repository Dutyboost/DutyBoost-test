import { CheckCircle, TrendingUp } from "lucide-react";
import { SlideShell, RETAIL } from "./Shared";
import { usd, usdShort, numShort, NET_PLATFORM_RATE } from "./dealModel";
import { useDealInputs, computeDeal, atActivation, DEFAULT_ACTIVATION } from "./DealContext";

const SENSITIVITY = [0.01, 0.02, 0.05];

export default function SlideNetworkDeal() {
  const { inputs } = useDealInputs();
  const { passengersDay, activation, year } = computeDeal(inputs);

  return (
    <SlideShell
      eyebrow="Across the Network"
      eyebrowColor={RETAIL}
      title={
        <>
          {usdShort(year.groupNet)} a Year, From{" "}
          <span style={{ color: RETAIL }}>Travellers You Already Carry</span>
        </>
      }
      subtitle={`The same scenario entered on the model slide, applied to ${numShort(passengersDay)} Caribbean Airlines passengers a day — both positions, one year.`}
    >
      <div className="bg-purple-50 border border-purple-200 rounded-2xl p-5 text-center mb-4 ring-2 ring-[#952d8b] max-w-3xl mx-auto">
        <div className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: RETAIL }}>
          Caribbean Airlines group, one year
        </div>
        <div className="text-3xl md:text-4xl font-bold mb-1" style={{ color: RETAIL }}>
          {usdShort(year.groupNet)}
        </div>
        <div className="text-sm font-medium" style={{ color: RETAIL }}>
          Caribbean Duty Free net plus the Travel Partner rebate
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-4">
          <div className="text-slate-500 text-xs">
            {usdShort(year.gross)} incremental retail value
          </div>
          <div className="text-slate-500 text-xs">
            {usdShort(year.fee)} platform fee paid as Retailer
          </div>
          <div className="text-slate-500 text-xs">
            {usdShort(year.rebate)} earned back as Travel Partner
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5" style={{ color: RETAIL }} />
            <h3 className="font-bold text-slate-800">Activation Is the Lever, Not Price</h3>
          </div>
          <p className="text-slate-600 text-sm mb-3">
            The commercial terms never change. What moves the number is how many of your passengers arrive
            pre-activated — and that is DutyBoost's job, not the airline's.
          </p>
          <div className="space-y-2 text-sm">
            {SENSITIVITY.map((a) => {
              const r = atActivation(inputs, a);
              const isCurrent = Math.round(a * 100) === Math.round(activation * 100);
              return (
                <div
                  key={a}
                  className={`flex items-center justify-between gap-2 py-1.5 px-3 rounded-lg border ${
                    isCurrent ? "bg-purple-100 border-purple-200 font-semibold" : "bg-white border-slate-100"
                  }`}
                >
                  <span className="text-slate-600">At {Math.round(a * 100)}% activation</span>
                  <span className="text-slate-700">{numShort(r.baskets)} baskets</span>
                  <span className="font-bold" style={{ color: RETAIL }}>
                    {usdShort(r.groupNet)} / yr
                  </span>
                </div>
              );
            })}
          </div>
          <p className="text-slate-400 text-[10px] mt-2 leading-snug">
            Per year, at the {numShort(passengersDay)} passengers-a-day rate you entered and the redemption and
            basket values on the model slide. Default scenario assumes {DEFAULT_ACTIVATION}% pre-activation.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
            <h3 className="font-bold text-green-900 mb-3">Why This Is Pure Upside</h3>
            <div className="space-y-2 text-sm">
              {[
                "100% incremental — earned on sales that would not otherwise exist",
                "Zero upfront cost — no build, no licence, no store-level project",
                "The airline earns as Travel Partner even when the traveller buys elsewhere",
                "As Retailer, Caribbean Duty Free pays only on sales that actually happen",
                `Net platform cost as Retailer is ${Math.round(NET_PLATFORM_RATE * 1000) / 10}% of a validated sale`,
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
              {usd(year.groupNet)} a year across the network, on transactions that would not have happened.
            </p>
            <p className="text-purple-100 text-sm mt-2">
              The airline earns from the travellers it already carries, and the retailer earns from converting
              them — the value is created, not redistributed.
            </p>
          </div>
        </div>
      </div>
    </SlideShell>
  );
}