import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { base44 } from "@/api/base44Client";
import DutyBoostLogo from "@/components/DutyBoostLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, CheckCircle2, Download } from "lucide-react";
import PageFooter from "@/components/PageFooter";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ShowcaseMobileNav from "@/components/ShowcaseMobileNav";
import MultiSelectComboBox from "@/components/survey/MultiSelectComboBox";
import CountrySelect from "@/components/request/CountrySelect";
import { STAKEHOLDER_CONFIG, getStakeholderRequestStrings } from "@/lib/i18nStakeholderRequest";
import { getRetailerConfirmationStrings } from "@/lib/i18nRetailerConfirmation";
import { POS_PROVIDERS } from "@/data/posProviders";
import { downloadRetailerPosConfirmation } from "@/utils/exportRetailerPosConfirmationPdf";

const EMPTY = {
  fullName: "", email: "", jobTitle: "", company: "", website: "", country: "", volume: "",
  posProviders: [], posOther: "",
  posContactName: "", posContactEmail: "", posContactPhone: "",
  siCompany: "", siContactName: "", siContactEmail: "", siContactPhone: "",
  submissionMode: "authorise", confirmed: false, message: "",
};

function Required() {
  return <span className="text-red-500"> *</span>;
}

/**
 * Airport retailer page that doubles as a document generator: the retailer
 * confirms its interest in the DutyBoost–POS integration and can download a
 * confirmation document to send to its system integrator, or authorise
 * DutyBoost to submit it on its behalf.
 */
