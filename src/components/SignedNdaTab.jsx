import { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { Download, FileText, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { downloadMutualNdaPdf } from "@/utils/exportMutualNdaPdf";

const fmtDate = (value) => {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
};

export default function SignedNdaTab() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloadingId, setDownloadingId] = useState(null);

  useEffect(() => {
    base44.entities.MutualNda.list("-created_date", 200)
      .then(setRecords)
      .finally(() => setLoading(false));
  }, []);

  const handleDownload = async (record) => {
    setDownloadingId(record.id);
    try {
      await downloadMutualNdaPdf({
        party: record,
        counterpartySignature: record.signature_file_uri,
        dutyboostSignature: record.dutyboost_signature_file_uri,
        language: record.language,
      });
    } finally {
      setDownloadingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold tracking-tight flex items-center gap-2">
          <FileText className="w-6 h-6 text-primary" /> Signed NDAs
        </h1>
        <p className="text-muted-foreground mt-1">
          Every Mutual Non-Disclosure Agreement submitted, with its executed copy available to download again.
        </p>
      </div>

      {records.length === 0 ? (
        <div className="bg-card rounded-xl border border-border p-10 text-center text-muted-foreground">
          <FileText className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p className="text-sm">No signed NDAs have been submitted yet.</p>
        </div>
      ) : (
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/40">
                <tr>
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Company</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Representative</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Email</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Effective Date</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Signed</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Status</th>
                  <th className="text-right py-3 px-4 text-xs font-medium text-muted-foreground">Copy</th>
                </tr>
              </thead>
              <tbody>
                {records.map((r) => (
                  <tr key={r.id} className="border-t border-border hover:bg-muted/20">
                    <td className="py-3 px-4 font-medium">{r.party_company_name || "—"}</td>
                    <td className="py-3 px-4">
                      {r.party_representative_name || "—"}
                      {r.party_representative_title && (
                        <span className="block text-xs text-muted-foreground">{r.party_representative_title}</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{r.party_email || "—"}</td>
                    <td className="py-3 px-4 text-muted-foreground">{fmtDate(r.effective_date)}</td>
                    <td className="py-3 px-4 text-muted-foreground">{fmtDate(r.signed_date)}</td>
                    <td className="py-3 px-4">
                      <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary capitalize">
                        {r.status || "pending"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2"
                        disabled={downloadingId === r.id}
                        onClick={() => handleDownload(r)}
                      >
                        {downloadingId === r.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Download className="w-4 h-4" />
                        )}
                        PDF
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}