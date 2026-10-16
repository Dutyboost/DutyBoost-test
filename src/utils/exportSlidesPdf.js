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

// Gradient-filled text (background-clip: text) is painted as a plain gradient block
// with invisible text, so during the capture the gradient is dropped and the words
// are drawn in the deck's black instead.
function flattenGradientText(root) {
  const restored = [];
  root.querySelectorAll("*").forEach((el) => {
    const clip = el.style.backgroundClip || el.style.webkitBackgroundClip;
    if (clip !== "text") return;
    restored.push({
      el,
      backgroundImage: el.style.backgroundImage,
      backgroundClip: el.style.backgroundClip,
      webkitBackgroundClip: el.style.webkitBackgroundClip,
      color: el.style.color,
      webkitTextFillColor: el.style.webkitTextFillColor,
    });
    el.style.backgroundImage = "none";
    el.style.backgroundClip = "border-box";
    el.style.webkitBackgroundClip = "border-box";
    el.style.color = "#0a0f1e";
    el.style.webkitTextFillColor = "#0a0f1e";
  });
  return () => {
    restored.forEach(({ el, ...styles }) => {
      el.style.backgroundImage = styles.backgroundImage;
      el.style.backgroundClip = styles.backgroundClip;
      el.style.webkitBackgroundClip = styles.webkitBackgroundClip;
      el.style.color = styles.color;
      el.style.webkitTextFillColor = styles.webkitTextFillColor;
    });
  };
}

async function waitForAssets(root) {
  const images = Array.from(root.querySelectorAll("img"));
  // The export host sits far off-screen, where a lazy image is never fetched and
  // would block the export forever — ask for every image eagerly, and never wait
  // longer than a few seconds for any single one.
  images.forEach((img) => {
    img.loading = "eager";
  });
  await Promise.all(
    images.map((img) =>
      img.complete
        ? Promise.resolve()
        : new Promise((resolve) => {
            const done = () => {
              clearTimeout(timer);
              resolve();
            };
            const timer = setTimeout(done, 3000);
            img.addEventListener("load", done, { once: true });
            img.addEventListener("error", done, { once: true });
          })
    )
  );
  if (document.fonts?.ready) await document.fonts.ready;
}

// html2canvas does not honour flex-grow or align-items: stretch, so a slide's growing,
// vertically-centred wrapper collapses to its content height — the slide then reads as
// top-aligned in the PDF. Every growing / stretched flex item's real, browser-measured
// height is pinned onto the capture clone, so the page matches what is on screen.
function lockFlexHeights(root) {
  const heights = new Map();
  let index = 0;
  root.querySelectorAll("*").forEach((el) => {
    const parent = el.parentElement;
    if (!parent) return;
    const parentStyle = getComputedStyle(parent);
    if (parentStyle.display !== "flex" && parentStyle.display !== "inline-flex") return;

    const grows = parseFloat(getComputedStyle(el).flexGrow || "0") > 0;
    const stretchedInRow =
      parentStyle.flexDirection.startsWith("row") && parentStyle.alignItems.startsWith("stretch");
    if (!grows && !stretchedInRow) return;

    const height = el.offsetHeight;
    if (height <= 0) return;
    const id = String(index++);
    el.setAttribute("data-flex-lock", id);
    heights.set(id, height);
  });
  return {
    heights,
    release: () => root.querySelectorAll("[data-flex-lock]").forEach((el) => el.removeAttribute("data-flex-lock")),
  };
}

function applyFlexLocks(clonedDoc, { heights }) {
  clonedDoc.querySelectorAll("[data-flex-lock]").forEach((el) => {
    const height = heights.get(el.getAttribute("data-flex-lock"));
    if (!height) return;
    el.style.height = `${height}px`;
    el.style.flexGrow = "0";
    el.style.flexShrink = "0";
    el.style.flexBasis = "auto";
  });
}

// Captures one rendered slide exactly as it appears on screen. Shared by the PDF and
// the PowerPoint exporters, so both mirror the deck.
export async function captureSlide(node, { width = 1400, height = 788 } = {}) {
  await inlineSvgImages(node);
  await waitForAssets(node);
  const restoreGradientText = flattenGradientText(node);
  const flexLocks = lockFlexHeights(node);

  try {
    return await html2canvas(node, {
      backgroundColor: "#ffffff",
      scale: 2,
      useCORS: true,
      allowTaint: false,
      logging: false,
      width,
      height,
      windowWidth: width,
      windowHeight: height,
      onclone: (clonedDoc) => applyFlexLocks(clonedDoc, flexLocks),
    });
  } finally {
    flexLocks.release();
    restoreGradientText();
  }
}

// A slide can mark an element with data-pdf-link="https://…" so that it stays
// clickable in the exported PDF: the element's position on the slide is measured
// before capture and re-applied as a link annotation over the captured page image.
function collectPdfLinks(node) {
  const base = node.getBoundingClientRect();
  return Array.from(node.querySelectorAll("[data-pdf-link]"))
    .map((el) => {
      const url = el.getAttribute("data-pdf-link");
      if (!url) return null;
      const rect = el.getBoundingClientRect();
      return { url, x: rect.left - base.left, y: rect.top - base.top, w: rect.width, h: rect.height };
    })
    .filter(Boolean);
}

function addPdfLinks(pdf, links, { width, height }) {
  if (!links.length || typeof pdf.link !== "function") return;
  links.forEach(({ url, x, y, w, h }) => {
    const left = Math.max(0, Math.min(x, width - 1));
    const top = Math.max(0, Math.min(y, height - 1));
    const right = Math.max(left + 1, Math.min(x + w, width));
    const bottom = Math.max(top + 1, Math.min(y + h, height));
    pdf.link(left, top, right - left, bottom - top, { url });
  });
}

export async function exportSlideNodesToPdf(nodes, filename, { width = 1400, height = 788, onProgress } = {}) {
  if (!nodes.length) return;

  const pdf = new jsPDF({ orientation: "landscape", unit: "px", format: [width, height], compress: true });

  for (let i = 0; i < nodes.length; i += 1) {
    onProgress?.(i + 1, nodes.length);

    const links = collectPdfLinks(nodes[i]);
    const canvas = await captureSlide(nodes[i], { width, height });

    if (i > 0) pdf.addPage([width, height], "landscape");
    pdf.addImage(canvas.toDataURL("image/jpeg", 0.92), "JPEG", 0, 0, width, height);
    addPdfLinks(pdf, links, { width, height });

    // Hand the frame back to the browser so the button's progress keeps up.
    await new Promise((resolve) => setTimeout(resolve, 20));
  }

  pdf.save(filename);
}