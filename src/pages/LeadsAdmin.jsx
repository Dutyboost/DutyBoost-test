import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Download, Search, ChevronUp, ChevronDown, X } from "lucide-react";
import { toast } from "sonner";

export default function LeadsAdmin() {
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState({ field: "created_date", direction: "desc" });
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState(null);

  // Fetch leads
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const data = await base44.entities.Lead.list("-created_date", 500);
        setLeads(data);
        setFilteredLeads(data);
      } catch (error) {
        toast.error("Failed to load leads");
      } finally {
        setLoading(false);
      }
    };
    fetchLeads();
  }, []);

  // Filter leads
  useEffect(() => {
    let filtered = leads.filter(lead =>
      lead.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      lead.email?.toLowerCase().includes(search.toLowerCase()) ||
      lead.company_name?.toLowerCase().includes(search.toLowerCase()) ||
      lead.phone?.includes(search)
    );

    // Sort leads
    filtered.sort((a, b) => {
      let aVal = a[sort.field];
      let bVal = b[sort.field];

      if (typeof aVal === "string") {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }

      if (aVal < bVal) return sort.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sort.direction === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredLeads(filtered);
  }, [search, sort, leads]);

  // Export to CSV
  const handleExport = () => {
    const headers = ["Full Name", "Email", "Phone", "Company", "Website", "Industry", "Date"];
    const rows = filteredLeads.map(lead => [
      lead.full_name,
      lead.email,
      lead.phone,
      lead.company_name,
      lead.website,
      lead.industry,
      new Date(lead.created_date).toLocaleDateString(),
    ]);

    const csv = [headers, ...rows].map(row =>
      row.map(cell => `"${cell}"`).join(",")
    ).join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success("Leads exported successfully");
  };

  const handleSort = (field) => {
    setSort(prev => ({
      field,
      direction: prev.field === field && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const SortIcon = ({ field }) => {
    if (sort.field !== field) return <div className="w-4 h-4" />;
    return sort.direction === "asc" ? (
      <ChevronUp className="w-4 h-4" />
    ) : (
      <ChevronDown className="w-4 h-4" />
    );
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-heading font-bold">Leads Management</h1>
          <p className="text-muted-foreground">View and manage all collected leads from forms</p>
        </div>

        <Card className="p-6">
          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-3 justify-between mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, company, or phone..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button onClick={handleExport} disabled={filteredLeads.length === 0} className="gap-2">
              <Download className="w-4 h-4" />
              Export CSV ({filteredLeads.length})
            </Button>
          </div>

          {/* Table */}
          {loading ? (
            <div className="text-center py-8 text-muted-foreground">Loading leads...</div>
          ) : filteredLeads.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {leads.length === 0 ? "No leads yet" : "No results match your search"}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    {[
                      { label: "Full Name", field: "full_name" },
                      { label: "Email", field: "email" },
                      { label: "Phone", field: "phone" },
                      { label: "Company", field: "company_name" },
                      { label: "Industry", field: "industry" },
                      { label: "Date", field: "created_date" },
                    ].map((col) => (
                      <th
                        key={col.field}
                        onClick={() => handleSort(col.field)}
                        className="px-4 py-3 text-left font-semibold text-foreground cursor-pointer hover:bg-muted transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          {col.label}
                          <SortIcon field={col.field} />
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map((lead) => (
                    <tr
                      key={lead.id}
                      onClick={() => setSelectedLead(lead)}
                      className="border-b border-border hover:bg-muted/50 transition-colors cursor-pointer"
                    >
                      <td className="px-4 py-3">{lead.full_name}</td>
                      <td className="px-4 py-3">
                        <a href={`mailto:${lead.email}`} className="text-primary hover:underline">
                          {lead.email}
                        </a>
                      </td>
                      <td className="px-4 py-3">
                        <a href={`tel:${lead.phone}`} className="text-primary hover:underline">
                          {lead.phone}
                        </a>
                      </td>
                      <td className="px-4 py-3">{lead.company_name}</td>
                      <td className="px-4 py-3">
                        <span className="inline-block px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium">
                          {lead.industry}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {new Date(lead.created_date).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>

      {/* Lead detail modal */}
      <Dialog open={!!selectedLead} onOpenChange={() => setSelectedLead(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Lead Details</DialogTitle>
          </DialogHeader>
          {selectedLead && (
            <div className="space-y-3 text-sm">
              {[
                { label: "Full Name", value: selectedLead.full_name },
                { label: "Email", value: selectedLead.email, href: `mailto:${selectedLead.email}` },
                { label: "Phone", value: selectedLead.phone, href: `tel:${selectedLead.phone}` },
                { label: "Company", value: selectedLead.company_name },
                { label: "Website", value: selectedLead.website, href: selectedLead.website },
                { label: "Industry", value: selectedLead.industry },
                { label: "Position", value: selectedLead.position },
                { label: "Decision Level", value: selectedLead.decision_level },
                { label: "Submitted", value: new Date(selectedLead.created_date).toLocaleString() },
              ].filter(r => r.value).map(({ label, value, href }) => (
                <div key={label} className="flex justify-between gap-4 py-2 border-b border-border last:border-0">
                  <span className="text-muted-foreground font-medium">{label}</span>
                  {href ? (
                    <a href={href} className="text-primary hover:underline text-right" target="_blank" rel="noopener noreferrer">{value}</a>
                  ) : (
                    <span className="text-right">{value}</span>
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