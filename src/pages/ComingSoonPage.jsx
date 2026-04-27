import { useState } from "react";
import DutyBoostLogo from "../components/DutyBoostLogo";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import WeCallYouForm from "../components/WeCallYouForm";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const LANG_CONTENT = {
  en: {
    headline: <>Something new is coming{" "}<span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">to the travel industry.</span></>,
    description: "We're validating a new revenue opportunity for the travel industry. Before revealing more, we'd value your input as part of a select group shaping its direction. Would you be open to answering a few quick questions?",
    meta: "2 minutes · No strings attached.",
    cta: "Share your opinion",
    contact: "Get in touch",
    contactTitle: "Get in touch",
    contactSub: "Leave your details and we'll reach out when the time is right.",
    thankYou: "Thank you!",
    thankYouSub: "We've received your details and will be in touch soon.",
    surveyPath: "/travel-partner-survey",
  },
  nl: {
    headline: <>Er komt iets nieuws{" "}<span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">voor de reisbranche.</span></>,
    description: "We valideren een nieuwe inkomstenmogelijkheid voor de reisbranche. Voor we meer onthullen, horen we graag jouw mening als onderdeel van een select gezelschap dat de richting mee bepaalt. Wil je een paar korte vragen beantwoorden?",
    meta: "2 minuten · Vrijblijvend.",
    cta: "Deel jouw mening",
    contact: "Neem contact op",
    contactTitle: "Neem contact op",
    contactSub: "Laat je gegevens achter en we nemen contact op wanneer de tijd rijp is.",
    thankYou: "Bedankt!",
    thankYouSub: "We hebben je gegevens ontvangen en nemen snel contact op.",
    surveyPath: "/travel-partner-survey-nl",
  },
  de: {
    headline: <>Etwas Neues kommt{" "}<span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">auf die Reisebranche zu.</span></>,
    description: "Wir validieren eine neue Umsatzchance für die Reisebranche. Bevor wir mehr verraten, würden wir Ihre Meinung als Teil einer ausgewählten Gruppe schätzen, die die Richtung mitgestaltet. Würden Sie ein paar kurze Fragen beantworten?",
    meta: "2 Minuten · Unverbindlich.",
    cta: "Meinung teilen",
    contact: "Kontakt aufnehmen",
    contactTitle: "Kontakt aufnehmen",
    contactSub: "Hinterlassen Sie Ihre Daten und wir melden uns zur richtigen Zeit.",
    thankYou: "Vielen Dank!",
    thankYouSub: "Wir haben Ihre Daten erhalten und melden uns bald.",
    surveyPath: "/travel-partner-survey-de",
  },
  es: {
    headline: <>Algo nuevo está llegando{" "}<span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">al sector de viajes.</span></>,
    description: "Estamos validando una nueva oportunidad de ingresos para el sector de viajes. Antes de revelar más, valoraríamos tu opinión como parte de un grupo selecto que está dando forma a su dirección. ¿Estarías dispuesto a responder unas preguntas rápidas?",
    meta: "2 minutos · Sin compromiso.",
    cta: "Comparte tu opinión",
    contact: "Ponerse en contacto",
    contactTitle: "Ponerse en contacto",
    contactSub: "Deja tus datos y nos pondremos en contacto cuando sea el momento adecuado.",
    thankYou: "¡Gracias!",
    thankYouSub: "Hemos recibido tus datos y nos pondremos en contacto pronto.",
    surveyPath: "/travel-partner-survey-es",
  },
  fr: {
    headline: <>Quelque chose de nouveau arrive{" "}<span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">dans le secteur du voyage.</span></>,
    description: "Nous validons une nouvelle opportunité de revenus pour le secteur du voyage. Avant d'en dire plus, nous apprécierions votre avis en tant que membre d'un groupe sélect qui en façonne la direction. Seriez-vous prêt à répondre à quelques questions rapides ?",
    meta: "2 minutes · Sans engagement.",
    cta: "Partager votre avis",
    contact: "Nous contacter",
    contactTitle: "Nous contacter",
    contactSub: "Laissez vos coordonnées et nous vous contacterons au bon moment.",
    thankYou: "Merci !",
    thankYouSub: "Nous avons reçu vos informations et vous contacterons bientôt.",
    surveyPath: "/travel-partner-survey-fr",
  },
  it: {
    headline: <>Qualcosa di nuovo sta arrivando{" "}<span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">nel settore dei viaggi.</span></>,
    description: "Stiamo validando una nuova opportunità di ricavi per il settore dei viaggi. Prima di rivelare di più, apprezzeremmo il tuo contributo come parte di un gruppo selezionato che ne sta delineando la direzione. Saresti disposto a rispondere ad alcune domande rapide?",
    meta: "2 minuti · Senza impegno.",
    cta: "Condividi la tua opinione",
    contact: "Contattaci",
    contactTitle: "Contattaci",
    contactSub: "Lascia i tuoi dati e ti contatteremo al momento giusto.",
    thankYou: "Grazie!",
    thankYouSub: "Abbiamo ricevuto i tuoi dati e ti contatteremo presto.",
    surveyPath: "/travel-partner-survey-it",
  },
};

