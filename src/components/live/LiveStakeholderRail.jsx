import { motion } from "framer-motion";
import { STAKEHOLDERS } from "./liveData";
import RoleAvatar from "../avatars/RoleAvatar";

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
                <RoleAvatar person={s.person} size={32} active={isActive} />
                <div className="min-w-0">
                  <p className="text-[11px] font-bold text-white truncate">{s.person.person}</p>
                  <p className="text-[10px] text-slate-400 truncate">{s.person.personRole}</p>
                </div>
              </div>
              <div className="flex items-baseline gap-1.5 mt-2">
                <motion.span
                  key={metrics[s.key]}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="font-heading font-bold text-white text-sm tabular-nums"
                >
                  {(s.prefix || "") + metrics[s.key].toLocaleString()}
                </motion.span>
              </div>
              <p className="text-[10px] text-slate-500 truncate">{s.metric}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}