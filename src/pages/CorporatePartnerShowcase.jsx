import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { base44 } from "@/api/base44Client";
import DutyBoostLogo from "@/components/DutyBoostLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, Calculator, ArrowRight, CheckCircle2, ArrowDown } from "lucide-react";
import { corporateStrings } from "@/lib/i18nCorporate";

const JOB_TITLES = [
  "Head of Corporate Travel",
  "Travel & Expense Manager",
  "Global Travel Manager",
  "Procurement Manager",
  "Finance Director",
  "CFO / Chief Financial Officer",
  "VP Operations",
  "Other",
];

const COUNTRIES = [
  "Netherlands", "Germany", "France", "United Kingdom", "Belgium", "Spain", "Italy",
  "Switzerland", "Austria", "Nordics", "Other Europe", "United States", "Other",
];

const TRIP_VOLUMES = [
  "Under 1,000 trips/year",
  "1,000 – 5,000",
  "5,000 – 20,000",
  "20,000 – 100,000",
  "100,000+",
];

export default function CorporatePartnerShowcase() {
  const { i18n } = useTranslation();
  const lang = (i18n.language || "en").split("-")[0];
  const c = corporateStrings[lang] || corporateStrings.en;
  const o = c.onepager;

  const [form, setForm] = useState({
    fullName: "", email: "", jobTitle: "", company: "", website: "", country: "", trips: "", message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const isValid = form.fullName && form.email && form.jobTitle && form.company && form.website && form.country && form.trips;
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return;
    setLoading(true);
    try {
      await base44.entities.Lead.create({
        full_name: form.fullName,
        email: form.email,
        company_name: form.company,
        website: form.website,
        industry: "Agency",
        position: `${form.jobTitle} — Corporate Travel Partner`,
        phone: form.trips,
      });
      try {
        await base44.integrations.Core.SendEmail({
          to: "hello@dutyboost.com",
          subject: `Corporate Travel Partner enquiry — ${form.company}`,
          body: `
            <div style="font-family: sans-serif; max-width: 560px;">
              <h2>Corporate Travel Partner — Request More Information</h2>
              <table style="width:100%; border-collapse:collapse;">
                <tr><td style="padding:6px 0; color:#666;">Name</td><td><strong>${form.fullName}</strong></td></tr>
                <tr><td style="padding:6px 0; color:#666;">Title</td><td>${form.jobTitle}</td></tr>
                <tr><td style="padding:6px 0; color:#666;">Email</td><td><strong>${form.email}</strong></td></tr>
                <tr><td style="padding:6px 0; color:#666;">Company</td><td><strong>${form.company}</strong></td></tr>
                <tr><td style="padding:6px 0; color:#666;">Website</td><td>${form.website}</td></tr>
                <tr><td style="padding:6px 0; color:#666;">Country</td><td>${form.country}</td></tr>
                <tr><td style="padding:6px 0; color:#666;">Annual trip volume</td><td>${form.trips}</td></tr>
                <tr><td style="padding:6px 0; color:#666;">Message</td><td>${form.message || "—"}</td></tr>
              </table>
            </div>
          `,
        });
      } catch {
        // Email failure is non-blocking
      }
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const whyCards = [
    { title: o.why1_title, desc: o.why1_desc },
    { title: o.why2_title, desc: o.why2_desc },
    { title: o.why3_title, desc: o.why3_desc },
    { title: o.why4_title, desc: o.why4_desc },
  ];
  const steps = [
    { title: o.step1_title, desc: o.step1_desc },
    { title: o.step2_title, desc: o.step2_desc },
    { title: o.step3_title, desc: o.step3_desc },
    { title: o.step4_title, desc: o.step4_desc },
  ];
  const stats = [
    { value: o.stat1_value, label: o.stat1_label, desc: o.stat1_desc },
    { value: o.stat2_value, label: o.stat2_label, desc: o.stat2_desc },
    { value: o.stat3_value, label: o.stat3_label, desc: o.stat3_desc },
  ];

  return (
    <div className="min-h-screen bg-background font-body">
      <nav className="sticky top-0 z-50 backdrop-blur border-b border-border bg-background/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          <Link to="/"><DutyBoostLogo height={42} /></Link>
          <div className="flex items-center gap-2">
            <Link to="/roi-calculator-corporate-partner">
              <Button variant="outline" size="sm" className="gap-1.5 text-slate-600 border-slate-600 hover:text-slate-700 hover:bg-slate-50">
                <Calculator className="w-4 h-4 shrink-0" /> ROI Calculator
              </Button>
            </Link>
            <Button size="sm" className="gap-1.5" onClick={() => document.getElementById("request-info")?.scrollIntoView({ behavior: "smooth" })}>
              Request Information <ArrowRight className="w-4 h-4 shrink-0" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden pt-12 pb-12 px-4 sm:px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-500/5 via-background to-primary/5 pointer-events-none" />
        <div className="absolute top-10 right-10 w-72 h-72 bg-slate-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-4xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-2 bg-slate-500/10 text-slate-600 text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-widest">
            <Building2 className="w-3.5 h-3.5" /> {o.badge}
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold tracking-tight leading-tight">
            {o.headline}
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">{o.subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Button size="lg" className="gap-2" onClick={() => document.getElementById("request-info")?.scrollIntoView({ behavior: "smooth" })}>
              {o.cta} <ArrowRight className="w-4 h-4 shrink-0" />
            </Button>
            <Link to="/roi-calculator-corporate-partner">
              <Button size="lg" variant="outline" className="gap-2 w-full sm:w-auto">
                <Calculator className="w-4 h-4 shrink-0" /> Estimate your commission
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-center mb-10">{o.s1_title}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {whyCards.map((w, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-6 space-y-2">
                <div className="w-10 h-10 rounded-xl bg-slate-500/10 flex items-center justify-center mb-2">
                  <CheckCircle2 className="w-5 h-5 text-slate-600" />
                </div>
                <h3 className="font-heading font-bold text-base">{w.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How */}
      <section className="py-12 px-4 sm:px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-center mb-10">{o.s2_title}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map((s, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-6 space-y-2 relative">
                <span className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-slate-600 text-white text-sm font-bold flex items-center justify-center">{i + 1}</span>
                <h3 className="font-heading font-bold text-base pt-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Numbers */}
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-center mb-10">{o.s3_title}</h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {stats.map((s, i) => (
              <div key={i} className="bg-gradient-to-br from-slate-500/10 to-primary/5 border border-border rounded-2xl p-8 text-center space-y-2">
                <div className="text-4xl font-heading font-bold text-slate-600">{s.value}</div>
                <div className="font-semibold text-sm">{s.label}</div>
                <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="py-10 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-slate-600 via-slate-600/90 to-primary/80 rounded-3xl p-10 text-white shadow-xl text-center space-y-5">
            <h2 className="text-3xl font-heading font-bold">{o.cta}</h2>
            <Button size="lg" className="bg-white text-slate-600 hover:bg-white/90 gap-2" onClick={() => document.getElementById("request-info")?.scrollIntoView({ behavior: "smooth" })}>
              Request more information <ArrowDown className="w-4 h-4 shrink-0" />
            </Button>
          </div>
        </div>
      </section>

      {/* Request More Information form */}
      <section id="request-info" className="py-12 px-4 sm:px-6">
        <div className="max-w-lg mx-auto">
          {submitted ? (
            <div className="text-center space-y-5">
              <div className="w-20 h-20 rounded-full bg-slate-500/10 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10 text-slate-600" />
              </div>
              <h2 className="text-3xl font-heading font-bold">Thank you{form.fullName ? `, ${form.fullName.split(" ")[0]}` : ""}!</h2>
              <p className="text-muted-foreground max-w-sm mx-auto">
                Your enquiry has been received. The DutyBoost team will reach out shortly to walk you through the Corporate Travel Partner programme.
              </p>
              <Link to="/"><Button variant="outline">Back to home</Button></Link>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-heading font-bold">Request More Information</h2>
                <p className="text-muted-foreground text-sm">Tell us about your travel programme and we'll prepare a tailored cost-recovery estimate.</p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4 bg-card border border-border rounded-2xl p-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label>Full name <span className="text-red-500">*</span></Label>
                    <Input required placeholder="Jane Smith" value={form.fullName} onChange={(e) => set("fullName", e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Work email <span className="text-red-500">*</span></Label>
                    <Input required type="email" placeholder="jane@company.com" value={form.email} onChange={(e) => set("email", e.target.value)} />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label>Job title <span className="text-red-500">*</span></Label>
                  <Select value={form.jobTitle} onValueChange={(v) => set("jobTitle", v)}>
                    <SelectTrigger><SelectValue placeholder="Select your role" /></SelectTrigger>
                    <SelectContent>{JOB_TITLES.map((j) => <SelectItem key={j} value={j}>{j}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label>Company <span className="text-red-500">*</span></Label>
                    <Input required placeholder="Your company" value={form.company} onChange={(e) => set("company", e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Website <span className="text-red-500">*</span></Label>
                    <Input required placeholder="https://yourcompany.com" value={form.website} onChange={(e) => set("website", e.target.value)} />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label>Country <span className="text-red-500">*</span></Label>
                    <Select value={form.country} onValueChange={(v) => set("country", v)}>
                      <SelectTrigger><SelectValue placeholder="Select country" /></SelectTrigger>
                      <SelectContent>{COUNTRIES.map((co) => <SelectItem key={co} value={co}>{co}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label>Annual business trips <span className="text-red-500">*</span></Label>
                    <Select value={form.trips} onValueChange={(v) => set("trips", v)}>
                      <SelectTrigger><SelectValue placeholder="Select volume" /></SelectTrigger>
                      <SelectContent>{TRIP_VOLUMES.map((tr) => <SelectItem key={tr} value={tr}>{tr}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label>Message <span className="text-muted-foreground text-xs">(optional)</span></Label>
                  <textarea
                    className="w-full min-h-[80px] rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring resize-none"
                    placeholder="Anything you'd like us to know?"
                    value={form.message}
                    onChange={(e) => set("message", e.target.value)}
                  />
                </div>
                <Button type="submit" size="lg" className="w-full gap-2" disabled={!isValid || loading}>
                  {loading ? "Submitting..." : "Request more information"} <ArrowRight className="w-4 h-4 shrink-0" />
                </Button>
                <p className="text-center text-xs text-muted-foreground">No spam. No sales pitch.</p>
              </form>
            </div>
          )}
        </div>
      </section>

      <footer className="border-t border-border py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <DutyBoostLogo height={42} />
          <p>© {new Date().getFullYear()} DutyBoost B.V.</p>
        </div>
      </footer>
    </div>
  );
}