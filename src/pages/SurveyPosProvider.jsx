import RoleSurvey from "@/components/survey/RoleSurvey";

export default function SurveyPosProvider() {
  return (
    <RoleSurvey
      surveyType="pos"
      config={{
        companyTypePrefix: "POS Provider – ",
        hero: {
          title: "Turn your POS network into",
          titleAccent: "recurring, performance-based revenue.",
          subtitle:
            "Your POS may be commercially more valuable than the role it plays today. Ahead of DutyBoost's Q4 2026 launch, we're inviting a small group of POS decision-makers to answer 5 questions. 60 seconds that may change how you see the value of every transaction your technology enables.",
        },
        questions: [
          {
            label:
              "Beyond your existing software, licensing or transaction fees, does your POS currently generate revenue from the commercial value it helps retailers create?",
            options: [
              "No",
              "In limited cases",
              "Yes, in some models",
              "Yes, extensively",
              "Prefer not to say",
            ],
            field: "commission_attractive",
          },
          {
            label:
              "How attractive would it be if your existing POS infrastructure could generate an additional recurring revenue stream from qualifying retail transactions?",
            options: [
              "Not attractive",
              "Slightly attractive",
              "Attractive",
              "Very attractive",
              "Strategically attractive",
            ],
            field: "pay_after_channel_interest",
          },
          {
            label: "What would be most important when considering such a model?",
            options: [
              "Revenue potential",
              "Minimal integration effort",
              "Scalability across existing retail clients",
              "No disruption to existing POS/payment flows",
              "Commercial ownership/attribution",
              "Retailer demand",
            ],
            field: "biggest_challenge",
          },
        ],
        requireContactDetails: true,
        retailersServedLabel: "Which airport retail companies do you serve?",
        retailersServedMandatory: true,
        retailersServedOptions: [
          "Abu Dhabi Duty Free",
          "Aer Rianta International (ARI)",
          "Aldeasa",
          "Areas (Elior)",
          "Atü Duty Free",
          "Autogrill",
          "Avolta",
          "Bahrain Duty Free",
          "Bali Duty Free",
          "Bangalore Duty Free",
          "Capi Lux",
          "China Duty Free Group (CDFG)",
          "Cyprus Duty Free",
          "Delhi Duty Free Services",
          "DFS Group",
          "Dubai Duty Free",
          "Duty Free Americas",
          "Egypt Duty Free",
          "Flemingo International",
          "Galeries Lafayette Travel Retail",
          "Gebr. Heinemann",
          "Heathrow Airport (World Duty Free)",
          "Hudson Group",
          "InMotion Entertainment",
          "Istanbul Airport Travel Retail",
          "JAT (Japan Airport Terminal)",
          "JR Duty Free",
          "King Power International",
          "Lagardère Travel Retail",
          "Lotte Duty Free",
          "Malta Duty Free",
          "Marshall Retail Group",
          "Mumbai Travel Retail",
          "Nuance Travel Retail",
          "Oman Duty Free",
          "Paradies Lagardère",
          "Peninsula",
          "Qatar Duty Free",
          "Regstaer",
          "Rimas Colombia",
          "Saudi Duty Free",
          "Shilla Duty Free",
          "SP Duty Free",
          "SSP Group",
          "Stellar Partners",
          "TAV Operations",
          "Unibail-Rodamco-Westfield (URW)",
          "Unifree",
          "WHSmith Travel",
          "World Duty Free",
        ],
      }}
    />
  );
}