import { Fragment, useState } from "react";
import { ChevronDown, ChevronRight, MapPin } from "lucide-react";

export default function AirportDirectoryTable({ rows, storesByCode }) {
  const [expanded, setExpanded] = useState(null);

  if (rows.length === 0) {
    return (
      <p className="px-4 py-8 text-sm text-muted-foreground text-center">
        No airports match the current filters.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-muted/50 text-muted-foreground">
          <tr>
            <th className="text-left font-medium px-4 py-3">Airport</th>
            <th className="text-left font-medium px-4 py-3">City</th>
            <th className="text-left font-medium px-4 py-3">Country</th>
            <th className="text-left font-medium px-4 py-3">Region</th>
            <th className="text-left font-medium px-4 py-3">Stores</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((a) => {
            const open = expanded === a.code;
            const stores = storesByCode[a.code] || [];
            return (
              <Fragment key={a.code}>
                <tr
                  onClick={() => setExpanded(open ? null : a.code)}
                  className="border-t border-border hover:bg-muted/30 cursor-pointer"
                >
                  <td className="px-4 py-3 font-medium text-foreground">
                    <span className="inline-flex items-center gap-2">
                      {open
                        ? <ChevronDown className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                        : <ChevronRight className="w-3.5 h-3.5 text-muted-foreground shrink-0" />}
                      {a.code} — {a.name}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{a.city}</td>
                  <td className="px-4 py-3 text-muted-foreground">{a.country}</td>
                  <td className="px-4 py-3 text-muted-foreground">{a.region}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {a.storeCount}
                    </span>
                  </td>
                </tr>
                {open && (
                  <tr className="border-t border-border bg-muted/20">
                    <td colSpan={5} className="px-4 py-3">
                      {stores.length === 0 ? (
                        <p className="text-xs text-muted-foreground">
                          No stores mapped at this airport yet.
                        </p>
                      ) : (
                        <ul className="space-y-1.5">
                          {stores.map((s) => (
                            <li
                              key={s.id}
                              className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground"
                            >
                              <span className="font-medium text-foreground">{s.store_name}</span>
                              {s.category && (
                                <span className="px-2 py-0.5 rounded-full bg-muted">{s.category}</span>
                              )}
                              {s.departure_hall && <span>{s.departure_hall}</span>}
                            </li>
                          ))}
                        </ul>
                      )}
                    </td>
                  </tr>
                )}
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}