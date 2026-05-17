import { Link } from "react-router-dom";
import { useState } from "react";
import DutyBoostLogo from "../components/DutyBoostLogo";
import { Button } from "@/components/ui/button";
import { Download, FileText, Mail, ArrowRight, ExternalLink } from "lucide-react";

const SOURCES = [
  { label: "IATA Annual Review 2025 — Global air passenger traffic 4.8B in 2024 (+10.6% YoY)", url: "https://www.iata.org/contentassets/c81222d96c9a4e0bb4ff6ced0126f0bb/iata-annual-review-2025.pdf" },
  { label: "Schiphol Group — 68.8M passengers in 2025 (+2.9% YoY)", url: "https://airportindustry-news.com/schiphol-airport-handles-68-8-million-passengers-in-2025/" },
  { label: "Mordor Intelligence — Duty Free & Travel Retail Market $102.5B 2026, CAGR 8.8%", url: "https://www.mordorintelligence.com/industry-reports/duty-free-and-travel-retail-market" },
  { label: "Pi Insight — Duty Free Competes for 1h10m Airport Dwell Time", url: "https://www.linkedin.com/posts/pi-insight_travelretail-dutyfree-shopperbehaviour-activity-7450856841967869953-OGWq" },
  { label: "Kearney — Travel Retail & Geopolitical Realities 2024 (63% confidence with incentives)", url: "https://www.kearney.com/industry/consumer-retail/article/travel-retail-amid-today-s-geopolitical-realities" },
  { label: "m1nd-set Research — Solo Travel & Conversion Rates (71% achievable with incentives)", url: "https://www.linkedin.com/posts/m1nd-set_m1nd-set-research-reveals-solo-travel-will-activity-7388090859046731776-3Gbn" },
  { label: "ETRC — Economic Impact of Duty-Free & Travel Retail in Europe, April 2025", url: "https://etrc.org/wp-content/uploads/documents/ETRC-EU-Economic-Impact-of-Duty-Free-Travel-Retail-Report-April-2025-FINAL.pdf" },
];

function SlideHeader({ label, title, color = "orange" }) {
  const colors = {
    orange: "border-orange-500 text-orange-400",
    green: "border-green-500 text-green-400",
    blue: "border-blue-500 text-blue-400",
  };
  return (
    <div className={`border-l-4 ${colors[color].split(" ")[0]} pl-6 mb-8`}>
      {label && <p className={`text-xs font-bold uppercase tracking-widest ${colors[color].split(" ")[1]} mb-1`}>{label}</p>}
      <h2 className="text-3xl font-heading font-bold text-slate-50">{title}</h2>
    </div>
  );
}

