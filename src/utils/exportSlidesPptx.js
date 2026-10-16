import pptxgen from "pptxgenjs";
import { captureSlide, collectSlideLinks } from "@/utils/exportSlidesPdf";

// Exports rendered slide elements to a PowerPoint file, one slide per 16:9 page. Each
// slide is captured exactly as it appears on screen and placed full-bleed, so the .pptx
// and the deck as presented are identical.

const SLIDE_W = 13.33; // inches — LAYOUT_WIDE is 13.33 x 7.5, the same 16:9 shape as the slides
const SLIDE_H = 7.5;

export async function exportSlideNodesToPptx(nodes, filename, { width = 1400, height = 788, onProgress } = {}) {
  if (!nodes.length) return;

  const pptx = new pptxgen();
  pptx.layout = "LAYOUT_WIDE";

  for (let i = 0; i < nodes.length; i += 1) {
    onProgress?.(i + 1, nodes.length);

    const links = collectSlideLinks(nodes[i]);
    const canvas = await captureSlide(nodes[i], { width, height });

    const slide = pptx.addSlide();
    slide.background = { color: "FFFFFF" };
    slide.addImage({ data: canvas.toDataURL("image/jpeg", 0.92), x: 0, y: 0, w: SLIDE_W, h: SLIDE_H });

    // Every link on the slide keeps working in the .pptx: an invisible, hyperlinked text
    // box sits exactly over the captured link.
    const fit = canvas.fit;
    links.forEach(({ url, x, y, w, h }) => {
      const scaled = fit
        ? { x: x * fit.scale + fit.offsetX, y: y * fit.scale, w: w * fit.scale, h: h * fit.scale }
        : { x, y, w, h };
      slide.addText(" ", {
        x: (scaled.x / width) * SLIDE_W,
        y: (scaled.y / height) * SLIDE_H,
        w: (scaled.w / width) * SLIDE_W,
        h: (scaled.h / height) * SLIDE_H,
        hyperlink: { url },
        color: "FFFFFF",
        fill: { color: "FFFFFF", transparency: 100 },
        margin: 0,
      });
    });

    // Hand the frame back to the browser so the button's progress keeps up.
    await new Promise((resolve) => setTimeout(resolve, 20));
  }

  await pptx.writeFile({ fileName: filename });
}