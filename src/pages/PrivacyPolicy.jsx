import { Link } from "react-router-dom";
import DutyBoostLogo from "../components/DutyBoostLogo";
import PageFooter from "../components/PageFooter";
import { useTranslation } from "react-i18next";
import EmailLinkText from "../components/EmailLinkText";
import LanguageSwitcher from "../components/LanguageSwitcher";

const content = {
  en: { title: "Privacy Policy", updated: "Last updated: November 2026", back: "Back to Home", sections: [
    { h: "1. Introduction", p: "DutyBoost is committed to protecting your personal information. This Privacy Policy explains how we collect, use and safeguard the data you provide when using our platform. DutyBoost operates a performance-based customer acquisition solution for global travel: one shared commercial ecosystem in which three groups take part — Travel Partners, who issue DutyCredits with a confirmed booking (travel agencies, tour operators, airlines, OTAs, accommodation providers, car rental companies, transfer services, cruise lines, rail and coach operators); Travel Retail Partners, who accept and redeem DutyCredits (retailers at airports, sea ports, cruise terminals, rail and coach stations, motorway and en-route outlets, and local town-centre merchants); and Travel Hub Partners, who operate the airports, sea ports and rail stations where those retailers trade. Travelers receive a DutyCredit from their Travel Partner or generate one themselves on the DutyBoost website before they travel. We process data in accordance with GDPR (EU) 2016/679 and applicable travel industry data standards. DutyBoost does not send marketing emails to travelers." },
    { h: "2. Data We Collect", list: [
      "Account data: full name, email address, company name, role, business type (Travel Partner, Travel Retail Partner or Travel Hub Partner) and business registration details.",
      "Booking data: booking or ticket reference, departure or pick-up hub (airport, sea port, rail or coach station), travel date, number of travelers, ticket or booking value and travel type, provided by Travel Partners when a DutyCredit is issued.",
      "Self-service traveler data: where a traveler generates a DutyCredit directly on the DutyBoost website, the email address, travel details and reference they enter.",
      "Transaction data: DutyCredit codes issued and redeemed, discount amounts, redeeming retailer, travel hub and purchase values.",
      "Financial data: bank account details for commission payouts to Travel Partners and for invoicing Travel Retail Partners. We do not store full card numbers.",
      "Usage data: page views, feature interactions, browser type, device type and IP address.",
      "Communication data: emails exchanged with Travel Partners, Travel Retail Partners and Travel Hub Partners in connection with platform activity.",
    ]},
    { h: "3. How We Use Your Data", list: [
      "To generate, validate and manage DutyCredits linked to confirmed travel bookings or to a traveler's own request.",
      "To process and track redemptions at participating Travel Retail Partners, including through their point-of-sale (POS) systems or API integration.",
      "To calculate and pay the Travel Partner Revenue Share and to invoice Travel Retail Partners for the Platform Fee.",
      "To provide Travel Hub Partners with redemption reporting for the retailers trading at their hub.",
      "To process partial and full refunds where a traveler is lawfully entitled to a refund, and to adjust fees and Revenue Shares accordingly.",
      "To send operational, onboarding and transactional emails to Travel Partners, Travel Retail Partners and Travel Hub Partners.",
      "To conduct Know Your Customer (KYC) and anti-money laundering (AML) checks on business partners.",
      "To comply with legal obligations and to improve platform performance and user experience.",
    ]},
    { h: "4. Data Sharing", p: "We do not sell your personal data. We may share data in the following circumstances: with the redeeming Travel Retail Partner (limited to the DutyCredit validation and basket data required at the point of sale); with the issuing Travel Partner (limited to the status of the DutyCredits it issued); with the relevant Travel Hub Partner (limited to redemption reporting for retailers trading at its hub); with our infrastructure and payment service providers under data processing agreements; with airport, port or station authorities and government agencies where legally required; and with regulatory authorities where required by law, including in connection with AML obligations." },
    { h: "5. International Data Transfers", p: "Some of our sub-processors are based outside the European Economic Area (EEA). Where personal data is transferred outside the EEA, we ensure appropriate safeguards are in place, such as Standard Contractual Clauses (SCCs) approved by the European Commission. A full list of sub-processors is available in our Data Processing Agreement." },
    { h: "6. Data Retention", p: "We retain personal data for as long as your account is active or as needed to provide services. Booking and transaction records are retained for a minimum of 7 years in accordance with financial record-keeping obligations. KYC verification records are retained as required by applicable AML regulations. Integration and redemption logs are retained for the duration of the partnership plus the applicable statutory period." },
    { h: "7. Your Rights (GDPR)", p: "If you are based in the EU/EEA, you have the right to: access your personal data; request correction of inaccurate data; request deletion of your data (subject to legal retention obligations); object to or restrict processing; and request data portability. To exercise your rights, contact us at privacy@dutyboost.com. You also have the right to lodge a complaint with your national data protection authority." },
    { h: "8. Security", p: "We use industry-standard encryption (TLS 1.2+ in transit, AES-256 at rest), role-based access control and multi-factor authentication for internal systems. DutyCredit codes are cryptographically unique and single-use. Retailer integrations are secured through authenticated API channels. We conduct regular security assessments and maintain a documented incident response procedure." },
    { h: "9. Traveler Data Notice", p: "DutyBoost processes limited traveler data (name, email, booking reference, departure or pick-up hub and travel date) for the sole purpose of generating and validating DutyCredits. DutyBoost does not send marketing emails to travelers. Where a DutyCredit is issued through a Travel Partner, that Travel Partner is the controller of its travelers' data and is responsible for its own privacy obligations toward its customers. Travel Retail Partners and Travel Hub Partners receive only the minimum data needed to validate a DutyCredit or to report on redemptions." },
    { h: "10. Contact", p: "For privacy-related enquiries: privacy@dutyboost.com · DutyBoost, a legal entity registered at the Dutch Chamber of Commerce (Kamer van Koophandel) under number 42053188, Amsterdam, the Netherlands." },
  ]},
  nl: { title: "Privacybeleid", updated: "Laatst bijgewerkt: november 2026", back: "Terug naar home", sections: [
    { h: "1. Inleiding", p: "DutyBoost verbindt zich tot de bescherming van uw persoonsgegevens. Dit Privacybeleid legt uit hoe wij de gegevens die u verstrekt bij het gebruik van ons platform verzamelen, gebruiken en beschermen. DutyBoost exploiteert een prestatiegebonden klantacquisitieplatform voor wereldwijd reisverkeer: één gedeeld commercieel ecosysteem met drie partijen — Reispartners, die DutyCredits uitgeven bij een bevestigde boeking (reisbureaus, touroperators, luchtvaartmaatschappijen, OTA's, accommodatieproviders, autoverhuurbedrijven, transferservices, cruisevaart-, spoor- en touringcarvervoerders); Reisretailpartners, die DutyCredits accepteren en inwisselen (winkels op luchthavens, in zeehavens en cruiseterminals, op trein- en busstations, langs de snelweg en lokale winkels in het centrum); en Travel Hub-partners, die de luchthavens, zeehavens en treinstations exploiteren waar die winkels handelen. Reizigers ontvangen hun DutyCredit van hun Reispartner of maken er zelf een aan op de DutyBoost-website voordat zij op reis gaan. Wij verwerken gegevens conform de AVG (EU) 2016/679. DutyBoost stuurt geen marketinge-mails naar reizigers." },
    { h: "2. Gegevens die wij verzamelen", list: [
      "Accountgegevens: volledige naam, e-mailadres, bedrijfsnaam, rol, type partner (Reispartner, Reisretailpartner of Travel Hub-partner) en bedrijfsregistratiegegevens.",
      "Boekingsgegevens: boekings- of ticketreferentie, vertrek- of ophaallocatie (luchthaven, zeehaven, trein- of busstation), reisdatum, aantal reizigers, ticket- of boekingswaarde en reistype, verstrekt door Reispartners bij uitgifte van een DutyCredit.",
      "Zelfservice-gegevens van reizigers: wanneer een reiziger zelf een DutyCredit aanmaakt op de DutyBoost-website, het opgegeven e-mailadres, de reisgegevens en de referentie.",
      "Transactiegegevens: uitgegeven en ingewisselde DutyCredit-codes, kortingsbedragen, inwisselende winkel, reishub en aankoopwaarden.",
      "Financiële gegevens: bankgegevens voor commissiebetalingen aan Reispartners en voor facturering van Reisretailpartners. Wij slaan geen volledige kaartnummers op.",
      "Gebruiksgegevens: paginabezoeken, interacties, browsertype, apparaattype en IP-adres.",
      "Communicatiegegevens: e-mails met Reispartners, Reisretailpartners en Travel Hub-partners in verband met platformactiviteiten.",
    ]},
    { h: "3. Hoe wij uw gegevens gebruiken", list: [
      "Voor het genereren, valideren en beheren van DutyCredits gekoppeld aan bevestigde boekingen of aan een eigen verzoek van een reiziger.",
      "Voor het verwerken en bijhouden van inwisselingen bij deelnemende Reisretailpartners, ook via hun kassasysteem (POS) of API-integratie.",
      "Voor het berekenen en uitbetalen van het Inkomstenaandeel van Reispartners en het factureren van Reisretailpartners voor de Platformvergoeding.",
      "Voor het verstrekken van inwisselrapportages aan Travel Hub-partners over de winkels op hun hub.",
      "Voor het verwerken van gedeeltelijke en volledige terugbetalingen en het aanpassen van vergoedingen en Inkomstenandelen.",
      "Voor operationele, onboarding- en transactionele e-mails aan Reispartners, Reisretailpartners en Travel Hub-partners.",
      "Voor KYC- en AML-controles op zakelijke partners.",
      "Om te voldoen aan wettelijke verplichtingen en om prestaties en gebruikerservaring te verbeteren.",
    ]},
    { h: "4. Gegevensdeling", p: "Wij verkopen uw persoonsgegevens niet. Wij kunnen gegevens delen met de inwisselende Reisretailpartner (beperkt tot de validatie- en mandjegegevens die bij de kassa nodig zijn), met de uitgevende Reispartner (beperkt tot de status van de uitgegeven DutyCredits), met de betreffende Travel Hub-partner (beperkt tot inwisselrapportages over winkels op zijn hub), met onze infrastructuur- en betalingsdienstverleners onder verwerkingsovereenkomsten, met luchthaven-, haven- of stationautoriteiten en overheidsinstanties waar wettelijk vereist, en met toezichthouders in verband met AML-verplichtingen." },
    { h: "5. Internationale gegevensoverdracht", p: "Sommige van onze subverwerkers zijn buiten de EER gevestigd. Waar persoonsgegevens buiten de EER worden overgedragen, zorgen wij voor passende waarborgen, zoals door de Europese Commissie goedgekeurde Standaard Contractuele Clausules (SCC's). Een volledige lijst van subverwerkers staat in onze Gegevensverwerkingsovereenkomst." },
    { h: "6. Gegevensbewaring", p: "Wij bewaren persoonsgegevens zolang uw account actief is of zolang dat nodig is om diensten te leveren. Boekings- en transactiegegevens worden minimaal 7 jaar bewaard. KYC-dossiers worden bewaard zoals vereist door AML-wetgeving. Integratie- en inwissellogs worden bewaard gedurende de samenwerking plus de wettelijke bewaartermijn." },
    { h: "7. Uw rechten (AVG)", p: "Als u in de EU/EER gevestigd bent, heeft u recht op inzage, rectificatie, verwijdering (met inachtneming van wettelijke bewaarplichten), bezwaar, beperking en overdraagbaarheid. Neem contact op via privacy@dutyboost.com. U kunt ook een klacht indienen bij uw nationale toezichthouder." },
    { h: "8. Beveiliging", p: "Wij gebruiken versleuteling (TLS 1.2+ tijdens transport, AES-256 in rust), rolgebaseerde toegangscontrole en multi-factor authenticatie. DutyCredit-codes zijn cryptografisch uniek en eenmalig bruikbaar. Retailintegraties verlopen via geauthenticeerde API-kanalen. Wij voeren regelmatige beveiligingsbeoordelingen uit." },
    { h: "9. Notitie reizigersgegevens", p: "DutyBoost verwerkt beperkte reizigersgegevens (naam, e-mail, boekingsreferentie, vertrek- of ophaallocatie en reisdatum) uitsluitend om DutyCredits te genereren en te valideren. DutyBoost stuurt geen marketinge-mails naar reizigers. Wordt een DutyCredit via een Reispartner uitgegeven, dan is die Reispartner verwerkingsverantwoordelijke voor de gegevens van zijn reizigers. Reisretailpartners en Travel Hub-partners ontvangen alleen de minimale gegevens die nodig zijn om een DutyCredit te valideren of over inwisselingen te rapporteren." },
    { h: "10. Contact", p: "Voor privacygerelateerde vragen: privacy@dutyboost.com · DutyBoost, een rechtspersoon ingeschreven bij de Kamer van Koophandel onder nummer 42053188, Amsterdam, Nederland." },
  ]},
  de: { title: "Datenschutzerklärung", updated: "Zuletzt aktualisiert: November 2026", back: "Zurück zur Startseite", sections: [
    { h: "1. Einleitung", p: "DutyBoost verpflichtet sich zum Schutz Ihrer personenbezogenen Daten. Diese Datenschutzerklärung erläutert, wie wir Daten erfassen, verwenden und schützen. DutyBoost betreibt eine leistungsbasierte Kundenakquisitionsplattform für globalen Reiseverkehr: ein gemeinsames kommerzielles Ökosystem mit drei Partnergruppen — Reisepartner, die DutyCredits mit einer bestätigten Buchung ausgeben (Reisebüros, Reiseveranstalter, Fluggesellschaften, OTAs, Unterkunftsanbieter, Autovermietungen, Transferservices, Kreuzfahrt-, Bahn- und Busunternehmen); Reise-Einzelhandelspartner, die DutyCredits akzeptieren und einlösen (Händler an Flughäfen, Seehäfen, Kreuzfahrtterminals, Bahn- und Busbahnhöfen, an Autobahnraststätten und lokale Händler in Innenstädten); und Travel-Hub-Partner, die die Flughäfen, Seehäfen und Bahnhöfe betreiben, an denen diese Händler tätig sind. Reisende erhalten ihren DutyCredit von ihrem Reisepartner oder erstellen ihn vor der Reise selbst auf der DutyBoost-Website. Wir verarbeiten Daten gemäß DSGVO (EU) 2016/679. DutyBoost versendet keine Marketing-E-Mails an Reisende." },
    { h: "2. Erhobene Daten", list: [
      "Kontodaten: vollständiger Name, E-Mail-Adresse, Firmenname, Rolle, Partnertyp (Reisepartner, Reise-Einzelhandelspartner oder Travel-Hub-Partner) und Unternehmensregistrierungsdaten.",
      "Buchungsdaten: Buchungs- oder Ticketreferenz, Abflugs- oder Abholort (Flughafen, Seehafen, Bahn- oder Busbahnhof), Reisedatum, Anzahl der Reisenden, Ticket- oder Buchungswert und Reiseart, bereitgestellt von Reisepartnern bei Ausgabe eines DutyCredits.",
      "Selbstbedienungsdaten von Reisenden: wenn ein Reisender direkt auf der DutyBoost-Website einen DutyCredit erstellt, die angegebene E-Mail-Adresse, Reisedaten und Referenz.",
      "Transaktionsdaten: ausgegebene und eingelöste DutyCredit-Codes, Rabattbeträge, einlösender Händler, Reise-Hub und Kaufwerte.",
      "Finanzdaten: Bankdaten für Provisionsauszahlungen an Reisepartner und für die Rechnungsstellung an Reise-Einzelhandelspartner. Vollständige Kartennummern werden nicht gespeichert.",
      "Nutzungsdaten: Seitenaufrufe, Interaktionen, Browsertyp, Gerätetyp und IP-Adresse.",
      "Kommunikationsdaten: E-Mails mit Reisepartnern, Reise-Einzelhandelspartnern und Travel-Hub-Partnern.",
    ]},
    { h: "3. Verwendung Ihrer Daten", list: [
      "Generierung, Validierung und Verwaltung von DutyCredits für bestätigte Buchungen oder auf eigene Anfrage eines Reisenden.",
      "Verarbeitung und Nachverfolgung von Einlösungen bei teilnehmenden Reise-Einzelhandelspartnern, auch über deren Kassensystem (POS) oder API-Integration.",
      "Berechnung und Auszahlung des Umsatzanteils der Reisepartner sowie Rechnungsstellung der Reise-Einzelhandelspartner für die Plattformgebühr.",
      "Bereitstellung von Einlösereportings für Travel-Hub-Partner zu den Händlern an ihrem Hub.",
      "Verarbeitung teilweiser und vollständiger Erstattungen und Anpassung von Gebühren und Umsatzanteilen.",
      "Versand operativer, Onboarding- und Transaktions-E-Mails an Reisepartner, Reise-Einzelhandelspartner und Travel-Hub-Partner.",
      "KYC- und AML-Prüfungen für Geschäftspartner.",
      "Erfüllung gesetzlicher Pflichten und Verbesserung von Plattformleistung und Nutzererfahrung.",
    ]},
    { h: "4. Datenweitergabe", p: "Wir verkaufen Ihre personenbezogenen Daten nicht. Wir können Daten teilen mit dem einlösenden Reise-Einzelhandelspartner (begrenzt auf Validierungs- und Warenkorbdaten an der Kasse), dem ausgebenden Reisepartner (begrenzt auf den Status der ausgegebenen DutyCredits), dem betreffenden Travel-Hub-Partner (begrenzt auf Einlösereportings für Händler an seinem Hub), unseren Infrastruktur- und Zahlungsdienstleistern unter Datenverarbeitungsverträgen, Flughafen-, Hafen- oder Bahnhofsbehörden und Regierungsstellen, soweit gesetzlich erforderlich, sowie Aufsichtsbehörden im Rahmen von AML-Pflichten." },
    { h: "5. Internationale Datenübermittlung", p: "Einige unserer Unterauftragsverarbeiter befinden sich außerhalb des EWR. Bei Übermittlungen außerhalb des EWR stellen wir geeignete Garantien sicher, etwa von der EU-Kommission genehmigte Standardvertragsklauseln (SCC). Eine vollständige Liste steht im Datenverarbeitungsvertrag." },
    { h: "6. Datenspeicherung", p: "Wir speichern personenbezogene Daten, solange Ihr Konto aktiv ist oder dies zur Leistung erforderlich ist. Buchungs- und Transaktionsdaten werden mindestens 7 Jahre aufbewahrt. KYC-Unterlagen werden gemäß den AML-Vorschriften aufbewahrt. Integrations- und Einlöseprotokolle werden für die Dauer der Partnerschaft zuzüglich der gesetzlichen Frist aufbewahrt." },
    { h: "7. Ihre Rechte (DSGVO)", p: "Wenn Sie im EU/EWR ansässig sind, haben Sie das Recht auf Zugang, Berichtigung, Löschung (vorbehaltlich gesetzlicher Aufbewahrungspflichten), Widerspruch, Einschränkung und Übertragbarkeit. Kontakt: privacy@dutyboost.com. Sie können zudem Beschwerde bei Ihrer Datenschutzbehörde einlegen." },
    { h: "8. Sicherheit", p: "Wir verwenden Verschlüsselung (TLS 1.2+ bei Übertragung, AES-256 im Ruhezustand), rollenbasierte Zugriffskontrolle und Multi-Faktor-Authentifizierung. DutyCredit-Codes sind kryptografisch einzigartig und einmalig verwendbar. Händlerintegrationen laufen über authentifizierte API-Kanäle. Wir führen regelmäßige Sicherheitsbewertungen durch." },
    { h: "9. Hinweis zu Reisendendaten", p: "DutyBoost verarbeitet eingeschränkte Reisendendaten (Name, E-Mail, Buchungsreferenz, Abflugs- oder Abholort und Reisedatum) ausschließlich zur Generierung und Validierung von DutyCredits. DutyBoost versendet keine Marketing-E-Mails an Reisende. Wird ein DutyCredit über einen Reisepartner ausgegeben, ist dieser Verantwortlicher für die Daten seiner Reisenden. Reise-Einzelhandelspartner und Travel-Hub-Partner erhalten nur die Mindestdaten zur Validierung eines DutyCredits oder zur Einlösereporting." },
    { h: "10. Kontakt", p: "Für datenschutzbezogene Anfragen: privacy@dutyboost.com · DutyBoost, eine im niederländischen Handelsregister (Kamer van Koophandel) eingetragene Gesellschaft unter der Nummer 42053188, Amsterdam, Niederlande." },
  ]},
  fr: { title: "Politique de confidentialité", updated: "Dernière mise à jour : novembre 2026", back: "Retour à l'accueil", sections: [
    { h: "1. Introduction", p: "DutyBoost s'engage à protéger vos informations personnelles. Cette politique explique comment nous collectons, utilisons et protégeons vos données. DutyBoost exploite une solution d'acquisition client basée sur la performance pour le voyage mondial : un écosystème commercial partagé réunissant trois groupes — les Partenaires de voyage, qui émettent des DutyCredits avec une réservation confirmée (agences de voyage, tour-opérateurs, compagnies aériennes, OTA, hébergeurs, loueurs de voitures, services de transfert, compagnies de croisière, opérateurs ferroviaires et autocars) ; les Partenaires du retail de voyage, qui acceptent et échangent les DutyCredits (enseignes des aéroports, ports maritimes, terminaux de croisière, gares ferroviaires et routières, aires d'autoroute et commerces locaux du centre-ville) ; et les Partenaires Travel Hub, qui exploitent les aéroports, ports maritimes et gares où ces commerces exercent. Les voyageurs reçoivent leur DutyCredit de leur Partenaire de voyage ou en créent un eux-mêmes sur le site DutyBoost avant de partir. Nous traitons les données conformément au RGPD (UE) 2016/679. DutyBoost n'envoie pas d'e-mails marketing aux voyageurs." },
    { h: "2. Données collectées", list: [
      "Données de compte : nom complet, e-mail, nom d'entreprise, rôle, type de partenaire (Partenaire de voyage, Partenaire du retail de voyage ou Partenaire Travel Hub) et données d'enregistrement.",
      "Données de réservation : référence de réservation ou de billet, point de départ ou de prise en charge (aéroport, port maritime, gare ferroviaire ou routière), date de voyage, nombre de voyageurs, valeur du billet ou de la réservation et type de voyage, fournis par les Partenaires de voyage lors de l'émission d'un DutyCredit.",
      "Données des voyageurs en libre-service : lorsqu'un voyageur crée un DutyCredit directement sur le site DutyBoost, l'e-mail, les détails de voyage et la référence saisis.",
      "Données de transaction : codes DutyCredit émis et échangés, montants de réduction, enseigne ayant procédé à l'échange, hub de voyage et valeurs d'achat.",
      "Données financières : coordonnées bancaires pour les versements de commissions aux Partenaires de voyage et la facturation des Partenaires du retail de voyage. Nous ne stockons pas les numéros de carte complets.",
      "Données d'utilisation : pages visitées, interactions, type de navigateur, type d'appareil et adresse IP.",
      "Données de communication : e-mails échangés avec les Partenaires de voyage, du retail de voyage et Travel Hub.",
    ]},
    { h: "3. Utilisation de vos données", list: [
      "Générer, valider et gérer les DutyCredits liés à des réservations confirmées ou à la demande d'un voyageur.",
      "Traiter et suivre les échanges chez les Partenaires du retail de voyage participants, y compris via leur système de caisse (POS) ou leur intégration API.",
      "Calculer et verser la part de revenus des Partenaires de voyage et facturer les Partenaires du retail de voyage pour les frais de plateforme.",
      "Fournir aux Partenaires Travel Hub des rapports d'échange pour les commerces de leur hub.",
      "Traiter les remboursements partiels et totaux et ajuster les frais et parts de revenus en conséquence.",
      "Envoyer les e-mails opérationnels, d'intégration et transactionnels aux Partenaires de voyage, du retail de voyage et Travel Hub.",
      "Effectuer les vérifications KYC et AML des partenaires commerciaux.",
      "Respecter les obligations légales et améliorer les performances et l'expérience utilisateur.",
    ]},
    { h: "4. Partage des données", p: "Nous ne vendons pas vos données personnelles. Nous pouvons partager des données avec le Partenaire du retail de voyage qui procède à l'échange (limité aux données de validation et de panier nécessaires en caisse), le Partenaire de voyage émetteur (limité au statut des DutyCredits émis), le Partenaire Travel Hub concerné (limité aux rapports d'échange des commerces de son hub), nos prestataires d'infrastructure et de paiement sous accord de traitement, les autorités aéroportuaires, portuaires ou ferroviaires et gouvernementales lorsque la loi l'exige, et les autorités de régulation au titre des obligations AML." },
    { h: "5. Transferts internationaux de données", p: "Certains de nos sous-traitants sont établis en dehors de l'EEE. Nous veillons à mettre en place des garanties appropriées, telles que les Clauses Contractuelles Types (CCT) approuvées par la Commission européenne. La liste complète figure dans notre Accord de traitement des données." },
    { h: "6. Conservation des données", p: "Nous conservons les données personnelles aussi longtemps que votre compte est actif ou que cela est nécessaire au service. Les données de réservation et de transaction sont conservées au minimum 7 ans. Les dossiers KYC sont conservés conformément aux réglementations AML. Les journaux d'intégration et d'échange sont conservés pendant la durée du partenariat plus la période légale applicable." },
    { h: "7. Vos droits (RGPD)", p: "Si vous êtes établi dans l'UE/EEE, vous disposez des droits d'accès, de rectification, d'effacement (sous réserve des obligations légales de conservation), d'opposition, de limitation et de portabilité. Contact : privacy@dutyboost.com. Vous pouvez également introduire une réclamation auprès de votre autorité nationale." },
    { h: "8. Sécurité", p: "Nous utilisons un chiffrement standard (TLS 1.2+ en transit, AES-256 au repos), un contrôle d'accès basé sur les rôles et l'authentification multi-facteurs. Les codes DutyCredit sont cryptographiquement uniques et à usage unique. Les intégrations des commerces passent par des canaux API authentifiés. Nous réalisons des évaluations de sécurité régulières." },
    { h: "9. Avis sur les données des voyageurs", p: "DutyBoost traite des données voyageurs limitées (nom, e-mail, référence de réservation, point de départ ou de prise en charge et date de voyage) dans le seul but de générer et valider des DutyCredits. DutyBoost n'envoie pas d'e-mails marketing aux voyageurs. Lorsqu'un DutyCredit est émis via un Partenaire de voyage, celui-ci est responsable du traitement des données de ses voyageurs. Les Partenaires du retail de voyage et Travel Hub ne reçoivent que le minimum nécessaire pour valider un DutyCredit ou établir un rapport d'échange." },
    { h: "10. Contact", p: "Pour les demandes liées à la confidentialité : privacy@dutyboost.com · DutyBoost, entité légale enregistrée à la Chambre de commerce néerlandaise (Kamer van Koophandel) sous le numéro 42053188, Amsterdam, Pays-Bas." },
  ]},
  es: { title: "Política de privacidad", updated: "Última actualización: noviembre de 2026", back: "Volver al inicio", sections: [
    { h: "1. Introducción", p: "DutyBoost se compromete a proteger tu información personal. Esta política explica cómo recopilamos, usamos y protegemos los datos. DutyBoost opera una solución de captación de clientes basada en el rendimiento para los viajes globales: un ecosistema comercial compartido con tres grupos — Socios de viaje, que emiten DutyCredits con una reserva confirmada (agencias, touroperadores, aerolíneas, OTA, alojamientos, alquiler de coches, servicios de transfer, cruceros, operadores ferroviarios y autocares); Socios de retail de viaje, que aceptan y canjean DutyCredits (comercios de aeropuertos, puertos marítimos, terminales de cruceros, estaciones de tren y autobús, áreas de servicio y comercios locales del centro); y Socios Travel Hub, que operan los aeropuertos, puertos marítimos y estaciones donde operan esos comercios. Los pasajeros reciben su DutyCredit de su Socio de viaje o lo generan ellos mismos en el sitio de DutyBoost antes de viajar. Tratamos los datos conforme al RGPD (UE) 2016/679. DutyBoost no envía correos de marketing a los pasajeros." },
    { h: "2. Datos que recopilamos", list: [
      "Datos de cuenta: nombre completo, correo, nombre de empresa, rol, tipo de socio (Socio de viaje, Socio de retail de viaje o Socio Travel Hub) y datos de registro.",
      "Datos de reserva: referencia de reserva o billete, punto de salida o recogida (aeropuerto, puerto marítimo, estación de tren o autobús), fecha de viaje, número de pasajeros, valor del billete o reserva y tipo de viaje, proporcionados por los Socios de viaje al emitir un DutyCredit.",
      "Datos de pasajeros en autoservicio: cuando un pasajero genera un DutyCredit directamente en el sitio de DutyBoost, el correo, los datos de viaje y la referencia introducidos.",
      "Datos de transacción: códigos DutyCredit emitidos y canjeados, importes de descuento, comercio que canjea, hub de viaje y valores de compra.",
      "Datos financieros: datos bancarios para pagos de comisiones a Socios de viaje y para facturar a los Socios de retail de viaje. No almacenamos números de tarjeta completos.",
      "Datos de uso: páginas visitadas, interacciones, tipo de navegador, dispositivo y dirección IP.",
      "Datos de comunicación: correos intercambiados con Socios de viaje, de retail de viaje y Travel Hub.",
    ]},
    { h: "3. Cómo usamos tus datos", list: [
      "Generar, validar y gestionar DutyCredits vinculados a reservas confirmadas o a la solicitud de un pasajero.",
      "Procesar y rastrear canjes en los Socios de retail de viaje participantes, incluso mediante su sistema de punto de venta (POS) o su integración API.",
      "Calcular y pagar la participación de los Socios de viaje y facturar la tarifa de plataforma a los Socios de retail de viaje.",
      "Proporcionar informes de canje a los Socios Travel Hub sobre los comercios de su hub.",
      "Procesar reembolsos parciales y totales y ajustar tarifas y participaciones en consecuencia.",
      "Enviar correos operativos, de incorporación y transaccionales a Socios de viaje, de retail de viaje y Travel Hub.",
      "Realizar verificaciones KYC y AML sobre socios comerciales.",
      "Cumplir obligaciones legales y mejorar el rendimiento y la experiencia de uso.",
    ]},
    { h: "4. Compartición de datos", p: "No vendemos tus datos personales. Podemos compartir datos con el Socio de retail de viaje que realiza el canje (limitado a los datos de validación y cesta necesarios en caja), el Socio de viaje emisor (limitado al estado de los DutyCredits emitidos), el Socio Travel Hub correspondiente (limitado a informes de canje de los comercios de su hub), nuestros proveedores de infraestructura y pagos bajo acuerdos de tratamiento, autoridades aeroportuarias, portuarias o ferroviarias y gubernamentales cuando la ley lo exija, y autoridades reguladoras por obligaciones AML." },
    { h: "5. Transferencias internacionales de datos", p: "Algunos de nuestros subencargados están fuera del EEE. Cuando se transfieren datos fuera del EEE aplicamos garantías adecuadas, como las Cláusulas Contractuales Tipo (CCT) aprobadas por la Comisión Europea. La lista completa figura en nuestro Acuerdo de procesamiento de datos." },
    { h: "6. Retención de datos", p: "Conservamos los datos personales mientras tu cuenta esté activa o mientras sean necesarios para el servicio. Los registros de reserva y transacción se conservan un mínimo de 7 años. Los registros KYC se conservan según la normativa AML. Los registros de integración y canje se conservan durante la colaboración más el periodo legal aplicable." },
    { h: "7. Tus derechos (RGPD)", p: "Si estás en la UE/EEE tienes derecho de acceso, rectificación, supresión (sujeta a obligaciones legales de conservación), oposición, limitación y portabilidad. Contacto: privacy@dutyboost.com. También puedes presentar una reclamación ante tu autoridad nacional." },
    { h: "8. Seguridad", p: "Usamos cifrado estándar (TLS 1.2+ en tránsito, AES-256 en reposo), control de acceso por roles y autenticación multifactor. Los códigos DutyCredit son criptográficamente únicos y de un solo uso. Las integraciones de los comercios usan canales API autenticados. Realizamos evaluaciones de seguridad periódicas." },
    { h: "9. Aviso sobre datos de pasajeros", p: "DutyBoost trata datos limitados de pasajeros (nombre, correo, referencia de reserva, punto de salida o recogida y fecha de viaje) con la única finalidad de generar y validar DutyCredits. DutyBoost no envía correos de marketing a los pasajeros. Cuando un DutyCredit se emite a través de un Socio de viaje, este es el responsable del tratamiento de los datos de sus pasajeros. Los Socios de retail de viaje y Travel Hub reciben solo lo mínimo necesario para validar un DutyCredit o informar sobre canjes." },
    { h: "10. Contacto", p: "Para consultas sobre privacidad: privacy@dutyboost.com · DutyBoost, entidad legal registrada en la Cámara de Comercio neerlandesa (Kamer van Koophandel) bajo el número 42053188, Ámsterdam, Países Bajos." },
  ]},
  it: { title: "Informativa sulla privacy", updated: "Ultimo aggiornamento: novembre 2026", back: "Torna alla home", sections: [
    { h: "1. Introduzione", p: "DutyBoost si impegna a proteggere le tue informazioni personali. La presente informativa spiega come raccogliamo, utilizziamo e proteggiamo i dati. DutyBoost gestisce una soluzione di acquisizione clienti basata sulle prestazioni per i viaggi globali: un ecosistema commerciale condiviso con tre gruppi — Partner di viaggio, che emettono DutyCredit con una prenotazione confermata (agenzie, tour operator, compagnie aeree, OTA, strutture ricettive, autonoleggi, servizi di transfer, crociere, operatori ferroviari e autobus); Partner del retail di viaggio, che accettano e riscattano DutyCredit (negozi di aeroporti, porti marittimi, terminal crociere, stazioni ferroviarie e degli autobus, aree di servizio e negozi locali del centro); e Partner Travel Hub, che gestiscono gli aeroporti, i porti marittimi e le stazioni in cui operano tali negozi. I viaggiatori ricevono il DutyCredit dal proprio Partner di viaggio o lo generano direttamente sul sito DutyBoost prima di partire. Trattiamo i dati in conformità al GDPR (UE) 2016/679. DutyBoost non invia email di marketing ai viaggiatori." },
    { h: "2. Dati che raccogliamo", list: [
      "Dati dell'account: nome completo, email, ragione sociale, ruolo, tipo di partner (Partner di viaggio, Partner del retail di viaggio o Partner Travel Hub) e dati di registrazione.",
      "Dati di prenotazione: riferimento di prenotazione o biglietto, punto di partenza o di ritiro (aeroporto, porto marittimo, stazione ferroviaria o degli autobus), data di viaggio, numero di viaggiatori, valore del biglietto o della prenotazione e tipo di viaggio, forniti dai Partner di viaggio al momento dell'emissione.",
      "Dati dei viaggiatori in self-service: quando un viaggiatore genera un DutyCredit direttamente sul sito DutyBoost, l'email, i dettagli di viaggio e il riferimento inseriti.",
      "Dati di transazione: codici DutyCredit emessi e riscattati, importi di sconto, negozio che riscatta, hub di viaggio e valori di acquisto.",
      "Dati finanziari: coordinate bancarie per i pagamenti delle provvigioni ai Partner di viaggio e per la fatturazione ai Partner del retail di viaggio. Non memorizziamo numeri di carta completi.",
      "Dati di utilizzo: pagine visitate, interazioni, tipo di browser, dispositivo e indirizzo IP.",
      "Dati di comunicazione: email scambiate con Partner di viaggio, del retail di viaggio e Travel Hub.",
    ]},
    { h: "3. Come utilizziamo i tuoi dati", list: [
      "Generare, validare e gestire DutyCredit collegati a prenotazioni confermate o alla richiesta di un viaggiatore.",
      "Elaborare e monitorare i riscatti presso i Partner del retail di viaggio partecipanti, anche tramite il loro sistema di cassa (POS) o l'integrazione API.",
      "Calcolare e pagare la quota dei Partner di viaggio e fatturare la tariffa di piattaforma ai Partner del retail di viaggio.",
      "Fornire ai Partner Travel Hub report sui riscatti dei negozi del loro hub.",
      "Elaborare rimborsi parziali e totali e rettificare tariffe e quote di conseguenza.",
      "Inviare email operative, di onboarding e transazionali a Partner di viaggio, del retail di viaggio e Travel Hub.",
      "Effettuare verifiche KYC e AML sui partner commerciali.",
      "Adempiere a obblighi legali e migliorare prestazioni ed esperienza d'uso.",
    ]},
    { h: "4. Condivisione dei dati", p: "Non vendiamo i tuoi dati personali. Possiamo condividere dati con il Partner del retail di viaggio che effettua il riscatto (limitato ai dati di validazione e carrello necessari in cassa), il Partner di viaggio emittente (limitato allo stato dei DutyCredit emessi), il Partner Travel Hub competente (limitato ai report sui riscatti dei negozi del suo hub), i fornitori di infrastruttura e pagamenti con accordi di trattamento, le autorità aeroportuali, portuali o ferroviarie e governative ove richiesto dalla legge, e le autorità di vigilanza per gli obblighi AML." },
    { h: "5. Trasferimenti internazionali di dati", p: "Alcuni sub-responsabili hanno sede fuori dal SEE. Per i trasferimenti fuori dal SEE garantiamo salvaguardie adeguate, come le Clausole Contrattuali Standard (SCC) approvate dalla Commissione europea. L'elenco completo è nell'Accordo sul trattamento dei dati." },
    { h: "6. Conservazione dei dati", p: "Conserviamo i dati personali finché l'account è attivo o finché sono necessari al servizio. I record di prenotazione e transazione sono conservati per almeno 7 anni. I fascicoli KYC sono conservati secondo le normative AML. I log di integrazione e riscatto sono conservati per la durata della collaborazione più il periodo di legge." },
    { h: "7. I tuoi diritti (GDPR)", p: "Se sei nell'UE/SEE hai diritto di accesso, rettifica, cancellazione (nei limiti degli obblighi di conservazione), opposizione, limitazione e portabilità. Contatto: privacy@dutyboost.com. Puoi inoltre presentare reclamo alla tua autorità nazionale." },
    { h: "8. Sicurezza", p: "Utilizziamo crittografia standard (TLS 1.2+ in transito, AES-256 a riposo), controllo degli accessi basato sui ruoli e autenticazione a più fattori. I codici DutyCredit sono crittograficamente unici e monouso. Le integrazioni dei negozi passano su canali API autenticati. Conduciamo valutazioni periodiche della sicurezza." },
    { h: "9. Avviso sui dati dei viaggiatori", p: "DutyBoost tratta dati limitati dei viaggiatori (nome, email, riferimento di prenotazione, punto di partenza o di ritiro e data di viaggio) al solo fine di generare e validare DutyCredit. DutyBoost non invia email di marketing ai viaggiatori. Quando un DutyCredit è emesso tramite un Partner di viaggio, questi è titolare del trattamento dei dati dei propri viaggiatori. I Partner del retail di viaggio e Travel Hub ricevono solo il minimo necessario per validare un DutyCredit o rendicontare i riscatti." },
    { h: "10. Contatto", p: "Per richieste relative alla privacy: privacy@dutyboost.com · DutyBoost, entità legale registrata presso la Camera di Commercio olandese (Kamer van Koophandel) con il numero 42053188, Amsterdam, Paesi Bassi." },
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