import { Link } from "react-router-dom";
import DutyBoostLogo from "../components/DutyBoostLogo";
import PageFooter from "../components/PageFooter";
import { useTranslation } from "react-i18next";
import EmailLinkText from "../components/EmailLinkText";
import LanguageSwitcher from "../components/LanguageSwitcher";

const subProcessors = [
  { name: "Base44 Ltd.", role: "Application platform & backend infrastructure", location: "Israel / EU", website: "https://base44.com" },
  { name: "Supabase Inc.", role: "Database hosting and real-time data services", location: "United States (EU region available)", website: "https://supabase.com" },
  { name: "Cloudflare Inc.", role: "CDN, DDoS protection, DNS", location: "United States (global edge nodes)", website: "https://cloudflare.com" },
  { name: "Resend Inc.", role: "Transactional email delivery", location: "United States", website: "https://resend.com" },
  { name: "Stripe Inc.", role: "Payment processing", location: "United States (EU entity: Stripe Payments Europe, Ltd.)", website: "https://stripe.com" },
  { name: "Google LLC", role: "Analytics, workspace tools, and authentication", location: "United States (EU SCCs in place)", website: "https://google.com" },
];

const content = {
  en: { title: "Data Processing Agreement", updated: "Last updated: August 2026 · Governed by GDPR (EU) 2016/679", back: "Back to Home",
    intro: "This Data Processing Agreement (\"DPA\") is entered into between DutyBoost B.V., a legal entity registered at the Dutch Chamber of Commerce (Kamer van Koophandel) under number 42053181 (\"Processor\"), and any business entity (\"Controller\") — including Travel Partners, Airport Retailers, and POS Partners — that accesses or uses the DutyBoost platform (The Circular Revenue Infrastructure for Global Travel). By using DutyBoost, the Controller agrees to the terms of this DPA.",
    subProcessors_label: "Current authorised sub-processors:",
    sections: [
      { h: "1. Definitions", list: ["Personal Data: any information relating to an identified or identifiable natural person.", "Processing: any operation performed on personal data.", "Controller: the entity that determines the purposes and means of processing.", "Processor: DutyBoost, which processes personal data on behalf of the Controller.", "Sub-Processor: any third party engaged by the Processor.", "GDPR: Regulation (EU) 2016/679."] },
      { h: "2. Scope and Purpose", p: "DutyBoost processes personal data on behalf of the Controller solely to provide the DutyBoost platform services — The Circular Revenue Infrastructure for Global Travel — including DutyCredit generation, redemption validation (including via POS Partner infrastructure), transaction management, refund processing, Revenue Share calculation, and related analytics. DutyBoost does not send emails to travelers; it sends emails only to Airport Retailers, Travel Partners, and POS Partners that decide to work with, integrate, or join the ecosystem." },
      { h: "3. Categories of Personal Data", list: ["Identity data: full name, email address.", "Business data: company name, address, VAT/registration number, business type (Travel Partner, Airport Retailer, or POS Partner).", "Booking data: traveler counts, travel dates, departure airports, ticket prices, PNR references.", "Transaction data: DutyCredit codes, redemption records, purchase values, refund records.", "POS integration data: API credentials, technical configuration, redemption event logs.", "Technical data: IP addresses, browser type, session identifiers."] },
      { h: "4. Confidentiality", p: "DutyBoost ensures all personnel who access personal data are bound by confidentiality obligations. Access is restricted on a strict need-to-know basis." },
      { h: "5. Security Measures", list: ["Encryption in transit (TLS 1.2+) and at rest (AES-256).", "Role-based access control with least privilege.", "Multi-factor authentication for all internal platform access.", "Regular security assessments and penetration testing.", "Documented incident response procedures."] },
      { h: "6. Sub-Processors", p: "The Controller grants DutyBoost general written authorisation to engage the sub-processors listed below. DutyBoost will notify the Controller of any changes with at least 30 days' notice." },
      { h: "7. Data Subject Rights", p: "DutyBoost shall assist the Controller in fulfilling obligations to respond to data subject rights requests, including access, rectification, erasure, and portability." },
      { h: "8. Breach Notification", p: "In the event of a personal data breach, DutyBoost shall notify the Controller without undue delay and where feasible no later than 72 hours after becoming aware of the breach." },
      { h: "9. Data Retention and Deletion", p: "Upon termination, DutyBoost shall delete or return all personal data within 30 days at the Controller's choice, and certify in writing that deletion has been completed." },
      { h: "10. Governing Law", p: "This DPA is governed by the laws of the Netherlands. Disputes shall be subject to the courts of Amsterdam." },
      { h: "11. Contact", p: "For all data protection enquiries: privacy@dutyboost.com · DutyBoost B.V., a legal entity registered at the Dutch Chamber of Commerce (Kamer van Koophandel) under number 42053181, Amsterdam, the Netherlands." },
    ]
  },
  nl: { title: "Gegevensverwerkingsovereenkomst", updated: "Laatst bijgewerkt: augustus 2026 · Geregeld door AVG (EU) 2016/679", back: "Terug naar home",
    intro: "Deze Gegevensverwerkingsovereenkomst (\"GVO\") wordt gesloten tussen DutyBoost B.V., een rechtspersoon ingeschreven bij de Kamer van Koophandel onder nummer 42053181 (\"Verwerker\"), en elke zakelijke entiteit (\"Verwerkingsverantwoordelijke\") — waaronder Reispartners, Luchthavenwinkels en POS-partners — die het DutyBoost-platform (The Circular Revenue Infrastructure for Global Travel) gebruikt. Door DutyBoost te gebruiken, gaat de Verwerkingsverantwoordelijke akkoord met de voorwaarden van deze GVO.",
    subProcessors_label: "Huidige geautoriseerde subverwerkers:",
    sections: [
      { h: "1. Definities", list: ["Persoonsgegevens: alle informatie over een geïdentificeerde of identificeerbare natuurlijke persoon.", "Verwerking: elke bewerking op persoonsgegevens.", "Verwerkingsverantwoordelijke: de entiteit die de doeleinden en middelen van de verwerking bepaalt.", "Verwerker: DutyBoost, die persoonsgegevens verwerkt namens de Verwerkingsverantwoordelijke.", "Subverwerker: elke derde partij die door de Verwerker wordt ingeschakeld.", "AVG: Verordening (EU) 2016/679."] },
      { h: "2. Reikwijdte en doel", p: "DutyBoost verwerkt persoonsgegevens namens de Verwerkingsverantwoordelijke uitsluitend om de DutyBoost-platformdiensten te leveren — The Circular Revenue Infrastructure for Global Travel — inclusief het genereren van DutyCredits, inwisselvalidatie (inclusief via POS-partner-infrastructuur), transactiebeheer, terugbetalingen, Inkomstenaandeel-berekening en gerelateerde analyses. DutyBoost stuurt geen e-mails naar reizigers; zij stuurt uitsluitend e-mails naar Luchthavenwinkels, Reispartners en POS-partners die besluiten samen te werken, te integreren of lid te worden van het ecosysteem." },
      { h: "3. Categorieën persoonsgegevens", list: ["Identiteitsgegevens: volledige naam, e-mailadres.", "Bedrijfsgegevens: bedrijfsnaam, adres, btw/registratienummer, bedrijfstype (Reispartner, Luchthavenwinkel of POS-partner).", "Boekingsgegevens: aantallen reizigers, reisdata, vertrekplaatsen, ticketprijzen, PNR-referenties.", "Transactiegegevens: DutyCredit-codes, inwisselrecords, aankoopwaarden, terugbetalingsrecords.", "POS-integratiegegevens: API-credentials, technische configuratie, inwissel-eventlogs.", "Technische gegevens: IP-adressen, browsertype, sessie-identificatoren."] },
      { h: "4. Vertrouwelijkheid", p: "DutyBoost zorgt ervoor dat alle medewerkers die toegang hebben tot persoonsgegevens gebonden zijn aan vertrouwelijkheidsverplichtingen. Toegang is beperkt op basis van strikte need-to-know." },
      { h: "5. Beveiligingsmaatregelen", list: ["Versleuteling in transit (TLS 1.2+) en in rust (AES-256).", "Rolgebaseerde toegangscontrole met minimale rechten.", "Multi-factor authenticatie voor alle interne platformtoegang.", "Regelmatige beveiligingsbeoordelingen en penetratietests.", "Gedocumenteerde incidentresponsprocedures."] },
      { h: "6. Subverwerkers", p: "De Verwerkingsverantwoordelijke verleent DutyBoost algemene schriftelijke toestemming om de onderstaande subverwerkers in te schakelen. DutyBoost zal de Verwerkingsverantwoordelijke minimaal 30 dagen van tevoren informeren over wijzigingen." },
      { h: "7. Rechten van betrokkenen", p: "DutyBoost zal de Verwerkingsverantwoordelijke helpen bij het nakomen van verplichtingen om te reageren op verzoeken van betrokkenen, inclusief inzage, rectificatie, verwijdering en overdraagbaarheid." },
      { h: "8. Meldplicht datalekken", p: "Bij een inbreuk in verband met persoonsgegevens zal DutyBoost de Verwerkingsverantwoordelijke onverwijld en waar mogelijk niet later dan 72 uur na de ontdekking informeren." },
      { h: "9. Gegevensbewaring en -verwijdering", p: "Na beëindiging zal DutyBoost alle persoonsgegevens binnen 30 dagen verwijderen of teruggeven naar keuze van de Verwerkingsverantwoordelijke, en dit schriftelijk bevestigen." },
      { h: "10. Toepasselijk recht", p: "Deze GVO wordt beheerst door Nederlands recht. Geschillen zijn onderworpen aan de rechtbanken van Amsterdam." },
      { h: "11. Contact", p: "Voor alle gegevensbeschermingsvragen: privacy@dutyboost.com · DutyBoost B.V., een rechtspersoon ingeschreven bij de Kamer van Koophandel onder nummer 42053181, Amsterdam, Nederland." },
    ]
  },
  de: { title: "Datenverarbeitungsvertrag", updated: "Zuletzt aktualisiert: August 2026 · Geregelt durch DSGVO (EU) 2016/679", back: "Zurück zur Startseite",
    intro: "Dieser Datenverarbeitungsvertrag (\"DV\") wird zwischen DutyBoost B.V., einer im niederländischen Handelsregister (Kamer van Koophandel) eingetragenen Gesellschaft unter der Nummer 42053181 (\"Auftragsverarbeiter\"), und jeder Geschäftseinheit (\"Verantwortlicher\") — einschließlich Reisepartnern, Flughafenhändlern und POS-Partnern — geschlossen, die die DutyBoost-Plattform (The Circular Revenue Infrastructure for Global Travel) nutzt. Durch die Nutzung von DutyBoost stimmt der Verantwortliche den Bedingungen dieses DV zu.",
    subProcessors_label: "Aktuelle autorisierte Unterauftragsverarbeiter:",
    sections: [
      { h: "1. Definitionen", list: ["Personenbezogene Daten: alle Informationen über eine identifizierte oder identifizierbare natürliche Person.", "Verarbeitung: jede Verarbeitung von personenbezogenen Daten.", "Verantwortlicher: die Einheit, die die Zwecke und Mittel der Verarbeitung bestimmt.", "Auftragsverarbeiter: DutyBoost, der personenbezogene Daten im Auftrag des Verantwortlichen verarbeitet.", "Unterauftragsverarbeiter: jeder Dritte, der vom Auftragsverarbeiter eingesetzt wird.", "DSGVO: Verordnung (EU) 2016/679."] },
      { h: "2. Umfang und Zweck", p: "DutyBoost verarbeitet personenbezogene Daten im Auftrag des Verantwortlichen ausschließlich zur Erbringung der DutyBoost-Plattformdienste — The Circular Revenue Infrastructure for Global Travel — einschließlich DutyCredit-Generierung, Einlösungsvalidierung (einschließlich über POS-Partner-Infrastruktur), Transaktionsverwaltung, Erstattungsverarbeitung, Umsatzanteilberechnung und verwandter Analysen. DutyBoost sendet keine E-Mails an Reisende; sie sendet E-Mails ausschließlich an Flughafenhändler, Reisepartner und POS-Partner, die sich entscheiden, mit dem Ökosystem zusammenzuarbeiten, sich zu integrieren oder ihm beizutreten." },
      { h: "3. Kategorien personenbezogener Daten", list: ["Identitätsdaten: vollständiger Name, E-Mail-Adresse.", "Geschäftsdaten: Firmenname, Adresse, USt-IdNr., Unternehmenstyp (Reisepartner, Flughafenhändler oder POS-Partner).", "Buchungsdaten: Reisendenzahlen, Reisedaten, Abflughäfen, Ticketpreise, PNR-Referenzen.", "Transaktionsdaten: DutyCredit-Codes, Einlösungsaufzeichnungen, Kaufwerte, Erstattungsaufzeichnungen.", "POS-Integrationsdaten: API-Anmeldedaten, technische Konfiguration, Einlösungs-Event-Protokolle.", "Technische Daten: IP-Adressen, Browsertyp, Sitzungskennungen."] },
      { h: "4. Vertraulichkeit", p: "DutyBoost stellt sicher, dass alle Mitarbeiter, die auf personenbezogene Daten zugreifen, durch Vertraulichkeitspflichten gebunden sind. Der Zugang ist auf das Notwendige beschränkt." },
      { h: "5. Sicherheitsmaßnahmen", list: ["Verschlüsselung bei der Übertragung (TLS 1.2+) und im Ruhezustand (AES-256).", "Rollenbasierte Zugangskontrolle mit geringstem Privileg.", "Multi-Faktor-Authentifizierung für alle internen Plattformzugriffe.", "Regelmäßige Sicherheitsbewertungen und Penetrationstests.", "Dokumentierte Incident-Response-Verfahren."] },
      { h: "6. Unterauftragsverarbeiter", p: "Der Verantwortliche erteilt DutyBoost die allgemeine schriftliche Genehmigung, die unten aufgeführten Unterauftragsverarbeiter einzusetzen. DutyBoost wird den Verantwortlichen mit mindestens 30 Tagen Vorankündigung über Änderungen informieren." },
      { h: "7. Rechte betroffener Personen", p: "DutyBoost unterstützt den Verantwortlichen bei der Erfüllung von Verpflichtungen zur Beantwortung von Anfragen betroffener Personen, einschließlich Zugang, Berichtigung, Löschung und Portabilität." },
      { h: "8. Benachrichtigung bei Datenpannen", p: "Im Falle einer Datenpanne informiert DutyBoost den Verantwortlichen unverzüglich und wo möglich nicht später als 72 Stunden nach Bekanntwerden." },
      { h: "9. Datenspeicherung und -löschung", p: "Nach Beendigung löscht oder gibt DutyBoost alle personenbezogenen Daten innerhalb von 30 Tagen nach Wahl des Verantwortlichen zurück und bestätigt die Löschung schriftlich." },
      { h: "10. Anwendbares Recht", p: "Dieser DV unterliegt dem Recht der Niederlande. Streitigkeiten unterliegen den Gerichten in Amsterdam." },
      { h: "11. Kontakt", p: "Für alle Datenschutzanfragen: privacy@dutyboost.com · DutyBoost B.V., eine im niederländischen Handelsregister (Kamer van Koophandel) eingetragene Gesellschaft unter der Nummer 42053181, Amsterdam, Niederlande." },
    ]
  },
  fr: { title: "Accord de traitement des données", updated: "Dernière mise à jour : août 2026 · Régi par le RGPD (UE) 2016/679", back: "Retour à l'accueil",
    intro: "Cet Accord de traitement des données (\"ATD\") est conclu entre DutyBoost B.V., entité légale enregistrée à la Chambre de commerce néerlandaise (Kamer van Koophandel) sous le numéro 42053181 (\"Sous-traitant\"), et toute entité commerciale (\"Responsable du traitement\") — y compris Partenaires de voyage, Détaillants aéroportuaires et Partenaires POS — qui utilise la plateforme DutyBoost (The Circular Revenue Infrastructure for Global Travel). En utilisant DutyBoost, le Responsable accepte les termes de cet ATD.",
    subProcessors_label: "Sous-traitants ultérieurs autorisés actuels :",
    sections: [
      { h: "1. Définitions", list: ["Données personnelles : toute information relative à une personne physique identifiée ou identifiable.", "Traitement : toute opération effectuée sur des données personnelles.", "Responsable du traitement : l'entité qui détermine les finalités et les moyens du traitement.", "Sous-traitant : DutyBoost, qui traite les données pour le compte du Responsable.", "Sous-traitant ultérieur : tout tiers engagé par le Sous-traitant.", "RGPD : Règlement (UE) 2016/679."] },
      { h: "2. Portée et finalité", p: "DutyBoost traite les données personnelles pour le compte du Responsable uniquement pour fournir les services de la plateforme DutyBoost — The Circular Revenue Infrastructure for Global Travel — y compris la génération de DutyCredits, la validation des échanges (y compris via l'infrastructure des Partenaires POS), la gestion des transactions, le traitement des remboursements, le calcul des parts de revenus et les analyses associées. DutyBoost n'envoie pas d'e-mails aux voyageurs ; elle envoie des e-mails uniquement aux Détaillants aéroportuaires, Partenaires de voyage et Partenaires POS qui décident de collaborer, de s'intégrer ou de rejoindre l'écosystème." },
      { h: "3. Catégories de données personnelles", list: ["Données d'identité : nom complet, adresse e-mail.", "Données commerciales : nom d'entreprise, adresse, numéro de TVA/registre, type d'entreprise (Partenaire de voyage, Détaillant aéroportuaire ou Partenaire POS).", "Données de réservation : nombres de voyageurs, dates de voyage, aéroports de départ, prix des billets, références PNR.", "Données de transaction : codes DutyCredit, enregistrements de rachats, valeurs d'achats, enregistrements de remboursements.", "Données d'intégration POS : identifiants API, configuration technique, journaux d'événements d'échange.", "Données techniques : adresses IP, type de navigateur, identifiants de session."] },
      { h: "4. Confidentialité", p: "DutyBoost s'assure que tout le personnel accédant aux données personnelles est soumis à des obligations de confidentialité. L'accès est limité au strict besoin de connaître." },
      { h: "5. Mesures de sécurité", list: ["Chiffrement en transit (TLS 1.2+) et au repos (AES-256).", "Contrôle d'accès basé sur les rôles avec principe du moindre privilège.", "Authentification multi-facteurs pour tous les accès internes.", "Évaluations régulières de sécurité et tests de pénétration.", "Procédures documentées de réponse aux incidents."] },
      { h: "6. Sous-traitants ultérieurs", p: "Le Responsable accorde à DutyBoost l'autorisation écrite générale d'engager les sous-traitants ultérieurs listés ci-dessous. DutyBoost notifiera le Responsable de tout changement avec au moins 30 jours de préavis." },
      { h: "7. Droits des personnes concernées", p: "DutyBoost aidera le Responsable à remplir ses obligations de réponse aux demandes des personnes concernées, notamment l'accès, la rectification, l'effacement et la portabilité." },
      { h: "8. Notification de violation", p: "En cas de violation de données personnelles, DutyBoost notifiera le Responsable sans délai et, si possible, pas plus de 72 heures après en avoir pris connaissance." },
      { h: "9. Conservation et suppression des données", p: "À la résiliation, DutyBoost supprimera ou restituera toutes les données personnelles dans les 30 jours au choix du Responsable, et certifiera par écrit que la suppression a été effectuée." },
      { h: "10. Droit applicable", p: "Cet ATD est régi par le droit néerlandais. Tout litige relève des tribunaux d'Amsterdam." },
      { h: "11. Contact", p: "Pour toute demande relative à la protection des données : privacy@dutyboost.com · DutyBoost B.V., entité légale enregistrée à la Chambre de commerce néerlandaise (Kamer van Koophandel) sous le numéro 42053181, Amsterdam, Pays-Bas." },
    ]
  },
  es: { title: "Acuerdo de procesamiento de datos", updated: "Última actualización: agosto de 2026 · Regido por el RGPD (UE) 2016/679", back: "Volver al inicio",
    intro: "Este Acuerdo de procesamiento de datos (\"APD\") se celebra entre DutyBoost B.V., entidad legal registrada en la Cámara de Comercio neerlandesa (Kamer van Koophandel) bajo el número 42053181 (\"Encargado del tratamiento\"), y cualquier entidad empresarial (\"Responsable del tratamiento\") — incluidos Socios de viaje, Comercios aeroportuarios y Socios POS — que use la plataforma DutyBoost (The Circular Revenue Infrastructure for Global Travel). Al usar DutyBoost, el Responsable acepta los términos de este APD.",
    subProcessors_label: "Subencargados del tratamiento autorizados actualmente:",
    sections: [
      { h: "1. Definiciones", list: ["Datos personales: cualquier información relativa a una persona física identificada o identificable.", "Tratamiento: cualquier operación realizada sobre datos personales.", "Responsable del tratamiento: la entidad que determina los fines y medios del tratamiento.", "Encargado del tratamiento: DutyBoost, que trata datos en nombre del Responsable.", "Subencargado: cualquier tercero contratado por el Encargado.", "RGPD: Reglamento (UE) 2016/679."] },
      { h: "2. Alcance y finalidad", p: "DutyBoost trata datos personales en nombre del Responsable únicamente para prestar los servicios de la plataforma DutyBoost — The Circular Revenue Infrastructure for Global Travel — incluida la generación de DutyCredits, la validación de canjes (incluida vía la infraestructura de Socios POS), la gestión de transacciones, el procesamiento de reembolsos, el cálculo de participaciones y los análisis relacionados. DutyBoost no envía correos a los viajeros; envía correos únicamente a Comercios aeroportuarios, Socios de viaje y Socios POS que deciden colaborar, integrarse o unirse al ecosistema." },
      { h: "3. Categorías de datos personales", list: ["Datos de identidad: nombre completo, dirección de correo electrónico.", "Datos empresariales: nombre de empresa, dirección, NIF/registro, tipo de empresa (Socio de viaje, Comercio aeroportuario o Socio POS).", "Datos de reserva: número de viajeros, fechas de viaje, aeropuertos de salida, precios de billetes, referencias PNR.", "Datos de transacción: códigos DutyCredit, registros de canje, valores de compra, registros de reembolso.", "Datos de integración POS: credenciales API, configuración técnica, registros de eventos de canje.", "Datos técnicos: direcciones IP, tipo de navegador, identificadores de sesión."] },
      { h: "4. Confidencialidad", p: "DutyBoost garantiza que todo el personal que accede a datos personales está sujeto a obligaciones de confidencialidad. El acceso se limita estrictamente a quienes lo necesiten." },
      { h: "5. Medidas de seguridad", list: ["Cifrado en tránsito (TLS 1.2+) y en reposo (AES-256).", "Control de acceso basado en roles con mínimos privilegios.", "Autenticación multifactor para todo acceso interno.", "Evaluaciones de seguridad periódicas y pruebas de penetración.", "Procedimientos documentados de respuesta a incidentes."] },
      { h: "6. Subencargados del tratamiento", p: "El Responsable otorga a DutyBoost autorización escrita general para contratar a los subencargados indicados a continuación. DutyBoost notificará al Responsable cualquier cambio con al menos 30 días de antelación." },
      { h: "7. Derechos de los interesados", p: "DutyBoost ayudará al Responsable a cumplir sus obligaciones de respuesta a las solicitudes de los interesados, incluyendo acceso, rectificación, supresión y portabilidad." },
      { h: "8. Notificación de brechas", p: "En caso de brecha de seguridad, DutyBoost notificará al Responsable sin demora indebida y, cuando sea posible, no más de 72 horas después de tener conocimiento de la misma." },
      { h: "9. Retención y supresión de datos", p: "Al finalizar el servicio, DutyBoost eliminará o devolverá todos los datos personales en un plazo de 30 días según elección del Responsable, y certificará por escrito que la eliminación se ha completado." },
      { h: "10. Ley aplicable", p: "Este APD se rige por la ley neerlandesa. Las disputas estarán sujetas a los tribunales de Ámsterdam." },
      { h: "11. Contacto", p: "Para todas las consultas de protección de datos: privacy@dutyboost.com · DutyBoost B.V., entidad legal registrada en la Cámara de Comercio neerlandesa (Kamer van Koophandel) bajo el número 42053181, Ámsterdam, Países Bajos." },
    ]
  },
  it: { title: "Accordo sul trattamento dei dati", updated: "Ultimo aggiornamento: agosto 2026 · Regolato dal GDPR (UE) 2016/679", back: "Torna alla home",
    intro: "Il presente Accordo sul trattamento dei dati (\"ATD\") è stipulato tra DutyBoost B.V., entità legale registrata presso la Camera di Commercio olandese (Kamer van Koophandel) con il numero 42053181 (\"Responsabile del trattamento\"), e qualsiasi entità aziendale (\"Titolare del trattamento\") — inclusi Partner di viaggio, Rivenditori aeroportuali e Partner POS — che utilizza la piattaforma DutyBoost (The Circular Revenue Infrastructure for Global Travel). Utilizzando DutyBoost, il Titolare accetta i termini di questo ATD.",
    subProcessors_label: "Attuali sub-responsabili del trattamento autorizzati:",
    sections: [
      { h: "1. Definizioni", list: ["Dati personali: qualsiasi informazione relativa a una persona fisica identificata o identificabile.", "Trattamento: qualsiasi operazione eseguita sui dati personali.", "Titolare del trattamento: l'entità che determina le finalità e i mezzi del trattamento.", "Responsabile del trattamento: DutyBoost, che tratta i dati per conto del Titolare.", "Sub-responsabile: qualsiasi terza parte incaricata dal Responsabile.", "GDPR: Regolamento (UE) 2016/679."] },
      { h: "2. Ambito e finalità", p: "DutyBoost tratta i dati personali per conto del Titolare esclusivamente per fornire i servizi della piattaforma DutyBoost — The Circular Revenue Infrastructure for Global Travel — inclusa la generazione di DutyCredit, la validazione dei riscatti (inclusa via l'infrastruttura dei Partner POS), la gestione delle transazioni, l'elaborazione dei rimborsi, il calcolo delle quote e le analisi correlate. DutyBoost non invia email ai viaggiatori; invia email solo a Rivenditori aeroportuali, Partner di viaggio e Partner POS che decidono di collaborare, integrarsi o aderire all'ecosistema." },
      { h: "3. Categorie di dati personali", list: ["Dati di identità: nome completo, indirizzo email.", "Dati aziendali: ragione sociale, indirizzo, partita IVA/registro, tipo di impresa (Partner di viaggio, Rivenditore aeroportuale o Partner POS).", "Dati di prenotazione: numero di viaggiatori, date di viaggio, aeroporti di partenza, prezzi dei biglietti, riferimenti PNR.", "Dati di transazione: codici DutyCredit, registrazioni di riscatti, valori degli acquisti, registrazioni di rimborsi.", "Dati di integrazione POS: credenziali API, configurazione tecnica, registri degli eventi di riscatto.", "Dati tecnici: indirizzi IP, tipo di browser, identificatori di sessione."] },
      { h: "4. Riservatezza", p: "DutyBoost garantisce che tutto il personale che accede ai dati personali sia vincolato da obblighi di riservatezza. L'accesso è limitato a chi ne ha strettamente bisogno." },
      { h: "5. Misure di sicurezza", list: ["Crittografia in transito (TLS 1.2+) e a riposo (AES-256).", "Controllo degli accessi basato sui ruoli con minimo privilegio.", "Autenticazione a più fattori per tutti gli accessi interni.", "Valutazioni periodiche della sicurezza e test di penetrazione.", "Procedure documentate di risposta agli incidenti."] },
      { h: "6. Sub-responsabili del trattamento", p: "Il Titolare concede a DutyBoost l'autorizzazione scritta generale a coinvolgere i sub-responsabili elencati di seguito. DutyBoost notificherà al Titolare qualsiasi modifica con almeno 30 giorni di preavviso." },
      { h: "7. Diritti degli interessati", p: "DutyBoost assisterà il Titolare nell'adempimento degli obblighi di risposta alle richieste degli interessati, inclusi accesso, rettifica, cancellazione e portabilità." },
      { h: "8. Notifica di violazione", p: "In caso di violazione dei dati personali, DutyBoost notificherà al Titolare senza indebito ritardo e, ove possibile, non oltre 72 ore dopo esserne venuto a conoscenza." },
      { h: "9. Conservazione e cancellazione dei dati", p: "Alla risoluzione, DutyBoost cancellerà o restituirà tutti i dati personali entro 30 giorni a scelta del Titolare, e certificerà per iscritto che la cancellazione è stata completata." },
      { h: "10. Legge applicabile", p: "Il presente ATD è regolato dalla legge olandese. Le controversie sono soggette ai tribunali di Amsterdam." },
      { h: "11. Contatto", p: "Per tutte le richieste relative alla protezione dei dati: privacy@dutyboost.com · DutyBoost B.V., entità legale registrata presso la Camera di Commercio olandese (Kamer van Koophandel) con il numero 42053181, Amsterdam, Paesi Bassi." },
    ]
  },
};

