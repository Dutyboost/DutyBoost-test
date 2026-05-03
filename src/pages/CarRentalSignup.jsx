import { useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import DutyBoostLogo from "../components/DutyBoostLogo";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, FileText, ArrowLeft, ArrowRight, ChevronLeft } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function CarRentalSignup() {
  const { t } = useTranslation();
  const [step, setStep] = useState(0);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [website, setWebsite] = useState("");
  const [city, setCity] = useState("");
  const [vehicles, setVehicles] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [applicationId, setApplicationId] = useState(null);

  const PERSONAL_DOMAINS = ['gmail.com','yahoo.com','hotmail.com','outlook.com'];
  const isPersonalEmail = (e) => PERSONAL_DOMAINS.some(d => e.toLowerCase().endsWith('@' + d));

  const isStep0Valid = () => fullName && email && !isPersonalEmail(email) && company && website && city && vehicles;

  const handleStep0Submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const app = await base44.entities.SignupApplication.create({
        full_name: fullName, email, company,
        business_type: "Car Rental Partner", website,
        airport: city, kvk: vehicles,
        status: "pending", terms_accepted: false,
      });
      setApplicationId(app.id);
      setStep(1);
    } finally {
      setLoading(false);
    }
  };

  const handleFinalSubmit = async () => {
    if (!termsAccepted) return;
    setLoading(true);
    try {
      await base44.entities.SignupApplication.update(applicationId, { terms_accepted: true, status: 'pending' });
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <nav className="border-b border-border px-6 h-16 flex items-center">
          <Link to="/"><DutyBoostLogo height={150} /></Link>
        </nav>
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-md text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-heading font-bold">{t('carrentalsignup.success_title')}</h1>
              <p className="text-muted-foreground">{t('carrentalsignup.success_desc')}</p>
            </div>
            <Link to="/car-rental-portal"><Button className="w-full">{t('carrentalsignup.success_button')}</Button></Link>
          </div>
        </div>
      </div>
    );
  }

  const STEPS = [t('carrentalsignup.step_info'), t('carrentalsignup.step_terms')];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <nav className="border-b border-border px-6 h-16 flex items-center justify-between">
        <Link to="/get-started"><Button variant="outline" size="sm" className="gap-2"><ChevronLeft className="w-4 h-4" /> {t('common.back')}</Button></Link>
        <Link to="/"><DutyBoostLogo height={150} /></Link>
        <LanguageSwitcher />
      </nav>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-lg space-y-8">
          <div className="flex items-center justify-center gap-0">
            {STEPS.map((label, i) => (
              <div key={i} className="flex items-center">
                <div className="flex flex-col items-center gap-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    i < step ? 'bg-primary text-primary-foreground' :
                    i === step ? 'bg-primary text-primary-foreground ring-4 ring-primary/20' :
                    'bg-muted text-muted-foreground'
                  }`}>
                    {i < step ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                  </div>
                  <span className={`text-xs font-medium ${i === step ? 'text-primary' : 'text-muted-foreground'}`}>{label}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`w-16 h-0.5 mb-4 mx-1 ${i < step ? 'bg-primary' : 'bg-border'}`} />
                )}
              </div>
            ))}
          </div>

          {step === 0 && (
            <>
              <div className="text-center space-y-2">
                <h1 className="text-3xl font-heading font-bold">{t('carrentalsignup.title')}</h1>
                <p className="text-muted-foreground text-sm">{t('carrentalsignup.subtitle')}</p>
              </div>

              <form onSubmit={handleStep0Submit} className="space-y-4">
                <div className="space-y-1.5">
                  <Label>{t('carrentalsignup.label_name')} <span className="text-red-500">*</span></Label>
                  <Input required placeholder="Jane Doe" value={fullName} onChange={e => setFullName(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>{t('carrentalsignup.label_email')} <span className="text-red-500">*</span></Label>
                  <Input required type="email" placeholder="jane@carrental.com" value={email} onChange={e => setEmail(e.target.value)} />
                  {email && isPersonalEmail(email) && <p className="text-xs text-red-500">{t('carrentalsignup.personal_email_error')}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label>{t('carrentalsignup.label_company')} <span className="text-red-500">*</span></Label>
                  <Input required placeholder="Your car rental company" value={company} onChange={e => setCompany(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>{t('carrentalsignup.label_website')} <span className="text-red-500">*</span></Label>
                  <Input required placeholder="https://yourcompany.com" value={website} onChange={e => setWebsite(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>{t('carrentalsignup.label_city')} <span className="text-red-500">*</span></Label>
                  <Input required placeholder="Amsterdam" value={city} onChange={e => setCity(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>{t('carrentalsignup.label_vehicles')} <span className="text-red-500">*</span></Label>
                  <Input required type="number" placeholder="100" value={vehicles} onChange={e => setVehicles(e.target.value)} />
                </div>

                <Button type="submit" className="w-full gap-2 h-11 text-base" disabled={!isStep0Valid() || loading}>
                  {loading ? t('carrentalsignup.saving') : t('carrentalsignup.continue')} <ArrowRight className="w-4 h-4" />
                </Button>
              </form>
            </>
          )}

          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-heading font-bold">{t('carrentalsignup.review_title')}</h2>
                <p className="text-sm text-muted-foreground">{t('carrentalsignup.review_subtitle')}</p>
              </div>

              <div className="bg-card border border-border rounded-xl p-5 space-y-3 text-sm">
                <p className="font-semibold">{t('carrentalsignup.summary_title')}</p>
                {[
                  { label: t('carrentalsignup.label_name'), value: fullName },
                  { label: t('carrentalsignup.label_email'), value: email },
                  { label: t('carrentalsignup.label_company'), value: company },
                  { label: t('carrentalsignup.label_city'), value: city },
                  { label: t('carrentalsignup.label_vehicles'), value: vehicles },
                ].map(({ label, value }) => value && (
                  <div key={label} className="flex justify-between">
                    <span className="text-muted-foreground">{label}</span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>

              <div className="bg-card border border-border rounded-xl p-5 space-y-4">
                <p className="font-semibold text-sm">{t('carrentalsignup.terms_title')}</p>
                <div className="h-36 overflow-y-auto text-xs text-muted-foreground space-y-2 pr-1 border border-border rounded-lg p-3 bg-muted/30">
                  <p><strong>DutyBoost Car Rental Partnership Agreement</strong></p>
                  <p>{t('carrentalsignup.terms_body')}</p>
                  <p>{t('carrentalsignup.terms_link_text')} <Link to="/terms" target="_blank" className="text-primary underline">Terms of Service</Link> {t('carrentalsignup.terms_and')} <Link to="/privacy" target="_blank" className="text-primary underline">Privacy Policy</Link>.</p>
                </div>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={e => setTermsAccepted(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-input accent-primary cursor-pointer"
                  />
                  <span className="text-sm text-foreground leading-relaxed">{t('carrentalsignup.terms_checkbox')}</span>
                </label>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="gap-2" onClick={() => setStep(0)}>
                  <ArrowLeft className="w-4 h-4" /> {t('common.back')}
                </Button>
                <Button className="gap-2 h-11 flex-1" disabled={!termsAccepted || loading} onClick={handleFinalSubmit}>
                  {loading ? t('carrentalsignup.submitting') : t('carrentalsignup.submit')} <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}