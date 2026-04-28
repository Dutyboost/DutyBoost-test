import { useState } from "react";
import { base44 } from "@/api/base44Client";
import DutyBoostLogo from "../components/DutyBoostLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, ArrowRight } from "lucide-react";

const TOTAL_QUESTIONS = 7;

const STORE_TYPES = [
  "Perfumes & cosmetics",
  "Electronics & gadgets",
  "Chocolate, confectionery & cheese",
  "Gifts & souvenirs",
  "Liquors & wines",
  "Watches & jewellery",
  "Luxury",
  "Fashion & accessories",
  "Travel items",
  "Books & magazines",
  "Children & toys",
  "Pharmacy",
  "Food and drink",
];
const MONTHLY_VISITORS = ["Under 1,000", "1,000 – 5,000", "5,000 – 20,000", "20,000+"];
const CURRENT_PROMOS = ["None", "Loyalty card / stamp", "App-based discounts", "Airport-wide promotions", "Other"];
const INTEREST_OPTIONS = [
  "Very interested – count me in",
  "Interested – I want to learn more first",
  "Curious – still evaluating",
  "Not sure yet",
];
const VOUCHER_OPTIONS = [
  "Yes, very attractive – more foot traffic is always welcome",
  "Somewhat attractive – depends on the terms",
  "Need more details before deciding",
  "Not a priority right now",
];
const INTEGRATION_OPTIONS = [
  "Yes – easy integrations are no problem for us",
  "Possibly – depends on what's needed technically",
  "Unlikely – our setup makes this difficult",
  "No – we don't manage our own tech",
];

