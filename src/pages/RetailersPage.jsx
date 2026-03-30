import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Store, MapPin, ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const categoryIcons = {
  "Duty-free": ShoppingBag,
  Food: Store,
  Retail: Store,
};

export default function RetailersPage() {
  const [retailers, setRetailers] = useState([]);

  useEffect(() => {
    base44.entities.Retailer.list('-created_date', 100).then(setRetailers);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold tracking-tight">Airport Retailers</h1>
        <p className="text-muted-foreground mt-1">All participating airport retailers.</p>
      </div>

      {retailers.length === 0 ? (
        <div className="bg-card rounded-xl border border-border p-12 text-center text-muted-foreground">
          <Store className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p>No airport retailers registered yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {retailers.map((r) => {
            const Icon = categoryIcons[r.category] || Store;
            return (
              <div
                key={r.id}
                className="bg-card rounded-xl border border-border p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold truncate">{r.store_name}</h3>
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span className="truncate">{r.airport}</span>
                    </div>
                    {r.description && (
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{r.description}</p>
                    )}
                    <div className="mt-3 flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">{r.category}</Badge>
                      {r.accepts_vouchers && (
                        <Badge className="text-xs bg-green-100 text-green-700 border-green-200">Accepts Vouchers</Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}