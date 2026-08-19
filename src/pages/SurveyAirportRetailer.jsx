import RoleSurvey from "@/components/survey/RoleSurvey";

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
      config={{
        companyTypePrefix: "Airport Retailer – ",
        hero: {
          title: "Turn the 90% of passengers who never buy into",
          titleAccent: "incremental airport sales.",
          subtitle:
            "DutyBoost sends pre-activated travellers to your store with a DutyCredit that gives them €1 off a €20 basket up to €60 off a €300+ basket. You only pay a 2.5% platform fee on the validated basket when a sale happens — no upfront cost, no risk.",
          badges: ["No upfront cost", "2 minutes", "5 questions"],
        },
        q1: { label: "What type of store do you operate?", options: STORE_TYPES },
        q2: {
          label: "How many travellers visit your store(s) per month?",
          options: ["Under 1,000", "1,000 – 5,000", "5,000 – 20,000", "20,000+"],
        },
        q3: {
          label: "Would you be interested in earning incremental revenue from non-converting passengers?",
          options: ["Yes", "No"],
        },
        q4: {
          label: "If your POS provider offered you a feature that turns non-converting passengers into incremental revenue, would you switch it on?",
          options: ["Yes", "No"],
        },
        posProviderLabel: "Name of your Point-of-Sale (POS) provider *",
        contactless: true,
      }}
    />
  );
}