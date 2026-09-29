import { Link } from "react-router-dom";
import DutyBoostLogo from "../components/DutyBoostLogo";
import PageFooter from "../components/PageFooter";
import { useTranslation } from "react-i18next";
import EmailLinkText from "../components/EmailLinkText";
import LanguageSwitcher from "../components/LanguageSwitcher";

const content = {
  en: { title: "Privacy Policy", updated: "Last updated: August 2026", back: "Back to Home", sections: [
    { h: "1. Introduction", p: "DutyBoost is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard the data you provide when using our platform. DutyBoost operates a Performance-based Customer Acquisition Infrastructure for Global Travel — a shared, performance-based commercial ecosystem connecting Travel Partners, Airport Retailers, POS Partners, and travelers through booking-linked DutyCredits. We process data in accordance with GDPR (EU) 2016/679 and applicable travel industry data standards. DutyBoost does not send emails to travelers; we send emails only to Airport Retailers, Travel Partners, and POS Partners that decide to work with, integrate, or join the ecosystem." },
    { h: "2. Data We Collect", list: [
      "Account data: full name, email address, company name, role, and business registration details (collected from Travel Partners, Airport Retailers, and POS Partners).",
      "Booking data: Passenger Name Record (PNR) reference, departure airport (IATA code), travel date, number of travelers, ticket value, travel type, and booking confirmation number (provided by Travel Partners to generate DutyCredits).",
      "Transaction data: DutyCredit codes issued and redeemed, discount amounts, point-of-sale retailer identifiers, POS partner identifiers, and purchase values.",
      "Payment data: bank account details (for commission payouts to Travel Partners and POS Partners, and invoicing of Airport Retailers). We do not store full card numbers.",
      "POS integration data: technical configuration data, API credentials, and redemption event logs provided by POS Partners.",
      "Usage data: page views, feature interactions, browser type, device type, and IP address.",
      "Communication data: emails sent to and received from Airport Retailers, Travel Partners, and POS Partners in connection with platform activity.",
    ]},
    { h: "3. How We Use Your Data", list: [
      "To generate, validate, and manage DutyCredits linked to confirmed travel bookings.",
      "To process and track redemption transactions at airport points of sale, including through POS Partner infrastructure.",
      "To calculate and distribute Revenue Shares and commissions to Travel Partners and POS Partners, and to invoice Airport Retailers for the Platform Fee.",
      "To process partial and full refunds where a traveler is lawfully entitled to a refund, and to adjust Platform Fees and Revenue Shares accordingly.",
      "To send operational, onboarding, and transactional emails to Airport Retailers, Travel Partners, and POS Partners. DutyBoost does not send emails to travelers.",
      "To conduct Know Your Customer (KYC) and anti-money laundering (AML) checks on business partners.",
      "To comply with legal obligations, including responding to requests from airport authorities or regulatory bodies where required by applicable law.",
      "To improve platform performance, analytics, and user experience.",
    ]},
    { h: "4. Data Sharing", p: "We do not sell your personal data. We may share data in the following circumstances: with participating Airport Retailers (limited to DutyCredit validation data required at the point of sale); with POS Partners (limited to redemption validation and transaction data required to process DutyCredits through their infrastructure); with our infrastructure and payment service providers under data processing agreements; with airport authorities or government agencies where legally required (e.g. in connection with security or customs obligations); and with regulatory authorities where required by law, including in connection with AML obligations." },
    { h: "5. International Data Transfers", p: "Some of our sub-processors are based outside the European Economic Area (EEA). Where personal data is transferred outside the EEA, we ensure appropriate safeguards are in place, such as Standard Contractual Clauses (SCCs) approved by the European Commission. A full list of sub-processors is available in our Data Processing Agreement." },
    { h: "6. Data Retention", p: "We retain personal data for as long as your account is active or as needed to provide services. Booking and transaction records are retained for a minimum of 7 years in accordance with financial record-keeping obligations. KYC verification records are retained as required by applicable AML regulations. POS integration logs are retained for the duration of the partnership plus the applicable statutory period." },
    { h: "7. Your Rights (GDPR)", p: "If you are based in the EU/EEA, you have the right to: access your personal data; request correction of inaccurate data; request deletion of your data (subject to legal retention obligations); object to or restrict processing; and request data portability. To exercise your rights, contact us at privacy@dutyboost.com. You also have the right to lodge a complaint with your national data protection authority." },
    { h: "8. Security", p: "We use industry-standard encryption (TLS 1.2+ in transit, AES-256 at rest), role-based access control, and multi-factor authentication for internal systems. DutyCredit codes are cryptographically unique and single-use. POS Partner integrations are secured using authenticated API channels. We conduct regular security assessments and maintain a documented incident response procedure." },
    { h: "9. Traveler Data Notice", p: "DutyBoost processes limited traveler data (name, email, booking reference, departure airport, travel date) provided by Travel Partners for the sole purpose of generating and validating DutyCredits. DutyBoost does not send marketing or transactional emails to travelers. Travel Partners are the data controllers for their travelers' data and are responsible for their own privacy obligations toward their customers. Airport Retailers and POS Partners receive only the minimum data needed to validate a DutyCredit at the point of sale." },
    { h: "10. Contact", p: "For privacy-related enquiries: privacy@dutyboost.com · DutyBoost B.V., a legal entity registered at the Dutch Chamber of Commerce (Kamer van Koophandel) under number 42053181, Amsterdam, the Netherlands." },
  ]},
  nl: { title: "Privacybeleid", updated: "Laatst bijgewerkt: augustus 2026", back: "Terug naar home", sections: [
    { h: "1. Inleiding", p: "DutyBoost verbindt zich tot de bescherming van uw persoonsgegevens. Dit Privacybeleid legt uit hoe wij de gegevens die u verstrekt bij het gebruik van ons platform verzamelen, gebruiken en beschermen. DutyBoost exploiteert a Performance-based Customer Acquisition Infrastructure for Global Travel — een gedeeld, prestatiegebonden commercieel ecosysteem dat Reispartners, Luchthavenwinkels, POS-partners en reizigers verbindt via boekingsgekoppelde DutyCredits. Wij verwerken gegevens in overeenstemming met de AVG (EU) 2016/679. DutyBoost stuurt geen e-mails naar reizigers; wij sturen uitsluitend e-mails naar Luchthavenwinkels, Reispartners en POS-partners die besluiten samen te werken, te integreren of lid te worden van het ecosysteem." },
    { h: "2. Gegevens die wij verzamelen", list: [
      "Accountgegevens: volledige naam, e-mailadres, bedrijfsnaam, rol en bedrijfsregistratiegegevens (verzameld van Reispartners, Luchthavenwinkels en POS-partners).",
      "Boekingsgegevens: PNR-referentie, vertrekluchthaven (IATA-code), reisdatum, aantal reizigers, ticketwaarde, reistype en boekingsbevestigingsnummer (verstrekt door Reispartners om DutyCredits te genereren).",
      "Transactiegegevens: uitgegeven en ingewisselde DutyCredit-codes, kortingsbedragen, kassapunt-identificatoren, POS-partner-identificatoren en aankoopwaarden.",
      "Betalingsgegevens: bankgegevens (voor commissiebetalingen aan Reispartners en POS-partners, en facturering van Luchthavenwinkels). Wij slaan geen volledige kaartnummers op.",
      "POS-integratiegegevens: technische configuratiegegevens, API-credentials en inwissel-eventlogs verstrekt door POS-partners.",
      "Gebruiksgegevens: paginabezoeken, functies-interacties, browsertype, apparaattype en IP-adres.",
      "Communicatiegegevens: e-mails naar en van Luchthavenwinkels, Reispartners en POS-partners in verband met platformactiviteiten.",
    ]},
    { h: "3. Hoe wij uw gegevens gebruiken", list: [
      "Voor het genereren, valideren en beheren van DutyCredits gekoppeld aan bevestigde reisboekingen.",
      "Voor het verwerken en bijhouden van inwisseltransacties op luchthaven-verkooppunten, inclusief via POS-partner-infrastructuur.",
      "Voor het berekenen en uitkeren van Inkomstenandelen en commissies aan Reispartners en POS-partners, en het factureren van Luchthavenwinkels voor de Platformvergoeding.",
      "Voor het verwerken van gedeeltelijke en volledige terugbetalingen waar een reiziger rechtmatig aanspraak maakt op terugbetaling, en het dienovereenkomstig aanpassen van Platformvergoedingen en Inkomstenandelen.",
      "Voor het verzenden van operationele, onboarding- en transactionele e-mails aan Luchthavenwinkels, Reispartners en POS-partners. DutyBoost stuurt geen e-mails naar reizigers.",
      "Voor KYC- en AML-controles op zakelijke partners.",
      "Om te voldoen aan wettelijke verplichtingen, waaronder verzoeken van luchthavenautoriteiten of regelgevers.",
      "Voor het verbeteren van platformprestaties en gebruikerservaring.",
    ]},
    { h: "4. Gegevensdeling", p: "Wij verkopen uw persoonsgegevens niet. Wij kunnen gegevens delen met deelnemende Luchthavenwinkels (beperkt tot DutyCredit-validatiegegevens), met POS-partners (beperkt tot inwisselvalidatie- en transactiegegevens), onze infrastructuur- en betalingsdienstverleners, luchthavenautoriteiten of overheidsinstanties waar wettelijk vereist, en regelgevende autoriteiten in verband met AML-verplichtingen." },
    { h: "5. Internationale gegevensoverdracht", p: "Sommige van onze subverwerkers zijn buiten de EER gevestigd. Waar persoonsgegevens buiten de EER worden overgedragen, zorgen wij voor passende waarborgen, zoals door de Europese Commissie goedgekeurde Standaard Contractuele Clausules (SCC's)." },
    { h: "6. Gegevensbewaring", p: "Wij bewaren persoonsgegevens zolang uw account actief is. Boekings- en transactiegegevens worden minimaal 7 jaar bewaard. KYC-verificatiedossiers worden bewaard zoals vereist door toepasselijke AML-wetgeving. POS-integratielogs worden bewaard gedurende de samenloop plus de wettelijke bewaartermijn." },
    { h: "7. Uw rechten (AVG)", p: "Als u in de EU/EER gevestigd bent, heeft u het recht op inzage, rectificatie, verwijdering, bezwaar, beperking en overdraagbaarheid van uw gegevens. Neem contact op via privacy@dutyboost.com. U heeft ook het recht een klacht in te dienen bij uw nationale toezichthouder." },
    { h: "8. Beveiliging", p: "Wij gebruiken versleuteling (TLS 1.2+, AES-256), rolgebaseerde toegangscontrole en multi-factor authenticatie. DutyCredit-codes zijn cryptografisch uniek en eenmalig bruikbaar. POS-partner-integraties zijn beveiligd met geauthenticeerde API-kanalen. Wij voeren regelmatige beveiligingsbeoordelingen uit." },
    { h: "9. Reizigersgegevens-notitie", p: "DutyBoost verwerkt beperkte reizigersgegevens (naam, e-mail, boekingsreferentie, vertrekluchthaven, reisdatum) verstrekt door Reispartners, uitsluitend om DutyCredits te genereren en te valideren. DutyBoost stuurt geen marketing- of transactionele e-mails naar reizigers. Reispartners zijn de verwerkingsverantwoordelijken voor de gegevens van hun reizigers en zijn zelf verantwoordelijk voor hun privacyverplichtingen jegens klanten. Luchthavenwinkels en POS-partners ontvangen alleen de minimale gegevens die nodig zijn om een DutyCredit bij de kassa te valideren." },
    { h: "10. Contact", p: "Voor privacygerelateerde vragen: privacy@dutyboost.com · DutyBoost B.V., een rechtspersoon ingeschreven bij de Kamer van Koophandel onder nummer 42053181, Amsterdam, Nederland." },
  ]},
  de: { title: "Datenschutzerklärung", updated: "Zuletzt aktualisiert: August 2026", back: "Zurück zur Startseite", sections: [
    { h: "1. Einleitung", p: "DutyBoost verpflichtet sich zum Schutz Ihrer personenbezogenen Daten. Diese Datenschutzerklärung erläutert, wie wir Daten erfassen, verwenden und schützen. DutyBoost betreibt a Performance-based Customer Acquisition Infrastructure for Global Travel — ein gemeinsames, leistungsbasiertes kommerzielles Ökosystem, das Reisepartner, Flughafenhändler, POS-Partner und Reisende über buchungsgebundene DutyCredits verbindet. Wir verarbeiten Daten gemäß DSGVO (EU) 2016/679. DutyBoost sendet keine E-Mails an Reisende; wir senden E-Mails ausschließlich an Flughafenhändler, Reisepartner und POS-Partner, die sich entscheiden, mit dem Ökosystem zusammenzuarbeiten, sich zu integrieren oder ihm beizutreten." },
    { h: "2. Erhobene Daten", list: [
      "Kontodaten: vollständiger Name, E-Mail-Adresse, Firmenname, Rolle und Unternehmensregistrierungsdetails (erhoben von Reisepartnern, Flughafenhändlern und POS-Partnern).",
      "Buchungsdaten: PNR-Referenz, Abflughafen (IATA-Code), Reisedatum, Anzahl der Reisenden, Ticketwert, Reiseart und Buchungsbestätigungsnummer (von Reisepartnern zur Generierung von DutyCredits bereitgestellt).",
      "Transaktionsdaten: ausgestellte und eingelöste DutyCredit-Codes, Rabattbeträge, Händlerkennungen, POS-Partner-Kennungen und Kaufwerte.",
      "Zahlungsdaten: Bankdaten (für Provisionsauszahlungen an Reisepartner und POS-Partner sowie Rechnungsstellung von Flughafenhändlern). Vollständige Kartennummern werden nicht gespeichert.",
      "POS-Integrationsdaten: technische Konfigurationsdaten, API-Anmeldedaten und Einlösungs-Event-Protokolle von POS-Partnern.",
      "Nutzungsdaten: Seitenaufrufe, Funktionsinteraktionen, Browsertyp, Gerätetyp und IP-Adresse.",
      "Kommunikationsdaten: E-Mails an und von Flughafenhändlern, Reisepartnern und POS-Partnern.",
    ]},
    { h: "3. Verwendung Ihrer Daten", list: [
      "Generierung, Validierung und Verwaltung von DutyCredits für bestätigte Reisebuchungen.",
      "Verarbeitung und Nachverfolgung von Einlösungstransaktionen an Flughafenverkaufsstellen, einschließlich über POS-Partner-Infrastruktur.",
      "Berechnung und Auszahlung von Umsatzanteilen und Provisionen an Reisepartner und POS-Partner sowie Rechnungsstellung von Flughafenhändlern für die Plattformgebühr.",
      "Verarbeitung teilweiser und vollständiger Erstattungen, wenn ein Reisender gesetzlich Anspruch hat, und entsprechende Anpassung von Plattformgebühren und Umsatzanteilen.",
      "Versand operativer, Onboarding- und Transaktions-E-Mails an Flughafenhändler, Reisepartner und POS-Partner. DutyBoost sendet keine E-Mails an Reisende.",
      "KYC- und AML-Prüfungen für Geschäftspartner.",
      "Erfüllung gesetzlicher Verpflichtungen.",
      "Verbesserung der Plattformleistung und Nutzererfahrung.",
    ]},
    { h: "4. Datenweitergabe", p: "Wir verkaufen Ihre personenbezogenen Daten nicht. Wir können Daten teilen mit teilnehmenden Flughafenhändlern (begrenzt auf DutyCredit-Validierungsdaten), mit POS-Partnern (begrenzt auf Einlösevalidierungs- und Transaktionsdaten), unseren Infrastruktur- und Zahlungsdienstleistern, Flughafenbehörden oder Regierungsbehörden wo gesetzlich erforderlich, sowie Regulierungsbehörden im Zusammenhang mit AML-Verpflichtungen." },
    { h: "5. Internationale Datenübermittlung", p: "Einige unserer Unterauftragsverarbeiter befinden sich außerhalb des EWR. Bei Datenübermittlungen außerhalb des EWR stellen wir geeignete Schutzmaßnahmen sicher, wie von der EU-Kommission genehmigte Standardvertragsklauseln (SCC)." },
    { h: "6. Datenspeicherung", p: "Wir speichern personenbezogene Daten so lange, wie Ihr Konto aktiv ist. Buchungs- und Transaktionsdaten werden mindestens 7 Jahre aufbewahrt. KYC-Verifizierungsunterlagen werden gemäß AML-Vorschriften aufbewahrt. POS-Integrationsprotokolle werden für die Dauer der Partnerschaft zuzüglich der gesetzlichen Aufbewahrungsfrist aufbewahrt." },
    { h: "7. Ihre Rechte (DSGVO)", p: "Wenn Sie in der EU/EWR ansässig sind, haben Sie das Recht auf Zugang, Berichtigung, Löschung, Widerspruch, Einschränkung und Portabilität Ihrer Daten. Kontaktieren Sie uns unter privacy@dutyboost.com. Sie haben auch das Recht, eine Beschwerde bei Ihrer nationalen Datenschutzbehörde einzureichen." },
    { h: "8. Sicherheit", p: "Wir verwenden Verschlüsselung (TLS 1.2+, AES-256), rollenbasierte Zugriffskontrolle und Multi-Faktor-Authentifizierung. DutyCredit-Codes sind kryptografisch einzigartig und einmalig verwendbar. POS-Partner-Integrationen sind über authentifizierte API-Kanäle gesichert. Wir führen regelmäßige Sicherheitsbewertungen durch." },
    { h: "9. Hinweis zu Reisendendaten", p: "DutyBoost verarbeitet eingeschränkte Reisendendaten (Name, E-Mail, Buchungsreferenz, Abflughafen, Reisedatum), die von Reisepartnern ausschließlich zur Generierung und Validierung von DutyCredits bereitgestellt werden. DutyBoost sendet keine Marketing- oder Transaktions-E-Mails an Reisende. Reisepartner sind die Verantwortlichen für die Daten ihrer Reisenden und verantwortlich für ihre eigenen Datenschutzverpflichtungen gegenüber ihren Kunden. Flughafenhändler und POS-Partner erhalten nur die Mindestdaten, die zur Validierung eines DutyCredits an der Kasse erforderlich sind." },
    { h: "10. Kontakt", p: "Für datenschutzbezogene Anfragen: privacy@dutyboost.com · DutyBoost B.V., eine im niederländischen Handelsregister (Kamer van Koophandel) eingetragene Gesellschaft unter der Nummer 42053181, Amsterdam, Niederlande." },
  ]},
  fr: { title: "Politique de confidentialité", updated: "Dernière mise à jour : août 2026", back: "Retour à l'accueil", sections: [
    { h: "1. Introduction", p: "DutyBoost s'engage à protéger vos informations personnelles. Cette politique explique comment nous collectons, utilisons et protégeons vos données. DutyBoost exploite a Performance-based Customer Acquisition Infrastructure for Global Travel — un écosystème commercial partagé et basé sur la performance reliant les Partenaires de voyage, Détaillants aéroportuaires, Partenaires POS et voyageurs via des DutyCredits liés aux réservations. Nous traitons les données conformément au RGPD (UE) 2016/679. DutyBoost n'envoie pas d'e-mails aux voyageurs ; nous envoyons des e-mails uniquement aux Détaillants aéroportuaires, Partenaires de voyage et Partenaires POS qui décident de collaborer, de s'intégrer ou de rejoindre l'écosystème." },
    { h: "2. Données collectées", list: [
      "Données de compte : nom complet, e-mail, nom d'entreprise, rôle et détails d'enregistrement (collectés auprès des Partenaires de voyage, Détaillants aéroportuaires et Partenaires POS).",
      "Données de réservation : référence PNR, aéroport de départ (code IATA), date de voyage, nombre de voyageurs, valeur du billet, type de voyage et numéro de confirmation (fournis par les Partenaires de voyage pour générer des DutyCredits).",
      "Données de transaction : codes DutyCredit émis et échangés, montants de réduction, identifiants de points de vente, identifiants de partenaires POS et valeurs d'achats.",
      "Données de paiement : coordonnées bancaires (pour les versements aux Partenaires de voyage et Partenaires POS, et facturation des Détaillants). Nous ne stockons pas les numéros de carte complets.",
      "Données d'intégration POS : données de configuration technique, identifiants API et journaux d'événements d'échange fournis par les Partenaires POS.",
      "Données d'utilisation : pages visitées, interactions, type de navigateur, type d'appareil et adresse IP.",
      "Données de communication : e-mails liés aux activités de la plateforme, échangés avec les Détaillants, Partenaires de voyage et Partenaires POS.",
    ]},
    { h: "3. Utilisation de vos données", list: [
      "Générer, valider et gérer les DutyCredits liés aux réservations de voyage confirmées.",
      "Traiter et suivre les transactions de rachat aux points de vente aéroportuaires, y compris via l'infrastructure des Partenaires POS.",
      "Calculer et distribuer les parts de revenus et commissions aux Partenaires de voyage et Partenaires POS, et facturer les Détaillants pour les frais de plateforme.",
      "Traiter les remboursements partiels et totaux lorsqu'un voyageur y a droit, et ajuster les frais et parts en conséquence.",
      "Envoyer des e-mails opérationnels, d'intégration et transactionnels aux Détaillants, Partenaires de voyage et Partenaires POS. DutyBoost n'envoie pas d'e-mails aux voyageurs.",
      "Effectuer des vérifications KYC et AML sur les partenaires commerciaux.",
      "Respecter les obligations légales.",
      "Améliorer les performances de la plateforme et l'expérience utilisateur.",
    ]},
    { h: "4. Partage des données", p: "Nous ne vendons pas vos données personnelles. Nous pouvons partager des données avec les détaillants participants (limité aux données de validation DutyCredit), les partenaires POS (limité aux données de validation et de transaction), nos prestataires d'infrastructure et de paiement, les autorités aéroportuaires ou gouvernementales lorsque la loi l'exige, et les autorités de régulation dans le cadre des obligations AML." },
    { h: "5. Transferts internationaux de données", p: "Certains de nos sous-traitants sont établis en dehors de l'EEE. Nous veillons à mettre en place des garanties appropriées, telles que les Clauses Contractuelles Types (CCT) approuvées par la Commission européenne." },
    { h: "6. Conservation des données", p: "Nous conservons les données personnelles aussi longtemps que votre compte est actif. Les données de réservation et de transaction sont conservées au minimum 7 ans. Les dossiers KYC sont conservés conformément aux réglementations AML applicables. Les journaux d'intégration POS sont conservés pendant la durée du partenariat plus la période statutaire applicable." },
    { h: "7. Vos droits (RGPD)", p: "Si vous êtes basé dans l'UE/EEE, vous avez le droit d'accéder, de corriger, de supprimer, de vous opposer, de restreindre et de porter vos données. Contactez-nous à privacy@dutyboost.com. Vous avez également le droit de déposer une plainte auprès de votre autorité nationale de protection des données." },
    { h: "8. Sécurité", p: "Nous utilisons le chiffrement (TLS 1.2+, AES-256), le contrôle d'accès basé sur les rôles et l'authentification multi-facteurs. Les codes DutyCredit sont cryptographiquement uniques et à usage unique. Les intégrations des partenaires POS sont sécurisées via des canaux API authentifiés. Nous effectuons des évaluations de sécurité régulières." },
    { h: "9. Avis sur les données des voyageurs", p: "DutyBoost traite des données voyageurs limitées (nom, e-mail, référence de réservation, aéroport de départ, date de voyage) fournies par les Partenaires de voyage, uniquement pour générer et valider des DutyCredits. DutyBoost n'envoie pas d'e-mails marketing ou transactionnels aux voyageurs. Les Partenaires de voyage sont les responsables du traitement des données de leurs voyageurs et sont responsables de leurs propres obligations de confidentialité envers leurs clients. Les Détaillants et Partenaires POS ne reçoivent que les données minimales nécessaires pour valider un DutyCredit au point de vente." },
    { h: "10. Contact", p: "Pour les demandes liées à la confidentialité : privacy@dutyboost.com · DutyBoost B.V., entité légale enregistrée à la Chambre de commerce néerlandaise (Kamer van Koophandel) sous le numéro 42053181, Amsterdam, Pays-Bas." },
  ]},
  es: { title: "Política de privacidad", updated: "Última actualización: agosto de 2026", back: "Volver al inicio", sections: [
    { h: "1. Introducción", p: "DutyBoost se compromete a proteger tu información personal. Esta Política explica cómo recopilamos, usamos y protegemos los datos. DutyBoost opera a Performance-based Customer Acquisition Infrastructure for Global Travel — un ecosistema comercial compartido y basado en el rendimiento que conecta Socios de viaje, Comercios aeroportuarios, Socios POS y viajeros a través de DutyCredits vinculados a reservas. Tratamos los datos conforme al RGPD (UE) 2016/679. DutyBoost no envía correos a los viajeros; enviamos correos únicamente a Comercios aeroportuarios, Socios de viaje y Socios POS que deciden colaborar, integrarse o unirse al ecosistema." },
    { h: "2. Datos que recopilamos", list: [
      "Datos de cuenta: nombre completo, correo, nombre de empresa, rol y detalles de registro (recopilados de Socios de viaje, Comercios aeroportuarios y Socios POS).",
      "Datos de reserva: referencia PNR, aeropuerto de salida (código IATA), fecha de viaje, número de viajeros, valor del billete, tipo de viaje y número de confirmación (proporcionados por los Socios de viaje para generar DutyCredits).",
      "Datos de transacción: códigos DutyCredit emitidos y canjeados, importes de descuento, identificadores de puntos de venta, identificadores de socios POS y valores de compra.",
      "Datos de pago: datos bancarios (para pagos a Socios de viaje y Socios POS, y facturación de Comercios). No almacenamos números de tarjeta completos.",
      "Datos de integración POS: datos de configuración técnica, credenciales API y registros de eventos de canje proporcionados por los Socios POS.",
      "Datos de uso: visitas a páginas, interacciones, tipo de navegador, tipo de dispositivo y dirección IP.",
      "Datos de comunicación: correos relacionados con la actividad de la plataforma, intercambiados con Comercios, Socios de viaje y Socios POS.",
    ]},
    { h: "3. Cómo usamos tus datos", list: [
      "Generar, validar y gestionar DutyCredits vinculados a reservas de viaje confirmadas.",
      "Procesar y rastrear transacciones de canje en puntos de venta aeroportuarios, incluyendo vía la infraestructura de los Socios POS.",
      "Calcular y distribuir participaciones y comisiones a Socios de viaje y Socios POS, y facturar a los Comercios por la tarifa de plataforma.",
      "Procesar reembolsos parciales y totales cuando un viajero tiene derecho a ello, y ajustar tarifas y participaciones en consecuencia.",
      "Enviar correos operativos, de incorporación y transaccionales a Comercios, Socios de viaje y Socios POS. DutyBoost no envía correos a los viajeros.",
      "Realizar verificaciones KYC y AML sobre socios comerciales.",
      "Cumplir obligaciones legales.",
      "Mejorar el rendimiento de la plataforma y la experiencia del usuario.",
    ]},
    { h: "4. Compartición de datos", p: "No vendemos tus datos personales. Podemos compartir datos con comercios participantes (limitado a datos de validación DutyCredit), socios POS (limitado a datos de validación y transacción), proveedores de infraestructura y pagos, autoridades aeroportuarias o gubernamentales cuando lo exija la ley, y autoridades reguladoras en el marco de obligaciones AML." },
    { h: "5. Transferencias internacionales de datos", p: "Algunos de nuestros subencargados están ubicados fuera del EEE. Garantizamos salvaguardias adecuadas, como las Cláusulas Contractuales Tipo (CCT) aprobadas por la Comisión Europea." },
    { h: "6. Retención de datos", p: "Conservamos los datos personales mientras tu cuenta esté activa. Los registros de reserva y transacción se conservan un mínimo de 7 años. Los registros KYC se conservan conforme a la normativa AML aplicable. Los registros de integración POS se conservan durante la duración de la colaboración más el período legal aplicable." },
    { h: "7. Tus derechos (RGPD)", p: "Si estás en la UE/EEE, tienes derecho a acceder, corregir, eliminar, oponerte, restringir y portar tus datos. Contáctanos en privacy@dutyboost.com. También tienes derecho a presentar una reclamación ante tu autoridad nacional de protección de datos." },
    { h: "8. Seguridad", p: "Usamos cifrado (TLS 1.2+, AES-256), control de acceso basado en roles y autenticación multifactor. Los códigos DutyCredit son criptográficamente únicos y de un solo uso. Las integraciones de socios POS están protegidas mediante canales API autenticados. Realizamos evaluaciones de seguridad periódicas." },
    { h: "9. Aviso sobre datos de viajeros", p: "DutyBoost trata datos limitados de viajeros (nombre, correo, referencia de reserva, aeropuerto de salida, fecha de viaje) proporcionados por los Socios de viaje, únicamente para generar y validar DutyCredits. DutyBoost no envía correos de marketing o transaccionales a los viajeros. Los Socios de viaje son los responsables del tratamiento de los datos de sus viajeros y son responsables de sus propias obligaciones de privacidad hacia sus clientes. Los Comercios y Socios POS reciben solo los datos mínimos necesarios para validar un DutyCredit en el punto de venta." },
    { h: "10. Contacto", p: "Para consultas sobre privacidad: privacy@dutyboost.com · DutyBoost B.V., entidad legal registrada en la Cámara de Comercio neerlandesa (Kamer van Koophandel) bajo el número 42053181, Ámsterdam, Países Bajos." },
  ]},
  it: { title: "Informativa sulla privacy", updated: "Ultimo aggiornamento: agosto 2026", back: "Torna alla home", sections: [
    { h: "1. Introduzione", p: "DutyBoost si impegna a proteggere le tue informazioni personali. Questa informativa spiega come raccogliamo, utilizziamo e proteggiamo i dati. DutyBoost gestisce a Performance-based Customer Acquisition Infrastructure for Global Travel — un ecosistema commerciale condiviso e basato sulle prestazioni che collega Partner di viaggio, Rivenditori aeroportuali, Partner POS e viaggiatori tramite DutyCredit legati alle prenotazioni. Trattiamo i dati in conformità con il GDPR (UE) 2016/679. DutyBoost non invia email ai viaggiatori; inviamo email solo a Rivenditori aeroportuali, Partner di viaggio e Partner POS che decidono di collaborare, integrarsi o aderire all'ecosistema." },
    { h: "2. Dati che raccogliamo", list: [
      "Dati dell'account: nome completo, email, ragione sociale, ruolo e dettagli di registrazione (raccolti da Partner di viaggio, Rivenditori aeroportuali e Partner POS).",
      "Dati di prenotazione: riferimento PNR, aeroporto di partenza (codice IATA), data di viaggio, numero di viaggiatori, valore del biglietto, tipo di viaggio e numero di conferma (forniti dai Partner di viaggio per generare DutyCredit).",
      "Dati di transazione: codici DutyCredit emessi e riscattati, importi di sconto, identificatori di punti vendita, identificatori di partner POS e valori degli acquisti.",
      "Dati di pagamento: coordinate bancarie (per pagamenti a Partner di viaggio e Partner POS, e fatturazione dei Rivenditori). Non memorizziamo numeri di carta completi.",
      "Dati di integrazione POS: dati di configurazione tecnica, credenziali API e registri degli eventi di riscatto forniti dai Partner POS.",
      "Dati di utilizzo: visualizzazioni di pagine, interazioni, tipo di browser, tipo di dispositivo e indirizzo IP.",
      "Dati di comunicazione: email legate alle attività della piattaforma, scambiate con Rivenditori, Partner di viaggio e Partner POS.",
    ]},
    { h: "3. Come utilizziamo i tuoi dati", list: [
      "Generare, validare e gestire DutyCredit collegati a prenotazioni di viaggio confermate.",
      "Elaborare e monitorare le transazioni di riscatto presso i punti vendita aeroportuali, inclusa via l'infrastruttura dei Partner POS.",
      "Calcolare e distribuire quote di ricavi e provvigioni a Partner di viaggio e Partner POS, e fatturare i Rivenditori per la tariffa di piattaforma.",
      "Elaborare rimborsi parziali e totali quando un viaggiatore ne ha diritto, e rettificare tariffe e quote di conseguenza.",
      "Inviare email operative, di onboarding e transazionali a Rivenditori, Partner di viaggio e Partner POS. DutyBoost non invia email ai viaggiatori.",
      "Effettuare verifiche KYC e AML sui partner commerciali.",
      "Adempiere a obblighi legali.",
      "Migliorare le prestazioni della piattaforma e l'esperienza utente.",
    ]},
    { h: "4. Condivisione dei dati", p: "Non vendiamo i tuoi dati personali. Possiamo condividere dati con rivenditori aeroportuali partecipanti (limitato ai dati di validazione DutyCredit), partner POS (limitato ai dati di validazione e transazione), fornitori di infrastrutture e pagamenti, autorità aeroportuali o governative ove richiesto dalla legge, e autorità di regolamentazione nell'ambito degli obblighi AML." },
    { h: "5. Trasferimenti internazionali di dati", p: "Alcuni dei nostri sub-responsabili sono situati al di fuori del SEE. Garantiamo salvaguardie adeguate, come le Clausole Contrattuali Standard (SCC) approvate dalla Commissione europea." },
    { h: "6. Conservazione dei dati", p: "Conserviamo i dati personali finché il tuo account è attivo. I record di prenotazione e transazione vengono conservati per un minimo di 7 anni. I dossier KYC vengono conservati conformemente alle normative AML applicabili. I registri di integrazione POS sono conservati per la durata della collaborazione più il periodo legale applicabile." },
    { h: "7. I tuoi diritti (GDPR)", p: "Se sei nell'UE/SEE, hai il diritto di accedere, correggere, cancellare, opporti, limitare e portare i tuoi dati. Contattaci all'indirizzo privacy@dutyboost.com. Hai anche il diritto di presentare un reclamo alla tua autorità nazionale per la protezione dei dati." },
    { h: "8. Sicurezza", p: "Utilizziamo crittografia (TLS 1.2+, AES-256), controllo degli accessi basato sui ruoli e autenticazione a più fattori. I codici DutyCredit sono crittograficamente unici e monouso. Le integrazioni dei partner POS sono protette tramite canali API autenticati. Conduciamo valutazioni periodiche della sicurezza." },
    { h: "9. Avviso sui dati dei viaggiatori", p: "DutyBoost tratta dati limitati dei viaggiatori (nome, email, riferimento di prenotazione, aeroporto di partenza, data di viaggio) forniti dai Partner di viaggio, esclusivamente per generare e validare DutyCredit. DutyBoost non invia email di marketing o transazionali ai viaggiatori. I Partner di viaggio sono i titolari del trattamento dei dati dei propri viaggiatori e sono responsabili dei propri obblighi di privacy verso i clienti. I Rivenditori e i Partner POS ricevono solo i dati minimi necessari per validare un DutyCredit al punto vendita." },
    { h: "10. Contatto", p: "Per richieste relative alla privacy: privacy@dutyboost.com · DutyBoost B.V., entità legale registrata presso la Camera di Commercio olandese (Kamer van Koophandel) con il numero 42053181, Amsterdam, Paesi Bassi." },
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