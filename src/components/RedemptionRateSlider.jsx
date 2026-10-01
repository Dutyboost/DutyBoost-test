import { useEffect, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Percent } from "lucide-react";
import { useTranslation } from "react-i18next";

const MIN_RATE = 0;
const MAX_RATE = 15;

export default function RedemptionRateSlider({ rate, onChange }) {
  const { t } = useTranslation();
  const [draft, setDraft] = useState(String(rate));

  // Keep the input in sync when the rate changes from the slider
  useEffect(() => {
    if (parseFloat(draft) !== rate) setDraft(String(rate));
  }, [rate]);

  const handleInputChange = (value) => {
    setDraft(value);
    const parsed = parseFloat(value);
    if (Number.isNaN(parsed) || parsed < MIN_RATE || parsed > MAX_RATE) return;
    onChange(parsed);
  };

  const handleBlur = () => setDraft(String(rate));

  return (
    <div className="rounded-xl bg-amber-50/60 border border-amber-200 border-l-2 border-l-amber-400 px-4 py-3">
      <div className="flex items-center justify-between gap-3 mb-2">
        <div className="flex items-center gap-2">
          <Percent className="w-4 h-4 text-amber-600" />
          <span className="text-sm font-semibold text-slate-700">{t("entCalc.bm_redemption_rate")}</span>
        </div>
        <div className="relative shrink-0">
          <input
            type="number"
            inputMode="decimal"
            min={MIN_RATE}
            max={MAX_RATE}
            step={0.01}
            value={draft}
            onChange={(e) => handleInputChange(e.target.value)}
            onBlur={handleBlur}
            aria-label={t("entCalc.bm_redemption_rate")}
            className="w-24 h-9 rounded-lg border border-amber-300 bg-white pl-2.5 pr-7 text-sm font-bold text-amber-700 tabular-nums text-right focus:outline-none focus:ring-2 focus:ring-amber-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-sm font-bold text-amber-700 pointer-events-none">%</span>
        </div>
      </div>
      <span className="text-xs text-slate-500 block mb-1.5">{t("entCalc.bm_redemption_slider")}</span>
      <Slider
        min={MIN_RATE}
        max={MAX_RATE}
        step={0.01}
        value={[rate]}
        onValueChange={([v]) => onChange(v)}
        className="w-full"
      />
      <div className="flex justify-between text-[10px] text-slate-400 mt-1">
        <span>0%</span>
        <span>15.00%</span>
      </div>
    </div>
  );
}