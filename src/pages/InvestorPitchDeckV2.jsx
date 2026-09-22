import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  SlideTeam, SlideProblem, SlideSolution,
  SlideModel, SlideFlywheel, SlideValue,
} from "@/pages/InvestorPitchDeck";
import SlideCover from "@/components/investor/v2/SlideCover";
import SlideGlobalMarket from "@/components/investor/v2/SlideGlobalMarket";
import SlidePosToggle from "@/components/investor/v2/SlidePosToggle";
import SlideStakeholderPrimary from "@/components/investor/v2/SlideStakeholderPrimary";
import SlideTechnicalIntegration from "@/components/investor/v2/SlideTechnicalIntegration";
import SlideStakeholderSecondary from "@/components/investor/v2/SlideStakeholderSecondary";
import SlideRevenueDipV2 from "@/components/investor/v2/SlideRevenueDipV2";
import SlideSxmMarket from "@/components/investor/v2/SlideSxmMarket";
import SlideSxmPos from "@/components/investor/v2/SlideSxmPos";
import SlideSxmWholesale from "@/components/investor/v2/SlideSxmWholesale";
import SlideSxmRetailer from "@/components/investor/v2/SlideSxmRetailer";
import SlideSxmOpportunity from "@/components/investor/v2/SlideSxmOpportunity";
import SlideAcquisitionGlobal from "@/components/investor/v2/SlideAcquisitionGlobal";
import SlideClosing from "@/components/investor/v2/SlideClosing";

const SLIDES = [
  { id: "cover", type: "cover" },
  { id: "team", type: "team" },
  { id: "globalMarket", type: "globalMarket" },
  { id: "problem", type: "problem" },
  { id: "solution", type: "solution" },
  { id: "posToggle", type: "posToggle" },
  { id: "technicalIntegration", type: "technicalIntegration" },
  { id: "stakeholderPrimary", type: "stakeholderPrimary" },
  { id: "stakeholderSecondary", type: "stakeholderSecondary" },
  { id: "model", type: "model" },
  { id: "revenueDip", type: "revenueDip" },
  { id: "acquisitionGlobal", type: "acquisitionGlobal" },
  { id: "sxmMarket", type: "sxmMarket" },
  { id: "sxmPos", type: "sxmPos" },
  { id: "sxmWholesale", type: "sxmWholesale" },
  { id: "sxmRetailer", type: "sxmRetailer" },
  { id: "sxmOpportunity", type: "sxmOpportunity" },
  { id: "flywheel", type: "flywheel" },
  { id: "value", type: "value" },
  { id: "closing", type: "closing" },
];

const SLIDE_COMPONENTS = {
  cover: SlideCover,
  team: SlideTeam,
  globalMarket: SlideGlobalMarket,
  problem: SlideProblem,
  solution: SlideSolution,
  posToggle: SlidePosToggle,
  stakeholderPrimary: SlideStakeholderPrimary,
  technicalIntegration: SlideTechnicalIntegration,
  stakeholderSecondary: SlideStakeholderSecondary,
  model: SlideModel,
  revenueDip: SlideRevenueDipV2,
  acquisitionGlobal: SlideAcquisitionGlobal,
  sxmMarket: SlideSxmMarket,
  sxmPos: SlideSxmPos,
  sxmWholesale: SlideSxmWholesale,
  sxmRetailer: SlideSxmRetailer,
  sxmOpportunity: SlideSxmOpportunity,
  flywheel: SlideFlywheel,
  value: SlideValue,
  closing: SlideClosing,
};

const SLIDE_LABELS = {
  cover: "Cover",
  team: "Our Team",
  globalMarket: "Global Market",
  problem: "The Facts",
  solution: "The Solution",
  posToggle: "Non-Invasive POS Toggle",
  stakeholderPrimary: "Primary Stakeholders",
  technicalIntegration: "Technical POS Integration",
  stakeholderSecondary: "Secondary: Wholesale",
  model: "Business Model",
  revenueDip: "Revenue Dip & Corporate Activation",
  acquisitionGlobal: "Customer Acquisition — On Us",
  sxmMarket: "Sint Maarten Market",
  sxmPos: "SXM: POS — Wagos & Antek",
  sxmWholesale: "SXM: Wholesale — Divico & ILTT",
  sxmRetailer: "SXM: Retailer — Dutch Delight",
  sxmOpportunity: "SXM Opportunity & Potential",
  flywheel: "Growth Flywheel",
  value: "Value Already Created",
  closing: "Thank You",
};

export default function InvestorPitchDeckV2() {
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
      <div className="w-full max-w-[1400px] flex items-center justify-between mb-2 gap-3">
        <div className="text-white text-sm font-semibold opacity-60">
          DutyBoost — Investor Pitch Deck (Stakeholder Edition) 2026{" "}
          <span className="text-xs opacity-50 ml-2 hidden sm:inline">CONFIDENTIAL</span>
        </div>
        <div className="text-slate-400 text-sm">{current + 1} / {SLIDES.length}</div>
      </div>

      <div ref={slideAreaRef} className="w-full max-w-[1400px] flex rounded-2xl overflow-hidden shadow-2xl border border-white/10 min-h-[58vh] lg:h-[calc(100vh-150px)]">
        <SlideComp />
      </div>

      <div className="w-full max-w-[1400px] flex flex-wrap items-center justify-between gap-3 mt-3">
        <button onClick={prev} disabled={current === 0}
          className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 text-white hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-base font-semibold cursor-pointer select-none">
          <ChevronLeft size={18} /> Previous
        </button>
        <div className="flex gap-1.5 flex-wrap justify-center max-w-lg">
          {SLIDES.map((s, i) => (
            <button key={s.id} onClick={() => setCurrent(i)} title={SLIDE_LABELS[s.type]}
              className={`text-xs px-3 py-1 rounded-lg transition-all font-medium ${i === current ? "bg-blue-600 text-white" : "bg-white/10 text-slate-400 hover:bg-white/20 hover:text-white"}`}>
              {i + 1}
            </button>
          ))}
        </div>
        <button onClick={next} disabled={current === SLIDES.length - 1}
          className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-base font-semibold cursor-pointer select-none">
          Next <ChevronRight size={18} />
        </button>
      </div>
      <div className="mt-1.5 text-slate-500 text-sm">{SLIDE_LABELS[slide.type]}</div>
    </div>
  );
}