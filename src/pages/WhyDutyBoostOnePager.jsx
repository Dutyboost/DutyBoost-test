import { useState, useRef, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Printer, ArrowLeft, Plane, ShoppingBag, Store, Cpu, Check } from "lucide-react";
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
    subtitle: "One platform connects four participants. Each one contributes to a measurable increase in airport retail sales — and each one benefits.",
    section_title: "The Value for Each Stakeholder",
    stakeholders: [
      {
        icon: "plane",
        title: "Travel Partners",
        tagline: "Turn every booking into a new revenue stream.",
        bullets: [
          "Earn ongoing commission on every traveller you refer, for the lifetime of each DutyCredit redeemed.",
          "Add value to every booking with a complimentary airport shopping credit — no extra effort, no cost to you.",
          "Strengthen customer loyalty by giving travellers a tangible reason to book through you.",
        ],
      },
      {
        icon: "traveller",
        title: "Travellers",
        tagline: "A complimentary shopping credit, just for travelling.",
        bullets: [
          "Receive a DutyBoost credit you can spend at airport retailers on the day you fly.",
          "No app to download, no membership fee — scan a QR code and save instantly at checkout.",
          "Real discounts on real products, from brands you already love.",
        ],
      },
      {
        icon: "store",
        title: "Airport Retailers",
        tagline: "More qualified shoppers, larger baskets, same fixed fee.",
        bullets: [
          "Capture travellers who've built purchase intent well before arriving at the terminal.",
          "Pay only a fixed 2.5% platform fee — and only when a redemption actually happens.",
          "No hardware replacement, no operational disruption — integrate through your existing POS.",
        ],
      },
      {
        icon: "cpu",
        title: "POS Vendors",
        tagline: "Extend your platform with measurable commercial value.",
        bullets: [
          "A single integration makes DutyBoost available across your entire airport retail customer base.",
          "Earn recurring partner revenue on every redemption processed by retailers you onboard.",
          "Strengthen customer relationships by giving retailers a compelling reason to stay on your platform.",
        ],
      },
    ],
    cta: "One platform. Four winners. Every participant creates value.",
    legal: "© {{year}} DutyBoost B.V. — The Travel Retail Conversion Layer. Figures are illustrative.",
  },
  nl: {
    badge: "Waarom DutyBoost",
    headline: "Waarom DutyBoost voor elke belanghebbende",
    subtitle: "Eén platform verbindt vier deelnemers. Elke deelnemer draagt bij aan een meetbare toename van luchthavenverkoop — en profiteert ervan.",
    section_title: "De waarde voor elke belanghebbende",
    stakeholders: [
      {
        icon: "plane",
        title: "Travel Partners",
        tagline: "Verander elke boeking in een nieuwe inkomstenstroom.",
        bullets: [
          "Verdien doorlopende commissie op elke reiziger die u doorverwijst, gedurende de levensduur van elke ingeloste DutyCredit.",
          "Voeg waarde toe aan elke boeking met een gratis luchthaven-winkeltegoed — geen extra moeite, geen kosten voor u.",
          "Versterk klantenloyaliteit door reizigers een tastbare reden te geven om via u te boeken.",
        ],
      },
      {
        icon: "traveller",
        title: "Reizigers",
        tagline: "Een gratis winkeltegoed, gewoon omdat u reist.",
        bullets: [
          "Ontvang een DutyBoost-tegoed dat u kunt besteden bij luchthavenwinkels op de dag dat u vliegt.",
          "Geen app om te downloaden, geen lidmaatschap — scan een QR-code en bespaar direct aan de kassa.",
          "Echte kortingen op echte producten, van merken die u al kent.",
        ],
      },
      {
        icon: "store",
        title: "Luchthavenwinkeliers",
        tagline: "Meer gekwalificeerde kopers, grotere manden, zelfde vaste vergoeding.",
        bullets: [
          "Bereik reizigers die lang voor aankomst in de terminal koopintentie hebben opgebouwd.",
          "Betaal alleen een vaste platformvergoeding van 2,5% — en alleen als er daadwerkelijk wordt ingelost.",
          "Geen hardware-vervanging, geen operationele verstoring — integreer via uw bestaande POS.",
        ],
      },
      {
        icon: "cpu",
        title: "POS-leveranciers",
        tagline: "Breid uw platform uit met meetbare commerciële waarde.",
        bullets: [
          "Eén integratie maakt DutyBoost beschikbaar over uw hele luchthaven-klantbase.",
          "Verdien terugkerende partnerinkomsten bij elke inning verwerkt door winkeliers die u aanbrengt.",
          "Versterk klantrelaties door winkeliers een dwingende reden te geven om op uw platform te blijven.",
        ],
      },
    ],
    cta: "Eén platform. Vier winnaars. Elke deelnemer creëert waarde.",
    legal: "© {{year}} DutyBoost B.V. — The Travel Retail Conversion Layer. Cijfers zijn illustratief.",
  },
  es: {
    badge: "Por qué DutyBoost",
    headline: "Por qué DutyBoost para cada participante",
    subtitle: "Una plataforma conecta a cuatro participantes. Cada uno contribuye a un aumento medible de las ventas del comercio aeroportuario — y cada uno se beneficia.",
    section_title: "El valor para cada participante",
    stakeholders: [
      {
        icon: "plane",
        title: "Socios de viaje",
        tagline: "Convierte cada reserva en una nueva fuente de ingresos.",
        bullets: [
          "Gana una comisión continua por cada viajero que refieres, durante toda la vida de cada DutyCredit redimido.",
          "Añade valor a cada reserva con un crédito de compra en aeropuerto gratuito — sin esfuerzo extra, sin coste para ti.",
          "Refuerza la fidelidad del cliente dando a los viajeros una razón tangible para reservar contigo.",
        ],
      },
      {
        icon: "traveller",
        title: "Viajeros",
        tagline: "Un crédito de compra gratuito, solo por viajar.",
        bullets: [
          "Recibe un crédito DutyBoost que puedes gastar en los minoristas del aeropuerto el día que vuelas.",
          "Sin app que descargar, sin cuota de membresía — escanea un código QR y ahorra al instante en caja.",
          "Descuentos reales en productos reales, de marcas que ya conoces.",
        ],
      },
      {
        icon: "store",
        title: "Minoristas de aeropuerto",
        tagline: "Más compradores cualificados, cestas más grandes, misma comisión fija.",
        bullets: [
          "Captura viajeros que han construido intención de compra mucho antes de llegar a la terminal.",
          "Paga solo una comisión de plataforma fija del 2,5% — y solo cuando ocurre una redención.",
          "Sin sustitución de hardware, sin interrupción operativa — integra a través de tu POS existente.",
        ],
      },
      {
        icon: "cpu",
        title: "Proveedores POS",
        tagline: "Amplía tu plataforma con valor comercial medible.",
        bullets: [
          "Una única integración hace que DutyBoost esté disponible en toda tu base de clientes minoristas de aeropuerto.",
          "Gana ingresos recurrentes de socio en cada redención procesada por minoristas que tú incorporas.",
          "Refuerza las relaciones con los clientes dando a los minoristas una razón de peso para quedarse en tu plataforma.",
        ],
      },
    ],
    cta: "Una plataforma. Cuatro ganadores. Cada participante crea valor.",
    legal: "© {{year}} DutyBoost B.V. — The Travel Retail Conversion Layer. Las cifras son ilustrativas.",
  },
  fr: {
    badge: "Pourquoi DutyBoost",
    headline: "Pourquoi DutyBoost pour chaque partie prenante",
    subtitle: "Une plateforme relie quatre participants. Chacun contribue à une augmentation mesurable des ventes du commerce aéroportuaire — et chacun en bénéficie.",
    section_title: "La valeur pour chaque partie prenante",
    stakeholders: [
      {
        icon: "plane",
        title: "Partenaires de voyage",
        tagline: "Transformez chaque réservation en une nouvelle source de revenus.",
        bullets: [
          "Gagnez une commission continue sur chaque voyageur que vous référez, pendant toute la durée de vie de chaque DutyCredit remboursé.",
          "Ajoutez de la valeur à chaque réservation avec un crédit d'achat en aéroport gratuit — sans effort supplémentaire, sans coût pour vous.",
          "Renforcez la fidélité client en donnant aux voyageurs une raison tangible de réserver chez vous.",
        ],
      },
      {
        icon: "traveller",
        title: "Voyageurs",
        tagline: "Un crédit d'achat gratuit, juste pour voyager.",
        bullets: [
          "Recevez un crédit DutyBoost que vous pouvez dépenser chez les détaillants de l'aéroport le jour de votre vol.",
          "Pas d'application à télécharger, pas d'abonnement — scannez un QR code et économisez instantanément à la caisse.",
          "De vraies remises sur de vrais produits, de marques que vous connaissez déjà.",
        ],
      },
      {
        icon: "store",
        title: "Détaillants d'aéroport",
        tagline: "Plus d'acheteurs qualifiés, paniers plus gros, même commission fixe.",
        bullets: [
          "Captez des voyageurs qui ont construit leur intention d'achat bien avant d'arriver au terminal.",
          "Payez seulement une commission de plateforme fixe de 2,5 % — et seulement lorsqu'un remboursement a réellement lieu.",
          "Pas de remplacement de matériel, pas de perturbation opérationnelle — intégrez via votre POS existant.",
        ],
      },
      {
        icon: "cpu",
        title: "Fournisseurs POS",
        tagline: "Étendez votre plateforme avec une valeur commerciale mesurable.",
        bullets: [
          "Une seule intégration rend DutyBoost disponible sur toute votre base de clients détaillants d'aéroport.",
          "Gagnez des revenus récurrents de partenaire sur chaque remboursement traité par des détaillants que vous avez intégrés.",
          "Renforcez les relations clients en donnant aux détaillants une raison convaincante de rester sur votre plateforme.",
        ],
      },
    ],
    cta: "Une plateforme. Quatre gagnants. Chaque participant crée de la valeur.",
    legal: "© {{year}} DutyBoost B.V. — The Travel Retail Conversion Layer. Les chiffres sont indicatifs.",
  },
  de: {
    badge: "Warum DutyBoost",
    headline: "Warum DutyBoost für jede Interessengruppe",
    subtitle: "Eine Plattform verbindet vier Teilnehmer. Jeder trägt zu einer messbaren Steigerung des Flughafen-Einzelhandelsumsatzes bei — und jeder profitiert davon.",
    section_title: "Der Wert für jede Interessengruppe",
    stakeholders: [
      {
        icon: "plane",
        title: "Reisepartner",
        tagline: "Verwandeln Sie jede Buchung in eine neue Einnahmequelle.",
        bullets: [
          "Verdienen Sie fortlaufende Provision für jeden Reisenden, den Sie vermitteln, über die gesamte Lebensdauer jedes eingelösten DutyCredits.",
          "Fügen Sie jeder Buchung Mehrwert hinzu mit einem kostenlosen Einkaufsguthaben am Flughafen — ohne zusätzlichen Aufwand, ohne Kosten für Sie.",
          "Stärken Sie die Kundenloyalität, indem Sie Reisenden einen greifbaren Grund geben, bei Ihnen zu buchen.",
        ],
      },
      {
        icon: "traveller",
        title: "Reisende",
        tagline: "Ein kostenloses Einkaufsguthaben, einfach zum Reisen.",
        bullets: [
          "Erhalten Sie ein DutyBoost-Guthaben, das Sie am Tag Ihres Fluges bei Flughafenhändlern ausgeben können.",
          "Keine App zum Herunterladen, keine Mitgliedschaft — scannen Sie einen QR-Code und sparen Sie sofort an der Kasse.",
          "Echte Rabatte auf echte Produkte, von Marken, die Sie bereits kennen.",
        ],
      },
      {
        icon: "store",
        title: "Flughafenhändler",
        tagline: "Mehr qualifizierte Käufer, größere Körbe, gleiche feste Gebühr.",
        bullets: [
          "Erreichen Sie Reisende, die lange vor dem Eintreffen im Terminal Kaufabsichten aufgebaut haben.",
          "Zahlen Sie nur eine feste Plattformgebühr von 2,5 % — und nur, wenn eine Einlösung tatsächlich stattfindet.",
          "Kein Hardware-Austausch, keine Betriebsstörung — integrieren Sie über Ihr bestehendes POS.",
        ],
      },
      {
        icon: "cpu",
        title: "POS-Anbieter",
        tagline: "Erweitern Sie Ihre Plattform um messbaren kommerziellen Wert.",
        bullets: [
          "Eine einzige Integration macht DutyBoost über Ihre gesamte Flughafenhandels-Kundenbasis verfügbar.",
          "Verdienen Sie wiederkehrende Partner-Einnahmen bei jeder Einlösung, die von Händlern verarbeitet wird, die Sie onboarden.",
          "Stärken Sie Kundenbeziehungen, indem Sie Händlern einen überzeugenden Grund geben, auf Ihrer Plattform zu bleiben.",
        ],
      },
    ],
    cta: "Eine Plattform. Vier Gewinner. Jeder Teilnehmer schafft Wert.",
    legal: "© {{year}} DutyBoost B.V. — The Travel Retail Conversion Layer. Zahlen sind illustrativ.",
  },
  it: {
    badge: "Perché DutyBoost",
    headline: "Perché DutyBoost per ogni stakeholder",
    subtitle: "Una piattaforma collega quattro partecipanti. Ciascuno contribuisce a un aumento misurabile delle vendite del commercio aeroportuale — e ciascuno ne trae beneficio.",
    section_title: "Il valore per ogni stakeholder",
    stakeholders: [
      {
        icon: "plane",
        title: "Partner di viaggio",
        tagline: "Trasforma ogni prenotazione in una nuova fonte di entrate.",
        bullets: [
          "Guadagna una commissione continua per ogni viaggiatore che referenzi, per l'intera durata di ogni DutyCredit riscattato.",
          "Aggiungi valore a ogni prenotazione con un credito di acquisto in aeroporto gratuito — senza sforzo extra, senza costi per te.",
          "Rinforza la fedeltà del cliente dando ai viaggiatori un motivo tangibile per prenotare con te.",
        ],
      },
      {
        icon: "traveller",
        title: "Viaggiatori",
        tagline: "Un credito di acquisto gratuito, solo per viaggiare.",
        bullets: [
          "Ricevi un credito DutyBoost che puoi spendere presso i rivenditori aeroportuali il giorno del volo.",
          "Nessuna app da scaricare, nessun abbonamento — scansiona un QR code e risparmia subito alla cassa.",
          "Sconti reali su prodotti reali, di marchi che già conosci.",
        ],
      },
      {
        icon: "store",
        title: "Rivenditori aeroportuali",
        tagline: "Più acquirenti qualificati, carrelli più grandi, stessa commissione fissa.",
        bullets: [
          "Cattura viaggiatori che hanno costruito l'intenzione d'acquisto molto prima di arrivare al terminal.",
          "Paga solo una commissione di piattaforma fissa del 2,5% — e solo quando avviene un riscatto.",
          "Nessuna sostituzione hardware, nessuna interruzione operativa — integra tramite il tuo POS esistente.",
        ],
      },
      {
        icon: "cpu",
        title: "Fornitori POS",
        tagline: "Estendi la tua piattaforma con valore commerciale misurabile.",
        bullets: [
          "Una singola integrazione rende DutyBoost disponibile su tutta la tua base di clienti rivenditori aeroportuali.",
          "Guadagna entrate ricorrenti di partner su ogni riscatto elaborato da rivenditori che tu hai onboardato.",
          "Rinforza le relazioni con i clienti dando ai rivenditori un motivo convincente per restare sulla tua piattaforma.",
        ],
      },
    ],
    cta: "Una piattaforma. Quattro vincitori. Ogni partecipante crea valore.",
    legal: "© {{year}} DutyBoost B.V. — The Travel Retail Conversion Layer. I dati sono illustrativi.",
  },
};

