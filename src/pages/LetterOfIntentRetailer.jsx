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
import i18n from "../lib/i18n";
import LanguageSwitcher from "../components/LanguageSwitcher";

const BLOCKED_EMAIL_DOMAINS = [
  "gmail.com","googlemail.com","hotmail.com","hotmail.co.uk","hotmail.fr","hotmail.de","hotmail.es","hotmail.it",
  "outlook.com","outlook.co.uk","outlook.fr","outlook.de","outlook.es","outlook.it","live.com","live.co.uk","live.fr","live.de","msn.com",
  "icloud.com","me.com","mac.com","yahoo.com","yahoo.co.uk","yahoo.com.br","yahoo.fr","yahoo.de","yahoo.es","yahoo.it","yahoo.ca","yahoo.com.au","yahoo.co.in","ymail.com",
  "aol.com","aol.co.uk","mail.com","email.com","zohomail.com","protonmail.com","protonmail.ch","pm.me",
  "tutanota.com","tutanota.de","tutamail.com","tuta.io","mail.ru","bk.ru","inbox.ru","list.ru",
  "yandex.com","yandex.ru","163.com","126.com","qq.com","sina.com","sohu.com","gmx.com","gmx.de","gmx.net","gmx.at",
  "web.de","freenet.de","t-online.de","libero.it","virgilio.it","tin.it","orange.fr","wanadoo.fr","free.fr","sfr.fr",
  "terra.com","terra.com.br","uol.com.br","bol.com.br","ig.com.br","test.com","example.com","localhost.com","mailinator.com",
  "guerrillamail.com","tempmail.com","throwam.com","sharklasers.com",
];

