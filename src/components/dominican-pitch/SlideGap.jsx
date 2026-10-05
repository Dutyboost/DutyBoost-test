import { Clock, HelpCircle, Tag } from "lucide-react";
import { ACCENT, RETAIL, SlideShell } from "./Shared";

const REASONS = [
  {
    Icon: HelpCircle,
    title: "No reason to arrive early",
    body: "Nothing tells a traveller, before they fly, that the airport holds value for them. They arrive with the time they need to board — and nothing more.",
  },
  {
    Icon: Tag,
    title: "No benefit at the till",
    body: "The concourse competes with downtown and with the destination itself, on price alone. There is no reason to buy here rather than there.",
  },
  {
    Icon: Clock,
    title: "No second chance",
    body: "The departure hall is the last commercial moment of the trip. Once the traveller is airside and boarding, the spend is gone — for good.",
  },
];

export default function SlideGap() {
  return (
    <SlideShell
      eyebrow="The Conversion Gap"
      eyebrowColor={ACCENT}
      title={
        <>
          The Traveller Is Already in the Building.{" "}
          <span style={{ color: RETAIL }}>The Decision Was Made Elsewhere.</span>
        </>
      }
      subtitle="Airport retail does not lose to other shops at the airport. It loses weeks earlier, when the traveller decides what the trip will cost."
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {REASONS.map((r) => (
          <div key={r.title} className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
            <r.Icon className="w-7 h-7 mb-3" style={{ color: ACCENT }} />
            <h3 className="font-bold text-[#0a0f1e] mb-2">{r.title}</h3>
            <p className="text-slate-600 text-sm leading-relaxed">{r.body}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
        <div className="lg:col-span-2 bg-blue-50 border border-blue-200 rounded-2xl p-5">
          <h3 className="font-bold text-blue-900 mb-2">DutyBoost moves the decision forward</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            A DutyCredit is attached to the traveller's booking by the carrier, weeks before departure. The
            traveller lands in the Dominican Republic already holding a benefit that only works in the airport's
            departure hall — which changes what they plan to buy, and when they arrive to buy it.
          </p>
          <p className="text-slate-500 text-sm mt-3 leading-relaxed">
            The retailer pays nothing to be part of it, nothing for the technology, and nothing until a sale is
            validated. The traveller pays nothing: the benefit is a discount, not a fee.
          </p>
        </div>
        <div className="bg-slate-800 text-white rounded-2xl p-5 flex flex-col justify-center">
          <div className="text-3xl font-bold mb-1">22%</div>
          <p className="text-slate-300 text-sm leading-relaxed">
            of travellers currently buy anything at all in airport retail. The other 78% are the market DutyBoost
            exists to reach — and they are already inside the terminal.
          </p>
        </div>
      </div>
    </SlideShell>
  );
}