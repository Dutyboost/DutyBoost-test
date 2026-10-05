import { Briefcase, Zap, Store, ArrowRight } from "lucide-react";
import { SlideWrapper, GridBg } from "@/components/phygrid-pitch/Shared";

const CHANNELS = [
  {
    Icon: Briefcase,
    title: "Travel & Corporate Partners",
    desc: "Airlines, agencies, hotels, car rental and corporate travel distribute a DutyCredit with the booking confirmation — weeks before departure.",
  },
  {
    Icon: Zap,
    title: "Travellers Activate Themselves",
    desc: "Travellers generate their own DutyCredits directly on the DutyBoost platform. No partner required, no campaign to run.",
  },
];

export default function SlideAcquisition() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">
              Customer Acquisition — On Us
            </span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              DutyBoost Acquires the Traveller.<br />
              <span className="text-blue-600">Your Retailers Just Serve Them.</span>
            </h2>
            <p className="text-slate-500 mt-1 text-sm">
              The cost of bringing a traveller to the till sits with DutyBoost and its travel and corporate
              partners — never with the POS provider or the retailer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            {CHANNELS.map((c) => (
              <div key={c.title} className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <c.Icon className="w-8 h-8 text-blue-600 mb-3" />
                <div className="text-slate-800 font-bold mb-2">{c.title}</div>
                <div className="text-slate-500 text-sm leading-relaxed">{c.desc}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-slate-800 text-white rounded-2xl p-6">
              <h3 className="font-bold text-white text-lg mb-4">What Changes for Your Retailers</h3>
              <div className="flex flex-col gap-3">
                {[
                  { from: "Retailers wait for passengers", to: "Passengers arrive with purchase intent" },
                  { from: "Impulse-driven shopping", to: "Pre-activated economic incentive" },
                  { from: "No reason to enter the store", to: "A DutyCredit gives a reason to visit" },
                  { from: "73% walk straight to the gate", to: "Pre-activated travellers detour to the store" },
                ].map((row, i) => (
                  <div key={i} className="grid grid-cols-[1fr,auto,1fr] gap-2 items-stretch text-sm">
                    <span className="text-red-300 bg-red-900/30 rounded-lg px-3 py-2.5 text-center flex items-center justify-center leading-snug">
                      {row.from}
                    </span>
                    <ArrowRight size={16} className="text-blue-300 flex-shrink-0 self-center" />
                    <span className="text-green-300 bg-green-900/30 rounded-lg px-3 py-2.5 text-center flex items-center justify-center leading-snug">
                      {row.to}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Store className="w-5 h-5 text-blue-600" />
                  <h3 className="font-bold text-blue-900">No Marketing Budget Required</h3>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  There is no campaign to fund, no media to buy and no store staff to retrain. A traveller arrives
                  already holding a DutyCredit, presents it at checkout, and the POS validates the sale.
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-5 text-white">
                <p className="font-bold leading-snug">
                  Acquisition cost is settled after the sale — never before it.
                </p>
                <p className="text-blue-100 text-sm mt-2">
                  DutyBoost is paid out of the transaction it created. If no sale happens, nobody pays and nobody earns anything.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}