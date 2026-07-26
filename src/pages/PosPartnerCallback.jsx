import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import DutyBoostLogo from "../components/DutyBoostLogo";
import LanguageSwitcher from "../components/LanguageSwitcher";
import {
  ArrowLeft, Loader2, Plug, ShieldCheck, Zap, Clock
} from "lucide-react";
import { toast } from "sonner";

const FREE_EMAIL_DOMAINS = [
  'gmail.com','googlemail.com','yahoo.com','yahoo.co.uk','yahoo.fr','yahoo.de',
  'hotmail.com','hotmail.co.uk','hotmail.fr','hotmail.de','hotmail.nl',
  'outlook.com','live.com','msn.com','icloud.com','me.com','mac.com',
  'aol.com','protonmail.com','proton.me','mail.com','gmx.com','gmx.net',
  'yandex.com','yandex.ru','inbox.com','zohomail.com','tutanota.com',
];

function isRealName(name) {
  const trimmed = name.trim();
  return /^[a-zA-ZÀ-ÖØ-öø-ÿ'\-]+(\s+[a-zA-ZÀ-ÖØ-öø-ÿ'\-]+)+$/.test(trimmed);
}

function isWorkEmail(email) {
  const parts = email.toLowerCase().split('@');
  if (parts.length !== 2) return false;
  return !FREE_EMAIL_DOMAINS.includes(parts[1]);
}

function isValidPhone(phone) {
  const digits = phone.replace(/\D/g, '');
  return /^[+]?[\d\s\-().]{7,20}$/.test(phone.trim()) && digits.length >= 7;
}

