import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { base44 } from "@/api/base44Client";
import DutyBoostLogo from "../components/DutyBoostLogo";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2, CreditCard, FileText, ClipboardList, ArrowLeft, ArrowRight, ChevronLeft } from "lucide-react";
import { toast } from "sonner";
import PurchaseOrderDoc from "../components/PurchaseOrderDoc";
import KvkValidator from "../components/KvkValidator";
import PaymentMethodSelector from "../components/PaymentMethodSelector";

export default function RetailerSignup() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const STEPS = [t('signup.retailer.steps.0'), t('signup.retailer.steps.1'), t('signup.retailer.steps.2'), t('signup.retailer.steps.3')];
  
  const [step, setStep] = useState(0);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [website, setWebsite] = useState("");
  const [kvk, setKvk] = useState("");
  const [vat, setVat] = useState("");
  const [airport, setAirport] = useState("");
  const [storeCategory, setStoreCategory] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("self_pay_invoice");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [bankAccountName, setBankAccountName] = useState("");
  const [bankIban, setBankIban] = useState("");
  const [invoiceEmail, setInvoiceEmail] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [applicationId, setApplicationId] = useState(null);
  const [airports, setAirports] = useState([]);
  const [kvkValidated, setKvkValidated] = useState(false);

  const FALLBACK_AIRPORTS = [
    { code: 'AMS', name: 'Amsterdam Schiphol', city: 'Amsterdam' },
    { code: 'EIN', name: 'Eindhoven', city: 'Eindhoven' },
    { code: 'GRQ', name: 'Groningen Eelde', city: 'Groningen' },
    { code: 'MST', name: 'Maastricht Aachen', city: 'Maastricht' },
    { code: 'RTM', name: 'Rotterdam The Hague', city: 'Rotterdam' },
  ];

  useEffect(() => {
    base44.entities.Airport.list()
      .then(data => {
        if (!data || data.length === 0) { setAirports(FALLBACK_AIRPORTS); return; }
        const seen = new Set();
        const unique = data.filter(a => {
          if (seen.has(a.code)) return false;
          seen.add(a.code);
          return true;
        });
        unique.sort((a, b) => a.name.localeCompare(b.name));
        setAirports(unique);
      })
      .catch(() => setAirports(FALLBACK_AIRPORTS));
  }, []);

  const PERSONAL_DOMAINS = ['gmail.com','yahoo.com','hotmail.com','outlook.com','icloud.com','live.com','aol.com','protonmail.com','mail.com','gmx.com','ymail.com','msn.com'];
  const isPersonalEmail = (e) => PERSONAL_DOMAINS.some(d => e.toLowerCase().endsWith('@' + d));

  const isStep0Valid = () => {
    return fullName && email && !isPersonalEmail(email) && company && website && kvk && vat && airport && storeCategory && kvkValidated;
  };

  const handleStep0Submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const app = await base44.entities.SignupApplication.create({
        full_name: fullName,
        email,
        company,
        business_type: "Airport Retailer",
        website,
        kvk,
        vat,
        airport,
        store_category: storeCategory,
        status: "pending",
        terms_accepted: false,
      });
      setApplicationId(app.id);
      setStep(1);
    } finally {
      setLoading(false);
    }
  };

  const poNumber = applicationId ? applicationId.slice(-8).toUpperCase() : "PENDING";

  const isStep1Valid = () => {
    return invoiceEmail.trim().length > 0;
  };

  const handleStep1Submit = async () => {
    if (!isStep1Valid()) return;
    setLoading(true);
    try {
      const updateData = { payment_method: paymentMethod };
      if (paymentMethod === "creditcard") {
        updateData.card_number = cardNumber;
        updateData.card_name = cardName;
        updateData.card_expiry = expiryDate;
        
        // Process €0.01 card verification charge
        try {
          const res = await base44.functions.invoke('processRetailerCardPayment', {
            cardNumber,
            cardName,
            expiryDate,
            cvv,
            applicationId,
            redirectUrl: window.location.origin + '/retailer-signup',
          });
          if (!res.data?.success) {
            toast.error('Card verification failed. Please check your card details.');
            setLoading(false);
            return;
          }
          toast.success('Card verified! €0.01 charge processed.');
        } catch (err) {
          toast.error('Payment processing error: ' + (err.message || 'Unknown error'));
          setLoading(false);
          return;
        }
      } else if (paymentMethod === "monthly_invoice") {
        updateData.bank_account_name = bankAccountName;
        updateData.bank_iban = bankIban;
      } else if (paymentMethod === "self_pay_invoice") {
        updateData.bank_account_name = invoiceEmail; // store invoice email in bank_account_name field
      }
      await base44.entities.SignupApplication.update(applicationId, updateData);
      setStep(2);
    } finally {
      setLoading(false);
    }
  };

  const handleStep2Submit = async () => {
    setLoading(true);
    try {
      try {
        await base44.functions.invoke('sendPurchaseOrderEmail', {
          applicationId,
          businessType: "Airport Retailer",
          formData: { fullName, email, company, kvk, vat },
          poNumber,
        });
      } catch {
        // Email may fail if user not yet registered — continue regardless
      }
      setStep(3);
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
             <h1 className="text-3xl font-heading font-bold">{t('signup.retailer.success_title')}</h1>
             <p className="text-muted-foreground">
               {t('signup.retailer.success_desc')}
             </p>
            </div>
            <Link to="/retailer-portal"><Button className="w-full">{t('signup.retailer.success_button')}</Button></Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <nav className="border-b border-border px-6 h-16 flex items-center justify-between">
        <Link to="/get-started"><Button variant="outline" size="sm" className="gap-2"><ChevronLeft className="w-4 h-4" /> {t('common.back')}</Button></Link>
        <Link to="/"><DutyBoostLogo height={150} /></Link>
        <LanguageSwitcher />
      </nav>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-lg space-y-8">

          {/* Step indicator */}
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

          {/* Step 0: Business Info */}
          {step === 0 && (
            <>
              <div className="text-center space-y-2">
                <h1 className="text-3xl font-heading font-bold">{t('signup.retailer.step0_title')}</h1>
                <p className="text-muted-foreground text-sm">
                  {t('signup.retailer.subtitle')}
                </p>
              </div>

              <form onSubmit={handleStep0Submit} className="space-y-4">
                <div className="space-y-1.5">
                  <Label>{t('getstarted.full_name')} <span className="text-red-500">*</span></Label>
                  <Input required placeholder="John Smith" value={fullName} onChange={e => setFullName(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>{t('getstarted.work_email')} <span className="text-red-500">*</span></Label>
                  <Input required type="email" placeholder="john@store.com" value={email} onChange={e => setEmail(e.target.value)} />
                  {email && isPersonalEmail(email) && (
                    <p className="text-xs text-red-500">{t('wecallyou.err_email_work')}</p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label>{t('getstarted.company_name')} <span className="text-red-500">*</span></Label>
                  <Input required placeholder="Your store" value={company} onChange={e => setCompany(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>{t('getstarted.website')} <span className="text-red-500">*</span></Label>
                  <Input required placeholder="https://yourstore.com" value={website} onChange={e => setWebsite(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>{t('getstarted.airport')} <span className="text-red-500">*</span></Label>
                  <select
                    value={airport}
                    onChange={e => setAirport(e.target.value)}
                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    <option value="">{t('getstarted.select_airport')}</option>
                    {airports.map(a => (
                      <option key={a.code} value={a.code}>
                        {a.code} — {a.name} ({a.city})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label>{t('getstarted.kvk')} <span className="text-red-500">*</span></Label>
                    <Input required placeholder="12345678" value={kvk} onChange={e => setKvk(e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <Label>{t('getstarted.vat')} <span className="text-red-500">*</span></Label>
                    <Input required placeholder="NL123456789B01" value={vat} onChange={e => setVat(e.target.value)} />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label>{t('getstarted.store_category')} <span className="text-red-500">*</span></Label>
                  <Select value={storeCategory} onValueChange={setStoreCategory}>
                    <SelectTrigger><SelectValue placeholder={t('getstarted.select_category')} /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Retail">{t('getstarted.retail')}</SelectItem>
                      <SelectItem value="Food & Beverage">{t('getstarted.food_bev')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {/* KVK + VAT Verification */}
                <KvkValidator
                  kvk={kvk}
                  vat={vat}
                  company={company}
                  onValidated={({ valid }) => setKvkValidated(valid)}
                />

                <Button type="submit" className="w-full gap-2 h-11 text-base" disabled={!isStep0Valid() || loading}>
                  {loading ? t('getstarted.saving') : t('getstarted.continue')} <ArrowRight className="w-4 h-4" />
                </Button>
              </form>
            </>
          )}

          {/* Step 1: Payment Method */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto">
                  <CreditCard className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-heading font-bold">{t('signup.retailer.step1_title')}</h2>
                <p className="text-sm text-muted-foreground">
                  {t('signup.retailer.step1_desc')}
                </p>
              </div>

              <PaymentMethodSelector
                invoiceEmail={invoiceEmail}
                onInvoiceEmailChange={setInvoiceEmail}
              />

              <div className="flex gap-3">
                <Button variant="outline" className="gap-2" onClick={() => setStep(0)}>
                  <ArrowLeft className="w-4 h-4" /> {t('getstarted.back')}
                </Button>
                <Button className="gap-2 h-11" disabled={!isStep1Valid() || loading} onClick={handleStep1Submit}>
                  {loading ? t('getstarted.saving') : t('getstarted.continue')} <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Purchase Order */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto">
                  <ClipboardList className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-heading font-bold">{t('signup.retailer.step2_title')}</h2>
                <p className="text-sm text-muted-foreground">{t('signup.retailer.step2_desc')} <strong>{email}</strong>.</p>
              </div>

              <PurchaseOrderDoc
                businessType="Airport Retailer"
                formData={{ fullName, email, company, kvk, vat }}
                poNumber={poNumber}
              />

              <div className="flex gap-3">
                <Button variant="outline" className="gap-2" onClick={() => setStep(1)}>
                  <ArrowLeft className="w-4 h-4" /> {t('getstarted.back')}
                </Button>
                <Button className="gap-2 h-11" disabled={loading} onClick={handleStep2Submit}>
                  {loading ? t('getstarted.sending') : t('getstarted.accept_continue')} <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Terms & Review */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-heading font-bold">{t('signup.retailer.step3_title')}</h2>
                <p className="text-sm text-muted-foreground">{t('signup.retailer.step3_desc')}</p>
              </div>

              {/* Summary */}
              <div className="bg-card border border-border rounded-xl p-5 space-y-3 text-sm">
                <p className="font-semibold text-foreground">{t('getstarted.application_summary')}</p>
                {[
                  { label: t('getstarted.name_label'), value: fullName },
                  { label: t('getstarted.email_label'), value: email },
                  { label: t('getstarted.company_label'), value: company },
                  { label: t('getstarted.type_label'), value: t('getstarted.airport_retailer') },
                  { label: t('getstarted.payment_method_label'), value: paymentMethod === "creditcard" ? "CREDIT CARD" : paymentMethod === "monthly_invoice" ? "MONTHLY INVOICE (SEPA)" : "MONTHLY INVOICE — SELF PAY" },
                  ...(paymentMethod === "creditcard" ? [
                    { label: "Cardholder", value: cardName },
                    { label: "Card Number", value: `****-****-****-${cardNumber.slice(-4)}` },
                  ] : paymentMethod === "monthly_invoice" ? [
                   { label: t('getstarted.account_holder'), value: bankAccountName },
                   { label: t('getstarted.iban'), value: bankIban },
                  ] : paymentMethod === "self_pay_invoice" ? [
                   { label: "Invoice Email", value: invoiceEmail },
                  ] : []),
                ].map(({ label, value }) => value && (
                  <div key={label} className="flex justify-between">
                    <span className="text-muted-foreground">{label}</span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>

              {/* Terms acceptance */}
              <div className="bg-card border border-border rounded-xl p-5 space-y-4">
                <p className="font-semibold text-sm">{t('getstarted.terms_conditions')}</p>
                <div className="h-36 overflow-y-auto text-xs text-muted-foreground space-y-2 pr-1 border border-border rounded-lg p-3 bg-muted/30">
                  <p><strong>DutyBoost Platform Agreement</strong></p>
                  <p>By joining DutyBoost, you agree to the following terms:</p>
                  <p><strong>1. Service Description.</strong> DutyBoost provides a travel retail conversion platform connecting travel agencies, airport retailers, and travelers through DutyCredit incentives.</p>
                  <p><strong>2. Commission & Fees.</strong> A commission is charged per confirmed DutyCredit redemption at your store. The applicable rate is communicated in your onboarding documentation.</p>
                  <p><strong>3. Payment Mandate.</strong> By providing a payment method, you authorise DutyBoost B.V. to collect fees for confirmed redemptions via the selected payment method.</p>
                  <p><strong>3a. Monthly Invoice.</strong> Airport Retailers who opt for Monthly Invoice billing will receive an invoice on the 1st of each month for the prior month's platform fees. Payment is due within 14 days of the invoice date. If payment is not received within 14 days, access to the DutyBoost platform will be suspended on day 15 until the outstanding balance is settled.</p>
                  <p><strong>4. Data Processing.</strong> Your business data is processed in accordance with our Privacy Policy and GDPR obligations.</p>
                  <p><strong>5. Acceptable Use.</strong> You agree not to misuse DutyCredits, manipulate redemption data, or violate any applicable laws or regulations.</p>
                  <p><strong>6. Termination.</strong> Either party may terminate this agreement with 30 days written notice. Outstanding fees remain due upon termination.</p>
                  <p><strong>7. Governing Law.</strong> This agreement is governed by Dutch law. Disputes shall be submitted to the competent courts of Amsterdam, the Netherlands.</p>
                  <p>For full terms, see our <Link to="/terms" target="_blank" className="text-primary underline">Terms of Service</Link>, <Link to="/privacy" target="_blank" className="text-primary underline">Privacy Policy</Link>, and <Link to="/dpa" target="_blank" className="text-primary underline">Data Processing Agreement</Link>.</p>
                </div>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={e => setTermsAccepted(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-input accent-primary cursor-pointer"
                  />
                  <span className="text-sm text-foreground leading-relaxed">
                    {t('getstarted.terms_checkbox_retailer')}
                  </span>
                </label>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="gap-2" onClick={() => setStep(2)}>
                  <ArrowLeft className="w-4 h-4" /> {t('getstarted.back')}
                </Button>
                <Button className="gap-2 h-11" disabled={!termsAccepted || loading} onClick={handleFinalSubmit}>
                  {loading ? t('getstarted.submitting') : t('getstarted.submit')} <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          <p className="text-center text-sm text-muted-foreground">
            {t('getstarted.already_account')}{" "}
            <button onClick={() => base44.auth.redirectToLogin('/retailer-portal')} className="text-primary underline underline-offset-2">
              {t('getstarted.sign_in')}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}