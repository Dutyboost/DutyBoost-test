import { Link } from "react-router-dom";
import DutyBoostLogo from "../components/DutyBoostLogo";
import PageFooter from "../components/PageFooter";
import { useTranslation } from "react-i18next";
import EmailLinkText from "../components/EmailLinkText";

const content = {
  en: { title: "Billing & Dispute Policy", updated: "Last updated: April 2026", back: "Back to Home", sections: [
    { h: "1. Platform Fee Model", p: "DutyBoost operates on a performance-based commission model. There are no subscription fees, setup charges, or upfront costs. A platform commission is only applied when a DutyCredit is successfully redeemed by a traveler at a participating Airport Retailer. All fees are exclusive of applicable VAT or local taxes." },
    { h: "2. Retailer Commission Disputes", p: "If an Airport Retailer believes a commission charge was applied in error — for example, in relation to a cancelled booking, a technical malfunction, or a DutyCredit that should have been invalidated — they must raise a dispute within 14 days of the transaction date by emailing billing@dutyboost.com with the transaction ID, DutyCredit code, and supporting evidence. Disputes submitted outside this window may not be accepted." },
    { h: "3. Travel Partner Revenue Share Disputes", p: "Travel Partners who believe their revenue share has been incorrectly calculated must contact billing@dutyboost.com within 14 days of receiving their monthly statement, quoting the relevant booking reference(s) and DutyCredit code(s). We will investigate and, if an error is confirmed, issue a correction in the following billing cycle." },
    { h: "4. Booking Cancellations & Voided DutyCredits", p: "If a traveler's flight booking is cancelled, rescheduled, or refunded after a DutyCredit has been issued, the Travel Partner must notify DutyBoost immediately so the DutyCredit can be voided. If a DutyCredit is redeemed before the void notification is received, DutyBoost will investigate and may waive the associated commission charge if the cancellation is verified. DutyBoost is not responsible for DutyCredits redeemed on the basis of falsified or fraudulently maintained booking data." },
    { h: "5. Fraudulent or Invalid Redemptions", p: "If a DutyCredit was redeemed as a result of fraud, a technical platform error, or a system malfunction, DutyBoost will conduct a formal investigation. Where an error on DutyBoost's part is confirmed, we will issue a full credit or refund of any commission charged in relation to that transaction in the next billing cycle." },
    { h: "6. Chargebacks", p: "Airport Retailers who initiate a chargeback or payment reversal without first following the dispute process outlined above may have their account suspended pending investigation. Chargeback disputes are handled in accordance with the payment method terms and applicable banking regulations." },
    { h: "7. No Refunds on Valid Transactions", p: "Commission charges on valid, correctly processed DutyCredit redemptions are final and non-refundable. Once a DutyCredit has been redeemed and the transaction confirmed, the associated commission is binding on all parties." },
    { h: "8. Invoice Payment Terms", p: "Monthly invoices issued to Airport Retailers are payable within 30 days of the invoice date. Overdue invoices may attract a late payment fee and, if unpaid after 60 days, may result in account suspension and referral to a collections process." },
    { h: "9. Contact", p: "For billing or dispute requests: billing@dutyboost.com · DutyBoost B.V., Amsterdam, the Netherlands." },
  ]},
  nl: { title: "Facturerings- en geschillenbeleid", updated: "Laatst bijgewerkt: april 2026", back: "Terug naar home", sections: [
    { h: "1. Platformkostenmodel", p: "DutyBoost werkt op basis van een prestatiegebonden commissiemodel. Er zijn geen abonnementskosten, installatiekosten of vooruitbetalingen. Commissie wordt alleen toegepast wanneer een DutyCredit succesvol wordt ingewisseld door een reiziger bij een deelnemende Luchthavenwinkel. Alle vergoedingen zijn exclusief BTW." },
    { h: "2. Geschillen over retailercommissie", p: "Als een Luchthavenwinkel meent dat een commissie ten onrechte is toegepast — bijv. bij een geannuleerde boeking of technische storing — moet het geschil binnen 14 dagen na de transactiedatum worden ingediend via billing@dutyboost.com met het transactie-ID, de DutyCredit-code en bewijs. Geschillen buiten deze termijn worden mogelijk niet geaccepteerd." },
    { h: "3. Geschillen over inkomstenaandelen voor Reispartners", p: "Reispartners die menen dat hun inkomstenaandeel onjuist is berekend, moeten binnen 14 dagen na ontvangst van hun maandoverzicht contact opnemen via billing@dutyboost.com met de relevante boekingsreferentie(s) en DutyCredit-code(s). Wij onderzoeken de zaak en geven indien nodig een correctie in de volgende factureringscyclus." },
    { h: "4. Boekingsannuleringen en vernietigde DutyCredits", p: "Als de vluchtboeking van een reiziger wordt geannuleerd, gewijzigd of terugbetaald nadat een DutyCredit is uitgegeven, moet de Reispartner DutyBoost onmiddellijk informeren zodat de DutyCredit kan worden vernietigd. DutyBoost is niet verantwoordelijk voor DutyCredits ingewisseld op basis van vervalste of frauduleus bijgehouden boekingsgegevens." },
    { h: "5. Frauduleuze of ongeldige inwisselingen", p: "Als een DutyCredit is ingewisseld als gevolg van fraude, technische platformfout of systeemstoring, voert DutyBoost een formeel onderzoek uit. Indien een fout aan de kant van DutyBoost wordt bevestigd, wordt een volledige creditnota of terugbetaling verleend in de volgende factureringscyclus." },
    { h: "6. Chargebacks", p: "Luchthavenwinkels die een chargeback of betalingsstornering initiëren zonder eerst de bovenstaande geschillenprocedure te volgen, kunnen hun account worden opgeschort in afwachting van onderzoek." },
    { h: "7. Geen terugbetalingen voor geldige transacties", p: "Commissievergoedingen voor geldige, correct verwerkte DutyCredit-inwisselingen zijn definitief en niet-restitueerbaar." },
    { h: "8. Betalingsvoorwaarden facturen", p: "Maandelijkse facturen aan Luchthavenwinkels zijn betaalbaar binnen 30 dagen na factuurdatum. Achterstallige facturen kunnen leiden tot een vertragingsvergoeding en, na 60 dagen, tot opschorting van het account." },
    { h: "9. Contact", p: "Voor facturerings- of geschillenverzoeken: billing@dutyboost.com · DutyBoost B.V., Amsterdam, Nederland." },
  ]},
  de: { title: "Abrechnungs- und Streitbeilegungsrichtlinie", updated: "Zuletzt aktualisiert: April 2026", back: "Zurück zur Startseite", sections: [
    { h: "1. Plattformgebührenmodell", p: "DutyBoost arbeitet nach einem leistungsbasierten Provisionsmodell. Es fallen keine Abonnementgebühren, Einrichtungskosten oder Vorauszahlungen an. Provisionen werden nur erhoben, wenn ein DutyCredit von einem Reisenden bei einem teilnehmenden Flughafenhändler erfolgreich eingelöst wird. Alle Gebühren verstehen sich zuzüglich MwSt." },
    { h: "2. Händler-Kommissionsstreitigkeiten", p: "Wenn ein Flughafenhändler der Meinung ist, dass eine Provision irrtümlich erhoben wurde — z. B. bei einer stornierten Buchung oder technischen Störung — muss der Streitfall innerhalb von 14 Tagen nach dem Transaktionsdatum über billing@dutyboost.com mit Transaktions-ID, DutyCredit-Code und Belegen eingereicht werden." },
    { h: "3. Reisepartner-Streitigkeiten über Umsatzbeteiligung", p: "Reisepartner, die glauben, dass ihre Umsatzbeteiligung falsch berechnet wurde, müssen billing@dutyboost.com innerhalb von 14 Tagen nach Erhalt ihrer Monatsabrechnung kontaktieren. Wir werden den Fall untersuchen und ggf. eine Korrektur im nächsten Abrechnungszyklus vornehmen." },
    { h: "4. Buchungsstornierungen und ungültige DutyCredits", p: "Wenn die Flugreservierung eines Reisenden storniert, umgebucht oder erstattet wird, nachdem ein DutyCredit ausgestellt wurde, muss der Reisepartner DutyBoost unverzüglich informieren, damit der DutyCredit ungültig gemacht werden kann. DutyBoost ist nicht verantwortlich für DutyCredits, die auf der Grundlage gefälschter Buchungsdaten eingelöst wurden." },
    { h: "5. Betrügerische oder ungültige Einlösungen", p: "Wenn ein DutyCredit aufgrund von Betrug, technischem Fehler oder Systemstörung eingelöst wurde, führt DutyBoost eine formelle Untersuchung durch. Wenn ein Fehler seitens DutyBoost bestätigt wird, wird eine vollständige Gutschrift oder Rückerstattung im nächsten Abrechnungszyklus gewährt." },
    { h: "6. Rückbuchungen (Chargebacks)", p: "Flughafenhändler, die eine Rückbuchung initiieren, ohne zuvor das oben beschriebene Streitbeilegungsverfahren zu befolgen, können ihr Konto bis zur Untersuchung gesperrt bekommen." },
    { h: "7. Keine Rückerstattungen für gültige Transaktionen", p: "Provisionsgebühren für gültige, korrekt verarbeitete DutyCredit-Einlösungen sind endgültig und nicht erstattungsfähig." },
    { h: "8. Rechnungszahlungsbedingungen", p: "Monatliche Rechnungen an Flughafenhändler sind innerhalb von 30 Tagen nach Rechnungsdatum zahlbar. Überfällige Rechnungen können zu Verzugszinsen und nach 60 Tagen zur Kontosperrung führen." },
    { h: "9. Kontakt", p: "Für Abrechnungs- oder Streitanfragen: billing@dutyboost.com · DutyBoost B.V., Amsterdam, Niederlande." },
  ]},
  fr: { title: "Politique de facturation et de règlement des litiges", updated: "Dernière mise à jour : avril 2026", back: "Retour à l'accueil", sections: [
    { h: "1. Modèle de frais", p: "DutyBoost fonctionne selon un modèle de commission basé sur la performance. Aucun frais d'abonnement, d'installation ou paiement anticipé. La commission n'est appliquée qu'en cas d'échange réussi d'un DutyCredit par un voyageur chez un détaillant aéroportuaire participant. Tous les montants sont hors TVA." },
    { h: "2. Litiges de commission pour les détaillants", p: "Si un détaillant aéroportuaire estime qu'une commission a été appliquée par erreur — par exemple en lien avec une réservation annulée ou un dysfonctionnement technique — il doit soumettre un litige dans les 14 jours suivant la transaction à billing@dutyboost.com avec l'ID de transaction, le code DutyCredit et les justificatifs." },
    { h: "3. Litiges de partage de revenus pour les partenaires de voyage", p: "Les partenaires de voyage qui estiment que leur partage de revenus a été incorrectement calculé doivent contacter billing@dutyboost.com dans les 14 jours suivant leur relevé mensuel. Nous enquêterons et émettrons une correction si une erreur est confirmée." },
    { h: "4. Annulations de réservations et DutyCredits invalidés", p: "Si la réservation d'un voyageur est annulée, modifiée ou remboursée après l'émission d'un DutyCredit, le partenaire de voyage doit notifier DutyBoost immédiatement pour invalidation. DutyBoost n'est pas responsable des DutyCredits échangés sur la base de données de réservation falsifiées." },
    { h: "5. Rachats frauduleux ou invalides", p: "Si un DutyCredit a été échangé suite à une fraude, une erreur technique ou un dysfonctionnement, DutyBoost mènera une enquête formelle. Si une erreur de DutyBoost est confirmée, un avoir ou remboursement complet sera émis dans le cycle de facturation suivant." },
    { h: "6. Rétrofacturations (Chargebacks)", p: "Les détaillants qui initient une rétrofacturation sans avoir d'abord suivi la procédure de litige ci-dessus peuvent voir leur compte suspendu en attendant l'enquête." },
    { h: "7. Pas de remboursements sur les transactions valides", p: "Les commissions sur des rachats valides et correctement traités sont définitives et non remboursables." },
    { h: "8. Conditions de paiement des factures", p: "Les factures mensuelles émises aux détaillants sont payables dans les 30 jours. Les factures impayées après 60 jours peuvent entraîner la suspension du compte." },
    { h: "9. Contact", p: "Pour les demandes de facturation ou de litige : billing@dutyboost.com · DutyBoost B.V., Amsterdam, Pays-Bas." },
  ]},
  es: { title: "Política de facturación y resolución de disputas", updated: "Última actualización: abril de 2026", back: "Volver al inicio", sections: [
    { h: "1. Modelo de tarifas", p: "DutyBoost opera con un modelo de comisión basado en el rendimiento. Sin tarifas de suscripción, instalación ni pagos anticipados. La comisión solo se aplica cuando un DutyCredit se canjea con éxito por un viajero en un comercio aeroportuario participante. Todos los importes son sin IVA." },
    { h: "2. Disputas de comisión de comercios", p: "Si un comercio aeroportuario considera que se ha aplicado una comisión por error — por ejemplo, en relación con una reserva cancelada o un fallo técnico — debe presentar una disputa en los 14 días siguientes a billing@dutyboost.com con el ID de transacción, código DutyCredit y evidencia." },
    { h: "3. Disputas de reparto de ingresos de socios de viaje", p: "Los socios de viaje que consideren que su reparto de ingresos ha sido calculado incorrectamente deben contactar billing@dutyboost.com en los 14 días siguientes a su extracto mensual. Investigaremos y emitiremos una corrección si se confirma un error." },
    { h: "4. Cancelaciones de reservas y DutyCredits anulados", p: "Si la reserva de vuelo de un viajero se cancela, reprograma o reembolsa tras la emisión de un DutyCredit, el socio de viaje debe notificar a DutyBoost inmediatamente para anularlo. DutyBoost no es responsable de DutyCredits canjeados sobre la base de datos de reserva falsificados." },
    { h: "5. Canjes fraudulentos o inválidos", p: "Si un DutyCredit fue canjeado como resultado de fraude, error técnico o fallo del sistema, DutyBoost realizará una investigación formal. Si se confirma un error de DutyBoost, se emitirá un abono o reembolso completo en el siguiente ciclo de facturación." },
    { h: "6. Contracargos (Chargebacks)", p: "Los comercios que inicien un contracargo sin seguir primero el proceso de disputa anterior pueden ver su cuenta suspendida hasta completar la investigación." },
    { h: "7. Sin reembolsos en transacciones válidas", p: "Los cargos de comisión sobre canjes válidos y correctamente procesados son definitivos y no reembolsables." },
    { h: "8. Condiciones de pago de facturas", p: "Las facturas mensuales emitidas a los comercios son pagaderas en 30 días. Las facturas impagadas tras 60 días pueden resultar en la suspensión de la cuenta." },
    { h: "9. Contacto", p: "Para solicitudes de facturación o disputas: billing@dutyboost.com · DutyBoost B.V., Ámsterdam, Países Bajos." },
  ]},
  it: { title: "Politica di fatturazione e risoluzione delle controversie", updated: "Ultimo aggiornamento: aprile 2026", back: "Torna alla home", sections: [
    { h: "1. Modello di commissione", p: "DutyBoost opera con un modello di commissione basato sulle prestazioni. Nessun costo di abbonamento, configurazione né pagamento anticipato. La commissione viene applicata solo quando un DutyCredit viene riscattato con successo da un viaggiatore presso un rivenditore aeroportuale partecipante. Tutti gli importi si intendono al netto di IVA." },
    { h: "2. Controversie sulle commissioni dei rivenditori", p: "Se un rivenditore aeroportuale ritiene che una commissione sia stata applicata per errore — ad esempio in relazione a una prenotazione annullata o un malfunzionamento tecnico — deve presentare una contestazione entro 14 giorni dalla transazione a billing@dutyboost.com con ID transazione, codice DutyCredit e documentazione." },
    { h: "3. Controversie sulla quota di ricavi dei partner di viaggio", p: "I partner di viaggio che ritengono che la loro quota di ricavi sia stata calcolata in modo errato devono contattare billing@dutyboost.com entro 14 giorni dal ricevimento del loro estratto mensile. Indagheremo e emetteremo una correzione se viene confermato un errore." },
    { h: "4. Cancellazioni di prenotazioni e DutyCredit annullati", p: "Se la prenotazione di volo di un viaggiatore viene cancellata, riprogrammata o rimborsata dopo l'emissione di un DutyCredit, il partner di viaggio deve notificare immediatamente DutyBoost per l'annullamento. DutyBoost non è responsabile per DutyCredit riscattati sulla base di dati di prenotazione falsificati." },
    { h: "5. Riscatti fraudolenti o non validi", p: "Se un DutyCredit è stato riscattato a causa di frode, errore tecnico o malfunzionamento, DutyBoost condurrà un'indagine formale. Se viene confermato un errore da parte di DutyBoost, verrà emesso un accredito o rimborso completo nel ciclo di fatturazione successivo." },
    { h: "6. Chargeback", p: "I rivenditori che avviano un chargeback senza aver prima seguito la procedura di contestazione sopra descritta possono vedere il proprio account sospeso in attesa di indagine." },
    { h: "7. Nessun rimborso su transazioni valide", p: "Le commissioni su riscatti validi e correttamente elaborati sono definitive e non rimborsabili." },
    { h: "8. Termini di pagamento delle fatture", p: "Le fatture mensili emesse ai rivenditori sono pagabili entro 30 giorni. Le fatture non pagate dopo 60 giorni possono comportare la sospensione dell'account." },
    { h: "9. Contatto", p: "Per richieste di fatturazione o contestazioni: billing@dutyboost.com · DutyBoost B.V., Amsterdam, Paesi Bassi." },
  ]},
};

export default function RefundPolicy() {
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
            <EmailLinkText text={s.p} />
          </section>
        ))}
      </div>
      <PageFooter />
    </div>
  );
}