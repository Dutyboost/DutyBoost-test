import { useState } from "react";
import { base44 } from "@/api/base44Client";
import DutyBoostLogo from "../components/DutyBoostLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, ArrowRight, Lightbulb, MessageSquare, FlaskConical } from "lucide-react";

const TOTAL_QUESTIONS = 7;

const SNIPPET_OPTIONS = [
  "Sì – un semplice snippet sulla nostra pagina di conferma sembra molto fattibile",
  "Forse – dipende da quanto è semplice l'integrazione",
  "Improbabile – la nostra configurazione tecnica lo rende difficile",
  "No – non gestiamo la nostra pagina di conferma prenotazione",
];

const COMPANY_TYPES = ["Agenzia di viaggi", "Compagnia aerea", "Tour operator", "OTA (Agenzia di viaggi online)", "Hotel", "Noleggio auto"];
const BOOKING_VOLUMES = ["Meno di 500", "500 – 2.000", "2.000 – 10.000", "10.000+"];
const LOYALTY_OPTIONS = ["Nessuno", "Punti / Miglia", "Sconti", "Vantaggi partner", "Altro"];
const INTEREST_OPTIONS = [
  "Molto interessato – parteciperei a un programma pilota",
  "Interessato – voglio prima saperne di più",
  "Curioso – sto ancora valutando il modello",
  "Non ancora sicuro",
];
const COMMISSION_OPTIONS = [
  "Sì, molto attraente",
  "Abbastanza attraente",
  "Ho bisogno di maggiori dettagli",
  "Non è una priorità",
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

export default function TravelPartnerSurveyIT() {
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
    snippet_willingness: "",
    wants_demo: false,
    phone: "",
    loyalty_other: "",
  });

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

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
    if (step === 6) return form.company_name.trim() !== "";
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
        <h1 className="text-3xl font-heading font-bold">Grazie{form.full_name ? `, ${form.full_name.split(" ")[0]}` : ""}!</h1>
        <p className="text-muted-foreground max-w-md leading-relaxed">
          Il tuo feedback onesto è esattamente ciò di cui abbiamo bisogno per decidere se DutyBoost vale la pena di essere sviluppato.
          {form.wants_demo && " Ti contatteremo presto per organizzare una breve conversazione."}
        </p>
        <div className="bg-amber-50 border border-amber-200 rounded-2xl px-6 py-5 max-w-sm text-left">
          <p className="text-sm font-semibold text-amber-800">Cosa facciamo con il tuo feedback?</p>
          <ul className="mt-3 space-y-2 text-sm text-amber-700 list-none">
            <li>📋 Aggreghiamo le risposte da tutto il settore</li>
            <li>🔍 Analizziamo se il modello ha un interesse reale nel settore</li>
            <li>{form.wants_demo ? "📞 Ti contatteremo per programmare una conversazione" : "📬 Ti aggiorneremo su ciò che decideremo di fare"}</li>
          </ul>
        </div>
        <p className="text-xs text-muted-foreground max-w-xs">Non esiste ancora alcun prodotto — se abbastanza partner del settore validano questo concetto, andremo avanti. Sarai tra i primi a saperlo.</p>
        <p className="text-xs text-muted-foreground">© 2026 DutyBoost. All Rights Reserved.</p>
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
              <FlaskConical className="w-3 h-3" /> Validazione del modello · Solo per partner di viaggio
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold tracking-tight leading-tight max-w-3xl">
              Una nuova fonte di reddito per i partner di viaggio —{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                vogliamo sapere se fa per te
              </span>
            </h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-2xl leading-relaxed">
              <strong>DutyBoost</strong> consente ai partner di viaggio di accedere a una nuova fonte di reddito. Stiamo validando se esiste un interesse reale nel settore — e il tuo feedback determina direttamente ciò che costruiamo.
            </p>

            <p className="mt-8 text-sm font-semibold text-foreground flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-primary" />
              5 domande rapide — le tue risposte determinano direttamente se lo costruiamo.
            </p>
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
              <p className="text-muted-foreground text-sm">Questo ci aiuta a capire quali partner di viaggio trarrebbero maggior beneficio da DutyBoost.</p>
              <div className="space-y-2">{COMPANY_TYPES.map((t) => <OptionButton key={t} label={t} selected={form.company_type === t} onClick={() => set("company_type", t)} />)}</div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-heading font-bold">Quante prenotazioni elabori al mese?</h2>
              <p className="text-muted-foreground text-sm">Questo ci aiuta a stimare la potenziale opportunità di reddito per te in base al tuo volume di prenotazioni.</p>
              <div className="space-y-2">{BOOKING_VOLUMES.map((v) => <OptionButton key={v} label={v} selected={form.annual_bookings === v} onClick={() => set("annual_bookings", v)} />)}</div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-heading font-bold">Qual è il tuo attuale approccio alla fidelizzazione dei viaggiatori?</h2>
              <p className="text-muted-foreground text-sm">Stiamo esplorando se una fonte di reddito aggiuntiva tramite DutyBoost è attraente accanto alla tua attuale strategia di fidelizzazione.</p>
              <div className="space-y-2">{LOYALTY_OPTIONS.map((o) => <OptionButton key={o} label={o} selected={form.current_loyalty === o} onClick={() => set("current_loyalty", o)} />)}</div>
              {form.current_loyalty === "Altro" && (
                <div className="space-y-2 pt-1">
                  <label className="text-sm font-medium">Per favore, spiega</label>
                  <textarea className="w-full rounded-xl border border-input bg-card px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/40" rows={3} placeholder="Come gestisci attualmente la fidelizzazione dei viaggiatori?" value={form.loyalty_other || ""} onChange={(e) => set("loyalty_other", e.target.value)} />
                </div>
              )}
              <div className="space-y-2 pt-2">
                <label className="text-sm font-medium">Qual è la tua sfida più grande con la fidelizzazione dei clienti?</label>
                <textarea className="w-full rounded-xl border border-input bg-card px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/40" rows={3} placeholder="es. bassi tassi di prenotazioni ripetute, alto costo dei programmi fedeltà..." value={form.biggest_challenge} onChange={(e) => set("biggest_challenge", e.target.value)} />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-heading font-bold">Cosa ne pensi di questo modello?</h2>
              <p className="text-muted-foreground text-sm">DutyBoost dà ai partner di viaggio accesso a una nuova fonte di reddito. Qual è la tua reazione iniziale?</p>
              <div className="space-y-2">{INTEREST_OPTIONS.map((o) => <OptionButton key={o} label={o} selected={form.interest_level === o} onClick={() => set("interest_level", o)} />)}</div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-heading font-bold">DutyBoost dà alla tua attività accesso a una nuova fonte di reddito. Quanto è attraente questa idea per la tua attività?</h2>
              <div className="space-y-2">{COMMISSION_OPTIONS.map((o) => <OptionButton key={o} label={o} selected={form.commission_attractive === o} onClick={() => set("commission_attractive", o)} />)}</div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-heading font-bold">DutyBoost si integra con il tuo flusso di prenotazione esistente tramite un semplice passaggio tecnico. Quanto sei aperto ad aggiungere una piccola integrazione al tuo processo di conferma prenotazione?</h2>
              <p className="text-muted-foreground text-sm">Nessuna modifica complessa necessaria — solo una leggera aggiunta al tuo flusso di conferma esistente.</p>
              <div className="space-y-2">{SNIPPET_OPTIONS.map((o) => <OptionButton key={o} label={o} selected={form.snippet_willingness === o} onClick={() => set("snippet_willingness", o)} />)}</div>
            </div>
          )}

          {step === 6 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-heading font-bold">Ultima domanda — chi sei?</h2>
              <p className="text-muted-foreground text-sm">Se sei interessato a una nuova fonte di reddito passiva ma interessante, lascia i tuoi contatti e ti contatteremo quando lanceremo.</p>
              <div className="space-y-3">
                <Input placeholder="Nome completo" value={form.full_name} onChange={(e) => set("full_name", e.target.value)} />
                <Input placeholder="Email di lavoro" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} />
                <Input placeholder="Nome dell'azienda *" value={form.company_name} onChange={(e) => set("company_name", e.target.value)} />
                <Input placeholder="Telefono" value={form.phone} onChange={(e) => set("phone", e.target.value)} />
              </div>
              <label className="flex items-start gap-3 cursor-pointer group pt-2">
                <input type="checkbox" checked={form.wants_demo} onChange={(e) => set("wants_demo", e.target.checked)} className="mt-0.5 accent-primary w-4 h-4 cursor-pointer" />
                <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                  <strong>Sì, vorrei che DutyBoost mi contattasse</strong> — sarei felice di partecipare al Pilot una volta lanciato.
                </span>
              </label>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            {step > 0 && <Button variant="outline" onClick={() => goToStep(step - 1)} className="flex-1">Indietro</Button>}
            {step < TOTAL_QUESTIONS - 1 ? (
              <Button className="flex-1 gap-2" disabled={!canNext()} onClick={() => goToStep(step + 1)}>
                Continua <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button className="flex-1 gap-2" disabled={!canNext() || saving} onClick={handleSubmit}>
                {saving ? "Invio in corso..." : "Invia il mio feedback"} <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>

          <p className="text-center text-xs text-muted-foreground">
            Niente spam. Nessun discorso di vendita. Solo una validazione onesta del mercato — il tuo feedback influenza direttamente se lo costruiamo.
          </p>
        </div>
      </div>

      <footer className="border-t border-border py-6 px-4">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <DutyBoostLogo height={130} />
          <p>© {new Date().getFullYear()} DutyBoost B.V. · The Travel Retail Conversion Layer</p>
        </div>
      </footer>
    </div>
  );
}