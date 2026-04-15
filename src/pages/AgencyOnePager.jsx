import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Printer, ArrowLeft, TrendingUp, Zap, Users } from "lucide-react";
import DutyBoostLogo from "../components/DutyBoostLogo";

export default function AgencyOnePager() {
  return (
    <div className="min-h-screen font-body" style={{ background: 'linear-gradient(135deg, hsl(216 60% 97%) 0%, hsl(217 50% 95%) 25%, hsl(216 45% 96%) 50%, hsl(220 40% 97%) 75%, hsl(216 55% 96%) 100%)', backgroundAttachment: 'fixed' }}>
      {/* Print toolbar — hidden when printing */}
      <div className="print:hidden sticky top-0 z-50 bg-white border-b border-border px-6 py-3 flex items-center justify-between">
        <Link to="/agency-showcase">
          <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        </Link>
        <Button onClick={() => window.print()} className="gap-2 bg-green-600 hover:bg-green-700 text-white">
          <Printer className="w-4 h-4" /> Download / Print PDF
        </Button>
      </div>

      {/* A4-style content */}
      <div className="max-w-[794px] mx-auto px-10 py-6 print:py-0 print:px-0 space-y-5">

        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-green-500 pb-2">
          <div>
            <DutyBoostLogo height={200} />
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">Partner Overview</p>
            <h1 className="text-xl font-heading font-bold text-green-700 mt-0.5">For Travel Agencies</h1>
          </div>
        </div>

        {/* Tagline */}
        <div className="text-center space-y-1.5">
          <h2 className="text-3xl font-heading font-bold leading-tight">
            Turn Every Booking Into{" "}
            <span className="text-green-600">Additional Revenue</span>
          </h2>
          <p className="text-muted-foreground text-sm max-w-xl mx-auto">
            DutyBoost lets you automatically reward travelers with airport shopping credits — at zero operational cost — while you earn a commission on every redemption.
          </p>
        </div>

        {/* Value pillars */}
        <div className="grid grid-cols-3 gap-4">
          {[
            {
              icon: TrendingUp,
              color: "text-green-600",
              bg: "bg-green-50",
              title: "New Revenue Stream",
              desc: "Earn a commission every time a traveler redeems their DutyCredit at an airport store. No cap. No effort."
            },
            {
              icon: Zap,
              color: "text-blue-600",
              bg: "bg-blue-50",
              title: "Zero Operational Burden",
              desc: "Credits are generated automatically based on booking data. No customer service, no redemption handling — we do it all."
            },
            {
              icon: Users,
              color: "text-purple-600",
              bg: "bg-purple-50",
              title: "Elevated Customer Experience",
              desc: "Travelers receive a personalized DutyCredit with their booking confirmation — a meaningful loyalty perk that sets you apart."
            },
          ].map(({ icon: Icon, color, bg, title, desc }) => (
            <div key={title} className="rounded-xl border border-border p-4 space-y-2">
              <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center`}>
                <Icon className={`w-4 h-4 ${color}`} />
              </div>
              <h3 className="font-heading font-bold text-xs">{title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* How it works */}
        <div className="space-y-2">
          <h3 className="font-heading font-bold text-sm border-b border-border pb-1.5">How It Works — 4 Simple Steps</h3>
          <div className="grid grid-cols-4 gap-3">
            {[
              { num: "01", title: "Booking confirmed", desc: "Traveler books a flight through your platform" },
              { num: "02", title: "Credit generated", desc: "DutyBoost auto-generates a DutyCredit based on ticket value & destination" },
              { num: "03", title: "Email delivered", desc: "Traveler receives a branded email with their QR-code voucher" },
              { num: "04", title: "Redeemed at airport", desc: "Traveler scans QR at participating airport shops — you earn commission" },
            ].map(s => (
              <div key={s.num} className="space-y-1">
                <p className="text-2xl font-heading font-bold text-green-200">{s.num}</p>
                <p className="font-semibold text-xs">{s.title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Key numbers */}
        <div className="bg-green-50 rounded-xl p-4 grid grid-cols-3 gap-4 text-center">
          {[
            { value: "€1–€3", label: "Average agency commission per booking" },
            { value: "1%", label: "Agency commission on each redemption" },
            { value: "< 1 day", label: "API integration time" },
          ].map(({ value, label }) => (
            <div key={label}>
              <p className="text-2xl font-heading font-bold text-green-700">{value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Integration */}
        <div className="space-y-1.5">
          <h3 className="font-heading font-bold text-sm border-b border-border pb-1.5">Simple API Integration</h3>
          <p className="text-xs text-muted-foreground">
            One POST call per booking is all it takes. DutyBoost handles everything else — credit calculation, email delivery, QR generation, and travel agency payouts.
          </p>
        </div>

        {/* Footer CTA */}
        <div className="border-t-2 border-green-500 pt-4 flex items-center justify-between">
          <div>
            <p className="font-heading font-bold text-sm">Ready to get started?</p>
            <p className="text-xs text-muted-foreground">Contact us or register directly at <span className="text-green-600 font-semibold">dutyboost.com/agency-signup</span></p>
          </div>
          <div className="text-right text-xs text-muted-foreground">
            <p>integrations@dutyboost.com</p>
            <p>dutyboost.com</p>
            <p className="mt-0.5">© 2026 Borderless Solutions B.V.</p>
          </div>
        </div>

      </div>
    </div>
  );
}