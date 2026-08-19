import RoleSurvey from "@/components/survey/RoleSurvey";

export default function SurveyPosProvider() {
  return (
    <RoleSurvey
      config={{
        companyTypePrefix: "POS Provider – ",
        hero: {
          title: "Turn your POS network into",
          titleAccent: "recurring, performance-based revenue.",
          subtitle:
            "DutyBoost pays your POS a 0.25% commission on every validated DutyCredit basket across your entire store network — one lightweight integration, no setup fee, no operational risk.",
          badges: ["0.25% per sale", "No setup fee", "5 questions"],
        },
        q1: {
          label: "What best describes your POS provider business?",
          options: [
            "Boutique POS (up to 50 stores)",
            "Regional POS (50–500 stores)",
            "Enterprise POS (500+ stores)",
            "Payment / PSP platform",
            "Other",
          ],
        },
        q2: {
          label: "How many stores are on your POS network?",
          options: ["Under 50", "50 – 500", "500 – 2,000", "2,000+"],
        },
        q3: {
          label:
            "How appealing is earning 0.25% on every validated DutyCredit basket — with zero setup fee and no operational risk?",
          options: [
            "Yes, very attractive",
            "Somewhat attractive",
            "Need more details",
            "Not a priority right now",
          ],
        },
        q4: {
          label:
            "How open are you to adding a single lightweight DutyCredit validation call to your POS checkout workflow?",
          options: [
            "Yes – a lightweight API call is no problem",
            "Possibly – depends on the technical effort",
            "Unlikely – our setup makes this hard",
            "No – we don't modify our POS workflow",
          ],
        },
      }}
    />
  );
}