import { Mail, Phone } from "lucide-react";
import { DUTYBOOST_CONTACT } from "@/lib/dutyBoostContact";

/**
 * The DutyBoost contact a system integrator can reach for the technical POS
 * integration. Sits on the retailer confirmation page, and the same details are
 * printed on the downloadable confirmation document.
 */
export default function DutyBoostContactCard({ heading, intro }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
      <h3 className="font-heading font-semibold">{heading}</h3>
      <p className="text-sm text-muted-foreground">{intro}</p>
      <div className="grid sm:grid-cols-2 gap-4">
        <a
          href={`mailto:${DUTYBOOST_CONTACT.email}`}
          className="flex items-center gap-3 rounded-xl border border-border p-3 hover:border-primary transition-colors"
        >
          <Mail className="w-4 h-4 text-primary shrink-0" />
          <span className="text-sm font-medium">{DUTYBOOST_CONTACT.email}</span>
        </a>
        <a
          href={`tel:${DUTYBOOST_CONTACT.phoneHref}`}
          className="flex items-center gap-3 rounded-xl border border-border p-3 hover:border-primary transition-colors"
        >
          <Phone className="w-4 h-4 text-primary shrink-0" />
          <span className="text-sm font-medium">{DUTYBOOST_CONTACT.phone}</span>
        </a>
      </div>
    </div>
  );
}