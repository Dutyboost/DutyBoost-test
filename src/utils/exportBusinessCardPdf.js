import { jsPDF } from "jspdf";

const W = 85; // card width (mm)
const H = 55; // card height (mm)

const PRIMARY = [26, 95, 255];
const ORANGE = [255, 122, 0];
const DARK = [13, 21, 36];
const GREY = [107, 117, 144];
const MUTED = [143, 160, 192];
const WHITE = [255, 255, 255];
const BLOOM_BLUE = [239, 244, 255];
const BLOOM_ORANGE = [255, 246, 236];
const BLOOM_BACK = [18, 47, 113];

function drawFront(doc, data) {
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

  // Wordmark
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...PRIMARY);
  const frontMark = doc.getTextWidth("DutyBoost");
  doc.text("DutyBoost", 9, 12);
  doc.setFontSize(4.5);
  doc.text("TM", 9 + frontMark + 0.6, 8.6);

  // Identity block
  doc.setFontSize(13);
  doc.setTextColor(...DARK);
  doc.text(data.name || "Your Name", 9, 37);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(...GREY);
  doc.text(data.title || "Job Title", 9, 41);

  doc.setFillColor(...ORANGE);
  doc.rect(9, 43, 14, 0.7, "F");

  doc.setFontSize(6);
  doc.setTextColor(...GREY);
  const tagline = doc.splitTextToSize("THE CIRCULAR REVENUE INFRASTRUCTURE FOR GLOBAL TRAVEL", W - 16);
  doc.text(tagline, 9, 46, { charSpace: 0.1, lineHeightFactor: 1.35 });
}

function drawBack(doc, data) {
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
  const backMark = doc.getTextWidth("DutyBoost");
  doc.text("DutyBoost", 8, 12);
  doc.setFontSize(4.5);
  doc.text("TM", 8 + backMark + 0.6, 8.6);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(6.5);
  doc.setTextColor(...MUTED);
  doc.text("Pre-activated travellers, more store transactions.", 8, 15.5);

  // Contact rows
  const rows = [data.email || "—", data.phone || "—", data.website || "—"];
  doc.setFontSize(8);
  rows.forEach((value, i) => {
    const y = 31 + i * 4.8;
    doc.setFillColor(...ORANGE);
    doc.rect(8, y - 2.2, 2.6, 2.6, "F");
    doc.setTextColor(...WHITE);
    doc.text(value, 12.5, y);
  });

  doc.setFontSize(6);
  doc.setTextColor(...MUTED);
  doc.text("DutyBoost B.V.  |  KvK 42053181  |  The Netherlands", 8, 49);
}

export function exportBusinessCardPdf(data = {}) {
  const doc = new jsPDF({ unit: "mm", format: [W, H], orientation: "landscape" });
  drawFront(doc, data);
  doc.addPage([W, H], "landscape");
  drawBack(doc, data);

  const slug = (data.name || "Card").trim().replace(/\s+/g, "_");
  doc.save(`DutyBoost_Business_Card_${slug}.pdf`);
}