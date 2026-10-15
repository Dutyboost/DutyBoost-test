import { CurrencyProvider } from "@/components/calculator/CurrencyContext";
import PageFooter from "@/components/PageFooter";
import CruiseCalculatorBody from "@/components/cruise-calculator/CruiseCalculatorBody";

export default function PortsCalculator() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 px-4 py-10">
      <CurrencyProvider>
        <CruiseCalculatorBody
          theme="purple"
          prefillByCountry
          badge="Port & Down Town Retail Partners"
          intro="Pick your country or island and your terminal, and we pre-fill indicative 2025 figures for that market — adjust them to what you see in your own store. Add every other store you operate and the calculator totals each island or country on its own, and all of them together."
          ctaLabel="Apply as a port & down town retail partner"
          ctaTo="/ports-partner-request"
        />
        <PageFooter />
      </CurrencyProvider>
    </main>
  );
}