import { useState } from "react";
import { base44 } from "@/api/base44Client";
import DutyBoostLogo from "@/components/DutyBoostLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, ArrowRight } from "lucide-react";

const TOTAL_STEPS = 5;

const PERSONAL_DOMAINS = [
  "gmail.com", "hotmail.com", "outlook.com", "yahoo.com", "aol.com",
  "me.com", "icloud.com", "mail.com", "protonmail.com", "yandex.com",
  "mail.ru", "gmx.de", "web.de", "freenet.de", "vodafone.de",
  "telefonica.es", "wanadoo.es", "alice.it", "virgilio.it", "tin.it",
  "free.fr", "sfr.fr", "orange.fr", "laposte.net",
];

const BLOCKED_KEYWORDS = [
  "porn", "xxx", "sex", "adult", "nude", "naked", "erotic",
  "penis", "vagina", "cock", "pussy", "ass", "fuck", "shit", "cunt",
  "whore", "slut", "bitch", "damn", "bullshit", "asshole", "bastard",
];

function isPersonalEmail(email) {
  const domain = email.split("@")[1]?.toLowerCase();
  return PERSONAL_DOMAINS.includes(domain);
}

function hasObsceneContent(text) {
  const lower = (text || "").toLowerCase();
  return BLOCKED_KEYWORDS.some((k) => lower.includes(k));
}

function extractHostname(val) {
  const trimmed = (val || "").trim();
  if (!trimmed) return null;
  try {
    const url = trimmed.startsWith("http") ? trimmed : "https://" + trimmed;
    return new URL(url).hostname;
  } catch {
    return null;
  }
}

async function checkDomainExists(val) {
  const hostname = extractHostname(val);
  if (!hostname || !hostname.includes(".")) return false;
  try {
    const res = await fetch(`https://dns.google/resolve?name=${hostname}&type=A`);
    const data = await res.json();
    if (data.Status !== 0) return false;
    if (!Array.isArray(data.Answer) || data.Answer.length === 0) return false;
    return data.Answer.some((r) => r.type === 1);
  } catch {
    return false;
  }
}

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

