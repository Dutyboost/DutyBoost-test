import { Link } from "react-router-dom";
import { useState } from "react";
import DutyBoostLogo from "../components/DutyBoostLogo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Mail, ArrowRight, TrendingUp, Users, DollarSign, BarChart3, Check, Zap } from "lucide-react";

export default function AirportRetailerPresentationDark() {
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadPresentation = async () => {
    setIsDownloading(true);
    try {
      const { exportRetailerPptx } = await import("../utils/exportRetailerPptx");
      await exportRetailerPptx();
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-body">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur border-b border-slate-800 bg-slate-950/80 print:hidden">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <DutyBoostLogo height={150} inverted />
          <div className="flex items-center gap-2">
            <Link to="/travel-partner-presentation-dark">
              <Button size="sm" variant="outline" className="text-sm hidden sm:flex bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-800">Travel Partner Guide →</Button>
            </Link>
            <Link to="/">
              <Button size="sm" variant="ghost" className="text-sm text-slate-300">← Home</Button>
            </Link>
            <Button size="sm" variant="outline" className="gap-1.5 bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-800" onClick={downloadPresentation} disabled={isDownloading}>
              <Download className="w-3.5 h-3.5" /> {isDownloading ? 'Generating...' : 'Download PDF'}
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-16 space-y-20">

        {/* Hero Section */}
        <section className="space-y-6 text-center py-12">
          <Badge variant="secondary" className="bg-orange-900/30 text-orange-300 border-orange-700 mx-auto">Airport Retailer Partnership</Badge>
          <h1 className="text-5xl sm:text-6xl font-heading font-bold">
            Increase Revenue <span className="text-orange-400">40%+</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Turn browsers into buyers. Convert the 72% of travelers who browse but don't purchase at your airport store into paying customers with DutyBoost.
          </p>
        </section>

        {/* The Market Reality */}
        <section className="space-y-8">
          <div className="border-l-4 border-orange-500 pl-6">
            <h2 className="text-3xl font-heading font-bold">The Market Reality</h2>
            <p className="text-slate-400 mt-2">€61.2B opportunity. Massive traffic. Low conversion. Untapped potential.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            {[
              { icon: DollarSign, title: '€61.2B', desc: 'Global airport retail market (2024)' },
              { icon: Users, title: '2.4B', desc: 'International passengers annually' },
              { icon: TrendingUp, title: '72%', desc: 'Browse but don\'t buy at airports' },
              { icon: BarChart3, title: '€35–€80', desc: 'Average duty-free basket value' },
            ].map(({ icon: Icon, title, desc }, i) => (
              <div key={i} className="bg-gradient-to-br from-orange-900/20 to-slate-900 border border-orange-800/50 rounded-xl p-6 space-y-2 hover:border-orange-700 transition-colors">
                <Icon className="w-8 h-8 text-orange-400" />
                <p className="text-2xl font-heading font-bold text-orange-300">{title}</p>
                <p className="text-sm text-slate-400">{desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-orange-600/20 to-slate-900 border border-orange-500/30 rounded-xl p-6 text-center">
            <p className="font-semibold text-slate-100">The gap: 72% of travelers browse but don't convert. DutyBoost bridges that gap with incentive-driven purchasing.</p>
          </div>
        </section>

        {/* Revenue Impact */}
        <section className="space-y-8">
          <h2 className="text-3xl font-heading font-bold">Revenue Impact</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { metric: 'Conversion Lift', before: '28%', after: '40%+', lift: '+42%' },
              { metric: 'Avg Transaction', before: '€60', after: '€75+', lift: '+25%' },
              { metric: 'Daily Revenue (10k visitors)', before: '€168k', after: '€237k', lift: '+41%' },
            ].map(({ metric, before, after, lift }) => (
              <div key={metric} className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-6 space-y-4">
                <p className="text-slate-400 text-sm">{metric}</p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Current:</span>
                    <span className="text-2xl font-bold text-slate-200">{before}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">With DutyBoost:</span>
                    <span className="text-2xl font-bold text-orange-400">{after}</span>
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-700">
                  <p className="text-center font-semibold text-orange-300">{lift} uplift</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-green-900/20 to-slate-900 border border-green-800/50 rounded-xl p-6">
            <h3 className="font-semibold text-slate-100 mb-4">Example: Single Location Impact</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-slate-400">Daily increase:</span><span className="text-green-400 font-semibold">+€320</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Monthly increase:</span><span className="text-green-400 font-semibold">+€9,600</span></div>
              <div className="flex justify-between text-base pt-2 border-t border-green-700/30"><span className="text-slate-100 font-semibold">Annual revenue increase:</span><span className="text-green-400 font-bold">€116,800</span></div>
            </div>
          </div>
        </section>

        {/* Why It Works */}
        <section className="space-y-8">
          <h2 className="text-3xl font-heading font-bold">Why Travelers Convert</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'Real Incentive', desc: 'Tangible €5–€60 discount based on basket size removes price uncertainty.' },
              { title: 'Pre-Qualified Traffic', desc: 'Travelers already booked flights via partner → High intent to spend.' },
              { title: 'Time-Bound', desc: 'Valid only during trip reduces "I\'ll buy elsewhere" behavior.' },
              { title: 'Frictionless', desc: 'QR scan at checkout. Instant discount applied. No manual redemption.' },
              { title: 'Tier-Based Psychology', desc: 'Travelers feel rewarded based on spending level (VIP tier €60 discount).' },
              { title: 'Network Effect', desc: '100+ travel partners = continuous stream of pre-qualified travelers.' },
            ].map(({ title, desc }, i) => (
              <div key={i} className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-6 space-y-2 hover:border-orange-700 transition-colors">
                <p className="font-semibold text-slate-100">{title}</p>
                <p className="text-sm text-slate-400">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="space-y-8">
          <h2 className="text-3xl font-heading font-bold">How DutyBoost Works For You</h2>

          <div className="grid md:grid-cols-4 gap-4">
            {[
              { num: '1', title: 'Traveler Gets DutyCredit', desc: 'Via booking confirmation email from travel partner' },
              { num: '2', title: 'Arrives at Your Store', desc: 'Shows QR code or voucher code at checkout' },
              { num: '3', title: 'You Scan QR Code', desc: 'Instant verification + discount auto-applied' },
              { num: '4', title: 'Higher Sale & Profit', desc: 'Conversion increase + higher average transaction value' },
            ].map(({ num, title, desc }) => (
              <div key={num} className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-5 space-y-3 hover:border-orange-700 transition-colors">
                <div className="w-10 h-10 rounded-full bg-orange-600 flex items-center justify-center font-heading font-bold text-white">{num}</div>
                <p className="font-semibold text-slate-100">{title}</p>
                <p className="text-sm text-slate-400">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Discount Tiers */}
        <section className="space-y-8">
          <h2 className="text-3xl font-heading font-bold">DutyCredit Discount Structure</h2>

          <div className="overflow-hidden rounded-xl border border-slate-700">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-800/50 border-b border-slate-700">
                  <th className="px-6 py-4 text-left font-semibold text-slate-300">Tier Name</th>
                  <th className="px-6 py-4 text-left font-semibold text-slate-300">Min. Basket</th>
                  <th className="px-6 py-4 text-left font-semibold text-slate-300">Traveler Discount</th>
                  <th className="px-6 py-4 text-left font-semibold text-slate-300">Target Behavior</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { tier: 'Boarding', basket: '€70–€99', discount: '€5–€10', behavior: 'Entry-level. Converts price-conscious travelers.' },
                  { tier: 'Priority', basket: '€100–€199', discount: '€15–€30', behavior: 'Most popular. Strong conversion for mid-market.' },
                  { tier: 'Lounge', basket: '€200–€299', discount: '€35–€45', behavior: 'Premium travelers. Higher AOV.' },
                  { tier: 'VIP', basket: '€300+', discount: '€60', behavior: 'Top spenders. Maximizes retailer revenue.' },
                ].map(({ tier, basket, discount, behavior }, i) => (
                  <tr key={tier} className={`border-b border-slate-700 ${i % 2 === 0 ? 'bg-slate-900/20' : 'bg-slate-800/10'} hover:bg-slate-800/30 transition-colors`}>
                    <td className="px-6 py-4 font-semibold text-slate-100">{tier}</td>
                    <td className="px-6 py-4 text-slate-400">{basket}</td>
                    <td className="px-6 py-4 font-semibold text-orange-400">{discount}</td>
                    <td className="px-6 py-4 text-slate-400 text-sm">{behavior}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ROI & Pricing */}
        <section className="space-y-8">
          <h2 className="text-3xl font-heading font-bold">Cost & ROI</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-6 space-y-4">
              <h3 className="font-semibold text-slate-100">Implementation Cost</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">Setup fee:</span>
                  <span className="font-bold text-green-400">€0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Per-transaction fee:</span>
                  <span className="font-bold text-green-400">2.5% (capped €25)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Your cost on €100 basket:</span>
                  <span className="font-bold text-orange-400">€2.50</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-900/20 to-slate-900 border border-green-800/50 rounded-xl p-6 space-y-4">
              <h3 className="font-semibold text-slate-100">ROI (Example)</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">100 daily visitors</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">28 conversions (current)</span>
                  <span className="text-green-400">€980 daily</span>
                </div>
                <div className="flex justify-between text-sm border-t border-green-700/30 pt-2">
                  <span className="text-slate-100">With DutyBoost: 40+ conversions</span>
                  <span className="text-green-400 font-bold">€1,300+ daily</span>
                </div>
                <div className="text-center pt-2 font-semibold text-green-400">€116,800 additional annual revenue</div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Benefits */}
        <section className="space-y-8">
          <h2 className="text-3xl font-heading font-bold">Why Retailers Choose DutyBoost</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: Check, title: 'Zero Setup Cost', desc: 'No integration fees. Minimal tech burden.' },
              { icon: Check, title: 'Conversion Lift', desc: '+42% conversion rate increase demonstrated.' },
              { icon: Check, title: 'Higher AOV', desc: 'Incentivized spending drives +25% average transaction.' },
              { icon: Check, title: 'Pre-Qualified Traffic', desc: 'Travelers already committed to booking.' },
              { icon: Check, title: 'Real-Time Analytics', desc: 'Dashboard shows conversions, revenue, performance.' },
              { icon: Zap, title: 'Network Effect', desc: '100+ travel partners continuously feeding customers.' },
            ].map(({ icon: Icon, title, desc }, i) => (
              <div key={i} className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-6 space-y-3 hover:border-orange-700 transition-colors">
                <div className="flex items-start gap-3">
                  <Icon className="w-6 h-6 text-orange-400 mt-1 shrink-0" />
                  <div>
                    <p className="font-semibold text-slate-100">{title}</p>
                    <p className="text-sm text-slate-400 mt-1">{desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-orange-900/30 to-slate-900 border border-orange-800/50 rounded-xl p-8 space-y-6 text-center">
          <h3 className="text-2xl font-heading font-bold">Ready to increase your revenue?</h3>
          <p className="text-slate-300">Turn 72% of browsers into buyers. Proven 40%+ conversion uplift.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="mailto:hello@dutyboost.com">
              <Button className="gap-2 bg-orange-600 hover:bg-orange-700"><Mail className="w-4 h-4" /> hello@dutyboost.com</Button>
            </a>
            <Link to="/travel-partner-presentation-dark">
              <Button variant="outline" className="gap-2 bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-800">Travel Partner Guide <ArrowRight className="w-4 h-4" /></Button>
            </Link>
          </div>
        </section>

      </div>

      <footer className="border-t border-slate-800 py-8 px-6 print:hidden mt-20">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-400">
          <DutyBoostLogo height={120} inverted />
          <div className="flex items-center gap-6 text-center sm:text-right">
            <Link to="/" className="hover:text-slate-200 transition-colors">Home</Link>
            <a href="mailto:hello@dutyboost.com" className="hover:text-slate-200 transition-colors">hello@dutyboost.com</a>
            <span>© 2026 DutyBoost</span>
          </div>
        </div>
      </footer>
    </div>
  );
}