const GEO_LANG_MAP = {
  NL: "nl", BE: "nl", DE: "de", AT: "de", CH: "de",
  ES: "es", MX: "es", AR: "es", CO: "es", CL: "es",
  FR: "fr", LU: "fr", MC: "fr",
  IT: "it", SM: "it", VA: "it",
  GB: "en", US: "en", AU: "en", CA: "en", NZ: "en", IE: "en",
};

function getDeviceLang() {
  const langs = navigator.languages || [navigator.language || "en"];
  for (const l of langs) {
    const code = l.split("-")[0].toLowerCase();
    if (LANG_CONTENT[code]) return code;
  }
  return null;
}

export default function ComingSoonPage() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [lang, setLang] = useState(() => getDeviceLang() || "en");

  useState(() => {
    // Only fetch geo if device language didn't match a supported language
    if (getDeviceLang()) return;
    fetch("https://ipapi.co/json/")
      .then((r) => r.json())
      .then((data) => {
        const geoLang = GEO_LANG_MAP[data.country_code];
        if (geoLang) setLang(geoLang);
      })
      .catch(() => {});
  });

  const t = LANG_CONTENT[lang];

  return (
    <div className="min-h-screen bg-background font-body flex flex-col">
      {/* Nav */}
      <nav className="sticky top-0 z-50 backdrop-blur border-b border-border bg-background/80">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center">
          <DutyBoostLogo height={160} />
        </div>
      </nav>

      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/5 border-b border-border">
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 py-14 sm:py-24 relative">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold tracking-tight leading-tight max-w-3xl">
            {t.headline}
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl leading-relaxed">{t.description}</p>
          <p className="mt-2 text-sm text-muted-foreground">{t.meta}</p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link to={t.surveyPath}>
              <Button size="lg" className="gap-2 text-base">
                {t.cta} <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="gap-2 text-base"
              onClick={() => { setOpen(true); setSubmitted(false); }}
            >
              {t.contact}
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-6 px-4 mt-auto">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <DutyBoostLogo height={130} />
          <p>© {new Date().getFullYear()} DutyBoost B.V. All rights reserved.</p>
        </div>
      </footer>

      {/* Contact Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          {submitted ? (
            <div className="flex flex-col items-center text-center py-8 space-y-4">
              <CheckCircle2 className="w-14 h-14 text-green-500" />
              <h2 className="text-2xl font-heading font-bold">{t.thankYou}</h2>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">{t.thankYouSub}</p>
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>{t.contactTitle}</DialogTitle>
              </DialogHeader>
              <p className="text-sm text-muted-foreground">{t.contactSub}</p>
              <WeCallYouForm onSuccess={() => setSubmitted(true)} />
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}