import { CurrencyProvider } from "@/components/calculator/CurrencyContext";
import PageFooter from "@/components/PageFooter";
import CruiseCalculatorBody from "@/components/cruise-calculator/CruiseCalculatorBody";

export default function CoachPartnerCalculator() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 px-4 py-10">
      <CurrencyProvider>
        <CruiseCalculatorBody variant="coach" theme="orange" ctaTo="/coach-signup" />
        <PageFooter />
      </CurrencyProvider>
    </main>
  );
}