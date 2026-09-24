import { useMemo, useState } from "react";
import { Download, Loader2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useAirportDirectory from "./useAirportDirectory";
import AirportDirectoryStats from "./AirportDirectoryStats";
import AirportDirectoryTable from "./AirportDirectoryTable";
import { buildAirportRows, buildStoreRows, downloadCsv } from "./campaignCsv";
import { normalizeCountry } from "@/data/countryRegions";

export default function AirportDirectorySection() {
  const { loading, airports, storesByCode, storeCount } = useAirportDirectory();
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("all");
  const [showAll, setShowAll] = useState(false);

  const stats = useMemo(() => {
    const countries = new Set(
      airports.map((a) => normalizeCountry(a.country)).filter(Boolean)
    );
    const regions = new Set(airports.map((a) => a.region).filter((r) => r && r !== "Other"));
    return {
      airportsResearched: airports.length,
      airportsWithStores: airports.filter((a) => a.storeCount > 0).length,
      stores: storeCount,
      regions: regions.size,
      countries: countries.size,
    };
  }, [airports, storeCount]);

  const regionOptions = useMemo(
    () => Array.from(new Set(airports.map((a) => a.region))).sort((a, b) => a.localeCompare(b)),
    [airports]
  );

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return airports
      .filter((a) => showAll || a.storeCount > 0)
      .filter((a) => region === "all" || a.region === region)
      .filter((a) => !q
        || a.code.toLowerCase().includes(q)
        || (a.name || "").toLowerCase().includes(q)
        || (a.city || "").toLowerCase().includes(q)
        || (a.country || "").toLowerCase().includes(q))
      .sort((a, b) => b.storeCount - a.storeCount || a.code.localeCompare(b.code));
  }, [airports, query, region, showAll]);

  return (
    <section className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h2 className="text-lg font-heading font-bold">Airport & store directory</h2>
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
            Live from the researched airport directory — every airport crawled, and the travel-retail
            stores mapped at each one. Food and beverage outlets are excluded.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="gap-2" disabled={loading}
            onClick={() => downloadCsv("airport_directory.csv", buildAirportRows(airports))}>
            <Download className="w-4 h-4" />
            Airports CSV
          </Button>
          <Button variant="outline" className="gap-2" disabled={loading}
            onClick={() => downloadCsv("airport_stores_directory.csv", buildStoreRows(airports, storesByCode))}>
            <Download className="w-4 h-4" />
            Stores CSV
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground">
          <Loader2 className="w-4 h-4 animate-spin" />
          Loading the researched directory…
        </div>
      ) : (
        <>
          <AirportDirectoryStats stats={stats} />

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search airport, city, country or IATA code…"
                className="pl-9"
              />
            </div>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="h-9 rounded-md border border-input bg-transparent px-3 text-sm shadow-sm"
            >
              <option value="all">All regions</option>
              {regionOptions.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
            <label className="flex items-center gap-2 text-sm text-muted-foreground whitespace-nowrap">
              <input
                type="checkbox"
                checked={showAll}
                onChange={(e) => setShowAll(e.target.checked)}
                className="accent-primary"
              />
              Include airports with no stores yet
            </label>
          </div>

          <p className="text-xs text-muted-foreground">
            Showing {rows.length} airport{rows.length !== 1 ? "s" : ""}. Click a row to see the stores
            mapped there.
          </p>

          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <AirportDirectoryTable rows={rows} storesByCode={storesByCode} />
          </div>
        </>
      )}
    </section>
  );
}