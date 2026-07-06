import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";

const TICKS = [
  0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1,
  1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6,
  6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10
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
    if (!isNaN(parsed) && parsed >= 0.1 && parsed <= 10) {
      onChange(parsed);
    }
  };

  const handleInputBlur = () => {
    const parsed = parseFloat(inputValue);
    if (isNaN(parsed) || parsed < 0.1) {
      onChange(0.1);
      setInputValue("0.1");
    } else if (parsed > 10) {
      onChange(10);
      setInputValue("10");
    } else {
      onChange(parsed);
      setInputValue(String(parsed));
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-5 space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{t('presentation.what.conversion_label', { defaultValue: 'Conversion Rate' })}</p>
          <div className="flex items-center gap-2 mt-1">
            <Input
              type="number"
              min={0.1}
              max={10}
              step={0.1}
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              className="w-24 h-12 text-2xl font-heading font-bold text-primary text-center"
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