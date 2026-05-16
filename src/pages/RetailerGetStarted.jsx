import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { base44 } from "@/api/base44Client";
import DutyBoostLogo from "../components/DutyBoostLogo";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, ArrowLeft, CheckCircle2, ChevronLeft, ShoppingBag, BarChart3, QrCode } from "lucide-react";
import KvkValidator from "../components/KvkValidator";
import PageFooter from "../components/PageFooter";

const PERSONAL_DOMAINS = ['gmail.com','yahoo.com','hotmail.com','outlook.com','icloud.com','live.com','aol.com','protonmail.com','mail.com','gmx.com','ymail.com','msn.com'];
const isPersonalEmail = (e) => PERSONAL_DOMAINS.some(d => e.toLowerCase().endsWith('@' + d));

const FALLBACK_AIRPORTS = [
  { code: 'LHR', name: 'London Heathrow', city: 'London' },
  { code: 'CDG', name: 'Paris Charles de Gaulle', city: 'Paris' },
  { code: 'AMS', name: 'Amsterdam Schiphol', city: 'Amsterdam' },
  { code: 'FRA', name: 'Frankfurt am Main', city: 'Frankfurt' },
  { code: 'MAD', name: 'Madrid Barajas', city: 'Madrid' },
  { code: 'BCN', name: 'Barcelona El Prat', city: 'Barcelona' },
  { code: 'FCO', name: 'Rome Fiumicino', city: 'Rome' },
  { code: 'MXP', name: 'Milan Malpensa', city: 'Milan' },
  { code: 'ZRH', name: 'Zurich Airport', city: 'Zurich' },
  { code: 'CPH', name: 'Copenhagen Airport', city: 'Copenhagen' },
  { code: 'MUC', name: 'Munich Airport', city: 'Munich' },
  { code: 'VIE', name: 'Vienna International', city: 'Vienna' },
  { code: 'BRU', name: 'Brussels Zaventem', city: 'Brussels' },
  { code: 'DUB', name: 'Dublin Airport', city: 'Dublin' },
  { code: 'PRG', name: 'Prague Václav Havel', city: 'Prague' },
];

const benefits = [
  { icon: ShoppingBag, title: "Pre-qualified buyers", desc: "Every QR holder is a real traveler at your airport with credit to spend." },
  { icon: QrCode, title: "Instant QR redemption", desc: "Scan at checkout in seconds — no POS integration required to get started." },
  { icon: BarChart3, title: "Real-time dashboard", desc: "Track every redemption, basket value, and monthly invoice in one place." },
];

