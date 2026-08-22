import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import DutyBoostLogo from "@/components/DutyBoostLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Building2, ArrowRight, TrendingUp, Wallet, CalendarDays } from "lucide-react";

const fmtEUR = (n) =>
  new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

export default function CorporatePartnerCalculator() {
  const [trips, setTrips] = useState(10000);
  const [basket, setBasket] = useState(60);
  const [rate, setRate] = useState(100);

  const perTx = useMemo(() => Math.min(basket * 0.005, 5), [basket]);
  const annual = useMemo(() => Math.round(trips * (rate / 100) * perTx), [trips, rate, perTx]);
  const monthly = Math.round(annual / 12);

  return (
    <div className="min-h-screen bg-background font-body">
      <nav className="sticky top-0 z-50 backdrop-blur border-b border-border bg-background/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          <Link to="/"><DutyBoostLogo height={42} /></Link>
          <Link to="/corporate-partner-showcase">
            <Button variant="outline" size="sm" className="gap-1.5 text-fuchsia-600 border-fuchsia-600 hover:text-fuchsia-700 hover:bg-fuchsia-50">
              <Building2 className="w-4 h-4 shrink-0" /> About the programme
            </Button>
          </Link>
        </div>
      </nav>

      <section className="pt-10 pb-6 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 bg-fuchsia-500/10 text-fuchsia-600 text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-widest">
            <Building2 className="w-3.5 h-3.5" /> Corporate Travel Partner
          </div>
          <h1 className="text-4xl sm:text-5xl font-heading font-bold tracking-tight">Cost-Recovery Calculator</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Estimate the annual commission your company earns on every validated airport redemption by your travelling employees — 0.5% of each basket, capped at €5 per transaction, paid monthly.
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-6 pb-14">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-5 gap-6">
          {/* Inputs */}
          <div className="lg:col-span-3 bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-7">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Annual business trips</label>
                <Input
                  type="number"
                  min={0}
                  value={trips}
                  onChange={(e) => setTrips(Math.max(0, Number(e.target.value) || 0))}
                  className="w-32 text-right"
                />
              </div>
              <Slider value={[trips]} min={0} max={200000} step={500} onValueChange={(v) => setTrips(v[0])} />
              <p className="text-xs text-muted-foreground">Total scheduled business trips across all travelling employees per year.</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Average airport basket (€)</label>
                <Input
                  type="number"
                  min={0}
                  value={basket}
                  onChange={(e) => setBasket(Math.max(0, Number(e.target.value) || 0))}
                  className="w-32 text-right"
                />
              </div>
              <Slider value={[basket]} min={20} max={500} step={5} onValueChange={(v) => setBasket(v[0])} />
              <p className="text-xs text-muted-foreground">Blended average spend per redemption at participating airport retailers.</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Redemption rate</label>
                <span className="text-sm font-semibold text-fuchsia-600">{rate}%</span>
              </div>
              <Slider value={[rate]} min={25} max={100} step={5} onValueChange={(v) => setRate(v[0])} />
              <p className="text-xs text-muted-foreground">Share of issued DutyCredits actually redeemed. Business travellers are scheduled and predictable, so a high rate is realistic.</p>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-gradient-to-br from-fuchsia-600 to-primary rounded-2xl p-7 text-white shadow-lg space-y-2">
              <div className="flex items-center gap-2 text-white/80 text-sm font-medium">
                <Wallet className="w-4 h-4" /> Estimated annual commission
              </div>
              <div className="text-4xl sm:text-5xl font-heading font-bold">{fmtEUR(annual)}</div>
              <p className="text-white/80 text-sm">Credited against your T&E costs, paid monthly by DutyBoost.</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-card border border-border rounded-2xl p-5 space-y-1">
                <CalendarDays className="w-4 h-4 text-muted-foreground" />
                <div className="text-2xl font-heading font-bold">{fmtEUR(monthly)}</div>
                <p className="text-xs text-muted-foreground">Per month</p>
              </div>
              <div className="bg-card border border-border rounded-2xl p-5 space-y-1">
                <TrendingUp className="w-4 h-4 text-muted-foreground" />
                <div className="text-2xl font-heading font-bold">{fmtEUR(perTx)}</div>
                <p className="text-xs text-muted-foreground">Per redemption (capped €5)</p>
              </div>
            </div>

            <div className="bg-muted/40 border border-border rounded-2xl p-5 space-y-2 text-sm">
              <p className="font-semibold text-foreground">How this is calculated</p>
              <ul className="space-y-1.5 text-muted-foreground">
                <li>• Commission = 0.5% of basket, capped at €5 per transaction</li>
                <li>• Annual commission = trips × redemption rate × commission per redemption</li>
                <li>• You pay nothing — the discount is retailer-funded, the commission is paid by DutyBoost out of its 2.5% fee</li>
              </ul>
            </div>

            <Link to="/corporate-partner-showcase">
              <Button className="w-full gap-2" size="lg">
                Request more information <ArrowRight className="w-4 h-4 shrink-0" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <DutyBoostLogo height={42} />
          <p>© {new Date().getFullYear()} DutyBoost B.V. — Estimates only.</p>
        </div>
      </footer>
    </div>
  );
}