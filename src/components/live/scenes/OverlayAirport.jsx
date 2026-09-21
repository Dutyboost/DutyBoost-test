import { motion } from "framer-motion";
import { MonitorSmartphone, Radar, ShoppingBag } from "lucide-react";

const card =
  "absolute right-3 sm:right-6 w-[185px] sm:w-[215px] rounded-xl backdrop-blur border border-white/10 shadow-xl bg-slate-950/80";

export default function OverlayAirport() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className={`${card} top-[14%] p-3`}
      >
        <p className="text-[10px] uppercase tracking-wider text-slate-400">In the terminal</p>
        <p className="font-heading font-bold text-white text-sm mt-1">Credit already on the phone</p>
        <p className="text-[11px] text-slate-400 mt-0.5">No queue, no form, no app store visit</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, duration: 0.45 }}
        className={`${card} top-[42%] p-3 border-emerald-400/30`}
      >
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
          </span>
          <p className="font-heading font-bold text-white text-xs">Credit detected</p>
        </div>
        <p className="text-[11px] text-slate-400 mt-1">
          The traveller walks past a participating store — the credit is live and ready.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.6, duration: 0.5 }}
        className={`${card} top-[70%] p-2.5 flex items-center gap-2.5`}
      >
        <div className="w-9 h-9 rounded-lg bg-indigo-500/20 flex items-center justify-center shrink-0">
          <MonitorSmartphone className="w-5 h-5 text-indigo-300" />
        </div>
        <div>
          <p className="text-[11px] font-bold text-white">POS partner network</p>
          <p className="text-[10px] text-slate-400">One snippet · every terminal online</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.4, duration: 0.5 }}
        className="absolute left-3 sm:left-6 bottom-24 flex items-center gap-2 rounded-full bg-slate-950/75 backdrop-blur border border-white/10 px-3 py-1.5"
      >
        <ShoppingBag className="w-3.5 h-3.5 text-orange-300" />
        <span className="text-[10px] font-semibold text-slate-200">Duty-free · open</span>
        <Radar className="w-3.5 h-3.5 text-slate-500" />
      </motion.div>
    </div>
  );
}