import { Link } from "react-router-dom";
import { useState } from "react";
import DutyBoostLogo from "../components/DutyBoostLogo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Mail, ArrowRight, TrendingUp, Users, Globe, ShoppingBag, Zap, Star, BarChart3, Check, ExternalLink, Plane } from "lucide-react";

function SrcLink({ href, children }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-orange-400 mt-2 transition-colors">
      <ExternalLink className="w-3 h-3" />{children}
    </a>
  );
}

function SourceBox({ sources }) {
  return (
    <div className="mt-4 pt-4 border-t border-slate-700/50">
      <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-2">Sources</p>
      <ul className="space-y-1">
        {sources.map((s, i) => (
          <li key={i} className="flex items-start gap-2 text-xs text-slate-500">
            <span className="shrink-0 mt-0.5">›</span>
            <a href={s.url} target="_blank" rel="noopener noreferrer"
              className="hover:text-slate-300 transition-colors underline underline-offset-2">{s.label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

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
            <Button size="sm" variant="outline" className="gap-1.5 bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-800"
              onClick={downloadPresentation} disabled={isDownloading}>
              <Download className="w-3.5 h-3.5" /> {isDownloading ? 'Generating...' : 'Download PPTX'}
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-16 space-y-20">

        {/* ── HERO ── */}
        <section className="space-y-6 text-center py-12">
          <Badge className="bg-orange-900/30 text-orange-300 border-orange-700 mx-auto">Airport Retail Partnership</Badge>
          <h1 className="text-5xl sm:text-6xl font-heading font-bold leading-tight">
            Your store already has<br />
            <span className="text-orange-400">the traffic. DutyBoost converts it.</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Millions of travelers pass through airport retail every day. DutyBoost pre-activates their purchase intent before they even board — so when they walk through your door, they are ready to buy.
          </p>
          <div className="flex flex-wrap gap-3 justify-center pt-2">
            {['Zero setup cost', 'Pre-qualified buyers', 'Higher basket size', 'Performance-based only'].map(t => (
              <span key={t} className="px-3 py-1.5 rounded-full bg-orange-900/30 border border-orange-700/50 text-orange-300 text-sm font-medium">{t}</span>
            ))}
          </div>
        </section>

        {/* ── WHY DUTYBOOST — THE SCALE OF FOOT TRAFFIC ── */}
        <section className="space-y-8">
          <div className="border-l-4 border-orange-500 pl-6">
            <p className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-1">Why DutyBoost</p>
            <h2 className="text-3xl font-heading font-bold">The world's biggest captive audience — walking past your store every day</h2>
            <p className="text-slate-400 mt-2">
              Airports are the most concentrated retail environments on earth. The footfall is extraordinary. The conversion rate, without the right activation, is not.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                icon: Globe,
                stat: '4.8B',
                label: 'Global air passengers in 2024',
                detail: 'IATA confirmed a record 4.8 billion segment passengers in 2024 — every single one passing through an airport retail environment before or after their flight.',
                src: { label: 'IATA Annual Review 2025', url: 'https://www.iata.org/contentassets/c81222d96c9a4e0bb4ff6ced0126f0bb/iata-annual-review-2025.pdf' },
              },
              {
                icon: Plane,
                stat: '188,500',
                label: 'Travelers through Schiphol every single day (2025)',
                detail: 'Amsterdam Schiphol handled 68.8 million travellers in 2025. That\'s 188,500 per day · 1.32M per week · 5.73M per month. Each one a potential customer walking past your store.',
                src: { label: 'Schiphol Group Annual Traffic Review 2025', url: 'https://airportindustry-news.com/schiphol-airport-handles-68-8-million-passengers-in-2025/' },
              },
              {
                icon: BarChart3,
                stat: '1h 10m',
                label: 'Avg. dwell time in departures per traveler',
                detail: 'After security, travellers have an average of 1 hour and 10 minutes of free time. At Schiphol, that number rises to 146 minutes — over two hours of browsing, dining, and shopping potential.',
                src: { label: 'Pi Insight — Duty Free Competes for 1h10m Airport Dwell Time', url: 'https://www.linkedin.com/posts/pi-insight_travelretail-dutyfree-shopperbehaviour-activity-7450856841967869953-OGWq' },
              },
              {
                icon: TrendingUp,
                stat: '€68.2B',
                label: 'Global duty-free & travel retail market 2024',
                detail: 'The global duty-free and travel retail market reached €68.2 billion in 2024 and is growing at 8.8% CAGR. Airport retail is the dominant channel — 61.7% of all duty-free sales happen airside.',
                src: { label: 'Mordor Intelligence — Duty Free & Travel Retail Market 2026', url: 'https://www.mordorintelligence.com/industry-reports/duty-free-and-travel-retail-market' },
              },
            ].map(({ icon: Icon, stat, label, detail, src }, i) => (
              <div key={i} className="bg-gradient-to-br from-orange-900/15 to-slate-900 border border-orange-800/40 rounded-xl p-6 space-y-3 hover:border-orange-600 transition-colors">
                <div className="flex items-start gap-3">
                  <Icon className="w-6 h-6 text-orange-400 shrink-0 mt-1" />
                  <div>
                    <p className="text-3xl font-heading font-bold text-orange-300">{stat}</p>
                    <p className="text-sm font-semibold text-slate-200 mt-0.5">{label}</p>
                    <p className="text-sm text-slate-400 mt-2 leading-relaxed">{detail}</p>
                    <SrcLink href={src.url}>{src.label}</SrcLink>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Schiphol Breakdown */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-6">
            <p className="text-sm font-bold text-slate-300 uppercase tracking-widest mb-4">Schiphol Airport — Footfall Your Store Can Tap Into</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {[
                { period: 'Daily', value: '188,500', sub: 'travelers through Schiphol' },
                { period: 'Weekly', value: '1.32M', sub: 'potential shoppers' },
                { period: 'Monthly', value: '5.73M', sub: 'departing travelers' },
                { period: 'Yearly', value: '68.8M', sub: 'total passengers in 2025' },
              ].map(({ period, value, sub }) => (
                <div key={period} className="space-y-1">
                  <p className="text-xs text-slate-500 uppercase tracking-wider">{period}</p>
                  <p className="text-2xl font-heading font-bold text-orange-300">{value}</p>
                  <p className="text-xs text-slate-500">{sub}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-4">Source: Schiphol Group Annual Traffic Review 2025 · 68.8M ÷ 365 = 188,493/day</p>
          </div>
        </section>

        {/* ── WHY DUTYBOOST — THE CONVERSION OPPORTUNITY ── */}
        <section className="space-y-8">
          <div className="border-l-4 border-green-500 pl-6">
            <p className="text-xs font-bold uppercase tracking-widest text-green-400 mb-1">Why DutyBoost</p>
            <h2 className="text-3xl font-heading font-bold">The conversion gap — and how pre-activation closes it</h2>
            <p className="text-slate-400 mt-2">
              Airport retail has the traffic. What it lacks is purchase intent at the point of entry. DutyBoost creates that intent days before the traveler arrives.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              { stat: '28%', color: 'text-slate-300', label: 'Typical conversion rate without incentives', detail: 'Only about 1 in 4 travelers in the airport retail environment makes a purchase. The other 75% browse and leave.' },
              { stat: '63%', color: 'text-orange-400', label: 'More confident spending when incentivized', detail: 'Kearney research: travelers with an active incentive are 63% more confident making a purchase at airport retail versus without one.', src: { label: 'Kearney — Travel Retail & Geopolitical Realities 2024', url: 'https://www.kearney.com/industry/consumer-retail/article/travel-retail-amid-today-s-geopolitical-realities' } },
              { stat: '71%', color: 'text-green-400', label: 'Conversion achievable with right incentive', detail: 'm1nd-set data shows that with a targeted, pre-activated incentive, conversion rates among motivated traveler segments can reach 71%.', src: { label: 'm1nd-set Research — Conversion with Incentives 2025', url: 'https://www.linkedin.com/posts/m1nd-set_m1nd-set-research-reveals-solo-travel-will-activity-7388090859046731776-3Gbn' } },
            ].map(({ stat, color, label, detail, src }, i) => (
              <div key={i} className="bg-slate-800/60 border border-slate-700 rounded-xl p-5 space-y-3 hover:border-orange-700 transition-colors">
                <p className={`text-4xl font-heading font-bold ${color}`}>{stat}</p>
                <p className="text-sm font-semibold text-slate-200">{label}</p>
                <p className="text-xs text-slate-400 leading-relaxed">{detail}</p>
                {src && <SrcLink href={src.url}>{src.label}</SrcLink>}
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-orange-900/20 to-slate-900 border border-orange-800/40 rounded-xl p-6 space-y-3">
            <p className="font-semibold text-slate-100 flex items-center gap-2">
              <Zap className="w-5 h-5 text-orange-400" /> The DutyBoost difference: purchase intent activated before arrival
            </p>
            <p className="text-sm text-slate-400 leading-relaxed">
              Conventional retail relies on catching a traveler's attention at the point of sale. DutyBoost works differently — it plants the seed days before the flight. When a traveler's booking confirmation arrives with a DutyCredit, they start thinking about where to spend it. By the time they clear security, they have a store in mind. They are not browsing. They are buying.
            </p>
            <p className="text-sm text-slate-400 leading-relaxed mt-2">
              A 10% increase in dwell time is associated with an 8% rise in retail sales and a 6% rise in F&B revenue, according to peer-reviewed airport retail research. Pre-activation amplifies this by converting passive dwell time into active purchase intent.
            </p>
            <SrcLink href="https://www.sciencedirect.com/science/article/pii/S0969699724000851">ScienceDirect — Shopping or Dining? Dwell Time & Non-Aeronautical Revenue 2024</SrcLink>
          </div>
        </section>

        {/* ── HOW DUTYBOOST WORKS ── */}
        <section className="space-y-8">
          <div className="border-l-4 border-orange-500 pl-6">
            <p className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-1">How DutyBoost</p>
            <h2 className="text-3xl font-heading font-bold">Simple to operate. Powerful in impact.</h2>
            <p className="text-slate-400 mt-2">No POS integration required to start. You scan a QR code. We handle everything else.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            {[
              { num: '1', title: 'Travel Partner Issues DutyCredit', desc: 'When a traveler books a flight, hotel or car rental, their confirmation email includes a personalized DutyCredit QR code — weeks before they fly.' },
              { num: '2', title: 'Traveler Arrives Pre-Activated', desc: 'They enter your store already motivated. They have a specific credit to spend at a minimum basket of €70 — and they\'re looking to use it.' },
              { num: '3', title: 'Cashier Scans the QR Code', desc: 'One scan at checkout. Our system validates the QR instantly and applies the tiered discount automatically. No manual calculation.' },
              { num: '4', title: 'Higher Sale. Monthly Invoice.', desc: 'You receive a single monthly invoice for 2,5% of gross redemption value (max €25/transaction). No upfront fees. No subscriptions.' },
            ].map(({ num, title, desc }) => (
              <div key={num} className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-5 space-y-3 hover:border-orange-600 transition-colors">
                <div className="w-10 h-10 rounded-full bg-orange-600 flex items-center justify-center font-heading font-bold text-white text-lg">{num}</div>
                <p className="font-semibold text-slate-100">{title}</p>
                <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          {/* Tier Table */}
          <div className="overflow-hidden rounded-xl border border-slate-700">
            <div className="bg-slate-800/60 px-6 py-4 border-b border-slate-700">
              <p className="font-semibold text-slate-200">DutyCredit Discount Structure — What Drives Basket Size</p>
              <p className="text-xs text-slate-400 mt-1">Tiered discounts are designed to push basket sizes upward — not just reward existing spend</p>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-900/40">
                  <th className="px-5 py-3 text-left text-xs font-semibold text-slate-400 uppercase">Tier</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-slate-400 uppercase">Min. Basket</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-slate-400 uppercase">Traveler Saves</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-slate-400 uppercase">Your Fee (2,5%)</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-slate-400 uppercase">Your Net</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { tier: '🟡 Boarding', basket: '€70–€99', save: '€5–€10', fee: '€1.75–€2.50', net: '€56–€86', row: 'bg-yellow-900/10' },
                  { tier: '🔵 Priority', basket: '€100–€199', save: '€10–€30', fee: '€2.50–€5', net: '€83–€169', row: 'bg-blue-900/10' },
                  { tier: '🟢 Lounge', basket: '€200–€299', save: '€30–€60', fee: '€5–€7.50', net: '€150–€234', row: 'bg-green-900/10' },
                  { tier: '🟣 VIP', basket: '€300+', save: '€60 flat', fee: 'max €25', net: '€215+ net', row: 'bg-purple-900/10' },
                ].map(({ tier, basket, save, fee, net, row }) => (
                  <tr key={tier} className={`border-b border-slate-700/50 ${row} hover:bg-slate-800/40 transition-colors`}>
                    <td className="px-5 py-4 font-semibold text-slate-100 text-sm">{tier}</td>
                    <td className="px-5 py-4 text-slate-400 text-sm">{basket}</td>
                    <td className="px-5 py-4 font-semibold text-orange-400 text-sm">{save}</td>
                    <td className="px-5 py-4 text-slate-500 text-sm">{fee}</td>
                    <td className="px-5 py-4 font-bold text-green-400 text-sm">{net}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="px-5 py-3 text-xs text-slate-500">Net = basket − traveler saving − DutyBoost fee. DutyCredit discount is fully covered by DutyBoost — not deducted from your margin.</p>
          </div>
        </section>

        {/* ── WHAT DUTYBOOST BRINGS — REVENUE IMPACT ── */}
        <section className="space-y-8">
          <div className="border-l-4 border-green-500 pl-6">
            <p className="text-xs font-bold uppercase tracking-widest text-green-400 mb-1">What DutyBoost Brings</p>
            <h2 className="text-3xl font-heading font-bold">Measurable revenue uplift — per location, per day</h2>
            <p className="text-slate-400 mt-2">Based on real conversion research and average basket data from European airport retail.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                metric: 'Conversion Rate',
                baseline: '28%',
                with_db: '40–50%',
                lift: '+42–78%',
                note: 'Based on m1nd-set research: targeted pre-departure incentives drive conversion among motivated traveler segments up to 71%.',
                src: { label: 'm1nd-set Research 2025', url: 'https://www.linkedin.com/posts/m1nd-set_m1nd-set-research-reveals-solo-travel-will-activity-7388090859046731776-3Gbn' },
              },
              {
                metric: 'Avg. Basket Spend',
                baseline: '€20–€28',
                with_db: '€100–€140',
                lift: '4–5× uplift',
                note: 'ETRC data shows €20–€28 duty-free spend per passenger on average. DutyCredit requires a €70+ basket minimum — naturally elevating average order value.',
                src: { label: 'ETRC EU Duty-Free Economic Impact Report April 2025', url: 'https://etrc.org/wp-content/uploads/documents/ETRC-EU-Economic-Impact-of-Duty-Free-Travel-Retail-Report-April-2025-FINAL.pdf' },
              },
              {
                metric: 'Daily Revenue (100 DutyCredit visitors)',
                baseline: '28 sales × €75 = €2,100',
                with_db: '45 sales × €120 = €5,400',
                lift: '+€3,300/day',
                note: 'Net of DutyBoost fee (2,5%, max €25/tx). Assumes mid-tier Priority basket average, 45% conversion with activated DutyCredit holders.',
              },
            ].map(({ metric, baseline, with_db, lift, note, src }) => (
              <div key={metric} className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-6 space-y-4 hover:border-green-700 transition-colors">
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">{metric}</p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 text-sm">Without DutyBoost:</span>
                    <span className="text-lg font-bold text-slate-300">{baseline}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300 text-sm">With DutyBoost:</span>
                    <span className="text-lg font-bold text-orange-400">{with_db}</span>
                  </div>
                </div>
                <div className="pt-3 border-t border-slate-700">
                  <p className="text-center font-bold text-green-400 text-base">{lift}</p>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">{note}</p>
                  {src && <SrcLink href={src.url}>{src.label}</SrcLink>}
                </div>
              </div>
            ))}
          </div>

          {/* Annual impact */}
          <div className="bg-gradient-to-br from-green-900/20 to-slate-900 border border-green-800/50 rounded-xl p-6">
            <p className="font-semibold text-slate-100 mb-4">Annual Impact Estimate — Single Store Location</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between py-2 border-b border-slate-700/40">
                <span className="text-slate-400">Baseline (28% conversion, €75 avg basket, 100 DutyCredit visitors/day)</span>
                <span className="text-slate-300 font-semibold">€2,100/day</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-700/40">
                <span className="text-slate-400">With DutyBoost (45% conversion, €120 avg basket)</span>
                <span className="text-orange-400 font-semibold">€5,400/day</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-700/40">
                <span className="text-slate-400">Net daily uplift (after DutyBoost fee)</span>
                <span className="text-green-400 font-semibold">€3,150/day</span>
              </div>
              <div className="flex justify-between py-3 text-base">
                <span className="text-slate-100 font-semibold">Annual additional revenue per location:</span>
                <span className="text-green-400 font-bold text-xl">€1,149,750</span>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-2">Estimate based on 365 operating days. Actual results depend on DutyCredit holder volume at your specific location.</p>
          </div>
        </section>

        {/* ── WHAT DUTYBOOST BRINGS — FULL VALUE SUMMARY ── */}
        <section className="space-y-8">
          <div className="border-l-4 border-orange-500 pl-6">
            <p className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-1">What DutyBoost Brings</p>
            <h2 className="text-3xl font-heading font-bold">The complete retailer advantage</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              { icon: Check, title: 'Zero setup cost. Zero monthly fee.', desc: 'Purely performance-based. You only pay 2,5% (max €25) when DutyBoost delivers a confirmed, incremental sale.' },
              { icon: Check, title: 'Pre-qualified, pre-motivated buyers', desc: 'Every DutyCredit holder has a specific credit to spend. They are not window shopping — they arrive at your store with a mission.' },
              { icon: Check, title: 'Higher average basket size guaranteed', desc: 'The minimum basket of €70 to unlock any tier means every DutyCredit redemption is a meaningful transaction, not a micro-purchase.' },
              { icon: Check, title: 'No POS integration needed to start', desc: 'Cashier scans a QR code on a mobile device. That\'s it. Full POS integration is available but not required to begin earning.' },
              { icon: BarChart3, title: 'Real-time analytics dashboard', desc: 'Track redemptions, basket values, conversion rates, and monthly invoice totals — per day, per store, across your entire portfolio.' },
              { icon: Zap, title: 'Growing traveler partner network', desc: 'Every new travel partner that joins DutyBoost sends more pre-activated travelers to your store. The network effect works in your favor continuously.' },
              { icon: Star, title: 'Traveler loyalty at your store', desc: 'Travelers who redeem a DutyCredit remember your store as the place that gave them great value. Brand loyalty built effortlessly.' },
              { icon: Users, title: 'Consistent incremental footfall', desc: 'Unlike one-time promotions, DutyBoost delivers a steady stream of pre-activated shoppers every day — as long as travel partners keep issuing DutyCredits.' },
            ].map(({ icon: Icon, title, desc }, i) => (
              <div key={i} className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-5 space-y-2 hover:border-orange-600 transition-colors">
                <div className="flex items-start gap-3">
                  <Icon className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-slate-100 text-sm">{title}</p>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">{desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── MARKET GROWTH CONTEXT ── */}
        <section className="space-y-8">
          <div className="border-l-4 border-blue-500 pl-6">
            <p className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-1">Market Context</p>
            <h2 className="text-3xl font-heading font-bold">The market is growing. Your share of it should too.</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { stat: '+8.8%', label: 'CAGR in global duty-free & travel retail through 2031', context: 'The Mordor Intelligence report projects the market to grow from $102.5B in 2026 to $156.2B by 2031 — over 52% total growth in five years.', src: { label: 'Mordor Intelligence — Duty Free & Travel Retail Market 2026', url: 'https://www.mordorintelligence.com/industry-reports/duty-free-and-travel-retail-market' } },
              { stat: '+8.5%', label: 'Conversion rate increase from targeted digital engagement (QR/mobile)', context: 'Research confirms digital incentive tools — including QR codes and mobile vouchers — directly improve conversion rates at the point of sale.', src: { label: 'LinkedIn — Airport DOOH & Digital Conversion Research', url: 'https://www.linkedin.com/posts/linna-chen-a0055924a_dooh-programmaticadvertising-airportadvertising-activity-7394937993599488000-u16w' } },
              { stat: '+10.6%', label: 'Global air passenger growth in 2024 — the travelers keep coming', context: 'IATA confirmed a 10.6% year-on-year surge in global passengers in 2024. More travelers = more footfall = more DutyCredit opportunities for your store.', src: { label: 'IATA Annual Review 2025', url: 'https://www.iata.org/contentassets/c81222d96c9a4e0bb4ff6ced0126f0bb/iata-annual-review-2025.pdf' } },
              { stat: '62%', label: 'of airport retailers already have QR/mobile digital capability', context: 'The infrastructure for DutyBoost integration is already in place for most airport retailers. Adoption is plug-and-play.', src: { label: 'Market Growth Reports — Duty Free Travel Retail 2024', url: 'https://www.marketgrowthreports.com/market-reports/duty-free-travel-retail-market-114899' } },
            ].map(({ stat, label, context, src }, i) => (
              <div key={i} className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-5 space-y-2 hover:border-blue-600 transition-colors">
                <p className="text-3xl font-heading font-bold text-blue-400">{stat}</p>
                <p className="text-sm font-semibold text-slate-200">{label}</p>
                <p className="text-xs text-slate-400 leading-relaxed">{context}</p>
                <SrcLink href={src.url}>{src.label}</SrcLink>
              </div>
            ))}
          </div>
        </section>

        {/* ── SOURCES ── */}
        <section className="space-y-4">
          <h2 className="text-xl font-heading font-bold text-slate-400">Research Sources</h2>
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 space-y-2.5">
            {[
              { label: 'IATA Annual Review 2025 — 4.8B air passengers in 2024 (+10.6% YoY)', url: 'https://www.iata.org/contentassets/c81222d96c9a4e0bb4ff6ced0126f0bb/iata-annual-review-2025.pdf' },
              { label: 'Schiphol Group — 68.8M passengers in 2025 (+2.9% YoY)', url: 'https://airportindustry-news.com/schiphol-airport-handles-68-8-million-passengers-in-2025/' },
              { label: 'Mordor Intelligence — Duty Free & Travel Retail Market $102.5B 2026, CAGR 8.8%', url: 'https://www.mordorintelligence.com/industry-reports/duty-free-and-travel-retail-market' },
              { label: 'Pi Insight — Duty Free Competes for 1h10m Airport Dwell Time', url: 'https://www.linkedin.com/posts/pi-insight_travelretail-dutyfree-shopperbehaviour-activity-7450856841967869953-OGWq' },
              { label: 'Air Travel Design Guide — Schiphol Average Dwell Time 146 min per passenger', url: 'https://airtraveldesign.guide/Time' },
              { label: 'ScienceDirect — Dwell Time & Non-Aeronautical Revenue: 10% dwell = +8% retail sales', url: 'https://www.sciencedirect.com/science/article/pii/S0969699724000851' },
              { label: 'Kearney — Travel Retail & Geopolitical Realities 2024 (63% confidence with incentives)', url: 'https://www.kearney.com/industry/consumer-retail/article/travel-retail-amid-today-s-geopolitical-realities' },
              { label: 'm1nd-set Research — Solo Travel & Conversion Rates (71% achievable with incentives)', url: 'https://www.linkedin.com/posts/m1nd-set_m1nd-set-research-reveals-solo-travel-will-activity-7388090859046731776-3Gbn' },
              { label: 'ETRC — Economic Impact of Duty-Free & Travel Retail in Europe, April 2025 (€20–€28/pax)', url: 'https://etrc.org/wp-content/uploads/documents/ETRC-EU-Economic-Impact-of-Duty-Free-Travel-Retail-Report-April-2025-FINAL.pdf' },
              { label: 'TFWA Insight — Duty Free Spend Understanding Study 2024', url: 'https://www.tfwa.com/research/tfwa-insight/tfwa-insight-the-duty-free-spend-understanding-study-2024-100016689' },
              { label: 'LinkedIn — Airport DOOH & Digital Conversion Research (+8.5% conversion with digital)', url: 'https://www.linkedin.com/posts/linna-chen-a0055924a_dooh-programmaticadvertising-airportadvertising-activity-7394937993599488000-u16w' },
              { label: 'Market Growth Reports — Duty Free Travel Retail Market 2024 (62% digital capability)', url: 'https://www.marketgrowthreports.com/market-reports/duty-free-travel-retail-market-114899' },
            ].map((s, i) => (
              <a key={i} href={s.url} target="_blank" rel="noopener noreferrer"
                className="flex items-start gap-2 text-sm text-slate-500 hover:text-slate-300 transition-colors group">
                <ExternalLink className="w-3.5 h-3.5 shrink-0 mt-0.5 group-hover:text-orange-400" />
                {s.label}
              </a>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="bg-gradient-to-r from-orange-900/40 to-slate-900 border border-orange-700/50 rounded-2xl p-10 space-y-6 text-center">
          <Badge className="bg-orange-900/30 text-orange-300 border-orange-700 mx-auto">Ready to get started?</Badge>
          <h3 className="text-3xl font-heading font-bold">Pre-activated buyers. Higher baskets. Zero setup cost.</h3>
          <p className="text-slate-300 max-w-lg mx-auto">Join the DutyBoost retail network and start converting the travelers already walking past your store.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="mailto:hello@dutyboost.com">
              <Button className="gap-2 bg-orange-600 hover:bg-orange-700 text-base px-6 py-5">
                <Mail className="w-4 h-4" /> hello@dutyboost.com
              </Button>
            </a>
            <Link to="/travel-partner-presentation-dark">
              <Button variant="outline" className="gap-2 bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-800 text-base px-6 py-5">
                Travel Partner Guide <ArrowRight className="w-4 h-4" />
              </Button>
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