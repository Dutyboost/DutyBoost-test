import { jsPDF } from "jspdf";
import { base44 } from "@/api/base44Client";
import { NDA_DUTYBOOST, getNdaSections, fillNdaText } from "@/data/mutualNdaSections";
import { getMutualNdaStrings, ndaLocale } from "@/lib/i18nMutualNda";

// A4 portrait copy of the Mutual Non-Disclosure Agreement, carrying the party
// details, the full clause text and both signatures as given in the form.

const LOGO_URL = "https://media.base44.com/images/public/69c97dcd1c1950fa88424690/28ffb838a_DutyBoostLogo_1.svg";

const NAVY = [10, 31, 68];
const BODY = [51, 65, 85];
const MUTED = [100, 116, 139];
const LINE = [226, 232, 240];
const ORANGE = [255, 122, 0];
const LOGO_BLUE = [1, 76, 253]; // the DutyBoost logo's own blue (#014CFD)

const M = 18; // page margin (mm)
const PAGE_W = 210;
const PAGE_H = 297;
const CW = PAGE_W - M * 2;

// jsPDF's built-in fonts use a single-byte encoding, so typographic quotes and
// dashes are normalised to their plain equivalents.
const clean = (value) =>
  String(value ?? "")
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[\u2013\u2014]/g, "-")
    .replace(/\u00A0/g, " ")
    .replace(/\u2026/g, "...");

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

