import { useState } from "react";
import { base44 } from "@/api/base44Client";
import DutyBoostLogo from "../components/DutyBoostLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, ArrowRight, Lightbulb, MessageSquare, FlaskConical } from "lucide-react";

const TOTAL_QUESTIONS = 7;

const SNIPPET_OPTIONS = [
  "Ja – ein einfaches Snippet auf unserer Bestätigungsseite klingt sehr machbar",
  "Möglicherweise – hängt davon ab, wie einfach die Integration ist",
  "Unwahrscheinlich – unser technisches Setup macht das schwierig",
  "Nein – wir kontrollieren unsere Buchungsbestätigungsseite nicht",
];

const COMPANY_TYPES = ["Reisebüro", "Fluggesellschaft", "Reiseveranstalter", "OTA (Online-Reisebüro)", "Hotel", "Autovermietung"];
const BOOKING_VOLUMES = ["Weniger als 500", "500 – 2.000", "2.000 – 10.000", "10.000+"];
const LOYALTY_OPTIONS = ["Keines", "Punkte / Meilen", "Rabatte", "Partnervorteile", "Sonstiges"];
const INTEREST_OPTIONS = [
  "Sehr interessiert – ich würde an einem Pilotprogramm teilnehmen",
  "Interessiert – ich möchte erst mehr erfahren",
  "Neugierig – ich bewerte das Modell noch",
  "Noch nicht sicher",
];
const COMMISSION_OPTIONS = [
  "Ja, sehr attraktiv",
  "Etwas attraktiv",
  "Ich benötige mehr Details",
  "Keine Priorität",
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

export default function TravelPartnerSurveyDE() {
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
        <h1 className="text-3xl font-heading font-bold">Vielen Dank{form.full_name ? `, ${form.full_name.split(" ")[0]}` : ""}!</h1>
        <p className="text-muted-foreground max-w-md leading-relaxed">
          Ihr ehrliches Feedback ist genau das, was wir brauchen, um zu entscheiden, ob DutyBoost es wert ist, gebaut zu werden.
          {form.wants_demo && " Wir werden uns bald melden, um ein kurzes Gespräch zu vereinbaren."}
        </p>
        <div className="bg-amber-50 border border-amber-200 rounded-2xl px-6 py-5 max-w-sm text-left">
          <p className="text-sm font-semibold text-amber-800">Was passiert mit Ihrem Feedback?</p>
          <ul className="mt-3 space-y-2 text-sm text-amber-700 list-none">
            <li>📋 Wir sammeln Antworten aus der gesamten Branche</li>
            <li>🔍 Wir analysieren, ob das Modell echtes Interesse in der Branche hat</li>
            <li>{form.wants_demo ? "📞 Wir melden uns, um ein Gespräch zu vereinbaren" : "📬 Wir informieren Sie über unsere nächsten Schritte"}</li>
          </ul>
        </div>
        <p className="text-xs text-muted-foreground max-w-xs">Es gibt noch kein Produkt — wenn genug Branchenpartner dieses Konzept validieren, machen wir weiter. Sie werden zu den Ersten gehören, die es erfahren.</p>
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
              <FlaskConical className="w-3 h-3" /> Modellvalidierung · Nur für Reisepartner
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold tracking-tight leading-tight max-w-3xl">
              Eine neue Einnahmequelle für Reisepartner —{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                wir möchten wissen, ob es zu Ihnen passt
              </span>
            </h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-2xl leading-relaxed">
              <strong>DutyBoost</strong> ermöglicht Reisepartnern den Zugang zu einer neuen Einnahmequelle. Wir validieren, ob echtes Interesse in der Branche besteht — und Ihre Meinung bestimmt direkt, was wir entwickeln.
            </p>

            <p className="mt-8 text-sm font-semibold text-foreground flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-primary" />
              5 kurze Fragen — Ihre Antworten bestimmen direkt, ob wir das umsetzen.
            </p>
          </div>
        </div>
      )}

      <div className="flex-1 flex items-start justify-center px-4 py-10">
        <div className="w-full max-w-xl space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Frage {step + 1} von {TOTAL_QUESTIONS}</span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${((step + 1) / TOTAL_QUESTIONS) * 100}%` }} />
            </div>
          </div>

          {step === 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-heading font-bold">Was für ein Reiseunternehmen sind Sie?</h2>
              <p className="text-muted-foreground text-sm">Das hilft uns zu verstehen, welche Reisepartner am meisten von DutyBoost profitieren würden.</p>
              <div className="space-y-2">{COMPANY_TYPES.map((t) => <OptionButton key={t} label={t} selected={form.company_type === t} onClick={() => set("company_type", t)} />)}</div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-heading font-bold">Wie viele Buchungen bearbeiten Sie pro Monat?</h2>
              <p className="text-muted-foreground text-sm">Das hilft uns einzuschätzen, wie groß die potenzielle Einnahmemöglichkeit für Sie basierend auf Ihrem Buchungsvolumen sein könnte.</p>
              <div className="space-y-2">{BOOKING_VOLUMES.map((v) => <OptionButton key={v} label={v} selected={form.annual_bookings === v} onClick={() => set("annual_bookings", v)} />)}</div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-heading font-bold">Was ist Ihr aktueller Ansatz zur Reisendenbindung?</h2>
              <p className="text-muted-foreground text-sm">Wir untersuchen, ob eine zusätzliche Einnahmequelle durch DutyBoost attraktiv ist — neben Ihrer bestehenden Kundenbindungsstrategie.</p>
              <div className="space-y-2">{LOYALTY_OPTIONS.map((o) => <OptionButton key={o} label={o} selected={form.current_loyalty === o} onClick={() => set("current_loyalty", o)} />)}</div>
              {form.current_loyalty === "Sonstiges" && (
                <div className="space-y-2 pt-1">
                  <label className="text-sm font-medium">Bitte erläutern Sie</label>
                  <textarea className="w-full rounded-xl border border-input bg-card px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/40" rows={3} placeholder="Wie gehen Sie aktuell mit der Reisendenbindung um?" value={form.loyalty_other || ""} onChange={(e) => set("loyalty_other", e.target.value)} />
                </div>
              )}
              <div className="space-y-2 pt-2">
                <label className="text-sm font-medium">Was ist Ihre größte Herausforderung bei der Kundenbindung?</label>
                <textarea className="w-full rounded-xl border border-input bg-card px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/40" rows={3} placeholder="z.B. niedrige Wiederbuchungsraten, hohe Kosten für Treueprogramme..." value={form.biggest_challenge} onChange={(e) => set("biggest_challenge", e.target.value)} />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-heading font-bold">Wie stehen Sie zu diesem Modell?</h2>
              <p className="text-muted-foreground text-sm">DutyBoost gibt Reisepartnern Zugang zu einer neuen Einnahmequelle. Was ist Ihre erste Reaktion?</p>
              <div className="space-y-2">{INTEREST_OPTIONS.map((o) => <OptionButton key={o} label={o} selected={form.interest_level === o} onClick={() => set("interest_level", o)} />)}</div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-heading font-bold">DutyBoost gibt Ihrem Unternehmen Zugang zu einer neuen Einnahmequelle. Wie attraktiv finden Sie diese Idee für Ihr Unternehmen?</h2>
              <div className="space-y-2">{COMMISSION_OPTIONS.map((o) => <OptionButton key={o} label={o} selected={form.commission_attractive === o} onClick={() => set("commission_attractive", o)} />)}</div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-heading font-bold">DutyBoost integriert sich über einen einfachen technischen Schritt in Ihren bestehenden Buchungsablauf. Wie offen sind Sie dafür, eine kleine Integration in Ihren Buchungsbestätigungsprozess hinzuzufügen?</h2>
              <p className="text-muted-foreground text-sm">Keine komplexen Änderungen erforderlich — nur eine leichtgewichtige Ergänzung Ihres bestehenden Bestätigungsablaufs.</p>
              <div className="space-y-2">{SNIPPET_OPTIONS.map((o) => <OptionButton key={o} label={o} selected={form.snippet_willingness === o} onClick={() => set("snippet_willingness", o)} />)}</div>
            </div>
          )}

          {step === 6 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-heading font-bold">Letzte Frage — wer sind Sie?</h2>
              <p className="text-muted-foreground text-sm">Wenn Sie an einer neuen passiven, aber interessanten Einnahmequelle interessiert sind, hinterlassen Sie Ihre Kontaktdaten und wir melden uns bei Ihnen, wenn wir starten.</p>
              <div className="space-y-3">
                <Input placeholder="Vollständiger Name" value={form.full_name} onChange={(e) => set("full_name", e.target.value)} />
                <Input placeholder="Geschäftliche E-Mail" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} />
                <Input placeholder="Unternehmensname *" value={form.company_name} onChange={(e) => set("company_name", e.target.value)} />
                <Input placeholder="Telefon" value={form.phone} onChange={(e) => set("phone", e.target.value)} />
              </div>
              <label className="flex items-start gap-3 cursor-pointer group pt-2">
                <input type="checkbox" checked={form.wants_demo} onChange={(e) => set("wants_demo", e.target.checked)} className="mt-0.5 accent-primary w-4 h-4 cursor-pointer" />
                <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                  <strong>Ja, ich möchte, dass DutyBoost mich kontaktiert</strong> — ich würde gerne am Pilot teilnehmen, sobald er startet.
                </span>
              </label>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            {step > 0 && <Button variant="outline" onClick={() => goToStep(step - 1)} className="flex-1">Zurück</Button>}
            {step < TOTAL_QUESTIONS - 1 ? (
              <Button className="flex-1 gap-2" disabled={!canNext()} onClick={() => goToStep(step + 1)}>
                Weiter <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button className="flex-1 gap-2" disabled={!canNext() || saving} onClick={handleSubmit}>
                {saving ? "Wird gesendet..." : "Mein Feedback einreichen"} <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>

          <p className="text-center text-xs text-muted-foreground">
            Kein Spam. Kein Verkaufsgespräch. Nur ehrliche Marktvalidierung — Ihr Feedback beeinflusst direkt, ob wir das umsetzen.
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