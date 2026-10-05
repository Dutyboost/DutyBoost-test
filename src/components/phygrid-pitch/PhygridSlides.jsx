import SlideCover from "@/components/phygrid-pitch/slides/SlideCover";
import SlideTeam from "@/components/phygrid-pitch/slides/SlideTeam";
import SlideFacts from "@/components/phygrid-pitch/slides/SlideFacts";
import SlideConversion from "@/components/phygrid-pitch/slides/SlideConversion";
import SlideAcquisition from "@/components/phygrid-pitch/slides/SlideAcquisition";
import SlideModel from "@/components/phygrid-pitch/slides/SlideModel";
import SlideTransaction from "@/components/phygrid-pitch/slides/SlideTransaction";
import SlideEstate from "@/components/phygrid-pitch/slides/SlideEstate";
import SlideIntegrate from "@/components/phygrid-pitch/slides/SlideIntegrate";
import SlideEffort from "@/components/phygrid-pitch/slides/SlideEffort";
import SlideFlywheel from "@/components/phygrid-pitch/slides/SlideFlywheel";
import SlideGetStarted from "@/components/phygrid-pitch/slides/SlideGetStarted";
import SlideClosing from "@/components/phygrid-pitch/slides/SlideClosing";
import { SlideSolution } from "@/components/shared/SlideSolution";
import { SlideTierMix } from "@/components/shared/SlideTierMix";
import { EUR_USD_RATE } from "@/lib/eurUsd";

const SlideSolutionUsd = () => <SlideSolution currency="$" />;
const SlideTierMixUsd = () => (
  <SlideTierMix
    currency="$"
    rate={EUR_USD_RATE}
    dense
    purchaseNote="27% purchase rate across travel retail — the conversion headroom the programme targets"
  />
);

export const SLIDES = [
  { id: "cover", type: "cover" },
  { id: "team", type: "team" },
  { id: "facts", type: "facts" },
  { id: "solution", type: "solution" },
  { id: "conversion", type: "conversion" },
  { id: "acquisition", type: "acquisition" },
  { id: "model", type: "model" },
  { id: "transaction", type: "transaction" },
  { id: "estate", type: "estate" },
  { id: "tierMix", type: "tierMix" },
  { id: "integrate", type: "integrate" },
  { id: "effort", type: "effort" },
  { id: "flywheel", type: "flywheel" },
  { id: "getStarted", type: "getStarted" },
  { id: "closing", type: "closing" },
];

export const SLIDE_LABELS = {
  cover: "Cover — Phygrid",
  team: "Our Team",
  facts: "The Facts — The Estate — The Gap",
  solution: "The Solution",
  conversion: "Conversion Opportunity",
  acquisition: "Customer Acquisition — On Us",
  model: "Business Model",
  tierMix: "Transaction Mix — Tier Economics",
  transaction: "Transaction Economics",
  estate: "Across the Store Estate",
  integrate: "POS Activation",
  effort: "Integration Effort",
  flywheel: "Growth Flywheel",
  getStarted: "Get Started",
  closing: "Thank You — Phygrid",
};

export function getSlideComponent(type) {
  const map = {
    cover: SlideCover,
    team: SlideTeam,
    facts: SlideFacts,
    solution: SlideSolutionUsd,
    conversion: SlideConversion,
    acquisition: SlideAcquisition,
    model: SlideModel,
    tierMix: SlideTierMixUsd,
    transaction: SlideTransaction,
    estate: SlideEstate,
    integrate: SlideIntegrate,
    effort: SlideEffort,
    flywheel: SlideFlywheel,
    getStarted: SlideGetStarted,
    closing: SlideClosing,
  };
  return map[type] || SlideCover;
}

export const SLIDE_COMPONENTS = {
  cover: SlideCover,
  team: SlideTeam,
  facts: SlideFacts,
  solution: SlideSolutionUsd,
  conversion: SlideConversion,
  acquisition: SlideAcquisition,
  model: SlideModel,
  tierMix: SlideTierMixUsd,
  transaction: SlideTransaction,
  estate: SlideEstate,
  integrate: SlideIntegrate,
  effort: SlideEffort,
  flywheel: SlideFlywheel,
  getStarted: SlideGetStarted,
  closing: SlideClosing,
};