function BulletCard({ items, color = "orange" }) {
  const dot = { orange: "bg-orange-500", green: "bg-green-500", blue: "bg-blue-500" }[color];
  return (
    <ul className="space-y-4">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className={`w-2 h-2 rounded-full ${dot} mt-2 shrink-0`} />
          <span className="text-slate-300 text-base leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function StatCard({ stat, label, sub, color = "orange" }) {
  const c = { orange: "text-orange-400", green: "text-green-400", blue: "text-blue-400" }[color];
  return (
    <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-6 text-center space-y-2">
      <p className={`text-4xl font-heading font-bold ${c}`}>{stat}</p>
      <p className="text-sm font-semibold text-slate-200">{label}</p>
      {sub && <p className="text-xs text-slate-500">{sub}</p>}
    </div>
  );
}

function Section({ children, className = "" }) {
  return (
    <section className={`bg-slate-900/50 border border-slate-800 rounded-2xl p-8 md:p-10 space-y-6 ${className}`}>
      {children}
    </section>
  );
}

export default function AirportRetailerPresentationDark() {
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadPdf = () => window.print();

  const downloadPresentation = async () => {
    setIsDownloading(true);
    try {
      const { exportRetailerPptxDark } = await import("../utils/exportRetailerPptxDark");
      await exportRetailerPptxDark();
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-body">
      {/* Nav */}
      <nav className="sticky top-0 z-50 backdrop-blur border-b border-slate-800 bg-slate-950/90 print:hidden">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <DutyBoostLogo height={120} inverted />
          <div className="flex items-center gap-2">
            <Link to="/travel-partner-presentation-dark">
              <Button size="sm" variant="outline" className="text-sm hidden sm:flex bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800">
                Travel Partner Guide →
              </Button>
            </Link>
            <Link to="/">
              <Button size="sm" variant="ghost" className="text-sm text-slate-400">← Home</Button>
            </Link>
            <Button size="sm" variant="outline" className="gap-1.5 bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-800" onClick={downloadPdf}>
              <FileText className="w-3.5 h-3.5" /> PDF
            </Button>
            <Button size="sm" variant="outline" className="gap-1.5 bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-800" onClick={downloadPresentation} disabled={isDownloading}>
              <Download className="w-3.5 h-3.5" /> {isDownloading ? "Generating..." : "PPTX"}
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-16 space-y-8">

        {/* SLIDE 1 — Hero */}
        <Section className="text-center py-16 bg-gradient-to-br from-orange-950/40 to-slate-900 border-orange-900/40">
          <p className="text-xs font-bold uppercase tracking-widest text-orange-400">Airport Retail Partnership</p>
          <h1 className="text-5xl sm:text-6xl font-heading font-bold leading-tight">
            Turning Airport Foot Traffic Into<br />
            <span className="text-orange-400">Measurable Retail Revenue</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            DutyBoost pre-activates traveler purchase intent before they reach your store — converting passive foot traffic into confirmed sales.
          </p>
          <div className="flex flex-wrap gap-3 justify-center pt-2">
            {["Zero setup cost", "Pre-qualified buyers", "Higher basket size", "Performance-based only"].map(label => (
              <span key={label} className="px-4 py-2 rounded-full bg-orange-900/30 border border-orange-700/50 text-orange-300 text-sm font-medium">{label}</span>
            ))}
          </div>
        </Section>

        {/* SLIDE 2 — The Problem */}
        <Section>
          <SlideHeader label="WHY" title="The Airport Retail Problem" color="orange" />
          <BulletCard color="orange" items={[
            "Millions of travelers pass airport retail every day",
            "Most travelers enter stores without purchase intent",
            "Traditional airport retail depends on passive conversion",
            "Retailers need incremental revenue, not more foot traffic",
          ]} />
        </Section>

        {/* SLIDE 3 — The Opportunity */}
        <Section>
          <SlideHeader label="WHY" title="The Opportunity" color="green" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard stat="4.8B" label="Global air travelers in 2024" color="orange" />
            <StatCard stat="68.8M" label="Schiphol travelers annually" color="orange" />
            <StatCard stat="1h 10m" label="Average airside dwell time" color="green" />
            <StatCard stat="€68.2B" label="Global travel retail market (8.8% CAGR)" color="green" />
          </div>
        </Section>

        {/* SLIDE 4 — The Conversion Gap */}
        <Section>
          <SlideHeader label="WHY" title="The Conversion Gap" color="green" />
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { stat: "28%", label: "Average airport retail conversion without incentives", color: "orange" },
              { stat: "63%", label: "More purchase confidence with active incentives (Kearney)", color: "green" },
              { stat: "71%", label: "Conversion achievable with targeted pre-departure incentives (m1nd-set)", color: "blue" },
            ].map(({ stat, label, color }) => (
              <div key={stat} className="bg-slate-800/60 border border-slate-700 rounded-xl p-6 space-y-3 text-center">
                <p className={`text-5xl font-heading font-bold ${{ orange: "text-orange-400", green: "text-green-400", blue: "text-blue-400" }[color]}`}>{stat}</p>
                <p className="text-sm text-slate-300 leading-relaxed">{label}</p>
              </div>
            ))}
          </div>
          <div className="bg-gradient-to-br from-orange-900/20 to-slate-900 border border-orange-800/40 rounded-xl p-6">
            <p className="font-semibold text-slate-100 mb-2">DutyBoost activates buying intent before travelers arrive</p>
            <p className="text-sm text-slate-400 leading-relaxed">
              Most retail tools wait for a customer to enter. DutyBoost plants the purchase decision days before the flight — so when the traveler clears security, they already know which store they're heading to.
            </p>
          </div>
        </Section>

        {/* SLIDE 5 — The DutyBoost Model */}
        <Section>
          <SlideHeader label="HOW" title="The DutyBoost Model" color="orange" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { num: "1", title: "Travel partner issues DutyCredit during booking" },
              { num: "2", title: "Traveler receives personalized QR incentive by email" },
              { num: "3", title: "Traveler arrives at airport pre-activated" },
              { num: "4", title: "Retail staff scans QR code at checkout" },
              { num: "5", title: "DutyBoost validates and applies incentive instantly" },
            ].map(({ num, title }) => (
              <div key={num} className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-5 space-y-3 text-center">
                <div className="w-10 h-10 rounded-full bg-orange-600 flex items-center justify-center font-heading font-bold text-white text-lg mx-auto">{num}</div>
                <p className="text-sm text-slate-300 leading-relaxed">{title}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* SLIDE 6 — The Retail Economics */}
        <Section>
          <SlideHeader label="HOW" title="The Retail Economics" color="green" />
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <BulletCard color="green" items={[
                "No upfront costs",
                "No subscriptions",
                "Only 2.5% commission on net sales",
                "Commission capped at €25 per transaction",
                "DutyBoost funds the traveler discount — not you",
              ]} />
            </div>
            <div className="bg-gradient-to-br from-green-900/20 to-slate-900 border border-green-800/40 rounded-xl p-6 space-y-3">
              <p className="text-sm font-bold text-slate-300 uppercase tracking-widest mb-4">Cost per transaction</p>
              {[
                { label: "Setup fee", val: "€0" },
                { label: "Monthly subscription", val: "€0" },
                { label: "Commission (2.5% of basket)", val: "2.5%" },
                { label: "Commission cap", val: "€25 max" },
                { label: "Traveler discount funded by", val: "DutyBoost" },
              ].map(({ label, val }) => (
                <div key={label} className="flex justify-between items-center py-2 border-b border-slate-700/40 text-sm">
                  <span className="text-slate-400">{label}</span>
                  <span className="font-semibold text-green-400">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* SLIDE 7 — Basket Growth Strategy */}
        <Section>
          <SlideHeader label="HOW" title="Basket Growth Strategy" color="orange" />
          <p className="text-slate-400 text-sm -mt-4 mb-2">Tiered incentives designed to push average order value upward — every tier drives a meaningful, qualified transaction.</p>
          <div className="overflow-hidden rounded-xl border border-slate-700">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-900/60">
                  <th className="px-5 py-3 text-left text-xs font-semibold text-slate-400 uppercase">Tier</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-slate-400 uppercase">Min. Basket</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-slate-400 uppercase">Traveler Saves</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-slate-400 uppercase">Your Fee (2.5%)</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-slate-400 uppercase">Your Net</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { tier: "🟡 Boarding", basket: "€70–€99", save: "€5–€10", fee: "€1.75–€2.50", net: "€56–€86", row: "bg-yellow-900/10" },
                  { tier: "🔵 Priority", basket: "€100–€199", save: "€10–€30", fee: "€2.50–€5", net: "€83–€169", row: "bg-blue-900/10" },
                  { tier: "🟢 Lounge", basket: "€200–€299", save: "€30–€60", fee: "€5–€7.50", net: "€150–€234", row: "bg-green-900/10" },
                  { tier: "🟣 VIP", basket: "€300+", save: "€60 flat", fee: "max €25", net: "€215+ net", row: "bg-purple-900/10" },
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
          </div>
          <p className="text-xs text-slate-500">Minimum basket starts at €70. Incentives scale with spend — up to €60 incentive at €300+ basket. Designed to increase average order value and upselling.</p>
        </Section>

        {/* SLIDE 8 — Measurable Revenue Impact */}
        <Section>
          <SlideHeader label="WHAT" title="Measurable Revenue Impact" color="green" />
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { label: "Conversion Uplift", before: "28%", after: "40–50%", color: "orange" },
              { label: "Avg. Basket Uplift", before: "€20–€28", after: "€100–€140", color: "green" },
              { label: "Daily Net Revenue (100 visitors)", before: "€2,100", after: "€5,400", color: "blue" },
            ].map(({ label, before, after, color }) => (
              <div key={label} className="bg-slate-800/60 border border-slate-700 rounded-xl p-6 space-y-3">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{label}</p>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500">Without DutyBoost</span>
                  <span className="font-bold text-slate-300">{before}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-300">With DutyBoost</span>
                  <span className={`font-bold ${{ orange: "text-orange-400", green: "text-green-400", blue: "text-blue-400" }[color]}`}>{after}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-gradient-to-br from-green-900/20 to-slate-900 border border-green-800/50 rounded-xl p-6">
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              {[
                { label: "Net incremental revenue per day per store", val: "+€3,150" },
                { label: "Annual incremental revenue per location", val: "+€1.1M" },
                { label: "DutyBoost fee on €120 avg basket", val: "€3 (2.5%)" },
                { label: "Net to you per €120 sale", val: "€117" },
              ].map(({ label, val }) => (
                <div key={label} className="flex justify-between items-center py-2 border-b border-slate-700/40">
                  <span className="text-slate-400">{label}</span>
                  <span className="font-bold text-green-400">{val}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-4">Based on 100 DutyCredit visitors/day, 45% conversion, €120 avg basket. 365 operating days. Actual results depend on DutyCredit volume at your location.</p>
          </div>
        </Section>

        {/* SLIDE 9 — Why Retailers Win */}
        <Section>
          <SlideHeader label="WHAT" title="Why Retailers Win" color="orange" />
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { title: "Pre-qualified shoppers arrive ready to buy", desc: "Every DutyCredit holder has a specific credit to spend. They arrive at your store with a mission, not to browse." },
              { title: "Higher basket sizes guaranteed", desc: "The €70 minimum basket means every DutyCredit redemption is a meaningful transaction — no micro-purchases." },
              { title: "Continuous traveler flow", desc: "As more travel partners join DutyBoost, more pre-activated travelers are directed to your store every day." },
              { title: "Real-time analytics dashboard", desc: "Track redemptions, basket values, conversion rates, and monthly invoices — per day, per store." },
              { title: "Stronger traveler loyalty", desc: "Travelers who redeem a DutyCredit remember your store as the place that gave them great value." },
            ].map(({ title, desc }) => (
              <div key={title} className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-5 space-y-2 hover:border-orange-600 transition-colors">
                <p className="font-semibold text-slate-100 text-sm">{title}</p>
                <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* SLIDE 10 — Strategic Value */}
        <Section>
          <SlideHeader label="STRATEGIC VALUE" title="For Airport Retailers" color="blue" />
          <div className="grid md:grid-cols-2 gap-6">
            <BulletCard color="blue" items={[
              "Purely performance-based model — you only pay for confirmed sales",
              "No operational disruption to your existing workflow",
              "Scalable across airport retail portfolios",
              "Network effect strengthens over time as more travel partners join",
            ]} />
            <div className="space-y-4">
              <div className="bg-blue-900/20 border border-blue-800/40 rounded-xl p-5">
                <p className="text-sm font-semibold text-blue-300 mb-2">Zero risk entry</p>
                <p className="text-xs text-slate-400">You pay 2.5% (max €25) only when DutyBoost delivers a confirmed incremental sale. There is no cost unless we deliver revenue.</p>
              </div>
              <div className="bg-orange-900/20 border border-orange-800/40 rounded-xl p-5">
                <p className="text-sm font-semibold text-orange-300 mb-2">Day-one ready</p>
                <p className="text-xs text-slate-400">Setup in under a day. Your staff scans a QR code — DutyBoost handles validation, discounting, billing, and reporting automatically.</p>
              </div>
            </div>
          </div>
        </Section>

        {/* SLIDE 11 — Market Timing */}
        <Section>
          <SlideHeader label="MARKET CONTEXT" title="Market Timing" color="green" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard stat="+8.8%" label="CAGR — Global duty-free & travel retail through 2031" color="green" />
            <StatCard stat="+10.6%" label="Global air passenger growth in 2024" color="orange" />
            <StatCard stat="+8.5%" label="Conversion increase from targeted digital QR incentives" color="blue" />
            <StatCard stat="62%" label="Airport retailers already have QR/mobile capability" color="green" />
          </div>
          <BulletCard color="green" items={[
            "Airport retail market expanding rapidly — €68.2B in 2024, growing to €156.2B by 2031",
            "Travelers increasingly responsive to digital incentives",
            "QR and mobile voucher infrastructure already widely adopted",
            "DutyBoost aligns with modern traveler behavior",
          ]} />
        </Section>

        {/* SLIDE 12 — Why DutyBoost Is Different */}
        <Section className="bg-gradient-to-br from-orange-950/30 to-slate-900 border-orange-900/40">
          <SlideHeader label="DIFFERENTIATION" title="Why DutyBoost Is Different" color="orange" />
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-6 space-y-3">
              <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Traditional airport retail</p>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>— Waits for traveler attention at point of sale</li>
                <li>— Relies on passive walk-in conversion</li>
                <li>— No differentiation from competing stores</li>
                <li>— Depends on terminal placement and signage</li>
              </ul>
            </div>
            <div className="bg-orange-900/20 border border-orange-800/40 rounded-xl p-6 space-y-3">
              <p className="text-sm font-bold text-orange-400 uppercase tracking-wider">DutyBoost</p>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-start gap-2"><span className="text-orange-400 mt-0.5">✓</span> Creates purchase intent before travelers arrive</li>
                <li className="flex items-start gap-2"><span className="text-orange-400 mt-0.5">✓</span> Pre-activates shoppers days before their flight</li>
                <li className="flex items-start gap-2"><span className="text-orange-400 mt-0.5">✓</span> Monetizes traffic already passing your stores</li>
                <li className="flex items-start gap-2"><span className="text-orange-400 mt-0.5">✓</span> Performance-based — you only pay for sales</li>
              </ul>
            </div>
          </div>
          <div className="text-center py-4">
            <p className="text-2xl font-heading font-bold text-slate-100">We do not generate more traffic.</p>
            <p className="text-2xl font-heading font-bold text-orange-400">We monetize the traffic already passing your stores.</p>
          </div>
        </Section>

        {/* SLIDE 13 — Call To Action */}
        <Section className="text-center bg-gradient-to-r from-orange-900/40 to-slate-900 border-orange-700/50">
          <p className="text-xs font-bold uppercase tracking-widest text-orange-400">Ready to get started?</p>
          <h3 className="text-4xl font-heading font-bold">Join the DutyBoost Retail Network</h3>
          <div className="flex flex-wrap gap-6 justify-center py-2">
            {["Pre-activated shoppers.", "Higher baskets.", "Zero upfront cost.", "Performance-based growth."].map(item => (
              <span key={item} className="text-orange-300 font-semibold text-lg">{item}</span>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 justify-center pt-4">
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
        </Section>

        {/* SLIDE 14 — Research Sources */}
        <Section>
          <SlideHeader label="" title="Research & Market Sources" color="blue" />
          <div className="space-y-2.5">
            {SOURCES.map((s, i) => (
              <a key={i} href={s.url} target="_blank" rel="noopener noreferrer"
                className="flex items-start gap-2 text-sm text-slate-500 hover:text-slate-300 transition-colors group">
                <ExternalLink className="w-3.5 h-3.5 shrink-0 mt-0.5 group-hover:text-orange-400" />
                {s.label}
              </a>
            ))}
          </div>
        </Section>

      </div>

      <footer className="border-t border-slate-800 py-8 px-6 print:hidden mt-10">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-400">
          <DutyBoostLogo height={100} inverted />
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