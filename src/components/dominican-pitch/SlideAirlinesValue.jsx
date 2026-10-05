import { CheckCircle, Plane } from "lucide-react";
import { AIRLINE, SlideShell } from "./Shared";
import { AIRLINES, num, usd2, usdShort } from "./figures";
import { useNetworkInputs, carrierEarnings } from "./NetworkContext";

const fmtPax = (a) =>
  a.passengers === null
    ? "not published"
    : `${a.under ? "under " : a.approx ? "±" : ""}${num(a.passengers)}${a.plus ? "+" : ""}`;

export default function SlideAirlinesValue() {
  const { inputs } = useNetworkInputs();

  const POINTS = [
    "A new revenue line on traffic the carrier already flies — no new route, no new aircraft, no new cost",
    "A welcome benefit for every passenger, at zero cost to the carrier and zero cost to the traveller",
    "Differentiation on the booking page: a reason to choose this carrier into the Dominican Republic",
    "No integration project — DutyBoost does the work and the carrier's share is credited automatically",
    "Portable across the network: it works at every airport where retail partners are live, not only in the DR",
  ];

  return (
    <SlideShell
      eyebrow="Value to the Carriers"
      eyebrowColor={AIRLINE}
      title={
        <>
          Ancillary Revenue{" "}
          <span style={{ color: AIRLINE }}>on Passengers Already Booked</span>
        </>
      }
      subtitle="Each carrier is modelled on its own 2025 Dominican traffic, at the standard 2% pre-activation, 30% redemption and $135 blended basket. The share credited is 0.5% of each validated sale."
    >
      <div className="overflow-x-auto rounded-2xl border border-slate-200">
        <table className="w-full text-sm min-w-[720px]">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wide">
              <th className="text-left px-4 py-3 font-semibold">Carrier</th>
              <th className="text-right px-4 py-3 font-semibold">2025 passengers to/from the DR</th>
              <th className="text-right px-4 py-3 font-semibold">Baskets pre-activated</th>
              <th className="text-right px-4 py-3 font-semibold">Retail value created</th>
              <th className="text-right px-4 py-3 font-semibold">Carrier share / year</th>
            </tr>
          </thead>
          <tbody>
            {AIRLINES.map((a) => {
              const e = carrierEarnings(a.passengers, inputs);
              return (
                <tr key={a.name} className="border-t border-slate-100">
                  <td className="px-4 py-3 font-semibold text-[#0a0f1e] whitespace-nowrap">{a.name}</td>
                  <td className="px-4 py-3 text-right text-slate-500 whitespace-nowrap">{fmtPax(a)}</td>
                  <td className="px-4 py-3 text-right text-slate-700 whitespace-nowrap">
                    {e ? num(e.baskets) : "—"}
                  </td>
                  <td className="px-4 py-3 text-right text-slate-700 whitespace-nowrap">
                    {e ? usdShort(e.gross) : "—"}
                  </td>
                  <td
                    className="px-4 py-3 text-right font-bold whitespace-nowrap"
                    style={{ color: AIRLINE }}
                  >
                    {e ? usd2(e.rebate) : "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <Plane className="w-5 h-5" style={{ color: AIRLINE }} />
            <h3 className="font-bold" style={{ color: AIRLINE }}>
              Small per carrier, structural for the market
            </h3>
          </div>
          <p className="text-slate-600 text-sm leading-relaxed">
            On its own Dominican traffic, a single carrier's share looks modest — which is exactly the point. It
            costs the carrier nothing, requires nothing of its operations, and grows automatically as more retail
            partners come live at the three gateways.
          </p>
          <p className="text-slate-500 text-sm mt-3 leading-relaxed">
            For a carrier such as Arajet, already flying {num(1279906)} passengers to and from the country, it is
            a revenue line that appears without a single change to the network.
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
          <h3 className="font-bold text-slate-800 mb-3">What the carrier is asked to do</h3>
          <div className="space-y-2">
            {POINTS.map((p) => (
              <div key={p} className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-slate-600 text-sm leading-snug">{p}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="text-slate-400 text-xs mt-3">
        Illustrative, USD, at standard DutyBoost terms and the assumptions entered on the model slide. Carrier
        figures are 2025 passengers to and from the Dominican Republic. Sunrise Airways Dominicana is excluded for
        want of a published full-year figure.
      </p>
    </SlideShell>
  );
}