import { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, PlusCircle, Trash2 } from "lucide-react";
import SearchCombobox from "./SearchCombobox";

const EMPTY_ROW = { name: "", detail: "" };
const EMPTY_PARTNER = {
  company: "",
  website: "",
  country: "",
  email: "",
  category: "",
  share: 10,
  agreementRef: "",
  extras: {},
};

/**
 * Internal entry point for a newly signed travel or corporate partner, mirroring
 * the retail onboarding form: the partner company, its commercial terms from the
 * Order Form, and the units underneath it. Everything is saved inactive.
 */
export default function NewPartnerTypeForm({ config, onCreated }) {
  const [partner, setPartner] = useState(EMPTY_PARTNER);
  const [rows, setRows] = useState([{ ...EMPTY_ROW }]);
  const [saving, setSaving] = useState(false);

  const filledRows = rows.filter((r) => r.name.trim());
  const categoryOptions = config.categories.map((c) => ({ key: c, label: c }));

  const setRow = (index, patch) =>
    setRows((prev) => prev.map((r, i) => (i === index ? { ...r, ...patch } : r)));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!partner.company.trim()) {
      toast.error("Company name is required");
      return;
    }
    if (filledRows.length === 0) {
      toast.error(`Add at least one ${config.unitLabel.toLowerCase()}`);
      return;
    }

    setSaving(true);
    try {
      await base44.entities.ParticipatingPartner.bulkCreate(
        filledRows.map((r) => ({
          partner_type: config.value,
          company_name: partner.company.trim(),
          unit_name: r.name.trim(),
          unit_detail: r.detail.trim(),
          website: partner.website.trim(),
          country: partner.country.trim(),
          contact_email: partner.email.trim(),
          category: partner.category.trim(),
          revenue_share_pct: Number(partner.share) || 0,
          agreement_ref: partner.agreementRef.trim(),
          activated: false,
        }))
      );

      toast.success(
        `${filledRows.length} ${config.unitLabel.toLowerCase()}${filledRows.length !== 1 ? "s" : ""} saved — activate them to go live`
      );
      setPartner(EMPTY_PARTNER);
      setRows([{ ...EMPTY_ROW }]);
      onCreated();
    } catch (err) {
      toast.error(err.message || "Could not save the partner");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-5 space-y-6">
      <div>
        <h2 className="font-heading font-bold">{config.addTitle}</h2>
        <p className="text-sm text-muted-foreground">{config.addBlurb}</p>
      </div>

      <div className="space-y-3">
        <p className="text-sm font-semibold">1. Partner</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <Label className="text-xs">{config.companyLabel}</Label>
            <Input
              value={partner.company}
              onChange={(e) => setPartner({ ...partner, company: e.target.value })}
              placeholder={config.companyPlaceholder}
              className="mt-1"
            />
          </div>
          <div>
            <Label className="text-xs">Contact email</Label>
            <Input
              type="email"
              value={partner.email}
              onChange={(e) => setPartner({ ...partner, email: e.target.value })}
              placeholder="partners@company.com"
              className="mt-1"
            />
          </div>
          <div>
            <Label className="text-xs">Website</Label>
            <Input
              value={partner.website}
              onChange={(e) => setPartner({ ...partner, website: e.target.value })}
              placeholder="www.company.com"
              className="mt-1"
            />
          </div>
          <div>
            <Label className="text-xs">Country</Label>
            <Input
              value={partner.country}
              onChange={(e) => setPartner({ ...partner, country: e.target.value })}
              placeholder="Netherlands"
              className="mt-1"
            />
          </div>
          <div>
            <Label className="text-xs">{config.categoryLabel}</Label>
            <SearchCombobox
              value={partner.category}
              onChange={(v) => setPartner({ ...partner, category: v })}
              options={categoryOptions}
              placeholder="Start typing…"
              emptyText="No match — keep typing to use it anyway"
              className="mt-1"
            />
          </div>
          <div>
            <Label className="text-xs">Platform fee / revenue share (%)</Label>
            <Input
              type="number"
              min="0"
              max="100"
              step="0.5"
              value={partner.share}
              onChange={(e) => setPartner({ ...partner, share: e.target.value })}
              className="mt-1"
            />
          </div>
          <div className="sm:col-span-2">
            <Label className="text-xs">Order Form / agreement reference</Label>
            <Input
              value={partner.agreementRef}
              onChange={(e) => setPartner({ ...partner, agreementRef: e.target.value })}
              placeholder="e.g. OF-2026-014"
              className="mt-1"
            />
          </div>
        </div>
      </div>

      <div className="space-y-3 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold">2. {config.unitLabel}s</p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-7 text-xs gap-1"
            onClick={() => setRows((prev) => [...prev, { ...EMPTY_ROW }])}
          >
            <PlusCircle className="w-3.5 h-3.5" /> Add another
          </Button>
        </div>

        {rows.map((row, index) => (
          <div key={index} className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto] gap-3 items-end">
            <div>
              <Label className="text-xs">{config.unitLabel}</Label>
              <Input
                value={row.name}
                onChange={(e) => setRow(index, { name: e.target.value })}
                placeholder={config.unitPlaceholder}
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-xs">{config.detailLabel}</Label>
              <Input
                value={row.detail}
                onChange={(e) => setRow(index, { detail: e.target.value })}
                placeholder={config.detailPlaceholder}
                className="mt-1"
              />
            </div>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="h-9 w-9"
              disabled={rows.length === 1}
              onClick={() => setRows((prev) => prev.filter((_, i) => i !== index))}
            >
              <Trash2 className="w-4 h-4 text-destructive" />
            </Button>
          </div>
        ))}
      </div>

      <Button type="submit" disabled={saving} className="gap-2">
        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <PlusCircle className="w-4 h-4" />}
        {saving ? "Saving…" : "Save partner"}
      </Button>
    </form>
  );
}