import { Plane, Users, TrendingUp } from "lucide-react";
import { ACCENT, RETAIL, SlideShell } from "./Shared";
import { MARKET, SOURCES, num } from "./figures";

const STATS = [
  {
    Icon: Users,
    value: MARKET.drPassengers,
    label: MARKET.drNote,
    source: SOURCES.dr,
    sourceLabel: "Dominican airport operators, 2025",
  },
  {
    Icon: Plane,
    value: "±4,150",
    label: "passengers a day carried by the six Dominican and Caribbean carriers we can measure",
    source: null,
    sourceLabel: "Carrier traffic to and from the DR, 2025",
  },
  {
    Icon: TrendingUp,
    value: "+9.9%",
    label: "passenger growth at Punta Cana in 2025 — the fastest-growing major gateway in the region",
    source: SOURCES.puj,
    sourceLabel: "Punta Cana International Airport",
  },
];

export default function SlideOpportunity() {
  return (
    <SlideShell
      eyebrow="The Opportunity"
      eyebrowColor={ACCENT}
      title={
        <>
          The Caribbean's Busiest Air Market —{" "}
          <span style={{ color: RETAIL }}>and Its Largest Conversion Gap</span>
        </>
      }
      subtitle="The Dominican Republic already moves more international passengers than any of its neighbours. What it does not yet do is convert them, at the point of departure, into retail spend."
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        {STATS.map((s) => (
          <div key={s.value} className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
            <s.Icon className="w-7 h-7 mb-3" style={{ color: ACCENT }} />
            <div className="text-2xl md:text-3xl font-bold text-[#0a0f1e]">{s.value}</div>
            <p className="text-slate-600 text-sm mt-2 leading-relaxed">{s.label}</p>
            <p className="text-slate-400 text-xs mt-3">
              {s.source ? (
                <a
                  href={s.source}
                  target="_blank"
                  rel="noreferrer"
                  className="underline decoration-slate-300 hover:text-slate-600"
                >
                  {s.sourceLabel}
                </a>
              ) : (
                s.sourceLabel
              )}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
          <div className="flex items-center justify-between text-sm font-semibold mb-2">
            <span className="text-slate-700">What travellers do today</span>
            <span className="text-slate-400">Industry benchmark</span>
          </div>
          <div className="flex h-7 rounded-full overflow-hidden">
            <div className="bg-green-500" style={{ width: `${MARKET.purchaseShare * 100}%` }} />
            <div className="bg-slate-300" style={{ width: `${MARKET.nonPurchaseShare * 100}%` }} />
          </div>
          <div className="flex justify-between text-xs mt-2">
            <span className="text-green-700 font-semibold">22% purchase</span>
            <span className="text-slate-500 font-semibold">78% leave without buying</span>
          </div>
          <p className="text-slate-500 text-sm mt-3 leading-relaxed">
            Across the three gateways that is roughly{" "}
            <span className="font-semibold text-slate-700">16 million passenger movements</span> a year, of which
            the large majority passes through the retail concourse without a single transaction.
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
          <h3 className="font-bold text-blue-900 mb-2">The missing step is not retail space</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            The Dominican Republic has the terminals, the concessionaires, the brands and the traffic. What it
            lacks is a reason for a traveller to arrive at the airport already intending to buy — the step
            DutyBoost supplies by pre-activating travellers before they fly, through the carriers that already
            carry them.
          </p>
          <p className="text-slate-500 text-sm mt-3 leading-relaxed">
            No new terminals, no new concessions, no public spending. The same travellers, given a reason to
            shop, at the moment they are already in the building.
          </p>
        </div>
      </div>

      <p className="text-slate-400 text-xs mt-3">
        Carrier figures are 2025 passenger numbers to and from the Dominican Republic: {num(1279906)} (Arajet),{" "}
        {num(150000)}+ (SKYhigh Dominicana), {num(50000)}+ (Air Century), ±{num(28237)} (RED Air) and under{" "}
        {num(10000)} (Panorama Jets). Sunrise Airways Dominicana publishes no full-year 2025 figure.
      </p>
    </SlideShell>
  );
}