export default function RoleSurvey({ config }) {
  const { companyTypePrefix, hero, q1, q2, q3, q4, posProviderLabel, contactless } = config;

  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [websiteError, setWebsiteError] = useState("");
  const [websiteValid, setWebsiteValid] = useState(false);
  const [verifyingWebsite, setVerifyingWebsite] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [anonymous, setAnonymous] = useState(null);

  const [form, setForm] = useState({
    company_type: "",
    annual_bookings: "",
    commission_attractive: "",
    snippet_willingness: "",
    interest_level: "",
    full_name: "",
    email: "",
    company_name: "",
    company_website: "",
    pos_provider: "",
    phone: "",
    wants_demo: false,
    interest_level: "Yes – completed the survey",
  });

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const goToStep = (n) => {
    setStep(n);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
      setWebsiteError("We couldn't verify this website. Please enter a real company website (e.g. www.yourcompany.com).");
    } else {
      setWebsiteValid(true);
      setWebsiteError("");
    }
  };

  const canNext = () => {
    if (step === 0) return form.company_type !== "";
    if (step === 1) return form.annual_bookings !== "";
    if (step === 2) return form.commission_attractive !== "";
    if (step === 3) return form.snippet_willingness !== "";
    if (step === 4) {
      const posOk = !posProviderLabel || !!form.pos_provider.trim();
      if (contactless) {
        return !!form.company_name && websiteValid && !verifyingWebsite && posOk;
      }
      if (anonymous === null) return false;
      if (anonymous) return !!form.company_name && websiteValid && !verifyingWebsite && posOk;
      return (
        !!form.full_name &&
        !!form.email &&
        !!form.company_name &&
        websiteValid &&
        !verifyingWebsite &&
        !emailError &&
        posOk
      );
    }
    return true;
  };

  const handleSubmit = async () => {
    setSaving(true);
    try {
      await base44.entities.SurveyResponse.create({
        company_type: companyTypePrefix + form.company_type,
        annual_bookings: form.annual_bookings,
        commission_attractive: form.commission_attractive,
        snippet_willingness: form.snippet_willingness,
        interest_level: form.interest_level,
        full_name: form.full_name,
        email: form.email,
        company_name: form.company_name,
        company_website: form.company_website,
        pos_provider: posProviderLabel ? form.pos_provider : "",
        phone: form.phone,
        wants_demo: form.wants_demo,
      });
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
        <h1 className="text-3xl font-heading font-bold">
          Thank you{form.full_name ? `, ${form.full_name.split(" ")[0]}` : ""}!
        </h1>
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
          <DutyBoostLogo height={55} />
        </div>
      </nav>

      {step === 0 && (
        <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/5 border-b border-border">
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-4xl mx-auto px-4 py-14 sm:py-20 relative">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold tracking-tight leading-tight max-w-3xl">
              {hero.title}{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {hero.titleAccent}
              </span>
            </h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-2xl leading-relaxed">{hero.subtitle}</p>
            <p className="mt-4 text-sm text-muted-foreground">{hero.badges.join(" · ")}</p>
          </div>
        </div>
      )}

      <div className="flex-1 flex items-start justify-center px-4 py-10">
        <div className="w-full max-w-xl space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Question {step + 1} of {TOTAL_STEPS}</span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${((step + 1) / TOTAL_STEPS) * 100}%` }}
              />
            </div>
          </div>

          {step === 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-heading font-bold">{q1.label}</h2>
              <div className="space-y-2">
                {q1.options.map((o) => (
                  <OptionButton key={o} label={o} selected={form.company_type === o} onClick={() => set("company_type", o)} onSelect={() => goToStep(1)} />
                ))}
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-heading font-bold">{q2.label}</h2>
              <div className="space-y-2">
                {q2.options.map((o) => (
                  <OptionButton key={o} label={o} selected={form.annual_bookings === o} onClick={() => set("annual_bookings", o)} onSelect={() => goToStep(2)} />
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-heading font-bold">{q3.label}</h2>
              <div className="space-y-2">
                {q3.options.map((o) => (
                  <OptionButton key={o} label={o} selected={form.commission_attractive === o} onClick={() => set("commission_attractive", o)} onSelect={() => goToStep(3)} />
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-heading font-bold">{q4.label}</h2>
              <div className="space-y-2">
                {q4.options.map((o) => (
                  <OptionButton key={o} label={o} selected={form.snippet_willingness === o} onClick={() => set("snippet_willingness", o)} onSelect={() => goToStep(4)} />
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-5">
              <div className="space-y-4">
                <h3 className="text-2xl font-heading font-bold">
                  {contactless ? "Last step — Your company details" : "Last step — How would you like to respond?"}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {contactless
                    ? "We're gathering anonymous feedback to validate that the solution is attractive for all participants — just share your company name, website and POS provider details."
                    : "Share your contact details so we can follow up, or respond anonymously. Either way, your input is valuable."}
                </p>

                {contactless ? (
                  <div className="space-y-3 pt-1">
                    <Input placeholder="Company name *" value={form.company_name} onChange={(e) => set("company_name", e.target.value)} />
                    <div>
                      <Input
                        placeholder="Company website * (e.g. www.yourcompany.com)"
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

                    {posProviderLabel && (
                      <Input
                        placeholder={posProviderLabel}
                        value={form.pos_provider}
                        onChange={(e) => set("pos_provider", e.target.value)}
                      />
                    )}
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 gap-3">
                      <button
                        type="button"
                        onClick={() => setAnonymous(false)}
                        className={`w-full text-left px-4 py-4 rounded-xl border text-sm font-medium transition-all ${
                          anonymous === false
                            ? "bg-primary text-primary-foreground border-primary shadow-md"
                            : "bg-card border-border hover:border-primary/50 hover:bg-primary/5 text-foreground"
                        }`}
                      >
                        <div className="font-semibold">Share my contact details</div>
                        <div className={`text-xs mt-0.5 ${anonymous === false ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                          I'd like to stay updated and be reached out to when DutyBoost launches.
                        </div>
                      </button>
                      <button
                        type="button"
                        onClick={() => setAnonymous(true)}
                        className={`w-full text-left px-4 py-4 rounded-xl border text-sm font-medium transition-all ${
                          anonymous === true
                            ? "bg-primary text-primary-foreground border-primary shadow-md"
                            : "bg-card border-border hover:border-primary/50 hover:bg-primary/5 text-foreground"
                        }`}
                      >
                        <div className="font-semibold">Respond anonymously</div>
                        <div className={`text-xs mt-0.5 ${anonymous === true ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                          I only want to share my company name and website. No personal details.
                        </div>
                      </button>
                    </div>

                    {anonymous !== null && (
                      <div className="space-y-3 pt-1">
                        <Input placeholder="Company name *" value={form.company_name} onChange={(e) => set("company_name", e.target.value)} />
                        <div>
                          <Input
                            placeholder="Company website * (e.g. www.yourcompany.com)"
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

                        {posProviderLabel && (
                          <Input
                            placeholder={posProviderLabel}
                            value={form.pos_provider}
                            onChange={(e) => set("pos_provider", e.target.value)}
                          />
                        )}

                        {anonymous === false && (
                          <>
                            <Input placeholder="Full name *" value={form.full_name} onChange={(e) => set("full_name", e.target.value)} />
                            <div>
                              <Input
                                placeholder="Work email *"
                                type="email"
                                value={form.email}
                                onChange={(e) => {
                                  set("email", e.target.value);
                                  if (e.target.value && isPersonalEmail(e.target.value)) {
                                    setEmailError("Please use a professional/company email address.");
                                  } else {
                                    setEmailError("");
                                  }
                                }}
                                className={emailError ? "border-destructive" : ""}
                              />
                              {emailError && <p className="text-xs text-destructive mt-1">{emailError}</p>}
                            </div>
                            <Input placeholder="Phone (optional)" value={form.phone} onChange={(e) => set("phone", e.target.value)} />
                            <label className="flex items-start gap-3 cursor-pointer group pt-1">
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
                          </>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            {step > 0 && (
              <Button variant="outline" onClick={() => goToStep(step - 1)} className="flex-1">
                Back
              </Button>
            )}
            {step < TOTAL_STEPS - 1 && (
              <Button className="flex-1 gap-2" disabled={!canNext()} onClick={() => goToStep(step + 1)}>
                Continue <ArrowRight className="w-4 h-4" />
              </Button>
            )}
            {step === TOTAL_STEPS - 1 && (
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
          <DutyBoostLogo height={55} />
          <p>© {new Date().getFullYear()} DutyBoost</p>
        </div>
      </footer>
    </div>
  );
}