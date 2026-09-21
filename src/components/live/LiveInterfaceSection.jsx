import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SCENES, STAKEHOLDERS, EVENTS, SCENE_MS, TICK_MS } from "./liveData";
import LiveKpiBar from "./LiveKpiBar";
import LiveStage from "./LiveStage";
import LiveStakeholderRail from "./LiveStakeholderRail";
import LiveTicker from "./LiveTicker";

export default function LiveInterfaceSection() {
  const [scene, setScene] = useState(0);
  const [tick, setTick] = useState(0);
  const [paused, setPaused] = useState(false);

  // Auto-advance the journey. Restarts whenever the scene changes or playback resumes.
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setScene((s) => (s + 1) % SCENES.length), SCENE_MS);
    return () => clearInterval(id);
  }, [paused, scene]);

  // Network heartbeat.
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), TICK_MS);
    return () => clearInterval(id);
  }, []);

  const metrics = useMemo(() => {
    const next = {};
    STAKEHOLDERS.forEach((s) => {
      next[s.key] = s.base + tick * s.step;
    });
    return next;
  }, [tick]);

  const kpis = useMemo(
    () => ({
      issued: 1284 + tick * 3,
      validated: 417 + tick * 2,
      value: 61940 + tick * 265,
      conversion: 18.4 + (tick % 7) * 0.1,
    }),
    [tick]
  );

  const events = useMemo(
    () =>
      Array.from({ length: 3 }, (_, i) => {
        const index = (tick - i + EVENTS.length * 100) % EVENTS.length;
        return {
          id: `${tick - i}`,
          time: new Date(Date.now() - i * TICK_MS).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
          ...EVENTS[index],
        };
      }),
    [tick]
  );

  return (
    <section className="py-10 sm:py-14 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6 space-y-2">
          <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-slate-900 text-white text-xs font-bold uppercase tracking-widest">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
            </span>
            Live network
          </span>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold">
            Watch a DutyCredit travel the whole journey
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-3xl mx-auto">
            From a booking made at home to a validated sale at the airport till — this is the
            platform running, with every stakeholder earning as the credit moves.
          </p>
        </div>

        <div className="rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl overflow-hidden">
          <LiveKpiBar kpis={kpis} />
          <div className="grid lg:grid-cols-[1fr_270px]">
            <div className="p-3 sm:p-4">
              <LiveStage scene={scene} setScene={setScene} paused={paused} setPaused={setPaused} />
              <LiveTicker events={events} />
            </div>
            <LiveStakeholderRail metrics={metrics} active={SCENES[scene].active} />
          </div>
        </div>

        <div className="text-center mt-6">
          <Link
            to="/travellers-transaction"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            Explore the traveller's transaction in detail
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}