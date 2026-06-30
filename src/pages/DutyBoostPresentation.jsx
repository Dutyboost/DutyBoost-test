import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Download, ArrowRight, Users, Target, Zap, DollarSign, BarChart3, Store, TrendingUp, Euro, ScanLine, QrCode, Terminal, Monitor, Smartphone, CheckCircle2, PlaneTakeoff, Globe, Sparkles, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import DutyBoostLogo from "@/components/DutyBoostLogo";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import FooterLinks from "@/components/FooterLinks";
import AirportRetailerIcon from "@/components/AirportRetailerIcon";
import TravelAgencyIcon from "@/components/TravelAgencyIcon";
import TravelerIcon from "@/components/TravelerIcon";
import PresentationAggregation from "@/components/presentation/PresentationAggregation";
import { AIRPORT_RETAIL_COMPANIES } from "@/data/airportRetailCompanies";
import { fmtNum, fmtEur } from "@/utils/formatNumber";
import { computeCompanyTotals, computeCompanyStoreCount } from "@/utils/retailerCalc";

export default function DutyBoostPresentation() {
  const [downloading, setDownloading] = useState(false);
  const [selectedCompanyIdx, setSelectedCompanyIdx] = useState(1);
  const [conversionRate] = useState(3);

  const company = AIRPORT_RETAIL_COMPANIES[selectedCompanyIdx];
  const totals = useMemo(
    () => computeCompanyTotals(company.airports, conversionRate),
    [company, conversionRate]
  );
  const storeCount = useMemo(
    () => company.storeCount ?? computeCompanyStoreCount(company.airports),
    [company]
  );

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const { exportDutyBoostPptx } = await import("@/utils/exportDutyBoostPptx");
      await exportDutyBoostPptx(company, conversionRate);
    } catch (err) {
      console.error("Failed to download:", err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background font-body">
      <nav className="sticky top-0 z-50 backdrop-blur border-b border-border bg-background/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-4">
          <DutyBoostLogo height={100} />
          <div className="flex items-center gap-2">
            <select
              className="text-sm border border-input rounded-lg px-3 py-1.5 bg-background max-w-[200px] hidden md:block"
              value={selectedCompanyIdx}
              onChange={e => setSelectedCompanyIdx(Number(e.target.value))}
            >
              {AIRPORT_RETAIL_COMPANIES.map((c, i) => (
                <option key={c.name} value={i}>{c.name}</option>
              ))}
            </select>
            <LanguageSwitcher />
            <Link to="/">
              <Button size="sm" variant="ghost" className="text-muted-foreground">Home</Button>
            </Link>
            <Button onClick={handleDownload} disabled={downloading} size="sm" className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90">
              <Download className="w-3.5 h-3.5" />
              {downloading ? "Generating..." : "Download PPTX"}
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 space-y-24">

        {/* HERO */}
        <section className="relative overflow-hidden text-center space-y-8 py-8">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5 pointer-events-none rounded-3xl" />
          <div className="absolute top-0 right-0 w-72 h-72 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative space-y-6">
            <p className="text-xs font-bold uppercase tracking-widest text-accent">The Travel Retail Conversion Layer</p>
            <h1 className="text-5xl sm:text-6xl font-heading font-bold leading-tight">
              Turning Pre-Departure
              <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Passengers into Shoppers</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Three stakeholders. One platform. Everyone wins — with real numbers to prove it.
            </p>
            <div className="flex flex-wrap gap-3 justify-center pt-2">
              <span className="px-4 py-2 rounded-full bg-card border border-border text-foreground text-sm font-medium">Performance-based pricing</span>
              <span className="px-4 py-2 rounded-full bg-card border border-border text-foreground text-sm font-medium">2 API calls to integrate</span>
              <span className="px-4 py-2 rounded-full bg-card border border-border text-foreground text-sm font-medium">Live in 1–2 days</span>
            </div>
          </div>
        </section>

        {/* WHY — The Problem */}
        <section className="space-y-8">
          <div className="border-l-4 border-accent pl-6">
            <p className="text-xs font-bold uppercase tracking-widest text-accent mb-1">Why</p>
            <h2 className="text-3xl font-heading font-bold">Thousands walk by daily. Most don't stop.</h2>
            <p className="text-muted-foreground mt-2">Airport retail has a conversion problem. Travelers arrive with no intent to buy.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Target, title: "Low conversion", desc: "Only 15–25% of departing passengers shop at airport retail. The rest walk past your stores with wallets closed." },
              { icon: Users, title: "No pre-activation", desc: "Travelers arrive with no incentive to buy. Generic ads and terminal signage don't influence purchase decisions." },
              { icon: DollarSign, title: "High acquisition cost", desc: "Promotions and loyalty programs cost upfront with no guarantee of return. You pay whether or not anyone shops." },
            ].map(({ icon: Icon, title, desc }, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-6 space-y-4 hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center">
                  <Icon className="w-8 h-8 text-red-500" />
                </div>
                <p className="font-heading font-bold text-lg">{title}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            {[
              { val: "4.8B", label: "Annual air passengers globally" },
              { val: "68.8M", label: "Daily departing travelers worldwide" },
              { val: "1h 10m", label: "Average dwell time at the gate" },
              { val: "€95B", label: "Global airport retail market" },
            ].map(({ val, label }, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-5 text-center space-y-1 hover:shadow-md transition-shadow">
                <p className="text-3xl font-heading font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{val}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{label}</p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-primary/5 to-accent/5 border border-border rounded-2xl p-6 space-y-3">
            <p className="font-heading font-bold text-lg flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              The DutyBoost opportunity
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              DutyBoost pre-activates just <span className="font-bold text-foreground">3%</span> of departing travelers — turning browsers into motivated buyers before they reach your store. They arrive with a DutyCredit in hand, ready to spend. You only pay when they do.
            </p>
          </div>
        </section>

        {/* HOW — The Ecosystem */}
        <section className="space-y-8">
          <div className="border-l-4 border-primary pl-6">
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">How</p>
            <h2 className="text-3xl font-heading font-bold">Three flows. One platform.</h2>
            <p className="text-muted-foreground mt-2">DutyBoost connects travel partners, travelers, and airport retailers in a closed-loop incentive engine.</p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-8">
            <div className="grid md:grid-cols-3 gap-6 items-center">
              {[
                { Icon: TravelAgencyIcon, bg: "bg-green-50", iconColor: "text-green-600", label: "Travel Partner", desc: "Issues DutyCredits to bookers", arrow: true },
                { Icon: TravelerIcon, bg: "bg-blue-50", iconColor: "text-blue-600", label: "Traveler", desc: "Receives DutyCredit → shops at airport", arrow: true },
                { Icon: AirportRetailerIcon, bg: "bg-orange-50", iconColor: "text-orange-600", label: "Airport Retailer", desc: "Scans QR → incremental revenue", arrow: false },
              ].map(({ Icon, bg, iconColor, label, desc, arrow }, i) => (
                <div key={i} className="relative space-y-3 text-center">
                  <div className={`w-16 h-16 rounded-2xl ${bg} flex items-center justify-center mx-auto`}>
                    <Icon className={`w-9 h-9 ${iconColor}`} />
                  </div>
                  <p className="font-heading font-bold">{label}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed max-w-[200px] mx-auto">{desc}</p>
                  {arrow && (
                    <div className="hidden md:flex absolute top-8 -right-3 items-center">
                      <ArrowRight className="w-5 h-5 text-primary/50" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Flow 1 — Traveller */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500 flex items-center justify-center">
                <TravelerIcon className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-emerald-600">Flow 1</p>
                <h3 className="text-2xl font-heading font-bold">The Traveller</h3>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Receives a DutyCredit from their travel partner — or claims one themselves from the DutyBoost platform. No app to download, no loyalty card to carry.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { title: "Guaranteed discount", desc: "Save up to €60 per shopping basket at participating airport stores.", stat: "Up to €60", statLabel: "per basket" },
                { title: "No app needed", desc: "One QR code at checkout. No signup friction, no loyalty card.", stat: "0", statLabel: "apps to install" },
                { title: "Real value", desc: "Genuine discounts at stores they were already walking past.", stat: "12%", statLabel: "avg discount" },
              ].map(({ title, desc, stat, statLabel }, i) => (
                <div key={i} className="bg-card border border-emerald-200 rounded-xl p-5 space-y-3">
                  <p className="text-3xl font-heading font-bold text-emerald-600">{stat}</p>
                  <p className="text-xs text-muted-foreground">{statLabel}</p>
                  <p className="font-semibold text-sm">{title}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Flow 2 — Travel Partner */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-500 flex items-center justify-center">
                <TravelAgencyIcon className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-blue-600">Flow 2</p>
                <h3 className="text-2xl font-heading font-bold">The Travel Partner</h3>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Gives DutyCredits to travelers for booking on their platform. Travelers get a tangible perk — and the partner earns passive ancillary revenue from every redemption.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { title: "More loyalty", desc: "Travelers get a reason to book again. DutyCredit = a perk that costs nothing upfront.", stat: "+15%", statLabel: "repeat bookings" },
                { title: "Passive revenue", desc: "Earn commission on every DutyCredit redemption your travelers make at airport retail.", stat: "€2–5", statLabel: "per redemption" },
                { title: "Zero effort", desc: "One-click API integration. No development needed — we handle everything.", stat: "1 click", statLabel: "to integrate" },
              ].map(({ title, desc, stat, statLabel }, i) => (
                <div key={i} className="bg-card border border-blue-200 rounded-xl p-5 space-y-3">
                  <p className="text-3xl font-heading font-bold text-blue-600">{stat}</p>
                  <p className="text-xs text-muted-foreground">{statLabel}</p>
                  <p className="font-semibold text-sm">{title}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Flow 3 — Airport Retailer */}
          <div className="bg-orange-50 border border-orange-200 rounded-2xl p-8 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-orange-500 flex items-center justify-center">
                <AirportRetailerIcon className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-orange-600">Flow 3</p>
                <h3 className="text-2xl font-heading font-bold">The Airport Retailer</h3>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Inform passing travelers with signage and counter stands. Scan travelers who come into the store. Use in-store QR code signage to inform walking travelers about DutyBoost — increasing basket size on the spot.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { title: "Store signage", desc: "Counter signage and entrance stands inform travelers that you accept DutyCredits — increasing footfall.", stat: "+3%", statLabel: "incremental conversion" },
                { title: "Scan & redeem", desc: "Cashier scans the traveler's QR code. Two API calls. Discount applied automatically at the till.", stat: "2 calls", statLabel: "to integrate" },
                { title: "In-store QR stands", desc: "Place QR code signage in-store so walking travelers can claim a DutyBoost credit — increasing basket size.", stat: "+1%", statLabel: "basket uplift" },
              ].map(({ title, desc, stat, statLabel }, i) => (
                <div key={i} className="bg-card border border-orange-200 rounded-xl p-5 space-y-3">
                  <p className="text-3xl font-heading font-bold text-orange-600">{stat}</p>
                  <p className="text-xs text-muted-foreground">{statLabel}</p>
                  <p className="font-semibold text-sm">{title}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHAT — Global Aggregation */}
        <section className="space-y-8">
          <div className="border-l-4 border-accent pl-6">
            <p className="text-xs font-bold uppercase tracking-widest text-accent mb-1">What — Revenue Projection</p>
            <h2 className="text-3xl font-heading font-bold">Global Aggregation Revenue</h2>
            <p className="text-muted-foreground mt-2">
              Select a company to see the potential revenue across their entire airport network at 3% conversion.
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <label className="text-sm font-semibold text-muted-foreground shrink-0">Company:</label>
            <select
              className="text-sm border border-input rounded-lg px-3 py-2 bg-background w-full sm:max-w-md"
              value={selectedCompanyIdx}
              onChange={e => setSelectedCompanyIdx(Number(e.target.value))}
            >
              {AIRPORT_RETAIL_COMPANIES.map((c, i) => (
                <option key={c.name} value={i}>{c.name}</option>
              ))}
            </select>
            <div className="flex gap-4 text-sm text-muted-foreground ml-auto">
              <span><strong className="text-foreground">{fmtNum(company.airports.length)}</strong> airports</span>
              <span><strong className="text-foreground">{fmtNum(storeCount)}</strong> stores</span>
              <span><strong className="text-foreground">{fmtNum(totals.totalDailyTravelers)}</strong> daily travelers</span>
            </div>
          </div>

          <PresentationAggregation company={company} conversionRate={conversionRate} />

          <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg px-4 py-2.5">
            <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-700">
              <span className="font-semibold">Incremental revenue:</span> These figures represent DutyBoost's target for incremental performance — an additional 3% of pre-departure travelers who shop because they were pre-activated by a DutyCredit. This sits on top of the existing 15–25% baseline shopping rate. Net revenue is what the retailer keeps after the traveler discount and platform fee (2.5%, capped at €25).
            </p>
          </div>
        </section>

        {/* WHAT — POS Implementation */}
        <section className="space-y-8">
          <div className="border-l-4 border-primary pl-6">
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">What — POS Implementation</p>
            <h2 className="text-3xl font-heading font-bold">Go live in 1–2 days</h2>
            <p className="text-muted-foreground mt-2">Two API calls. Works with any POS system. No overhaul needed.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Terminal, label: "Recommended", labelColor: "bg-green-100 text-green-700", title: "Option A — API Integration", desc: "Your POS software calls the DutyBoost API directly. Full automation, real-time validation, no manual steps. Requires a developer to add ~50 lines of code." },
              { icon: Monitor, label: "No dev needed", labelColor: "bg-blue-100 text-blue-700", title: "Option B — DutyBoost Terminal", desc: "We provide a dedicated tablet at your till. Cashier enters or scans the code on the DutyBoost device. No changes to your existing POS." },
              { icon: Smartphone, label: "Simple fallback", labelColor: "bg-amber-100 text-amber-700", title: "Option C — Manual Dashboard", desc: "Log into your DutyBoost retailer dashboard on any device and look up voucher codes manually. No tech integration required — best for low-volume stores." },
            ].map(({ icon: Icon, label, labelColor, title, desc }, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-5 space-y-3 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${labelColor}`}>{label}</span>
                </div>
                <p className="font-semibold text-sm">{title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
            <p className="font-semibold">How it works in your store</p>
            <div className="grid md:grid-cols-4 gap-3">
              {[
                { num: "1", title: "Customer presents QR", desc: "Traveler shows their DutyBoost QR code — at any point: entering the store, browsing, or at the till" },
                { num: "2", title: "Cashier scans & validates", desc: "Your POS scanner reads the QR and calls the DutyBoost API. The DutyCredit is instantly confirmed and reserved" },
                { num: "3", title: "Customer continues shopping", desc: "If scanned early, the voucher is held while the customer browses. If at checkout, proceed directly to step 4" },
                { num: "4", title: "Basket entered & discount applied", desc: "Once the final basket total is known, enter it to calculate and apply the tiered credit automatically" },
              ].map(s => (
                <div key={s.num} className="bg-muted/30 border border-border rounded-xl p-4 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">{s.num}</div>
                  <p className="font-semibold text-sm">{s.title}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Basket spend</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Traveler discount</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">DutyBoost fee</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Your net revenue</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { tier: "€70–€99", save: "€5", fee: "€1.75", net: "€56–€86" },
                  { tier: "€100–€199", save: "€10+", fee: "€2.50–€5", net: "€83–€169" },
                  { tier: "€200–€299", save: "€30+", fee: "€5–€7.50", net: "€150–€234" },
                  { tier: "€300–€1,000", save: "Up to €60", fee: "max €25", net: "€215+ net" },
                  { tier: "€1,000+", save: "Up to €60", fee: "€0 (all above €1k is yours)", net: "€940+" },
                ].map(({ tier, save, fee, net }) => (
                  <tr key={tier} className="border-b border-border hover:bg-muted/30 transition-colors">
                    <td className="px-5 py-4 font-semibold">{tier}</td>
                    <td className="px-5 py-4 font-semibold text-accent">{save}</td>
                    <td className="px-5 py-4 text-muted-foreground">{fee}</td>
                    <td className="px-5 py-4 font-bold text-primary">{net}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground">Platform fee: 2.5% of net sales, capped at €25 on baskets up to €1,000. All basket value above €1,000 goes entirely to you — no platform fee.</p>
        </section>

        {/* WHAT — Dashboard Preview */}
        <section className="space-y-8">
          <div className="border-l-4 border-accent pl-6">
            <p className="text-xs font-bold uppercase tracking-widest text-accent mb-1">What — Your Dashboard</p>
            <h2 className="text-3xl font-heading font-bold">Real-time analytics at your fingertips</h2>
            <p className="text-muted-foreground mt-2">Three tabs give you full visibility into your DutyBoost performance.</p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              <p className="font-heading font-bold text-lg">Dashboard Tab</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { label: "Total Redemptions", value: fmtNum(totals.dailyRedemptions * 30), icon: ScanLine, color: "text-blue-500" },
                { label: "Net Revenue", value: fmtEur(totals.monthlyNet, 0), icon: Euro, color: "text-orange-500" },
                { label: "Avg Sale", value: `€${totals.avgBasket.toFixed(0)}`, icon: TrendingUp, color: "text-emerald-500" },
                { label: "Platform Fee", value: fmtEur(totals.monthlyFee, 0), icon: Store, color: "text-purple-500" },
                { label: "Potential +1%", value: `€${(totals.avgBasket * 1.01).toFixed(0)}`, icon: Sparkles, color: "text-indigo-500" },
              ].map(({ label, value, icon: Icon, color }) => (
                <div key={label} className="bg-muted/30 border border-border rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground font-medium">{label}</p>
                    <Icon className={`w-4 h-4 ${color}`} />
                  </div>
                  <p className="text-lg font-heading font-bold">{value}</p>
                </div>
              ))}
            </div>
            <div className="bg-muted/30 border border-border rounded-xl p-4 space-y-2">
              <p className="text-xs font-semibold text-muted-foreground">Revenue Breakdown</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Gross Sales</span><span className="font-semibold">{fmtEur(totals.monthlyNet + totals.monthlyFee, 0)}</span></div>
                <div className="flex justify-between text-rose-600"><span>Traveler Savings (DutyCredit)</span><span className="font-semibold">- {fmtEur(totals.dailyRedemptions * 30 * totals.avgBasket * 0.1, 0)}</span></div>
                <div className="flex justify-between text-destructive"><span>Platform Fee (2.5%)</span><span className="font-semibold">- {fmtEur(totals.monthlyFee, 0)}</span></div>
                <div className="border-t border-border pt-2 flex justify-between"><span className="font-semibold">Your Net Revenue</span><span className="font-bold text-emerald-600">{fmtEur(totals.monthlyNet, 0)}</span></div>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-primary" />
              <p className="font-heading font-bold text-lg">Aggregation Tab</p>
            </div>
            <p className="text-sm text-muted-foreground">All airports combined. Total redemptions, gross revenue, platform fee, and net revenue across your entire network.</p>
            <PresentationAggregation company={company} conversionRate={conversionRate} compact />
          </div>

          <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Store className="w-5 h-5 text-primary" />
              <p className="font-heading font-bold text-lg">Profile Tab</p>
            </div>
            <p className="text-sm text-muted-foreground">Company details, store list, contact info, integration settings. API keys, webhook URLs, and billing configuration — all in one place.</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-muted/30 border border-border rounded-xl p-4 space-y-2">
                <p className="text-xs font-semibold text-muted-foreground">Company</p>
                <p className="font-semibold text-sm">{company.name}</p>
              </div>
              <div className="bg-muted/30 border border-border rounded-xl p-4 space-y-2">
                <p className="text-xs font-semibold text-muted-foreground">Network</p>
                <p className="font-semibold text-sm">{fmtNum(company.airports.length)} airports · {fmtNum(storeCount)} stores</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section>
          <div className="bg-gradient-to-br from-primary via-primary/90 to-primary/70 rounded-3xl p-12 text-primary-foreground shadow-2xl relative overflow-hidden text-center space-y-6">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />
            <div className="relative space-y-4">
              <p className="text-xs font-bold uppercase tracking-widest text-primary-foreground/70">Ready to boost your retail?</p>
              <h2 className="text-3xl font-heading font-bold">Start converting voucher traffic into revenue</h2>
              <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
                Connect with our team to discuss integration, see a live demo, and see what DutyBoost can do for {company.name}.
              </p>
              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <a href="mailto:rael@dutyboost.com">
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90 gap-2 px-8">
                    rael@dutyboost.com <ArrowRight className="w-4 h-4" />
                  </Button>
                </a>
                <Button onClick={handleDownload} disabled={downloading} size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 gap-2 px-8">
                  <Download className="w-4 h-4" />
                  {downloading ? "Generating..." : "Download as PPTX"}
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>

      <footer className="border-t border-border py-8 sm:py-10 px-4 sm:px-6 mt-10">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <DutyBoostLogo height={100} />
            <div className="text-right">
              <p>© 2026 DutyBoost. All rights reserved.</p>
              <p className="text-xs mt-0.5">Chamber of Commerce (KvK): 42053181</p>
            </div>
          </div>
          <FooterLinks />
        </div>
      </footer>
    </div>
  );
}