import RoleSurvey from "@/components/survey/RoleSurvey";

const COMPANY_TYPES = [
  "Travel Agency",
  "Airline",
  "Tour Operator",
  "OTA (Online Travel Agency)",
  "Hotel chain / Hospitality",
  "Car Rental company",
];

export default function SurveyTravelPartner() {
  return (
    <RoleSurvey
      surveyType="partner"
      config={{
        companyTypePrefix: "Travel Partner – ",
        hero: {
          title: "Your traveller relationship may be worth",
          titleAccent: "more than the original booking.",
          subtitle:
            "Your traveller relationship may be worth more than the original booking. Ahead of DutyBoost's Q4 2026 launch, we're inviting a small group of travel decision-makers to answer 5 questions. 60 seconds that may reveal a revenue opportunity currently going elsewhere.",
        },
        questions: [
          {
            label: "What type of travel company are you?",
            options: COMPANY_TYPES,
            field: "company_type",
          },
          {
            label:
              "How valuable would a new revenue stream generated from your travellers' airport retail purchases be to your organisation?",
            options: [
              "Low value",
              "Some value",
              "Valuable",
              "Very valuable",
              "Strategically valuable",
            ],
            field: "pre_activation_value",
          },
          {
            label:
              "What would make you most likely to participate in a new airport retail revenue model?",
            options: [
              "Additional revenue per traveller",
              "No upfront investment",
              "No operational changes",
              "Added traveller benefit",
              "Ability to differentiate our customer offering",
              "A combination of these",
            ],
            field: "pay_after_channel_interest",
          },
          {
            label:
              "If you could participate in revenue from airport retail purchases made by travellers who already booked with you, what would you want to understand first?",
            options: [
              "Revenue potential",
              "How it works for the traveller",
              "Technical integration",
              "Operational requirements",
              "Commercial model",
              "Which retailers/airports participate",
            ],
            field: "biggest_challenge",
          },
        ],
        contactless: true,
      }}
    />
  );
}