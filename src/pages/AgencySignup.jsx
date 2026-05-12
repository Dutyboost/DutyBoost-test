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
import { ChevronLeft, CreditCard, ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import KvkValidator from "../components/KvkValidator";

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
  const STEPS = [t('signup.agency.steps.0'), t('signup.agency.steps.1')];
  
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
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [applicationId, setApplicationId] = useState(null);
  const [airports, setAirports] = useState([]);
  const [kvkValidated, setKvkValidated] = useState(false);

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
    return fullName && email && !isPersonalEmail(email) && company && website && kvk && vat && bookingSystem && kvkValidated;
  };

  const handleStep0Submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const app = await base44.entities.SignupApplication.create({
        full_name: fullName,
        email,
        company,
        business_type: "Travel Partner",
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

  const handleStep1Submit = async () => {
    setLoading(true);
    try {
      await base44.functions.invoke('createSignupApplicationEncrypted', {
        id: applicationId,
        bank_account_name: bankAccountName,
        bank_iban: bankIban,
      });
      await base44.entities.SignupApplication.update(applicationId, {
        terms_accepted: true,
        bank_account_name: bankAccountName,
        bank_iban: bankIban,
      });
      try {
        await base44.functions.invoke('setupAgencyPayout', { applicationId, bankAccountName, bankIban });
      } catch { /* continue */ }
      setSubmitted(true);
    } catch (err) {
      toast.error('Error saving bank details: ' + (err.message || 'Unknown error'));
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
            <Link to="/travel-partner-portal"><Button className="w-full">{t('signup.agency.success_button')}</Button></Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <nav className="border-b border-border px-6 h-16 flex items-center justify-between">
        <Link to="/travel-partner-portal"><Button variant="outline" size="sm" className="gap-2"><ChevronLeft className="w-4 h-4" /> {t('common.back')}</Button></Link>
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
                   {email && isPersonalEmail(email) && (
                     <p className="text-xs text-red-500">Please use a business email</p>
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
                     <Label>KVK Number <span className="text-red-500">*</span></Label>
                     <Input required placeholder="12345678" value={kvk} onChange={e => setKvk(e.target.value)} />
                   </div>
                   <div className="space-y-1.5">
                     <Label>VAT Number <span className="text-red-500">*</span></Label>
                     <Input required placeholder="NL123456789B01" value={vat} onChange={e => setVat(e.target.value)} />
                   </div>
                 </div>
                 <div className="space-y-1.5">
                   <Label>Booking Engine <span className="text-red-500">*</span></Label>
                  <BookingSystemSelect value={bookingSystem} onChange={setBookingSystem} />
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
                  <Label>{t('getstarted.account_holder')} <span className="text-red-500">*</span></Label>
                  <Input required placeholder="e.g. Sunweb Group B.V." value={bankAccountName} onChange={e => setBankAccountName(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>{t('getstarted.iban')} <span className="text-red-500">*</span></Label>
                  <Input required placeholder="e.g. NL91ABNA0417164300" value={bankIban} onChange={e => setBankIban(e.target.value.toUpperCase())} />
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="gap-2" onClick={() => setStep(0)}>
                  <ArrowLeft className="w-4 h-4" /> {t('getstarted.back')}
                </Button>
                <Button className="gap-2 h-11" disabled={!bankAccountName || !bankIban || loading} onClick={handleStep1Submit}>
                  {loading ? t('getstarted.saving') : t('getstarted.submit')} <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}



          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <button onClick={() => base44.auth.redirectToLogin('/travel-partner-portal')} className="text-primary underline underline-offset-2">
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}