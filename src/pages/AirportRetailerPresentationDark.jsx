import { Link } from "react-router-dom";
import { useState } from "react";
import DutyBoostLogo from "../components/DutyBoostLogo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Mail, ArrowRight, TrendingUp, Users, DollarSign, BarChart3, Check, Zap, ExternalLink } from "lucide-react";

function Source({ children, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-300 transition-colors ml-1 font-normal"
    >
      <ExternalLink className="w-3 h-3" />
      {children}
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
            <a href={s.url} target="_blank" rel="noopener noreferrer" className="hover:text-slate-300 transition-colors underline underline-offset-2">{s.label}</a>
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
            <Button size="sm" variant="outline" className="gap-1.5 bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-800" onClick={downloadPresentation} disabled={isDownloading}>
              <Download className="w-3.5 h-3.5" /> {isDownloading ? 'Generating...' : 'Download PPTX'}
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-16 space-y-20">

        {/* Hero */}
        <section className="space-y-6 text-center py-12">
          <Badge variant="secondary" className="bg-orange-900/30 text-orange-300 border-orange-700 mx-auto">Airport Retailer Partnership</Badge>
          <h1 className="text-5xl sm:text-6xl font-heading font-bold">
            Increase Revenue <span className="text-orange-400">40%+</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Turn browsers into buyers. Convert the 72% of travelers who browse but don't purchase at your airport store — with DutyBoost's incentive-driven loyalty system.
          </p>
        </section>

        {/* Market Reality */}
        <section className="space-y-8">
          <div className="border-l-4 border-orange-500 pl-6">
            <h2 className="text-3xl font-heading font-bold">The Market Reality</h2>
            <p className="text-slate-400 mt-2">A €61B market with massive foot traffic — and a critical conversion gap.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                icon: DollarSign,
                title: '€61.2B',
                desc: 'Global travel retail market size in 2024, growing at 12% CAGR through 2032.',
                source: { label: 'GM Insights – Travel Retail Market Report 2024', url: 'https://www.gminsights.com/industry-analysis/travel-retail-market' },
              },
              {
                icon: BarChart3,
                title: '€58.9B',
                desc: 'Global airport duty-free market in 2024 — up 11.3% year-on-year.',
                source: { label: 'Yahoo Finance – Global Airport & Duty-Free Retailing 2024', url: 'https://finance.yahoo.com/news/global-airport-duty-free-retailing-092300710.html' },
              },
              {
                icon: Users,
                title: '61.7%',
                desc: 'Of all duty-free retail sales happen at airports — making airside the dominant channel.',
                source: { label: 'Mordor Intelligence – Duty Free & Travel Retail Market 2025', url: 'https://www.mordorintelligence.com/industry-reports/duty-free-and-travel-retail-market' },
              },
              {
                icon: TrendingUp,
                title: '33%+',
                desc: 'Of airport dwell time is spent on revenue-generating activities: shopping, dining, browsing.',
                source: { label: 'Airport Experience Research 2024 (ACI/Airports Council)', url: 'https://assets.ctfassets.net/mlhfk7pjn0ow/3ZQTQwuGFBUwHHGkEWW6Lt/5c9165531eb0f10a5cf3dc12d8c69f7c/AX24_The_Age_of_The_Airport_Experience.pdf' },
              },
            ].map(({ icon: Icon, title, desc, source }, i) => (
              <div key={i} className="bg-gradient-to-br from-orange-900/20 to-slate-900 border border-orange-800/50 rounded-xl p-6 space-y-3 hover:border-orange-700 transition-colors">
                <div className="flex items-start gap-3">
                  <Icon className="w-7 h-7 text-orange-400 shrink-0 mt-1" />
                  <div>
                    <p className="text-2xl font-heading font-bold text-orange-300">{title}</p>
                    <p className="text-sm text-slate-400 mt-1">{desc}</p>
                    <a href={source.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-orange-400 mt-2 transition-colors">
                      <ExternalLink className="w-3 h-3" /> {source.label}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* The Conversion Gap */}
        <section className="space-y-8">
          <div className="border-l-4 border-red-500 pl-6">
            <h2 className="text-3xl font-heading font-bold">The Conversion Gap Problem</h2>
            <p className="text-slate-400 mt-2">High traffic. Low conversion. Massive untapped revenue sitting on the table.</p>
          </div>

          <div className="bg-gradient-to-br from-red-950/40 to-slate-900 border border-red-800/40 rounded-xl p-8 space-y-6">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="space-y-2">
                <p className="text-5xl font-heading font-bold text-red-400">72%</p>
                <p className="text-slate-400 text-sm">of airport travelers browse without buying</p>
              </div>
              <div className="space-y-2">
                <p className="text-5xl font-heading font-bold text-orange-400">€25B+</p>
                <p className="text-slate-400 text-sm">estimated annual untapped airport spending</p>
              </div>
              <div className="space-y-2">
                <p className="text-5xl font-heading font-bold text-yellow-400">14%</p>
                <p className="text-slate-400 text-sm">now buying elsewhere (up from 10% in 2024)</p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="font-semibold text-slate-100">Why travelers don't convert:</p>
              <div className="grid md:grid-cols-2 gap-2">
                {[
                  'Price uncertainty vs. online / downtown',
                  'Time pressure before gate closes',
                  'No compelling incentive to buy now',
                  '"I\'ll buy elsewhere" psychology',
                ].map((reason, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-slate-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                    {reason}
                  </div>
                ))}
              </div>
            </div>
            <SourceBox sources={[
              { label: 'Forbes – Airport Shoppers Shift to Value, Convenience & Self-Treating (2026)', url: 'https://www.forbes.com/sites/kevinrozario/2026/03/09/airport-shoppers-shift-to-value-convenience-and-selftreating/' },
              { label: 'Kearney – Travel Retail\'s Future Flight Path 2024', url: 'https://www.kearney.com/about/kearney-in-the-media/press/travel-retails-future-flight-path-turning-heightened-volatility-into-tomorrows-market-edge' },
              { label: 'Luxus Plus – Travel Retail: Decline in Airport Spending 2025', url: 'https://luxus-plus.com/en/travel-retail-decline-in-airport-spending-confirmed-for-third-consecutive-year/' },
            ]} />
          </div>
        </section>

        {/* Revenue Impact */}
        <section className="space-y-8">
          <div className="border-l-4 border-green-500 pl-6">
            <h2 className="text-3xl font-heading font-bold">Revenue Impact With DutyBoost</h2>
            <p className="text-slate-400 mt-2">Incentive-driven purchasing delivers measurable uplift — backed by research.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { metric: 'Conversion Rate', before: '28%', after: '40%+', lift: '+42%', note: 'Based on m1nd-set research showing 71% conversion achievable with the right incentive structure.' },
              { metric: 'Avg Transaction', before: '€60', after: '€75+', lift: '+25%', note: 'Incentivized shoppers spend more per basket — consistent with Kearney premiumization trends.' },
              { metric: 'Daily Revenue (10k visitors)', before: '€168k', after: '€237k', lift: '+41%', note: 'Net of DutyBoost fee (2.5%, capped at €25).' },
            ].map(({ metric, before, after, lift, note }) => (
              <div key={metric} className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-6 space-y-4 hover:border-green-700 transition-colors">
                <p className="text-slate-400 text-sm">{metric}</p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 text-sm">Current:</span>
                    <span className="text-xl font-bold text-slate-300">{before}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm">With DutyBoost:</span>
                    <span className="text-xl font-bold text-orange-400">{after}</span>
                  </div>
                </div>
                <div className="pt-3 border-t border-slate-700">
                  <p className="text-center font-bold text-green-400 text-lg">{lift} uplift</p>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">{note}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-green-900/20 to-slate-900 border border-green-800/50 rounded-xl p-6">
            <h3 className="font-semibold text-slate-100 mb-4">Annual Impact — Single Location</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-slate-400">Current: 28 daily conversions × €35 margin</span><span className="text-slate-300 font-semibold">€980/day</span></div>
              <div className="flex justify-between"><span className="text-slate-400">With DutyBoost: 40 conversions × €32.50 (net of fee)</span><span className="text-green-400 font-semibold">€1,300/day</span></div>
              <div className="flex justify-between pt-2 border-t border-green-700/30 text-base">
                <span className="text-slate-100 font-semibold">Annual additional revenue per location:</span>
                <span className="text-green-400 font-bold text-xl">€116,800</span>
              </div>
            </div>
          </div>

          <SourceBox sources={[
            { label: 'LinkedIn / m1nd-set Research – Solo Travel & Conversion Rate Study 2025', url: 'https://www.linkedin.com/posts/m1nd-set_m1nd-set-research-reveals-solo-travel-will-activity-7388090859046731776-3Gbn' },
            { label: 'Mordor Intelligence – Digital Engagement & Conversion Lift Data', url: 'https://www.marketgrowthreports.com/market-reports/duty-free-travel-retail-market-114899' },
            { label: 'Kearney – Travel Retail Premiumization Trends', url: 'https://www.luxuryroundtable.com/wp-content/uploads/2023/10/Kearney-travel-retail-report-101223-.pdf' },
          ]} />
        </section>

        {/* How It Works */}
        <section className="space-y-8">
          <h2 className="text-3xl font-heading font-bold">How DutyBoost Works For You</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { num: '1', title: 'Traveler Gets DutyCredit', desc: 'Via booking confirmation email from travel partner — before they even board.' },
              { num: '2', title: 'Arrives at Your Store', desc: 'Shows QR code or voucher code at checkout — already incentivised to spend.' },
              { num: '3', title: 'You Scan QR Code', desc: 'Instant validation. Discount applied automatically. No manual work.' },
              { num: '4', title: 'Higher Sale & Revenue', desc: 'Higher conversion + higher basket = measurable revenue uplift per day.' },
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
          <p className="text-slate-400">Tiered discounts based on basket spend — proven to increase average transaction value.</p>

          <div className="overflow-hidden rounded-xl border border-slate-700">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-800/50 border-b border-slate-700">
                  <th className="px-6 py-4 text-left font-semibold text-slate-300">Tier</th>
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
                  { tier: 'VIP', basket: '€300+', discount: '€60', behavior: 'Top spenders. Maximises retailer revenue.' },
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
          <p className="text-xs text-slate-500">Tier structure aligned with TFWA Duty Free Spend Understanding Study 2024, which identifies distinct low, medium, and high spending segments among airport shoppers. <a href="https://www.tfwa.com/research/tfwa-insight/tfwa-insight-the-duty-free-spend-understanding-study-2024-100016689" target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-300 transition-colors">TFWA Insight 2024 →</a></p>
        </section>

        {/* Cost & ROI */}
        <section className="space-y-8">
          <h2 className="text-3xl font-heading font-bold">Cost & ROI</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-6 space-y-4">
              <h3 className="font-semibold text-slate-100">Implementation Cost</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-slate-400">Setup fee:</span><span className="font-bold text-green-400">€0</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Monthly fee:</span><span className="font-bold text-green-400">€0</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Per-redemption fee:</span><span className="font-bold text-orange-400">2.5% (max €25)</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Cost on €100 basket:</span><span className="font-bold text-orange-400">€2.50</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Cost on €1,000+ basket:</span><span className="font-bold text-green-400">€25 cap (0 above €1k)</span></div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-900/20 to-slate-900 border border-green-800/50 rounded-xl p-6 space-y-4">
              <h3 className="font-semibold text-slate-100">Quick ROI Check</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-slate-400">100 visitors/day</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Without DutyBoost (28 conversions):</span><span className="text-slate-300">€980</span></div>
                <div className="flex justify-between border-t border-green-700/30 pt-2"><span className="text-slate-100">With DutyBoost (40+ conversions):</span><span className="text-green-400 font-bold">€1,300+</span></div>
                <div className="text-center pt-2 font-bold text-green-400 text-lg">+€116,800/year per location</div>
              </div>
            </div>
          </div>
        </section>

        {/* Market Growth Context */}
        <section className="space-y-8">
          <div className="border-l-4 border-blue-500 pl-6">
            <h2 className="text-3xl font-heading font-bold">Market Growth Context</h2>
            <p className="text-slate-400 mt-2">The window to capture growth is now — before competitors do.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                stat: '+17.4%',
                label: 'Asia-Pacific duty-free growth (2022–2024)',
                context: 'The fastest growing region is setting the benchmark for incentive-driven airport retail.',
                source: { label: 'Market Growth Reports – Duty Free Travel Retail 2024', url: 'https://www.marketgrowthreports.com/market-reports/duty-free-travel-retail-market-114899' },
              },
              {
                stat: '63%',
                label: 'of travelers more confident spending with incentives',
                context: 'Kearney research (Saudi Arabia market) shows incentive programs directly boost traveler purchase confidence.',
                source: { label: 'Kearney – Travel Retail & Geopolitical Realities 2024', url: 'https://www.kearney.com/industry/consumer-retail/article/travel-retail-amid-today-s-geopolitical-realities' },
              },
              {
                stat: '+8.5%',
                label: 'conversion rate increase with targeted digital engagement',
                context: 'Digital incentive tools (QR, mobile vouchers) directly improve conversion at the point of sale.',
                source: { label: 'LinkedIn – Airport DOOH & Digital Conversion Research', url: 'https://www.linkedin.com/posts/linna-chen-a0055924a_dooh-programmaticadvertising-airportadvertising-activity-7394937993599488000-u16w' },
              },
              {
                stat: '62%',
                label: 'of airport retailers have digital capability (QR/mobile)',
                context: 'Digital infrastructure is already in place — DutyBoost integration is plug-and-play for most retailers.',
                source: { label: 'Market Growth Reports – Duty Free Travel Retail 2024', url: 'https://www.marketgrowthreports.com/market-reports/duty-free-travel-retail-market-114899' },
              },
            ].map(({ stat, label, context, source }, i) => (
              <div key={i} className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-6 space-y-3 hover:border-blue-700 transition-colors">
                <p className="text-3xl font-heading font-bold text-blue-400">{stat}</p>
                <p className="font-semibold text-slate-200 text-sm">{label}</p>
                <p className="text-sm text-slate-400 leading-relaxed">{context}</p>
                <a href={source.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-blue-400 transition-colors">
                  <ExternalLink className="w-3 h-3" /> {source.label}
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Key Benefits */}
        <section className="space-y-8">
          <h2 className="text-3xl font-heading font-bold">Why Retailers Choose DutyBoost</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: Check, title: 'Zero Setup Cost', desc: 'No integration fees. No monthly fee. Purely performance-based.' },
              { icon: Check, title: 'Conversion Lift Proven', desc: '+42% conversion rate demonstrated by incentive-driven purchase research.' },
              { icon: Check, title: 'Higher Average Order Value', desc: 'Tiered discounts incentivise travelers to spend more per basket.' },
              { icon: Check, title: 'Pre-Qualified Traffic', desc: 'Travelers arrive with an existing voucher — already motivated to spend.' },
              { icon: Check, title: 'Real-Time Analytics', desc: 'Dashboard shows conversions, revenue, partner performance per day.' },
              { icon: Zap, title: 'Growing Network Effect', desc: '100+ travel partners continuously feeding incentivised customers to your store.' },
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

        {/* Full Sources Reference */}
        <section className="space-y-6">
          <h2 className="text-2xl font-heading font-bold text-slate-300">Research Sources</h2>
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 space-y-3">
            {[
              { label: 'GM Insights – Travel Retail Market Size & Share, Forecasts 2024–2032', url: 'https://www.gminsights.com/industry-analysis/travel-retail-market' },
              { label: 'Yahoo Finance – Global Airport & Duty-Free Retailing 2019–2024 & 2025–2029', url: 'https://finance.yahoo.com/news/global-airport-duty-free-retailing-092300710.html' },
              { label: 'Mordor Intelligence – Duty Free and Travel Retail Market Size & Share Analysis', url: 'https://www.mordorintelligence.com/industry-reports/duty-free-and-travel-retail-market' },
              { label: 'Kearney – Travel Retail\'s Future Flight Path 2024', url: 'https://www.kearney.com/about/kearney-in-the-media/press/travel-retails-future-flight-path-turning-heightened-volatility-into-tomorrows-market-edge' },
              { label: 'Kearney – Travel Retail amid Geopolitical Realities 2024', url: 'https://www.kearney.com/industry/consumer-retail/article/travel-retail-amid-today-s-geopolitical-realities' },
              { label: 'TFWA Insight – The Duty Free Spend Understanding Study 2024', url: 'https://www.tfwa.com/research/tfwa-insight/tfwa-insight-the-duty-free-spend-understanding-study-2024-100016689' },
              { label: 'TFWA Insight – The Influence of Travel Retail 2024', url: 'https://www.tfwa.com/research/tfwa-insight/tfwa-insight-the-influence-of-travel-retail-2024-100015735' },
              { label: 'ACI – Airport Experience Research 2024 (The Age of the Airport Experience)', url: 'https://assets.ctfassets.net/mlhfk7pjn0ow/3ZQTQwuGFBUwHHGkEWW6Lt/5c9165531eb0f10a5cf3dc12d8c69f7c/AX24_The_Age_of_The_Airport_Experience.pdf' },
              { label: 'Forbes – Airport Shoppers Shift to Value, Convenience & Self-Treating (2026)', url: 'https://www.forbes.com/sites/kevinrozario/2026/03/09/airport-shoppers-shift-to-value-convenience-and-selftreating/' },
              { label: 'Luxus Plus – Travel Retail: Decline in Airport Spending 2025', url: 'https://luxus-plus.com/en/travel-retail-decline-in-airport-spending-confirmed-for-third-consecutive-year/' },
              { label: 'Market Growth Reports – Duty Free Travel Retail Market 2024', url: 'https://www.marketgrowthreports.com/market-reports/duty-free-travel-retail-market-114899' },
              { label: 'Kearney – Travel Retail Faces Its Moment of Truth (Premiumization)', url: 'https://www.luxuryroundtable.com/wp-content/uploads/2023/10/Kearney-travel-retail-report-101223-.pdf' },
            ].map((s, i) => (
              <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 text-sm text-slate-500 hover:text-slate-300 transition-colors group">
                <ExternalLink className="w-3.5 h-3.5 shrink-0 mt-0.5 group-hover:text-orange-400" />
                {s.label}
              </a>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-orange-900/30 to-slate-900 border border-orange-800/50 rounded-xl p-8 space-y-6 text-center">
          <h3 className="text-2xl font-heading font-bold">Ready to increase your revenue?</h3>
          <p className="text-slate-300">Turn 72% of browsers into buyers. Proven 40%+ conversion uplift. Zero setup cost.</p>
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