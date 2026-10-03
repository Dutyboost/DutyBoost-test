import { Document, Packer, Paragraph, TextRun, AlignmentType } from "docx";
import { NDA_DUTYBOOST, getNdaSections, fillNdaText } from "@/data/mutualNdaSections";
import { getMutualNdaStrings, ndaLocale } from "@/lib/i18nMutualNda";

// An editable Word copy of the Mutual Non-Disclosure Agreement, built from the same
// clause text the on-screen preview and the PDF use — so the legal team can mark it up.

const NAVY = "0A1F44";
const BODY = "334155";
const MUTED = "64748B";

const paragraph = (text, { bold = false, size = 20, color = BODY, align, spacing = 140, indent } = {}) =>
  new Paragraph({
    alignment: align,
    spacing: { after: spacing },
    indent: indent ? { left: indent } : undefined,
    children: [new TextRun({ text, bold, size, color })],
  });

export async function downloadMutualNdaDocx({ party, language = "en" }) {
  const s = getMutualNdaStrings(language);
  const sections = getNdaSections(language);
  const locale = ndaLocale(language);

  const company = party.party_company_name || "[COUNTERPARTY COMPANY NAME]";
  const reg = party.party_registration_number || "[REGISTRATION NUMBER]";
  const jurisdiction = party.party_country || "[JURISDICTION]";
  const address =
    [
      party.party_street,
      party.party_postal_code && party.party_city
        ? `${party.party_postal_code} ${party.party_city}`
        : party.party_city,
    ]
      .filter(Boolean)
      .join(", ") || "[ADDRESS]";
  const representative = party.party_representative_name || "[REPRESENTATIVE NAME]";
  const representativeTitle = party.party_representative_title || "[TITLE]";
  const effectiveDate = party.effective_date
    ? new Date(party.effective_date).toLocaleDateString(locale, { day: "2-digit", month: "long", year: "numeric" })
    : "[EFFECTIVE DATE]";

  const children = [
    paragraph(s.doc_title, {
      bold: true,
      size: 36,
      color: NAVY,
      align: AlignmentType.CENTER,
      spacing: 80,
    }),
    paragraph(s.for_legal_review, {
      size: 20,
      color: MUTED,
      align: AlignmentType.CENTER,
      spacing: 280,
    }),

    paragraph(s.doc_intro.replace("{date}", effectiveDate)),
    paragraph(
      s.doc_party1
        .replace("{legal}", NDA_DUTYBOOST.legal_name)
        .replace("{jurisdiction}", NDA_DUTYBOOST.jurisdiction)
        .replace("{reg}", NDA_DUTYBOOST.registration)
        .replace("{address}", NDA_DUTYBOOST.address),
    ),
    paragraph(s.doc_and),
    paragraph(
      s.doc_party2
        .replace("{company}", company)
        .replace("{jurisdiction}", jurisdiction)
        .replace("{reg}", reg)
        .replace("{address}", address),
    ),
    paragraph(s.doc_parties.replace("{company}", company), { spacing: 260 }),
  ];

  sections.forEach((section) => {
    children.push(
      paragraph(`${section.number}. ${section.title}`, { bold: true, size: 22, color: NAVY, spacing: 120 }),
    );
    section.blocks.forEach((block) => {
      if (block.list) {
        block.list.forEach((item, i) => {
          children.push(
            paragraph(`${String.fromCharCode(97 + i)}. ${fillNdaText(item, { company })}`, { indent: 360 }),
          );
        });
      } else {
        children.push(paragraph(fillNdaText(block.text, { company })));
      }
    });
    children.push(paragraph("", { spacing: 60 }));
  });

  children.push(
    paragraph(s.sig_heading, { bold: true, size: 22, color: NAVY, spacing: 120 }),
    paragraph(s.sig_intro),
    paragraph("", { spacing: 160 }),
    paragraph(company, { bold: true, size: 20, color: NAVY, spacing: 60 }),
    paragraph(`${s.sig_name}: ${representative}`, { spacing: 40 }),
    paragraph(`${s.sig_title}: ${representativeTitle}`, { spacing: 40 }),
    paragraph(`${s.sig_signature}: ______________________________`, { spacing: 40 }),
    paragraph(`${s.sig_date}: ${effectiveDate}`, { spacing: 320 }),
    paragraph(NDA_DUTYBOOST.legal_name, { bold: true, size: 20, color: NAVY, spacing: 60 }),
    paragraph(`${s.sig_name}: ${NDA_DUTYBOOST.representative}`, { spacing: 40 }),
    paragraph(`${s.sig_title}: ${NDA_DUTYBOOST.representative_title}`, { spacing: 40 }),
    paragraph(`${s.sig_signature}: ______________________________`, { spacing: 40 }),
    paragraph(`${s.sig_date}: ${effectiveDate}`, { spacing: 40 }),
  );

  const doc = new Document({ sections: [{ children }] });
  const blob = await Packer.toBlob(doc);
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  const safeCompany = String(company || "Counterparty").replace(/[^a-zA-Z0-9]+/g, "-");
  link.download = `DutyBoost-Mutual-NDA-${safeCompany}.docx`;
  link.click();
  URL.revokeObjectURL(url);
}