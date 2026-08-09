import { Link } from "react-router-dom";
import DutyBoostLogo from "../components/DutyBoostLogo";
import { BookOpen, Users, Store, Smartphone, CheckCircle2, ArrowRight, Globe, Zap, QrCode } from "lucide-react";
import { useTranslation } from "react-i18next";

const content = {
  en: {
    title: "DutyBoost User Guide",
    subtitle: "Everything you need to know to get started with DutyBoost — connecting travel partners, airport retailers, and travelers.",
    contents: "Contents",
    toc: ["Platform Overview", "Guide for Travel Partners", "Guide for Airport Retailers", "Guide for Travelers", "Installing DutyBoost on Your Mobile Device"],
    overview_title: "1. Platform Overview",
    overview_desc: "DutyBoost is The Circular Revenue Infrastructure for Global Travel — a shared, performance-based commercial ecosystem connecting Travel Partners, Airport Retailers, POS Partners, and travelers through DutyCredits. When a traveler books a flight, accommodation, or car rental through a participating travel partner, they automatically receive a DutyCredit — a digital discount voucher redeemable at participating airport shops. Every booking sets the ecosystem in motion: the travel partner earns a revenue share, the traveler gets an airport discount, and the retailer gains a motivated shopper.",
    overview_cards: [
      { title: "Travel Partners", desc: "Generate DutyCredits automatically for every qualifying flight, accommodation, or car rental booking." },
      { title: "DutyCredits", desc: "Smart vouchers delivered to travelers before they reach the airport." },
      { title: "Airport Retailers", desc: "Scan vouchers at checkout and attract high-intent airport shoppers." },
    ],
    agency_title: "2. Guide for Travel Partners",
    agency_desc: "DutyBoost runs silently in the background — your main job is a one-time integration setup.",
    agency_steps: [
      { title: "Sign Up & Get Approved", desc: "Go to dutyboost.com and click 'Get Started'. Fill in your business details (flight, accommodation, or car rental provider) and accept the terms. Our team reviews your application within 1 business day." },
      { title: "Integration Setup", desc: "After approval, log in to your dashboard and visit the Integration Guide. You will find your unique API key and examples to connect your booking confirmation email flow." },
      { title: "Automatic DutyCredit Generation", desc: "Once integrated, DutyBoost automatically generates a DutyCredit for every qualifying flight, accommodation, or car rental booking, valid for 30 days starting from the traveler's departure date." },
      { title: "Share Vouchers with Travelers", desc: "Use the DutyCredits dashboard to view all generated vouchers. Your travelers receive the QR code directly in their booking confirmation email — no manual sharing required." },
      { title: "Track Commissions", desc: "Your dashboard shows all issued vouchers, redemption statistics, and commission reports. Download monthly commission PDFs from the Vouchers page." },
      { title: "Embed the DutyCredit in Your Booking Confirmation Email", desc: "Our API response includes a ready-made html_snippet field — a self-contained HTML block you can paste directly into your booking confirmation email template. It contains the traveler's personal QR code, discount percentage, voucher code, and a link. Simply call the DutyBoost API after a booking is confirmed, read the html_snippet from the JSON response, and inject it into your email HTML right below your booking summary. The QR code renders in all major email clients. See our Integration Guide for a full code example." },
    ],
    retailer_title: "3. Guide for Airport Retailers",
    retailer_desc: "Airport retailers use DutyBoost to attract travelers with DutyCredit vouchers and drive in-store purchases.",
    retailer_steps: [
      { title: "Sign Up & Get Approved", desc: "Go to dutyboost.com and click 'Get Started'. Select 'Airport Retailer', fill in your store details, choose your billing preference, and accept the terms." },
      { title: "Access Your Retailer Dashboard", desc: "Once approved, log in at dutyboost.com. Your dashboard shows active vouchers at your airport, transaction history, and revenue reports." },
      { title: "Scan Vouchers at Checkout", desc: "When a traveler presents a DutyCredit, navigate to 'Scan & Redeem' from your dashboard. Use your device camera to scan the QR code, or enter the voucher code manually." },
      { title: "Enter the Purchase Amount", desc: "After scanning, enter the total purchase amount. DutyCredits require a minimum basket spend of €20. Fixed-tier discounts range from €2.50 at €20 spend up to €60 at €300+ — DutyBoost calculates and applies the correct tier automatically." },
      { title: "Monthly Billing", desc: "At month-end you receive a single invoice for 2.5% of gross redemption value (capped at €25 per transaction). No upfront fees, ever. DutyBoost handles all reporting and settlement — fully automated." },
    ],
    traveler_title: "4. Guide for Travelers",
    traveler_desc: "As a traveler, you don't need an account. Your DutyCredit is linked to your booking ID.",
    traveler_steps: [
      { title: "Receive Your DutyCredit", desc: "After booking a flight, accommodation, or car rental through a participating travel partner, you'll receive your DutyCredit automatically via email." },
      { title: "Look Up Your Voucher", desc: "Visit dutyboost.com/voucher and enter your booking ID to retrieve your DutyCredit QR code." },
      { title: "Shop at the Airport", desc: "At a participating DutyBoost retailer, show the QR code on your screen. The cashier scans it and your fixed DutyCredit discount is applied at the till. Minimum spend is €20 — discounts range from €2.50 at €20 up to €60 at €300+. Your DutyCredit is valid for 30 days from your departure date." },
    ],
    mobile_title: "5. Installing DutyBoost on Your Mobile Device",
    mobile_desc: "DutyBoost works as a Progressive Web App (PWA) — install it directly to your home screen without visiting an app store.",
    iphone_title: "iPhone (Safari)",
    iphone_steps: ["Open Safari and go to dutyboost.com.", "Tap the Share button (square with arrow) at the bottom.", "Scroll down and tap 'Add to Home Screen'.", "Give it a name and tap 'Add'.", "DutyBoost now appears as an icon on your home screen."],
    iphone_tip: "Tip: Use Safari — other browsers on iPhone do not support 'Add to Home Screen'.",
    android_title: "Android / Samsung (Chrome)",
    android_steps: ["Open Chrome and go to dutyboost.com.", "Tap the three-dot menu (⋮) in the top-right corner.", "Tap 'Add to Home screen' or 'Install app'.", "Confirm by tapping 'Add' or 'Install'.", "DutyBoost is now installed on your home screen."],
    android_tip: "Tip: On Samsung phones you can also use Samsung Internet — tap the menu and select 'Add page to Home screen'.",
    pwa_note: "Once installed, DutyBoost opens in full-screen mode — no browser bar, faster loading, great for scanning vouchers at the point of sale.",
    help_title: "Need More Help?",
    help_desc: "Browse our FAQ or contact our support team.",
    browse_faq: "Browse FAQ",
    email_support: "Email Support",
    footer: "© 2026 DutyBoost B.V. — All rights reserved.",
  },
  nl: {
    title: "DutyBoost Gebruikersgids",
    subtitle: "Alles wat u moet weten om aan de slag te gaan met DutyBoost — het platform dat reispartners, luchthavenwinkels en reizigers verbindt.",
    contents: "Inhoud",
    toc: ["Platformoverzicht", "Gids voor reispartners", "Gids voor luchthavenwinkels", "Gids voor reizigers", "DutyBoost installeren op uw mobiel"],
    overview_title: "1. Platformoverzicht",
    overview_desc: "DutyBoost is The Circular Revenue Infrastructure for Global Travel — een gedeeld, prestatiegebonden commercieel ecosysteem dat reispartners, luchthavenwinkels, POS-partners en reizigers verbindt via DutyCredits. Wanneer een reiziger een vlucht, accommodatie of huurauto boekt via een deelnemende reispartner, ontvangt hij automatisch een DutyCredit — een digitale kortingsvoucher inwisselbaar bij deelnemende luchthavenwinkels. Elke boeking zet het ecosysteem in beweging: de reispartner verdient een inkomstenaandeel, de reiziger krijgt korting op de luchthaven en de winkel krijgt een gemotiveerde klant.",
    overview_cards: [
      { title: "Reispartners", desc: "Genereer automatisch DutyCredits voor elke kwalificerende vlucht-, accommodatie- of huurauto-boeking." },
      { title: "DutyCredits", desc: "Slimme vouchers die reizigers ontvangen vóórdat ze de luchthaven bereiken." },
      { title: "Luchthavenwinkels", desc: "Scan vouchers bij de kassa en trek koopklare reizigers aan." },
    ],
    agency_title: "2. Gids voor reispartners",
    agency_desc: "DutyBoost werkt stil op de achtergrond — uw hoofdtaak is een eenmalige integratie-installatie.",
    agency_steps: [
      { title: "Aanmelden en goedgekeurd worden", desc: "Ga naar dutyboost.com en klik op 'Aan de slag'. Vul uw bedrijfsgegevens in (vlucht, accommodatie of autoverhuur) en accepteer de voorwaarden. Ons team beoordeelt uw aanvraag binnen 1 werkdag." },
      { title: "Integratie instellen", desc: "Na goedkeuring logt u in op uw dashboard en bezoekt u de integratiegids. U vindt uw unieke API-sleutel en voorbeelden om uw boekingsbevestigingsmail te koppelen." },
      { title: "Automatische DutyCredit-generatie", desc: "Eenmaal geïntegreerd, genereert DutyBoost automatisch een DutyCredit voor elke kwalificerende vlucht-, accommodatie- of huurauto-boeking, geldig gedurende 30 dagen vanaf de vertrekdatum van de reiziger." },
      { title: "Vouchers delen met reizigers", desc: "Gebruik het DutyCredits-dashboard om alle gegenereerde vouchers te bekijken. Uw reizigers ontvangen de QR-code rechtstreeks in hun boekingsbevestigingsmail — geen handmatig delen vereist." },
      { title: "Commissies bijhouden", desc: "Uw dashboard toont alle uitgegeven vouchers, inwisselstatistieken en commissierapporten. Download maandelijkse PDF's van de voucherspagina." },
      { title: "DutyCredit insluiten in uw boekingsbevestigingsmail", desc: "Onze API-respons bevat een kant-en-klaar html_snippet-veld — een zelfstandig HTML-blok dat u direct in uw bevestigingsmail-sjabloon kunt plakken. Het bevat de persoonlijke QR-code van de reiziger, het kortingspercentage, de vouchercode en een link. Roep de DutyBoost API aan na bevestiging, lees html_snippet uit de JSON-respons en voeg het in uw e-mail HTML in, direct onder uw boekingsoverzicht. De QR-code wordt weergegeven in alle gangbare e-mailclients. Zie onze Integratiegids voor een volledig codevoorbeeld." },
    ],
    retailer_title: "3. Gids voor luchthavenwinkels",
    retailer_desc: "Luchthavenwinkels gebruiken DutyBoost om reizigers aan te trekken en in-store aankopen te stimuleren.",
    retailer_steps: [
      { title: "Aanmelden en goedgekeurd worden", desc: "Ga naar dutyboost.com en klik op 'Aan de slag'. Selecteer 'Luchthavenwinkel', vul uw winkelgegevens in, kies uw factuurvoorkeur en accepteer de voorwaarden." },
      { title: "Toegang tot uw retailerdashboard", desc: "Na goedkeuring logt u in op dutyboost.com. Uw dashboard toont actieve vouchers op uw luchthaven, transactiegeschiedenis en omzetrapporten." },
      { title: "Vouchers scannen bij de kassa", desc: "Wanneer een reiziger een DutyCredit presenteert, navigeert u naar 'Scannen & Inwisselen'. Gebruik uw camera om de QR-code te scannen, of voer de vouchercode handmatig in." },
      { title: "Aankoopbedrag invoeren", desc: "Na het scannen voert u het totale aankoopbedrag in. DutyCredits vereisen een minimale besteding van €20. Vaste kortingsniveaus variëren van €2,50 bij €20 tot €60 bij €300+ — DutyBoost berekent en past automatisch het juiste niveau toe." },
      { title: "Maandelijkse facturering", desc: "Aan het einde van de maand ontvangt u één factuur voor 2,5% van de bruto inwisselwaarde (maximaal €25 per transactie). Geen kosten vooraf. DutyBoost verzorgt alle rapportage en afwikkeling — volledig geautomatiseerd." },
    ],
    traveler_title: "4. Gids voor reizigers",
    traveler_desc: "Als reiziger heeft u geen account nodig. Uw DutyCredit is gekoppeld aan uw boekings-ID.",
    traveler_steps: [
      { title: "Ontvang uw DutyCredit", desc: "Na het boeken van een vlucht, accommodatie of huurauto via een deelnemende reispartner ontvangt u automatisch uw DutyCredit per e-mail." },
      { title: "Zoek uw voucher op", desc: "Bezoek dutyboost.com/voucher en voer uw boekings-ID in om uw DutyCredit QR-code op te halen." },
      { title: "Winkelen op de luchthaven", desc: "Toon bij een deelnemende DutyBoost-winkel de QR-code op uw scherm. De kassamedewerker scant deze en uw vaste DutyCredit-korting wordt toegepast. Minimale besteding is €20 — kortingen variëren van €2,50 bij €20 tot €60 bij €300+. Uw DutyCredit is geldig gedurende 30 dagen vanaf uw vertrekdatum." },
    ],
    mobile_title: "5. DutyBoost installeren op uw mobiel",
    mobile_desc: "DutyBoost werkt als een Progressive Web App (PWA) — installeer het direct op uw startscherm.",
    iphone_title: "iPhone (Safari)",
    iphone_steps: ["Open Safari en ga naar dutyboost.com.", "Tik op de deelknop (vierkant met pijl) onderaan.", "Scroll omlaag en tik op 'Voeg toe aan beginscherm'.", "Geef het een naam en tik op 'Voeg toe'.", "DutyBoost verschijnt nu als pictogram op uw beginscherm."],
    iphone_tip: "Tip: Gebruik Safari — andere browsers ondersteunen 'Voeg toe aan beginscherm' niet.",
    android_title: "Android / Samsung (Chrome)",
    android_steps: ["Open Chrome en ga naar dutyboost.com.", "Tik op het drieknopmenu (⋮) rechtsboven.", "Tik op 'Toevoegen aan beginscherm' of 'App installeren'.", "Bevestig door op 'Toevoegen' of 'Installeren' te tikken.", "DutyBoost is nu geïnstalleerd op uw beginscherm."],
    android_tip: "Tip: Op Samsung-telefoons kunt u ook Samsung Internet gebruiken — tik op het menu en selecteer 'Pagina toevoegen aan beginscherm'.",
    pwa_note: "Eenmaal geïnstalleerd opent DutyBoost in volledig scherm — geen browserbalk, sneller laden, ideaal voor het scannen van vouchers.",
    help_title: "Meer hulp nodig?",
    help_desc: "Bekijk onze FAQ of neem contact op met ons ondersteuningsteam.",
    browse_faq: "FAQ bekijken",
    email_support: "E-mail ondersteuning",
    footer: "© 2026 DutyBoost B.V. — Alle rechten voorbehouden.",
  },
  de: {
    title: "DutyBoost Benutzerhandbuch",
    subtitle: "Alles, was Sie über DutyBoost wissen müssen — die Plattform, die Reisepartner, Flughafenhändler und Reisende verbindet.",
    contents: "Inhalt",
    toc: ["Plattformübersicht", "Leitfaden für Reisepartner", "Leitfaden für Flughafenhändler", "Leitfaden für Reisende", "DutyBoost auf Ihrem Mobilgerät installieren"],
    overview_title: "1. Plattformübersicht",
    overview_desc: "DutyBoost ist The Circular Revenue Infrastructure for Global Travel — ein gemeinsames, leistungsbasiertes kommerzielles Ökosystem, das Reisepartner, Flughafenhändler, POS-Partner und Reisende durch DutyCredits verbindet. Wenn ein Reisender einen Flug, eine Unterkunft oder einen Mietwagen über einen teilnehmenden Reisepartner bucht, erhält er automatisch einen DutyCredit — einen digitalen Rabattgutschein. Jede Buchung setzt das Ökosystem in Gang: der Reisepartner verdient einen Umsatzanteil, der Reisende erhält einen Flughafenrabatt und der Händler gewinnt einen kaufbereiten Kunden.",
    overview_cards: [
      { title: "Reisepartner", desc: "Generieren Sie automatisch DutyCredits für jede qualifizierte Flug-, Unterkunfts- oder Mietwagenbuchung." },
      { title: "DutyCredits", desc: "Intelligente Gutscheine, die Reisenden vor ihrer Ankunft am Flughafen zugestellt werden." },
      { title: "Flughafenhändler", desc: "Scannen Sie Gutscheine an der Kasse und gewinnen Sie kaufbereite Käufer." },
    ],
    agency_title: "2. Leitfaden für Reisepartner",
    agency_desc: "DutyBoost läuft im Hintergrund — Ihre Hauptaufgabe ist eine einmalige Integrationseinrichtung.",
    agency_steps: [
      { title: "Registrieren und genehmigt werden", desc: "Gehen Sie zu dutyboost.com und klicken Sie auf 'Loslegen'. Geben Sie Ihre Geschäftsdaten ein (Flug, Unterkunft oder Mietwagen) und akzeptieren Sie die Bedingungen. Unser Team prüft Ihren Antrag innerhalb von 1 Werktag." },
      { title: "Integration einrichten", desc: "Nach der Genehmigung melden Sie sich in Ihrem Dashboard an und besuchen Sie den Integrationsleitfaden. Sie finden Ihren eindeutigen API-Schlüssel und Beispiele zur Anbindung Ihrer Buchungsbestätigungs-E-Mail." },
      { title: "Automatische DutyCredit-Generierung", desc: "Nach der Integration generiert DutyBoost automatisch einen DutyCredit für jede qualifizierte Flug-, Unterkunfts- oder Mietwagenbuchung, gültig 30 Tage ab dem Abreisetag des Reisenden." },
      { title: "Gutscheine mit Reisenden teilen", desc: "Verwenden Sie das DutyCredits-Dashboard, um alle generierten Gutscheine anzuzeigen. Ihre Reisenden erhalten den QR-Code direkt in ihrer Buchungsbestätigungs-E-Mail — kein manuelles Teilen erforderlich." },
      { title: "Provisionen verfolgen", desc: "Ihr Dashboard zeigt alle ausgestellten Gutscheine, Einlösungsstatistiken und Provisionsberichte. Laden Sie monatliche PDFs herunter." },
    ],
    retailer_title: "3. Leitfaden für Flughafenhändler",
    retailer_desc: "Flughafenhändler nutzen DutyBoost, um Reisende anzuziehen und In-Store-Käufe zu fördern.",
    retailer_steps: [
      { title: "Registrieren und genehmigt werden", desc: "Gehen Sie zu dutyboost.com und klicken Sie auf 'Loslegen'. Wählen Sie 'Flughafenhändler', füllen Sie Ihre Geschäftsdaten aus und akzeptieren Sie die Bedingungen." },
      { title: "Zugriff auf Ihr Händler-Dashboard", desc: "Nach der Genehmigung melden Sie sich auf dutyboost.com an. Ihr Dashboard zeigt aktive Gutscheine an Ihrem Flughafen, Transaktionshistorie und Umsatzberichte." },
      { title: "Gutscheine an der Kasse scannen", desc: "Wenn ein Reisender einen DutyCredit vorlegt, navigieren Sie zu 'Scannen & Einlösen'. Verwenden Sie Ihre Kamera, um den QR-Code zu scannen, oder geben Sie den Code manuell ein." },
      { title: "Kaufbetrag eingeben", desc: "Geben Sie nach dem Scannen den Gesamtkaufbetrag ein. DutyCredits erfordern einen Mindesteinkauf von 20 €. Feste Rabattstufen reichen von 2,50 € bei 20 € bis zu 60 € bei 300 €+ — DutyBoost berechnet und wendet die richtige Stufe automatisch an." },
      { title: "Monatliche Abrechnung", desc: "Am Monatsende erhalten Sie eine einzige Rechnung über 2,5 % des Brutto-Einlösungswertes (max. 25 € pro Transaktion). Keine Vorabgebühren. DutyBoost übernimmt alle Berichte und Abrechnungen — vollständig automatisiert." },
    ],
    traveler_title: "4. Leitfaden für Reisende",
    traveler_desc: "Als Reisender benötigen Sie kein Konto. Ihr DutyCredit ist mit Ihrer Buchungs-ID verknüpft.",
    traveler_steps: [
      { title: "DutyCredit empfangen", desc: "Nach der Buchung eines Fluges, einer Unterkunft oder eines Mietwagens über einen teilnehmenden Reisepartner erhalten Sie Ihren DutyCredit automatisch per E-Mail." },
      { title: "Ihren Gutschein abrufen", desc: "Besuchen Sie dutyboost.com/voucher und geben Sie Ihre Buchungs-ID ein, um Ihren DutyCredit QR-Code abzurufen." },
      { title: "Am Flughafen einkaufen", desc: "Zeigen Sie bei einem teilnehmenden Händler den QR-Code auf Ihrem Bildschirm. Der Kassierer scannt ihn und Ihr fester DutyCredit-Rabatt wird angewendet. Mindesteinkauf: 20 € — Rabatte von 2,50 € bei 20 € bis 60 € bei 300 €+. Ihr DutyCredit ist 30 Tage ab Ihrem Abreisetag gültig." },
    ],
    mobile_title: "5. DutyBoost auf Ihrem Mobilgerät installieren",
    mobile_desc: "DutyBoost funktioniert als Progressive Web App (PWA) — installieren Sie es direkt auf Ihrem Startbildschirm.",
    iphone_title: "iPhone (Safari)",
    iphone_steps: ["Öffnen Sie Safari und gehen Sie zu dutyboost.com.", "Tippen Sie auf die Teilen-Schaltfläche (Quadrat mit Pfeil) unten.", "Scrollen Sie nach unten und tippen Sie auf 'Zum Home-Bildschirm'.", "Geben Sie einen Namen ein und tippen Sie auf 'Hinzufügen'.", "DutyBoost erscheint jetzt als Symbol auf Ihrem Startbildschirm."],
    iphone_tip: "Tipp: Verwenden Sie Safari — andere Browser unterstützen 'Zum Home-Bildschirm' nicht.",
    android_title: "Android / Samsung (Chrome)",
    android_steps: ["Öffnen Sie Chrome und gehen Sie zu dutyboost.com.", "Tippen Sie auf das Drei-Punkte-Menü (⋮) oben rechts.", "Tippen Sie auf 'Zum Startbildschirm hinzufügen' oder 'App installieren'.", "Bestätigen Sie mit 'Hinzufügen' oder 'Installieren'.", "DutyBoost ist jetzt auf Ihrem Startbildschirm installiert."],
    android_tip: "Tipp: Auf Samsung-Telefonen können Sie auch Samsung Internet verwenden — tippen Sie auf das Menü und wählen Sie 'Seite zum Startbildschirm hinzufügen'.",
    pwa_note: "Nach der Installation öffnet sich DutyBoost im Vollbildmodus — kein Browser, schnelleres Laden, ideal für das Scannen von Gutscheinen.",
    help_title: "Weitere Hilfe benötigt?",
    help_desc: "Durchsuchen Sie unsere FAQ oder kontaktieren Sie unser Support-Team.",
    browse_faq: "FAQ durchsuchen",
    email_support: "E-Mail-Support",
    footer: "© 2026 DutyBoost B.V. — Alle Rechte vorbehalten.",
  },
  fr: {
    title: "Guide utilisateur DutyBoost",
    subtitle: "Tout ce que vous devez savoir pour commencer avec DutyBoost — la plateforme reliant partenaires de voyage, commerces aéroportuaires et voyageurs.",
    contents: "Sommaire",
    toc: ["Présentation de la plateforme", "Guide pour les partenaires de voyage", "Guide pour les détaillants aéroportuaires", "Guide pour les voyageurs", "Installer DutyBoost sur votre mobile"],
    overview_title: "1. Présentation de la plateforme",
    overview_desc: "DutyBoost est The Circular Revenue Infrastructure for Global Travel — un écosystème commercial partagé et basé sur la performance reliant partenaires de voyage, commerces aéroportuaires, partenaires POS et voyageurs via des DutyCredits. Lorsqu'un voyageur réserve un vol, un hébergement ou une location de voiture via un partenaire de voyage participant, il reçoit automatiquement un DutyCredit — un bon de réduction numérique échangeable dans les commerces participants. Chaque réservation met l'écosystème en mouvement : le partenaire de voyage gagne une part de revenus, le voyageur obtient une réduction en aéroport et le détaillant attire un acheteur motivé.",
    overview_cards: [
      { title: "Partenaires de voyage", desc: "Générez automatiquement des DutyCredits pour chaque réservation de vol, d'hébergement ou de location de voiture éligible." },
      { title: "DutyCredits", desc: "Bons intelligents envoyés aux voyageurs avant leur arrivée à l'aéroport." },
      { title: "Détaillants aéroportuaires", desc: "Scannez les bons à la caisse et attirez des acheteurs à haute intention." },
    ],
    agency_title: "2. Guide pour les partenaires de voyage",
    agency_desc: "DutyBoost fonctionne silencieusement en arrière-plan — votre principale tâche est une configuration d'intégration unique.",
    agency_steps: [
      { title: "S'inscrire et être approuvé", desc: "Rendez-vous sur dutyboost.com et cliquez sur 'Commencer'. Renseignez vos coordonnées (vol, hébergement ou location de voiture) et acceptez les conditions. Notre équipe examine votre demande dans 1 jour ouvrable." },
      { title: "Configurer l'intégration", desc: "Après approbation, connectez-vous à votre tableau de bord et consultez le guide d'intégration. Vous trouverez votre clé API unique et des exemples pour connecter votre e-mail de confirmation de réservation." },
      { title: "Génération automatique de DutyCredits", desc: "Une fois intégré, DutyBoost génère automatiquement un DutyCredit pour chaque réservation de vol, d'hébergement ou de location de voiture éligible, valable 30 jours à partir de la date de départ du voyageur." },
      { title: "Partager les bons avec les voyageurs", desc: "Utilisez le tableau de bord DutyCredits pour voir tous les bons générés. Vos voyageurs reçoivent le QR code directement dans leur e-mail de confirmation de réservation — aucun partage manuel requis." },
      { title: "Suivre les commissions", desc: "Votre tableau de bord affiche tous les bons émis, les statistiques de rachat et les rapports de commissions. Téléchargez des PDF mensuels depuis la page Vouchers." },
    ],
    retailer_title: "3. Guide pour les détaillants aéroportuaires",
    retailer_desc: "Les détaillants aéroportuaires utilisent DutyBoost pour attirer les voyageurs et stimuler les achats en magasin.",
    retailer_steps: [
      { title: "S'inscrire et être approuvé", desc: "Rendez-vous sur dutyboost.com et cliquez sur 'Commencer'. Sélectionnez 'Détaillant aéroportuaire', renseignez les détails de votre magasin, choisissez votre mode de facturation et acceptez les conditions." },
      { title: "Accéder à votre tableau de bord", desc: "Une fois approuvé, connectez-vous sur dutyboost.com. Votre tableau de bord affiche les bons actifs à votre aéroport, l'historique des transactions et les rapports de revenus." },
      { title: "Scanner les bons à la caisse", desc: "Lorsqu'un voyageur présente un DutyCredit, accédez à 'Scanner & Échanger'. Utilisez l'appareil photo pour scanner le QR code, ou saisissez le code manuellement." },
      { title: "Saisir le montant de l'achat", desc: "Après le scan, saisissez le montant total. Les DutyCredits nécessitent un panier minimum de 20 €. Les remises fixes vont de 2,50 € à 20 € jusqu'à 60 € à 300 €+ — DutyBoost calcule et applique automatiquement le bon niveau." },
      { title: "Facturation mensuelle", desc: "En fin de mois, vous recevez une seule facture de 2,5 % de la valeur brute échangée (plafonnée à 25 € par transaction). Aucun frais initial. DutyBoost gère tous les rapports et le règlement — entièrement automatisé." },
    ],
    traveler_title: "4. Guide pour les voyageurs",
    traveler_desc: "En tant que voyageur, vous n'avez pas besoin de compte. Votre DutyCredit est lié à votre ID de réservation.",
    traveler_steps: [
      { title: "Recevoir votre DutyCredit", desc: "Après avoir réservé un vol, un hébergement ou une location de voiture via un partenaire de voyage participant, vous recevrez votre DutyCredit automatiquement par e-mail." },
      { title: "Retrouver votre bon", desc: "Visitez dutyboost.com/voucher et saisissez votre ID de réservation pour retrouver votre QR code DutyCredit." },
      { title: "Faire ses achats à l'aéroport", desc: "Chez un détaillant participant, montrez le QR code sur votre écran. Le caissier le scannera et votre remise DutyCredit fixe sera appliquée. Minimum d'achat : 20 € — remises de 2,50 € à 20 € jusqu'à 60 € à 300 €+. Votre DutyCredit est valable 30 jours à partir de votre date de départ." },
    ],
    mobile_title: "5. Installer DutyBoost sur votre mobile",
    mobile_desc: "DutyBoost fonctionne comme une Progressive Web App (PWA) — installez-la directement sur votre écran d'accueil.",
    iphone_title: "iPhone (Safari)",
    iphone_steps: ["Ouvrez Safari et allez sur dutyboost.com.", "Appuyez sur le bouton Partager (carré avec flèche) en bas.", "Faites défiler vers le bas et appuyez sur 'Sur l'écran d'accueil'.", "Donnez-lui un nom et appuyez sur 'Ajouter'.", "DutyBoost apparaît maintenant comme icône sur votre écran d'accueil."],
    iphone_tip: "Conseil : Utilisez Safari — les autres navigateurs ne prennent pas en charge 'Sur l'écran d'accueil'.",
    android_title: "Android / Samsung (Chrome)",
    android_steps: ["Ouvrez Chrome et allez sur dutyboost.com.", "Appuyez sur le menu à trois points (⋮) en haut à droite.", "Appuyez sur 'Ajouter à l'écran d'accueil' ou 'Installer l'application'.", "Confirmez en appuyant sur 'Ajouter' ou 'Installer'.", "DutyBoost est maintenant installé sur votre écran d'accueil."],
    android_tip: "Conseil : Sur Samsung, utilisez Samsung Internet — appuyez sur le menu et sélectionnez 'Ajouter la page à l'écran d'accueil'.",
    pwa_note: "Une fois installé, DutyBoost s'ouvre en plein écran — sans barre de navigation, chargement plus rapide, idéal pour scanner des bons.",
    help_title: "Besoin d'aide ?",
    help_desc: "Parcourez notre FAQ ou contactez notre équipe de support.",
    browse_faq: "Parcourir la FAQ",
    email_support: "Contacter le support",
    footer: "© 2026 DutyBoost B.V. — Tous droits réservés.",
  },
  es: {
    title: "Guía de usuario de DutyBoost",
    subtitle: "Todo lo que necesitas saber para empezar con DutyBoost — la plataforma que conecta socios de viajes, tiendas aeroportuarias y viajeros.",
    contents: "Contenido",
    toc: ["Descripción general", "Guía para socios de viajes", "Guía para tiendas aeroportuarias", "Guía para viajeros", "Instalar DutyBoost en tu móvil"],
    overview_title: "1. Descripción general",
    overview_desc: "DutyBoost es The Circular Revenue Infrastructure for Global Travel — un ecosistema comercial compartido y basado en el rendimiento que une socios de viajes, tiendas aeroportuarias, socios POS y viajeros a través de DutyCredits. Cuando un viajero reserva un vuelo, alojamiento o alquiler de coche a través de un socio de viajes participante, recibe automáticamente un DutyCredit — un bono de descuento digital canjeable en tiendas participantes. Cada reserva pone en marcha el ecosistema: el socio de viaje gana una participación en los ingresos, el viajero obtiene un descuento en el aeropuerto y el comercio atrae a un comprador motivado.",
    overview_cards: [
      { title: "Socios de viajes", desc: "Genera automáticamente DutyCredits para cada reserva de vuelo, alojamiento o alquiler de coche válida." },
      { title: "DutyCredits", desc: "Bonos inteligentes entregados a los viajeros antes de llegar al aeropuerto." },
      { title: "Tiendas aeroportuarias", desc: "Escanea bonos en caja y atrae compradores con alta intención." },
    ],
    agency_title: "2. Guía para socios de viajes",
    agency_desc: "DutyBoost funciona en segundo plano — tu tarea principal es una configuración de integración única.",
    agency_steps: [
      { title: "Regístrate y obtén aprobación", desc: "Ve a dutyboost.com y haz clic en 'Empezar'. Rellena tus datos (vuelo, alojamiento o alquiler de coche) y acepta los términos. Nuestro equipo revisa tu solicitud en 1 día hábil." },
      { title: "Configura la integración", desc: "Tras la aprobación, inicia sesión y visita la Guía de integración. Encontrarás tu clave API única y ejemplos para conectar tu correo de confirmación de reserva." },
      { title: "Generación automática de DutyCredits", desc: "Una vez integrado, DutyBoost genera automáticamente un DutyCredit para cada reserva de vuelo, alojamiento o alquiler de coche válida, válido durante 30 días a partir de la fecha de salida del viajero." },
      { title: "Comparte los bonos con los viajeros", desc: "Usa el panel de DutyCredits para ver todos los bonos. Tus viajeros reciben el código QR directamente en su correo de confirmación de reserva — sin necesidad de compartirlo manualmente." },
      { title: "Sigue tus comisiones", desc: "Tu panel muestra todos los bonos, estadísticas de canje e informes de comisiones. Descarga PDFs mensuales desde la página de Vouchers." },
    ],
    retailer_title: "3. Guía para tiendas aeroportuarias",
    retailer_desc: "Las tiendas aeroportuarias usan DutyBoost para atraer viajeros y fomentar las compras.",
    retailer_steps: [
      { title: "Regístrate y obtén aprobación", desc: "Ve a dutyboost.com y haz clic en 'Empezar'. Selecciona 'Tienda aeroportuaria', rellena los datos, elige tu preferencia de facturación y acepta los términos." },
      { title: "Accede a tu panel", desc: "Una vez aprobado, inicia sesión en dutyboost.com. Tu panel muestra los bonos activos, el historial de transacciones y los informes de ingresos." },
      { title: "Escanea los bonos en caja", desc: "Cuando un viajero presente un DutyCredit, ve a 'Escanear y canjear'. Usa la cámara para escanear el QR o introduce el código manualmente." },
      { title: "Introduce el importe de la compra", desc: "Tras el escaneo, introduce el importe total. Los DutyCredits requieren una compra mínima de 20 €. Los descuentos fijos van de 2,50 € en 20 € hasta 60 € en 300 €+ — DutyBoost calcula y aplica automáticamente el nivel correcto." },
      { title: "Facturación mensual", desc: "A fin de mes recibirás una sola factura del 2,5 % del valor bruto canjeado (máximo 25 € por transacción). Sin costes previos. DutyBoost gestiona todos los informes y la liquidación — totalmente automatizado." },
    ],
    traveler_title: "4. Guía para viajeros",
    traveler_desc: "Como viajero, no necesitas cuenta. Tu DutyCredit está vinculado a tu ID de reserva.",
    traveler_steps: [
      { title: "Recibe tu DutyCredit", desc: "Después de reservar un vuelo, alojamiento o alquiler de coche a través de un socio de viajes participante, recibirás tu DutyCredit automáticamente por email." },
      { title: "Consulta tu bono", desc: "Visita dutyboost.com/voucher e introduce tu ID de reserva para recuperar tu código QR DutyCredit." },
      { title: "Compra en el aeropuerto", desc: "En una tienda DutyBoost participante, muestra el código QR en tu pantalla. El cajero lo escaneará y se aplicará tu descuento fijo DutyCredit. Compra mínima: 20 € — descuentos desde 2,50 € en 20 € hasta 60 € en 300 €+. Tu DutyCredit es válido durante 30 días desde tu fecha de salida." },
    ],
    mobile_title: "5. Instalar DutyBoost en tu móvil",
    mobile_desc: "DutyBoost funciona como una Progressive Web App (PWA) — instálala directamente en tu pantalla de inicio.",
    iphone_title: "iPhone (Safari)",
    iphone_steps: ["Abre Safari y ve a dutyboost.com.", "Toca el botón Compartir (cuadrado con flecha) en la parte inferior.", "Desplázate hacia abajo y toca 'Añadir a pantalla de inicio'.", "Dale un nombre y toca 'Añadir'.", "DutyBoost aparece ahora como icono en tu pantalla de inicio."],
    iphone_tip: "Consejo: Usa Safari — otros navegadores no admiten 'Añadir a pantalla de inicio'.",
    android_title: "Android / Samsung (Chrome)",
    android_steps: ["Abre Chrome y ve a dutyboost.com.", "Toca el menú de tres puntos (⋮) arriba a la derecha.", "Toca 'Añadir a pantalla de inicio' o 'Instalar aplicación'.", "Confirma tocando 'Añadir' o 'Instalar'.", "DutyBoost está ahora instalado en tu pantalla de inicio."],
    android_tip: "Consejo: En Samsung también puedes usar Samsung Internet — toca el menú y selecciona 'Añadir página a pantalla de inicio'.",
    pwa_note: "Una vez instalado, DutyBoost se abre en pantalla completa — sin barra del navegador, carga más rápida, perfecto para escanear bonos.",
    help_title: "¿Necesitas más ayuda?",
    help_desc: "Consulta nuestras preguntas frecuentes o contacta con nuestro equipo de soporte.",
    browse_faq: "Ver FAQ",
    email_support: "Soporte por email",
    footer: "© 2026 DutyBoost B.V. — Todos los derechos reservados.",
  },
  it: {
    title: "Guida utente DutyBoost",
    subtitle: "Tutto ciò che devi sapere per iniziare con DutyBoost — la piattaforma che connette partner di viaggio, rivenditori aeroportuali e viaggiatori.",
    contents: "Indice",
    toc: ["Panoramica della piattaforma", "Guida per i partner di viaggio", "Guida per i rivenditori aeroportuali", "Guida per i viaggiatori", "Installare DutyBoost sul dispositivo mobile"],
    overview_title: "1. Panoramica della piattaforma",
    overview_desc: "DutyBoost è The Circular Revenue Infrastructure for Global Travel — un ecosistema commerciale condiviso e basato sulle prestazioni che collega partner di viaggio, rivenditori aeroportuali, partner POS e viaggiatori tramite DutyCredit. Quando un viaggiatore prenota un volo, un alloggio o un noleggio auto tramite un partner di viaggio partecipante, riceve automaticamente un DutyCredit — un buono sconto digitale riscattabile nei negozi partecipanti. Ogni prenotazione mette in moto l'ecosistema: il partner di viaggio guadagna una quota di ricavi, il viaggiatore ottiene uno sconto in aeroporto e il rivenditore attrae un acquirente motivato.",
    overview_cards: [
      { title: "Partner di viaggio", desc: "Genera automaticamente DutyCredit per ogni prenotazione qualificata di volo, alloggio o noleggio auto." },
      { title: "DutyCredit", desc: "Buoni intelligenti consegnati ai viaggiatori prima che arrivino all'aeroporto." },
      { title: "Rivenditori aeroportuali", desc: "Scansiona i buoni alla cassa e attrai acquirenti ad alta intenzione." },
    ],
    agency_title: "2. Guida per i partner di viaggio",
    agency_desc: "DutyBoost opera silenziosamente in background — il tuo compito principale è una configurazione di integrazione una tantum.",
    agency_steps: [
      { title: "Registrati e ottieni l'approvazione", desc: "Vai su dutyboost.com e clicca su 'Inizia'. Inserisci i dati aziendali (volo, alloggio o noleggio auto) e accetta i termini. Il nostro team esamina la candidatura entro 1 giorno lavorativo." },
      { title: "Configura l'integrazione", desc: "Dopo l'approvazione, accedi alla tua dashboard e visita la guida all'integrazione. Troverai la tua chiave API univoca ed esempi per collegare la tua e-mail di conferma prenotazione." },
      { title: "Generazione automatica di DutyCredit", desc: "Una volta integrato, DutyBoost genera automaticamente un DutyCredit per ogni prenotazione qualificata di volo, alloggio o noleggio auto, valido per 30 giorni a partire dalla data di partenza del viaggiatore." },
      { title: "Condividi i buoni con i viaggiatori", desc: "Usa la dashboard DutyCredit per visualizzare tutti i buoni. I tuoi viaggiatori ricevono il QR code direttamente nella loro e-mail di conferma prenotazione — nessuna condivisione manuale richiesta." },
      { title: "Monitora le commissioni", desc: "La tua dashboard mostra tutti i buoni emessi, le statistiche di riscatto e i report sulle commissioni. Scarica PDF mensili dalla pagina Voucher." },
    ],
    retailer_title: "3. Guida per i rivenditori aeroportuali",
    retailer_desc: "I rivenditori aeroportuali usano DutyBoost per attrarre viaggiatori e stimolare gli acquisti in negozio.",
    retailer_steps: [
      { title: "Registrati e ottieni l'approvazione", desc: "Vai su dutyboost.com e clicca su 'Inizia'. Seleziona 'Rivenditore aeroportuale', compila i dati, scegli la preferenza di fatturazione e accetta i termini." },
      { title: "Accedi alla tua dashboard", desc: "Una volta approvato, accedi su dutyboost.com. La tua dashboard mostra i buoni attivi, la cronologia delle transazioni e i report sui ricavi." },
      { title: "Scansiona i buoni alla cassa", desc: "Quando un viaggiatore presenta un DutyCredit, vai a 'Scansiona e Riscatta'. Usa la fotocamera per scansionare il QR code o inserisci il codice manualmente." },
      { title: "Inserisci l'importo dell'acquisto", desc: "Dopo la scansione, inserisci l'importo totale. I DutyCredit richiedono un acquisto minimo di 20 €. Gli sconti fissi vanno da 2,50 € a 20 € fino a 60 € a 300 €+ — DutyBoost calcola e applica automaticamente il livello corretto." },
      { title: "Fatturazione mensile", desc: "A fine mese ricevi un'unica fattura del 2,5% del valore lordo riscattato (massimo 25 € per transazione). Nessun costo anticipato. DutyBoost gestisce tutta la reportistica e il regolamento — completamente automatizzato." },
    ],
    traveler_title: "4. Guida per i viaggiatori",
    traveler_desc: "Come viaggiatore, non hai bisogno di un account. Il tuo DutyCredit è collegato al tuo ID prenotazione.",
    traveler_steps: [
      { title: "Ricevi il tuo DutyCredit", desc: "Dopo aver prenotato un volo, un alloggio o un noleggio auto tramite un partner di viaggio partecipante, riceverai automaticamente il tuo DutyCredit via email." },
      { title: "Cerca il tuo buono", desc: "Visita dutyboost.com/voucher e inserisci il tuo ID prenotazione per recuperare il tuo QR code DutyCredit." },
      { title: "Acquista in aeroporto", desc: "Presso un rivenditore DutyBoost partecipante, mostra il QR code sullo schermo. Il cassiere lo scansionerà e verrà applicato il tuo sconto fisso DutyCredit. Acquisto minimo: 20 € — sconti da 2,50 € a 20 € fino a 60 € a 300 €+. Il tuo DutyCredit è valido per 30 giorni dalla data di partenza." },
    ],
    mobile_title: "5. Installare DutyBoost sul dispositivo mobile",
    mobile_desc: "DutyBoost funziona come una Progressive Web App (PWA) — installala direttamente sulla schermata Home.",
    iphone_title: "iPhone (Safari)",
    iphone_steps: ["Apri Safari e vai su dutyboost.com.", "Tocca il pulsante Condividi (quadrato con freccia) in basso.", "Scorri verso il basso e tocca 'Aggiungi alla schermata Home'.", "Dai un nome e tocca 'Aggiungi'.", "DutyBoost appare ora come icona sulla tua schermata Home."],
    iphone_tip: "Suggerimento: Usa Safari — altri browser non supportano 'Aggiungi alla schermata Home'.",
    android_title: "Android / Samsung (Chrome)",
    android_steps: ["Apri Chrome e vai su dutyboost.com.", "Tocca il menu a tre punti (⋮) in alto a destra.", "Tocca 'Aggiungi alla schermata Home' o 'Installa app'.", "Conferma toccando 'Aggiungi' o 'Installa'.", "DutyBoost è ora installato sulla tua schermata Home."],
    android_tip: "Suggerimento: Su Samsung puoi usare anche Samsung Internet — tocca il menu e seleziona 'Aggiungi pagina alla schermata Home'.",
    pwa_note: "Una volta installato, DutyBoost si apre a schermo intero — nessuna barra del browser, caricamento più veloce, ideale per scansionare buoni.",
    help_title: "Hai bisogno di aiuto?",
    help_desc: "Sfoglia le nostre FAQ o contatta il nostro team di supporto.",
    browse_faq: "Sfoglia le FAQ",
    email_support: "Contatta il supporto",
    footer: "© 2026 DutyBoost B.V. — Tutti i diritti riservati.",
  },
};

