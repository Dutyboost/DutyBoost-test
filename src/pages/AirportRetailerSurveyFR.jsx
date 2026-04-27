import { useState } from "react";
import { base44 } from "@/api/base44Client";
import DutyBoostLogo from "../components/DutyBoostLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, ArrowRight } from "lucide-react";

const TOTAL_QUESTIONS = 7;

const STORE_TYPES = [
  "Parfums & cosmétiques",
  "Électronique & gadgets",
  "Chocolat, confiserie & fromage",
  "Cadeaux & souvenirs",
  "Spiritueux & vins",
  "Montres & bijoux",
  "Luxe",
  "Mode & accessoires",
  "Articles de voyage",
  "Livres & magazines",
  "Enfants & jouets",
  "Pharmacie",
  "Alimentation & boissons",
];
const MONTHLY_VISITORS = ["Moins de 1 000", "1 000 – 5 000", "5 000 – 20 000", "20 000+"];
const CURRENT_PROMOS = ["Aucune", "Carte de fidélité / tampon", "Réductions via application", "Promotions aéroport", "Autre"];
const INTEREST_OPTIONS = [
  "Très intéressé – je suis partant",
  "Intéressé – je veux d'abord en savoir plus",
  "Curieux – j'évalue encore",
  "Pas encore sûr",
];
const VOUCHER_OPTIONS = [
  "Oui, très attractif – plus de trafic est toujours bienvenu",
  "Assez attractif – selon les conditions",
  "J'ai besoin de plus de détails avant de décider",
  "Pas une priorité pour l'instant",
];
const INTEGRATION_OPTIONS = [
  "Oui – les intégrations simples ne sont pas un problème",
  "Peut-être – selon les besoins techniques",
  "Peu probable – notre configuration rend cela difficile",
  "Non – nous ne gérons pas notre propre technologie",
];

