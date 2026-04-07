import { Link } from "react-router-dom";
import DutyBoostLogo from "../components/DutyBoostLogo";
import { useTranslation } from "react-i18next";

const content = {
  en: { title: "Code of Conduct", updated: "Last updated: March 2026", back: "Back to Home", sections: [
    { h: "1. Our Commitment", p: "DutyBoost is built on the principle that travel agencies, airport retailers, and travelers should all benefit fairly. We are committed to maintaining a trustworthy, transparent, and professional platform for all participants." },
    { h: "2. Expected Behaviour — All Users", list: ["Act honestly and in good faith when using the platform.", "Provide accurate data — bookings, transaction values, and store details must reflect reality.", "Treat all other platform participants with respect and professionalism.", "Report suspected fraud or abuse via trust@dutyboost.com."] },
    { h: "3. Travel Agencies", list: ["Only submit real, confirmed bookings to generate DutyCredits.", "Do not generate DutyCredits for fictitious or cancelled bookings.", "Do not share DutyCredit links with individuals unrelated to the associated booking."] },
    { h: "4. Airport Retailers", list: ["Honour all valid, active DutyCredits presented by travelers at your location.", "Do not refuse DutyCredit redemptions without valid justification.", "Do not attempt to process false transactions to manipulate revenue figures.", "Keep your store information accurate and up to date."] },
    { h: "5. Prohibited Conduct", list: ["Attempting to duplicate, forge, or reverse-engineer DutyCredit codes.", "Using the platform for money laundering or fraudulent financial activity.", "Attempting to access other users' accounts or data without authorisation.", "Interfering with the platform's technical infrastructure."] },
    { h: "6. Enforcement", p: "Violations may result in immediate account suspension, termination of access, and legal action. DutyBoost reserves the right to investigate all reported violations." },
    { h: "7. Contact", p: "Report misconduct: trust@dutyboost.com" },
  ]},
  nl: { title: "Gedragscode", updated: "Laatst bijgewerkt: maart 2026", back: "Terug naar home", sections: [
    { h: "1. Onze toewijding", p: "DutyBoost is gebouwd op het principe dat reisbureaus, luchthavenwinkels en reizigers allemaal eerlijk voordeel moeten halen. Wij zetten ons in voor een betrouwbaar, transparant en professioneel platform voor alle deelnemers." },
    { h: "2. Verwacht gedrag — Alle gebruikers", list: ["Eerlijk en te goeder trouw handelen bij het gebruik van het platform.", "Nauwkeurige gegevens verstrekken — boekingen, transactiewaarden en winkelgegevens moeten de werkelijkheid weerspiegelen.", "Alle andere platformdeelnemers met respect en professionaliteit behandelen.", "Vermoedelijke fraude of misbruik melden via trust@dutyboost.com."] },
    { h: "3. Reisbureaus", list: ["Alleen echte, bevestigde boekingen indienen om DutyCredits te genereren.", "Geen DutyCredits genereren voor fictieve of geannuleerde boekingen.", "DutyCredit-links niet delen met personen die geen verband houden met de bijbehorende boeking."] },
    { h: "4. Luchthavenwinkels", list: ["Alle geldige, actieve DutyCredits van reizigers honoreren.", "DutyCredit-inwisselingen niet weigeren zonder geldige rechtvaardiging.", "Geen valse transacties verwerken om omzetcijfers te manipuleren.", "Winkelinformatie nauwkeurig en actueel houden."] },
    { h: "5. Verboden gedrag", list: ["Pogingen om DutyCredit-codes te dupliceren, vervalsen of reverse-engineeren.", "Het platform gebruiken voor witwassen of frauduleuze financiële activiteiten.", "Pogingen om toegang te krijgen tot accounts of gegevens van andere gebruikers.", "Interferentie met de technische infrastructuur van het platform."] },
    { h: "6. Handhaving", p: "Overtredingen kunnen leiden tot onmiddellijke schorsing, beëindiging van toegang en juridische stappen. DutyBoost behoudt zich het recht voor alle gemelde overtredingen te onderzoeken." },
    { h: "7. Contact", p: "Wangedrag melden: trust@dutyboost.com" },
  ]},
  de: { title: "Verhaltenskodex", updated: "Zuletzt aktualisiert: März 2026", back: "Zurück zur Startseite", sections: [
    { h: "1. Unser Engagement", p: "DutyBoost basiert auf dem Prinzip, dass Reisebüros, Flughafenhändler und Reisende alle fair profitieren sollten. Wir verpflichten uns, eine vertrauenswürdige, transparente und professionelle Plattform aufrechtzuerhalten." },
    { h: "2. Erwartetes Verhalten — Alle Nutzer", list: ["Ehrlich und in gutem Glauben bei der Nutzung der Plattform handeln.", "Genaue Daten angeben — Buchungen, Transaktionswerte und Geschäftsdetails müssen der Realität entsprechen.", "Alle anderen Plattformteilnehmer mit Respekt und Professionalität behandeln.", "Verdächtigen Betrug oder Missbrauch über trust@dutyboost.com melden."] },
    { h: "3. Reisebüros", list: ["Nur echte, bestätigte Buchungen einreichen.", "Keine DutyCredits für fiktive oder stornierte Buchungen generieren.", "DutyCredit-Links nicht mit Personen teilen, die nicht mit der Buchung verbunden sind."] },
    { h: "4. Flughafenhändler", list: ["Alle gültigen, aktiven DutyCredits akzeptieren.", "DutyCredit-Einlösungen nicht ohne triftigen Grund verweigern.", "Keine falschen Transaktionen verarbeiten.", "Geschäftsinformationen auf der Plattform aktuell halten."] },
    { h: "5. Verbotenes Verhalten", list: ["Versuche, DutyCredit-Codes zu duplizieren, zu fälschen oder zurückzuentwickeln.", "Die Plattform für Geldwäsche oder betrügerische Finanzaktivitäten nutzen.", "Versuche, unbefugt auf Konten oder Daten anderer Nutzer zuzugreifen.", "Eingriffe in die technische Infrastruktur der Plattform."] },
    { h: "6. Durchsetzung", p: "Verstöße können zur sofortigen Kontosperrung, Beendigung des Zugangs und rechtlichen Schritten führen. DutyBoost behält sich das Recht vor, alle Verstöße zu untersuchen." },
    { h: "7. Kontakt", p: "Fehlverhalten melden: trust@dutyboost.com" },
  ]},
  fr: { title: "Code de conduite", updated: "Dernière mise à jour : mars 2026", back: "Retour à l'accueil", sections: [
    { h: "1. Notre engagement", p: "DutyBoost est fondé sur le principe que les agences, les détaillants et les voyageurs doivent tous bénéficier équitablement. Nous nous engageons à maintenir une plateforme fiable, transparente et professionnelle." },
    { h: "2. Comportement attendu — Tous les utilisateurs", list: ["Agir honnêtement et de bonne foi.", "Fournir des données précises — réservations, valeurs de transaction et détails du magasin doivent refléter la réalité.", "Traiter tous les participants avec respect et professionnalisme.", "Signaler toute fraude ou abus via trust@dutyboost.com."] },
    { h: "3. Agences de voyage", list: ["Soumettre uniquement des réservations réelles et confirmées.", "Ne pas générer de DutyCredits pour des réservations fictives ou annulées.", "Ne pas partager des liens DutyCredit avec des personnes non liées à la réservation."] },
    { h: "4. Détaillants aéroportuaires", list: ["Honorer tous les DutyCredits valides présentés par les voyageurs.", "Ne pas refuser les échanges sans justification valable.", "Ne pas tenter de traiter de fausses transactions.", "Maintenir les informations du magasin à jour."] },
    { h: "5. Conduite interdite", list: ["Tenter de dupliquer, falsifier ou rétro-ingénier les codes DutyCredit.", "Utiliser la plateforme pour le blanchiment d'argent.", "Tenter d'accéder aux comptes d'autres utilisateurs sans autorisation.", "Interférer avec l'infrastructure technique de la plateforme."] },
    { h: "6. Application", p: "Les violations peuvent entraîner une suspension immédiate, la résiliation de l'accès et des actions en justice. DutyBoost se réserve le droit d'enquêter sur toutes les violations signalées." },
    { h: "7. Contact", p: "Signaler un comportement inapproprié : trust@dutyboost.com" },
  ]},
  es: { title: "Código de conducta", updated: "Última actualización: marzo de 2026", back: "Volver al inicio", sections: [
    { h: "1. Nuestro compromiso", p: "DutyBoost se basa en el principio de que las agencias, las tiendas y los viajeros deben beneficiarse de manera justa. Nos comprometemos a mantener una plataforma de confianza, transparente y profesional." },
    { h: "2. Comportamiento esperado — Todos los usuarios", list: ["Actuar con honestidad y buena fe.", "Proporcionar datos precisos — reservas, valores de transacción y detalles de tienda deben reflejar la realidad.", "Tratar a todos los participantes con respeto y profesionalismo.", "Informar sobre fraudes o abusos a través de trust@dutyboost.com."] },
    { h: "3. Agencias de viajes", list: ["Enviar solo reservas reales y confirmadas.", "No generar DutyCredits para reservas ficticias o canceladas.", "No compartir enlaces DutyCredit con personas no relacionadas con la reserva."] },
    { h: "4. Tiendas aeroportuarias", list: ["Respetar todos los DutyCredits válidos presentados por los viajeros.", "No rechazar canjes sin justificación válida.", "No procesar transacciones falsas.", "Mantener la información de la tienda actualizada."] },
    { h: "5. Conducta prohibida", list: ["Intentar duplicar, falsificar o realizar ingeniería inversa de los códigos DutyCredit.", "Usar la plataforma para blanqueo de capitales.", "Intentar acceder a cuentas de otros usuarios sin autorización.", "Interferir con la infraestructura técnica de la plataforma."] },
    { h: "6. Cumplimiento", p: "Las infracciones pueden resultar en la suspensión inmediata de la cuenta, terminación del acceso y acciones legales. DutyBoost se reserva el derecho de investigar todas las infracciones." },
    { h: "7. Contacto", p: "Reportar conductas inapropiadas: trust@dutyboost.com" },
  ]},
  it: { title: "Codice di condotta", updated: "Ultimo aggiornamento: marzo 2026", back: "Torna alla home", sections: [
    { h: "1. Il nostro impegno", p: "DutyBoost è costruita sul principio che le agenzie, i rivenditori e i viaggiatori dovrebbero beneficiare equamente. Ci impegniamo a mantenere una piattaforma affidabile, trasparente e professionale." },
    { h: "2. Comportamento atteso — Tutti gli utenti", list: ["Agire onestamente e in buona fede.", "Fornire dati accurati — prenotazioni, valori delle transazioni e dettagli del negozio devono riflettere la realtà.", "Trattare tutti i partecipanti con rispetto e professionalità.", "Segnalare frodi o abusi tramite trust@dutyboost.com."] },
    { h: "3. Agenzie di viaggio", list: ["Inviare solo prenotazioni reali e confermate.", "Non generare DutyCredit per prenotazioni fittizie o annullate.", "Non condividere link DutyCredit con persone non collegate alla prenotazione."] },
    { h: "4. Rivenditori aeroportuali", list: ["Onorare tutti i DutyCredit validi presentati dai viaggiatori.", "Non rifiutare i riscatti senza giustificazione valida.", "Non elaborare transazioni false.", "Mantenere le informazioni del negozio aggiornate."] },
    { h: "5. Comportamento vietato", list: ["Tentare di duplicare, falsificare o fare reverse engineering dei codici DutyCredit.", "Utilizzare la piattaforma per riciclaggio di denaro.", "Tentare di accedere ad account di altri utenti senza autorizzazione.", "Interferire con l'infrastruttura tecnica della piattaforma."] },
    { h: "6. Applicazione", p: "Le violazioni possono comportare la sospensione immediata, la cessazione dell'accesso e azioni legali. DutyBoost si riserva il diritto di indagare su tutte le violazioni segnalate." },
    { h: "7. Contatto", p: "Segnalare comportamenti scorretti: trust@dutyboost.com" },
  ]},
};

