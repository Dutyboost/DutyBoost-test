import { Link } from "react-router-dom";
import DutyBoostLogo from "../components/DutyBoostLogo";
import PageFooter from "../components/PageFooter";
import { useTranslation } from "react-i18next";
import EmailLinkText from "../components/EmailLinkText";
import LanguageSwitcher from "../components/LanguageSwitcher";

const content = {
  en: { title: "Code of Conduct", updated: "Last updated: November 2026", back: "Back to Home", sections: [
    { h: "1. Our Commitment", p: "DutyBoost operates a Performance-based Customer Acquisition Solution for Global Travel, built on the principle that Travel Partners, Travel Retail Partners, Travel Hub Partners and travelers should all benefit fairly and transparently across every travel vertical — flights, cruises, trains, coaches, car rental, and accommodation. We are committed to maintaining a trustworthy, professional platform that upholds the ethical standards of the international travel and airport retail industries." },
    { h: "2. Expected Behaviour — All Users", list: [
      "Act honestly and in good faith when using the platform at all times.",
      "Provide accurate, verifiable data — booking references (PNR), transaction values, redemption records and store details must reflect reality.",
      "Treat all other platform participants — Travel Partners, Travel Retail Partners, Travel Hub Partners, travelers and DutyBoost staff — with respect and professionalism.",
      "Report suspected fraud, abuse, or irregularities immediately via trust@dutyboost.com.",
      "Comply with all applicable laws, regulations, and industry codes in your jurisdiction.",
    ]},
    { h: "3. Travel Partners", list: [
      "Only submit confirmed, ticketed bookings backed by a valid PNR or booking reference from a recognised reservation system (GDS, airline, cruise, rail, coach, car rental or hotel system, or your own booking platform), whatever the travel vertical.",
      "Do not generate DutyCredits for fictitious, cancelled, or refunded bookings. Doing so constitutes fraud.",
      "Notify DutyBoost immediately if a booking linked to a DutyCredit is subsequently cancelled or refunded.",
      "Deliver DutyCredits to your travelers through your own booking confirmation and return-journey emails. DutyBoost does not send emails to travelers on your behalf.",
      "Do not share DutyCredit links with individuals not named on the associated booking.",
      "Comply with IATA Resolution 890 and applicable GDS data integrity standards.",
      "Hold and maintain all required travel intermediary licences, accreditations, and registrations (e.g. IATA accreditation, ANVR, ABTA, or local equivalent) for the jurisdictions in which you operate.",
    ]},
    { h: "4. Travel Retail Partners", list: [
      "Honour all valid, active DutyCredits presented by travelers at your point of sale — at an airport, cruise port or terminal, rail or coach station, or local retail location — within the validity period stated on the DutyCredit.",
      "Do not refuse DutyCredit redemptions without a valid, documented reason.",
      "Do not attempt to process false, simulated, or test transactions to manipulate revenue or commission figures.",
      "Keep your store information (location, opening hours, category) accurate and up to date on the platform.",
      "Ensure all relevant staff are trained on DutyCredit QR scanning procedures.",
      "Promptly notify DutyBoost of any point-of-sale technical issues that prevent redemption.",
      "Cooperate fully with refund processes where a traveler is lawfully entitled to a partial or full refund.",
    ]},
    { h: "5. Travel Hub Partners", list: [
      "Permit participating Travel Retail Partners within your hub to accept and redeem DutyCredits in accordance with these Terms.",
      "Do not impose any fee, levy or margin on DutyCredits redeemed at your hub; Travel Hub Partners pay no fee to DutyBoost and receive no share of the Platform Fee.",
      "Do not interfere with the redemption process, the discount applied or the transaction value reported by a Travel Retail Partner.",
      "Keep your hub information (terminals, zones, retailer directory) accurate and up to date on the platform.",
      "Cooperate in good faith where your support is needed to investigate a redemption, refund or fraud allegation.",
      "Promptly notify DutyBoost of any change to the retailers trading at your hub or to the traveller flows relevant to the ecosystem.",
    ]},
    { h: "6. Anti-Money Laundering (AML) & Financial Crime", list: [
      "Do not use the DutyBoost platform to facilitate money laundering, terrorist financing, tax evasion, or any other financial crime.",
      "All Travel Partners, Travel Retail Partners and Travel Hub Partners must cooperate fully with DutyBoost's Know Your Customer (KYC) verification process prior to account activation.",
      "If DutyBoost identifies suspicious activity on your account, we reserve the right to immediately suspend access and report the matter to relevant financial intelligence or law enforcement authorities.",
      "All parties must comply with applicable AML regulations in their jurisdiction, including the EU Anti-Money Laundering Directives (AMLD) where applicable.",
    ]},
    { h: "7. Prohibited Conduct", list: [
      "Attempting to duplicate, forge, reverse-engineer, or systematically guess DutyCredit codes.",
      "Using the platform for money laundering, terrorist financing, sanctions evasion, or any unlawful financial activity.",
      "Submitting false, cancelled, or fictitious booking data to generate DutyCredits.",
      "Processing false or simulated redemptions to inflate Revenue Shares.",
      "Attempting to access other users' accounts, data, or the Platform's backend systems without authorisation.",
      "Interfering with the platform's technical infrastructure, APIs, or security measures.",
      "Misrepresenting your identity, business type, or licensing status when registering or using the platform.",
    ]},
    { h: "8. Enforcement", p: "Violations of this Code of Conduct may result in immediate account suspension, permanent termination of platform access, forfeiture of pending revenue shares or commissions, recovery of improperly received funds, and legal action. DutyBoost reserves the right to investigate all reported violations and to share information with relevant authorities where required by law." },
    { h: "9. Contact", p: "Report misconduct or suspicious activity: trust@dutyboost.com · DutyBoost, a legal entity registered at the Dutch Chamber of Commerce (Kamer van Koophandel) under number 42053088, Amsterdam, the Netherlands." },
  ]},
  nl: { title: "Gedragscode", updated: "Laatst bijgewerkt: november 2026", back: "Terug naar home", sections: [
    { h: "1. Onze toewijding", p: "DutyBoost exploiteert a Performance-based Customer Acquisition Solution for Global Travel, gebouwd op het principe dat Reispartners, Reisretailpartners, Travel Hub-partners en reizigers in elke reisvertical eerlijk en transparant voordeel moeten halen — vluchten, cruises, treinen, touringcars, autoverhuur en accommodatie. Wij zetten ons in voor een betrouwbaar, professioneel platform dat de ethische normen van de internationale reis- en luchthavendetailhandel handhaaft." },
    { h: "2. Verwacht gedrag — Alle gebruikers", list: [
      "Eerlijk en te goeder trouw handelen bij het gebruik van het platform.",
      "Nauwkeurige, verifieerbare gegevens verstrekken — boekingsreferenties (PNR), transactiewaarden, inwisselrecords en winkelgegevens moeten de werkelijkheid weerspiegelen.",
      "Alle andere platformdeelnemers — Reispartners, Reisretailpartners, Travel Hub-partners, reizigers en DutyBoost-medewerkers — respectvol en professioneel behandelen.",
      "Vermoedens van fraude, misbruik of onregelmatigheden onmiddellijk melden via trust@dutyboost.com.",
      "Voldoen aan alle toepasselijke wet- en regelgeving en branchecode in uw jurisdictie.",
    ]},
    { h: "3. Reispartners", list: [
      "Alleen bevestigde, getickte boekingen indienen die worden ondersteund door een geldig PNR of boekingsreferentie uit een erkend reserveringssysteem (GDS, luchtvaart-, cruise-, spoor-, touringcar-, autoverhuur- of hotelsysteem, of uw eigen boekingsplatform) — in elke reisvertical.",
      "Geen DutyCredits genereren voor fictieve, geannuleerde of terugbetaalde boekingen. Dit vormt fraude.",
      "DutyBoost onmiddellijk informeren als een boeking die gekoppeld is aan een DutyCredit wordt geannuleerd of terugbetaald.",
      "DutyCredits aan uw reizigers leveren via uw eigen boekingsbevestigings- en terugkeermails. DutyBoost stuurt geen e-mails naar reizigers namens u.",
      "DutyCredit-links niet delen met personen die niet op de boeking vermeld staan.",
      "Voldoen aan IATA Resolution 890 en toepasselijke GDS-gegevensintegriteitsnormen.",
      "Alle vereiste reisintermediairlicenties en accreditaties aanhouden (bijv. IATA, ANVR of lokaal equivalent).",
    ]},
    { h: "4. Reisretailpartners", list: [
      "Alle geldige, actieve DutyCredits honoreren — op de luchthaven, in een cruisehaven of terminal, op een trein- of busstation of bij een lokale winkel — binnen de op de DutyCredit vermelde geldigheidsperiode.",
      "DutyCredit-inwisselingen niet weigeren zonder geldige, gedocumenteerde reden.",
      "Geen valse of gesimuleerde transacties verwerken om omzet- of commissiecijfers te manipuleren.",
      "Winkelinformatie accuraat en actueel houden op het platform.",
      "Zorg dat alle relevante medewerkers zijn getraind in DutyCredit QR-scanprocedures.",
      "DutyBoost onmiddellijk informeren bij technische problemen aan de kassa die inwisseling verhinderen.",
      "Volledig meewerken aan terugbetalingsprocessen waar een reiziger recht heeft op gedeeltelijke of volledige terugbetaling.",
    ]},
    { h: "5. Travel Hub-partners", list: [
      "Deelnemende Reisretailpartners op uw hub toestaan DutyCredits te accepteren en in te wisselen conform deze Voorwaarden.",
      "Geen vergoeding, heffing of marge opleggen op DutyCredits die op uw hub worden ingewisseld; Travel Hub-partners betalen geen vergoeding aan DutyBoost en ontvangen geen aandeel in de Platformvergoeding.",
      "Het inwisselproces, de toegepaste korting of de gerapporteerde transactiewaarde niet beïnvloeden.",
      "Hubinformatie (terminals, zones, winkeloverzicht) accuraat en actueel houden op het platform.",
      "Goedwillend meewerken wanneer uw ondersteuning nodig is bij onderzoek naar een inwisseling, terugbetaling of fraude.",
      "DutyBoost tijdig informeren over wijzigingen in de winkels op uw hub of in relevante reizigersstromen.",
    ]},
    { h: "6. Anti-witwassen (AML) & financiële criminaliteit", list: [
      "Gebruik het platform niet voor het faciliteren van witwassen, terrorismefinanciering, belastingontduiking of andere financiële criminaliteit.",
      "Alle Reispartners, Reisretailpartners en Travel Hub-partners moeten volledig meewerken aan het KYC-verificatieproces van DutyBoost vóór accountactivering.",
      "Als DutyBoost verdachte activiteiten op uw account identificeert, behouden wij ons het recht voor om de toegang onmiddellijk te schorsen en de zaak te melden bij relevante autoriteiten.",
      "Alle partijen moeten voldoen aan toepasselijke AML-wetgeving, inclusief EU Anti-Money Laundering Directives (AMLD).",
    ]},
    { h: "7. Verboden gedrag", list: [
      "Pogingen DutyCredit-codes te dupliceren, vervalsen, reverse-engineeren of systematisch te raden.",
      "Het platform gebruiken voor witwassen, terrorismefinanciering, sanctie-ontduiking of onwettige financiële activiteiten.",
      "Valse, geannuleerde of fictieve boekingsgegevens indienen om DutyCredits te genereren.",
      "Valse of gesimuleerde inwisselingen verwerken om Inkomstenandelen te beïnvloeden.",
      "Onbevoegde toegang proberen te verkrijgen tot accounts, gegevens of back-endsystemen.",
      "Interferentie met de technische infrastructuur, API's of beveiligingsmaatregelen van het platform.",
      "Onjuiste voorstelling van uw identiteit, bedrijfstype of licentiestatus bij registratie of gebruik.",
    ]},
    { h: "8. Handhaving", p: "Overtredingen kunnen leiden tot onmiddellijke schorsing, permanente beëindiging van platformtoegang, verbeurdverklaring van uitstaande commissies, terugvordering van onrechtmatig ontvangen gelden en juridische stappen. DutyBoost behoudt zich het recht voor alle overtredingen te onderzoeken en informatie te delen met relevante autoriteiten." },
    { h: "9. Contact", p: "Wangedrag of verdachte activiteiten melden: trust@dutyboost.com · DutyBoost, een rechtspersoon ingeschreven bij de Kamer van Koophandel onder nummer 42053088, Amsterdam, Nederland." },
  ]},
  de: { title: "Verhaltenskodex", updated: "Zuletzt aktualisiert: November 2026", back: "Zurück zur Startseite", sections: [
    { h: "1. Unser Engagement", p: "DutyBoost betreibt a Performance-based Customer Acquisition Solution for Global Travel, basierend auf dem Prinzip, dass Reisepartner, Reise-Einzelhandelspartner, Travel-Hub-Partner und Reisende in jeder Reisesparte fair und transparent profitieren sollen — Flüge, Kreuzfahrten, Züge, Reisebusse, Mietwagen und Unterkünfte. Wir verpflichten uns, eine vertrauenswürdige, professionelle Plattform aufrechtzuerhalten, die den ethischen Standards der internationalen Reise- und Flughafeneinzelhandelsbranche entspricht." },
    { h: "2. Erwartetes Verhalten — Alle Nutzer", list: [
      "Ehrlich und in gutem Glauben bei der Nutzung der Plattform handeln.",
      "Genaue, überprüfbare Daten angeben — PNR, Transaktionswerte, Einlösungsdatensätze und Geschäftsdaten müssen der Realität entsprechen.",
      "Alle Plattformteilnehmer — Reisepartner, Reise-Einzelhandelspartner, Travel-Hub-Partner, Reisende und DutyBoost-Mitarbeiter — respektvoll und professionell behandeln.",
      "Verdächtigen Betrug, Missbrauch oder Unregelmäßigkeiten sofort über trust@dutyboost.com melden.",
      "Alle geltenden Gesetze, Vorschriften und Branchencodes einhalten.",
    ]},
    { h: "3. Reisepartner", list: [
      "Nur bestätigte, ausgestellte Buchungen mit gültigem PNR oder Buchungsreferenz aus einem anerkannten Reservierungssystem (GDS, Airline-, Kreuzfahrt-, Bahn-, Bus-, Mietwagen- oder Hotelsystem oder Ihre eigene Buchungsplattform) einreichen — in jeder Reisesparte.",
      "Keine DutyCredits für fiktive, stornierte oder erstattete Buchungen generieren. Dies stellt Betrug dar.",
      "DutyBoost unverzüglich informieren, wenn eine mit einem DutyCredit verknüpfte Buchung storniert oder erstattet wird.",
      "DutyCredits an Ihre Reisenden über Ihre eigenen Buchungsbestätigungs- und Rückreise-E-Mails zustellen. DutyBoost sendet keine E-Mails an Reisende in Ihrem Namen.",
      "DutyCredit-Links nicht mit Personen teilen, die nicht auf der Buchung stehen.",
      "IATA Resolution 890 und GDS-Datenintegritätsstandards einhalten.",
      "Alle erforderlichen Reisevermittlerlizenzen und Akkreditierungen aufrechterhalten (z. B. IATA oder lokales Äquivalent).",
    ]},
    { h: "4. Reise-Einzelhandelspartner", list: [
      "Alle gültigen, aktiven DutyCredits — am Flughafen, in einem Kreuzfahrtterminal, an einem Bahn- oder Busbahnhof oder bei einem lokalen Händler — innerhalb der auf dem DutyCredit angegebenen Gültigkeitsdauer akzeptieren.",
      "DutyCredit-Einlösungen nicht ohne triftigen, dokumentierten Grund verweigern.",
      "Keine falschen oder simulierten Transaktionen verarbeiten.",
      "Geschäftsinformationen auf der Plattform aktuell halten.",
      "Sicherstellen, dass das Personal in DutyCredit QR-Scanverfahren geschult ist.",
      "DutyBoost bei technischen Problemen an der Kasse sofort informieren.",
      "Bei Erstattungsprozessen voll mitwirken, wenn ein Reisender Anspruch hat.",
    ]},
    { h: "5. Travel-Hub-Partner", list: [
      "Teilnehmenden Reise-Einzelhandelspartnern an Ihrem Hub die Annahme und Einlösung von DutyCredits gemäß diesen Bedingungen gestatten.",
      "Keine Gebühr, Abgabe oder Marge auf am Hub eingelöste DutyCredits erheben; Travel-Hub-Partner zahlen keine Gebühr an DutyBoost und erhalten keinen Anteil an der Plattformgebühr.",
      "Den Einlösungsprozess, den angewandten Rabatt oder den gemeldeten Transaktionswert nicht beeinflussen.",
      "Hub-Informationen (Terminals, Zonen, Händlerverzeichnis) auf der Plattform aktuell halten.",
      "Bei Untersuchungen zu Einlösungen, Erstattungen oder Betrugsverdacht in gutem Glauben mitwirken.",
      "DutyBoost zeitnah über Änderungen bei den Händlern am Hub oder bei relevanten Reisendenströmen informieren.",
    ]},
    { h: "6. Geldwäschebekämpfung (AML) & Finanzkriminalität", list: [
      "Die Plattform nicht zur Geldwäsche, Terrorismusfinanzierung, Steuerhinterziehung oder anderen Finanzverbrechen nutzen.",
      "Alle Reisepartner, Reise-Einzelhandelspartner und Travel-Hub-Partner müssen vollständig an der KYC-Prüfung mitarbeiten.",
      "Bei verdächtiger Aktivität behält sich DutyBoost das Recht vor, den Zugang sofort zu sperren und die Sache den Behörden zu melden.",
      "Alle Parteien müssen die geltenden AML-Vorschriften einhalten, einschließlich der EU-Geldwäscherichtlinien (AMLD).",
    ]},
    { h: "7. Verbotenes Verhalten", list: [
      "Versuche, DutyCredit-Codes zu duplizieren, zu fälschen oder zurückzuentwickeln.",
      "Die Plattform für Geldwäsche, Terrorismusfinanzierung oder illegale Finanzaktivitäten nutzen.",
      "Falsche oder fiktive Buchungsdaten einreichen.",
      "Falsche Einlösungen verarbeiten, um Umsatzanteile zu manipulieren.",
      "Unbefugten Zugriff auf Konten, Daten oder Backend-Systeme versuchen.",
      "Eingriffe in Infrastruktur, APIs oder Sicherheitsmaßnahmen der Plattform.",
      "Falsche Angaben zur Identität, zum Unternehmenstyp oder zur Lizenzsituation machen.",
    ]},
    { h: "8. Durchsetzung", p: "Verstöße können zu sofortiger Kontosperrung, dauerhafter Beendigung des Zugangs, Einziehung ausstehender Provisionen, Rückforderung unrechtmäßig erhaltener Mittel und rechtlichen Schritten führen. DutyBoost behält sich das Recht vor, alle Verstöße zu untersuchen und Informationen mit den zuständigen Behörden zu teilen." },
    { h: "9. Kontakt", p: "Fehlverhalten oder verdächtige Aktivitäten melden: trust@dutyboost.com · DutyBoost, eine im niederländischen Handelsregister (Kamer van Koophandel) eingetragene Gesellschaft unter der Nummer 42053088, Amsterdam, Niederlande." },
  ]},
  fr: { title: "Code de conduite", updated: "Dernière mise à jour : novembre 2026", back: "Retour à l'accueil", sections: [
    { h: "1. Notre engagement", p: "DutyBoost exploite a Performance-based Customer Acquisition Solution for Global Travel, fondé sur le principe que les partenaires de voyage, les partenaires du retail de voyage, les partenaires Travel Hub et les voyageurs doivent tous bénéficier équitablement et de manière transparente, dans tous les secteurs du voyage — vols, croisières, trains, autocars, location de voitures et hébergement. Nous nous engageons à maintenir une plateforme professionnelle qui respecte les normes éthiques des secteurs du voyage et du commerce de détail aéroportuaire internationaux." },
    { h: "2. Comportement attendu — Tous les utilisateurs", list: [
      "Agir honnêtement et de bonne foi lors de l'utilisation de la plateforme.",
      "Fournir des données précises et vérifiables — références de réservation (PNR), valeurs de transaction, enregistrements d'échange et détails du magasin doivent refléter la réalité.",
      "Traiter tous les participants — partenaires de voyage, partenaires du retail de voyage, partenaires Travel Hub, voyageurs et équipes DutyBoost — avec respect et professionnalisme.",
      "Signaler immédiatement toute fraude ou irrégularité via trust@dutyboost.com.",
      "Respecter toutes les lois, réglementations et codes sectoriels applicables.",
    ]},
    { h: "3. Partenaires de voyage", list: [
      "Soumettre uniquement des réservations confirmées et émises, liées à un PNR ou une référence de réservation valide issue d'un système de réservation reconnu (GDS, système de compagnie aérienne, de croisière, ferroviaire, d'autocar, de location de voitures ou d'hôtellerie, ou votre propre plateforme), quel que soit le secteur du voyage.",
      "Ne pas générer de DutyCredits pour des réservations fictives, annulées ou remboursées. Cela constitue une fraude.",
      "Notifier immédiatement DutyBoost si une réservation liée à un DutyCredit est annulée ou remboursée.",
      "Remettre les DutyCredits à vos voyageurs via vos propres e-mails de confirmation et de retour. DutyBoost n'envoie pas d'e-mails aux voyageurs en votre nom.",
      "Ne pas partager les liens DutyCredit avec des personnes non nommées sur la réservation.",
      "Respecter la Résolution IATA 890 et les normes d'intégrité des données GDS.",
      "Maintenir toutes les licences et accréditations requises (ex. accréditation IATA ou équivalent).",
    ]},
    { h: "4. Partenaires du retail de voyage", list: [
      "Honorer tous les DutyCredits valides présentés — aéroport, port ou terminal de croisière, gare ferroviaire ou routière, ou commerce local — dans le délai de validité indiqué sur le DutyCredit.",
      "Ne pas refuser les échanges sans raison valable et documentée.",
      "Ne pas tenter de traiter de fausses transactions.",
      "Maintenir les informations du magasin à jour sur la plateforme.",
      "Former le personnel aux procédures de scan QR DutyCredit.",
      "Notifier immédiatement DutyBoost de tout problème technique en caisse.",
      "Coopérer pleinement aux processus de remboursement lorsqu'un voyageur a droit.",
    ]},
    { h: "5. Partenaires Travel Hub", list: [
      "Permettre aux Partenaires du retail de voyage participants de votre hub d'accepter et d'échanger des DutyCredits conformément aux présentes Conditions.",
      "N'imposer aucun frais, prélèvement ou marge sur les DutyCredits échangés dans votre hub ; les Partenaires Travel Hub ne paient aucun frais à DutyBoost et ne reçoivent aucune part des frais de plateforme.",
      "Ne pas interférer avec le processus d'échange, la réduction appliquée ou la valeur de transaction déclarée par un Partenaire du retail de voyage.",
      "Maintenir à jour sur la plateforme les informations de votre hub (terminaux, zones, annuaire des commerces).",
      "Coopérer de bonne foi lorsque votre concours est nécessaire à une enquête sur un échange, un remboursement ou une fraude.",
      "Informer DutyBoost sans délai de tout changement parmi les commerces de votre hub ou dans les flux de voyageurs concernés.",
    ]},
    { h: "6. Lutte contre le blanchiment (AML) & criminalité financière", list: [
      "Ne pas utiliser la plateforme pour faciliter le blanchiment, le financement du terrorisme, l'évasion fiscale ou tout autre délit financier.",
      "Tous les partenaires de voyage, du retail de voyage et Travel Hub doivent coopérer pleinement au processus KYC avant l'activation.",
      "En cas d'activité suspecte, DutyBoost se réserve le droit de suspendre immédiatement l'accès et de signaler l'affaire aux autorités.",
      "Toutes les parties doivent respecter les réglementations AML applicables, y compris les Directives anti-blanchiment de l'UE (AMLD).",
    ]},
    { h: "7. Conduite interdite", list: [
      "Tenter de dupliquer, falsifier ou rétro-ingénier des codes DutyCredit.",
      "Utiliser la plateforme pour le blanchiment, le financement du terrorisme ou toute activité financière illégale.",
      "Soumettre de fausses données de réservation.",
      "Traiter de faux échanges pour manipuler les parts de revenus.",
      "Tenter d'accéder sans autorisation à des comptes ou systèmes backend.",
      "Interférer avec l'infrastructure, les API ou les mesures de sécurité de la plateforme.",
      "Se faire passer pour une autre identité ou type d'entreprise lors de l'inscription.",
    ]},
    { h: "8. Application", p: "Les violations peuvent entraîner une suspension immédiate, la résiliation permanente de l'accès, la confiscation des commissions en attente, la récupération des fonds indûment perçus et des actions en justice. DutyBoost se réserve le droit d'enquêter sur toutes les violations et de partager des informations avec les autorités compétentes." },
    { h: "9. Contact", p: "Signaler un comportement inapproprié ou une activité suspecte : trust@dutyboost.com · DutyBoost, entité légale enregistrée à la Chambre de commerce néerlandaise (Kamer van Koophandel) sous le numéro 42053088, Amsterdam, Pays-Bas." },
  ]},
  es: { title: "Código de conducta", updated: "Última actualización: noviembre de 2026", back: "Volver al inicio", sections: [
    { h: "1. Nuestro compromiso", p: "DutyBoost opera a Performance-based Customer Acquisition Solution for Global Travel, basado en el principio de que los socios de viaje, los socios de retail de viaje, los socios Travel Hub y los pasajeros deben beneficiarse de manera justa y transparente en todos los verticales de viaje: vuelos, cruceros, trenes, autocares, alquiler de coches y alojamiento. Nos comprometemos a mantener una plataforma profesional que defienda los estándares éticos de los sectores internacionales del viaje y el comercio minorista aeroportuario." },
    { h: "2. Comportamiento esperado — Todos los usuarios", list: [
      "Actuar con honestidad y buena fe en todo momento.",
      "Proporcionar datos precisos y verificables — referencias de reserva (PNR), valores de transacción, registros de canje y detalles de tienda deben reflejar la realidad.",
      "Tratar a todos los participantes — socios de viaje, socios de retail de viaje, socios Travel Hub, pasajeros y equipo de DutyBoost — con respeto y profesionalismo.",
      "Informar inmediatamente sobre cualquier fraude, abuso o irregularidad a través de trust@dutyboost.com.",
      "Cumplir con todas las leyes, reglamentos y códigos sectoriales aplicables.",
    ]},
    { h: "3. Socios de viaje", list: [
      "Enviar solo reservas confirmadas y emitidas, respaldadas por un PNR o referencia de reserva válida de un sistema de reservas reconocido (GDS, sistema de aerolínea, crucero, tren, autocar, alquiler de coche u hotel, o tu propia plataforma), en cualquier vertical de viaje.",
      "No generar DutyCredits para reservas ficticias, canceladas o reembolsadas. Esto constituye fraude.",
      "Notificar a DutyBoost inmediatamente si una reserva vinculada a un DutyCredit se cancela o reembolsa.",
      "Entregar los DutyCredits a tus pasajeros a través de tus propios correos de confirmación y de regreso. DutyBoost no envía correos a los pasajeros en tu nombre.",
      "No compartir enlaces DutyCredit con personas no nombradas en la reserva.",
      "Cumplir con la Resolución IATA 890 y los estándares de integridad de datos GDS.",
      "Mantener todas las licencias y acreditaciones requeridas (ej. acreditación IATA o equivalente).",
    ]},
    { h: "4. Socios de retail de viaje", list: [
      "Respetar todos los DutyCredits válidos presentados — en aeropuerto, puerto o terminal de cruceros, estación de tren o autobús, o comercio local — dentro del periodo de validez indicado en el DutyCredit.",
      "No rechazar canjes sin razón válida y documentada.",
      "No procesar transacciones falsas o simuladas.",
      "Mantener la información de la tienda actualizada en la plataforma.",
      "Asegurar que el personal esté formado en los procedimientos de escaneo QR DutyCredit.",
      "Notificar a DutyBoost inmediatamente ante problemas técnicos en caja.",
      "Cooperar plenamente con los procesos de reembolso cuando un pasajero tenga derecho.",
    ]},
    { h: "5. Socios Travel Hub", list: [
      "Permitir que los Socios de retail de viaje participantes de tu hub acepten y canjeen DutyCredits conforme a estos Términos.",
      "No imponer ninguna tarifa, gravamen o margen sobre los DutyCredits canjeados en tu hub; los Socios Travel Hub no pagan tarifa a DutyBoost ni reciben parte de la tarifa de plataforma.",
      "No interferir en el proceso de canje, el descuento aplicado ni el valor de transacción declarado por un Socio de retail de viaje.",
      "Mantener actualizada en la plataforma la información de tu hub (terminales, zonas, directorio de comercios).",
      "Cooperar de buena fe cuando se necesite tu apoyo para investigar un canje, reembolso o fraude.",
      "Informar a DutyBoost sin demora de cualquier cambio en los comercios de tu hub o en los flujos de pasajeros relevantes.",
    ]},
    { h: "6. Antilavado de dinero (AML) y crimen financiero", list: [
      "No usar la plataforma para facilitar el lavado de dinero, la financiación del terrorismo, la evasión fiscal u otro delito financiero.",
      "Todos los socios de viaje, de retail de viaje y Travel Hub deben cooperar plenamente con el proceso KYC antes de la activación.",
      "Ante actividad sospechosa, DutyBoost se reserva el derecho de suspender inmediatamente el acceso y reportar el asunto a las autoridades.",
      "Todas las partes deben cumplir con la normativa AML aplicable, incluyendo las Directivas antilavado de la UE (AMLD).",
    ]},
    { h: "7. Conducta prohibida", list: [
      "Intentar duplicar, falsificar o realizar ingeniería inversa de códigos DutyCredit.",
      "Usar la plataforma para actividades financieras ilegales.",
      "Enviar datos de reserva falsos o ficticios.",
      "Procesar canjes falsos para manipular las participaciones.",
      "Intentar acceder sin autorización a cuentas o sistemas backend.",
      "Interferir con la infraestructura, APIs o medidas de seguridad de la plataforma.",
      "Falsear la identidad, tipo de empresa o situación de licencia al registrarse.",
    ]},
    { h: "8. Cumplimiento", p: "Las infracciones pueden resultar en suspensión inmediata, terminación permanente del acceso, pérdida de comisiones pendientes, recuperación de fondos percibidos indebidamente y acciones legales. DutyBoost se reserva el derecho de investigar todas las infracciones y compartir información con las autoridades competentes." },
    { h: "9. Contacto", p: "Reportar conductas inapropiadas o actividades sospechosas: trust@dutyboost.com · DutyBoost, entidad legal registrada en la Cámara de Comercio neerlandesa (Kamer van Koophandel) bajo el número 42053088, Ámsterdam, Países Bajos." },
  ]},
  it: { title: "Codice di condotta", updated: "Ultimo aggiornamento: novembre 2026", back: "Torna alla home", sections: [
    { h: "1. Il nostro impegno", p: "DutyBoost gestisce a Performance-based Customer Acquisition Solution for Global Travel, costruita sul principio che i partner di viaggio, i partner del retail di viaggio, i partner Travel Hub e i viaggiatori debbano beneficiare equamente e in modo trasparente in ogni verticale di viaggio — voli, crociere, treni, autobus a lunga percorrenza, autonoleggio e strutture ricettive. Ci impegniamo a mantenere una piattaforma professionale che rispetti gli standard etici dei settori internazionali del viaggio e del commercio al dettaglio aeroportuale." },
    { h: "2. Comportamento atteso — Tutti gli utenti", list: [
      "Agire onestamente e in buona fede in ogni momento.",
      "Fornire dati accurati e verificabili — riferimenti di prenotazione (PNR), valori delle transazioni, registrazioni di riscatto e dettagli del negozio devono riflettere la realtà.",
      "Trattare tutti i partecipanti — partner di viaggio, partner del retail di viaggio, partner Travel Hub, viaggiatori e staff DutyBoost — con rispetto e professionalità.",
      "Segnalare immediatamente frodi, abusi o irregolarità tramite trust@dutyboost.com.",
      "Rispettare tutte le leggi, normative e codici di settore applicabili.",
    ]},
    { h: "3. Partner di viaggio", list: [
      "Inviare solo prenotazioni confermate ed emesse, supportate da un PNR o riferimento di prenotazione valido emesso da un sistema di prenotazione riconosciuto (GDS, sistema di compagnia aerea, crociera, treno, autobus, autonoleggio o hotel, o la propria piattaforma), in ogni verticale di viaggio.",
      "Non generare DutyCredit per prenotazioni fittizie, annullate o rimborsate. Ciò costituisce frode.",
      "Notificare immediatamente DutyBoost se una prenotazione collegata a un DutyCredit viene annullata o rimborsata.",
      "Consegnare i DutyCredit ai viaggiatori tramite le proprie email di conferma e di ritorno. DutyBoost non invia email ai viaggiatori per tuo conto.",
      "Non condividere link DutyCredit con persone non nominate sulla prenotazione.",
      "Rispettare la Risoluzione IATA 890 e gli standard di integrità dei dati GDS.",
      "Mantenere tutte le licenze e accreditamenti richiesti (es. accreditamento IATA o equivalente).",
    ]},
    { h: "4. Partner del retail di viaggio", list: [
      "Onorare tutti i DutyCredit validi presentati — in aeroporto, porto o terminal crociere, stazione ferroviaria o degli autobus, o negozio locale — entro il periodo di validità indicato sul DutyCredit.",
      "Non rifiutare i riscatti senza un motivo valido e documentato.",
      "Non elaborare transazioni false o simulate.",
      "Mantenere le informazioni del negozio aggiornate sulla piattaforma.",
      "Assicurarsi che il personale sia formato sulle procedure di scansione QR DutyCredit.",
      "Notificare immediatamente DutyBoost di qualsiasi problema tecnico in cassa.",
      "Cooperare pienamente ai processi di rimborso quando un viaggiatore ne ha diritto.",
    ]},
    { h: "5. Partner Travel Hub", list: [
      "Consentire ai Partner del retail di viaggio partecipanti del tuo hub di accettare e riscattare DutyCredit secondo questi Termini.",
      "Non imporre alcuna tariffa, prelievo o margine sui DutyCredit riscattati nel tuo hub; i Partner Travel Hub non pagano tariffe a DutyBoost e non ricevono quote della tariffa di piattaforma.",
      "Non interferire con il processo di riscatto, lo sconto applicato o il valore di transazione dichiarato da un Partner del retail di viaggio.",
      "Mantenere aggiornate sulla piattaforma le informazioni del tuo hub (terminal, zone, elenco dei negozi).",
      "Cooperare in buona fede quando il tuo supporto è necessario per indagare su un riscatto, un rimborso o una frode.",
      "Informare tempestivamente DutyBoost di qualsiasi cambiamento nei negozi del tuo hub o nei flussi di viaggiatori rilevanti.",
    ]},
    { h: "6. Antiriciclaggio (AML) e criminalità finanziaria", list: [
      "Non utilizzare la piattaforma per facilitare il riciclaggio di denaro, il finanziamento del terrorismo, l'evasione fiscale o altri reati finanziari.",
      "Tutti i partner di viaggio, del retail di viaggio e Travel Hub devono cooperare pienamente con il processo KYC prima dell'attivazione.",
      "In caso di attività sospetta, DutyBoost si riserva il diritto di sospendere immediatamente l'accesso e segnalare la questione alle autorità.",
      "Tutte le parti devono rispettare le normative AML applicabili, incluse le Direttive antiriciclaggio dell'UE (AMLD).",
    ]},
    { h: "7. Comportamento vietato", list: [
      "Tentare di duplicare, falsificare o fare reverse engineering dei codici DutyCredit.",
      "Utilizzare la piattaforma per attività finanziarie illegali.",
      "Inviare dati di prenotazione falsi o fittizi.",
      "Elaborare falsi riscatti per manipolare le quote.",
      "Tentare di accedere senza autorizzazione ad account o sistemi backend.",
      "Interferire con l'infrastruttura, le API o le misure di sicurezza della piattaforma.",
      "Dichiarare falsamente la propria identità, tipo di impresa o situazione di licenza.",
    ]},
    { h: "8. Applicazione", p: "Le violazioni possono comportare sospensione immediata, cessazione permanente dell'accesso, perdita di commissioni in sospeso, recupero di fondi indebitamente percepiti e azioni legali. DutyBoost si riserva il diritto di indagare su tutte le violazioni e di condividere informazioni con le autorità competenti." },
    { h: "9. Contatto", p: "Segnalare comportamenti scorretti o attività sospette: trust@dutyboost.com · DutyBoost, entità legale registrata presso la Camera di Commercio olandese (Kamer van Koophandel) con il numero 42053088, Amsterdam, Paesi Bassi." },
  ]},
};

export default function CodeOfConduct() {
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
            {s.list && <ul className="list-disc list-inside text-muted-foreground space-y-1 leading-relaxed">{s.list.map((item, i) => <li key={i}><EmailLinkText text={item} className="inline" /></li>)}</ul>}
          </section>
        ))}
      </div>
      <PageFooter />
    </div>
  );
}