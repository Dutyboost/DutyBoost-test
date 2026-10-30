// Cruise & Local Retail Partner calculator — UI strings (7 languages).
// Shared by src/pages/CruisePartnerCalculator.jsx (variant "cruise") and
// src/pages/PortDowntownCalculator.jsx (variant "local"). The variants differ in
// badge, intro, CTA label and the store-card fields: a cruise partner models one
// terminal's ship calls, a local retailer the travellers arriving in their market,
// by sea and by air. Every other label is shared.
// Brand terms (DutyBoost, DutyCredit) stay untranslated.

export const cruiseCalculatorStrings = {
  en: {
    title: "Your own store calculator",
    stores: "Your stores",
    addStore: "Add store",
    info: "DutyBoost pre-activates travellers before they reach you. The only cost is a {fee}% platform fee on DutyBoost-validated transactions, and traveller discounts follow the DutyCredit tiers: {min}%–{max}% depending on the basket, capped at the qualifying spend limit.",
    ctaTitle: "Want these numbers validated for your estate?",
    ctaDesc: "Send us your store list and we will model the full picture with you.",
    disclaimer:
      "Illustrative model. Traffic figures are indicative 2025 market starting points, not audited statistics; values are shown in the selected currency and recalculate as you edit. The platform fee applies only to DutyBoost-validated transactions.",
    variants: {
      cruise: {
        badge: "Cruise Line Partners",
        title: "Your fleet's onboard retail calculator",
        intro:
          "Built around the number that matters most: more purchases on board. Enter your fleet, the passengers each ship carries, the length of a cruise and the number of shops per ship — DutyBoost pre-activates those passengers before they sail, so they board with purchase intent, and you pay only on the sales it brings.",
        focus:
          "On average, 60% of cruise passengers leave the shops on board without buying. DutyBoost does not depend on more passengers — it converts a share of those non-purchasers into incremental sales, and you pay only on the sales it brings.",
        ctaLabel: "Apply as a cruise line partner",
        ctaTitle: "Want these numbers validated for your fleet?",
        ctaDesc: "Send us your fleet and itinerary profile and we will model the full picture with you.",
        disclaimer:
          "Illustrative model. Figures are shown in the selected currency and recalculate as you edit. The platform fee applies only to DutyBoost-validated transactions.",
        totalsStores: "Shops modelled",
        totalsSub: "Every ship in the fleet and its onboard shops, added together.",
        card: {
          fleet: "Ships in fleet",
          shopsPerShip: "Avg. shops per ship",
          passengersPerShip: "Avg. passengers per ship",
          cruiseDays: "Cruise length (nights)",
          passRate: "Percentage of passengers not entering the shops",
          kTraffic: "Not entering the shops / yr",
        },
        totalsTraffic: "Not entering all shops / yr",
      },
      coach: {
        badge: "Touring Coach Partners",
        title: "Your fleet's travel retail calculator",
        intro:
          "Built around the revenue your passengers already generate at the stops they make. Enter your coaches, the trips each one runs a year and the passengers it carries — DutyBoost pre-activates those passengers before they travel, so they reach participating retailers with purchase intent, and you pay only on the sales it brings.",
        focus:
          "Every touring coach trip passes retail: service areas, terminals and drop-off points where travellers already wait. DutyBoost turns a share of that footfall into incremental sales, and you pay only on the sales it brings.",
        ctaLabel: "Apply as a touring coach partner",
        ctaTitle: "Want these numbers validated for your fleet?",
        ctaDesc: "Send us your fleet and route profile and we will model the full picture with you.",
        disclaimer:
          "Illustrative model. Figures are shown in the selected currency and recalculate as you edit. The platform fee applies only to DutyBoost-validated transactions.",
        totalsStores: "Coaches modelled",
        totalsSub: "Every coach in the fleet and its trips, added together.",
        totalsPassengers: "Passengers carried / yr",
        totalsTraffic: "Passing a retail point / yr",
        card: {
          coaches: "Coaches in fleet",
          tripsPerCoach: "Trips per coach / yr",
          passengersPerCoach: "Avg. passengers per coach",
          passRate: "Share of passengers passing a retail point",
          kTraffic: "Passing a retail point / yr",
          kPassengers: "Passengers carried / yr",
        },
      },
      seaport: {
        badge: "Sea Port Retailers",
        intro:
          "Cruise passengers step ashore with hours to spend and a DutyCredit already in hand. DutyBoost pre-activates them before they arrive, so more of them walk into your terminal store with purchase intent — every extra visit is incremental, and you pay only on the sales it brings.",
        ctaLabel: "Apply as a sea port retailer",
      },
      local: {
        badge: "Local Retailers",
        intro:
          "Every traveller who arrives in your market — by cruise ship or by plane — ends up down town, and that is where your store is. DutyBoost pre-activates them before they arrive, so they reach your till with purchase intent; the model starts from your market's indicative arrivals, by sea and by air, and you pay only on the sales it brings.",
        ctaLabel: "Apply as a local retailer",
        totalsPassengers: "Travellers arriving / yr",
        card: {
          arrivals: "Travellers arriving in your market / yr",
          passRate: "Share passing your store",
          kArrivals: "Travellers arriving / yr",
        },
      },
    },
    card: {
      storeCount: "Number of stores",
      countryPlaceholder: "Country / island",
      countryEmpty: "No match in the list — keep typing to enter it as new",
      terminalPlaceholder: "Cruise ship terminal",
      terminalPlaceholderNoCountry: "Pick a country first",
      terminalEmpty: "No terminal listed for this country — type yours to add it",
      terminalEmptyNoCountry: "Pick a country or island to see its cruise ship terminals",
      passengers: "Cruise passengers per call",
      calls: "Port calls per year",
      passRate: "Passengers passing your store",
      activation: "DutyCredit pre-activation",
      redemption: "Redemption rate",
      basket: "Average basket",
      kPassengers: "Cruise passengers / yr",
      kTraffic: "Passing your store / yr",
      kBaskets: "Incremental baskets / yr",
      kSales: "Incremental sales / yr",
      kNet: "Retailer net / yr",
    },
    totals: {
      title: "Your full picture",
      sub: "All stores added together, across every island, country or region.",
      stores: "Stores modelled",
      passengers: "Cruise passengers / yr",
      traffic: "Passing all stores / yr",
      baskets: "Incremental baskets / yr",
      sales: "Incremental sales / yr",
      discounts: "Traveller discounts funded",
      fee: "Platform fee ({fee}%) / yr",
      net: "Retailer net / yr",
    },
    regions: {
      title: "By country or island",
      sub: "Pick each store's country above and every island, country or territory is totalled separately.",
      country: "Country / island",
      stores: "Stores",
      baskets: "Baskets / yr",
      sales: "Incremental sales / yr",
      net: "Retailer net / yr",
    },
  },

  nl: {
    title: "Uw eigen winkelcalculator",
    stores: "Uw winkels",
    addStore: "Winkel toevoegen",
    info: "DutyBoost activeert reizigers vooraf, voordat ze bij u aankomen. De enige kosten zijn een platformvergoeding van {fee}% op door DutyBoost gevalideerde transacties; de reizigerskorting volgt de DutyCredit-tiers: {min}%–{max}% afhankelijk van het bestelbedrag, met een maximum aan het bestedingsplafond.",
    ctaTitle: "Wilt u deze cijfers laten valideren voor uw hele portefeuille?",
    ctaDesc: "Stuur ons uw winkellijst en we modelleren samen het volledige beeld.",
    disclaimer:
      "Illustratief model. Verkeerscijfers zijn indicatieve marktstartpunten voor 2025, geen gecontroleerde statistieken; bedragen worden weergegeven in de gekozen valuta en herberekend terwijl u invoert. De platformvergoeding geldt alleen voor door DutyBoost gevalideerde transacties.",
    variants: {
      cruise: {
        badge: "Cruisemaatschappij-partners",
        title: "Calculator voor boordverkoop van uw vloot",
        intro:
          "Gebouwd rond het cijfer dat het meest telt: meer aankopen aan boord. Vul uw vloot in, het aantal passagiers per schip, de duur van een cruise en het aantal winkels per schip — DutyBoost activeert die passagiers voordat ze afvaren, zodat zij met koopintentie aan boord gaan, en u betaalt alleen op de omzet die het oplevert.",
        focus:
          "Gemiddeld verlaat 60% van de cruisepassagiers de boordwinkels zonder iets te kopen. DutyBoost is niet afhankelijk van meer passagiers — het converteert een deel van die niet-kopers naar incrementele omzet, en u betaalt alleen op de omzet die het oplevert.",
        ctaLabel: "Aanmelden als cruisemaatschappij",
        ctaTitle: "Wilt u deze cijfers laten valideren voor uw vloot?",
        ctaDesc: "Stuur ons uw vloot- en routeprofiel en we modelleren samen het volledige beeld.",
        disclaimer:
          "Illustratief model. Bedragen worden weergegeven in de gekozen valuta en herberekend terwijl u invoert. De platformvergoeding geldt alleen voor door DutyBoost gevalideerde transacties.",
        totalsStores: "Gemodelleerde winkels",
        totalsSub: "Elk schip van de vloot en de bijbehorende boordwinkels, samengeteld.",
        card: {
          fleet: "Schepen in de vloot",
          shopsPerShip: "Gem. winkels per schip",
          passengersPerShip: "Gem. passagiers per schip",
          cruiseDays: "Duur van de cruise (nachten)",
          passRate: "Percentage passagiers dat de winkels niet binnenkomt",
          kTraffic: "Betreedt de winkels niet / jaar",
        },
        totalsTraffic: "Betreedt geen enkele winkel / jaar",
      },
      coach: {
        badge: "Touringcar-partners",
        title: "Calculator voor reisretail van uw vloot",
        intro:
          "Gebouwd rond de omzet die uw passagiers al opbrengen bij de stops onderweg. Vul uw bussen in, het aantal ritten per bus per jaar en het aantal passagiers per bus — DutyBoost activeert die passagiers voordat ze reizen, zodat ze met koopintentie bij deelnemende retailers aankomen, en u betaalt alleen op de omzet die het oplevert.",
        focus:
          "Elke touringcarrit komt langs retail: verzorgingsplaatsen, terminals en uitstapplaatsen waar reizigers toch al wachten. DutyBoost zet een deel van die passanten om in incrementele omzet, en u betaalt alleen op de omzet die het oplevert.",
        ctaLabel: "Aanmelden als touringcarpartner",
        ctaTitle: "Wilt u deze cijfers laten valideren voor uw vloot?",
        ctaDesc: "Stuur ons uw vloot- en routeprofiel en we modelleren samen het volledige beeld.",
        disclaimer:
          "Illustratief model. Bedragen worden weergegeven in de gekozen valuta en herberekend terwijl u invoert. De platformvergoeding geldt alleen voor door DutyBoost gevalideerde transacties.",
        totalsStores: "Gemodelleerde bussen",
        totalsSub: "Elke bus van de vloot en de bijbehorende ritten, samengeteld.",
        totalsPassengers: "Vervoerde passagiers / jaar",
        totalsTraffic: "Langs een verkooppunt / jaar",
        card: {
          coaches: "Bussen in de vloot",
          tripsPerCoach: "Ritten per bus / jaar",
          passengersPerCoach: "Gem. passagiers per bus",
          passRate: "Deel van de passagiers dat langs een verkooppunt komt",
          kTraffic: "Langs een verkooppunt / jaar",
          kPassengers: "Vervoerde passagiers / jaar",
        },
      },
      seaport: {
        badge: "Zeehavenretailers",
        intro:
          "Cruisepassagiers gaan aan wal met uren te besteden en een DutyCredit al in handen. DutyBoost activeert hen vóór aankomst, zodat meer van hen met koopintentie uw terminalwinkel binnenstappen — elk extra bezoek is incrementeel, en u betaalt alleen op de omzet die het oplevert.",
        ctaLabel: "Aanmelden als zeehavenretailer",
      },
      local: {
        badge: "Lokale retailers",
        intro:
          "Elke reiziger die in uw markt aankomt — per cruiseschip of per vliegtuig — komt uiteindelijk in de binnenstad, en daar zit uw winkel. DutyBoost activeert hen voordat ze aankomen, zodat ze met koopintentie aan uw kassa staan; het model vertrekt van de indicatieve aankomsten in uw markt, over zee en door de lucht, en u betaalt alleen op de omzet die het oplevert.",
        ctaLabel: "Aanmelden als lokale retailer",
        totalsPassengers: "Aankomende reizigers / jaar",
        card: {
          arrivals: "Reizigers die in uw markt aankomen / jaar",
          passRate: "Aandeel dat uw winkel passeert",
          kArrivals: "Aankomende reizigers / jaar",
        },
      },
    },
    card: {
      storeCount: "Aantal winkels",
      countryPlaceholder: "Land / eiland",
      countryEmpty: "Geen resultaat in de lijst — blijf typen om het als nieuw toe te voegen",
      terminalPlaceholder: "Cruiseterminal",
      terminalPlaceholderNoCountry: "Kies eerst een land",
      terminalEmpty: "Geen terminal voor dit land in de lijst — typ de uwe om toe te voegen",
      terminalEmptyNoCountry: "Kies een land of eiland om de cruiseterminals te zien",
      passengers: "Cruisepassagiers per aanloop",
      calls: "Havenaanlopen per jaar",
      passRate: "Passagiers die langs uw winkel komen",
      activation: "DutyCredit pre-activatie",
      redemption: "Inwisselpercentage",
      basket: "Gemiddeld bestelbedrag",
      kPassengers: "Cruisepassagiers / jaar",
      kTraffic: "Langs uw winkel / jaar",
      kBaskets: "Extra aankopen / jaar",
      kSales: "Extra omzet / jaar",
      kNet: "Netto voor retailer / jaar",
    },
    totals: {
      title: "Uw volledige beeld",
      sub: "Alle winkels samen, over elk eiland, land of regio.",
      stores: "Gemodelleerde winkels",
      passengers: "Cruisepassagiers / jaar",
      traffic: "Langs alle winkels / jaar",
      baskets: "Extra aankopen / jaar",
      sales: "Extra omzet / jaar",
      discounts: "Gefinancierde reizigerskortingen",
      fee: "Platformvergoeding ({fee}%) / jaar",
      net: "Netto voor retailer / jaar",
    },
    regions: {
      title: "Per land of eiland",
      sub: "Kies hierboven het land van elke winkel; elk eiland, land of gebied wordt apart getotaliseerd.",
      country: "Land / eiland",
      stores: "Winkels",
      baskets: "Aankopen / jaar",
      sales: "Extra omzet / jaar",
      net: "Netto voor retailer / jaar",
    },
  },

  fr: {
    title: "Votre calculateur de magasin",
    stores: "Vos magasins",
    addStore: "Ajouter un magasin",
    info: "DutyBoost pré-active les voyageurs avant qu'ils n'arrivent chez vous. Le seul coût est une commission de plateforme de {fee} % sur les transactions validées par DutyBoost ; la remise voyageur suit les paliers DutyCredit : {min} %–{max} % selon le panier, plafonnée au plafond de dépense éligible.",
    ctaTitle: "Vous souhaitez faire valider ces chiffres pour votre réseau ?",
    ctaDesc: "Envoyez-nous la liste de vos magasins et nous modéliserons ensemble la vue complète.",
    disclaimer:
      "Modèle indicatif. Les chiffres de trafic sont des points de départ indicatifs du marché 2025, et non des statistiques auditées ; les montants sont affichés dans la devise choisie et recalculés au fil de vos saisies. La commission de plateforme ne s'applique qu'aux transactions validées par DutyBoost.",
    variants: {
      cruise: {
        badge: "Compagnies de croisière",
        title: "Calculateur de vente à bord de votre flotte",
        intro:
          "Construit autour du chiffre qui compte le plus : plus d'achats à bord. Saisissez votre flotte, le nombre de passagers par navire, la durée d'une croisière et le nombre de boutiques par navire — DutyBoost pré-active ces passagers avant l'appareillage, afin qu'ils montent à bord avec une intention d'achat, et vous ne payez que sur les ventes générées.",
        focus:
          "En moyenne, 60 % des passagers de croisière quittent les boutiques à bord sans acheter. DutyBoost ne dépend pas d'un surcroît de passagers — il convertit une part de ces non-acheteurs en ventes incrémentales, et vous ne payez que sur les ventes générées.",
        ctaLabel: "Devenir compagnie de croisière partenaire",
        ctaTitle: "Vous souhaitez faire valider ces chiffres pour votre flotte ?",
        ctaDesc: "Envoyez-nous le profil de votre flotte et de vos itinéraires et nous modéliserons ensemble la vue complète.",
        disclaimer:
          "Modèle indicatif. Les montants sont affichés dans la devise choisie et recalculés au fil de vos saisies. La commission de plateforme ne s'applique qu'aux transactions validées par DutyBoost.",
        totalsStores: "Boutiques modélisées",
        totalsSub: "Chaque navire de la flotte et ses boutiques à bord, réunis.",
        card: {
          fleet: "Navires dans la flotte",
          shopsPerShip: "Moy. boutiques par navire",
          passengersPerShip: "Moy. passagers par navire",
          cruiseDays: "Durée de la croisière (nuits)",
          passRate: "Pourcentage de passagers n'entrant pas dans les boutiques",
          kTraffic: "N'entrent pas dans les boutiques / an",
        },
        totalsTraffic: "N'entrent dans aucune boutique / an",
      },
      coach: {
        badge: "Partenaires autocaristes",
        title: "Calculateur de retail voyage de votre flotte",
        intro:
          "Construit autour des revenus que vos passagers génèrent déjà lors des arrêts du circuit. Saisissez vos autocars, le nombre de trajets par autocar et par an et les passagers transportés — DutyBoost active ces passagers avant le départ, afin qu'ils arrivent chez les enseignes partenaires avec une intention d'achat, et vous ne payez que sur les ventes générées.",
        focus:
          "Chaque circuit en autocar passe devant des commerces : aires de service, terminaux et points de dépose où les voyageurs attendent déjà. DutyBoost transforme une part de ce passage en ventes incrémentales, et vous ne payez que sur les ventes générées.",
        ctaLabel: "Candidater comme partenaire autocariste",
        ctaTitle: "Vous souhaitez faire valider ces chiffres pour votre flotte ?",
        ctaDesc: "Envoyez-nous votre flotte et le profil de vos circuits, nous modéliserons ensemble la vue complète.",
        disclaimer:
          "Modèle illustratif. Les montants sont affichés dans la devise choisie et recalculés à chaque saisie. La commission de plateforme ne s'applique qu'aux transactions validées par DutyBoost.",
        totalsStores: "Autocars modélisés",
        totalsSub: "Chaque autocar de la flotte et ses trajets, additionnés.",
        totalsPassengers: "Passagers transportés / an",
        totalsTraffic: "Passages devant un point de vente / an",
        card: {
          coaches: "Autocars dans la flotte",
          tripsPerCoach: "Trajets par autocar / an",
          passengersPerCoach: "Passagers moyens par autocar",
          passRate: "Part des passagers passant un point de vente",
          kTraffic: "Passages devant un point de vente / an",
          kPassengers: "Passagers transportés / an",
        },
      },
      seaport: {
        badge: "Détaillants portuaires",
        intro:
          "Les passagers de croisière débarquent avec des heures à consacrer à leurs achats et un DutyCredit déjà en main. DutyBoost les pré-active avant leur arrivée, afin que davantage d'entre eux entrent dans votre magasin du terminal avec une intention d'achat — chaque visite supplémentaire est incrémentale, et vous ne payez que sur les ventes générées.",
        ctaLabel: "Postuler comme détaillant portuaire",
      },
      local: {
        badge: "Détaillants locaux",
        intro:
          "Chaque voyageur qui arrive sur votre marché — en bateau de croisière ou en avion — finit en centre-ville, et c'est là que se trouve votre magasin. DutyBoost les pré-active avant leur arrivée, afin qu'ils arrivent à votre caisse avec une intention d'achat ; le modèle part des arrivées indicatives de votre marché, par mer et par avion, et vous ne payez que sur les ventes générées.",
        ctaLabel: "Devenir détaillant local",
        totalsPassengers: "Voyageurs arrivant / an",
        card: {
          arrivals: "Voyageurs arrivant sur votre marché / an",
          passRate: "Part passant devant votre magasin",
          kArrivals: "Voyageurs arrivant / an",
        },
      },
    },
    card: {
      storeCount: "Nombre de magasins",
      countryPlaceholder: "Pays / île",
      countryEmpty: "Aucun résultat dans la liste — continuez à taper pour l'ajouter",
      terminalPlaceholder: "Terminal de croisière",
      terminalPlaceholderNoCountry: "Choisissez d'abord un pays",
      terminalEmpty: "Aucun terminal répertorié pour ce pays — saisissez le vôtre pour l'ajouter",
      terminalEmptyNoCountry: "Choisissez un pays ou une île pour voir ses terminaux de croisière",
      passengers: "Passagers de croisière par escale",
      calls: "Escales par an",
      passRate: "Passagers passant devant votre magasin",
      activation: "Pré-activation DutyCredit",
      redemption: "Taux d'utilisation",
      basket: "Panier moyen",
      kPassengers: "Passagers de croisière / an",
      kTraffic: "Devant votre magasin / an",
      kBaskets: "Achats additionnels / an",
      kSales: "Ventes additionnelles / an",
      kNet: "Net pour le détaillant / an",
    },
    totals: {
      title: "Votre vue complète",
      sub: "Tous les magasins réunis, toutes îles, pays ou régions confondus.",
      stores: "Magasins modélisés",
      passengers: "Passagers de croisière / an",
      traffic: "Devant tous les magasins / an",
      baskets: "Achats additionnels / an",
      sales: "Ventes additionnelles / an",
      discounts: "Remises voyageurs financées",
      fee: "Commission de plateforme ({fee} %) / an",
      net: "Net pour le détaillant / an",
    },
    regions: {
      title: "Par pays ou île",
      sub: "Sélectionnez le pays de chaque magasin ci-dessus : chaque île, pays ou territoire est totalisé séparément.",
      country: "Pays / île",
      stores: "Magasins",
      baskets: "Paniers / an",
      sales: "Ventes additionnelles / an",
      net: "Net pour le détaillant / an",
    },
  },

  de: {
    title: "Ihr eigener Filialrechner",
    stores: "Ihre Filialen",
    addStore: "Filiale hinzufügen",
    info: "DutyBoost aktiviert Reisende im Voraus, bevor sie bei Ihnen ankommen. Die einzigen Kosten sind eine Plattformgebühr von {fee} % auf von DutyBoost validierte Transaktionen; der Reisendenrabatt folgt den DutyCredit-Stufen: {min} %–{max} % je nach Warenkorb, begrenzt auf die qualifizierende Ausgabengrenze.",
    ctaTitle: "Möchten Sie diese Zahlen für Ihr gesamtes Portfolio prüfen lassen?",
    ctaDesc: "Senden Sie uns Ihre Filialliste und wir modellieren gemeinsam das Gesamtbild.",
    disclaimer:
      "Illustratives Modell. Verkehrszahlen sind indikative Marktausgangspunkte für 2025, keine geprüften Statistiken; Beträge werden in der gewählten Währung angezeigt und bei Eingaben neu berechnet. Die Plattformgebühr gilt nur für von DutyBoost validierte Transaktionen.",
    variants: {
      cruise: {
        badge: "Kreuzfahrtreedereien",
        title: "Rechner für den Bordverkauf Ihrer Flotte",
        intro:
          "Rund um die Zahl, die am meisten zählt: mehr Käufe an Bord. Geben Sie Ihre Flotte, die Passagiere pro Schiff, die Dauer einer Kreuzfahrt und die Anzahl der Shops pro Schiff ein — DutyBoost aktiviert diese Passagiere vor dem Auslaufen, sodass sie mit Kaufabsicht an Bord gehen, und Sie zahlen nur auf den erzielten Umsatz.",
        focus:
          "Im Durchschnitt verlassen 60 % der Kreuzfahrtpassagiere die Bordshops ohne Kauf. DutyBoost setzt nicht auf mehr Passagiere — es wandelt einen Teil dieser Nichtkäufer in inkrementelle Umsätze um, und Sie zahlen nur auf den erzielten Umsatz.",
        ctaLabel: "Als Kreuzfahrtreederei bewerben",
        ctaTitle: "Möchten Sie diese Zahlen für Ihre Flotte prüfen lassen?",
        ctaDesc: "Senden Sie uns Ihr Flotten- und Routenprofil und wir modellieren gemeinsam das Gesamtbild.",
        disclaimer:
          "Illustratives Modell. Beträge werden in der gewählten Währung angezeigt und bei Eingaben neu berechnet. Die Plattformgebühr gilt nur für von DutyBoost validierte Transaktionen.",
        totalsStores: "Modellierte Shops",
        totalsSub: "Jedes Schiff der Flotte und seine Bordshops, zusammengezählt.",
        card: {
          fleet: "Schiffe in der Flotte",
          shopsPerShip: "Ø Shops pro Schiff",
          passengersPerShip: "Ø Passagiere pro Schiff",
          cruiseDays: "Dauer der Kreuzfahrt (Nächte)",
          passRate: "Prozentsatz der Passagiere, die die Shops nicht betreten",
          kTraffic: "Betreten die Shops nicht / Jahr",
        },
        totalsTraffic: "Betreten keinen Shop / Jahr",
      },
      coach: {
        badge: "Reisebus-Partner",
        title: "Reisetail-Rechner für Ihre Flotte",
        intro:
          "Aufgebaut um den Umsatz, den Ihre Fahrgäste an den Halten unterwegs bereits erzeugen. Geben Sie Ihre Busse, die Fahrten pro Bus und Jahr und die Fahrgäste pro Bus ein — DutyBoost aktiviert diese Fahrgäste vor der Reise, sodass sie mit Kaufabsicht bei teilnehmenden Händlern ankommen, und Sie zahlen nur auf den erzielten Umsatz.",
        focus:
          "Jede Reisebusfahrt kommt an Retail vorbei: Raststätten, Terminals und Ausstiegspunkte, an denen Reisende ohnehin warten. DutyBoost wandelt einen Teil dieser Frequenz in Zusatzumsatz um, und Sie zahlen nur auf den erzielten Umsatz.",
        ctaLabel: "Als Reisebuspartner bewerben",
        ctaTitle: "Möchten Sie diese Zahlen für Ihre Flotte prüfen lassen?",
        ctaDesc: "Senden Sie uns Ihre Flotte und Ihr Streckenprofil, wir modellieren das Gesamtbild gemeinsam.",
        disclaimer:
          "Illustratives Modell. Beträge werden in der gewählten Währung angezeigt und bei jeder Eingabe neu berechnet. Die Plattformgebühr gilt nur für von DutyBoost validierte Transaktionen.",
        totalsStores: "Modellierte Busse",
        totalsSub: "Jeder Bus der Flotte und seine Fahrten, zusammengezählt.",
        totalsPassengers: "Beförderte Fahrgäste / Jahr",
        totalsTraffic: "Am Verkaufspunkt / Jahr",
        card: {
          coaches: "Busse in der Flotte",
          tripsPerCoach: "Fahrten pro Bus / Jahr",
          passengersPerCoach: "Ø Fahrgäste pro Bus",
          passRate: "Anteil der Fahrgäste an einem Verkaufspunkt",
          kTraffic: "Am Verkaufspunkt / Jahr",
          kPassengers: "Beförderte Fahrgäste / Jahr",
        },
      },
      seaport: {
        badge: "Seehafen-Händler",
        intro:
          "Kreuzfahrtpassagiere gehen mit Stunden Zeit und einem DutyCredit in der Hand an Land. DutyBoost aktiviert sie vor ihrer Ankunft, damit mehr von ihnen mit Kaufabsicht in Ihre Terminalfiliale kommen — jeder zusätzliche Besuch ist inkrementell, und Sie zahlen nur auf den Umsatz, den er bringt.",
        ctaLabel: "Als Seehafen-Händler bewerben",
      },
      local: {
        badge: "Lokale Händler",
        intro:
          "Jeder Reisende, der in Ihrem Markt ankommt — per Kreuzfahrtschiff oder per Flugzeug — landet in der Innenstadt, und dort liegt Ihre Filiale. DutyBoost aktiviert sie vor der Ankunft, sodass sie mit Kaufabsicht an Ihre Kasse kommen; das Modell startet mit den indikativen Ankünften Ihres Marktes, über See und über die Luft, und Sie zahlen nur auf den erzielten Umsatz.",
        ctaLabel: "Als lokaler Händler bewerben",
        totalsPassengers: "Ankommende Reisende / Jahr",
        card: {
          arrivals: "Reisende, die in Ihrem Markt ankommen / Jahr",
          passRate: "Anteil, der Ihre Filiale passiert",
          kArrivals: "Ankommende Reisende / Jahr",
        },
      },
    },
    card: {
      storeCount: "Anzahl der Filialen",
      countryPlaceholder: "Land / Insel",
      countryEmpty: "Kein Treffer in der Liste — weiter tippen, um ihn neu anzulegen",
      terminalPlaceholder: "Kreuzfahrtterminal",
      terminalPlaceholderNoCountry: "Zuerst ein Land wählen",
      terminalEmpty: "Für dieses Land ist kein Terminal gelistet — eigenes eintippen",
      terminalEmptyNoCountry: "Land oder Insel wählen, um die Kreuzfahrtterminals zu sehen",
      passengers: "Kreuzfahrtpassagiere pro Anlauf",
      calls: "Hafenanläufe pro Jahr",
      passRate: "Passagiere, die an Ihrer Filiale vorbeikommen",
      activation: "DutyCredit-Voraktivierung",
      redemption: "Einlösequote",
      basket: "Durchschnittlicher Warenkorb",
      kPassengers: "Kreuzfahrtpassagiere / Jahr",
      kTraffic: "An Ihrer Filiale / Jahr",
      kBaskets: "Zusätzliche Käufe / Jahr",
      kSales: "Zusätzlicher Umsatz / Jahr",
      kNet: "Netto für den Händler / Jahr",
    },
    totals: {
      title: "Ihr Gesamtbild",
      sub: "Alle Filialen zusammen, über jede Insel, jedes Land oder jede Region.",
      stores: "Modellierte Filialen",
      passengers: "Kreuzfahrtpassagiere / Jahr",
      traffic: "An allen Filialen / Jahr",
      baskets: "Zusätzliche Käufe / Jahr",
      sales: "Zusätzlicher Umsatz / Jahr",
      discounts: "Finanzierte Reisendenrabatte",
      fee: "Plattformgebühr ({fee} %) / Jahr",
      net: "Netto für den Händler / Jahr",
    },
    regions: {
      title: "Nach Land oder Insel",
      sub: "Wählen Sie oben das Land jeder Filiale — jede Insel, jedes Land oder Gebiet wird separat summiert.",
      country: "Land / Insel",
      stores: "Filialen",
      baskets: "Käufe / Jahr",
      sales: "Zusätzlicher Umsatz / Jahr",
      net: "Netto für den Händler / Jahr",
    },
  },

  es: {
    title: "Su propia calculadora de tienda",
    stores: "Sus tiendas",
    addStore: "Añadir tienda",
    info: "DutyBoost preactiva a los viajeros antes de que lleguen a usted. El único coste es una comisión de plataforma del {fee} % sobre las transacciones validadas por DutyBoost; el descuento para el viajero sigue los tramos DutyCredit: {min} %–{max} % según la cesta, con el límite de gasto cualificado.",
    ctaTitle: "¿Quiere que validemos estas cifras para toda su red?",
    ctaDesc: "Envíenos la lista de sus tiendas y modelaremos juntos la visión completa.",
    disclaimer:
      "Modelo ilustrativo. Las cifras de tráfico son puntos de partida indicativos del mercado de 2025, no estadísticas auditadas; los importes se muestran en la moneda elegida y se recalculan al editar. La comisión de plataforma solo se aplica a transacciones validadas por DutyBoost.",
    variants: {
      cruise: {
        badge: "Navieras de cruceros",
        title: "Calculadora de venta a bordo de su flota",
        intro:
          "Construido en torno al número que más importa: más compras a bordo. Introduzca su flota, los pasajeros que transporta cada buque, la duración de un crucero y el número de tiendas por buque — DutyBoost preactiva a esos pasajeros antes de zarpar, para que embarquen con intención de compra, y solo paga por las ventas que genera.",
        focus:
          "De media, el 60 % de los pasajeros de crucero salen de las tiendas a bordo sin comprar. DutyBoost no depende de más pasajeros — convierte una parte de esos no compradores en ventas incrementales, y solo paga por las ventas que genera.",
        ctaLabel: "Solicitar ser naviera de cruceros",
        ctaTitle: "¿Quiere que validemos estas cifras para su flota?",
        ctaDesc: "Envíenos el perfil de su flota y sus itinerarios y modelaremos juntos la visión completa.",
        disclaimer:
          "Modelo ilustrativo. Los importes se muestran en la moneda elegida y se recalculan al editar. La comisión de plataforma solo se aplica a transacciones validadas por DutyBoost.",
        totalsStores: "Tiendas modeladas",
        totalsSub: "Cada buque de la flota y sus tiendas a bordo, sumados.",
        card: {
          fleet: "Buques en la flota",
          shopsPerShip: "Media de tiendas por buque",
          passengersPerShip: "Media de pasajeros por buque",
          cruiseDays: "Duración del crucero (noches)",
          passRate: "Porcentaje de pasajeros que no entran en las tiendas",
          kTraffic: "No entran en las tiendas / año",
        },
        totalsTraffic: "No entran en ninguna tienda / año",
      },
      coach: {
        badge: "Socios de autocares",
        title: "Calculadora de retail de viaje de su flota",
        intro:
          "Construida en torno a los ingresos que sus pasajeros ya generan en las paradas del recorrido. Introduzca sus autocares, los viajes por autocar y año y los pasajeros que transporta — DutyBoost activa a esos pasajeros antes de viajar, de modo que llegan a los comercios participantes con intención de compra, y solo paga por las ventas que genera.",
        focus:
          "Todo circuito en autocar pasa por retail: áreas de servicio, terminales y puntos de bajada donde los viajeros ya esperan. DutyBoost convierte parte de ese paso en ventas incrementales, y solo paga por las ventas que genera.",
        ctaLabel: "Solicitar como socio de autocares",
        ctaTitle: "¿Desea validar estas cifras para su flota?",
        ctaDesc: "Envíenos su flota y el perfil de sus rutas y modelaremos juntos la imagen completa.",
        disclaimer:
          "Modelo ilustrativo. Los importes se muestran en la divisa seleccionada y se recalculan al editar. La comisión de plataforma se aplica solo a transacciones validadas por DutyBoost.",
        totalsStores: "Autocares modelados",
        totalsSub: "Todos los autocares de la flota y sus viajes, sumados.",
        totalsPassengers: "Pasajeros transportados / año",
        totalsTraffic: "Pasan por un punto de venta / año",
        card: {
          coaches: "Autocares en la flota",
          tripsPerCoach: "Viajes por autocar / año",
          passengersPerCoach: "Pasajeros medios por autocar",
          passRate: "Porcentaje de pasajeros que pasan por un punto de venta",
          kTraffic: "Pasan por un punto de venta / año",
          kPassengers: "Pasajeros transportados / año",
        },
      },
      seaport: {
        badge: "Minoristas de puerto marítimo",
        intro:
          "Los pasajeros de crucero bajan a tierra con horas por delante y un DutyCredit ya en la mano. DutyBoost los preactiva antes de que lleguen, para que más de ellos entren en su tienda del terminal con intención de compra: cada visita adicional es incremental y solo paga por las ventas que genera.",
        ctaLabel: "Solicitar como minorista de puerto marítimo",
      },
      local: {
        badge: "Minoristas locales",
        intro:
          "Todo viajero que llega a su mercado — en crucero o en avión — acaba en el centro urbano, y ahí está su tienda. DutyBoost los preactiva antes de que lleguen, para que lleguen a su caja con intención de compra; el modelo parte de las llegadas indicativas de su mercado, por mar y por aire, y solo paga por las ventas que genera.",
        ctaLabel: "Solicitar como minorista local",
        totalsPassengers: "Viajeros que llegan / año",
        card: {
          arrivals: "Viajeros que llegan a su mercado / año",
          passRate: "Proporción que pasa por su tienda",
          kArrivals: "Viajeros que llegan / año",
        },
      },
    },
    card: {
      storeCount: "Número de tiendas",
      countryPlaceholder: "País / isla",
      countryEmpty: "Sin coincidencias en la lista — siga escribiendo para añadirlo",
      terminalPlaceholder: "Terminal de cruceros",
      terminalPlaceholderNoCountry: "Elija primero un país",
      terminalEmpty: "No hay terminales listados para este país — escriba el suyo para añadirlo",
      terminalEmptyNoCountry: "Elija un país o isla para ver sus terminales de cruceros",
      passengers: "Pasajeros de crucero por escala",
      calls: "Escalas por año",
      passRate: "Pasajeros que pasan por su tienda",
      activation: "Preactivación DutyCredit",
      redemption: "Tasa de canje",
      basket: "Cesta media",
      kPassengers: "Pasajeros de crucero / año",
      kTraffic: "Por su tienda / año",
      kBaskets: "Compras incrementales / año",
      kSales: "Ventas incrementales / año",
      kNet: "Neto para el minorista / año",
    },
    totals: {
      title: "Su visión completa",
      sub: "Todas las tiendas juntas, en cada isla, país o región.",
      stores: "Tiendas modeladas",
      passengers: "Pasajeros de crucero / año",
      traffic: "Por todas las tiendas / año",
      baskets: "Compras incrementales / año",
      sales: "Ventas incrementales / año",
      discounts: "Descuentos financiados al viajero",
      fee: "Comisión de plataforma ({fee} %) / año",
      net: "Neto para el minorista / año",
    },
    regions: {
      title: "Por país o isla",
      sub: "Seleccione arriba el país de cada tienda: cada isla, país o territorio se totaliza por separado.",
      country: "País / isla",
      stores: "Tiendas",
      baskets: "Compras / año",
      sales: "Ventas incrementales / año",
      net: "Neto para el minorista / año",
    },
  },

  it: {
    title: "Il tuo calcolatore per il punto vendita",
    stores: "I tuoi punti vendita",
    addStore: "Aggiungi punto vendita",
    info: "DutyBoost pre-attiva i viaggiatori prima che arrivino da te. L'unico costo è una commissione di piattaforma del {fee} % sulle transazioni validate da DutyBoost; lo sconto per il viaggiatore segue le fasce DutyCredit: {min} %–{max} % in base allo scontrino, con il limite di spesa idonea.",
    ctaTitle: "Vuoi che validiamo questi numeri per tutta la tua rete?",
    ctaDesc: "Inviaci l'elenco dei tuoi punti vendita e modelleremo insieme il quadro completo.",
    disclaimer:
      "Modello illustrativo. I dati di traffico sono punti di partenza indicativi del mercato 2025, non statistiche certificate; gli importi sono mostrati nella valuta scelta e si ricalcolano mentre modifichi i valori. La commissione di piattaforma si applica solo alle transazioni validate da DutyBoost.",
    variants: {
      cruise: {
        badge: "Compagnie di crociera",
        title: "Calcolatore delle vendite a bordo della tua flotta",
        intro:
          "Costruito attorno al numero che conta di più: più acquisti a bordo. Inserisci la tua flotta, i passeggeri per nave, la durata di una crociera e il numero di negozi per nave — DutyBoost pre-attiva quei passeggeri prima della partenza, così salgono a bordo con intenzione d'acquisto, e paghi solo sulle vendite che genera.",
        focus:
          "In media, il 60% dei passeggeri di crociera esce dai negozi di bordo senza acquistare. DutyBoost non dipende da più passeggeri — converte una quota di quei non acquirenti in vendite incrementali, e paghi solo sulle vendite che genera.",
        ctaLabel: "Candidati come compagnia di crociera",
        ctaTitle: "Vuoi che validiamo questi numeri per la tua flotta?",
        ctaDesc: "Inviaci il profilo della tua flotta e degli itinerari e modelleremo insieme il quadro completo.",
        disclaimer:
          "Modello illustrativo. Gli importi sono mostrati nella valuta scelta e si ricalcolano mentre modifichi i valori. La commissione di piattaforma si applica solo alle transazioni validate da DutyBoost.",
        totalsStores: "Negozi modellati",
        totalsSub: "Ogni nave della flotta e i suoi negozi di bordo, sommati.",
        card: {
          fleet: "Navi della flotta",
          shopsPerShip: "Media negozi per nave",
          passengersPerShip: "Media passeggeri per nave",
          cruiseDays: "Durata della crociera (notti)",
          passRate: "Percentuale di passeggeri che non entrano nei negozi",
          kTraffic: "Non entrano nei negozi / anno",
        },
        totalsTraffic: "Non entrano in nessun negozio / anno",
      },
      coach: {
        badge: "Partner pullman",
        title: "Calcolatore retail di viaggio della sua flotta",
        intro:
          "Costruito intorno ai ricavi che i suoi passeggeri già generano durante le soste. Inserisca i pullman, i viaggi per pullman all'anno e i passeggeri trasportati — DutyBoost attiva questi passeggeri prima della partenza, così arrivano nei punti vendita aderenti con intenzione d'acquisto, e paga solo sulle vendite generate.",
        focus:
          "Ogni viaggio in pullman passa davanti al retail: aree di servizio, terminal e punti di discesa dove i viaggiatori attendono comunque. DutyBoost trasforma una parte di questo passaggio in vendite incrementali, e paga solo sulle vendite generate.",
        ctaLabel: "Candidarsi come partner pullman",
        ctaTitle: "Vuole validare questi numeri per la sua flotta?",
        ctaDesc: "Ci invii la flotta e il profilo dei percorsi e modelleremo insieme il quadro completo.",
        disclaimer:
          "Modello illustrativo. Gli importi sono mostrati nella valuta selezionata e ricalcolati mentre modifica. La commissione di piattaforma si applica solo alle transazioni validate da DutyBoost.",
        totalsStores: "Pullman modellati",
        totalsSub: "Ogni pullman della flotta e i suoi viaggi, sommati.",
        totalsPassengers: "Passeggeri trasportati / anno",
        totalsTraffic: "Passaggi da un punto vendita / anno",
        card: {
          coaches: "Pullman in flotta",
          tripsPerCoach: "Viaggi per pullman / anno",
          passengersPerCoach: "Passeggeri medi per pullman",
          passRate: "Quota di passeggeri che passa da un punto vendita",
          kTraffic: "Passaggi da un punto vendita / anno",
          kPassengers: "Passeggeri trasportati / anno",
        },
      },
      seaport: {
        badge: "Rivenditori portuali",
        intro:
          "I passeggeri delle crociere sbarcano con ore a disposizione e un DutyCredit già in mano. DutyBoost li pre-attiva prima dell'arrivo, così più di loro entrano nel tuo negozio del terminal con intenzione di acquisto: ogni visita in più è incrementale e paghi solo sulle vendite che genera.",
        ctaLabel: "Candidati come rivenditore portuale",
      },
      local: {
        badge: "Rivenditori locali",
        intro:
          "Ogni viaggiatore che arriva nel tuo mercato — in crociera o in aereo — finisce in centro città, ed è lì che si trova il tuo negozio. DutyBoost li pre-attiva prima dell'arrivo, così arrivano alla tua cassa con intenzione d'acquisto; il modello parte dagli arrivi indicativi del tuo mercato, via mare e via aria, e paghi solo sulle vendite che genera.",
        ctaLabel: "Candidati come rivenditore locale",
        totalsPassengers: "Viaggiatori in arrivo / anno",
        card: {
          arrivals: "Viaggiatori in arrivo nel tuo mercato / anno",
          passRate: "Quota che passa davanti al tuo negozio",
          kArrivals: "Viaggiatori in arrivo / anno",
        },
      },
    },
    card: {
      storeCount: "Numero di punti vendita",
      countryPlaceholder: "Paese / isola",
      countryEmpty: "Nessuna corrispondenza — continua a digitare per aggiungerlo",
      terminalPlaceholder: "Terminal crociere",
      terminalPlaceholderNoCountry: "Scegli prima un paese",
      terminalEmpty: "Nessun terminal elencato per questo paese — digita il tuo per aggiungerlo",
      terminalEmptyNoCountry: "Scegli un paese o un'isola per vedere i terminal crociere",
      passengers: "Passeggeri crociera per scalo",
      calls: "Scali portuali all'anno",
      passRate: "Passeggeri che passano davanti al tuo punto vendita",
      activation: "Pre-attivazione DutyCredit",
      redemption: "Tasso di riscatto",
      basket: "Scontrino medio",
      kPassengers: "Passeggeri crociera / anno",
      kTraffic: "Davanti al tuo punto vendita / anno",
      kBaskets: "Acquisti incrementali / anno",
      kSales: "Vendite incrementali / anno",
      kNet: "Netto per il rivenditore / anno",
    },
    totals: {
      title: "Il tuo quadro completo",
      sub: "Tutti i punti vendita insieme, in ogni isola, paese o regione.",
      stores: "Punti vendita modellati",
      passengers: "Passeggeri crociera / anno",
      traffic: "Davanti a tutti i punti vendita / anno",
      baskets: "Acquisti incrementali / anno",
      sales: "Vendite incrementali / anno",
      discounts: "Sconti viaggiatore finanziati",
      fee: "Commissione di piattaforma ({fee} %) / anno",
      net: "Netto per il rivenditore / anno",
    },
    regions: {
      title: "Per paese o isola",
      sub: "Seleziona sopra il paese di ogni punto vendita: ogni isola, paese o territorio è totalizzato separatamente.",
      country: "Paese / isola",
      stores: "Punti vendita",
      baskets: "Acquisti / anno",
      sales: "Vendite incrementali / anno",
      net: "Netto per il rivenditore / anno",
    },
  },

  pt: {
    title: "A sua calculadora de loja",
    stores: "As suas lojas",
    addStore: "Adicionar loja",
    info: "A DutyBoost pré-ativa os viajantes antes de chegarem até si. O único custo é uma comissão de plataforma de {fee} % sobre transações validadas pela DutyBoost; o desconto para o viajante segue os escalões DutyCredit: {min} %–{max} % conforme o cabaz, limitado ao teto de gasto elegível.",
    ctaTitle: "Quer validar estes números para toda a sua rede?",
    ctaDesc: "Envie-nos a lista das suas lojas e modelamos juntos o quadro completo.",
    disclaimer:
      "Modelo ilustrativo. Os valores de tráfego são pontos de partida indicativos do mercado de 2025, não estatísticas auditadas; os montantes são apresentados na moeda escolhida e recalculados à medida que edita. A comissão de plataforma aplica-se apenas a transações validadas pela DutyBoost.",
    variants: {
      cruise: {
        badge: "Companhias de cruzeiros",
        title: "Calculadora de vendas a bordo da sua frota",
        intro:
          "Construído em torno do número que mais importa: mais compras a bordo. Introduza a sua frota, os passageiros por navio, a duração de um cruzeiro e o número de lojas por navio — a DutyBoost pré-ativa esses passageiros antes da partida, para que embarquem com intenção de compra, e paga apenas sobre as vendas que gera.",
        focus:
          "Em média, 60% dos passageiros de cruzeiro saem das lojas a bordo sem comprar. A DutyBoost não depende de mais passageiros — converte uma parte desses não-compradores em vendas incrementais, e paga apenas sobre as vendas que gera.",
        ctaLabel: "Candidatar-se como companhia de cruzeiros",
        ctaTitle: "Quer validar estes números para a sua frota?",
        ctaDesc: "Envie-nos o perfil da sua frota e dos itinerários e modelamos juntos o quadro completo.",
        disclaimer:
          "Modelo ilustrativo. Os montantes são apresentados na moeda escolhida e recalculados à medida que edita. A comissão de plataforma aplica-se apenas a transações validadas pela DutyBoost.",
        totalsStores: "Lojas modeladas",
        totalsSub: "Cada navio da frota e as suas lojas a bordo, somados.",
        card: {
          fleet: "Navios na frota",
          shopsPerShip: "Média de lojas por navio",
          passengersPerShip: "Média de passageiros por navio",
          cruiseDays: "Duração do cruzeiro (noites)",
          passRate: "Percentagem de passageiros que não entram nas lojas",
          kTraffic: "Não entram nas lojas / ano",
        },
        totalsTraffic: "Não entram em nenhuma loja / ano",
      },
      coach: {
        badge: "Parceiros de autocarros",
        title: "Calculadora de retalho de viagem da sua frota",
        intro:
          "Construída em torno da receita que os seus passageiros já geram nas paragens do percurso. Introduza os autocarros, as viagens por autocarro e ano e os passageiros transportados — a DutyBoost ativa esses passageiros antes da viagem, para que cheguem às lojas aderentes com intenção de compra, e paga apenas sobre as vendas geradas.",
        focus:
          "Cada viagem em autocarro passa pelo retalho: áreas de serviço, terminais e pontos de desembarque onde os viajantes já esperam. A DutyBoost converte parte dessa passagem em vendas incrementais, e paga apenas sobre as vendas geradas.",
        ctaLabel: "Candidatar-se como parceiro de autocarros",
        ctaTitle: "Pretende validar estes números para a sua frota?",
        ctaDesc: "Envie-nos a sua frota e o perfil dos percursos e modelamos o quadro completo consigo.",
        disclaimer:
          "Modelo ilustrativo. Os valores são apresentados na moeda selecionada e recalculados à medida que edita. A comissão de plataforma aplica-se apenas a transações validadas pela DutyBoost.",
        totalsStores: "Autocarros modelados",
        totalsSub: "Todos os autocarros da frota e as suas viagens, somados.",
        totalsPassengers: "Passageiros transportados / ano",
        totalsTraffic: "Passam por um ponto de venda / ano",
        card: {
          coaches: "Autocarros na frota",
          tripsPerCoach: "Viagens por autocarro / ano",
          passengersPerCoach: "Passageiros médios por autocarro",
          passRate: "Percentagem de passageiros que passam por um ponto de venda",
          kTraffic: "Passam por um ponto de venda / ano",
          kPassengers: "Passageiros transportados / ano",
        },
      },
      seaport: {
        badge: "Retalhistas portuários",
        intro:
          "Os passageiros de cruzeiro desembarcam com horas para gastar e um DutyCredit já na mão. A DutyBoost pré-ativa-os antes de chegarem, para que mais deles entrem na sua loja do terminal com intenção de compra — cada visita adicional é incremental e paga apenas sobre as vendas que gera.",
        ctaLabel: "Candidatar-me como retalhista portuário",
      },
      local: {
        badge: "Retalhistas locais",
        intro:
          "Todos os viajantes que chegam ao seu mercado — de cruzeiro ou de avião — acabam no centro urbano, e é aí que está a sua loja. A DutyBoost pré-ativa-os antes da chegada, para que cheguem à sua caixa com intenção de compra; o modelo parte das chegadas indicativas do seu mercado, por mar e por ar, e paga apenas sobre as vendas que gera.",
        ctaLabel: "Candidatar-se como retalhista local",
        totalsPassengers: "Viajantes a chegar / ano",
        card: {
          arrivals: "Viajantes que chegam ao seu mercado / ano",
          passRate: "Proporção que passa pela sua loja",
          kArrivals: "Viajantes a chegar / ano",
        },
      },
    },
    card: {
      storeCount: "Número de lojas",
      countryPlaceholder: "País / ilha",
      countryEmpty: "Sem resultados na lista — continue a escrever para adicionar",
      terminalPlaceholder: "Terminal de cruzeiros",
      terminalPlaceholderNoCountry: "Escolha primeiro um país",
      terminalEmpty: "Nenhum terminal listado para este país — escreva o seu para adicionar",
      terminalEmptyNoCountry: "Escolha um país ou ilha para ver os terminais de cruzeiros",
      passengers: "Passageiros de cruzeiro por escala",
      calls: "Escalas por ano",
      passRate: "Passageiros que passam pela sua loja",
      activation: "Pré-ativação DutyCredit",
      redemption: "Taxa de resgate",
      basket: "Cabaz médio",
      kPassengers: "Passageiros de cruzeiro / ano",
      kTraffic: "Pela sua loja / ano",
      kBaskets: "Compras incrementais / ano",
      kSales: "Vendas incrementais / ano",
      kNet: "Líquido para o retalhista / ano",
    },
    totals: {
      title: "O seu quadro completo",
      sub: "Todas as lojas somadas, em cada ilha, país ou região.",
      stores: "Lojas modeladas",
      passengers: "Passageiros de cruzeiro / ano",
      traffic: "Por todas as lojas / ano",
      baskets: "Compras incrementais / ano",
      sales: "Vendas incrementais / ano",
      discounts: "Descontos financiados ao viajante",
      fee: "Comissão de plataforma ({fee} %) / ano",
      net: "Líquido para o retalhista / ano",
    },
    regions: {
      title: "Por país ou ilha",
      sub: "Selecione acima o país de cada loja: cada ilha, país ou território é totalizado separadamente.",
      country: "País / ilha",
      stores: "Lojas",
      baskets: "Compras / ano",
      sales: "Vendas incrementais / ano",
      net: "Líquido para o retalhista / ano",
    },
  },
};

