import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { base44 } from "@/api/base44Client";
import DutyBoostLogo from "@/components/DutyBoostLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import PageFooter from "@/components/PageFooter";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ShowcaseMobileNav from "@/components/ShowcaseMobileNav";

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

export default function CorporatePartnerRequest() {
  const { t } = useTranslation();
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

  return (
    <div className="min-h-screen bg-background font-body">
      <ShowcaseMobileNav calculatorTo="/roi-calculator-corporate-partner" gradient="linear-gradient(to bottom, #64748b, #334155)" />
      <nav className="hidden sm:block sticky top-0 z-50 backdrop-blur border-b border-border bg-background/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-4">
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <DutyBoostLogo height={55} />
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/corporate-partner-showcase">
              <Button variant="outline" size="sm" className="gap-1.5 text-slate-600 border-slate-600 hover:text-slate-700 hover:bg-slate-50">
                <ArrowLeft className="w-4 h-4 shrink-0" /> {t('common.back')}
              </Button>
            </Link>
            <LanguageSwitcher />
          </div>
        </div>
      </nav>

      <section className="py-12 px-4 sm:px-6">
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
              <Link to="/"><Button variant="outline">{t('requestdemo.back_home')}</Button></Link>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-heading font-bold">{t('common.request_more_info')}</h2>
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
                <Button type="submit" size="lg" className="w-full gap-2 bg-slate-700 hover:bg-slate-800" disabled={!isValid || loading}>
                  {loading ? "Submitting..." : t('common.request_more_info')} <ArrowRight className="w-4 h-4 shrink-0" />
                </Button>
                <p className="text-center text-xs text-muted-foreground">No spam. No sales pitch.</p>
              </form>
            </div>
          )}
        </div>
      </section>

      <PageFooter />
    </div>
  );
}