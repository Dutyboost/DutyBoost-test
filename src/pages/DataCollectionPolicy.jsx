import { Link } from "react-router-dom";
import DutyBoostLogo from "../components/DutyBoostLogo";
import PageFooter from "../components/PageFooter";
import { useTranslation } from "react-i18next";
import EmailLinkText from "../components/EmailLinkText";
import LanguageSwitcher from "../components/LanguageSwitcher";

const content = {
  en: { title: "Data Collection & Tracking Policy", updated: "Last updated: September 2026", back: "Back to Home", sections: [
    { h: "1. Data Minimisation", p: "DutyBoost, a Performance-based Customer Acquisition Infrastructure for Global Travel, only collects personal data that is necessary to provide and operate its services. We do not gather more information than is required for each specific purpose, and we regularly review what we hold to remove anything that is no longer needed." },
    { h: "2. Form Consent", p: "Whenever we collect information through a form — such as partner sign-up, contact, or 'request more information' — we ask for explicit consent, explain why the data is needed, and use it only for the stated purpose. Required fields are clearly marked, and we never use form data for unrelated marketing." },
    { h: "3. Tracking & Analytics", p: "We use analytics to understand how the platform is used and to improve it. Tracking is limited to anonymised or pseudonymised data necessary for that purpose. Users can review and manage tracking preferences through our cookie consent controls at any time." },
    { h: "4. Third-Party Embeds & Services", p: "Where third-party content or services are embedded (for example maps, fonts, or video), they are limited to providers acting under data processing agreements. Each third-party service is reviewed for necessity and privacy impact before it is added to the platform." },
    { h: "5. Local Laws & Regulatory Compliance", p: "DutyBoost complies with the laws of the regions in which it operates, including the EU GDPR, the Dutch UAVG, and applicable consumer-protection and travel-retail regulations. Business partners remain responsible for their own local-law and regulatory obligations toward their customers." },
    { h: "6. Contact", p: "For questions about data collection or tracking: privacy@dutyboost.com · DutyBoost B.V., a legal entity registered at the Dutch Chamber of Commerce (Kamer van Koophandel) under number 42053181, Amsterdam, the Netherlands." },
  ]},
  nl: { title: "Beleid voor gegevensverzameling & tracking", updated: "Laatst bijgewerkt: september 2026", back: "Terug naar home", sections: [
    { h: "1. Dataminimalisatie", p: "DutyBoost, a Performance-based Customer Acquisition Infrastructure for Global Travel, verzamelt alleen persoonsgegevens die noodzakelijk zijn om de diensten te leveren en te beheren. Wij verzamelen niet meer informatie dan nodig is voor elk specifiek doel, en wij beoordelen regelmatig wat wij bewaren om alles wat niet langer nodig is te verwijderen." },
    { h: "2. Toestemming bij formulieren", p: "Telkens wanneer wij gegevens via een formulier verzamelen — zoals partnersign-up, contact of 'meer informatie aanvragen' — vragen wij expliciete toestemming, leggen wij uit waarom de gegevens nodig zijn, en gebruiken wij deze alleen voor het genoemde doel. Verplichte velden zijn duidelijk gemarkeerd en wij gebruiken formuliergegevens nooit voor ongerelateerde marketing." },
    { h: "3. Tracking & analyse", p: "Wij gebruiken analyse om te begrijpen hoe het platform wordt gebruikt en om het te verbeteren. Tracking is beperkt tot geanonimiseerde of gepseudonimiseerde gegevens die voor dat doel noodzakelijk zijn. Gebruikers kunnen trackingvoorkeuren op elk moment via onze cookie-toestemmingscontroles bekijken en beheren." },
    { h: "4. Insluitingen & diensten van derden", p: "Waar inhoud of diensten van derden worden ingesloten (bijvoorbeeld kaarten, lettertypen of video), zijn deze beperkt tot providers die werken onder verwerkersovereenkomsten. Elke derdenpartij-dienst wordt vóór toevoeging aan het platform beoordeeld op noodzaak en privacy-impact." },
    { h: "5. Lokale wetgeving & naleving", p: "DutyBoost voldoet aan de wetgeving van de regio's waarin zij actief is, waaronder de EU-AVG, de Nederlandse UAVG en toepasselijke consumentenbeschermings- en travel-retail-regelgeving. Zakelijke partners blijven zelf verantwoordelijk voor hun eigen lokale-wettelijke en regelgevende verplichtingen jegens hun klanten." },
    { h: "6. Contact", p: "Voor vragen over gegevensverzameling of tracking: privacy@dutyboost.com · DutyBoost B.V., een rechtspersoon ingeschreven bij de Kamer van Koophandel onder nummer 42053181, Amsterdam, Nederland." },
  ]},
  de: { title: "Datenerfassungs- & Tracking-Richtlinie", updated: "Zuletzt aktualisiert: September 2026", back: "Zurück zur Startseite", sections: [
    { h: "1. Datenminimierung", p: "DutyBoost, a Performance-based Customer Acquisition Infrastructure for Global Travel, erhebt nur personenbezogene Daten, die zur Bereitstellung und zum Betrieb seiner Dienste erforderlich sind. Wir erfassen nicht mehr Informationen, als für den jeweiligen Zweck nötig sind, und prüfen regelmäßig, welche Daten wir vorhalten, um nicht mehr benötigte zu entfernen." },
    { h: "2. Einwilligung bei Formularen", p: "Wann immer wir Informationen über ein Formular erfassen — etwa Partneranmeldung, Kontakt oder 'Weitere Informationen anfordern' — holen wir ausdrückliche Einwilligung ein, erläutern, warum die Daten benötigt werden, und verwenden sie nur für den angegebenen Zweck. Pflichtfelder sind klar gekennzeichnet, und wir verwenden Formulardaten nie für unrelated Marketing." },
    { h: "3. Tracking & Analytik", p: "Wir nutzen Analytik, um zu verstehen, wie die Plattform verwendet wird, und sie zu verbessern. Tracking ist auf für diesen Zweck notwendige anonymisierte oder pseudonymisierte Daten beschränkt. Nutzer können Tracking-Einstellungen jederzeit über unsere Cookie-Einwilligungssteuerung einsehen und verwalten." },
    { h: "4. Drittanbieter-Einbindungen & Dienste", p: "Wo Inhalte oder Dienste Dritter eingebettet werden (z. B. Karten, Schriftarten oder Videos), sind diese auf Anbieter beschränkt, die unter Auftragsverarbeitungsvereinbarungen handeln. Jeder Drittanbieter-Dienst wird vor der Aufnahme in die Plattform auf Notwendigkeit und Datenschutzauswirkungen geprüft." },
    { h: "5. Ortsrecht & regulatorische Compliance", p: "DutyBoost hält die Gesetze der Regionen ein, in denen es tätig ist, einschließlich der EU-DSGVO, des niederländischen UAVG sowie geltender Verbraucherschutz- und Travel-Retail-Vorschriften. Geschäftspartner bleiben für ihre eigenen lokalen und regulatorischen Pflichten gegenüber ihren Kunden verantwortlich." },
    { h: "6. Kontakt", p: "Fragen zur Datenerfassung oder zum Tracking: privacy@dutyboost.com · DutyBoost B.V., eine im niederländischen Handelsregister (Kamer van Koophandel) eingetragene Gesellschaft unter der Nummer 42053181, Amsterdam, Niederlande." },
  ]},
  fr: { title: "Politique de collecte de données & de suivi", updated: "Dernière mise à jour : septembre 2026", back: "Retour à l'accueil", sections: [
    { h: "1. Minimisation des données", p: "DutyBoost, a Performance-based Customer Acquisition Infrastructure for Global Travel, ne collecte que les données personnelles nécessaires à la fourniture et au fonctionnement de ses services. Nous ne recueillons pas plus d'informations que ce qui est requis pour chaque finalité précise, et nous revoyons régulièrement les données détenues afin de supprimer ce qui n'est plus nécessaire." },
    { h: "2. Consentement aux formulaires", p: "Chaque fois que nous collectons des informations via un formulaire — inscription partenaire, contact ou « demander plus d'informations » — nous recueillons un consentement explicite, expliquons pourquoi les données sont nécessaires et les utilisons uniquement pour la finalité indiquée. Les champs obligatoires sont clairement marqués et nous n'utilisons jamais les données de formulaire pour du marketing sans rapport." },
    { h: "3. Suivi & analytique", p: "Nous utilisons l'analytique pour comprendre comment la plateforme est utilisée et l'améliorer. Le suivi est limité aux données anonymisées ou pseudonymisées nécessaires à cet effet. Les utilisateurs peuvent consulter et gérer leurs préférences de suivi via nos contrôles de consentement aux cookies à tout moment." },
    { h: "4. Intégrations & services tiers", p: "Lorsque des contenus ou services tiers sont intégrés (par exemple cartes, polices ou vidéos), ils sont limités à des prestataires agissant dans le cadre d'accords de traitement des données. Chaque service tiers est examiné pour sa nécessité et son impact sur la confidentialité avant d'être ajouté à la plateforme." },
    { h: "5. Lois locales & conformité réglementaire", p: "DutyBoost se conforme aux lois des régions où il opère, notamment le RGPD de l'UE, l'UAVG néerlandais et les réglementations applicables en matière de protection des consommateurs et de travel retail. Les partenaires commerciaux restent responsables de leurs propres obligations légales et réglementaires locales envers leurs clients." },
    { h: "6. Contact", p: "Pour toute question sur la collecte de données ou le suivi : privacy@dutyboost.com · DutyBoost B.V., entité légale enregistrée à la Chambre de commerce néerlandaise (Kamer van Koophandel) sous le numéro 42053181, Amsterdam, Pays-Bas." },
  ]},
  es: { title: "Política de recopilación de datos y seguimiento", updated: "Última actualización: septiembre de 2026", back: "Volver al inicio", sections: [
    { h: "1. Minimización de datos", p: "DutyBoost, a Performance-based Customer Acquisition Infrastructure for Global Travel, solo recopila los datos personales necesarios para proporcionar y operar sus servicios. No recopilamos más información de la requerida para cada propósito específico, y revisamos periódicamente lo que conservamos para eliminar lo que ya no es necesario." },
    { h: "2. Consentimiento en formularios", p: "Siempre que recopilamos información mediante un formulario — como registro de socio, contacto o 'solicitar más información' — pedimos consentimiento explícito, explicamos por qué se necesitan los datos y los usamos solo para el propósito indicado. Los campos obligatorios están claramente marcados y nunca usamos los datos del formulario para marketing no relacionado." },
    { h: "3. Seguimiento y analítica", p: "Usamos analítica para entender cómo se utiliza la plataforma y mejorarla. El seguimiento se limita a datos anonimizados o seudonimizados necesarios para ese fin. Los usuarios pueden revisar y gestionar sus preferencias de seguimiento a través de nuestros controles de consentimiento de cookies en cualquier momento." },
    { h: "4. Integraciones y servicios de terceros", p: "Cuando se integran contenidos o servicios de terceros (por ejemplo mapas, fuentes o vídeo), se limitan a proveedores que actúan bajo acuerdos de tratamiento de datos. Cada servicio de terceros se revisa por su necesidad e impacto en la privacidad antes de añadirse a la plataforma." },
    { h: "5. Leyes locales y cumplimiento normativo", p: "DutyBoost cumple las leyes de las regiones en las que opera, incluidos el RGPD de la UE, el UAVG neerlandés y la normativa aplicable de protección al consumidor y travel retail. Los socios comerciales siguen siendo responsables de sus propias obligaciones legales y normativas locales hacia sus clientes." },
    { h: "6. Contacto", p: "Para preguntas sobre la recopilación de datos o el seguimiento: privacy@dutyboost.com · DutyBoost B.V., entidad legal registrada en la Cámara de Comercio neerlandesa (Kamer van Koophandel) bajo el número 42053181, Ámsterdam, Países Bajos." },
  ]},
  it: { title: "Politica di raccolta dati e tracciamento", updated: "Ultimo aggiornamento: settembre 2026", back: "Torna alla home", sections: [
    { h: "1. Minimizzazione dei dati", p: "DutyBoost, a Performance-based Customer Acquisition Infrastructure for Global Travel, raccoglie solo i dati personali necessari per fornire e gestire i propri servizi. Non raccogliamo più informazioni di quelle richieste per ogni specifica finalità e rivediamo regolarmente i dati conservati per rimuovere ciò che non è più necessario." },
    { h: "2. Consenso nei moduli", p: "Ogni volta che raccogliamo informazioni tramite un modulo — come registrazione partner, contatto o 'richiedi maggiori informazioni' — chiediamo un consenso esplicito, spieghiamo perché i dati sono necessari e li utilizziamo solo per la finalità indicata. I campi obbligatori sono chiaramente contrassegnati e non utilizziamo mai i dati dei moduli per marketing non correlato." },
    { h: "3. Tracciamento e analitica", p: "Utilizziamo l'analitica per comprendere come viene usata la piattaforma e migliorarla. Il tracciamento è limitato ai dati anonimizzati o pseudonimizzati necessari a tale scopo. Gli utenti possono consultare e gestire le preferenze di tracciamento tramite i nostri controlli di consenso ai cookie in qualsiasi momento." },
    { h: "4. Integrazioni e servizi di terze parti", p: "Quando vengono integrati contenuti o servizi di terze parti (ad esempio mappe, font o video), sono limitati a fornitori che operano nell'ambito di accordi di trattamento dei dati. Ogni servizio di terze parti è valutato per necessità e impatto sulla privacy prima di essere aggiunto alla piattaforma." },
    { h: "5. Leggi locali e conformità normativa", p: "DutyBoost rispetta le leggi delle regioni in cui opera, inclusi il GDPR dell'UE, l'UAVG olandese e le normative applicabili in materia di tutela dei consumatori e travel retail. I partner commerciali restano responsabili dei propri obblighi legali e normativi locali verso i propri clienti." },
    { h: "6. Contatto", p: "Per domande sulla raccolta dei dati o sul tracciamento: privacy@dutyboost.com · DutyBoost B.V., entità legale registrata presso la Camera di Commercio olandese (Kamer van Koophandel) con il numero 42053181, Amsterdam, Paesi Bassi." },
  ]},
};

export default function DataCollectionPolicy() {
  const { i18n } = useTranslation();
  const c = content[i18n.language] || content.en;
  return (
    <div className="min-h-screen bg-background font-body">
      <nav className="border-b border-border px-6 h-16 flex items-center justify-between"><Link to="/"><DutyBoostLogo height={55} /></Link><div className="flex items-center gap-3"><LanguageSwitcher /><button onClick={() => window.history.back()} className="text-sm text-muted-foreground hover:text-primary transition-colors">← Back</button></div></nav>
      <div className="max-w-3xl mx-auto px-6 py-16 space-y-8">
        <div><h1 className="text-4xl font-heading font-bold mb-2">{c.title}</h1><p className="text-muted-foreground text-sm">{c.updated}</p></div>
        {c.sections.map((s) => (
          <section key={s.h} className="space-y-3">
            <h2 className="text-xl font-heading font-semibold">{s.h}</h2>
            {s.p && <EmailLinkText text={s.p} />}
          </section>
        ))}
      </div>
      <PageFooter />
    </div>
  );
}