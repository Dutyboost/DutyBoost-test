import RoleSurvey from "@/components/survey/RoleSurvey";

export default function SurveyCorporatePartner() {
  return (
    <RoleSurvey
      surveyType="corporate"
      config={{
        companyTypePrefix: "Corporate Partner – ",
        hero: {
          title: "Your existing business travel may hold",
          titleAccent: "value beyond getting from A to B.",
          subtitle:
            "Your existing business travel may hold value beyond getting employees from A to B. Ahead of DutyBoost's Q4 2026 launch, we're inviting a small group of corporate decision-makers to answer 4 questions. 60 seconds that may change how you look at the value of your T&E spend.",
        },
        questions: [
          {
            label: "How valuable would it be if your existing employee travel activity could create an additional employee benefit without increasing your T&E budget?",
            options: ["Not valuable", "Slightly valuable", "Valuable", "Very valuable", "Extremely valuable"],
            field: "pre_activation_value",
          },
          {
            label: "If employee business travel could also generate a new revenue stream for your organisation, which aspect would be most important to you?",
            options: [
              "Additional company revenue",
              "Added employee benefit",
              "No additional T&E spend",
              "No change to existing travel booking processes",
              "Minimal administration",
              "A combination of these",
            ],
            field: "pay_after_channel_interest",
          },
          {
            label: "What would you need to understand first before considering a model that creates both employee benefits and company revenue from existing business travel?",
            options: [
              "Financial value for the company",
              "Value for employees",
              "How it integrates with our existing T&E process",
              "Administrative requirements",
              "Data/privacy implications",
              "How the commercial model works",
            ],
            field: "biggest_challenge",
          },
        ],
        travelPlatformLabel: "Which travel & expense platform does your company use?",
        travelPlatformCombobox: true,
        travelPlatformMandatory: true,
        travelPlatformOptions: [
          "Airbase",
          "American Express GBT",
          "ATG (American Travel Group)",
          "BCD Travel",
          "Brex",
          "Certify",
          "Corporate Traveler",
          "Coupa",
          "CTM (Corporate Travel Management)",
          "CWT (Carlson Wagonlit)",
          "Deem",
          "Egencia",
          "Emburse",
          "Expensify",
          "FOX World Travel",
          "Fyle",
          "Happay",
          "JAGGAER",
          "Mesh Payments",
          "Navan (TripActions)",
          "Omella",
          "PayEm",
          "Payhawk",
          "Pendulum",
          "Pleo",
          "Ramp",
          "ReedGo",
          "Rydoo",
          "SAP Concur",
          "Sila",
          "Spendesk",
          "Spendology",
          "Spotnana",
          "TravelBank",
          "Travelink",
          "TravelPerk",
          "TripBam",
          "TripIt (SAP)",
          "Weel",
          "Yokoy",
          "Zoho Expense",
        ],
      }}
    />
  );
}