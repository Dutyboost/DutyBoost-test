import { useState } from "react";
import { base44 } from "@/api/base44Client";
import DutyBoostLogo from "../components/DutyBoostLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, ArrowRight, Sparkles } from "lucide-react";

const TOTAL_QUESTIONS = 7;

const COMPANY_TYPES = ["Travel Agency", "Airline", "Tour Operator", "OTA (Online Travel Agency)", "Hotel", "Car Rental"];
const BOOKING_VOLUMES = ["Under 500", "500 – 2,000", "2,000 – 10,000", "10,000+"];
const LOYALTY_OPTIONS = ["None", "Points / Miles", "Discounts", "Partner perks", "Other"];
const INTEREST_OPTIONS = [
  "Very interested – count me in",
  "Interested – I want to learn more",
  "Curious – still evaluating",
  "Not sure yet",
];
const COMMISSION_OPTIONS = [
  "Yes, very attractive",
  "Somewhat attractive",
  "Need more details",
  "Not a priority right now",
];
const SNIPPET_OPTIONS = [
  "Yes – adding something to our confirmation page is very doable",
  "Possibly – depends on how easy it is",
  "Unlikely – our tech setup makes this hard",
  "No – we don't control that page",
];

function OptionButton({ label, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
        selected
          ? "bg-primary text-primary-foreground border-primary shadow-md"
          : "bg-card border-border hover:border-primary/50 hover:bg-primary/5 text-foreground"
      }`}
    >
      {label}
    </button>
  );
}

export default function TravelPartnerSurvey() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [websiteError, setWebsiteError] = useState("");

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    company_name: "",
    company_type: "",
    annual_bookings: "",
    current_loyalty: "",
    biggest_challenge: "",
    interest_level: "",
    commission_attractive: "",
    snippet_willingness: "",
    wants_demo: false,
    phone: "",
    loyalty_other: "",
  });

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const isValidWebsite = (val) => {
    const trimmed = val.trim();
    if (!trimmed) return false;
    try {
      const url = trimmed.startsWith("http") ? trimmed : "https://" + trimmed;
      const parsed = new URL(url);
      return /^[a-z0-9.-]+\.[a-z]{2,}$/i.test(parsed.hostname) && parsed.hostname.includes(".");
    } catch {
      return false;
    }
  };

  const goToStep = (n) => {
    setStep(n);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const canNext = () => {
    if (step === 0) return form.company_type !== "";
    if (step === 1) return form.annual_bookings !== "";
    if (step === 2) return form.current_loyalty !== "";
    if (step === 3) return form.interest_level !== "";
    if (step === 4) return form.commission_attractive !== "";
    if (step === 5) return form.snippet_willingness !== "";
    if (step === 6) return isValidWebsite(form.company_name);
    return true;
  };

  const handleSubmit = async () => {
    setSaving(true);
    await base44.entities.SurveyResponse.create(form);
    setSubmitted(true);
    setSaving(false);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 text-center space-y-6">
        <CheckCircle2 className="w-16 h-16 text-green-500" />
        <h1 className="text-3xl font-heading font-bold">Thank you{form.full_name ? `, ${form.full_name.split(" ")[0]}` : ""}!</h1>
        <p className="text-muted-foreground max-w-md leading-relaxed">
          Your input means a lot. {form.wants_demo ? "We'll be in touch soon." : "We'll keep you posted on what's next."}
        </p>
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} DutyBoost. All Rights Reserved.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-body flex flex-col">
      <nav className="sticky top-0 z-50 backdrop-blur border-b border-border bg-background/80">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center">
          <DutyBoostLogo height={160} />
        </div>
      </nav>

      {step === 0 && (
        <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/5 border-b border-border">
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-4xl mx-auto px-4 py-14 sm:py-20 relative">
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
              <Sparkles className="w-3 h-3" /> For Travel Partners Only
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold tracking-tight leading-tight max-w-3xl">
              There's a new revenue stream available for the travel sector.{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Is it right for you?
              </span>
            </h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-2xl leading-relaxed">
              DutyBoost is building something new for the travel industry. We're not ready to share details yet — but we want to know if there's interest before we go further.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">2 minutes · 7 questions · No strings attached.</p>
          </div>
        </div>
      )}

      <div className="flex-1 flex items-start justify-center px-4 py-10">
        <div className="w-full max-w-xl space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Question {step + 1} of {TOTAL_QUESTIONS}</span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${((step + 1) / TOTAL_QUESTIONS) * 100}%` }}
              />
            </div>
          </div>

          {step === 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-heading font-bold">What type of travel company are you?</h2>
              <div className="space-y-2">
                {COMPANY_TYPES.map((t) => (
                  <OptionButton key={t} label={t} selected={form.company_type === t} onClick={() => set("company_type", t)} />
                ))}
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-heading font-bold">How many bookings do you process per month?</h2>
              <div className="space-y-2">
                {BOOKING_VOLUMES.map((v) => (
                  <OptionButton key={v} label={v} selected={form.annual_bookings === v} onClick={() => set("annual_bookings", v)} />
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-heading font-bold">Do you currently offer your travelers any loyalty perks or benefits?</h2>
              <div className="space-y-2">
                {LOYALTY_OPTIONS.map((o) => (
                  <OptionButton key={o} label={o} selected={form.current_loyalty === o} onClick={() => set("current_loyalty", o)} />
                ))}
              </div>
              {form.current_loyalty === "Other" && (
                <textarea
                  className="w-full rounded-xl border border-input bg-card px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/40"
                  rows={2}
                  placeholder="Briefly describe..."
                  value={form.loyalty_other || ""}
                  onChange={(e) => set("loyalty_other", e.target.value)}
                />
              )}
              <div className="space-y-2 pt-1">
                <label className="text-sm text-muted-foreground">What's your biggest challenge with traveler loyalty? (optional)</label>
                <textarea
                  className="w-full rounded-xl border border-input bg-card px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/40"
                  rows={2}
                  placeholder="Optional..."
                  value={form.biggest_challenge}
                  onChange={(e) => set("biggest_challenge", e.target.value)}
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-heading font-bold">If there were a simple, no-cost way to add a new revenue stream to your business, how interested would you be?</h2>
              <div className="space-y-2">
                {INTEREST_OPTIONS.map((o) => (
                  <OptionButton key={o} label={o} selected={form.interest_level === o} onClick={() => set("interest_level", o)} />
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-heading font-bold">How important is generating additional revenue from your existing bookings to your business?</h2>
              <div className="space-y-2">
                {COMMISSION_OPTIONS.map((o) => (
                  <OptionButton key={o} label={o} selected={form.commission_attractive === o} onClick={() => set("commission_attractive", o)} />
                ))}
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-heading font-bold">How open are you to small technical additions to your final booking confirmation step that will help unleash the new revenue stream?</h2>
              <div className="space-y-2">
                {SNIPPET_OPTIONS.map((o) => (
                  <OptionButton key={o} label={o} selected={form.snippet_willingness === o} onClick={() => set("snippet_willingness", o)} />
                ))}
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-heading font-bold">Last step — who are you?</h2>
              <p className="text-muted-foreground text-sm">We'll reach out when we're ready to share more. No spam, ever.</p>
              <div className="space-y-3">
                <Input placeholder="Full name" value={form.full_name} onChange={(e) => set("full_name", e.target.value)} />
                <Input placeholder="Work email" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} />
                <div>
                  <Input
                    placeholder="Company website * (e.g. www.yourcompany.com)"
                    value={form.company_name}
                    onChange={(e) => {
                      set("company_name", e.target.value);
                      setWebsiteError(e.target.value && !isValidWebsite(e.target.value) ? "Please enter a valid website URL (e.g. www.yourcompany.com)" : "");
                    }}
                    className={websiteError ? "border-destructive" : ""}
                  />
                  {websiteError && <p className="text-xs text-destructive mt-1">{websiteError}</p>}
                </div>
                <Input placeholder="Phone (optional)" value={form.phone} onChange={(e) => set("phone", e.target.value)} />
              </div>
              <label className="flex items-start gap-3 cursor-pointer group pt-2">
                <input
                  type="checkbox"
                  checked={form.wants_demo}
                  onChange={(e) => set("wants_demo", e.target.checked)}
                  className="mt-0.5 accent-primary w-4 h-4 cursor-pointer"
                />
                <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                  <strong>Yes, I'd like to be contacted</strong> when DutyBoost is ready to share details.
                </span>
              </label>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            {step > 0 && (
              <Button variant="outline" onClick={() => goToStep(step - 1)} className="flex-1">
                Back
              </Button>
            )}
            {step < TOTAL_QUESTIONS - 1 ? (
              <Button className="flex-1 gap-2" disabled={!canNext()} onClick={() => goToStep(step + 1)}>
                Continue <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button className="flex-1 gap-2" disabled={!canNext() || saving} onClick={handleSubmit}>
                {saving ? "Submitting..." : "Submit"} <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>

          <p className="text-center text-xs text-muted-foreground">No spam. No sales pitch.</p>
        </div>
      </div>

      <footer className="border-t border-border py-6 px-4">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <DutyBoostLogo height={130} />
          <p>© {new Date().getFullYear()} DutyBoost B.V.</p>
        </div>
      </footer>
    </div>
  );
}