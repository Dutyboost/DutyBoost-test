import { Store } from "lucide-react";
import DemoPill from "./DemoPill";

/**
 * Demo-only bar for the Airport Retailer Dashboard: pick the company, then the
 * airport or store whose figures the dashboard should show.
 */
export default function DemoDashboardBar({
  companies,
  companySlug,
  company,
  onCompanyChange,
  airports = [],
  stores = [],
  airport,
  onAirportChange,
  storeId,
  onStoreChange,
  logoUrl,
}) {
  const selectClass = "text-sm border border-input rounded-lg px-3 py-1.5 bg-background max-w-[250px]";
  const countries = [...new Set(airports.map(a => a.country).filter(Boolean))];
  // Stores are listed per airport, so a store can be picked straight from the network view.
  const storeGroups = airports
    .map(a => ({ airport: a, stores: stores.filter(s => s.airport === a.code) }))
    .filter(g => g.stores.length > 0 && (!airport || g.airport.code === airport));

  const handleAirport = (value) => onAirportChange(value === "all" ? "" : value);

  return (
    <div className="flex items-center justify-between gap-4 flex-wrap bg-card border border-border rounded-xl px-5 py-4">
      <div className="flex items-center gap-3">
        <Store className="w-5 h-5 text-orange-500 shrink-0" />
        <div>
          <p className="font-heading font-bold">{company.label}</p>
          <p className="text-xs text-muted-foreground">Airport Retailer Dashboard</p>
        </div>
        <DemoPill />
      </div>
      <div className="flex items-center gap-3 flex-wrap">
        <select className={selectClass} value={companySlug} onChange={e => onCompanyChange(e.target.value)}>
          {Object.entries(companies).map(([slug, c]) => (
            <option key={slug} value={slug}>{c.label}</option>
          ))}
        </select>

        <select className={selectClass} value={airport || "all"} onChange={e => handleAirport(e.target.value)}>
          <option value="all">All airports</option>
          {countries.length > 1 ? countries.map(country => (
            <optgroup key={country} label={country}>
              {airports.filter(a => a.country === country).map(a => (
                <option key={a.code} value={a.code}>{a.name} ({a.code})</option>
              ))}
            </optgroup>
          )) : airports.map(a => (
            <option key={a.code} value={a.code}>{a.name} ({a.code})</option>
          ))}
        </select>

        <select className={selectClass} value={storeId} onChange={e => onStoreChange(e.target.value)}>
          <option value="all">All stores</option>
          {storeGroups.map(({ airport: ap, stores: list }) => (
            <optgroup key={ap.code} label={`${ap.name} (${ap.code})`}>
              {list.map(s => (
                <option key={s.id} value={s.id}>{s.store_name}</option>
              ))}
            </optgroup>
          ))}
        </select>

        {logoUrl && (
          <img src={logoUrl} alt={company.label} className="h-[75px] w-auto object-contain shrink-0" />
        )}
      </div>
    </div>
  );
}