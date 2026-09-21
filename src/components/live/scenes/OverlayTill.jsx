import { motion } from "framer-motion";
import { BadgeCheck } from "lucide-react";

const SPLIT = [
  { label: "Traveller saving", value: "applied at the till", color: "text-blue-300" },
  { label: "Airport concession", value: "15% of incremental", color: "text-cyan-300" },
  { label: "Travel partner", value: "attributed booking", color: "text-green-300" },
  { label: "Supplier", value: "stock rotated", color: "text-amber-300" },
  { label: "Corporate partner", value: "0.5% rebate", color: "text-slate-300" },
  { label: "Platform fee", value: "2.5% · new sales only", color: "text-indigo-300" },
];

export default function OverlayTill() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="absolute right-3 sm:right-6 top-[12%] w-[190px] sm:w-[220px] rounded-xl bg-slate-950/85 backdrop-blur border border-white/10 p-3 shadow-xl"
      >
        <p className="text-[10px] uppercase tracking-wider text-slate-400">At the till</p>
        <div className="flex items-center justify-between mt-1.5">
          <span className="text-[11px] text-slate-300">Basket</span>
          <span className="font-heading font-bold text-white text-sm tabular-nums">$148.50</span>
        </div>
        <div className="flex items-center justify-between mt-0.5">
          <span className="text-[11px] text-slate-300">DutyCredit</span>
          <motion.span
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.3, duration: 0.4 }}
            className="text-[11px] font-bold text-emerald-300"
          >
            scanned
          </motion.span>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.1, duration: 0.4 }}
          className="mt-2 flex items-center gap-1.5 rounded-lg bg-emerald-500/15 border border-emerald-400/30 px-2 py-1.5"
        >
          <BadgeCheck className="w-3.5 h-3.5 text-emerald-300" />
          <span className="text-[10px] font-bold text-emerald-200">Validated sale</span>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.7, duration: 0.5 }}
        className="absolute right-3 sm:right-6 top-[62%] w-[190px] sm:w-[220px] rounded-xl bg-slate-950/85 backdrop-blur border border-white/10 p-3 shadow-xl"
      >
        <p className="text-[10px] uppercase tracking-wider text-slate-400 mb-1.5">Value splits automatically</p>
        <div className="space-y-1">
          {SPLIT.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.9 + i * 0.12, duration: 0.35 }}
              className="flex items-center justify-between gap-2"
            >
              <span className={`text-[10px] font-semibold ${s.color}`}>{s.label}</span>
              <span className="text-[10px] text-slate-400 whitespace-nowrap">{s.value}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}