// ── Motorway & railway channels ───────────────────────────────────────────────
// Two more retail channels run on the same local-retailer model: the partner
// enters the footfall passing its sites, the share that stops at the store, the
// activation and redemption rates and the basket. Only the wording differs, so
// these variants and the channel-selection labels are merged in here instead of
// being repeated inside every language block above.
const EXTRA_CHANNELS = {
  en: {
    labels: { airport: "Airport Retailer", seaport: "Sea Port Retailer", cruise: "Cruise Line Retailer", motorway: "Motorway Retailer", rail: "Railway Retailer" },
    hint: "Select the retail channel you operate in",
    motorway: {
      badge: "Motorway Retailers",
      title: "Your motorway retail calculator",
      intro:
        "Drivers and coach passengers pull in with time to spare, and DutyBoost has already pre-activated them before they arrive. Enter the footfall passing your service areas and the share that stops at your store — you pay only on the sales it brings.",
      focus:
        "Most traffic on the motorway never walks into the shop. DutyBoost does not depend on more cars — it converts a share of the travellers already passing into incremental sales, and you pay only on the sales it brings.",
      ctaLabel: "Apply as a motorway retailer",
      totalsStores: "Stores modelled",
      totalsPassengers: "Travellers passing / yr",
      totalsTraffic: "Stopping at your stores / yr",
      card: {
        arrivals: "Travellers passing your service areas / yr",
        passRate: "Share stopping at your store",
        kArrivals: "Travellers passing / yr",
      },
    },
    rail: {
      badge: "Railway Retailers",
      title: "Your station retail calculator",
      intro:
        "Rail passengers wait on the platform with time to spend, and DutyBoost has already pre-activated them. Enter the footfall through your stations and the share that passes your store — you pay only on the sales it brings.",
      focus:
        "Most rail passengers walk past the shops without buying. DutyBoost does not depend on more passengers — it converts a share of the travellers already passing into incremental sales, and you pay only on the sales it brings.",
      ctaLabel: "Apply as a railway retailer",
      totalsStores: "Stores modelled",
      totalsPassengers: "Passengers through your stations / yr",
      totalsTraffic: "Passing your stores / yr",
      card: {
        arrivals: "Passengers through your stations / yr",
        passRate: "Share passing your store",
        kArrivals: "Passengers through / yr",
      },
    },
  },
  nl: {
    labels: { airport: "Luchthavenretailer", seaport: "Zeehavenretailer", cruise: "Cruisemaatschappij", motorway: "Snelwegretailer", rail: "Spoorwegretailer" },
    hint: "Kies het verkoopkanaal waarin u actief bent",
    motorway: {
      badge: "Snelwegretailers",
      title: "Uw rekenhulp voor snelwegretail",
      intro:
        "Automobilisten en touringcarpassagiers stoppen met tijd over, en DutyBoost heeft hen al vóór aankomst geactiveerd. Vul het aantal reizigers dat langs uw verzorgingsplaatsen komt en het deel dat uw winkel binnenloopt in — u betaalt alleen over de omzet die het oplevert.",
      focus:
        "De meeste reizigers op de snelweg komen nooit in de winkel. DutyBoost is niet afhankelijk van meer auto's — het zet een deel van de reizigers die al langskomen om in extra omzet, en u betaalt alleen over die omzet.",
      ctaLabel: "Aanmelden als snelwegretailer",
      totalsStores: "Gemodelleerde winkels",
      totalsPassengers: "Reizigers die langskomen / jaar",
      totalsTraffic: "Stoppen bij uw winkels / jaar",
      card: {
        arrivals: "Reizigers langs uw verzorgingsplaatsen / jaar",
        passRate: "Deel dat uw winkel binnenloopt",
        kArrivals: "Reizigers die langskomen / jaar",
      },
    },
    rail: {
      badge: "Spoorwegretailers",
      title: "Uw rekenhulp voor stationsretail",
      intro:
        "Treinreizigers wachten op het perron met tijd om te besteden, en DutyBoost heeft hen al geactiveerd. Vul het aantal reizigers door uw stations en het deel dat uw winkel passeert in — u betaalt alleen over de omzet die het oplevert.",
      focus:
        "De meeste treinreizigers lopen langs de winkels zonder te kopen. DutyBoost is niet afhankelijk van meer reizigers — het zet een deel van hen om in extra omzet, en u betaalt alleen over die omzet.",
      ctaLabel: "Aanmelden als spoorwegretailer",
      totalsStores: "Gemodelleerde winkels",
      totalsPassengers: "Reizigers door uw stations / jaar",
      totalsTraffic: "Passeren uw winkels / jaar",
      card: {
        arrivals: "Reizigers door uw stations / jaar",
        passRate: "Deel dat uw winkel passeert",
        kArrivals: "Reizigers door uw stations / jaar",
      },
    },
  },
  fr: {
    labels: { airport: "Détaillant aéroportuaire", seaport: "Détaillant portuaire", cruise: "Compagnie de croisière", motorway: "Détaillant d'autoroute", rail: "Détaillant ferroviaire" },
    hint: "Sélectionnez le canal de vente dans lequel vous opérez",
    motorway: {
      badge: "Détaillants d'autoroute",
      title: "Votre calculateur pour les aires de service",
      intro:
        "Les automobilistes et les passagers de cars s'arrêtent avec du temps devant eux, et DutyBoost les a déjà pré-activés avant leur arrivée. Saisissez la fréquentation devant vos aires de service et la part qui s'arrête dans votre magasin — vous ne payez que sur les ventes générées.",
      focus:
        "La majorité du trafic autoroutier n'entre jamais dans la boutique. DutyBoost ne dépend pas de plus de voitures — il convertit une part des voyageurs déjà présents en ventes incrémentales, et vous ne payez que sur ces ventes.",
      ctaLabel: "Candidater comme détaillant d'autoroute",
      totalsStores: "Magasins modélisés",
      totalsPassengers: "Voyageurs de passage / an",
      totalsTraffic: "S'arrêtent dans vos magasins / an",
      card: {
        arrivals: "Voyageurs devant vos aires de service / an",
        passRate: "Part s'arrêtant dans votre magasin",
        kArrivals: "Voyageurs de passage / an",
      },
    },
    rail: {
      badge: "Détaillants ferroviaires",
      title: "Votre calculateur pour les gares",
      intro:
        "Les voyageurs attendent sur le quai avec du temps à dépenser, et DutyBoost les a déjà pré-activés. Saisissez la fréquentation de vos gares et la part qui passe devant votre magasin — vous ne payez que sur les ventes générées.",
      focus:
        "La plupart des voyageurs passent devant les boutiques sans acheter. DutyBoost ne dépend pas de plus de voyageurs — il convertit une part de ceux qui passent déjà en ventes incrémentales, et vous ne payez que sur ces ventes.",
      ctaLabel: "Candidater comme détaillant ferroviaire",
      totalsStores: "Magasins modélisés",
      totalsPassengers: "Voyageurs dans vos gares / an",
      totalsTraffic: "Passent devant vos magasins / an",
      card: {
        arrivals: "Voyageurs dans vos gares / an",
        passRate: "Part passant devant votre magasin",
        kArrivals: "Voyageurs dans vos gares / an",
      },
    },
  },
  de: {
    labels: { airport: "Flughafen-Händler", seaport: "Seehafen-Händler", cruise: "Kreuzfahrtreederei", motorway: "Autobahn-Händler", rail: "Bahnhofs-Händler" },
    hint: "Wählen Sie den Vertriebskanal, in dem Sie tätig sind",
    motorway: {
      badge: "Autobahn-Händler",
      title: "Ihr Rechner für die Autobahn",
      intro:
        "Autofahrer und Reisebusgäste halten mit Zeit im Gepäck an, und DutyBoost hat sie bereits vor der Ankunft voraktiviert. Geben Sie die Frequenz an Ihren Raststätten und den Anteil, der in Ihrem Geschäft hält, ein — Sie zahlen nur auf die erzielten Umsätze.",
      focus:
        "Der Großteil des Verkehrs auf der Autobahn betritt das Geschäft nie. DutyBoost ist nicht auf mehr Autos angewiesen — es wandelt einen Teil der bereits vorbeikommenden Reisenden in Zusatzumsatz um, und Sie zahlen nur darauf.",
      ctaLabel: "Als Autobahn-Händler bewerben",
      totalsStores: "Modellierte Geschäfte",
      totalsPassengers: "Vorbeireisende / Jahr",
      totalsTraffic: "Halten an Ihren Geschäften / Jahr",
      card: {
        arrivals: "Reisende an Ihren Raststätten / Jahr",
        passRate: "Anteil, der in Ihrem Geschäft hält",
        kArrivals: "Vorbeireisende / Jahr",
      },
    },
    rail: {
      badge: "Bahnhofs-Händler",
      title: "Ihr Rechner für Bahnhöfe",
      intro:
        "Bahnreisende warten mit Zeit zum Ausgeben auf dem Bahnsteig, und DutyBoost hat sie bereits voraktiviert. Geben Sie die Frequenz an Ihren Bahnhöfen und den Anteil, der an Ihrem Geschäft vorbeikommt, ein — Sie zahlen nur auf die erzielten Umsätze.",
      focus:
        "Die meisten Bahnreisenden gehen an den Geschäften vorbei, ohne zu kaufen. DutyBoost ist nicht auf mehr Reisende angewiesen — es wandelt einen Teil der Vorbeikommenden in Zusatzumsatz um, und Sie zahlen nur darauf.",
      ctaLabel: "Als Bahnhofs-Händler bewerben",
      totalsStores: "Modellierte Geschäfte",
      totalsPassengers: "Reisende an Ihren Bahnhöfen / Jahr",
      totalsTraffic: "Passieren Ihre Geschäfte / Jahr",
      card: {
        arrivals: "Reisende an Ihren Bahnhöfen / Jahr",
        passRate: "Anteil, der an Ihrem Geschäft vorbeikommt",
        kArrivals: "Reisende an Ihren Bahnhöfen / Jahr",
      },
    },
  },
  es: {
    labels: { airport: "Minorista de aeropuerto", seaport: "Minorista de puerto marítimo", cruise: "Naviera de cruceros", motorway: "Minorista de autopista", rail: "Minorista ferroviario" },
    hint: "Seleccione el canal minorista en el que opera",
    motorway: {
      badge: "Minoristas de autopista",
      title: "Su calculadora para áreas de servicio",
      intro:
        "Los conductores y los pasajeros de autocar se detienen con tiempo de sobra, y DutyBoost ya los ha preactivado antes de que lleguen. Introduzca el tráfico que pasa por sus áreas de servicio y la proporción que se detiene en su tienda: solo paga sobre las ventas que genere.",
      focus:
        "La mayor parte del tráfico de la autopista nunca entra en la tienda. DutyBoost no depende de más coches: convierte una parte de los pasajeros que ya pasan en ventas incrementales, y solo paga sobre esas ventas.",
      ctaLabel: "Solicitar como minorista de autopista",
      totalsStores: "Tiendas modeladas",
      totalsPassengers: "Pasajeros en tránsito / año",
      totalsTraffic: "Se detienen en sus tiendas / año",
      card: {
        arrivals: "Pasajeros que pasan por sus áreas de servicio / año",
        passRate: "Proporción que se detiene en su tienda",
        kArrivals: "Pasajeros en tránsito / año",
      },
    },
    rail: {
      badge: "Minoristas ferroviarios",
      title: "Su calculadora para estaciones",
      intro:
        "Los pasajeros de tren esperan en el andén con tiempo para gastar, y DutyBoost ya los ha preactivado. Introduzca el tráfico de sus estaciones y la proporción que pasa por su tienda: solo paga sobre las ventas que genere.",
      focus:
        "La mayoría de los pasajeros de tren pasan por delante de las tiendas sin comprar. DutyBoost no depende de más pasajeros: convierte una parte de los que ya pasan en ventas incrementales, y solo paga sobre esas ventas.",
      ctaLabel: "Solicitar como minorista ferroviario",
      totalsStores: "Tiendas modeladas",
      totalsPassengers: "Pasajeros en sus estaciones / año",
      totalsTraffic: "Pasan por sus tiendas / año",
      card: {
        arrivals: "Pasajeros en sus estaciones / año",
        passRate: "Proporción que pasa por su tienda",
        kArrivals: "Pasajeros en sus estaciones / año",
      },
    },
  },
  it: {
    labels: { airport: "Rivenditore aeroportuale", seaport: "Rivenditore portuale", cruise: "Compagnia di crociere", motorway: "Rivenditore autostradale", rail: "Rivenditore ferroviario" },
    hint: "Selezioni il canale retail in cui opera",
    motorway: {
      badge: "Rivenditori autostradali",
      title: "Il suo calcolatore per le aree di servizio",
      intro:
        "Automobilisti e passeggeri di pullman si fermano con tempo a disposizione, e DutyBoost li ha già pre-attivati prima dell'arrivo. Inserisca il traffico che passa dalle sue aree di servizio e la quota che si ferma nel suo punto vendita: paga solo sulle vendite generate.",
      focus:
        "La maggior parte del traffico autostradale non entra mai nel punto vendita. DutyBoost non dipende da più auto: converte una quota dei viaggiatori già in transito in vendite incrementali, e paga solo su quelle vendite.",
      ctaLabel: "Candidarsi come rivenditore autostradale",
      totalsStores: "Punti vendita modellati",
      totalsPassengers: "Viaggiatori in transito / anno",
      totalsTraffic: "Si fermano nei suoi punti vendita / anno",
      card: {
        arrivals: "Viaggiatori dalle sue aree di servizio / anno",
        passRate: "Quota che si ferma nel suo punto vendita",
        kArrivals: "Viaggiatori in transito / anno",
      },
    },
    rail: {
      badge: "Rivenditori ferroviari",
      title: "Il suo calcolatore per le stazioni",
      intro:
        "I viaggiatori attendono in banchina con tempo da spendere, e DutyBoost li ha già pre-attivati. Inserisca il traffico delle sue stazioni e la quota che passa dal suo punto vendita: paga solo sulle vendite generate.",
      focus:
        "La maggior parte dei viaggiatori passa davanti ai negozi senza acquistare. DutyBoost non dipende da più viaggiatori: converte una quota di chi passa già in vendite incrementali, e paga solo su quelle vendite.",
      ctaLabel: "Candidarsi come rivenditore ferroviario",
      totalsStores: "Punti vendita modellati",
      totalsPassengers: "Viaggiatori nelle sue stazioni / anno",
      totalsTraffic: "Passano dai suoi punti vendita / anno",
      card: {
        arrivals: "Viaggiatori nelle sue stazioni / anno",
        passRate: "Quota che passa dal suo punto vendita",
        kArrivals: "Viaggiatori nelle sue stazioni / anno",
      },
    },
  },
  pt: {
    labels: { airport: "Retalhista de aeroporto", seaport: "Retalhista portuário", cruise: "Companhia de cruzeiros", motorway: "Retalhista de autoestrada", rail: "Retalhista ferroviário" },
    hint: "Selecione o canal de retalho em que opera",
    motorway: {
      badge: "Retalhistas de autoestrada",
      title: "A sua calculadora para áreas de serviço",
      intro:
        "Automobilistas e passageiros de autocarros param com tempo de sobra, e a DutyBoost já os pré-ativou antes da chegada. Introduza o tráfego que passa pelas suas áreas de serviço e a proporção que para na sua loja — paga apenas sobre as vendas que gera.",
      focus:
        "A maior parte do tráfego da autoestrada nunca entra na loja. A DutyBoost não depende de mais carros — converte uma parte dos viajantes que já passam em vendas incrementais, e paga apenas sobre essas vendas.",
      ctaLabel: "Candidatar-me como retalhista de autoestrada",
      totalsStores: "Lojas modeladas",
      totalsPassengers: "Viajantes em trânsito / ano",
      totalsTraffic: "Param nas suas lojas / ano",
      card: {
        arrivals: "Viajantes que passam nas suas áreas de serviço / ano",
        passRate: "Proporção que para na sua loja",
        kArrivals: "Viajantes em trânsito / ano",
      },
    },
    rail: {
      badge: "Retalhistas ferroviários",
      title: "A sua calculadora para estações",
      intro:
        "Os passageiros esperam na plataforma com tempo para gastar, e a DutyBoost já os pré-ativou. Introduza o tráfego das suas estações e a proporção que passa pela sua loja — paga apenas sobre as vendas que gera.",
      focus:
        "A maioria dos passageiros passa pelas lojas sem comprar. A DutyBoost não depende de mais passageiros — converte uma parte dos que já passam em vendas incrementais, e paga apenas sobre essas vendas.",
      ctaLabel: "Candidatar-me como retalhista ferroviário",
      totalsStores: "Lojas modeladas",
      totalsPassengers: "Passageiros nas suas estações / ano",
      totalsTraffic: "Passam pelas suas lojas / ano",
      card: {
        arrivals: "Passageiros nas suas estações / ano",
        passRate: "Proporção que passa pela sua loja",
        kArrivals: "Passageiros nas suas estações / ano",
      },
    },
  },
};

Object.entries(EXTRA_CHANNELS).forEach(([code, cfg]) => {
  const block = cruiseCalculatorStrings[code];
  if (!block) return;
  block.variants.motorway = cfg.motorway;
  block.variants.rail = cfg.rail;
  block.channels = { labels: cfg.labels, hint: cfg.hint };
});

export function getCruiseCalculatorStrings(lang) {
  const code = (lang || "en").split("-")[0];
  return cruiseCalculatorStrings[code] || cruiseCalculatorStrings.en;
}