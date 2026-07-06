import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";

// 20 steps of 0.05% across the 0–1% range (0.05% → 1.00%)
const TICKS = [
  0.05, 0.10, 0.15, 0.20, 0.25, 0.30, 0.35, 0.40, 0.45, 0.50,
  0.55, 0.60, 0.65, 0.70, 0.75, 0.80, 0.85, 0.90, 0.95, 1.00
];

function nearestTickIndex(value) {
  let best = 0;
  let bestDiff = Infinity;
  for (let i = 0; i < TICKS.length; i++) {
    const diff = Math.abs(TICKS[i] - value);
    if (diff < bestDiff) {
      bestDiff = diff;
      best = i;
    }
  }
  return best;
}

export default function ConversionRateSlider({ value, onChange }) {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState(String(value));

  const handleSliderChange = ([idx]) => {
    const newVal = TICKS[idx];
    onChange(newVal);
    setInputValue(String(newVal));
  };

  const handleInputChange = (e) => {
    const raw = e.target.value;
    setInputValue(raw);
    const parsed = parseFloat(raw);
    if (!isNaN(parsed) && parsed >= 0.01 && parsed <= 1) {
      onChange(parsed);
    }
  };

  const handleInputBlur = () => {
    const parsed = parseFloat(inputValue);
    if (isNaN(parsed) || parsed < 0.01) {
      onChange(0.01);
      setInputValue("0.01");
    } else if (parsed > 1) {
      onChange(1);
      setInputValue("1");
    } else {
      onChange(parsed);
      setInputValue(String(parsed));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{t('presentation.what.conversion_label', { defaultValue: 'Conversion Rate' })}</p>
          <div className="flex items-center gap-2 mt-1">
            <Input
              type="number"
              min={0.01}
              max={1}
              step={0.01}
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              className="w-24 h-12 text-2xl font-heading font-bold text-primary text-center border-0 px-0 focus-visible:ring-0"
            />
            <span className="text-2xl font-heading font-bold text-primary">%</span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground text-right max-w-xs">{t('presentation.what.conversion_hint', { defaultValue: 'Adjust to see how conversion impacts revenue potential' })}</p>
      </div>
      <Slider
        min={0}
        max={TICKS.length - 1}
        step={1}
        value={[nearestTickIndex(value)]}
        onValueChange={handleSliderChange}
        aria-label={t('presentation.what.conversion_label', { defaultValue: 'Conversion Rate' })}
        className="w-full"
      />
    </div>
  );
}