function extractDomain(url) {
  try {
    let u = url.trim();
    if (!/^https?:\/\//i.test(u)) u = 'https://' + u;
    return new URL(u).hostname.toLowerCase().replace(/^www\./, '');
  } catch {
    return null;
  }
}

function isValidWebsite(url) {
  const domain = extractDomain(url);
  if (!domain) return false;
  return /^[a-z0-9\-]+\.[a-z]{2,}/.test(domain);
}

function domainsMatch(email, website) {
  const emailDomain = email.toLowerCase().split('@')[1];
  const websiteDomain = extractDomain(website);
  if (!emailDomain || !websiteDomain) return false;
  return emailDomain === websiteDomain;
}

const VIOLET = "#6d28d9";

export default function PosPartnerCallback() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    company_name: "",
    website: "",
    footprint: "",
  });

  const validate = () => {
    const errs = {};
    if (!isRealName(form.full_name)) errs.full_name = t("posChannel.callback.err_name");
    if (!form.email) errs.email = t("posChannel.callback.err_email_required");
    else if (!isWorkEmail(form.email)) errs.email = t("posChannel.callback.err_email_work");
    if (!isValidPhone(form.phone)) errs.phone = t("posChannel.callback.err_phone");
    if (!form.company_name.trim()) errs.company_name = t("posChannel.callback.err_company");
    if (!isValidWebsite(form.website)) errs.website = t("posChannel.callback.err_website");
    else if (form.email && isWorkEmail(form.email) && !domainsMatch(form.email, form.website))
      errs.website = t("posChannel.callback.err_domain");
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      toast.error(t("posChannel.callback.toast_errors"));
      return;
    }

    setLoading(true);
    try {
      await base44.entities.Lead.create({
        full_name: form.full_name,
        email: form.email,
        phone: form.phone,
        company_name: form.company_name,
        website: form.website,
        industry: "POS Channel Partner",
        position: form.footprint ? `POS footprint: ${form.footprint}` : "",
        decision_level: "",
      });

      setSubmitted(true);

      // Confirmation email is best-effort — don't block the success state if it fails
      try {
        await base44.functions.invoke('sendLeadConfirmationEmail', {
          full_name: form.full_name,
          email: form.email,
        });
      } catch {
        // Email send failed (e.g. Postmark suppression) — request still succeeded
      }
    } catch (error) {
      toast.error(t("posChannel.callback.toast_failed"));
    } finally {
      setLoading(false);
    }
  };

  const pitchItems = [
    { icon: Clock, title: t("posChannel.callback.pitch1_title"), desc: t("posChannel.callback.pitch1_desc") },
    { icon: Zap, title: t("posChannel.callback.pitch2_title"), desc: t("posChannel.callback.pitch2_desc") },
    { icon: ShieldCheck, title: t("posChannel.callback.pitch3_title"), desc: t("posChannel.callback.pitch3_desc") },
  ];

  return (
    <div className="min-h-screen bg-background font-body">
      {/* ── Nav ── */}
      <nav className="sticky top-0 z-50 backdrop-blur border-b border-border bg-background/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/pos-partner" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" /> {t("posChannel.callback.back")}
          </Link>
          <Link to="/"><DutyBoostLogo height={40} /></Link>
          <LanguageSwitcher />
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {submitted ? (
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium" style={{ background: "hsl(255 90% 95%)", color: VIOLET }}>
              <Plug className="w-4 h-4" />
              {t("posChannel.callback.badge")}
            </div>
            <h1 className="text-3xl sm:text-4xl font-heading font-bold leading-tight">
              {t("posChannel.callback.success_left_title")}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t("posChannel.callback.success_text", { name: form.full_name.split(' ')[0] })}
            </p>

            <div className="grid sm:grid-cols-3 gap-6 pt-4 text-left">
              {pitchItems.map((item) => (
                <div key={item.title} className="flex flex-col items-start gap-2">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: "hsl(255 90% 95%)" }}>
                    <item.icon className="w-4 h-4" style={{ color: VIOLET }} />
                  </div>
                  <p className="font-semibold text-sm">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="pt-6">
              <Link to="/pos-partner">
                <Button variant="outline" className="gap-2">
                  <ArrowLeft className="w-4 h-4" /> {t("posChannel.callback.back_overview")}
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* ── Left: pitch ── */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium" style={{ background: "hsl(255 90% 95%)", color: VIOLET }}>
                <Plug className="w-4 h-4" />
                {t("posChannel.callback.badge")}
              </div>
              <h1 className="text-3xl sm:text-4xl font-heading font-bold leading-tight">
                {t("posChannel.callback.title")}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t("posChannel.callback.subtitle")}
              </p>

              <div className="space-y-4 pt-2">
                {pitchItems.map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: "hsl(255 90% 95%)" }}>
                      <item.icon className="w-4 h-4" style={{ color: VIOLET }} />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right: form ── */}
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl font-heading font-bold mb-1">{t("posChannel.callback.form_title")}</h2>
              <p className="text-sm text-muted-foreground mb-6">{t("posChannel.callback.form_subtitle")}</p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="full_name" className="text-sm">{t("posChannel.callback.label_name")}</Label>
                  <Input id="full_name" name="full_name" value={form.full_name} onChange={handleChange} placeholder={t("posChannel.callback.placeholder_name")} />
                  {errors.full_name && <p className="text-xs text-red-500">{errors.full_name}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-sm">{t("posChannel.callback.label_email")}</Label>
                  <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder={t("posChannel.callback.placeholder_email")} />
                  {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone" className="text-sm">{t("posChannel.callback.label_phone")}</Label>
                  <Input id="phone" name="phone" value={form.phone} onChange={handleChange} placeholder={t("posChannel.callback.placeholder_phone")} />
                  {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="company_name" className="text-sm">{t("posChannel.callback.label_company")}</Label>
                  <Input id="company_name" name="company_name" value={form.company_name} onChange={handleChange} placeholder={t("posChannel.callback.placeholder_company")} />
                  {errors.company_name && <p className="text-xs text-red-500">{errors.company_name}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="website" className="text-sm">{t("posChannel.callback.label_website")}</Label>
                  <Input id="website" name="website" value={form.website} onChange={handleChange} placeholder={t("posChannel.callback.placeholder_website")} />
                  {errors.website && <p className="text-xs text-red-500">{errors.website}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="footprint" className="text-sm">{t("posChannel.callback.label_footprint")}</Label>
                  <Textarea
                    id="footprint" name="footprint" value={form.footprint} onChange={handleChange}
                    placeholder={t("posChannel.callback.placeholder_footprint")}
                    rows={2}
                  />
                  <p className="text-xs text-muted-foreground">{t("posChannel.callback.footprint_help")}</p>
                </div>

                <Button
                  type="submit" disabled={loading}
                  className="w-full gap-2 h-12 text-base"
                  style={{ background: "linear-gradient(to right, #7c3aed, #6366f1)" }}
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  {t("posChannel.callback.button")}
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  {t("posChannel.callback.consent")}
                </p>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* ── Footer ── */}
      <footer className="border-t border-border py-8 px-4 sm:px-6 mt-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <Link to="/"><DutyBoostLogo height={40} /></Link>
          <p>{t("posChannel.footer.tagline", { year: new Date().getFullYear() })}</p>
        </div>
      </footer>
    </div>
  );
}