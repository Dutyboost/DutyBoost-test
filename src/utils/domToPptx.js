import pptxgen from "pptxgenjs";

// Turns the deck's rendered slides into a native PowerPoint file: coloured panels become
// real shapes, every heading and label a real text box, and every logo or icon an embedded
// picture — so the .pptx opens in PowerPoint fully editable rather than as screenshots.

export const SLIDE_W = 13.33; // inches — LAYOUT_WIDE (13.33 × 7.5) matches the 16:9 slides
export const SLIDE_H = 7.5;

const PT_PER_PX = 0.75; // CSS px → points
const TEXT_NODE = 3;
const ELEMENT_NODE = 1;

const toHex = (n) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, "0").toUpperCase();

function parseColor(value) {
  if (!value) return null;
  const raw = String(value).trim();
  if (!raw || raw === "transparent" || raw === "none") return null;

  const rgb = raw.match(/^rgba?\(([^)]+)\)$/i);
  if (rgb) {
    const parts = rgb[1].split(/[,\s/]+/).filter(Boolean).map(Number);
    if (parts.length < 3 || parts.slice(0, 3).some((n) => !Number.isFinite(n))) return null;
    const alpha = parts.length > 3 ? parts[3] : 1;
    if (!Number.isFinite(alpha) || alpha <= 0.02) return null;
    return { hex: toHex(parts[0]) + toHex(parts[1]) + toHex(parts[2]), alpha };
  }

  const short = raw.match(/^#([0-9a-f]{3,8})$/i);
  if (short) {
    let h = short[1];
    if (h.length === 3) h = h.split("").map((c) => c + c).join("");
    if (h.length === 6) return { hex: h.toUpperCase(), alpha: 1 };
    if (h.length === 8) {
      const alpha = parseInt(h.slice(6), 16) / 255;
      return alpha <= 0.02 ? null : { hex: h.slice(0, 6).toUpperCase(), alpha };
    }
  }

  return null;
}

