import { useState } from "react";
import { base44 } from "@/api/base44Client";
import DutyBoostLogo from "../components/DutyBoostLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, ArrowRight, Lightbulb, MessageSquare, FlaskConical } from "lucide-react";

const TOTAL_QUESTIONS = 6;

const COMPANY_TYPES = ["Reisbureau", "Luchtvaartmaatschappij", "Touroperator", "OTA (Online Reisagentschap)", "Hotel", "Autoverhuur"];
const BOOKING_VOLUMES = ["Minder dan 500", "500 – 2.000", "2.000 – 10.000", "10.000+"];
const LOYALTY_OPTIONS = ["Geen", "Punten / Miles", "Kortingen", "Partnervoordelen", "Anders"];
const INTEREST_OPTIONS = [
  "Zeer geïnteresseerd – ik doe mee aan een pilotprogramma",
  "Geïnteresseerd – ik wil eerst meer weten",
  "Nieuwsgierig – nog aan het evalueren",
  "Nog niet zeker",
];
const COMMISSION_OPTIONS = [
  "Ja, zeer aantrekkelijk",
  "Enigszins aantrekkelijk",
  "Meer details nodig",
  "Geen prioriteit",
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

export default function TravelPartnerSurveyNL() {
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
    if (step === 5) return form.company_name.trim() !== "";
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
        <h1 className="text-3xl font-heading font-bold">Bedankt{form.full_name ? `, ${form.full_name.split(" ")[0]}` : ""}!</h1>
        <p className="text-muted-foreground max-w-md leading-relaxed">
          Jouw eerlijke input is precies wat we nodig hebben om te beslissen of DutyBoost de moeite waard is om te bouwen.
          {form.wants_demo && " We nemen binnenkort contact op om een kort gesprek in te plannen."}
        </p>
        <div className="bg-amber-50 border border-amber-200 rounded-2xl px-6 py-5 max-w-sm text-left">
          <p className="text-sm font-semibold text-amber-800">Wat gebeurt er met jouw input?</p>
          <ul className="mt-3 space-y-2 text-sm text-amber-700 list-none">
            <li>📋 We bundelen de reacties uit de hele sector</li>
            <li>🔍 We analyseren of het model echte interesse heeft in de industrie</li>
            <li>{form.wants_demo ? "📞 We nemen contact op voor een gesprek" : "📬 We houden je op de hoogte van onze beslissing"}</li>
          </ul>
        </div>
        <p className="text-xs text-muted-foreground max-w-xs">Er bestaat nog geen product — als genoeg partners dit model valideren, gaan we verder. Jij bent een van de eersten die het weet.</p>
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

      {/* Hero banner – only show on question 1 */}
      {step === 0 && (
        <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/5 border-b border-border">
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-4xl mx-auto px-4 py-14 sm:py-20 relative">
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
              <FlaskConical className="w-3 h-3" /> Modelvalidatie · Alleen voor reispartners
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold tracking-tight leading-tight max-w-3xl">
              We valideren een nieuw model —{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                en we hebben jouw eerlijke mening nodig
              </span>
            </h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-2xl leading-relaxed">
              <strong>DutyBoost</strong> is een model dat we valideren binnen de reissector. Het model: als reispartner bied je jouw reizigers een luchthavenshopping-voordeel aan — en in ruil daarvoor verdien je een commissie op elke aankoop die zij doen.
            </p>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl leading-relaxed">
              We willen begrijpen of er binnen de sector interesse is in dit type revenue share model, en of het daadwerkelijk waarde zou creëren voor jouw bedrijf.
            </p>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: Lightbulb, label: "Het model", desc: "Reizigers krijgen een luchthavenshopping-voordeel via hun reispartner." },
                { icon: MessageSquare, label: "Jouw rol", desc: "Als reispartner ontvang je een commissie op elke besteding van de reizigers die jij naar de luchthaven stuurt." },
                { icon: FlaskConical, label: "Wat we valideren", desc: "Of dit revenue share model voldoende interesse heeft om verder te ontwikkelen." },
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
              5 korte vragen — jouw antwoorden bepalen direct of we dit bouwen.
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
              <span>Vraag {step + 1} van {TOTAL_QUESTIONS}</span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${((step + 1) / TOTAL_QUESTIONS) * 100}%` }}
              />
            </div>
          </div>

          {/* Step 0 – company type */}
          {step === 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-heading font-bold">Wat voor type reisbedrijf ben je?</h2>
              <p className="text-muted-foreground text-sm">Dit helpt ons begrijpen welke reispartners het meeste baat zouden hebben bij een commissiemodel op luchthavenshopping.</p>
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
              <h2 className="text-2xl font-heading font-bold">Hoeveel boekingen verwerk je per maand?</h2>
              <p className="text-muted-foreground text-sm">Dit helpt ons inschatten wat de potentiële commissie-inkomsten voor jou zouden kunnen zijn op basis van jouw boekingsvolume.</p>
              <div className="space-y-2">
                {BOOKING_VOLUMES.map((v) => (
                  <OptionButton key={v} label={v} selected={form.annual_bookings === v} onClick={() => set("annual_bookings", v)} />
                ))}
              </div>
              {form.annual_bookings === "2.000 – 10.000" || form.annual_bookings === "10.000+" ? (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800 font-medium">
                  💡 Op deze schaal kan jouw input bijzonder waardevol zijn — we horen graag jouw perspectief.
                </div>
              ) : null}
            </div>
          )}

          {/* Step 2 – current loyalty */}
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-heading font-bold">Wat is jouw huidige aanpak voor reizigerslojaliteit?</h2>
              <p className="text-muted-foreground text-sm">We onderzoeken of dit model een aanvulling is op jouw huidige aanpak — en of een extra inkomstenstroom via luchthavenshopping aantrekkelijk is naast jouw bestaande loyaliteitsstrategie.</p>
              <div className="space-y-2">
                {LOYALTY_OPTIONS.map((o) => (
                  <OptionButton key={o} label={o} selected={form.current_loyalty === o} onClick={() => set("current_loyalty", o)} />
                ))}
              </div>
              {form.current_loyalty === "Anders" && (
                <div className="space-y-2 pt-1">
                  <label className="text-sm font-medium">Licht toe</label>
                  <textarea
                    className="w-full rounded-xl border border-input bg-card px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/40"
                    rows={3}
                    placeholder="Hoe ga je momenteel om met reizigerslojaliteit?"
                    value={form.loyalty_other || ""}
                    onChange={(e) => set("loyalty_other", e.target.value)}
                  />
                </div>
              )}
              <div className="space-y-2 pt-2">
                <label className="text-sm font-medium">Wat is jouw grootste uitdaging met klantentrouw?</label>
                <textarea
                  className="w-full rounded-xl border border-input bg-card px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/40"
                  rows={3}
                  placeholder="bijv. lage herboekingspercentages, hoge kosten van beloningsprogramma's..."
                  value={form.biggest_challenge}
                  onChange={(e) => set("biggest_challenge", e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Step 3 – fit */}
          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-heading font-bold">Hoe sta je tegenover dit model?</h2>
              <p className="text-muted-foreground text-sm">Op basis van wat je hebt gedeeld: reispartners bieden hun reizigers een luchthavenshopping-voordeel aan en ontvangen een commissie op elke besteding. Wat is jouw eerste reactie op dit model?</p>
              <div className="space-y-2">
                {INTEREST_OPTIONS.map((o) => (
                  <OptionButton key={o} label={o} selected={form.interest_level === o} onClick={() => set("interest_level", o)} />
                ))}
              </div>
            </div>
          )}

          {/* Step 4 – commission */}
          {step === 4 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-heading font-bold">DutyBoost werkt via een revenue share model: op alle aankopen boven de €70 die jouw reizigers doen op de luchthaven, ontvang je een commissie. Hoe aantrekkelijk vind je dit voor jouw bedrijf?</h2>
              <div className="space-y-2">
                {COMMISSION_OPTIONS.map((o) => (
                  <OptionButton key={o} label={o} selected={form.commission_attractive === o} onClick={() => set("commission_attractive", o)} />
                ))}
              </div>
            </div>
          )}

          {/* Step 5 – contact */}
          {step === 5 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-heading font-bold">Laatste vraag — wie ben je?</h2>
              <p className="text-muted-foreground text-sm">Als je geïnteresseerd bent in een nieuwe passieve maar interessante inkomstenstroom, laat dan je contactgegevens achter en we nemen contact met je op zodra we lanceren.</p>
              <div className="space-y-3">
                <Input placeholder="Volledige naam" value={form.full_name} onChange={(e) => set("full_name", e.target.value)} />
                <Input placeholder="Zakelijk e-mailadres" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} />
                <div className="relative">
                  <Input placeholder="Bedrijfsnaam" value={form.company_name} onChange={(e) => set("company_name", e.target.value)} />
                  <span className="absolute -top-1.5 -right-1.5 text-red-500 font-bold text-base leading-none">*</span>
                </div>
                <Input placeholder="Telefoonnummer (optioneel)" value={form.phone} onChange={(e) => set("phone", e.target.value)} />
              </div>
              <label className="flex items-start gap-3 cursor-pointer group pt-2">
                <input
                  type="checkbox"
                  checked={form.wants_demo}
                  onChange={(e) => set("wants_demo", e.target.checked)}
                  className="mt-0.5 accent-primary w-4 h-4 cursor-pointer"
                />
                <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                  <strong>Ja, ik wil graag een kort gesprek</strong> — ik deel mijn gedachten graag en doe mee aan het validatieproces.
                </span>
              </label>
            </div>
          )}

          {/* Navigation */}
          <div className="flex gap-3 pt-2">
            {step > 0 && (
              <Button variant="outline" onClick={() => goToStep(step - 1)} className="flex-1">
                Terug
              </Button>
            )}
            {step < TOTAL_QUESTIONS - 1 ? (
              <Button
                className="flex-1 gap-2"
                disabled={!canNext()}
                onClick={() => goToStep(step + 1)}
              >
                Verder <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                className="flex-1 gap-2"
                disabled={!canNext() || saving}
                onClick={handleSubmit}
              >
                {saving ? "Verzenden..." : "Verstuur mijn input"} <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>

          <p className="text-center text-xs text-muted-foreground">
            Geen spam. Geen verkooppraatje. Gewoon eerlijke marktvalidatie — jouw input bepaalt direct of we dit bouwen.
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