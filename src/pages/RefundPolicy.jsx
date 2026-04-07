import { Link } from "react-router-dom";
import DutyBoostLogo from "../components/DutyBoostLogo";
import { useTranslation } from "react-i18next";

const content = {
  en: { title: "Refund Policy", updated: "Last updated: March 2026", back: "Back to Home", sections: [
    { h: "1. Platform Fee Model", p: "DutyBoost operates on a performance-based commission model. There are no subscription fees or upfront charges. Commission is only applied when a DutyCredit is successfully redeemed." },
    { h: "2. Retailer Commission Disputes", p: "If a retailer believes a commission charge was applied in error, they must raise a dispute within 14 days of the transaction date by emailing billing@dutyboost.com with full transaction details and supporting evidence." },
    { h: "3. Agency Revenue Share Disputes", p: "Travel agencies that believe their revenue share has been incorrectly calculated must contact us within 14 days of receiving their statement. We will investigate and issue a correction in the following billing cycle if an error is confirmed." },
    { h: "4. Fraudulent or Invalid Redemptions", p: "If a DutyCredit was redeemed due to fraud, technical error, or platform malfunction, DutyBoost will investigate and may issue a full refund of any commission charged in relation to that transaction." },
    { h: "5. No Refunds on Valid Transactions", p: "Commission charges on valid, correctly processed redemptions are non-refundable. Once a DutyCredit has been redeemed and a transaction confirmed, the associated commission is final." },
    { h: "6. Contact", p: "For billing or refund requests: billing@dutyboost.com" },
  ]},
  nl: { title: "Restitutibeleid", updated: "Laatst bijgewerkt: maart 2026", back: "Terug naar home", sections: [
    { h: "1. Platformkostenmodel", p: "DutyBoost werkt op basis van een prestatiegebonden commissiemodel. Er zijn geen abonnementskosten of vooruitbetalingen. Commissie wordt alleen toegepast wanneer een DutyCredit succesvol wordt ingewisseld." },
    { h: "2. Geschillen over retailercommissie", p: "Als een winkel meent dat een commissievergoeding ten onrechte is toegepast, moet het geschil binnen 14 dagen na de transactiedatum worden ingediend bij billing@dutyboost.com met volledige transactiegegevens." },
    { h: "3. Geschillen over inkomstenaandelen voor bureaus", p: "Reisbureaus die menen dat hun inkomstenaandeel onjuist is berekend, moeten ons binnen 14 dagen na ontvangst van hun overzicht contacteren. Wij zullen de zaak onderzoeken en indien een fout wordt bevestigd een correctie doorvoeren." },
    { h: "4. Frauduleuze of ongeldige inwisselingen", p: "Als een DutyCredit werd ingewisseld als gevolg van fraude, technische fout of platformstoring, zal DutyBoost een onderzoek instellen en kan een volledige terugbetaling worden verleend." },
    { h: "5. Geen terugbetalingen voor geldige transacties", p: "Commissievergoedingen voor geldige, correct verwerkte inwisselingen zijn niet restitueerbaar. Zodra een DutyCredit is ingewisseld en een transactie is bevestigd, is de bijbehorende commissie definitief." },
    { h: "6. Contact", p: "Voor facturerings- of terugbetalingsverzoeken: billing@dutyboost.com" },
  ]},
  de: { title: "Rückgaberecht", updated: "Zuletzt aktualisiert: März 2026", back: "Zurück zur Startseite", sections: [
    { h: "1. Plattformgebührenmodell", p: "DutyBoost arbeitet nach einem leistungsbasierten Provisionsmodell. Es fallen keine Abonnementgebühren oder Vorauszahlungen an. Provisionen werden nur erhoben, wenn ein DutyCredit erfolgreich eingelöst wird." },
    { h: "2. Händler-Kommissionsstreitigkeiten", p: "Wenn ein Händler der Meinung ist, dass eine Provisionsgebühr irrtümlich erhoben wurde, muss er innerhalb von 14 Tagen nach dem Transaktionsdatum einen Streitfall bei billing@dutyboost.com einreichen." },
    { h: "3. Agentur-Umsatzbeteiligungsstreitigkeiten", p: "Reisebüros, die glauben, dass ihre Umsatzbeteiligung falsch berechnet wurde, müssen uns innerhalb von 14 Tagen nach Erhalt ihrer Abrechnung kontaktieren. Wir werden den Fall untersuchen." },
    { h: "4. Betrügerische oder ungültige Einlösungen", p: "Wenn ein DutyCredit aufgrund von Betrug, technischem Fehler oder Plattformstörung eingelöst wurde, wird DutyBoost eine Untersuchung durchführen und kann eine Rückerstattung gewähren." },
    { h: "5. Keine Rückerstattungen für gültige Transaktionen", p: "Provisionsgebühren für gültige, korrekt verarbeitete Einlösungen sind nicht erstattungsfähig. Sobald ein DutyCredit eingelöst wurde, ist die Provision endgültig." },
    { h: "6. Kontakt", p: "Für Abrechnungs- oder Rückerstattungsanfragen: billing@dutyboost.com" },
  ]},
  fr: { title: "Politique de remboursement", updated: "Dernière mise à jour : mars 2026", back: "Retour à l'accueil", sections: [
    { h: "1. Modèle de frais", p: "DutyBoost fonctionne selon un modèle de commission basé sur la performance. Aucun frais d'abonnement ni paiement anticipé. La commission n'est appliquée qu'en cas d'échange réussi d'un DutyCredit." },
    { h: "2. Litiges de commission pour les détaillants", p: "Si un détaillant estime qu'une commission a été appliquée par erreur, il doit soumettre un litige dans les 14 jours suivant la transaction à billing@dutyboost.com avec les détails complets." },
    { h: "3. Litiges de partage de revenus pour les agences", p: "Les agences qui estiment que leur partage de revenus a été incorrectement calculé doivent nous contacter dans les 14 jours suivant leur relevé. Nous enquêterons et émettrons une correction si une erreur est confirmée." },
    { h: "4. Rachats frauduleux ou invalides", p: "Si un DutyCredit a été échangé suite à une fraude, une erreur technique ou un dysfonctionnement, DutyBoost enquêtera et pourra émettre un remboursement intégral." },
    { h: "5. Pas de remboursements sur les transactions valides", p: "Les commissions sur des rachats valides et correctement traités ne sont pas remboursables. Une fois un DutyCredit échangé, la commission associée est définitive." },
    { h: "6. Contact", p: "Pour les demandes de facturation ou de remboursement : billing@dutyboost.com" },
  ]},
  es: { title: "Política de reembolso", updated: "Última actualización: marzo de 2026", back: "Volver al inicio", sections: [
    { h: "1. Modelo de tarifas", p: "DutyBoost opera con un modelo de comisión basado en el rendimiento. Sin tarifas de suscripción ni pagos anticipados. La comisión solo se aplica cuando un DutyCredit se canjea con éxito." },
    { h: "2. Disputas de comisión de comercios", p: "Si un comercio considera que se ha aplicado una comisión por error, debe presentar una disputa en los 14 días siguientes a billing@dutyboost.com con todos los detalles de la transacción." },
    { h: "3. Disputas sobre el reparto de ingresos de agencias", p: "Las agencias que consideren que su reparto de ingresos ha sido calculado incorrectamente deben contactarnos en los 14 días siguientes a la recepción de su extracto. Investigaremos y emitiremos una corrección si se confirma un error." },
    { h: "4. Canjes fraudulentos o inválidos", p: "Si un DutyCredit fue canjeado debido a fraude, error técnico o fallo de la plataforma, DutyBoost investigará y podrá emitir un reembolso completo." },
    { h: "5. Sin reembolsos en transacciones válidas", p: "Los cargos de comisión sobre canjes válidos y correctamente procesados no son reembolsables. Una vez canjeado un DutyCredit, la comisión es definitiva." },
    { h: "6. Contacto", p: "Para solicitudes de facturación o reembolso: billing@dutyboost.com" },
  ]},
  it: { title: "Politica di rimborso", updated: "Ultimo aggiornamento: marzo 2026", back: "Torna alla home", sections: [
    { h: "1. Modello di commissione", p: "DutyBoost opera con un modello di commissione basato sulle prestazioni. Nessun costo di abbonamento né pagamento anticipato. La commissione viene applicata solo quando un DutyCredit viene riscattato con successo." },
    { h: "2. Controversie sulle commissioni dei rivenditori", p: "Se un rivenditore ritiene che una commissione sia stata applicata per errore, deve presentare una contestazione entro 14 giorni dalla transazione a billing@dutyboost.com con tutti i dettagli." },
    { h: "3. Controversie sulla quota di ricavi delle agenzie", p: "Le agenzie che ritengono che la loro quota di ricavi sia stata calcolata in modo errato devono contattarci entro 14 giorni dal ricevimento del loro estratto conto. Indagheremo e emetteremo una correzione se viene confermato un errore." },
    { h: "4. Riscatti fraudolenti o non validi", p: "Se un DutyCredit è stato riscattato a causa di frode, errore tecnico o malfunzionamento, DutyBoost indagherà e potrà emettere un rimborso completo." },
    { h: "5. Nessun rimborso su transazioni valide", p: "Le commissioni su riscatti validi e correttamente elaborati non sono rimborsabili. Una volta riscattato un DutyCredit, la commissione è definitiva." },
    { h: "6. Contatto", p: "Per richieste di fatturazione o rimborso: billing@dutyboost.com" },
  ]},
};

export default function RefundPolicy() {
  const { i18n } = useTranslation();
  const c = content[i18n.language] || content.en;
  return (
    <div className="min-h-screen bg-background font-body">
      <nav className="border-b border-border px-6 h-16 flex items-center"><Link to="/"><DutyBoostLogo height={150} /></Link></nav>
      <div className="max-w-3xl mx-auto px-6 py-16 space-y-8">
        <div><h1 className="text-4xl font-heading font-bold mb-2">{c.title}</h1><p className="text-muted-foreground text-sm">{c.updated}</p></div>
        {c.sections.map((s) => (
          <section key={s.h} className="space-y-3">
            <h2 className="text-xl font-heading font-semibold">{s.h}</h2>
            <p className="text-muted-foreground leading-relaxed">{s.p}</p>
          </section>
        ))}
      </div>
      <footer className="border-t border-border py-8 px-6 text-center text-sm text-muted-foreground">
        © 2026 DutyBoost. <Link to="/" className="text-primary underline">{c.back}</Link>
      </footer>
    </div>
  );
}