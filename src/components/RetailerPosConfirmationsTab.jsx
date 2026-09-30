import { useState, useEffect, useMemo } from "react";
import { base44 } from "@/api/base44Client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Search, Store, ChevronUp, ChevronDown, Trash2, ExternalLink } from "lucide-react";

const DETAIL_FIELDS = [
  ["Contact", "full_name"],
  ["Work email", "email"],
  ["Job title", "job_title"],
  ["Company", "company_name"],
  ["Website", "website"],
  ["Country", "country"],
  ["Stores / volume", "stores_volume"],
  ["POS providers in use", "pos_providers"],
  ["Internal POS / IT contact", "pos_contact_name"],
  ["Internal POS / IT email", "pos_contact_email"],
  ["Internal POS / IT phone", "pos_contact_phone"],
  ["System integrator", "si_company_name"],
  ["Integrator contact", "si_contact_name"],
  ["Integrator email", "si_contact_email"],
  ["Integrator phone", "si_contact_phone"],
  ["Authorisation", "submission_authorisation"],
  ["Message", "message"],
];

function DetailRow({ label, value }) {
  const text = Array.isArray(value) ? value.join(", ") : value;
  return (
    <div className="flex gap-3 text-sm">
      <span className="text-slate-400 font-medium shrink-0 w-44">{label}</span>
      <span className="text-slate-200 break-words">{text || "—"}</span>
    </div>
  );
}

export default function RetailerPosConfirmationsTab() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState({ field: "created_date", direction: "desc" });
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    base44.entities.RetailerPosConfirmation.list("-created_date", 500).then((data) => {
      setRows(data);
      setLoading(false);
    });
  }, []);

  const handleSort = (field) =>
    setSort((prev) => ({
      field,
      direction: prev.field === field && prev.direction === "asc" ? "desc" : "asc",
    }));

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    const data = rows.filter((r) =>
      [r.company_name, r.full_name, r.email, r.country, r.si_company_name]
        .filter(Boolean)
        .some((v) => v.toLowerCase().includes(q))
    );
    return data.sort((a, b) => {
      let av = a[sort.field] || "";
      let bv = b[sort.field] || "";
      if (typeof av === "string") {
        av = av.toLowerCase();
        bv = bv.toLowerCase();
      }
      if (av < bv) return sort.direction === "asc" ? -1 : 1;
      if (av > bv) return sort.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [rows, search, sort]);

  const handleDelete = async (id) => {
    await base44.entities.RetailerPosConfirmation.delete(id);
    setRows((prev) => prev.filter((r) => r.id !== id));
    setSelected(null);
  };

  return (
    <div className="space-y-4">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-white font-semibold">
            <Store className="w-4 h-4 text-emerald-400" /> Retailer POS Confirmations
            <span className="text-xs text-slate-400 font-normal">({rows.length})</span>
          </div>
          <div className="relative sm:w-72">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search company, contact, country…"
              className="pl-9 bg-slate-900 border-slate-600 text-white placeholder:text-slate-500"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-4 border-slate-600 border-t-emerald-400 rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-center text-slate-500 py-12 text-sm">
            No retailer POS confirmations received yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-slate-400 border-b border-slate-700">
                  <th className="py-2.5 pr-4 cursor-pointer" onClick={() => handleSort("company_name")}>
                    <span className="inline-flex items-center gap-1">
                      Company {sort.field === "company_name" && (sort.direction === "asc" ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />)}
                    </span>
                  </th>
                  <th className="py-2.5 pr-4 cursor-pointer" onClick={() => handleSort("full_name")}>
                    <span className="inline-flex items-center gap-1">
                      Contact {sort.field === "full_name" && (sort.direction === "asc" ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />)}
                    </span>
                  </th>
                  <th className="py-2.5 pr-4">Country</th>
                  <th className="py-2.5 pr-4">POS providers</th>
                  <th className="py-2.5 pr-4">System integrator</th>
                  <th className="py-2.5 pr-4 cursor-pointer" onClick={() => handleSort("created_date")}>
                    <span className="inline-flex items-center gap-1">
                      Received {sort.field === "created_date" && (sort.direction === "asc" ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />)}
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr
                    key={r.id}
                    onClick={() => setSelected(r)}
                    className="border-b border-slate-700/60 hover:bg-slate-700/30 cursor-pointer transition-colors"
                  >
                    <td className="py-2.5 pr-4 text-slate-200 font-medium">{r.company_name || "—"}</td>
                    <td className="py-2.5 pr-4 text-slate-300">
                      {r.full_name || "—"}
                      <div className="text-xs text-slate-500">{r.email}</div>
                    </td>
                    <td className="py-2.5 pr-4 text-slate-300">{r.country || "—"}</td>
                    <td className="py-2.5 pr-4 text-slate-400 text-xs">
                      {(r.pos_providers || []).join(", ") || "—"}
                    </td>
                    <td className="py-2.5 pr-4 text-slate-400 text-xs">{r.si_company_name || "—"}</td>
                    <td className="py-2.5 pr-4 text-slate-400 text-xs">
                      {r.created_date ? new Date(r.created_date).toLocaleDateString() : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-w-2xl bg-slate-800 border-slate-700 text-white max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selected?.company_name || "Retailer POS confirmation"}</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-3 pt-2">
              {DETAIL_FIELDS.map(([label, key]) => (
                <DetailRow key={key} label={label} value={selected[key]} />
              ))}
              <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-700">
                <a
                  href={selected.website?.startsWith("http") ? selected.website : `https://${selected.website || ""}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-emerald-300 hover:text-emerald-200"
                >
                  <ExternalLink className="w-4 h-4" /> Visit website
                </a>
                <Button
                  variant="outline"
                  className="gap-2 border-slate-600 text-slate-300 hover:text-white hover:bg-slate-700"
                  onClick={() => handleDelete(selected.id)}
                >
                  <Trash2 className="w-4 h-4" /> Delete
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}