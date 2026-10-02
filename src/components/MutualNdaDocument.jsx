import SignaturePad from "@/components/request/SignaturePad";
import { NDA_DUTYBOOST, ndaSections, fillNdaText } from "@/data/mutualNdaSections";

const fmtDate = (value) => {
  if (!value) return "[EFFECTIVE DATE]";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "[EFFECTIVE DATE]";
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });
};

export default function MutualNdaDocument({ party, signatures = {}, onSignatureChange }) {
  const company = party.party_company_name || "[COUNTERPARTY COMPANY NAME]";
  const reg = party.party_registration_number || "[REGISTRATION NUMBER]";
  const jurisdiction = party.party_country || "[JURISDICTION]";
  const addressParts = [
    party.party_street,
    party.party_postal_code && party.party_city
      ? `${party.party_postal_code} ${party.party_city}`
      : party.party_city,
  ].filter(Boolean);
  const address = addressParts.join(", ") || "[ADDRESS]";
  const representative = party.party_representative_name || "[REPRESENTATIVE NAME]";
  const representativeTitle = party.party_representative_title || "[TITLE]";
  const date = fmtDate(party.effective_date);

  return (
    <div className="space-y-5 text-[13px] text-foreground leading-relaxed">
      <h3 className="text-center font-heading font-bold text-base uppercase tracking-wide">
        Mutual Non-Disclosure Agreement
      </h3>

      <p>
        This Mutual Non-Disclosure Agreement (the &ldquo;Agreement&rdquo;) is entered into as of <strong>{date}</strong>{" "}
        (the &ldquo;Effective Date&rdquo;) by and between:
      </p>

      <p>
        <strong>(1) {NDA_DUTYBOOST.legal_name}</strong>, a company incorporated under the laws of {NDA_DUTYBOOST.jurisdiction}{" "}
        (&ldquo;DutyBoost&rdquo;); registered under the Chamber of Commerce (KvK): {NDA_DUTYBOOST.registration}, with its
        registered office at {NDA_DUTYBOOST.address};
      </p>

      <p>
        and
      </p>

      <p>
        <strong>(2) {company}</strong>, a company incorporated under the laws of {jurisdiction}, registered under number{" "}
        {reg}, with its registered office at {address} (the &ldquo;Counterparty&rdquo;).
      </p>

      <p>
        DutyBoost and {company} are each referred to individually as a &ldquo;Party&rdquo; and together as the
        &ldquo;Parties&rdquo;.
      </p>

      {ndaSections.map((section) => (
        <div key={section.number} className="space-y-1.5">
          <p className="font-semibold uppercase tracking-wide text-[13px]">
            {section.number}. {section.title}
          </p>
          {section.blocks.map((block, i) => {
            if (block.list) {
              return (
                <ul key={i} className="space-y-1 pl-5">
                  {block.list.map((item, j) => (
                    <li key={j} className="list-[lower-alpha]">
                      {fillNdaText(item, { company })}
                    </li>
                  ))}
                </ul>
              );
            }
            return <p key={i}>{fillNdaText(block.text, { company })}</p>;
          })}
        </div>
      ))}

      <div className="pt-2 space-y-3">
        <p className="font-semibold uppercase tracking-wide text-[13px]">Signatures</p>
        <p>
          The Parties confirm that they have read, understood and agreed to the terms of this Agreement and have caused
          this Agreement to be executed by their duly authorised representatives.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
          <div className="space-y-1">
            <p className="font-semibold">{company}</p>
            <p>Name: {representative}</p>
            <p>Title: {representativeTitle}</p>
            <SignaturePad
              label="Signature"
              value={signatures.counterparty || ""}
              onChange={(v) => onSignatureChange?.("counterparty", v)}
              hint="Draw your signature, or switch to Type."
            />
            <p>Date: {date}</p>
          </div>
          <div className="space-y-1">
            <p className="font-semibold">{NDA_DUTYBOOST.legal_name}</p>
            <p>Name: {NDA_DUTYBOOST.representative}</p>
            <p>Title: {NDA_DUTYBOOST.representative_title}</p>
            <SignaturePad
              label="Signature"
              value={signatures.dutyboost || ""}
              onChange={(v) => onSignatureChange?.("dutyboost", v)}
              hint="Draw the signature, or switch to Type."
            />
            <p>Date: {date}</p>
          </div>
        </div>
      </div>
    </div>
  );
}