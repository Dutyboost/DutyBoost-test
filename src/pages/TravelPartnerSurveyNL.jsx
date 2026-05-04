import { useState } from "react";
import { base44 } from "@/api/base44Client";
import DutyBoostLogo from "../components/DutyBoostLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, ArrowRight } from "lucide-react";

const TOTAL_QUESTIONS = 7;

const COMPANY_TYPES = ["Reisbureau", "Luchtvaartmaatschappij", "Touroperator", "OTA (Online Reisagentschap)", "Hotel", "Autoverhuur", "Cruisemaatschappij / Rederij", "Trein / Spoorwegoperator", "Anders"];
const BOOKING_VOLUMES = ["Minder dan 500", "500 – 2.000", "2.000 – 10.000", "10.000+"];
const LOYALTY_OPTIONS = ["Geen", "Punten / Miles", "Kortingen", "Partnervoordelen", "Anders"];
const INTEREST_OPTIONS = [
  "Zeer geïnteresseerd – ik doe mee",
  "Geïnteresseerd – ik wil eerst meer weten",
  "Nieuwsgierig – nog aan het evalueren",
  "Nog niet zeker",
];
const COMMISSION_OPTIONS = [
  "Ja, zeer aantrekkelijk",
  "Enigszins aantrekkelijk",
  "Meer details nodig",
  "Geen prioriteit op dit moment",
];
const SNIPPET_OPTIONS = [
  "Ja – iets toevoegen aan onze bevestigingspagina is heel goed te doen",
  "Mogelijk – hangt af van hoe eenvoudig het is",
  "Onwaarschijnlijk – onze technische setup maakt dit lastig",
  "Nee – we beheren die pagina niet zelf",
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

export default function TravelPartnerSurveyNL() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [websiteError, setWebsiteError] = useState("");
  const [websiteValid, setWebsiteValid] = useState(false);
  const [verifyingWebsite, setVerifyingWebsite] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [anonymous, setAnonymous] = useState(null);

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

  const handleLoyaltyToggle = (option) => {
    const hasExclusive = form.current_loyalty.includes("Geen") || form.current_loyalty.includes("Anders");
    const isExclusive = option === "Geen" || option === "Anders";
    const hasRegular = form.current_loyalty.some(o => ["Punten / Miles", "Kortingen", "Partnervoordelen"].includes(o));

    if (form.current_loyalty.includes(option)) {
      setForm((f) => ({ ...f, current_loyalty: f.current_loyalty.filter(o => o !== option) }));
    } else {
      if (isExclusive && hasRegular) return;
      if (!isExclusive && hasExclusive) return;
      setForm((f) => ({ ...f, current_loyalty: [...f.current_loyalty, option] }));
    }
  };

  const BLOCKED_KEYWORDS = [
    'porn', 'xxx', 'sex', 'adult', 'xxx', 'nude', 'naked', 'erotic', 'xxx',
    'penis', 'vagina', 'cock', 'pussy', 'ass', 'fuck', 'shit', 'cunt',
    'whore', 'slut', 'bitch', 'damn', 'bullshit', 'asshole', 'bastard'
  ];

  const hasObsceneContent = (text) => {
    const lower = text.toLowerCase();
    return BLOCKED_KEYWORDS.some(keyword => lower.includes(keyword));
  };

  const isPersonalEmail = (email) => {
    const PERSONAL_DOMAINS = [
      'gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com', 'aol.com',
      'me.com', 'icloud.com', 'mail.com', 'protonmail.com', 'yandex.com',
      'mail.ru', 'gmx.de', 'web.de', 'freenet.de', 'vodafone.de',
      'telefonica.es', 'wanadoo.es', 'alice.it', 'virgilio.it', 'tin.it',
      'free.fr', 'sfr.fr', 'orange.fr', 'laposte.net'
    ];
    const domain = email.split('@')[1]?.toLowerCase();
    return PERSONAL_DOMAINS.includes(domain);
  };

  const extractHostname = (val) => {
    const trimmed = val.trim();
    if (!trimmed) return null;
    try {
      const url = trimmed.startsWith("http") ? trimmed : "https://" + trimmed;
      const parsed = new URL(url);
      return parsed.hostname;
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
      // Status 0 = success, must have Answer array with records
      if (data.Status !== 0) return false;
      if (!Array.isArray(data.Answer) || data.Answer.length === 0) return false;
      // Verify at least one A record exists (not just other record types)
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
      setWebsiteError("Deze website kan niet worden ingediend. Voer een geldige bedrijfswebsite in.");
      return;
    }
    
    setVerifyingWebsite(true);
    setWebsiteError("");
    const exists = await checkDomainExists(val);
    setVerifyingWebsite(false);
    if (!exists) {
      setWebsiteValid(false);
      setWebsiteError("We konden deze website niet verifiëren. Vul een echt bedrijfswebsiteadres in (bijv. www.uwbedrijf.nl).");
    } else {
      setWebsiteValid(true);
      setWebsiteError("");
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
    if (step === 6) {
      if (anonymous === null) return false;
      if (anonymous) return form.company_name && websiteValid && !verifyingWebsite;
      return form.full_name && form.email && form.company_name && websiteValid && !verifyingWebsite && !emailError;
    }
    return true;
  };

  const handleSubmit = async () => {
    setSaving(true);
    try {
      const { loyalty_other, ...rest } = form;
      const submitData = {
        ...rest,
        current_loyalty: rest.current_loyalty.join(", "),
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
        <h1 className="text-3xl font-heading font-bold">Bedankt{form.full_name ? `, ${form.full_name.split(" ")[0]}` : ""}!</h1>
        <p className="text-muted-foreground max-w-md leading-relaxed">
          {form.wants_demo ? "Jouw input is waardevol. We nemen snel contact op." : "Jouw input is waardevol. Zorg dat je ons niet mist wanneer we lanceren."}
        </p>
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} DutyBoost. All Rights Reserved.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-body flex flex-col">
      <nav className="sticky top-0 z-50 backdrop-blur border-b border-border bg-background/80">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center">
          <DutyBoostLogo height={200} />
        </div>
      </nav>

      {step === 0 && (
        <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/5 border-b border-border">
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-4xl mx-auto px-4 py-14 sm:py-20 relative">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold tracking-tight leading-tight max-w-3xl">
              We valideren een nieuwe inkomstenmogelijkheid voor de reisbranche.{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Jouw mening is belangrijk voor ons.
              </span>
            </h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-2xl leading-relaxed">
              We valideren een nieuwe inkomstenmogelijkheid voor de reisbranche. We zijn nog niet klaar om alle details te delen — maar we willen eerst weten of er interesse is voordat we verdergaan.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">2 minuten · 7 vragen · Vrijblijvend.</p>
          </div>
        </div>
      )}

      <div className="flex-1 flex items-start justify-center px-4 py-10">
        <div className="w-full max-w-xl space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Vraag {step + 1} van {TOTAL_QUESTIONS}</span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${((step + 1) / TOTAL_QUESTIONS) * 100}%` }} />
            </div>
          </div>

          {step === 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-heading font-bold">Wat voor type reisbedrijf ben je?</h2>
              <div className="space-y-2">{COMPANY_TYPES.map((t) => <OptionButton key={t} label={t} selected={form.company_type === t} onClick={() => set("company_type", t)} onSelect={() => goToStep(1)} />)}</div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-heading font-bold">Hoeveel boekingen verwerk je per maand?</h2>
              <div className="space-y-2">{BOOKING_VOLUMES.map((v) => <OptionButton key={v} label={v} selected={form.annual_bookings === v} onClick={() => set("annual_bookings", v)} onSelect={() => goToStep(2)} />)}</div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-heading font-bold">Bied je jouw reizigers momenteel loyaliteitsvoordelen aan?</h2>
              <p className="text-sm text-muted-foreground">Selecteer alles wat van toepassing is</p>
              <div className="space-y-2">
                {LOYALTY_OPTIONS.map((o) => {
                  const isSelected = form.current_loyalty.includes(o);
                  const isExclusive = o === "Geen" || o === "Anders";
                  const hasRegular = form.current_loyalty.some(opt => ["Punten / Miles", "Kortingen", "Partnervoordelen"].includes(opt));
                  const disabled = isExclusive ? hasRegular : form.current_loyalty.includes("Geen") || form.current_loyalty.includes("Anders");
                  
                  return (
                    <button
                      key={o}
                      onClick={() => handleLoyaltyToggle(o)}
                      disabled={disabled && !isSelected}
                      className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all flex items-center gap-3 ${
                        disabled && !isSelected
                          ? "opacity-40 cursor-not-allowed bg-muted"
                          : isSelected
                          ? "bg-primary text-primary-foreground border-primary shadow-md"
                          : "bg-card border-border hover:border-primary/50 hover:bg-primary/5 text-foreground cursor-pointer"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => {}}
                        className="w-4 h-4"
                        disabled={disabled && !isSelected}
                      />
                      {o}
                    </button>
                  );
                })}
              </div>
              {form.current_loyalty.includes("Anders") && (
                <textarea className="w-full rounded-xl border border-input bg-card px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/40" rows={2} placeholder="Kort omschrijven..." value={form.loyalty_other || ""} onChange={(e) => set("loyalty_other", e.target.value)} />
              )}
              <div className="space-y-2 pt-1">
                <label className="text-sm text-muted-foreground">Wat is jouw grootste uitdaging met klantentrouw? (optioneel)</label>
                <textarea className="w-full rounded-xl border border-input bg-card px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/40" rows={2} placeholder="Optioneel..." value={form.biggest_challenge} onChange={(e) => set("biggest_challenge", e.target.value)} />
              </div>
              <Button className="w-full gap-2 mt-4" onClick={() => goToStep(3)}>
                Doorgaan <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-heading font-bold">Als er een eenvoudige, kostenloze manier was om een nieuwe inkomstenbron toe te voegen aan je bedrijf, hoe geïnteresseerd zou je dan zijn?</h2>
              <div className="space-y-2">{INTEREST_OPTIONS.map((o) => <OptionButton key={o} label={o} selected={form.interest_level === o} onClick={() => set("interest_level", o)} onSelect={() => goToStep(4)} />)}</div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-heading font-bold">Hoe belangrijk is het genereren van extra inkomsten uit je bestaande boekingen voor jouw bedrijf?</h2>
              <div className="space-y-2">{COMMISSION_OPTIONS.map((o) => <OptionButton key={o} label={o} selected={form.commission_attractive === o} onClick={() => set("commission_attractive", o)} onSelect={() => goToStep(5)} />)}</div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-heading font-bold">Hoe open sta je tegenover kleine technische toevoegingen aan jouw definitieve boekingsbevestigingsstap die de nieuwe inkomstenbron ontketent?</h2>
              <div className="space-y-2">{SNIPPET_OPTIONS.map((o) => <OptionButton key={o} label={o} selected={form.snippet_willingness === o} onClick={() => set("snippet_willingness", o)} onSelect={() => goToStep(6)} />)}</div>
            </div>
          )}

          {step === 6 && (
            <div className="space-y-5">
              <h2 className="text-2xl font-heading font-bold">Laatste stap — Hoe wil je reageren?</h2>
              <p className="text-muted-foreground text-sm">Je kunt je contactgegevens delen zodat we opvolging kunnen geven, of anoniem reageren. In beide gevallen is jouw input waardevol.</p>

              <div className="grid grid-cols-1 gap-3">
                <button type="button" onClick={() => setAnonymous(false)}
                  className={`w-full text-left px-4 py-4 rounded-xl border text-sm font-medium transition-all ${anonymous === false ? "bg-primary text-primary-foreground border-primary shadow-md" : "bg-card border-border hover:border-primary/50 hover:bg-primary/5 text-foreground"}`}>
                  <div className="font-semibold">Mijn contactgegevens delen</div>
                  <div className={`text-xs mt-0.5 ${anonymous === false ? "text-primary-foreground/80" : "text-muted-foreground"}`}>Ik wil op de hoogte blijven en gecontacteerd worden wanneer DutyBoost lanceert.</div>
                </button>
                <button type="button" onClick={() => setAnonymous(true)}
                  className={`w-full text-left px-4 py-4 rounded-xl border text-sm font-medium transition-all ${anonymous === true ? "bg-primary text-primary-foreground border-primary shadow-md" : "bg-card border-border hover:border-primary/50 hover:bg-primary/5 text-foreground"}`}>
                  <div className="font-semibold">Anoniem reageren</div>
                  <div className={`text-xs mt-0.5 ${anonymous === true ? "text-primary-foreground/80" : "text-muted-foreground"}`}>Ik deel alleen mijn bedrijfsnaam en website. Geen persoonlijke gegevens.</div>
                </button>
              </div>

              {anonymous !== null && (
                <div className="space-y-3 pt-1">
                  <Input placeholder="Bedrijfsnaam *" value={form.company_name} onChange={(e) => set("company_name", e.target.value)} />
                  <div>
                    <Input placeholder="Bedrijfswebsite * (bijv. www.uwbedrijf.nl)" value={form.company_website}
                      onChange={(e) => { set("company_website", e.target.value); setWebsiteValid(false); setWebsiteError(""); }}
                      onBlur={handleWebsiteBlur}
                      className={websiteError ? "border-destructive" : websiteValid ? "border-green-500" : ""}
                    />
                    {verifyingWebsite && <p className="text-xs text-muted-foreground mt-1">Website wordt geverifieerd...</p>}
                    {websiteError && <p className="text-xs text-destructive mt-1">{websiteError}</p>}
                    {websiteValid && !verifyingWebsite && <p className="text-xs text-green-600 mt-1">✓ Website geverifieerd</p>}
                  </div>

                  {anonymous === false && (
                    <>
                      <Input placeholder="Volledige naam *" value={form.full_name} onChange={(e) => set("full_name", e.target.value)} />
                      <div>
                        <Input placeholder="Zakelijk e-mailadres *" type="email" value={form.email}
                          onChange={(e) => {
                            set("email", e.target.value);
                            if (e.target.value && isPersonalEmail(e.target.value)) {
                              setEmailError("Gebruik alstublieft een professioneel/zakelijk e-mailadres");
                            } else { setEmailError(""); }
                          }}
                          className={emailError ? "border-destructive" : ""}
                        />
                        {emailError && <p className="text-xs text-destructive mt-1">{emailError}</p>}
                      </div>
                      <Input placeholder="Telefoonnummer (optioneel)" value={form.phone} onChange={(e) => set("phone", e.target.value)} />
                      <label className="flex items-start gap-3 cursor-pointer group pt-1">
                        <input type="checkbox" checked={form.wants_demo} onChange={(e) => set("wants_demo", e.target.checked)} className="mt-0.5 accent-primary w-4 h-4 cursor-pointer" />
                        <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                          <strong>Ja, ik wil graag gecontacteerd worden</strong> wanneer DutyBoost klaar is om meer details te delen.
                        </span>
                      </label>
                    </>
                  )}
                </div>
              )}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            {step > 0 && <Button variant="outline" onClick={() => goToStep(step - 1)} className="flex-1">Terug</Button>}
            {step === TOTAL_QUESTIONS - 1 && (
              <Button className="flex-1 gap-2" disabled={!canNext() || saving} onClick={handleSubmit}>
                {saving ? "Verzenden..." : "Versturen"} <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>

          <p className="text-center text-xs text-muted-foreground">Geen spam. Geen verkooppraatje.</p>
        </div>
      </div>

      <footer className="border-t border-border py-6 px-4">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <DutyBoostLogo height={200} />
          <p>© {new Date().getFullYear()} DutyBoost B.V.</p>
        </div>
      </footer>
    </div>
  );
}