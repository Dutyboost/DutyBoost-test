import SlideAcquisitionCost from "@/components/acquisition-slide/SlideAcquisitionCost";

export default function AcquisitionCostSlide() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 overflow-auto">
      <div className="w-full max-w-[1400px] min-w-[900px] aspect-video rounded-2xl overflow-hidden shadow-xl border border-border">
        <SlideAcquisitionCost />
      </div>
    </div>
  );
}