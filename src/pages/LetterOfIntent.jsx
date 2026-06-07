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
  "gmail.com", "hotmail.com", "outlook.com", "yahoo.com", "yahoo.co.uk",
  "yahoo.com.br", "yahoo.fr", "yahoo.de", "yahoo.es", "yahoo.it",
  "aol.com", "mail.com", "protonmail.com", "icloud.com", "mail.ru",
  "yandex.com", "163.com", "qq.com", "sina.com", "sohu.com",
  "test.com", "example.com", "localhost.com"
];

const isValidProfessionalEmail = (email) => {
  if (!email) return false;
  const domain = email.split("@")[1]?.toLowerCase();
  return domain && !BLOCKED_EMAIL_DOMAINS.includes(domain);
};

const LOI_TEXT = (partner) => {
  const today = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });
  return `DUTYBOOST LETTER OF INTENT

This Letter of Intent ("LOI") is entered into on ${today} by and between:

DutyBoost, having its registered office at DEK 32, 1319BB Almere, The Netherlands, registered with the Dutch Chamber of Commerce under number 42053181, VAT number NL869492068B01, legally represented by:
Jaquelin Beliad Perez – Co-Founder
Raël Martis – Co-Founder
hereinafter referred to as "DutyBoost",

AND

${partner.partner_company_name || "[PARTNER COMPANY NAME]"}, having its registered office at ${partner.partner_address || "[ADDRESS]"}, ${partner.partner_country || "[COUNTRY]"}${partner.partner_registration_number ? `, registered under number ${partner.partner_registration_number}` : ""}${partner.partner_vat ? `, VAT/Tax number ${partner.partner_vat}` : ""}, legally represented by:
${partner.partner_representative_name || "[REPRESENTATIVE NAME]"}${partner.partner_representative_title ? ` – ${partner.partner_representative_title}` : ""}
hereinafter referred to as "${partner.partner_company_name || "[PARTNER COMPANY NAME]"}",

DutyBoost and ${partner.partner_company_name || "[PARTNER COMPANY NAME]"} hereinafter jointly referred to as the "Party" or "Parties."

1. Background

DutyBoost has developed an innovative travel retail solution aimed at increasing commercial performance within airport retail environments. The platform creates additional commercial value based on existing traveler flows to airports and travel retail locations.

DutyBoost positions itself as a "Travel Retail Conversion Layer", creating a new commercial revenue stream for travel partners based on the travelers they bring to airports and travel retail environments.

${partner.partner_company_name || "[PARTNER COMPANY NAME]"} operates as a travel partner within the travel, mobility and/or tourism industry and possesses relevant traveler flows and customer relationships that can contribute to additional commercial value within airport environments.

The Parties wish to explore opportunities for a commercial partnership whereby travelers introduced by the travel partner may contribute to additional commercial value and revenue opportunities within airport environments through DutyBoost.

The objective of this collaboration is to create an additional revenue stream for the travel partner while simultaneously enhancing commercial performance within travel retail.

2. Purpose of this Letter of Intent

The purpose of this Letter of Intent is to record the Parties' intention to engage in discussions, evaluations and potential commercial collaborations relating to:
- creating additional commercial value based on traveler flows;
- creating additional revenue streams based on passenger traffic;
- commercial cooperation between DutyBoost and the travel partner;
- commercial revenue optimization within travel retail;
- revenue-enhancing strategies within airport retail;
- engagement and conversion optimization;
- potential revenue-sharing models;
- strategic positioning of DutyBoost within the traveler customer journey;
- international commercial rollout opportunities.

The Parties acknowledge that existing traveler flows within the travel industry can generate additional commercial opportunities within airport retail and travel retail environments.

DutyBoost enables travel partners to create additional commercial value from existing traveler flows without impacting their core business operations.

3. Exploratory Collaboration

The Parties declare their intention to engage in good-faith discussions regarding a potential collaboration.

Such collaboration between DutyBoost and the travel partner may include:
- commercial cooperation based on existing traveler flows;
- revenue-sharing models;
- commercial positioning of DutyBoost within travel retail;
- strategic collaboration surrounding airport retail;
- international commercial rollout opportunities;
- revenue optimization within travel retail environments.

The Parties acknowledge that DutyBoost was developed from the vision of making travel retail smarter, more interactive and commercially more effective.

The collaboration may focus on:
- revenue-sharing models;
- commercial revenue optimization;
- strategic positioning within travel retail;
- expansion of commercial opportunities within airport environments;
- international commercial expansion.

4. Confidentiality

4.1 All information disclosed by either Party in connection with this Letter of Intent shall be treated as strictly confidential.
4.2 No confidential information shall be disclosed to any third party without the prior written consent of the other Party.
4.3 Confidential information includes, but is not limited to: business models, strategies, technology, software, concepts, commercial terms, financial information, customer information, presentations, prototypes, and market positioning.
4.4 This confidentiality obligation shall remain in effect for a period of five (5) years following the execution of this Letter of Intent.

5. Exclusivity

For a period of 365 days from the date of execution of this Letter of Intent, the Parties shall engage in good-faith exclusive discussions regarding the proposed collaboration, unless otherwise agreed in writing.

6. Non-Binding Nature

6.1 This Letter of Intent is non-binding with respect to entering into any definitive collaboration agreement.
6.2 Only the provisions relating to confidentiality, intellectual property and exclusivity shall be legally binding, unless otherwise agreed by the Parties in writing.
6.3 Neither Party shall be obligated to enter into a definitive agreement until a formal written agreement has been duly executed.

7. Intellectual Property

7.1 All intellectual property rights relating to DutyBoost, including but not limited to software, technology, branding, strategies, designs, concepts, presentations, documentation, data sources, user experiences, marketing materials and commercial models, shall remain the sole property of DutyBoost.
7.2 Nothing contained in this Letter of Intent shall be construed as a transfer of any intellectual property rights.
7.3 Without the prior written consent of DutyBoost, the Parties shall not copy any part of the concept, reproduce any technology, use confidential commercial information outside the scope of the contemplated collaboration, or develop similar concepts based upon confidential information shared by DutyBoost.
7.4 Any joint developments or future collaboration outcomes shall be governed exclusively by a separate written agreement.

8. Costs

Each Party shall bear its own costs and expenses relating to negotiations, meetings, investigations and any potential collaboration process.

9. Term and Termination

9.1 This Letter of Intent shall become effective on the date of execution.
9.2 This Letter of Intent shall automatically expire after 36 months unless the Parties agree in writing to extend it.
9.3 Either Party may terminate this Letter of Intent at any time by written notice.

10. Governing Law

This Letter of Intent shall be governed exclusively by the laws of The Netherlands. Any dispute arising from or relating to this Letter of Intent shall be submitted to the competent courts of The Netherlands.

The Parties declare that they enter into this Letter of Intent in a spirit of mutual trust and with the intention of exploring the possibilities of a long-term and valuable collaboration. Although this Letter of Intent does not constitute a definitive commercial agreement, the Parties emphasize their sincere intention to continue discussions and explore potential future collaborations.`;
};

