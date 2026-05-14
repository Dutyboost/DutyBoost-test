import { Link } from "react-router-dom";
import { useState } from "react";
import DutyBoostLogo from "../components/DutyBoostLogo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Mail, ArrowRight, TrendingUp, Users, DollarSign, BarChart3, Check, ExternalLink } from "lucide-react";

function SourceBox({ sources }) {
  return (
    <div className="mt-4 pt-4 border-t border-slate-700/50">
      <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-2">Sources</p>
      <ul className="space-y-1">
        {sources.map((s, i) => (
          <li key={i} className="flex items-start gap-2 text-xs text-slate-500">
            <span className="shrink-0 mt-0.5">›</span>
            <a href={s.url} target="_blank" rel="noopener noreferrer" className="hover:text-slate-300 transition-colors underline underline-offset-2">{s.label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

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
            <Link to="/retailer-presentation-dark">
              <Button size="sm" variant="outline" className="text-sm hidden sm:flex bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-800">Retailer Guide →</Button>
            </Link>
            <Link to="/">
              <Button size="sm" variant="ghost" className="text-sm text-slate-300">← Home</Button>
            </Link>
            <Button size="sm" variant="outline" className="gap-1.5 bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-800" onClick={downloadPresentation} disabled={isDownloading}>
              <Download className="w-3.5 h-3.5" /> {isDownloading ? 'Generating...' : 'Download PPTX'}
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-16 space-y-20">

        {/* Hero */}
        <section className="space-y-6 text-center py-12">
          <Badge variant="secondary" className="bg-blue-900/30 text-blue-300 border-blue-700 mx-auto">Travel Partner Program</Badge>
          <h1 className="text-5xl sm:text-6xl font-heading font-bold">
            Partner with <span className="text-blue-400">DutyBoost</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Add exclusive loyalty value to your customers. Generate recurring commission. A white-label program that delivers real airport discounts — without any operational overhead.
          </p>
        </section>

        {/* The Commission Collapse */}
        <section className="space-y-8">
          <div className="border-l-4 border-red-500 pl-6">
            <h2 className="text-3xl font-heading font-bold">The Revenue Problem Travel Partners Face</h2>
            <p className="text-slate-400 mt-2">Commission rates are declining across every segment. Partners need new revenue streams.</p>
          </div>

          <div className="bg-gradient-to-br from-red-950/40 to-slate-900 border border-red-800/40 rounded-xl p-8 space-y-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-red-800/30">
                    <th className="py-3 text-left font-semibold text-slate-300">Segment</th>
                    <th className="py-3 text-left font-semibold text-slate-300">Commission Rate (2024)</th>
                    <th className="py-3 text-left font-semibold text-slate-300">Trend</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/30">
                  {[
                    { seg: 'Airlines', rate: '0–2%', trend: '↓ Near zero', color: 'text-red-400' },
                    { seg: 'Hotels (OTA avg)', rate: '15–25%', trend: '→ Commoditized', color: 'text-yellow-400' },
                    { seg: 'Car rentals', rate: '10–20%', trend: '↓ Eroding', color: 'text-orange-400' },
                    { seg: 'Travel agencies', rate: '5–10%', trend: '↓ Under pressure', color: 'text-orange-400' },
                  ].map(({ seg, rate, trend, color }) => (
                    <tr key={seg}>
                      <td className="py-3 text-slate-300">{seg}</td>
                      <td className="py-3 text-slate-400 font-mono">{rate}</td>
                      <td className={`py-3 font-semibold ${color}`}>{trend}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <SourceBox sources={[
              { label: 'Cloudbeds – Guide to OTA Commission Rates 2026', url: 'https://www.cloudbeds.com/online-travel-agencies/commissions/' },
              { label: 'Preno – OTA Commission Rates: Airbnb, Expedia & More', url: 'https://prenohq.com/blog/ota-commission-rates-expedia-booking-com-more/' },
              { label: 'Grand View Research – Online Travel Agencies Market Report 2033', url: 'https://www.grandviewresearch.com/industry-analysis/online-travel-agencies-market-report' },
            ]} />
          </div>
        </section>

        {/* Market Opportunity */}
        <section className="space-y-8">
          <div className="border-l-4 border-blue-500 pl-6">
            <h2 className="text-3xl font-heading font-bold">The Market Opportunity</h2>
            <p className="text-slate-400 mt-2">€650B global travel market. €61.2B airport retail. 72% not converting. DutyBoost bridges the gap.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                icon: DollarSign,
                title: '€650B+',
                desc: 'Global online travel market revenue in 2024 — the platform your customers already book through.',
                source: { label: 'Statista – Global Tourism & Online Travel Market 2024', url: 'https://www.statista.com/topics/962/global-tourism/' },
              },
              {
                icon: BarChart3,
                title: '€61.2B',
                desc: 'Global travel retail market (2024) growing at 12% CAGR — where your customers spend post-booking.',
                source: { label: 'GM Insights – Travel Retail Market Report 2024', url: 'https://www.gminsights.com/industry-analysis/travel-retail-market' },
              },
              {
                icon: Users,
                title: '72%',
                desc: 'Of travelers browse at airports but don\'t buy. DutyBoost converts them with your branded voucher.',
                source: { label: 'Forbes – Airport Shoppers Behavior Study 2026', url: 'https://www.forbes.com/sites/kevinrozario/2026/03/09/airport-shoppers-shift-to-value-convenience-and-selftreating/' },
              },
              {
                icon: TrendingUp,
                title: '+24%',
                desc: 'Last-minute travel bookings rising annually — more travelers = more DutyCredit opportunities for you.',
                source: { label: 'Grand View Research – OTA Market & Trends 2033', url: 'https://www.grandviewresearch.com/industry-analysis/online-travel-agencies-market-report' },
              },
            ].map(({ icon: Icon, title, desc, source }, i) => (
              <div key={i} className="bg-gradient-to-br from-blue-900/20 to-slate-900 border border-blue-800/50 rounded-xl p-6 space-y-3 hover:border-blue-700 transition-colors">
                <div className="flex items-start gap-3">
                  <Icon className="w-7 h-7 text-blue-400 shrink-0 mt-1" />
                  <div>
                    <p className="text-2xl font-heading font-bold text-blue-300">{title}</p>
                    <p className="text-sm text-slate-400 mt-1">{desc}</p>
                    <a href={source.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-blue-400 mt-2 transition-colors">
                      <ExternalLink className="w-3 h-3" /> {source.label}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="space-y-8">
          <h2 className="text-3xl font-heading font-bold">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { num: '1', title: 'You Issue DutyCredits', desc: 'Include QR code in booking confirmation email. One API call — we handle everything else.' },
              { num: '2', title: 'Traveler Receives Benefit', desc: 'Valid from departure. Min €70 basket to activate discount tier (€5–€60 range).' },
              { num: '3', title: 'Redeemed at Airport Store', desc: 'Cashier scans QR. Tiered discount applied automatically at checkout.' },
              { num: '4', title: 'You Earn Commission', desc: '0.5% of gross DutyCredit value. Automated monthly payouts to your account.' },
            ].map(({ num, title, desc }) => (
              <div key={num} className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-5 space-y-3 hover:border-blue-700 transition-colors">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-heading font-bold text-white">{num}</div>
                <p className="font-semibold text-slate-100">{title}</p>
                <p className="text-sm text-slate-400">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Revenue Model */}
        <section className="space-y-8">
          <h2 className="text-3xl font-heading font-bold">Revenue Model Example</h2>
          <p className="text-slate-400">Mid-size OTA with 100,000 annual bookings at 20% DutyCredit participation:</p>

          <div className="bg-gradient-to-br from-green-900/20 to-slate-900 border border-green-800/50 rounded-xl p-8 space-y-3">
            {[
              { label: 'Annual bookings issued', val: '100,000' },
              { label: 'DutyCredit participation rate', val: '20%' },
              { label: 'DutyCredits issued', val: '20,000' },
              { label: 'Average DutyCredit value', val: '€35' },
              { label: 'Total gross DutyCredit spend', val: '€700,000' },
              { label: 'Commission rate', val: '0.5%' },
            ].map(({ label, val }) => (
              <div key={label} className="flex justify-between items-center py-2 border-b border-slate-700/40">
                <span className="text-slate-400 text-sm">{label}</span>
                <span className="font-semibold text-slate-200">{val}</span>
              </div>
            ))}
            <div className="flex justify-between items-center py-3 bg-green-900/30 px-4 rounded-lg border border-green-700/50 mt-4">
              <span className="font-semibold text-slate-100">Annual Commission Earned</span>
              <span className="text-2xl font-heading font-bold text-green-400">€3,500/year</span>
            </div>
            <p className="text-xs text-slate-500 pt-2">Commission calculation based on 0.5% of net DutyCredit redemption value. Scales proportionally with booking volume and redemption rate.</p>
          </div>
        </section>

        {/* Loyalty & Traveler Data */}
        <section className="space-y-8">
          <div className="border-l-4 border-green-500 pl-6">
            <h2 className="text-3xl font-heading font-bold">Why Loyalty Programs Work</h2>
            <p className="text-slate-400 mt-2">Research confirms loyalty benefits directly drive repeat bookings and traveler retention.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                stat: '63%',
                label: 'more confident spending at airports when incentives are available',
                source: { label: 'Kearney – Travel Retail & Geopolitical Realities', url: 'https://www.kearney.com/industry/consumer-retail/article/travel-retail-amid-today-s-geopolitical-realities' },
              },
              {
                stat: '+6%',
                label: 'average per-traveler spending increase since pre-pandemic',
                source: { label: 'Kearney – Travel Retail Moment of Truth Report', url: 'https://www.luxuryroundtable.com/wp-content/uploads/2023/10/Kearney-travel-retail-report-101223-.pdf' },
              },
              {
                stat: '71%',
                label: 'conversion rate achievable with the right incentive structure',
                source: { label: 'm1nd-set Research – Solo Travel & Conversion Rates', url: 'https://www.linkedin.com/posts/m1nd-set_m1nd-set-research-reveals-solo-travel-will-activity-7388090859046731776-3Gbn' },
              },
            ].map(({ stat, label, source }, i) => (
              <div key={i} className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-6 space-y-3 hover:border-green-700 transition-colors">
                <p className="text-4xl font-heading font-bold text-green-400">{stat}</p>
                <p className="text-sm text-slate-300">{label}</p>
                <a href={source.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-green-400 transition-colors">
                  <ExternalLink className="w-3 h-3" /> {source.label}
                </a>
              </div>
            ))}
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
          <p className="text-xs text-slate-500">Tier structure informed by TFWA's Duty Free Spend Understanding Study (2024), which identifies distinct spending segments among airport shoppers. <a href="https://www.tfwa.com/research/tfwa-insight/tfwa-insight-the-duty-free-spend-understanding-study-2024-100016689" target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-300 transition-colors">TFWA Insight 2024 →</a></p>
        </section>

        {/* Partner Benefits */}
        <section className="space-y-8">
          <h2 className="text-3xl font-heading font-bold">Why Travel Partners Choose DutyBoost</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: Check, title: 'Exclusive Loyalty Tool', desc: 'A benefit competitors don\'t offer — differentiate your platform for free.' },
              { icon: Check, title: 'Recurring Revenue Stream', desc: '0.5% commission per redemption — scales passively with your booking volume.' },
              { icon: Check, title: 'Increase Customer Stickiness', desc: 'Loyalty benefits lower churn. Travelers return to platforms that give real value.' },
              { icon: Check, title: 'Zero Operational Burden', desc: 'Email-based. One API call per booking. We manage retailers, fraud, payouts.' },
              { icon: Check, title: 'Data & Real-Time Insights', desc: 'Dashboard shows which bookings convert, when, and at which airports.' },
              { icon: Check, title: 'White-Label Option', desc: 'Premium partners can fully brand the program as their own loyalty feature.' },
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

        {/* Full Sources Reference */}
        <section className="space-y-6">
          <h2 className="text-2xl font-heading font-bold text-slate-300">Research Sources</h2>
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 space-y-3">
            {[
              { label: 'Statista – Global Tourism & Online Travel Market 2024 ($650B+ revenue)', url: 'https://www.statista.com/topics/962/global-tourism/' },
              { label: 'Phocuswright – Global Travel Market Report 2024 ($1.5T industry)', url: 'https://www.phocuswright.com/Travel-Research/Market-Overview-Sizing/Global-Travel-Market-Report-2024' },
              { label: 'GM Insights – Travel Retail Market Size & Share, Forecasts 2024–2032', url: 'https://www.gminsights.com/industry-analysis/travel-retail-market' },
              { label: 'Yahoo Finance – Global Airport & Duty-Free Retailing 2024 ($58.9B, +11.3%)', url: 'https://finance.yahoo.com/news/global-airport-duty-free-retailing-092300710.html' },
              { label: 'Cloudbeds – Guide to OTA Commission Rates 2026 (15–30% hotel avg)', url: 'https://www.cloudbeds.com/online-travel-agencies/commissions/' },
              { label: 'Preno – OTA Commission Rates: Airbnb, Expedia & More', url: 'https://prenohq.com/blog/ota-commission-rates-expedia-booking-com-more/' },
              { label: 'Grand View Research – Online Travel Agencies Market Report 2033 (+24% last-minute)', url: 'https://www.grandviewresearch.com/industry-analysis/online-travel-agencies-market-report' },
              { label: 'Forbes – Airport Shoppers Shift to Value, Convenience & Self-Treating (2026)', url: 'https://www.forbes.com/sites/kevinrozario/2026/03/09/airport-shoppers-shift-to-value-convenience-and-selftreating/' },
              { label: 'Kearney – Travel Retail amid Geopolitical Realities (63% incentive confidence)', url: 'https://www.kearney.com/industry/consumer-retail/article/travel-retail-amid-today-s-geopolitical-realities' },
              { label: 'Kearney – Travel Retail Moment of Truth (premiumization, +6% spending)', url: 'https://www.luxuryroundtable.com/wp-content/uploads/2023/10/Kearney-travel-retail-report-101223-.pdf' },
              { label: 'm1nd-set Research – Solo Travel & Conversion Rates (71% with incentives)', url: 'https://www.linkedin.com/posts/m1nd-set_m1nd-set-research-reveals-solo-travel-will-activity-7388090859046731776-3Gbn' },
              { label: 'TFWA Insight – Duty Free Spend Understanding Study 2024', url: 'https://www.tfwa.com/research/tfwa-insight/tfwa-insight-the-duty-free-spend-understanding-study-2024-100016689' },
              { label: 'Alvarez & Marsal – Revolutionizing Loyalty Programs in Travel & Hospitality 2024', url: 'https://www.alvarezandmarsal.com/sites/default/files/2024-01/Revolutionizing%20Loyalty%20Programs%20in%20Travel%20and%20Hospitality%20-%20Four%20Driving%20Forces%20and%20Six%20Steps%20for%20Transformation.pdf' },
            ].map((s, i) => (
              <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 text-sm text-slate-500 hover:text-slate-300 transition-colors group">
                <ExternalLink className="w-3.5 h-3.5 shrink-0 mt-0.5 group-hover:text-blue-400" />
                {s.label}
              </a>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-blue-900/30 to-slate-900 border border-blue-800/50 rounded-xl p-8 space-y-6 text-center">
          <h3 className="text-2xl font-heading font-bold">Ready to unlock new revenue?</h3>
          <p className="text-slate-300">Zero setup cost. Recurring commission. No operational burden.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="mailto:hello@dutyboost.com">
              <Button className="gap-2 bg-blue-600 hover:bg-blue-700"><Mail className="w-4 h-4" /> hello@dutyboost.com</Button>
            </a>
            <Link to="/retailer-presentation-dark">
              <Button variant="outline" className="gap-2 bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-800">Retailer Guide <ArrowRight className="w-4 h-4" /></Button>
            </Link>
          </div>
        </section>

      </div>

      <footer className="border-t border-slate-800 py-8 px-6 print:hidden mt-10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-400">
          <DutyBoostLogo height={120} inverted />
          <div className="flex items-center gap-6">
            <Link to="/" className="hover:text-slate-200 transition-colors">Home</Link>
            <a href="mailto:hello@dutyboost.com" className="hover:text-slate-200 transition-colors">hello@dutyboost.com</a>
            <span>© 2026 DutyBoost</span>
          </div>
        </div>
      </footer>
    </div>
  );
}