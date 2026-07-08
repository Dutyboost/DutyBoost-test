import { Slider } from "@/components/ui/slider";
import { Percent } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function RedemptionRateSlider({ rate, onChange }) {
  const { t } = useTranslation();
  return (
    <div className="rounded-xl bg-amber-50/60 border border-amber-200 border-l-2 border-l-amber-400 px-4 py-3">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Percent className="w-4 h-4 text-amber-600" />
          <span className="text-sm font-semibold text-slate-700">{t("entCalc.bm_redemption_rate")}</span>
        </div>
        <span className="text-sm font-bold text-amber-700 tabular-nums">{rate.toFixed(2)}%</span>
      </div>
      <span className="text-xs text-slate-500 block mb-1.5">{t("entCalc.bm_redemption_slider")}</span>
      <Slider
        min={0.01}
        max={5}
        step={0.01}
        value={[rate]}
        onValueChange={([v]) => onChange(v)}
        className="w-full"
      />
      <div className="flex justify-between text-[10px] text-slate-400 mt-1">
        <span>0.01%</span>
        <span>5.00%</span>
      </div>
    </div>
  );
}