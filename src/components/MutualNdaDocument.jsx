const fmtDate = (value) => {
  if (!value) return "[EFFECTIVE DATE]";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "[EFFECTIVE DATE]";
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });
};

const DUTYBOOST = {
  legal_name: "DutyBoost B.V.",
  jurisdiction: "the Netherlands",
  registration: "42053181",
  address: "DEK 32, 1913 BB, Almere, The Netherlands",
  representative: "Raël Martis Ozuna",
  representative_title: "Chief Commercial Officer",
};

function Section({ number, title, children }) {
  return (
    <div className="space-y-1.5">
      <p className="font-semibold uppercase tracking-wide text-[13px]">
        {number}. {title}
      </p>
      {children}
    </div>
  );
}

function Clause({ children }) {
  return <p>{children}</p>;
}

function LetteredList({ items }) {
  return (
    <ul className="space-y-1 pl-5">
      {items.map((item, i) => (
        <li key={i} className="list-[lower-alpha]">
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function MutualNdaDocument({ party }) {
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
        <strong>(1) {DUTYBOOST.legal_name}</strong>, a company incorporated under the laws of {DUTYBOOST.jurisdiction}{" "}
        (&ldquo;DutyBoost&rdquo;); registered under the Chamber of Commerce (KvK): {DUTYBOOST.registration}, with its
        registered office at {DUTYBOOST.address};
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

      <Section number="1" title="Purpose">
        <Clause>
          The Parties wish to explore and evaluate a potential commercial, technical and/or strategic collaboration
          relating to DutyBoost, including without limitation the potential implementation of DutyBoost in connection
          with {company}, its duty-free operations, airport retail activities, passenger engagement, customer
          acquisition, transaction processing, technology systems, point-of-sale systems and related commercial
          opportunities (the &ldquo;Purpose&rdquo;).
        </Clause>
        <Clause>In connection with the Purpose, each Party may disclose certain Confidential Information to the other Party.</Clause>
      </Section>

      <Section number="2" title="Definition of Confidential Information">
        <Clause>
          For purposes of this Agreement, &ldquo;Confidential Information&rdquo; means any non-public information
          disclosed or made available by or on behalf of a Party (the &ldquo;Disclosing Party&rdquo;) to the other Party
          (the &ldquo;Receiving Party&rdquo;), whether before or after the Effective Date and whether disclosed orally,
          visually, electronically, digitally, in writing, through demonstrations, system access, documentation,
          meetings, presentations, data exchanges or any other means.
        </Clause>
        <Clause>Confidential Information includes, without limitation:</Clause>
        <LetteredList
          items={[
            "business plans, strategies, commercial models, financial information and forecasts;",
            "pricing, fees, commissions, commercial terms, margins and revenue models;",
            "information relating to customers, passengers, retailers, suppliers, partners, airports, concessionaires and other business relationships;",
            "technology, software, systems, APIs, integrations, architecture, specifications, source code, object code, algorithms, processes, workflows and technical documentation;",
            "product concepts, product roadmaps, prototypes, demonstrations, technical requirements and development plans;",
            "know-how, methodologies, processes, inventions, designs and trade secrets;",
            "marketing, customer-acquisition and performance-based commercial strategies;",
            "transaction data, sales data, performance data, analytics and reports;",
            "information relating to proposed or existing integrations with POS systems, payment systems, travel platforms or other technology providers;",
            "the existence, status and substance of discussions between the Parties concerning the Purpose;",
            "any notes, analyses, compilations, studies or other materials prepared by the Receiving Party that contain or are derived from Confidential Information; and",
            "any other information that a reasonable person would understand to be confidential given the nature of the information and the circumstances of disclosure.",
          ]}
        />
        <Clause>
          Information does not need to be marked &ldquo;Confidential&rdquo; to constitute Confidential Information if
          its nature or the circumstances of disclosure reasonably indicate that it is confidential.
        </Clause>
      </Section>

      <Section number="3" title="Exclusions">
        <Clause>Confidential Information does not include information that the Receiving Party can demonstrate:</Clause>
        <LetteredList
          items={[
            "is or becomes publicly available through no breach of this Agreement by the Receiving Party or any of its Representatives;",
            "was lawfully known to the Receiving Party without restriction before it was disclosed by the Disclosing Party;",
            "is lawfully received from a third party that, to the Receiving Party's knowledge, is not under an obligation of confidentiality in respect of such information;",
            "is independently developed by the Receiving Party without use of or reference to the Disclosing Party's Confidential Information; or",
            "has been expressly authorised for disclosure by the Disclosing Party in writing.",
          ]}
        />
        <Clause>The burden of demonstrating that an exclusion applies shall rest with the Receiving Party.</Clause>
      </Section>

      <Section number="4" title="Confidentiality Obligations">
        <Clause>The Receiving Party shall:</Clause>
        <LetteredList
          items={[
            "use the Confidential Information solely for the Purpose;",
            "keep the Confidential Information strictly confidential;",
            "protect the Confidential Information using at least the same degree of care that it applies to its own confidential information of a similar nature, and in all circumstances no less than reasonable care;",
            "not disclose Confidential Information to any person except as expressly permitted under this Agreement;",
            "not copy, reproduce, reverse engineer, decompile, disassemble or otherwise analyse any software, technology, system or technical material disclosed by the Disclosing Party except to the extent reasonably necessary for the Purpose and expressly permitted by the Disclosing Party;",
            "promptly notify the Disclosing Party if it becomes aware of any unauthorised access, use, disclosure, loss or compromise of Confidential Information; and",
            "take reasonable steps to prevent unauthorised access to or disclosure of the Confidential Information.",
          ]}
        />
      </Section>

      <Section number="5" title="Permitted Disclosures">
        <Clause>
          The Receiving Party may disclose Confidential Information solely to its directors, officers, employees,
          professional advisers, consultants, contractors and affiliated entities who:
        </Clause>
        <LetteredList
          items={[
            "have a genuine need to know such information for the Purpose; and",
            "are subject to confidentiality obligations that are at least as protective as those contained in this Agreement.",
          ]}
        />
        <Clause>Such persons are referred to collectively as &ldquo;Representatives&rdquo;.</Clause>
        <Clause>The Receiving Party shall remain responsible for any breach of this Agreement by its Representatives.</Clause>
        <Clause>
          Neither Party shall disclose the other Party&rsquo;s Confidential Information to a competitor of the
          Disclosing Party for any purpose.
        </Clause>
      </Section>

      <Section number="6" title="Compelled Disclosure">
        <Clause>
          If the Receiving Party or any of its Representatives is required by applicable law, regulation, court order or
          a competent governmental or regulatory authority to disclose Confidential Information, the Receiving Party may
          make such disclosure provided that, to the extent legally permitted:
        </Clause>
        <LetteredList
          items={[
            "it promptly notifies the Disclosing Party in writing before making the disclosure;",
            "it reasonably cooperates with the Disclosing Party, at the Disclosing Party's expense, in seeking protective treatment or another appropriate remedy; and",
            "it discloses only the portion of the Confidential Information that it is legally required to disclose.",
          ]}
        />
      </Section>

      <Section number="7" title="Security and Data Protection">
        <Clause>
          Each Party shall maintain reasonable administrative, technical and organisational safeguards designed to protect
          Confidential Information against unauthorised access, use, alteration, disclosure, loss or destruction.
        </Clause>
        <Clause>
          To the extent that the Parties exchange personal data in connection with the Purpose, each Party shall comply
          with all applicable data protection and privacy laws and regulations applicable to it.
        </Clause>
        <Clause>
          Nothing in this Agreement shall be interpreted as authorising either Party to disclose personal data where such
          disclosure is prohibited by applicable law.
        </Clause>
        <Clause>
          If the proposed collaboration requires the processing of personal data on behalf of one Party by the other
          Party, the Parties shall enter into any additional data processing or data protection agreement required by
          applicable law before such processing begins.
        </Clause>
      </Section>

      <Section number="8" title="Return or Destruction of Confidential Information">
        <Clause>
          Upon the Disclosing Party&rsquo;s written request, or upon termination of discussions relating to the Purpose,
          the Receiving Party shall, subject to Section 9:
        </Clause>
        <LetteredList
          items={[
            "promptly return or destroy all Confidential Information in its possession or control;",
            "destroy copies, extracts, summaries and other materials containing or derived from such Confidential Information; and",
            "upon reasonable request, confirm in writing that such return or destruction has been completed.",
          ]}
        />
        <Clause>Notwithstanding the foregoing, the Receiving Party may retain:</Clause>
        <LetteredList
          items={[
            "copies required to be retained by applicable law, regulation or professional obligations; and",
            "automatically generated electronic backup copies created in the ordinary course of business, provided that such copies remain subject to this Agreement and are not restored or accessed except for legitimate business, legal or disaster-recovery purposes.",
          ]}
        />
      </Section>

      <Section number="9" title="Ownership and Intellectual Property">
        <Clause>All Confidential Information remains the property of the Disclosing Party.</Clause>
        <Clause>Nothing in this Agreement:</Clause>
        <LetteredList
          items={[
            "transfers ownership of any intellectual property;",
            "grants any licence, right or interest in any patent, copyright, trademark, trade secret, software, technology, database, know-how or other intellectual property;",
            "grants either Party the right to commercialise, reproduce, modify or distribute the other Party's intellectual property; or",
            "prevents either Party from independently developing products, services or technologies, provided that such development does not use or disclose the other Party's Confidential Information.",
          ]}
        />
        <Clause>
          Any intellectual property rights arising from a future joint development or integration shall be addressed
          separately in a written agreement between the Parties.
        </Clause>
      </Section>

      <Section number="10" title="No Warranty">
        <Clause>All Confidential Information is provided &ldquo;as is&rdquo;.</Clause>
        <Clause>
          Neither Party makes any representation or warranty, express or implied, as to the accuracy, completeness or
          suitability of its Confidential Information for any particular purpose, except as may be expressly agreed in a
          subsequent written agreement.
        </Clause>
        <Clause>
          Neither Party shall have any liability arising solely from the Receiving Party&rsquo;s use of Confidential
          Information in evaluating the Purpose.
        </Clause>
      </Section>

      <Section number="11" title="No Obligation to Proceed">
        <Clause>Nothing in this Agreement:</Clause>
        <LetteredList
          items={[
            "obligates either Party to enter into any commercial, technical, partnership, investment, licensing or other agreement;",
            "requires either Party to continue discussions;",
            "creates a partnership, joint venture, agency, employment or fiduciary relationship between the Parties; or",
            "grants either Party exclusivity unless expressly agreed in a separate written agreement.",
          ]}
        />
        <Clause>
          Each Party remains free to pursue other business opportunities, subject always to its obligations under this
          Agreement.
        </Clause>
      </Section>

      <Section number="12" title="No Publicity">
        <Clause>
          Neither Party shall issue any press release or make any public announcement concerning the discussions, the
          Purpose or the potential relationship between the Parties without the prior written consent of the other Party,
          except where disclosure is required by applicable law or regulation.
        </Clause>
        <Clause>
          Neither Party shall use the other Party&rsquo;s name, logo, trademarks or other identifying materials for
          marketing or promotional purposes without prior written consent.
        </Clause>
      </Section>

      <Section number="13" title="Non-Circumvention of Confidential Business Information">
        <Clause>
          Neither Party shall use Confidential Information received from the other Party for the purpose of circumventing
          or bypassing the commercial relationships, business opportunities, customers, retailers, suppliers, partners or
          other contacts specifically introduced or disclosed by the other Party in connection with the Purpose.
        </Clause>
        <Clause>
          This provision does not prevent either Party from pursuing relationships that it can demonstrate existed
          independently of the Confidential Information or were independently developed without use of the other
          Party&rsquo;s Confidential Information.
        </Clause>
      </Section>

      <Section number="14" title="Term">
        <Clause>
          This Agreement shall commence on the Effective Date and remain in effect for two (2) years unless terminated
          earlier by written agreement of the Parties.
        </Clause>
        <Clause>
          The confidentiality and restricted-use obligations contained in this Agreement shall survive for three (3)
          years from the date of each disclosure of Confidential Information.
        </Clause>
        <Clause>
          Notwithstanding the foregoing, Confidential Information that constitutes a trade secret shall remain protected
          for so long as it continues to qualify as a trade secret under applicable law.
        </Clause>
      </Section>

      <Section number="15" title="Remedies">
        <Clause>
          Each Party acknowledges that unauthorised disclosure or use of Confidential Information may cause irreparable
          harm for which monetary damages alone may be insufficient.
        </Clause>
        <Clause>
          Accordingly, in the event of an actual or threatened breach of this Agreement, the Disclosing Party shall be
          entitled, subject to applicable law, to seek injunctive relief, specific performance or other equitable
          remedies in addition to any other remedies available at law or in equity.
        </Clause>
        <Clause>Nothing in this Section limits either Party&rsquo;s right to pursue damages or any other available remedy.</Clause>
      </Section>

      <Section number="16" title="Notices">
        <Clause>
          Any notice required under this Agreement shall be provided in writing and delivered by email, recognised
          courier or registered mail to the relevant Party&rsquo;s designated contact address.
        </Clause>
        <Clause>
          For purposes of formal notices, the Parties may designate or update their relevant contact details by written
          notice.
        </Clause>
      </Section>

      <Section number="17" title="Assignment">
        <Clause>
          Neither Party may assign or transfer this Agreement or any of its rights or obligations under it without the
          prior written consent of the other Party, except that either Party may assign this Agreement to a successor in
          connection with a merger, reorganisation or sale of substantially all of its business or assets to which this
          Agreement relates, provided that the assignee assumes all obligations under this Agreement.
        </Clause>
      </Section>

      <Section number="18" title="Severability">
        <Clause>
          If any provision of this Agreement is determined to be invalid, illegal or unenforceable, that provision shall
          be modified to the minimum extent necessary to make it enforceable, and the remaining provisions shall remain
          in full force and effect.
        </Clause>
      </Section>

      <Section number="19" title="Waiver">
        <Clause>
          No failure or delay by either Party in exercising any right or remedy under this Agreement shall constitute a
          waiver of that right or remedy.
        </Clause>
        <Clause>A waiver shall be effective only if made in writing by the Party granting the waiver.</Clause>
      </Section>

      <Section number="20" title="Amendments">
        <Clause>
          No amendment, modification or waiver of this Agreement shall be effective unless made in writing and signed by
          authorised representatives of both Parties.
        </Clause>
      </Section>

      <Section number="21" title="Entire Agreement">
        <Clause>
          This Agreement constitutes the entire agreement between the Parties concerning the confidentiality and
          permitted use of information disclosed in connection with the Purpose and supersedes all prior discussions,
          correspondence, understandings and agreements relating specifically to that subject matter.
        </Clause>
      </Section>

      <Section number="22" title="Counterparts and Electronic Signatures">
        <Clause>
          This Agreement may be executed in counterparts, each of which shall constitute an original and all of which
          together shall constitute one instrument.
        </Clause>
        <Clause>
          Electronic signatures and electronically transmitted copies of signed counterparts shall, to the extent
          permitted by applicable law, have the same effect as original signatures.
        </Clause>
      </Section>

      <Section number="23" title="Governing Law">
        <Clause>
          This Agreement shall be governed by and construed in accordance with the laws of the Netherlands, without
          regard to its conflict-of-law principles.
        </Clause>
      </Section>

      <Section number="24" title="Jurisdiction">
        <Clause>
          The competent courts of Amsterdam, the Netherlands, shall have exclusive jurisdiction over any dispute arising
          out of or in connection with this Agreement, including any dispute concerning its existence, validity,
          interpretation, performance or termination.
        </Clause>
        <Clause>
          The Parties agree that this jurisdiction clause is without prejudice to either Party&rsquo;s right to seek
          urgent interim or injunctive relief from any court of competent jurisdiction where necessary to protect
          Confidential Information or intellectual property.
        </Clause>
      </Section>

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
            <p>Signature: ______________________</p>
            <p>Date: {date}</p>
          </div>
          <div className="space-y-1">
            <p className="font-semibold">{DUTYBOOST.legal_name}</p>
            <p>Name: {DUTYBOOST.representative}</p>
            <p>Title: {DUTYBOOST.representative_title}</p>
            <p>Signature: ______________________</p>
            <p>Date: {date}</p>
          </div>
        </div>
      </div>
    </div>
  );
}