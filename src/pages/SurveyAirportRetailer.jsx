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
            "DutyBoost sends pre-activated travellers to your store with a DutyCredit worth €5–€60 to spend. You only pay a small performance fee when a sale happens — no upfront cost, no risk.",
          badges: ["No upfront cost", "2 minutes", "5 questions"],
        },
        q1: { label: "What type of store do you operate?", options: STORE_TYPES },
        q2: {
          label: "How many travellers visit your store(s) per month?",
          options: ["Under 1,000", "1,000 – 5,000", "5,000 – 20,000", "20,000+"],
        },
        q3: {
          label:
            "How appealing is earning incremental sales from non-converting passengers — with no upfront cost, paying only a small fee on validated sales?",
          options: [
            "Yes, very attractive – more foot traffic is always welcome",
            "Somewhat attractive – depends on the terms",
            "Need more details before deciding",
            "Not a priority right now",
          ],
        },
        q4: {
          label: "How comfortable are you simply turning on DutyBoost inside your existing POS dashboard?",
          options: [
            "Yes – happy to enable a feature in our POS",
            "Possibly – depends on who controls the POS",
            "Unlikely – our POS is managed by a third party",
            "No – we don't have access to POS settings",
          ],
        },
      }}
    />
  );
}