function OptionButton({ label, selected, onClick, onSelect }) {
  return (
    <button type="button" onClick={() => { onClick(); onSelect?.(); }}
      className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all ${selected ? "bg-primary text-primary-foreground border-primary shadow-md" : "bg-card border-border hover:border-primary/50 hover:bg-primary/5 text-foreground"}`}>
      {label}
    </button>
  );
}

export default function AirportRetailerSurveyFR() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [websiteError, setWebsiteError] = useState("");
  const [websiteValid, setWebsiteValid] = useState(false);
  const [verifyingWebsite, setVerifyingWebsite] = useState(false);
  const [emailError, setEmailError] = useState("");

  const [form, setForm] = useState({
    full_name: "", email: "", company_name: "", company_type: "",
    annual_bookings: "", current_loyalty: [], biggest_challenge: "",
    interest_level: "", commission_attractive: "", snippet_willingness: "",
    wants_demo: false, phone: "", loyalty_other: "",
  });

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const handlePromoToggle = (option) => {
    const exclusiveOptions = ["Aucune", "Autre"];
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

  const getWebsiteDomain = (website) => {
    try {
      const url = website.trim().startsWith('http') ? website.trim() : 'https://' + website.trim();
      return new URL(url).hostname.replace(/^www\./, '').toLowerCase();
    } catch { return ''; }
  };

  const doDomainsMatch = (email, website) => {
    const emailDomain = email.split('@')[1]?.toLowerCase() || '';
    const websiteDomain = getWebsiteDomain(website);
    if (!emailDomain || !websiteDomain) return true;
    return emailDomain === websiteDomain || emailDomain.endsWith('.' + websiteDomain) || websiteDomain.endsWith('.' + emailDomain);
  };

  const checkDomainExists = async (val) => {
    const trimmed = val.trim();
    if (!trimmed) return false;
    try {
      const url = trimmed.startsWith("http") ? trimmed : "https://" + trimmed;
      const hostname = new URL(url).hostname;
      if (!hostname.includes(".")) return false;
      const res = await fetch(`https://dns.google/resolve?name=${hostname}&type=A`);
      const data = await res.json();
      if (data.Status !== 0 || !Array.isArray(data.Answer)) return false;
      return data.Answer.some(r => r.type === 1);
    } catch { return false; }
  };

  const handleWebsiteBlur = async () => {
    const val = form.company_name;
    if (!val) return;
    setVerifyingWebsite(true);
    setWebsiteError("");
    const exists = await checkDomainExists(val);
    setVerifyingWebsite(false);
    if (!exists) {
      setWebsiteValid(false);
      setWebsiteError("Nous n'avons pas pu vérifier ce site. Veuillez saisir un vrai site web (ex. www.votreboutique.fr).");
    } else {
      setWebsiteValid(true);
      setWebsiteError("");
      if (form.email && !isPersonalEmail(form.email) && !doDomainsMatch(form.email, val)) {
        setEmailError("Le domaine de votre e-mail ne correspond pas à votre site web. Veuillez utiliser votre e-mail professionnel.");
      } else if (form.email && !isPersonalEmail(form.email)) {
        setEmailError("");
      }
    }
  };

  const goToStep = (n) => { setStep(n); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const canNext = () => {
    if (step === 0) return form.company_type !== "";
    if (step === 1) return form.annual_bookings !== "";
    if (step === 2) return form.current_loyalty.length > 0;
    if (step === 3) return form.interest_level !== "";
    if (step === 4) return form.commission_attractive !== "";
    if (step === 5) return form.snippet_willingness !== "";
    if (step === 6) return form.full_name && form.email && websiteValid && !verifyingWebsite && !emailError;
    return true;
  };

  const handleSubmit = async () => {
    setSaving(true);
    try {
      await base44.entities.SurveyResponse.create({
        ...form,
        company_type: "Airport Retailer – " + form.company_type,
        current_loyalty: form.current_loyalty.join(", "),
      });
      setSubmitted(true);
    } catch (error) {
      console.error(error);
      setSaving(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 text-center space-y-6">
        <CheckCircle2 className="w-16 h-16 text-green-500" />
        <h1 className="text-3xl font-heading font-bold">Merci{form.full_name ? `, ${form.full_name.split(" ")[0]}` : ""} !</h1>
        <p className="text-muted-foreground max-w-md leading-relaxed">
          {form.wants_demo ? "Votre retour est très précieux. Nous vous contacterons bientôt." : "Votre retour est très précieux. Restez attentif pour notre lancement."}
        </p>
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} DutyBoost. All Rights Reserved.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-body flex flex-col">
      <nav className="sticky top-0 z-50 backdrop-blur border-b border-border bg-background/80">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center"><DutyBoostLogo height={160} /></div>
      </nav>

      {step === 0 && (
        <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/5 border-b border-border">
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-4xl mx-auto px-4 py-14 sm:py-20 relative">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold tracking-tight leading-tight max-w-3xl">
              Nous validons une nouvelle façon pour les commerçants d'aéroport de générer plus de ventes.{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Votre avis compte.</span>
            </h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Nous ne sommes pas encore prêts à partager tous les détails — mais nous voulons savoir s'il y a un intérêt réel avant d'aller plus loin.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">2 minutes · 7 questions · Sans engagement.</p>
          </div>
        </div>
      )}

      <div className="flex-1 flex items-start justify-center px-4 py-10">
        <div className="w-full max-w-xl space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground"><span>Question {step + 1} sur {TOTAL_QUESTIONS}</span></div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${((step + 1) / TOTAL_QUESTIONS) * 100}%` }} />
            </div>
          </div>

          {step === 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-heading font-bold">Quel type de boutique exploitez-vous à l'aéroport ?</h2>
              <div className="space-y-2">{STORE_TYPES.map((t) => <OptionButton key={t} label={t} selected={form.company_type === t} onClick={() => set("company_type", t)} onSelect={() => goToStep(1)} />)}</div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-heading font-bold">Combien de clients visitent votre boutique par mois (environ) ?</h2>
              <div className="space-y-2">{MONTHLY_VISITORS.map((v) => <OptionButton key={v} label={v} selected={form.annual_bookings === v} onClick={() => set("annual_bookings", v)} onSelect={() => goToStep(2)} />)}</div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-heading font-bold">Menez-vous actuellement des promotions ou programmes de fidélité pour attirer des clients à l'aéroport ?</h2>
              <p className="text-sm text-muted-foreground">Sélectionnez tout ce qui s'applique</p>
              <div className="space-y-2">
                {CURRENT_PROMOS.map((o) => {
                  const isSelected = form.current_loyalty.includes(o);
                  const isExclusive = o === "Aucune" || o === "Autre";
                  const hasExclusive = form.current_loyalty.some(opt => ["Aucune", "Autre"].includes(opt));
                  const hasRegular = form.current_loyalty.some(opt => !["Aucune", "Autre"].includes(opt));
                  const disabled = isExclusive ? hasRegular : hasExclusive;
                  return (
                    <button key={o} onClick={() => handlePromoToggle(o)} disabled={disabled && !isSelected}
                      className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all flex items-center gap-3 ${disabled && !isSelected ? "opacity-40 cursor-not-allowed bg-muted" : isSelected ? "bg-primary text-primary-foreground border-primary shadow-md" : "bg-card border-border hover:border-primary/50 hover:bg-primary/5 text-foreground cursor-pointer"}`}>
                      <input type="checkbox" checked={isSelected} onChange={() => {}} className="w-4 h-4" disabled={disabled && !isSelected} />
                      {o}
                    </button>
                  );
                })}
              </div>
              {form.current_loyalty.includes("Autre") && (
                <textarea className="w-full rounded-xl border border-input bg-card px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/40" rows={2} placeholder="Décrivez brièvement..." value={form.loyalty_other || ""} onChange={(e) => set("loyalty_other", e.target.value)} />
              )}
              <div className="space-y-2 pt-1">
                <label className="text-sm text-muted-foreground">Quel est votre plus grand défi pour attirer des clients à l'aéroport ? (optionnel)</label>
                <textarea className="w-full rounded-xl border border-input bg-card px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/40" rows={2} placeholder="Optionnel..." value={form.biggest_challenge} onChange={(e) => set("biggest_challenge", e.target.value)} />
              </div>
              <Button className="w-full gap-2 mt-4" onClick={() => goToStep(3)}>Continuer <ArrowRight className="w-4 h-4" /></Button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-heading font-bold">Si une plateforme pouvait envoyer des voyageurs pré-qualifiés avec des bons directement dans votre boutique sans frais initiaux, quel serait votre niveau d'intérêt ?</h2>
              <div className="space-y-2">{INTEREST_OPTIONS.map((o) => <OptionButton key={o} label={o} selected={form.interest_level === o} onClick={() => set("interest_level", o)} onSelect={() => goToStep(4)} />)}</div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-heading font-bold">Dans quelle mesure un modèle où vous ne payez qu'une petite commission lorsqu'un bon est réellement échangé dans votre boutique vous semble-t-il attractif ?</h2>
              <div className="space-y-2">{VOUCHER_OPTIONS.map((o) => <OptionButton key={o} label={o} selected={form.commission_attractive === o} onClick={() => set("commission_attractive", o)} onSelect={() => goToStep(5)} />)}</div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-heading font-bold">Dans quelle mesure êtes-vous ouvert à un simple processus d'échange par QR code en caisse ?</h2>
              <div className="space-y-2">{INTEGRATION_OPTIONS.map((o) => <OptionButton key={o} label={o} selected={form.snippet_willingness === o} onClick={() => set("snippet_willingness", o)} onSelect={() => goToStep(6)} />)}</div>
            </div>
          )}

          {step === 6 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-heading font-bold">Dernière étape — Dites-nous qui vous êtes.</h2>
              <p className="text-muted-foreground text-sm">Souhaitez-vous rester informé ? Nous ne vous contacterons que lorsque nous aurons quelque chose de significatif à partager. Pas de spam, jamais.</p>
              <div className="space-y-3">
                <Input placeholder="Nom complet" value={form.full_name} onChange={(e) => set("full_name", e.target.value)} />
                <div>
                  <Input placeholder="E-mail professionnel" type="email" value={form.email}
                    onChange={(e) => {
                      set("email", e.target.value);
                      if (e.target.value && isPersonalEmail(e.target.value)) {
                        setEmailError("Veuillez utiliser une adresse e-mail professionnelle d'entreprise");
                      } else if (e.target.value && form.company_name && websiteValid && !doDomainsMatch(e.target.value, form.company_name)) {
                        setEmailError("Le domaine de votre e-mail ne correspond pas à votre site web. Veuillez utiliser votre e-mail professionnel.");
                      } else {
                        setEmailError("");
                      }
                    }}
                    className={emailError ? "border-destructive" : ""} />
                  {emailError && <p className="text-xs text-destructive mt-1">{emailError}</p>}
                </div>
                <div>
                  <Input placeholder="Site web de l'entreprise * (ex. www.votreboutique.fr)" value={form.company_name}
                    onChange={(e) => { set("company_name", e.target.value); setWebsiteValid(false); setWebsiteError(""); }}
                    onBlur={handleWebsiteBlur}
                    className={websiteError ? "border-destructive" : websiteValid ? "border-green-500" : ""} />
                  {verifyingWebsite && <p className="text-xs text-muted-foreground mt-1">Vérification du site web...</p>}
                  {websiteError && <p className="text-xs text-destructive mt-1">{websiteError}</p>}
                  {websiteValid && !verifyingWebsite && <p className="text-xs text-green-600 mt-1">✓ Site web vérifié</p>}
                </div>
                <Input placeholder="Téléphone (optionnel)" value={form.phone} onChange={(e) => set("phone", e.target.value)} />
              </div>
              <label className="flex items-start gap-3 cursor-pointer group pt-2">
                <input type="checkbox" checked={form.wants_demo} onChange={(e) => set("wants_demo", e.target.checked)} className="mt-0.5 accent-primary w-4 h-4 cursor-pointer" />
                <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                  <strong>Oui, je souhaite être contacté</strong> lorsque DutyBoost sera prêt à partager plus de détails.
                </span>
              </label>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            {step > 0 && <Button variant="outline" onClick={() => goToStep(step - 1)} className="flex-1">Retour</Button>}
            {step === TOTAL_QUESTIONS - 1 && (
              <Button className="flex-1 gap-2" disabled={!canNext() || saving} onClick={handleSubmit}>
                {saving ? "Envoi..." : "Envoyer"} <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>
          <p className="text-center text-xs text-muted-foreground">Pas de spam. Pas d'argumentaire commercial.</p>
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