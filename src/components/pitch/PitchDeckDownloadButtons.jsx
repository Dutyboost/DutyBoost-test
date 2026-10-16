import { useEffect, useRef, useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { exportSlideNodesToPdf } from "@/utils/exportSlidesPdf";
import { exportSlideNodesToPptx } from "@/utils/exportSlidesPptx";

// Renders the deck's slides off-screen at presentation size, captures each one and saves
// them as a PDF or a PowerPoint that mirrors the on-screen deck. Every deck page shares
// this control: pass its SLIDES list, its slide-component map and the file name (without
// extension). Use tone="light" on decks with a light page background.
// `components` is a type → component map, or a function taking the slide type.
// `renderSlide` optionally wraps each off-screen slide in the deck's providers.
// `formats` limits which download buttons show (default: both).

const FORMATS = {
  pdf: { label: "PDF", run: exportSlideNodesToPdf },
  pptx: { label: "PPT", run: exportSlideNodesToPptx },
};

export default function PitchDeckDownloadButtons({
  slides,
  components,
  filename,
  tone = "dark",
  width = 1400,
  height = 788,
  formats = ["pdf", "pptx"],
  renderSlide,
}) {
  const [format, setFormat] = useState(null);
  const [progress, setProgress] = useState(null);
  const hostRef = useRef(null);

  useEffect(() => {
    if (!format) return undefined;
    let cancelled = false;

    const run = async () => {
      const host = hostRef.current;
      if (!host) return;
      const nodes = Array.from(host.querySelectorAll("[data-deck-slide]"));
      // Give the off-screen slides a beat to lay out and load their images.
      await new Promise((resolve) => setTimeout(resolve, 200));
      await FORMATS[format].run(nodes, `${filename}.${format}`, {
        width,
        height,
        onProgress: (done, total) => {
          if (!cancelled) setProgress({ done, total });
        },
      });
    };

    run()
      .catch((error) => console.error(`Deck ${format} export failed`, error))
      .finally(() => {
        if (!cancelled) {
          setFormat(null);
          setProgress(null);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [format, filename, width, height]);

  const buttonClass =
    tone === "light"
      ? "flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-200 text-slate-700 hover:bg-slate-300 disabled:opacity-60 transition-colors text-sm font-semibold cursor-pointer select-none"
      : "flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20 disabled:opacity-60 transition-colors text-sm font-semibold cursor-pointer select-none";

  return (
    <>
      <div className="flex items-center gap-2">
        {Object.entries(FORMATS)
          .filter(([key]) => formats.includes(key))
          .map(([key, { label }]) => (
          <button
            key={key}
            type="button"
            onClick={() => setFormat(key)}
            disabled={Boolean(format)}
            title={`Download this presentation as a ${label === "PPT" ? "PowerPoint (.pptx)" : "PDF"}`}
            className={buttonClass}
          >
            {format === key ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
            {format === key
              ? progress
                ? `Preparing ${label}… ${progress.done}/${progress.total}`
                : `Preparing ${label}…`
              : `Download ${label}`}
          </button>
        ))}
      </div>

      {format && (
        <div
          ref={hostRef}
          aria-hidden="true"
          style={{ position: "fixed", left: "-20000px", top: 0, width: `${width}px`, pointerEvents: "none" }}
        >
          {slides.map((slide) => {
            // Most decks keep a type → component map; a few store the component on the slide itself.
            const SlideComp = (typeof components === "function" ? components(slide.type) : components?.[slide.type]) || slide.Component;
            if (!SlideComp) return null;
            return (
              <div
                key={slide.id || slide.type}
                data-deck-slide
                style={{ width: `${width}px`, height: `${height}px`, overflow: "hidden", background: "#ffffff", display: "flex" }}
              >
                {renderSlide ? renderSlide(SlideComp) : <SlideComp />}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}