// A .pptx shape has no gradient, so the first visible colour stop stands in for the whole
// gradient: the panel keeps its colour, only the fade is dropped.
function gradientColor(image) {
  const stops = String(image || "").match(/(rgba?\([^)]*\)|#[0-9a-f]{3,8})/gi) || [];
  for (const stop of stops) {
    const color = parseColor(stop);
    if (color) return color;
  }
  return null;
}

function fillOf(style) {
  // With background-clip: text the gradient paints the letters, not the box.
  if ((style.webkitBackgroundClip || style.backgroundClip) === "text") return null;
  return parseColor(style.backgroundColor) || gradientColor(style.backgroundImage);
}

function lineOf(style) {
  const widths = [style.borderTopWidth, style.borderRightWidth, style.borderBottomWidth, style.borderLeftWidth]
    .map(parseFloat)
    .filter((n) => Number.isFinite(n));
  const width = widths.length ? Math.max(...widths) : 0;
  if (!width) return null;
  if (/none/i.test(`${style.borderTopStyle} ${style.borderBottomStyle}`)) return null;

  const color =
    parseColor(style.borderTopColor) || parseColor(style.borderBottomColor) || parseColor(style.borderLeftColor);
  if (!color) return null;

  return {
    color: color.hex,
    width: Math.max(0.5, width * PT_PER_PX),
    transparency: Math.round((1 - color.alpha) * 100),
  };
}

function fontFaceOf(fontFamily) {
  return String(fontFamily || "").split(",")[0].replace(/["']/g, "").trim() || "Arial";
}

function textRunOptions(style) {
  let color = parseColor(style.color);
  if ((style.webkitBackgroundClip || style.backgroundClip) === "text" || !color) {
    color = gradientColor(style.backgroundImage) || { hex: "0A0F1E", alpha: 1 };
  }

  const options = {
    fontSize: Math.round((parseFloat(style.fontSize) || 14) * PT_PER_PX * 10) / 10,
    color: color.hex,
    fontFace: fontFaceOf(style.fontFamily),
  };
  if (parseInt(style.fontWeight, 10) >= 600) options.bold = true;
  if (style.fontStyle === "italic") options.italic = true;

  const spacing = parseFloat(style.letterSpacing);
  if (Number.isFinite(spacing) && spacing) options.charSpacing = Math.round(spacing * PT_PER_PX * 10) / 10;

  return options;
}

const ALIGN = { left: "left", start: "left", center: "center", right: "right", end: "right", justify: "justify" };

function blockOptions(style) {
  const options = { align: ALIGN[style.textAlign] || "left", valign: "top", margin: 0, wrap: true };

  if (style.display.includes("flex")) {
    if (style.alignItems === "center") options.valign = "middle";
    else if (style.alignItems === "flex-end" || style.alignItems === "end") options.valign = "bottom";
  } else if (style.verticalAlign === "middle") {
    options.valign = "middle";
  }

  const lineHeight = parseFloat(style.lineHeight);
  if (Number.isFinite(lineHeight)) options.lineSpacing = Math.round(lineHeight * PT_PER_PX * 10) / 10;

  return options;
}

function normalizeText(text, style) {
  let value = String(text).replace(/\s+/g, " ");
  if (style.textTransform === "uppercase") value = value.toUpperCase();
  else if (style.textTransform === "lowercase") value = value.toLowerCase();
  return value;
}

// One text box per block, with a run per inline child so coloured or bolded words inside a
// heading keep their own styling.
function collectRuns(root, hostStyle) {
  const runs = [];

  const visit = (node, style) => {
    node.childNodes.forEach((child) => {
      if (child.nodeType === TEXT_NODE) {
        let text = normalizeText(child.textContent, style);
        if (!runs.length) text = text.replace(/^\s+/, "");
        if (text) runs.push({ text, options: textRunOptions(style) });
        return;
      }
      if (child.nodeType !== ELEMENT_NODE) return;

      const tag = child.tagName.toLowerCase();
      if (tag === "br") {
        runs.push({ text: "", options: { breakLine: true } });
        return;
      }
      if (tag === "svg" || tag === "img") return; // handled as pictures
      visit(child, getComputedStyle(child));
    });
  };

  visit(root, hostStyle);
  while (runs.length && !runs[runs.length - 1].text.trim()) runs.pop();
  return runs;
}

function isBoxLike(el, style) {
  const tag = el.tagName.toLowerCase();
  if (tag === "img" || tag === "svg") return true;
  if (!style.display.startsWith("inline")) return true;
  return Boolean(fillOf(style) || lineOf(style));
}

function isTextHost(el, style) {
  if (!el.textContent || !el.textContent.trim()) return false;
  return !Array.from(el.children).some((child) => isBoxLike(child, getComputedStyle(child)));
}

function toBox(rect, ctx) {
  return {
    x: (rect.left - ctx.origin.left) * ctx.sx,
    y: (rect.top - ctx.origin.top) * ctx.sy,
    w: rect.width * ctx.sx,
    h: rect.height * ctx.sy,
  };
}

function collect(el, ctx) {
  const style = getComputedStyle(el);
  if (style.display === "none" || style.visibility === "hidden" || parseFloat(style.opacity) === 0) return;

  const tag = el.tagName.toLowerCase();
  const box = toBox(el.getBoundingClientRect(), ctx);
  const tiny = box.w < 0.02 || box.h < 0.02;

  if (tag === "img") {
    if (!tiny) ctx.images.push({ el, box });
    return;
  }
  if (tag === "svg") {
    if (!tiny) ctx.svgs.push({ el, box });
    return;
  }

  if (!tiny) {
    const fill = fillOf(style);
    const line = lineOf(style);
    if (fill || line) ctx.shapes.push({ box, fill, line, radius: parseFloat(style.borderRadius) || 0 });

    if (isTextHost(el, style)) {
      const runs = collectRuns(el, style);
      if (runs.length) ctx.texts.push({ box, runs, style });
      return;
    }
  }

  // A container (or a box too small to draw): keep walking its children, and pick up text
  // that sits directly inside it rather than inside a child element of its own.
  el.childNodes.forEach((node) => {
    if (node.nodeType === TEXT_NODE) {
      const text = normalizeText(node.textContent, style).trim();
      if (!tiny && text) ctx.texts.push({ box, runs: [{ text, options: textRunOptions(style) }], style });
    } else if (node.nodeType === ELEMENT_NODE) {
      collect(node, ctx);
    }
  });
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

async function imageSource(img) {
  const src = img.currentSrc || img.src;
  if (!src) return {};
  if (src.startsWith("data:")) return { data: src };

  try {
    const image = await loadImage(src);
    const width = image.naturalWidth || img.naturalWidth || Math.round(img.getBoundingClientRect().width);
    const height = image.naturalHeight || img.naturalHeight || Math.round(img.getBoundingClientRect().height);
    if (!width || !height) return { path: src };

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    canvas.getContext("2d").drawImage(image, 0, 0, width, height);
    return { data: canvas.toDataURL("image/png") };
  } catch {
    // If the canvas may not read the pixels, let PowerPoint fetch the URL itself.
    return { path: src };
  }
}

async function svgSource(svgEl) {
  const rect = svgEl.getBoundingClientRect();
  const width = Math.max(1, Math.round(rect.width));
  const height = Math.max(1, Math.round(rect.height));

  try {
    const clone = svgEl.cloneNode(true);
    clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    clone.setAttribute("width", String(width));
    clone.setAttribute("height", String(height));
    // Icons stroke with currentColor, which falls back to black once the SVG stands alone —
    // pin the colour it inherits on screen so white icons stay white.
    clone.style.color = getComputedStyle(svgEl).color;

    const markup = new XMLSerializer().serializeToString(clone);
    const image = await loadImage(`data:image/svg+xml;charset=utf-8,${encodeURIComponent(markup)}`);

    const scale = 2;
    const canvas = document.createElement("canvas");
    canvas.width = width * scale;
    canvas.height = height * scale;
    canvas.getContext("2d").drawImage(image, 0, 0, canvas.width, canvas.height);
    return { data: canvas.toDataURL("image/png") };
  } catch {
    return {};
  }
}

async function addSlide(pptx, node, width, height) {
  const slide = pptx.addSlide();
  const rootFill = fillOf(getComputedStyle(node));
  slide.background = { color: rootFill ? rootFill.hex : "FFFFFF" };

  const ctx = {
    origin: node.getBoundingClientRect(),
    sx: SLIDE_W / width,
    sy: SLIDE_H / height,
    shapes: [],
    texts: [],
    images: [],
    svgs: [],
  };
  Array.from(node.children).forEach((child) => collect(child, ctx));

  // Shapes first (parents before children, so panels stack as they do on screen), then
  // pictures, then text on top.
  ctx.shapes.forEach(({ box, fill, line, radius }) => {
    const rounded = radius > 0;
    slide.addShape(rounded ? pptx.ShapeType.roundRect : pptx.ShapeType.rect, {
      x: box.x,
      y: box.y,
      w: box.w,
      h: box.h,
      fill: fill
        ? { color: fill.hex, transparency: Math.round((1 - fill.alpha) * 100) }
        : { color: "FFFFFF", transparency: 100 },
      line: line
        ? { color: line.color, width: line.width, transparency: line.transparency }
        : { color: "FFFFFF", width: 0, transparency: 100 },
      ...(rounded ? { rectRadius: Math.min(radius * ctx.sx, Math.min(box.w, box.h) / 2) } : {}),
    });
  });

  const pictures = await Promise.all([
    ...ctx.images.map(async ({ el, box }) => ({
      ...(await imageSource(el)),
      box,
      contain: getComputedStyle(el).objectFit === "contain",
    })),
    ...ctx.svgs.map(async ({ el, box }) => ({ ...(await svgSource(el)), box, contain: true })),
  ]);

  pictures.forEach(({ data, path, box, contain }) => {
    if (!data && !path) return;
    slide.addImage({
      ...(data ? { data } : { path }),
      x: box.x,
      y: box.y,
      w: box.w,
      h: box.h,
      ...(contain ? { sizing: { type: "contain", w: box.w, h: box.h } } : {}),
    });
  });

  ctx.texts.forEach(({ box, runs, style }) => {
    slide.addText(runs, { x: box.x, y: box.y, w: box.w, h: box.h, ...blockOptions(style) });
  });
}

export async function exportSlideNodesToPptx(nodes, filename, { width = 1400, height = 788, onProgress } = {}) {
  if (!nodes.length) return;

  const pptx = new pptxgen();
  pptx.layout = "LAYOUT_WIDE";

  for (let i = 0; i < nodes.length; i += 1) {
    onProgress?.(i + 1, nodes.length);

    await addSlide(pptx, nodes[i], width, height);

    // Hand the frame back to the browser so the button's progress keeps up.
    await new Promise((resolve) => setTimeout(resolve, 20));
  }

  await pptx.writeFile({ fileName: filename });
}