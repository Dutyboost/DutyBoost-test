import { CheckCircle } from "lucide-react";
import { SlideWrapper, GridBg } from "@/components/phygrid-pitch/Shared";

const POINTS = [
  "DutyBoost appears as a new feature in your existing POS dashboard",
  "You switch it on — no separate project required from the retailer",
  "No replacement of ERP, payment or inventory systems",
  "Once switched on, every connected store can redeem DutyCredits",
  "Works across all stores, airports and markets on the same POS",
  "Switch it off anytime — no lock-in, no commitments",
];

export default function SlideIntegrate() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5 lg:mb-10">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">
              Technology Strategy
            </span>
            <h2 className="text-xl md:text-3xl lg:text-4xl font-heading font-bold text-[#0a0f1e] mt-2">
              A POS Provider Feature.<br />
              <span className="text-blue-600">Activate, Not Implement.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-center">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 lg:p-7">
              <h3 className="text-[#0a0f1e] font-bold lg:text-lg mb-4">
                DutyBoost Appears in Your POS Dashboard
              </h3>
              <div className="space-y-3">
                {POINTS.map((text, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-600 text-sm">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-5 lg:p-7 text-white">
              <h3 className="text-white font-bold text-xl lg:text-2xl mb-2">ACTIVATED THROUGH YOUR POS</h3>
              <p className="text-blue-50 text-sm lg:text-base leading-relaxed mb-3 lg:mb-5">
                DutyBoost is enabled by the POS provider as an activation feature — the same system the retailer
                already uses for checkout, inventory and payments. The retailer toggles it on; the checkout flow
                itself does not change.
              </p>
              <div className="grid grid-cols-3 gap-3 text-center">
                {[
                  { val: "1 POS", label: "activation" },
                  { val: "Multiple", label: "retailers" },
                  { val: "Global", label: "deployment" },
                ].map((s) => (
                  <div key={s.label} className="bg-white/10 rounded-xl p-3">
                    <div className="text-white font-bold">{s.val}</div>
                    <div className="text-blue-100 text-xs mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}