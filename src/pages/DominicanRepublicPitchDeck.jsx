import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SlideCover from "@/components/dominican-pitch/SlideCover";
import SlideTeam from "@/components/dominican-pitch/SlideTeam";
import SlideOpportunity from "@/components/dominican-pitch/SlideOpportunity";
import SlideAirlines from "@/components/dominican-pitch/SlideAirlines";
import SlideGap from "@/components/dominican-pitch/SlideGap";
import SlideHowItWorks from "@/components/dominican-pitch/SlideHowItWorks";
import SlideModel from "@/components/dominican-pitch/SlideModel";
import SlideEconomics from "@/components/dominican-pitch/SlideEconomics";
import SlideRetailers from "@/components/dominican-pitch/SlideRetailers";
import SlideAirlinesValue from "@/components/dominican-pitch/SlideAirlinesValue";
import SlideGovernment from "@/components/dominican-pitch/SlideGovernment";
import SlideNetwork from "@/components/dominican-pitch/SlideNetwork";
import SlideNextSteps from "@/components/dominican-pitch/SlideNextSteps";
import SlideThankYou from "@/components/dominican-pitch/SlideThankYou";
import { NetworkProvider } from "@/components/dominican-pitch/NetworkContext";
import { LanguageProvider, useDeckLang } from "@/components/dominican-pitch/LanguageContext";
import LanguageToggle from "@/components/dominican-pitch/LanguageToggle";
import { ACCENT } from "@/components/dominican-pitch/Shared";
import PitchDeckDownloadButtons from "@/components/pitch/PitchDeckDownloadButtons";

const SLIDES = [
  { id: "cover", type: "cover" },
  { id: "team", type: "team" },
  { id: "opportunity", type: "opportunity" },
  { id: "airlines", type: "airlines" },
  { id: "gap", type: "gap" },
  { id: "how", type: "how" },
  { id: "model", type: "model" },
  { id: "economics", type: "economics" },
  { id: "retailers", type: "retailers" },
  { id: "airlinesValue", type: "airlinesValue" },
  { id: "government", type: "government" },
  { id: "network", type: "network" },
  { id: "nextSteps", type: "nextSteps" },
  { id: "thankYou", type: "thankYou" },
];

const SLIDE_COMPONENTS = {
  cover: SlideCover,
  team: SlideTeam,
  opportunity: SlideOpportunity,
  airlines: SlideAirlines,
  gap: SlideGap,
  how: SlideHowItWorks,
  model: SlideModel,
  economics: SlideEconomics,
  retailers: SlideRetailers,
  airlinesValue: SlideAirlinesValue,
  government: SlideGovernment,
  network: SlideNetwork,
  nextSteps: SlideNextSteps,
  thankYou: SlideThankYou,
};

function DominicanDeck() {
  const { t } = useDeckLang();
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
    <div className="min-h-screen bg-[#061024] flex flex-col items-center justify-start lg:justify-center p-2 py-1.5 overflow-x-hidden">
      <div className="w-full max-w-[1400px] flex flex-wrap items-center justify-between gap-2 mb-1.5">
        <div className="text-white text-sm font-semibold opacity-60">
          {t.chrome.title}{" "}
          <span className="text-xs opacity-50 ml-2 hidden sm:inline">{t.chrome.confidential}</span>
        </div>
        <div className="flex items-center gap-3">
          <LanguageToggle />
          <PitchDeckDownloadButtons
            slides={SLIDES}
            components={SLIDE_COMPONENTS}
            filename="DutyBoost-Dominican-Republic-2026"
          />
          <div className="text-slate-400 text-sm">
            {current + 1} / {SLIDES.length}
          </div>
        </div>
      </div>

      <div
        ref={slideAreaRef}
        className="w-full max-w-[1400px] flex rounded-2xl overflow-hidden shadow-2xl border border-white/10 min-h-[60vh] lg:h-[calc(100vh-128px)]"
      >
        <NetworkProvider>
          <SlideComp />
        </NetworkProvider>
      </div>

      <div className="w-full max-w-[1400px] flex flex-wrap items-center justify-between gap-2 mt-2">
        <button
          onClick={prev}
          disabled={current === 0}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 text-white hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-sm font-semibold cursor-pointer select-none"
        >
          <ChevronLeft size={18} /> {t.chrome.previous}
        </button>
        <div className="flex gap-1.5 flex-wrap justify-center max-w-lg">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setCurrent(i)}
              title={t.labels[s.type]}
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
          {t.chrome.next} <ChevronRight size={18} />
        </button>
      </div>
      <div className="mt-1 text-slate-500 text-xs">{t.labels[slide.type]}</div>
    </div>
  );
}

export default function DominicanRepublicPitchDeck() {
  return (
    <LanguageProvider>
      <DominicanDeck />
    </LanguageProvider>
  );
}