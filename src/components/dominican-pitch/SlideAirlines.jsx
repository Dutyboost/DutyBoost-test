import { AIRLINE, SlideShell } from "./Shared";
import { AIRLINES, CARRIER_PASSENGERS, num } from "./figures";

const fmt = (a) =>
  a.passengers === null
    ? "Not published"
    : `${a.under ? "under " : a.approx ? "±" : ""}${num(a.passengers)}${a.plus ? "+" : ""}`;

export default function SlideAirlines() {
  return (
    <SlideShell
      eyebrow="The Carriers"
      eyebrowColor={AIRLINE}
      title={
        <>
          Six Carriers, <span style={{ color: AIRLINE }}>±{num(CARRIER_PASSENGERS)} Passengers in 2025</span>
        </>
      }
      subtitle="The carriers are how DutyBoost reaches the traveller before the airport — a DutyCredit attached to a booking, weeks ahead of departure. These are the numbers on the Dominican side of the network."
    >
      <div className="overflow-x-auto rounded-2xl border border-slate-200">
        <table className="w-full text-sm min-w-[760px]">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wide">
              <th className="text-left px-4 py-3 font-semibold">Carrier</th>
              <th className="text-right px-4 py-3 font-semibold">2025 passengers to/from the DR</th>
              <th className="text-right px-4 py-3 font-semibold">Approx. per day</th>
              <th className="text-left px-4 py-3 font-semibold">Main international destinations</th>
            </tr>
          </thead>
          <tbody>
            {AIRLINES.map((a) => (
              <tr key={a.name} className="border-t border-slate-100 align-top">
                <td className="px-4 py-3 font-semibold text-[#0a0f1e] whitespace-nowrap">{a.name}</td>
                <td className="px-4 py-3 text-right font-bold whitespace-nowrap" style={{ color: AIRLINE }}>
                  {fmt(a)}
                </td>
                <td className="px-4 py-3 text-right text-slate-500 whitespace-nowrap">{a.perDay}</td>
                <td className="px-4 py-3 text-slate-600 text-xs leading-relaxed">{a.destinations}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
          <div className="text-2xl font-bold" style={{ color: AIRLINE }}>
            ±4,150
          </div>
          <p className="text-slate-600 text-sm mt-1">
            passengers a day across the five carriers with published 2025 figures
          </p>
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
          <div className="text-2xl font-bold text-[#0a0f1e]">6</div>
          <p className="text-slate-600 text-sm mt-1">
            carriers active on the Dominican market, from a network carrier to executive charter
          </p>
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
          <div className="text-2xl font-bold text-[#0a0f1e]">26</div>
          <p className="text-slate-600 text-sm mt-1">
            countries reached non-stop from Punta Cana alone — every one of them a DutyBoost market
          </p>
        </div>
      </div>

      <p className="text-slate-400 text-xs mt-3">
        Arajet carried ±2.8 million passengers network-wide in 2025, of which {num(1279906)} to and from the
        Dominican Republic. Sunrise Airways Dominicana operates a Caribbean and US network with no reliable
        full-year 2025 figure published, so it is excluded from the totals above.
      </p>
    </SlideShell>
  );
}