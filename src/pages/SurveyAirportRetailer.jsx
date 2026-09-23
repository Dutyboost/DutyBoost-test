import RoleSurvey from "@/components/survey/RoleSurvey";
import { POS_PROVIDERS } from "@/data/posProviders";

const STORE_TYPES = [
  "Perfumes & cosmetics",
  "Electronics & gadgets",
  "Chocolate, confectionery & cheese",
  "Gifts & souvenirs",
  "Liquors, wines & tobacco",
  "Watches & jewellery",
  "Luxury",
  "Fashion & accessories",
  "Travel items",
  "Books & magazines",
  "Children & toys",
  "Pharmacy",
  "Food and drink",
];

export default function SurveyAirportRetailer() {
  return (
    <RoleSurvey
      surveyType="retailer"
      config={{
        companyTypePrefix: "Airport Retailer – ",
        hero: {
          title: "Turn passengers who never buy into",
          titleAccent: "incremental airport sales.",
          subtitle:
            "Airport retail may be leaving significant commercial value untapped. Ahead of DutyBoost's Q4 2026 launch, we're inviting a small group of decision-makers to answer 5 questions. 60 seconds that may change how you see the traveller journey.",
        },
        questions: [
          {
            label:
              "Of the travellers exposed to your airport retail stores, what percentage would you estimate leave without making a purchase?",
            options: [
              "Less than 30%",
              "30–50%",
              "51–70%",
              "More than 70%",
              "I don't know",
            ],
            field: "non_purchase_percentage",
          },
          {
            label:
              "How valuable would it be if you could activate those non-purchasing travellers days or weeks before they arrive at the airport, rather than only once they enter the airport environment?",
            options: [
              "Not valuable",
              "Slightly valuable",
              "Valuable",
              "Very valuable",
              "Extremely valuable",
            ],
            field: "pre_activation_value",
          },
          {
            label:
              "If a new customer-acquisition channel required no upfront marketing spend and you only paid after it generated a verified retail transaction, how interested would you be in exploring it?",
            options: [
              "Not interested",
              "Slightly interested",
              "Interested",
              "Very interested",
              "I would want to explore it",
            ],
            field: "pay_after_channel_interest",
          },
          {
            label:
              "If your Point-Of-Sales (POS) provider offered you a feature that turns non-converting passengers into incremental revenue, would you switch it on?",
            options: ["Yes", "No"],
            field: "snippet_willingness",
            exitOnNo: true,
          },
        ],
        contactless: true,
        travelPlatformLabel: "Which Point-of-Sale (POS) provider do you use?",
        travelPlatformCombobox: true,
        travelPlatformOptions: POS_PROVIDERS,
      }}
    />
  );
}