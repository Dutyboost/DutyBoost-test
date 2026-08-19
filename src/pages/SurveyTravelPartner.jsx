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
      config={{
        companyTypePrefix: "Travel Partner – ",
        hero: {
          title: "Add a new passive revenue stream from",
          titleAccent: "your existing bookings.",
          subtitle:
            "DutyBoost turns every booking confirmation into a DutyCredit your traveller can spend at airport retail. You earn a commission on every redemption — no cost, no risk, just a simple snippet on your confirmation page.",
          badges: ["No cost · No risk", "2 minutes", "5 questions"],
        },
        q1: { label: "What type of travel company are you?", options: COMPANY_TYPES },
        q2: {
          label: "How many bookings do you process per month?",
          options: ["Under 2,000", "2,000 – 5,000", "5,000 – 10,000", "10,000 – 20,000", "20,000+"],
        },
        q3: {
          label:
            "How appealing is earning passive commission from your existing bookings — at no cost and no risk to you?",
          options: [
            "Yes, very attractive",
            "Somewhat attractive",
            "Need more details",
            "Not a priority right now",
          ],
        },
        q4: {
          label:
            "How open are you to adding a small snippet to your booking confirmation page that issues a DutyCredit to your traveller?",
          options: [
            "Yes – adding something to our confirmation page is very doable",
            "Possibly – depends on how easy it is",
            "Unlikely – our tech setup makes this hard",
            "No – we don't control that page",
          ],
        },
        contactless: true,
      }}
    />
  );
}