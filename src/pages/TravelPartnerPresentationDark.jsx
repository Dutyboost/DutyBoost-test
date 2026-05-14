import { Link } from "react-router-dom";
import { useState } from "react";
import DutyBoostLogo from "../components/DutyBoostLogo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Mail, ArrowRight, TrendingUp, Users, DollarSign, BarChart3, Check } from "lucide-react";

export default function TravelPartnerPresentationDark() {
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadPresentation = async () => {
    setIsDownloading(true);
    try {
      const { exportTravelPartnerPptx } = await import("../utils/exportTravelPartnerPptx");
      await exportTravelPartnerPptx();
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
            <Link to="/retailer-presentation">
              <Button size="sm" variant="outline" className="text-sm hidden sm:flex bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-800">Retailer Guide →</Button>
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
          <Badge variant="secondary" className="bg-blue-900/30 text-blue-300 border-blue-700 mx-auto">Travel Partner Program</Badge>
          <h1 className="text-5xl sm:text-6xl font-heading font-bold">
            Partner with <span className="text-blue-400">DutyBoost</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Add value to your customers. Earn commission. A white-label loyalty program that delivers exclusive airport retail discounts and generates recurring revenue.
          </p>
        </section>

        {/* The Opportunity */}
        <section className="space-y-8">
          <div className="border-l-4 border-blue-500 pl-6">
            <h2 className="text-3xl font-heading font-bold">The Market Opportunity</h2>
            <p className="text-slate-400 mt-2">€61.2B travel retail market. 2.4B passengers. 72% browse but don't buy.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            {[
              { icon: DollarSign, title: '€61.2B', desc: 'Global travel retail market size (2024)' },
              { icon: Users, title: '2.4B', desc: 'International air passengers annually' },
              { icon: TrendingUp, title: '72%', desc: 'Travelers who browse but don\'t buy' },
              { icon: BarChart3, title: '12%', desc: 'Annual market growth (CAGR 2024–2034)' },
            ].map(({ icon: Icon, title, desc }, i) => (
              <div key={i} className="bg-gradient-to-br from-blue-900/20 to-slate-900 border border-blue-800/50 rounded-xl p-6 space-y-2 hover:border-blue-700 transition-colors">
                <Icon className="w-8 h-8 text-blue-400" />
                <p className="text-2xl font-heading font-bold text-blue-300">{title}</p>
                <p className="text-sm text-slate-400">{desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-blue-600/20 to-slate-900 border border-blue-500/30 rounded-xl p-6 text-center">
            <p className="font-semibold text-slate-100">DutyBoost converts the 72% who browse — by giving your customers a real reason to spend.</p>
          </div>
        </section>

        {/* Value Proposition */}
        <section className="space-y-8">
          <h2 className="text-3xl font-heading font-bold">Your Value Proposition</h2>
          <p className="text-slate-400">Six reasons why travel partners are choosing DutyBoost:</p>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: '✓ Differentiate Your Platform', desc: 'Exclusive loyalty benefit your competitors don\'t offer. Pure competitive advantage.' },
              { title: '✓ Improve Customer Loyalty', desc: 'Travelers remember the value you provided. Higher lifetime value, lower churn.' },
              { title: '✓ Increase NPS & Satisfaction', desc: 'Give customers real savings at the moments they care about (airport travel).' },
              { title: '✓ Zero Operational Burden', desc: 'We handle everything—retailers, fraud, payouts. You just send emails.' },
              { title: '✓ Generate Recurring Revenue', desc: 'Passive 0.5% commission on every booking. No customer service overhead.' },
              { title: '✓ Build Data & Insights', desc: 'Understand traveler behavior at airports. Spending patterns. Channel performance.' },
            ].map(({ title, desc }, i) => (
              <div key={i} className={`border rounded-xl p-6 space-y-2 ${i % 2 === 0 ? 'bg-blue-900/10 border-blue-800/50' : 'bg-green-900/10 border-green-800/50'} hover:border-opacity-100 transition-colors`}>
                <p className="font-semibold text-slate-100">{title}</p>
                <p className="text-sm text-slate-400">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="space-y-8">
          <h2 className="text-3xl font-heading font-bold">How It Works</h2>

          <div className="grid md:grid-cols-4 gap-4">
            {[
              { num: '1', title: 'You Issue DutyCredits', desc: 'Include QR code in booking confirmation. We provide the template.' },
              { num: '2', title: 'Traveler Receives Benefit', desc: 'Valid from departure through arrival. Minimum €70 basket to activate.' },
              { num: '3', title: 'Redeemed at Airport Store', desc: 'Cashier scans QR. Tiered discount applied automatically. One-time use.' },
              { num: '4', title: 'You Earn Commission', desc: '0.5% of gross DutyCredit value. Monthly payouts to your bank account.' },
            ].map(({ num, title, desc }) => (
              <div key={num} className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-5 space-y-3 hover:border-blue-700 transition-colors">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-heading font-bold text-white">{num}</div>
                <p className="font-semibold text-slate-100">{title}</p>
                <p className="text-sm text-slate-400">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Commission Model */}
        <section className="space-y-8">
          <h2 className="text-3xl font-heading font-bold">Revenue Model Example</h2>
          <p className="text-slate-400">Mid-size OTA with 100,000 annual bookings:</p>

          <div className="bg-gradient-to-br from-green-900/20 to-slate-900 border border-green-800/50 rounded-xl p-8 space-y-4">
            {[
              { label: 'Annual bookings issued', val: '100,000', color: 'text-slate-300' },
              { label: 'Participation rate', val: '20%', color: 'text-slate-300' },
              { label: 'DutyCredits issued', val: '20,000', color: 'text-slate-300' },
              { label: 'Average DutyCredit value', val: '€35', color: 'text-slate-300' },
              { label: 'Total gross spend', val: '€700,000', color: 'text-slate-300' },
              { label: 'Commission rate', val: '0.5%', color: 'text-slate-300' },
            ].map(({ label, val, color }) => (
              <div key={label} className="flex justify-between items-center py-2 border-b border-slate-700/50">
                <span className="text-slate-400">{label}</span>
                <span className={`font-semibold ${color}`}>{val}</span>
              </div>
            ))}
            <div className="flex justify-between items-center py-3 bg-green-900/30 px-4 rounded-lg border border-green-700/50 mt-4">
              <span className="font-semibold text-slate-100">Annual Commission Earned</span>
              <span className="text-2xl font-heading font-bold text-green-400">€3,500/year</span>
            </div>
          </div>
        </section>

        {/* Discount Tiers */}
        <section className="space-y-8">
          <h2 className="text-3xl font-heading font-bold">DutyCredit Discount Tiers</h2>

          <div className="overflow-hidden rounded-xl border border-slate-700">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-800/50 border-b border-slate-700">
                  <th className="px-6 py-4 text-left font-semibold text-slate-300">Tier</th>
                  <th className="px-6 py-4 text-left font-semibold text-slate-300">Min. Basket</th>
                  <th className="px-6 py-4 text-left font-semibold text-slate-300">Customer Saving</th>
                  <th className="px-6 py-4 text-left font-semibold text-slate-300">Target Segment</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { tier: 'Boarding', basket: '€70–€99', saving: '€5–€10', segment: 'Price-conscious travelers' },
                  { tier: 'Priority', basket: '€100–€199', saving: '€15–€30', segment: 'Mid-market (most popular)' },
                  { tier: 'Lounge', basket: '€200–€299', saving: '€35–€45', segment: 'Premium travelers' },
                  { tier: 'VIP', basket: '€300+', saving: '€60', segment: 'Top spenders' },
                ].map(({ tier, basket, saving, segment }, i) => (
                  <tr key={tier} className={`border-b border-slate-700 ${i % 2 === 0 ? 'bg-slate-900/20' : 'bg-slate-800/10'} hover:bg-slate-800/30 transition-colors`}>
                    <td className="px-6 py-4 font-semibold text-slate-100">{tier}</td>
                    <td className="px-6 py-4 text-slate-400">{basket}</td>
                    <td className="px-6 py-4 font-semibold text-blue-400">{saving}</td>
                    <td className="px-6 py-4 text-slate-400">{segment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Why Partner */}
        <section className="space-y-8">
          <h2 className="text-3xl font-heading font-bold">Why Travel Partners Choose DutyBoost</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: Check, title: 'Exclusive Loyalty Tool', desc: 'Feature customers won\'t find in competing platforms.' },
              { icon: Check, title: 'Recurring Revenue Stream', desc: '0.5% commission per booking scales with your volume.' },
              { icon: Check, title: 'Increase Customer Stickiness', desc: 'Lower churn, higher lifetime value from loyalty benefit.' },
              { icon: Check, title: 'Zero Integration Burden', desc: 'Email-based. No API required. We handle complexity.' },
              { icon: Check, title: 'Data & Real-Time Insights', desc: 'Understand traveler spending patterns at airports.' },
              { icon: Check, title: 'White-Label Option', desc: 'Premium partners can brand as their own program.' },
            ].map(({ icon: Icon, title, desc }, i) => (
              <div key={i} className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-6 space-y-3 hover:border-blue-700 transition-colors">
                <div className="flex items-start gap-3">
                  <Icon className="w-6 h-6 text-green-400 mt-1 shrink-0" />
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
        <section className="bg-gradient-to-r from-blue-900/30 to-slate-900 border border-blue-800/50 rounded-xl p-8 space-y-6 text-center">
          <h3 className="text-2xl font-heading font-bold">Ready to unlock new revenue?</h3>
          <p className="text-slate-300">Zero setup cost. Recurring revenue. No burden.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="mailto:hello@dutyboost.com">
              <Button className="gap-2 bg-blue-600 hover:bg-blue-700"><Mail className="w-4 h-4" /> hello@dutyboost.com</Button>
            </a>
            <Link to="/retailer-presentation">
              <Button variant="outline" className="gap-2 bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-800">Retailer Guide <ArrowRight className="w-4 h-4" /></Button>
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