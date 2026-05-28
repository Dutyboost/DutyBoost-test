import { useState, useEffect, useMemo } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Download, ChevronUp, ChevronDown, Search, Users, Mail, Phone } from "lucide-react";

function StatCard({ icon: Icon, label, value, color }) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 text-center">
      <Icon className={`w-4 h-4 mx-auto mb-2 ${color}`} />
      <p className="text-xs text-slate-400 mb-1">{label}</p>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </div>
  );
}

export default function LeadsTab() {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState({ field: "created_date", direction: "desc" });
  const [loadingLeads, setLoadingLeads] = useState(true);
  const [selectedLead, setSelectedLead] = useState(null);

  useEffect(() => {
    base44.entities.Lead.list("-created_date", 500).then(data => {
      setLeads(data);
      setLoadingLeads(false);
    });
  }, []);

  const handleSort = (field) => {
    setSort(prev => ({
      field,
      direction: prev.field === field && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const filtered = useMemo(() => {
    let data = leads.filter(l =>
      l.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      l.email?.toLowerCase().includes(search.toLowerCase()) ||
      l.company_name?.toLowerCase().includes(search.toLowerCase()) ||
      l.phone?.includes(search)
    );
    data.sort((a, b) => {
      let av = a[sort.field] || "", bv = b[sort.field] || "";
      if (typeof av === "string") { av = av.toLowerCase(); bv = bv.toLowerCase(); }
      if (av < bv) return sort.direction === "asc" ? -1 : 1;
      if (av > bv) return sort.direction === "asc" ? 1 : -1;
      return 0;
    });
    return data;
  }, [leads, search, sort]);

  const handleExport = () => {
    const headers = ["Full Name", "Email", "Phone", "Company", "Website", "Industry", "Position", "Date"];
    const rows = filtered.map(l => [
      l.full_name, l.email, l.phone, l.company_name, l.website, l.industry, l.position,
      l.created_date ? new Date(l.created_date).toLocaleDateString() : "",
    ]);
    const csv = [headers, ...rows].map(r => r.map(c => `"${c || ""}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const SortArrow = ({ field }) => {
    if (sort.field !== field) return null;
    return sort.direction === "asc"
      ? <ChevronUp className="w-3 h-3 inline ml-1" />
      : <ChevronDown className="w-3 h-3 inline ml-1" />;
  };

  const cols = [
    { label: "Name", field: "full_name" },
    { label: "Email", field: "email" },
    { label: "Phone", field: "phone" },
    { label: "Company", field: "company_name" },
    { label: "Type", field: "industry" },
    { label: "Date", field: "created_date" },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <StatCard icon={Users} label="Total leads" value={leads.length} color="text-blue-300" />
        <StatCard icon={Mail} label="With email" value={leads.filter(l => l.email).length} color="text-green-300" />
        <StatCard icon={Phone} label="With phone" value={leads.filter(l => l.phone).length} color="text-purple-300" />
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 justify-between">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
            <Input
              placeholder="Search name, email, company..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9 bg-slate-900 border-slate-600 text-white placeholder:text-slate-500"
            />
          </div>
          <Button size="sm" variant="outline" onClick={handleExport} disabled={filtered.length === 0}
            className="gap-2 border-slate-600 text-slate-300 hover:text-white hover:bg-slate-700">
            <Download className="w-4 h-4" /> Export CSV ({filtered.length})
          </Button>
        </div>

        {loadingLeads ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-8 h-8 border-4 border-slate-600 border-t-blue-400 rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-center text-slate-500 py-12 text-sm">
            {leads.length === 0
              ? "No leads yet. Leads appear here when someone fills out the 'Request More Information' form."
              : "No results match your search."}
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-slate-400 border-b border-slate-700">
                  {cols.map(col => (
                    <th key={col.field} onClick={() => handleSort(col.field)}
                      className="pb-2 pr-4 cursor-pointer hover:text-white transition-colors select-none">
                      {col.label}<SortArrow field={col.field} />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {filtered.map(lead => (
                  <tr key={lead.id} onClick={() => setSelectedLead(lead)}
                    className="hover:bg-slate-700/30 cursor-pointer transition-colors">
                    <td className="py-2.5 pr-4 text-white font-medium">{lead.full_name || "—"}</td>
                    <td className="py-2.5 pr-4">
                      <a href={`mailto:${lead.email}`} onClick={e => e.stopPropagation()} className="text-blue-400 hover:underline">{lead.email || "—"}</a>
                    </td>
                    <td className="py-2.5 pr-4">
                      <a href={`tel:${lead.phone}`} onClick={e => e.stopPropagation()} className="text-blue-400 hover:underline">{lead.phone || "—"}</a>
                    </td>
                    <td className="py-2.5 pr-4 text-slate-300">{lead.company_name || "—"}</td>
                    <td className="py-2.5 pr-4">
                      <span className="px-2 py-0.5 rounded-full text-xs bg-blue-500/20 text-blue-300">{lead.industry || "—"}</span>
                    </td>
                    <td className="py-2.5 text-slate-400 text-xs">
                      {lead.created_date ? new Date(lead.created_date).toLocaleDateString() : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Dialog open={!!selectedLead} onOpenChange={() => setSelectedLead(null)}>
        <DialogContent className="max-w-md bg-slate-800 border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle className="text-white">Lead Details</DialogTitle>
          </DialogHeader>
          {selectedLead && (
            <div className="space-y-2 text-sm">
              {[
                { label: "Full Name", value: selectedLead.full_name },
                { label: "Email", value: selectedLead.email, href: `mailto:${selectedLead.email}` },
                { label: "Phone", value: selectedLead.phone, href: `tel:${selectedLead.phone}` },
                { label: "Company", value: selectedLead.company_name },
                { label: "Website", value: selectedLead.website, href: selectedLead.website },
                { label: "Industry", value: selectedLead.industry },
                { label: "Position", value: selectedLead.position },
                { label: "Submitted", value: selectedLead.created_date ? new Date(selectedLead.created_date).toLocaleString() : "" },
              ].filter(r => r.value).map(({ label, value, href }) => (
                <div key={label} className="flex justify-between gap-4 py-2 border-b border-slate-700 last:border-0">
                  <span className="text-slate-400 font-medium shrink-0">{label}</span>
                  {href ? (
                    <a href={href} className="text-blue-400 hover:underline text-right" target="_blank" rel="noopener noreferrer">{value}</a>
                  ) : (
                    <span className="text-slate-200 text-right">{value}</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}