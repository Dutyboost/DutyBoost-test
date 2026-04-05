import { useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, ArrowLeft, Building2, CheckCircle2, FileText, ShieldCheck } from "lucide-react";
import DutyBoostLogo from "../components/DutyBoostLogo";

const STEPS = ["Company Info", "Travel Policy", "Terms & Submit"];

export default function BusinessTravelGetStarted() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Step 0 fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [website, setWebsite] = useState("");
  const [kvk, setKvk] = useState("");
  const [vat, setVat] = useState("");
  const [numTravelers, setNumTravelers] = useState("");

  // Step 1 fields
  const [dailyLimit, setDailyLimit] = useState("");
  const [perTransactionLimit, setPerTransactionLimit] = useState("");
  const [breakfastWindow, setBreakfastWindow] = useState("06:00-10:00");
  const [lunchWindow, setLunchWindow] = useState("11:00-14:00");
  const [dinnerWindow, setDinnerWindow] = useState("17:00-21:00");
  const [airportScope, setAirportScope] = useState("all");

  // Step 2 fields
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [applicationId, setApplicationId] = useState(null);

  const isStep0Valid = () => fullName && email && company && website && kvk && vat && numTravelers;
  const isStep1Valid = () => dailyLimit && perTransactionLimit;

  const handleStep0Submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const app = await base44.entities.SignupApplication.create({
        full_name: fullName,
        email,
        company,
        business_type: "Business Travel",
        website,
        kvk,
        vat,
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
      await base44.entities.CorporatePolicy.create({
        policy_name: `${company} Default Policy`,
        company_name: company,
        daily_limit: parseFloat(dailyLimit),
        per_transaction_limit: parseFloat(perTransactionLimit),
        allowed_categories: "F&B",
        breakfast_window: breakfastWindow,
        lunch_window: lunchWindow,
        dinner_window: dinnerWindow,
        status: "active",
      });
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
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <nav className="border-b border-border px-6 h-16 flex items-center">
          <Link to="/business-travel"><DutyBoostLogo height={130} /></Link>
        </nav>
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-md text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-heading font-bold">Application received!</h1>
              <p className="text-muted-foreground">
                We'll review your corporate travel programme within 1 business day and reach out to activate your account.
              </p>
            </div>
            <div className="bg-card border border-border rounded-2xl p-6 text-left space-y-4">
              <p className="font-semibold text-sm">What happens next?</p>
              <ol className="space-y-3">
                {[
                  "Our team reviews your application within 1 business day.",
                  "You receive an activation email with your platform access link.",
                  "Configure individual traveler credits and assign your corporate policy.",
                  "Travelers pay at whitelisted F&B outlets using their DutyCredit QR code.",
                ].map((text, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                    <span className="text-sm text-muted-foreground">{text}</span>
                  </li>
                ))}
              </ol>
            </div>
            <p className="text-sm text-muted-foreground">
              Questions? Email us at{" "}
              <a href="mailto:hello@dutyboost.com" className="text-primary underline underline-offset-2">hello@dutyboost.com</a>
            </p>
            <Link to="/business-travel">
              <Button variant="outline" className="w-full">Back to Business Travel</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <nav className="border-b border-border px-6 h-16 flex items-center justify-between">
        <Link to="/business-travel"><DutyBoostLogo height={130} /></Link>
        <p className="text-sm text-muted-foreground hidden sm:block">Business Travel Programme</p>
      </nav>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-lg space-y-8">

          {/* Step indicator */}
          <div className="flex items-center justify-center gap-0">
            {STEPS.map((label, i) => (
              <div key={i} className="flex items-center">
                <div className="flex flex-col items-center gap-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    i < step ? "bg-primary text-primary-foreground" :
                    i === step ? "bg-primary text-primary-foreground ring-4 ring-primary/20" :
                    "bg-muted text-muted-foreground"
                  }`}>
                    {i < step ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                  </div>
                  <span className={`text-xs font-medium ${i === step ? "text-primary" : "text-muted-foreground"}`}>{label}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`w-16 h-0.5 mb-4 mx-1 ${i < step ? "bg-primary" : "bg-border"}`} />
                )}
              </div>
            ))}
          </div>

          {/* Step 0: Company Info */}
          {step === 0 && (
            <>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto">
                  <Building2 className="w-6 h-6 text-primary" />
                </div>
                <h1 className="text-3xl font-heading font-bold">Get Started</h1>
                <p className="text-muted-foreground text-sm">
                  Register your company to give your travelers instant F&B DutyCredits at participating airport merchants.
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
                  <Label>Estimated Number of Traveling Employees per Year <span className="text-red-500">*</span></Label>
                  <Input required type="number" min="1" placeholder="e.g. 50" value={numTravelers} onChange={e => setNumTravelers(e.target.value)} />
                </div>

                <Button type="submit" className="w-full gap-2 h-11 text-base" disabled={!isStep0Valid() || loading}>
                  {loading ? "Saving..." : "Continue"} <ArrowRight className="w-4 h-4" />
                </Button>
              </form>
            </>
          )}

          {/* Step 1: Travel Policy */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto">
                  <ShieldCheck className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-heading font-bold">Define Your Travel Policy</h2>
                <p className="text-sm text-muted-foreground">
                  Set the spend rules that will be enforced automatically at every airport F&B merchant.
                </p>
              </div>

              <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 text-sm text-primary">
                All credits are restricted to <strong>F&B merchants only</strong>. Non-F&B transactions are blocked automatically.
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label>Daily Spend Limit (EUR) <span className="text-red-500">*</span></Label>
                    <Input required type="number" min="1" placeholder="e.g. 50" value={dailyLimit} onChange={e => setDailyLimit(e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Per Transaction Limit (EUR) <span className="text-red-500">*</span></Label>
                    <Input required type="number" min="1" placeholder="e.g. 25" value={perTransactionLimit} onChange={e => setPerTransactionLimit(e.target.value)} />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-medium">Meal Time Windows</Label>
                  <p className="text-xs text-muted-foreground -mt-2">Credits can only be spent during these windows. Leave as-is or adjust to your policy.</p>
                  <div className="space-y-2">
                    {[
                      { label: "Breakfast", value: breakfastWindow, onChange: setBreakfastWindow, placeholder: "06:00-10:00" },
                      { label: "Lunch", value: lunchWindow, onChange: setLunchWindow, placeholder: "11:00-14:00" },
                      { label: "Dinner", value: dinnerWindow, onChange: setDinnerWindow, placeholder: "17:00-21:00" },
                    ].map(({ label, value, onChange, placeholder }) => (
                      <div key={label} className="flex items-center gap-3">
                        <span className="text-sm text-muted-foreground w-20">{label}</span>
                        <Input placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)} className="flex-1" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label>Airport Scope</Label>
                  <Select value={airportScope} onValueChange={setAirportScope}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All participating airports</SelectItem>
                      <SelectItem value="departure">Departure airport only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="gap-2" onClick={() => setStep(0)}>
                  <ArrowLeft className="w-4 h-4" /> Back
                </Button>
                <Button className="flex-1 gap-2 h-11" disabled={!isStep1Valid() || loading} onClick={handleStep1Submit}>
                  {loading ? "Saving..." : "Continue"} <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Terms & Submit */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-heading font-bold">Review & Accept</h2>
                <p className="text-sm text-muted-foreground">Almost there! Review your setup and accept our terms.</p>
              </div>

              {/* Summary */}
              <div className="bg-card border border-border rounded-xl p-5 space-y-3 text-sm">
                <p className="font-semibold">Your programme summary</p>
                {[
                  { label: "Name", value: fullName },
                  { label: "Email", value: email },
                  { label: "Company", value: company },
                  { label: "Type", value: "Business Travel — F&B DutyCredits" },

                  { label: "Daily limit", value: `€${dailyLimit}` },
                  { label: "Per transaction limit", value: `€${perTransactionLimit}` },
                  { label: "Airport scope", value: airportScope === "all" ? "All participating airports" : "Departure airport only" },
                ].map(({ label, value }) => value && (
                  <div key={label} className="flex justify-between">
                    <span className="text-muted-foreground">{label}</span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>

              {/* Terms */}
              <div className="bg-card border border-border rounded-xl p-5 space-y-4">
                <p className="font-semibold text-sm">Terms & Conditions</p>
                <div className="h-36 overflow-y-auto text-xs text-muted-foreground space-y-2 pr-1 border border-border rounded-lg p-3 bg-muted/30">
                  <p><strong>DutyBoost Business Travel Agreement</strong></p>
                  <p>By registering your corporate travel programme, you agree to the following terms:</p>
                  <p><strong>1. Service Description.</strong> DutyBoost provides F&B-restricted DutyCredits for business travelers, enforced in real time at participating airport F&B merchants.</p>
                  <p><strong>2. Policy Enforcement.</strong> All transactions are validated against your defined corporate policy. DutyBoost enforces daily limits, per-transaction caps, meal-time windows, and merchant category restrictions automatically.</p>
                  <p><strong>3. Service Model.</strong> DutyBoost connects enrolled business travelers with participating airport F&B merchants. The service is provided at no cost to the company. Participating merchants pay a commission on sales generated through the platform.</p>
                  <p><strong>4. F&B Restriction.</strong> Credits issued under the Business Travel programme are strictly restricted to Food & Beverage merchants. Attempts to use credits at non-F&B merchants will be rejected.</p>
                  <p><strong>4. Audit & Reporting.</strong> All transaction data is stored and available for export. You are responsible for maintaining accurate traveler assignments and credit issuances.</p>
                  <p><strong>5. Data Processing.</strong> Traveler and transaction data is processed in accordance with our Privacy Policy and GDPR obligations.</p>
                  <p><strong>6. Acceptable Use.</strong> You agree not to misuse DutyCredits or attempt to circumvent policy controls.</p>
                  <p><strong>7. Termination.</strong> Either party may terminate this agreement with 30 days written notice.</p>
                  <p><strong>8. Governing Law.</strong> This agreement is governed by Dutch law. Disputes shall be submitted to the competent courts of Amsterdam, the Netherlands.</p>
                  <p>For full terms, see our <a href="/terms" target="_blank" className="text-primary underline">Terms of Service</a> and <a href="/privacy" target="_blank" className="text-primary underline">Privacy Policy</a>.</p>
                </div>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={e => setTermsAccepted(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-input accent-primary cursor-pointer"
                  />
                  <span className="text-sm text-foreground leading-relaxed">
                    I have read and agree to the <a href="/terms" target="_blank" className="text-primary underline underline-offset-2">Terms of Service</a> and <a href="/privacy" target="_blank" className="text-primary underline underline-offset-2">Privacy Policy</a> of DutyBoost B.V. for the Business Travel programme.
                  </span>
                </label>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="gap-2" onClick={() => setStep(1)}>
                  <ArrowLeft className="w-4 h-4" /> Back
                </Button>
                <Button className="flex-1 gap-2 h-11" disabled={!termsAccepted || loading} onClick={handleFinalSubmit}>
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