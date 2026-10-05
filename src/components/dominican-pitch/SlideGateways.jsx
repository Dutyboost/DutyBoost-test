import { MapPin } from "lucide-react";
import { ACCENT, RETAIL, SlideShell } from "./Shared";
import { AIRPORTS } from "./figures";

export default function SlideGateways() {
  return (
    <SlideShell
      eyebrow="The Three Gateways"
      eyebrowColor={RETAIL}
      title={
        <>
          Three Airports, <span style={{ color: RETAIL }}>One Departure Hall Story</span>
        </>
      }
      subtitle="Every DutyCredit is redeemed in a departure hall. These are the three doors the Dominican Republic gives its travellers — and the three places the model earns."
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {AIRPORTS.map((a) => (
          <div key={a.code} className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <div
                className="text-white font-bold rounded-xl px-3 py-1.5 text-sm tracking-wide"
                style={{ background: RETAIL }}
              >
                {a.code}
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-[#0a0f1e]">{a.passengers}</div>
                <div className="text-[11px] text-slate-400 uppercase tracking-wide">passengers 2025</div>
              </div>
            </div>
            <h3 className="font-heading font-bold text-[#0a0f1e] leading-tight">{a.name}</h3>
            <div className="flex items-center gap-1.5 text-slate-400 text-xs mt-1 mb-3">
              <MapPin className="w-3.5 h-3.5" /> {a.city}
            </div>
            <p className="text-slate-600 text-sm leading-relaxed flex-1">{a.headline}</p>
            <p className="text-slate-500 text-xs mt-2 leading-relaxed">{a.detail}</p>
            {a.growth && (
              <div className="mt-3 inline-flex self-start text-xs font-semibold text-green-700 bg-green-50 border border-green-200 rounded-lg px-2.5 py-1">
                {a.growth}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 bg-slate-800 text-white rounded-2xl p-5">
        <p className="text-sm leading-relaxed">
          <span className="font-bold">Two international gateways carry the volume and one carries the
          premium.</span>{" "}
          Punta Cana and Las Américas give DutyBoost scale; La Isabela gives it the executive and charter
          traveller, who redeems at the same counters with a higher average basket.
        </p>
      </div>

      <p className="text-slate-400 text-xs mt-3">
        Punta Cana: more than 11 million passenger movements in 2025 (+9.9% year on year), 35,092 flights, 81
        international airports in 26 countries. Las Américas: the country's second-busiest airport. La Isabela: 42
        thousand passengers in 2025, dedicated to private and executive aviation.
      </p>
    </SlideShell>
  );
}