export default function DataProcessingAgreement() {
  const { i18n } = useTranslation();
  const c = content[i18n.language] || content.en;
  return (
    <div className="min-h-screen bg-background font-body">
      <nav className="border-b border-border px-6 h-16 flex items-center justify-between"><Link to="/"><DutyBoostLogo height={55} /></Link><div className="flex items-center gap-3"><LanguageSwitcher /><button onClick={() => window.history.back()} className="text-sm text-muted-foreground hover:text-primary transition-colors">← Back</button></div></nav>
      <div className="max-w-3xl mx-auto px-6 py-16 space-y-8">
        <div><h1 className="text-4xl font-heading font-bold mb-2">{c.title}</h1><p className="text-muted-foreground text-sm">{c.updated}</p></div>
        {c.intro && <p className="text-muted-foreground leading-relaxed border-l-4 border-primary/30 pl-4 bg-card rounded-r-xl py-3 pr-4">{c.intro}</p>}
        {c.sections.map((s) => (
          <section key={s.h} className="space-y-3">
            <h2 className="text-xl font-heading font-semibold">{s.h}</h2>
            {s.p && <EmailLinkText text={s.p} />}
            {s.list && <ul className="list-disc list-inside text-muted-foreground space-y-1 leading-relaxed">{s.list.map((item, i) => <li key={i}>{item}</li>)}</ul>}
            {s.h.startsWith("6.") && (
              <div className="space-y-3 mt-2">
                <p className="text-muted-foreground text-sm font-medium">{c.subProcessors_label}</p>
                {subProcessors.map((sp) => (
                  <div key={sp.name} className="bg-card border border-border rounded-xl p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-semibold text-sm">{sp.name}</p>
                        <p className="text-muted-foreground text-sm mt-0.5">{sp.role}</p>
                        <p className="text-muted-foreground text-xs mt-1">📍 {sp.location}</p>
                      </div>
                      <a href={sp.website} target="_blank" rel="noopener noreferrer" className="text-primary text-xs underline shrink-0">{sp.website.replace("https://", "")}</a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        ))}
      </div>
      <PageFooter />
    </div>
  );
}