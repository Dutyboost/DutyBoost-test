import { AnimatePresence, motion } from "framer-motion";
import { Pause, Play } from "lucide-react";
import { SCENES, SCENE_MS } from "./liveData";
import { PEOPLE } from "@/data/roleAvatars";

export default function LiveStage({ scene, setScene, paused, setPaused }) {
  const current = SCENES[scene];
  const Overlay = current.Overlay;

  return (
    <div className="relative rounded-2xl overflow-hidden bg-slate-900 h-[320px] sm:h-[380px] lg:h-[420px]">
      <AnimatePresence mode="wait">
        <motion.img
          key={current.id}
          src={current.image}
          alt={current.label}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/45 to-slate-950/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/50" />

      {/* Step chip */}
      <div className="absolute top-3 left-3 flex items-center gap-2 rounded-full bg-slate-950/70 backdrop-blur px-3 py-1.5 border border-white/10">
        <span className="text-[11px] font-bold text-indigo-300 tabular-nums">{current.step}</span>
        <span className="text-[11px] font-semibold text-white">{current.label}</span>
      </div>

      {/* Pause / play */}
      <button
        onClick={() => setPaused((p) => !p)}
        aria-label={paused ? "Play the live journey" : "Pause the live journey"}
        className="absolute top-3 right-3 rounded-full bg-slate-950/70 backdrop-blur border border-white/10 p-2 text-white hover:bg-slate-900 transition-colors"
      >
        {paused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
      </button>

      <Overlay />

      {/* Caption + step controls */}
      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
        <div className="flex flex-wrap items-center gap-2 mb-2.5">
          {current.cast.map((key) => {
            const p = PEOPLE[key];
            if (!p) return null;
            return (
              <div
                key={key}
                className="flex items-center gap-2 rounded-lg bg-slate-950/75 backdrop-blur border border-white/10 pl-1 pr-3 py-1"
              >
                <img
                  src={p.avatar}
                  alt={p.person}
                  className="w-9 h-9 rounded-md object-cover ring-1 ring-white/20"
                />
                <div className="leading-tight">
                  <p className="text-[11px] font-bold text-white whitespace-nowrap">{p.person}</p>
                  <p className="text-[10px] text-slate-400 whitespace-nowrap">{p.personRole}</p>
                </div>
              </div>
            );
          })}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h3 className="font-heading font-bold text-white text-sm sm:text-base">{current.title}</h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-snug max-w-2xl mt-0.5">
              {current.caption}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="mt-3 flex gap-2">
          {SCENES.map((s, i) => (
            <button key={s.id} onClick={() => setScene(i)} className="flex-1 text-left group">
              <div className="h-1 rounded-full bg-white/20 overflow-hidden">
                {i < scene && <div className="h-full w-full bg-indigo-400/60" />}
                {i === scene &&
                  (paused ? (
                    <div className="h-full w-1/2 bg-indigo-400" />
                  ) : (
                    <motion.div
                      key={`${scene}-${paused}`}
                      className="h-full bg-indigo-400"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: SCENE_MS / 1000, ease: "linear" }}
                    />
                  ))}
              </div>
              <span
                className={`text-[10px] font-semibold ${
                  i === scene ? "text-white" : "text-slate-500 group-hover:text-slate-300"
                }`}
              >
                {s.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}