export default function RetailerPosConfirmation() {
  const { t, i18n } = useTranslation();
  const cfg = STAKEHOLDER_CONFIG.retailer;
  const r = getStakeholderRequestStrings("retailer", i18n.language);
  const s = getRetailerConfirmationStrings(i18n.language);
  const JOB_TITLES = t("corporaterequest.job_titles", { returnObjects: true });
  const COUNTRIES = t("corporaterequest.countries", { returnObjects: true });
  const Icon = cfg.Icon;

  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const posOptions = [...POS_PROVIDERS, r.pos_other];
  const posValues = form.posProviders.map((p) =>
    p === r.pos_other && form.posOther.trim() ? `${p}: ${form.posOther.trim()}` : p
  );
  const needsPosOther = form.posProviders.includes(r.pos_other) && !form.posOther.trim();
  const isValid =
    form.fullName && form.email && form.jobTitle && form.company && form.website && form.country && form.volume &&
    form.posProviders.length > 0 && !needsPosOther &&
    form.siCompany && form.siContactName && form.siContactEmail &&
    form.posContactName && form.posContactEmail && form.confirmed;
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleDownload = async (e) => {
    e.preventDefault();
    if (!isValid) return;
    await downloadRetailerPosConfirmation({ strings: s.doc, form, posValues });
  };

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
        industry: cfg.industry,
        position: `${form.jobTitle} — ${cfg.positionSuffix}`,
        phone: form.volume,
        pos_providers: posValues,
        pos_contact_name: form.posContactName,
        pos_contact_email: form.posContactEmail,
        pos_contact_phone: form.posContactPhone,
        si_company_name: form.siCompany,
        si_contact_name: form.siContactName,
        si_contact_email: form.siContactEmail,
        si_contact_phone: form.siContactPhone,
        submission_authorisation: form.submissionMode === "self" ? "Retailer submits directly" : "DutyBoost submits on retailer's behalf",
      });
      try {
        await base44.integrations.Core.SendEmail({
          to: "hello@dutyboost.com",
          subject: `${cfg.emailSubject} — POS integration confirmation — ${form.company}`,
          body: `
            <div style="font-family: sans-serif; max-width: 560px;">
              <h2>${r.badge} — POS Integration Confirmation of Interest</h2>
              <table style="width:100%; border-collapse:collapse;">
                <tr><td style="padding:6px 0; color:#666;">Name</td><td><strong>${form.fullName}</strong></td></tr>
                <tr><td style="padding:6px 0; color:#666;">Title</td><td>${form.jobTitle}</td></tr>
                <tr><td style="padding:6px 0; color:#666;">Email</td><td><strong>${form.email}</strong></td></tr>
                <tr><td style="padding:6px 0; color:#666;">Company</td><td><strong>${form.company}</strong></td></tr>
                <tr><td style="padding:6px 0; color:#666;">Website</td><td>${form.website}</td></tr>
                <tr><td style="padding:6px 0; color:#666;">Country</td><td>${form.country}</td></tr>
                <tr><td style="padding:6px 0; color:#666;">${r.label_volume}</td><td>${form.volume}</td></tr>
                <tr><td style="padding:6px 0; color:#666;">${r.label_pos}</td><td>${posValues.join(", ")}</td></tr>
                <tr><td style="padding:6px 0; color:#666;">POS contact</td><td>${form.posContactName} — ${form.posContactEmail} — ${form.posContactPhone || "—"}</td></tr>
                <tr><td style="padding:6px 0; color:#666;">System integrator</td><td>${form.siCompany} — ${form.siContactName} — ${form.siContactEmail} — ${form.siContactPhone || "—"}</td></tr>
                <tr><td style="padding:6px 0; color:#666;">Authorisation</td><td>${form.submissionMode === "self" ? s.consent_self : s.consent_authorise}</td></tr>
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
      <ShowcaseMobileNav calculatorTo={cfg.calculatorTo} gradient={cfg.gradient} />
      <nav className="hidden sm:block sticky top-0 z-50 backdrop-blur border-b border-border bg-background/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-4">
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <DutyBoostLogo height={55} />
          </Link>
          <LanguageSwitcher />
        </div>
      </nav>

      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          {submitted ? (
            <div className="text-center space-y-5">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto ${cfg.iconCircleClass}`}>
                <CheckCircle2 className={`w-10 h-10 ${cfg.iconClass}`} />
              </div>
              <h2 className="text-3xl font-heading font-bold">
                {s.success_title.replace("{name}", form.fullName ? `, ${form.fullName.split(" ")[0]}` : "")}
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto">{s.success_desc}</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button size="lg" className={`gap-2 ${cfg.buttonClass}`} onClick={handleDownload}>
                  <Download className="w-4 h-4" /> {s.success_download}
                </Button>
                <Link to="/"><Button variant="outline">{t("corporaterequest.back_home")}</Button></Link>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className={`inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-widest ${cfg.badgeClass}`}>
                  <Icon className="w-3.5 h-3.5 shrink-0" /> {r.badge}
                </div>
                <h2 className="text-3xl font-heading font-bold">{s.title}</h2>
                <p className="text-muted-foreground text-sm max-w-xl mx-auto">{s.subtitle}</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Retailer details */}
                <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
                  <h3 className="font-heading font-semibold">{s.sec_retailer}</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label>{t("corporaterequest.label_full_name")}<Required /></Label>
                      <Input required placeholder="Jane Smith" value={form.fullName} onChange={(e) => set("fullName", e.target.value)} />
                    </div>
                    <div className="space-y-1.5">
                      <Label>{t("corporaterequest.label_work_email")}<Required /></Label>
                      <Input required type="email" placeholder="jane@company.com" value={form.email} onChange={(e) => set("email", e.target.value)} />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label>{t("corporaterequest.label_job_title")}<Required /></Label>
                    <Select value={form.jobTitle} onValueChange={(v) => set("jobTitle", v)}>
                      <SelectTrigger><SelectValue placeholder={t("corporaterequest.placeholder_job_title")} /></SelectTrigger>
                      <SelectContent>{JOB_TITLES.map((j) => <SelectItem key={j} value={j}>{j}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label>{t("corporaterequest.label_company")}<Required /></Label>
                      <Input required placeholder={t("corporaterequest.placeholder_company")} value={form.company} onChange={(e) => set("company", e.target.value)} />
                    </div>
                    <div className="space-y-1.5">
                      <Label>{t("corporaterequest.label_website")}<Required /></Label>
                      <Input required placeholder="https://yourcompany.com" value={form.website} onChange={(e) => set("website", e.target.value)} />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label>{t("corporaterequest.label_country")}<Required /></Label>
                      <CountrySelect
                        value={form.country}
                        onChange={(v) => set("country", v)}
                        options={COUNTRIES}
                        placeholder={t("corporaterequest.placeholder_country")}
                        searchPlaceholder={t("corporaterequest.country_search")}
                        emptyText={t("corporaterequest.country_no_match")}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label>{r.label_volume}<Required /></Label>
                      <Select value={form.volume} onValueChange={(v) => set("volume", v)}>
                        <SelectTrigger><SelectValue placeholder={r.placeholder_volume} /></SelectTrigger>
                        <SelectContent>{cfg.volumes.map((v) => <SelectItem key={v} value={v}>{v}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* POS environment */}
                <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
                  <h3 className="font-heading font-semibold">{s.sec_pos}</h3>
                  <MultiSelectComboBox
                    label={r.label_pos}
                    options={posOptions}
                    value={form.posProviders}
                    onChange={(v) => set("posProviders", v)}
                    placeholder={r.placeholder_pos}
                    searchPlaceholder={r.pos_search}
                    emptyText={r.pos_empty}
                    selectedText={r.pos_selected}
                  />
                  {form.posProviders.includes(r.pos_other) && (
                    <div className="space-y-1.5">
                      <Label>{r.label_pos_other}<Required /></Label>
                      <Input required value={form.posOther} onChange={(e) => set("posOther", e.target.value)} placeholder={r.placeholder_pos_other} />
                    </div>
                  )}
                </div>

                {/* Retailer's POS contact */}
                <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
                  <h3 className="font-heading font-semibold">{s.sec_pos_contact}</h3>
                  <div className="space-y-1.5">
                    <Label>{s.label_pos_contact_name}<Required /></Label>
                    <Input required value={form.posContactName} onChange={(e) => set("posContactName", e.target.value)} placeholder="Jane Smith" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label>{s.label_pos_contact_email}<Required /></Label>
                      <Input required type="email" value={form.posContactEmail} onChange={(e) => set("posContactEmail", e.target.value)} placeholder="jane@company.com" />
                    </div>
                    <div className="space-y-1.5">
                      <Label>{s.label_pos_contact_phone} <span className="text-muted-foreground text-xs">{t("corporaterequest.optional")}</span></Label>
                      <Input type="tel" value={form.posContactPhone} onChange={(e) => set("posContactPhone", e.target.value)} placeholder="+31 20 123 4567" />
                    </div>
                  </div>
                </div>

                {/* System integrator contact */}
                <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
                  <h3 className="font-heading font-semibold">{s.sec_si}</h3>
                  <div className="space-y-1.5">
                    <Label>{s.label_si_company}<Required /></Label>
                    <Input required value={form.siCompany} onChange={(e) => set("siCompany", e.target.value)} placeholder={s.ph_si_company} />
                  </div>
                  <div className="space-y-1.5">
                    <Label>{s.label_si_contact_name}<Required /></Label>
                    <Input required value={form.siContactName} onChange={(e) => set("siContactName", e.target.value)} placeholder="John Doe" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label>{s.label_si_contact_email}<Required /></Label>
                      <Input required type="email" value={form.siContactEmail} onChange={(e) => set("siContactEmail", e.target.value)} placeholder="john@integrator.com" />
                    </div>
                    <div className="space-y-1.5">
                      <Label>{s.label_si_contact_phone} <span className="text-muted-foreground text-xs">{t("corporaterequest.optional")}</span></Label>
                      <Input type="tel" value={form.siContactPhone} onChange={(e) => set("siContactPhone", e.target.value)} placeholder="+31 20 123 4567" />
                    </div>
                  </div>
                </div>

                {/* Authorisation */}
                <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
                  <h3 className="font-heading font-semibold">{s.sec_consent}</h3>
                  <p className="text-sm text-muted-foreground">{s.consent_intro}</p>
                  <div className="space-y-2">
                    {[
                      { key: "authorise", text: s.consent_authorise },
                      { key: "self", text: s.consent_self },
                    ].map((opt) => (
                      <label
                        key={opt.key}
                        className={`flex items-start gap-3 rounded-xl border p-3 cursor-pointer transition-colors ${
                          form.submissionMode === opt.key ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="submissionMode"
                          className="mt-1 accent-primary"
                          checked={form.submissionMode === opt.key}
                          onChange={() => set("submissionMode", opt.key)}
                        />
                        <span className="text-sm text-foreground">{opt.text}</span>
                      </label>
                    ))}
                  </div>
                  <label className="flex items-start gap-3 cursor-pointer pt-1">
                    <input
                      type="checkbox"
                      className="mt-0.5 accent-primary"
                      checked={form.confirmed}
                      onChange={(e) => set("confirmed", e.target.checked)}
                    />
                    <span className="text-sm text-foreground">
                      {s.consent_confirm.replace("{company}", form.company || t("corporaterequest.placeholder_company"))}
                    </span>
                  </label>
                </div>

                {/* Optional message */}
                <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
                  <div className="space-y-1.5">
                    <Label>{t("corporaterequest.label_message")} <span className="text-muted-foreground text-xs">{t("corporaterequest.optional")}</span></Label>
                    <textarea
                      className="w-full min-h-[80px] rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring resize-none"
                      placeholder={t("corporaterequest.placeholder_message")}
                      value={form.message}
                      onChange={(e) => set("message", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  <Button type="submit" size="lg" className={`gap-2 ${cfg.buttonClass}`} disabled={!isValid || loading}>
                    {loading ? t("corporaterequest.submitting") : s.btn_submit} <ArrowRight className="w-4 h-4 shrink-0" />
                  </Button>
                  <Button type="button" size="lg" variant="outline" className="gap-2" onClick={handleDownload} disabled={!isValid}>
                    <Download className="w-4 h-4 shrink-0" /> {s.btn_download}
                  </Button>
                </div>
                <p className="text-center text-xs text-muted-foreground">{s.download_hint}</p>
              </form>
            </div>
          )}
        </div>
      </section>

      <PageFooter />
    </div>
  );
}