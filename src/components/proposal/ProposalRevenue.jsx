export default function ProposalRevenue() {
  return (
    <section>
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ca-fuchsia">Revenue model</p>
      <h2 className="font-heading text-2xl sm:text-3xl font-bold mt-2 mb-5">How the revenue model works</h2>
      <div className="rounded-2xl border border-border bg-white p-6 sm:p-8 space-y-3 text-sm shadow-sm">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Illustrative $100 purchase</p>
        <p className="text-muted-foreground">Original retail purchase <b className="text-foreground">$100.00</b></p>
        <p className="text-muted-foreground">Standard DutyCredit saving <span className="text-ca-fuchsia font-semibold">−$5.00</span></p>
        <div className="flex items-center justify-between rounded-xl bg-ca-purple/5 border border-ca-purple/15 px-4 py-3">
          <span className="font-heading font-bold text-foreground">Amount paid by traveller</span>
          <span className="font-heading text-2xl sm:text-3xl font-bold text-ca-purple">$95.00</span>
        </div>
        <p className="text-muted-foreground">DutyBoost platform fee (2.5% of $100) <b className="text-foreground">$2.50</b></p>
        <p className="text-muted-foreground">Caribbean Airlines share <b className="text-ca-fuchsia">$0.50</b></p>
        <p className="text-xs text-muted-foreground">
          20% of DutyBoost&rsquo;s $2.50 platform fee, when Caribbean Airlines issued the redeemed DutyCredit.
        </p>
        <p className="text-muted-foreground">Remaining platform fee <b className="text-foreground">$2.00</b></p>
      </div>
    </section>
  );
}