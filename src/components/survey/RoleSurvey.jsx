import { useState } from "react";
import { base44 } from "@/api/base44Client";
import DutyBoostLogo from "@/components/DutyBoostLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, ArrowRight } from "lucide-react";
import PlatformComboBox from "./PlatformComboBox";
import MultiSelectComboBox from "./MultiSelectComboBox";

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

function PlatformSelector({ label, options, value, onChange }) {
  if (!options || !options.length) return null;
  return (
    <div className="space-y-2 pt-1">
      <p className="text-sm font-medium text-foreground">{label}</p>
      <div className="grid grid-cols-2 gap-2">
        {options.map((o) => (
          <button
            key={o}
            type="button"
            onClick={() => onChange(o)}
            className={`text-left px-3 py-2 rounded-lg border text-xs font-medium transition-all ${
              value === o
                ? "bg-primary text-primary-foreground border-primary shadow-sm"
                : "bg-card border-border hover:border-primary/50 hover:bg-primary/5 text-foreground"
            }`}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function RoleSurvey({ config }) {
  const { companyTypePrefix, hero, q1, q2, q3, q4, posProviderLabel, contactless, requireContactDetails, travelPlatformLabel, travelPlatformOptions, travelPlatformCombobox, travelPlatformMandatory, exitOnNo, exitSteps, exitValue, retailersServedLabel, retailersServedOptions, retailersServedMandatory } = config;

  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [websiteError, setWebsiteError] = useState("");
  const [websiteValid, setWebsiteValid] = useState(false);
  const [verifyingWebsite, setVerifyingWebsite] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [anonymous, setAnonymous] = useState(null);
  const [exitPending, setExitPending] = useState(false);
  const [exitNextStep, setExitNextStep] = useState(null);
  const [exited, setExited] = useState(false);

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
    travel_platform: "",
    retailers_served: [],
    phone: "",
    wants_demo: false,
    interest_level: "Yes – completed the survey",
  });

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const goToStep = (n) => {
    setStep(n);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAnswerSelect = (currentStep, value) => {
    const next = currentStep + 1;
    if (exitOnNo && Array.isArray(exitSteps) && exitSteps.includes(currentStep) && value === (exitValue || "No")) {
      setExitNextStep(currentStep);
      setExitPending(true);
    } else {
      goToStep(next);
    }
  };

  const clearStepAnswer = (s) => {
    if (s === 2) set("commission_attractive", "");
    if (s === 3) set("snippet_willingness", "");
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
      const platformOk = !travelPlatformMandatory || !!form.travel_platform.trim();
      const retailersOk = !retailersServedMandatory || (Array.isArray(form.retailers_served) && form.retailers_served.length > 0);
      if (contactless) {
        return !!form.company_name && websiteValid && !verifyingWebsite && posOk && platformOk;
      }
      if (requireContactDetails) {
        return (
          !!form.full_name &&
          !!form.email &&
          !!form.company_name &&
          websiteValid &&
          !verifyingWebsite &&
          !emailError &&
          posOk &&
          platformOk &&
          retailersOk
        );
      }
      if (anonymous === null) return false;
      if (anonymous) return !!form.company_name && websiteValid && !verifyingWebsite && posOk && platformOk;
      return (
        !!form.full_name &&
        !!form.email &&
        !!form.company_name &&
        websiteValid &&
        !verifyingWebsite &&
        !emailError &&
        posOk &&
        platformOk
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
        travel_platform: travelPlatformOptions?.length ? form.travel_platform : "",
        retailers_served: form.retailers_served,
        phone: form.phone,
        wants_demo: form.wants_demo,
      });
      setSubmitted(true);
    } catch (error) {
      console.error("Submission error:", error);
      setSaving(false);
    }
  };

  if (exited) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 text-center space-y-6">
        <CheckCircle2 className="w-16 h-16 text-muted-foreground" />
        <h1 className="text-3xl font-heading font-bold">Thank you for your time.</h1>
        <p className="text-muted-foreground max-w-md leading-relaxed">
          If you'd like to retake the survey later, you can do so via the link you received in the email.
        </p>
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} DutyBoost. All Rights Reserved.</p>
      </div>
    );
  }

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
          {exitPending ? (
            <div className="space-y-6 py-6">
              <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-4 text-center">
                <h3 className="text-2xl font-heading font-bold">Are you sure you want to exit?</h3>
                <p className="text-muted-foreground text-sm max-w-md mx-auto leading-relaxed">
                  Your answers so far won't be saved. You can retake the survey any time using the link in the email you received.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button className="flex-1" onClick={() => { clearStepAnswer(exitNextStep); setExitPending(false); goToStep(exitNextStep); }}>
                  No, continue the survey
                </Button>
                <Button variant="outline" className="flex-1" onClick={() => { setExitPending(false); setExited(true); }}>
                  Yes, exit
                </Button>
              </div>
            </div>
          ) : (
          <>
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
                  <OptionButton key={o} label={o} selected={form.commission_attractive === o} onClick={() => set("commission_attractive", o)} onSelect={() => handleAnswerSelect(2, o)} />
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-heading font-bold">{q4.label}</h2>
              <div className="space-y-2">
                {q4.options.map((o) => (
                  <OptionButton key={o} label={o} selected={form.snippet_willingness === o} onClick={() => set("snippet_willingness", o)} onSelect={() => handleAnswerSelect(3, o)} />
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-5">
              <div className="space-y-4">
                <h3 className="text-2xl font-heading font-bold">
                  {contactless
                    ? "Last step — Your company details"
                    : requireContactDetails
                    ? "Last step — Your contact details"
                    : "Last step — How would you like to respond?"}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {contactless
                    ? posProviderLabel
                      ? "We're gathering anonymous feedback to validate that the solution is attractive for all participants of the Circular Commercial Revenue Infrastructure for Global Travel — just share your company name, website and POS provider details."
                      : "We're gathering anonymous feedback to validate that the solution is attractive for all participants of the Circular Commercial Revenue Infrastructure for Global Travel — just share your company name and website."
                    : requireContactDetails
                    ? "Share your contact details so we can follow up when DutyBoost is ready to share more."
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

                    {travelPlatformOptions?.length > 0 && (
                      travelPlatformCombobox ? (
                        <PlatformComboBox
                          label={travelPlatformLabel}
                          options={travelPlatformOptions}
                          value={form.travel_platform}
                          onChange={(v) => set("travel_platform", v)}
                        />
                      ) : (
                        <PlatformSelector
                          label={travelPlatformLabel}
                          options={travelPlatformOptions}
                          value={form.travel_platform}
                          onChange={(v) => set("travel_platform", v)}
                        />
                      )
                    )}
                  </div>
                ) : (
                  <>
                    {!requireContactDetails && (
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
                    )}

                    {(requireContactDetails || anonymous !== null) && (
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

                        {travelPlatformOptions?.length > 0 && (
                          travelPlatformCombobox ? (
                            <PlatformComboBox
                              label={travelPlatformLabel}
                              options={travelPlatformOptions}
                              value={form.travel_platform}
                              onChange={(v) => set("travel_platform", v)}
                            />
                          ) : (
                            <PlatformSelector
                              label={travelPlatformLabel}
                              options={travelPlatformOptions}
                              value={form.travel_platform}
                              onChange={(v) => set("travel_platform", v)}
                            />
                          )
                        )}

                        {retailersServedOptions?.length > 0 && (
                          <MultiSelectComboBox
                            label={retailersServedLabel}
                            options={retailersServedOptions}
                            value={form.retailers_served}
                            onChange={(v) => set("retailers_served", v)}
                          />
                        )}

                        {(anonymous === false || requireContactDetails) && (
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
              <Button className="flex-1 gap-2" disabled={!canNext()} onClick={() => handleAnswerSelect(step, step === 2 ? form.commission_attractive : step === 3 ? form.snippet_willingness : "")}>
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
          </>
          )}
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