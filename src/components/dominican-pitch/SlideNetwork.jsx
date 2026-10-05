import { CheckCircle, TrendingUp } from "lucide-react";
import { AIRLINE, RETAIL, SlideShell } from "./Shared";
import { CARRIER_PER_DAY, usd, usdShort, numShort, num } from "./figures";
import { useNetworkInputs, computeNetwork, atActivation } from "./NetworkContext";

const SENSITIVITY = [0.01, 0.02, 0.05];

export default function SlideNetwork() {
  const { inputs } = useNetworkInputs();
  const { year, activation } = computeNetwork(inputs);

  return (
    <SlideShell
      eyebrow="Across the Three Gateways"
      eyebrowColor={RETAIL}
      title={
        <>
          {usdShort(year.groupNet)} a Year,{" "}
          <span style={{ color: RETAIL }}>From Travellers Already Flying In</span>
        </>
      }
      subtitle={`The scenario entered on the model slide, applied to ${num(CARRIER_PER_DAY)}+ carrier passengers a day and 365 days of the year.`}
    >
      <div
        className="rounded-2xl p-6 text-white text-center mb-4 max-w-3xl mx-auto"
        style={{ background: `linear-gradient(135deg, ${RETAIL} 0%, ${AIRLINE} 100%)` }}
      >
        <div className="text-xs font-semibold uppercase tracking-widest opacity-80 mb-2">
          Combined net, one year
        </div>
        <div className="text-4xl md:text-5xl font-bold mb-1">{usdShort(year.groupNet)}</div>
        <p className="text-white/85 text-sm">
          Airport retail net plus the share credited to the carriers that brought the travellers
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-4 text-xs">
          <div className="text-white/80">{usdShort(year.gross)} incremental retail value</div>
          <div className="text-white/80">{usdShort(year.fee)} platform fee, on validated sales</div>
          <div className="text-white/80">{usdShort(year.rebate)} credited to the carriers</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5" style={{ color: RETAIL }} />
            <h3 className="font-bold text-slate-800">Activation is the only lever that matters</h3>
          </div>
          <p className="text-slate-600 text-sm mb-3">
            The terms never change and nothing is negotiated market by market. What moves the number is how many
            travellers arrive already holding a DutyCredit — which is DutyBoost's job, not the country's.
          </p>
          <div className="space-y-2 text-sm">
            {SENSITIVITY.map((a) => {
              const r = atActivation(inputs, a);
              const isCurrent = Math.round(a * 100) === Math.round(activation * 100);
              return (
                <div
                  key={a}
                  className={`flex items-center justify-between gap-2 py-1.5 px-3 rounded-lg border ${
                    isCurrent ? "bg-blue-100 border-blue-200 font-semibold" : "bg-white border-slate-100"
                  }`}
                >
                  <span className="text-slate-600">At {Math.round(a * 100)}% pre-activation</span>
                  <span className="text-slate-700">{numShort(r.baskets)} baskets</span>
                  <span className="font-bold" style={{ color: RETAIL }}>
                    {usdShort(r.groupNet)} / yr
                  </span>
                </div>
              );
            })}
          </div>
          <p className="text-slate-400 text-[10px] mt-2 leading-snug">
            Per year, at the passengers-a-day, redemption and basket values on the model slide. Values in USD.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
            <h3 className="font-bold text-blue-900 mb-3">Why this is upside, not a transfer</h3>
            <div className="space-y-2 text-sm">
              {[
                "Every transaction is incremental — none of it cannibalises existing sales",
                "No upfront cost for the airports, the retailers, the carriers or the state",
                "The retailer keeps the balance of every sale above the qualifying cap",
                "The carriers earn on the traffic they already carry",
                "The state gains the activity, the data and the tax base — and spends nothing",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-slate-800 text-white rounded-2xl p-5">
            <p className="font-bold leading-snug">
              {usd(year.groupNet)} a year, on transactions that would not otherwise have happened.
            </p>
            <p className="text-slate-300 text-sm mt-2">
              The value is created in the departure hall, not redistributed from anyone in it.
            </p>
          </div>
        </div>
      </div>
    </SlideShell>
  );
}