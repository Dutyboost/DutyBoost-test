import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { Download, Plus, Trash2, RotateCcw } from "lucide-react";
import DutyBoostLogo from "../components/DutyBoostLogo";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "corendon-phygrid-template-v1";

const SEED_ROWS = [
  { country: "Curaçao", airport: "Willemstad (Hato)" },
  { country: "Greece", airport: "Crete (Heraklion)" },
  { country: "Greece", airport: "Kos" },
  { country: "Greece", airport: "Rhodes" },
  { country: "Greece", airport: "Zakynthos" },
  { country: "Greece", airport: "Corfu" },
  { country: "Greece", airport: "Lesbos (Mytilene)" },
  { country: "Greece", airport: "Samos" },
  { country: "Spain", airport: "Gran Canaria" },
  { country: "Spain", airport: "Tenerife South" },
  { country: "Spain", airport: "Mallorca (Palma)" },
  { country: "Spain", airport: "Malaga" },
  { country: "Spain", airport: "Fuerteventura" },
  { country: "Spain", airport: "Lanzarote" },
  { country: "Bulgaria", airport: "Burgas" },
];

const CORENDON_OPTIONS = ["", "Lands", "Departs", "Lands & Departs", "No service"];
const PHYGRID_OPTIONS = ["", "Yes", "No", "Planned"];

const buildRows = (saved) => {
  const source = saved?.length ? saved : SEED_ROWS;
  return source.map((r, i) => ({
    id: r.id || `row-${i}-${Math.random().toString(36).slice(2, 7)}`,
    country: r.country || "",
    airport: r.airport || "",
    corendon: r.corendon || "",
    avolta: r.avolta || "Yes",
    phygrid: r.phygrid || "",
  }));
};

export default function AirportRolloutTemplate() {
  const [rows, setRows] = useState(() => {
    try {
      return buildRows(JSON.parse(localStorage.getItem(STORAGE_KEY) || "null"));
    } catch {
      return buildRows(null);
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rows));
  }, [rows]);

  const update = (id, field, value) =>
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, [field]: value } : r)));

  const addRow = () =>
    setRows((prev) => [
      ...prev,
      { id: `row-${Date.now()}`, country: "", airport: "", corendon: "", avolta: "", phygrid: "" },
    ]);

  const removeRow = (id) => setRows((prev) => prev.filter((r) => r.id !== id));

  const reset = () => setRows(buildRows(null));

  const download = () => {
    const header = ["Country", "Airport", "Lands/ Departs", "Avolta at airport", "Phygrid Mobile POS"];
    const body = rows.map((r) => [r.country, r.airport, r.corendon, r.avolta, r.phygrid]);
    const sheet = XLSX.utils.aoa_to_sheet([header, ...body]);
    sheet["!cols"] = [{ wch: 16 }, { wch: 26 }, { wch: 20 }, { wch: 18 }, { wch: 22 }];
    const book = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, sheet, "Corendon + Avolta");
    XLSX.writeFile(book, "Corendon_Phygrid_airport_template.xlsx");
  };

  const corendonFilled = rows.filter((r) => r.corendon).length;
  const phygridFilled = rows.filter((r) => r.phygrid).length;

  return (
    <div className="min-h-screen bg-background font-body">
      <nav className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <DutyBoostLogo height={38} />
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={reset} className="gap-1.5 hidden sm:inline-flex">
              <RotateCcw className="w-4 h-4" /> Reset
            </Button>
            <Button size="sm" onClick={download} className="gap-1.5">
              <Download className="w-4 h-4" /> Download sheet
            </Button>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        <header className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-heading font-bold">Airport Rollout Template</h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-3xl leading-relaxed">
            Airport presence of Avolta is pre-filled from the shared sheet. Corendon completes the
            arrival and departure column, Phygrid completes the mobile POS column. Both can be edited
            here and downloaded as an Excel file.
          </p>
        </header>

        <div className="grid sm:grid-cols-2 gap-3">
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">For Corendon</p>
            <p className="text-sm font-medium mt-1">Lands / Departs — {corendonFilled} of {rows.length} filled</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">For Phygrid</p>
            <p className="text-sm font-medium mt-1">Mobile POS — {phygridFilled} of {rows.length} filled</p>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/60">
                <tr className="text-left">
                  <th className="px-3 py-3 font-medium">Country</th>
                  <th className="px-3 py-3 font-medium">Airport</th>
                  <th className="px-3 py-3 font-medium">Lands / Departs</th>
                  <th className="px-3 py-3 font-medium">Avolta at airport</th>
                  <th className="px-3 py-3 font-medium">Phygrid Mobile POS</th>
                  <th className="px-3 py-3" />
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id} className="border-t border-border">
                    <td className="px-3 py-2">
                      <input
                        value={row.country}
                        onChange={(e) => update(row.id, "country", e.target.value)}
                        className="w-full bg-transparent border border-transparent hover:border-border focus:border-primary rounded-md px-2 py-1.5 outline-none min-w-[110px]"
                        aria-label="Country"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <input
                        value={row.airport}
                        onChange={(e) => update(row.id, "airport", e.target.value)}
                        className="w-full bg-transparent border border-transparent hover:border-border focus:border-primary rounded-md px-2 py-1.5 outline-none min-w-[160px]"
                        aria-label="Airport"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <select
                        value={row.corendon}
                        onChange={(e) => update(row.id, "corendon", e.target.value)}
                        className="w-full bg-transparent border border-border rounded-md px-2 py-1.5 outline-none focus:border-primary min-w-[150px]"
                        aria-label="Corendon lands or departs"
                      >
                        {CORENDON_OPTIONS.map((o) => (
                          <option key={o || "empty"} value={o}>{o || "—"}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-3 py-2">
                      <input
                        value={row.avolta}
                        onChange={(e) => update(row.id, "avolta", e.target.value)}
                        className="w-full bg-transparent border border-transparent hover:border-border focus:border-primary rounded-md px-2 py-1.5 outline-none min-w-[90px]"
                        aria-label="Avolta at airport"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <select
                        value={row.phygrid}
                        onChange={(e) => update(row.id, "phygrid", e.target.value)}
                        className="w-full bg-transparent border border-border rounded-md px-2 py-1.5 outline-none focus:border-primary min-w-[130px]"
                        aria-label="Phygrid mobile POS"
                      >
                        {PHYGRID_OPTIONS.map((o) => (
                          <option key={o || "empty"} value={o}>{o || "—"}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-2 py-2 text-right">
                      <button
                        onClick={() => removeRow(row.id)}
                        className="p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-muted transition-colors"
                        aria-label="Remove row"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="border-t border-border p-3">
            <Button variant="outline" size="sm" onClick={addRow} className="gap-1.5">
              <Plus className="w-4 h-4" /> Add airport
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}