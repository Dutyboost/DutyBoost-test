// Travel Partner showcase (get-started for travel partners) — extra card copy
// for the touring coach partner, plus the calculator link label. 7 languages.

export const travelPartnerCardStrings = {
  en: {
    coach_title: "Touring Coach Partners",
    coach_description:
      "Through DutyBoost you will turn every coach departure into a terminal retail revenue event — credits for your passengers at booking, redeemable at terminal shops before departure, at no cost to you.",
    calculator: "ROI calculator",
  },
  nl: {
    coach_title: "Touringcarpartners",
    coach_description:
      "Met DutyBoost maakt u van elke touringcarafvaart een omzetmoment in het terminal — credits voor uw passagiers bij de boeking, vóór vertrek te verzilveren bij de winkels in het terminal, zonder kosten voor u.",
    calculator: "ROI-calculator",
  },
  fr: {
    coach_title: "Partenaires autocars",
    coach_description:
      "Avec DutyBoost, chaque départ en autocar devient un événement de revenus retail au terminal — des crédits pour vos passagers dès la réservation, échangeables auprès des commerces du terminal avant le départ, sans coût pour vous.",
    calculator: "Calculateur de ROI",
  },
  de: {
    coach_title: "Reisebus-Partner",
    coach_description:
      "Mit DutyBoost wird jede Busabfahrt zu einem Retail-Umsatzereignis am Terminal — Gutschriften für Ihre Fahrgäste bei der Buchung, vor der Abfahrt bei den Händlern im Terminal einlösbar, ohne Kosten für Sie.",
    calculator: "ROI-Rechner",
  },
  es: {
    coach_title: "Socios de autocares",
    coach_description:
      "Con DutyBoost, cada salida en autocar se convierte en un evento de ingresos retail en la terminal — créditos para sus pasajeros en la reserva, canjeables en los comercios de la terminal antes de la salida, sin coste para usted.",
    calculator: "Calculadora de ROI",
  },
  it: {
    coach_title: "Partner pullman",
    coach_description:
      "Con DutyBoost, ogni partenza in pullman diventa un'occasione di ricavi retail al terminal — crediti per i suoi passeggeri alla prenotazione, riscattabili presso i negozi del terminal prima della partenza, senza costi per lei.",
    calculator: "Calcolatore ROI",
  },
  pt: {
    coach_title: "Parceiros de autocarros",
    coach_description:
      "Com a DutyBoost, cada partida de autocarro passa a ser um momento de receita retail no terminal — créditos para os seus passageiros na reserva, resgatáveis nas lojas do terminal antes da partida, sem custos para si.",
    calculator: "Calculadora de ROI",
  },
};

export function getTravelPartnerCardStrings(lang) {
  const code = (lang || "en").split("-")[0];
  return travelPartnerCardStrings[code] || travelPartnerCardStrings.en;
}