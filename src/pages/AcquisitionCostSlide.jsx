import SlideAcquisitionCost from "@/components/acquisition-slide/SlideAcquisitionCost";

export default function AcquisitionCostSlide() {
  return (
    <div className="min-h-screen bg-[#050a14] flex items-center justify-center p-4 overflow-auto">
      <div className="w-full max-w-[1400px] min-w-[900px] aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10">
        <SlideAcquisitionCost />
      </div>
    </div>
  );
}