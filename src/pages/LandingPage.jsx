import { Link } from "react-router-dom";
import DutyBoostLogo from "../components/DutyBoostLogo";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Zap, BarChart3, QrCode, TrendingUp,
  ShieldCheck, Globe2, ChevronRight, Star, ArrowRight
} from "lucide-react";
import TravelAgencyIcon from "../components/TravelAgencyIcon";
import AirportRetailerIcon from "../components/AirportRetailerIcon";
import TravelerIcon from "../components/TravelerIcon";

const stakeholders = [
  {
    icon: TravelerIcon,
    title: "Travellers",
    color: "from-sky-400 to-cyan-500",
    bg: "bg-sky-50",
    iconColor: "text-sky-600",
    description: "Enjoy exclusive discounts at your departure airport — automatically earned through your booking. No sign-ups, no paperwork. Just scan your DutyCredit and save. Valid on purchases of €50 or more at a single point of sale.",
    benefits: ["Instant mobile DutyCredit", "Single-store, full discount", "Seamless QR experience"],
  },
  {
    icon: AirportRetailerIcon,
    title: "Airport Retailers",
    color: "from-amber-400 to-orange-500",
    bg: "bg-amber-50",
    iconColor: "text-amber-600",
    description: "Convert passing travelers into paying customers. Receive targeted, pre-qualified shoppers with buying intent already activated by a personalised DutyCredit incentive. Our commission applies only when a DutyCredit is actually redeemed — you pay nothing unless we deliver a sale.",
    benefits: ["Higher basket conversion", "Real-time QR redemption", "Revenue share tracking"],
  },
  {
    icon: TravelAgencyIcon,
    title: "Travel Agencies",
    color: "from-violet-500 to-indigo-600",
    bg: "bg-violet-50",
    iconColor: "text-violet-600",
    description: "Turn every booking into a loyalty asset. Automatically generate personalised DutyCredits for your travelers — exclusive incentives earned through their booking, based on group size, destination, and ticket value — at zero extra effort. Earn a margin on every DutyCredit redeemed by your travelers at the airport.",
    benefits: ["Increase traveler satisfaction", "Zero integration friction", "Boost repeat bookings"],
  },
];

const features = [
  {
    icon: Zap,
    title: "Dynamic Incentive Engine",
    description: "Incentives calculated in real-time from ticket price, group size, and travel distance. Always fair, always optimal.",
  },
  {
    icon: QrCode,
    title: "QR-Based Redemption",
    description: "One-tap QR scan at the point of sale. Instant validation, zero friction for retailer and traveler alike.",
  },
  {
    icon: BarChart3,
    title: "Revenue Share Tracking",
    description: "Full transaction transparency. Every redemption is logged with platform revenue, retailer share, and incentive applied.",
  },
  {
    icon: ShieldCheck,
    title: "Single-Use Security",
    description: "Each DutyCredit is cryptographically unique and invalidated upon redemption — no double dipping, ever.",
  },
  {
    icon: Globe2,
    title: "Multi-Airport Ready",
    description: "Scale across any number of airports and markets. Retailers, agencies, and travelers all in one unified platform.",
  },
  {
    icon: TrendingUp,
    title: "Admin Intelligence",
    description: "A real-time admin panel surfaces KPIs, transaction history, and revenue metrics across the full ecosystem.",
  },
];

