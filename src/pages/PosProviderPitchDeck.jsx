import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SLIDES, SLIDE_LABELS, getSlideComponent } from "@/components/pos-pitch/PosPitchSlides";

export default function PosProviderPitchDeck() {
  const [current, setCurrent] = useState(0);
  const slideAreaRef = useRef(null);
  const currency = "€";

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
  const SlideComp = getSlideComponent(slide.type, currency);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-start lg:justify-center p-3 py-2 overflow-x-hidden">
      {/* Header */}
      <div className="w-full max-w-[1400px] flex items-center justify-between mb-2">
        <div className="text-slate-700 text-sm font-semibold opacity-80">
          DutyBoost — POS Provider Presentation 2026 <span className="text-xs opacity-50 ml-2 hidden sm:inline">CONFIDENTIAL</span>
        </div>
        <div className="text-slate-500 text-sm">{current + 1} / {SLIDES.length}</div>
      </div>

      {/* Slide */}
      <div ref={slideAreaRef} className="w-full max-w-[1400px] flex rounded-2xl overflow-hidden shadow-2xl border border-slate-200 min-h-[58vh] lg:h-[calc(100vh-150px)]">
        {SlideComp}
      </div>

      {/* Controls */}
      <div className="w-full max-w-[1400px] flex flex-wrap items-center justify-between gap-3 mt-3">
        <button
          onClick={prev}
          disabled={current === 0}
          className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-200 text-slate-700 hover:bg-slate-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-base font-semibold cursor-pointer select-none"
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
                i === current ? "bg-violet-600 text-white" : "bg-slate-200 text-slate-500 hover:bg-slate-300 hover:text-slate-700"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <button
          onClick={next}
          disabled={current === SLIDES.length - 1}
          className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-violet-600 text-white hover:bg-violet-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-base font-semibold cursor-pointer select-none"
        >
          Next <ChevronRight size={18} />
        </button>
      </div>
      <div className="mt-1.5 text-slate-500 text-sm">{SLIDE_LABELS[slide.type]}</div>
    </div>
  );
}