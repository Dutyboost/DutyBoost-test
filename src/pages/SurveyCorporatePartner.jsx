import RoleSurvey from "@/components/survey/RoleSurvey";

export default function SurveyCorporatePartner() {
  return (
    <RoleSurvey
      surveyType="corporate"
      config={{
        companyTypePrefix: "Corporate Partner – ",
        hero: {
          title: "Offset some of your company's T&E costs with",
          titleAccent: "commission earned on every airport purchase.",
          subtitle:
            "Your company earns commission on every DutyCredit redeemed at the airport by your travelling employees — credited directly against your T&E spend. The only investment is implementing DutyBoost; no ongoing cost, no integration, no policy change.",
          badges: ["T&E cost offset", "Commission earned", "5 questions"],
        },
        q1: {
          label: "What is your company's annual T&E spend?",
          options: ["€1M – €5M", "€5M – €25M", "€25M+"],
        },
        q2: {
          label: "How many business trips do your employees take per year?",
          options: ["Under 500", "500 – 2,000", "2,000 – 5,000", "5,000+"],
        },
        q3: {
          label:
            "How appealing is earning commission on every DutyCredit redeemed to offset your company's T&E costs — at no cost beyond implementing DutyBoost?",
          options: [
            "Yes, very attractive",
            "Somewhat attractive",
            "Need more details",
          ],
        },
        q4: {
          label:
            "How open are you to distributing DutyCredits to travelling employees through your existing booking or travel-management flow?",
          options: [
            "Yes – easy to add to our flow",
            "Possibly – depends on the setup",
          ],
        },
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