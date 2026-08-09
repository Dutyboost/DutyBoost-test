import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Cookie, ShieldCheck } from "lucide-react";
import { getCookieConsent, setCookieConsent, CONSENT_VERSION } from "@/lib/cookieConsent";

const CONTENT = {
  en: {
    intro: "We use cookies to improve your experience. You decide which cookies to allow — essential cookies are always required for the platform to function.",
    essential: { name: "Essential Cookies", desc: "Required for the platform to function. Includes session authentication tokens and security cookies. Cannot be disabled." },
    functional: { name: "Functional Cookies", desc: "Used to remember your preferences such as language settings or last selected dashboard view." },
    analytics: { name: "Analytics Cookies", desc: "Help us understand how users navigate the platform. We collect anonymised data on page visits and feature usage." },
    alwaysOn: "Always on",
    required: "Required",
    optional: "Optional",
    acceptAll: "Accept All",
    rejectAll: "Reject All",
    save: "Save Preferences",
    preferences: "Preferences",
    policy: "Cookie Policy",
    changeNote: "You can change your preferences at any time in our Cookie Policy.",
  },
  nl: {
    intro: "We gebruiken cookies om uw ervaring te verbeteren. U bepaalt welke cookies u toestaat — essentiële cookies zijn altijd vereist voor het functioneren van het platform.",
    essential: { name: "Essentiële cookies", desc: "Vereist voor het functioneren van het platform. Omvat sessie-authenticatietokens en beveiligingscookies. Kunnen niet worden uitgeschakeld." },
    functional: { name: "Functionele cookies", desc: "Gebruikt om uw voorkeuren te onthouden, zoals taalinstellingen of uw laatste dashboardweergave." },
    analytics: { name: "Analytische cookies", desc: "Helpen ons te begrijpen hoe gebruikers door het platform navigeren. Wij verzamelen geanonimiseerde gegevens over paginabezoeken en functiegebruik." },
    alwaysOn: "Altijd aan",
    required: "Vereist",
    optional: "Optioneel",
    acceptAll: "Alles accepteren",
    rejectAll: "Alles weigeren",
    save: "Voorkeuren opslaan",
    preferences: "Voorkeuren",
    policy: "Cookiebeleid",
    changeNote: "U kunt uw voorkeuren op elk moment wijzigen in ons Cookiebeleid.",
  },
  de: {
    intro: "Wir verwenden Cookies, um Ihre Erfahrung zu verbessern. Sie entscheiden, welche Cookies Sie zulassen — notwendige Cookies sind für das Funktionieren der Plattform immer erforderlich.",
    essential: { name: "Notwendige Cookies", desc: "Für das Funktionieren der Plattform erforderlich. Umfasst Sitzungsauthentifizierungstoken und Sicherheitscookies. Können nicht deaktiviert werden." },
    functional: { name: "Funktionale Cookies", desc: "Werden verwendet, um Ihre Präferenzen wie Spracheinstellungen oder die zuletzt ausgewählte Dashboard-Ansicht zu speichern." },
    analytics: { name: "Analytische Cookies", desc: "Helfen uns zu verstehen, wie Nutzer die Plattform navigieren. Wir erheben anonymisierte Daten zu Seitenbesuchen und Funktionsnutzung." },
    alwaysOn: "Immer aktiv",
    required: "Erforderlich",
    optional: "Optional",
    acceptAll: "Alle akzeptieren",
    rejectAll: "Alle ablehnen",
    save: "Einstellungen speichern",
    preferences: "Einstellungen",
    policy: "Cookie-Richtlinie",
    changeNote: "Sie können Ihre Einstellungen jederzeit in unserer Cookie-Richtlinie ändern.",
  },
  fr: {
    intro: "Nous utilisons des cookies pour améliorer votre expérience. Vous décidez des cookies à autoriser — les cookies essentiels sont toujours requis pour le fonctionnement de la plateforme.",
    essential: { name: "Cookies essentiels", desc: "Nécessaires au fonctionnement de la plateforme. Comprend les jetons d'authentification de session et les cookies de sécurité. Ne peuvent pas être désactivés." },
    functional: { name: "Cookies fonctionnels", desc: "Utilisés pour mémoriser vos préférences comme les paramètres de langue ou la dernière vue de tableau de bord." },
    analytics: { name: "Cookies analytiques", desc: "Nous aident à comprendre comment les utilisateurs naviguent. Nous collectons des données anonymisées sur les visites de pages et l'utilisation des fonctionnalités." },
    alwaysOn: "Toujours activé",
    required: "Requis",
    optional: "Optionnel",
    acceptAll: "Tout accepter",
    rejectAll: "Tout refuser",
    save: "Enregistrer les préférences",
    preferences: "Préférences",
    policy: "Politique de cookies",
    changeNote: "Vous pouvez modifier vos préférences à tout moment dans notre Politique de cookies.",
  },
  es: {
    intro: "Usamos cookies para mejorar tu experiencia. Tú decides qué cookies permitir — las cookies esenciales son siempre necesarias para el funcionamiento de la plataforma.",
    essential: { name: "Cookies esenciales", desc: "Necesarias para el funcionamiento de la plataforma. Incluye tokens de autenticación de sesión y cookies de seguridad. No pueden desactivarse." },
    functional: { name: "Cookies funcionales", desc: "Se usan para recordar tus preferencias como la configuración de idioma o tu última vista del panel." },
    analytics: { name: "Cookies analíticas", desc: "Nos ayudan a entender cómo navegan los usuarios. Recopilamos datos anonimizados sobre visitas a páginas y uso de funciones." },
    alwaysOn: "Siempre activas",
    required: "Necesarias",
    optional: "Opcionales",
    acceptAll: "Aceptar todas",
    rejectAll: "Rechazar todas",
    save: "Guardar preferencias",
    preferences: "Preferencias",
    policy: "Política de cookies",
    changeNote: "Puedes cambiar tus preferencias en cualquier momento en nuestra Política de cookies.",
  },
  it: {
    intro: "Utilizziamo i cookie per migliorare la tua esperienza. Decidi tu quali cookie consentire — i cookie essenziali sono sempre necessari per il funzionamento della piattaforma.",
    essential: { name: "Cookie essenziali", desc: "Necessari per il funzionamento della piattaforma. Include token di autenticazione della sessione e cookie di sicurezza. Non possono essere disabilitati." },
    functional: { name: "Cookie funzionali", desc: "Utilizzati per ricordare le tue preferenze come le impostazioni della lingua o l'ultima visualizzazione della dashboard." },
    analytics: { name: "Cookie analitici", desc: "Ci aiutano a capire come gli utenti navigano. Raccogliamo dati anonimi sulle visite alle pagine e sull'utilizzo delle funzioni." },
    alwaysOn: "Sempre attivi",
    required: "Obbligatori",
    optional: "Facoltativi",
    acceptAll: "Accetta tutti",
    rejectAll: "Rifiuta tutti",
    save: "Salva preferenze",
    preferences: "Preferenze",
    policy: "Politica sui cookie",
    changeNote: "Puoi modificare le tue preferenze in qualsiasi momento nella nostra Politica sui cookie.",
  },
};

