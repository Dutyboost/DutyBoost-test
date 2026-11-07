import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, ArrowLeft, Store, Users, CheckCircle2, CreditCard, FileText, ClipboardList } from "lucide-react";
import PurchaseOrderDoc from "../components/PurchaseOrderDoc";
import DutyBoostLogo from "../components/DutyBoostLogo";
import PaymentMethodSelector from "../components/PaymentMethodSelector";



const BOOKING_ENGINES = [
  "Amadeus", "Sabre", "Travelport (Galileo/Apollo/Worldspan)", "Worldline",
  "NDC (IATA)", "Farelogix", "TravelFusion", "Mystifly", "Verteil", "Duffel",
  "Kiwi.com", "Travix", "Peakwork", "IBS Software", "SITA", "Radixx",
  "Navitaire", "SkySpeed", "Hitit", "Crane PAX", "Videcom",
  "TravelSky", "Hahn Air", "AeroCRS", "OpenJaw", "TravelClick",
  "Rezdy", "Beds24", "BookingKit", "Tours4Fun", "TripCreator",
  "HotelBeds", "Tourplan", "Lemax", "Travelogics", "Anixe",
  "Tourwriter", "Travelgate", "Juniper", "Traffics", "Dolphin Dynamics",
  "Atcore", "GP Travel Enterprise", "TourCMS", "TrekkSoft",
  "FareHarbor", "Bokun", "Regiondo", "WeTravel", "Checkfront",
  "Custom / Proprietary", "Other",
];

