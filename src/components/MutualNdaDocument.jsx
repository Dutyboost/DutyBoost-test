const fmtDate = (value) => {
  if (!value) return "[EFFECTIVE DATE]";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "[EFFECTIVE DATE]";
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });
};

export default function MutualNdaDocument({ party }) {
  const company = party.party_company_name || "[COUNTERPARTY COMPANY NAME]";
  const reg = party.party_registration_number || "[REGISTRATION NUMBER]";
  const addressParts = [
    party.party_street,
    party.party_postal_code && party.party_city
      ? `${party.party_postal_code} ${party.party_city}`
      : party.party_city,
  ].filter(Boolean);
  const address = addressParts.join(", ") || "[ADDRESS]";
  const country = party.party_country || "[COUNTRY]";
  const representative = party.party_representative_name || "[REPRESENTATIVE NAME]";
  const title = party.party_representative_title ? ` – ${party.party_representative_title}` : "";
  const purpose = party.purpose || "evaluating a potential commercial collaboration between the Parties";
  const date = fmtDate(party.effective_date);

  return (
    <div className="space-y-4 text-sm text-foreground leading-relaxed">
      <h3 className="text-center font-heading font-bold text-base uppercase tracking-wide">
        Mutual Non-Disclosure Agreement
      </h3>

      <p>
        This Mutual Non-Disclosure Agreement (the &ldquo;Agreement&rdquo;) is entered into as of{" "}
        <strong>{date}</strong> (the &ldquo;Effective Date&rdquo;) by and between:
      </p>

      <ul className="space-y-1.5 pl-4 list-disc">
        <li>
          <strong>DutyBoost B.V.</strong>, a company registered in the Netherlands (&ldquo;DutyBoost&rdquo;); and
        </li>
        <li>
          <strong>{company}</strong>, registered under number {reg}, with its registered office at {address},{" "}
          {country} (the &ldquo;Counterparty&rdquo;).
        </li>
      </ul>

      <p>
        DutyBoost and the Counterparty are each referred to as a &ldquo;Party&rdquo; and together as the
        &ldquo;Parties&rdquo;.
      </p>

      <div>
        <p className="font-semibold">1. Purpose</p>
        <p>
          The Parties wish to exchange information in connection with {purpose} (the &ldquo;Purpose&rdquo;).
        </p>
      </div>

      <div>
        <p className="font-semibold">2. Confidential Information</p>
        <p>
          &ldquo;Confidential Information&rdquo; means any non-public information disclosed by one Party (the
          &ldquo;Disclosing Party&rdquo;) to the other (the &ldquo;Receiving Party&rdquo;), whether orally, in
          writing or in any other form, including business plans, commercial terms, pricing, customer and partner
          data, technology, product roadmaps and know-how, together with the existence and content of the Parties&rsquo;
          discussions.
        </p>
      </div>

      <div>
        <p className="font-semibold">3. Exclusions</p>
        <p>
          Confidential Information does not include information that: (a) is or becomes publicly available through
          no breach of this Agreement; (b) was lawfully known to the Receiving Party before disclosure; (c) is
          lawfully obtained from a third party without restriction; or (d) is independently developed without use of
          the Confidential Information.
        </p>
      </div>

      <div>
        <p className="font-semibold">4. Obligations</p>
        <p>
          The Receiving Party shall: (a) use the Confidential Information solely for the Purpose; (b) keep it
          confidential and protect it with at least the same degree of care it uses for its own confidential
          information; and (c) disclose it only to those of its employees, officers and professional advisers who
          need to know it for the Purpose and who are bound by confidentiality obligations no less protective than
          those in this Agreement.
        </p>
      </div>

      <div>
        <p className="font-semibold">5. Compelled Disclosure</p>
        <p>
          If the Receiving Party is required by law, regulation or a competent authority to disclose Confidential
          Information, it shall, where legally permitted, notify the Disclosing Party promptly and disclose only the
          portion strictly required.
        </p>
      </div>

      <div>
        <p className="font-semibold">6. Term</p>
        <p>
          This Agreement remains in effect for two (2) years from the Effective Date. The confidentiality
          obligations shall continue for a period of three (3) years following the date of each disclosure.
        </p>
      </div>

      <div>
        <p className="font-semibold">7. Return or Destruction</p>
        <p>
          Upon the Disclosing Party&rsquo;s written request, the Receiving Party shall promptly return or destroy all
          Confidential Information and any copies, save where retention is required by law.
        </p>
      </div>

      <div>
        <p className="font-semibold">8. No Licence or Obligation</p>
        <p>
          Nothing in this Agreement grants any licence, right or interest in the Confidential Information, nor does
          it obligate either Party to enter into any further agreement or transaction.
        </p>
      </div>

      <div>
        <p className="font-semibold">9. Governing Law and Jurisdiction</p>
        <p>
          This Agreement is governed by the laws of the Netherlands. The competent courts of Amsterdam, the
          Netherlands, shall have exclusive jurisdiction over any dispute arising out of or in connection with this
          Agreement.
        </p>
      </div>

      <div>
        <p className="font-semibold">10. Entire Agreement</p>
        <p>
          This Agreement constitutes the entire agreement between the Parties with respect to its subject matter and
          supersedes all prior discussions and understandings relating thereto.
        </p>
      </div>

      <div className="pt-2 space-y-1">
        <p className="font-semibold">Signed for and on behalf of the Counterparty:</p>
        <p>Name: {representative}{title}</p>
        <p>Company: {company}</p>
        <p>Date: {date}</p>
      </div>

      <div className="pt-2 space-y-1">
        <p className="font-semibold">Signed for and on behalf of DutyBoost B.V.:</p>
        <p>Name: Authorised Representative</p>
        <p>Date: {date}</p>
      </div>
    </div>
  );
}