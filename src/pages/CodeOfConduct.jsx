import { Link } from "react-router-dom";
import DutyBoostLogo from "../components/DutyBoostLogo";
import PageFooter from "../components/PageFooter";
import { useTranslation } from "react-i18next";
import EmailLinkText from "../components/EmailLinkText";

const content = {
  en: { title: "Code of Conduct", updated: "Last updated: April 2026", back: "Back to Home", sections: [
    { h: "1. Our Commitment", p: "DutyBoost is built on the principle that Travel Partners, Airport Retailers, and travelers should all benefit fairly and transparently. We are committed to maintaining a trustworthy, professional platform that upholds the ethical standards of the international travel and retail industries." },
    { h: "2. Expected Behaviour — All Users", list: [
      "Act honestly and in good faith when using the platform at all times.",
      "Provide accurate, verifiable data — booking references (PNR), transaction values, and store details must reflect reality.",
      "Treat all other platform participants — Travel Partners, Airport Retailers, travelers, and DutyBoost staff — with respect and professionalism.",
      "Report suspected fraud, abuse, or irregularities immediately via trust@dutyboost.com.",
      "Comply with all applicable laws, regulations, and industry codes in your jurisdiction.",
    ]},
    { h: "3. Travel Partners", list: [
      "Only submit confirmed, ticketed bookings backed by a valid PNR or booking reference from a recognised reservation system (GDS or direct airline system).",
      "Do not generate DutyCredits for fictitious, cancelled, or refunded bookings. Doing so constitutes fraud.",
      "Notify DutyBoost immediately if a booking linked to a DutyCredit is subsequently cancelled or refunded.",
      "Do not share DutyCredit links with individuals not named on the associated booking.",
      "Comply with IATA Resolution 890 and applicable GDS data integrity standards.",
      "Hold and maintain all required travel intermediary licences, accreditations, and registrations (e.g. IATA accreditation, ANVR, ABTA, or local equivalent) for the jurisdictions in which you operate.",
    ]},
    { h: "4. Airport Retailers", list: [
      "Honour all valid, active DutyCredits presented by travelers at your point of sale on their confirmed departure date.",
      "Do not refuse DutyCredit redemptions without a valid, documented reason.",
      "Do not attempt to process false, simulated, or test transactions to manipulate revenue or commission figures.",
      "Keep your store information (location, opening hours, category) accurate and up to date on the platform.",
      "Ensure all relevant staff are trained on DutyCredit QR scanning procedures.",
      "Promptly notify DutyBoost of any POS technical issues that prevent redemption.",
    ]},
    { h: "5. Anti-Money Laundering (AML) & Financial Crime", list: [
      "Do not use the DutyBoost platform to facilitate money laundering, terrorist financing, tax evasion, or any other financial crime.",
      "All Travel Partners and Airport Retailers must cooperate fully with DutyBoost's Know Your Customer (KYC) verification process prior to account activation.",
      "If DutyBoost identifies suspicious activity on your account, we reserve the right to immediately suspend access and report the matter to relevant financial intelligence or law enforcement authorities.",
      "All parties must comply with applicable AML regulations in their jurisdiction, including the EU Anti-Money Laundering Directives (AMLD) where applicable.",
    ]},
    { h: "6. Prohibited Conduct", list: [
      "Attempting to duplicate, forge, reverse-engineer, or systematically guess DutyCredit codes.",
      "Using the platform for money laundering, terrorist financing, sanctions evasion, or any unlawful financial activity.",
      "Submitting false, cancelled, or fictitious booking data to generate DutyCredits.",
      "Attempting to access other users' accounts, data, or the Platform's backend systems without authorisation.",
      "Interfering with the platform's technical infrastructure, APIs, or security measures.",
      "Misrepresenting your identity, business type, or licensing status when registering or using the platform.",
    ]},
    { h: "7. Enforcement", p: "Violations of this Code of Conduct may result in immediate account suspension, permanent termination of platform access, forfeiture of pending revenue shares or commissions, and legal action. DutyBoost reserves the right to investigate all reported violations and to share information with relevant authorities where required by law." },
    { h: "8. Contact", p: "Report misconduct or suspicious activity: trust@dutyboost.com · DutyBoost B.V., Amsterdam, the Netherlands." },
  ]},
  nl: { title: "Gedragscode", updated: "Laatst bijgewerkt: april 2026", back: "Terug naar home", sections: [
    { h: "1. Onze toewijding", p: "DutyBoost is gebouwd op het principe dat Reispartners, Luchthavenwinkels en reizigers eerlijk en transparant voordeel moeten halen. Wij zetten ons in voor een betrouwbaar, professioneel platform dat de ethische normen van de internationale reis- en detailhandelsector handhaaft." },
    { h: "2. Verwacht gedrag — Alle gebruikers", list: [
      "Eerlijk en te goeder trouw handelen bij het gebruik van het platform.",
      "Nauwkeurige, verifieerbare gegevens verstrekken — boekingsreferenties (PNR), transactiewaarden en winkelgegevens moeten de werkelijkheid weerspiegelen.",
      "Alle andere platformdeelnemers respectvol en professioneel behandelen.",
      "Vermoedens van fraude, misbruik of onregelmatigheden onmiddellijk melden via trust@dutyboost.com.",
      "Voldoen aan alle toepasselijke wet- en regelgeving en branchecode in uw jurisdictie.",
    ]},
    { h: "3. Reispartners", list: [
      "Alleen bevestigde, getickte boekingen indienen die worden ondersteund door een geldig PNR of boekingsreferentie.",
      "Geen DutyCredits genereren voor fictieve, geannuleerde of terugbetaalde boekingen. Dit vormt fraude.",
      "DutyBoost onmiddellijk informeren als een boeking die gekoppeld is aan een DutyCredit wordt geannuleerd of terugbetaald.",
      "DutyCredit-links niet delen met personen die niet op de boeking vermeld staan.",
      "Voldoen aan IATA Resolution 890 en toepasselijke GDS-gegevensintegriteitsnormen.",
      "Alle vereiste reisintermediairlicenties en accreditaties aanhouden (bijv. IATA, ANVR of lokaal equivalent).",
    ]},
    { h: "4. Luchthavenwinkels", list: [
      "Alle geldige, actieve DutyCredits honoreren op de bevestigde vertrekdag van de reiziger.",
      "DutyCredit-inwisselingen niet weigeren zonder geldige, gedocumenteerde reden.",
      "Geen valse of gesimuleerde transacties verwerken om omzet- of commissiecijfers te manipuleren.",
      "Winkelinformatie accuraat en actueel houden op het platform.",
      "Zorg dat alle relevante medewerkers zijn getraind in DutyCredit QR-scanprocedures.",
      "DutyBoost onmiddellijk informeren bij technische kassaproblemen die inwisseling verhinderen.",
    ]},
    { h: "5. Anti-witwassen (AML) & financiële criminaliteit", list: [
      "Gebruik het platform niet voor het faciliteren van witwassen, terrorismefinanciering, belastingontduiking of andere financiële criminaliteit.",
      "Alle Reispartners en Luchthavenwinkels moeten volledig meewerken aan het KYC-verificatieproces van DutyBoost vóór accountactivering.",
      "Als DutyBoost verdachte activiteiten op uw account identificeert, behouden wij ons het recht voor om de toegang onmiddellijk te schorsen en de zaak te melden bij relevante autoriteiten.",
      "Alle partijen moeten voldoen aan toepasselijke AML-wetgeving, inclusief EU Anti-Money Laundering Directives (AMLD).",
    ]},
    { h: "6. Verboden gedrag", list: [
      "Pogingen DutyCredit-codes te dupliceren, vervalsen, reverse-engineeren of systematisch te raden.",
      "Het platform gebruiken voor witwassen, terrorismefinanciering, sanctie-ontduiking of onwettige financiële activiteiten.",
      "Valse, geannuleerde of fictieve boekingsgegevens indienen om DutyCredits te genereren.",
      "Onbevoegde toegang proberen te verkrijgen tot accounts, gegevens of back-endsystemen.",
      "Interferentie met de technische infrastructuur, API's of beveiligingsmaatregelen van het platform.",
      "Onjuiste voorstelling van uw identiteit, bedrijfstype of licentiestatus bij registratie of gebruik.",
    ]},
    { h: "7. Handhaving", p: "Overtredingen kunnen leiden tot onmiddellijke schorsing, permanente beëindiging van platformtoegang, verbeurdverklaring van uitstaande commissies en juridische stappen. DutyBoost behoudt zich het recht voor alle overtredingen te onderzoeken en informatie te delen met relevante autoriteiten." },
    { h: "8. Contact", p: "Wangedrag of verdachte activiteiten melden: trust@dutyboost.com · DutyBoost B.V., Amsterdam, Nederland." },
  ]},
  de: { title: "Verhaltenskodex", updated: "Zuletzt aktualisiert: April 2026", back: "Zurück zur Startseite", sections: [
    { h: "1. Unser Engagement", p: "DutyBoost basiert auf dem Prinzip, dass Reisepartner, Flughafenhändler und Reisende fair und transparent profitieren sollen. Wir verpflichten uns, eine vertrauenswürdige, professionelle Plattform aufrechtzuerhalten, die den ethischen Standards der internationalen Reise- und Einzelhandelsbranche entspricht." },
    { h: "2. Erwartetes Verhalten — Alle Nutzer", list: [
      "Ehrlich und in gutem Glauben bei der Nutzung der Plattform handeln.",
      "Genaue, überprüfbare Daten angeben — PNR, Transaktionswerte und Geschäftsdaten müssen der Realität entsprechen.",
      "Alle Plattformteilnehmer respektvoll und professionell behandeln.",
      "Verdächtigen Betrug, Missbrauch oder Unregelmäßigkeiten sofort über trust@dutyboost.com melden.",
      "Alle geltenden Gesetze, Vorschriften und Branchencodes einhalten.",
    ]},
    { h: "3. Reisepartner", list: [
      "Nur bestätigte, ausgestellte Buchungen mit gültigem PNR einreichen.",
      "Keine DutyCredits für fiktive, stornierte oder erstattete Buchungen generieren. Dies stellt Betrug dar.",
      "DutyBoost unverzüglich informieren, wenn eine mit einem DutyCredit verknüpfte Buchung storniert oder erstattet wird.",
      "DutyCredit-Links nicht mit Personen teilen, die nicht auf der Buchung stehen.",
      "IATA Resolution 890 und GDS-Datenintegritätsstandards einhalten.",
      "Alle erforderlichen Reisevermittlerlizenzen und Akkreditierungen aufrechterhalten (z. B. IATA oder lokales Äquivalent).",
    ]},
    { h: "4. Flughafenhändler", list: [
      "Alle gültigen, aktiven DutyCredits am bestätigten Abreisetag akzeptieren.",
      "DutyCredit-Einlösungen nicht ohne triftigen, dokumentierten Grund verweigern.",
      "Keine falschen oder simulierten Transaktionen verarbeiten.",
      "Geschäftsinformationen auf der Plattform aktuell halten.",
      "Sicherstellen, dass das Personal in DutyCredit QR-Scanverfahren geschult ist.",
      "DutyBoost bei technischen POS-Problemen sofort informieren.",
    ]},
    { h: "5. Geldwäschebekämpfung (AML) & Finanzkriminalität", list: [
      "Die Plattform nicht zur Geldwäsche, Terrorismusfinanzierung, Steuerhinterziehung oder anderen Finanzverbrechen nutzen.",
      "Alle Reisepartner und Flughafenhändler müssen vollständig an der KYC-Prüfung von DutyBoost mitarbeiten.",
      "Bei verdächtiger Aktivität behält sich DutyBoost das Recht vor, den Zugang sofort zu sperren und die Sache den Behörden zu melden.",
      "Alle Parteien müssen die geltenden AML-Vorschriften einhalten, einschließlich der EU-Geldwäscherichtlinien (AMLD).",
    ]},
    { h: "6. Verbotenes Verhalten", list: [
      "Versuche, DutyCredit-Codes zu duplizieren, zu fälschen oder zurückzuentwickeln.",
      "Die Plattform für Geldwäsche, Terrorismusfinanzierung oder illegale Finanzaktivitäten nutzen.",
      "Falsche oder fiktive Buchungsdaten einreichen.",
      "Unbefugten Zugriff auf Konten, Daten oder Backend-Systeme versuchen.",
      "Eingriffe in Infrastruktur, APIs oder Sicherheitsmaßnahmen der Plattform.",
      "Falsche Angaben zur Identität, zum Unternehmenstyp oder zur Lizenzsituation machen.",
    ]},
    { h: "7. Durchsetzung", p: "Verstöße können zu sofortiger Kontosperrung, dauerhafter Beendigung des Zugangs, Einziehung ausstehender Provisionen und rechtlichen Schritten führen. DutyBoost behält sich das Recht vor, alle Verstöße zu untersuchen und Informationen mit den zuständigen Behörden zu teilen." },
    { h: "8. Kontakt", p: "Fehlverhalten oder verdächtige Aktivitäten melden: trust@dutyboost.com · DutyBoost B.V., Amsterdam, Niederlande." },
  ]},
  fr: { title: "Code de conduite", updated: "Dernière mise à jour : avril 2026", back: "Retour à l'accueil", sections: [
    { h: "1. Notre engagement", p: "DutyBoost est fondé sur le principe que les partenaires de voyage, les détaillants aéroportuaires et les voyageurs doivent tous bénéficier équitablement et de manière transparente. Nous nous engageons à maintenir une plateforme professionnelle qui respecte les normes éthiques des secteurs du voyage et du commerce de détail internationaux." },
    { h: "2. Comportement attendu — Tous les utilisateurs", list: [
      "Agir honnêtement et de bonne foi lors de l'utilisation de la plateforme.",
      "Fournir des données précises et vérifiables — références de réservation (PNR), valeurs de transaction et détails du magasin doivent refléter la réalité.",
      "Traiter tous les participants avec respect et professionnalisme.",
      "Signaler immédiatement toute fraude ou irrégularité via trust@dutyboost.com.",
      "Respecter toutes les lois, réglementations et codes sectoriels applicables.",
    ]},
    { h: "3. Partenaires de voyage", list: [
      "Soumettre uniquement des réservations confirmées et émises, liées à un PNR valide.",
      "Ne pas générer de DutyCredits pour des réservations fictives, annulées ou remboursées. Cela constitue une fraude.",
      "Notifier immédiatement DutyBoost si une réservation liée à un DutyCredit est annulée ou remboursée.",
      "Ne pas partager les liens DutyCredit avec des personnes non nommées sur la réservation.",
      "Respecter la Résolution IATA 890 et les normes d'intégrité des données GDS.",
      "Maintenir toutes les licences et accréditations requises (ex. accréditation IATA ou équivalent).",
    ]},
    { h: "4. Détaillants aéroportuaires", list: [
      "Honorer tous les DutyCredits valides présentés par les voyageurs le jour de leur départ confirmé.",
      "Ne pas refuser les échanges sans raison valable et documentée.",
      "Ne pas tenter de traiter de fausses transactions.",
      "Maintenir les informations du magasin à jour sur la plateforme.",
      "Former le personnel aux procédures de scan QR DutyCredit.",
      "Notifier immédiatement DutyBoost de tout problème technique de point de vente.",
    ]},
    { h: "5. Lutte contre le blanchiment (AML) & criminalité financière", list: [
      "Ne pas utiliser la plateforme pour faciliter le blanchiment d'argent, le financement du terrorisme, l'évasion fiscale ou tout autre délit financier.",
      "Tous les partenaires et détaillants doivent coopérer pleinement avec le processus KYC de DutyBoost avant l'activation.",
      "En cas d'activité suspecte, DutyBoost se réserve le droit de suspendre immédiatement l'accès et de signaler l'affaire aux autorités compétentes.",
      "Toutes les parties doivent respecter les réglementations AML applicables, y compris les Directives anti-blanchiment de l'UE (AMLD).",
    ]},
    { h: "6. Conduite interdite", list: [
      "Tenter de dupliquer, falsifier ou rétro-ingénier des codes DutyCredit.",
      "Utiliser la plateforme pour le blanchiment d'argent, le financement du terrorisme ou toute activité financière illégale.",
      "Soumettre de fausses données de réservation.",
      "Tenter d'accéder sans autorisation à des comptes ou systèmes backend.",
      "Interférer avec l'infrastructure, les API ou les mesures de sécurité de la plateforme.",
      "Se faire passer pour une autre identité ou type d'entreprise lors de l'inscription.",
    ]},
    { h: "7. Application", p: "Les violations peuvent entraîner une suspension immédiate, la résiliation permanente de l'accès, la confiscation des commissions en attente et des actions en justice. DutyBoost se réserve le droit d'enquêter sur toutes les violations et de partager des informations avec les autorités compétentes." },
    { h: "8. Contact", p: "Signaler un comportement inapproprié ou une activité suspecte : trust@dutyboost.com · DutyBoost B.V., Amsterdam, Pays-Bas." },
  ]},
  es: { title: "Código de conducta", updated: "Última actualización: abril de 2026", back: "Volver al inicio", sections: [
    { h: "1. Nuestro compromiso", p: "DutyBoost se basa en el principio de que los socios de viaje, los comercios aeroportuarios y los viajeros deben beneficiarse de manera justa y transparente. Nos comprometemos a mantener una plataforma profesional que defienda los estándares éticos de los sectores internacionales del viaje y el comercio minorista." },
    { h: "2. Comportamiento esperado — Todos los usuarios", list: [
      "Actuar con honestidad y buena fe en todo momento.",
      "Proporcionar datos precisos y verificables — referencias de reserva (PNR), valores de transacción y detalles de tienda deben reflejar la realidad.",
      "Tratar a todos los participantes con respeto y profesionalismo.",
      "Informar inmediatamente sobre cualquier fraude, abuso o irregularidad a través de trust@dutyboost.com.",
      "Cumplir con todas las leyes, reglamentos y códigos sectoriales aplicables.",
    ]},
    { h: "3. Socios de viaje", list: [
      "Enviar solo reservas confirmadas y emitidas, respaldadas por un PNR válido.",
      "No generar DutyCredits para reservas ficticias, canceladas o reembolsadas. Esto constituye fraude.",
      "Notificar a DutyBoost inmediatamente si una reserva vinculada a un DutyCredit se cancela o reembolsa.",
      "No compartir enlaces DutyCredit con personas no nombradas en la reserva.",
      "Cumplir con la Resolución IATA 890 y los estándares de integridad de datos GDS.",
      "Mantener todas las licencias y acreditaciones requeridas (ej. acreditación IATA o equivalente).",
    ]},
    { h: "4. Comercios aeroportuarios", list: [
      "Respetar todos los DutyCredits válidos presentados por viajeros el día de su salida confirmada.",
      "No rechazar canjes sin razón válida y documentada.",
      "No procesar transacciones falsas o simuladas.",
      "Mantener la información de la tienda actualizada en la plataforma.",
      "Asegurar que el personal esté formado en los procedimientos de escaneo QR DutyCredit.",
      "Notificar a DutyBoost inmediatamente ante problemas técnicos de punto de venta.",
    ]},
    { h: "5. Antilavado de dinero (AML) y crimen financiero", list: [
      "No usar la plataforma para facilitar el lavado de dinero, la financiación del terrorismo, la evasión fiscal u otro delito financiero.",
      "Todos los socios y comercios deben cooperar plenamente con el proceso KYC de DutyBoost antes de la activación.",
      "Ante actividad sospechosa, DutyBoost se reserva el derecho de suspender inmediatamente el acceso y reportar el asunto a las autoridades competentes.",
      "Todas las partes deben cumplir con la normativa AML aplicable, incluyendo las Directivas antilavado de la UE (AMLD).",
    ]},
    { h: "6. Conducta prohibida", list: [
      "Intentar duplicar, falsificar o realizar ingeniería inversa de códigos DutyCredit.",
      "Usar la plataforma para actividades financieras ilegales.",
      "Enviar datos de reserva falsos o ficticios.",
      "Intentar acceder sin autorización a cuentas o sistemas backend.",
      "Interferir con la infraestructura, APIs o medidas de seguridad de la plataforma.",
      "Falsear la identidad, tipo de empresa o situación de licencia al registrarse.",
    ]},
    { h: "7. Cumplimiento", p: "Las infracciones pueden resultar en suspensión inmediata, terminación permanente del acceso, pérdida de comisiones pendientes y acciones legales. DutyBoost se reserva el derecho de investigar todas las infracciones y compartir información con las autoridades competentes." },
    { h: "8. Contacto", p: "Reportar conductas inapropiadas o actividades sospechosas: trust@dutyboost.com · DutyBoost B.V., Ámsterdam, Países Bajos." },
  ]},
  it: { title: "Codice di condotta", updated: "Ultimo aggiornamento: aprile 2026", back: "Torna alla home", sections: [
    { h: "1. Il nostro impegno", p: "DutyBoost è costruita sul principio che i partner di viaggio, i rivenditori aeroportuali e i viaggiatori debbano beneficiare equamente e in modo trasparente. Ci impegniamo a mantenere una piattaforma professionale che rispetti gli standard etici dei settori internazionali del viaggio e del commercio al dettaglio." },
    { h: "2. Comportamento atteso — Tutti gli utenti", list: [
      "Agire onestamente e in buona fede in ogni momento.",
      "Fornire dati accurati e verificabili — riferimenti di prenotazione (PNR), valori delle transazioni e dettagli del negozio devono riflettere la realtà.",
      "Trattare tutti i partecipanti con rispetto e professionalità.",
      "Segnalare immediatamente frodi, abusi o irregolarità tramite trust@dutyboost.com.",
      "Rispettare tutte le leggi, normative e codici di settore applicabili.",
    ]},
    { h: "3. Partner di viaggio", list: [
      "Inviare solo prenotazioni confermate ed emesse, supportate da un PNR valido.",
      "Non generare DutyCredit per prenotazioni fittizie, annullate o rimborsate. Ciò costituisce frode.",
      "Notificare immediatamente DutyBoost se una prenotazione collegata a un DutyCredit viene annullata o rimborsata.",
      "Non condividere link DutyCredit con persone non nominate sulla prenotazione.",
      "Rispettare la Risoluzione IATA 890 e gli standard di integrità dei dati GDS.",
      "Mantenere tutte le licenze e accreditamenti richiesti (es. accreditamento IATA o equivalente).",
    ]},
    { h: "4. Rivenditori aeroportuali", list: [
      "Onorare tutti i DutyCredit validi presentati dai viaggiatori il giorno della loro partenza confermata.",
      "Non rifiutare i riscatti senza un motivo valido e documentato.",
      "Non elaborare transazioni false o simulate.",
      "Mantenere le informazioni del negozio aggiornate sulla piattaforma.",
      "Assicurarsi che il personale sia formato sulle procedure di scansione QR DutyCredit.",
      "Notificare immediatamente DutyBoost di qualsiasi problema tecnico al punto vendita.",
    ]},
    { h: "5. Antiriciclaggio (AML) e criminalità finanziaria", list: [
      "Non utilizzare la piattaforma per facilitare il riciclaggio di denaro, il finanziamento del terrorismo, l'evasione fiscale o altri reati finanziari.",
      "Tutti i partner e i rivenditori devono cooperare pienamente con il processo KYC di DutyBoost prima dell'attivazione.",
      "In caso di attività sospetta, DutyBoost si riserva il diritto di sospendere immediatamente l'accesso e segnalare la questione alle autorità competenti.",
      "Tutte le parti devono rispettare le normative AML applicabili, incluse le Direttive antiriciclaggio dell'UE (AMLD).",
    ]},
    { h: "6. Comportamento vietato", list: [
      "Tentare di duplicare, falsificare o fare reverse engineering dei codici DutyCredit.",
      "Utilizzare la piattaforma per attività finanziarie illegali.",
      "Inviare dati di prenotazione falsi o fittizi.",
      "Tentare di accedere senza autorizzazione ad account o sistemi backend.",
      "Interferire con l'infrastruttura, le API o le misure di sicurezza della piattaforma.",
      "Dichiarare falsamente la propria identità, tipo di impresa o situazione di licenza.",
    ]},
    { h: "7. Applicazione", p: "Le violazioni possono comportare sospensione immediata, cessazione permanente dell'accesso, perdita di commissioni in sospeso e azioni legali. DutyBoost si riserva il diritto di indagare su tutte le violazioni e di condividere informazioni con le autorità competenti." },
    { h: "8. Contatto", p: "Segnalare comportamenti scorretti o attività sospette: trust@dutyboost.com · DutyBoost B.V., Amsterdam, Paesi Bassi." },
  ]},
};

export default function CodeOfConduct() {
  const { i18n } = useTranslation();
  const c = content[i18n.language] || content.en;
  return (
    <div className="min-h-screen bg-background font-body">
      <nav className="border-b border-border px-6 h-16 flex items-center justify-between"><Link to="/"><DutyBoostLogo height={150} /></Link><button onClick={() => window.history.back()} className="text-sm text-muted-foreground hover:text-primary transition-colors">← Back</button></nav>
      <div className="max-w-3xl mx-auto px-6 py-16 space-y-8">
        <div><h1 className="text-4xl font-heading font-bold mb-2">{c.title}</h1><p className="text-muted-foreground text-sm">{c.updated}</p></div>
        {c.sections.map((s) => (
          <section key={s.h} className="space-y-3">
            <h2 className="text-xl font-heading font-semibold">{s.h}</h2>
            {s.p && <EmailLinkText text={s.p} />}
            {s.list && <ul className="list-disc list-inside text-muted-foreground space-y-1 leading-relaxed">{s.list.map((item, i) => <li key={i}><EmailLinkText text={item} className="inline" /></li>)}</ul>}
          </section>
        ))}
      </div>
      <PageFooter />
    </div>
  );
}