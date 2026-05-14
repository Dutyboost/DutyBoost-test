import React, { useState } from 'react';
import { Download, ChevronRight, TrendingUp, Users, Zap, BarChart3, Target, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DutyBoostLogo from '@/components/DutyBoostLogo';
import PageFooter from '@/components/PageFooter';

export default function AirportRetailerPresentation() {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const { exportAirportRetailerPptx } = await import('@/utils/exportRetailerPptx');
      await exportAirportRetailerPptx();
    } catch (err) {
      console.error('Failed to download:', err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
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
          <h1 className="text-5xl font-heading font-bold text-foreground">DutyBoost for Airport Retailers</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Convert more browsers into buyers. Zero upfront cost. Only pay when a traveler spends.
          </p>
        </div>

        {/* The Market */}
        <section className="space-y-8">
          <div className="border-l-4 border-orange-600 pl-6">
            <h2 className="text-3xl font-heading font-bold mb-2">The Opportunity</h2>
            <p className="text-muted-foreground">Global duty-free and travel retail market is projected to reach <strong>$780B by 2027</strong>, growing 9.8% annually.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              { icon: TrendingUp, title: '€95.76B', desc: 'Global market size in 2025' },
              { icon: Users, title: '+53%', desc: 'Of airports upgrading retail areas by 2026' },
              { icon: Target, title: '47 deals', desc: 'New retail concessions in Asia-Pacific alone (2024)' },
            ].map(({ icon: Icon, title, desc }, i) => (
              <div key={i} className="bg-white border border-border rounded-xl p-6 space-y-2">
                <Icon className="w-8 h-8 text-orange-600" />
                <p className="text-2xl font-heading font-bold">{title}</p>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* The Challenge */}
        <section className="space-y-6">
          <h2 className="text-3xl font-heading font-bold">The Challenge You Face</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'Foot traffic isn\'t converting',
                desc: 'Thousands of travelers walk past your store daily. Most browse but don\'t buy. You\'re competing for fleeting attention with limited tools to influence purchase decisions.',
              },
              {
                title: 'Price-sensitive travelers',
                desc: 'In 2026, travelers are more value-conscious than ever. Rising airfares and economic uncertainty squeeze discretionary spending at airports.',
              },
              {
                title: 'High acquisition cost',
                desc: 'Traditional loyalty programs, signage, and promotions cost upfront with no guarantee of redemption.',
              },
              {
                title: 'No data on intent',
                desc: 'You don\'t know who\'s walking by, where they\'re from, or what they\'re willing to spend.',
              },
            ].map(({ title, desc }, i) => (
              <div key={i} className="bg-orange-50 border border-orange-200 rounded-xl p-5 space-y-2">
                <p className="font-semibold text-orange-900">{title}</p>
                <p className="text-sm text-orange-800">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* The Solution */}
        <section className="space-y-8">
          <div className="border-l-4 border-primary pl-6">
            <h2 className="text-3xl font-heading font-bold mb-2">How DutyBoost Solves This</h2>
            <p className="text-muted-foreground">A performance-based platform that sends pre-qualified, high-intent buyers directly to your store.</p>
          </div>

          <div className="space-y-4">
            {[
              {
                step: '1',
                title: 'Travel partner books a trip',
                desc: 'A travel agency customer buys a flight ticket through an integrated agency.',
              },
              {
                step: '2',
                title: 'Traveler receives DutyCredit',
                desc: 'They get a personalized voucher (up to €60 discount) in their booking confirmation email, valid at your airport.',
              },
              {
                step: '3',
                title: 'They scan at your checkout',
                desc: 'Traveler arrives at your store, motivated to spend. Simple QR scan applies their discount instantly.',
              },
              {
                step: '4',
                title: 'You earn, we take a small fee',
                desc: 'You keep incremental sales. DutyBoost takes only 2.5% platform fee (capped at €25 on baskets up to €1,000).',
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
          <h2 className="text-3xl font-heading font-bold">Your Advantages</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: Zap,
                title: 'Pre-qualified buyers',
                desc: 'Vouchers come with intent. Travelers arrive motivated to spend, not just browse.',
              },
              {
                icon: DollarSign,
                title: 'Pure performance model',
                desc: 'Zero upfront cost. You only pay a small fee when revenue is actually generated.',
              },
              {
                icon: BarChart3,
                title: 'Real-time analytics',
                desc: 'Track redemption rates, revenue attribution, and footfall trends from your dashboard.',
              },
              {
                icon: Target,
                title: 'No POS overhaul',
                desc: 'Simple QR scan integration. Works with existing checkouts. Takes minutes to activate.',
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

        {/* Revenue Example */}
        <section className="space-y-8">
          <h2 className="text-3xl font-heading font-bold">Revenue Example</h2>
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8 space-y-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-sm text-muted-foreground font-semibold mb-4">SCENARIO: 50 DutyCredit redemptions per week</p>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between"><span>Avg basket spend</span><span className="font-mono font-semibold">€250</span></div>
                  <div className="flex justify-between"><span>Avg discount applied</span><span className="font-mono font-semibold">€30</span></div>
                  <div className="border-t border-orange-200 pt-2 flex justify-between font-semibold"><span>Net sales per redemption</span><span className="font-mono">€220</span></div>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-semibold mb-4">MONTHLY IMPACT</p>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between"><span>Redemptions (50/week × 4)</span><span className="font-mono font-semibold">200</span></div>
                  <div className="flex justify-between"><span>Incremental revenue</span><span className="font-mono font-semibold">€44,000</span></div>
                  <div className="border-t border-orange-200 pt-2 flex justify-between font-semibold text-orange-900"><span>DutyBoost fee (2.5%, capped €25)</span><span className="font-mono">−€2,000</span></div>
                  <div className="bg-white rounded p-2 flex justify-between font-bold text-lg"><span>Your net gain</span><span className="font-mono text-orange-600">€42,000</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why DutyBoost */}
        <section className="space-y-8">
          <h2 className="text-3xl font-heading font-bold">Why DutyBoost Wins</h2>
          <div className="bg-white border-2 border-primary rounded-2xl p-8 space-y-6">
            {[
              { title: 'Built for airports', desc: 'We understand duty-free, travel retail, and terminal operations. Every feature is designed for your world.' },
              { title: 'Travel partner ecosystem', desc: 'Access to 100+ integrated travel agencies sending targeted travelers to your store every day.' },
              { title: 'Smart distribution', desc: 'Vouchers are matched to your airport, category, and store location. No waste, maximum intent.' },
              { title: 'Merchant-first pricing', desc: 'We profit only when you do. Platform fee is performance-based, not fixed.' },
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
        <section className="bg-gradient-to-r from-orange-600 to-orange-700 rounded-2xl p-12 text-center text-white space-y-6">
          <h2 className="text-3xl font-heading font-bold">Ready to Boost Your Retail?</h2>
          <p className="text-lg text-orange-100 max-w-2xl mx-auto">
            Connect with our team to discuss integration, see a live demo, and start turning voucher traffic into revenue.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="secondary" size="lg" asChild>
              <a href="mailto:rael@dutyboost.com">Contact Sales</a>
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10" asChild>
              <a href="/retailer-integration-guide">Integration Guide</a>
            </Button>
          </div>
        </section>
      </div>

      <PageFooter />
    </div>
  );
}