import { Link } from "react-router-dom";
import DutyBoostLogo from "../components/DutyBoostLogo";

const subProcessors = [
  {
    name: "Base44 Ltd.",
    role: "Application platform & backend infrastructure",
    location: "Israel / EU (data hosted in EU regions)",
    website: "https://base44.com",
  },
  {
    name: "Supabase Inc.",
    role: "Database hosting and real-time data services",
    location: "United States (EU region available)",
    website: "https://supabase.com",
  },
  {
    name: "Cloudflare Inc.",
    role: "Content delivery network, DDoS protection, DNS",
    location: "United States (global edge nodes, EU data residency options)",
    website: "https://cloudflare.com",
  },
  {
    name: "Resend Inc.",
    role: "Transactional email delivery",
    location: "United States",
    website: "https://resend.com",
  },
  {
    name: "Stripe Inc.",
    role: "Payment processing and financial transactions",
    location: "United States (EU entity: Stripe Payments Europe, Ltd.)",
    website: "https://stripe.com",
  },
  {
    name: "Google LLC",
    role: "Analytics, workspace tools, and authentication services",
    location: "United States (EU Standard Contractual Clauses in place)",
    website: "https://google.com",
  },
];

export default function DataProcessingAgreement() {
  return (
    <div className="min-h-screen bg-background font-body">
      <nav className="border-b border-border px-6 h-16 flex items-center">
        <Link to="/">
          <DutyBoostLogo height={36} />
        </Link>
      </nav>
      <div className="max-w-3xl mx-auto px-6 py-16 space-y-8">
        <div>
          <h1 className="text-4xl font-heading font-bold mb-2">Data Processing Agreement</h1>
          <p className="text-muted-foreground text-sm">Last updated: March 2026 · Governed by GDPR (EU) 2016/679</p>
        </div>

        <p className="text-muted-foreground leading-relaxed border-l-4 border-primary/30 pl-4 bg-card rounded-r-xl py-3 pr-4">
          This Data Processing Agreement ("DPA") is entered into between DutyBoost B.V. ("Processor") and any business entity ("Controller") that accesses or uses the DutyBoost platform. By using the DutyBoost platform, the Controller agrees to the terms of this DPA, which forms an integral part of the overall service agreement.
        </p>

        <section className="space-y-3">
          <h2 className="text-xl font-heading font-semibold">1. Definitions</h2>
          <p className="text-muted-foreground leading-relaxed">For the purposes of this DPA:</p>
          <ul className="list-disc list-inside text-muted-foreground space-y-1 leading-relaxed">
            <li><strong className="text-foreground">Personal Data</strong>: any information relating to an identified or identifiable natural person ("data subject").</li>
            <li><strong className="text-foreground">Processing</strong>: any operation or set of operations performed on personal data, whether or not by automated means.</li>
            <li><strong className="text-foreground">Controller</strong>: the entity that determines the purposes and means of processing personal data.</li>
            <li><strong className="text-foreground">Processor</strong>: DutyBoost, which processes personal data on behalf of the Controller.</li>
            <li><strong className="text-foreground">Sub-Processor</strong>: any third party engaged by the Processor to assist in carrying out processing activities.</li>
            <li><strong className="text-foreground">Data Subject</strong>: the individual to whom the personal data relates.</li>
            <li><strong className="text-foreground">GDPR</strong>: Regulation (EU) 2016/679 of the European Parliament and of the Council.</li>
            <li><strong className="text-foreground">Supervisory Authority</strong>: an independent public authority established under GDPR Article 51.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-heading font-semibold">2. Scope and Purpose of Processing</h2>
          <p className="text-muted-foreground leading-relaxed">DutyBoost processes personal data on behalf of the Controller solely for the purpose of providing the DutyBoost platform services, including voucher generation, transaction management, retailer management, and related analytics. Processing is limited to what is strictly necessary to deliver the contracted service.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-heading font-semibold">3. Nature of the Processing</h2>
          <p className="text-muted-foreground leading-relaxed">Processing activities include collection, storage, retrieval, organisation, structuring, use, disclosure, and deletion of personal data through the DutyBoost platform. Processing is performed electronically and may include automated decision-making where necessary for voucher discount calculations, subject to the rights of data subjects under GDPR Article 22.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-heading font-semibold">4. Categories of Personal Data</h2>
          <p className="text-muted-foreground leading-relaxed">DutyBoost may process the following categories of personal data:</p>
          <ul className="list-disc list-inside text-muted-foreground space-y-1 leading-relaxed">
            <li>Identity data: full name, email address of agency staff and retailer representatives.</li>
            <li>Business data: company name, business address, VAT number.</li>
            <li>Booking data: number of travelers, travel dates, departure airports, ticket prices.</li>
            <li>Transaction data: voucher codes, redemption records, purchase values.</li>
            <li>Technical data: IP addresses, browser type, session identifiers, and log data.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-heading font-semibold">5. Categories of Data Subjects</h2>
          <p className="text-muted-foreground leading-relaxed">The personal data processed may relate to the following categories of data subjects: employees, agents, and representatives of travel agencies; employees and representatives of airport retailers; individual travelers associated with bookings submitted by agencies; and visitors to the DutyBoost platform.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-heading font-semibold">6. Instructions for Processing</h2>
          <p className="text-muted-foreground leading-relaxed">DutyBoost shall process personal data only on documented instructions from the Controller, which are provided through the platform's configuration and use. DutyBoost shall immediately inform the Controller if it believes an instruction infringes the GDPR or other applicable data protection laws, without being required to carry out such processing pending further instructions.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-heading font-semibold">7. Confidentiality</h2>
          <p className="text-muted-foreground leading-relaxed">DutyBoost ensures that all personnel who access or process personal data under this DPA are bound by appropriate confidentiality obligations, whether by contract or statutory duty. Access to personal data is restricted on a strict need-to-know basis and is regularly reviewed.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-heading font-semibold">8. Technical and Organisational Security Measures</h2>
          <p className="text-muted-foreground leading-relaxed">DutyBoost implements and maintains appropriate technical and organisational measures to protect personal data, including:</p>
          <ul className="list-disc list-inside text-muted-foreground space-y-1 leading-relaxed">
            <li>Encryption of personal data in transit (TLS 1.2+) and at rest (AES-256).</li>
            <li>Role-based access control with principle of least privilege.</li>
            <li>Multi-factor authentication for all internal platform access.</li>
            <li>Regular security vulnerability assessments and penetration testing.</li>
            <li>Audit logging of all access to and modifications of personal data.</li>
            <li>Automated anomaly detection and intrusion monitoring.</li>
            <li>Regular staff training on data protection and security practices.</li>
            <li>Documented incident response and business continuity procedures.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-heading font-semibold">9. Sub-Processors</h2>
          <p className="text-muted-foreground leading-relaxed">The Controller grants DutyBoost general written authorisation to engage the sub-processors listed in this clause. DutyBoost shall impose data protection obligations equivalent to those in this DPA on all sub-processors and shall remain fully liable for their performance. DutyBoost will notify the Controller of any intended changes to sub-processors with at least 30 days' notice, giving the Controller the opportunity to object.</p>
          <p className="text-muted-foreground leading-relaxed font-medium mt-2">Current authorised sub-processors:</p>
          <div className="space-y-3 mt-2">
            {subProcessors.map((sp) => (
              <div key={sp.name} className="bg-card border border-border rounded-xl p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-sm text-foreground">{sp.name}</p>
                    <p className="text-muted-foreground text-sm mt-0.5">{sp.role}</p>
                    <p className="text-muted-foreground text-xs mt-1">📍 {sp.location}</p>
                  </div>
                  <a href={sp.website} target="_blank" rel="noopener noreferrer" className="text-primary text-xs underline shrink-0">{sp.website.replace('https://', '')}</a>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-heading font-semibold">10. Data Subject Rights Assistance</h2>
          <p className="text-muted-foreground leading-relaxed">DutyBoost shall assist the Controller in fulfilling its obligations to respond to data subject rights requests, including rights of access, rectification, erasure, restriction of processing, data portability, and the right to object. Assistance will be provided within a reasonable timeframe and at no additional charge for standard requests.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-heading font-semibold">11. Data Protection Impact Assessments</h2>
          <p className="text-muted-foreground leading-relaxed">Where required by GDPR Article 35, DutyBoost shall assist the Controller in carrying out Data Protection Impact Assessments (DPIAs) in relation to processing activities carried out by DutyBoost. DutyBoost will provide all relevant information about its processing activities, technical measures, and sub-processors necessary to complete a DPIA.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-heading font-semibold">12. Personal Data Breach Notification</h2>
          <p className="text-muted-foreground leading-relaxed">In the event of a personal data breach, DutyBoost shall notify the Controller without undue delay, and where feasible no later than 72 hours after becoming aware of the breach. Notification shall include: the nature of the breach; the categories and approximate number of data subjects and records affected; the likely consequences; and the measures taken or proposed to address the breach. DutyBoost will cooperate fully with the Controller's own breach notification obligations to supervisory authorities and data subjects.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-heading font-semibold">13. International Data Transfers</h2>
          <p className="text-muted-foreground leading-relaxed">DutyBoost will not transfer personal data to countries or international organisations outside the European Economic Area (EEA) unless one of the following safeguards applies: an adequacy decision by the European Commission; Standard Contractual Clauses (SCCs) as adopted by the Commission; or another approved transfer mechanism under GDPR Chapter V. Details of applicable transfer mechanisms for each sub-processor are available upon request.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-heading font-semibold">14. Data Retention and Deletion</h2>
          <p className="text-muted-foreground leading-relaxed">DutyBoost retains personal data only for as long as is necessary to provide the platform services or as required by applicable law. Upon termination of the service agreement, DutyBoost shall, at the Controller's choice, delete or return all personal data within 30 days, and certify in writing that deletion has been completed. Anonymised or aggregated data may be retained for legitimate statistical and business improvement purposes.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-heading font-semibold">15. Audit Rights</h2>
          <p className="text-muted-foreground leading-relaxed">DutyBoost shall make available to the Controller all information necessary to demonstrate compliance with GDPR Article 28 obligations. Upon reasonable prior written notice of no less than 14 days, DutyBoost will allow for and contribute to audits, including inspections, conducted by the Controller or a mandated auditor. Audits will be conducted during normal business hours and at the Controller's cost, without disrupting DutyBoost's operations.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-heading font-semibold">16. Data Minimisation</h2>
          <p className="text-muted-foreground leading-relaxed">DutyBoost applies the principle of data minimisation in all processing activities. Only personal data that is adequate, relevant, and limited to what is necessary in relation to the purposes for which it is processed shall be collected and used. DutyBoost periodically reviews data holdings to identify and delete data that is no longer necessary.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-heading font-semibold">17. Purpose Limitation</h2>
          <p className="text-muted-foreground leading-relaxed">DutyBoost shall not process personal data for any purpose other than that specified in this DPA and the associated service agreement. Any further processing beyond the original purpose will only occur with the explicit written consent of the Controller or where required by applicable law.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-heading font-semibold">18. Privacy by Design and Default</h2>
          <p className="text-muted-foreground leading-relaxed">DutyBoost has implemented privacy by design and default principles into its platform architecture. This includes data minimisation at the point of collection, default to the most privacy-protective settings, end-to-end encryption for sensitive data flows, and regular privacy reviews of new features and processing activities before deployment.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-heading font-semibold">19. Automated Decision-Making</h2>
          <p className="text-muted-foreground leading-relaxed">DutyBoost's discount calculation engine applies automated logic to booking data to determine voucher discount percentages. This automated processing is based on objective, transparent criteria (ticket price, group size, travel type) and does not produce legal effects or significantly affect data subjects in a manner requiring safeguards under GDPR Article 22. The Controller may request information on the logic applied at any time.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-heading font-semibold">20. Liability and Indemnification</h2>
          <p className="text-muted-foreground leading-relaxed">Each party shall be liable for any damage caused to data subjects resulting from its own breach of GDPR obligations. Where DutyBoost as Processor is held liable for a breach that was caused by the Controller's instructions or the Controller's own non-compliance, DutyBoost shall be entitled to recover from the Controller the portion of damages attributable to the Controller's acts or omissions.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-heading font-semibold">21. Duration and Termination</h2>
          <p className="text-muted-foreground leading-relaxed">This DPA shall remain in force for the duration of the service agreement between DutyBoost and the Controller. Upon expiry or termination of the service agreement for any reason, this DPA shall automatically terminate, subject to clauses that by their nature should survive termination (including data deletion, confidentiality, and audit rights).</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-heading font-semibold">22. Amendments</h2>
          <p className="text-muted-foreground leading-relaxed">DutyBoost reserves the right to amend this DPA to reflect changes in applicable data protection law, regulatory guidance, or operational requirements. Material changes will be communicated to the Controller with at least 30 days' notice via the platform or registered email. Continued use of the platform after the effective date of an amendment constitutes acceptance of the revised DPA.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-heading font-semibold">23. Governing Law and Jurisdiction</h2>
          <p className="text-muted-foreground leading-relaxed">This DPA is governed by the laws of the Netherlands. Any disputes arising from or in connection with this DPA shall be subject to the exclusive jurisdiction of the competent courts of Amsterdam, the Netherlands, unless the applicable data protection supervisory authority requires a different forum.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-heading font-semibold">24. Contact and Data Protection Officer</h2>
          <p className="text-muted-foreground leading-relaxed">For all data protection and DPA-related enquiries, please contact:</p>
          <ul className="list-none text-muted-foreground space-y-1 leading-relaxed">
            <li>📧 <a href="mailto:privacy@dutyboost.com" className="text-primary underline">privacy@dutyboost.com</a></li>
            <li>🏢 DutyBoost B.V., Amsterdam, the Netherlands</li>
          </ul>
          <p className="text-muted-foreground leading-relaxed mt-2">To exercise data subject rights or report a data protection concern, please email the above address with the subject line "Data Subject Request" or "Data Protection Concern" respectively.</p>
        </section>
      </div>
      <footer className="border-t border-border py-8 px-6 text-center text-sm text-muted-foreground">
        © 2026 DutyBoost. <Link to="/" className="text-primary underline">Back to Home</Link>
      </footer>
    </div>
  );
}