import SlideCover from "@/components/phygrid-pitch/slides/SlideCover";
import SlideOpportunity from "@/components/phygrid-pitch/slides/SlideOpportunity";
import SlideConversion from "@/components/phygrid-pitch/slides/SlideConversion";
import SlideRevenueSplit from "@/components/phygrid-pitch/slides/SlideRevenueSplit";
import SlideEstate from "@/components/phygrid-pitch/slides/SlideEstate";
import SlideFootprint from "@/components/phygrid-pitch/slides/SlideFootprint";
import SlideSimplicity from "@/components/phygrid-pitch/slides/SlideSimplicity";
import SlideNextSteps from "@/components/phygrid-pitch/slides/SlideNextSteps";
import SlideClosing from "@/components/phygrid-pitch/slides/SlideClosing";

export const SLIDES = [
  { id: "cover", type: "cover" },
  { id: "opportunity", type: "opportunity" },
  { id: "conversion", type: "conversion" },
  { id: "split", type: "split" },
  { id: "estate", type: "estate" },
  { id: "footprint", type: "footprint" },
  { id: "simplicity", type: "simplicity" },
  { id: "nextSteps", type: "nextSteps" },
  { id: "closing", type: "closing" },
];

export const SLIDE_LABELS = {
  cover: "Cover",
  opportunity: "The Opportunity",
  conversion: "One Store, One Year",
  split: "The Revenue Split",
  estate: "Across the Store Estate",
  footprint: "Growing Phygrid's Footprint",
  simplicity: "Integration",
  nextSteps: "Next Steps",
  closing: "Thank You",
};

export function getSlideComponent(type) {
  const map = {
    cover: SlideCover,
    opportunity: SlideOpportunity,
    conversion: SlideConversion,
    split: SlideRevenueSplit,
    estate: SlideEstate,
    footprint: SlideFootprint,
    simplicity: SlideSimplicity,
    nextSteps: SlideNextSteps,
    closing: SlideClosing,
  };
  return map[type] || SlideCover;
}