import { useState } from "react";
import { Loader2 } from "lucide-react";
import { base44 } from "@/api/base44Client";
import DutyBoostLogo from "../components/DutyBoostLogo";
import { Link } from "react-router-dom";
import { CheckCircle2, FileText, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../components/LanguageSwitcher";

const BLOCKED_EMAIL_DOMAINS = [
  // Google
  "gmail.com", "googlemail.com",
  // Microsoft
  "hotmail.com", "hotmail.co.uk", "hotmail.fr", "hotmail.de", "hotmail.es", "hotmail.it",
  "outlook.com", "outlook.co.uk", "outlook.fr", "outlook.de", "outlook.es", "outlook.it",
  "live.com", "live.co.uk", "live.fr", "live.de", "msn.com",
  // Apple
  "icloud.com", "me.com", "mac.com",
  // Yahoo
  "yahoo.com", "yahoo.co.uk", "yahoo.com.br", "yahoo.fr", "yahoo.de",
  "yahoo.es", "yahoo.it", "yahoo.ca", "yahoo.com.au", "yahoo.co.in",
  "ymail.com",
  // AOL / Verizon
  "aol.com", "aol.co.uk",
  // Other consumer providers
  "mail.com", "email.com", "zohomail.com",
  "protonmail.com", "protonmail.ch", "pm.me",
  "tutanota.com", "tutanota.de", "tutamail.com", "tuta.io",
  "mail.ru", "bk.ru", "inbox.ru", "list.ru",
  "yandex.com", "yandex.ru",
  "163.com", "126.com", "qq.com", "sina.com", "sohu.com",
  "gmx.com", "gmx.de", "gmx.net", "gmx.at",
  "web.de", "freenet.de", "t-online.de",
  "libero.it", "virgilio.it", "tin.it",
  "orange.fr", "wanadoo.fr", "free.fr", "sfr.fr",
  "terra.com", "terra.com.br", "uol.com.br", "bol.com.br", "ig.com.br",
  // Disposable / Test
  "test.com", "example.com", "localhost.com", "mailinator.com",
  "guerrillamail.com", "tempmail.com", "throwam.com", "sharklasers.com",
];

const extractDomain = (url) => {
  if (!url) return null;
  try {
    let cleaned = url.trim().toLowerCase();
    if (!cleaned.startsWith("http")) cleaned = "https://" + cleaned;
    const hostname = new URL(cleaned).hostname;
    // Remove www. prefix
    return hostname.replace(/^www\./, "");
  } catch {
    // Fallback: strip protocol and www manually
    return url.trim().toLowerCase()
      .replace(/^https?:\/\//, "")
      .replace(/^www\./, "")
      .split("/")[0];
  }
};

const isValidProfessionalEmail = (email) => {
  if (!email) return false;
  const domain = email.split("@")[1]?.toLowerCase();
  return domain && !BLOCKED_EMAIL_DOMAINS.includes(domain);
};

const emailMatchesWebsite = (email, website) => {
  if (!email || !website) return true; // only validate when both present
  const emailDomain = email.split("@")[1]?.toLowerCase();
  const websiteDomain = extractDomain(website);
  if (!emailDomain || !websiteDomain) return true;
  // Check if email domain matches or is a subdomain of the website domain
  return emailDomain === websiteDomain || emailDomain.endsWith("." + websiteDomain) || websiteDomain.endsWith("." + emailDomain);
};

const generateLOI_TEXT = (partner, t) => {
   const today = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });
   const kvkText = partner.partner_registration_number ? `, registered under number ${partner.partner_registration_number}` : "";
   const vatText = partner.partner_vat ? `, VAT/Tax number ${partner.partner_vat}` : "";
   const titleText = partner.partner_representative_title ? ` – ${partner.partner_representative_title}` : "";
   
   const addressParts = [
     partner.partner_street,
     partner.partner_postal_code && partner.partner_city ? `${partner.partner_postal_code} ${partner.partner_city}` : partner.partner_city,
   ].filter(Boolean);
   const fullAddress = addressParts.join(", ") || "[ADDRESS]";

   const template = t('letterOfIntent.loi_document');
   return template
     .replace(/{date}/g, today)
     .replace(/{company}/g, partner.partner_company_name || "[PARTNER COMPANY NAME]")
     .replace(/{address}/g, fullAddress)
     .replace(/{country}/g, partner.partner_country || "[COUNTRY]")
     .replace(/{kvk_text}/g, kvkText)
     .replace(/{vat_text}/g, vatText)
     .replace(/{representative}/g, partner.partner_representative_name || "[REPRESENTATIVE NAME]")
     .replace(/{title_text}/g, titleText);
};

