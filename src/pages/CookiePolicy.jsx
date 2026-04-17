import { Link } from "react-router-dom";
import DutyBoostLogo from "../components/DutyBoostLogo";
import PageFooter from "../components/PageFooter";
import { useTranslation } from "react-i18next";
import EmailLinkText from "../components/EmailLinkText";
import LanguageSwitcher from "../components/LanguageSwitcher";

const content = {
  en: { title: "Cookie Policy", updated: "Last updated: March 2026", back: "Back to Home", sections: [
    { h: "1. What Are Cookies?", p: "Cookies are small text files stored on your device when you visit a website. They help the website remember your preferences, maintain your session, and understand how you interact with the platform." },
    { h: "2. Cookies We Use", cookies: [
      { name: "Essential Cookies", desc: "Required for the platform to function. Includes session authentication tokens and security cookies. Cannot be disabled." },
      { name: "Functional Cookies", desc: "Used to remember your preferences such as language settings or last selected dashboard view." },
      { name: "Analytics Cookies", desc: "Help us understand how users navigate the platform. We collect anonymised data on page visits and feature usage." },
    ]},
    { h: "3. Third-Party Cookies", p: "We may use trusted third-party services that set their own cookies. These are bound by their own privacy policies and we do not control the cookies they set." },
    { h: "4. Managing Cookies", p: "You can control and delete cookies through your browser settings. Disabling essential cookies will impair platform functionality.", list: ["View cookies currently stored on your device.", "Delete all or specific cookies.", "Block cookies from specific or all websites."] },
    { h: "5. Your Consent", p: "By continuing to use the DutyBoost platform, you consent to our use of cookies as described in this policy. You may withdraw consent at any time via your browser settings." },
    { h: "6. Contact", p: "Questions about our cookie usage: privacy@dutyboost.com" },
  ]},
  nl: { title: "Cookiebeleid", updated: "Laatst bijgewerkt: maart 2026", back: "Terug naar home", sections: [
    { h: "1. Wat zijn cookies?", p: "Cookies zijn kleine tekstbestanden die op uw apparaat worden opgeslagen wanneer u een website bezoekt. Ze helpen de website uw voorkeuren te onthouden, uw sessie bij te houden en te begrijpen hoe u met het platform omgaat." },
    { h: "2. Cookies die wij gebruiken", cookies: [
      { name: "Essentiële cookies", desc: "Vereist voor het functioneren van het platform. Omvat sessie-authenticatietokens en beveiligingscookies. Kunnen niet worden uitgeschakeld." },
      { name: "Functionele cookies", desc: "Gebruikt om uw voorkeuren te onthouden, zoals taalinstellingen of uw laatste dashboardweergave." },
      { name: "Analytische cookies", desc: "Helpen ons te begrijpen hoe gebruikers door het platform navigeren. Wij verzamelen geanonimiseerde gegevens." },
    ]},
    { h: "3. Cookies van derden", p: "Wij kunnen gebruik maken van vertrouwde diensten van derden die hun eigen cookies plaatsen. Deze zijn gebonden aan hun eigen privacybeleid." },
    { h: "4. Cookies beheren", p: "U kunt cookies beheren en verwijderen via uw browserinstellingen. Het uitschakelen van essentiële cookies verstoort de platformfunctionaliteit.", list: ["Cookies bekijken die momenteel op uw apparaat zijn opgeslagen.", "Alle of specifieke cookies verwijderen.", "Cookies van specifieke of alle websites blokkeren."] },
    { h: "5. Uw toestemming", p: "Door het DutyBoost-platform te blijven gebruiken, stemt u in met ons gebruik van cookies. U kunt uw toestemming op elk moment intrekken via uw browserinstellingen." },
    { h: "6. Contact", p: "Vragen over ons cookiegebruik: privacy@dutyboost.com" },
  ]},
  de: { title: "Cookie-Richtlinie", updated: "Zuletzt aktualisiert: März 2026", back: "Zurück zur Startseite", sections: [
    { h: "1. Was sind Cookies?", p: "Cookies sind kleine Textdateien, die auf Ihrem Gerät gespeichert werden, wenn Sie eine Website besuchen. Sie helfen, Ihre Präferenzen zu merken, die Sitzung aufrechtzuerhalten und Ihre Interaktion mit der Plattform zu verstehen." },
    { h: "2. Von uns verwendete Cookies", cookies: [
      { name: "Notwendige Cookies", desc: "Für das Funktionieren der Plattform erforderlich. Umfasst Sitzungsauthentifizierungstoken und Sicherheitscookies. Können nicht deaktiviert werden." },
      { name: "Funktionale Cookies", desc: "Werden verwendet, um Ihre Präferenzen wie Spracheinstellungen oder die zuletzt ausgewählte Dashboard-Ansicht zu speichern." },
      { name: "Analytische Cookies", desc: "Helfen uns zu verstehen, wie Nutzer die Plattform navigieren. Wir erheben anonymisierte Daten." },
    ]},
    { h: "3. Drittanbieter-Cookies", p: "Wir können vertrauenswürdige Drittanbieterdienste nutzen, die ihre eigenen Cookies setzen. Diese unterliegen ihren eigenen Datenschutzrichtlinien." },
    { h: "4. Cookie-Verwaltung", p: "Sie können Cookies über Ihre Browsereinstellungen kontrollieren und löschen. Das Deaktivieren notwendiger Cookies beeinträchtigt die Plattformfunktionalität.", list: ["Derzeit gespeicherte Cookies anzeigen.", "Alle oder bestimmte Cookies löschen.", "Cookies von bestimmten oder allen Websites blockieren."] },
    { h: "5. Ihre Einwilligung", p: "Durch die weitere Nutzung der DutyBoost-Plattform stimmen Sie der Verwendung von Cookies zu. Sie können Ihre Einwilligung jederzeit über Ihre Browsereinstellungen widerrufen." },
    { h: "6. Kontakt", p: "Fragen zur Cookie-Nutzung: privacy@dutyboost.com" },
  ]},
  fr: { title: "Politique en matière de cookies", updated: "Dernière mise à jour : mars 2026", back: "Retour à l'accueil", sections: [
    { h: "1. Que sont les cookies ?", p: "Les cookies sont de petits fichiers texte stockés sur votre appareil lorsque vous visitez un site web. Ils aident le site à mémoriser vos préférences, maintenir votre session et comprendre comment vous interagissez avec la plateforme." },
    { h: "2. Cookies que nous utilisons", cookies: [
      { name: "Cookies essentiels", desc: "Nécessaires au fonctionnement de la plateforme. Comprend les jetons d'authentification de session et les cookies de sécurité. Ne peuvent pas être désactivés." },
      { name: "Cookies fonctionnels", desc: "Utilisés pour mémoriser vos préférences comme les paramètres de langue ou la dernière vue de tableau de bord." },
      { name: "Cookies analytiques", desc: "Nous aident à comprendre comment les utilisateurs naviguent. Nous collectons des données anonymisées." },
    ]},
    { h: "3. Cookies tiers", p: "Nous pouvons utiliser des services tiers qui placent leurs propres cookies. Ces tiers sont soumis à leurs propres politiques de confidentialité." },
    { h: "4. Gestion des cookies", p: "Vous pouvez contrôler et supprimer les cookies via les paramètres de votre navigateur. La désactivation des cookies essentiels altère les fonctionnalités.", list: ["Afficher les cookies actuellement stockés.", "Supprimer tous les cookies ou des cookies spécifiques.", "Bloquer les cookies de sites spécifiques ou de tous les sites."] },
    { h: "5. Votre consentement", p: "En continuant à utiliser la plateforme DutyBoost, vous consentez à notre utilisation des cookies. Vous pouvez retirer votre consentement à tout moment via les paramètres de votre navigateur." },
    { h: "6. Contact", p: "Questions sur notre utilisation des cookies : privacy@dutyboost.com" },
  ]},
  es: { title: "Política de cookies", updated: "Última actualización: marzo de 2026", back: "Volver al inicio", sections: [
    { h: "1. ¿Qué son las cookies?", p: "Las cookies son pequeños archivos de texto almacenados en tu dispositivo cuando visitas un sitio web. Ayudan al sitio a recordar tus preferencias, mantener tu sesión y entender cómo interactúas con la plataforma." },
    { h: "2. Cookies que usamos", cookies: [
      { name: "Cookies esenciales", desc: "Necesarias para el funcionamiento de la plataforma. Incluye tokens de autenticación de sesión y cookies de seguridad. No pueden desactivarse." },
      { name: "Cookies funcionales", desc: "Se usan para recordar tus preferencias como la configuración de idioma o tu última vista del panel." },
      { name: "Cookies analíticas", desc: "Nos ayudan a entender cómo navegan los usuarios. Recopilamos datos anonimizados." },
    ]},
    { h: "3. Cookies de terceros", p: "Podemos usar servicios de terceros de confianza que establecen sus propias cookies. Estos están sujetos a sus propias políticas de privacidad." },
    { h: "4. Gestión de cookies", p: "Puedes controlar y eliminar cookies a través de la configuración de tu navegador. Desactivar las cookies esenciales afectará la funcionalidad.", list: ["Ver las cookies almacenadas actualmente.", "Eliminar todas o cookies específicas.", "Bloquear cookies de sitios específicos o de todos."] },
    { h: "5. Tu consentimiento", p: "Al continuar usando la plataforma DutyBoost, consientes nuestro uso de cookies. Puedes retirar el consentimiento en cualquier momento ajustando la configuración de tu navegador." },
    { h: "6. Contacto", p: "Preguntas sobre el uso de cookies: privacy@dutyboost.com" },
  ]},
  it: { title: "Politica sui cookie", updated: "Ultimo aggiornamento: marzo 2026", back: "Torna alla home", sections: [
    { h: "1. Cosa sono i cookie?", p: "I cookie sono piccoli file di testo memorizzati sul tuo dispositivo quando visiti un sito web. Aiutano il sito a ricordare le tue preferenze, mantenere la tua sessione e capire come interagisci con la piattaforma." },
    { h: "2. Cookie che utilizziamo", cookies: [
      { name: "Cookie essenziali", desc: "Necessari per il funzionamento della piattaforma. Include token di autenticazione della sessione e cookie di sicurezza. Non possono essere disabilitati." },
      { name: "Cookie funzionali", desc: "Utilizzati per ricordare le tue preferenze come le impostazioni della lingua o l'ultima visualizzazione della dashboard." },
      { name: "Cookie analitici", desc: "Ci aiutano a capire come gli utenti navigano nella piattaforma. Raccogliamo dati anonimi." },
    ]},
    { h: "3. Cookie di terze parti", p: "Possiamo utilizzare servizi di terze parti affidabili che impostano i propri cookie. Questi sono soggetti alle proprie politiche sulla privacy." },
    { h: "4. Gestione dei cookie", p: "Puoi controllare ed eliminare i cookie tramite le impostazioni del browser. La disabilitazione dei cookie essenziali compromette le funzionalità.", list: ["Visualizzare i cookie attualmente memorizzati.", "Eliminare tutti o specifici cookie.", "Bloccare i cookie da siti specifici o da tutti i siti."] },
    { h: "5. Il tuo consenso", p: "Continuando a utilizzare la piattaforma DutyBoost, acconsenti all'uso dei cookie. Puoi ritirare il consenso in qualsiasi momento modificando le impostazioni del browser." },
    { h: "6. Contatto", p: "Domande sull'uso dei cookie: privacy@dutyboost.com" },
  ]},
};