function BookingSystemSelect({ value, onChange }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef(null);

  const filtered = BOOKING_ENGINES.filter(e =>
    e.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (engine) => {
    onChange(engine);
    setSearch("");
    setOpen(false);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className={`flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm text-left ${
          value ? "text-foreground" : "text-muted-foreground"
        }`}
      >
        <span className="truncate">{value || t('getstarted.select_engine')}</span>
        <svg className="h-4 w-4 opacity-50 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      </button>
      {open && (
        <div className="absolute z-50 mt-1 w-full rounded-md border border-border bg-popover shadow-lg">
          <div className="p-2 border-b border-border">
            <input
              autoFocus
              className="w-full rounded-sm border border-input px-3 py-1.5 text-sm outline-none bg-transparent placeholder:text-muted-foreground"
              placeholder={t('getstarted.search_engine')}
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="max-h-52 overflow-y-auto p-1">
            {filtered.length === 0 ? (
              <div className="px-3 py-2 text-sm text-muted-foreground">{t('getstarted.no_results')}</div>
            ) : filtered.map(engine => (
              <button
                key={engine}
                type="button"
                onClick={() => handleSelect(engine)}
                className={`w-full text-left px-3 py-2 text-sm rounded-sm hover:bg-accent hover:text-accent-foreground ${
                  value === engine ? "bg-accent text-accent-foreground font-medium" : ""
                }`}
              >
                {engine}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function GetStarted() {
  const { t } = useTranslation();
  const RETAILER_STEPS = [t('getstarted.steps_retailer_0'), t('getstarted.steps_retailer_1'), t('getstarted.steps_retailer_2'), t('getstarted.steps_retailer_3')];
  const AGENCY_STEPS = [t('getstarted.steps_agency_0'), t('getstarted.steps_agency_1'), t('getstarted.steps_agency_2'), t('getstarted.steps_agency_3')];
  const [step, setStep] = useState(0);
  const [businessType, setBusinessType] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [website, setWebsite] = useState("");
  const [kvk, setKvk] = useState("");
  const [vat, setVat] = useState("");
  const [bookingSystem, setBookingSystem] = useState("");
  const [airport, setAirport] = useState("");
  const [storeCategory, setStoreCategory] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [bankAccountName, setBankAccountName] = useState("");
  const [bankIban, setBankIban] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [applicationId, setApplicationId] = useState(null);
  const [airports, setAirports] = useState([]);

  useEffect(() => {
    base44.entities.Airport.list().then(data => {
      // Deduplicate by IATA code
      const seen = new Set();
      const unique = (data || []).filter(a => {
        if (seen.has(a.code)) return false;
        seen.add(a.code);
        return true;
      });
      unique.sort((a, b) => a.name.localeCompare(b.name));
      setAirports(unique);
    });
  }, []);

  const PERSONAL_DOMAINS = ['gmail.com','yahoo.com','hotmail.com','outlook.com','icloud.com','live.com','aol.com','protonmail.com','mail.com','gmx.com','ymail.com','msn.com'];
  const isPersonalEmail = (e) => PERSONAL_DOMAINS.some(d => e.toLowerCase().endsWith('@' + d));

  const isAgency = businessType === "Travel Agency";
  const isRetailer = businessType === "Airport Retailer";
  const STEPS = isAgency ? AGENCY_STEPS : RETAILER_STEPS;
  // For agencies, internal step mapping: 0=info, 2=PO, 3=terms (skip 1)
  // We use a display step for the indicator
  const displayStep = isAgency && step >= 2 ? step - 1 : step;

  const isStep0Valid = () => {
    if (!businessType || !fullName || !email || isPersonalEmail(email) || !company || !website || !kvk || !vat) return false;
    if (isAgency && !bookingSystem) return false;
    if (isRetailer && (!airport || !storeCategory)) return false;
    return true;
  };

  const handleStep1Submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const app = await base44.entities.SignupApplication.create({
        full_name: fullName,
        email,
        company,
        business_type: businessType,
        website,
        kvk,
        vat,
        booking_system: bookingSystem,
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

  const handleStep2Submit = async () => {
    if (isRetailer && !paymentMethod) return;
    setLoading(true);
    try {
      if (isAgency) {
        await base44.auth.updateMe({ bank_account_name: bankAccountName, bank_iban: bankIban });
      } else {
        await base44.entities.SignupApplication.update(applicationId, { payment_method: paymentMethod });
      }
      setStep(2);
    } finally {
      setLoading(false);
    }
  };

  const handleStep3Submit = async () => {
    setLoading(true);
    try {
      try {
        await base44.functions.invoke('sendPurchaseOrderEmail', {
          applicationId,
          businessType,
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
      await base44.entities.SignupApplication.update(applicationId, { terms_accepted: true });
      if (isRetailer) {
        try {
          const res = await base44.functions.invoke('createMolliePayment', {
            applicationId,
            paymentMethod,
            redirectUrl: window.location.origin + '/get-started/payment-return',
            email,
            fullName,
          });
          if (res.data?.checkoutUrl) {
            window.location.href = res.data.checkoutUrl;
            return;
          }
        } catch {
          // Mollie not configured yet — fall through to success
        }
      }
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <nav className="border-b border-border px-6 h-16 flex items-center">
          <Link to="/"><DutyBoostLogo height={40} /></Link>
        </nav>
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-md text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-heading font-bold">{t('getstarted.success_title')}</h1>
              <p className="text-muted-foreground">
                {t('getstarted.success_text')}
              </p>
            </div>
            <div className="bg-card border border-border rounded-2xl p-6 text-left space-y-4">
              <p className="font-semibold text-sm">{t('getstarted.what_next')}</p>
              <ol className="space-y-3">
                {[
                  t('getstarted.next_step_1'),
                  t('getstarted.next_step_2'),
                  t('getstarted.next_step_3'),
                  t('getstarted.next_step_4'),
                ].map((text, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                    <span className="text-sm text-muted-foreground">{text}</span>
                  </li>
                ))}
              </ol>
            </div>
            <p className="text-sm text-muted-foreground">
              {t('getstarted.questions_email')}{' '}
              <a href="mailto:hello@dutyboost.com" className="text-primary underline underline-offset-2">hello@dutyboost.com</a>
            </p>
            <Link to="/"><Button variant="outline" className="w-full">{t('getstarted.back_to_home')}</Button></Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <nav className="border-b border-border px-6 h-16 flex items-center">
        <Link to="/"><DutyBoostLogo height={40} /></Link>
      </nav>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-lg space-y-8">

          {/* Step indicator */}
          <div className="flex items-center justify-center gap-0">
            {STEPS.map((label, i) => (
              <div key={i} className="flex items-center">
                <div className="flex flex-col items-center gap-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    i < displayStep ? 'bg-primary text-primary-foreground' :
                    i === displayStep ? 'bg-primary text-primary-foreground ring-4 ring-primary/20' :
                    'bg-muted text-muted-foreground'
                  }`}>
                    {i < displayStep ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                  </div>
                  <span className={`text-xs font-medium ${i === displayStep ? 'text-primary' : 'text-muted-foreground'}`}>{label}</span>
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
                <h1 className="text-3xl font-heading font-bold">{t('getstarted.title')}</h1>
                <p className="text-muted-foreground text-sm">
                  {isAgency ? t('getstarted.subtitle_agency')
                    : isRetailer ? t('getstarted.subtitle_retailer')
                    : t('getstarted.subtitle_default')}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { type: "Travel Agency", icon: Users, desc: t('getstarted.agency_desc') },
                  { type: "Airport Retailer", icon: Store, desc: t('getstarted.retailer_desc') },
                ].map(({ type, icon: Icon, desc }) => (
                  <button key={type} type="button" onClick={() => setBusinessType(type)}
                    className={`p-5 rounded-2xl border-2 text-left transition-all ${
                      businessType === type ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/40"
                    }`}>
                    <Icon className={`w-6 h-6 mb-2 ${businessType === type ? "text-primary" : "text-muted-foreground"}`} />
                    <p className="font-semibold text-sm">{type === 'Travel Agency' ? t('getstarted.travel_agency') : t('getstarted.airport_retailer')}</p>
                    <p className="text-xs text-muted-foreground mt-1">{desc}</p>
                  </button>
                ))}
              </div>

              <form onSubmit={handleStep1Submit} className="space-y-4">
                <div className="space-y-1.5">
                  <Label>{t('getstarted.business_type')}</Label>
                  <Select value={businessType} onValueChange={setBusinessType}>
                    <SelectTrigger><SelectValue placeholder={t('getstarted.select_type')} /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Travel Agency">{t('getstarted.travel_agency')}</SelectItem>
                      <SelectItem value="Airport Retailer">{t('getstarted.airport_retailer')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>{t('getstarted.full_name')} <span className="text-red-500">*</span></Label>
                  <Input required placeholder="Jane Smith" value={fullName} onChange={e => setFullName(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>{t('getstarted.work_email')} <span className="text-red-500">*</span></Label>
                  <Input required type="email" placeholder="jane@company.com" value={email} onChange={e => setEmail(e.target.value)} />
                  {email && isPersonalEmail(email) && (
                    <p className="text-xs text-red-500">Please use your work email address. Personal email providers (Gmail, Hotmail, etc.) are not accepted.</p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label>{t('getstarted.company_name')} <span className="text-red-500">*</span></Label>
                  <Input required placeholder="Your company" value={company} onChange={e => setCompany(e.target.value)} />
                </div>
                {isRetailer && (
                  <div className="space-y-1.5">
                    <Label>{t('getstarted.airport')}</Label>
                    <Select value={airport} onValueChange={setAirport}>
                      <SelectTrigger><SelectValue placeholder={t('getstarted.select_airport')} /></SelectTrigger>
                      <SelectContent>
                        {airports.map(a => (
                          <SelectItem key={a.code} value={a.code}>
                            {a.name} — {a.city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                <div className="space-y-1.5">
                  <Label>{t('getstarted.website')} <span className="text-red-500">*</span></Label>
                  <Input required placeholder="https://yourcompany.com" value={website} onChange={e => setWebsite(e.target.value)} />
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
                {isAgency && (
                  <div className="space-y-1.5">
                    <Label>{t('getstarted.booking_engine')} <span className="text-red-500">*</span></Label>
                    <BookingSystemSelect value={bookingSystem} onChange={setBookingSystem} />
                  </div>
                )}
                {isRetailer && (
                  <div className="space-y-1.5">
                    <Label>{t('getstarted.store_category')}</Label>
                    <Select value={storeCategory} onValueChange={setStoreCategory}>
                      <SelectTrigger><SelectValue placeholder={t('getstarted.select_category')} /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Retail">{t('getstarted.retail')}</SelectItem>
                        <SelectItem value="Food & Beverage">{t('getstarted.food_bev')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
                <Button type="submit" className="w-full gap-2 h-11 text-base" disabled={!isStep0Valid() || loading}>
                  {loading ? t('getstarted.saving') : t('getstarted.continue')} <ArrowRight className="w-4 h-4" />
                </Button>
              </form>
            </>
          )}

          {/* Step 1: Bank Details (Agencies) or Payment Method (Retailers) */}
          {step === 1 && isAgency && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mx-auto">
                  <CreditCard className="w-6 h-6 text-emerald-600" />
                </div>
                <h2 className="text-2xl font-heading font-bold">{t('getstarted.bank_title')}</h2>
                <p className="text-sm text-muted-foreground">
                  {t('getstarted.bank_subtitle')}
                </p>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-sm text-emerald-800">
                <strong>{t('getstarted.bank_how_bold')}</strong> {t('getstarted.bank_how_text')}
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label>{t('getstarted.account_holder')} <span className="text-red-500">*</span></Label>
                  <Input
                    required
                    placeholder="e.g. Sunweb Group B.V."
                    value={bankAccountName}
                    onChange={e => setBankAccountName(e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>{t('getstarted.iban')} <span className="text-red-500">*</span></Label>
                  <Input
                    required
                    placeholder="e.g. NL91ABNA0417164300"
                    value={bankIban}
                    onChange={e => setBankIban(e.target.value.toUpperCase())}
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="gap-2" onClick={() => setStep(0)}>
                  <ArrowLeft className="w-4 h-4" /> {t('getstarted.back')}
                </Button>
                <Button
                  className="flex-1 gap-2 h-11"
                  disabled={!bankAccountName || !bankIban || loading}
                  onClick={handleStep2Submit}
                >
                  {loading ? t('getstarted.saving') : t('getstarted.continue')} <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {step === 1 && isRetailer && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto">
                  <CreditCard className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-heading font-bold">{t('getstarted.billing_title')}</h2>
                <p className="text-sm text-muted-foreground">
                  {t('getstarted.billing_subtitle_1')} <strong>{t('getstarted.billing_subtitle_2')}</strong>{t('getstarted.billing_subtitle_3')}
                </p>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-sm text-orange-800">
                <strong>{t('getstarted.billing_how_bold')}</strong> {t('getstarted.billing_how_text')}
              </div>

              <PaymentMethodSelector value={paymentMethod} onChange={setPaymentMethod} businessType={businessType} />

              <div className="flex gap-3">
                <Button variant="outline" className="gap-2" onClick={() => setStep(0)}>
                  <ArrowLeft className="w-4 h-4" /> {t('getstarted.back')}
                </Button>
                <Button className="flex-1 gap-2 h-11" disabled={!paymentMethod || loading} onClick={handleStep2Submit}>
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
                <h2 className="text-2xl font-heading font-bold">{t('getstarted.po_title')}</h2>
                <p className="text-sm text-muted-foreground">{t('getstarted.po_subtitle')} <strong>{email}</strong>.</p>
              </div>

              <PurchaseOrderDoc
                businessType={businessType}
                formData={{ fullName, email, company, kvk, vat }}
                poNumber={poNumber}
              />

              <div className="flex gap-3">
                <Button variant="outline" className="gap-2" onClick={() => setStep(isAgency ? 0 : 1)}>
                  <ArrowLeft className="w-4 h-4" /> {t('getstarted.back')}
                </Button>
                <Button className="flex-1 gap-2 h-11" disabled={loading} onClick={handleStep3Submit}>
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
                <h2 className="text-2xl font-heading font-bold">{t('getstarted.terms_title')}</h2>
                <p className="text-sm text-muted-foreground">{t('getstarted.terms_subtitle')}</p>
              </div>

              {/* Summary */}
              <div className="bg-card border border-border rounded-xl p-5 space-y-3 text-sm">
                <p className="font-semibold text-foreground">{t('getstarted.application_summary')}</p>
                {[
                  { label: t('getstarted.name_label'), value: fullName },
                  { label: t('getstarted.email_label'), value: email },
                  { label: t('getstarted.company_label'), value: company },
                  { label: t('getstarted.type_label'), value: businessType },
                  ...(isRetailer ? [{ label: t('getstarted.payment_method_label'), value: paymentMethod?.toUpperCase() }] : []),
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
                  <p><strong>1. Service Description.</strong> DutyBoost operates a Performance-based Customer Acquisition Solution for Global Travel — a shared, performance-based commercial ecosystem connecting Travel Partners, Airport Retailers, POS Partners, and travelers through DutyCredit incentives.</p>
                  <p><strong>2. Commission & Fees.</strong> A commission is charged per confirmed DutyCredit redemption at participating airport retailers. The applicable rate is communicated in your onboarding documentation.</p>
                  <p><strong>3. Payment Mandate.</strong> By providing a payment method, you authorise DutyBoost to collect fees for confirmed redemptions via the selected payment method.</p>
                  <p><strong>3a. Monthly Invoice.</strong> Airport Retailers who opt for Monthly Invoice billing will receive an invoice on the 1st of each month for the prior month's platform fees. Payment is due within 14 days of the invoice date. If payment is not received within 14 days, access to the DutyBoost platform will be suspended on day 15 until the outstanding balance is settled.</p>
                  <p><strong>4. Data Processing.</strong> Your business data is processed in accordance with our Privacy Policy and GDPR obligations. We act as a data processor for booking data provided by travel agencies.</p>
                  <p><strong>5. Acceptable Use.</strong> You agree not to misuse DutyCredits, manipulate redemption data, or violate any applicable laws or regulations.</p>
                  <p><strong>6. Termination.</strong> Either party may terminate this agreement with 30 days written notice. Outstanding fees remain due upon termination.</p>
                  <p><strong>7. Governing Law.</strong> This agreement is governed by Dutch law. Disputes shall be submitted to the competent courts of Amsterdam, the Netherlands.</p>
                  <p>For full terms, see our <a href="/terms" target="_blank" className="text-primary underline">Terms of Service</a>, <a href="/privacy" target="_blank" className="text-primary underline">Privacy Policy</a>, and <a href="/dpa" target="_blank" className="text-primary underline">Data Processing Agreement</a>.</p>
                </div>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={e => setTermsAccepted(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-input accent-primary cursor-pointer"
                  />
                  <span className="text-sm text-foreground leading-relaxed">
                    {isAgency ? t('getstarted.terms_checkbox_agency') : t('getstarted.terms_checkbox_retailer')}
                  </span>
                </label>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="gap-2" onClick={() => setStep(isAgency ? 2 : 2)}>
                  <ArrowLeft className="w-4 h-4" /> {t('getstarted.back')}
                </Button>
                <Button
                  className="flex-1 gap-2 h-11"
                  disabled={!termsAccepted || loading}
                  onClick={handleFinalSubmit}
                >
                  {loading ? t('getstarted.submitting') : t('getstarted.submit')} <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          <p className="text-center text-sm text-muted-foreground">
            {t('getstarted.already_account')}{" "}
            <button onClick={() => base44.auth.redirectToLogin('/dashboard')} className="text-primary underline underline-offset-2">
              {t('getstarted.sign_in')}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}