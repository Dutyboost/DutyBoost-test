import { Document, Packer, Paragraph, TextRun, AlignmentType } from "docx";
import { NDA_DUTYBOOST, ndaSections, fillNdaText } from "@/data/mutualNdaSections";

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

export async function downloadMutualNdaDocx({ party }) {
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
    ? new Date(party.effective_date).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })
    : "[EFFECTIVE DATE]";

  const children = [
    paragraph("Mutual Non-Disclosure Agreement", {
      bold: true,
      size: 36,
      color: NAVY,
      align: AlignmentType.CENTER,
      spacing: 80,
    }),
    paragraph("For legal review", {
      size: 20,
      color: MUTED,
      align: AlignmentType.CENTER,
      spacing: 280,
    }),

    paragraph(
      `This Mutual Non-Disclosure Agreement (the "Agreement") is entered into as of ${effectiveDate} (the "Effective Date") by and between:`,
    ),
    paragraph(
      `(1) ${NDA_DUTYBOOST.legal_name}, a company incorporated under the laws of ${NDA_DUTYBOOST.jurisdiction} ("DutyBoost"); registered under the Chamber of Commerce (KvK): ${NDA_DUTYBOOST.registration}, with its registered office at ${NDA_DUTYBOOST.address};`,
    ),
    paragraph("and"),
    paragraph(
      `(2) ${company}, a company incorporated under the laws of ${jurisdiction}, registered under number ${reg}, with its registered office at ${address} (the "Counterparty").`,
    ),
    paragraph(
      `DutyBoost and ${company} are each referred to individually as a "Party" and together as the "Parties".`,
      { spacing: 260 },
    ),
  ];

  ndaSections.forEach((section) => {
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
    paragraph("SIGNATURES", { bold: true, size: 22, color: NAVY, spacing: 120 }),
    paragraph(
      "The Parties confirm that they have read, understood and agreed to the terms of this Agreement and have caused this Agreement to be executed by their duly authorised representatives.",
    ),
    paragraph("", { spacing: 160 }),
    paragraph(company, { bold: true, size: 20, color: NAVY, spacing: 60 }),
    paragraph(`Name: ${representative}`, { spacing: 40 }),
    paragraph(`Title: ${representativeTitle}`, { spacing: 40 }),
    paragraph("Signature: ______________________________", { spacing: 40 }),
    paragraph(`Date: ${effectiveDate}`, { spacing: 320 }),
    paragraph(NDA_DUTYBOOST.legal_name, { bold: true, size: 20, color: NAVY, spacing: 60 }),
    paragraph(`Name: ${NDA_DUTYBOOST.representative}`, { spacing: 40 }),
    paragraph(`Title: ${NDA_DUTYBOOST.representative_title}`, { spacing: 40 }),
    paragraph("Signature: ______________________________", { spacing: 40 }),
    paragraph(`Date: ${effectiveDate}`, { spacing: 40 }),
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