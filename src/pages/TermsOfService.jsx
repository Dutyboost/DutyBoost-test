import { Link } from "react-router-dom";
import DutyBoostLogo from "../components/DutyBoostLogo";
import { Plane } from "lucide-react";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background font-body">
      <nav className="border-b border-border px-6 h-16 flex items-center">
        <Link to="/">
          <DutyBoostLogo height={36} />
        </Link>
      </nav>
      <div className="max-w-3xl mx-auto px-6 py-16 space-y-8">
        <div>
          <h1 className="text-4xl font-heading font-bold mb-2">Terms of Service & Data Processing Agreement</h1>
          <p className="text-muted-foreground text-sm">Last updated: March 2026</p>
        </div>

        <section className="space-y-3">
          <h2 className="text-xl font-heading font-semibold">1. Acceptance of Terms</h2>
          <p className="text-muted-foreground leading-relaxed">By accessing or using DutyBoost ("Platform"), you agree to be bound by these Terms of Service. If you do not agree, you may not use the Platform. These terms apply to travel agencies, airport retailers, and any other registered users.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-heading font-semibold">2. Description of Service</h2>
          <p className="text-muted-foreground leading-relaxed">DutyBoost is a Travel Retail Conversion Platform that enables travel agencies to generate dynamic discount vouchers for travelers, and airport retailers to accept and redeem those vouchers at the point of sale. We facilitate the connection between all parties and track revenue share accordingly.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-heading font-semibold">3. User Obligations</h2>
          <ul className="list-disc list-inside text-muted-foreground space-y-1 leading-relaxed">
            <li>You must provide accurate and complete registration information.</li>
            <li>You are responsible for maintaining the security of your account credentials.</li>
            <li>Travel agencies must only submit valid, confirmed bookings.</li>
            <li>Retailers must honour all valid, non-expired, non-redeemed vouchers presented at their location.</li>
            <li>You must not attempt to fraudulently redeem, duplicate, or manipulate voucher codes.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-heading font-semibold">4. Commission & Revenue Share</h2>
          <p className="text-muted-foreground leading-relaxed">Airport retailers agree to a 5% platform commission on the gross transaction value of any sale made through a redeemed DutyBoost voucher. Travel agencies earn a 20% margin on every voucher redeemed by their travelers. No fees are charged unless a voucher is successfully redeemed.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-heading font-semibold">5. Intellectual Property</h2>
          <p className="text-muted-foreground leading-relaxed">All platform content, branding, software, and data structures are the exclusive property of DutyBoost. You are granted a limited, non-exclusive, non-transferable licence to access and use the Platform for its intended purpose.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-heading font-semibold">6. Limitation of Liability</h2>
          <p className="text-muted-foreground leading-relaxed">DutyBoost is not liable for any indirect, incidental, or consequential damages arising from use of the Platform. Our total liability to any user shall not exceed the fees paid to us in the 3 months preceding the claim.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-heading font-semibold">7. Data Processing Agreement (DPA)</h2>
          <p className="text-muted-foreground leading-relaxed">Where DutyBoost processes personal data on behalf of a business user (data controller), we act as a data processor under GDPR Article 28. We commit to:</p>
          <ul className="list-disc list-inside text-muted-foreground space-y-1 leading-relaxed">
            <li>Processing data only on documented instructions from the controller.</li>
            <li>Ensuring confidentiality of all processed data.</li>
            <li>Implementing appropriate technical and organisational security measures.</li>
            <li>Assisting the controller in fulfilling data subject rights requests.</li>
            <li>Deleting or returning all personal data upon termination of services.</li>
            <li>Providing all information necessary to demonstrate compliance with GDPR obligations.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-heading font-semibold">8. Governing Law</h2>
          <p className="text-muted-foreground leading-relaxed">These Terms are governed by the laws of the Netherlands. Any disputes shall be subject to the exclusive jurisdiction of the courts of Amsterdam.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-heading font-semibold">9. Contact</h2>
          <p className="text-muted-foreground leading-relaxed">Legal enquiries: <a href="mailto:legal@dutyboost.com" className="text-primary underline">legal@dutyboost.com</a></p>
        </section>
      </div>
      <footer className="border-t border-border py-8 px-6 text-center text-sm text-muted-foreground">
        © 2026 DutyBoost. <Link to="/" className="text-primary underline">Back to Home</Link>
      </footer>
    </div>
  );
}