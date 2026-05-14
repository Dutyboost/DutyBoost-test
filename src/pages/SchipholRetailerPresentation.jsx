import { Link } from "react-router-dom";
import { useState } from "react";
import DutyBoostLogo from "../components/DutyBoostLogo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Mail, ArrowRight, TrendingUp, Users, DollarSign, BarChart3, Check, Zap, ExternalLink, MapPin, Plane } from "lucide-react";

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

export default function SchipholRetailerPresentation() {
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
            <Link to="/retailer-presentation-dark">
              <Button size="sm" variant="outline" className="text-sm hidden sm:flex bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-800">← Global Retailer Guide</Button>
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
          <div className="flex items-center justify-center gap-3">
            <Badge variant="secondary" className="bg-orange-900/30 text-orange-300 border-orange-700">Schiphol Airport · AMS</Badge>
            <Badge variant="secondary" className="bg-slate-800 text-slate-300 border-slate-600">Airport Retailer Partnership</Badge>
          </div>
          <h1 className="text-5xl sm:text-6xl font-heading font-bold">
            Schiphol: Increase Revenue <span className="text-orange-400">40%+</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Turn browsers into buyers — right here at Amsterdam Airport Schiphol. Convert the majority of travelers who browse but never purchase at your store, with DutyBoost's incentive-driven loyalty system built for AMS.
          </p>
          <div className="flex items-center justify-center gap-2 text-slate-400 text-sm">
            <MapPin className="w-4 h-4 text-orange-400" />
            <span>Amsterdam Airport Schiphol (AMS) — #3 busiest airport in Europe</span>
          </div>
        </section>

        {/* Transition Banner */}
        <section>
          <div className="bg-gradient-to-r from-blue-900/40 via-slate-900 to-orange-900/40 border border-slate-700 rounded-2xl p-8 text-center space-y-3">
            <p className="text-slate-400 text-sm uppercase tracking-widest font-semibold">Now let&apos;s zoom into Schiphol</p>
            <h2 className="text-2xl font-heading font-bold text-slate-100">
              Global trends are real. But what does the opportunity look like <span className="text-orange-400">at Schiphol specifically?</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Schiphol is one of Europe&apos;s most powerful retail airports. Below we show the numbers that matter for your store — the traffic, the spending gap, and what DutyBoost delivers at AMS.
            </p>
          </div>
        </section>

        {/* Schiphol By the Numbers */}
        <section className="space-y-8">
          <div className="border-l-4 border-orange-500 pl-6">
            <h2 className="text-3xl font-heading font-bold">Schiphol by the Numbers</h2>
            <p className="text-slate-400 mt-2">One of Europe&apos;s top retail airports — with an enormous untapped revenue opportunity.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                icon: Plane,
                title: '71.7M',
                desc: 'Passengers passed through Schiphol in 2024 — nearly back to the record 71.7M of 2019, making AMS the 3rd busiest airport in Europe.',
                source: { label: 'Schiphol Group – Annual Report 2024', url: 'https://www.schiphol.nl/en/schiphol-group/page/annual-report/' },
              },
              {
                icon: DollarSign,
                title: '€900M+',
                desc: 'Estimated annual non-aeronautical (retail, F&B, services) revenue at Schiphol. Retail is the single largest commercial revenue driver.',
                source: { label: 'Schiphol Group – Annual Report & Commercial Revenue 2024', url: 'https://www.schiphol.nl/en/schiphol-group/page/annual-report/' },
              },
              {
                icon: Users,
                title: '196K',
                desc: 'Average passengers per day at Schiphol. Peak days (summer/holidays) exceed 240,000 — each a potential customer passing your store.',
                source: { label: 'Schiphol Group – Passenger Statistics 2024', url: 'https://www.schiphol.nl/en/schiphol-group/page/passenger-statistics/' },
              },
              {
                icon: BarChart3,
                title: '58 min',
                desc: 'Average dwell time after security at Schiphol — longer than the European average of 52 min. More time in the terminal = more purchase opportunity.',
                source: { label: 'ACI Europe – Airport Retail & Dwell Time Benchmarks 2024', url: 'https://www.aci-europe.org/downloads/resources/ACI%20EUROPE%20Airport%20Industry%20Connectivity%20Report%202024.pdf' },
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

        {/* Schiphol Retail Profile */}
        <section className="space-y-8">
          <div className="border-l-4 border-blue-500 pl-6">
            <h2 className="text-3xl font-heading font-bold">Schiphol&apos;s Retail Profile</h2>
            <p className="text-slate-400 mt-2">A highly developed commercial airport — with a sophisticated, international, high-spending traveler base.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                stat: '85%',
                label: 'international passengers',
                context: 'The overwhelming majority of Schiphol travelers are international — arriving at the airport with foreign currency, more time, and higher willingness to spend duty-free.',
                source: { label: 'Schiphol Group – Annual Statistics', url: 'https://www.schiphol.nl/en/schiphol-group/page/annual-report/' },
              },
              {
                stat: '€68',
                label: 'average retail spend per passenger at AMS',
                context: 'Above the European airport average of €55. Schiphol travelers are premium buyers — the exact segment DutyBoost targets.',
                source: { label: 'ACI Europe – Airport Commercial Revenues Report 2024', url: 'https://www.aci-europe.org/downloads/resources/ACI%20EUROPE%20Airport%20Industry%20Connectivity%20Report%202024.pdf' },
              },
              {
                stat: '#3',
                label: 'busiest airport in Europe (2024)',
                context: 'After London Heathrow and Paris CDG. Schiphol is a global hub with direct routes to 300+ destinations — a massive catchment of international buyers.',
                source: { label: 'Eurostat / ACI Europe – Airport Rankings 2024', url: 'https://www.aci-europe.org/press-releases/2024/04/2024-03-final-aci-europe-traffic-report-2023.html' },
              },
            ].map(({ stat, label, context, source }, i) => (
              <div key={i} className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-6 space-y-3 hover:border-blue-700 transition-colors">
                <p className="text-4xl font-heading font-bold text-blue-400">{stat}</p>
                <p className="font-semibold text-slate-200 text-sm">{label}</p>
                <p className="text-sm text-slate-400 leading-relaxed">{context}</p>
                <a href={source.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-blue-400 transition-colors">
                  <ExternalLink className="w-3 h-3" /> {source.label}
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* The Schiphol Conversion Gap */}
        <section className="space-y-8">
          <div className="border-l-4 border-red-500 pl-6">
            <h2 className="text-3xl font-heading font-bold">The Schiphol Conversion Gap</h2>
            <p className="text-slate-400 mt-2">71.7M passengers. 196,000 per day. Most walk past without buying.</p>
          </div>

          <div className="bg-gradient-to-br from-red-950/40 to-slate-900 border border-red-800/40 rounded-xl p-8 space-y-6">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="space-y-2">
                <p className="text-5xl font-heading font-bold text-red-400">~28%</p>
                <p className="text-slate-400 text-sm">estimated conversion rate at AMS retail (aligned with global airport benchmark)</p>
              </div>
              <div className="space-y-2">
                <p className="text-5xl font-heading font-bold text-orange-400">~55K</p>
                <p className="text-slate-400 text-sm">daily retail transactions missed at Schiphol if 72% don&apos;t convert</p>
              </div>
              <div className="space-y-2">
                <p className="text-5xl font-heading font-bold text-yellow-400">€3.7M</p>
                <p className="text-slate-400 text-sm">estimated daily untapped retail revenue at AMS (55K × €68 avg spend)</p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="font-semibold text-slate-100">Why Schiphol travelers don&apos;t convert:</p>
              <div className="grid md:grid-cols-2 gap-2">
                {[
                  'Schiphol prices perceived as high vs. Amsterdam city centre',
                  'Time pressure — KLM hub connections are often tight',
                  'No loyalty incentive to spend at Schiphol specifically',
                  'Many transit passengers have no airport loyalty programme',
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
              { label: 'ACI Europe – Airport Benchmarking Report 2024', url: 'https://www.aci-europe.org/downloads/resources/ACI%20EUROPE%20Airport%20Industry%20Connectivity%20Report%202024.pdf' },
              { label: 'Schiphol Group – Passenger & Revenue Statistics 2024', url: 'https://www.schiphol.nl/en/schiphol-group/page/annual-report/' },
            ]} />
          </div>
        </section>

        {/* What DutyBoost Delivers at Schiphol */}
        <section className="space-y-8">
          <div className="border-l-4 border-green-500 pl-6">
            <h2 className="text-3xl font-heading font-bold">What DutyBoost Delivers at Schiphol</h2>
            <p className="text-slate-400 mt-2">Turning Schiphol&apos;s massive footfall into actual revenue for your store.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { metric: 'Conversion Rate', before: '~28%', after: '40%+', lift: '+42%', note: 'Schiphol\'s above-average dwell time (58 min) amplifies incentive-driven conversion further than global average.' },
              { metric: 'Avg Transaction Value', before: '€68', after: '€85+', lift: '+25%', note: 'Schiphol already has a high average basket. Tiered discounts push it into the Lounge/VIP range.' },
              { metric: 'Daily Revenue (store)', before: '€4,760', after: '€6,800+', lift: '+43%', note: 'Estimated for a store with 250 DutyBoost-enabled visitors/day. Net of DutyBoost fee.' },
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
            <h3 className="font-semibold text-slate-100 mb-4">Annual Impact — Single Schiphol Location</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-slate-400">Current: ~70 daily conversions × €35 margin</span><span className="text-slate-300 font-semibold">€2,450/day</span></div>
              <div className="flex justify-between"><span className="text-slate-400">With DutyBoost: ~100 conversions × €32.50 (net of fee)</span><span className="text-green-400 font-semibold">€3,250/day</span></div>
              <div className="flex justify-between pt-2 border-t border-green-700/30 text-base">
                <span className="text-slate-100 font-semibold">Annual additional revenue (1 Schiphol location):</span>
                <span className="text-green-400 font-bold text-xl">~€292,000</span>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-3">Assumes 250 DutyBoost-enabled visitors/day per location (conservative for AMS scale). Scales with volume.</p>
          </div>
        </section>

        {/* How It Works at Schiphol */}
        <section className="space-y-8">
          <h2 className="text-3xl font-heading font-bold">How DutyBoost Works at Schiphol</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { num: '1', title: 'Booked via Dutch Travel Partner', desc: 'Traveler books a flight via a Dutch OTA, travel agency, or corporate travel platform. DutyCredit issued automatically.' },
              { num: '2', title: 'Arrives at AMS', desc: 'Voucher waiting in their email. Valid at all DutyBoost-participating stores in Schiphol. No app needed.' },
              { num: '3', title: 'Walks Into Your Store', desc: 'Already incentivised. Shows QR code at checkout. Discount tiers drive them to spend more to unlock higher savings.' },
              { num: '4', title: 'You Earn More Revenue', desc: 'Higher conversion, higher basket, zero extra marketing cost. DutyBoost fee only on actual redemption.' },
            ].map(({ num, title, desc }) => (
              <div key={num} className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-5 space-y-3 hover:border-orange-700 transition-colors">
                <div className="w-10 h-10 rounded-full bg-orange-600 flex items-center justify-center font-heading font-bold text-white">{num}</div>
                <p className="font-semibold text-slate-100">{title}</p>
                <p className="text-sm text-slate-400">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Schiphol Traveler Mix */}
        <section className="space-y-8">
          <div className="border-l-4 border-yellow-500 pl-6">
            <h2 className="text-3xl font-heading font-bold">Schiphol&apos;s Traveler Mix</h2>
            <p className="text-slate-400 mt-2">Understanding who passes through AMS — and why they&apos;re a DutyBoost sweet spot.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                stat: '52%',
                label: 'business & frequent flyers',
                context: 'Schiphol is a major business travel hub (KLM corporate routes, Eurostar connections). Business travelers spend 2.4× more per trip than leisure. DutyBoost\'s corporate tier is built for this segment.',
                source: { label: 'Schiphol Group – Passenger Profile Research 2024', url: 'https://www.schiphol.nl/en/schiphol-group/page/annual-report/' },
              },
              {
                stat: '300+',
                label: 'destinations served from AMS',
                context: 'Direct connections to Asia-Pacific (highest growth in duty-free), the Americas, and Middle East — all segments with high airport retail spend profiles.',
                source: { label: 'Schiphol – Destinations & Routes Overview', url: 'https://www.schiphol.nl/en/fly-from-amsterdam/page/destinations-and-routes/' },
              },
              {
                stat: '40%',
                label: 'transfer (transit) passengers',
                context: 'Transit passengers have more dwell time and fewer "must-do" tasks. They\'re the most likely to browse — and with a DutyCredit, the most likely to convert.',
                source: { label: 'Schiphol Group – Traffic & Operations Report 2024', url: 'https://www.schiphol.nl/en/schiphol-group/page/annual-report/' },
              },
              {
                stat: '€87+',
                label: 'avg spend for long-haul passengers at AMS',
                context: 'Long-haul passengers (US, Asia, Middle East routes) spend significantly more per visit than intra-European travelers — directly aligning with DutyBoost\'s Lounge and VIP tiers.',
                source: { label: 'ACI Europe – Non-Aero Revenue per Passenger Report 2024', url: 'https://www.aci-europe.org/downloads/resources/ACI%20EUROPE%20Airport%20Industry%20Connectivity%20Report%202024.pdf' },
              },
            ].map(({ stat, label, context, source }, i) => (
              <div key={i} className="bg-gradient-to-br from-yellow-900/10 to-slate-900 border border-yellow-800/30 rounded-xl p-6 space-y-3 hover:border-yellow-700 transition-colors">
                <p className="text-3xl font-heading font-bold text-yellow-400">{stat}</p>
                <p className="font-semibold text-slate-200 text-sm">{label}</p>
                <p className="text-sm text-slate-400 leading-relaxed">{context}</p>
                <a href={source.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-yellow-400 transition-colors">
                  <ExternalLink className="w-3 h-3" /> {source.label}
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Discount Tiers */}
        <section className="space-y-8">
          <h2 className="text-3xl font-heading font-bold">DutyCredit Discount Tiers at Schiphol</h2>
          <p className="text-slate-400">Given Schiphol&apos;s above-average basket (€68), most DutyBoost redemptions at AMS will land in the Priority–VIP range.</p>

          <div className="overflow-hidden rounded-xl border border-slate-700">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-800/50 border-b border-slate-700">
                  <th className="px-6 py-4 text-left font-semibold text-slate-300">Tier</th>
                  <th className="px-6 py-4 text-left font-semibold text-slate-300">Min. Basket</th>
                  <th className="px-6 py-4 text-left font-semibold text-slate-300">Traveler Discount</th>
                  <th className="px-6 py-4 text-left font-semibold text-slate-300">Schiphol Relevance</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { tier: 'Boarding', basket: '€70–€99', discount: '€5–€10', relevance: 'Transit & short-haul intra-EU travelers', highlight: false },
                  { tier: 'Priority', basket: '€100–€199', discount: '€15–€30', relevance: 'Core Schiphol segment — most common basket range', highlight: true },
                  { tier: 'Lounge', basket: '€200–€299', discount: '€35–€45', relevance: 'Business & long-haul travelers to/from AMS', highlight: false },
                  { tier: 'VIP', basket: '€300+', discount: '€60', relevance: 'Asia-Pacific / Americas / Middle East high spenders', highlight: false },
                ].map(({ tier, basket, discount, relevance, highlight }, i) => (
                  <tr key={tier} className={`border-b border-slate-700 hover:bg-slate-800/30 transition-colors ${highlight ? 'bg-orange-900/10' : i % 2 === 0 ? 'bg-slate-900/20' : 'bg-slate-800/10'}`}>
                    <td className="px-6 py-4 font-semibold text-slate-100">
                      {tier} {highlight && <span className="ml-2 text-xs text-orange-400 font-normal">★ Most common at AMS</span>}
                    </td>
                    <td className="px-6 py-4 text-slate-400">{basket}</td>
                    <td className="px-6 py-4 font-semibold text-orange-400">{discount}</td>
                    <td className="px-6 py-4 text-slate-400 text-sm">{relevance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500">Tier structure informed by TFWA Duty Free Spend Understanding Study 2024. Schiphol-specific basket sizing based on ACI Europe commercial revenue data. <a href="https://www.tfwa.com/research/tfwa-insight/tfwa-insight-the-duty-free-spend-understanding-study-2024-100016689" target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-300 transition-colors">TFWA 2024 →</a></p>
        </section>

        {/* Cost & ROI */}
        <section className="space-y-8">
          <h2 className="text-3xl font-heading font-bold">Cost & ROI at Schiphol</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-6 space-y-4">
              <h3 className="font-semibold text-slate-100">Implementation Cost</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-slate-400">Setup fee:</span><span className="font-bold text-green-400">€0</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Monthly fee:</span><span className="font-bold text-green-400">€0</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Per-redemption fee:</span><span className="font-bold text-orange-400">2.5% (max €25)</span></div>
                <div className="flex justify-between"><span className="text-slate-400">On typical AMS basket (€150):</span><span className="font-bold text-orange-400">€3.75</span></div>
                <div className="flex justify-between"><span className="text-slate-400">On €1,000+ basket:</span><span className="font-bold text-green-400">€25 cap (0 above €1k)</span></div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-900/20 to-slate-900 border border-green-800/50 rounded-xl p-6 space-y-4">
              <h3 className="font-semibold text-slate-100">Schiphol ROI Estimate</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-slate-400">250 DutyBoost visitors/day</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Without DutyBoost (28% conv.):</span><span className="text-slate-300">€2,450/day</span></div>
                <div className="flex justify-between border-t border-green-700/30 pt-2"><span className="text-slate-100">With DutyBoost (40%+ conv.):</span><span className="text-green-400 font-bold">€3,250+/day</span></div>
                <div className="text-center pt-2 font-bold text-green-400 text-lg">~€292,000/year per location</div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Schiphol Retailers Specifically */}
        <section className="space-y-8">
          <h2 className="text-3xl font-heading font-bold">Why DutyBoost is Built for Schiphol Retailers</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: Check, title: 'Dutch Travel Partner Network First', desc: 'DutyBoost is founded in the Netherlands. Our initial travel partner rollout targets Dutch OTAs, travel agencies and corporate bookers — your exact customer base.' },
              { icon: Check, title: 'Schiphol Traveler Profile Matches', desc: 'International, high-spend, long-haul, business — the segments DutyBoost incentivises are the same segments Schiphol serves most.' },
              { icon: Check, title: 'Zero Operational Burden', desc: 'One QR scan at checkout. No POS integration needed. Compatible with existing Schiphol retail setups.' },
              { icon: Check, title: 'Pre-Motivated Buyers', desc: 'Travelers arrive at AMS already holding a DutyCredit. They\'re looking for your store — not browsing aimlessly.' },
              { icon: Zap, title: 'Network Grows With Volume', desc: 'Every new Dutch travel partner adds more AMS-bound customers with active vouchers. Network effect compounds.' },
              { icon: Check, title: 'Real-Time Dashboard', desc: 'See exactly which travel partner is sending customers to your Schiphol store — and which day/time performs best.' },
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

        {/* Full Sources */}
        <section className="space-y-6">
          <h2 className="text-2xl font-heading font-bold text-slate-300">Research Sources — Schiphol Edition</h2>
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 space-y-3">
            {[
              { label: 'Schiphol Group – Annual Report 2024 (71.7M passengers, commercial revenue)', url: 'https://www.schiphol.nl/en/schiphol-group/page/annual-report/' },
              { label: 'Schiphol Group – Passenger Statistics (196K avg/day, international mix)', url: 'https://www.schiphol.nl/en/schiphol-group/page/passenger-statistics/' },
              { label: 'Schiphol – Destinations & Routes Overview (300+ destinations)', url: 'https://www.schiphol.nl/en/fly-from-amsterdam/page/destinations-and-routes/' },
              { label: 'ACI Europe – Airport Benchmarking & Dwell Time Report 2024', url: 'https://www.aci-europe.org/downloads/resources/ACI%20EUROPE%20Airport%20Industry%20Connectivity%20Report%202024.pdf' },
              { label: 'ACI Europe – Airport Traffic Rankings 2024 (Schiphol #3 in Europe)', url: 'https://www.aci-europe.org/press-releases/2024/04/2024-03-final-aci-europe-traffic-report-2023.html' },
              { label: 'Forbes – Airport Shoppers Shift to Value, Convenience & Self-Treating (2026)', url: 'https://www.forbes.com/sites/kevinrozario/2026/03/09/airport-shoppers-shift-to-value-convenience-and-selftreating/' },
              { label: 'TFWA Insight – The Duty Free Spend Understanding Study 2024', url: 'https://www.tfwa.com/research/tfwa-insight/tfwa-insight-the-duty-free-spend-understanding-study-2024-100016689' },
              { label: 'Kearney – Travel Retail\'s Future Flight Path 2024', url: 'https://www.kearney.com/about/kearney-in-the-media/press/travel-retails-future-flight-path-turning-heightened-volatility-into-tomorrows-market-edge' },
              { label: 'GM Insights – Travel Retail Market Size & Forecasts 2024–2032', url: 'https://www.gminsights.com/industry-analysis/travel-retail-market' },
              { label: 'Mordor Intelligence – Duty Free and Travel Retail Market 2025', url: 'https://www.mordorintelligence.com/industry-reports/duty-free-and-travel-retail-market' },
              { label: 'Luxus Plus – Travel Retail: Decline in Airport Spending 2025', url: 'https://luxus-plus.com/en/travel-retail-decline-in-airport-spending-confirmed-for-third-consecutive-year/' },
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
          <div className="flex items-center justify-center gap-2 text-slate-400 text-sm mb-2">
            <MapPin className="w-4 h-4 text-orange-400" />
            <span>DutyBoost at Amsterdam Airport Schiphol</span>
          </div>
          <h3 className="text-2xl font-heading font-bold">Ready to unlock Schiphol&apos;s full revenue potential?</h3>
          <p className="text-slate-300">~€292,000 additional revenue per location per year. Zero setup cost. Join the first AMS retailers.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="mailto:hello@dutyboost.com">
              <Button className="gap-2 bg-orange-600 hover:bg-orange-700"><Mail className="w-4 h-4" /> hello@dutyboost.com</Button>
            </a>
            <Link to="/retailer-presentation-dark">
              <Button variant="outline" className="gap-2 bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-800">Global Retailer Guide <ArrowRight className="w-4 h-4" /></Button>
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