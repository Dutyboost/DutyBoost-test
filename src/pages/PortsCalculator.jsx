import { CurrencyProvider } from "@/components/calculator/CurrencyContext";
import PageFooter from "@/components/PageFooter";
import CruiseCalculatorBody from "@/components/cruise-calculator/CruiseCalculatorBody";

export default function PortsCalculator() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 px-4 py-10">
      <CurrencyProvider>
        <CruiseCalculatorBody
          badge="Port & Down Town Retail Partners"
          intro="Model one store with your own figures — pick your country or island, then your terminal from the list. Add every other store you operate and the calculator totals each island or country on its own, and all of them together."
          ctaLabel="Apply as a port & down town retail partner"
          ctaTo="/ports-partner-request"
        />
        <PageFooter />
      </CurrencyProvider>
    </main>
  );
}