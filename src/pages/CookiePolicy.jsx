import { Link } from "react-router-dom";
import DutyBoostLogo from "../components/DutyBoostLogo";
import { Plane } from "lucide-react";

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-background font-body">
      <nav className="border-b border-border px-6 h-16 flex items-center">
        <Link to="/">
          <DutyBoostLogo height={36} />
        </Link>
      </nav>
      <div className="max-w-3xl mx-auto px-6 py-16 space-y-8">
        <div>
          <h1 className="text-4xl font-heading font-bold mb-2">Cookie Policy</h1>
          <p className="text-muted-foreground text-sm">Last updated: March 2026</p>
        </div>

        <section className="space-y-3">
          <h2 className="text-xl font-heading font-semibold">1. What Are Cookies?</h2>
          <p className="text-muted-foreground leading-relaxed">Cookies are small text files stored on your device when you visit a website. They help the website remember your preferences, maintain your session, and understand how you interact with the platform.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-heading font-semibold">2. Cookies We Use</h2>
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-xl p-4">
              <p className="font-semibold text-sm mb-1">Essential Cookies</p>
              <p className="text-muted-foreground text-sm">Required for the platform to function. These include session authentication tokens that keep you logged in and security cookies that prevent cross-site request forgery. These cannot be disabled.</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4">
              <p className="font-semibold text-sm mb-1">Functional Cookies</p>
              <p className="text-muted-foreground text-sm">Used to remember your preferences such as language settings or your last selected dashboard view. These improve your experience but are not strictly necessary.</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4">
              <p className="font-semibold text-sm mb-1">Analytics Cookies</p>
              <p className="text-muted-foreground text-sm">Help us understand how users navigate the platform so we can improve it. We collect anonymised data on page visits and feature usage. No personally identifiable information is stored in analytics cookies.</p>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-heading font-semibold">3. Third-Party Cookies</h2>
          <p className="text-muted-foreground leading-relaxed">We may use trusted third-party services (such as our hosting infrastructure) that set their own cookies. These third parties are bound by their own privacy policies and we do not control the cookies they set.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-heading font-semibold">4. Managing Cookies</h2>
          <p className="text-muted-foreground leading-relaxed">You can control and delete cookies through your browser settings. Disabling essential cookies will impair platform functionality and may prevent you from logging in. Most browsers allow you to:</p>
          <ul className="list-disc list-inside text-muted-foreground space-y-1 leading-relaxed">
            <li>View cookies currently stored on your device.</li>
            <li>Delete all or specific cookies.</li>
            <li>Block cookies from specific or all websites.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-heading font-semibold">5. Your Consent</h2>
          <p className="text-muted-foreground leading-relaxed">By continuing to use the DutyBoost platform, you consent to our use of cookies as described in this policy. You may withdraw consent at any time by adjusting your browser settings, though this may affect your experience.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-heading font-semibold">6. Contact</h2>
          <p className="text-muted-foreground leading-relaxed">Questions about our cookie usage: <a href="mailto:privacy@dutyboost.com" className="text-primary underline">privacy@dutyboost.com</a></p>
        </section>
      </div>
      <footer className="border-t border-border py-8 px-6 text-center text-sm text-muted-foreground">
        © 2026 DutyBoost. <Link to="/" className="text-primary underline">Back to Home</Link>
      </footer>
    </div>
  );
}