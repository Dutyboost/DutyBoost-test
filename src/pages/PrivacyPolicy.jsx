import { Link } from "react-router-dom";
import { Plane } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background font-body">
      <nav className="border-b border-border px-6 h-16 flex items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Plane className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-heading font-bold text-lg">DutyBoost</span>
        </Link>
      </nav>
      <div className="max-w-3xl mx-auto px-6 py-16 space-y-8">
        <div>
          <h1 className="text-4xl font-heading font-bold mb-2">Privacy Policy</h1>
          <p className="text-muted-foreground text-sm">Last updated: March 2026</p>
        </div>

        <section className="space-y-3">
          <h2 className="text-xl font-heading font-semibold">1. Introduction</h2>
          <p className="text-muted-foreground leading-relaxed">DutyBoost ("we", "our", "us") is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard the data you provide when using our platform, which connects travel agencies, airport retailers, and travelers through dynamic discount vouchers.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-heading font-semibold">2. Data We Collect</h2>
          <ul className="list-disc list-inside text-muted-foreground space-y-1 leading-relaxed">
            <li><strong className="text-foreground">Account data:</strong> name, email address, company name, and role (agency/retailer).</li>
            <li><strong className="text-foreground">Booking data:</strong> departure airport, travel date, number of travelers, ticket value.</li>
            <li><strong className="text-foreground">Transaction data:</strong> voucher codes redeemed, discount amounts, retailer identifiers.</li>
            <li><strong className="text-foreground">Usage data:</strong> page views, feature interactions, browser type, and IP address.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-heading font-semibold">3. How We Use Your Data</h2>
          <ul className="list-disc list-inside text-muted-foreground space-y-1 leading-relaxed">
            <li>To generate and validate discount vouchers for travelers.</li>
            <li>To process and track redemption transactions between agencies and retailers.</li>
            <li>To calculate and distribute revenue shares accurately.</li>
            <li>To send transactional emails (account invitations, voucher confirmations).</li>
            <li>To improve platform performance and user experience.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-heading font-semibold">4. Data Sharing</h2>
          <p className="text-muted-foreground leading-relaxed">We do not sell your personal data. We may share data with:</p>
          <ul className="list-disc list-inside text-muted-foreground space-y-1 leading-relaxed">
            <li>Participating airport retailers (limited to voucher validation data).</li>
            <li>Our infrastructure and hosting providers who process data on our behalf under strict data processing agreements.</li>
            <li>Regulatory authorities where required by law.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-heading font-semibold">5. Data Retention</h2>
          <p className="text-muted-foreground leading-relaxed">We retain personal data for as long as your account is active or as needed to provide services. Transaction records are retained for a minimum of 7 years for legal and financial compliance.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-heading font-semibold">6. Your Rights (GDPR)</h2>
          <p className="text-muted-foreground leading-relaxed">If you are based in the EU/EEA, you have the right to access, correct, delete, or export your data. You may also object to processing or withdraw consent at any time. Contact us at <a href="mailto:privacy@dutyboost.com" className="text-primary underline">privacy@dutyboost.com</a> to exercise these rights.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-heading font-semibold">7. Security</h2>
          <p className="text-muted-foreground leading-relaxed">We use industry-standard encryption (TLS) and secure infrastructure to protect your data. Voucher codes are cryptographically unique and single-use.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-heading font-semibold">8. Contact</h2>
          <p className="text-muted-foreground leading-relaxed">For privacy-related enquiries: <a href="mailto:privacy@dutyboost.com" className="text-primary underline">privacy@dutyboost.com</a></p>
        </section>
      </div>
      <footer className="border-t border-border py-8 px-6 text-center text-sm text-muted-foreground">
        © 2026 DutyBoost. <Link to="/" className="text-primary underline">Back to Home</Link>
      </footer>
    </div>
  );
}