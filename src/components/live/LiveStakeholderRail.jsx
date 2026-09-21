import { motion } from "framer-motion";
import { STAKEHOLDERS } from "./liveData";

export default function LiveStakeholderRail({ metrics, active }) {
  return (
    <div className="border-t lg:border-t-0 lg:border-l border-slate-800 bg-slate-950/60 p-3 sm:p-4">
      <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-2.5">
        Live network activity
      </p>
      <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
        {STAKEHOLDERS.map((s) => {
          const isActive = active.includes(s.key);
          return (
            <div
              key={s.key}
              className={`rounded-xl border p-2.5 transition-colors ${
                isActive
                  ? "border-indigo-500/60 bg-indigo-500/10"
                  : "border-slate-800 bg-slate-900/50"
              }`}
            >
              <div className="flex items-center gap-2">
                <s.Icon className={`w-4 h-4 ${s.color} shrink-0`} />
                <p className="text-[11px] font-semibold text-slate-200 truncate">{s.label}</p>
                {isActive && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse shrink-0" />
                )}
              </div>
              <motion.p
                key={metrics[s.key]}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="font-heading font-bold text-white text-sm tabular-nums mt-1"
              >
                {(s.prefix || "") + metrics[s.key].toLocaleString()}
              </motion.p>
              <p className="text-[10px] text-slate-500 truncate">{s.metric}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}