const FIELDS = [
  { key: "partner_company_name", labelKey: "letterOfIntent.company_name", placeholderKey: "letterOfIntent.ph_company_name", required: true },
  { key: "partner_street", labelKey: "letterOfIntent.street_number", placeholderKey: "letterOfIntent.ph_street_number", required: true },
  { key: "partner_postal_code", labelKey: "letterOfIntent.postal_code", placeholderKey: "letterOfIntent.ph_postal_code", required: true },
  { key: "partner_city", labelKey: "letterOfIntent.city", placeholderKey: "letterOfIntent.ph_city", required: true },
  { key: "partner_country", labelKey: "letterOfIntent.country", placeholderKey: "letterOfIntent.ph_country", required: true },
  { key: "partner_registration_number", labelKey: "letterOfIntent.chamber_of_commerce", placeholderKey: "letterOfIntent.ph_chamber_of_commerce", required: true },
  { key: "partner_vat", labelKey: "letterOfIntent.vat_number", placeholderKey: "letterOfIntent.ph_vat_number", required: true },
  { key: "partner_representative_name", labelKey: "letterOfIntent.representative_name", placeholderKey: "letterOfIntent.ph_representative_name", required: true },
  { key: "partner_representative_title", labelKey: "letterOfIntent.representative_title", placeholderKey: "letterOfIntent.ph_representative_title", required: false },
  { key: "partner_website", labelKey: "letterOfIntent.website", placeholderKey: "letterOfIntent.ph_website", required: true, type: "url" },
  { key: "partner_email", labelKey: "letterOfIntent.email_address", placeholderKey: "letterOfIntent.ph_email_address", required: true, type: "email" },
  { key: "monthly_travelers", labelKey: "letterOfIntent.monthly_travelers", placeholderKey: "letterOfIntent.ph_monthly_travelers", required: true, type: "number" },
  { key: "partner_type", labelKey: "letterOfIntent.partner_type", required: false, type: "select", options: ["Travel Agency", "Airline", "Accommodation", "Car Rental", "Tour Operator", "OTA", "Other"] },
];

