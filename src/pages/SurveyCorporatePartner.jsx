import RoleSurvey from "@/components/survey/RoleSurvey";

export default function SurveyCorporatePartner() {
  return (
    <RoleSurvey
      config={{
        companyTypePrefix: "Corporate Partner – ",
        hero: {
          title: "Offset your company's T&E costs with",
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
            "Not a priority right now",
          ],
        },
        q4: {
          label:
            "How open are you to distributing DutyCredits to travelling employees through your existing booking or travel-management flow?",
          options: [
            "Yes – easy to add to our flow",
            "Possibly – depends on the setup",
            "Unlikely – our travel flow is restricted",
            "No – we don't manage travel distribution",
          ],
        },
      }}
    />
  );
}