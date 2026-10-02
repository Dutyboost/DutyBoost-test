import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

// Exports rendered slide elements to a PDF, one slide per landscape page, so the
// download looks exactly like the deck as presented on screen.

const SVG_SOURCE = /^data:image\/svg/i;
const SVG_EXTENSION = /\.svg(\?|#|$)/i;

const isSvgSource = (src) => Boolean(src) && (SVG_SOURCE.test(src) || SVG_EXTENSION.test(src));

// An <img> pointing at an SVG taints the capture canvas, so it is rasterised to a
// PNG data URL before the slide is captured. Every logo survives the export.
async function rasteriseSvg(src) {
  const image = new Image();
  image.crossOrigin = "anonymous";
  image.src = src;
  await image.decode();
  const width = image.naturalWidth || 600;
  const height = image.naturalHeight || Math.round(width / 3);
  const scale = 3;
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(width * scale);
  canvas.height = Math.round(height * scale);
  canvas.getContext("2d").drawImage(image, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/png");
}

async function inlineSvgImages(root) {
  const images = Array.from(root.querySelectorAll("img"));
  await Promise.all(
    images.map(async (img) => {
      const src = img.getAttribute("src");
      if (!isSvgSource(src)) return;
      try {
        img.src = await rasteriseSvg(src);
      } catch {
        // A logo that cannot be rasterised is left as it is; the rest still export.
      }
    })
  );
}

async function waitForAssets(root) {
  const images = Array.from(root.querySelectorAll("img"));
  await Promise.all(
    images.map((img) =>
      img.complete
        ? Promise.resolve()
        : new Promise((resolve) => {
            img.addEventListener("load", resolve, { once: true });
            img.addEventListener("error", resolve, { once: true });
          })
    )
  );
  if (document.fonts?.ready) await document.fonts.ready;
}

export async function exportSlideNodesToPdf(nodes, filename, { width = 1400, height = 788, onProgress } = {}) {
  if (!nodes.length) return;

  const pdf = new jsPDF({ orientation: "landscape", unit: "px", format: [width, height], compress: true });

  for (let i = 0; i < nodes.length; i += 1) {
    const node = nodes[i];
    onProgress?.(i + 1, nodes.length);

    await inlineSvgImages(node);
    await waitForAssets(node);

    const canvas = await html2canvas(node, {
      backgroundColor: "#ffffff",
      scale: 2,
      useCORS: true,
      allowTaint: false,
      logging: false,
      width,
      height,
      windowWidth: width,
      windowHeight: height,
    });

    if (i > 0) pdf.addPage([width, height], "landscape");
    pdf.addImage(canvas.toDataURL("image/jpeg", 0.92), "JPEG", 0, 0, width, height);

    // Hand the frame back to the browser so the button's progress keeps up.
    await new Promise((resolve) => setTimeout(resolve, 20));
  }

  pdf.save(filename);
}