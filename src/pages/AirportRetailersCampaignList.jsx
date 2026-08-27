import { useMemo } from "react";
import { AIRPORT_RETAIL_COMPANIES } from "@/data/airportRetailCompanies";
import { Button } from "@/components/ui/button";
import { Download, Building2, MapPin } from "lucide-react";

function uniqueSorted(arr) {
  return Array.from(new Set(arr.filter(Boolean))).sort((a, b) => a.localeCompare(b));
}

function toCsv(rows) {
  const escape = (v) => {
    const s = String(v ?? "");
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  return rows.map((r) => r.map(escape).join(",")).join("\n");
}

export default function AirportRetailersCampaignList() {
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
    const csv = toCsv(rows);
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "airport_retailers_campaign_list.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 p-4 sm:p-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold flex items-center gap-2">
            <Building2 className="w-6 h-6 text-primary" />
            Airport Retailers — Campaign List
          </h1>
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
            {companies.length} airport retail companies pulled from the calculator dataset. Export to CSV and import into your email campaign tool.
          </p>
        </div>
        <Button onClick={handleDownloadCsv} className="gap-2">
          <Download className="w-4 h-4" />
          Download CSV
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground">Companies</p>
          <p className="text-2xl font-heading font-bold mt-1">{companies.length}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground">Airports covered</p>
          <p className="text-2xl font-heading font-bold mt-1">{companies.reduce((s, c) => s + c.airportCount, 0)}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground">Regions</p>
          <p className="text-2xl font-heading font-bold mt-1">{uniqueSorted(companies.flatMap((c) => c.regions.split(" / "))).length}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground">Countries</p>
          <p className="text-2xl font-heading font-bold mt-1">{uniqueSorted(companies.flatMap((c) => c.countries.split(" / "))).length}</p>
        </div>
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
                  <td className="px-4 py-3 text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {c.airportCount}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{c.regions}</td>
                  <td className="px-4 py-3 text-muted-foreground">{c.countries}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}