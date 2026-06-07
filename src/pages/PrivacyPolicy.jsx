import { Link } from "react-router-dom";
import DutyBoostLogo from "../components/DutyBoostLogo";
import PageFooter from "../components/PageFooter";
import { useTranslation } from "react-i18next";
import EmailLinkText from "../components/EmailLinkText";
import LanguageSwitcher from "../components/LanguageSwitcher";

const content = {
  en: { title: "Privacy Policy", updated: "Last updated: April 2026", back: "Back to Home", sections: [
    { h: "1. Introduction", p: "DutyBoost is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard the data you provide when using our platform. DutyBoost operates as a Circular Revenue Ecosystem within the international travel retail sector — connecting travel partners, airport retailers, and travelers through booking-linked DutyCredits. We process data in accordance with GDPR (EU) 2016/679 and applicable travel industry data standards." },
    { h: "2. Data We Collect", list: [
      "Account data: full name, email address, company name, role, and business registration details.",
      "Booking data: Passenger Name Record (PNR) reference, departure airport (IATA code), travel date, number of travelers, ticket value, travel type (short-haul / long-haul), and booking confirmation number.",
      "Transaction data: DutyCredit codes issued and redeemed, discount amounts, point-of-sale retailer identifiers, and purchase values.",
      "Payment data: bank account details (for commission payouts), invoice records. We do not store full card numbers.",
      "Usage data: page views, feature interactions, browser type, device type, and IP address.",
      "Communication data: emails sent and received in connection with platform activity.",
    ]},
    { h: "3. How We Use Your Data", list: [
      "To generate, validate, and manage DutyCredits linked to confirmed flight bookings.",
      "To process and track redemption transactions at airport points of sale.",
      "To calculate and distribute revenue shares and commissions to Travel Partners and Airport Retailers.",
      "To send transactional and booking-related emails to travelers and partners.",
      "To conduct Know Your Customer (KYC) and anti-money laundering (AML) checks on business partners.",
      "To comply with legal obligations, including responding to requests from airport authorities or regulatory bodies where required by applicable law.",
      "To improve platform performance, analytics, and user experience.",
    ]},
    { h: "4. Data Sharing", p: "We do not sell your personal data. We may share data in the following circumstances: with participating Airport Retailers (limited to DutyCredit validation data required at the point of sale); with our infrastructure and payment service providers under data processing agreements; with airport authorities or government agencies where legally required (e.g. in connection with security or customs obligations); and with regulatory authorities where required by law, including in connection with AML obligations." },
    { h: "5. International Data Transfers", p: "Some of our sub-processors are based outside the European Economic Area (EEA). Where personal data is transferred outside the EEA, we ensure appropriate safeguards are in place, such as Standard Contractual Clauses (SCCs) approved by the European Commission. A full list of sub-processors is available in our Data Processing Agreement." },
    { h: "6. Data Retention", p: "We retain personal data for as long as your account is active or as needed to provide services. Booking and transaction records are retained for a minimum of 7 years in accordance with financial record-keeping obligations. KYC verification records are retained as required by applicable AML regulations." },
    { h: "7. Your Rights (GDPR)", p: "If you are based in the EU/EEA, you have the right to: access your personal data; request correction of inaccurate data; request deletion of your data (subject to legal retention obligations); object to or restrict processing; and request data portability. To exercise your rights, contact us at privacy@dutyboost.com. You also have the right to lodge a complaint with your national data protection authority." },
    { h: "8. Security", p: "We use industry-standard encryption (TLS 1.2+ in transit, AES-256 at rest), role-based access control, and multi-factor authentication for internal systems. DutyCredit codes are cryptographically unique and single-use. We conduct regular security assessments and maintain a documented incident response procedure." },
    { h: "9. Contact", p: "For privacy-related enquiries: privacy@dutyboost.com · DutyBoost, a legal entity registered at the Dutch Chamber of Commerce (Kamer van Koophandel) under number 42053181, Amsterdam, the Netherlands." },
  ]},
  nl: { title: "Privacybeleid", updated: "Laatst bijgewerkt: april 2026", back: "Terug naar home", sections: [
    { h: "1. Inleiding", p: "DutyBoost verbindt zich tot de bescherming van uw persoonsgegevens. Dit Privacybeleid legt uit hoe wij de gegevens die u verstrekt bij het gebruik van ons platform verzamelen, gebruiken en beschermen. DutyBoost opereert als een Circulair Omzetecosysteem binnen de internationale reisdetailhandel — reispartners, luchthavenwinkels en reizigers worden verbonden via boekingsgekoppelde DutyCredits. Wij verwerken gegevens in overeenstemming met de AVG (EU) 2016/679." },
    { h: "2. Gegevens die wij verzamelen", list: [
      "Accountgegevens: volledige naam, e-mailadres, bedrijfsnaam, rol en bedrijfsregistratiegegevens.",
      "Boekingsgegevens: PNR-referentie, vertrekhaven (IATA-code), reisdatum, aantal reizigers, ticketwaarde, reistype en boekingsbevestigingsnummer.",
      "Transactiegegevens: uitgegeven en ingewisselde DutyCredit-codes, kortingsbedragen, kassapunt-identificatoren en aankoopwaarden.",
      "Betalingsgegevens: bankgegevens (voor commissiebetalingen), factuurrecords. Wij slaan geen volledige kaartnummers op.",
      "Gebruiksgegevens: paginabezoeken, functies-interacties, browsertype, apparaattype en IP-adres.",
      "Communicatiegegevens: e-mails in verband met platformactiviteiten.",
    ]},
    { h: "3. Hoe wij uw gegevens gebruiken", list: [
      "Voor het genereren, valideren en beheren van DutyCredits gekoppeld aan bevestigde vliegboekingen.",
      "Voor het verwerken en bijhouden van inwisseltransacties op luchthaven-verkooppunten.",
      "Voor het berekenen en uitkeren van commissies aan Reispartners en Luchthavenwinkels.",
      "Voor het verzenden van transactionele e-mails aan reizigers en partners.",
      "Voor KYC- en AML-controles op zakelijke partners.",
      "Om te voldoen aan wettelijke verplichtingen, waaronder verzoeken van luchthavenautoriteiten of regelgevers.",
      "Voor het verbeteren van platformprestaties en gebruikerservaring.",
    ]},
    { h: "4. Gegevensdeling", p: "Wij verkopen uw persoonsgegevens niet. Wij kunnen gegevens delen met deelnemende Luchthavenwinkels (beperkt tot DutyCredit-validatiegegevens), onze infrastructuur- en betalingsdienstverleners, luchthavenautoriteiten of overheidsinstanties waar wettelijk vereist (bijv. in verband met beveiliging of douaneverplichtingen), en regelgevende autoriteiten in verband met AML-verplichtingen." },
    { h: "5. Internationale gegevensoverdracht", p: "Sommige van onze subverwerkers zijn buiten de EER gevestigd. Waar persoonsgegevens buiten de EER worden overgedragen, zorgen wij voor passende waarborgen, zoals door de Europese Commissie goedgekeurde Standaard Contractuele Clausules (SCC's)." },
    { h: "6. Gegevensbewaring", p: "Wij bewaren persoonsgegevens zolang uw account actief is. Boekings- en transactiegegevens worden minimaal 7 jaar bewaard. KYC-verificatiedossiers worden bewaard zoals vereist door toepasselijke AML-wetgeving." },
    { h: "7. Uw rechten (AVG)", p: "Als u in de EU/EER gevestigd bent, heeft u het recht op inzage, rectificatie, verwijdering, bezwaar, beperking en overdraagbaarheid van uw gegevens. Neem contact op via privacy@dutyboost.com. U heeft ook het recht een klacht in te dienen bij uw nationale toezichthouder." },
    { h: "8. Beveiliging", p: "Wij gebruiken versleuteling (TLS 1.2+, AES-256), rolgebaseerde toegangscontrole en multi-factor authenticatie. DutyCredit-codes zijn cryptografisch uniek en eenmalig bruikbaar. Wij voeren regelmatige beveiligingsbeoordelingen uit." },
    { h: "9. Contact", p: "Voor privacygerelateerde vragen: privacy@dutyboost.com · DutyBoost, een rechtspersoon ingeschreven bij de Kamer van Koophandel onder nummer 42053181, Amsterdam, Nederland." },
  ]},
  de: { title: "Datenschutzerklärung", updated: "Zuletzt aktualisiert: April 2026", back: "Zurück zur Startseite", sections: [
    { h: "1. Einleitung", p: "DutyBoost verpflichtet sich zum Schutz Ihrer personenbezogenen Daten. Diese Datenschutzerklärung erläutert, wie wir Daten erfassen, verwenden und schützen. DutyBoost operiert als Circular Revenue Ecosystem im internationalen Reiseeinzelhandel — Reisepartner, Flughafenhändler und Reisende werden über buchungsgebundene DutyCredits verbunden. Wir verarbeiten Daten gemäß DSGVO (EU) 2016/679." },
    { h: "2. Erhobene Daten", list: [
      "Kontodaten: vollständiger Name, E-Mail-Adresse, Firmenname, Rolle und Unternehmensregistrierungsdetails.",
      "Buchungsdaten: PNR-Referenz, Abflughafen (IATA-Code), Reisedatum, Anzahl der Reisenden, Ticketwert, Reiseart und Buchungsbestätigungsnummer.",
      "Transaktionsdaten: ausgestellte und eingelöste DutyCredit-Codes, Rabattbeträge, Händlerkennungen und Kaufwerte.",
      "Zahlungsdaten: Bankdaten (für Provisionsauszahlungen), Rechnungsaufzeichnungen. Vollständige Kartennummern werden nicht gespeichert.",
      "Nutzungsdaten: Seitenaufrufe, Funktionsinteraktionen, Browsertyp, Gerätetyp und IP-Adresse.",
      "Kommunikationsdaten: E-Mails im Zusammenhang mit Plattformaktivitäten.",
    ]},
    { h: "3. Verwendung Ihrer Daten", list: [
      "Generierung, Validierung und Verwaltung von DutyCredits für bestätigte Flugbuchungen.",
      "Verarbeitung und Nachverfolgung von Einlösungstransaktionen an Flughafenverkaufsstellen.",
      "Berechnung und Auszahlung von Provisionen an Reisepartner und Flughafenhändler.",
      "Versand von Transaktions-E-Mails an Reisende und Partner.",
      "KYC- und AML-Prüfungen für Geschäftspartner.",
      "Erfüllung gesetzlicher Verpflichtungen, einschließlich Anfragen von Flughafenbehörden oder Regulierern.",
      "Verbesserung der Plattformleistung und Nutzererfahrung.",
    ]},
    { h: "4. Datenweitergabe", p: "Wir verkaufen Ihre personenbezogenen Daten nicht. Wir können Daten teilen mit teilnehmenden Flughafenhändlern (begrenzt auf DutyCredit-Validierungsdaten), unseren Infrastruktur- und Zahlungsdienstleistern, Flughafenbehörden oder Regierungsbehörden wo gesetzlich erforderlich (z. B. im Zusammenhang mit Sicherheits- oder Zollverpflichtungen), sowie Regulierungsbehörden im Zusammenhang mit AML-Verpflichtungen." },
    { h: "5. Internationale Datenübermittlung", p: "Einige unserer Unterauftragsverarbeiter befinden sich außerhalb des EWR. Bei Datenübermittlungen außerhalb des EWR stellen wir geeignete Schutzmaßnahmen sicher, wie von der EU-Kommission genehmigte Standardvertragsklauseln (SCC)." },
    { h: "6. Datenspeicherung", p: "Wir speichern personenbezogene Daten so lange, wie Ihr Konto aktiv ist. Buchungs- und Transaktionsdaten werden mindestens 7 Jahre aufbewahrt. KYC-Verifizierungsunterlagen werden gemäß AML-Vorschriften aufbewahrt." },
    { h: "7. Ihre Rechte (DSGVO)", p: "Wenn Sie in der EU/EWR ansässig sind, haben Sie das Recht auf Zugang, Berichtigung, Löschung, Widerspruch, Einschränkung und Portabilität Ihrer Daten. Kontaktieren Sie uns unter privacy@dutyboost.com. Sie haben auch das Recht, eine Beschwerde bei Ihrer nationalen Datenschutzbehörde einzureichen." },
    { h: "8. Sicherheit", p: "Wir verwenden Verschlüsselung (TLS 1.2+, AES-256), rollenbasierte Zugriffskontrolle und Multi-Faktor-Authentifizierung. DutyCredit-Codes sind kryptografisch einzigartig und einmalig verwendbar. Wir führen regelmäßige Sicherheitsbewertungen durch." },
    { h: "9. Kontakt", p: "Für datenschutzbezogene Anfragen: privacy@dutyboost.com · DutyBoost, eine im niederländischen Handelsregister (Kamer van Koophandel) eingetragene Gesellschaft unter der Nummer 42053181, Amsterdam, Niederlande." },
  ]},
  fr: { title: "Politique de confidentialité", updated: "Dernière mise à jour : avril 2026", back: "Retour à l'accueil", sections: [
    { h: "1. Introduction", p: "DutyBoost s'engage à protéger vos informations personnelles. Cette politique explique comment nous collectons, utilisons et protégeons vos données. DutyBoost opère comme un Écosystème de Revenus Circulaires dans le secteur du commerce de détail de voyage international — reliant partenaires de voyage, détaillants aéroportuaires et voyageurs via des DutyCredits liés aux réservations. Nous traitons les données conformément au RGPD (UE) 2016/679." },
    { h: "2. Données collectées", list: [
      "Données de compte : nom complet, e-mail, nom d'entreprise, rôle et détails d'enregistrement.",
      "Données de réservation : référence PNR, aéroport de départ (code IATA), date de voyage, nombre de voyageurs, valeur du billet, type de voyage et numéro de confirmation.",
      "Données de transaction : codes DutyCredit émis et échangés, montants de réduction, identifiants de points de vente et valeurs d'achats.",
      "Données de paiement : coordonnées bancaires (pour les versements de commissions), enregistrements de factures. Nous ne stockons pas les numéros de carte complets.",
      "Données d'utilisation : pages visitées, interactions, type de navigateur, type d'appareil et adresse IP.",
      "Données de communication : e-mails liés aux activités de la plateforme.",
    ]},
    { h: "3. Utilisation de vos données", list: [
      "Générer, valider et gérer les DutyCredits liés aux réservations de vols confirmées.",
      "Traiter et suivre les transactions de rachat aux points de vente aéroportuaires.",
      "Calculer et distribuer les commissions aux partenaires de voyage et détaillants.",
      "Envoyer des e-mails transactionnels aux voyageurs et partenaires.",
      "Effectuer des vérifications KYC et AML sur les partenaires commerciaux.",
      "Respecter les obligations légales, y compris les demandes des autorités aéroportuaires ou régulatrices.",
      "Améliorer les performances de la plateforme et l'expérience utilisateur.",
    ]},
    { h: "4. Partage des données", p: "Nous ne vendons pas vos données personnelles. Nous pouvons partager des données avec les détaillants participants (limité aux données de validation DutyCredit), nos prestataires d'infrastructure et de paiement, les autorités aéroportuaires ou gouvernementales lorsque la loi l'exige (ex. obligations douanières ou de sécurité), et les autorités de régulation dans le cadre des obligations AML." },
    { h: "5. Transferts internationaux de données", p: "Certains de nos sous-traitants sont établis en dehors de l'EEE. Nous veillons à mettre en place des garanties appropriées, telles que les Clauses Contractuelles Types (CCT) approuvées par la Commission européenne." },
    { h: "6. Conservation des données", p: "Nous conservons les données personnelles aussi longtemps que votre compte est actif. Les données de réservation et de transaction sont conservées au minimum 7 ans. Les dossiers KYC sont conservés conformément aux réglementations AML applicables." },
    { h: "7. Vos droits (RGPD)", p: "Si vous êtes basé dans l'UE/EEE, vous avez le droit d'accéder, de corriger, de supprimer, de vous opposer, de restreindre et de porter vos données. Contactez-nous à privacy@dutyboost.com. Vous avez également le droit de déposer une plainte auprès de votre autorité nationale de protection des données." },
    { h: "8. Sécurité", p: "Nous utilisons le chiffrement (TLS 1.2+, AES-256), le contrôle d'accès basé sur les rôles et l'authentification multi-facteurs. Les codes DutyCredit sont cryptographiquement uniques et à usage unique. Nous effectuons des évaluations de sécurité régulières." },
    { h: "9. Contact", p: "Pour les demandes liées à la confidentialité : privacy@dutyboost.com · DutyBoost, entité légale enregistrée à la Chambre de commerce néerlandaise (Kamer van Koophandel) sous le numéro 42053181, Amsterdam, Pays-Bas." },
  ]},
  es: { title: "Política de privacidad", updated: "Última actualización: abril de 2026", back: "Volver al inicio", sections: [
    { h: "1. Introducción", p: "DutyBoost se compromete a proteger tu información personal. Esta Política explica cómo recopilamos, usamos y protegemos los datos. DutyBoost opera como un Ecosistema de Ingresos Circulares en el sector internacional del comercio minorista de viajes — conectando socios de viaje, comercios aeroportuarios y viajeros a través de DutyCredits vinculados a reservas. Tratamos los datos conforme al RGPD (UE) 2016/679." },
    { h: "2. Datos que recopilamos", list: [
      "Datos de cuenta: nombre completo, correo electrónico, nombre de empresa, rol y detalles de registro.",
      "Datos de reserva: referencia PNR, aeropuerto de salida (código IATA), fecha de viaje, número de viajeros, valor del billete, tipo de viaje y número de confirmación.",
      "Datos de transacción: códigos DutyCredit emitidos y canjeados, importes de descuento, identificadores de puntos de venta y valores de compra.",
      "Datos de pago: datos bancarios (para pagos de comisiones), registros de facturas. No almacenamos números de tarjeta completos.",
      "Datos de uso: visitas a páginas, interacciones, tipo de navegador, tipo de dispositivo y dirección IP.",
      "Datos de comunicación: correos electrónicos relacionados con la actividad de la plataforma.",
    ]},
    { h: "3. Cómo usamos tus datos", list: [
      "Generar, validar y gestionar DutyCredits vinculados a reservas de vuelo confirmadas.",
      "Procesar y rastrear transacciones de canje en puntos de venta aeroportuarios.",
      "Calcular y distribuir comisiones a socios de viaje y comercios.",
      "Enviar correos transaccionales a viajeros y socios.",
      "Realizar verificaciones KYC y AML sobre socios comerciales.",
      "Cumplir obligaciones legales, incluidas solicitudes de autoridades aeroportuarias o reguladoras.",
      "Mejorar el rendimiento de la plataforma y la experiencia del usuario.",
    ]},
    { h: "4. Compartición de datos", p: "No vendemos tus datos personales. Podemos compartir datos con comercios participantes (limitado a datos de validación DutyCredit), proveedores de infraestructura y pagos, autoridades aeroportuarias o gubernamentales cuando lo exija la ley (ej. obligaciones aduaneras o de seguridad), y autoridades reguladoras en el marco de obligaciones AML." },
    { h: "5. Transferencias internacionales de datos", p: "Algunos de nuestros subencargados están ubicados fuera del EEE. Garantizamos salvaguardias adecuadas, como las Cláusulas Contractuales Tipo (CCT) aprobadas por la Comisión Europea." },
    { h: "6. Retención de datos", p: "Conservamos los datos personales mientras tu cuenta esté activa. Los registros de reserva y transacción se conservan un mínimo de 7 años. Los registros KYC se conservan conforme a la normativa AML aplicable." },
    { h: "7. Tus derechos (RGPD)", p: "Si estás en la UE/EEE, tienes derecho a acceder, corregir, eliminar, oponerte, restringir y portar tus datos. Contáctanos en privacy@dutyboost.com. También tienes derecho a presentar una reclamación ante tu autoridad nacional de protección de datos." },
    { h: "8. Seguridad", p: "Usamos cifrado (TLS 1.2+, AES-256), control de acceso basado en roles y autenticación multifactor. Los códigos DutyCredit son criptográficamente únicos y de un solo uso. Realizamos evaluaciones de seguridad periódicas." },
    { h: "9. Contacto", p: "Para consultas sobre privacidad: privacy@dutyboost.com · DutyBoost, entidad legal registrada en la Cámara de Comercio neerlandesa (Kamer van Koophandel) bajo el número 42053181, Ámsterdam, Países Bajos." },
  ]},
  it: { title: "Informativa sulla privacy", updated: "Ultimo aggiornamento: aprile 2026", back: "Torna alla home", sections: [
    { h: "1. Introduzione", p: "DutyBoost si impegna a proteggere le tue informazioni personali. Questa informativa spiega come raccogliamo, utilizziamo e proteggiamo i dati. DutyBoost opera come un Ecosistema di Ricavi Circolari nel settore internazionale del commercio al dettaglio di viaggio — collegando partner di viaggio, rivenditori aeroportuali e viaggiatori tramite DutyCredit legati alle prenotazioni. Trattiamo i dati in conformità con il GDPR (UE) 2016/679." },
    { h: "2. Dati che raccogliamo", list: [
      "Dati dell'account: nome completo, email, ragione sociale, ruolo e dettagli di registrazione.",
      "Dati di prenotazione: riferimento PNR, aeroporto di partenza (codice IATA), data di viaggio, numero di viaggiatori, valore del biglietto, tipo di viaggio e numero di conferma.",
      "Dati di transazione: codici DutyCredit emessi e riscattati, importi di sconto, identificatori di punti vendita e valori degli acquisti.",
      "Dati di pagamento: coordinate bancarie (per pagamenti di commissioni), registrazioni di fatture. Non memorizziamo numeri di carta completi.",
      "Dati di utilizzo: visualizzazioni di pagine, interazioni, tipo di browser, tipo di dispositivo e indirizzo IP.",
      "Dati di comunicazione: email legate alle attività della piattaforma.",
    ]},
    { h: "3. Come utilizziamo i tuoi dati", list: [
      "Generare, validare e gestire DutyCredit collegati a prenotazioni di volo confermate.",
      "Elaborare e monitorare le transazioni di riscatto presso i punti vendita aeroportuali.",
      "Calcolare e distribuire commissioni a partner di viaggio e rivenditori.",
      "Inviare email transazionali a viaggiatori e partner.",
      "Effettuare verifiche KYC e AML sui partner commerciali.",
      "Adempiere a obblighi legali, incluse richieste di autorità aeroportuali o di regolamentazione.",
      "Migliorare le prestazioni della piattaforma e l'esperienza utente.",
    ]},
    { h: "4. Condivisione dei dati", p: "Non vendiamo i tuoi dati personali. Possiamo condividere dati con rivenditori aeroportuali partecipanti (limitato ai dati di validazione DutyCredit), fornitori di infrastrutture e pagamenti, autorità aeroportuali o governative ove richiesto dalla legge (es. obblighi doganali o di sicurezza), e autorità di regolamentazione nell'ambito degli obblighi AML." },
    { h: "5. Trasferimenti internazionali di dati", p: "Alcuni dei nostri sub-responsabili sono situati al di fuori del SEE. Garantiamo salvaguardie adeguate, come le Clausole Contrattuali Standard (SCC) approvate dalla Commissione europea." },
    { h: "6. Conservazione dei dati", p: "Conserviamo i dati personali finché il tuo account è attivo. I record di prenotazione e transazione vengono conservati per un minimo di 7 anni. I dossier KYC vengono conservati conformemente alle normative AML applicabili." },
    { h: "7. I tuoi diritti (GDPR)", p: "Se sei nell'UE/SEE, hai il diritto di accedere, correggere, cancellare, opporti, limitare e portare i tuoi dati. Contattaci all'indirizzo privacy@dutyboost.com. Hai anche il diritto di presentare un reclamo alla tua autorità nazionale per la protezione dei dati." },
    { h: "8. Sicurezza", p: "Utilizziamo crittografia (TLS 1.2+, AES-256), controllo degli accessi basato sui ruoli e autenticazione a più fattori. I codici DutyCredit sono crittograficamente unici e monouso. Conduciamo valutazioni periodiche della sicurezza." },
    { h: "9. Contatto", p: "Per richieste relative alla privacy: privacy@dutyboost.com · DutyBoost, entità legale registrata presso la Camera di Commercio olandese (Kamer van Koophandel) con il numero 42053181, Amsterdam, Paesi Bassi." },
  ]},
};

export default function PrivacyPolicy() {
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
            {s.list && <ul className="list-disc list-inside text-muted-foreground space-y-1 leading-relaxed">{s.list.map((item, i) => <li key={i}>{item}</li>)}</ul>}
          </section>
        ))}
      </div>
      <PageFooter />
    </div>
  );
}