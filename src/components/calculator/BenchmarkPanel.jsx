import { Users, Plane, ShoppingBag, Percent, Store, TrendingUp, RotateCcw } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import ConfidenceBadge from "./ConfidenceBadge";
import { fmtCompact, fmtEurCompact } from "@/data/enterpriseCalculator";

function BenchmarkRow({ icon: Icon, label, value, suffix, confidence, editable, onEdit, editControl }) {
  return (
    <div className="flex items-center justify-between gap-3 py-2.5 border-b border-slate-100 last:border-0">
      <div className="flex items-center gap-2 min-w-0">
        <Icon className="w-4 h-4 text-slate-400 shrink-0" />
        <span className="text-sm text-slate-600 truncate">{label}</span>
        <ConfidenceBadge level={confidence} size="xs" showLabel={false} />
      </div>
      <div className="flex items-center gap-2 shrink-0">
        {editControl || (
          <span className="text-sm font-semibold text-slate-900">
            {value}{suffix && <span className="text-xs text-slate-400 ml-0.5">{suffix}</span>}
          </span>
        )}
      </div>
    </div>
  );
}

export default function BenchmarkPanel({ benchmarks, assumptions, onAssumptionChange, editable }) {
  const { redemptionRate, customBasket } = assumptions;
  const hasOverride = customBasket !== null;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 bg-slate-50">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-primary" />
          <h3 className="font-semibold text-slate-900 text-sm">Preloaded Benchmark Data</h3>
        </div>
        {editable && (
          <span className="text-xs text-slate-500">Click values to adjust assumptions</span>
        )}
      </div>
      <div className="px-5 py-2">
        <BenchmarkRow icon={Users} label="Annual Passengers" value={fmtCompact(benchmarks.annualPax)} confidence={benchmarks.confidence?.annualPax} />
        <BenchmarkRow icon={Plane} label="International Passengers" value={fmtCompact(benchmarks.intlPax)} confidence={benchmarks.confidence?.intlPax} />
        <BenchmarkRow icon={Users} label="Domestic Passengers" value={fmtCompact(benchmarks.domesticPax)} confidence={benchmarks.confidence?.domesticPax} />
        <BenchmarkRow icon={ShoppingBag} label="Avg Airport Retail Spend / Pax" value={fmtEurCompact(benchmarks.avgRetailSpend)} confidence={benchmarks.confidence?.avgRetailSpend} />
        <BenchmarkRow icon={Store} label="Estimated Stores" value={benchmarks.storeCount} confidence={benchmarks.confidence?.storeCount} />
        <BenchmarkRow
          icon={ShoppingBag}
          label="Average Basket Value"
          value={fmtEurCompact(benchmarks.avgBasket)}
          confidence={benchmarks.confidence?.avgBasket}
          editable={editable}
          editControl={editable ? (
            <div className="flex items-center gap-2 w-40">
              <input
                type="number"
                value={hasOverride ? customBasket : ""}
                placeholder={Math.round(benchmarks.avgBasket)}
                onChange={(e) => onAssumptionChange("customBasket", e.target.value === "" ? null : parseFloat(e.target.value))}
                className="w-20 px-2 py-1 text-sm text-right border border-slate-200 rounded-lg outline-none focus:border-primary"
                min="35"
                max="1000"
              />
              <span className="text-xs text-slate-400">EUR</span>
              {hasOverride && (
                <button onClick={() => onAssumptionChange("customBasket", null)} className="text-slate-400 hover:text-slate-600">
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ) : undefined}
        />
        <BenchmarkRow
          icon={Percent}
          label="Estimated Redemption Rate"
          value={redemptionRate}
          suffix="%"
          confidence="estimated"
          editable={editable}
          editControl={editable ? (
            <div className="flex items-center gap-2 w-40">
              <input
                type="number"
                value={redemptionRate}
                onChange={(e) => onAssumptionChange("redemptionRate", parseFloat(e.target.value) || 0.01)}
                className="w-16 px-2 py-1 text-sm text-right border border-slate-200 rounded-lg outline-none focus:border-primary"
                min="0.01"
                max="75"
                step="0.01"
              />
              <span className="text-xs text-slate-400">%</span>
            </div>
          ) : undefined}
        />
        {editable && (
          <div className="pt-3">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-slate-500">Redemption Rate Slider</span>
              <span className="text-xs font-semibold text-primary">{redemptionRate}%</span>
            </div>
            <Slider
              min={0.01}
              max={5}
              step={0.01}
              value={[redemptionRate]}
              onValueChange={([v]) => onAssumptionChange("redemptionRate", v)}
              className="w-full"
            />
          </div>
        )}
        <BenchmarkRow
          icon={TrendingUp}
          label="Est. DutyCredit Travelers"
          value={fmtCompact(benchmarks.dutyCreditTravelers)}
          confidence={benchmarks.confidence?.dutyCreditTravelers}
        />
      </div>
    </div>
  );
}