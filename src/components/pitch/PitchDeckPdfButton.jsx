import { useEffect, useRef, useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { exportSlideNodesToPdf } from "@/utils/exportSlidesPdf";

// Renders the deck's slides off-screen at presentation size, captures each one and
// saves them as a PDF that mirrors the on-screen deck. Every deck page shares this
// button: pass its SLIDES list, its SLIDE_COMPONENTS map and the file name.

export default function PitchDeckPdfButton({ slides, components, filename, width = 1400, height = 788 }) {
  const [exporting, setExporting] = useState(false);
  const [progress, setProgress] = useState(null);
  const hostRef = useRef(null);

  useEffect(() => {
    if (!exporting) return undefined;
    let cancelled = false;

    const run = async () => {
      const host = hostRef.current;
      if (!host) return;
      const nodes = Array.from(host.querySelectorAll("[data-deck-slide]"));
      // Give the off-screen slides a beat to lay out and load their images.
      await new Promise((resolve) => setTimeout(resolve, 200));
      await exportSlideNodesToPdf(nodes, filename, {
        width,
        height,
        onProgress: (done, total) => {
          if (!cancelled) setProgress({ done, total });
        },
      });
    };

    run()
      .catch((error) => console.error("Deck PDF export failed", error))
      .finally(() => {
        if (!cancelled) {
          setExporting(false);
          setProgress(null);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [exporting, filename, width, height]);

  return (
    <>
      <button
        type="button"
        onClick={() => setExporting(true)}
        disabled={exporting}
        title="Download this presentation as a PDF"
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20 disabled:opacity-60 transition-colors text-sm font-semibold cursor-pointer select-none"
      >
        {exporting ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
        {exporting ? (progress ? `Preparing PDF… ${progress.done}/${progress.total}` : "Preparing PDF…") : "Download PDF"}
      </button>

      {exporting && (
        <div
          ref={hostRef}
          aria-hidden="true"
          style={{ position: "fixed", left: "-20000px", top: 0, width: `${width}px`, pointerEvents: "none" }}
        >
          {slides.map((slide) => {
            const SlideComp = components[slide.type];
            if (!SlideComp) return null;
            return (
              <div
                key={slide.id || slide.type}
                data-deck-slide
                style={{ width: `${width}px`, height: `${height}px`, overflow: "hidden", background: "#ffffff" }}
              >
                <SlideComp />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}