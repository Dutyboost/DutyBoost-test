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
        { q: "What is a DutyCredit?", a: "A DutyCredit is a booking-earned incentive — a unique digital discount code automatically generated when a travel partner (flight, accommodation, or car rental) submits a booking through the DutyBoost platform. Travelers receive it as a QR code directly in their booking confirmation email and can use it to get a discount at participating airport retailers." },
        { q: "How is my DutyCredit value calculated?", a: "Your DutyCredit provides a fixed euro discount at participating airport retailers — no complex calculation involved. The amount depends entirely on your basket size at checkout: €2.50 off at €35–€49, €5 off at €50–€74, €10 off at €75–€99, €15 off at €100–€149, €20 off at €150–€199, €35 off at €200–€299, and €60 off at €300 or more." },
        { q: "Can I use my DutyCredit at multiple shops?", a: "No. DutyCredits are redeemable in a single transaction at one point of sale and cannot be split across multiple shops." },
        { q: "Is there a minimum spend to redeem a DutyCredit?", a: "Yes. A minimum basket spend of €35 is required to activate your DutyCredit. The discount is a fixed euro amount that grows with your basket — from €2.50 at €35 spend up to €60 at €300 or more." },
        { q: "How do I receive my DutyCredit?", a: "Your travel agency will share a link with you after your booking is confirmed. Opening the link shows your personal DutyCredit QR code." },
        { q: "Do DutyCredits expire?", a: "Yes. Every DutyCredit is valid for 30 days starting from your departure date. It expires 30 days after departure and cannot be reinstated or reissued after that." },
        { q: "Can I transfer my DutyCredit to someone else?", a: "No. DutyCredits are unique, single-use, and cryptographically secured. They cannot be transferred, resold, or duplicated." },
      ]},
      { cat: "For Travelers", qs: [
        { q: "Do I need to sign up to use a DutyCredit?", a: "No sign-up or account is required. Simply open the link shared by your travel agency." },
        { q: "Where can I redeem my DutyCredit?", a: "DutyCredits can be redeemed at any airport retailer registered on the DutyBoost platform at your departure airport." },
        { q: "What happens after I scan my DutyCredit?", a: "The retailer scans your QR code, the discount is instantly applied to your purchase, and your DutyCredit is marked as redeemed." },
      ]},
      { cat: "For Travel Agencies", qs: [
        { q: "How does DutyBoost benefit my agency?", a: "Every time one of your travelers redeems a DutyCredit at the airport, your agency earns a 20% revenue margin on the platform's commission." },
        { q: "How do I generate a DutyCredit?", a: "You don't — it happens automatically. Our team connects your booking system to DutyBoost. From that point on, DutyBoost automatically sends travelers a co-branded email with their unique DutyCredit QR code." },
        { q: "Is there a cost to join DutyBoost as an agency?", a: "No. There are no setup fees, subscription fees, or usage costs for travel agencies." },
      ]},
      { cat: "For Airport Retailers", qs: [
        { q: "How does DutyBoost benefit my store?", a: "DutyBoost drives pre-qualified, incentivised travelers directly to your store — meaning higher conversion rates and larger basket sizes." },
        { q: "What commission does DutyBoost charge retailers?", a: "DutyBoost charges a 2.5% platform fee on the gross transaction value of each redeemed DutyCredit, capped at €25 per transaction. There are no upfront or subscription fees — you only pay when DutyBoost delivers a confirmed sale." },
        { q: "How do I redeem a DutyCredit at my store?", a: "Use the DutyBoost retailer dashboard or scan interface to scan the traveler's QR code. The system validates the DutyCredit and logs the transaction automatically." },
      ]},
      { cat: "Integration & Technical", qs: [
        { q: "What do airport retailers need to implement to accept DutyCredits?", a: "Two options: (1) Zero Integration: use the DutyBoost Retailer Scan app on a tablet/phone at the till. (2) POS API Integration: your POS calls our redemption API directly. Most retailers start with option 1." },
        { q: "Is there an API for travel agencies?", a: "Not required. DutyBoost connects directly to your booking system during onboarding. DutyCredits are generated automatically with zero API work." },
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
        { q: "Wat is een DutyCredit?", a: "Een DutyCredit is een boeking-gedreven incentive — een unieke digitale kortingscode die automatisch wordt gegenereerd wanneer een reispartner (vlucht, accommodatie of autoverhuur) een boeking indient via DutyBoost. Reizigers ontvangen deze als QR-code rechtstreeks in hun boekingsbevestigingsmail." },
        { q: "Hoe wordt mijn DutyCredit berekend?", a: "Uw DutyCredit geeft u een vaste eurokorting bij deelnemende luchthavenwinkels. Het bedrag hangt af van de totale waarde van uw aankoop bij het afrekenen: €2,50 korting bij €35–€49, €5 bij €50–€74, €10 bij €75–€99, €15 bij €100–€149, €20 bij €150–€199, €35 bij €200–€299 en €60 bij €300 of meer." },
        { q: "Kan ik mijn DutyCredit bij meerdere winkels gebruiken?", a: "Nee. DutyCredits zijn inwisselbaar bij één transactie op één verkooppunt." },
        { q: "Is er een minimumbedrag?", a: "Ja. Er geldt een minimale besteding van €35 om een DutyCredit te activeren. De korting is een vast eurobedrag dat oploopt met uw aankoop — van €2,50 bij €35 tot €60 bij €300 of meer." },
        { q: "Hoe ontvang ik mijn DutyCredit?", a: "Uw reisbureau deelt een link na bevestiging van uw boeking. Via de link ziet u uw persoonlijke DutyCredit QR-code." },
        { q: "Verlopen DutyCredits?", a: "Ja. Elke DutyCredit is geldig voor 30 dagen vanaf uw vertrekdatum. Na 30 dagen vervalt de DutyCredit en kan niet worden hersteld of opnieuw uitgegeven." },
        { q: "Kan ik mijn DutyCredit overdragen?", a: "Nee. DutyCredits zijn uniek, eenmalig bruikbaar en cryptografisch beveiligd. Ze kunnen niet worden overgedragen of doorverkocht." },
      ]},
      { cat: "Voor reizigers", qs: [
        { q: "Moet ik me aanmelden?", a: "Nee. Open gewoon de link die uw reisbureau heeft gedeeld." },
        { q: "Waar kan ik mijn DutyCredit inwisselen?", a: "Bij elke luchthavenwinkel die geregistreerd is op DutyBoost op uw luchthaven van vertrek." },
        { q: "Wat gebeurt er na het scannen?", a: "De winkel scant uw QR-code, de korting wordt direct toegepast en uw DutyCredit wordt als ingewisseld gemarkeerd." },
      ]},
      { cat: "Voor reisbureaus", qs: [
        { q: "Wat levert DutyBoost mijn bureau op?", a: "Elke keer dat een reiziger een DutyCredit inwisselt, verdient uw bureau 20% van de platformcommissie." },
        { q: "Hoe genereer ik een DutyCredit?", a: "Dat doet u niet — het gebeurt automatisch. Ons team koppelt uw boekingssysteem aan DutyBoost." },
        { q: "Zijn er kosten?", a: "Nee. Er zijn geen installatie-, abonnements- of gebruikskosten voor reisbureaus." },
      ]},
      { cat: "Voor luchthavenwinkels", qs: [
        { q: "Wat levert DutyBoost mijn winkel op?", a: "DutyBoost brengt vooraf gekwalificeerde reizigers met koopintentie naar uw winkel." },
        { q: "Welke commissie berekent DutyBoost?", a: "DutyBoost rekent 2,5% platformkosten over de bruto transactiewaarde van elke ingewisselde DutyCredit, met een maximum van €25 per transactie. Er zijn geen vaste of abonnementskosten — u betaalt alleen wanneer DutyBoost een bevestigde verkoop levert." },
        { q: "Hoe wissel ik een DutyCredit in?", a: "Scan de QR-code via het DutyBoost-dashboard of de scaninterface. Het systeem valideert en registreert automatisch." },
      ]},
      { cat: "Integratie & Techniek", qs: [
        { q: "Wat moeten luchthavenwinkels implementeren?", a: "Twee opties: (1) Nul integratie: gebruik de Retailer Scan-app. (2) POS API-integratie: uw kassasysteem roept onze API direct aan." },
        { q: "Is er een API voor reisbureaus?", a: "Niet vereist. DutyBoost verbindt zich rechtstreeks met uw boekingssysteem tijdens de onboarding." },
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
        { q: "Was ist ein DutyCredit?", a: "Ein DutyCredit ist ein buchungsbasierter Anreiz — ein einzigartiger digitaler Rabattcode, der automatisch generiert wird, wenn ein Reisepartner (Flug, Unterkunft oder Mietwagen) eine Buchung über DutyBoost einreicht. Reisende erhalten ihn als QR-Code direkt in ihrer Buchungsbestätigungs-E-Mail." },
        { q: "Wie wird mein DutyCredit berechnet?", a: "Ihr DutyCredit gewährt Ihnen einen festen Eurorabatt bei teilnehmenden Flughafenhändlern. Der Betrag richtet sich nach Ihrem Einkaufswert: €2,50 Rabatt bei €35–€49, €5 bei €50–€74, €10 bei €75–€99, €15 bei €100–€149, €20 bei €150–€199, €35 bei €200–€299 und €60 bei €300 oder mehr." },
        { q: "Kann ich meinen DutyCredit in mehreren Geschäften verwenden?", a: "Nein. DutyCredits sind für eine einzige Transaktion an einem Verkaufspunkt einlösbar." },
        { q: "Gibt es einen Mindestbetrag?", a: "Ja. Es gilt ein Mindesteinkauf von €35, um Ihren DutyCredit zu aktivieren. Der Rabatt ist ein fester Eurobetrag, der mit Ihrem Einkauf wächst — von €2,50 bei €35 bis €60 bei €300 oder mehr." },
        { q: "Wie erhalte ich meinen DutyCredit?", a: "Ihr Reisebüro teilt Ihnen nach Buchungsbestätigung einen Link mit. Über den Link sehen Sie Ihren DutyCredit QR-Code." },
        { q: "Verfallen DutyCredits?", a: "Ja. Jeder DutyCredit ist 30 Tage ab Ihrem Abreisedatum gültig. Nach 30 Tagen verfällt er und kann nicht wiederhergestellt oder neu ausgestellt werden." },
        { q: "Kann ich meinen DutyCredit übertragen?", a: "Nein. DutyCredits sind einzigartig, einmalig verwendbar und kryptografisch gesichert." },
      ]},
      { cat: "Für Reisende", qs: [
        { q: "Muss ich mich anmelden?", a: "Nein. Öffnen Sie einfach den von Ihrem Reisebüro geteilten Link." },
        { q: "Wo kann ich meinen DutyCredit einlösen?", a: "Bei jedem registrierten Flughafenhändler an Ihrem Abflughafen." },
        { q: "Was passiert nach dem Scannen?", a: "Der Händler scannt Ihren QR-Code, der Rabatt wird sofort angewendet und Ihr DutyCredit wird als eingelöst markiert." },
      ]},
      { cat: "Für Reisebüros", qs: [
        { q: "Wie profitiert mein Büro?", a: "Jedes Mal, wenn ein Reisender einen DutyCredit einlöst, verdient Ihr Büro 20% der Plattformgebühr." },
        { q: "Wie generiere ich einen DutyCredit?", a: "Das tun Sie nicht — es geschieht automatisch. Unser Team verbindet Ihr Buchungssystem mit DutyBoost." },
        { q: "Gibt es Kosten?", a: "Nein. Keine Einrichtungsgebühren, Abonnements oder Nutzungskosten für Reisebüros." },
      ]},
      { cat: "Für Flughafenhändler", qs: [
        { q: "Wie profitiert mein Geschäft?", a: "DutyBoost bringt vorqualifizierte, motivierte Reisende direkt zu Ihrem Geschäft." },
        { q: "Welche Provision berechnet DutyBoost?", a: "DutyBoost berechnet eine Plattformgebühr von 2,5% auf den Bruttotransaktionswert jedes eingelösten DutyCreditss, gedeckelt bei €25 pro Transaktion. Es fallen keine fixen oder Abonnementsgebühren an — Sie zahlen nur, wenn DutyBoost einen bestätigten Verkauf liefert." },
        { q: "Wie löse ich einen DutyCredit ein?", a: "Scannen Sie den QR-Code über das Dashboard oder die Scan-Oberfläche. Das System validiert und protokolliert automatisch." },
      ]},
      { cat: "Integration & Technik", qs: [
        { q: "Was müssen Flughafenhändler implementieren?", a: "Zwei Optionen: (1) Keine Integration: nutzen Sie die Retailer Scan App. (2) POS-API-Integration: Ihr System ruft unsere API direkt auf." },
        { q: "Gibt es eine API für Reisebüros?", a: "Nicht erforderlich. DutyBoost verbindet sich beim Onboarding direkt mit Ihrem Buchungssystem." },
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
        { q: "Qu'est-ce qu'un DutyCredit ?", a: "Un DutyCredit est un incentive lié à une réservation — un code de réduction numérique unique généré automatiquement lorsqu'un partenaire de voyage (vol, hébergement ou location de voiture) soumet une réservation via DutyBoost. Les voyageurs le reçoivent sous forme de QR code directement dans leur e-mail de confirmation de réservation." },
        { q: "Comment mon DutyCredit est-il calculé ?", a: "Votre DutyCredit vous offre une réduction fixe en euros chez les détaillants aéroportuaires participants. Le montant dépend de votre panier au moment du paiement : €2,50 de réduction pour €35–€49, €5 pour €50–€74, €10 pour €75–€99, €15 pour €100–€149, €20 pour €150–€199, €35 pour €200–€299, et €60 pour €300 ou plus." },
        { q: "Puis-je utiliser mon DutyCredit dans plusieurs magasins ?", a: "Non. Les DutyCredits ne peuvent être échangés qu'en une seule transaction dans un seul point de vente." },
        { q: "Y a-t-il un montant minimum ?", a: "Oui. Un panier minimum de €35 est requis pour activer votre DutyCredit. La réduction est un montant fixe en euros qui augmente avec votre panier — de €2,50 à partir de €35 jusqu'à €60 à partir de €300." },
        { q: "Comment est-ce que je reçois mon DutyCredit ?", a: "Votre agence vous partagera un lien après confirmation. En ouvrant le lien, vous verrez votre QR code DutyCredit." },
        { q: "Les DutyCredits expirent-ils ?", a: "Oui. Chaque DutyCredit est valable 30 jours à partir de votre date de départ. Il expire 30 jours après le départ et ne peut pas être réactivé ou réémis." },
        { q: "Puis-je transférer mon DutyCredit ?", a: "Non. Les DutyCredits sont uniques, à usage unique et sécurisés cryptographiquement." },
      ]},
      { cat: "Pour les voyageurs", qs: [
        { q: "Dois-je m'inscrire ?", a: "Non. Ouvrez simplement le lien partagé par votre agence." },
        { q: "Où puis-je échanger mon DutyCredit ?", a: "Chez tout détaillant aéroportuaire enregistré sur DutyBoost à votre aéroport de départ." },
        { q: "Que se passe-t-il après le scan ?", a: "Le détaillant scanne votre QR code, la réduction est instantanément appliquée et votre DutyCredit est marqué comme utilisé." },
      ]},
      { cat: "Pour les agences de voyage", qs: [
        { q: "Comment DutyBoost profite-t-il à mon agence ?", a: "Chaque fois qu'un voyageur échange un DutyCredit, votre agence gagne 20% de la commission de la plateforme." },
        { q: "Comment générer un DutyCredit ?", a: "Vous ne le faites pas — cela se passe automatiquement. Notre équipe connecte votre système de réservation à DutyBoost." },
        { q: "Y a-t-il des frais ?", a: "Non. Aucun frais d'installation, d'abonnement ou d'utilisation pour les agences." },
      ]},
      { cat: "Pour les détaillants aéroportuaires", qs: [
        { q: "Comment DutyBoost profite-t-il à mon magasin ?", a: "DutyBoost dirige des voyageurs pré-qualifiés et motivés directement vers votre magasin." },
        { q: "Quelle commission DutyBoost facture-t-il ?", a: "DutyBoost facture des frais de plateforme de 2,5% sur la valeur brute de chaque transaction DutyCredit échangé, plafonnés à €25 par transaction. Aucun frais fixe ou d'abonnement — vous ne payez que lorsque DutyBoost génère une vente confirmée." },
        { q: "Comment échanger un DutyCredit ?", a: "Scannez le QR code via le tableau de bord ou l'interface de scan. Le système valide et enregistre automatiquement." },
      ]},
      { cat: "Intégration & Technique", qs: [
        { q: "Que doivent mettre en place les détaillants ?", a: "Deux options : (1) Zéro intégration : utiliser l'app Retailer Scan. (2) Intégration API POS : votre système appelle directement notre API." },
        { q: "Existe-t-il une API pour les agences ?", a: "Non requise. DutyBoost se connecte directement à votre système de réservation lors de l'onboarding." },
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
        { q: "¿Qué es un DutyCredit?", a: "Un DutyCredit es un incentivo vinculado a una reserva — un código de descuento digital único generado automáticamente cuando un socio de viajes (vuelo, alojamiento o alquiler de coche) envía una reserva a través de DutyBoost. Los viajeros lo reciben como código QR directamente en su correo electrónico de confirmación de reserva." },
        { q: "¿Cómo se calcula mi DutyCredit?", a: "Tu DutyCredit ofrece un descuento fijo en euros en las tiendas aeroportuarias participantes. El importe depende del valor de tu cesta en el momento del pago: €2,50 de descuento con €35–€49, €5 con €50–€74, €10 con €75–€99, €15 con €100–€149, €20 con €150–€199, €35 con €200–€299 y €60 con €300 o más." },
        { q: "¿Puedo usar mi DutyCredit en varios establecimientos?", a: "No. Los DutyCredits son canjeables en una sola transacción en un único punto de venta." },
        { q: "¿Hay un gasto mínimo?", a: "Sí. Se requiere un gasto mínimo de €35 para activar tu DutyCredit. El descuento es un importe fijo en euros que crece con tu compra — desde €2,50 a partir de €35 hasta €60 a partir de €300 o más." },
        { q: "¿Cómo recibo mi DutyCredit?", a: "Tu agencia te compartirá un enlace tras la confirmación. Al abrirlo verás tu código QR DutyCredit." },
        { q: "¿Caducan los DutyCredits?", a: "Sí. Cada DutyCredit es válido durante 30 días a partir de tu fecha de salida. Caduca 30 días después de la salida y no puede reactivarse ni reemitirse." },
        { q: "¿Puedo transferir mi DutyCredit?", a: "No. Los DutyCredits son únicos, de un solo uso y seguros criptográficamente." },
      ]},
      { cat: "Para viajeros", qs: [
        { q: "¿Necesito registrarme?", a: "No. Simplemente abre el enlace compartido por tu agencia." },
        { q: "¿Dónde puedo canjear mi DutyCredit?", a: "En cualquier tienda aeroportuaria registrada en DutyBoost en tu aeropuerto de salida." },
        { q: "¿Qué ocurre después del escaneo?", a: "El comercio escanea tu código QR, el descuento se aplica al instante y tu DutyCredit queda marcado como canjeado." },
      ]},
      { cat: "Para agencias de viajes", qs: [
        { q: "¿Cómo beneficia DutyBoost a mi agencia?", a: "Cada vez que un viajero canjea un DutyCredit, tu agencia gana el 20% de la comisión de la plataforma." },
        { q: "¿Cómo genero un DutyCredit?", a: "No lo haces tú — ocurre automáticamente. Nuestro equipo conecta tu sistema de reservas a DutyBoost." },
        { q: "¿Hay algún coste?", a: "No. Sin comisiones de configuración, suscripción ni uso para agencias." },
      ]},
      { cat: "Para tiendas aeroportuarias", qs: [
        { q: "¿Cómo beneficia DutyBoost a mi tienda?", a: "DutyBoost dirige viajeros precalificados e incentivados directamente a tu tienda." },
        { q: "¿Qué comisión cobra DutyBoost?", a: "DutyBoost cobra una tarifa de plataforma del 2,5% sobre el valor bruto de cada transacción con DutyCredit canjeado, con un máximo de €25 por transacción. Sin tarifas fijas ni suscripciones — solo pagas cuando DutyBoost genera una venta confirmada." },
        { q: "¿Cómo canjeo un DutyCredit?", a: "Escanea el código QR en el panel o la interfaz de escaneo. El sistema valida y registra automáticamente." },
      ]},
      { cat: "Integración y Técnica", qs: [
        { q: "¿Qué deben implementar las tiendas?", a: "Dos opciones: (1) Sin integración: usa la app Retailer Scan. (2) Integración API POS: tu sistema llama directamente a nuestra API." },
        { q: "¿Existe una API para agencias?", a: "No es necesaria. DutyBoost se conecta directamente a tu sistema de reservas durante el alta." },
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
        { q: "Cos'è un DutyCredit?", a: "Un DutyCredit è un incentivo legato a una prenotazione — un codice sconto digitale unico generato automaticamente quando un partner di viaggio (volo, alloggio o noleggio auto) invia una prenotazione tramite DutyBoost. I viaggiatori lo ricevono come QR code direttamente nell'e-mail di conferma della prenotazione." },
        { q: "Come viene calcolato il mio DutyCredit?", a: "Il tuo DutyCredit offre uno sconto fisso in euro presso i rivenditori aeroportuali partecipanti. L'importo dipende dal valore del tuo carrello alla cassa: €2,50 di sconto con €35–€49, €5 con €50–€74, €10 con €75–€99, €15 con €100–€149, €20 con €150–€199, €35 con €200–€299 e €60 con €300 o più." },
        { q: "Posso usare il mio DutyCredit in più negozi?", a: "No. I DutyCredit sono riscattabili in un'unica transazione presso un unico punto vendita." },
        { q: "C'è una spesa minima?", a: "Sì. È richiesta una spesa minima di €35 per attivare il tuo DutyCredit. Lo sconto è un importo fisso in euro che cresce con il tuo acquisto — da €2,50 a partire da €35 fino a €60 a partire da €300 o più." },
        { q: "Come ricevo il mio DutyCredit?", a: "La tua agenzia ti condividerà un link dopo la conferma. Aprendo il link vedrai il tuo QR code DutyCredit." },
        { q: "I DutyCredit scadono?", a: "Sì. Ogni DutyCredit è valido per 30 giorni a partire dalla data di partenza. Scade 30 giorni dopo la partenza e non può essere ripristinato o riemesso." },
        { q: "Posso trasferire il mio DutyCredit?", a: "No. I DutyCredit sono unici, monouso e sicuri crittograficamente." },
      ]},
      { cat: "Per i viaggiatori", qs: [
        { q: "Devo registrarmi?", a: "No. Basta aprire il link condiviso dalla tua agenzia." },
        { q: "Dove posso riscattare il mio DutyCredit?", a: "Presso qualsiasi rivenditore aeroportuale registrato su DutyBoost nel tuo aeroporto di partenza." },
        { q: "Cosa succede dopo la scansione?", a: "Il rivenditore scansiona il tuo QR code, lo sconto viene applicato istantaneamente e il tuo DutyCredit viene contrassegnato come riscattato." },
      ]},
      { cat: "Per le agenzie di viaggio", qs: [
        { q: "Come beneficia la mia agenzia?", a: "Ogni volta che un viaggiatore riscatta un DutyCredit, la tua agenzia guadagna il 20% della commissione della piattaforma." },
        { q: "Come genero un DutyCredit?", a: "Non lo fai tu — avviene automaticamente. Il nostro team collega il tuo sistema di prenotazione a DutyBoost." },
        { q: "Ci sono costi?", a: "No. Nessun costo di configurazione, abbonamento o utilizzo per le agenzie." },
      ]},
      { cat: "Per i rivenditori aeroportuali", qs: [
        { q: "Come beneficia il mio negozio?", a: "DutyBoost porta viaggiatori pre-qualificati e incentivati direttamente al tuo negozio." },
        { q: "Quale commissione applica DutyBoost?", a: "DutyBoost applica una commissione di piattaforma del 2,5% sul valore lordo di ogni transazione con DutyCredit riscattato, con un massimo di €25 per transazione. Nessuna quota fissa o abbonamento — si paga solo quando DutyBoost genera una vendita confermata." },
        { q: "Come riscatto un DutyCredit?", a: "Scansiona il QR code tramite la dashboard o l'interfaccia di scansione. Il sistema valida e registra automaticamente." },
      ]},
      { cat: "Integrazione & Tecnica", qs: [
        { q: "Cosa devono implementare i rivenditori?", a: "Due opzioni: (1) Zero integrazione: usa l'app Retailer Scan. (2) Integrazione API POS: il tuo sistema chiama direttamente la nostra API." },
        { q: "Esiste un'API per le agenzie?", a: "Non necessaria. DutyBoost si connette direttamente al tuo sistema di prenotazione durante l'onboarding." },
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