export default function CookiePolicy() {
  const { i18n } = useTranslation();
  const c = content[i18n.language] || content.en;
  return (
    <div className="min-h-screen bg-background font-body">
      <nav className="border-b border-border px-6 h-16 flex items-center justify-between"><Link to="/"><DutyBoostLogo height={150} /></Link><div className="flex items-center gap-3"><LanguageSwitcher /><button onClick={() => window.history.back()} className="text-sm text-muted-foreground hover:text-primary transition-colors">← Back</button></div></nav>
      <div className="max-w-3xl mx-auto px-6 py-16 space-y-8">
        <div><h1 className="text-4xl font-heading font-bold mb-2">{c.title}</h1><p className="text-muted-foreground text-sm">{c.updated}</p></div>
        {c.sections.map((s) => (
          <section key={s.h} className="space-y-3">
            <h2 className="text-xl font-heading font-semibold">{s.h}</h2>
            {s.p && <EmailLinkText text={s.p} />}
            {s.cookies && <div className="space-y-3">{s.cookies.map((ck) => (
              <div key={ck.name} className="bg-card border border-border rounded-xl p-4">
                <p className="font-semibold text-sm mb-1">{ck.name}</p>
                <p className="text-muted-foreground text-sm">{ck.desc}</p>
              </div>
            ))}</div>}
            {s.list && <ul className="list-disc list-inside text-muted-foreground space-y-1 leading-relaxed">{s.list.map((item, i) => <li key={i}>{item}</li>)}</ul>}
          </section>
        ))}
      </div>
      <PageFooter />
    </div>
  );
}