const stats = [
  { value: "€0", label: "Setup & usage fee" },
  { value: "25%", label: "Max dynamic incentive" },
  { value: "1-scan", label: "Instant QR redemption" },
  { value: "100%", label: "QR-based, paperless" },
  { value: "5%", label: "Commission on redeemed sales only" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background font-body">
      {/* Nav */}
      <nav className="sticky top-0 z-50 backdrop-blur border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-24 flex items-center justify-between pt-0">
          <div className="flex items-center">
            <DutyBoostLogo height={130} />
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => base44.auth.redirectToLogin('/dashboard')}>Sign In</Button>
            <Button size="sm" className="gap-1" onClick={() => window.location.href = '/get-started'}>
                Get Started <ChevronRight className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden pt-12 pb-14 px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5 pointer-events-none" />
        <div className="absolute top-10 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center space-y-8">
          <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-1.5 text-sm font-medium">
            <Star className="w-3 h-3 mr-1.5 inline" />
            World's First Dynamic Airport Incentive Platform
          </Badge>

          <h1 className="text-5xl md:text-7xl font-heading font-bold tracking-tight leading-tight">
            Turn every travel booking into{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              airport spending
            </span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            DutyBoost is the first <strong className="text-foreground">Travel Retail Conversion Layer</strong> — connecting travel agencies, airport retailers, and travelers through intelligent <strong className="text-foreground">DutyCredits</strong>: booking-earned incentives that unlock spending at the gate.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Button size="lg" className="gap-2 px-8 text-base" onClick={() => window.location.href = '/get-started'}>
                Launch Platform <ArrowRight className="w-4 h-4" />
            </Button>
            <a href="#how-it-works">
              <Button size="lg" variant="outline" className="px-8 text-base">
                See How It Works
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 px-6 border-y border-border bg-card/50">
        <div className="max-w-5xl mx-auto grid grid-cols-3 md:grid-cols-5 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-4xl font-heading font-bold text-primary">{s.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stakeholders */}
      <section id="how-it-works" className="py-14 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 space-y-4">
            <Badge variant="outline" className="text-xs tracking-widest uppercase px-4 py-1">Ecosystem</Badge>
            <h2 className="text-4xl font-heading font-bold">One Platform, Three Winners</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              DutyBoost aligns incentives across every stakeholder in the airport retail journey — creating value at every touchpoint.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {stakeholders.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.title} className="bg-card rounded-2xl border border-border p-8 hover:shadow-lg transition-shadow group">
                  <div className={`w-24 h-24 rounded-2xl ${s.bg} flex items-center justify-center mb-5`}>
                    <Icon className={`w-24 h-24 ${s.iconColor}`} />
                  </div>
                  <h3 className="font-heading font-bold text-xl mb-3">{s.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-5">{s.description}</p>
                  <ul className="space-y-2">
                    {s.benefits.map((b) => (
                      <li key={b} className="flex items-center gap-2 text-sm">
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${s.color} shrink-0`} />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works flow */}
      <section className="py-12 px-6 bg-card/30 border-y border-border">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 space-y-3">
            <Badge variant="outline" className="text-xs tracking-widest uppercase px-4 py-1">The Flow</Badge>
            <h2 className="text-4xl font-heading font-bold">From Booking to Basket</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Traveler books a flight", desc: "Booking details — price, number of travelers, destination are automatically taken from the booking details." },
              { step: "02", title: "DutyCredit earned", desc: "A DutyCredit — a booking-earned incentive with a dynamic discount — is instantly calculated and issued as a unique QR code." },
              { step: "03", title: "Traveler shops", desc: "Traveler presents QR at a participating airport retailer. Browse the store map at dutyboost.com/airport-map to find stores near your gate." },
              { step: "04", title: "All parties win", desc: "Retailer logs the sale, discount applied, platform revenue tracked." },
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="bg-card rounded-2xl border border-border p-6 h-full">
                  <p className="text-4xl font-heading font-bold text-primary/20 mb-3">{item.step}</p>
                  <h4 className="font-heading font-semibold mb-2">{item.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-14 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 space-y-4">
            <Badge variant="outline" className="text-xs tracking-widest uppercase px-4 py-1">Platform</Badge>
            <h2 className="text-4xl font-heading font-bold">Built for the Modern Airport</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Every feature engineered to remove friction from the retail conversion loop.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="group p-6 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-md transition-all">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="font-heading font-semibold mb-2">{f.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-gradient-to-br from-primary via-primary/90 to-primary/70 rounded-3xl p-12 text-primary-foreground shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />
            <div className="relative space-y-6">
              <Badge className="bg-white/20 text-white border-white/30 text-sm px-4 py-1">Ready to launch?</Badge>
              <h2 className="text-4xl font-heading font-bold">
                The Future of Airport Retail Starts Here
              </h2>
              <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto">
                Join DutyBoost and become part of the first intelligent Travel Retail Conversion Layer — where every booking earns a DutyCredit that converts travelers into airport shoppers.
              </p>
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 gap-2 px-8 text-base mt-2" onClick={() => window.location.href = '/get-started'}>
                  Access the Platform <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-10 px-6 bg-transparent">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <DutyBoostLogo height={130} />
              <span className="text-muted-foreground">— Dynamic Airport Incentive Platform</span>
            </div>
            <p>© 2026 DutyBoost. All rights reserved.</p>
          </div>
          <div className="flex flex-wrap justify-center md:justify-start gap-x-5 gap-y-2 text-xs text-muted-foreground border-t border-border pt-4">
            <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link to="/dpa" className="hover:text-primary transition-colors">Data Processing Agreement</Link>
            <Link to="/refunds" className="hover:text-primary transition-colors">Refund Policy</Link>
            <Link to="/code-of-conduct" className="hover:text-primary transition-colors">Code of Conduct</Link>
            <Link to="/cookies" className="hover:text-primary transition-colors">Cookie Policy</Link>
            <Link to="/faq" className="hover:text-primary transition-colors">FAQ</Link>
            <Link to="/user-guide" className="hover:text-primary transition-colors">User Guide</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}