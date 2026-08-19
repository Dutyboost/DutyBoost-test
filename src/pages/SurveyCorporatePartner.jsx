import RoleSurvey from "@/components/survey/RoleSurvey";

export default function SurveyCorporatePartner() {
  return (
    <RoleSurvey
      config={{
        companyTypePrefix: "Corporate Partner – ",
        hero: {
          title: "Offset your company's T&E costs with",
          titleAccent: "DutyCredits for travelling employees.",
          subtitle:
            "DutyBoost issues DutyCredits worth €5–€60 to your travelling employees before they fly — an airport perk for staff, with commission credited against your trip expenses. No cost, no integration, no policy change.",
          badges: ["T&E cost offset", "Employee perk", "5 questions"],
        },
        q1: {
          label: "What best describes your organisation?",
          options: [
            "Corporate (in-house travel)",
            "Travel Management Company (TMC)",
            "Business Travel Platform / OTA",
            "Other",
          ],
        },
        q2: {
          label: "How many business trips do your employees take per year?",
          options: ["Under 500", "500 – 2,000", "2,000 – 5,000", "5,000+"],
        },
        q3: {
          label:
            "How appealing is offsetting T&E costs via DutyCredits — at no cost, while giving travelling employees an airport perk?",
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