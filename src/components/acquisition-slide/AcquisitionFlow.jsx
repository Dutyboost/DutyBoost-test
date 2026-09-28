import { Fragment } from "react";
import { User, ShoppingCart, BarChart3, Coins, ArrowRight } from "lucide-react";

const STEPS = [
  { Icon: User, label: "Traveller" },
  { Icon: ShoppingCart, label: "Conversion" },
  { Icon: BarChart3, label: "Incremental Revenue" },
  { Icon: Coins, label: "Performance-Based Cost" },
];

export default function AcquisitionFlow() {
  return (
    <div className="flex items-stretch justify-between gap-2">
      {STEPS.map((step, i) => (
        <Fragment key={step.label}>
          <div className="flex-1 flex flex-col items-center text-center">
            <div className="w-11 h-11 rounded-full border border-primary/30 bg-primary/10 flex items-center justify-center mb-2">
              <step.Icon className="w-5 h-5 text-primary" />
            </div>
            <div className="text-foreground font-semibold text-sm leading-tight">{step.label}</div>
          </div>
          {i < STEPS.length - 1 && <ArrowRight className="w-4 h-4 self-center shrink-0 text-primary" />}
        </Fragment>
      ))}
    </div>
  );
}