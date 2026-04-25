import { useState } from "react";
import { base44 } from "@/api/base44Client";
import DutyBoostLogo from "../components/DutyBoostLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, ArrowRight, Lightbulb, MessageSquare, FlaskConical, Zap } from "lucide-react";

const STEPS = [
  { id: "intro", label: "About You" },
  { id: "business", label: "Your Business" },
  { id: "loyalty", label: "Loyalty Today" },
  { id: "fit", label: "DutyBoost Fit" },
  { id: "contact", label: "Stay in Touch" },
];

const COMPANY_TYPES = ["Travel Agency", "Airline", "Tour Operator", "OTA (Online Travel Agency)", "Other"];
const BOOKING_VOLUMES = ["Under 1,000", "1,000 – 10,000", "10,000 – 100,000", "100,000+"];
const LOYALTY_OPTIONS = ["None", "Points / Miles", "Discounts", "Partner perks", "Other"];
const INTEREST_OPTIONS = [
  "Very interested – I'd join a pilot program",
  "Interested – I want to learn more first",
  "Curious – still evaluating the concept",
  "Not sure yet",
];
const COMMISSION_OPTIONS = [
  "Yes, very attractive",
  "Somewhat attractive",
  "Need more details",
  "Not a priority",
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
    wants_demo: false,
    phone: "",
  });

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const canNext = () => {
    if (step === 0) return form.company_type !== "";
    if (step === 1) return form.annual_bookings !== "";
    if (step === 2) return form.current_loyalty !== "";
    if (step === 3) return form.interest_level !== "" && form.commission_attractive !== "";
    if (step === 4) return form.full_name.trim() !== "" && form.email.includes("@") && form.company_name.trim() !== "";
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
        <h1 className="text-3xl font-heading font-bold">Thank you, {form.full_name.split(" ")[0]}!</h1>
        <p className="text-muted-foreground max-w-md leading-relaxed">
          Your honest input is exactly what we need to decide whether DutyBoost is worth building.
          {form.wants_demo && " We'll reach out soon to set up a short conversation."}
        </p>
        <div className="bg-amber-50 border border-amber-200 rounded-2xl px-6 py-5 max-w-sm text-left">
          <p className="text-sm font-semibold text-amber-800">What happens with your input?</p>
          <ul className="mt-3 space-y-2 text-sm text-amber-700 list-none">
            <li>📋 We aggregate responses from across the industry</li>
            <li>🔍 We analyse whether the model has real traction</li>
            <li>{form.wants_demo ? "📞 We'll reach out to schedule a conversation" : "📬 We'll update you on what we decide to do next"}</li>
          </ul>
        </div>
        <p className="text-xs text-muted-foreground max-w-xs">No product exists yet — if enough industry partners validate this concept, we'll move forward. You'll be among the first to know.</p>
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} DutyBoost B.V.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-body flex flex-col">
      {/* Nav */}
      <nav className="sticky top-0 z-50 backdrop-blur border-b border-border bg-background/80">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center">
          <DutyBoostLogo height={160} />
        </div>
      </nav>

      {/* Hero banner – only show on step 0 */}
      {step === 0 && (
        <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/5 border-b border-border">
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-4xl mx-auto px-4 py-14 sm:py-20 relative">
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
              <FlaskConical className="w-3 h-3" /> Model Validation · Travel Partners Only
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold tracking-tight leading-tight max-w-3xl">
              We're validating a new model —{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                and we need your honest input
              </span>
            </h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-2xl leading-relaxed">
              <strong>DutyBoost</strong> is a model we're validating that will automatically reward travelers with airport shopping credits — and will share revenue with the travel partners who booked their trip. We want to know if this is something the industry actually needs.
            </p>

            {/* Concept pillars */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: Lightbulb, label: "The model", desc: "Travelers get airport shopping credits when they book through a travel partner." },
                { icon: MessageSquare, label: "Your role", desc: "You tell us if this model makes sense for your business — no strings attached." },
                { icon: FlaskConical, label: "What we're validating", desc: "Whether a commission-per-redemption model is attractive enough to build around." },
              ].map(({ icon: Icon, label, desc }) => (
                <div key={label} className="bg-card border border-border rounded-xl p-4 space-y-2">
                  <Icon className="w-4 h-4 text-primary" />
                  <p className="text-sm font-semibold">{label}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>

            <p className="mt-8 text-sm font-semibold text-foreground flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-primary" />
              4 quick questions — your answers directly shape whether we build this.
            </p>
          </div>
        </div>
      )}

      {/* Survey card */}
      <div className="flex-1 flex items-start justify-center px-4 py-10">
        <div className="w-full max-w-xl space-y-6">
          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Step {step + 1} of {STEPS.length}</span>
              <span>{STEPS[step].label}</span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Step 0 – company type */}
          {step === 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-heading font-bold">What type of travel company are you?</h2>
              <p className="text-muted-foreground text-sm">This helps us understand which part of the industry this concept would serve best.</p>
              <div className="space-y-2">
                {COMPANY_TYPES.map((t) => (
                  <OptionButton key={t} label={t} selected={form.company_type === t} onClick={() => set("company_type", t)} />
                ))}
              </div>
            </div>
          )}

          {/* Step 1 – booking volume */}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-heading font-bold">How many bookings do you process per year?</h2>
              <p className="text-muted-foreground text-sm">Helps us understand whether this model could realistically create value at your scale.</p>
              <div className="space-y-2">
                {BOOKING_VOLUMES.map((v) => (
                  <OptionButton key={v} label={v} selected={form.annual_bookings === v} onClick={() => set("annual_bookings", v)} />
                ))}
              </div>
              {form.annual_bookings === "10,000 – 100,000" || form.annual_bookings === "100,000+" ? (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800 font-medium">
                  💡 At this scale, a commission-per-redemption model could be meaningful — we'd love to validate this assumption with you.
                </div>
              ) : null}
            </div>
          )}

          {/* Step 2 – current loyalty */}
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-heading font-bold">What's your current approach to traveler loyalty?</h2>
              <p className="text-muted-foreground text-sm">We're exploring whether this concept fills a gap — or adds something on top of what already exists.</p>
              <div className="space-y-2">
                {LOYALTY_OPTIONS.map((o) => (
                  <OptionButton key={o} label={o} selected={form.current_loyalty === o} onClick={() => set("current_loyalty", o)} />
                ))}
              </div>
              <div className="space-y-2 pt-2">
                <label className="text-sm font-medium">What's your biggest challenge with customer loyalty? <span className="text-muted-foreground">(optional)</span></label>
                <textarea
                  className="w-full rounded-xl border border-input bg-card px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/40"
                  rows={3}
                  placeholder="e.g. low repeat booking rates, high cost of rewards programs..."
                  value={form.biggest_challenge}
                  onChange={(e) => set("biggest_challenge", e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Step 3 – fit */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-heading font-bold">How do you feel about this concept?</h2>
                <p className="text-muted-foreground text-sm">The model: airport retailers pay a fee when travelers redeem a credit — a share of that flows back to you. Nothing is built yet.</p>
                <div className="space-y-2">
                  {INTEREST_OPTIONS.map((o) => (
                    <OptionButton key={o} label={o} selected={form.interest_level === o} onClick={() => set("interest_level", o)} />
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <h2 className="text-xl font-heading font-bold">How attractive would a commission-per-redemption model be to you?</h2>
                <div className="space-y-2">
                  {COMMISSION_OPTIONS.map((o) => (
                    <OptionButton key={o} label={o} selected={form.commission_attractive === o} onClick={() => set("commission_attractive", o)} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4 – contact */}
          {step === 4 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-heading font-bold">Last step — who are you?</h2>
              <p className="text-muted-foreground text-sm">We'll share the results of this validation with you and let you know if and when we move forward with building.</p>
              <div className="space-y-3">
                <Input placeholder="Full name *" value={form.full_name} onChange={(e) => set("full_name", e.target.value)} />
                <Input placeholder="Work email *" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} />
                <Input placeholder="Company name *" value={form.company_name} onChange={(e) => set("company_name", e.target.value)} />
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
                  <strong>Yes, I'd like a short conversation</strong> — happy to share more thoughts and be part of the validation process.
                </span>
              </label>
            </div>
          )}

          {/* Navigation */}
          <div className="flex gap-3 pt-2">
            {step > 0 && (
              <Button variant="outline" onClick={() => setStep((s) => s - 1)} className="flex-1">
                Back
              </Button>
            )}
            {step < STEPS.length - 1 ? (
              <Button
                className="flex-1 gap-2"
                disabled={!canNext()}
                onClick={() => setStep((s) => s + 1)}
              >
                Continue <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                className="flex-1 gap-2"
                disabled={!canNext() || saving}
                onClick={handleSubmit}
              >
                {saving ? "Submitting..." : "Submit my input"} <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>

          <p className="text-center text-xs text-muted-foreground">
            No spam. No sales pitch. Just honest market validation — your input directly influences whether we build this.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-6 px-4">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <DutyBoostLogo height={130} />
          <p>© {new Date().getFullYear()} DutyBoost B.V. · The Travel Retail Conversion Layer</p>
        </div>
      </footer>
    </div>
  );
}