import { useState } from "react";
import { base44 } from "@/api/base44Client";
import DutyBoostLogo from "../components/DutyBoostLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, ArrowRight, Lightbulb, MessageSquare, FlaskConical } from "lucide-react";

const TOTAL_QUESTIONS = 7;

const SNIPPET_OPTIONS = [
  "Oui – un simple snippet sur notre page de confirmation semble tout à fait faisable",
  "Peut-être – cela dépend de la facilité d'intégration",
  "Peu probable – notre configuration technique rend cela difficile",
  "Non – nous ne contrôlons pas notre page de confirmation de réservation",
];

const COMPANY_TYPES = ["Agence de voyages", "Compagnie aérienne", "Tour-opérateur", "OTA (Agence de voyages en ligne)", "Hôtel", "Location de voitures"];
const BOOKING_VOLUMES = ["Moins de 500", "500 – 2 000", "2 000 – 10 000", "10 000+"];
const LOYALTY_OPTIONS = ["Aucun", "Points / Miles", "Réductions", "Avantages partenaires", "Autre"];
const INTEREST_OPTIONS = [
  "Très intéressé – je participerais à un programme pilote",
  "Intéressé – je veux d'abord en savoir plus",
  "Curieux – j'évalue encore le modèle",
  "Pas encore sûr",
];
const COMMISSION_OPTIONS = [
  "Oui, très attractif",
  "Assez attractif",
  "J'ai besoin de plus de détails",
  "Pas une priorité",
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

export default function TravelPartnerSurveyFR() {
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
        <h1 className="text-3xl font-heading font-bold">Merci{form.full_name ? `, ${form.full_name.split(" ")[0]}` : ""} !</h1>
        <p className="text-muted-foreground max-w-md leading-relaxed">
          Votre retour honnête est exactement ce dont nous avons besoin pour décider si DutyBoost mérite d'être développé.
          {form.wants_demo && " Nous vous contacterons bientôt pour organiser une courte conversation."}
        </p>
        <div className="bg-amber-50 border border-amber-200 rounded-2xl px-6 py-5 max-w-sm text-left">
          <p className="text-sm font-semibold text-amber-800">Que faisons-nous de votre retour ?</p>
          <ul className="mt-3 space-y-2 text-sm text-amber-700 list-none">
            <li>📋 Nous agrégeons les réponses de toute l'industrie</li>
            <li>🔍 Nous analysons si le modèle suscite un intérêt réel dans le secteur</li>
            <li>{form.wants_demo ? "📞 Nous vous contacterons pour planifier un échange" : "📬 Nous vous tiendrons informé de nos décisions"}</li>
          </ul>
        </div>
        <p className="text-xs text-muted-foreground max-w-xs">Aucun produit n'existe encore — si suffisamment de partenaires valident ce concept, nous irons de l'avant. Vous serez parmi les premiers informés.</p>
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
              <FlaskConical className="w-3 h-3" /> Validation du modèle · Partenaires de voyage uniquement
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold tracking-tight leading-tight max-w-3xl">
              Une nouvelle source de revenus pour les partenaires de voyage —{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                nous voulons savoir si c'est fait pour vous
              </span>
            </h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-2xl leading-relaxed">
              <strong>DutyBoost</strong> permet aux partenaires de voyage de débloquer une nouvelle source de revenus. Nous validons s'il existe un intérêt réel dans le secteur — et votre avis détermine directement ce que nous construisons.
            </p>

            <p className="mt-8 text-sm font-semibold text-foreground flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-primary" />
              5 questions rapides — vos réponses déterminent directement si nous construisons cela.
            </p>
          </div>
        </div>
      )}

      <div className="flex-1 flex items-start justify-center px-4 py-10">
        <div className="w-full max-w-xl space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Question {step + 1} sur {TOTAL_QUESTIONS}</span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${((step + 1) / TOTAL_QUESTIONS) * 100}%` }} />
            </div>
          </div>

          {step === 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-heading font-bold">Quel type d'entreprise de voyage êtes-vous ?</h2>
              <p className="text-muted-foreground text-sm">Cela nous aide à comprendre quels partenaires de voyage bénéficieraient le plus de DutyBoost.</p>
              <div className="space-y-2">{COMPANY_TYPES.map((t) => <OptionButton key={t} label={t} selected={form.company_type === t} onClick={() => set("company_type", t)} />)}</div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-heading font-bold">Combien de réservations traitez-vous par mois ?</h2>
              <p className="text-muted-foreground text-sm">Cela nous aide à estimer l'opportunité de revenus potentielle pour vous en fonction de votre volume de réservations.</p>
              <div className="space-y-2">{BOOKING_VOLUMES.map((v) => <OptionButton key={v} label={v} selected={form.annual_bookings === v} onClick={() => set("annual_bookings", v)} />)}</div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-heading font-bold">Quelle est votre approche actuelle de la fidélisation des voyageurs ?</h2>
              <p className="text-muted-foreground text-sm">Nous explorons si une source de revenus supplémentaire via DutyBoost est attrayante en complément de votre stratégie de fidélisation actuelle.</p>
              <div className="space-y-2">{LOYALTY_OPTIONS.map((o) => <OptionButton key={o} label={o} selected={form.current_loyalty === o} onClick={() => set("current_loyalty", o)} />)}</div>
              {form.current_loyalty === "Autre" && (
                <div className="space-y-2 pt-1">
                  <label className="text-sm font-medium">Veuillez préciser</label>
                  <textarea className="w-full rounded-xl border border-input bg-card px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/40" rows={3} placeholder="Comment gérez-vous actuellement la fidélisation des voyageurs ?" value={form.loyalty_other || ""} onChange={(e) => set("loyalty_other", e.target.value)} />
                </div>
              )}
              <div className="space-y-2 pt-2">
                <label className="text-sm font-medium">Quel est votre plus grand défi en matière de fidélisation client ?</label>
                <textarea className="w-full rounded-xl border border-input bg-card px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/40" rows={3} placeholder="ex. faibles taux de réservations répétées, coût élevé des programmes de fidélité..." value={form.biggest_challenge} onChange={(e) => set("biggest_challenge", e.target.value)} />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-heading font-bold">Que pensez-vous de ce modèle ?</h2>
              <p className="text-muted-foreground text-sm">DutyBoost donne aux partenaires de voyage accès à une nouvelle source de revenus. Quelle est votre réaction initiale ?</p>
              <div className="space-y-2">{INTEREST_OPTIONS.map((o) => <OptionButton key={o} label={o} selected={form.interest_level === o} onClick={() => set("interest_level", o)} />)}</div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-heading font-bold">DutyBoost donne à votre entreprise accès à une nouvelle source de revenus. Dans quelle mesure cette idée est-elle attractive pour votre activité ?</h2>
              <div className="space-y-2">{COMMISSION_OPTIONS.map((o) => <OptionButton key={o} label={o} selected={form.commission_attractive === o} onClick={() => set("commission_attractive", o)} />)}</div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-heading font-bold">DutyBoost s'intègre à votre flux de réservation existant via une simple étape technique. Dans quelle mesure seriez-vous ouvert à l'ajout d'une petite intégration à votre processus de confirmation de réservation ?</h2>
              <p className="text-muted-foreground text-sm">Aucune modification complexe requise — juste un ajout léger à votre flux de confirmation existant.</p>
              <div className="space-y-2">{SNIPPET_OPTIONS.map((o) => <OptionButton key={o} label={o} selected={form.snippet_willingness === o} onClick={() => set("snippet_willingness", o)} />)}</div>
            </div>
          )}

          {step === 6 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-heading font-bold">Dernière question — qui êtes-vous ?</h2>
              <p className="text-muted-foreground text-sm">Si vous êtes intéressé par une nouvelle source de revenus passifs mais intéressante, laissez vos coordonnées et nous vous contacterons lors de notre lancement.</p>
              <div className="space-y-3">
                <Input placeholder="Nom complet" value={form.full_name} onChange={(e) => set("full_name", e.target.value)} />
                <Input placeholder="E-mail professionnel" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} />
                <Input placeholder="Nom de l'entreprise *" value={form.company_name} onChange={(e) => set("company_name", e.target.value)} />
                <Input placeholder="Téléphone" value={form.phone} onChange={(e) => set("phone", e.target.value)} />
              </div>
              <label className="flex items-start gap-3 cursor-pointer group pt-2">
                <input type="checkbox" checked={form.wants_demo} onChange={(e) => set("wants_demo", e.target.checked)} className="mt-0.5 accent-primary w-4 h-4 cursor-pointer" />
                <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                  <strong>Oui, je souhaite que DutyBoost me contacte</strong> — je serais ravi de participer au Pilote lors de son lancement.
                </span>
              </label>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            {step > 0 && <Button variant="outline" onClick={() => goToStep(step - 1)} className="flex-1">Retour</Button>}
            {step < TOTAL_QUESTIONS - 1 ? (
              <Button className="flex-1 gap-2" disabled={!canNext()} onClick={() => goToStep(step + 1)}>
                Continuer <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button className="flex-1 gap-2" disabled={!canNext() || saving} onClick={handleSubmit}>
                {saving ? "Envoi en cours..." : "Soumettre mon avis"} <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>

          <p className="text-center text-xs text-muted-foreground">
            Pas de spam. Pas d'argumentaire commercial. Juste une validation honnête du marché — votre avis influence directement si nous construisons cela.
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