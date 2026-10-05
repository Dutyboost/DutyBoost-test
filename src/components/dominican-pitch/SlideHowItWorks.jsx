import { Plane, Ticket, ShoppingBag, QrCode, BadgeCheck } from "lucide-react";
import { ACCENT, AIRLINE, RETAIL, SlideShell } from "./Shared";

const STEPS = [
  {
    Icon: Ticket,
    step: "01",
    title: "Booking",
    body: "The carrier attaches a DutyCredit to the traveller's booking. No change to the fare, no change to the itinerary.",
  },
  {
    Icon: Plane,
    step: "02",
    title: "Pre-activation",
    body: "Weeks before departure the traveller knows the benefit exists, and that it is only redeemable in the departure hall.",
  },
  {
    Icon: ShoppingBag,
    step: "03",
    title: "The airport",
    body: "The traveller arrives intending to buy, shops the concourse, and picks the store — not the other way round.",
  },
  {
    Icon: QrCode,
    step: "04",
    title: "Redemption",
    body: "One QR scan at the existing POS. The discount is applied, the sale is recorded, the traveller pays the balance.",
  },
  {
    Icon: BadgeCheck,
    step: "05",
    title: "Settlement",
    body: "Only validated transactions carry the platform fee, and the carrier's share is credited automatically.",
  },
];

export default function SlideHowItWorks() {
  return (
    <SlideShell
      eyebrow="How It Works"
      eyebrowColor={ACCENT}
      title={
        <>
          One API Call at the Till.{" "}
          <span style={{ color: RETAIL }}>Nothing Else Changes.</span>
        </>
      }
      subtitle="DutyBoost is a conversion layer, not a platform replacement. It sits between the booking system and the point of sale, and it is switched on one store at a time."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {STEPS.map((s) => (
          <div key={s.step} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <s.Icon className="w-6 h-6" style={{ color: ACCENT }} />
              <span className="text-slate-300 font-heading font-bold text-lg">{s.step}</span>
            </div>
            <h3 className="font-bold text-[#0a0f1e] text-sm mb-2">{s.title}</h3>
            <p className="text-slate-600 text-xs leading-relaxed">{s.body}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        <div className="rounded-2xl p-5" style={{ background: `${RETAIL}0f` }}>
          <h3 className="font-bold mb-2" style={{ color: RETAIL }}>
            For the retailer
          </h3>
          <ul className="text-slate-600 text-sm space-y-1.5 list-disc pl-4">
            <li>One integration at the POS — no new hardware, no new terminal</li>
            <li>No upfront cost, no licence, no subscription</li>
            <li>The fee applies only to sales that actually happen</li>
            <li>Qualifying spend is capped, so margin is never at risk on a large basket</li>
          </ul>
        </div>
        <div className="rounded-2xl p-5" style={{ background: `${AIRLINE}0f` }}>
          <h3 className="font-bold mb-2" style={{ color: AIRLINE }}>
            For the carrier
          </h3>
          <ul className="text-slate-600 text-sm space-y-1.5 list-disc pl-4">
            <li>A new revenue line on traffic the carrier already flies</li>
            <li>A welcome benefit that costs nothing and differentiates the booking</li>
            <li>No integration project — DutyBoost does the work</li>
            <li>Works at every airport where retail partners are live</li>
          </ul>
        </div>
      </div>
    </SlideShell>
  );
}