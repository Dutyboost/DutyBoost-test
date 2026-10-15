import { CurrencyProvider } from "@/components/calculator/CurrencyContext";
import PageFooter from "@/components/PageFooter";
import CruiseCalculatorBody from "@/components/cruise-calculator/CruiseCalculatorBody";

export default function PortDowntownCalculator() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 px-4 py-10">
      <CurrencyProvider>
        <CruiseCalculatorBody theme="purple" variant="port" prefillByCountry ctaTo="/ports-partner-request" />
        <PageFooter />
      </CurrencyProvider>
    </main>
  );
}