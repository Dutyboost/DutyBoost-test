import { jsPDF } from "jspdf";

const W = 85; // card width (mm)
const H = 55; // card height (mm)

const LOGO_URL = "https://media.base44.com/images/public/69c97dcd1c1950fa88424690/d26edd396_NEWUpdatedLogo.svg";
const LOGO_ASPECT = 877.23 / 163.44;
const LOGO_HEIGHT_MM = 9.5;
const ICON_MM = 3.2;

const ORANGE_HEX = "#FF7A00";

const PRIMARY = [26, 95, 255];
const ORANGE = [255, 122, 0];
const DARK = [13, 21, 36];
const GREY = [107, 117, 144];
const MUTED = [143, 160, 192];
const WHITE = [255, 255, 255];
const BLOOM_BLUE = [239, 244, 255];
const BLOOM_ORANGE = [255, 246, 236];
const BLOOM_BACK = [18, 47, 113];

const ICON_SVGS = {
  email:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="' + ORANGE_HEX + '" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>',
  phone:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="' + ORANGE_HEX + '" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
  website:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="' + ORANGE_HEX + '" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>',
};

// Rasterise SVG markup so it can be embedded in the PDF as a transparent PNG.
async function rasterize(svg, width, height) {
  const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
  const img = await new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = url;
  });
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  canvas.getContext("2d").drawImage(img, 0, 0, width, height);
  URL.revokeObjectURL(url);
  return canvas.toDataURL("image/png");
}

async function loadLogoPng() {
  try {
    const res = await fetch(LOGO_URL);
    const svg = await res.text();
    const width = 1800;
    return await rasterize(svg, width, Math.round(width / LOGO_ASPECT));
  } catch {
    return null;
  }
}

async function loadIconPngs() {
  const entries = await Promise.all(
    Object.entries(ICON_SVGS).map(async ([key, svg]) => {
      try {
        return [key, await rasterize(svg, 128, 128)];
      } catch {
        return [key, null];
      }
    })
  );
  return Object.fromEntries(entries);
}

function drawLogo(doc, x, y, logo, color) {
  if (logo) {
    const w = LOGO_HEIGHT_MM * LOGO_ASPECT;
    doc.addImage(logo, "PNG", x, y, w, LOGO_HEIGHT_MM);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(4.5);
    doc.setTextColor(...color);
    doc.text("TM", x + w + 0.6, y + 2.6);
    return;
  }

  // Fallback wordmark if the logo file can't be loaded
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...color);
  const w = doc.getTextWidth("DutyBoost");
  doc.text("DutyBoost", x, y + 6);
  doc.setFontSize(4.5);
  doc.text("TM", x + w + 0.6, y + 2.6);
}

function drawFront(doc, data, logo) {
  doc.setFillColor(...WHITE);
  doc.rect(0, 0, W, H, "F");

  // Soft brand bloom
  doc.setFillColor(...BLOOM_BLUE);
  doc.circle(77, 8, 24, "F");
  doc.setFillColor(...BLOOM_ORANGE);
  doc.circle(70, 54, 13, "F");

  // Left accent rail
  doc.setFillColor(...PRIMARY);
  doc.rect(0, 0, 3, H, "F");
  doc.setFillColor(...ORANGE);
  doc.rect(0, H - 16, 3, 16, "F");

  drawLogo(doc, 9, 6, logo, PRIMARY);

  // Identity block — sits above the slogan with a clear gap
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(...DARK);
  doc.text(data.name || "Your Name", 9, 32);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(...GREY);
  doc.text(data.title || "Job Title", 9, 36);

  // Accent stripe sits directly above the slogan, clear of the name block
  doc.setFillColor(...ORANGE);
  doc.rect(9, 41.6, 14, 0.7, "F");

  doc.setFontSize(6);
  doc.setTextColor(...GREY);
  const tagline = doc.splitTextToSize("THE PERFORMANCE-BASED CUSTOMER ACQUISITION INFRASTRUCTURE FOR GLOBAL TRAVEL", W - 16);
  doc.text(tagline, 9, 46, { charSpace: 0.1, lineHeightFactor: 1.35 });
}

function drawBack(doc, data, icons) {
  doc.setFillColor(...DARK);
  doc.rect(0, 0, W, H, "F");

  doc.setFillColor(...BLOOM_BACK);
  doc.circle(78, 52, 21, "F");

  doc.setFillColor(...ORANGE);
  doc.rect(0, 0, 1.2, H, "F");

  // Wordmark
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(...WHITE);
  const mark = doc.getTextWidth("DutyBoost");
  doc.text("DutyBoost", 8, 12);
  doc.setFontSize(4.5);
  doc.text("TM", 8 + mark + 0.6, 8.6);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(6.5);
  doc.setTextColor(...MUTED);
  doc.text("Pre-activated travellers, more store transactions.", 8, 15.5);

  // Contact rows
  const rows = [
    ["email", data.email || "—"],
    ["phone", data.phone || "—"],
    ["website", data.website || "—"],
  ];
  doc.setFontSize(8);
  rows.forEach(([key, value], i) => {
    const y = 31 + i * 4.8;
    const icon = icons?.[key];
    if (icon) {
      // centre the icon on the text's optical middle (baseline sits at y)
      doc.addImage(icon, "PNG", 8, y - 2.5, ICON_MM, ICON_MM);
    } else {
      doc.setFillColor(...ORANGE);
      doc.rect(8, y - 2.2, 2.6, 2.6, "F");
    }
    doc.setTextColor(...WHITE);
    doc.text(value, 12.5, y);
  });

  doc.setFontSize(6);
  doc.setTextColor(...MUTED);
  doc.text("DutyBoost  |  KvK 42053188  |  The Netherlands", 8, 49);
}

export async function exportBusinessCardPdf(data = {}) {
  const [logo, icons] = await Promise.all([loadLogoPng(), loadIconPngs()]);
  const doc = new jsPDF({ unit: "mm", format: [W, H], orientation: "landscape" });
  drawFront(doc, data, logo);
  doc.addPage([W, H], "landscape");
  drawBack(doc, data, icons);

  const slug = (data.name || "Card").trim().replace(/\s+/g, "_");
  doc.save(`DutyBoost_Business_Card_${slug}.pdf`);
}