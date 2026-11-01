import { useEffect, useMemo, useState } from "react";
import { base44 } from "@/api/base44Client";
import {
  Loader2, ChevronRight, QrCode, CheckCircle2, Clock, Building2, Search, FileDown, Euro, Handshake,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { VERTICALS, VERTICAL_LABELS, carrierName, formatDate } from "@/components/admin/dutyCreditFields";
import CompanyDutyCreditDetail from "@/components/admin/CompanyDutyCreditDetail";
import { downloadCompanyDutyCreditReport } from "@/utils/exportDutyCreditReportPdf";
import { fmtEur } from "@/utils/formatNumber";
import { PLATFORM_FEE_PCT, PARTNER_SHARE_PCT, feeOf, shareOf } from "@/data/dutyCreditFees";

const euro = (value) => fmtEur(value, Number.isInteger(value) ? 0 : 2);

// Redeemed DutyCredits are the only ones with a basket value on record.
const revenueOf = (tokens) =>
  tokens.reduce((sum, t) => sum + (t.status === "redeemed" ? Number(t.basket_value || 0) : 0), 0);

export default function DutyCreditInsights() {
  const [tokens, setTokens] = useState(null);
  const [vertical, setVertical] = useState("all");
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [query, setQuery] = useState("");
  const [minCredits, setMinCredits] = useState("");
  const [exporting, setExporting] = useState(null);

  useEffect(() => {
    base44.entities.DutyCreditToken
      .list("-created_date", 500)
      .then((list) => setTokens(list || []))
      .catch(() => setTokens([]));
  }, []);

  const scoped = useMemo(
    () => (tokens || []).filter((token) => vertical === "all" || token.travel_type === vertical),
    [tokens, vertical]
  );

  // One row per company: how many DutyCredits their customers generated where.
  const companies = useMemo(() => {
    const map = new Map();
    scoped.forEach((token) => {
      const name = carrierName(token);
      const entry = map.get(name) || {
        name, total: 0, active: 0, redeemed: 0, revenue: 0, locations: new Set(), last: null,
      };
      entry.total += 1;
      if (token.status === "active") entry.active += 1;
      if (token.status === "redeemed") {
        entry.redeemed += 1;
        entry.revenue += Number(token.basket_value || 0);
      }
      if (token.airport) entry.locations.add(token.airport);
      if (!entry.last || new Date(token.created_date) > new Date(entry.last)) entry.last = token.created_date;
      map.set(name, entry);
    });
    return [...map.values()].sort((a, b) => b.total - a.total);
  }, [scoped]);

  // Company name and how many DutyCredits they generated.
  const visibleCompanies = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const minimum = parseInt(minCredits, 10) || 0;
    return companies.filter(
      (company) => (!needle || company.name.toLowerCase().includes(needle)) && company.total >= minimum
    );
  }, [companies, query, minCredits]);

  const detailTokens = useMemo(
    () => (selectedCompany ? scoped.filter((token) => carrierName(token) === selectedCompany) : []),
    [scoped, selectedCompany]
  );

  const handleVerticalChange = (id) => {
    setVertical(id);
    setSelectedCompany(null);
  };

  const handleExport = async (company) => {
    setExporting(company);
    try {
      await downloadCompanyDutyCreditReport({
        company,
        tokens: scoped.filter((token) => carrierName(token) === company),
        verticalLabel: vertical === "all" ? "All travel types" : VERTICAL_LABELS[vertical],
      });
    } finally {
      setExporting(null);
    }
  };

  if (!tokens) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const stats = [
    { label: "DutyCredits generated", value: scoped.length, icon: QrCode },
    { label: "Active", value: scoped.filter((t) => t.status === "active").length, icon: Clock },
    { label: "Redeemed", value: scoped.filter((t) => t.status === "redeemed").length, icon: CheckCircle2 },
    { label: `DutyBoost platform fee (${PLATFORM_FEE_PCT}%)`, value: euro(feeOf(revenueOf(scoped))), icon: Euro },
    { label: `Partner commission share (${PARTNER_SHARE_PCT}%)`, value: euro(shareOf(revenueOf(scoped))), icon: Handshake },
    { label: "Companies", value: companies.length, icon: Building2 },
  ];

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-heading font-bold">DutyCredit data by travel company</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Every DutyCredit a traveller generated, grouped by the company they travelled with. Use it to show a partner the demand their own customers already create.
        </p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {VERTICALS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => handleVerticalChange(id)}
            className={`flex items-center gap-1.5 whitespace-nowrap text-xs px-3 py-2 rounded-full border transition-all ${
              vertical === id ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:border-primary/50"
            }`}
          >
            <Icon className="w-3.5 h-3.5" /> {label}
          </button>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter by company…"
            className="pl-9"
          />
        </div>
        <Input
          type="number"
          min="1"
          value={minCredits}
          onChange={(e) => setMinCredits(e.target.value)}
          placeholder="Min. DutyCredits"
          className="sm:w-44"
        />
        {(query || minCredits) && (
          <Button variant="ghost" onClick={() => { setQuery(""); setMinCredits(""); }}>
            Clear
          </Button>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="bg-card rounded-xl border border-border p-3">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Icon className="w-3.5 h-3.5" /> {label}
            </div>
            <p className="text-xl font-bold mt-1">{value}</p>
          </div>
        ))}
      </div>

      {selectedCompany ? (
        <CompanyDutyCreditDetail
          company={selectedCompany}
          tokens={detailTokens}
          onBack={() => setSelectedCompany(null)}
          onExport={() => handleExport(selectedCompany)}
          exporting={exporting === selectedCompany}
        />
      ) : companies.length === 0 ? (
        <div className="bg-card rounded-xl border border-border px-4 py-10 text-center text-sm text-muted-foreground">
          No DutyCredits generated for this travel type yet.
        </div>
      ) : visibleCompanies.length === 0 ? (
        <div className="bg-card rounded-xl border border-border px-4 py-10 text-center text-sm text-muted-foreground">
          No companies match these filters.
        </div>
      ) : (
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="hidden sm:flex px-4 py-2.5 bg-muted/50 text-xs font-medium text-muted-foreground">
            <span className="flex-1">Company</span>
            <span className="w-20 text-right">Locations</span>
            <span className="w-16 text-right">Active</span>
            <span className="w-20 text-right">Redeemed</span>
            <span className="w-24 text-right">Platform fee</span>
            <span className="w-20 text-right">Generated</span>
            <span className="w-8" />
          </div>
          {visibleCompanies.map((company) => (
            <div
              key={company.name}
              className="flex items-center gap-2 px-4 py-3 border-t border-border hover:bg-muted/40 transition-colors"
            >
              <button
                onClick={() => setSelectedCompany(company.name)}
                className="flex items-center gap-3 flex-1 min-w-0 text-left"
              >
                <span className="flex-1 min-w-0">
                  <span className="block text-sm font-medium truncate">{company.name}</span>
                  <span className="block text-xs text-muted-foreground sm:hidden">
                    {company.locations.size} locations · {company.active} active · {company.redeemed} redeemed · {euro(feeOf(company.revenue))} platform fee · last {formatDate(company.last)}
                  </span>
                  <span className="hidden sm:block text-xs text-muted-foreground">Last {formatDate(company.last)}</span>
                </span>
                <span className="hidden sm:block w-20 text-right text-sm">{company.locations.size}</span>
                <span className="hidden sm:block w-16 text-right text-sm">{company.active}</span>
                <span className="hidden sm:block w-20 text-right text-sm">{company.redeemed}</span>
                <span className="hidden sm:block w-24 text-right text-sm">{euro(feeOf(company.revenue))}</span>
                <span className="w-16 sm:w-20 text-right text-sm font-bold text-primary">{company.total}</span>
                <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
              </button>
              <button
                onClick={() => handleExport(company.name)}
                disabled={exporting === company.name}
                title="Download PDF report"
                className="shrink-0 w-8 h-8 flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors disabled:opacity-50"
              >
                {exporting === company.name ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <FileDown className="w-4 h-4" />
                )}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}