const extractDomain = (url) => {
  if (!url) return null;
  try {
    let cleaned = url.trim().toLowerCase();
    if (!cleaned.startsWith("http")) cleaned = "https://" + cleaned;
    return new URL(cleaned).hostname.replace(/^www\./, "");
  } catch {
    return url.trim().toLowerCase().replace(/^https?:\/\//, "").replace(/^www\./, "").split("/")[0];
  }
};

const isValidProfessionalEmail = (email) => {
  if (!email) return false;
  const domain = email.split("@")[1]?.toLowerCase();
  return domain && !BLOCKED_EMAIL_DOMAINS.includes(domain);
};

const emailMatchesWebsite = (email, website) => {
  if (!email || !website) return true;
  const emailDomain = email.split("@")[1]?.toLowerCase();
  const normalizedWebsite = website.startsWith("http") ? website : `https://${website}`;
  const websiteDomain = extractDomain(normalizedWebsite);
  if (!emailDomain || !websiteDomain) return true;
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
  const template = t('letterOfIntentRetailer.loi_document');
  return template
    .replace(/{date}/g, today)
    .replace(/{company}/g, partner.partner_company_name || "[RETAILER COMPANY NAME]")
    .replace(/{address}/g, fullAddress)
    .replace(/{country}/g, partner.partner_country || "[COUNTRY]")
    .replace(/{kvk_text}/g, kvkText)
    .replace(/{vat_text}/g, vatText)
    .replace(/{representative}/g, partner.partner_representative_name || "[REPRESENTATIVE NAME]")
    .replace(/{title_text}/g, titleText);
};

const FIELDS = [
  { key: "partner_company_name", labelKey: "letterOfIntentRetailer.company_name", placeholderKey: "letterOfIntentRetailer.ph_company_name", required: true },
  { key: "store_name", labelKey: "letterOfIntentRetailer.store_name", placeholderKey: "letterOfIntentRetailer.ph_store_name", required: true },
  { key: "airport_location", labelKey: "letterOfIntentRetailer.airport_location", placeholderKey: "letterOfIntentRetailer.ph_airport_location", required: true },
  { key: "store_category", labelKey: "letterOfIntentRetailer.store_category", placeholderKey: "letterOfIntentRetailer.ph_store_category", required: false, type: "select", options: ["Fashion & Accessories", "Electronics & Tech", "Beauty & Perfume", "Duty-Free & Liquor", "Food & Beverage", "Pharmacy & Health", "Books & Gifts", "Specialty Retail", "Other"] },
  { key: "partner_street", labelKey: "letterOfIntentRetailer.street_number", placeholderKey: "letterOfIntentRetailer.ph_street_number", required: true },
  { key: "partner_postal_code", labelKey: "letterOfIntentRetailer.postal_code", placeholderKey: "letterOfIntentRetailer.ph_postal_code", required: true },
  { key: "partner_city", labelKey: "letterOfIntentRetailer.city", placeholderKey: "letterOfIntentRetailer.ph_city", required: true },
  { key: "partner_country", labelKey: "letterOfIntentRetailer.country", placeholderKey: "letterOfIntentRetailer.ph_country", required: true },
  { key: "partner_registration_number", labelKey: "letterOfIntentRetailer.chamber_of_commerce", placeholderKey: "letterOfIntentRetailer.ph_chamber_of_commerce", required: true },
  { key: "partner_vat", labelKey: "letterOfIntentRetailer.vat_number", placeholderKey: "letterOfIntentRetailer.ph_vat_number", required: true },
  { key: "partner_representative_name", labelKey: "letterOfIntentRetailer.representative_name", placeholderKey: "letterOfIntentRetailer.ph_representative_name", required: true },
  { key: "partner_representative_title", labelKey: "letterOfIntentRetailer.representative_title", placeholderKey: "letterOfIntentRetailer.ph_representative_title", required: false },
  { key: "partner_website", labelKey: "letterOfIntentRetailer.website", placeholderKey: "letterOfIntentRetailer.ph_website", required: true, type: "text" },
  { key: "partner_email", labelKey: "letterOfIntentRetailer.email_address", placeholderKey: "letterOfIntentRetailer.ph_email_address", required: true, type: "email" },
  { key: "monthly_visitors", labelKey: "letterOfIntentRetailer.monthly_visitors", placeholderKey: "letterOfIntentRetailer.ph_monthly_visitors", required: true, type: "number" },
];

// Hardcoded success strings to bypass i18next cache
const SUCCESS_SUBTITLES = {
  en: 'Thank you, {name}. Your signed Letter of Intent has been received on behalf of {company}. With your participation, we are stronger in building the DutyBoost airport retail network. A digitally signed copy will be emailed to you within 24 hours.',
  nl: 'Bedankt, {name}. Uw ondertekende Intentieverklaring is ontvangen namens {company}. Met uw deelname staan wij sterker in het uitbouwen van het DutyBoost luchthavenwinkelnetwerk. Een digitaal ondertekende kopie ontvangt u binnen 24 uur per e-mail.',
  fr: 'Merci, {name}. Votre Lettre d\'Intention signée a été reçue au nom de {company}. Avec votre participation, nous sommes plus forts pour construire le réseau de détaillants aéroportuaires DutyBoost. Une copie signée numériquement vous sera envoyée par e-mail dans les 24 heures.',
  de: 'Vielen Dank, {name}. Ihre unterzeichnete Absichtserklärung wurde im Namen von {company} erhalten. Mit Ihrer Teilnahme stehen wir stärker beim Aufbau des DutyBoost Flughafeneinzelhändler-Netzwerks. Eine digital unterzeichnete Kopie wird Ihnen innerhalb von 24 Stunden per E-Mail zugesandt.',
  es: 'Gracias, {name}. Tu Carta de Intención firmada ha sido recibida en nombre de {company}. Con tu participación, somos más fuertes para construir la red de minoristas aeroportuarios de DutyBoost. Una copia firmada digitalmente te será enviada por correo electrónico en 24 horas.',
  it: 'Grazie, {name}. La tua Lettera di Intenti firmata è stata ricevuta a nome di {company}. Con la tua partecipazione, siamo più forti nel costruire la rete di retailer aeroportuali di DutyBoost. Una copia firmata digitalmente ti verrà inviata via e-mail entro 24 ore.',
};
const SUCCESS_TITLES = {
  en: 'Letter of Intent Submitted', nl: 'Intentieverklaring Ingediend', fr: 'Lettre d\'Intention soumise',
  de: 'Absichtserklärung eingereicht', es: 'Carta de Intención enviada', it: 'Lettera di Intenti inviata',
};
const BACK_TO_HOME = {
  en: 'Back to Home', nl: 'Terug naar Home', fr: 'Retour à l\'accueil',
  de: 'Zurück zur Startseite', es: 'Volver al inicio', it: 'Torna alla home',
};

export default function LetterOfIntentRetailerPage() {
  const { t } = useTranslation();
  const [form, setForm] = useState({
    partner_company_name: "", store_name: "", airport_location: "", store_category: "",
    partner_street: "", partner_postal_code: "", partner_city: "", partner_country: "",
    partner_registration_number: "", partner_vat: "", partner_representative_name: "",
    partner_representative_title: "", partner_website: "", partner_email: "", monthly_visitors: "",
  });
  const [accepted, setAccepted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [loiOpen, setLoiOpen] = useState(false);
  const [validatingKvk, setValidatingKvk] = useState(false);

  const handleChange = (key, value) => {
    let finalValue = value;
    if (key === "monthly_visitors") finalValue = value.replace(/\D/g, "");
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
    const isNetherlands = ["netherlands","nederland","niederlande","pays-bas","paesi bassi","países bajos"].includes(form.partner_country?.toLowerCase()?.trim() || "");
    if (isNetherlands && form.partner_registration_number?.trim() && form.partner_company_name?.trim()) {
      setValidatingKvk(true);
      try {
        const result = await base44.functions.invoke("validateKvk", {
          kvkNumber: form.partner_registration_number.trim(),
          companyName: form.partner_company_name.trim(),
        });
        if (!result.data.valid) newErrors.partner_registration_number = "kvk_mismatch";
      } catch {
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
    const websiteValue = form.partner_website?.trim();
    const normalizedWebsite = websiteValue && !websiteValue.startsWith("http") ? `https://${websiteValue}` : websiteValue;
    await base44.entities.LetterOfIntent.create({
      ...form,
      partner_type: "Airport Retailer",
      partner_website: normalizedWebsite,
      signed: true,
      signed_date: new Date().toISOString(),
      status: "pending",
      language: i18n.language || "en",
    });
    setSubmitting(false);
    setSubmitted(true);
  };

  const loiText = generateLOI_TEXT(form, t);
  const currentLang = i18n.language?.split('-')[0] || 'en';

  if (submitted) {
    const firstName = form.partner_representative_name?.split(' ')[0] || form.partner_representative_name;
    const subtitleTemplate = SUCCESS_SUBTITLES[currentLang] || SUCCESS_SUBTITLES.en;
    const successSubtitle = subtitleTemplate.replace('{name}', firstName).replace('{company}', form.partner_company_name);
    const successTitle = SUCCESS_TITLES[currentLang] || SUCCESS_TITLES.en;
    const backLabel = BACK_TO_HOME[currentLang] || BACK_TO_HOME.en;
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="max-w-lg w-full text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-heading font-bold text-foreground mb-2">{successTitle}</h1>
            <p className="text-muted-foreground">{successSubtitle}</p>
          </div>
          <Link to="/" className="inline-block">
            <Button variant="outline">← {backLabel}</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-body">
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur border-b border-border">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/"><DutyBoostLogo height={55} /></Link>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">← {t('letterOfIntentRetailer.back_to_home')}</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-12 space-y-10">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-heading font-bold text-foreground">{t('letterOfIntentRetailer.title')}</h1>

          <div className="bg-blue-50 border border-blue-200 rounded-lg px-6 py-4 max-w-2xl mx-auto space-y-3">
            <p className="text-sm text-blue-800 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('letterOfIntentRetailer.description_1') }} />
            <p className="text-sm text-blue-800 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('letterOfIntentRetailer.description_2') }} />
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-lg px-6 py-5 max-w-2xl mx-auto space-y-3">
            <h3 className="font-semibold text-slate-900 text-base">{t('letterOfIntentRetailer.why_loi_title')}</h3>
            <p className="text-sm text-slate-700 leading-relaxed mb-2">{t('letterOfIntentRetailer.why_loi_body')}</p>
            <ul className="text-sm text-slate-700 space-y-1.5 ml-3">
              <li dangerouslySetInnerHTML={{ __html: t('letterOfIntentRetailer.why_loi_b1') }} />
              <li dangerouslySetInnerHTML={{ __html: t('letterOfIntentRetailer.why_loi_b2') }} />
              <li dangerouslySetInnerHTML={{ __html: t('letterOfIntentRetailer.why_loi_b3') }} />
            </ul>
            <p className="text-sm text-slate-700 leading-relaxed pt-2">{t('letterOfIntentRetailer.why_loi_footer')}</p>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-lg px-6 py-5 max-w-2xl mx-auto space-y-3">
            <h3 className="font-semibold text-emerald-900 text-base">{t('letterOfIntentRetailer.how_title')}</h3>
            <ol className="text-sm text-emerald-800 space-y-2 ml-2">
              <li dangerouslySetInnerHTML={{ __html: t('letterOfIntentRetailer.how_step1') }} />
              <li dangerouslySetInnerHTML={{ __html: t('letterOfIntentRetailer.how_step2') }} />
              <li dangerouslySetInnerHTML={{ __html: t('letterOfIntentRetailer.how_step3') }} />
              <li dangerouslySetInnerHTML={{ __html: t('letterOfIntentRetailer.how_step4') }} />
            </ol>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg px-6 py-5 max-w-2xl mx-auto space-y-3">
            <h3 className="font-semibold text-amber-900 text-base">{t('letterOfIntentRetailer.what_we_ask')}</h3>
            <p className="text-sm text-amber-800 leading-relaxed">{t('letterOfIntentRetailer.from_you')}</p>
          </div>

          <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 max-w-xl mx-auto">
            <strong>{t('letterOfIntentRetailer.important')}</strong> {t('letterOfIntentRetailer.disclaimer')}
          </p>

          <p className="text-muted-foreground max-w-xl mx-auto">{t('letterOfIntentRetailer.fill_details')}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-card border border-border rounded-2xl p-6 space-y-5">
            <h2 className="font-heading font-semibold text-lg text-foreground">{t('letterOfIntentRetailer.your_details')}</h2>
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
                      <option value="">{t('letterOfIntentRetailer.select_category')}</option>
                      {field.options.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  ) : field.key === "monthly_visitors" ? (
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
                        ? t('letterOfIntentRetailer.error_email_invalid')
                        : field.key === "partner_email" && errors[field.key] === "email_domain_mismatch"
                        ? t('letterOfIntentRetailer.error_domain_mismatch')
                        : field.key === "partner_registration_number" && errors[field.key] === "kvk_mismatch"
                        ? t('letterOfIntentRetailer.error_kvk_mismatch')
                        : field.key === "partner_registration_number" && errors[field.key] === "kvk_validation_error"
                        ? t('letterOfIntentRetailer.error_kvk_validation')
                        : t('letterOfIntentRetailer.error_required')}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <button
              type="button"
              onClick={() => setLoiOpen(!loiOpen)}
              className="w-full flex items-center justify-between px-6 py-4 hover:bg-muted/40 transition-colors"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-primary" />
                <span className="font-semibold text-foreground">{t('letterOfIntentRetailer.preview_loi')}</span>
                <Badge variant="outline" className="text-xs">{t('letterOfIntentRetailer.live_preview')}</Badge>
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

          <div className={`bg-card border rounded-2xl p-6 space-y-3 ${errors.accepted ? "border-destructive" : "border-border"}`}>
            <h2 className="font-heading font-semibold text-lg text-foreground">{t('letterOfIntentRetailer.acceptance')}</h2>
            <p className="text-sm text-muted-foreground">{t('letterOfIntentRetailer.read_understood')}</p>
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
                {t('letterOfIntentRetailer.acceptance_text')
                  .replace('{name}', form.partner_representative_name || t('letterOfIntentRetailer.ph_representative_name'))
                  .replace('{company}', form.partner_company_name || t('letterOfIntentRetailer.ph_company_name'))
                  .replace('{date}', new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" }))}
              </span>
            </label>
            {errors.accepted && <p className="text-xs text-destructive">{t('letterOfIntentRetailer.error_required')}</p>}
          </div>

          <Button
            type="submit"
            disabled={submitting || validatingKvk}
            className="w-full h-12 text-base font-semibold"
          >
            {submitting ? t('letterOfIntentRetailer.submitting') : validatingKvk ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                {t('letterOfIntentRetailer.validating')}
              </div>
            ) : t('letterOfIntentRetailer.submit_loi')}
          </Button>

          <p className="text-center text-xs text-muted-foreground">{t('letterOfIntentRetailer.storage_info')}</p>
        </form>
      </div>
    </div>
  );
}