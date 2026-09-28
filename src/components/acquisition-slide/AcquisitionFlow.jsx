import { Fragment } from "react";
import { User, ShoppingCart, BarChart3, Coins, ArrowRight } from "lucide-react";

const BRAND_BLUE = "#0055ff";

const STEPS = [
  { Icon: User, label: "Traveller", sub: "Pre-activation before the airport" },
  { Icon: ShoppingCart, label: "Conversion", sub: "More travellers make a purchase" },
  { Icon: BarChart3, label: "Incremental Revenue", sub: "Higher sales for retailers" },
  { Icon: Coins, label: "Performance-Based Cost", sub: "Compensation follows revenue" },
];

export default function AcquisitionFlow() {
  return (
    <div className="flex items-stretch justify-between gap-2">
      {STEPS.map((step, i) => (
        <Fragment key={step.label}>
          <div className="flex-1 flex flex-col items-center text-center">
            <div
              className="w-11 h-11 rounded-full border flex items-center justify-center mb-2"
              style={{ borderColor: "rgba(0,85,255,0.45)", backgroundColor: "rgba(0,85,255,0.12)" }}
            >
              <step.Icon className="w-5 h-5" style={{ color: BRAND_BLUE }} />
            </div>
            <div className="text-white font-semibold text-sm leading-tight">{step.label}</div>
            <div className="text-slate-300/75 text-xs leading-snug mt-0.5">{step.sub}</div>
          </div>
          {i < STEPS.length - 1 && (
            <ArrowRight className="w-4 h-4 self-center shrink-0" style={{ color: BRAND_BLUE }} />
          )}
        </Fragment>
      ))}
    </div>
  );
}