export default function UserGuide() {
  const { i18n } = useTranslation();
  const c = content[i18n.language] || content.en;
  return (
    <div className="min-h-screen bg-background font-body">
      <nav className="border-b border-border px-6 h-16 flex items-center sticky top-0 bg-background/95 backdrop-blur z-10">
        <Link to="/"><DutyBoostLogo height={55} /></Link>
      </nav>
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-14">
        <div className="text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto"><BookOpen className="w-7 h-7 text-primary" /></div>
          <h1 className="text-4xl font-heading font-bold">{c.title}</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{c.subtitle}</p>
        </div>
        <div className="bg-card border border-border rounded-2xl p-6 space-y-3">
          <h2 className="font-heading font-semibold text-lg">{c.contents}</h2>
          <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
            {c.toc.map((item, i) => <li key={i}><a href={`#s${i}`} className="hover:text-primary transition-colors">{item}</a></li>)}
          </ol>
        </div>
        {[
          { id: "s0", icon: Globe, title: c.overview_title, desc: c.overview_desc, cards: c.overview_cards },
        ].map(({ id, icon: Icon, title, desc, cards }) => (
          <section key={id} id={id} className="space-y-4">
            <div className="flex items-center gap-3"><div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center"><Icon className="w-5 h-5 text-primary" /></div><h2 className="text-2xl font-heading font-bold">{title}</h2></div>
            <p className="text-muted-foreground leading-relaxed">{desc}</p>
            <div className="grid md:grid-cols-3 gap-4">{cards.map(({ title: t, desc: d }, i) => { const icons = [Users, Zap, Store]; const I = icons[i]; return (<div key={t} className="bg-card border border-border rounded-xl p-4 space-y-2"><I className="w-5 h-5 text-primary" /><p className="font-semibold text-sm">{t}</p><p className="text-xs text-muted-foreground">{d}</p></div>); })}</div>
          </section>
        ))}
        {[
          { id: "s1", icon: Users, title: c.agency_title, desc: c.agency_desc, steps: c.agency_steps },
          { id: "s2", icon: Store, title: c.retailer_title, desc: c.retailer_desc, steps: c.retailer_steps },
          { id: "s3", icon: QrCode, title: c.traveler_title, desc: c.traveler_desc, steps: c.traveler_steps },
        ].map(({ id, icon: Icon, title, desc, steps }) => (
          <section key={id} id={id} className="space-y-4">
            <div className="flex items-center gap-3"><div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center"><Icon className="w-5 h-5 text-primary" /></div><h2 className="text-2xl font-heading font-bold">{title}</h2></div>
            <p className="text-muted-foreground leading-relaxed">{desc}</p>
            <div className="space-y-3">{steps.map(({ title: t, desc: d }, i) => (<div key={i} className="flex gap-4 bg-card border border-border rounded-xl p-5"><div className="w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</div><div><p className="font-semibold text-sm mb-1">{t}</p><p className="text-sm text-muted-foreground leading-relaxed">{d}</p></div></div>))}</div>
          </section>
        ))}
        <section id="s4" className="space-y-4">
          <div className="flex items-center gap-3"><div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center"><Smartphone className="w-5 h-5 text-primary" /></div><h2 className="text-2xl font-heading font-bold">{c.mobile_title}</h2></div>
          <p className="text-muted-foreground leading-relaxed">{c.mobile_desc}</p>
          <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center"><svg viewBox="0 0 814 1000" className="w-5 h-5" fill="currentColor"><path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 790.7 0 663 0 541.8c0-207.8 135.4-317.9 268.2-317.9 66.1 0 121.2 43.4 162.7 43.4 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z"/></svg></div><h3 className="font-heading font-semibold text-base">{c.iphone_title}</h3></div>
            <ol className="space-y-3">{c.iphone_steps.map((text, i) => (<li key={i} className="flex gap-3 items-start text-sm text-muted-foreground"><span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>{text}</li>))}</ol>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-800">{c.iphone_tip}</div>
          </div>
          <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center"><span className="text-lg">🤖</span></div><h3 className="font-heading font-semibold text-base">{c.android_title}</h3></div>
            <ol className="space-y-3">{c.android_steps.map((text, i) => (<li key={i} className="flex gap-3 items-start text-sm text-muted-foreground"><span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>{text}</li>))}</ol>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-800">{c.android_tip}</div>
          </div>
          <div className="flex items-center gap-3 bg-primary/5 border border-primary/20 rounded-xl p-4 text-sm text-primary"><CheckCircle2 className="w-5 h-5 shrink-0" /><span>{c.pwa_note}</span></div>
        </section>
        <section className="bg-card border border-border rounded-2xl p-8 text-center space-y-3">
          <h3 className="font-heading font-semibold text-lg">{c.help_title}</h3>
          <p className="text-sm text-muted-foreground">{c.help_desc}</p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Link to="/faq" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-background text-sm font-medium hover:bg-muted transition-colors">{c.browse_faq} <ArrowRight className="w-4 h-4" /></Link>
          </div>
        </section>
      </div>
      <footer className="border-t border-border py-10 px-6 mt-10">
        <div className="max-w-4xl mx-auto text-center text-xs text-muted-foreground">
          <p>{c.footer}</p>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-3">
            <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link to="/faq" className="hover:text-primary transition-colors">FAQ</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}