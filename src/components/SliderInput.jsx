import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";

export default function SliderInput({ value, min, max, step = 1, onChange, tiers, prefix = "", suffix = "" }) {
  const [inputValue, setInputValue] = useState(String(value));

  useEffect(() => {
    setInputValue(String(value));
  }, [value]);

  const commit = (raw) => {
    let parsed = parseInt(raw, 10);
    if (isNaN(parsed)) {
      setInputValue(String(value));
      return;
    }
    parsed = Math.max(min, Math.min(max, parsed));
    if (tiers) {
      let closest = tiers[0];
      let minDiff = Math.abs(parsed - closest);
      for (const tv of tiers) {
        const diff = Math.abs(parsed - tv);
        if (diff < minDiff) { minDiff = diff; closest = tv; }
      }
      parsed = closest;
    }
    onChange(parsed);
    setInputValue(String(parsed));
  };

  return (
    <div className="flex items-center gap-1">
      {prefix && <span className="text-xs text-slate-500 font-medium">{prefix}</span>}
      <Input
        type="number"
        value={inputValue}
        min={min}
        max={max}
        step={step}
        onChange={(e) => setInputValue(e.target.value)}
        onBlur={(e) => commit(e.target.value)}
        onKeyDown={(e) => { if (e.key === "Enter") e.target.blur(); }}
        className="w-24 h-8 text-sm"
      />
      {suffix && <span className="text-xs text-slate-500 font-medium">{suffix}</span>}
    </div>
  );
}