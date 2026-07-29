import { useState, useEffect } from "react";

export default function ConversionRateInput({ value, min = 0.01, max = 50, step = 0.01, onChange }) {
  const [text, setText] = useState(String(value));

  useEffect(() => {
    setText(String(value));
  }, [value]);

  const handleBlur = () => {
    let n = parseFloat(text);
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
      <input
        type="number"
        min={min}
        max={max}
        step={step}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={(e) => { if (e.key === "Enter") e.target.blur(); }}
        className="w-28 sm:w-32 text-sm font-bold font-mono text-right rounded-md border border-border bg-background px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-violet-500/40"
      />
      <span className="text-xs sm:text-sm font-bold font-mono">%</span>
    </div>
  );
}