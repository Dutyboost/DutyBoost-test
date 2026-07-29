import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";

export default function ConversionRateInput({ value, min = 0.01, max = 50, step = 0.01, onChange }) {
  const [text, setText] = useState(String(value));

  useEffect(() => {
    setText(String(value));
  }, [value]);

  const commit = (raw) => {
    let n = parseFloat(raw);
    if (isNaN(n)) {
      setText(String(value));
      return;
    }
    n = Math.round(Math.max(min, Math.min(max, n)) * 100) / 100;
    onChange(n);
    setText(String(n));
  };

  return (
    <div className="flex items-center gap-1">
      <Input
        type="number"
        value={text}
        min={min}
        max={max}
        step={step}
        onChange={(e) => setText(e.target.value)}
        onBlur={(e) => commit(e.target.value)}
        onKeyDown={(e) => { if (e.key === "Enter") e.target.blur(); }}
        className="w-20 h-10 text-2xl font-bold text-slate-900 border-b-2 border-slate-300 focus:border-primary rounded-none px-0"
        aria-label="redemption rate percent"
      />
      <span className="text-2xl font-bold text-slate-900">%</span>
    </div>
  );
}