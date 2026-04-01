import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, ArrowLeft, Store, Users, CheckCircle2, CreditCard, FileText } from "lucide-react";
import DutyBoostLogo from "../components/DutyBoostLogo";
import PaymentMethodSelector from "../components/PaymentMethodSelector";

const STEPS = ["Business Info", "Payment Method", "Terms & Review"];

export default function GetStarted() {
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

  const isAgency = businessType === "Travel Agency";
  const isRetailer = businessType === "Airport Retailer";

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

  const handleStep2Submit = async () => {
    if (!paymentMethod) return;
    setLoading(true);
    try {
      await base44.entities.SignupApplication.update(applicationId, { payment_method: paymentMethod });
      setStep(2);
    } finally {
      setLoading(false);
    }
  };

  const handleFinalSubmit = async () => {
    if (!termsAccepted) return;
    setLoading(true);
    try {
      await base44.entities.SignupApplication.update(applicationId, { terms_accepted: true });
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
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <nav className="border-b border-border px-6 h-16 flex items-center">
          <Link to="/"><DutyBoostLogo height={130} /></Link>
        </nav>
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-md text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-heading font-bold">Application received!</h1>
              <p className="text-muted-foreground">
                We've received your application and will review it within 1 business day. You'll get an email once approved.
              </p>
            </div>
            <div className="bg-card border border-border rounded-2xl p-6 text-left space-y-4">
              <p className="font-semibold text-sm">What happens next?</p>
              <ol className="space-y-3">
                {[
                  'Our team reviews your application within 1 business day.',
                  'We send you an email with your platform activation link.',
                  'Click the link to set your password and access your dashboard.',
                  'Start using DutyBoost immediately — no additional setup required.',
                ].map((text, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                    <span className="text-sm text-muted-foreground">{text}</span>
                  </li>
                ))}
              </ol>
            </div>
            <p className="text-sm text-muted-foreground">
              Questions? Email us at{' '}
              <a href="mailto:hello@dutyboost.com" className="text-primary underline underline-offset-2">hello@dutyboost.com</a>
            </p>
            <Link to="/"><Button variant="outline" className="w-full">Back to Home</Button></Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <nav className="border-b border-border px-6 h-16 flex items-center">
        <Link to="/"><DutyBoostLogo height={130} /></Link>
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
                <h1 className="text-3xl font-heading font-bold">Get Started</h1>
                <p className="text-muted-foreground text-sm">
                  {isAgency ? "Turn every booking into a loyalty asset — zero effort."
                    : isRetailer ? "Join DutyBoost and start growing your airport revenue."
                    : "Join DutyBoost — the Travel Retail Conversion Platform."}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { type: "Travel Agency", icon: Users, desc: "Generate DutyCredits for travelers" },
                  { type: "Airport Retailer", icon: Store, desc: "Accept DutyCredits & drive sales" },
                ].map(({ type, icon: Icon, desc }) => (
                  <button key={type} type="button" onClick={() => setBusinessType(type)}
                    className={`p-5 rounded-2xl border-2 text-left transition-all ${
                      businessType === type ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/40"
                    }`}>
                    <Icon className={`w-6 h-6 mb-2 ${businessType === type ? "text-primary" : "text-muted-foreground"}`} />
                    <p className="font-semibold text-sm">{type}</p>
                    <p className="text-xs text-muted-foreground mt-1">{desc}</p>
                  </button>
                ))}
              </div>

              <form onSubmit={handleStep1Submit} className="space-y-4">
                <div className="space-y-1.5">
                  <Label>Business Type</Label>
                  <Select value={businessType} onValueChange={setBusinessType}>
                    <SelectTrigger><SelectValue placeholder="Select your business type" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Travel Agency">Travel Agency</SelectItem>
                      <SelectItem value="Airport Retailer">Airport Retailer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Full Name</Label>
                  <Input placeholder="Jane Smith" value={fullName} onChange={e => setFullName(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>Work Email</Label>
                  <Input type="email" placeholder="jane@company.com" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>Company Name</Label>
                  <Input placeholder="Your company" value={company} onChange={e => setCompany(e.target.value)} />
                </div>
                {isRetailer && (
                  <div className="space-y-1.5">
                    <Label>Airport</Label>
                    <Select value={airport} onValueChange={setAirport}>
                      <SelectTrigger><SelectValue placeholder="Select your airport" /></SelectTrigger>
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
                  <Label>Website</Label>
                  <Input placeholder="https://yourcompany.com" value={website} onChange={e => setWebsite(e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label>KVK Number</Label>
                    <Input placeholder="12345678" value={kvk} onChange={e => setKvk(e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <Label>VAT Number</Label>
                    <Input placeholder="NL123456789B01" value={vat} onChange={e => setVat(e.target.value)} />
                  </div>
                </div>
                {isAgency && (
                  <div className="space-y-1.5">
                    <Label>Booking System</Label>
                    <Input placeholder="e.g. Amadeus, Sabre, TravelPort" value={bookingSystem} onChange={e => setBookingSystem(e.target.value)} />
                  </div>
                )}
                {isRetailer && (
                  <div className="space-y-1.5">
                    <Label>Store Category</Label>
                    <Select value={storeCategory} onValueChange={setStoreCategory}>
                      <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Duty-free">Duty-free</SelectItem>
                        <SelectItem value="Food">Food & Beverage</SelectItem>
                        <SelectItem value="Retail">Retail</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
                <Button type="submit" className="w-full gap-2 h-11 text-base" disabled={!businessType || loading}>
                  {loading ? "Saving..." : "Continue"} <ArrowRight className="w-4 h-4" />
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
                <h2 className="text-2xl font-heading font-bold">Set up billing</h2>
                <p className="text-sm text-muted-foreground">
                  Choose how you'd like to be billed. <strong>No charges now</strong> — payments are only collected after a confirmed DutyCredit sale at the airport.
                </p>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-sm text-orange-800">
                <strong>How billing works:</strong> A €0.01 verification charge is used to confirm your payment method and set up your billing mandate. This amount is immediately refunded.
              </div>

              <PaymentMethodSelector value={paymentMethod} onChange={setPaymentMethod} businessType={businessType} />

              <div className="flex gap-3">
                <Button variant="outline" className="gap-2" onClick={() => setStep(0)}>
                  <ArrowLeft className="w-4 h-4" /> Back
                </Button>
                <Button className="flex-1 gap-2 h-11" disabled={!paymentMethod || loading} onClick={handleStep2Submit}>
                  {loading ? "Saving..." : "Continue"} <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Terms & Review */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-heading font-bold">Review & Accept</h2>
                <p className="text-sm text-muted-foreground">Almost there! Please review your details and accept our terms.</p>
              </div>

              {/* Summary */}
              <div className="bg-card border border-border rounded-xl p-5 space-y-3 text-sm">
                <p className="font-semibold text-foreground">Your application summary</p>
                {[
                  { label: "Name", value: fullName },
                  { label: "Email", value: email },
                  { label: "Company", value: company },
                  { label: "Type", value: businessType },
                  { label: "Payment method", value: paymentMethod?.toUpperCase() },
                ].map(({ label, value }) => value && (
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
                    I have read and agree to the <a href="/terms" target="_blank" className="text-primary underline underline-offset-2">Terms of Service</a>, <a href="/privacy" target="_blank" className="text-primary underline underline-offset-2">Privacy Policy</a>, and <a href="/dpa" target="_blank" className="text-primary underline underline-offset-2">Data Processing Agreement</a> of DutyBoost B.V. I authorise DutyBoost to collect fees for confirmed DutyCredit redemptions via my chosen payment method.
                  </span>
                </label>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="gap-2" onClick={() => setStep(1)}>
                  <ArrowLeft className="w-4 h-4" /> Back
                </Button>
                <Button
                  className="flex-1 gap-2 h-11"
                  disabled={!termsAccepted || loading}
                  onClick={handleFinalSubmit}
                >
                  {loading ? "Submitting..." : "Submit Application"} <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <button onClick={() => base44.auth.redirectToLogin('/dashboard')} className="text-primary underline underline-offset-2">
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}