// A signature is either a data URL (just captured in the form) or a private file
// URI (an already stored record), which is read back through a signed URL.
async function resolveSignature(value) {
  if (!value) return null;
  if (String(value).startsWith("data:")) return value;
  try {
    const { signed_url } = await base44.integrations.Core.CreateFileSignedUrl({ file_uri: value });
    const blob = await (await fetch(signed_url)).blob();
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

async function loadSignature(value) {
  const dataUrl = await resolveSignature(value);
  if (!dataUrl) return null;
  try {
    const img = await new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = dataUrl;
    });
    return { dataUrl, aspect: (img.naturalWidth || 1) / (img.naturalHeight || 1) };
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

function paragraph(pdf, y, text, { size = 9.5, bold = false, color = BODY, indent = 0 } = {}) {
  pdf.setFont("helvetica", bold ? "bold" : "normal");
  pdf.setFontSize(size);
  pdf.setTextColor(...color);
  const lines = pdf.splitTextToSize(clean(text), CW - indent);
  y = keepOnPage(pdf, y, lines.length * size * 0.52 + 4);
  pdf.text(lines, M + indent, y);
  return y + lines.length * (size * 0.52) + 2;
}

function listItem(pdf, y, label, text) {
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(9.5);
  pdf.setTextColor(...BODY);
  const lines = pdf.splitTextToSize(clean(text), CW - 10);
  y = keepOnPage(pdf, y, lines.length * 5 + 1);
  pdf.text(clean(label), M + 2, y);
  pdf.text(lines, M + 10, y);
  return y + lines.length * 5 + 1;
}

export async function downloadMutualNdaPdf({ party, counterpartySignature, dutyboostSignature, language = "en" }) {
  const pdf = new jsPDF({ unit: "mm", format: "a4" });
  const s = getMutualNdaStrings(language);
  const sections = getNdaSections(language);
  const locale = ndaLocale(language);

  const company = party.party_company_name || "[COUNTERPARTY COMPANY NAME]";
  const reg = party.party_registration_number || "[REGISTRATION NUMBER]";
  const jurisdiction = party.party_country || "[JURISDICTION]";
  const address = [
    party.party_street,
    party.party_postal_code && party.party_city
      ? `${party.party_postal_code} ${party.party_city}`
      : party.party_city,
  ].filter(Boolean).join(", ") || "[ADDRESS]";
  const representative = party.party_representative_name || "[REPRESENTATIVE NAME]";
  const representativeTitle = party.party_representative_title || "[TITLE]";
  const effectiveDate = party.effective_date
    ? new Date(party.effective_date).toLocaleDateString(locale, { day: "2-digit", month: "long", year: "numeric" })
    : "";
  const today = new Date().toLocaleDateString(locale, { day: "2-digit", month: "long", year: "numeric" });
  const reference = `DB-NDA-${new Date().getFullYear()}-${String(company).replace(/[^a-zA-Z0-9]/g, "").slice(0, 6).toUpperCase()}`;

  const [logo, sign1, sign2] = await Promise.all([
    loadLogo(),
    loadSignature(counterpartySignature),
    loadSignature(dutyboostSignature),
  ]);

  // Header
  let y = 18;
  if (logo) {
    const lh = 9;
    pdf.addImage(logo.dataUrl, "PNG", M, y, lh * logo.aspect, lh);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(5);
    pdf.setTextColor(...LOGO_BLUE);
    pdf.text("TM", M + lh * logo.aspect + 0.6, y + 2.6);
  } else {
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(16);
    pdf.setTextColor(...NAVY);
    pdf.text("DutyBoost", M, y + 7);
  }
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(8);
  pdf.setTextColor(...MUTED);
  pdf.text(NDA_DUTYBOOST.email, M + CW, y + 4, { align: "right" });

  y += 16;
  pdf.setDrawColor(...ORANGE);
  pdf.setLineWidth(0.8);
  pdf.line(M, y, M + 22, y);
  y += 9;

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(18);
  pdf.setTextColor(...NAVY);
  pdf.text(s.doc_title, M, y);
  y += 7;
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10.5);
  pdf.setTextColor(...MUTED);
  pdf.text(s.executed_copy, M, y);
  y += 9;

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(8.5);
  pdf.setTextColor(...MUTED);
  pdf.text(s.ref_label.replace("{ref}", reference), M + CW, y - 9, { align: "right" });

  // Parties
  y = paragraph(pdf, y, s.doc_intro.replace("{date}", effectiveDate));
  y = paragraph(
    pdf,
    y,
    s.doc_party1
      .replace("{legal}", NDA_DUTYBOOST.legal_name)
      .replace("{jurisdiction}", NDA_DUTYBOOST.jurisdiction)
      .replace("{reg}", NDA_DUTYBOOST.registration)
      .replace("{address}", NDA_DUTYBOOST.address),
  );
  y = paragraph(pdf, y, s.doc_and);
  y = paragraph(
    pdf,
    y,
    s.doc_party2
      .replace("{company}", company)
      .replace("{jurisdiction}", jurisdiction)
      .replace("{reg}", reg)
      .replace("{address}", address),
  );
  y = paragraph(pdf, y, s.doc_parties.replace("{company}", company));
  y += 4;

  // Clauses
  sections.forEach((section) => {
    y = paragraph(pdf, y, `${section.number}. ${section.title}`.toUpperCase(), { size: 9.5, bold: true, color: NAVY });
    section.blocks.forEach((block) => {
      if (block.list) {
        block.list.forEach((item, i) => {
          y = listItem(pdf, y, `${String.fromCharCode(97 + i)}.`, fillNdaText(item, { company }));
        });
      } else {
        y = paragraph(pdf, y, fillNdaText(block.text, { company }));
      }
    });
    y += 2;
  });

  // Signatures
  y = keepOnPage(pdf, y, 62);
  y = paragraph(pdf, y, s.sig_heading.toUpperCase(), { size: 9.5, bold: true, color: NAVY });
  y = paragraph(pdf, y, s.sig_intro);
  y += 4;

  const columns = [
    { x: M, company, name: representative, title: representativeTitle, signature: sign1 },
    { x: M + 96, company: NDA_DUTYBOOST.legal_name, name: NDA_DUTYBOOST.representative, title: NDA_DUTYBOOST.representative_title, signature: sign2 },
  ];

  y = keepOnPage(pdf, y, 52);
  const top = y;
  columns.forEach(({ x, company: colCompany, name, title, signature }) => {
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(9.5);
    pdf.setTextColor(...NAVY);
    pdf.text(pdf.splitTextToSize(clean(colCompany), 84), x, top);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(9);
    pdf.setTextColor(...BODY);
    pdf.text(pdf.splitTextToSize(clean(`${s.sig_name}: ${name}`), 84), x, top + 10);
    pdf.text(pdf.splitTextToSize(clean(`${s.sig_title}: ${title}`), 84), x, top + 15);

    // Signature image sits directly above its line.
    if (signature) {
      let sw = 60;
      let sh = sw / signature.aspect;
      if (sh > 15) { sh = 15; sw = sh * signature.aspect; }
      pdf.addImage(signature.dataUrl, "PNG", x, top + 18, sw, sh);
    }

    pdf.setDrawColor(...LINE);
    pdf.setLineWidth(0.3);
    pdf.line(x, top + 34, x + 84, top + 34);
    pdf.setFontSize(8);
    pdf.setTextColor(...MUTED);
    pdf.text(s.sig_signature, x, top + 38);
    pdf.text(`${s.sig_date}: ${effectiveDate}`, x, top + 45);
  });

  // Footer
  pdf.setDrawColor(...LINE);
  pdf.line(M, PAGE_H - 16, M + CW, PAGE_H - 16);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(7.5);
  pdf.setTextColor(...MUTED);
  pdf.text(`${NDA_DUTYBOOST.email} · ${NDA_DUTYBOOST.address} · KvK ${NDA_DUTYBOOST.registration}`, M, PAGE_H - 11);
  pdf.text(s.signed_on.replace("{date}", today), M + CW, PAGE_H - 11, { align: "right" });

  const safeCompany = String(company || "Counterparty").replace(/[^a-zA-Z0-9]+/g, "-");
  pdf.save(`DutyBoost-Mutual-NDA-${safeCompany}.pdf`);
}