const ICONS = {
  plane: Plane,
  traveller: ShoppingBag,
  store: Store,
  cpu: Cpu,
};

const ACCENTS = {
  plane: { bg: 'hsl(217 90% 95%)', fg: '#1d4ed8', border: 'hsl(217 90% 88%)' },
  traveller: { bg: 'hsl(29 90% 95%)', fg: '#ea580c', border: 'hsl(29 90% 88%)' },
  store: { bg: 'hsl(161 80% 95%)', fg: '#0d9488', border: 'hsl(161 80% 88%)' },
  cpu: { bg: 'hsl(255 90% 95%)', fg: '#6d28d9', border: 'hsl(255 90% 90%)' },
};

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

  return (
    <div className="min-h-screen font-body" style={{ background: 'linear-gradient(135deg, hsl(255 60% 97%) 0%, hsl(243 50% 95%) 50%, hsl(255 55% 96%) 100%)', backgroundAttachment: 'fixed' }}>
      {/* Print toolbar */}
      <div className="print:hidden sticky top-0 z-50 bg-white border-b border-border px-6 py-3 flex items-center justify-between">
        <Link to="/">
          <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" /> {t('common.back')}
          </button>
        </Link>
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
            <h1 className="text-lg font-heading font-bold leading-tight">{p('headline')}</h1>
            <p className="text-muted-foreground text-xs max-w-2xl mx-auto mt-1">{p('subtitle')}</p>
          </div>

          {/* Stakeholder grid */}
          <div className="flex-1 flex flex-col py-1">
            <h2 className="font-heading font-bold text-xs mb-1 uppercase tracking-wide text-center" style={{ color: '#6d28d9' }}>{p('section_title')}</h2>
            <div className="mb-1.5"><GradientDivider /></div>
            <div className="grid grid-cols-2 gap-2 flex-1">
              {p('stakeholders').map((st, idx) => {
                const Icon = ICONS[st.icon] || Store;
                const accent = ACCENTS[st.icon] || ACCENTS.cpu;
                return (
                  <div key={st.title} className="rounded-lg border p-3 flex flex-col" style={{ background: accent.bg, borderColor: accent.border }}>
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgba(255,255,255,0.7)' }}>
                        <Icon className="w-5 h-5" style={{ color: accent.fg }} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-400 leading-none">{idx + 1}.</p>
                        <h3 className="font-heading font-bold text-sm leading-tight">{st.title}</h3>
                      </div>
                    </div>
                    <p className="font-semibold text-xs mb-1.5" style={{ color: accent.fg }}>{st.tagline}</p>
                    <ul className="space-y-1">
                      {st.bullets.map((b, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-xs text-muted-foreground leading-snug">
                          <Check className="w-3 h-3 shrink-0 mt-0.5" style={{ color: accent.fg }} />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA */}
          <div>
            <GradientDivider />
            <div className="text-center py-2">
              <p className="font-heading font-bold text-sm">{p('cta')}</p>
              <div className="flex items-center justify-center gap-1.5 mt-1 text-xs">
                <span className="font-semibold" style={{ color: '#6d28d9' }}>Visit:</span>
                <a href="https://dutyboost.com" target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-2" style={{ color: '#6d28d9' }}>dutyboost.com</a>
              </div>
            </div>
          </div>

          {/* Legal footer */}
          <div className="text-center pb-1">
            <p className="text-xs text-muted-foreground">{p('legal').replace('{{year}}', new Date().getFullYear())}</p>
          </div>

        </div>
      </div>
    </div>
  );
}