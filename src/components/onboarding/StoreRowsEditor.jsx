import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import { STORE_CATEGORIES } from "@/data/storeCategories";

export const EMPTY_STORE_ROW = { name: "", category: "Duty Free", departure_hall: "" };

/** Repeatable rows for the stores a retailer wants to add at one airport. */
export default function StoreRowsEditor({ rows, onChange }) {
  const update = (index, field, val) =>
    onChange(rows.map((r, i) => (i === index ? { ...r, [field]: val } : r)));

  return (
    <div className="space-y-2">
      {rows.map((row, i) => (
        <div key={i} className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-end">
          <div className="sm:col-span-5">
            <Label className="text-xs">Store name</Label>
            <Input
              value={row.name}
              onChange={(e) => update(i, "name", e.target.value)}
              placeholder="e.g. Penha Duty Free"
              className="mt-1"
            />
          </div>
          <div className="sm:col-span-3">
            <Label className="text-xs">Category</Label>
            <Select value={row.category} onValueChange={(v) => update(i, "category", v)}>
              <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
              <SelectContent>
                {STORE_CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="sm:col-span-3">
            <Label className="text-xs">Departure hall / zone</Label>
            <Input
              value={row.departure_hall}
              onChange={(e) => update(i, "departure_hall", e.target.value)}
              placeholder="Departure Hall 2"
              className="mt-1"
            />
          </div>
          <div className="sm:col-span-1 flex sm:justify-end">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-9 w-9"
              disabled={rows.length === 1}
              onClick={() => onChange(rows.filter((_, idx) => idx !== i))}
            >
              <Trash2 className="w-4 h-4 text-destructive" />
            </Button>
          </div>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        size="sm"
        className="gap-2"
        onClick={() => onChange([...rows, { ...EMPTY_STORE_ROW }])}
      >
        <Plus className="w-4 h-4" /> Add store
      </Button>
    </div>
  );
}