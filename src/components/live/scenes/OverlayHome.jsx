import { motion } from "framer-motion";
import { Plane, QrCode, Sparkles } from "lucide-react";

const card =
  "absolute right-3 sm:right-6 w-[185px] sm:w-[215px] rounded-xl backdrop-blur border border-white/10 shadow-xl";

export default function OverlayHome() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className={`${card} top-[14%] bg-slate-950/80 p-3`}
      >
        <p className="text-[10px] uppercase tracking-wider text-slate-400">Flight booked</p>
        <div className="flex items-center gap-2 mt-1">
          <Plane className="w-3.5 h-3.5 text-indigo-300" />
          <span className="font-heading font-bold text-white text-sm">AMS → SXM</span>
        </div>
        <p className="text-[11px] text-slate-400 mt-0.5">Travel partner · booking DB-7741</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, duration: 0.45 }}
        className={`${card} top-[42%] bg-gradient-to-br from-indigo-600 to-violet-600 border-white/20 p-3`}
      >
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-white" />
          <p className="font-heading font-bold text-white text-xs">DutyCredit issued</p>
        </div>
        <p className="text-white/80 text-[11px] mt-0.5">
          Single use · funded by DutyBoost · costs the retailer nothing
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.6, duration: 0.5 }}
        className={`${card} top-[68%] bg-slate-950/80 p-2.5 flex items-center gap-2.5`}
      >
        <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center shrink-0">
          <QrCode className="w-5 h-5 text-slate-900" />
        </div>
        <div>
          <p className="text-[11px] font-bold text-white">Scan at the till</p>
          <p className="text-[10px] text-slate-400">No app download needed</p>
        </div>
      </motion.div>
    </div>
  );
}