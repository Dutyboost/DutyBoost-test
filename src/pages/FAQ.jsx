import { Link } from "react-router-dom";
import DutyBoostLogo from "../components/DutyBoostLogo";
import PageFooter from "../components/PageFooter";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { Badge } from "@/components/ui/badge";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const content = {
  en: {
    badge: "Help Centre", title: "Frequently Asked Questions", subtitle: "Everything you need to know about DutyBoost and DutyCredits.",
    back_home: "← Back to Home", footer_rights: "© 2026 DutyBoost.", footer_back: "Back to Home",
    categories: [
      { cat: "DutyCredits", qs: [
        { q: "What is a DutyCredit?", a: "A DutyCredit is a booking-earned incentive — a unique digital discount code automatically generated when a travel partner (flight, cruise, rail, coach, car rental, or accommodation) submits a booking through the DutyBoost platform. DutyBoost operates as a Performance-based Customer Acquisition Solution for Global Travel: travel partners earn commissions, travelers get discounts at travel retailers, and retailers gain high-intent shoppers — all from one booking. Travelers receive their DutyCredit as a QR code directly in their booking confirmation email and can use it to get a discount at participating travel retailers. Travelers who want to shop in several different stores can also generate their own DutyCredit directly on the DutyBoost website before they travel." },
        { q: "How is my DutyCredit value calculated?", a: "Your DutyCredit provides a fixed euro discount at participating travel retailers — no complex calculation involved. The amount depends entirely on your basket size at checkout: €2.50 off at €20–€49, €5 off at €50–€74, €10 off at €75–€99, €15 off at €100–€149, €20 off at €150–€199, €20 off at €200–€299, and €60 off at €300 or more." },
        { q: "Can I use my DutyCredit at multiple shops?", a: "No. DutyCredits are redeemable in a single transaction at one point of sale and cannot be split across multiple shops. If you plan to shop in several stores, you can generate an additional DutyCredit for each of them yourself on the DutyBoost website before you travel." },
        { q: "Is there a minimum spend to redeem a DutyCredit?", a: "Yes. A minimum basket spend of €20 is required to activate your DutyCredit. The discount is a fixed euro amount that grows with your basket — from €2.50 at €20 spend up to €60 at €300 or more." },
        { q: "How do I receive my DutyCredit?", a: "Your DutyCredit QR code is automatically included in the booking confirmation email sent by your travel partner (flight, cruise, rail, coach, car rental, or accommodation provider). Simply open the email and use the QR code at a participating travel retailer. You can also generate your own DutyCredit on the DutyBoost website before you travel." },
        { q: "Do DutyCredits expire?", a: "Yes. Every DutyCredit is valid for 30 days starting from your departure date. It expires 30 days after departure and cannot be reinstated or reissued after that." },
        { q: "Can I transfer my DutyCredit to someone else?", a: "No. DutyCredits are unique, single-use, and cryptographically secured. They cannot be transferred, resold, or duplicated." },
      ]},
      { cat: "For Travelers", qs: [
        { q: "Do I need to sign up to use a DutyCredit?", a: "No sign-up or account is required. Simply open your booking confirmation email from your travel partner (flight, cruise, rail, coach, car rental, or accommodation provider) and use the QR code included. You can also generate your own DutyCredit on the DutyBoost website before you travel." },
        { q: "Where can I redeem my DutyCredit?", a: "DutyCredits can be redeemed at any travel retailer registered on the DutyBoost platform at your departure or pick-up hub — airports, cruise ports and terminals, and rail and coach stations — as well as at participating local retailers in city centres." },
        { q: "What happens after I scan my DutyCredit?", a: "The retailer scans your QR code, the discount is instantly applied to your purchase, and your DutyCredit is marked as redeemed." },
      ]},
      { cat: "For Travel Partners", qs: [
        { q: "How does DutyBoost benefit my business?", a: "Every time one of your travelers redeems a DutyCredit at a travel retailer, your business earns a 20% revenue margin on the platform's commission — whether you're a flight, cruise, rail, coach, car rental, or accommodation provider." },
        { q: "How do I generate a DutyCredit?", a: "You don't — it happens automatically. By adding the DutyBoost snippet to your booking confirmation page, every traveler automatically receives a unique DutyCredit QR code in their confirmation email." },
        { q: "Is there a cost to join DutyBoost as a travel partner?", a: "No! — There are no setup fees, subscription fees, or usage costs for travel partners. This gives your travelers an exclusive travel benefit they'll remember — boosting loyalty and repeat bookings. And every time they redeem it, you earn passive income through your 20% revenue margin. Zero effort, real returns." },
      ]},
      { cat: "For Travel Retailers", qs: [
        { q: "How does DutyBoost benefit my store?", a: "DutyBoost drives pre-qualified, incentivised travelers directly to your store — meaning higher conversion rates and larger basket sizes. Every traveler arriving with a DutyCredit already has the intent to spend: they've received a discount tied to a minimum basket, so they're motivated to reach that threshold. That translates into more foot traffic, bigger average orders, and customers who feel rewarded for shopping with you. Best of all, you only pay a small platform fee when a sale is actually completed — no upfront costs, no wasted ad spend." },
        { q: "What commission does DutyBoost charge retailers?", a: "DutyBoost charges a 2.5% platform fee on the gross transaction value of each redeemed DutyCredit, capped at €25 per transaction (which corresponds to a €1,000 transaction value). All revenue above €1,000 stays with you. There are no upfront or subscription fees — you only pay when DutyBoost delivers a confirmed sale." },
        { q: "How do I redeem a DutyCredit at my store?", a: "Retailers integrate DutyBoost validation directly into their existing point-of-sale system via our API. When a traveler presents their QR code at checkout, it is scanned natively within your POS and the discount is applied automatically — no separate device or manual step required, just a seamless experience built into your existing checkout flow." },
      ]},
      { cat: "Integration & Technical", qs: [
        { q: "What do travel retailers need to implement to accept DutyCredits?", a: "Travel retailers integrate DutyBoost directly into their existing POS system via an API integration. The redemption API handles QR code validation natively at checkout, so the discount is applied automatically within the retailer's existing workflow." },
        { q: "How do travel partners integrate with DutyBoost?", a: "Travel partners add the DutyBoost snippet to their booking confirmation email. Once integrated, every booking automatically triggers the generation of a unique DutyCredit QR code, which is embedded directly in the traveler's confirmation email — no manual steps required." },
      ]},
      { cat: "Platform & Security", qs: [
        { q: "Is DutyBoost secure?", a: "Yes. Every DutyCredit is cryptographically unique and single-use. Our platform uses industry-standard encryption (TLS 1.2+, AES-256) and role-based access controls." },
        { q: "Is my data safe with DutyBoost?", a: "Absolutely. DutyBoost is fully GDPR-compliant and never sells your data to third parties." },
      ]},
    ],
  },
  nl: {
    badge: "Helpcentrum", title: "Veelgestelde vragen", subtitle: "Alles wat u moet weten over DutyBoost en DutyCredits.",
    back_home: "← Terug naar home", footer_rights: "© 2026 DutyBoost.", footer_back: "Terug naar home",
    categories: [
      { cat: "DutyCredits", qs: [
        { q: "Wat is een DutyCredit?", a: "Een DutyCredit is een boeking-gedreven incentive — een unieke digitale kortingscode die automatisch wordt gegenereerd wanneer een reispartner (vlucht, cruise, trein, touringcar, autoverhuur of accommodatie) een boeking indient via DutyBoost. DutyBoost werkt als a Performance-based Customer Acquisition Solution for Global Travel: reispartners verdienen commissie, reizigers krijgen korting bij reisretailers en winkels trekken koopbereidde bezoekers aan — allemaal vanuit één boeking. Reizigers ontvangen hun DutyCredit als QR-code rechtstreeks in hun boekingsbevestigingsmail. Reizigers die in meerdere verschillende winkels willen kopen, kunnen ook zelf een DutyCredit aanmaken op de DutyBoost-website voordat ze op reis gaan." },
        { q: "Hoe wordt mijn DutyCredit berekend?", a: "Uw DutyCredit geeft u een vaste eurokorting bij deelnemende reisretailers. Het bedrag hangt af van de totale waarde van uw aankoop bij het afrekenen: €2,50 korting bij €20–€49, €5 bij €50–€74, €10 bij €75–€99, €15 bij €100–€149, €20 bij €150–€199, €20 bij €200–€299 en €60 bij €300 of meer." },
        { q: "Kan ik mijn DutyCredit bij meerdere winkels gebruiken?", a: "Nee. DutyCredits zijn inwisselbaar bij één transactie op één verkooppunt. Wilt u in meerdere winkels kopen, dan kunt u voor elke winkel zelf een DutyCredit aanmaken op de DutyBoost-website." },
        { q: "Is er een minimumbedrag?", a: "Ja. Er geldt een minimale besteding van €20 om een DutyCredit te activeren. De korting is een vast eurobedrag dat oploopt met uw aankoop — van €2,50 bij €20 tot €60 bij €300 of meer." },
        { q: "Hoe ontvang ik mijn DutyCredit?", a: "Uw DutyCredit QR-code wordt automatisch meegestuurd in de boekingsbevestigingsmail van uw reispartner (vlucht, cruise, trein, touringcar, autoverhuur of accommodatie). Open de e-mail en gebruik de QR-code bij een deelnemende reisretailer. U kunt ook zelf een DutyCredit aanmaken op de DutyBoost-website voordat u op reis gaat." },
        { q: "Verlopen DutyCredits?", a: "Ja. Elke DutyCredit is geldig voor 30 dagen vanaf uw vertrekdatum. Na 30 dagen vervalt de DutyCredit en kan niet worden hersteld of opnieuw uitgegeven." },
        { q: "Kan ik mijn DutyCredit overdragen?", a: "Nee. DutyCredits zijn uniek, eenmalig bruikbaar en cryptografisch beveiligd. Ze kunnen niet worden overgedragen of doorverkocht." },
      ]},
      { cat: "Voor reizigers", qs: [
        { q: "Moet ik me aanmelden?", a: "Nee. Open gewoon de boekingsbevestigingsmail van uw reispartner (vlucht, cruise, trein, touringcar, autoverhuur of accommodatie) en gebruik de meegestuurde QR-code. U kunt ook zelf een DutyCredit aanmaken op de DutyBoost-website voordat u op reis gaat." },
        { q: "Waar kan ik mijn DutyCredit inwisselen?", a: "Bij elke reisretailer die geregistreerd is op DutyBoost op uw vertrek- of ophaallocatie — luchthavens, cruise- en ferryterminals, trein- en busstations — en bij deelnemende lokale winkels in de binnenstad." },
        { q: "Wat gebeurt er na het scannen?", a: "De winkel scant uw QR-code, de korting wordt direct toegepast en uw DutyCredit wordt als ingewisseld gemarkeerd." },
      ]},
      { cat: "Voor reispartners", qs: [
        { q: "Wat levert DutyBoost mijn bedrijf op?", a: "Elke keer dat een reiziger een DutyCredit inwisselt, verdient uw bedrijf 20% van de platformcommissie — of u nu een vlucht-, cruise-, trein-, touringcar-, autoverhuur- of accommodatieaanbieder bent." },
        { q: "Hoe genereer ik een DutyCredit?", a: "Dat doet u niet — het gebeurt automatisch. Door de DutyBoost-snippet toe te voegen aan uw boekingsbevestigingspagina, ontvangt elke reiziger automatisch een unieke DutyCredit QR-code in hun bevestigingsmail." },
        { q: "Zijn er kosten?", a: "Nee! — Er zijn geen installatie-, abonnements- of gebruikskosten voor reispartners. Dit geeft uw reizigers een exclusief reisvoordeel dat ze niet vergeten — wat loyaliteit en herhaalboeking stimuleert. En elke keer dat ze hem inwisselen, verdient u passief inkomen via uw 20% winstmarge. Nul moeite, echte opbrengsten." },
      ]},
      { cat: "Voor reisretailers", qs: [
        { q: "Wat levert DutyBoost mijn winkel op?", a: "DutyBoost brengt vooraf gekwalificeerde, gemotiveerde reizigers rechtstreeks naar uw winkel — wat leidt tot hogere conversieratio's en grotere aankoopbedragen. Elke reiziger die binnenkomt met een DutyCredit heeft al de intentie om te kopen: ze hebben een korting ontvangen die gekoppeld is aan een minimaal aankoopbedrag, dus ze zijn gemotiveerd om dat te bereiken. Dat resulteert in meer bezoekers, hogere gemiddelde bestedingen en klanten die zich beloond voelen voor het winkelen bij u. En u betaalt alleen een kleine platformvergoeding wanneer er daadwerkelijk een verkoop plaatsvindt — geen vaste kosten, geen verspild advertentiebudget." },
        { q: "Welke commissie berekent DutyBoost?", a: "DutyBoost rekent 2,5% platformkosten over de bruto transactiewaarde van elke ingewisselde DutyCredit, met een maximum van €25 per transactie (wat overeenkomt met een transactiewaarde van €1.000). Alle omzet boven €1.000 blijft bij u. Er zijn geen vaste of abonnementskosten — u betaalt alleen wanneer DutyBoost een bevestigde verkoop levert." },
        { q: "Hoe wissel ik een DutyCredit in?", a: "Retailers integreren de DutyBoost-validatie rechtstreeks in hun bestaande kassasysteem via onze API. Wanneer een reiziger zijn QR-code presenteert bij het afrekenen, wordt deze native gescand binnen uw POS en wordt de korting automatisch toegepast — geen apart apparaat of handmatige stap vereist, gewoon een naadloze ervaring ingebouwd in uw bestaande afrekenproces." },
      ]},
      { cat: "Integratie & Techniek", qs: [
        { q: "Wat moeten reisretailers implementeren?", a: "Reisretailers integreren DutyBoost rechtstreeks in hun bestaande kassasysteem via een API-integratie. De validatie-API verwerkt QR-codes native bij het afrekenen, zodat de korting automatisch wordt toegepast binnen de bestaande workflow van de winkel." },
        { q: "Hoe integreren reispartners met DutyBoost?", a: "Reispartners voegen de DutyBoost-snippet toe aan hun boekingsbevestigingsmail. Zodra geïntegreerd, genereert elke boeking automatisch een unieke DutyCredit QR-code die direct in de bevestigingsmail van de reiziger wordt opgenomen — geen handmatige stappen vereist." },
      ]},
      { cat: "Platform & Beveiliging", qs: [
        { q: "Is DutyBoost veilig?", a: "Ja. Elke DutyCredit is cryptografisch uniek en eenmalig. We gebruiken TLS 1.2+ en AES-256 versleuteling." },
        { q: "Zijn mijn gegevens veilig?", a: "Absoluut. DutyBoost is AVG-conform en verkoopt uw gegevens nooit aan derden." },
      ]},
    ],
  },
  de: {
    badge: "Hilfecenter", title: "Häufig gestellte Fragen", subtitle: "Alles, was Sie über DutyBoost und DutyCredits wissen müssen.",
    back_home: "← Zurück zur Startseite", footer_rights: "© 2026 DutyBoost.", footer_back: "Zurück zur Startseite",
    categories: [
      { cat: "DutyCredits", qs: [
        { q: "Was ist ein DutyCredit?", a: "Ein DutyCredit ist ein buchungsbasierter Anreiz — ein einzigartiger digitaler Rabattcode, der automatisch generiert wird, wenn ein Reisepartner (Flug, Kreuzfahrt, Zug, Reisebus, Mietwagen oder Unterkunft) eine Buchung über DutyBoost einreicht. DutyBoost funktioniert als a Performance-based Customer Acquisition Solution for Global Travel: Reisepartner verdienen Provisionen, Reisende erhalten Rabatte bei Reise-Einzelhändlern und Händler gewinnen kaufbereite Kunden — alles aus einer einzigen Buchung. Reisende erhalten ihren DutyCredit als QR-Code direkt in ihrer Buchungsbestätigungs-E-Mail. Reisende, die in mehreren verschiedenen Geschäften einkaufen möchten, können vor der Reise auch selbst einen DutyCredit auf der DutyBoost-Website erstellen." },
        { q: "Wie wird mein DutyCredit berechnet?", a: "Ihr DutyCredit gewährt Ihnen einen festen Eurorabatt bei teilnehmenden Reise-Einzelhändlern. Der Betrag richtet sich nach Ihrem Einkaufswert: €2,50 Rabatt bei €20–€49, €5 bei €50–€74, €10 bei €75–€99, €15 bei €100–€149, €20 bei €150–€199, €20 bei €200–€299 und €60 bei €300 oder mehr." },
        { q: "Kann ich meinen DutyCredit in mehreren Geschäften verwenden?", a: "Nein. DutyCredits sind für eine einzige Transaktion an einem Verkaufspunkt einlösbar. Wenn Sie in mehreren Geschäften einkaufen möchten, können Sie für jedes Geschäft selbst einen DutyCredit auf der DutyBoost-Website erstellen." },
        { q: "Gibt es einen Mindestbetrag?", a: "Ja. Es gilt ein Mindesteinkauf von €20, um Ihren DutyCredit zu aktivieren. Der Rabatt ist ein fester Eurobetrag, der mit Ihrem Einkauf wächst — von €2,50 bei €20 bis €60 bei €300 oder mehr." },
        { q: "Wie erhalte ich meinen DutyCredit?", a: "Ihr DutyCredit QR-Code ist automatisch in der Buchungsbestätigungs-E-Mail Ihres Reisepartners (Flug, Kreuzfahrt, Zug, Reisebus, Mietwagen oder Unterkunft) enthalten. Öffnen Sie einfach die E-Mail und verwenden Sie den QR-Code bei einem teilnehmenden Reise-Einzelhändler. Sie können vor der Reise auch selbst einen DutyCredit auf der DutyBoost-Website erstellen." },
        { q: "Verfallen DutyCredits?", a: "Ja. Jeder DutyCredit ist 30 Tage ab Ihrem Abreisedatum gültig. Nach 30 Tagen verfällt er und kann nicht wiederhergestellt oder neu ausgestellt werden." },
        { q: "Kann ich meinen DutyCredit übertragen?", a: "Nein. DutyCredits sind einzigartig, einmalig verwendbar und kryptografisch gesichert." },
      ]},
      { cat: "Für Reisende", qs: [
        { q: "Muss ich mich anmelden?", a: "Nein. Öffnen Sie einfach Ihre Buchungsbestätigungs-E-Mail Ihres Reisepartners (Flug, Kreuzfahrt, Zug, Reisebus, Mietwagen oder Unterkunft) und verwenden Sie den enthaltenen QR-Code. Sie können vor der Reise auch selbst einen DutyCredit auf der DutyBoost-Website erstellen." },
        { q: "Wo kann ich meinen DutyCredit einlösen?", a: "Bei jedem registrierten Reise-Einzelhändler an Ihrem Abflug- oder Abholort — Flughäfen, Kreuzfahrt- und Fährterminals, Bahnhöfe und Busbahnhöfe — sowie bei teilnehmenden lokalen Händlern in der Innenstadt." },
        { q: "Was passiert nach dem Scannen?", a: "Der Händler scannt Ihren QR-Code, der Rabatt wird sofort angewendet und Ihr DutyCredit wird als eingelöst markiert." },
      ]},
      { cat: "Für Reisepartner", qs: [
        { q: "Wie profitiert mein Unternehmen?", a: "Jedes Mal, wenn ein Reisender einen DutyCredit einlöst, verdient Ihr Unternehmen 20% der Plattformgebühr — egal ob Sie Flug-, Kreuzfahrt-, Zug-, Reisebus-, Mietwagen- oder Unterkunftsunternehmen sind." },
        { q: "Wie generiere ich einen DutyCredit?", a: "Das tun Sie nicht — es geschieht automatisch. Durch die Integration des DutyBoost-Snippets in Ihre Buchungsbestätigungsseite erhält jeder Reisende automatisch seinen einzigartigen DutyCredit QR-Code in der Bestätigungs-E-Mail." },
        { q: "Gibt es Kosten?", a: "Nein! — Keine Einrichtungsgebühren, Abonnements oder Nutzungskosten für Reisepartner. Das gibt Ihren Reisenden einen exklusiven Reisevorteil, den sie nicht vergessen — was Loyalität und Wiederholungsbuchungen fördert. Und jedes Mal, wenn sie ihn einlösen, verdienen Sie passives Einkommen durch Ihre 20% Gewinnmarge. Null Aufwand, echte Erträge." },
      ]},
      { cat: "Für Reise-Einzelhändler", qs: [
        { q: "Wie profitiert mein Geschäft?", a: "DutyBoost bringt vorqualifizierte, motivierte Reisende direkt zu Ihrem Geschäft — mit höheren Conversion-Raten und größeren Warenkörben. Jeder Reisende, der mit einem DutyCredit ankommt, hat bereits die Absicht zu kaufen: Er hat einen Rabatt erhalten, der an einen Mindestbetrag geknüpft ist, und ist daher motiviert, diesen zu erreichen. Das bedeutet mehr Laufkundschaft, höhere Durchschnittsumsätze und Kunden, die sich für ihren Einkauf bei Ihnen belohnt fühlen. Und Sie zahlen nur eine kleine Plattformgebühr, wenn tatsächlich ein Verkauf abgeschlossen wird — keine Fixkosten, kein verschwendetes Werbebudget." },
        { q: "Welche Provision berechnet DutyBoost?", a: "DutyBoost berechnet eine Plattformgebühr von 2,5% auf den Bruttotransaktionswert jedes eingelösten DutyCredits, gedeckelt bei €25 pro Transaktion (was einem Transaktionswert von €1.000 entspricht). Alle Einnahmen über €1.000 bleiben bei Ihnen. Es fallen keine fixen oder Abonnementsgebühren an — Sie zahlen nur, wenn DutyBoost einen bestätigten Verkauf liefert." },
        { q: "Wie löse ich einen DutyCredit ein?", a: "Händler integrieren die DutyBoost-Validierung direkt in ihr bestehendes Kassensystem über unsere API. Wenn ein Reisender seinen QR-Code an der Kasse vorzeigt, wird er nativ im POS gescannt und der Rabatt automatisch angewendet — kein separates Gerät oder manueller Schritt erforderlich, nur ein nahtloses Erlebnis, das in Ihren bestehenden Kassenablauf integriert ist." },
      ]},
      { cat: "Integration & Technik", qs: [
        { q: "Was müssen Reise-Einzelhändler implementieren?", a: "Reise-Einzelhändler integrieren DutyBoost direkt über eine API-Integration in ihr bestehendes Kassensystem. Die Validierungs-API verarbeitet QR-Codes nativ an der Kasse, sodass der Rabatt automatisch im bestehenden Workflow des Händlers angewendet wird." },
        { q: "Wie integrieren Reisepartner DutyBoost?", a: "Reisepartner fügen das DutyBoost-Snippet in ihre Buchungsbestätigungs-E-Mail ein. Nach der Integration wird bei jeder Buchung automatisch ein einzigartiger DutyCredit QR-Code generiert, der direkt in die Bestätigungs-E-Mail des Reisenden eingebettet wird — ohne manuelle Schritte." },
      ]},
      { cat: "Plattform & Sicherheit", qs: [
        { q: "Ist DutyBoost sicher?", a: "Ja. Jeder DutyCredit ist kryptografisch einzigartig. Wir verwenden TLS 1.2+ und AES-256 Verschlüsselung." },
        { q: "Sind meine Daten sicher?", a: "Absolut. DutyBoost ist vollständig DSGVO-konform und verkauft Ihre Daten niemals an Dritte." },
      ]},
    ],
  },
  fr: {
    badge: "Centre d'aide", title: "Foire aux questions", subtitle: "Tout ce que vous devez savoir sur DutyBoost et les DutyCredits.",
    back_home: "← Retour à l'accueil", footer_rights: "© 2026 DutyBoost.", footer_back: "Retour à l'accueil",
    categories: [
      { cat: "DutyCredits", qs: [
        { q: "Qu'est-ce qu'un DutyCredit ?", a: "Un DutyCredit est un incentive lié à une réservation — un code de réduction numérique unique généré automatiquement lorsqu'un partenaire de voyage (vol, croisière, train, autocar, location de voiture ou hébergement) soumet une réservation via DutyBoost. DutyBoost fonctionne comme a Performance-based Customer Acquisition Solution for Global Travel : les partenaires de voyage gagnent des commissions, les voyageurs obtiennent des réductions chez les détaillants de voyage et les détaillants attirent des acheteurs à forte intention — le tout à partir d'une seule réservation. Les voyageurs reçoivent leur DutyCredit sous forme de QR code directement dans leur e-mail de confirmation de réservation. Les voyageurs qui souhaitent acheter dans plusieurs magasins différents peuvent également générer leur propre DutyCredit directement sur le site DutyBoost avant leur voyage." },
        { q: "Comment mon DutyCredit est-il calculé ?", a: "Votre DutyCredit vous offre une réduction fixe en euros chez les détaillants de voyage participants. Le montant dépend de votre panier au moment du paiement : €2,50 de réduction pour €20–€49, €5 pour €50–€74, €10 pour €75–€99, €15 pour €100–€149, €20 pour €150–€199, €20 pour €200–€299, et €60 pour €300 ou plus." },
        { q: "Puis-je utiliser mon DutyCredit dans plusieurs magasins ?", a: "Non. Les DutyCredits ne peuvent être échangés qu'en une seule transaction dans un seul point de vente. Si vous prévoyez d'acheter dans plusieurs magasins, vous pouvez générer vous-même un DutyCredit pour chacun sur le site DutyBoost." },
        { q: "Y a-t-il un montant minimum ?", a: "Oui. Un panier minimum de €20 est requis pour activer votre DutyCredit. La réduction est un montant fixe en euros qui augmente avec votre panier — de €2,50 à partir de €20 jusqu'à €60 à partir de €300." },
        { q: "Comment est-ce que je reçois mon DutyCredit ?", a: "Votre QR code DutyCredit est automatiquement inclus dans l'e-mail de confirmation de réservation envoyé par votre partenaire de voyage (vol, croisière, train, autocar, location de voiture ou hébergement). Ouvrez simplement l'e-mail et utilisez le QR code chez un détaillant de voyage participant. Vous pouvez aussi générer votre propre DutyCredit sur le site DutyBoost avant votre voyage." },
        { q: "Les DutyCredits expirent-ils ?", a: "Oui. Chaque DutyCredit est valable 30 jours à partir de votre date de départ. Il expire 30 jours après le départ et ne peut pas être réactivé ou réémis." },
        { q: "Puis-je transférer mon DutyCredit ?", a: "Non. Les DutyCredits sont uniques, à usage unique et sécurisés cryptographiquement." },
      ]},
      { cat: "Pour les voyageurs", qs: [
        { q: "Dois-je m'inscrire ?", a: "Non. Ouvrez simplement l'e-mail de confirmation de réservation de votre partenaire de voyage (vol, croisière, train, autocar, location de voiture ou hébergement) et utilisez le QR code inclus. Vous pouvez aussi générer votre propre DutyCredit sur le site DutyBoost avant votre voyage." },
        { q: "Où puis-je échanger mon DutyCredit ?", a: "Chez tout détaillant de voyage enregistré sur DutyBoost à votre point de départ ou de prise en charge — aéroports, ports et terminaux de croisière, gares ferroviaires et routières — ainsi que chez les détaillants locaux participants en centre-ville." },
        { q: "Que se passe-t-il après le scan ?", a: "Le détaillant scanne votre QR code, la réduction est instantanément appliquée et votre DutyCredit est marqué comme utilisé." },
      ]},
      { cat: "Pour les partenaires de voyage", qs: [
        { q: "Comment DutyBoost profite-t-il à mon activité ?", a: "Chaque fois qu'un voyageur échange un DutyCredit, votre entreprise gagne 20% de la commission de la plateforme — que vous soyez prestataire de vols, de croisières, de trains, d'autocars, de location de voiture ou d'hébergement." },
        { q: "Comment générer un DutyCredit ?", a: "Vous ne le faites pas — cela se passe automatiquement. En ajoutant le snippet DutyBoost à votre page de confirmation de réservation, chaque voyageur reçoit automatiquement son QR code DutyCredit unique dans son e-mail de confirmation." },
        { q: "Y a-t-il des frais ?", a: "Non ! — Aucun frais d'installation, d'abonnement ou d'utilisation pour les partenaires de voyage. Cela offre à vos voyageurs un avantage exclusif de voyage qu'ils n'oublieront pas — renforçant la fidélité et les réservations répétées. Et chaque fois qu'ils l'utilisent, vous gagnez un revenu passif grâce à votre marge de 20%. Zéro effort, des retours réels." },
      ]},
      { cat: "Pour les détaillants de voyage", qs: [
        { q: "Comment DutyBoost profite-t-il à mon magasin ?", a: "DutyBoost dirige des voyageurs pré-qualifiés et motivés directement vers votre magasin — avec des taux de conversion plus élevés et des paniers plus grands. Chaque voyageur qui arrive avec un DutyCredit a déjà l'intention d'acheter : il a reçu une réduction liée à un panier minimum, ce qui le motive à atteindre ce seuil. Résultat : plus de trafic en magasin, des commandes moyennes plus élevées et des clients qui se sentent récompensés d'avoir fait leurs achats chez vous. Et vous ne payez qu'une petite commission de plateforme uniquement lorsqu'une vente est effectivement conclue — aucun coût fixe, aucun budget publicitaire gaspillé." },
        { q: "Quelle commission DutyBoost facture-t-il ?", a: "DutyBoost facture des frais de plateforme de 2,5% sur la valeur brute de chaque transaction DutyCredit échangé, plafonnés à €25 par transaction (ce qui correspond à une valeur de transaction de €1.000). Tous les revenus au-dessus de €1.000 vous restent. Aucun frais fixe ou d'abonnement — vous ne payez que lorsque DutyBoost génère une vente confirmée." },
        { q: "Comment échanger un DutyCredit ?", a: "Les détaillants intègrent la validation DutyBoost directement dans leur système de caisse existant via notre API. Lorsqu'un voyageur présente son QR code à la caisse, il est scanné nativement dans votre système et la réduction est appliquée automatiquement — aucun appareil séparé ni étape manuelle requis, juste une expérience fluide intégrée dans votre processus de paiement existant." },
      ]},
      { cat: "Intégration & Technique", qs: [
        { q: "Que doivent mettre en place les détaillants de voyage ?", a: "Les détaillants de voyage intègrent DutyBoost directement dans leur système de caisse existant via une intégration API. L'API de validation traite les QR codes nativement lors du paiement, de sorte que la réduction est appliquée automatiquement dans le flux de travail existant du détaillant." },
        { q: "Comment les partenaires de voyage s'intègrent-ils à DutyBoost ?", a: "Les partenaires de voyage ajoutent le snippet DutyBoost à leur e-mail de confirmation de réservation. Une fois intégré, chaque réservation génère automatiquement un QR code DutyCredit unique, directement intégré dans l'e-mail de confirmation du voyageur — sans aucune étape manuelle." },
      ]},
      { cat: "Plateforme & Sécurité", qs: [
        { q: "DutyBoost est-il sécurisé ?", a: "Oui. Chaque DutyCredit est cryptographiquement unique. Nous utilisons TLS 1.2+ et AES-256." },
        { q: "Mes données sont-elles en sécurité ?", a: "Absolument. DutyBoost est conforme au RGPD et ne vend jamais vos données à des tiers." },
      ]},
    ],
  },
  es: {
    badge: "Centro de ayuda", title: "Preguntas frecuentes", subtitle: "Todo lo que necesitas saber sobre DutyBoost y los DutyCredits.",
    back_home: "← Volver al inicio", footer_rights: "© 2026 DutyBoost.", footer_back: "Volver al inicio",
    categories: [
      { cat: "DutyCredits", qs: [
        { q: "¿Qué es un DutyCredit?", a: "Un DutyCredit es un incentivo vinculado a una reserva — un código de descuento digital único generado automáticamente cuando un socio de viajes (vuelo, crucero, tren, autocar, alquiler de coche o alojamiento) envía una reserva a través de DutyBoost. DutyBoost opera como a Performance-based Customer Acquisition Solution for Global Travel: los socios de viaje ganan comisiones, los pasajeros obtienen descuentos en comercios de viaje y los comercios atraen compradores con alta intención — todo a partir de una sola reserva. Los pasajeros reciben su DutyCredit como código QR directamente en su correo de confirmación de reserva. Los pasajeros que quieran comprar en varios comercios distintos también pueden generar su propio DutyCredit directamente en el sitio web de DutyBoost antes de viajar." },
        { q: "¿Cómo se calcula mi DutyCredit?", a: "Tu DutyCredit ofrece un descuento fijo en euros en los comercios de viaje participantes. El importe depende del valor de tu cesta en el momento del pago: €2,50 de descuento con €20–€49, €5 con €50–€74, €10 con €75–€99, €15 con €100–€149, €20 con €150–€199, €20 con €200–€299 y €60 con €300 o más." },
        { q: "¿Puedo usar mi DutyCredit en varios establecimientos?", a: "No. Los DutyCredits son canjeables en una sola transacción en un único punto de venta. Si piensas comprar en varios comercios, puedes generar tú mismo un DutyCredit para cada uno en el sitio web de DutyBoost." },
        { q: "¿Hay un gasto mínimo?", a: "Sí. Se requiere un gasto mínimo de €20 para activar tu DutyCredit. El descuento es un importe fijo en euros que crece con tu compra — desde €2,50 a partir de €20 hasta €60 a partir de €300 o más." },
        { q: "¿Cómo recibo mi DutyCredit?", a: "Tu código QR DutyCredit se incluye automáticamente en el correo electrónico de confirmación de reserva enviado por tu socio de viajes (vuelo, crucero, tren, autocar, alquiler de coche o alojamiento). Simplemente abre el correo y usa el código QR en un comercio de viaje participante. También puedes generar tu propio DutyCredit en el sitio web de DutyBoost antes de viajar." },
        { q: "¿Caducan los DutyCredits?", a: "Sí. Cada DutyCredit es válido durante 30 días a partir de tu fecha de salida. Caduca 30 días después de la salida y no puede reactivarse ni reemitirse." },
        { q: "¿Puedo transferir mi DutyCredit?", a: "No. Los DutyCredits son únicos, de un solo uso y seguros criptográficamente." },
      ]},
      { cat: "Para pasajeros", qs: [
        { q: "¿Necesito registrarme?", a: "No. Simplemente abre el correo de confirmación de reserva de tu socio de viajes (vuelo, crucero, tren, autocar, alquiler de coche o alojamiento) y usa el código QR incluido. También puedes generar tu propio DutyCredit en el sitio web de DutyBoost antes de viajar." },
        { q: "¿Dónde puedo canjear mi DutyCredit?", a: "En cualquier comercio de viaje registrado en DutyBoost en tu punto de salida o recogida — aeropuertos, puertos y terminales de cruceros, estaciones de tren y de autocar — así como en comercios locales participantes en el centro de la ciudad." },
        { q: "¿Qué ocurre después del escaneo?", a: "El comercio escanea tu código QR, el descuento se aplica al instante y tu DutyCredit queda marcado como canjeado." },
      ]},
      { cat: "Para socios de viajes", qs: [
        { q: "¿Cómo beneficia DutyBoost a mi negocio?", a: "Cada vez que un pasajero canjea un DutyCredit, tu empresa gana el 20% de la comisión de la plataforma — ya seas proveedor de vuelos, cruceros, trenes, autocares, alquiler de coches o alojamiento." },
        { q: "¿Cómo genero un DutyCredit?", a: "No lo haces tú — ocurre automáticamente. Al añadir el snippet de DutyBoost a tu página de confirmación de reserva, cada pasajero recibe automáticamente su código QR DutyCredit único en su correo de confirmación." },
        { q: "¿Hay algún coste?", a: "¡No! — Sin comisiones de configuración, suscripción ni uso para socios de viajes. Esto ofrece a tus pasajeros un beneficio exclusivo de viaje que recordarán — aumentando la fidelidad y las reservas repetidas. Y cada vez que lo canjean, tú ganas ingresos pasivos a través de tu margen del 20%. Cero esfuerzo, resultados reales." },
      ]},
      { cat: "Para comercios de viaje", qs: [
        { q: "¿Cómo beneficia DutyBoost a mi tienda?", a: "DutyBoost dirige pasajeros precalificados e incentivados directamente a tu tienda — lo que se traduce en mayores tasas de conversión y cestas más grandes. Cada pasajero que llega con un DutyCredit ya tiene intención de comprar: ha recibido un descuento vinculado a un gasto mínimo, por lo que está motivado a alcanzarlo. Eso se traduce en más visitas, pedidos medios más altos y clientes que se sienten recompensados por comprar contigo. Y solo pagas una pequeña tarifa de plataforma cuando se completa una venta — sin costes fijos, sin gasto publicitario desperdiciado." },
        { q: "¿Qué comisión cobra DutyBoost?", a: "DutyBoost cobra una tarifa de plataforma del 2,5% sobre el valor bruto de cada transacción con DutyCredit canjeado, con un máximo de €25 por transacción (que corresponde a un valor de transacción de €1.000). Todos los ingresos por encima de €1.000 quedan contigo. Sin tarifas fijas ni suscripciones — solo pagas cuando DutyBoost genera una venta confirmada." },
        { q: "¿Cómo canjeo un DutyCredit?", a: "Los comercios integran la validación de DutyBoost directamente en su sistema de punto de venta existente a través de nuestra API. Cuando un pasajero presenta su código QR en caja, se escanea de forma nativa dentro de tu TPV y el descuento se aplica automáticamente — sin dispositivo adicional ni paso manual, solo una experiencia fluida integrada en tu proceso de cobro habitual." },
      ]},
      { cat: "Integración y Técnica", qs: [
        { q: "¿Qué deben implementar los comercios de viaje?", a: "Los comercios de viaje integran DutyBoost directamente en su sistema de punto de venta existente a través de una integración API. La API de validación procesa los códigos QR de forma nativa en caja, de modo que el descuento se aplica automáticamente dentro del flujo de trabajo habitual del comercio." },
        { q: "¿Cómo se integran los socios de viajes con DutyBoost?", a: "Los socios de viajes añaden el snippet de DutyBoost a su correo de confirmación de reserva. Una vez integrado, cada reserva genera automáticamente un código QR DutyCredit único, que se incluye directamente en el correo de confirmación del pasajero — sin pasos manuales." },
      ]},
      { cat: "Plataforma y Seguridad", qs: [
        { q: "¿Es DutyBoost seguro?", a: "Sí. Cada DutyCredit es criptográficamente único. Usamos cifrado TLS 1.2+ y AES-256." },
        { q: "¿Están seguros mis datos?", a: "Absolutamente. DutyBoost cumple el RGPD y nunca vende tus datos a terceros." },
      ]},
    ],
  },
  it: {
    badge: "Centro assistenza", title: "Domande frequenti", subtitle: "Tutto ciò che devi sapere su DutyBoost e i DutyCredit.",
    back_home: "← Torna alla home", footer_rights: "© 2026 DutyBoost.", footer_back: "Torna alla home",
    categories: [
      { cat: "DutyCredit", qs: [
        { q: "Cos'è un DutyCredit?", a: "Un DutyCredit è un incentivo legato a una prenotazione — un codice sconto digitale unico generato automaticamente quando un partner di viaggio (volo, crociera, treno, autobus, noleggio auto o alloggio) invia una prenotazione tramite DutyBoost. DutyBoost opera come a Performance-based Customer Acquisition Solution for Global Travel: i partner di viaggio guadagnano commissioni, i viaggiatori ottengono sconti presso i rivenditori di viaggio e i rivenditori attraggono acquirenti ad alta intenzione — tutto a partire da una singola prenotazione. I viaggiatori ricevono il loro DutyCredit come QR code direttamente nell'e-mail di conferma della prenotazione. I viaggiatori che desiderano acquistare in più negozi diversi possono anche generare il proprio DutyCredit direttamente sul sito DutyBoost prima di partire." },
        { q: "Come viene calcolato il mio DutyCredit?", a: "Il tuo DutyCredit offre uno sconto fisso in euro presso i rivenditori di viaggio partecipanti. L'importo dipende dal valore del tuo carrello alla cassa: €2,50 di sconto con €20–€49, €5 con €50–€74, €10 con €75–€99, €15 con €100–€149, €20 con €150–€199, €20 con €200–€299 e €60 con €300 o più." },
        { q: "Posso usare il mio DutyCredit in più negozi?", a: "No. I DutyCredit sono riscattabili in un'unica transazione presso un unico punto vendita. Se prevedi di acquistare in più negozi, puoi generare tu stesso un DutyCredit per ciascuno sul sito DutyBoost." },
        { q: "C'è una spesa minima?", a: "Sì. È richiesta una spesa minima di €20 per attivare il tuo DutyCredit. Lo sconto è un importo fisso in euro che cresce con il tuo acquisto — da €2,50 a partire da €20 fino a €60 a partire da €300 o più." },
        { q: "Come ricevo il mio DutyCredit?", a: "Il tuo QR code DutyCredit è incluso automaticamente nell'e-mail di conferma della prenotazione inviata dal tuo partner di viaggio (volo, crociera, treno, autobus, noleggio auto o alloggio). Apri semplicemente l'e-mail e usa il QR code presso un rivenditore di viaggio partecipante. Puoi anche generare il tuo DutyCredit sul sito DutyBoost prima di partire." },
        { q: "I DutyCredit scadono?", a: "Sì. Ogni DutyCredit è valido per 30 giorni a partire dalla data di partenza. Scade 30 giorni dopo la partenza e non può essere ripristinato o riemesso." },
        { q: "Posso trasferire il mio DutyCredit?", a: "No. I DutyCredit sono unici, monouso e sicuri crittograficamente." },
      ]},
      { cat: "Per i viaggiatori", qs: [
        { q: "Devo registrarmi?", a: "No. Apri semplicemente l'e-mail di conferma della prenotazione del tuo partner di viaggio (volo, crociera, treno, autobus, noleggio auto o alloggio) e usa il QR code incluso. Puoi anche generare il tuo DutyCredit sul sito DutyBoost prima di partire." },
        { q: "Dove posso riscattare il mio DutyCredit?", a: "Presso qualsiasi rivenditore di viaggio registrato su DutyBoost nel tuo punto di partenza o di ritiro — aeroporti, porti e terminal crociere, stazioni ferroviarie e autostazioni — oltre ai rivenditori locali partecipanti in centro città." },
        { q: "Cosa succede dopo la scansione?", a: "Il rivenditore scansiona il tuo QR code, lo sconto viene applicato istantaneamente e il tuo DutyCredit viene contrassegnato come riscattato." },
      ]},
      { cat: "Per i partner di viaggio", qs: [
        { q: "Come beneficia la mia attività?", a: "Ogni volta che un viaggiatore riscatta un DutyCredit, la tua azienda guadagna il 20% della commissione della piattaforma — che tu sia un fornitore di voli, crociere, treni, autobus, noleggio auto o alloggi." },
        { q: "Come genero un DutyCredit?", a: "Non lo fai tu — avviene automaticamente. Aggiungendo lo snippet DutyBoost alla tua pagina di conferma della prenotazione, ogni viaggiatore riceve automaticamente il proprio QR code DutyCredit unico nella sua e-mail di conferma." },
        { q: "Ci sono costi?", a: "No! — Nessun costo di configurazione, abbonamento o utilizzo per i partner di viaggio. Questo offre ai tuoi viaggiatori un vantaggio esclusivo di viaggio che non dimenticheranno — aumentando la fidelizzazione e le prenotazioni ripetute. E ogni volta che lo riscattano, guadagni reddito passivo attraverso il tuo margine del 20%. Zero sforzo, ritorni reali." },
      ]},
      { cat: "Per i rivenditori di viaggio", qs: [
        { q: "Come beneficia il mio negozio?", a: "DutyBoost porta viaggiatori pre-qualificati e incentivati direttamente al tuo negozio — con tassi di conversione più alti e carrelli più grandi. Ogni viaggiatore che arriva con un DutyCredit ha già intenzione di acquistare: ha ricevuto uno sconto legato a una spesa minima, quindi è motivato a raggiungerla. Questo si traduce in più traffico, ordini medi più elevati e clienti che si sentono premiati per aver fatto acquisti da te. E paghi solo una piccola commissione di piattaforma solo quando viene effettivamente completata una vendita — nessun costo fisso, nessun budget pubblicitario sprecato." },
        { q: "Quale commissione applica DutyBoost?", a: "DutyBoost applica una commissione di piattaforma del 2,5% sul valore lordo di ogni transazione con DutyCredit riscattato, con un massimo di €25 per transazione (che corrisponde a un valore di transazione di €1.000). Tutti i ricavi al di sopra di €1.000 rimangono con te. Nessuna quota fissa o abbonamento — si paga solo quando DutyBoost genera una vendita confermata." },
        { q: "Come riscatto un DutyCredit?", a: "I rivenditori integrano la validazione DutyBoost direttamente nel loro sistema POS esistente tramite la nostra API. Quando un viaggiatore presenta il QR code alla cassa, viene scansionato nativamente nel POS e lo sconto viene applicato automaticamente — nessun dispositivo separato o passaggio manuale richiesto, solo un'esperienza fluida integrata nel processo di pagamento esistente." },
      ]},
      { cat: "Integrazione & Tecnica", qs: [
        { q: "Cosa devono implementare i rivenditori di viaggio?", a: "I rivenditori di viaggio integrano DutyBoost direttamente nel loro sistema POS esistente tramite un'integrazione API. L'API di validazione gestisce i QR code nativamente alla cassa, in modo che lo sconto venga applicato automaticamente nel flusso di lavoro esistente del rivenditore." },
        { q: "Come si integrano i partner di viaggio con DutyBoost?", a: "I partner di viaggio aggiungono lo snippet DutyBoost alla loro e-mail di conferma della prenotazione. Una volta integrato, ogni prenotazione genera automaticamente un QR code DutyCredit unico, che viene incorporato direttamente nell'e-mail di conferma del viaggiatore — senza passaggi manuali." },
      ]},
      { cat: "Piattaforma e Sicurezza", qs: [
        { q: "DutyBoost è sicuro?", a: "Sì. Ogni DutyCredit è crittograficamente unico. Utilizziamo TLS 1.2+ e AES-256." },
        { q: "I miei dati sono al sicuro?", a: "Assolutamente. DutyBoost è conforme al GDPR e non vende mai i tuoi dati a terzi." },
      ]},
    ],
  },
};

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-muted/40 transition-colors" onClick={() => setOpen(!open)}>
        <span className="font-medium text-sm">{q}</span>
        <ChevronDown className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed border-t border-border pt-3 bg-muted/20">{a}</div>}
    </div>
  );
}

export default function FAQ() {
  const { i18n } = useTranslation();
  const c = content[i18n.language] || content.en;
  return (
    <div className="min-h-screen bg-background font-body">
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur border-b border-border">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/"><DutyBoostLogo height={55} /></Link>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">{c.back_home}</Link>
          </div>
        </div>
      </nav>
      <div className="max-w-3xl mx-auto px-6 py-14 space-y-12">
        <div className="text-center space-y-3">
          <Badge variant="outline" className="text-xs tracking-widest uppercase px-4 py-1">{c.badge}</Badge>
          <h1 className="text-4xl font-heading font-bold">{c.title}</h1>
          <p className="text-muted-foreground">{c.subtitle}</p>
        </div>
        {c.categories.map((section) => (
          <div key={section.cat} className="space-y-3">
            <h2 className="text-lg font-heading font-semibold text-primary">{section.cat}</h2>
            <div className="space-y-2">
              {section.qs.map((item) => <FAQItem key={item.q} q={item.q} a={item.a} />)}
            </div>
          </div>
        ))}
      </div>
      <PageFooter />
    </div>
  );
}