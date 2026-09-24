function toCsv(rows) {
  const escape = (v) => {
    const s = String(v ?? "");
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  return rows.map((r) => r.map(escape).join(",")).join("\n");
}

export function downloadCsv(filename, rows) {
  const csv = toCsv(rows);
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

const AIRPORT_HEADER = ["Airport Code", "Airport Name", "City", "Country", "Region", "Stores Mapped"];
const STORE_HEADER = [
  "Airport Code", "Airport Name", "City", "Country", "Region",
  "Store Name", "Category", "Departure Hall",
];

export function buildAirportRows(airports) {
  return [
    AIRPORT_HEADER,
    ...airports.map((a) => [a.code, a.name, a.city, a.country, a.region, a.storeCount]),
  ];
}

export function buildStoreRows(airports, storesByCode) {
  const rows = [STORE_HEADER];
  airports.forEach((a) => {
    (storesByCode[a.code] || []).forEach((s) => {
      rows.push([
        a.code, a.name, a.city, a.country, a.region,
        s.store_name, s.category, s.departure_hall,
      ]);
    });
  });
  return rows;
}