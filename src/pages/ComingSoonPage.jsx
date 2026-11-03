import { useState } from "react";
import DutyBoostLogo from "../components/DutyBoostLogo";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import WeCallYouForm from "../components/WeCallYouForm";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const LANG_CONTENT = {
  en: {
    headline: <>We've discovered a new revenue opportunity within the travel & hospitality sector—{" "}<span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">one that has been overlooked for years.</span></>,
    description: "It's not another loyalty program. It's not an app. It's a smarter way to connect the key players in the ecosystem—and the upside is substantial.",
    meta: "We're not ready to go public yet, but we are ready to speak with a select group of partners.",
    contact: "I want to know more",
    contactTitle: "Let's talk",
    contactSub: "Leave your details and we'll reach out personally. No pitch decks, no newsletters — just a real conversation.",
    thankYou: "We'll be in touch.",
    thankYouSub: "Thank you for your interest. We'll reach out personally — we look forward to the conversation.",
  },
  nl: {
    headline: <>Een nieuw tijdperk voor duty-free{" "}<span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">staat op het punt te beginnen.</span></>,
    description: "DutyBoost herdefiniëert hoe reizigers duty-free ontdekken en beleven — en we zoeken de juiste partners om er vanaf dag één deel van uit te maken.",
    meta: "Wees een van de eersten die het weet. Geen spam, ooit.",
    contact: "Vroege toegang aanvragen",
    contactTitle: "Schrijf je in",
    contactSub: "Laat je gegevens achter en je hoort als eerste wanneer we klaar zijn om meer te delen.",
    thankYou: "Je staat op de lijst!",
    thankYouSub: "We nemen contact op zodra we iets betekenisvols te delen hebben. Bedankt voor je interesse.",
  },
  de: {
    headline: <>Eine neue Ära für Duty-free{" "}<span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">steht kurz bevor.</span></>,
    description: "DutyBoost definiert neu, wie Reisende Duty-free entdecken und genießen — und wir suchen die richtigen Partner, die von Anfang an dabei sind.",
    meta: "Seien Sie unter den Ersten, die es erfahren. Kein Spam, niemals.",
    contact: "Frühen Zugang sichern",
    contactTitle: "Warteliste beitreten",
    contactSub: "Hinterlassen Sie Ihre Daten und Sie erfahren als Erster, wenn wir bereit sind, mehr zu teilen.",
    thankYou: "Sie stehen auf der Liste!",
    thankYouSub: "Wir melden uns, sobald wir etwas Bedeutungsvolles zu teilen haben. Vielen Dank für Ihr Interesse.",
  },
  es: {
    headline: <>Una nueva era para el duty-free{" "}<span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">está a punto de comenzar.</span></>,
    description: "DutyBoost está redefiniendo cómo los pasajeros descubren y disfrutan el duty-free — y buscamos los socios adecuados para ser parte de ello desde el primer día.",
    meta: "Sé de los primeros en saberlo. Sin spam, nunca.",
    contact: "Solicitar acceso anticipado",
    contactTitle: "Únete a la lista de espera",
    contactSub: "Deja tus datos y serás el primero en saber cuándo estemos listos para compartir más.",
    thankYou: "¡Estás en la lista!",
    thankYouSub: "Nos pondremos en contacto tan pronto como tengamos algo significativo que compartir. Gracias por tu interés.",
  },
  fr: {
    headline: <>Une nouvelle ère pour le duty-free{" "}<span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">est sur le point de commencer.</span></>,
    description: "DutyBoost redéfinit la façon dont les voyageurs découvrent et profitent du duty-free — et nous recherchons les bons partenaires pour en faire partie dès le premier jour.",
    meta: "Soyez parmi les premiers à le savoir. Pas de spam, jamais.",
    contact: "Obtenir un accès anticipé",
    contactTitle: "Rejoindre la liste d'attente",
    contactSub: "Laissez vos coordonnées et vous serez le premier informé quand nous serons prêts à en dire plus.",
    thankYou: "Vous êtes sur la liste !",
    thankYouSub: "Nous vous contacterons dès que nous aurons quelque chose de significatif à partager. Merci de votre intérêt.",
  },
  it: {
    headline: <>Una nuova era per il duty-free{" "}<span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">sta per iniziare.</span></>,
    description: "DutyBoost sta ridefinendo il modo in cui i viaggiatori scoprono e vivono il duty-free — e cerchiamo i partner giusti per farne parte fin dal primo giorno.",
    meta: "Sii tra i primi a saperlo. Nessuno spam, mai.",
    contact: "Accesso anticipato",
    contactTitle: "Unisciti alla lista d'attesa",
    contactSub: "Lascia i tuoi dati e sarai il primo a sapere quando saremo pronti a condividere di più.",
    thankYou: "Sei nella lista!",
    thankYouSub: "Ti contatteremo non appena avremo qualcosa di significativo da condividere. Grazie per il tuo interesse.",
  },
};

export default function ComingSoonPage() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const t = LANG_CONTENT["en"];

  return (
    <div className="min-h-screen bg-background font-body flex flex-col">
      {/* Nav */}
      <nav className="sticky top-0 z-50 backdrop-blur border-b border-border bg-background/80">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center">
           <DutyBoostLogo height={55} />
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
      <footer className="py-6 px-4 mt-auto">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <DutyBoostLogo height={55} />
          <p>© {new Date().getFullYear()} DutyBoost All rights reserved.</p>
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