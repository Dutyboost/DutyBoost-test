import { PlaneTakeoff, Anchor, Route, Store } from "lucide-react";
import CruiseShipIcon from "@/components/CruiseShipIcon";
import TrainIcon from "@/components/TrainIcon";

// One entry per retail channel the calculator models. Every class is a literal
// string so the Tailwind build never purges it.
const CHANNELS = [
  {
    key: "airport",
    Icon: PlaneTakeoff,
    iconIdle: "bg-blue-50 text-blue-600",
    active: "border-blue-600 bg-blue-50 text-blue-700",
  },
  {
    key: "seaport",
    Icon: Anchor,
    iconIdle: "bg-orange-50 text-orange-600",
    active: "border-orange-500 bg-orange-50 text-orange-700",
  },
  {
    key: "cruise",
    Icon: CruiseShipIcon,
    iconIdle: "bg-teal-50 text-teal-600",
    active: "border-teal-600 bg-teal-50 text-teal-700",
  },
  {
    key: "motorway",
    Icon: Route,
    iconIdle: "bg-emerald-50 text-emerald-600",
    active: "border-emerald-600 bg-emerald-50 text-emerald-700",
  },
  {
    key: "rail",
    Icon: TrainIcon,
    iconIdle: "bg-indigo-50 text-indigo-600",
    active: "border-indigo-600 bg-indigo-50 text-indigo-700",
  },
  {
    key: "local",
    Icon: Store,
    iconIdle: "bg-purple-50 text-purple-600",
    active: "border-purple-600 bg-purple-50 text-purple-700",
  },
];

// The six retail channels side by side, so each partner opens the calculator
// that matches the sites they actually operate.
export default function RetailChannelTabs({ value, onChange, labels = {}, hint }) {
  return (
    <div className="space-y-2">
      {hint && <p className="text-center text-xs font-semibold text-slate-500">{hint}</p>}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {CHANNELS.map(({ key, Icon, iconIdle, active }) => {
          const isOn = value === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => onChange(key)}
              aria-pressed={isOn}
              className={`flex flex-col items-center gap-1.5 rounded-xl border px-2 py-3 text-xs font-semibold leading-tight transition-all ${
                isOn
                  ? `${active} shadow-sm`
                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              <span className={`w-8 h-8 rounded-lg flex items-center justify-center ${isOn ? "bg-white/80" : iconIdle}`}>
                <Icon className="w-4 h-4" />
              </span>
              <span className="text-center">{labels[key] || key}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}