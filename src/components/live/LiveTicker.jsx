import { AnimatePresence, motion } from "framer-motion";
import { Activity } from "lucide-react";

export default function LiveTicker({ events }) {
  return (
    <div className="mt-3 rounded-xl border border-slate-800 bg-slate-950/70 px-3 py-2">
      <div className="flex items-center gap-2">
        <Activity className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
        <p className="text-[10px] uppercase tracking-widest text-slate-500">Event stream</p>
      </div>
      <div className="mt-1.5 space-y-1">
        <AnimatePresence initial={false}>
          {events.slice(0, 3).map((e, i) => (
            <motion.p
              key={e.id}
              layout
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: i === 0 ? 1 : 0.55, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="text-[11px] text-slate-300 truncate"
            >
              <span className="text-slate-500 tabular-nums mr-2">{e.time}</span>
              {e.text}
            </motion.p>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}