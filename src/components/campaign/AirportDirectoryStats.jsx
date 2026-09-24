const CARDS = [
  { key: "airportsResearched", label: "Airports researched" },
  { key: "airportsWithStores", label: "Airports with stores mapped" },
  { key: "stores", label: "Stores mapped" },
  { key: "regions", label: "Regions" },
  { key: "countries", label: "Countries" },
];

export default function AirportDirectoryStats({ stats }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {CARDS.map((c) => (
        <div key={c.key} className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground">{c.label}</p>
          <p className="text-2xl font-heading font-bold mt-1">{stats[c.key]}</p>
        </div>
      ))}
    </div>
  );
}