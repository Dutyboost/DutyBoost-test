import { useMemo } from "react";
import { AIRPORT_RETAIL_COMPANIES } from "@/data/airportRetailCompanies";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { downloadCsv } from "./campaignCsv";

function uniqueSorted(arr) {
  return Array.from(new Set(arr.filter(Boolean))).sort((a, b) => a.localeCompare(b));
}

export default function RetailCompaniesTable() {
  const companies = useMemo(() => {
    return AIRPORT_RETAIL_COMPANIES.map((c) => {
      const airports = Array.isArray(c.airports) ? c.airports : [];
      const regions = uniqueSorted(airports.map((a) => a.region));
      const countries = uniqueSorted(airports.map((a) => a.country));
      return {
        name: c.name,
        airportCount: airports.length,
        regions: regions.join(" / "),
        countries: countries.join(" / "),
        airportCodes: airports.map((a) => a.code).join(" "),
      };
    }).sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  const handleDownloadCsv = () => {
    const header = ["Company Name", "Airport Count", "Regions", "Countries", "Airport Codes"];
    const rows = [header, ...companies.map((c) => [c.name, c.airportCount, c.regions, c.countries, c.airportCodes])];
    downloadCsv("airport_retailers_campaign_list.csv", rows);
  };

  return (
    <section className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h2 className="text-lg font-heading font-bold">Retail companies (curated list)</h2>
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
            {companies.length} airport retail companies with their known airport footprint, pulled from the
            calculator dataset. Export to CSV and import into your email campaign tool.
          </p>
        </div>
        <Button onClick={handleDownloadCsv} className="gap-2">
          <Download className="w-4 h-4" />
          Download CSV
        </Button>
      </div>

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-muted-foreground">
              <tr>
                <th className="text-left font-medium px-4 py-3">#</th>
                <th className="text-left font-medium px-4 py-3">Company Name</th>
                <th className="text-left font-medium px-4 py-3">Airports</th>
                <th className="text-left font-medium px-4 py-3">Regions</th>
                <th className="text-left font-medium px-4 py-3">Countries</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((c, i) => (
                <tr key={c.name} className="border-t border-border hover:bg-muted/30">
                  <td className="px-4 py-3 text-muted-foreground">{i + 1}</td>
                  <td className="px-4 py-3 font-medium text-foreground">{c.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{c.airportCount}</td>
                  <td className="px-4 py-3 text-muted-foreground">{c.regions}</td>
                  <td className="px-4 py-3 text-muted-foreground">{c.countries}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}