import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SlideCover from "@/components/dominican-pitch/SlideCover";
import SlideTeam from "@/components/dominican-pitch/SlideTeam";
import SlideProblem from "@/components/dominican-pitch/retailer/SlideProblem";
import SlideSolution from "@/components/dominican-pitch/retailer/SlideSolution";
import SlideMarket from "@/components/dominican-pitch/retailer/SlideMarket";
import SlideConversion from "@/components/dominican-pitch/retailer/SlideConversion";
import SlideAcquisition from "@/components/dominican-pitch/retailer/SlideAcquisition";
import SlideBusinessModel from "@/components/dominican-pitch/retailer/SlideBusinessModel";
import SlideRevenueCalculator from "@/components/dominican-pitch/retailer/SlideRevenueCalculator";
import SlideTierMix from "@/components/dominican-pitch/retailer/SlideTierMix";
import SlideTransaction from "@/components/dominican-pitch/retailer/SlideTransaction";
import SlideEstate from "@/components/dominican-pitch/retailer/SlideEstate";
import SlideIntegrate from "@/components/dominican-pitch/retailer/SlideIntegrate";
import SlideFlywheel from "@/components/dominican-pitch/retailer/SlideFlywheel";
import SlideGetStarted from "@/components/dominican-pitch/retailer/SlideGetStarted";
import SlideThankYouRetail from "@/components/dominican-pitch/retailer/SlideThankYouRetail";
import SlideGovernment from "@/components/dominican-pitch/SlideGovernment";
import SlideNextSteps from "@/components/dominican-pitch/SlideNextSteps";
import SlideProjects from "@/components/dominican-pitch/SlideProjects";
import { NetworkProvider } from "@/components/dominican-pitch/NetworkContext";
import { RetailerRevenueProvider } from "@/components/dominican-pitch/retailer/RetailerRevenueContext";
import { LanguageProvider, useDeckLang } from "@/components/dominican-pitch/LanguageContext";
import LanguageToggle from "@/components/dominican-pitch/LanguageToggle";
import { ACCENT } from "@/components/dominican-pitch/Shared";

const SLIDES = [
  { id: "cover", type: "cover" },
  { id: "team", type: "team" },
  { id: "problem", type: "problem" },
  { id: "solution", type: "solution" },
  { id: "market", type: "market" },
  { id: "conversion", type: "conversion" },
  { id: "acquisition", type: "acquisition" },
  { id: "businessModel", type: "businessModel" },
  { id: "revenueCalculator", type: "revenueCalculator" },
  { id: "transaction", type: "transaction" },
  { id: "estate", type: "estate" },
  { id: "tierMix", type: "tierMix" },
  { id: "integrate", type: "integrate" },
  { id: "flywheel", type: "flywheel" },
  { id: "getStarted", type: "getStarted" },
  { id: "thankYou", type: "thankYou" },
  { id: "projects", type: "projects" },
  { id: "government", type: "government" },
  { id: "nextSteps", type: "nextSteps" },
];

const SLIDE_COMPONENTS = {
  cover: SlideCover,
  team: SlideTeam,
  problem: SlideProblem,
  solution: SlideSolution,
  market: SlideMarket,
  conversion: SlideConversion,
  acquisition: SlideAcquisition,
  businessModel: SlideBusinessModel,
  revenueCalculator: SlideRevenueCalculator,
  tierMix: SlideTierMix,
  transaction: SlideTransaction,
  estate: SlideEstate,
  integrate: SlideIntegrate,
  flywheel: SlideFlywheel,
  getStarted: SlideGetStarted,
  thankYou: SlideThankYouRetail,
  projects: SlideProjects,
  government: SlideGovernment,
  nextSteps: SlideNextSteps,
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
          <RetailerRevenueProvider>
            <SlideComp />
          </RetailerRevenueProvider>
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