const FIELDS = [
  { key: "partner_company_name", label: "Company Name", required: true, placeholder: "Your company legal name" },
  { key: "partner_address", label: "Registered Address", required: true, placeholder: "Full street address" },
  { key: "partner_country", label: "Country", required: true, placeholder: "e.g. Netherlands, Spain, Germany" },
  { key: "partner_registration_number", label: "Chamber of Commerce Number", required: true, placeholder: "e.g. KvK, Trade Register, etc." },
  { key: "partner_vat", label: "VAT / Tax Number", required: true, placeholder: "e.g. NL123456789B01" },
  { key: "partner_representative_name", label: "Representative Full Name", required: true, placeholder: "Legal signatory name" },
  { key: "partner_representative_title", label: "Representative Title / Function", required: false, placeholder: "e.g. CEO, Co-Founder, Director" },
  { key: "partner_email", label: "Email Address", required: true, placeholder: "your@company.com", type: "email" },
  { key: "monthly_travelers", label: "Monthly Travelers to Airports", required: true, type: "number", placeholder: "e.g. 5000" },
  { key: "partner_type", label: "Partner Type", required: false, type: "select", options: ["Travel Agency", "Airline", "Accommodation", "Car Rental", "Tour Operator", "OTA", "Other"] },
];

export default function LetterOfIntentPage() {
  const { t } = useTranslation();
  const [form, setForm] = useState({
    partner_company_name: "",
    partner_address: "",
    partner_country: "",
    partner_registration_number: "",
    partner_vat: "",
    partner_representative_name: "",
    partner_representative_title: "",
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
    }
    
    if (form.partner_country?.toLowerCase() === "netherlands" && form.partner_registration_number?.trim() && form.partner_company_name?.trim()) {
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

  const loiText = LOI_TEXT(form);

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
            <p className="text-sm text-blue-800 leading-relaxed">
              {t('letterOfIntent.description_1')}
            </p>
            <p className="text-sm text-blue-800 leading-relaxed">
              {t('letterOfIntent.description_2')}
            </p>
          </div>

          {/* Why Section */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg px-6 py-5 max-w-2xl mx-auto space-y-3">
            <h3 className="font-semibold text-slate-900 text-base">Why a Letter of Intent?</h3>
            <p className="text-sm text-slate-700 leading-relaxed mb-2">
              By signing this Letter of Intent, you commit to helping airport retailers see the measurable value DutyBoost delivers. Our shared goal is to demonstrate that:
            </p>
            <ul className="text-sm text-slate-700 space-y-1.5 ml-3">
              <li><strong>Conversion Uplift:</strong> Pre-activated travelers convert at 2x the rate of casual browsers — we prove this by delivering real results together.</li>
              <li><strong>Basket Size Growth:</strong> The €35 minimum spend naturally elevates average transaction value — airport retailers see this immediately.</li>
              <li><strong>Incremental Revenue:</strong> €300K–€400K annual per location — real, measurable growth on traffic they already have.</li>
            </ul>
            <p className="text-sm text-slate-700 leading-relaxed pt-2">
              Your signature signals to airport retailers that you're serious about this partnership. It shows them you're willing to integrate, issue DutyCredits, and prove the model works. That commitment is what unlocks their trust and participation.
            </p>
          </div>

          {/* How It Works Section */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg px-6 py-5 max-w-2xl mx-auto space-y-3">
            <h3 className="font-semibold text-emerald-900 text-base">How It Works</h3>
            <ol className="text-sm text-emerald-800 space-y-2 ml-2">
              <li><strong>1. You Sign:</strong> You review and digitally sign this Letter of Intent, confirming your intent to explore collaboration.</li>
              <li><strong>2. We Discuss:</strong> For up to 365 days, our teams engage in exclusive, good-faith discussions about partnership structure, integration, and commercial terms.</li>
              <li><strong>3. We Negotiate:</strong> Based on mutual interest, we move toward a formal partnership agreement with binding commercial terms.</li>
              <li><strong>4. We Execute:</strong> Once both parties agree on all details, we sign a final partnership agreement and begin implementation.</li>
              <li><strong>5. No Obligation Until Final Agreement:</strong> Until a final agreement is signed, neither party is obligated to proceed.</li>
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
            <strong>Important:</strong> {t('letterOfIntent.disclaimer')}
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
                <div key={field.key} className={field.key === "partner_address" ? "md:col-span-2" : ""}>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    {field.label}
                    {field.required && <span className="text-destructive ml-1">*</span>}
                  </label>
                  {field.type === "select" ? (
                    <select
                      value={form[field.key]}
                      onChange={e => handleChange(field.key, e.target.value)}
                      className={`w-full h-10 rounded-md border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring ${errors[field.key] ? "border-destructive" : "border-input"}`}
                    >
                      <option value="">Select type...</option>
                      {field.options.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  ) : field.key === "monthly_travelers" ? (
                    <Input
                      type="text"
                      placeholder={field.placeholder}
                      value={form[field.key] ? parseInt(form[field.key]).toLocaleString("de-DE") : ""}
                      onChange={e => handleChange(field.key, e.target.value)}
                      className={errors[field.key] ? "border-destructive" : ""}
                    />
                  ) : (
                    <Input
                      type={field.type || "text"}
                      placeholder={field.placeholder}
                      value={form[field.key]}
                      onChange={e => handleChange(field.key, e.target.value)}
                      className={errors[field.key] ? "border-destructive" : ""}
                    />
                  )}
                  {errors[field.key] && (
                    <p className="text-xs text-destructive mt-1">
                      {field.key === "partner_email" && errors[field.key] === "email_domain_invalid"
                        ? t('letterOfIntent.error_email_invalid')
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
                {t('letterOfIntent.acceptance_text', {
                  name: form.partner_representative_name || "[your name]",
                  company: form.partner_company_name || "[your company]",
                  date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })
                })}
              </span>
            </label>
            {errors.accepted && (
              <p className="text-xs text-destructive">You must accept the Letter of Intent to submit.</p>
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