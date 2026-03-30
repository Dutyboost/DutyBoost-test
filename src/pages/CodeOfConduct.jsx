import { Link } from "react-router-dom";
import DutyBoostLogo from "../components/DutyBoostLogo";
import { Plane } from "lucide-react";

export default function CodeOfConduct() {
  return (
    <div className="min-h-screen bg-background font-body">
      <nav className="border-b border-border px-6 h-16 flex items-center">
        <Link to="/">
          <DutyBoostLogo height={36} />
        </Link>
      </nav>
      <div className="max-w-3xl mx-auto px-6 py-16 space-y-8">
        <div>
          <h1 className="text-4xl font-heading font-bold mb-2">Code of Conduct</h1>
          <p className="text-muted-foreground text-sm">Last updated: March 2026</p>
        </div>

        <section className="space-y-3">
          <h2 className="text-xl font-heading font-semibold">1. Our Commitment</h2>
          <p className="text-muted-foreground leading-relaxed">DutyBoost is built on the principle that travel agencies, airport retailers, and travelers should all benefit fairly. We are committed to maintaining a trustworthy, transparent, and professional platform for all participants.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-heading font-semibold">2. Expected Behaviour — All Users</h2>
          <ul className="list-disc list-inside text-muted-foreground space-y-1 leading-relaxed">
            <li>Act honestly and in good faith when using the platform.</li>
            <li>Provide accurate data — bookings, transaction values, and store details must reflect reality.</li>
            <li>Treat all other platform participants with respect and professionalism.</li>
            <li>Report suspected fraud or abuse via <a href="mailto:trust@dutyboost.com" className="text-primary underline">trust@dutyboost.com</a>.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-heading font-semibold">3. Travel Agencies</h2>
          <ul className="list-disc list-inside text-muted-foreground space-y-1 leading-relaxed">
            <li>Only submit real, confirmed bookings to generate DutyCredits.</li>
            <li>Do not generate DutyCredits for fictitious or cancelled bookings.</li>
            <li>Do not share DutyCredit links with individuals unrelated to the associated booking.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-heading font-semibold">4. Airport Retailers</h2>
          <ul className="list-disc list-inside text-muted-foreground space-y-1 leading-relaxed">
            <li>Honour all valid, active DutyCredits presented by travelers at your location.</li>
            <li>Do not refuse DutyCredit redemptions without valid justification.</li>
            <li>Do not attempt to process false transactions to manipulate revenue figures.</li>
            <li>Keep your store information accurate and up to date on the platform.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-heading font-semibold">5. Prohibited Conduct</h2>
          <ul className="list-disc list-inside text-muted-foreground space-y-1 leading-relaxed">
            <li>Attempting to duplicate, forge, or reverse-engineer DutyCredit codes.</li>
            <li>Using the platform for money laundering or fraudulent financial activity.</li>
            <li>Attempting to access other users' accounts or data without authorisation.</li>
            <li>Interfering with the platform's technical infrastructure.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-heading font-semibold">6. Enforcement</h2>
          <p className="text-muted-foreground leading-relaxed">Violations of this Code may result in immediate account suspension, termination of access, and legal action where appropriate. DutyBoost reserves the right to investigate all reported violations and take action at its sole discretion.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-heading font-semibold">7. Contact</h2>
          <p className="text-muted-foreground leading-relaxed">Report misconduct: <a href="mailto:trust@dutyboost.com" className="text-primary underline">trust@dutyboost.com</a></p>
        </section>
      </div>
      <footer className="border-t border-border py-8 px-6 text-center text-sm text-muted-foreground">
        © 2026 DutyBoost. <Link to="/" className="text-primary underline">Back to Home</Link>
      </footer>
    </div>
  );
}