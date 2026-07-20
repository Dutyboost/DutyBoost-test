import { useTranslation } from "react-i18next";
import { Users, Plane, ShoppingBag, Percent, Store, TrendingUp, RotateCcw } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import ConfidenceBadge from "./ConfidenceBadge";
import { fmtCompact as fmtPaxCompact } from "@/data/enterpriseCalculator";
import { useCurrency } from "./CurrencyContext";

const ACCENTS = {
  blue: { chip: "bg-blue-100 text-blue-600", row: "bg-blue-50/60", bar: "border-l-blue-400", value: "text-blue-700" },
  violet: { chip: "bg-violet-100 text-violet-600", row: "bg-violet-50/60", bar: "border-l-violet-400", value: "text-violet-700" },
  amber: { chip: "bg-amber-100 text-amber-600", row: "bg-amber-50/60", bar: "border-l-amber-400", value: "text-amber-700" },
  emerald: { chip: "bg-emerald-100 text-emerald-600", row: "bg-emerald-50/60", bar: "border-l-emerald-400", value: "text-emerald-700" },
};

function BenchmarkRow({ icon: Icon, label, value, suffix, confidence, editable, onEdit, editControl, accent }) {
  const a = accent ? ACCENTS[accent] : null;
  return (
    <div className={`flex items-center justify-between gap-3 py-2.5 px-3 -mx-3 rounded-lg border-l-2 ${a ? `${a.row} ${a.bar}` : "border-l-transparent"}`}>
      <div className="flex items-center gap-2 min-w-0">
        {a ? (
          <span className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${a.chip}`}>
            <Icon className="w-4 h-4" />
          </span>
        ) : (
          <Icon className="w-4 h-4 text-slate-400 shrink-0" />
        )}
        <span className="text-sm text-slate-700 truncate">{label}</span>
        <ConfidenceBadge level={confidence} size="xs" showLabel={false} />
      </div>
      <div className="flex items-center gap-2 shrink-0">
        {editControl || (
          <span className={`text-sm font-semibold ${a ? a.value : "text-slate-900"}`}>
            {value}{suffix && <span className="text-xs text-slate-400 ml-0.5">{suffix}</span>}
          </span>
        )}
      </div>
    </div>
  );
}

export default function BenchmarkPanel({ benchmarks, assumptions, onAssumptionChange, editable, focusedAirport, focusedBasket, annualRedemptions }) {
  const { t } = useTranslation();
  const { redemptionRate, customBasket } = assumptions;
  const { fmtCompact, fmt, convert, currency, rate } = useCurrency();
  const hasOverride = customBasket !== null;
  const displayBasket = focusedBasket || benchmarks.avgBasket;
  const avgBasketLabel = focusedAirport
    ? `${t("entCalc.bm_avg_basket")} · ${focusedAirport.city || focusedAirport.name} (${focusedAirport.code})`
    : t("entCalc.bm_avg_basket");

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
      <div className="px-5 py-3.5 border-b border-slate-100 bg-slate-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            <h3 className="font-semibold text-slate-900 text-sm">{t("entCalc.benchmark_title")}</h3>
          </div>
          {editable && (
            <span className="text-xs text-slate-500">{t("entCalc.benchmark_adjust_hint")}</span>
          )}
        </div>
        <p className="text-[11px] text-slate-400 mt-1.5 flex items-center gap-1.5 flex-wrap">
          <span className="inline-flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />{t("entCalc.confidence_high")}</span>
          <span className="inline-flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-amber-500" />{t("entCalc.confidence_medium")}</span>
          <span className="inline-flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-slate-400" />{t("entCalc.confidence_estimated")}</span>
          <span className="text-slate-400">— {t("entCalc.benchmark_confidence_hint")}</span>
        </p>
      </div>
      <div className="px-5 py-2">
        <BenchmarkRow icon={Users} label={t("entCalc.bm_annual_pax")} value={fmtPaxCompact(benchmarks.annualPax)} confidence={benchmarks.confidence?.annualPax} />
        <BenchmarkRow icon={Plane} label={t("entCalc.bm_intl_pax")} value={fmtPaxCompact(benchmarks.intlPax)} confidence={benchmarks.confidence?.intlPax} />
        <BenchmarkRow icon={Users} label={t("entCalc.bm_domestic_pax")} value={fmtPaxCompact(benchmarks.domesticPax)} confidence={benchmarks.confidence?.domesticPax} />
        <BenchmarkRow icon={ShoppingBag} label={t("entCalc.bm_avg_spend")} value={fmtCompact(benchmarks.avgRetailSpend)} confidence={benchmarks.confidence?.avgRetailSpend} />
        <BenchmarkRow icon={Store} label={t("entCalc.bm_stores")} value={benchmarks.storeCount} confidence={benchmarks.confidence?.storeCount} />
        {editable && (
          <p className="text-sm text-slate-900 font-medium px-3 py-1.5 my-1 bg-slate-50 rounded-lg border border-slate-100">
            {t("entCalc.bm_adjust_note")}
          </p>
        )}
        <BenchmarkRow
          icon={ShoppingBag}
          label={avgBasketLabel}
          value={fmtCompact(displayBasket)}
          confidence={focusedAirport ? "high" : benchmarks.confidence?.avgBasket}
          accent="blue"
          editable={editable}
          editControl={editable ? (
            <div className="flex items-center gap-2 w-40">
              <input
                type="number"
                value={hasOverride ? parseFloat(convert(customBasket).toFixed(2)) : ""}
                placeholder={Math.round(convert(displayBasket))}
                onChange={(e) => onAssumptionChange("customBasket", e.target.value === "" ? null : parseFloat(e.target.value) / rate)}
                className="w-20 px-2 py-1 text-sm text-right border border-blue-200 rounded-lg outline-none focus:border-blue-500 bg-white"
                min={Math.round(convert(35))}
                max={Math.round(convert(1000))}
              />
              <span className="text-xs text-slate-400">{currency}</span>
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
          label={t("entCalc.bm_redemption_rate")}
          value={redemptionRate}
          suffix="%"
          confidence="estimated"
          accent="violet"
          editable={editable}
          editControl={editable ? (
            <div className="flex items-center gap-2 w-40">
              <input
                type="number"
                value={redemptionRate}
                onChange={(e) => onAssumptionChange("redemptionRate", parseFloat(e.target.value) || 0.01)}
                className="w-16 px-2 py-1 text-sm text-right border border-violet-200 rounded-lg outline-none focus:border-violet-500 bg-white"
                min="0.01"
                max="75"
                step="0.01"
              />
              <span className="text-xs text-slate-400">%</span>
            </div>
          ) : undefined}
        />
        {editable && (
          <div className="pt-3 px-3 -mx-3 py-3 rounded-lg bg-amber-50/60 border-l-2 border-l-amber-400">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-slate-600">{t("entCalc.bm_redemption_slider")}</span>
              <span className="text-xs font-semibold text-amber-700">{redemptionRate}%</span>
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
          label={t("entCalc.bm_dc_travelers")}
          value={fmtPaxCompact(annualRedemptions || 0)}
          confidence={benchmarks.confidence?.dutyCreditTravelers}
          accent="emerald"
        />
      </div>
    </div>
  );
}