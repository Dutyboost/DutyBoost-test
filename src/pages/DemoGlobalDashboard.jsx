import { useState } from "react";
import { Link } from "react-router-dom";
import { Globe, BarChart3 } from "lucide-react";
import DutyBoostLogo from "@/components/DutyBoostLogo";
import DemoBadge from "@/components/DemoBadge";
import ConversionRateSlider from "@/components/presentation/ConversionRateSlider";
import PresentationAggregation from "@/components/presentation/PresentationAggregation";
import { GLOBAL_COMPANY, GLOBAL_MARKET_STATS } from "@/data/globalAirportRetailMarket";

// Global Airport Retail Network dashboard.
//
// Mirrors the global presentation's "Global Aggregation" section so the
// "View Full Dashboard" CTA lands on a view that reflects the same global
// market figures (4,000 airports · ±45,000 stores · 9.6B departure moments)
// rather than the generic platform-finance demo data.
export default function DemoGlobalDashboard() {
  const [conversionRate, setConversionRate] = useState(3);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <nav className="border-b border-border px-6 h-16 flex items-center justify-between sticky top-0 bg-background/95 backdrop-blur z-10">
        <Link to="/"><DutyBoostLogo height={55} /></Link>
        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground bg-muted px-3 py-1 rounded-full">
          Global Network · Demo Mode
        </span>
      </nav>

      <div className="max-w-6xl mx-auto w-full px-4 py-8 space-y-8">
        <DemoBadge large />
        <div>
          <h1 className="text-2xl font-heading font-bold flex items-center gap-2">
            <Globe className="w-6 h-6 text-primary" />
            Global Airport Retail Network — Aggregated Dashboard
          </h1>
          <p className="text-muted-foreground text-sm mt-1 max-w-3xl">
            Aggregated DutyBoost impact across the full global commercial airport retail
            landscape. Figures are modeled from regional passenger aggregates calibrated to
            ACI 2024 traffic data. All values are illustrative demo projections.
          </p>
        </div>

        {/* Headline market stats */}
        <div className="grid md:grid-cols-3 gap-4">
          {GLOBAL_MARKET_STATS.map(({ val, label }, i) => (
            <div key={i} className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-6 text-center space-y-2">
              <p className="text-3xl sm:text-4xl font-heading font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{val}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{label}</p>
            </div>
          ))}
        </div>

        {/* Conversion rate + full aggregation */}
        <ConversionRateSlider value={conversionRate} onChange={setConversionRate} />
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <BarChart3 className="w-4 h-4" />
          <span>Aggregated projections for {GLOBAL_COMPANY.name}</span>
        </div>
        <PresentationAggregation company={GLOBAL_COMPANY} conversionRate={conversionRate} currency="EUR" />

        <p className="text-center text-xs text-muted-foreground pb-4">Demo projections only. No real transactions are represented.</p>
      </div>
    </div>
  );
}