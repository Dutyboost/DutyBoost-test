import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import DutyBoostLogo from "../components/DutyBoostLogo";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, FileText, ArrowLeft, ArrowRight, ChevronLeft } from "lucide-react";
import { toast } from "sonner";

export default function CarRentalSignup() {
  const navigate = useNavigate();
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

  const STEPS = ["Company Info", "Terms & Review"];
  const PERSONAL_DOMAINS = ['gmail.com','yahoo.com','hotmail.com','outlook.com'];
  const isPersonalEmail = (e) => PERSONAL_DOMAINS.some(d => e.toLowerCase().endsWith('@' + d));

  const isStep0Valid = () => {
    return fullName && email && !isPersonalEmail(email) && company && website && city && vehicles;
  };

  const handleStep0Submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const app = await base44.entities.SignupApplication.create({
        full_name: fullName,
        email,
        company,
        business_type: "Car Rental Partner",
        website,
        airport: city,
        kvk: vehicles,
        status: "pending",
        terms_accepted: false,
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
              <h1 className="text-3xl font-heading font-bold">Application Received!</h1>
              <p className="text-muted-foreground">
                We'll review your car rental partnership application and contact you shortly.
              </p>
            </div>
            <Link to="/car-rental-portal"><Button className="w-full">Go to Car Rental Portal</Button></Link>
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
                <h1 className="text-3xl font-heading font-bold">Create Your Car Rental Account</h1>
                <p className="text-muted-foreground text-sm">Fill in your company information to get started</p>
              </div>

              <form onSubmit={handleStep0Submit} className="space-y-4">
                <div className="space-y-1.5">
                  <Label>Full Name <span className="text-red-500">*</span></Label>
                  <Input required placeholder="Jane Doe" value={fullName} onChange={e => setFullName(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>Work Email <span className="text-red-500">*</span></Label>
                  <Input required type="email" placeholder="jane@carrental.com" value={email} onChange={e => setEmail(e.target.value)} />
                  {email && isPersonalEmail(email) && <p className="text-xs text-red-500">Please use a business email</p>}
                </div>
                <div className="space-y-1.5">
                  <Label>Company Name <span className="text-red-500">*</span></Label>
                  <Input required placeholder="Your car rental company" value={company} onChange={e => setCompany(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>Website <span className="text-red-500">*</span></Label>
                  <Input required placeholder="https://yourcompany.com" value={website} onChange={e => setWebsite(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>City <span className="text-red-500">*</span></Label>
                  <Input required placeholder="Amsterdam" value={city} onChange={e => setCity(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>Number of Vehicles <span className="text-red-500">*</span></Label>
                  <Input required type="number" placeholder="100" value={vehicles} onChange={e => setVehicles(e.target.value)} />
                </div>

                <Button type="submit" className="w-full gap-2 h-11 text-base" disabled={!isStep0Valid() || loading}>
                  {loading ? "Saving..." : "Continue"} <ArrowRight className="w-4 h-4" />
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
                <h2 className="text-2xl font-heading font-bold">Review & Accept</h2>
                <p className="text-sm text-muted-foreground">Agree to our terms to complete your signup</p>
              </div>

              <div className="bg-card border border-border rounded-xl p-5 space-y-3 text-sm">
                <p className="font-semibold">Your company summary</p>
                {[
                  { label: "Name", value: fullName },
                  { label: "Email", value: email },
                  { label: "Company", value: company },
                  { label: "City", value: city },
                  { label: "Vehicles", value: vehicles },
                ].map(({ label, value }) => value && (
                  <div key={label} className="flex justify-between">
                    <span className="text-muted-foreground">{label}</span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>

              <div className="bg-card border border-border rounded-xl p-5 space-y-4">
                <p className="font-semibold text-sm">Terms & Conditions</p>
                <div className="h-36 overflow-y-auto text-xs text-muted-foreground space-y-2 pr-1 border border-border rounded-lg p-3 bg-muted/30">
                  <p><strong>DutyBoost Car Rental Partnership Agreement</strong></p>
                  <p>By registering your car rental company, you agree to the DutyBoost terms of service. Your customers can earn DutyCredits through rentals, redeemable at participating airport retailers.</p>
                  <p>For full terms, see our <Link to="/terms" target="_blank" className="text-primary underline">Terms of Service</Link> and <Link to="/privacy" target="_blank" className="text-primary underline">Privacy Policy</Link>.</p>
                </div>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={e => setTermsAccepted(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-input accent-primary cursor-pointer"
                  />
                  <span className="text-sm text-foreground leading-relaxed">
                    I have read and agree to the Terms of Service and Privacy Policy
                  </span>
                </label>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="gap-2" onClick={() => setStep(0)}>
                  <ArrowLeft className="w-4 h-4" /> Back
                </Button>
                <Button className="gap-2 h-11" disabled={!termsAccepted || loading} onClick={handleFinalSubmit}>
                  {loading ? "Submitting..." : "Submit"} <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}