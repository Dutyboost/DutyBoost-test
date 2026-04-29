import { useState } from "react";
import { base44 } from "@/api/base44Client";
import DutyBoostLogo from "../components/DutyBoostLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, ArrowRight, Sparkles } from "lucide-react";

const TOTAL_QUESTIONS = 7;

const COMPANY_TYPES = ["Agenzia di viaggi", "Compagnia aerea", "Tour operator", "OTA (Agenzia di viaggi online)", "Hotel", "Noleggio auto"];
const BOOKING_VOLUMES = ["Meno di 500", "500 – 2.000", "2.000 – 10.000", "10.000+"];
const LOYALTY_OPTIONS = ["Nessuno", "Punti / Miglia", "Sconti", "Vantaggi partner", "Altro"];
const INTEREST_OPTIONS = [
  "Molto interessato – ci sono",
  "Interessato – voglio prima saperne di più",
  "Curioso – sto ancora valutando",
  "Non ancora sicuro",
];
const COMMISSION_OPTIONS = [
  "Sì, molto attraente",
  "Abbastanza attraente",
  "Ho bisogno di maggiori dettagli",
  "Non è una priorità al momento",
];
const SNIPPET_OPTIONS = [
  "Sì – aggiungere qualcosa alla nostra pagina di conferma è molto fattibile",
  "Forse – dipende da quanto è semplice",
  "Improbabile – la nostra configurazione tecnica lo rende difficile",
  "No – non controlliamo quella pagina",
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

export default function TravelPartnerSurveyIT() {
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
    const hasExclusive = form.current_loyalty.includes("Nessuno") || form.current_loyalty.includes("Altro");
    const isExclusive = option === "Nessuno" || option === "Altro";
    const hasRegular = form.current_loyalty.some(o => ["Punti / Miglia", "Sconti", "Vantaggi per i partner"].includes(o));

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
      setWebsiteError("Questo sito web non può essere inviato. Per favore inserisci un sito web aziendale valido.");
      return;
    }
    
    setVerifyingWebsite(true);
    setWebsiteError("");
    const exists = await checkDomainExists(val);
    setVerifyingWebsite(false);
    if (!exists) {
      setWebsiteValid(false);
      setWebsiteError("Non siamo riusciti a verificare questo sito web. Inserisci un sito web aziendale reale (es. www.tuaazienda.it).");
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
      const submitData = {
        ...form,
        current_loyalty: form.current_loyalty.join(", ")
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
        <h1 className="text-3xl font-heading font-bold">Grazie{form.full_name ? `, ${form.full_name.split(" ")[0]}` : ""}!</h1>
        <p className="text-muted-foreground max-w-md leading-relaxed">
          {form.wants_demo ? "Il tuo feedback è molto prezioso. Ti contatteremo presto." : "Il tuo feedback è molto prezioso. Rimani sintonizzato per il nostro lancio."}
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
              Stiamo validando una nuova opportunità di ricavi per il settore dei viaggi.{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                La tua opinione è importante per noi.
              </span>
            </h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Stiamo validando una nuova opportunità di ricavi per il settore dei viaggi. Non siamo ancora pronti a condividere tutti i dettagli — ma vogliamo sapere se c'è interesse prima di andare avanti.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">2 minuti · 7 domande · Senza impegno.</p>
          </div>
        </div>
      )}

      <div className="flex-1 flex items-start justify-center px-4 py-10">
        <div className="w-full max-w-xl space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Domanda {step + 1} di {TOTAL_QUESTIONS}</span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${((step + 1) / TOTAL_QUESTIONS) * 100}%` }} />
            </div>
          </div>

          {step === 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-heading font-bold">Che tipo di azienda di viaggi sei?</h2>
              <div className="space-y-2">{COMPANY_TYPES.map((t) => <OptionButton key={t} label={t} selected={form.company_type === t} onClick={() => set("company_type", t)} onSelect={() => goToStep(1)} />)}</div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-heading font-bold">Quante prenotazioni elabori al mese?</h2>
              <div className="space-y-2">{BOOKING_VOLUMES.map((v) => <OptionButton key={v} label={v} selected={form.annual_bookings === v} onClick={() => set("annual_bookings", v)} onSelect={() => goToStep(2)} />)}</div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-heading font-bold">Offri attualmente vantaggi di fidelizzazione ai tuoi viaggiatori?</h2>
              <p className="text-sm text-muted-foreground">Seleziona tutto ciò che si applica</p>
              <div className="space-y-2">
                {LOYALTY_OPTIONS.map((o) => {
                  const isSelected = form.current_loyalty.includes(o);
                  const isExclusive = o === "Nessuno" || o === "Altro";
                  const hasRegular = form.current_loyalty.some(opt => ["Punti / Miglia", "Sconti", "Vantaggi per i partner"].includes(opt));
                  const disabled = isExclusive ? hasRegular : form.current_loyalty.includes("Nessuno") || form.current_loyalty.includes("Altro");
                  
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
              {form.current_loyalty.includes("Altro") && (
                <textarea className="w-full rounded-xl border border-input bg-card px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/40" rows={2} placeholder="Descrivi brevemente..." value={form.loyalty_other || ""} onChange={(e) => set("loyalty_other", e.target.value)} />
              )}
              <div className="space-y-2 pt-1">
                <label className="text-sm text-muted-foreground">Qual è la tua sfida principale con la fidelizzazione dei clienti? (opzionale)</label>
                <textarea className="w-full rounded-xl border border-input bg-card px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/40" rows={2} placeholder="Opzionale..." value={form.biggest_challenge} onChange={(e) => set("biggest_challenge", e.target.value)} />
              </div>
              <Button className="w-full gap-2 mt-4" onClick={() => goToStep(3)}>
                Continua <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-heading font-bold">Se esistesse un modo semplice e gratuito per aggiungere una nuova fonte di reddito alla tua attività, quanto saresti interessato?</h2>
              <div className="space-y-2">{INTEREST_OPTIONS.map((o) => <OptionButton key={o} label={o} selected={form.interest_level === o} onClick={() => set("interest_level", o)} onSelect={() => goToStep(4)} />)}</div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-heading font-bold">Quanto è importante per la tua attività generare ricavi aggiuntivi dalle prenotazioni esistenti?</h2>
              <div className="space-y-2">{COMMISSION_OPTIONS.map((o) => <OptionButton key={o} label={o} selected={form.commission_attractive === o} onClick={() => set("commission_attractive", o)} onSelect={() => goToStep(5)} />)}</div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-heading font-bold">Quanto sei aperto a piccole aggiunte tecniche nel tuo passaggio finale di conferma prenotazione che aiuteranno a scatenare la nuova fonte di reddito?</h2>
              <div className="space-y-2">{SNIPPET_OPTIONS.map((o) => <OptionButton key={o} label={o} selected={form.snippet_willingness === o} onClick={() => set("snippet_willingness", o)} onSelect={() => goToStep(6)} />)}</div>
            </div>
          )}

          {step === 6 && (
            <div className="space-y-5">
              <h2 className="text-2xl font-heading font-bold">Ultimo passo — Come desidera rispondere?</h2>
              <p className="text-muted-foreground text-sm">Può condividere i Suoi dati di contatto per un follow-up, oppure rispondere in modo anonimo. In entrambi i casi, il Suo contributo è prezioso.</p>

              <div className="grid grid-cols-1 gap-3">
                <button type="button" onClick={() => setAnonymous(false)}
                  className={`w-full text-left px-4 py-4 rounded-xl border text-sm font-medium transition-all ${anonymous === false ? "bg-primary text-primary-foreground border-primary shadow-md" : "bg-card border-border hover:border-primary/50 hover:bg-primary/5 text-foreground"}`}>
                  <div className="font-semibold">Condividi i miei dati di contatto</div>
                  <div className={`text-xs mt-0.5 ${anonymous === false ? "text-primary-foreground/80" : "text-muted-foreground"}`}>Voglio restare aggiornato ed essere contattato al lancio di DutyBoost.</div>
                </button>
                <button type="button" onClick={() => setAnonymous(true)}
                  className={`w-full text-left px-4 py-4 rounded-xl border text-sm font-medium transition-all ${anonymous === true ? "bg-primary text-primary-foreground border-primary shadow-md" : "bg-card border-border hover:border-primary/50 hover:bg-primary/5 text-foreground"}`}>
                  <div className="font-semibold">Risposta anonima</div>
                  <div className={`text-xs mt-0.5 ${anonymous === true ? "text-primary-foreground/80" : "text-muted-foreground"}`}>Condivido solo il nome dell'azienda e il sito web. Nessun dato personale.</div>
                </button>
              </div>

              {anonymous !== null && (
                <div className="space-y-3 pt-1">
                  <Input placeholder="Nome dell'azienda *" value={form.company_name} onChange={(e) => set("company_name", e.target.value)} />
                  <div>
                    <Input placeholder="Sito web aziendale * (es. www.latuaazienda.it)" value={form.company_website}
                      onChange={(e) => { set("company_website", e.target.value); setWebsiteValid(false); setWebsiteError(""); }}
                      onBlur={handleWebsiteBlur}
                      className={websiteError ? "border-destructive" : websiteValid ? "border-green-500" : ""}
                    />
                    {verifyingWebsite && <p className="text-xs text-muted-foreground mt-1">Verifica del sito web in corso...</p>}
                    {websiteError && <p className="text-xs text-destructive mt-1">{websiteError}</p>}
                    {websiteValid && !verifyingWebsite && <p className="text-xs text-green-600 mt-1">✓ Sito web verificato</p>}
                  </div>

                  {anonymous === false && (
                    <>
                      <Input placeholder="Nome completo *" value={form.full_name} onChange={(e) => set("full_name", e.target.value)} />
                      <div>
                        <Input placeholder="Email di lavoro *" type="email" value={form.email}
                          onChange={(e) => {
                            set("email", e.target.value);
                            if (e.target.value && isPersonalEmail(e.target.value)) {
                              setEmailError("Utilizza un indirizzo email professionale/aziendale");
                            } else { setEmailError(""); }
                          }}
                          className={emailError ? "border-destructive" : ""}
                        />
                        {emailError && <p className="text-xs text-destructive mt-1">{emailError}</p>}
                      </div>
                      <Input placeholder="Telefono (opzionale)" value={form.phone} onChange={(e) => set("phone", e.target.value)} />
                      <label className="flex items-start gap-3 cursor-pointer group pt-1">
                        <input type="checkbox" checked={form.wants_demo} onChange={(e) => set("wants_demo", e.target.checked)} className="mt-0.5 accent-primary w-4 h-4 cursor-pointer" />
                        <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                          <strong>Sì, vorrei essere contattato</strong> quando DutyBoost sarà pronto a condividere altri dettagli.
                        </span>
                      </label>
                    </>
                  )}
                </div>
              )}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            {step > 0 && <Button variant="outline" onClick={() => goToStep(step - 1)} className="flex-1">Indietro</Button>}
            {step === TOTAL_QUESTIONS - 1 && (
              <Button className="flex-1 gap-2" disabled={!canNext() || saving} onClick={handleSubmit}>
                {saving ? "Invio..." : "Invia"} <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>

          <p className="text-center text-xs text-muted-foreground">Niente spam. Nessun discorso di vendita.</p>
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