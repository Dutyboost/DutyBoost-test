import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { base44 } from "@/api/base44Client";
import DutyBoostLogo from "@/components/DutyBoostLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, ArrowLeft, CheckCircle2, Package } from "lucide-react";
import PageFooter from "@/components/PageFooter";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ShowcaseMobileNav from "@/components/ShowcaseMobileNav";
import { getWholesaleRequestStrings } from "@/lib/i18nWholesaleRequest";

export default function WholesalePartnerRequest() {
  const { t, i18n } = useTranslation();
  const r = getWholesaleRequestStrings(i18n.language);
  const COUNTRIES = t('corporaterequest.countries', { returnObjects: true });
  const [form, setForm] = useState({
    fullName: "", email: "", jobTitle: "", company: "", website: "", country: "", categories: "", customers: "", message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const isValid = form.fullName && form.email && form.jobTitle && form.company && form.website && form.country && form.categories && form.customers;
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
        position: `${form.jobTitle} — Wholesale Partner`,
        phone: form.customers,
      });
      try {
        await base44.integrations.Core.SendEmail({
          to: "hello@dutyboost.com",
          subject: `Wholesale / Supplier enquiry — ${form.company}`,
          body: `
            <div style="font-family: sans-serif; max-width: 560px;">
              <h2>Wholesale / Retail Supplier — Request More Information</h2>
              <table style="width:100%; border-collapse:collapse;">
                <tr><td style="padding:6px 0; color:#666;">Name</td><td><strong>${form.fullName}</strong></td></tr>
                <tr><td style="padding:6px 0; color:#666;">Title</td><td>${form.jobTitle}</td></tr>
                <tr><td style="padding:6px 0; color:#666;">Email</td><td><strong>${form.email}</strong></td></tr>
                <tr><td style="padding:6px 0; color:#666;">Company</td><td><strong>${form.company}</strong></td></tr>
                <tr><td style="padding:6px 0; color:#666;">Website</td><td>${form.website}</td></tr>
                <tr><td style="padding:6px 0; color:#666;">Country</td><td>${form.country}</td></tr>
                <tr><td style="padding:6px 0; color:#666;">Categories</td><td>${form.categories}</td></tr>
                <tr><td style="padding:6px 0; color:#666;">Retail customers</td><td>${form.customers}</td></tr>
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
      <ShowcaseMobileNav calculatorTo="/wholesale-calculator" gradient="linear-gradient(to bottom, #059669, #047857)" />
      <nav className="hidden sm:block sticky top-0 z-50 backdrop-blur border-b border-border bg-background/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-4">
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <DutyBoostLogo height={55} />
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/wholesale-showcase">
              <Button variant="outline" size="sm" className="gap-1.5 text-emerald-600 border-emerald-600 hover:text-emerald-700 hover:bg-emerald-50">
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
              <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10 text-emerald-600" />
              </div>
              <h2 className="text-3xl font-heading font-bold">{r.success_title.replace('{name}', form.fullName ? `, ${form.fullName.split(" ")[0]}` : '')}</h2>
              <p className="text-muted-foreground max-w-sm mx-auto">{r.success_desc}</p>
              <Link to="/"><Button variant="outline">{r.back_home}</Button></Link>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-700 text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-widest">
                  <Package className="w-3.5 h-3.5" /> Wholesale / Retail Supplier
                </div>
                <h2 className="text-3xl font-heading font-bold">{t('common.request_more_info')}</h2>
                <p className="text-muted-foreground text-sm">{r.subtitle}</p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4 bg-card border border-border rounded-2xl p-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label>{r.label_full_name} <span className="text-red-500">*</span></Label>
                    <Input required placeholder="Jane Smith" value={form.fullName} onChange={(e) => set("fullName", e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <Label>{r.label_work_email} <span className="text-red-500">*</span></Label>
                    <Input required type="email" placeholder="jane@supplier.com" value={form.email} onChange={(e) => set("email", e.target.value)} />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label>{r.label_job_title} <span className="text-red-500">*</span></Label>
                  <Select value={form.jobTitle} onValueChange={(v) => set("jobTitle", v)}>
                    <SelectTrigger><SelectValue placeholder={r.placeholder_job_title} /></SelectTrigger>
                    <SelectContent>{r.job_titles.map((j) => <SelectItem key={j} value={j}>{j}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label>{r.label_company} <span className="text-red-500">*</span></Label>
                    <Input required placeholder={r.placeholder_company} value={form.company} onChange={(e) => set("company", e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <Label>{r.label_website} <span className="text-red-500">*</span></Label>
                    <Input required placeholder="https://yourcompany.com" value={form.website} onChange={(e) => set("website", e.target.value)} />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label>{r.label_country} <span className="text-red-500">*</span></Label>
                    <Select value={form.country} onValueChange={(v) => set("country", v)}>
                      <SelectTrigger><SelectValue placeholder={t('corporaterequest.placeholder_country')} /></SelectTrigger>
                      <SelectContent>{COUNTRIES.map((co) => <SelectItem key={co} value={co}>{co}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label>{r.label_categories} <span className="text-red-500">*</span></Label>
                    <Input required placeholder={r.placeholder_categories} value={form.categories} onChange={(e) => set("categories", e.target.value)} />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label>{r.label_customers} <span className="text-red-500">*</span></Label>
                  <Select value={form.customers} onValueChange={(v) => set("customers", v)}>
                    <SelectTrigger><SelectValue placeholder={r.label_customers} /></SelectTrigger>
                    <SelectContent>{r.customer_volumes.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>{r.label_message} <span className="text-muted-foreground text-xs">{r.optional}</span></Label>
                  <textarea
                    className="w-full min-h-[80px] rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring resize-none"
                    placeholder={r.placeholder_message}
                    value={form.message}
                    onChange={(e) => set("message", e.target.value)}
                  />
                </div>
                <Button type="submit" size="lg" className="w-full gap-2 bg-emerald-600 hover:bg-emerald-700" disabled={!isValid || loading}>
                  {loading ? r.submitting : t('common.request_more_info')} <ArrowRight className="w-4 h-4 shrink-0" />
                </Button>
                <p className="text-center text-xs text-muted-foreground">{r.no_spam}</p>
              </form>
            </div>
          )}
        </div>
      </section>

      <PageFooter />
    </div>
  );
}