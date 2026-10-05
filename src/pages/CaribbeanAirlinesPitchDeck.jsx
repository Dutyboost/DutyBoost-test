import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SlideCover from "@/components/caribbean-airline-pitch/SlideCover";
import SlideTripleSided from "@/components/caribbean-airline-pitch/SlideTripleSided";
import SlideTravelPartner from "@/components/caribbean-airline-pitch/SlideTravelPartner";
import SlideRetailer from "@/components/caribbean-airline-pitch/SlideRetailer";
import SlidePosIntegration from "@/components/caribbean-airline-pitch/SlidePosIntegration";
import SlideModelTable from "@/components/caribbean-airline-pitch/SlideModelTable";
import SlideNetworkDeal from "@/components/caribbean-airline-pitch/SlideNetworkDeal";
import { DealProvider } from "@/components/caribbean-airline-pitch/DealContext";
import SlideCommercialLoop from "@/components/caribbean-airline-pitch/SlideCommercialLoop";
import SlideEconomics from "@/components/caribbean-airline-pitch/SlideEconomics";
import SlideWhyItMatters from "@/components/caribbean-airline-pitch/SlideWhyItMatters";
import SlideGetStarted from "@/components/caribbean-airline-pitch/SlideGetStarted";
import SlideThankYou from "@/components/caribbean-airline-pitch/SlideThankYou";
import { ACCENT } from "@/components/caribbean-airline-pitch/Shared";

const SLIDES = [
  { id: "cover", type: "cover" },
  { id: "tripleSided", type: "tripleSided" },
  { id: "travelPartner", type: "travelPartner" },
  { id: "retailer", type: "retailer" },
  { id: "pos", type: "pos" },
  { id: "loop", type: "loop" },
  { id: "model", type: "model" },
  { id: "economics", type: "economics" },
  { id: "network", type: "network" },
  { id: "why", type: "why" },
  { id: "getStarted", type: "getStarted" },
  { id: "thankYou", type: "thankYou" },
];

const SLIDE_LABELS = {
  cover: "Cover",
  tripleSided: "The Opportunity",
  travelPartner: "Position 1 — Travel Partner",
  retailer: "Position 2 — Retailer",
  pos: "Position 3 — POS Integration",
  model: "The Triple-Sided Model",
  loop: "The Commercial Loop",
  economics: "Triple-Sided Economics",
  network: "Across the Network",
  why: "Why This Matters",
  getStarted: "Get Started",
  thankYou: "Thank You",
};

const SLIDE_COMPONENTS = {
  cover: SlideCover,
  tripleSided: SlideTripleSided,
  travelPartner: SlideTravelPartner,
  retailer: SlideRetailer,
  pos: SlidePosIntegration,
  model: SlideModelTable,
  loop: SlideCommercialLoop,
  economics: SlideEconomics,
  network: SlideNetworkDeal,
  why: SlideWhyItMatters,
  getStarted: SlideGetStarted,
  thankYou: SlideThankYou,
};

export default function CaribbeanAirlinesPitchDeck() {
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
    <div className="min-h-screen bg-[#0f0710] flex flex-col items-center justify-start lg:justify-center p-2 py-1.5 overflow-x-hidden">
      <div className="w-full max-w-[1400px] flex flex-wrap items-center justify-between gap-2 mb-1.5">
        <div className="text-white text-sm font-semibold opacity-60">
          DutyBoost — Caribbean Airlines Presentation 2026{" "}
          <span className="text-xs opacity-50 ml-2 hidden sm:inline">CONFIDENTIAL</span>
        </div>
        <div className="text-slate-400 text-sm">{current + 1} / {SLIDES.length}</div>
      </div>

      <div
        ref={slideAreaRef}
        className="w-full max-w-[1400px] flex rounded-2xl overflow-hidden shadow-2xl border border-white/10 min-h-[60vh] lg:h-[calc(100vh-128px)]"
      >
        <DealProvider>
          <SlideComp />
        </DealProvider>
      </div>

      <div className="w-full max-w-[1400px] flex flex-wrap items-center justify-between gap-2 mt-2">
        <button
          onClick={prev}
          disabled={current === 0}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 text-white hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-sm font-semibold cursor-pointer select-none"
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
                i === current ? "text-white" : "bg-white/10 text-slate-400 hover:bg-white/20 hover:text-white"
              }`}
              style={i === current ? { background: ACCENT } : undefined}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <button
          onClick={next}
          disabled={current === SLIDES.length - 1}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-sm font-semibold cursor-pointer select-none"
          style={{ background: ACCENT }}
        >
          Next <ChevronRight size={18} />
        </button>
      </div>
      <div className="mt-1 text-slate-500 text-xs">{SLIDE_LABELS[slide.type]}</div>
    </div>
  );
}