// Simulated dashboard screenshot UI
function DashboardPreview() {
  return (
    <div className="w-full rounded-xl overflow-hidden border border-white/20 shadow-2xl bg-slate-900 text-white text-xs">
      {/* Top bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 border-b border-white/10">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/70" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <div className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
        <span className="text-slate-400 text-xs ml-2">DutyBoost — Retailer Dashboard</span>
      </div>
      {/* Stats row */}
      <div className="grid grid-cols-3 gap-px bg-white/5 border-b border-white/10">
        {[
          { label: "This Month", value: "€4,820", sub: "gross sales" },
          { label: "Redemptions", value: "37", sub: "vouchers scanned" },
          { label: "Avg. Basket", value: "€130", sub: "per redemption" },
        ].map(s => (
          <div key={s.label} className="bg-slate-900 px-4 py-3">
            <p className="text-slate-400 text-[10px] uppercase tracking-wide">{s.label}</p>
            <p className="text-white font-bold text-lg leading-tight">{s.value}</p>
            <p className="text-slate-500 text-[10px]">{s.sub}</p>
          </div>
        ))}
      </div>
      {/* Mini chart bars */}
      <div className="px-4 py-3 border-b border-white/10">
        <p className="text-slate-400 text-[10px] mb-2 uppercase tracking-wide">Weekly Redemptions</p>
        <div className="flex items-end gap-1 h-10">
          {[3, 5, 2, 7, 4, 8, 6].map((v, i) => (
            <div key={i} className="flex-1 rounded-sm bg-orange-500/70" style={{ height: `${(v / 8) * 100}%` }} />
          ))}
        </div>
        <div className="flex justify-between text-[9px] text-slate-500 mt-1">
          {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(d => <span key={d}>{d}</span>)}
        </div>
      </div>
      {/* Recent scans */}
      <div className="px-4 py-3">
        <p className="text-slate-400 text-[10px] mb-2 uppercase tracking-wide">Recent Scans</p>
        <div className="space-y-1.5">
          {[
            { code: "DC-A4F2", airport: "AMS", value: "€130", discount: "€30", time: "2m ago" },
            { code: "DC-B7C1", airport: "AMS", value: "€95", discount: "€10", time: "18m ago" },
            { code: "DC-E3K9", airport: "AMS", value: "€220", discount: "€45", time: "1h ago" },
          ].map(r => (
            <div key={r.code} className="flex items-center justify-between bg-slate-800/60 rounded px-3 py-1.5">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                <span className="font-mono text-slate-300">{r.code}</span>
                <span className="text-slate-500">{r.airport}</span>
              </div>
              <div className="flex items-center gap-3 text-right">
                <span className="text-slate-400">-{r.discount}</span>
                <span className="text-white font-semibold">{r.value}</span>
                <span className="text-slate-500">{r.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function RetailerGetStarted() {
  const { t } = useTranslation();
  const STEPS = ["Store Info", "Invoice Details"];
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

  useEffect(() => {
    base44.entities.Airport.list()
      .then(data => {
        if (!data || data.length === 0) { setAirports(FALLBACK_AIRPORTS); return; }
        const seen = new Set();
        const unique = data.filter(a => { if (seen.has(a.code)) return false; seen.add(a.code); return true; });
        unique.sort((a, b) => a.name.localeCompare(b.name));
        setAirports(unique);
      })
      .catch(() => setAirports(FALLBACK_AIRPORTS));
  }, []);

  const isStep0Valid = () => fullName && email && !isPersonalEmail(email) && company && website && kvk && vat && airport && storeCategory && kvkValidated;
  const isStep1Valid = () => invoiceEmail.trim().length > 0;

  const handleStep0Submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const app = await base44.entities.SignupApplication.create({
        full_name: fullName, email, company, business_type: "Airport Retailer",
        website, kvk, vat, airport, store_category: storeCategory, status: "pending", terms_accepted: false,
      });
      setApplicationId(app.id);
      setStep(1);
    } finally { setLoading(false); }
  };

  const handleStep1Submit = async () => {
    if (!isStep1Valid()) return;
    setLoading(true);
    try {
      await base44.entities.SignupApplication.update(applicationId, { bank_account_name: invoiceEmail, status: 'pending' });
      setSubmitted(true);
    } finally { setLoading(false); }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <nav className="border-b border-border px-6 h-16 flex items-center"><Link to="/"><DutyBoostLogo height={130} /></Link></nav>
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-md text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-heading font-bold">Welcome to DutyBoost!</h1>
              <p className="text-muted-foreground">Your retailer account application has been received. Our team will review it and contact you shortly.</p>
            </div>
            <Link to="/retailer-portal"><Button className="w-full">Go to Retailer Portal</Button></Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Nav */}
      <nav className="border-b border-border px-6 h-16 flex items-center justify-between">
        <Link to="/get-started"><Button variant="outline" size="sm" className="gap-2"><ChevronLeft className="w-4 h-4" /> Back</Button></Link>
        <Link to="/"><DutyBoostLogo height={130} /></Link>
        <LanguageSwitcher />
      </nav>

      <div className="flex-1 grid lg:grid-cols-2">
        {/* Left: value prop + dashboard preview */}
        <div className="hidden lg:flex flex-col justify-center px-10 py-12 bg-gradient-to-br from-orange-500 to-orange-600 text-white overflow-hidden">
          <div className="max-w-sm space-y-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-orange-200">Airport Retailer Programme</span>
              <h2 className="mt-3 text-3xl font-heading font-bold leading-snug">Turn passing travelers into paying customers</h2>
              <p className="mt-3 text-orange-100 text-sm leading-relaxed">You only pay 2.5% (max €25) when we deliver a confirmed sale. No setup fees, no subscription, no risk.</p>
            </div>
            <div className="space-y-4">
              {benefits.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex gap-4 items-start">
                  <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{title}</p>
                    <p className="text-orange-100 text-xs mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* Dashboard preview */}
            <DashboardPreview />
          </div>
        </div>

        {/* Right: form */}
        <div className="flex items-center justify-center px-6 py-12">
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
                  {i < STEPS.length - 1 && <div className={`w-16 h-0.5 mb-4 mx-1 ${i < step ? 'bg-primary' : 'bg-border'}`} />}
                </div>
              ))}
            </div>

            {/* Step 0 */}
            {step === 0 && (
              <>
                <div className="text-center space-y-2">
                  <h1 className="text-3xl font-heading font-bold">Create Your Retailer Account</h1>
                  <p className="text-muted-foreground text-sm">Fill in your store information to get started</p>
                </div>
                <form onSubmit={handleStep0Submit} className="space-y-4">
                  <div className="space-y-1.5">
                    <Label>Full Name <span className="text-red-500">*</span></Label>
                    <Input required placeholder="John Smith" value={fullName} onChange={e => setFullName(e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Work Email <span className="text-red-500">*</span></Label>
                    <Input required type="email" placeholder="john@store.com" value={email} onChange={e => setEmail(e.target.value)} />
                    {email && isPersonalEmail(email) && <p className="text-xs text-red-500">Please use a business email</p>}
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
                          <SelectItem key={a.code} value={a.code}>{a.code} — {a.name} ({a.city})</SelectItem>
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
                        <SelectItem value="Food & Beverage">Food & Beverage</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <KvkValidator kvk={kvk} vat={vat} company={company} onValidated={({ valid }) => setKvkValidated(valid)} />
                  <Button type="submit" className="w-full gap-2 h-11 text-base" disabled={!isStep0Valid() || loading}>
                    {loading ? "Saving..." : "Continue"} <ArrowRight className="w-4 h-4" />
                  </Button>
                </form>
              </>
            )}

            {/* Step 1 */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <h2 className="text-2xl font-heading font-bold">Invoice Details</h2>
                  <p className="text-sm text-muted-foreground">Where should we send your monthly invoice?</p>
                </div>
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-sm text-orange-800">
                  <strong>Monthly billing:</strong> You'll receive an invoice on the 1st of each month for platform fees based on DutyCredit redemptions at your store.
                </div>
                <div className="space-y-1.5">
                  <Label>Invoice Email <span className="text-red-500">*</span></Label>
                  <Input type="email" placeholder="invoices@yourstore.com" value={invoiceEmail} onChange={e => setInvoiceEmail(e.target.value)} />
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" className="gap-2" onClick={() => setStep(0)}>
                    <ArrowLeft className="w-4 h-4" /> Back
                  </Button>
                  <Button className="flex-1 gap-2 h-11" disabled={!isStep1Valid() || loading} onClick={handleStep1Submit}>
                    {loading ? "Submitting..." : "Submit Application"} <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <button onClick={() => base44.auth.redirectToLogin('/retailer-portal')} className="text-primary underline underline-offset-2">Sign in</button>
            </p>
          </div>
        </div>
      </div>
      <PageFooter />
    </div>
  );
}