export default function LetterOfIntentPage() {
  const { t } = useTranslation();
  const [form, setForm] = useState({
    partner_company_name: "",
    partner_street: "",
    partner_postal_code: "",
    partner_city: "",
    partner_country: "",
    partner_registration_number: "",
    partner_vat: "",
    partner_representative_name: "",
    partner_representative_title: "",
    partner_website: "",
    partner_email: "",
    partner_type: "",
  });
  const [accepted, setAccepted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [loiOpen, setLoiOpen] = useState(false);
  const [validatingKvk, setValidatingKvk] = useState(false);

  const handleChange = (key, value) => {
    let finalValue = value;
    if (key === "monthly_travelers") {
      finalValue = value.replace(/\D/g, "");
    }
    setForm(f => ({ ...f, [key]: finalValue }));
    if (errors[key]) setErrors(e => ({ ...e, [key]: false }));
  };

  const validate = async () => {
    const newErrors = {};
    FIELDS.filter(f => f.required).forEach(f => {
      if (!form[f.key]?.trim()) newErrors[f.key] = true;
    });
    if (form.partner_email && !isValidProfessionalEmail(form.partner_email)) {
      newErrors.partner_email = "email_domain_invalid";
    } else if (form.partner_email && form.partner_website && !emailMatchesWebsite(form.partner_email, form.partner_website)) {
      newErrors.partner_email = "email_domain_mismatch";
    }
    
    const isNetherlands = ["netherlands", "nederland", "niederlande", "pays-bas", "paesi bassi", "países bajos"].includes(form.partner_country?.toLowerCase()?.trim() || "");
    if (isNetherlands && form.partner_registration_number?.trim() && form.partner_company_name?.trim()) {
      setValidatingKvk(true);
      try {
        const result = await base44.functions.invoke("validateKvk", {
          kvkNumber: form.partner_registration_number.trim(),
          companyName: form.partner_company_name.trim(),
        });
        if (!result.data.valid) {
          newErrors.partner_registration_number = "kvk_mismatch";
        }
      } catch (error) {
        newErrors.partner_registration_number = "kvk_validation_error";
      }
      setValidatingKvk(false);
    }
    
    if (!accepted) newErrors.accepted = true;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!(await validate())) return;
    setSubmitting(true);
    await base44.entities.LetterOfIntent.create({
      ...form,
      signed: true,
      signed_date: new Date().toISOString(),
      status: "pending",
    });
    setSubmitting(false);
    setSubmitted(true);
  };

  const loiText = generateLOI_TEXT(form, t);

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="max-w-lg w-full text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-heading font-bold text-foreground mb-2">{t('letterOfIntent.success_title')}</h1>
            <p className="text-muted-foreground">
              {t('letterOfIntent.success_subtitle', {
                name: form.partner_representative_name,
                company: form.partner_company_name
              })}
            </p>
          </div>
          <Link to="/" className="inline-block">
            <Button variant="outline">← {t('letterOfIntent.back_to_home')}</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-body">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur border-b border-border">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/"><DutyBoostLogo height={55} /></Link>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">← {t('letterOfIntent.back_to_home')}</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-12 space-y-10">
        {/* Header */}
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-heading font-bold text-foreground">{t('letterOfIntent.title')}</h1>

          {/* Opener Section */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg px-6 py-4 max-w-2xl mx-auto space-y-3">
            <p className="text-sm text-blue-800 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('letterOfIntent.description_1') }} />
            <p className="text-sm text-blue-800 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('letterOfIntent.description_2') }} />
          </div>

          {/* Why Section */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg px-6 py-5 max-w-2xl mx-auto space-y-3">
            <h3 className="font-semibold text-slate-900 text-base">{t('letterOfIntent.why_loi_title')}</h3>
            <p className="text-sm text-slate-700 leading-relaxed mb-2">
              {t('letterOfIntent.why_loi_body')}
            </p>
            <ul className="text-sm text-slate-700 space-y-1.5 ml-3">
              <li dangerouslySetInnerHTML={{ __html: t('letterOfIntent.why_loi_b1') }} />
              <li dangerouslySetInnerHTML={{ __html: t('letterOfIntent.why_loi_b2') }} />
              <li dangerouslySetInnerHTML={{ __html: t('letterOfIntent.why_loi_b3') }} />
            </ul>
            <p className="text-sm text-slate-700 leading-relaxed pt-2">
              {t('letterOfIntent.why_loi_footer')}
            </p>
          </div>

          {/* How It Works Section */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg px-6 py-5 max-w-2xl mx-auto space-y-3">
            <h3 className="font-semibold text-emerald-900 text-base">{t('letterOfIntent.how_title')}</h3>
            <ol className="text-sm text-emerald-800 space-y-2 ml-2">
              <li dangerouslySetInnerHTML={{ __html: t('letterOfIntent.how_step1') }} />
              <li dangerouslySetInnerHTML={{ __html: t('letterOfIntent.how_step2') }} />
              <li dangerouslySetInnerHTML={{ __html: t('letterOfIntent.how_step3') }} />
              <li dangerouslySetInnerHTML={{ __html: t('letterOfIntent.how_step4') }} />
            </ol>
          </div>

          {/* What We're Asking Section */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg px-6 py-5 max-w-2xl mx-auto space-y-3">
            <h3 className="font-semibold text-amber-900 text-base">{t('letterOfIntent.what_we_ask')}</h3>
            <p className="text-sm text-amber-800 leading-relaxed">
              {t('letterOfIntent.from_you')}
            </p>
          </div>
          
          <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 max-w-xl mx-auto">
            <strong>{t('letterOfIntent.important')}</strong> {t('letterOfIntent.disclaimer')}
          </p>

          <p className="text-muted-foreground max-w-xl mx-auto">
            {t('letterOfIntent.fill_details')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Form fields */}
          <div className="bg-card border border-border rounded-2xl p-6 space-y-5">
            <h2 className="font-heading font-semibold text-lg text-foreground">{t('letterOfIntent.your_details')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {FIELDS.map(field => (
                <div key={field.key} className={field.key === "partner_street" ? "md:col-span-2" : ""}>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    {t(field.labelKey)}
                    {field.required && <span className="text-destructive ml-1">*</span>}
                  </label>
                  {field.type === "select" ? (
                    <select
                      value={form[field.key]}
                      onChange={e => handleChange(field.key, e.target.value)}
                      className={`w-full h-10 rounded-md border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring ${errors[field.key] ? "border-destructive" : "border-input"}`}
                    >
                      <option value="">{t('letterOfIntent.select_type')}</option>
                      {field.options.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  ) : field.key === "monthly_travelers" ? (
                    <Input
                      type="text"
                      placeholder={t(field.placeholderKey)}
                      value={form[field.key] ? parseInt(form[field.key]).toLocaleString("de-DE") : ""}
                      onChange={e => handleChange(field.key, e.target.value)}
                      className={errors[field.key] ? "border-destructive" : ""}
                    />
                  ) : (
                    <Input
                      type={field.type || "text"}
                      placeholder={t(field.placeholderKey)}
                      value={form[field.key]}
                      onChange={e => handleChange(field.key, e.target.value)}
                      className={errors[field.key] ? "border-destructive" : ""}
                    />
                  )}
                  {errors[field.key] && (
                    <p className="text-xs text-destructive mt-1">
                      {field.key === "partner_email" && errors[field.key] === "email_domain_invalid"
                        ? t('letterOfIntent.error_email_invalid')
                        : field.key === "partner_email" && errors[field.key] === "email_domain_mismatch"
                        ? t('letterOfIntent.error_domain_mismatch')
                        : field.key === "partner_registration_number" && errors[field.key] === "kvk_mismatch"
                        ? t('letterOfIntent.error_kvk_mismatch')
                        : field.key === "partner_registration_number" && errors[field.key] === "kvk_validation_error"
                        ? t('letterOfIntent.error_kvk_validation')
                        : t('letterOfIntent.error_required')}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* LOI Preview */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <button
              type="button"
              onClick={() => setLoiOpen(!loiOpen)}
              className="w-full flex items-center justify-between px-6 py-4 hover:bg-muted/40 transition-colors"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-primary" />
                <span className="font-semibold text-foreground">{t('letterOfIntent.preview_loi')}</span>
                <Badge variant="outline" className="text-xs">{t('letterOfIntent.live_preview')}</Badge>
              </div>
              {loiOpen ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
            </button>
            {loiOpen && (
              <div className="border-t border-border px-6 py-5">
                <pre className="whitespace-pre-wrap text-xs text-muted-foreground leading-relaxed font-mono bg-muted/30 rounded-lg p-5 max-h-[500px] overflow-y-auto">
                  {loiText}
                </pre>
              </div>
            )}
          </div>

          {/* Acceptance */}
          <div className={`bg-card border rounded-2xl p-6 space-y-3 ${errors.accepted ? "border-destructive" : "border-border"}`}>
            <h2 className="font-heading font-semibold text-lg text-foreground">{t('letterOfIntent.acceptance')}</h2>
            <p className="text-sm text-muted-foreground">
              {t('letterOfIntent.read_understood')}
            </p>
            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative mt-0.5">
                <input
                  type="checkbox"
                  checked={accepted}
                  onChange={e => {
                    setAccepted(e.target.checked);
                    if (e.target.checked) setErrors(err => ({ ...err, accepted: false }));
                  }}
                  className="sr-only"
                />
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${accepted ? "bg-primary border-primary" : errors.accepted ? "border-destructive" : "border-input group-hover:border-primary"}`}>
                  {accepted && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                </div>
              </div>
              <span className="text-sm text-foreground">
                {t('letterOfIntent.acceptance_text')
                  .replace('{name}', form.partner_representative_name || t('letterOfIntent.ph_representative_name'))
                  .replace('{company}', form.partner_company_name || t('letterOfIntent.ph_company_name'))
                  .replace('{date}', new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" }))}
              </span>
            </label>
            {errors.accepted && (
              <p className="text-xs text-destructive">{t('letterOfIntent.error_required')}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={submitting || validatingKvk}
            className="w-full h-12 text-base font-semibold"
          >
            {submitting ? t('letterOfIntent.submitting') : validatingKvk ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                {t('letterOfIntent.validating')}
              </div>
            ) : t('letterOfIntent.submit_loi')}
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            {t('letterOfIntent.storage_info')}
          </p>
        </form>
      </div>
    </div>
  );
}