function OptionButton({ label, selected, onClick, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => {
        onClick();
        onSelect?.();
      }}
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

export default function AirportRetailerSurvey() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [websiteError, setWebsiteError] = useState("");
  const [websiteValid, setWebsiteValid] = useState(false);
  const [verifyingWebsite, setVerifyingWebsite] = useState(false);
  const [emailError, setEmailError] = useState("");

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    company_name: "",
    company_website: "",
    company_type: "",
    annual_bookings: "",
    current_loyalty: [],
    biggest_challenge: "",
    interest_level: "",
    commission_attractive: "",
    snippet_willingness: "",
    wants_demo: false,
    phone: "",
    loyalty_other: "",
  });

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const handlePromoToggle = (option) => {
    const exclusiveOptions = ["None", "Other"];
    const isExclusive = exclusiveOptions.includes(option);
    const hasExclusive = form.current_loyalty.some(o => exclusiveOptions.includes(o));
    const hasRegular = form.current_loyalty.some(o => !exclusiveOptions.includes(o));

    if (form.current_loyalty.includes(option)) {
      setForm((f) => ({ ...f, current_loyalty: f.current_loyalty.filter(o => o !== option) }));
    } else {
      if (isExclusive && hasRegular) return;
      if (!isExclusive && hasExclusive) return;
      setForm((f) => ({ ...f, current_loyalty: [...f.current_loyalty, option] }));
    }
  };

  const BLOCKED_KEYWORDS = [
    'porn', 'xxx', 'sex', 'adult', 'nude', 'naked', 'erotic',
    'penis', 'vagina', 'cock', 'pussy', 'ass', 'fuck', 'shit', 'cunt',
    'whore', 'slut', 'bitch', 'damn', 'bullshit', 'asshole', 'bastard'
  ];

  const hasObsceneContent = (text) => {
    const lower = text.toLowerCase();
    return BLOCKED_KEYWORDS.some(keyword => lower.includes(keyword));
  };

  const PERSONAL_DOMAINS = [
    'gmail.com', 'hotmail.com', 'hotmail.nl', 'hotmail.de', 'hotmail.fr', 'hotmail.es', 'hotmail.it',
    'outlook.com', 'outlook.nl', 'outlook.de', 'outlook.fr', 'outlook.es', 'outlook.it',
    'yahoo.com', 'yahoo.nl', 'yahoo.de', 'yahoo.fr', 'yahoo.es', 'yahoo.it', 'yahoo.co.uk',
    'aol.com', 'me.com', 'icloud.com', 'mac.com',
    'mail.com', 'protonmail.com', 'proton.me',
    'yandex.com', 'yandex.ru', 'mail.ru',
    'gmx.de', 'gmx.com', 'gmx.net', 'gmx.at', 'gmx.ch',
    'web.de', 'free.fr', 'sfr.fr', 'orange.fr', 'laposte.net',
    'live.com', 'live.nl', 'live.de', 'live.fr', 'live.es', 'live.it',
    'msn.com', 'qq.com', '163.com', '126.com',
    'libero.it', 'virgilio.it', 'tin.it', 'alice.it',
    'wanadoo.fr', 'bbox.fr', 'tiscali.it', 'tiscali.fr',
    't-online.de', 'freenet.de', 'arcor.de',
    'ziggo.nl', 'kpnmail.nl', 'planet.nl', 'home.nl', 'xs4all.nl', 'hetnet.nl',
  ];

  const isPersonalEmail = (email) => {
    const domain = email.split('@')[1]?.toLowerCase();
    return PERSONAL_DOMAINS.includes(domain);
  };

  const getEmailDomain = (email) => email.split('@')[1]?.toLowerCase() || '';

  const getWebsiteDomain = (website) => {
    try {
      const url = website.trim().startsWith('http') ? website.trim() : 'https://' + website.trim();
      const hostname = new URL(url).hostname.replace(/^www\./, '');
      return hostname.toLowerCase();
    } catch { return ''; }
  };

  const doDomainsMatch = (email, website) => {
    const emailDomain = getEmailDomain(email);
    const websiteDomain = getWebsiteDomain(website);
    if (!emailDomain || !websiteDomain) return true; // don't block if either is missing
    // Check if email domain ends with or equals the website domain
    return emailDomain === websiteDomain || emailDomain.endsWith('.' + websiteDomain) || websiteDomain.endsWith('.' + emailDomain);
  };

  const extractHostname = (val) => {
    const trimmed = val.trim();
    if (!trimmed) return null;
    try {
      const url = trimmed.startsWith("http") ? trimmed : "https://" + trimmed;
      return new URL(url).hostname;
    } catch {
      return null;
    }
  };

  const checkDomainExists = async (val) => {
    const hostname = extractHostname(val);
    if (!hostname || !hostname.includes(".")) return false;
    try {
      const res = await fetch(`https://dns.google/resolve?name=${hostname}&type=A`);
      const data = await res.json();
      if (data.Status !== 0) return false;
      if (!Array.isArray(data.Answer) || data.Answer.length === 0) return false;
      return data.Answer.some(record => record.type === 1);
    } catch {
      return false;
    }
  };

  const handleWebsiteBlur = async () => {
    const val = form.company_website;
    if (!val) return;
    if (hasObsceneContent(val)) {
      setWebsiteValid(false);
      setWebsiteError("This website cannot be submitted. Please enter a valid company website.");
      return;
    }
    setVerifyingWebsite(true);
    setWebsiteError("");
    const exists = await checkDomainExists(val);
    setVerifyingWebsite(false);
    if (!exists) {
      setWebsiteValid(false);
      setWebsiteError("We couldn't verify this website. Please enter a real company website (e.g. www.yourstore.com).");
    } else {
      setWebsiteValid(true);
      setWebsiteError("");
      // Re-check domain match now that website is confirmed
      if (form.email && !isPersonalEmail(form.email) && !doDomainsMatch(form.email, val)) {
        setEmailError("Your email domain doesn't match your company website. Please use your company email.");
      } else if (form.email && !isPersonalEmail(form.email)) {
        setEmailError("");
      }
    }
  };

  const goToStep = (n) => {
    setStep(n);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const canNext = () => {
    if (step === 0) return form.company_type !== "";
    if (step === 1) return form.annual_bookings !== "";
    if (step === 2) return form.current_loyalty.length > 0;
    if (step === 3) return form.interest_level !== "";
    if (step === 4) return form.commission_attractive !== "";
    if (step === 5) return form.snippet_willingness !== "";
    if (step === 6) return form.full_name && form.email && form.company_name && websiteValid && !verifyingWebsite && !emailError;
    return true;
  };

  const handleSubmit = async () => {
    setSaving(true);
    try {
      const submitData = {
        ...form,
        company_type: "Airport Retailer – " + form.company_type,
        current_loyalty: form.current_loyalty.join(", "),
      };
      await base44.entities.SurveyResponse.create(submitData);
      setSubmitted(true);
    } catch (error) {
      console.error("Submission error:", error);
      setSaving(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 text-center space-y-6">
        <CheckCircle2 className="w-16 h-16 text-green-500" />
        <h1 className="text-3xl font-heading font-bold">Thank you{form.full_name ? `, ${form.full_name.split(" ")[0]}` : ""}!</h1>
        <p className="text-muted-foreground max-w-md leading-relaxed">
          {form.wants_demo
            ? "Your input means a lot. We'll be in touch soon."
            : "Your input means a lot. Stay tuned for when we launch."}
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
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold tracking-tight leading-tight max-w-3xl">
              We're validating a new way for airport retailers to drive more sales.{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Your opinion matters to us.
              </span>
            </h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-2xl leading-relaxed">
              We're not ready to share all the details yet — but we want to know if there's genuine interest from airport retailers before we go further.
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
              <h2 className="text-2xl font-heading font-bold">What type of store do you operate at the airport?</h2>
              <div className="space-y-2">
                {STORE_TYPES.map((t) => (
                  <OptionButton key={t} label={t} selected={form.company_type === t} onClick={() => set("company_type", t)} onSelect={() => goToStep(1)} />
                ))}
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-heading font-bold">How many customers visit your store per month (approximately)?</h2>
              <div className="space-y-2">
                {MONTHLY_VISITORS.map((v) => (
                  <OptionButton key={v} label={v} selected={form.annual_bookings === v} onClick={() => set("annual_bookings", v)} onSelect={() => goToStep(2)} />
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-heading font-bold">Do you currently run any promotions or loyalty programs to attract airport customers?</h2>
              <p className="text-sm text-muted-foreground">Select all that apply</p>
              <div className="space-y-2">
                {CURRENT_PROMOS.map((o) => {
                  const isSelected = form.current_loyalty.includes(o);
                  const isExclusive = o === "None" || o === "Other";
                  const hasExclusive = form.current_loyalty.some(opt => ["None", "Other"].includes(opt));
                  const hasRegular = form.current_loyalty.some(opt => !["None", "Other"].includes(opt));
                  const disabled = isExclusive ? hasRegular : hasExclusive;

                  return (
                    <button
                      key={o}
                      onClick={() => handlePromoToggle(o)}
                      disabled={disabled && !isSelected}
                      className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all flex items-center gap-3 ${
                        disabled && !isSelected
                          ? "opacity-40 cursor-not-allowed bg-muted"
                          : isSelected
                          ? "bg-primary text-primary-foreground border-primary shadow-md"
                          : "bg-card border-border hover:border-primary/50 hover:bg-primary/5 text-foreground cursor-pointer"
                      }`}
                    >
                      <input type="checkbox" checked={isSelected} onChange={() => {}} className="w-4 h-4" disabled={disabled && !isSelected} />
                      {o}
                    </button>
                  );
                })}
              </div>
              {form.current_loyalty.includes("Other") && (
                <textarea
                  className="w-full rounded-xl border border-input bg-card px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/40"
                  rows={2}
                  placeholder="Briefly describe..."
                  value={form.loyalty_other || ""}
                  onChange={(e) => set("loyalty_other", e.target.value)}
                />
              )}
              <div className="space-y-2 pt-1">
                <label className="text-sm text-muted-foreground">What's your biggest challenge attracting customers at the airport? (optional)</label>
                <textarea
                  className="w-full rounded-xl border border-input bg-card px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/40"
                  rows={2}
                  placeholder="Optional..."
                  value={form.biggest_challenge}
                  onChange={(e) => set("biggest_challenge", e.target.value)}
                />
              </div>
              <Button className="w-full gap-2 mt-4" onClick={() => goToStep(3)}>
                Continue <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-heading font-bold">If a platform could send pre-qualified, voucher-holding travelers directly to your store at no upfront cost, how interested would you be?</h2>
              <div className="space-y-2">
                {INTEREST_OPTIONS.map((o) => (
                  <OptionButton key={o} label={o} selected={form.interest_level === o} onClick={() => set("interest_level", o)} onSelect={() => goToStep(4)} />
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-heading font-bold">How attractive is a model where you only pay a small fee when a voucher is actually redeemed in your store?</h2>
              <div className="space-y-2">
                {VOUCHER_OPTIONS.map((o) => (
                  <OptionButton key={o} label={o} selected={form.commission_attractive === o} onClick={() => set("commission_attractive", o)} onSelect={() => goToStep(5)} />
                ))}
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-heading font-bold">How open are you to a simple QR-based redemption process at your point of sale?</h2>
              <div className="space-y-2">
                {INTEGRATION_OPTIONS.map((o) => (
                  <OptionButton key={o} label={o} selected={form.snippet_willingness === o} onClick={() => set("snippet_willingness", o)} onSelect={() => goToStep(6)} />
                ))}
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-heading font-bold">Last step — Let us know who you are.</h2>
              <p className="text-muted-foreground text-sm">Would you like to stay updated? We'll only reach out when we have something meaningful to share. No spam, ever.</p>
              <div className="space-y-3">
                <Input placeholder="Full name *" value={form.full_name} onChange={(e) => set("full_name", e.target.value)} />
                <Input placeholder="Store / Company name *" value={form.company_name} onChange={(e) => set("company_name", e.target.value)} />
                <div>
                  <Input
                    placeholder="Work email *"
                    type="email"
                    value={form.email}
                    onChange={(e) => {
                      set("email", e.target.value);
                      if (e.target.value && isPersonalEmail(e.target.value)) {
                        setEmailError("Please use a professional/company email address");
                      } else if (e.target.value && form.company_website && websiteValid && !doDomainsMatch(e.target.value, form.company_website)) {
                        setEmailError("Your email domain doesn't match your company website. Please use your company email.");
                      } else {
                        setEmailError("");
                      }
                    }}
                    className={emailError ? "border-destructive" : ""}
                  />
                  {emailError && <p className="text-xs text-destructive mt-1">{emailError}</p>}
                </div>
                <div>
                  <Input
                    placeholder="Company website * (e.g. www.yourstore.com)"
                    value={form.company_website}
                    onChange={(e) => {
                      set("company_website", e.target.value);
                      setWebsiteValid(false);
                      setWebsiteError("");
                    }}
                    onBlur={handleWebsiteBlur}
                    className={websiteError ? "border-destructive" : websiteValid ? "border-green-500" : ""}
                  />
                  {verifyingWebsite && <p className="text-xs text-muted-foreground mt-1">Verifying website...</p>}
                  {websiteError && <p className="text-xs text-destructive mt-1">{websiteError}</p>}
                  {websiteValid && !verifyingWebsite && <p className="text-xs text-green-600 mt-1">✓ Website verified</p>}
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
                  <strong>Yes, I'd like to be contacted</strong> when DutyBoost is ready to share more details.
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
            {step === TOTAL_QUESTIONS - 1 && (
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