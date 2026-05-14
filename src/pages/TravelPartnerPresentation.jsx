import React, { useState } from 'react';
import { Download, ChevronRight, TrendingUp, Zap, BarChart3, Users, Rocket, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DutyBoostLogo from '@/components/DutyBoostLogo';
import PageFooter from '@/components/PageFooter';

export default function TravelPartnerPresentation() {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const { exportTravelPartnerPptx } = await import('@/utils/exportTravelPartnerPptx');
      await exportTravelPartnerPptx();
    } catch (err) {
      console.error('Failed to download:', err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <DutyBoostLogo height={80} />
          <Button onClick={handleDownload} disabled={downloading} className="gap-2">
            <Download className="w-4 h-4" />
            {downloading ? 'Downloading...' : 'Download Presentation'}
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-24">
        {/* Title Section */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-heading font-bold text-foreground">Partner with DutyBoost</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Add value to your customers. Earn commission.
          </p>
          <p className="text-base text-muted-foreground max-w-3xl mx-auto">
            A white-label loyalty program that delivers exclusive airport retail discounts to your travelers and generates recurring commission.
          </p>
        </div>

        {/* The Opportunity */}
        <section className="space-y-8">
          <div className="border-l-4 border-primary pl-6">
            <h2 className="text-3xl font-heading font-bold mb-2">The Opportunity</h2>
            <p className="text-muted-foreground">72% of travelers browse but don't buy at airports. A massive opportunity.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            {[
              { icon: DollarSign, title: '€40B+', desc: 'Global airport retail opportunity' },
              { icon: Users, title: '2.4B', desc: 'International air passengers/year' },
              { icon: TrendingUp, title: '72%', desc: 'Browse but don\'t buy' },
              { icon: BarChart3, title: '€35–€80', desc: 'Average airport duty-free basket' },
            ].map(({ icon: Icon, title, desc }, i) => (
              <div key={i} className="bg-blue-50 border border-blue-200 rounded-xl p-6 space-y-2">
                <Icon className="w-8 h-8 text-primary" />
                <p className="text-2xl font-heading font-bold text-primary">{title}</p>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-primary text-primary-foreground rounded-xl p-6 text-center">
            <p className="font-semibold">DutyBoost helps you convert the 72% who browse — by giving your customers a reason to spend.</p>
          </div>
        </section>

        {/* Your Value Proposition */}
        <section className="space-y-8">
          <h2 className="text-3xl font-heading font-bold">Your Value Proposition</h2>
          <p className="text-center text-muted-foreground max-w-3xl mx-auto">DutyCredit: A loyalty tool that drives spending</p>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: '📱', title: '✓ Differentiate Your Platform', desc: 'Exclusive benefit your customers won\'t find elsewhere. Pure competitive advantage.' },
              { icon: '❤️', title: '✓ Improve Customer Loyalty', desc: 'Travelers remember the extra value you provided. Higher lifetime value, lower churn.' },
              { icon: '⭐', title: '✓ Increase NPS & Satisfaction', desc: 'Give customers what they want: real savings at moments they care about (airports).' },
              { icon: '⚡', title: '✓ Zero Operational Burden', desc: 'We handle retailer relationships, fraud, payouts, customer support. You just send emails.' },
              { icon: '💰', title: '✓ Generate Recurring Revenue', desc: 'Passive commission on every booking. No customer service overhead.' },
              { icon: '📊', title: '✓ Build Data & Insights', desc: 'Understand your traveler behavior at airports. Spending patterns. Channel performance.' },
            ].map(({ icon, title, desc }, i) => (
              <div key={i} className={`${i % 2 === 0 ? 'bg-blue-50 border-blue-200' : 'bg-green-50 border-green-200'} border rounded-xl p-5 space-y-2`}>
                <p className="text-lg mb-2">{icon}</p>
                <p className="font-semibold">{title}</p>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* The Solution */}
        <section className="space-y-8">
          <div className="border-l-4 border-primary pl-6">
            <h2 className="text-3xl font-heading font-bold mb-2">DutyBoost: A New Revenue Stream</h2>
            <p className="text-muted-foreground">Earn commission on airport spending without extra work. It's already built into your booking flow.</p>
          </div>

          <div className="space-y-4">
            {[
              {
                step: '1',
                title: 'Integrated in your system',
                desc: 'One API call when a booking is confirmed. DutyBoost handles the rest.',
              },
              {
                step: '2',
                title: 'Automatic voucher generation',
                desc: 'Based on booking value, travel type, and airport, we create a personalized DutyCredit voucher.',
              },
              {
                step: '3',
                title: 'Traveler receives discount',
                desc: 'They get an email with their unique QR code voucher before departure.',
              },
              {
                step: '4',
                title: 'You earn commission',
                desc: 'When they redeem at a store, you earn 0.5% of net sales. Paid monthly to your bank account.',
              },
            ].map(({ step, title, desc }, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">
                  {step}
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{title}</p>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* The Benefits */}
        <section className="space-y-8">
          <h2 className="text-3xl font-heading font-bold">Why Travel Partners Love DutyBoost</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: Rocket,
                title: 'Zero extra work',
                desc: 'One API integration and you\'re live. No manual processes, no new tools to learn.',
              },
              {
                icon: DollarSign,
                title: 'Real commission income',
                desc: '0.5% of every redemption. Automated payouts monthly to your bank.',
              },
              {
                icon: BarChart3,
                title: 'Full visibility',
                desc: 'Dashboard shows voucher performance, redemption rates, and commission earnings in real time.',
              },
              {
                icon: Users,
                title: 'Customer differentiation',
                desc: 'Give travelers a compelling perk. "Book with us and earn airport discounts." Boosts loyalty.',
              },
              {
                icon: Zap,
                title: 'No risk',
                desc: 'DutyBoost handles everything: voucher creation, QR codes, redemption validation, payout.',
              },
              {
                icon: TrendingUp,
                title: 'Scales with your bookings',
                desc: 'More bookings = more vouchers = more commission. Passive income growth.',
              },
            ].map(({ icon: Icon, title, desc }, i) => (
              <div key={i} className="border border-border rounded-xl p-6 space-y-3 hover:shadow-lg transition-shadow">
                <Icon className="w-8 h-8 text-primary" />
                <h3 className="font-semibold">{title}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Commission Example */}
        <section className="space-y-8">
          <h2 className="text-3xl font-heading font-bold">Commission Breakdown</h2>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 space-y-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-sm text-muted-foreground font-semibold mb-4">EXAMPLE TRANSACTION</p>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between"><span>Traveler basket spend</span><span className="font-mono font-semibold">€300</span></div>
                  <div className="flex justify-between"><span>DutyCredit discount</span><span className="font-mono font-semibold">−€60</span></div>
                  <div className="border-t border-blue-200 pt-2 flex justify-between font-semibold"><span>Net sales value</span><span className="font-mono">€240</span></div>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-semibold mb-4">YOUR EARNINGS</p>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between"><span>Your commission (0.5%)</span><span className="font-mono font-semibold">€1.20</span></div>
                  <div className="flex justify-between"><span>DutyBoost fee (2.5%)</span><span className="font-mono font-semibold">€6.00</span></div>
                  <div className="border-t border-blue-200 pt-2 flex justify-between font-semibold"><span>Platform net</span><span className="font-mono">€4.80</span></div>
                  <p className="text-xs text-muted-foreground mt-3">Fee capped at €25 on baskets up to €1,000. All revenue above €1,000 is 100% to retailer.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border-2 border-primary rounded-xl p-6 space-y-4">
            <p className="font-semibold text-lg">MONTHLY SCENARIO: 500 bookings (avg €800)</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Redemption rate</p>
                <p className="text-2xl font-bold">35%</p>
                <p className="text-xs text-muted-foreground">175 vouchers redeemed</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Avg net sales</p>
                <p className="text-2xl font-bold">€220</p>
                <p className="text-xs text-muted-foreground">per redemption</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Total commission</p>
                <p className="text-2xl font-bold text-primary">€385</p>
                <p className="text-xs text-muted-foreground">0.5% × €77,000</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Annual bonus</p>
                <p className="text-2xl font-bold text-primary">€4,620</p>
                <p className="text-xs text-muted-foreground">passive income</p>
              </div>
            </div>
          </div>
        </section>

        {/* Integration */}
        <section className="space-y-8">
          <h2 className="text-3xl font-heading font-bold">Simple Integration</h2>
          <div className="bg-white border border-border rounded-xl p-8 space-y-4">
            <p className="text-muted-foreground mb-4">One API call at booking confirmation:</p>
            <div className="bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-xs overflow-x-auto space-y-2">
              <div><span className="text-blue-400">POST</span> /api/vouchers/generate</div>
              <div className="text-slate-400">
                {`{
  "booking_id": "BK12345",
  "traveler_email": "john@example.com",
  "total_ticket_price": 800,
  "number_of_travelers": 2,
  "departure_airport": "AMS"
}`}
              </div>
            </div>
            <p className="text-sm text-muted-foreground">That's it. DutyBoost creates the voucher, sends the email, and tracks redemptions.</p>
          </div>
        </section>

        {/* Why DutyBoost */}
        <section className="space-y-8">
          <h2 className="text-3xl font-heading font-bold">Why Choose DutyBoost</h2>
          <div className="bg-white border-2 border-primary rounded-2xl p-8 space-y-6">
            {[
              { title: 'For travel partners, by travel partners', desc: 'Built by people who understand booking systems, commission models, and traveler behavior.' },
              { title: '100+ airport retailers', desc: 'Network already connected. Your vouchers have guaranteed redemption partners at major hubs.' },
              { title: 'Merchant-first pricing', desc: 'We don\'t take margin from your commission. 0.5% goes directly to you.' },
              { title: 'Real-time dashboard', desc: 'See every voucher created, redeemed, and track your exact commission earnings.' },
              { title: 'Scalable model', desc: 'Works for boutique agencies and large OTAs alike. Zero fixed costs.' },
            ].map(({ title, desc }, i) => (
              <div key={i} className="flex gap-4">
                <ChevronRight className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">{title}</p>
                  <p className="text-sm text-muted-foreground mt-1">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-12 text-center text-white space-y-6">
          <h2 className="text-3xl font-heading font-bold">Turn Your Bookings Into Revenue</h2>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Integrate DutyBoost today and start earning commission on airport spending tomorrow. No setup costs. No risk.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="secondary" size="lg" asChild>
              <a href="mailto:rael@dutyboost.com">Schedule Demo</a>
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10" asChild>
              <a href="/travel-partner-integration-guide">Integration Guide</a>
            </Button>
          </div>
        </section>
      </div>

      <PageFooter />
    </div>
  );
}