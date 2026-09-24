import { Building2 } from "lucide-react";
import AirportDirectorySection from "@/components/campaign/AirportDirectorySection";
import RetailCompaniesTable from "@/components/campaign/RetailCompaniesTable";

export default function AirportRetailersCampaignList() {
  return (
    <div className="space-y-8 p-4 sm:p-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl font-heading font-bold flex items-center gap-2">
          <Building2 className="w-6 h-6 text-primary" />
          Airport Retail — Campaign List
        </h1>
        <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
          The researched airport and store directory, plus the curated retail company list — ready to
          export for campaign targeting.
        </p>
      </div>

      <AirportDirectorySection />
      <RetailCompaniesTable />
    </div>
  );
}