import { Link } from "react-router-dom";
import DutyBoostLogo from "../components/DutyBoostLogo";
import PageFooter from "../components/PageFooter";
import { useTranslation } from "react-i18next";

const content = {
  en: { title: "Privacy Policy", updated: "Last updated: March 2026", back: "Back to Home", sections: [
    { h: "1. Introduction", p: "DutyBoost is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard the data you provide when using our platform." },
    { h: "2. Data We Collect", list: ["Account data: name, email address, company name, and role.", "Booking data: departure airport, travel date, number of travelers, ticket value.", "Transaction data: DutyCredit codes redeemed, discount amounts, retailer identifiers.", "Usage data: page views, feature interactions, browser type, and IP address."] },
    { h: "3. How We Use Your Data", list: ["To generate and validate DutyCredits for travelers.", "To process and track redemption transactions.", "To calculate and distribute revenue shares.", "To send transactional emails.", "To improve platform performance and user experience."] },
    { h: "4. Data Sharing", p: "We do not sell your personal data. We may share data with participating airport retailers (limited to DutyCredit validation data), our infrastructure providers, and regulatory authorities where required by law." },
    { h: "5. Data Retention", p: "We retain personal data for as long as your account is active or as needed to provide services. Transaction records are retained for a minimum of 7 years." },
    { h: "6. Your Rights (GDPR)", p: "If you are based in the EU/EEA, you have the right to access, correct, delete, or export your data. Contact us at privacy@dutyboost.com." },
    { h: "7. Security", p: "We use industry-standard encryption (TLS) and secure infrastructure. DutyCredit codes are cryptographically unique and single-use." },
    { h: "8. Contact", p: "For privacy-related enquiries: privacy@dutyboost.com" },
  ]},
  nl: { title: "Privacybeleid", updated: "Laatst bijgewerkt: maart 2026", back: "Terug naar home", sections: [
    { h: "1. Inleiding", p: "DutyBoost verbindt zich tot de bescherming van uw persoonsgegevens. Dit Privacybeleid legt uit hoe wij de gegevens die u verstrekt bij het gebruik van ons platform verzamelen, gebruiken en beschermen." },
    { h: "2. Gegevens die wij verzamelen", list: ["Accountgegevens: naam, e-mailadres, bedrijfsnaam en rol.", "Boekingsgegevens: luchthaven van vertrek, reisdatum, aantal reizigers, ticketwaarde.", "Transactiegegevens: ingewisselde DutyCredit-codes, kortingsbedragen, winkelidentificatoren.", "Gebruiksgegevens: paginabezoeken, functies-interacties, browsertype en IP-adres."] },
    { h: "3. Hoe wij uw gegevens gebruiken", list: ["Voor het genereren en valideren van DutyCredits.", "Voor het verwerken en bijhouden van inwisseltransacties.", "Voor het berekenen en distribueren van inkomstenaandelen.", "Voor het verzenden van transactionele e-mails.", "Voor het verbeteren van platformprestaties."] },
    { h: "4. Gegevensdeling", p: "Wij verkopen uw persoonsgegevens niet. Wij kunnen gegevens delen met deelnemende luchthavenwinkels, onze infrastructuurproviders en regelgevende autoriteiten indien wettelijk vereist." },
    { h: "5. Gegevensbewaring", p: "Wij bewaren persoonsgegevens zolang uw account actief is. Transactiegegevens worden minimaal 7 jaar bewaard." },
    { h: "6. Uw rechten (AVG)", p: "Als u in de EU/EEA gevestigd bent, heeft u het recht om uw gegevens in te zien, te corrigeren, te verwijderen of te exporteren. Neem contact op via privacy@dutyboost.com." },
    { h: "7. Beveiliging", p: "Wij gebruiken industriestandaard versleuteling (TLS) en beveiligde infrastructuur. DutyCredit-codes zijn cryptografisch uniek en eenmalig bruikbaar." },
    { h: "8. Contact", p: "Voor privacygerelateerde vragen: privacy@dutyboost.com" },
  ]},
  de: { title: "Datenschutzerklärung", updated: "Zuletzt aktualisiert: März 2026", back: "Zurück zur Startseite", sections: [
    { h: "1. Einleitung", p: "DutyBoost verpflichtet sich zum Schutz Ihrer persönlichen Daten. Diese Datenschutzerklärung erläutert, wie wir die Daten erfassen, verwenden und schützen, die Sie bei der Nutzung unserer Plattform bereitstellen." },
    { h: "2. Erhobene Daten", list: ["Kontodaten: Name, E-Mail-Adresse, Firmenname und Rolle.", "Buchungsdaten: Abflughafen, Reisedatum, Anzahl der Reisenden, Ticketwert.", "Transaktionsdaten: Eingelöste DutyCredit-Codes, Rabattbeträge, Händlerkennungen.", "Nutzungsdaten: Seitenaufrufe, Funktionsinteraktionen, Browsertyp und IP-Adresse."] },
    { h: "3. Verwendung Ihrer Daten", list: ["Generierung und Validierung von DutyCredits.", "Verarbeitung und Nachverfolgung von Einlösungstransaktionen.", "Berechnung und Verteilung von Umsatzbeteiligungen.", "Versand von Transaktions-E-Mails.", "Verbesserung der Plattformleistung."] },
    { h: "4. Datenweitergabe", p: "Wir verkaufen Ihre personenbezogenen Daten nicht. Wir können Daten mit teilnehmenden Flughafenhändlern, unseren Infrastrukturanbietern und Regulierungsbehörden teilen." },
    { h: "5. Datenspeicherung", p: "Wir speichern personenbezogene Daten, solange Ihr Konto aktiv ist. Transaktionsdaten werden mindestens 7 Jahre aufbewahrt." },
    { h: "6. Ihre Rechte (DSGVO)", p: "Wenn Sie in der EU/EWR ansässig sind, haben Sie das Recht auf Zugang, Berichtigung, Löschung oder Export Ihrer Daten. Kontaktieren Sie uns unter privacy@dutyboost.com." },
    { h: "7. Sicherheit", p: "Wir verwenden branchenübliche Verschlüsselung (TLS) und sichere Infrastruktur. DutyCredit-Codes sind kryptografisch einzigartig und einmalig verwendbar." },
    { h: "8. Kontakt", p: "Für datenschutzbezogene Anfragen: privacy@dutyboost.com" },
  ]},
  fr: { title: "Politique de confidentialité", updated: "Dernière mise à jour : mars 2026", back: "Retour à l'accueil", sections: [
    { h: "1. Introduction", p: "DutyBoost s'engage à protéger vos informations personnelles. Cette politique explique comment nous collectons, utilisons et protégeons les données que vous fournissez lors de l'utilisation de notre plateforme." },
    { h: "2. Données collectées", list: ["Données de compte : nom, e-mail, nom d'entreprise et rôle.", "Données de réservation : aéroport de départ, date de voyage, nombre de voyageurs, valeur du billet.", "Données de transaction : codes DutyCredit échangés, montants de réduction, identifiants de détaillants.", "Données d'utilisation : pages visitées, interactions, type de navigateur et adresse IP."] },
    { h: "3. Utilisation de vos données", list: ["Générer et valider les DutyCredits.", "Traiter et suivre les transactions de rachat.", "Calculer et distribuer les partages de revenus.", "Envoyer des e-mails transactionnels.", "Améliorer les performances de la plateforme."] },
    { h: "4. Partage des données", p: "Nous ne vendons pas vos données personnelles. Nous pouvons partager des données avec les détaillants participants, nos fournisseurs d'infrastructure et les autorités de régulation si la loi l'exige." },
    { h: "5. Conservation des données", p: "Nous conservons les données personnelles aussi longtemps que votre compte est actif. Les données de transaction sont conservées au minimum 7 ans." },
    { h: "6. Vos droits (RGPD)", p: "Si vous êtes basé dans l'UE/EEE, vous avez le droit d'accéder, de corriger, de supprimer ou d'exporter vos données. Contactez-nous à privacy@dutyboost.com." },
    { h: "7. Sécurité", p: "Nous utilisons le chiffrement standard de l'industrie (TLS) et une infrastructure sécurisée. Les codes DutyCredit sont cryptographiquement uniques et à usage unique." },
    { h: "8. Contact", p: "Pour les demandes liées à la confidentialité : privacy@dutyboost.com" },
  ]},
  es: { title: "Política de privacidad", updated: "Última actualización: marzo de 2026", back: "Volver al inicio", sections: [
    { h: "1. Introducción", p: "DutyBoost se compromete a proteger tu información personal. Esta Política explica cómo recopilamos, usamos y protegemos los datos que proporcionas al usar nuestra plataforma." },
    { h: "2. Datos que recopilamos", list: ["Datos de cuenta: nombre, correo electrónico, nombre de empresa y rol.", "Datos de reserva: aeropuerto de salida, fecha de viaje, número de viajeros, valor del billete.", "Datos de transacción: códigos DutyCredit canjeados, importes de descuento, identificadores de comercios.", "Datos de uso: visitas a páginas, interacciones, tipo de navegador y dirección IP."] },
    { h: "3. Cómo usamos tus datos", list: ["Generar y validar DutyCredits.", "Procesar y rastrear transacciones de canje.", "Calcular y distribuir repartos de ingresos.", "Enviar correos transaccionales.", "Mejorar el rendimiento de la plataforma."] },
    { h: "4. Compartición de datos", p: "No vendemos tus datos personales. Podemos compartir datos con las tiendas participantes, nuestros proveedores de infraestructura y autoridades reguladoras cuando lo exija la ley." },
    { h: "5. Retención de datos", p: "Conservamos los datos personales mientras tu cuenta esté activa. Los registros de transacciones se conservan un mínimo de 7 años." },
    { h: "6. Tus derechos (RGPD)", p: "Si estás en la UE/EEE, tienes derecho a acceder, corregir, eliminar o exportar tus datos. Contáctanos en privacy@dutyboost.com." },
    { h: "7. Seguridad", p: "Usamos cifrado estándar del sector (TLS) e infraestructura segura. Los códigos DutyCredit son criptográficamente únicos y de un solo uso." },
    { h: "8. Contacto", p: "Para consultas relacionadas con la privacidad: privacy@dutyboost.com" },
  ]},
  it: { title: "Informativa sulla privacy", updated: "Ultimo aggiornamento: marzo 2026", back: "Torna alla home", sections: [
    { h: "1. Introduzione", p: "DutyBoost si impegna a proteggere le tue informazioni personali. Questa informativa spiega come raccogliamo, utilizziamo e proteggiamo i dati che fornisci quando usi la nostra piattaforma." },
    { h: "2. Dati che raccogliamo", list: ["Dati dell'account: nome, email, nome dell'azienda e ruolo.", "Dati di prenotazione: aeroporto di partenza, data di viaggio, numero di viaggiatori, valore del biglietto.", "Dati di transazione: codici DutyCredit riscattati, importi di sconto, identificatori di rivenditori.", "Dati di utilizzo: visualizzazioni di pagine, interazioni, tipo di browser e indirizzo IP."] },
    { h: "3. Come utilizziamo i tuoi dati", list: ["Generare e validare i DutyCredit.", "Elaborare e monitorare le transazioni di riscatto.", "Calcolare e distribuire le quote di ricavi.", "Inviare email transazionali.", "Migliorare le prestazioni della piattaforma."] },
    { h: "4. Condivisione dei dati", p: "Non vendiamo i tuoi dati personali. Possiamo condividere dati con i rivenditori partecipanti, i nostri provider di infrastrutture e le autorità di regolamentazione ove richiesto dalla legge." },
    { h: "5. Conservazione dei dati", p: "Conserviamo i dati personali finché il tuo account è attivo. I record di transazione vengono conservati per un minimo di 7 anni." },
    { h: "6. I tuoi diritti (GDPR)", p: "Se sei nell'UE/SEE, hai il diritto di accedere, correggere, eliminare o esportare i tuoi dati. Contattaci all'indirizzo privacy@dutyboost.com." },
    { h: "7. Sicurezza", p: "Utilizziamo crittografia standard del settore (TLS) e infrastrutture sicure. I codici DutyCredit sono crittograficamente unici e monouso." },
    { h: "8. Contatto", p: "Per richieste relative alla privacy: privacy@dutyboost.com" },
  ]},
};

export default function PrivacyPolicy() {
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
            {s.p && <p className="text-muted-foreground leading-relaxed">{s.p}</p>}
            {s.list && <ul className="list-disc list-inside text-muted-foreground space-y-1 leading-relaxed">{s.list.map((item, i) => <li key={i}>{item}</li>)}</ul>}
          </section>
        ))}
      </div>
      <PageFooter />
    </div>
  );
}