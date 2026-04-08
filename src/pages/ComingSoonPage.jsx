import DutyBoostLogo from "../components/DutyBoostLogo";

export default function ComingSoonPage() {
  return (
    <div className="min-h-screen bg-background font-body flex flex-col">
      {/* Nav */}
      <nav className="sticky top-0 z-50 backdrop-blur border-b border-border bg-background/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center">
          <DutyBoostLogo height={150} />
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden flex-1 flex items-center justify-center px-4 sm:px-6 py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5 pointer-events-none" />
        <div className="absolute top-10 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-3xl mx-auto text-center space-y-8">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-heading font-bold tracking-tight leading-tight">
            Something{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              exciting
            </span>
            {" "}is coming
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We're putting the finishing touches on <strong>DutyBoost</strong> — the Travel Retail Conversion Layer connecting travel agencies, airport retailers, and leisure travelers like never before.
          </p>

          <div className="bg-card border border-border rounded-2xl p-8 shadow-sm max-w-md mx-auto space-y-3">
            <p className="font-heading font-semibold text-lg text-foreground">Want to be the first to know?</p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Are you a travel agency or airport retailer interested in partnering with us? We'd love to hear from you.
            </p>
            <p className="text-sm font-medium">
              Reach out at{" "}
              <a href="mailto:hello@dutyboost.com" className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors">
                hello@dutyboost.com
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 sm:py-10 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2 pointer-events-none select-none">
              <DutyBoostLogo height={150} />
              <span>The Travel Retail Conversion Layer</span>
            </div>
            <p>© {new Date().getFullYear()} DutyBoost. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}