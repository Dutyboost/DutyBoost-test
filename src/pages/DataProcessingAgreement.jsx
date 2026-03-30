import { Link } from "react-router-dom";
import DutyBoostLogo from "../components/DutyBoostLogo";

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
          <p className="text-muted-foreground text-sm">Last updated: March 2026</p>
        </div>

        <section className="space-y-3">
          <h2 className="text-xl font-heading font-semibold">1. Scope and Purpose</h2>
          <p className="text-muted-foreground leading-relaxed">This Data Processing Agreement ("DPA") governs the processing of personal data by DutyBoost on behalf of business users (data controllers) in connection with the DutyBoost platform. This DPA forms part of the agreement between DutyBoost and the data controller and is subject to the General Data Protection Regulation (GDPR).</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-heading font-semibold">2. Roles and Responsibilities</h2>
          <p className="text-muted-foreground leading-relaxed">Where DutyBoost processes personal data on behalf of a business user, the business user acts as the data controller and DutyBoost acts as the data processor under GDPR Article 28. DutyBoost will process personal data only on documented instructions from the controller, unless required to do so by applicable law.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-heading font-semibold">3. Processor Obligations</h2>
          <p className="text-muted-foreground leading-relaxed">DutyBoost, as data processor, commits to the following obligations:</p>
          <ul className="list-disc list-inside text-muted-foreground space-y-1 leading-relaxed">
            <li>Process personal data solely on the documented instructions of the controller.</li>
            <li>Ensure that all personnel authorised to process personal data are bound by confidentiality.</li>
            <li>Implement appropriate technical and organisational measures to ensure a level of security appropriate to the risk.</li>
            <li>Not engage sub-processors without prior written authorisation from the controller, and only under binding data protection obligations.</li>
            <li>Assist the controller in fulfilling its obligations to respond to data subject rights requests (access, rectification, erasure, portability).</li>
            <li>Assist the controller in ensuring compliance with security, breach notification, and impact assessment obligations.</li>
            <li>Delete or return all personal data upon termination of services, and delete existing copies unless EU or Member State law requires storage.</li>
            <li>Make available all information necessary to demonstrate compliance with GDPR Article 28 obligations.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-heading font-semibold">4. Categories of Personal Data Processed</h2>
          <p className="text-muted-foreground leading-relaxed">DutyBoost may process the following categories of personal data on behalf of controllers:</p>
          <ul className="list-disc list-inside text-muted-foreground space-y-1 leading-relaxed">
            <li>Contact information: name, email address, business details of agency and retailer users.</li>
            <li>Booking data: number of travelers, travel dates, departure airports, and ticket prices submitted by agencies.</li>
            <li>Transaction data: voucher redemption records associated with retail locations.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-heading font-semibold">5. Data Transfers</h2>
          <p className="text-muted-foreground leading-relaxed">DutyBoost will not transfer personal data to countries outside the European Economic Area (EEA) unless appropriate safeguards are in place, such as Standard Contractual Clauses approved by the European Commission.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-heading font-semibold">6. Security Measures</h2>
          <p className="text-muted-foreground leading-relaxed">DutyBoost implements appropriate technical and organisational measures including encryption in transit and at rest, access controls, role-based permissions, and regular security assessments to protect the personal data it processes.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-heading font-semibold">7. Data Breach Notification</h2>
          <p className="text-muted-foreground leading-relaxed">In the event of a personal data breach, DutyBoost will notify the relevant data controller without undue delay, and where feasible within 72 hours, providing sufficient information to enable the controller to meet its own notification obligations under GDPR Article 33.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-heading font-semibold">8. Governing Law</h2>
          <p className="text-muted-foreground leading-relaxed">This DPA is governed by the laws of the Netherlands. Any disputes arising from this DPA shall be subject to the exclusive jurisdiction of the courts of Amsterdam.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-heading font-semibold">9. Contact</h2>
          <p className="text-muted-foreground leading-relaxed">Data protection enquiries: <a href="mailto:privacy@dutyboost.com" className="text-primary underline">privacy@dutyboost.com</a></p>
        </section>
      </div>
      <footer className="border-t border-border py-8 px-6 text-center text-sm text-muted-foreground">
        © 2026 DutyBoost. <Link to="/" className="text-primary underline">Back to Home</Link>
      </footer>
    </div>
  );
}