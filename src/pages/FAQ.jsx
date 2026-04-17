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
        { q: "What is a DutyCredit?", a: "A DutyCredit is a booking-earned incentive — a unique digital discount code automatically generated when a travel agency submits a booking through the DutyBoost platform. Travelers receive it as a QR code and can use it to get a discount at participating airport retailers." },
        { q: "How is my DutyCredit value calculated?", a: "Your DutyCredit is a fixed euro amount (€5–€25) calculated from your booking: base rate per traveler (€2.50 short-haul / €7.00 long-haul), multiplied by the number of travelers and a ticket-price multiplier (×1.0 to ×2.5 based on total ticket value). The result is capped at €25." },
        { q: "Can I use my DutyCredit at multiple shops?", a: "No. DutyCredits are redeemable in a single transaction at one point of sale and cannot be split across multiple shops." },
        { q: "Is there a minimum spend to redeem a DutyCredit?", a: "Yes. A minimum basket spend of €70 is required to redeem a DutyCredit. The credit is tiered: 10% on €70–€99, 15% on €100–€299, and 20% on €300+, capped at €25." },
        { q: "How do I receive my DutyCredit?", a: "Your travel agency will share a link with you after your booking is confirmed. Opening the link shows your personal DutyCredit QR code." },
        { q: "Do DutyCredits expire?", a: "Yes. Every DutyCredit has an expiration date tied to your travel date. Expired DutyCredits cannot be reinstated or reissued." },
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
        { q: "What commission does DutyBoost charge retailers?", a: "DutyBoost charges a 5% commission on the gross transaction value of sales made through a redeemed DutyCredit." },
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
        { q: "Wat is een DutyCredit?", a: "Een DutyCredit is een boeking-gedreven incentive — een unieke digitale kortingscode die automatisch wordt gegenereerd wanneer een reisbureau een boeking indient via DutyBoost. Reizigers ontvangen deze als QR-code." },
        { q: "Hoe wordt mijn DutyCredit berekend?", a: "Uw DutyCredit is een vast eurobedrag (€5–€25): basisbedrag per reiziger (€2,50 korte afstand / €7,00 lange afstand) × aantal reizigers × prijsmultiplicator (×1,0 tot ×2,5 op basis van totale ticketprijs), afgetopt op €25." },
        { q: "Kan ik mijn DutyCredit bij meerdere winkels gebruiken?", a: "Nee. DutyCredits zijn inwisselbaar bij één transactie op één verkooppunt." },
        { q: "Is er een minimumbedrag?", a: "Ja. Er geldt een minimale besteding van €70 om een DutyCredit te kunnen inwisselen. Het tegoed is getrapd: 10% bij €70–€99, 15% bij €100–€299 en 20% bij €300+, afgetopt op €25." },
        { q: "Hoe ontvang ik mijn DutyCredit?", a: "Uw reisbureau deelt een link na bevestiging van uw boeking. Via de link ziet u uw persoonlijke DutyCredit QR-code." },
        { q: "Verlopen DutyCredits?", a: "Ja. Elke DutyCredit heeft een vervaldatum gekoppeld aan uw reisdatum. Verlopen DutyCredits kunnen niet worden hersteld." },
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
        { q: "Welke commissie berekent DutyBoost?", a: "5% op de bruto transactiewaarde van verkopen via een ingewisselde DutyCredit." },
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
        { q: "Was ist ein DutyCredit?", a: "Ein DutyCredit ist ein buchungsbasierter Anreiz — ein einzigartiger digitaler Rabattcode, der automatisch generiert wird, wenn ein Reisebüro eine Buchung über DutyBoost einreicht. Reisende erhalten ihn als QR-Code." },
        { q: "Wie wird mein DutyCredit berechnet?", a: "Ihr DutyCredit ist ein fester Eurobetrag (€5–€25): Basisbetrag pro Reisenden (€2,50 Kurzstrecke / €7,00 Langstrecke) × Anzahl Reisende × Preismultiplikator (×1,0 bis ×2,5 je nach Ticketpreis), gedeckelt bei €25." },
        { q: "Kann ich meinen DutyCredit in mehreren Geschäften verwenden?", a: "Nein. DutyCredits sind für eine einzige Transaktion an einem Verkaufspunkt einlösbar." },
        { q: "Gibt es einen Mindestbetrag?", a: "Ja. Es gilt ein Mindesteinkauf von €70, um einen DutyCredit einzulösen. Das Guthaben ist gestaffelt: 10% bei €70–€99, 15% bei €100–€299 und 20% bei €300+, gedeckelt bei €25." },
        { q: "Wie erhalte ich meinen DutyCredit?", a: "Ihr Reisebüro teilt Ihnen nach Buchungsbestätigung einen Link mit. Über den Link sehen Sie Ihren DutyCredit QR-Code." },
        { q: "Verfallen DutyCredits?", a: "Ja. Jeder DutyCredit hat ein Ablaufdatum. Abgelaufene DutyCredits können nicht wiederhergestellt werden." },
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
        { q: "Welche Provision berechnet DutyBoost?", a: "5% auf den Bruttotransaktionswert von Umsätzen über einen eingelösten DutyCredit." },
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
        { q: "Qu'est-ce qu'un DutyCredit ?", a: "Un DutyCredit est un incentive lié à une réservation — un code de réduction numérique unique généré automatiquement lorsqu'une agence soumet une réservation via DutyBoost. Les voyageurs le reçoivent sous forme de QR code." },
        { q: "Comment mon DutyCredit est-il calculé ?", a: "Votre DutyCredit est un montant fixe en euros (€5–€25) : montant de base par voyageur (€2,50 court-courrier / €7,00 long-courrier) × nombre de voyageurs × multiplicateur prix (×1,0 à ×2,5 selon prix total du billet), plafonné à €25." },
        { q: "Puis-je utiliser mon DutyCredit dans plusieurs magasins ?", a: "Non. Les DutyCredits ne peuvent être échangés qu'en une seule transaction dans un seul point de vente." },
        { q: "Y a-t-il un montant minimum ?", a: "Oui. Un panier minimum de €70 est requis pour utiliser un DutyCredit. Le crédit est dégressif : 10% pour €70–€99, 15% pour €100–€299, et 20% pour €300+, plafonné à €25." },
        { q: "Comment est-ce que je reçois mon DutyCredit ?", a: "Votre agence vous partagera un lien après confirmation. En ouvrant le lien, vous verrez votre QR code DutyCredit." },
        { q: "Les DutyCredits expirent-ils ?", a: "Oui. Chaque DutyCredit a une date d'expiration liée à votre date de voyage. Les DutyCredits expirés ne peuvent pas être réactivés." },
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
        { q: "Quelle commission DutyBoost facture-t-il ?", a: "5% sur la valeur brute des transactions effectuées via un DutyCredit échangé." },
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
        { q: "¿Qué es un DutyCredit?", a: "Un DutyCredit es un incentivo vinculado a una reserva — un código de descuento digital único generado automáticamente cuando una agencia envía una reserva a través de DutyBoost. Los viajeros lo reciben como código QR." },
        { q: "¿Cómo se calcula mi DutyCredit?", a: "Tu DutyCredit es un importe fijo en euros (€5–€25): base por viajero (€2,50 corta distancia / €7,00 larga distancia) × número de viajeros × multiplicador de precio (×1,0 a ×2,5 según precio total del billete), con tope en €25." },
        { q: "¿Puedo usar mi DutyCredit en varios establecimientos?", a: "No. Los DutyCredits son canjeables en una sola transacción en un único punto de venta." },
        { q: "¿Hay un gasto mínimo?", a: "Sí. Se requiere un gasto mínimo de €70 para canjear un DutyCredit. El crédito es escalonado: 10% en €70–€99, 15% en €100–€299 y 20% en €300+, con tope en €25." },
        { q: "¿Cómo recibo mi DutyCredit?", a: "Tu agencia te compartirá un enlace tras la confirmación. Al abrirlo verás tu código QR DutyCredit." },
        { q: "¿Caducan los DutyCredits?", a: "Sí. Cada DutyCredit tiene una fecha de caducidad vinculada a tu fecha de viaje. Los caducados no pueden reactivarse." },
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
        { q: "¿Qué comisión cobra DutyBoost?", a: "El 5% sobre el valor bruto de las transacciones realizadas a través de un DutyCredit canjeado." },
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
        { q: "Cos'è un DutyCredit?", a: "Un DutyCredit è un incentivo legato a una prenotazione — un codice sconto digitale unico generato automaticamente quando un'agenzia invia una prenotazione tramite DutyBoost. I viaggiatori lo ricevono come QR code." },
        { q: "Come viene calcolato il mio DutyCredit?", a: "Il tuo DutyCredit è un importo fisso in euro (€5–€25): base per viaggiatore (€2,50 corto raggio / €7,00 lungo raggio) × numero di viaggiatori × moltiplicatore prezzo (×1,0 a ×2,5 in base al prezzo totale del biglietto), con tetto di €25." },
        { q: "Posso usare il mio DutyCredit in più negozi?", a: "No. I DutyCredit sono riscattabili in un'unica transazione presso un unico punto vendita." },
        { q: "C'è una spesa minima?", a: "Sì. È richiesta una spesa minima di €70 per riscattare un DutyCredit. Il credito è scaglionato: 10% per €70–€99, 15% per €100–€299 e 20% per €300+, con tetto di €25." },
        { q: "Come ricevo il mio DutyCredit?", a: "La tua agenzia ti condividerà un link dopo la conferma. Aprendo il link vedrai il tuo QR code DutyCredit." },
        { q: "I DutyCredit scadono?", a: "Sì. Ogni DutyCredit ha una data di scadenza legata alla tua data di viaggio. I DutyCredit scaduti non possono essere ripristinati." },
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
        { q: "Quale commissione applica DutyBoost?", a: "Il 5% sul valore lordo delle transazioni effettuate tramite un DutyCredit riscattato." },
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
          <Link to="/"><DutyBoostLogo height={150} /></Link>
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