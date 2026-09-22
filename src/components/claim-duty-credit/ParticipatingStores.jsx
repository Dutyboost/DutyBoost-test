import { useTranslation } from "react-i18next";
import { Loader2, MapPin, Navigation, ShoppingBag, Store } from "lucide-react";
import { buildDirectionsUrl } from "@/utils/mapLinks";

/**
 * Participating stores for the traveller's airport. Each store is a link that
 * opens walking directions in the traveller's maps app, routed to the departure
 * hall the store sits in so they can judge the walk from their gate.
 */
export default function ParticipatingStores({ stores, loading, airportName, airportCity }) {
  const { t } = useTranslation();
  const tr = (key, opts) => t(`claimDutyCredit.${key}`, opts);

  if (!loading && stores.length === 0) return null;

  return (
    <div className="bg-card rounded-2xl border border-border p-6 space-y-3 print:p-3 print:space-y-1">
      <p className="text-sm font-semibold flex items-center gap-2">
        <ShoppingBag className="w-4 h-4 text-primary" />
        {tr('stores_title')}
      </p>

      {loading ? (
        <div className="flex items-center gap-2 text-sm text-muted-foreground py-2">
          <Loader2 className="w-4 h-4 animate-spin" /> {tr('generating')}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {stores.map((store, i) => {
            const place = store.departure_hall || airportName;
            const destination = [airportName, store.departure_hall, airportCity]
              .filter(Boolean)
              .join(', ');

            return (
              <a
                key={i}
                href={buildDirectionsUrl(destination)}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-2.5 p-3 rounded-lg bg-muted/40 border border-transparent hover:bg-primary/10 hover:border-primary/30 transition-colors"
              >
                <Store className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium truncate">{store.name}</span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground truncate">
                    {store.departure_hall ? (
                      <>
                        <MapPin className="w-3 h-3 shrink-0" />
                        {store.departure_hall}
                      </>
                    ) : (
                      tr('stores_hall_unknown')
                    )}
                  </span>
                  <span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                    <Navigation className="w-3 h-3" />
                    {tr('stores_nav_btn', { place })}
                  </span>
                </span>
              </a>
            );
          })}
        </div>
      )}

      <p className="text-xs text-muted-foreground">{tr('stores_nav_hint')}</p>
    </div>
  );
}