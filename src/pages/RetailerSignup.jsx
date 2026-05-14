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
import { CheckCircle2, ArrowLeft, ArrowRight, ChevronLeft } from "lucide-react";
import { toast } from "sonner";
import KvkValidator from "../components/KvkValidator";

export default function RetailerSignup() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const STEPS = [t('signup.retailer.steps.0'), t('signup.retailer.steps.1')];
  
  const [step, setStep] = useState(0);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [website, setWebsite] = useState("");
  const [kvk, setKvk] = useState("");
  const [vat, setVat] = useState("");
  const [airport, setAirport] = useState("");
  const [storeCategory, setStoreCategory] = useState("");
  const [invoiceEmail, setInvoiceEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [applicationId, setApplicationId] = useState(null);
  const [airports, setAirports] = useState([]);
  const [kvkValidated, setKvkValidated] = useState(false);

  const FALLBACK_AIRPORTS = [
    { code: 'LHR', name: 'London Heathrow', city: 'London' },
    { code: 'CDG', name: 'Paris Charles de Gaulle', city: 'Paris' },
    { code: 'AMS', name: 'Amsterdam Schiphol', city: 'Amsterdam' },
    { code: 'FRA', name: 'Frankfurt am Main', city: 'Frankfurt' },
    { code: 'MAD', name: 'Madrid Barajas', city: 'Madrid' },
    { code: 'BCN', name: 'Barcelona El Prat', city: 'Barcelona' },
    { code: 'FCO', name: 'Rome Fiumicino', city: 'Rome' },
    { code: 'MXP', name: 'Milan Malpensa', city: 'Milan' },
    { code: 'ORY', name: 'Paris Orly', city: 'Paris' },
    { code: 'LGW', name: 'London Gatwick', city: 'London' },
    { code: 'DUB', name: 'Dublin Airport', city: 'Dublin' },
    { code: 'VCE', name: 'Venice Marco Polo', city: 'Venice' },
    { code: 'ZRH', name: 'Zurich Airport', city: 'Zurich' },
    { code: 'CPH', name: 'Copenhagen Airport', city: 'Copenhagen' },
    { code: 'MUC', name: 'Munich Airport', city: 'Munich' },
    { code: 'STR', name: 'Stuttgart Airport', city: 'Stuttgart' },
    { code: 'VIE', name: 'Vienna International', city: 'Vienna' },
    { code: 'DUS', name: 'Dusseldorf International', city: 'Dusseldorf' },
    { code: 'EDI', name: 'Edinburgh Airport', city: 'Edinburgh' },
    { code: 'AGP', name: 'Málaga Costa del Sol', city: 'Málaga' },
    { code: 'PMI', name: 'Palma de Mallorca', city: 'Palma' },
    { code: 'IBZ', name: 'Ibiza Airport', city: 'Ibiza' },
    { code: 'PRG', name: 'Prague Václav Havel', city: 'Prague' },
    { code: 'WAW', name: 'Warsaw Chopin', city: 'Warsaw' },
    { code: 'ARL', name: 'Athens Eleftherios Venizelos', city: 'Athens' },
    { code: 'BUD', name: 'Budapest Ferenc Liszt', city: 'Budapest' },
    { code: 'BRU', name: 'Brussels Zaventem', city: 'Brussels' },
    { code: 'BVA', name: 'Paris Beauvais', city: 'Paris' },
    { code: 'HAM', name: 'Hamburg Airport', city: 'Hamburg' },
    { code: 'HAJ', name: 'Hannover Airport', city: 'Hannover' },
    { code: 'SVQ', name: 'Seville Airport', city: 'Seville' },
    { code: 'BIO', name: 'Bilbao Airport', city: 'Bilbao' },
    { code: 'ADA', name: 'Istanbul Airport', city: 'Istanbul' },
    { code: 'TFS', name: 'Tenerife South', city: 'Tenerife' },
    { code: 'IBZ', name: 'Alicante Airport', city: 'Alicante' },
    { code: 'NIC', name: 'Nice Côte d\'Azur', city: 'Nice' },
    { code: 'BIO', name: 'Bilbao Airport', city: 'Bilbao' },
    { code: 'DTM', name: 'Dortmund Airport', city: 'Dortmund' },
    { code: 'BOD', name: 'Bordeaux-Mérignac', city: 'Bordeaux' },
    { code: 'LIL', name: 'Lille Airport', city: 'Lille' },
    { code: 'NCE', name: 'Nice Airport', city: 'Nice' },
    { code: 'TUN', name: 'Turin Airport', city: 'Turin' },
    { code: 'COL', name: 'Cologne Bonn', city: 'Cologne' },
    { code: 'BIQ', name: 'Biarritz-Pays-Basque', city: 'Biarritz' },
    { code: 'SKG', name: 'Thessaloniki Airport', city: 'Thessaloniki' },
    { code: 'PHE', name: 'Plovdiv Airport', city: 'Plovdiv' },
    { code: 'SOF', name: 'Sofia Airport', city: 'Sofia' },
    { code: 'OTP', name: 'Bucharest Otopeni', city: 'Bucharest' },
    { code: 'CLJ', name: 'Cluj-Napoca', city: 'Cluj-Napoca' },
    { code: 'TPS', name: 'Palermo Airport', city: 'Palermo' },
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



  const isStep1Valid = () => invoiceEmail.trim().length > 0;

  const handleStep1Submit = async () => {
    if (!isStep1Valid()) return;
    setLoading(true);
    try {
      await base44.entities.SignupApplication.update(applicationId, {
        bank_account_name: invoiceEmail,
        status: 'pending',
      });
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
        <Link to="/retailer-portal"><Button variant="outline" size="sm" className="gap-2"><ChevronLeft className="w-4 h-4" /> {t('common.back')}</Button></Link>
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
                   <Label>Full Name <span className="text-red-500">*</span></Label>
                   <Input required placeholder="John Smith" value={fullName} onChange={e => setFullName(e.target.value)} />
                 </div>
                 <div className="space-y-1.5">
                   <Label>Work Email <span className="text-red-500">*</span></Label>
                   <Input required type="email" placeholder="john@store.com" value={email} onChange={e => setEmail(e.target.value)} />
                   {email && isPersonalEmail(email) && (
                     <p className="text-xs text-red-500">Please use a business email</p>
                   )}
                 </div>
                 <div className="space-y-1.5">
                   <Label>Store Name <span className="text-red-500">*</span></Label>
                   <Input required placeholder="Your store" value={company} onChange={e => setCompany(e.target.value)} />
                 </div>
                 <div className="space-y-1.5">
                   <Label>Website <span className="text-red-500">*</span></Label>
                   <Input required placeholder="https://yourstore.com" value={website} onChange={e => setWebsite(e.target.value)} />
                 </div>
                 <div className="space-y-1.5">
                   <Label>Airport <span className="text-red-500">*</span></Label>
                   <Select value={airport} onValueChange={setAirport}>
                     <SelectTrigger><SelectValue placeholder="Select airport" /></SelectTrigger>
                     <SelectContent className="max-h-[300px]">
                       {airports.map(a => (
                         <SelectItem key={a.code} value={a.code}>
                           {a.code} — {a.name} ({a.city})
                         </SelectItem>
                       ))}
                     </SelectContent>
                   </Select>
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
                  <Label>Store Category <span className="text-red-500">*</span></Label>
                  <Select value={storeCategory} onValueChange={setStoreCategory}>
                    <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Retail">Retail</SelectItem>
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

          {/* Step 1: Invoice Email */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-heading font-bold">{t('signup.retailer.step1_title')}</h2>
                <p className="text-sm text-muted-foreground">{t('signup.retailer.step1_desc')}</p>
              </div>

              <div className="space-y-1.5">
                <Label>Invoice Email <span className="text-red-500">*</span></Label>
                <Input type="email" placeholder="invoices@yourstore.com" value={invoiceEmail} onChange={e => setInvoiceEmail(e.target.value)} />
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="gap-2" onClick={() => setStep(0)}>
                  <ArrowLeft className="w-4 h-4" /> {t('getstarted.back')}
                </Button>
                <Button className="gap-2 h-11" disabled={!isStep1Valid() || loading} onClick={handleStep1Submit}>
                  {loading ? t('getstarted.saving') : t('getstarted.submit')} <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <button onClick={() => base44.auth.redirectToLogin('/retailer-portal')} className="text-primary underline underline-offset-2">
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}