export default function CookieConsentBar() {
  const { i18n } = useTranslation();
  const t = CONTENT[i18n.language] || CONTENT.en;

  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [functional, setFunctional] = useState(true);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    const c = getCookieConsent();
    if (!c || c.version !== CONSENT_VERSION) {
      setFunctional(c?.functional ?? true);
      setAnalytics(c?.analytics ?? false);
      setVisible(true);
    }
  }, []);

  const close = (prefs) => {
    setCookieConsent(prefs);
    setVisible(false);
  };

  if (!visible) return null;

  const categories = [
    { key: "essential", label: t.essential.name, desc: t.essential.desc, on: true, locked: true, badge: t.required },
    { key: "functional", label: t.functional.name, desc: t.functional.desc, on: functional, badge: t.optional },
    { key: "analytics", label: t.analytics.name, desc: t.analytics.desc, on: analytics, badge: t.optional },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] p-3 sm:p-4 print:hidden">
      <div className="max-w-4xl mx-auto bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
        <div className="px-5 py-4 flex items-start gap-3 border-b border-border/60">
          <Cookie className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground leading-relaxed flex-1">
            {t.intro}{" "}
            <Link to="/cookies" className="text-primary underline underline-offset-2 hover:text-primary/80">
              {t.policy}
            </Link>
          </p>
        </div>

        {expanded && (
          <div className="px-5 py-3 space-y-2 max-h-[42vh] overflow-y-auto">
            {categories.map((cat) => (
              <div key={cat.key} className="flex items-start justify-between gap-4 py-2.5 border-b border-border/40 last:border-0">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="font-semibold text-sm text-foreground">{cat.label}</p>
                    <span className={`text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded-full ${cat.locked ? "bg-secondary text-muted-foreground" : "bg-primary/10 text-primary"}`}>
                      {cat.locked ? t.alwaysOn : cat.badge}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{cat.desc}</p>
                </div>
                <div className="shrink-0 pt-1">
                  {cat.locked ? (
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <ShieldCheck className="w-4 h-4" />
                      <Switch checked disabled />
                    </div>
                  ) : (
                    <Switch
                      checked={cat.on}
                      onCheckedChange={(v) => (cat.key === "functional" ? setFunctional(v) : setAnalytics(v))}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="px-5 py-3 flex flex-col sm:flex-row sm:items-center gap-2">
          <button
            onClick={() => setExpanded((e) => !e)}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors sm:mr-auto order-3 sm:order-1 text-left"
          >
            {t.preferences} {expanded ? "−" : "+"}
          </button>
          <div className="flex items-center gap-2 order-1 sm:order-2">
            <Button variant="outline" size="sm" onClick={() => close({ functional: false, analytics: false })}>
              {t.rejectAll}
            </Button>
            {expanded && (
              <Button variant="secondary" size="sm" onClick={() => close({ functional, analytics })}>
                {t.save}
              </Button>
            )}
            <Button size="sm" onClick={() => close({ functional: true, analytics: true })}>
              {t.acceptAll}
            </Button>
          </div>
        </div>
        {expanded && (
          <div className="px-5 pb-3 -mt-1">
            <p className="text-xs text-muted-foreground">{t.changeNote}</p>
          </div>
        )}
      </div>
    </div>
  );
}