import { useState, useRef, useLayoutEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import CircularEcosystem from "../components/why-dutyboost/CircularEcosystem";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import OnePagerLogo from "../components/OnePagerLogo";
import LanguageSwitcher from "../components/LanguageSwitcher";

const GradientDivider = () => (
  <div style={{ height: '2px', background: 'linear-gradient(to right, #7c3aed, #6366f1, #8b5cf6)', width: '100%' }} />
);

const STRINGS = {
  en: {
    badge: "Why DutyBoost",
    headline: "Why DutyBoost for Every Stakeholder",
    subtitle: "One platform connects four participants. For each, here is why it matters, how it works, and what they get.",
    section_title: "Why · How · What",
    labels: { why: "Why", how: "How", what: "What" },
    hub_sub: "Revenue Ecosystem",
    stakeholders: [
      {
        icon: "plane",
        title: "Travel Partners",
        tagline: "Turn every booking into a new revenue stream.",
        why: "Every booking already reaches a traveller who will spend at the airport — that intent currently goes unrewarded.",
        how: "Refer the traveller at booking; DutyBoost issues a DutyCredit tied to your referral, redeemable in-terminal.",
        what: "Ongoing commission on every redemption, plus a richer customer proposition at no cost to you.",
      },
      {
        icon: "traveller",
        title: "Travellers",
        tagline: "A complimentary shopping credit, just for travelling.",
        why: "Airport prices feel fixed; travellers have no reason to plan spend and no reward for loyalty.",
        how: "Receive a complimentary DutyBoost credit before departure; scan a QR code at checkout to apply the discount.",
        what: "Real savings on real products on the day they fly — no app, no membership, no catch.",
      },
      {
        icon: "store",
        title: "Airport Retailers",
        tagline: "More qualified shoppers, larger baskets, same fixed fee.",
        why: "Most travellers decide what to buy before they reach the terminal, but retailers can't reach them that early.",
        how: "DutyBoost drives intent-building touchpoints pre-trip; redemptions are validated in real time through your existing POS.",
        what: "More qualified footfall and larger baskets, with a fixed 2.5% fee only when a sale actually happens.",
      },
      {
        icon: "cpu",
        title: "POS Vendors",
        tagline: "Extend your platform with measurable commercial value.",
        why: "Your POS already powers airport retail checkout — the single moment where intent becomes revenue.",
        how: "One API integration exposes DutyBoost redemption across your retailer base; they toggle it on themselves.",
        what: "Recurring partner revenue on every redemption, and stickier retailer relationships.",
      },
    ],
    cta: "One platform. Six winners. Every participant creates value.",
    legal: "© {{year}} DutyBoost B.V. — The Travel Retail Conversion Layer. Figures are illustrative.",
  },
  nl: {
    badge: "Waarom DutyBoost",
    headline: "Waarom DutyBoost voor elke belanghebbende",
    subtitle: "Eén platform verbindt vier deelnemers. Voor elk: waarom het ertoe doet, hoe het werkt, en wat ze ervan hebben.",
    section_title: "Waarom · Hoe · Wat",
    labels: { why: "Waarom", how: "Hoe", what: "Wat" },
    hub_sub: "Inkomsten-ecosysteem",
    stakeholders: [
      {
        icon: "plane",
        title: "Travel Partners",
        tagline: "Verander elke boeking in een nieuwe inkomstenstroom.",
        why: "Elke boeking bereikt al een reiziger die op de luchthaven zal uitgeven — die intentie blijft nu onbeloond.",
        how: "Refer de reiziger bij de boeking; DutyBoost geeft een DutyCredit uit gekoppeld aan uw verwijzing, inwisselbaar in de terminal.",
        what: "Doorlopende commissie bij elke inning, plus een rijkere klantpropositie zonder kosten voor u.",
      },
      {
        icon: "traveller",
        title: "Reizigers",
        tagline: "Een gratis winkeltegoed, gewoon omdat u reist.",
        why: "Luchthavenprijzen lijken vast; reizigers hebben geen reden om uitgaven te plannen of beloond te worden voor loyaliteit.",
        how: "Ontvang vóór vertrek een gratis DutyBoost-tegoed; scan een QR-code aan de kassa om de korting te krijgen.",
        what: "Echte besparingen op echte producten op de dag van vliegen — geen app, geen lidmaatschap, geen addertje.",
      },
      {
        icon: "store",
        title: "Luchthavenwinkeliers",
        tagline: "Meer gekwalificeerde kopers, grotere manden, zelfde vaste vergoeding.",
        why: "De meeste reizigers bepalen vóór de terminal wat ze kopen, maar winkeliers kunnen hen niet zo vroeg bereiken.",
        how: "DutyBoost drijft intentie-opbouw aan vóór de reis; inningen worden realtime gevalideerd via uw bestaande POS.",
        what: "Meer gekwalificeerde voetverkeer en grotere manden, met een vaste vergoeding van 2,5% alleen bij een verkoop.",
      },
      {
        icon: "cpu",
        title: "POS-leveranciers",
        tagline: "Breid uw platform uit met meetbare commerciële waarde.",
        why: "Uw POS draait al de kassa van luchthavenwinkels — het enige moment waarop intentie omzet wordt.",
        how: "Eén API-integratie ontsluit DutyBoost-inninging over uw winkeliersbase; zij schakelen het zelf in.",
        what: "Terugkerende partnerinkomsten bij elke inning, en klevere winkeliersrelaties.",
      },
    ],
    cta: "Eén platform. Zes winnaars. Elke deelnemer creëert waarde.",
    legal: "© {{year}} DutyBoost B.V. — The Travel Retail Conversion Layer. Cijfers zijn illustratief.",
  },
  es: {
    badge: "Por qué DutyBoost",
    headline: "Por qué DutyBoost para cada participante",
    subtitle: "Una plataforma conecta a cuatro participantes. Para cada uno: por qué importa, cómo funciona y qué obtienen.",
    section_title: "Por qué · Cómo · Qué",
    labels: { why: "Por qué", how: "Cómo", what: "Qué" },
    hub_sub: "Ecosistema de ingresos",
    stakeholders: [
      {
        icon: "plane",
        title: "Socios de viaje",
        tagline: "Convierte cada reserva en una nueva fuente de ingresos.",
        why: "Cada reserva ya llega a un pasajero que gastará en el aeropuerto — esa intención hoy no recibe recompensa.",
        how: "Refiere al pasajero al reservar; DutyBoost emite un DutyCredit vinculado a tu referencia, redimible en la terminal.",
        what: "Comisión continua en cada redención, más una propuesta de cliente más rica sin coste para ti.",
      },
      {
        icon: "traveller",
        title: "Pasajeros",
        tagline: "Un crédito de compra gratuito, solo por viajar.",
        why: "Los precios del aeropuerto parecen fijos; los pasajeros no tienen razón para planear el gasto ni recompensa por lealtad.",
        how: "Recibe un crédito DutyBoost gratuito antes de salir; escanea un código QR en caja para aplicar el descuento.",
        what: "Ahorros reales en productos reales el día del vuelo — sin app, sin membresía, sin trampa.",
      },
      {
        icon: "store",
        title: "Minoristas de aeropuerto",
        tagline: "Más compradores cualificados, cestas más grandes, misma comisión fija.",
        why: "La mayoría de los pasajeros decide qué comprar antes de llegar a la terminal, pero los minoristas no pueden alcanzarlos tan pronto.",
        how: "DutyBoost impulsa puntos de contacto que construyen intención antes del viaje; las redenciones se validan en tiempo real vía tu POS existente.",
        what: "Más afluencia cualificada y cestas más grandes, con una comisión fija del 2,5% solo cuando ocurre una venta.",
      },
      {
        icon: "cpu",
        title: "Proveedores POS",
        tagline: "Amplía tu plataforma con valor comercial medible.",
        why: "Tu POS ya gestiona el cobro del comercio aeroportuario — el único momento en que la intención se convierte en ingresos.",
        how: "Una integración API expone la redención de DutyBoost en toda tu base de minoristas; ellos la activan por sí mismos.",
        what: "Ingresos recurrentes de socio en cada redención y relaciones más duraderas con los minoristas.",
      },
    ],
    cta: "Una plataforma. Seis ganadores. Cada participante crea valor.",
    legal: "© {{year}} DutyBoost B.V. — The Travel Retail Conversion Layer. Las cifras son ilustrativas.",
  },
  fr: {
    badge: "Pourquoi DutyBoost",
    headline: "Pourquoi DutyBoost pour chaque partie prenante",
    subtitle: "Une plateforme relie quatre participants. Pour chacun : pourquoi cela compte, comment ça fonctionne et ce qu'ils obtiennent.",
    section_title: "Pourquoi · Comment · Quoi",
    labels: { why: "Pourquoi", how: "Comment", what: "Quoi" },
    hub_sub: "Écosystème de revenus",
    stakeholders: [
      {
        icon: "plane",
        title: "Partenaires de voyage",
        tagline: "Transformez chaque réservation en une nouvelle source de revenus.",
        why: "Chaque réservation atteint déjà un voyageur qui dépensera à l'aéroport — cette intention reste aujourd'hui non récompensée.",
        how: "Référez le voyageur à la réservation ; DutyBoost émet un DutyCredit lié à votre référence, remboursable au terminal.",
        what: "Commission continue sur chaque remboursement, plus une proposition client plus riche sans coût pour vous.",
      },
      {
        icon: "traveller",
        title: "Voyageurs",
        tagline: "Un crédit d'achat gratuit, juste pour voyager.",
        why: "Les prix aéroportuaires semblent fixes ; les voyageurs n'ont aucune raison de planifier leurs dépenses ni de recevoir une récompense de fidélité.",
        how: "Recevez un crédit DutyBoost gratuit avant le départ ; scannez un QR code en caisse pour appliquer la remise.",
        what: "De vraies économies sur de vrais produits le jour du vol — pas d'application, pas d'abonnement, pas de piège.",
      },
      {
        icon: "store",
        title: "Détaillants d'aéroport",
        tagline: "Plus d'acheteurs qualifiés, paniers plus gros, même commission fixe.",
        why: "La plupart des voyageurs décident de leurs achats avant d'arriver au terminal, mais les détaillants ne peuvent pas les atteindre aussi tôt.",
        how: "DutyBoost génère des points de contact qui construisent l'intention avant le voyage ; les remboursements sont validés en temps réel via votre POS existant.",
        what: "Plus de fréquentation qualifiée et des paniers plus grands, avec une commission fixe de 2,5 % seulement lors d'une vente réelle.",
      },
      {
        icon: "cpu",
        title: "Fournisseurs POS",
        tagline: "Étendez votre plateforme avec une valeur commerciale mesurable.",
        why: "Votre POS gère déjà la caisse du commerce aéroportuaire — le seul moment où l'intention devient revenu.",
        how: "Une intégration API expose le remboursement DutyBoost sur toute votre base de détaillants ; ils l'activent eux-mêmes.",
        what: "Revenus récurrents de partenaire sur chaque remboursement et relations détaillants plus durables.",
      },
    ],
    cta: "Une plateforme. Six gagnants. Chaque participant crée de la valeur.",
    legal: "© {{year}} DutyBoost B.V. — The Travel Retail Conversion Layer. Les chiffres sont indicatifs.",
  },
  de: {
    badge: "Warum DutyBoost",
    headline: "Warum DutyBoost für jede Interessengruppe",
    subtitle: "Eine Plattform verbindet vier Teilnehmer. Für jeden: warum es zählt, wie es funktioniert und was sie davon haben.",
    section_title: "Warum · Wie · Was",
    labels: { why: "Warum", how: "Wie", what: "Was" },
    hub_sub: "Umsatz-Ökosystem",
    stakeholders: [
      {
        icon: "plane",
        title: "Reisepartner",
        tagline: "Verwandeln Sie jede Buchung in eine neue Einnahmequelle.",
        why: "Jede Buchung erreicht bereits einen Reisenden, der am Flughafen ausgeben wird — diese Absicht bleibt heute unbelohnt.",
        how: "Vermitteln Sie den Reisenden bei der Buchung; DutyBoost stellt einen an Ihre Vermittlung gebundenen DutyCredit aus, einlösbar im Terminal.",
        what: "Fortlaufende Provision bei jeder Einlösung, plus ein reichhaltigeres Kundenangebot ohne Kosten für Sie.",
      },
      {
        icon: "traveller",
        title: "Reisende",
        tagline: "Ein kostenloses Einkaufsguthaben, einfach zum Reisen.",
        why: "Flughafenpreise wirken fest; Reisende haben keinen Anlass, Ausgaben zu planen, und keine Belohnung für Treue.",
        how: "Erhalten Sie vor der Abreise ein kostenloses DutyBoost-Guthaben; scannen Sie an der Kasse einen QR-Code, um den Rabatt zu erhalten.",
        what: "Echte Ersparnisse auf echte Produkte am Tag des Fluges — keine App, keine Mitgliedschaft, kein Haken.",
      },
      {
        icon: "store",
        title: "Flughafenhändler",
        tagline: "Mehr qualifizierte Käufer, größere Körbe, gleiche feste Gebühr.",
        why: "Die meisten Reisenden entscheiden vor dem Terminal, was sie kaufen, aber Händler können sie nicht so früh erreichen.",
        how: "DutyBoost treibt beratende Touchpoints vor der Reise an; Einlösungen werden in Echtzeit über Ihr bestehendes POS validiert.",
        what: "Mehr qualifiziertes Publikum und größere Körbe, mit einer festen Gebühr von 2,5 % nur bei einem tatsächlichen Verkauf.",
      },
      {
        icon: "cpu",
        title: "POS-Anbieter",
        tagline: "Erweitern Sie Ihre Plattform um messbaren kommerziellen Wert.",
        why: "Ihr POS betreibt bereits die Kasse des Flughafenhandels — der einzige Moment, in dem Absicht zu Umsatz wird.",
        how: "Eine API-Integration macht die DutyBoost-Einlösung über Ihre gesamte Händlerbasis verfügbar; sie aktivieren sie selbst.",
        what: "Wiederkehrende Partner-Einnahmen bei jeder Einlösung und nachhaltigere Händlerbeziehungen.",
      },
    ],
    cta: "Eine Plattform. Sechs Gewinner. Jeder Teilnehmer schafft Wert.",
    legal: "© {{year}} DutyBoost B.V. — The Travel Retail Conversion Layer. Zahlen sind illustrativ.",
  },
  it: {
    badge: "Perché DutyBoost",
    headline: "Perché DutyBoost per ogni stakeholder",
    subtitle: "Una piattaforma collega quattro partecipanti. Per ciascuno: perché conta, come funziona e cosa ottengono.",
    section_title: "Perché · Come · Cosa",
    labels: { why: "Perché", how: "Come", what: "Cosa" },
    hub_sub: "Ecosistema di entrate",
    stakeholders: [
      {
        icon: "plane",
        title: "Partner di viaggio",
        tagline: "Trasforma ogni prenotazione in una nuova fonte di entrate.",
        why: "Ogni prenotazione raggiunge già un viaggiatore che spenderà in aeroporto — quell'intenzione oggi non è premiata.",
        how: "Referenzi il viaggiatore alla prenotazione; DutyBoost emette un DutyCredit legato alla tua segnalazione, riscattabile in terminal.",
        what: "Commissione continua su ogni riscatto, più una proposta cliente più ricca senza costi per te.",
      },
      {
        icon: "traveller",
        title: "Viaggiatori",
        tagline: "Un credito di acquisto gratuito, solo per viaggiare.",
        why: "I prezzi aeroportuali sembrano fissi; i viaggiatori non hanno motivo di pianificare la spesa né ricompense per la fedeltà.",
        how: "Ricevi un credito DutyBoost gratuito prima della partenza; scansiona un QR code alla cassa per applicare lo sconto.",
        what: "Risparmi reali su prodotti reali il giorno del volo — nessuna app, nessun abbonamento, nessun trucco.",
      },
      {
        icon: "store",
        title: "Rivenditori aeroportuali",
        tagline: "Più acquirenti qualificati, carrelli più grandi, stessa commissione fissa.",
        why: "La maggior parte dei viaggiatori decide cosa comprare prima di arrivare al terminal, ma i rivenditori non possono raggiungerli così presto.",
        how: "DutyBoost genera punti di contatto che costruiscono l'intenzione prima del viaggio; i riscatti sono validati in tempo reale via il tuo POS esistente.",
        what: "Più affluenza qualificata e carrelli più grandi, con una commissione fissa del 2,5% solo a vendita avvenuta.",
      },
      {
        icon: "cpu",
        title: "Fornitori POS",
        tagline: "Estendi la tua piattaforma con valore commerciale misurabile.",
        why: "Il tuo POS gestisce già la cassa del commercio aeroportuale — l'unico momento in cui l'intenzione diventa ricavo.",
        how: "Una singola integrazione API espone il riscatto DutyBoost su tutta la tua base di rivenditori; loro lo attivano da soli.",
        what: "Entrate ricorrenti di partner su ogni riscatto e relazioni più durature con i rivenditori.",
      },
    ],
    cta: "Una piattaforma. Sei vincitori. Ogni partecipante crea valore.",
    legal: "© {{year}} DutyBoost B.V. — The Travel Retail Conversion Layer. I dati sono illustrativi.",
  },
};

// Stakeholder icons & accents live in the CircularEcosystem component.

export default function WhyDutyBoostOnePager() {
  const { t, i18n } = useTranslation();
  const lang = (i18n.language || 'en').slice(0, 2);
  const s = STRINGS[lang] || STRINGS.en;
  const p = (k) => (s[k] !== undefined ? s[k] : STRINGS.en[k]);
  const innerRef = useRef(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    if (!innerRef.current) return;
    const naturalHeight = innerRef.current.scrollHeight;
    setScale(naturalHeight > 1122 ? 1122 / naturalHeight : 1);
  }, [i18n.language]);

  const handleDownloadPDF = async () => {
    const element = document.querySelector('.print-content');
    const canvas = await html2canvas(element, { scale: 2, allowTaint: true, useCORS: true });
    const imgData = canvas.toDataURL('image/png');
    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    const pdf = new jsPDF('p', 'mm', 'a4', { compress: true });
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save('why-dutyboost-one-pager.pdf');
  };

  const labels = p('labels');

  return (
    <div className="min-h-screen font-body" style={{ background: 'linear-gradient(135deg, hsl(255 60% 97%) 0%, hsl(243 50% 95%) 50%, hsl(255 55% 96%) 100%)', backgroundAttachment: 'fixed' }}>
      {/* Print toolbar */}
      <div className="print:hidden sticky top-0 z-50 bg-white border-b border-border px-6 py-3 flex items-center justify-between">
        <LanguageSwitcher allowedLanguages={["en", "nl", "es", "fr", "de", "it"]} />
        <Button onClick={handleDownloadPDF} className="gap-2 text-white" style={{ background: 'linear-gradient(to right, #7c3aed, #6366f1)' }}>
          <Printer className="w-4 h-4" /> {t('common.download')}
        </Button>
      </div>

      {/* A4-style content */}
      <div className="print-content max-w-[794px] mx-auto bg-white" style={{ width: '794px', height: '1122px', overflow: 'hidden' }}>
        <div ref={innerRef} className="px-8 py-3 flex flex-col" style={{ width: '794px', minHeight: '1122px', transformOrigin: 'top center', transform: `scale(${scale})` }}>

          {/* Header */}
          <div className="flex items-center justify-between pb-1">
            <OnePagerLogo height={40} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#6d28d9' }}>{p('badge')}</span>
          </div>
          <GradientDivider />

          {/* Headline */}
          <div className="text-center py-2">
            <h1 className="text-2xl font-heading font-bold leading-tight">{p('headline')}</h1>
            <p className="text-muted-foreground text-sm max-w-2xl mx-auto mt-1.5">{p('subtitle')}</p>
          </div>

          {/* Circular Revenue Ecosystem */}
          <div className="flex-1 flex flex-col py-1">
            <h2 className="font-heading font-bold text-sm mb-1.5 uppercase tracking-wide text-center" style={{ color: '#6d28d9' }}>{p('section_title')}</h2>
            <div className="mb-1.5"><GradientDivider /></div>
            <CircularEcosystem stakeholders={p('stakeholders')} labels={labels} hubSub={p('hub_sub')} />
          </div>

          {/* CTA */}
          <div>
            <GradientDivider />
            <div className="text-center py-2">
              <p className="font-heading font-bold text-lg">{p('cta')}</p>
              <div className="flex items-center justify-center gap-1.5 mt-1 text-xs">
                <span className="font-semibold" style={{ color: '#6d28d9' }}>Visit:</span>
                <a href="https://dutyboost.com" target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-2" style={{ color: '#6d28d9' }}>dutyboost.com</a>
              </div>
            </div>
          </div>

          {/* Legal footer */}
          <div className="text-center pb-1">
            <p className="text-sm text-muted-foreground">{p('legal').replace('{{year}}', new Date().getFullYear())}</p>
          </div>

        </div>
      </div>
    </div>
  );
}