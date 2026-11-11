export default function ProposalRevenue() {
  return (
    <section>
      <h2 className="font-heading text-2xl font-bold mb-4">How the revenue model works</h2>
      <div className="rounded-2xl border border-accent/60 bg-card p-6 space-y-3 text-sm">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">Illustrative $100 purchase</p>
        <p>Original retail purchase <b>$100.00</b></p>
        <p>Standard DutyCredit saving <span className="text-chart-3">−$5 to −$10</span></p>
        <div className="flex items-center justify-between rounded-lg bg-chart-3/10 px-4 py-3">
          <span className="font-heading font-bold">Amount paid by traveller</span>
          <span className="font-heading text-3xl font-bold text-chart-3">$90–$95</span>
        </div>
        <p>DutyBoost platform fee (2.5% of $100) <b>$2.50</b></p>
        <p>Caribbean Airlines share <b className="text-chart-3">$0.50</b></p>
        <p className="text-xs text-muted-foreground">
          20% of DutyBoost's $2.50 platform fee, when Caribbean Airlines issued the redeemed DutyCredit.
        </p>
        <p>Remaining platform fee <b>$2.00</b></p>
      </div>
    </section>
  );
}