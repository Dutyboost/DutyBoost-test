import { useState, useEffect } from "react";
import DutyBoostLogo from "../components/DutyBoostLogo";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import WeCallYouForm from "../components/WeCallYouForm";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const LANG_CONTENT = {
  en: {
    headline: <>Something exciting is coming{" "}<span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">from DutyBoost.</span></>,
    description: "We're working on something big. Stay tuned — we'll be sharing more details soon.",
    meta: "More to come.",
    contact: "Get in touch",
    contactTitle: "Get in touch",
    contactSub: "Leave your details and we'll reach out when the time is right.",
    thankYou: "Thank you!",
    thankYouSub: "We've received your details and will be in touch soon.",
  },
  nl: {
    headline: <>Er komt iets spannends{" "}<span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">van DutyBoost.</span></>,
    description: "We werken aan iets groots. Blijf op de hoogte — we delen binnenkort meer details.",
    meta: "Meer volgt.",
    contact: "Neem contact op",
    contactTitle: "Neem contact op",
    contactSub: "Laat je gegevens achter en we nemen contact op wanneer de tijd rijp is.",
    thankYou: "Bedankt!",
    thankYouSub: "We hebben je gegevens ontvangen en nemen snel contact op.",
  },
  de: {
    headline: <>Etwas Spannendes kommt{" "}<span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">von DutyBoost.</span></>,
    description: "Wir arbeiten an etwas Großem. Bleiben Sie dran — wir teilen bald mehr Details.",
    meta: "Mehr folgt.",
    contact: "Kontakt aufnehmen",
    contactTitle: "Kontakt aufnehmen",
    contactSub: "Hinterlassen Sie Ihre Daten und wir melden uns zur richtigen Zeit.",
    thankYou: "Vielen Dank!",
    thankYouSub: "Wir haben Ihre Daten erhalten und melden uns bald.",
  },
  es: {
    headline: <>Algo emocionante viene{" "}<span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">de DutyBoost.</span></>,
    description: "Estamos trabajando en algo grande. Estad atentos — compartiremos más detalles pronto.",
    meta: "Más por venir.",
    contact: "Ponerse en contacto",
    contactTitle: "Ponerse en contacto",
    contactSub: "Deja tus datos y nos pondremos en contacto cuando sea el momento adecuado.",
    thankYou: "¡Gracias!",
    thankYouSub: "Hemos recibido tus datos y nos pondremos en contacto pronto.",
  },
  fr: {
    headline: <>Quelque chose d'excitant arrive{" "}<span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">de DutyBoost.</span></>,
    description: "Nous travaillons sur quelque chose d'important. Restez à l'écoute — nous partagerons plus de détails bientôt.",
    meta: "Plus à venir.",
    contact: "Nous contacter",
    contactTitle: "Nous contacter",
    contactSub: "Laissez vos coordonnées et nous vous contacterons au bon moment.",
    thankYou: "Merci !",
    thankYouSub: "Nous avons reçu vos informations et vous contacterons bientôt.",
  },
  it: {
    headline: <>Qualcosa di entusiasmante sta arrivando{" "}<span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">da DutyBoost.</span></>,
    description: "Stiamo lavorando a qualcosa di grande. Restate sintonizzati — condivideremo presto maggiori dettagli.",
    meta: "Altro in arrivo.",
    contact: "Contattaci",
    contactTitle: "Contattaci",
    contactSub: "Lascia i tuoi dati e ti contatteremo al momento giusto.",
    thankYou: "Grazie!",
    thankYouSub: "Abbiamo ricevuto i tuoi dati e ti contatteremo presto.",
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

  useEffect(() => {
    // Only geo-detect if device language didn't match a supported language
    if (getDeviceLang()) return;
    fetch("https://ipapi.co/json/")
      .then((r) => r.json())
      .then((data) => {
        const geoLang = GEO_LANG_MAP[data.country_code];
        if (geoLang) setLang(geoLang);
      })
      .catch(() => {});
  }, []);

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
            <Button
              size="lg"
              className="gap-2 text-base w-full sm:w-auto"
              onClick={() => { setOpen(true); setSubmitted(false); }}
            >
              {t.contact} <ArrowRight className="w-4 h-4" />
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