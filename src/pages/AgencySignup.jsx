import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { base44 } from "@/api/base44Client";
import DutyBoostLogo from "../components/DutyBoostLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, CreditCard, FileText, ClipboardList, ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import PurchaseOrderDoc from "../components/PurchaseOrderDoc";

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
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = BOOKING_ENGINES.filter(e => e.toLowerCase().includes(search.toLowerCase()));

  const handleSelect = (engine) => {
    onChange(engine);
    setSearch("");
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className={`flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm text-left ${
          value ? "text-foreground" : "text-muted-foreground"
        }`}
      >
        <span className="truncate">{value || "Select booking engine"}</span>
        <svg className="h-4 w-4 opacity-50 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      </button>
      {open && (
        <div className="absolute z-50 mt-1 w-full rounded-md border border-border bg-popover shadow-lg">
          <div className="p-2 border-b border-border">
            <input
              autoFocus
              className="w-full rounded-sm border border-input px-3 py-1.5 text-sm outline-none bg-transparent placeholder:text-muted-foreground"
              placeholder="Search booking engine"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="max-h-52 overflow-y-auto p-1">
            {filtered.length === 0 ? (
              <div className="px-3 py-2 text-sm text-muted-foreground">No results</div>
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

export default function AgencySignup() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const STEPS = [t('signup.agency.steps.0'), t('signup.agency.steps.1'), t('signup.agency.steps.2'), t('signup.agency.steps.3')];
  
  const [step, setStep] = useState(0);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [website, setWebsite] = useState("");
  const [kvk, setKvk] = useState("");
  const [vat, setVat] = useState("");
  const [bookingSystem, setBookingSystem] = useState("");
  const [bankAccountName, setBankAccountName] = useState("");
  const [bankIban, setBankIban] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [applicationId, setApplicationId] = useState(null);
  const [airports, setAirports] = useState([]);

  useEffect(() => {
    base44.entities.Airport.list().then(data => {
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

  const isStep0Valid = () => {
    return fullName && email && !isPersonalEmail(email) && company && website && kvk && vat && bookingSystem;
  };

  const handleStep0Submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const app = await base44.entities.SignupApplication.create({
        full_name: fullName,
        email,
        company,
        business_type: "Travel Agency",
        website,
        kvk,
        vat,
        booking_system: bookingSystem,
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

  const handleStep1Submit = async () => {
    setLoading(true);
    try {
      await base44.entities.SignupApplication.update(applicationId, {
        bank_account_name: bankAccountName,
        bank_iban: bankIban,
      });
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
          businessType: "Travel Agency",
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
      await base44.entities.SignupApplication.update(applicationId, { 
        terms_accepted: true,
        status: "invited"
      });
      
      // Trigger initial payout setup
      try {
        await base44.functions.invoke('setupAgencyPayout', {
          applicationId,
          bankAccountName,
          bankIban,
        });
      } catch {
        // Continue regardless of payout setup
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
          <Link to="/"><DutyBoostLogo height={150} /></Link>
        </nav>
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-md text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </div>
            <div className="space-y-2">
             <h1 className="text-3xl font-heading font-bold">{t('signup.agency.success_title')}</h1>
             <p className="text-muted-foreground">
               {t('signup.agency.success_desc')}
             </p>
            </div>
            <Link to="/agency-portal"><Button className="w-full">{t('signup.agency.success_button')}</Button></Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <nav className="border-b border-border px-6 h-16 flex items-center justify-between">
        <Link to="/get-started"><Button variant="outline" size="sm" className="gap-2"><ChevronLeft className="w-4 h-4" /> Back</Button></Link>
        <Link to="/"><DutyBoostLogo height={150} /></Link>
        <div className="w-24" />
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
                <h1 className="text-3xl font-heading font-bold">{t('signup.agency.step0_title')}</h1>
                <p className="text-muted-foreground text-sm">
                  {t('signup.agency.subtitle')}
                </p>
              </div>

              <form onSubmit={handleStep0Submit} className="space-y-4">
                <div className="space-y-1.5">
                  <Label>Full Name <span className="text-red-500">*</span></Label>
                  <Input required placeholder="Jane Smith" value={fullName} onChange={e => setFullName(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>Work Email <span className="text-red-500">*</span></Label>
                  <Input required type="email" placeholder="jane@company.com" value={email} onChange={e => setEmail(e.target.value)} />
                  {email && isPersonalEmail(email) ? (
                    <p className="text-xs text-red-500">DutyBoost only accepts work email addresses. Personal email providers (Gmail, Hotmail, etc.) are not allowed.</p>
                  ) : (
                    <p className="text-xs text-muted-foreground">DutyBoost only accepts work email addresses — no personal emails (Gmail, Hotmail, etc.).</p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label>Company Name <span className="text-red-500">*</span></Label>
                  <Input required placeholder="Your company" value={company} onChange={e => setCompany(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>Website <span className="text-red-500">*</span></Label>
                  <Input required placeholder="https://yourcompany.com" value={website} onChange={e => setWebsite(e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label>KVK <span className="text-red-500">*</span></Label>
                    <Input required placeholder="12345678" value={kvk} onChange={e => setKvk(e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <Label>VAT <span className="text-red-500">*</span></Label>
                    <Input required placeholder="NL123456789B01" value={vat} onChange={e => setVat(e.target.value)} />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label>Booking Engine <span className="text-red-500">*</span></Label>
                  <BookingSystemSelect value={bookingSystem} onChange={setBookingSystem} />
                </div>
                <Button type="submit" className="w-full gap-2 h-11 text-base" disabled={!isStep0Valid() || loading}>
                  {loading ? "Saving..." : "Continue"} <ArrowRight className="w-4 h-4" />
                </Button>
              </form>
            </>
          )}

          {/* Step 1: Bank Details */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mx-auto">
                  <CreditCard className="w-6 h-6 text-emerald-600" />
                </div>
                <h2 className="text-2xl font-heading font-bold">{t('signup.agency.step1_title')}</h2>
                <p className="text-sm text-muted-foreground">
                  {t('signup.agency.step1_desc')}
                </p>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-sm text-emerald-800">
                <strong>How it works:</strong> {t('signup.agency.step1_info')}
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label>Account Holder Name <span className="text-red-500">*</span></Label>
                  <Input required placeholder="e.g. Sunweb Group B.V." value={bankAccountName} onChange={e => setBankAccountName(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>IBAN <span className="text-red-500">*</span></Label>
                  <Input required placeholder="e.g. NL91ABNA0417164300" value={bankIban} onChange={e => setBankIban(e.target.value.toUpperCase())} />
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="gap-2" onClick={() => setStep(0)}>
                  <ArrowLeft className="w-4 h-4" /> Back
                </Button>
                <Button className="flex-1 gap-2 h-11" disabled={!bankAccountName || !bankIban || loading} onClick={handleStep1Submit}>
                  {loading ? "Saving..." : "Continue"} <ArrowRight className="w-4 h-4" />
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
                <h2 className="text-2xl font-heading font-bold">{t('signup.agency.step2_title')}</h2>
                <p className="text-sm text-muted-foreground">{t('signup.agency.step2_desc')} <strong>{email}</strong>.</p>
              </div>

              <PurchaseOrderDoc
                businessType="Travel Agency"
                formData={{ fullName, email, company, kvk, vat }}
                poNumber={poNumber}
              />

              <div className="flex gap-3">
                <Button variant="outline" className="gap-2" onClick={() => setStep(1)}>
                  <ArrowLeft className="w-4 h-4" /> Back
                </Button>
                <Button className="flex-1 gap-2 h-11" disabled={loading} onClick={handleStep2Submit}>
                  {loading ? "Sending..." : "Accept & Continue"} <ArrowRight className="w-4 h-4" />
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
                <h2 className="text-2xl font-heading font-bold">{t('signup.agency.step3_title')}</h2>
                <p className="text-sm text-muted-foreground">{t('signup.agency.step3_desc')}</p>
              </div>

              {/* Summary */}
              <div className="bg-card border border-border rounded-xl p-5 space-y-3 text-sm">
                <p className="font-semibold text-foreground">Application Summary</p>
                {[
                  { label: "Name", value: fullName },
                  { label: "Email", value: email },
                  { label: "Company", value: company },
                  { label: "Type", value: "Travel Agency" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between">
                    <span className="text-muted-foreground">{label}</span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>

              {/* Terms acceptance */}
              <div className="bg-card border border-border rounded-xl p-5 space-y-4">
                <p className="font-semibold text-sm">Terms & Conditions</p>
                <div className="h-36 overflow-y-auto text-xs text-muted-foreground space-y-2 pr-1 border border-border rounded-lg p-3 bg-muted/30">
                  <p><strong>DutyBoost Platform Agreement</strong></p>
                  <p>By joining DutyBoost, you agree to the following terms:</p>
                  <p><strong>1. Service Description.</strong> DutyBoost provides a travel retail conversion platform connecting travel agencies, airport retailers, and travelers through DutyCredit incentives.</p>
                  <p><strong>2. Commission & Fees.</strong> A commission is charged per confirmed DutyCredit redemption at participating airport retailers. The applicable rate is communicated in your onboarding documentation.</p>
                  <p><strong>3. Payment Mandate.</strong> By providing a payment method, you authorise DutyBoost B.V. to collect fees for confirmed redemptions via the selected payment method.</p>
                  <p><strong>4. Data Processing.</strong> Your business data is processed in accordance with our Privacy Policy and GDPR obligations. We act as a data processor for booking data provided by travel agencies.</p>
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
                    I agree to the DutyBoost Platform Agreement, Terms of Service, Privacy Policy, and Data Processing Agreement
                  </span>
                </label>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="gap-2" onClick={() => setStep(2)}>
                  <ArrowLeft className="w-4 h-4" /> Back
                </Button>
                <Button className="flex-1 gap-2 h-11" disabled={!termsAccepted || loading} onClick={handleFinalSubmit}>
                  {loading ? "Submitting..." : "Submit"} <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <button onClick={() => base44.auth.redirectToLogin('/agency-portal')} className="text-primary underline underline-offset-2">
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}