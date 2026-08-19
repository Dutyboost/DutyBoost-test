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
            "DutyBoost pays your POS a 10% commission on every validated DutyCredit basket across your entire store network perpetually — one lightweight integration, no setup fee, no operational risk.",
          badges: ["10% per sale", "5 questions", "2 minutes"],
        },
        q1: {
          label: "What annual revenue does your POS network generate?",
          options: ["Under €10M", "€10M – €50M", "€50M – €250M", "€250M+"],
        },
        q2: {
          label: "How many stores are on your POS network?",
          options: ["Under 50", "50 – 500", "500 – 2,000", "2,000+"],
        },
        q3: {
          label:
            "Would you be interested in turning your existing POS into a recurring, performance-based revenue stream?",
          options: [
            "Yes, very attractive",
            "Somewhat attractive",
            "Need more details",
          ],
        },
        q4: {
          label:
            "Would you add a single lightweight DutyCredit validation call to your POS checkout workflow if it strengthened retailer loyalty, reduced churn, and generated more revenue for every retailer you serve?",
          options: [
            "Yes – a lightweight API call is no problem",
            "Possibly – depends on the technical effort",
          ],
        },
        requireContactDetails: true,
      }}
    />
  );
}