import SignaturePad from "@/components/request/SignaturePad";
import { NDA_DUTYBOOST, getNdaSections, fillNdaText } from "@/data/mutualNdaSections";
import { getMutualNdaStrings, ndaLocale } from "@/lib/i18nMutualNda";

const fmtDate = (value, locale) => {
  if (!value) return "[EFFECTIVE DATE]";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "[EFFECTIVE DATE]";
  return d.toLocaleDateString(locale, { day: "2-digit", month: "long", year: "numeric" });
};

export default function MutualNdaDocument({ party, signatures = {}, onSignatureChange, language = "en" }) {
  const s = getMutualNdaStrings(language);
  const sections = getNdaSections(language);
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
  const date = fmtDate(party.effective_date, ndaLocale(language));

  return (
    <div className="space-y-5 text-[13px] text-foreground leading-relaxed">
      <h3 className="text-center font-heading font-bold text-base uppercase tracking-wide">
        {s.doc_title}
      </h3>

      <p>{s.doc_intro.replace("{date}", date)}</p>

      <p>
        {s.doc_party1
          .replace("{legal}", NDA_DUTYBOOST.legal_name)
          .replace("{jurisdiction}", NDA_DUTYBOOST.jurisdiction)
          .replace("{reg}", NDA_DUTYBOOST.registration)
          .replace("{address}", NDA_DUTYBOOST.address)}
      </p>

      <p>{s.doc_and}</p>

      <p>
        {s.doc_party2
          .replace("{company}", company)
          .replace("{jurisdiction}", jurisdiction)
          .replace("{reg}", reg)
          .replace("{address}", address)}
      </p>

      <p>{s.doc_parties.replace("{company}", company)}</p>

      {sections.map((section) => (
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
        <p className="font-semibold uppercase tracking-wide text-[13px]">{s.sig_heading}</p>
        <p>{s.sig_intro}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
          <div className="space-y-1">
            <p className="font-semibold">{company}</p>
            <p>{s.sig_name}: {representative}</p>
            <p>{s.sig_title}: {representativeTitle}</p>
            <SignaturePad
              label={s.sig_signature}
              value={signatures.counterparty || ""}
              onChange={(v) => onSignatureChange?.("counterparty", v)}
              hint={s.sig_hint_counterparty}
            />
            <p>{s.sig_date}: {date}</p>
          </div>
          <div className="space-y-1">
            <p className="font-semibold">{NDA_DUTYBOOST.legal_name}</p>
            <p>{s.sig_name}: {NDA_DUTYBOOST.representative}</p>
            <p>{s.sig_title}: {NDA_DUTYBOOST.representative_title}</p>
            <SignaturePad
              label={s.sig_signature}
              value={signatures.dutyboost || ""}
              onChange={(v) => onSignatureChange?.("dutyboost", v)}
              hint={s.sig_hint_dutyboost}
            />
            <p>{s.sig_date}: {date}</p>
          </div>
        </div>
      </div>
    </div>
  );
}