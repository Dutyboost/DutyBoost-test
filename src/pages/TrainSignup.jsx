import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { base44 } from "@/api/base44Client";
import DutyBoostLogo from "../components/DutyBoostLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, CheckCircle2, Train } from "lucide-react";
import PageFooter from "../components/PageFooter";

const isBusinessEmail = (email) => {
  const freeProviders = ["gmail.", "yahoo.", "hotmail.", "outlook.", "icloud.", "live."];
  return email.includes("@") && !freeProviders.some((p) => email.toLowerCase().includes(p));
};

export default function TrainSignup() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [appId, setAppId] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    company: "",
    website: "",
    kvk: "",
    vat: "",
    routes: "",
    main_stations: "",
    bank_account_name: "",
    bank_iban: "",
    terms_accepted: false,
  });

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleStep1 = async () => {
    setLoading(true);
    const rec = await base44.entities.SignupApplication.create({
      full_name: form.full_name,
      email: form.email,
      company: form.company,
      website: form.website,
      kvk: form.kvk,
      vat: form.vat,
      business_type: "Train Partner",
      booking_system: `Train Partner — Routes: ${form.routes} | Stations: ${form.main_stations}`,
      status: "pending",
    });
    setAppId(rec.id);
    setLoading(false);
    setStep(2);
  };

  const handleSubmit = async () => {
    setLoading(true);
    await base44.entities.SignupApplication.update(appId, {
      bank_account_name: form.bank_account_name,
      bank_iban: form.bank_iban,
      terms_accepted: true,
    });
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8 text-center space-y-6">
        <CheckCircle2 className="w-16 h-16 text-indigo-500" />
        <h1 className="text-3xl font-heading font-bold">{t('trainsignup.success_title')}</h1>
        <p className="text-muted-foreground max-w-md">
          {t('trainsignup.success_desc')}
        </p>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2" onClick={() => navigate("/train-portal")}>
          {t('trainsignup.success_button')} <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <nav className="sticky top-0 z-50 backdrop-blur border-b border-border bg-background/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div />
          <DutyBoostLogo height={120} />
          <div />
        </div>
      </nav>

      <div className="flex-1 flex flex-col items-center justify-center py-12 px-4">
        <div className="w-full max-w-lg space-y-8">
          {/* Step indicator */}
          <div className="flex items-center gap-3">
            {[1, 2].map((s) => (
              <div key={s} className={`flex items-center gap-1 text-sm font-semibold ${step >= s ? "text-indigo-600" : "text-muted-foreground"}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${step >= s ? "bg-indigo-600 text-white" : "bg-muted text-muted-foreground"}`}>{s}</div>
                {s === 1 ? t('trainsignup.step_info') : t('trainsignup.step_terms')}
              </div>
            ))}
          </div>

          <div className="bg-card rounded-2xl border border-border p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
                <Train className="w-5 h-5 text-indigo-600" />
              </div>
              <h1 className="text-2xl font-heading font-bold">
                {step === 1 ? t('trainsignup.title') : t('trainsignup.title2')}
              </h1>
            </div>

            {step === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label>{t('trainsignup.label_name')} *</Label>
                    <Input value={form.full_name} onChange={(e) => set("full_name", e.target.value)} placeholder="Jane Doe" />
                  </div>
                  <div className="space-y-1.5">
                    <Label>{t('trainsignup.label_email')} *</Label>
                    <Input value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="jane@railoperator.com" />
                    {form.email && !isBusinessEmail(form.email) && (
                      <p className="text-xs text-destructive">{t('trainsignup.personal_email_error')}</p>
                    )}
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label>{t('trainsignup.label_company')} *</Label>
                  <Input value={form.company} onChange={(e) => set("company", e.target.value)} placeholder="NS International, Eurostar, DB..." />
                </div>
                <div className="space-y-1.5">
                  <Label>{t('trainsignup.label_website')}</Label>
                  <Input value={form.website} onChange={(e) => set("website", e.target.value)} placeholder="https://www.youroperator.com" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label>{t('trainsignup.label_kvk')}</Label>
                    <Input value={form.kvk} onChange={(e) => set("kvk", e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <Label>{t('trainsignup.label_vat')}</Label>
                    <Input value={form.vat} onChange={(e) => set("vat", e.target.value)} />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label>{t('trainsignup.label_routes')}</Label>
                  <Input value={form.routes} onChange={(e) => set("routes", e.target.value)} placeholder="Amsterdam–Paris, London–Brussels..." />
                </div>
                <div className="space-y-1.5">
                  <Label>{t('trainsignup.label_stations')}</Label>
                  <Input value={form.main_stations} onChange={(e) => set("main_stations", e.target.value)} placeholder="Amsterdam Centraal, Paris Gare du Nord..." />
                </div>
                <Button
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white gap-2"
                  disabled={!form.full_name || !form.email || !form.company || !isBusinessEmail(form.email) || loading}
                  onClick={handleStep1}
                >
                  {loading ? t('trainsignup.saving') : <>{t('trainsignup.continue')} <ArrowRight className="w-4 h-4" /></>}
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 text-sm text-indigo-800 space-y-1">
                  <p className="font-semibold">{t('trainsignup.summary_title')}</p>
                  <p>{form.company} · {form.email}</p>
                  {form.routes && <p>{t('trainsignup.label_routes')}: {form.routes}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label>{t('trainsignup.label_bank_name')}</Label>
                  <Input value={form.bank_account_name} onChange={(e) => set("bank_account_name", e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>{t('trainsignup.label_iban')}</Label>
                  <Input value={form.bank_iban} onChange={(e) => set("bank_iban", e.target.value)} placeholder="NL91 ABNA 0417 1643 00" />
                </div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-1" checked={form.terms_accepted} onChange={(e) => set("terms_accepted", e.target.checked)} />
                  <span className="text-sm text-muted-foreground">
                    {t('trainsignup.terms_checkbox')}
                  </span>
                </label>
                <Button
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white gap-2"
                  disabled={!form.terms_accepted || loading}
                  onClick={handleSubmit}
                >
                  {loading ? t('trainsignup.submitting') : <>{t('trainsignup.submit')} <ArrowRight className="w-4 h-4" /></>}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      <PageFooter />
    </div>
  );
}