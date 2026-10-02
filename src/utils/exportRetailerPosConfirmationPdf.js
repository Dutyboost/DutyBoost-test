import { jsPDF } from "jspdf";

// A4 portrait confirmation document: the retailer's statement of interest in
// integrating DutyBoost with its POS environment, addressed to the system
// integrator, including both contact blocks and the submission authorisation.

const LOGO_URL = "https://media.base44.com/images/public/69c97dcd1c1950fa88424690/28ffb838a_DutyBoostLogo_1.svg";

const NAVY = [10, 31, 68];
const BODY = [51, 65, 85];
const MUTED = [100, 116, 139];
const LINE = [226, 232, 240];
const ORANGE = [255, 122, 0];

const M = 18; // page margin (mm)
const PAGE_W = 210;
const PAGE_H = 297;
const CW = PAGE_W - M * 2;

async function loadLogo() {
  try {
    const res = await fetch(LOGO_URL);
    const svg = await res.text();
    const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
    const img = await new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = url;
    });
    const w = img.naturalWidth || img.width || 1000;
    const h = img.naturalHeight || img.height || 300;
    const cw = 1600;
    const ch = Math.round(cw * (h / w));
    const canvas = document.createElement("canvas");
    canvas.width = cw;
    canvas.height = ch;
    canvas.getContext("2d").drawImage(img, 0, 0, cw, ch);
    URL.revokeObjectURL(url);
    return { dataUrl: canvas.toDataURL("image/png"), aspect: w / h };
  } catch {
    return null;
  }
}

function keepOnPage(pdf, y, needed = 20) {
  if (y + needed > PAGE_H - 20) {
    pdf.addPage();
    return 24;
  }
  return y;
}

function heading(pdf, y, text) {
  y = keepOnPage(pdf, y, 18);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(9.5);
  pdf.setTextColor(...NAVY);
  pdf.text(String(text).toUpperCase(), M, y);
  pdf.setDrawColor(...LINE);
  pdf.setLineWidth(0.3);
  pdf.line(M, y + 2, M + CW, y + 2);
  return y + 8;
}

function row(pdf, y, label, value) {
  const val = value && String(value).trim() ? String(value) : "—";
  const lines = pdf.splitTextToSize(val, CW - 60);
  y = keepOnPage(pdf, y, lines.length * 5 + 2);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(9);
  pdf.setTextColor(...MUTED);
  pdf.text(String(label), M, y);
  pdf.setFont("helvetica", "normal");
  pdf.setTextColor(...BODY);
  pdf.text(lines, M + 60, y);
  return y + Math.max(6, lines.length * 5);
}

function paragraph(pdf, y, text, { size = 10, bold = false, color = BODY } = {}) {
  pdf.setFont("helvetica", bold ? "bold" : "normal");
  pdf.setFontSize(size);
  pdf.setTextColor(...color);
  const lines = pdf.splitTextToSize(String(text), CW);
  y = keepOnPage(pdf, y, lines.length * size * 0.52 + 4);
  pdf.text(lines, M, y);
  return y + lines.length * (size * 0.52) + 3;
}

export async function downloadRetailerPosConfirmation({ strings, form, posValues }) {
  const T = strings;
  const pdf = new jsPDF({ unit: "mm", format: "a4" });
  const today = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });
  const reference = `DB-POS-${new Date().getFullYear()}-${String(form.company || "")
    .replace(/[^a-zA-Z0-9]/g, "")
    .slice(0, 6)
    .toUpperCase()}`;

  let y = 18;
  const logo = await loadLogo();
  if (logo) {
    const lh = 9;
    pdf.addImage(logo.dataUrl, "PNG", M, y, lh * logo.aspect, lh);
  } else {
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(16);
    pdf.setTextColor(...NAVY);
    pdf.text("DutyBoost", M, y + 7);
  }
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(5);
  pdf.setTextColor(...ORANGE);
  pdf.text("TM", M + (logo ? 9 * logo.aspect + 0.6 : 30), y + 2.6);

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(8);
  pdf.setTextColor(...MUTED);
  pdf.text("hello@dutyboost.com", M + CW, y + 4, { align: "right" });

  y += 16;
  pdf.setDrawColor(...ORANGE);
  pdf.setLineWidth(0.8);
  pdf.line(M, y, M + 22, y);
  y += 9;

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(19);
  pdf.setTextColor(...NAVY);
  pdf.text(T.title, M, y);
  y += 7;
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(11);
  pdf.setTextColor(...MUTED);
  pdf.text(T.subtitle, M, y);
  y += 10;

  y = paragraph(pdf, y, T.intro, { size: 9.5 });

  // Addressee + meta — the retailer (From) is addressing this authorisation to DutyBoost (To)
  y += 2;
  y = row(pdf, y, T.to, "DutyBoost");
  y = row(pdf, y, T.from, `${form.company || "—"}`);
  y = row(pdf, y, T.date, today);
  y = row(pdf, y, "Ref.", reference);
  y += 4;

  y = heading(pdf, y, T.details_heading);
  y = row(pdf, y, T.l_retailer, form.company);
  y = row(pdf, y, T.l_website, form.website);
  y = row(pdf, y, T.l_country, form.country);
  y = row(pdf, y, T.l_stores, form.volume);
  y = row(pdf, y, T.l_pos, posValues.join(", "));
  y += 2;
  y = row(pdf, y, T.l_pos_contact, form.posContactName);
  y = row(pdf, y, T.l_email, form.posContactEmail);
  y = row(pdf, y, T.l_phone, form.posContactPhone);
  y += 2;
  y = row(pdf, y, T.l_si_contact, form.siContactName);
  y = row(pdf, y, T.l_email, form.siContactEmail);
  y = row(pdf, y, T.l_phone, form.siContactPhone);
  y += 5;

  y = paragraph(pdf, y, T.statement, { size: 10, bold: true, color: NAVY });
  y += 3;

  y = heading(pdf, y, T.auth_heading);
  y = paragraph(pdf, y, T.auth_authorise, { size: 10 });
  y += 4;

  y = heading(pdf, y, T.sign_heading);
  y = keepOnPage(pdf, y, 34);
  pdf.setDrawColor(...LINE);
  pdf.setLineWidth(0.3);
  pdf.line(M, y + 12, M + 80, y + 12);
  pdf.line(M + 90, y + 12, M + CW, y + 12);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(8.5);
  pdf.setTextColor(...MUTED);
  pdf.text(T.sign_line, M, y + 16);
  pdf.text(T.sign_date, M + 90, y + 16);
  y += 24;
  y = row(pdf, y, T.sign_name, form.fullName);
  y = row(pdf, y, T.sign_position, form.jobTitle);

  // Footer
  pdf.setDrawColor(...LINE);
  pdf.line(M, PAGE_H - 16, M + CW, PAGE_H - 16);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(7.5);
  pdf.setTextColor(...MUTED);
  pdf.text(T.footer, M, PAGE_H - 11);

  const safeCompany = String(form.company || "Retailer").replace(/[^a-zA-Z0-9]+/g, "-");
  pdf.save(`DutyBoost-POS-Integration-Confirmation-${safeCompany}.pdf`);
}