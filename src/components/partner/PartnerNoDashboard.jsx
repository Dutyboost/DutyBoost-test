import { Info } from "lucide-react";

/**
 * Airport and wholesale partners sit outside the platform fee sharing
 * programme, so their account carries no performance dashboard.
 */
export default function PartnerNoDashboard({ partnerType = "Partner" }) {
  return (
    <div className="max-w-2xl space-y-4 py-6">
      <div className="bg-card border border-border rounded-xl p-6 space-y-3">
        <h1 className="text-2xl font-heading font-bold tracking-tight">{partnerType} account</h1>
        <p className="text-muted-foreground">
          Airport and wholesale partners are not part of the DutyBoost platform fee sharing programme, so this account
          does not include a performance dashboard.
        </p>
      </div>
      <div className="flex items-start gap-3 bg-primary/5 border border-primary/20 rounded-xl p-4">
        <Info className="w-4 h-4 text-primary mt-0.5 shrink-0" />
        <p className="text-sm text-muted-foreground">
          Anything you need on programme performance is shared directly by your DutyBoost partner manager.
        </p>
      </div>
    </div>
  );
}