export default function CodeOfConduct() {
  const { i18n } = useTranslation();
  const c = content[i18n.language] || content.en;
  return (
    <div className="min-h-screen bg-background font-body">
      <nav className="border-b border-border px-6 h-16 flex items-center justify-between"><Link to="/"><DutyBoostLogo height={150} /></Link><Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">{c.back}</Link></nav>
      <div className="max-w-3xl mx-auto px-6 py-16 space-y-8">
        <div><h1 className="text-4xl font-heading font-bold mb-2">{c.title}</h1><p className="text-muted-foreground text-sm">{c.updated}</p></div>
        {c.sections.map((s) => (
          <section key={s.h} className="space-y-3">
            <h2 className="text-xl font-heading font-semibold">{s.h}</h2>
            {s.p && <p className="text-muted-foreground leading-relaxed">{s.p}</p>}
            {s.list && <ul className="list-disc list-inside text-muted-foreground space-y-1 leading-relaxed">{s.list.map((item, i) => <li key={i}>{item}</li>)}</ul>}
          </section>
        ))}
      </div>
      <footer className="border-t border-border py-8 px-6 text-center text-sm text-muted-foreground">
        © 2026 DutyBoost. <Link to="/" className="text-primary underline">{c.back}</Link>
      </footer>
    </div>
  );
}