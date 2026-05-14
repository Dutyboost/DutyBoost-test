import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { exportRetailerPptxWithImages } from "@/utils/exportRetailerPptxWithImages";
import {
  Download, TrendingUp, Store, Plane, Hotel, Car,
  CheckCircle2, ArrowRight, BarChart3, Zap, Globe, Users, ArrowDown
} from "lucide-react";

export default function RetailerPresentationFuture() {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      await exportRetailerPptxWithImages();
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-body">

      {/* Sticky Nav */}
      <div className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur border-b border-slate-800 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="https://media.base44.com/images/public/69c97dcd1c1950fa88424690/9a64855b0_ChatGPT_Image_Mar_30__2026__03_06_29_PM-removebg-preview.png" alt="DutyBoost" className="h-8 brightness-0 invert" />
          <div>
            <p className="text-sm font-semibold text-white leading-none">The Future of Airport Retail</p>
            <p className="text-xs text-slate-400">Airport Retailer Presentation</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a href="/retailer-calculator" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white gap-2 text-xs">
              <BarChart3 className="w-3.5 h-3.5" /> ROI Calculator
            </Button>
          </a>
          <Button onClick={handleDownload} disabled={downloading} className="bg-blue-600 hover:bg-blue-700 text-white gap-2 text-xs">
            <Download className="w-3.5 h-3.5" />
            {downloading ? "Generating..." : "Download PPTX"}
          </Button>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          SLIDE 1 — COVER
      ══════════════════════════════════════════════════ */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 overflow-hidden px-6">
        <div className="absolute inset-0 opacity-5" style={{backgroundImage:"radial-gradient(circle at 50% 50%, #3b82f6 0%, transparent 70%)"}}/>
        <div className="relative text-center max-w-3xl space-y-6">
          <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30 tracking-widest text-xs uppercase">Airport Retailer Presentation · 2026</Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">The Future of<br/><span className="text-blue-400">Airport Retail</span></h1>
          <p className="text-2xl text-orange-300 italic">with DutyBoost</p>
          <p className="text-slate-300 text-lg leading-relaxed">A performance-based revenue layer that sends pre-motivated travelers directly to your store.<br/><strong className="text-white">You only pay when a traveler spends.</strong></p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-3 text-center">
              <p className="text-2xl font-bold text-green-400">2.5%</p>
              <p className="text-xs text-slate-400">fee per transaction only</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-3 text-center">
              <p className="text-2xl font-bold text-blue-400">€0</p>
              <p className="text-xs text-slate-400">upfront cost</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-3 text-center">
              <p className="text-2xl font-bold text-orange-400">40:1</p>
              <p className="text-xs text-slate-400">average ROI</p>
            </div>
          </div>
          <Button onClick={handleDownload} disabled={downloading} size="lg" className="bg-blue-600 hover:bg-blue-700 text-white gap-2 mt-2">
            <Download className="w-5 h-5" />
            {downloading ? "Generating..." : "Download Full Presentation (.pptx)"}
          </Button>
        </div>
        <div className="absolute bottom-8 flex flex-col items-center gap-1 text-slate-500">
          <span className="text-xs">Scroll to explore</span>
          <ArrowDown className="w-4 h-4 animate-bounce"/>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SLIDE 2 — THE OPPORTUNITY
      ══════════════════════════════════════════════════ */}
      <section className="py-20 px-6 bg-slate-900 border-t border-slate-800">
        <div className="max-w-5xl mx-auto">
          <SlideLabel num={2} label="The Opportunity" color="blue"/>
          <h2 className="text-4xl font-bold text-white mb-2">Airport retail: a €40B+ market with a <span className="text-red-400">conversion problem</span></h2>
          <p className="text-slate-400 mb-10 text-lg">The demand is there. The spending intent is there. The technology to capture it wasn't — until now.</p>
          <div className="grid md:grid-cols-4 gap-4 mb-10">
            {[
              { num: "€40B+", label: "Global airport retail revenue", sub: "Source: Airport Council International 2024" },
              { num: "2.4B", label: "International passengers per year", sub: "Source: IATA 2024" },
              { num: "~10%", label: "Average store conversion rate", sub: "Source: m1nd-set Airport Retail Research" },
              { num: "72%", label: "Travelers browse but don't buy", sub: "Source: TFWA World Exhibition Research" },
            ].map(({ num, label, sub }) => (
              <div key={num} className="bg-slate-800 border border-slate-700 rounded-2xl p-5 text-center space-y-2">
                <p className="text-4xl font-bold text-blue-400">{num}</p>
                <p className="text-sm font-semibold text-white leading-snug">{label}</p>
                <p className="text-[11px] text-slate-500 leading-snug">{sub}</p>
              </div>
            ))}
          </div>
          <div className="bg-blue-600 rounded-2xl p-6 text-center">
            <p className="text-xl font-bold text-white">DutyBoost converts the 72% who browse into buyers —<br/>by giving them a <span className="text-yellow-300">financial reason to spend</span> before they even arrive at your store.</p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SLIDE 3 — HOW IT WORKS
      ══════════════════════════════════════════════════ */}
      <section className="py-20 px-6 bg-gradient-to-br from-slate-950 to-blue-950 border-t border-slate-800">
        <div className="max-w-5xl mx-auto">
          <SlideLabel num={3} label="How It Works" color="orange"/>
          <h2 className="text-4xl font-bold text-white mb-2">Pre-qualified buyers. <span className="text-orange-400">Delivered to your store.</span></h2>
          <p className="text-slate-400 mb-10 text-lg">Four simple steps — fully automated. No effort required from your staff beyond scanning a QR code.</p>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { num: "1", title: "Partner sends DutyCredit", body: "Travel agency, airline, hotel or car rental sends traveler a DutyCredit before departure — via booking confirmation email.", color: "bg-blue-600" },
              { num: "2", title: "Traveler arrives at airport", body: "Traveler opens their QR code on their phone. Valid from departure day through arrival day. Min. spend €70 at any participating store.", color: "bg-purple-600" },
              { num: "3", title: "Staff scans at checkout", body: "Your cashier opens app.dutyboost.com/scan on any device. Traveler shows QR. System auto-applies discount and logs the transaction.", color: "bg-orange-600" },
              { num: "4", title: "You pay 2.5% monthly", body: "DutyBoost sends one invoice per month for all completed transactions. You pay only on what sold. Zero upfront. Zero risk.", color: "bg-green-600" },
            ].map(({ num, title, body, color }) => (
              <div key={num} className="bg-slate-800/60 border border-slate-700 rounded-2xl p-5 space-y-3 relative">
                <div className={`w-10 h-10 rounded-full ${color} flex items-center justify-center text-lg font-bold`}>{num}</div>
                <p className="font-bold text-white text-sm leading-snug">{title}</p>
                <p className="text-xs text-slate-400 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
          {/* Flow arrow */}
          <div className="mt-6 flex items-center justify-center gap-2 text-slate-500 text-xs">
            <span className="bg-slate-800 border border-slate-700 rounded-full px-3 py-1">Partner</span>
            <ArrowRight className="w-4 h-4"/>
            <span className="bg-slate-800 border border-slate-700 rounded-full px-3 py-1">Traveler receives DutyCredit</span>
            <ArrowRight className="w-4 h-4"/>
            <span className="bg-slate-800 border border-slate-700 rounded-full px-3 py-1">Arrives at your store</span>
            <ArrowRight className="w-4 h-4"/>
            <span className="bg-green-800 border border-green-700 text-green-300 rounded-full px-3 py-1">You earn · You pay 2.5%</span>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SLIDE 4 — DUTYCREDIT DISCOUNT TIERS
      ══════════════════════════════════════════════════ */}
      <section className="py-20 px-6 bg-slate-900 border-t border-slate-800">
        <div className="max-w-5xl mx-auto">
          <SlideLabel num={4} label="DutyCredit Discount Layer" color="blue"/>
          <h2 className="text-4xl font-bold text-white mb-2">What the traveler receives — <span className="text-blue-400">how the discount works</span></h2>
          <p className="text-slate-400 mb-10 text-lg">Travelers receive a tiered DutyCredit. The more they spend in your store, the bigger the saving they unlock — incentivising larger baskets.</p>
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            {[
              { emoji: "🟡", name: "Boarding", range: "€70 – €99", saving: "€5 – €10", note: "Extra sale you wouldn't have had", bg: "bg-yellow-900/30", border: "border-yellow-700" },
              { emoji: "🔵", name: "Priority", range: "€100 – €199", saving: "€15 – €30", note: "Most common tier — strong incentive", bg: "bg-blue-900/40", border: "border-blue-700" },
              { emoji: "🟢", name: "Lounge", range: "€200 – €299", saving: "€35 – €45", note: "Premium traveler — larger basket", bg: "bg-green-900/30", border: "border-green-700" },
              { emoji: "🟣", name: "VIP", range: "€300+", saving: "€60", note: "Top-tier — maximum store revenue", bg: "bg-purple-900/30", border: "border-purple-700" },
            ].map(({ emoji, name, range, saving, note, bg, border }) => (
              <div key={name} className={`${bg} border ${border} rounded-2xl p-5 space-y-3 text-center`}>
                <p className="text-3xl">{emoji}</p>
                <p className="font-bold text-white">{name} DutyCredit</p>
                <p className="text-xs text-slate-400">{range} spend</p>
                <p className="text-2xl font-bold text-white">{saving}</p>
                <p className="text-xs text-slate-400 leading-snug">{note}</p>
              </div>
            ))}
          </div>
          <div className="bg-orange-900/30 border border-orange-700 rounded-2xl p-4 text-center">
            <p className="text-orange-300 font-semibold text-sm">⚠ Minimum basket €70 to activate any DutyCredit · Single use · Valid from departure day through arrival day · Applied automatically at checkout via QR scan</p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SLIDE 5 — RETAILER VALUE PROP
      ══════════════════════════════════════════════════ */}
      <section className="py-20 px-6 bg-gradient-to-br from-slate-950 to-slate-900 border-t border-slate-800">
        <div className="max-w-5xl mx-auto">
          <SlideLabel num={5} label="For Airport Retailers" color="orange"/>
          <h2 className="text-4xl font-bold text-white mb-2">More sales. <span className="text-orange-400">Zero upfront cost.</span></h2>
          <p className="text-slate-400 mb-10 text-lg">A performance model that works entirely in your favour — you only pay when a traveler actually spends in your store.</p>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { icon: CheckCircle2, title: "Performance model only", body: "2.5% fee per completed transaction. No monthly fee, no setup cost. If no one redeems, you pay nothing.", color: "text-green-400" },
              { icon: Users, title: "Pre-motivated buyers", body: "Travelers arrive with a DutyCredit already in hand — committed to spending €70+ in your store before they even get there.", color: "text-blue-400" },
              { icon: Zap, title: "No POS overhaul needed", body: "Simple QR scan at checkout on any phone, tablet or screen. Works alongside your existing system. Live in minutes.", color: "text-yellow-400" },
              { icon: BarChart3, title: "Real-time dashboard", body: "See every DutyCredit redemption, transaction value, and channel attribution the moment it happens — per store, per day.", color: "text-purple-400" },
              { icon: Globe, title: "Multiple revenue channels", body: "DutyCredits flow from travel agencies, airlines, hotels and car rentals. Diversified pipeline — not dependent on one partner.", color: "text-orange-400" },
              { icon: TrendingUp, title: "Scalable from day one", body: "Start with 1–3 stores. Add more as volume grows. No lock-in contracts. No minimum commitments.", color: "text-teal-400" },
            ].map(({ icon: Icon, title, body, color }) => (
              <div key={title} className="bg-slate-800 border border-slate-700 rounded-2xl p-5 flex gap-4">
                <Icon className={`w-5 h-5 ${color} shrink-0 mt-0.5`}/>
                <div>
                  <p className="font-bold text-white text-sm mb-1">{title}</p>
                  <p className="text-xs text-slate-400 leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SLIDE 6 — THE APP: RETAILER FLOW
      ══════════════════════════════════════════════════ */}
      <section className="py-20 px-6 bg-slate-900 border-t border-slate-800">
        <div className="max-w-6xl mx-auto">
          <SlideLabel num={6} label="The App — Retailer Experience" color="blue"/>
          <h2 className="text-4xl font-bold text-white mb-2">What you see. <span className="text-blue-400">What you do. What you earn.</span></h2>
          <p className="text-slate-400 mb-10 text-lg">From first sign-up to monthly invoice — here is exactly how DutyBoost works for you, step by step.</p>

          {/* PHASE A */}
          <PhaseHeader letter="A" title="Sign Up & Get Activated" sub="Takes 5 minutes. No hardware. No POS overhaul." color="bg-blue-600"/>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <AppCard stepLabel="Step 1" stepTitle="Register your store" stepColor="blue">
              <div className="bg-slate-950 rounded-xl border border-slate-700 p-3 space-y-2">
                <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold mb-1">Registration Form</p>
                {["Store name", "Airport location", "Store category", "Contact email"].map(f => (
                  <div key={f} className="h-7 bg-slate-800 border border-slate-700 rounded-lg px-2 flex items-center">
                    <span className="text-xs text-slate-500">{f}</span>
                  </div>
                ))}
                <button className="w-full bg-blue-600 text-white rounded-lg py-1.5 text-xs font-bold">Submit Application →</button>
              </div>
              <p className="text-xs text-slate-500">Go to <span className="text-blue-400">dutyboost.com/get-started</span>. Activated within 1 business day.</p>
            </AppCard>

            <AppCard stepLabel="Step 2" stepTitle="Receive welcome email" stepColor="blue">
              <div className="bg-slate-950 rounded-xl border border-slate-700 overflow-hidden">
                <div className="bg-slate-800 px-3 py-1.5 border-b border-slate-700 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"/>
                  <span className="text-xs text-white font-medium">Welcome to DutyBoost ✓</span>
                </div>
                <div className="p-3 space-y-2">
                  <p className="text-xs text-slate-400">Hi Relay Store,</p>
                  <p className="text-xs text-slate-300 leading-relaxed">Your store is now <span className="text-green-400 font-semibold">live</span>. Travelers at AMS with a DutyCredit can now redeem at your checkout.</p>
                  <div className="bg-blue-600 rounded-lg py-1.5 text-center"><span className="text-xs font-bold text-white">→ Open Your Dashboard</span></div>
                  <p className="text-xs text-slate-500">Scan URL: <span className="text-blue-400">app.dutyboost.com/scan</span><br/>Works on any phone or tablet.</p>
                </div>
              </div>
              <p className="text-xs text-slate-500">Your scan link and dashboard credentials arrive by email. No app install required.</p>
            </AppCard>

            <AppCard stepLabel="Step 3" stepTitle="Your dashboard is live" stepColor="blue">
              <MockDashboard empty/>
              <p className="text-xs text-slate-500">Dashboard starts empty and fills up automatically with every redemption. Nothing to configure.</p>
            </AppCard>
          </div>

          <FlowConnector label="A traveler with a DutyCredit walks into your store ↓"/>

          {/* PHASE B */}
          <PhaseHeader letter="B" title="At Checkout: Scan & Validate" sub="The traveler shows QR. Your staff scans it. Under 10 seconds." color="bg-orange-600"/>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <AppCard stepLabel="Traveler" stepTitle="Shows QR code on phone" stepColor="orange">
              <div className="bg-gradient-to-b from-slate-950 to-slate-900 rounded-xl border border-slate-700 p-3 space-y-2">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-700">
                  <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold">J</div>
                  <div><p className="text-xs font-semibold text-white">J. Martens</p><p className="text-[10px] text-slate-400">AMS → BCN · Departs today</p></div>
                </div>
                <div className="bg-blue-900/60 border border-blue-600 rounded-xl p-3 text-center">
                  <p className="text-xs text-blue-300 mb-1">🔵 Priority DutyCredit</p>
                  <p className="text-2xl font-bold text-white">€25 off</p>
                  <p className="text-xs text-slate-300">min. €100 basket</p>
                </div>
                <div className="flex justify-center">
                  <div className="grid grid-cols-7 gap-0.5">
                    {Array.from({length:49}).map((_,i)=>(
                      <div key={i} className={`w-2.5 h-2.5 rounded-sm ${[0,1,2,7,14,8,15,22,6,13,20,27,34,41,48,47,46,40,33,26,24,25,32].includes(i)?"bg-blue-300":"bg-slate-700"}`}/>
                    ))}
                  </div>
                </div>
                <p className="text-[10px] text-center text-green-400">✓ Valid today · Single use</p>
              </div>
              <p className="text-xs text-slate-500">DutyCredit sent to traveler by email from their agency, airline, hotel or car rental company.</p>
            </AppCard>

            <AppCard stepLabel="Retailer Staff" stepTitle="Opens scan screen on any device" stepColor="orange">
              <div className="bg-slate-950 border border-slate-700 rounded-xl p-3 space-y-2">
                <p className="text-[10px] text-slate-400 text-center uppercase tracking-wider font-semibold">Scan QR Code</p>
                <div className="border-2 border-dashed border-orange-500/50 rounded-xl h-24 flex items-center justify-center bg-orange-500/5 relative">
                  <div className="w-10 h-10 border-2 border-orange-400 rounded-lg animate-pulse opacity-70"/>
                  <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-orange-400 rounded-tl"/>
                  <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-orange-400 rounded-tr"/>
                  <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-orange-400 rounded-bl"/>
                  <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-orange-400 rounded-br"/>
                </div>
                <p className="text-[10px] text-slate-400 text-center">Point camera at traveler's phone</p>
                <div className="flex gap-2">
                  <div className="flex-1 bg-slate-800 border border-slate-600 rounded-lg px-2 py-1.5 text-xs text-slate-400">DB-XXXXXX</div>
                  <button className="bg-orange-600 text-white rounded-lg px-3 py-1.5 text-xs font-bold">Go</button>
                </div>
              </div>
              <p className="text-xs text-slate-500">Works on any phone, tablet or desktop. No app install. Just open the URL in browser.</p>
            </AppCard>

            <AppCard stepLabel="Retailer Staff" stepTitle="Voucher details appear instantly" stepColor="orange">
              <div className="bg-blue-950 border border-blue-700 rounded-xl p-3 space-y-2">
                <div className="flex justify-between items-center border-b border-blue-800 pb-2">
                  <p className="text-xs text-blue-300 font-semibold">🔵 Priority DutyCredit</p>
                  <span className="text-[10px] bg-green-500 text-white px-2 py-0.5 rounded-full font-bold">VALID</span>
                </div>
                <div className="grid grid-cols-2 gap-1.5 text-xs">
                  <div><p className="text-slate-500 text-[10px]">Traveler</p><p className="text-white font-semibold">J. Martens</p></div>
                  <div><p className="text-slate-500 text-[10px]">Flight</p><p className="text-white font-semibold">AMS → BCN</p></div>
                  <div><p className="text-slate-500 text-[10px]">Discount</p><p className="text-green-400 font-bold text-base">€25 off</p></div>
                  <div><p className="text-slate-500 text-[10px]">Min. spend</p><p className="text-white font-semibold">€100</p></div>
                </div>
                <div className="bg-blue-900/50 rounded-lg p-1.5 text-center">
                  <p className="text-xs text-slate-300">Basket: <span className="text-white font-bold">€148</span> <span className="text-green-400">✓ qualifies</span></p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button className="bg-red-900/50 border border-red-700 text-red-300 rounded-xl py-2 text-xs font-bold">✕ Decline</button>
                <button className="bg-green-600 text-white rounded-xl py-2 text-xs font-bold">✓ Redeem</button>
              </div>
              <p className="text-xs text-slate-500">One tap to confirm. Transaction logged automatically. DutyCredit permanently deactivated.</p>
            </AppCard>
          </div>

          <FlowConnector label="Redemption confirmed — transaction logged in real time ↓" green/>

          {/* PHASE C */}
          <PhaseHeader letter="C" title="After Redemption: Track, Earn & Get Invoiced" sub="Everything logged automatically. Full dashboard visibility. Monthly invoice only." color="bg-green-600"/>
          <div className="grid md:grid-cols-3 gap-4">
            <AppCard stepLabel="Instant" stepTitle="Transaction confirmed" stepColor="green">
              <div className="flex flex-col items-center py-2">
                <div className="w-12 h-12 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center mb-2">
                  <CheckCircle2 className="w-6 h-6 text-green-400"/>
                </div>
                <p className="text-sm font-bold text-white">Redemption Successful</p>
                <p className="text-xs text-slate-400">DutyCredit marked used</p>
              </div>
              <div className="bg-slate-950 rounded-xl border border-slate-700 p-3 space-y-1.5 text-xs">
                {[
                  { l:"Basket Total", v:"€148.00", c:"text-white" },
                  { l:"DutyCredit Applied", v:"− €25.00", c:"text-green-400" },
                  { l:"Traveler Paid", v:"€123.00", c:"text-white font-semibold" },
                  { l:"DutyBoost Fee (2.5%)", v:"€3.70", c:"text-red-300" },
                  { l:"Your Net Revenue", v:"€144.30", c:"text-blue-300 font-bold" },
                ].map(({l,v,c},i)=>(
                  <div key={l} className={`flex justify-between ${i>=2?"border-t border-slate-700 pt-1.5":""}`}>
                    <span className="text-slate-400">{l}</span><span className={c}>{v}</span>
                  </div>
                ))}
              </div>
            </AppCard>

            <AppCard stepLabel="Real-time" stepTitle="Dashboard updates live" stepColor="green">
              <MockDashboard/>
            </AppCard>

            <AppCard stepLabel="Monthly" stepTitle="One invoice from DutyBoost" stepColor="green">
              <div className="bg-slate-950 rounded-xl border border-slate-700 overflow-hidden">
                <div className="bg-slate-800 px-3 py-2 border-b border-slate-700">
                  <p className="text-xs font-bold text-white">DutyBoost · Monthly Invoice</p>
                  <p className="text-[10px] text-slate-400">May 2026 · Relay Store AMS T3</p>
                </div>
                <div className="p-3 space-y-2 text-xs">
                  {[
                    {l:"DutyCredits redeemed",v:"127"},
                    {l:"Total transaction volume",v:"€19,050"},
                    {l:"Platform fee (2.5%)",v:"€476.25"},
                  ].map(({l,v})=>(
                    <div key={l} className="flex justify-between"><span className="text-slate-400">{l}</span><span className="text-white">{v}</span></div>
                  ))}
                  <div className="border-t border-slate-700 pt-2 flex justify-between font-bold">
                    <span className="text-white">Amount Due</span><span className="text-red-300">€476.25</span>
                  </div>
                  <div className="bg-green-900/40 border border-green-700 rounded-lg p-2 text-center">
                    <p className="text-xs text-green-300">You earned €19,050 in extra revenue</p>
                    <p className="text-xs text-green-400 font-bold">ROI this month: 40:1</p>
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-500">One invoice. Pay only on completed transactions. No subscriptions, no surprises.</p>
            </AppCard>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SLIDE 7 — REVENUE CHANNELS
      ══════════════════════════════════════════════════ */}
      <section className="py-20 px-6 bg-slate-900 border-t border-slate-800">
        <div className="max-w-5xl mx-auto">
          <SlideLabel num={7} label="Revenue Channels" color="blue"/>
          <h2 className="text-4xl font-bold text-white mb-2">Three sources of <span className="text-blue-400">pre-motivated buyers</span></h2>
          <p className="text-slate-400 mb-10 text-lg">DutyCredits reach travelers from multiple partner types — each sending a different traveler segment to your store.</p>

          {/* Channel 1 */}
          <ChannelBlock
            num="1" color="blue"
            icon={<Plane className="w-5 h-5 text-blue-400"/>}
            title="Travel Partners & Airlines"
            badge="Largest active channel"
            badgeColor="bg-blue-900/50 text-blue-300 border-blue-700"
            left={[
              "1.4B+ international travel bookings per year (UNWTO 2024)",
              "OTAs (Booking.com, Expedia) process 50%+ of leisure travel",
              "Booking confirmation emails: 60–70% open rate",
              "Avg basket at airport duty-free: €55–€80 (TFWA 2023)",
              "A single mid-size agency = 10k+ travelers/year to Dutch airports",
            ]}
            leftTitle="Travel Agencies & OTAs"
            right={[
              "4.5B passengers flew in 2024 (IATA Global Outlook)",
              "Airline booking confirmation: 70–85% open rate — #1 in travel",
              "Ancillary revenue per pax: €25–€55 (Ideaworks / CarTrawler 2023)",
              "61% of travelers shop at airports on departure (m1nd-set 2023)",
              "Even 1 regional route at AMS = 500k+ pax/year audience",
            ]}
            rightTitle="Airlines & Inflight"
            example="10k travelers × 20% conversion × €75 avg = €150,000 gross / €3,750 fee"
          />

          {/* Channel 2 */}
          <ChannelBlock
            num="2" color="green"
            icon={<Hotel className="w-5 h-5 text-green-400"/>}
            title="Accommodations"
            badge="Future channel — model ready"
            badgeColor="bg-green-900/50 text-green-300 border-green-700"
            left={[
              "2B+ accommodation room nights booked globally per year",
              "Airbnb: 491M bookings in 2024 — short-term rentals now major",
              "Post-stay / departure email open rate: 45–60% (HospitalityNet)",
              "70%+ of accommodation guests travel by air (UNWTO)",
              "Check-out email is the most underutilised high-intent touchpoint",
            ]}
            leftTitle="Industry Context"
            right={[
              "DutyCredit sent at check-out — valid at departure AND arrival stores",
              "Accommodation guests have higher disposable income on average",
              "No operational change for the property — entirely email-based",
              "100k guests × 20% × €75 = €1.5M gross / €37,500 fee",
            ]}
            rightTitle="What this means for your store"
            example="100k guests × 20% conversion × €75 avg = €1.5M gross / €37,500 fee"
          />

          {/* Channel 3 */}
          <ChannelBlock
            num="3" color="orange"
            icon={<Car className="w-5 h-5 text-orange-400"/>}
            title="Car Rental"
            badge="Future channel — model ready"
            badgeColor="bg-orange-900/50 text-orange-300 border-orange-700"
            left={[
              "115M+ car rental transactions per year in Europe (ACRISS 2024)",
              "Booking confirmation email open rate: 70–85%",
              "80% of car rentals connect to or depart from an airport (ACRISS)",
              "Rental booking window: avg 14–28 days in advance",
              "Loyalty is #1 differentiation battleground between Hertz, Avis, Sixt",
            ]}
            leftTitle="Industry Context"
            right={[
              "DutyCredit valid at departure AND arrival airport — doubles window",
              "Booked weeks ahead — traveler has time to plan their €70+ visit",
              "Corporate rental accounts can embed DutyCredit in travel policy",
              "100k rentals × 15% × €80 = €1.2M gross / €30,000 fee",
            ]}
            rightTitle="What this means for your store"
            example="100k rentals × 15% conversion × €80 avg = €1.2M gross / €30,000 fee"
          />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SLIDE 8 — COMBINED REVENUE MODEL
      ══════════════════════════════════════════════════ */}
      <section className="py-20 px-6 bg-gradient-to-br from-slate-950 to-blue-950 border-t border-slate-800">
        <div className="max-w-5xl mx-auto">
          <SlideLabel num={8} label="Combined Revenue Potential" color="orange"/>
          <h2 className="text-4xl font-bold text-white mb-2">What all channels mean for <span className="text-orange-400">1 store</span></h2>
          <p className="text-slate-400 mb-3 text-lg">Conservative model · Single airport store · Min. basket €70 · Mixed channel volume</p>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-blue-800 text-white">
                  <th className="text-left px-4 py-3 rounded-tl-xl">Channel</th>
                  <th className="px-4 py-3 text-center">DutyCredits Issued</th>
                  <th className="px-4 py-3 text-center">Conversion</th>
                  <th className="px-4 py-3 text-center">Avg Spend</th>
                  <th className="px-4 py-3 text-center">Gross Revenue</th>
                  <th className="px-4 py-3 text-center rounded-tr-xl">Fee (2.5%)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {[
                  { ch:"Travel Partners & Airlines", issued:"20,000/yr", conv:"19%", avg:"€77", gross:"€291,000", fee:"€7,275", c:"text-blue-400" },
                  { ch:"Accommodations",             issued:"3,000/yr",  conv:"20%", avg:"€75", gross:"€45,000",  fee:"€1,125", c:"text-green-400" },
                  { ch:"Car Rental",                 issued:"4,000/yr",  conv:"15%", avg:"€80", gross:"€48,000",  fee:"€1,200", c:"text-orange-400" },
                ].map(({ch,issued,conv,avg,gross,fee,c})=>(
                  <tr key={ch} className="bg-slate-800/60 hover:bg-slate-800 transition-colors">
                    <td className={`px-4 py-3 font-semibold ${c}`}>{ch}</td>
                    <td className="px-4 py-3 text-center text-slate-300">{issued}</td>
                    <td className="px-4 py-3 text-center text-slate-300">{conv}</td>
                    <td className="px-4 py-3 text-center text-slate-300">{avg}</td>
                    <td className="px-4 py-3 text-center text-green-400 font-bold">{gross}</td>
                    <td className="px-4 py-3 text-center text-red-300">{fee}</td>
                  </tr>
                ))}
                <tr className="bg-blue-800 text-white font-bold">
                  <td className="px-4 py-3 rounded-bl-xl">TOTAL</td>
                  <td className="px-4 py-3 text-center">27,000/yr</td>
                  <td colSpan={2}/>
                  <td className="px-4 py-3 text-center text-yellow-300 text-lg">€384,000 gross</td>
                  <td className="px-4 py-3 text-center rounded-br-xl">€9,600/yr</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 text-center">
              <p className="text-xs text-slate-400 mb-1">Total Gross Revenue</p>
              <p className="text-4xl font-bold text-white">€384,000</p>
              <p className="text-xs text-slate-500 mt-1">incremental sales you wouldn't have had</p>
            </div>
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 text-center">
              <p className="text-xs text-slate-400 mb-1">Total DutyBoost Fees</p>
              <p className="text-4xl font-bold text-red-300">€9,600</p>
              <p className="text-xs text-slate-500 mt-1">paid only on completed transactions</p>
            </div>
            <div className="bg-blue-700 border border-blue-600 rounded-2xl p-6 text-center">
              <p className="text-xs text-blue-200 mb-1">Your ROI</p>
              <p className="text-4xl font-bold text-white">40:1</p>
              <p className="text-xs text-blue-200 mt-1">€40 earned for every €1 paid to DutyBoost</p>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-4 text-center">* Conservative modelling · Min. basket €70 applied throughout · Actual results may vary</p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SLIDE 9 — DISCOUNT TIERS DETAIL
      ══════════════════════════════════════════════════ */}
      <section className="py-20 px-6 bg-slate-900 border-t border-slate-800">
        <div className="max-w-5xl mx-auto">
          <SlideLabel num={9} label="DutyCredit Tiers — Detail" color="blue"/>
          <h2 className="text-4xl font-bold text-white mb-2">The traveler's incentive — <span className="text-blue-400">how each tier works at your checkout</span></h2>
          <p className="text-slate-400 mb-8 text-lg">Each tier is designed to drive a specific basket size. Bigger spend = bigger saving for the traveler = more revenue for you.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-blue-800 text-white">
                  <th className="text-left px-4 py-3 rounded-tl-xl">Tier</th>
                  <th className="px-4 py-3 text-center">Min. Basket</th>
                  <th className="px-4 py-3 text-center">Max Saving</th>
                  <th className="text-left px-4 py-3 rounded-tr-xl">What it means for your store</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {[
                  { tier:"🟡 Boarding DutyCredit",  min:"€70 – €99",   max:"€5 – €10",  note:"An extra sale you wouldn't have had. Low basket but high volume.", bg:"bg-yellow-900/20" },
                  { tier:"🔵 Priority DutyCredit",  min:"€100 – €199", max:"€15 – €30", note:"Most common tier. Strong incentive for mid-range travelers.", bg:"bg-blue-900/20" },
                  { tier:"🟢 Lounge DutyCredit",    min:"€200 – €299", max:"€35 – €45", note:"Premium traveler segment. Larger baskets, higher-value items.", bg:"bg-green-900/20" },
                  { tier:"🟣 VIP DutyCredit",       min:"€300+",       max:"€60 flat",  note:"Top-tier spend. Maximum revenue impact per transaction.", bg:"bg-purple-900/20" },
                ].map(({tier,min,max,note,bg})=>(
                  <tr key={tier} className={`${bg} hover:bg-white/5 transition-colors`}>
                    <td className="px-4 py-3 font-semibold text-white">{tier}</td>
                    <td className="px-4 py-3 text-center text-slate-300">{min}</td>
                    <td className="px-4 py-3 text-center text-blue-300 font-bold text-base">{max}</td>
                    <td className="px-4 py-3 text-slate-400 text-xs leading-relaxed">{note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 bg-orange-900/30 border border-orange-700 rounded-2xl p-4 text-center">
            <p className="text-orange-300 font-semibold text-sm">⚠ Minimum basket €70 · Single use · Valid departure day through arrival day · Applied automatically at checkout</p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SLIDE 10 — INTEGRATION
      ══════════════════════════════════════════════════ */}
      <section className="py-20 px-6 bg-gradient-to-br from-slate-950 to-slate-900 border-t border-slate-800">
        <div className="max-w-5xl mx-auto">
          <SlideLabel num={10} label="Integration" color="orange"/>
          <h2 className="text-4xl font-bold text-white mb-2">Simple by design. <span className="text-orange-400">Live in days.</span></h2>
          <p className="text-slate-400 mb-10 text-lg">No technical team required. No hardware. No disruption to your existing operations.</p>
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            {[
              { num:"1", title:"Register your store", body:"Sign up at dutyboost.com. Add store name, airport, and category. Takes 5 minutes.", color:"bg-blue-600" },
              { num:"2", title:"Set up QR scanning", body:"Use our web app on any device with a camera. No hardware purchase. No API integration required to start.", color:"bg-purple-600" },
              { num:"3", title:"Receive your first DutyCredits", body:"DutyBoost activates your store. Travelers with DutyCredits for your airport can now visit.", color:"bg-orange-600" },
              { num:"4", title:"Track & grow", body:"Real-time dashboard shows daily scans, revenue, and channel breakdown. Expand to more stores when ready.", color:"bg-green-600" },
            ].map(({num,title,body,color})=>(
              <div key={num} className="bg-slate-800 border border-slate-700 rounded-2xl p-5 space-y-3">
                <div className={`w-10 h-10 rounded-full ${color} flex items-center justify-center text-lg font-bold`}>{num}</div>
                <p className="font-bold text-white text-sm">{title}</p>
                <p className="text-xs text-slate-400 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
          <div className="bg-blue-700 rounded-2xl p-5 text-center">
            <p className="text-white font-semibold">Optional POS API available for high-volume stores — full webhook & transaction sync included.</p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SLIDE 11 — PILOT PLAN
      ══════════════════════════════════════════════════ */}
      <section className="py-20 px-6 bg-slate-900 border-t border-slate-800">
        <div className="max-w-5xl mx-auto">
          <SlideLabel num={11} label="Let's Start Together" color="blue"/>
          <h2 className="text-4xl font-bold text-white mb-2">Pilot: 1–3 stores. <span className="text-blue-400">Zero risk. Real results.</span></h2>
          <p className="text-slate-400 mb-10 text-lg">Three clear phases — from onboarding to scale. No lock-in. Cancel anytime.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { phase:"Phase 1 · Onboard", color:"border-blue-700 bg-blue-900/20", label:"bg-blue-600", labelText:"Weeks 1–2",
                points:["Register 1–3 stores","Set up QR scan app (any device)","Agree on reporting cadence","DutyBoost activates your store","Timeline: 3–5 business days"] },
              { phase:"Phase 2 · Go Live", color:"border-green-700 bg-green-900/20", label:"bg-green-600", labelText:"Month 1",
                points:["First DutyCredits live from agency channel","Staff briefed on QR scan process (10 min)","Live dashboard access granted","First redemptions tracked in real time","Support available throughout"] },
              { phase:"Phase 3 · Scale", color:"border-orange-700 bg-orange-900/20", label:"bg-orange-600", labelText:"Month 2+",
                points:["Review monthly report together","Add airline & hotel channels","Expand to additional store locations","Explore POS API for deeper integration","Continue with no lock-in"] },
            ].map(({phase,color,label,labelText,points})=>(
              <div key={phase} className={`border ${color} rounded-2xl p-6`}>
                <div className="flex items-center gap-2 mb-4">
                  <span className={`${label} text-white text-xs font-bold px-3 py-1 rounded-full`}>{labelText}</span>
                </div>
                <p className="font-bold text-white text-base mb-3">{phase}</p>
                <ul className="space-y-2">
                  {points.map(p=>(
                    <li key={p} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-400 shrink-0 mt-0.5"/>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SLIDE 12 — CTA
      ══════════════════════════════════════════════════ */}
      <section className="py-24 px-6 bg-gradient-to-br from-blue-950 via-slate-950 to-slate-900 border-t border-slate-800 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white">Ready to turn your airport<br/>footfall into <span className="text-orange-400">revenue?</span></h2>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { label:"Performance only", sub:"2.5% fee per transaction" },
              { label:"No upfront cost", sub:"Zero risk to get started" },
              { label:"Live in days", sub:"Simple QR — no POS overhaul" },
            ].map(({label,sub})=>(
              <div key={label} className="bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-center">
                <p className="font-bold text-white text-base">{label}</p>
                <p className="text-blue-300 text-sm">{sub}</p>
              </div>
            ))}
          </div>
          <div className="space-y-3">
            <p className="text-xl font-bold text-white">hello@dutyboost.com · www.dutyboost.com</p>
            <Button onClick={handleDownload} disabled={downloading} size="lg" className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
              <Download className="w-5 h-5"/>
              {downloading ? "Generating..." : "Download Full Presentation (.pptx)"}
            </Button>
          </div>
          <p className="text-xs text-slate-600">© 2026 DutyBoost B.V. · The Future of Airport Retail · Confidential</p>
        </div>
      </section>
    </div>
  );
}

/* ── Reusable sub-components ── */

function SlideLabel({ num, label, color }) {
  const colors = { blue: "bg-blue-500/20 text-blue-300 border-blue-500/30", orange: "bg-orange-500/20 text-orange-300 border-orange-500/30", green: "bg-green-500/20 text-green-300 border-green-500/30" };
  return (
    <div className="flex items-center justify-center gap-2 mb-4">
      <span className={`text-xs font-bold border rounded-full px-3 py-1 ${colors[color]}`}>Slide {num}</span>
      <span className={`text-xs font-semibold uppercase tracking-widest ${colors[color].split(" ")[1]}`}>{label}</span>
    </div>
  );
}

function PhaseHeader({ letter, title, sub, color }) {
  return (
    <div className="flex items-center gap-3 mb-4 mt-2">
      <div className={`w-9 h-9 rounded-full ${color} flex items-center justify-center text-sm font-bold shrink-0`}>{letter}</div>
      <div>
        <p className="font-bold text-white text-base">Phase {letter} — {title}</p>
        <p className="text-xs text-slate-400">{sub}</p>
      </div>
    </div>
  );
}

function FlowConnector({ label, green }) {
  return (
    <div className="flex items-center justify-center gap-3 my-6">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent"/>
      <div className={`flex items-center gap-2 border rounded-full px-4 py-1.5 ${green ? "bg-slate-800 border-green-700" : "bg-slate-800 border-slate-600"}`}>
        {green ? <CheckCircle2 className="w-3.5 h-3.5 text-green-400"/> : <ArrowRight className="w-3.5 h-3.5 text-orange-400"/>}
        <span className="text-xs text-slate-300 font-medium">{label}</span>
      </div>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent"/>
    </div>
  );
}

function AppCard({ stepLabel, stepTitle, stepColor, children }) {
  const colors = { blue: "bg-blue-900/50 border-blue-800 text-blue-300 bg-blue-800", orange: "bg-orange-900/40 border-orange-800 text-orange-300 bg-orange-900", green: "bg-green-900/40 border-green-800 text-green-300 bg-green-900" };
  const borderColors = { blue: "border-blue-800", orange: "border-orange-800", green: "border-green-800" };
  return (
    <div className={`bg-slate-800 ${borderColors[stepColor]} border rounded-2xl overflow-hidden`}>
      <div className={`px-4 py-2 flex items-center gap-2 border-b ${borderColors[stepColor]}`} style={{background: stepColor==="blue"?"rgba(30,58,138,0.5)":stepColor==="orange"?"rgba(124,45,18,0.4)":"rgba(20,83,45,0.4)"}}>
        <span className={`text-xs font-bold px-2 py-0.5 rounded-full text-white`} style={{background:stepColor==="blue"?"#1d4ed8":stepColor==="orange"?"#c2410c":"#16a34a"}}>{stepLabel}</span>
        <span className="text-xs font-medium text-slate-200">{stepTitle}</span>
      </div>
      <div className="p-4 space-y-3">{children}</div>
    </div>
  );
}

function MockDashboard({ empty }) {
  return (
    <div className="bg-slate-950 rounded-xl border border-slate-700 p-3 space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold text-white">Relay Store · AMS T3</p>
        <span className="text-[10px] bg-green-500/20 text-green-400 border border-green-500/30 px-2 py-0.5 rounded-full">ACTIVE</span>
      </div>
      <div className="grid grid-cols-2 gap-1.5">
        {[
          { l:"Today's Revenue", v: empty?"€0":"€1,388", c:"text-green-400" },
          { l:"Scans Today", v: empty?"0":"9", c:"text-blue-300" },
          { l:"This Month", v: empty?"€0":"€18,598", c:"text-purple-300" },
          { l:"Avg. Basket", v: empty?"—":"€154", c:"text-orange-300" },
        ].map(({l,v,c})=>(
          <div key={l} className="bg-slate-800 rounded-lg p-2 border border-slate-700">
            <p className="text-[10px] text-slate-500">{l}</p>
            <p className={`text-sm font-bold ${c}`}>{v}</p>
          </div>
        ))}
      </div>
      {!empty && (
        <div className="bg-slate-800 rounded-lg border border-slate-700 p-2">
          <p className="text-[10px] text-slate-400 mb-1">Recent Transactions</p>
          {[
            {t:"J. Martens — €144.30",ch:"Agency",ago:"just now"},
            {t:"S. Bakker — €187.50",ch:"Airline",ago:"2h ago"},
            {t:"M. Chen — €95.20",ch:"Hotel",ago:"3h ago"},
          ].map(({t,ch,ago})=>(
            <div key={t} className="flex justify-between items-center py-1 border-b border-slate-700/50 last:border-0">
              <span className="text-xs text-white">{t}</span>
              <div className="text-right">
                <span className="text-[10px] text-blue-400 block">{ch}</span>
                <span className="text-[10px] text-slate-500">{ago}</span>
              </div>
            </div>
          ))}
        </div>
      )}
      {empty && <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-2 text-center"><p className="text-xs text-blue-300">Waiting for first DutyCredit redemption...</p></div>}
    </div>
  );
}

function ChannelBlock({ num, color, icon, title, badge, badgeColor, left, leftTitle, right, rightTitle, example }) {
  const headerColors = { blue:"border-blue-800 bg-blue-900/20", green:"border-green-800 bg-green-900/20", orange:"border-orange-800 bg-orange-900/20" };
  const numColors = { blue:"bg-blue-600", green:"bg-green-600", orange:"bg-orange-600" };
  return (
    <div className={`border ${headerColors[color]} rounded-2xl mb-6 overflow-hidden`}>
      <div className={`px-5 py-4 flex items-center justify-between border-b ${headerColors[color]}`}>
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-full ${numColors[color]} flex items-center justify-center text-sm font-bold`}>{num}</div>
          <div className="flex items-center gap-2">{icon}<span className="font-bold text-white text-base">{title}</span></div>
        </div>
        <span className={`text-xs font-bold border rounded-full px-3 py-1 ${badgeColor}`}>{badge}</span>
      </div>
      <div className="grid md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-slate-700">
        <div className="p-5 space-y-2">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">{leftTitle}</p>
          {left.map(f=><p key={f} className="text-xs text-slate-300 leading-relaxed">• {f}</p>)}
        </div>
        <div className="p-5 space-y-2">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">{rightTitle}</p>
          {right.map(f=><p key={f} className="text-xs text-slate-300 leading-relaxed">• {f}</p>)}
        </div>
      </div>
      <div className={`px-5 py-3 border-t border-slate-700 bg-slate-800/50`}>
        <p className="text-xs text-slate-400">📊 Revenue example: <span className="text-white font-medium">{example}</span></p>
      </div>
    </div>
  );
}