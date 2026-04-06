import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, QrCode, BarChart3, ShieldCheck, Globe2, TrendingUp, ArrowRight } from "lucide-react";
import DutyBoostLogo from "../components/DutyBoostLogo";

const featureIcons = [Zap, QrCode, BarChart3, ShieldCheck, Globe2, TrendingUp];

export default function RetailerShowcase() {
  const { t } = useTranslation();

  const flowSteps = [
    { num: '01', title: 'Traveler books a trip', desc: 'Booking details - price, number of travelers in your booking, destination are automatically taken from the confirmed booking details.' },
    { num: '02', title: 'DutyCredit earned', desc: 'A DutyCredit - a booking-earned incentive with a dynamic discount - is instantly calculated and issued as a unique QR code.' },
    { num: '03', title: 'Traveler shops', desc: 'Traveler presents QR at a participating airport retailer. Browse the store map at dutyboost.com/airport-map to find stores near your gate.' },
    { num: '04', title: 'All parties win', desc: 'Retailer logs the sale, discount applied, platform revenue tracked.' },
  ];

  const featureKeys = [
    { titleKey: 'features.f1_title', descKey: 'features.f1_desc' },
    { titleKey: 'features.f2_title', descKey: 'features.f2_desc' },
    { titleKey: 'features.f3_title', descKey: 'features.f3_desc' },
    { titleKey: 'features.f4_title', descKey: 'features.f4_desc' },
    { titleKey: 'features.f5_title', descKey: 'features.f5_desc' },
    { titleKey: 'features.f6_title', descKey: 'features.f6_desc' },
  ];

  return (
    <div className="min-h-screen bg-background font-body">
      {/* Nav */}
      <nav className="sticky top-0 z-50 backdrop-blur border-b border-border bg-background/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <DutyBoostLogo height={150} />
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden pt-10 pb-12 px-4 sm:px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-background to-background pointer-events-none" />
        <div className="absolute top-10 right-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold tracking-tight leading-tight">
            Boost Sales with <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">Traveler Rewards</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Attract more customers by accepting DutyCredits—rewards that travelers earn from their bookings. Convert passing travelers into repeat customers and drive incremental revenue.
          </p>
        </div>
      </section>

      {/* Flow Section */}
      <section className="py-10 sm:py-12 px-4 sm:px-6 bg-card/30 border-y border-border">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 space-y-3">
            <Badge variant="outline" className="text-xs tracking-widest uppercase px-4 py-1">How It Works</Badge>
            <h2 className="text-4xl font-heading font-bold">From Booking to Basket</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {flowSteps.map((item) => (
              <div key={item.num} className="bg-card rounded-2xl border border-border p-6 h-full">
                <p className="text-4xl font-heading font-bold text-primary/20 mb-3">{item.num}</p>
                <h4 className="font-heading font-semibold mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
            </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-10 sm:py-14 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 space-y-4">
            <Badge variant="outline" className="text-xs tracking-widest uppercase px-4 py-1">{t('features.badge')}</Badge>
            <h2 className="text-4xl font-heading font-bold">{t('features.title')}</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">{t('features.subtitle')}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {featureKeys.map((f, i) => {
              const Icon = featureIcons[i];
              return (
                <div key={f.titleKey} className="group p-6 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-md transition-all">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="font-heading font-semibold mb-2">{t(f.titleKey)}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t(f.descKey)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-10 sm:py-14 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-gradient-to-br from-orange-400 to-orange-600 rounded-3xl p-12 text-primary-foreground shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="relative space-y-6">
              <h2 className="text-4xl font-heading font-bold">Ready to Grow Your Retail Business?</h2>
              <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto">
                Join DutyBoost and start capturing incremental retail revenue from travelers with instant QR redemption and transparent revenue tracking.
              </p>
              <Link to="/retailer-portal">
                <Button size="lg" className="bg-white text-orange-600 hover:bg-white/90 gap-2 px-8 text-base mt-2">
                  Enter Retailer Portal <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}