import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function useClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

const money = (n) => "$" + Math.round(n).toLocaleString();

export default function LiveKpiBar({ kpis }) {
  const now = useClock();

  const items = [
    { label: "DutyCredits issued", value: kpis.issued.toLocaleString() },
    { label: "Validated sales", value: kpis.validated.toLocaleString() },
    { label: "Retail value unlocked", value: money(kpis.value) },
    { label: "Conversion lift", value: `+${kpis.conversion.toFixed(1)}%` },
  ];

  return (
    <div className="flex items-center gap-4 sm:gap-7 px-3 sm:px-5 py-3 border-b border-slate-800 bg-slate-950/90 overflow-x-auto">
      <div className="flex items-center gap-2 shrink-0">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
        </span>
        <span className="text-[11px] font-bold tracking-widest text-red-400">LIVE</span>
      </div>

      {items.map((it) => (
        <div key={it.label} className="shrink-0">
          <p className="text-[10px] uppercase tracking-wider text-slate-500">{it.label}</p>
          <motion.p
            key={it.value}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="font-heading font-bold text-white text-sm sm:text-base tabular-nums"
          >
            {it.value}
          </motion.p>
        </div>
      ))}

      <div className="ml-auto shrink-0 text-right hidden sm:block">
        <p className="text-[10px] uppercase tracking-wider text-slate-500">Network time</p>
        <p className="font-heading font-bold text-slate-300 text-sm tabular-nums">
          {now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
        </p>
      </div>
    </div>
  );
}