import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  SlideCover, SlideNetwork, SlideOpportunity, SlideRegions,
  SlideLongHaul, SlideShortHaul, SlideJourney, SlideEconomics,
  SlideScale, SlideIntegrate, SlideClosing, SlideSolution,
} from "@/components/travel-partner-afklm/Slides";

const SLIDES = [
  { id: "cover", type: "cover" },
  { id: "network", type: "network" },
  { id: "opportunity", type: "opportunity" },
  { id: "regions", type: "regions" },
  { id: "longhaul", type: "longhaul" },
  { id: "shorthaul", type: "shorthaul" },
  { id: "journey", type: "journey" },
  { id: "solution", type: "solution" },
  { id: "economics", type: "economics" },
  { id: "scale", type: "scale" },
  { id: "integrate", type: "integrate" },
  { id: "closing", type: "closing" },
];

const SLIDE_LABELS = {
  cover: "Cover",
  network: "The Network",
  opportunity: "The Opportunity",
  regions: "Destinations by Region",
  longhaul: "Long-Haul Destinations",
  shorthaul: "Europe & Short-Haul Destinations",
  journey: "Across the Journey",
  solution: "The Solution",
  economics: "Transaction Economics",
  scale: "Network-Wide Value",
  integrate: "Integration Simplicity",
  closing: "Next Steps",
};

const SLIDE_COMPONENTS = {
  cover: SlideCover,
  network: SlideNetwork,
  opportunity: SlideOpportunity,
  regions: SlideRegions,
  longhaul: SlideLongHaul,
  shorthaul: SlideShortHaul,
  journey: SlideJourney,
  solution: SlideSolution,
  economics: SlideEconomics,
  scale: SlideScale,
  integrate: SlideIntegrate,
  closing: SlideClosing,
};

export default function TravelPartnerPitchDeckAFKLM() {
  const [current, setCurrent] = useState(0);
  const slideAreaRef = useRef(null);

  const prev = () => setCurrent((c) => Math.max(0, c - 1));
  const next = () => setCurrent((c) => Math.min(SLIDES.length - 1, c + 1));

  useEffect(() => {
    if (slideAreaRef.current) {
      slideAreaRef.current.scrollIntoView({ block: "start", behavior: "auto" });
    } else {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [current]);

  const slide = SLIDES[current];
  const SlideComp = SLIDE_COMPONENTS[slide.type];

  return (
    <div className="min-h-screen bg-[#050a14] flex flex-col items-center justify-start lg:justify-center p-3 py-2 overflow-x-hidden">
      <div className="w-full max-w-[1400px] flex items-center justify-between mb-2">
        <div className="text-white text-sm font-semibold opacity-60">
          DutyBoost — Air France-KLM Travel Partner Presentation 2026
          <span className="text-xs opacity-50 ml-2 hidden sm:inline">CONFIDENTIAL</span>
        </div>
        <div className="text-slate-400 text-sm">{current + 1} / {SLIDES.length}</div>
      </div>

      <div ref={slideAreaRef} className="w-full max-w-[1400px] flex rounded-2xl overflow-hidden shadow-2xl border border-white/10 min-h-[58vh] lg:h-[calc(100vh-150px)]">
        <SlideComp />
      </div>

      <div className="w-full max-w-[1400px] flex flex-wrap items-center justify-between gap-3 mt-3">
        <button
          onClick={prev}
          disabled={current === 0}
          className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 text-white hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-base font-semibold cursor-pointer select-none"
        >
          <ChevronLeft size={18} /> Previous
        </button>
        <div className="flex gap-1.5 flex-wrap justify-center max-w-lg">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setCurrent(i)}
              title={SLIDE_LABELS[s.type]}
              className={`text-xs px-3 py-1 rounded-lg transition-all font-medium ${
                i === current ? "bg-blue-600 text-white" : "bg-white/10 text-slate-400 hover:bg-white/20 hover:text-white"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <button
          onClick={next}
          disabled={current === SLIDES.length - 1}
          className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-base font-semibold cursor-pointer select-none"
        >
          Next <ChevronRight size={18} />
        </button>
      </div>
      <div className="mt-1.5 text-slate-500 text-sm">{SLIDE_LABELS[slide.type]}</div>
    </div>
  );
}