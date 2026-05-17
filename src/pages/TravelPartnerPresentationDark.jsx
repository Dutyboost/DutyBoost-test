import { Link } from "react-router-dom";
import { useState } from "react";
import DutyBoostLogo from "../components/DutyBoostLogo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Mail, ArrowRight, TrendingUp, Users, Globe, Plane, Zap, Star, Gift, BarChart3, Check, ExternalLink, ChevronRight } from "lucide-react";

function SrcLink({ href, children }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-blue-400 mt-2 transition-colors">
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
          <Badge className="bg-blue-900/30 text-blue-300 border-blue-700 mx-auto">Travel Partner Program</Badge>
          <h1 className="text-5xl sm:text-6xl font-heading font-bold leading-tight">
            Every booking you make<br />
            <span className="text-blue-400">already contains untapped value.</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            DutyBoost turns your existing booking flow into a loyalty engine and a passive commission stream — delivered automatically, at zero cost to you or your traveler.
          </p>
          <div className="flex flex-wrap gap-3 justify-center pt-2">
            {['Zero setup cost', 'No operational work', 'Real traveler benefit', 'Monthly commission'].map(t => (
              <span key={t} className="px-3 py-1.5 rounded-full bg-blue-900/30 border border-blue-700/50 text-blue-300 text-sm font-medium">{t}</span>
            ))}
          </div>
        </section>

        {/* ── WHY DUTYBOOST — THE SCALE OF THE OPPORTUNITY ── */}
        <section className="space-y-8">
          <div className="border-l-4 border-blue-500 pl-6">
            <p className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-1">Why DutyBoost</p>
            <h2 className="text-3xl font-heading font-bold">The world is flying — and spending</h2>
            <p className="text-slate-400 mt-2">
              Global air travel hit a new record in 2024. Every one of those 4.8 billion journeys passes through an airport retail environment. Most of the spending opportunity goes untapped.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                icon: Globe,
                stat: '4.8B',
                label: 'Air passengers worldwide in 2024',
                detail: 'IATA confirmed 4.8 billion segment passengers in 2024 — a 10.6% year-on-year surge, setting an all-time record for global aviation.',
                color: 'blue',
                src: { label: 'IATA Annual Review 2025 — Global Air Passenger Traffic 2024', url: 'https://www.iata.org/contentassets/c81222d96c9a4e0bb4ff6ced0126f0bb/iata-annual-review-2025.pdf' },
              },
              {
                icon: Plane,
                stat: '68.8M',
                label: 'Passengers through Schiphol alone in 2025',
                detail: 'Amsterdam Schiphol handled 68.8 million travellers in 2025 (+2.9% YoY). That is 188,000 travellers per day, 1.3 million per week, 5.7 million per month — all passing through a single airport\'s retail zone.',
                color: 'blue',
                src: { label: 'Schiphol Group — Annual Traffic Review 2025', url: 'https://airportindustry-news.com/schiphol-airport-handles-68-8-million-passengers-in-2025/' },
              },
              {
                icon: BarChart3,
                stat: '€68.2B',
                label: 'Global duty-free & travel retail market 2024',
                detail: 'The global duty-free and travel retail market reached €68.2 billion in 2024, growing at 8.8% CAGR — a market driven entirely by the travelers your bookings generate.',
                color: 'blue',
                src: { label: 'LinkedIn Market Research — Global Duty-Free & Travel Retail 2024', url: 'https://www.linkedin.com/pulse/global-duty-free-travel-retail-market-growth-analysis-tcnme' },
              },
              {
                icon: TrendingUp,
                stat: '1h 10m',
                label: 'Average traveler dwell time in airport departures',
                detail: 'After security, the average traveller has 1 hour and 10 minutes of purchase-ready time in departures. At Schiphol specifically, dwell time averages 146 minutes per passenger — one of the longest in Europe.',
                color: 'blue',
                src: { label: 'Pi Insight — Duty Free Competes for 1h10m Airport Dwell Time', url: 'https://www.linkedin.com/posts/pi-insight_travelretail-dutyfree-shopperbehaviour-activity-7450856841967869953-OGWq' },
              },
            ].map(({ icon: Icon, stat, label, detail, color, src }, i) => (
              <div key={i} className="bg-gradient-to-br from-blue-900/20 to-slate-900 border border-blue-800/40 rounded-xl p-6 space-y-3 hover:border-blue-600 transition-colors">
                <div className="flex items-start gap-3">
                  <Icon className="w-6 h-6 text-blue-400 shrink-0 mt-1" />
                  <div>
                    <p className="text-3xl font-heading font-bold text-blue-300">{stat}</p>
                    <p className="text-sm font-semibold text-slate-200 mt-0.5">{label}</p>
                    <p className="text-sm text-slate-400 mt-2 leading-relaxed">{detail}</p>
                    <SrcLink href={src.url}>{src.label}</SrcLink>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Schiphol Breakdown Box */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-6">
            <p className="text-sm font-bold text-slate-300 uppercase tracking-widest mb-4">Schiphol Airport — Passenger Traffic Breakdown (2025)</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {[
                { period: 'Daily', value: '188,500', sub: 'avg. travelers/day' },
                { period: 'Weekly', value: '1.32M', sub: 'travelers/week' },
                { period: 'Monthly', value: '5.73M', sub: 'travelers/month' },
                { period: 'Yearly', value: '68.8M', sub: 'travelers in 2025' },
              ].map(({ period, value, sub }) => (
                <div key={period} className="space-y-1">
                  <p className="text-xs text-slate-500 uppercase tracking-wider">{period}</p>
                  <p className="text-2xl font-heading font-bold text-blue-300">{value}</p>
                  <p className="text-xs text-slate-500">{sub}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-4">Source: Schiphol Group Annual Traffic Review 2025 · 68.8M ÷ 365 days = 188,493/day</p>
          </div>
        </section>

        {/* ── WHY DUTYBOOST — THE CONVERSION OPPORTUNITY ── */}
        <section className="space-y-8">
          <div className="border-l-4 border-green-500 pl-6">
            <p className="text-xs font-bold uppercase tracking-widest text-green-400 mb-1">Why DutyBoost</p>
            <h2 className="text-3xl font-heading font-bold">The conversion opportunity hiding in plain sight</h2>
            <p className="text-slate-400 mt-2">
              The gap between who walks through an airport and who actually buys is enormous. DutyBoost closes that gap — and turns it into value for your travelers and commission for you.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              { stat: '28%', color: 'text-slate-300', label: 'Typical airport retail conversion without incentives', detail: 'Only about 1 in 4 browsing travelers makes a purchase without a compelling reason to act now.' },
              { stat: '63%', color: 'text-green-400', label: 'More confident spending when incentives are in place', detail: 'Kearney research shows that travellers are 63% more likely to purchase at airport retail when they have a pre-activation incentive.', src: { label: 'Kearney — Travel Retail & Geopolitical Realities 2024', url: 'https://www.kearney.com/industry/consumer-retail/article/travel-retail-amid-today-s-geopolitical-realities' } },
              { stat: '71%', color: 'text-blue-400', label: 'Conversion achievable with the right incentive structure', detail: 'm1nd-set research confirms that targeted, pre-departure incentives can drive conversion rates as high as 71% among motivated travelers.', src: { label: 'm1nd-set Research — Solo Travel & Conversion Rates 2025', url: 'https://www.linkedin.com/posts/m1nd-set_m1nd-set-research-reveals-solo-travel-will-activity-7388090859046731776-3Gbn' } },
            ].map(({ stat, color, label, detail, src }, i) => (
              <div key={i} className="bg-slate-800/60 border border-slate-700 rounded-xl p-5 space-y-3 hover:border-green-700 transition-colors">
                <p className={`text-4xl font-heading font-bold ${color}`}>{stat}</p>
                <p className="text-sm font-semibold text-slate-200">{label}</p>
                <p className="text-xs text-slate-400 leading-relaxed">{detail}</p>
                {src && <SrcLink href={src.url}>{src.label}</SrcLink>}
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-green-900/20 to-slate-900 border border-green-800/40 rounded-xl p-6 space-y-3">
            <p className="font-semibold text-slate-100">The DutyBoost difference: activation happens <em>before</em> the airport</p>
            <p className="text-sm text-slate-400 leading-relaxed">
              Most loyalty tools activate at the point of sale. DutyBoost activates the moment a booking is confirmed — days or weeks before the traveler arrives. This means your traveler arrives at the airport already thinking about where to spend their DutyCredit, not deciding whether to shop at all. Pre-activation is the single biggest driver of conversion uplift.
            </p>
          </div>
        </section>

        {/* ── HOW DUTYBOOST WORKS ── */}
        <section className="space-y-8">
          <div className="border-l-4 border-blue-500 pl-6">
            <p className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-1">How DutyBoost</p>
            <h2 className="text-3xl font-heading font-bold">Four steps. Zero friction.</h2>
            <p className="text-slate-400 mt-2">The entire experience runs automatically from a single API call per booking.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            {[
              { num: '1', title: 'Booking Confirmed', desc: 'Your customer completes a booking. A single webhook or API call triggers DutyBoost — no manual input from your team.' },
              { num: '2', title: 'DutyCredit Issued', desc: 'A personalized QR code is instantly generated and embedded in the booking confirmation email. No app. No registration.' },
              { num: '3', title: 'Traveler Arrives Activated', desc: 'Your traveler reaches the airport already knowing they have a credit to spend — walking into partner stores with real purchase intent.' },
              { num: '4', title: 'You Earn Commission', desc: 'When the DutyCredit is redeemed, you automatically earn 20% of DutyBoost\'s 2,5% platform fee — up to €5 per transaction, paid monthly.' },
            ].map(({ num, title, desc }) => (
              <div key={num} className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-5 space-y-3 hover:border-blue-600 transition-colors">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-heading font-bold text-white text-lg">{num}</div>
                <p className="font-semibold text-slate-100">{title}</p>
                <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          {/* DutyCredit Tiers */}
          <div className="overflow-hidden rounded-xl border border-slate-700">
            <div className="bg-slate-800/60 px-6 py-4 border-b border-slate-700">
              <p className="font-semibold text-slate-200">DutyCredit Discount Tiers — What Your Travelers Receive</p>
              <p className="text-xs text-slate-400 mt-1">Tiered incentives proven to drive higher basket spend at partner airport stores</p>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-900/40">
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Tier</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Min. Basket</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Traveler Saves</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Your Commission</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { tier: '🟡 Boarding', basket: '€70–€99', saving: '€5–€10', comm: 'up to €2.50', row: 'bg-yellow-900/10' },
                  { tier: '🔵 Priority', basket: '€100–€199', saving: '€10–€30', comm: 'up to €5', row: 'bg-blue-900/10' },
                  { tier: '🟢 Lounge', basket: '€200–€299', saving: '€30–€60', comm: 'up to €5', row: 'bg-green-900/10' },
                  { tier: '🟣 VIP', basket: '€300+', saving: '€60 flat', comm: 'up to €5 (capped)', row: 'bg-purple-900/10' },
                ].map(({ tier, basket, saving, comm, row }) => (
                  <tr key={tier} className={`border-b border-slate-700/50 ${row} hover:bg-slate-800/40 transition-colors`}>
                    <td className="px-6 py-4 font-semibold text-slate-100 text-sm">{tier}</td>
                    <td className="px-6 py-4 text-slate-400 text-sm">{basket}</td>
                    <td className="px-6 py-4 font-semibold text-blue-400 text-sm">{saving}</td>
                    <td className="px-6 py-4 font-semibold text-green-400 text-sm">{comm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── WHAT DUTYBOOST BRINGS — REVENUE MODEL ── */}
        <section className="space-y-8">
          <div className="border-l-4 border-green-500 pl-6">
            <p className="text-xs font-bold uppercase tracking-widest text-green-400 mb-1">What DutyBoost Brings</p>
            <h2 className="text-3xl font-heading font-bold">A new revenue stream — from bookings you already have</h2>
            <p className="text-slate-400 mt-2">No new customers. No new effort. Just a new revenue layer on top of what you do every day.</p>
          </div>

          {/* Revenue Calculator */}
          <div className="bg-gradient-to-br from-green-900/20 to-slate-900 border border-green-800/50 rounded-xl p-8">
            <p className="text-sm font-bold text-slate-300 uppercase tracking-widest mb-6">Revenue Model — Mid-Size Travel Partner (100,000 annual bookings)</p>
            <div className="space-y-2 text-sm">
              {[
                { label: 'Annual bookings', val: '100,000' },
                { label: 'DutyCredits issued (100% of bookings, automated)', val: '100,000' },
                { label: 'Estimated redemption rate (industry avg 18–22%)', val: '~20,000 redemptions' },
                { label: 'Average basket spend at airport store', val: '€135 (mid-tier)' },
                { label: 'DutyBoost fee per transaction (2,5%, max €25)', val: '€3.38 avg' },
                { label: 'Your commission (20% of platform fee)', val: '€0.67 avg per tx' },
              ].map(({ label, val }) => (
                <div key={label} className="flex justify-between items-center py-2.5 border-b border-slate-700/40">
                  <span className="text-slate-400">{label}</span>
                  <span className="font-semibold text-slate-200 text-right">{val}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 grid md:grid-cols-2 gap-4">
              <div className="flex justify-between items-center py-3 px-4 bg-green-900/30 rounded-lg border border-green-700/50">
                <span className="font-semibold text-slate-100">Annual Commission</span>
                <span className="text-2xl font-heading font-bold text-green-400">~€13,400</span>
              </div>
              <div className="flex justify-between items-center py-3 px-4 bg-blue-900/30 rounded-lg border border-blue-700/50">
                <span className="font-semibold text-slate-100">Cost to You</span>
                <span className="text-2xl font-heading font-bold text-blue-400">€0</span>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-4">Calculation based on 20% redemption rate · 20% of DutyBoost's 2,5% platform fee · avg €135 basket. Scales proportionally with booking volume and redemption rate. Commission capped at €5/tx.</p>
          </div>

          {/* Scaling table */}
          <div className="overflow-hidden rounded-xl border border-slate-700">
            <div className="bg-slate-800/60 px-6 py-4 border-b border-slate-700">
              <p className="font-semibold text-slate-200">Commission at Scale — Annual Estimates</p>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-900/40">
                  <th className="px-5 py-3 text-left text-xs font-semibold text-slate-400 uppercase">Annual Bookings</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-slate-400 uppercase">Redemptions (20%)</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-slate-400 uppercase">Est. Annual Commission</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { bookings: '10,000', redeem: '2,000', comm: '~€1,340' },
                  { bookings: '50,000', redeem: '10,000', comm: '~€6,700' },
                  { bookings: '100,000', redeem: '20,000', comm: '~€13,400' },
                  { bookings: '500,000', redeem: '100,000', comm: '~€67,000' },
                  { bookings: '1,000,000', redeem: '200,000', comm: '~€134,000' },
                ].map(({ bookings, redeem, comm }) => (
                  <tr key={bookings} className="border-b border-slate-700/50 hover:bg-slate-800/30 transition-colors">
                    <td className="px-5 py-3.5 text-slate-300 font-medium">{bookings}</td>
                    <td className="px-5 py-3.5 text-slate-400">{redeem}</td>
                    <td className="px-5 py-3.5 font-bold text-green-400">{comm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── WHAT DUTYBOOST BRINGS — LOYALTY & TRAVELER VALUE ── */}
        <section className="space-y-8">
          <div className="border-l-4 border-blue-500 pl-6">
            <p className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-1">What DutyBoost Brings</p>
            <h2 className="text-3xl font-heading font-bold">Loyalty your travelers actually feel</h2>
            <p className="text-slate-400 mt-2">Not points. Not cashback on the next booking. Real value — at the airport, when it matters most.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: Gift,
                title: 'A benefit tied to the booking moment',
                desc: 'The DutyCredit arrives in the booking confirmation email — the moment customer excitement is highest. No extra steps. Instant perceived value.',
              },
              {
                icon: Star,
                title: 'Differentiation competitors don\'t have',
                desc: 'While competitors offer miles or discounts on the next booking, you offer something tangible and immediate. A reason to choose you today.',
              },
              {
                icon: Users,
                title: 'Higher repeat booking rate',
                desc: 'Research shows that memorable, positive airport experiences tied to a brand drive repeat bookings. DutyBoost makes your brand the reason they enjoyed the airport.',
              },
              {
                icon: TrendingUp,
                title: 'Average spend per redeemed traveler: €135',
                desc: 'European ETRC data shows duty-free spend of €20–€28 per departing passenger on average. With a DutyCredit active, basket sizes rise significantly into our €100–€200 tier.',
                src: { label: 'ETRC — Economic Impact of Duty-Free & Travel Retail in Europe, April 2025', url: 'https://etrc.org/wp-content/uploads/documents/ETRC-EU-Economic-Impact-of-Duty-Free-Travel-Retail-Report-April-2025-FINAL.pdf' },
              },
            ].map(({ icon: Icon, title, desc, src }, i) => (
              <div key={i} className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-6 space-y-3 hover:border-blue-600 transition-colors">
                <div className="flex items-start gap-3">
                  <Icon className="w-6 h-6 text-blue-400 shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-slate-100">{title}</p>
                    <p className="text-sm text-slate-400 mt-1 leading-relaxed">{desc}</p>
                    {src && <SrcLink href={src.url}>{src.label}</SrcLink>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── WHAT DUTYBOOST BRINGS — FULL VALUE SUMMARY ── */}
        <section className="space-y-8">
          <div className="border-l-4 border-green-500 pl-6">
            <p className="text-xs font-bold uppercase tracking-widest text-green-400 mb-1">What DutyBoost Brings</p>
            <h2 className="text-3xl font-heading font-bold">Everything you gain. Nothing you lose.</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              { icon: Check, title: 'Passive commission revenue', desc: 'Up to €5/redemption paid monthly by DutyBoost — no invoicing, no chasing, fully automated.' },
              { icon: Check, title: 'Exclusive loyalty differentiator', desc: 'A real airport shopping benefit competitors don\'t offer. Instant brand perception uplift.' },
              { icon: Check, title: 'Zero cost — ever', desc: 'DutyBoost is 100% free for travel partners. Commission is paid out of DutyBoost\'s own platform fee, not by you or your traveler.' },
              { icon: Check, title: 'One integration, permanent value', desc: 'Single API call or webhook per booking. Once integrated, the system runs indefinitely with no maintenance.' },
              { icon: Check, title: 'Real-time performance dashboard', desc: 'See which bookings generate DutyCredits, which airports convert best, and your total commission earned — in real time.' },
              { icon: Zap, title: 'Network effect advantage', desc: 'As the DutyBoost airport retailer network grows, your travelers\' benefit grows too — more stores, more airports, higher perceived value.' },
            ].map(({ icon: Icon, title, desc }, i) => (
              <div key={i} className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-5 space-y-2 hover:border-blue-600 transition-colors">
                <div className="flex items-start gap-3">
                  <Icon className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-slate-100 text-sm">{title}</p>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">{desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SOURCES ── */}
        <section className="space-y-4">
          <h2 className="text-xl font-heading font-bold text-slate-400">Research Sources</h2>
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 space-y-2.5">
            {[
              { label: 'IATA Annual Review 2025 — Global air passenger traffic 4.8B in 2024 (+10.6% YoY)', url: 'https://www.iata.org/contentassets/c81222d96c9a4e0bb4ff6ced0126f0bb/iata-annual-review-2025.pdf' },
              { label: 'Schiphol Group — 68.8M passengers in 2025 (+2.9% YoY)', url: 'https://airportindustry-news.com/schiphol-airport-handles-68-8-million-passengers-in-2025/' },
              { label: 'LinkedIn Market Research — Global Duty-Free & Travel Retail Market $68.2B 2024', url: 'https://www.linkedin.com/pulse/global-duty-free-travel-retail-market-growth-analysis-tcnme' },
              { label: 'Pi Insight — Duty Free Competes for 1h10m Airport Dwell Time', url: 'https://www.linkedin.com/posts/pi-insight_travelretail-dutyfree-shopperbehaviour-activity-7450856841967869953-OGWq' },
              { label: 'Air Travel Design Guide — Schiphol Average Dwell Time 146 min per passenger', url: 'https://airtraveldesign.guide/Time' },
              { label: 'Kearney — Travel Retail & Geopolitical Realities 2024 (63% incentive confidence)', url: 'https://www.kearney.com/industry/consumer-retail/article/travel-retail-amid-today-s-geopolitical-realities' },
              { label: 'm1nd-set Research — Solo Travel & Conversion Rates (71% with incentives)', url: 'https://www.linkedin.com/posts/m1nd-set_m1nd-set-research-reveals-solo-travel-will-activity-7388090859046731776-3Gbn' },
              { label: 'ETRC — Economic Impact of Duty-Free & Travel Retail in Europe, April 2025', url: 'https://etrc.org/wp-content/uploads/documents/ETRC-EU-Economic-Impact-of-Duty-Free-Travel-Retail-Report-April-2025-FINAL.pdf' },
              { label: 'TFWA Insight — Duty Free Spend Understanding Study 2024', url: 'https://www.tfwa.com/research/tfwa-insight/tfwa-insight-the-duty-free-spend-understanding-study-2024-100016689' },
              { label: 'GM Insights — Travel Retail Market Size 2024–2032 (12% CAGR)', url: 'https://www.gminsights.com/industry-analysis/travel-retail-market' },
            ].map((s, i) => (
              <a key={i} href={s.url} target="_blank" rel="noopener noreferrer"
                className="flex items-start gap-2 text-sm text-slate-500 hover:text-slate-300 transition-colors group">
                <ExternalLink className="w-3.5 h-3.5 shrink-0 mt-0.5 group-hover:text-blue-400" />
                {s.label}
              </a>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="bg-gradient-to-r from-blue-900/40 to-slate-900 border border-blue-700/50 rounded-2xl p-10 space-y-6 text-center">
          <Badge className="bg-blue-900/30 text-blue-300 border-blue-700 mx-auto">Ready to get started?</Badge>
          <h3 className="text-3xl font-heading font-bold">Turn every booking into a loyalty moment and a revenue stream.</h3>
          <p className="text-slate-300 max-w-lg mx-auto">Zero cost. One integration. Passive commission — for as long as your travelers fly.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="mailto:hello@dutyboost.com">
              <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-base px-6 py-5">
                <Mail className="w-4 h-4" /> hello@dutyboost.com
              </Button>
            </a>
            <Link to="/retailer-presentation-dark">
              <Button variant="outline" className="gap-2 bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-800 text-base px-6 py-5">
                View Retailer Guide <ArrowRight className="w-4 h-4" />
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