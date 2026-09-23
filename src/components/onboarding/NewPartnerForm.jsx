import { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, PlusCircle } from "lucide-react";
import AirportPicker from "./AirportPicker";
import StoreRowsEditor, { EMPTY_STORE_ROW } from "./StoreRowsEditor";

const EMPTY_AIRPORT = { code: "", name: "", city: "", country: "" };
const EMPTY_RETAILER = { name: "", email: "", posPartner: "", commissionRate: 10, agreementRef: "" };

/**
 * Internal entry point for a newly signed partner: the airport, the retailer
 * and the stores from the signed Order Form. Everything is saved inactive, so
 * nothing reaches travellers until the team activates it.
 */
export default function NewPartnerForm({ airports, onCreated }) {
  const [airport, setAirport] = useState(EMPTY_AIRPORT);
  const [retailer, setRetailer] = useState(EMPTY_RETAILER);
  const [rows, setRows] = useState([{ ...EMPTY_STORE_ROW }]);
  const [saving, setSaving] = useState(false);

  const code = airport.code.trim().toUpperCase();
  const filledRows = rows.filter((r) => r.name.trim());

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!code || !airport.name.trim() || !retailer.name.trim()) {
      toast.error("Airport code, airport name and retailer name are required");
      return;
    }
    if (filledRows.length === 0) {
      toast.error("Add at least one store");
      return;
    }

    setSaving(true);
    try {
      const city = airport.city.trim();
      const airportLabel = `${code} — ${city || airport.name.trim()}`;
      const email = retailer.email.trim();
      const posPartner = retailer.posPartner.trim();

      if (!airports.some((a) => (a.code || "").toUpperCase() === code)) {
        await base44.entities.Airport.create({
          code,
          name: airport.name.trim(),
          city,
          country: airport.country.trim(),
        });
      }

      if (email) {
        const existing = await base44.entities.Retailer.filter({ owner_email: email }).catch(() => []);
        const alreadyThere = existing.some((r) => (r.airport || "").toUpperCase().includes(code));
        if (!alreadyThere) {
          await base44.entities.Retailer.create({
            store_name: retailer.name.trim(),
            airport: airportLabel,
            category: "Retail",
            description: `${retailer.name.trim()} at ${airportLabel}`,
            owner_email: email,
            accepts_vouchers: true,
            pos_channel_partner: posPartner,
            pos_channel_commission_rate: Number(retailer.commissionRate) || 10,
          });
        }
      }

      await base44.entities.ParticipatingStore.bulkCreate(filledRows.map((r) => ({
        airport_code: code,
        airport_name: airport.name.trim(),
        airport_city: city,
        airport_country: airport.country.trim(),
        retailer_name: retailer.name.trim(),
        store_name: r.name.trim(),
        category: r.category,
        departure_hall: r.departure_hall.trim(),
        activated: false,
        agreement_ref: retailer.agreementRef.trim(),
        contact_email: email,
        pos_channel_partner: posPartner,
      })));

      toast.success(`${filledRows.length} store${filledRows.length !== 1 ? "s" : ""} saved — activate them to go live`);
      setAirport(EMPTY_AIRPORT);
      setRetailer(EMPTY_RETAILER);
      setRows([{ ...EMPTY_STORE_ROW }]);
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
        <h2 className="font-heading font-bold">Add a new partner</h2>
        <p className="text-sm text-muted-foreground">
          Take the details from the signed Order Form. Stores are saved as not live and only become visible to
          travellers once you activate them below.
        </p>
      </div>

      <div className="space-y-3">
        <p className="text-sm font-semibold">1. Airport</p>
        <AirportPicker airports={airports} value={airport} onChange={setAirport} />
      </div>

      <div className="space-y-3 pt-4 border-t border-border">
        <p className="text-sm font-semibold">2. Retailer</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <Label className="text-xs">Retailer / company name</Label>
            <Input
              value={retailer.name}
              onChange={(e) => setRetailer({ ...retailer, name: e.target.value })}
              placeholder="e.g. Caribbean Duty Free NV"
              className="mt-1"
            />
          </div>
          <div>
            <Label className="text-xs">Contact email</Label>
            <Input
              type="email"
              value={retailer.email}
              onChange={(e) => setRetailer({ ...retailer, email: e.target.value })}
              placeholder="orders@retailer.com"
              className="mt-1"
            />
          </div>
          <div>
            <Label className="text-xs">POS channel partner</Label>
            <Input
              value={retailer.posPartner}
              onChange={(e) => setRetailer({ ...retailer, posPartner: e.target.value })}
              className="mt-1"
            />
          </div>
          <div>
            <Label className="text-xs">POS commission rate (%)</Label>
            <Input
              type="number"
              min="0"
              step="0.1"
              value={retailer.commissionRate}
              onChange={(e) => setRetailer({ ...retailer, commissionRate: e.target.value })}
              className="mt-1"
            />
          </div>
          <div className="sm:col-span-2">
            <Label className="text-xs">Order Form / agreement reference</Label>
            <Input
              value={retailer.agreementRef}
              onChange={(e) => setRetailer({ ...retailer, agreementRef: e.target.value })}
              placeholder="e.g. OF-2026-014"
              className="mt-1"
            />
          </div>
        </div>
      </div>

      <div className="space-y-3 pt-4 border-t border-border">
        <p className="text-sm font-semibold">3. Stores to add at this airport</p>
        <StoreRowsEditor rows={rows} onChange={setRows} />
      </div>

      <Button type="submit" disabled={saving} className="gap-2">
        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <PlusCircle className="w-4 h-4" />}
        {saving ? "Saving…" : "Save partner"}
      </Button>
    </form>
  );
}