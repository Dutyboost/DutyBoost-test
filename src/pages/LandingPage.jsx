import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Plane, Zap, BarChart3, QrCode, Store, Users, TrendingUp,
  ShieldCheck, Globe2, ChevronRight, Star, ArrowRight
} from "lucide-react";

const stakeholders = [
  {
    icon: Users,
    title: "Travel Agencies",
    color: "from-violet-500 to-indigo-600",
    bg: "bg-violet-50",
    iconColor: "text-violet-600",
    description: "Turn every booking into a loyalty asset. Automatically generate personalised discount vouchers for your travelers based on group size, destination, and ticket value — at zero extra effort. Earn a 20% margin on every voucher redeemed by your travelers at the airport.",
    benefits: ["Increase traveler satisfaction", "Zero integration friction", "Boost repeat bookings"],
  },
  {
    icon: Store,
    title: "Airport Retailers",
    color: "from-amber-400 to-orange-500",
    bg: "bg-amber-50",
    iconColor: "text-amber-600",
    description: "Convert passing travelers into paying customers. Receive targeted, pre-qualified shoppers with buying intent already activated by a personalised incentive. Our small 5% commission applies only when a voucher is actually redeemed - you pay nothing unless we deliver a sale.",
    benefits: ["Higher basket conversion", "Real-time QR redemption", "Revenue share tracking"],
  },
  {
    icon: Plane,
    title: "Travelers",
    color: "from-sky-400 to-cyan-500",
    bg: "bg-sky-50",
    iconColor: "text-sky-600",
    description: "Enjoy exclusive discounts at your departure airport — automatically matched to your flight. No sign-ups. Just scan and save.",
    benefits: ["Instant mobile voucher", "Relevant, local offers", "Seamless QR experience"],
  },
];

const features = [
  {
    icon: Zap,
    title: "Dynamic Discount Engine",
    description: "Discounts calculated in real-time from ticket price, group size, and travel distance. Always fair, always optimal.",
  },
  {
    icon: QrCode,
    title: "QR-Based Redemption",
    description: "One-tap QR scan at the point of sale. Instant validation, zero friction for retailer and traveler alike.",
  },
  {
    icon: BarChart3,
    title: "Revenue Share Tracking",
    description: "Full transaction transparency. Every redemption is logged with platform revenue, retailer share, and discount applied.",
  },
  {
    icon: ShieldCheck,
    title: "Single-Use Security",
    description: "Each voucher is cryptographically unique and invalidated upon redemption — no double dipping, ever.",
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
  { value: "25%", label: "Max dynamic discount" },
  { value: "1-scan", label: "Instant QR redemption" },
  { value: "100%", label: "QR-based, paperless" },
  { value: "5%", label: "Commission on redeemed sales only" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background font-body">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Plane className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-heading font-bold text-lg">DutyBoost</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link to="/dashboard">
              <Button size="sm" className="gap-1">
                Get Started <ChevronRight className="w-3 h-3" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden pt-20 pb-24 px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5 pointer-events-none" />
        <div className="absolute top-10 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center space-y-8">
          <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-1.5 text-sm font-medium">
            <Star className="w-3 h-3 mr-1.5 inline" />
            World's First Dynamic Airport Incentive Platform
          </Badge>

          <h1 className="text-5xl md:text-7xl font-heading font-bold tracking-tight leading-tight">
            Turn Every Flight Into{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Airport Revenue
            </span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            DutyBoost is the first <strong className="text-foreground">Travel Retail Conversion Layer</strong> — connecting travel agencies, airport retailers, and travelers through intelligent, dynamic discount vouchers that unlock spending at the gate.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Link to="/dashboard">
              <Button size="lg" className="gap-2 px-8 text-base">
                Launch Platform <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <a href="#how-it-works">
              <Button size="lg" variant="outline" className="px-8 text-base">
                See How It Works
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 px-6 border-y border-border bg-card/50">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-4xl font-heading font-bold text-primary">{s.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stakeholders */}
      <section id="how-it-works" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
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
                  <div className={`w-14 h-14 rounded-2xl ${s.bg} flex items-center justify-center mb-5`}>
                    <Icon className={`w-7 h-7 ${s.iconColor}`} />
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
      <section className="py-20 px-6 bg-card/30 border-y border-border">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14 space-y-3">
            <Badge variant="outline" className="text-xs tracking-widest uppercase px-4 py-1">The Flow</Badge>
            <h2 className="text-4xl font-heading font-bold">From Booking to Basket</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Agency books a flight", desc: "Travel agency submits booking details — price, travelers, destination." },
              { step: "02", title: "Voucher generated", desc: "Dynamic discount calculated instantly and a unique QR voucher issued." },
              { step: "03", title: "Traveler shops", desc: "Traveler presents QR at the airport retailer of their choice." },
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
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
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
      <section className="py-24 px-6">
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
                Join DutyBoost and become part of the first intelligent Travel Retail Conversion Layer connecting agencies, retailers, and travelers globally.
              </p>
              <Link to="/dashboard">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 gap-2 px-8 text-base mt-2">
                  Access the Platform <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
              <Plane className="w-3 h-3 text-primary-foreground" />
            </div>
            <span className="font-heading font-semibold text-foreground">DutyBoost</span>
            <span>— Dynamic Airport Incentive Platform</span>
          </div>
          <p>© 2026 DutyBoost. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}