import { Link } from "react-router-dom";
import DutyBoostLogo from "../components/DutyBoostLogo";

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-background font-body">
      <nav className="border-b border-border px-6 h-16 flex items-center">
        <Link to="/">
          <DutyBoostLogo height={36} />
        </Link>
      </nav>
      <div className="max-w-3xl mx-auto px-6 py-16 space-y-8">
        <div>
          <h1 className="text-4xl font-heading font-bold mb-2">Refund Policy</h1>
          <p className="text-muted-foreground text-sm">Last updated: March 2026</p>
        </div>

        <section className="space-y-3">
          <h2 className="text-xl font-heading font-semibold">1. Platform Fee Model</h2>
          <p className="text-muted-foreground leading-relaxed">DutyBoost operates on a performance-based commission model. There are no subscription fees, setup costs, or monthly charges. Commission is only applied when a Travel Yield is successfully redeemed at a participating retailer. Therefore, no upfront payments are collected from travel agencies or retailers.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-heading font-semibold">2. Retailer Commission Disputes</h2>
          <p className="text-muted-foreground leading-relaxed">If a retailer believes a commission charge was applied in error (e.g., a Travel Yield was redeemed fraudulently or the transaction was cancelled), they must raise a dispute within 14 days of the transaction date. Disputes can be submitted to <a href="mailto:billing@dutyboost.com" className="text-primary underline">billing@dutyboost.com</a> with transaction details and supporting evidence.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-heading font-semibold">3. Agency Revenue Share Disputes</h2>
          <p className="text-muted-foreground leading-relaxed">Travel agencies that believe their revenue share has been incorrectly calculated must contact us within 14 days of receiving their statement. We will investigate and, where an error is confirmed, issue a correction in the following billing cycle.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-heading font-semibold">4. Fraudulent or Invalid Redemptions</h2>
          <p className="text-muted-foreground leading-relaxed">If a Travel Yield was redeemed due to fraud, technical error, or platform malfunction, DutyBoost will investigate and may issue a full refund of any commission charged in relation to that specific transaction. Each case is reviewed individually.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-heading font-semibold">5. No Refunds on Valid Transactions</h2>
          <p className="text-muted-foreground leading-relaxed">Commission charges on valid, correctly processed redemptions are non-refundable. Once a Travel Yield has been redeemed and a transaction confirmed, the associated commission is final.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-heading font-semibold">6. Contact</h2>
          <p className="text-muted-foreground leading-relaxed">For billing or refund requests: <a href="mailto:billing@dutyboost.com" className="text-primary underline">billing@dutyboost.com</a></p>
        </section>
      </div>
      <footer className="border-t border-border py-8 px-6 text-center text-sm text-muted-foreground">
        © 2026 DutyBoost. <Link to="/" className="text-primary underline">Back to Home</Link>
      </footer>
    </div>
  );
}