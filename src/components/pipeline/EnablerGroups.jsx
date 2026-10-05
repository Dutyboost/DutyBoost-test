import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function EnablerGroups({ groups }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {groups.map((group) => (
        <div key={group.title} className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-heading font-bold text-foreground">{group.title}</h3>
          <p className="text-xs text-muted-foreground mt-1">{group.note}</p>
          <div className="mt-3 divide-y divide-border">
            {group.items.map((item) => (
              <Link
                key={item.route}
                to={item.route}
                className="flex items-center justify-between gap-3 py-2 group"
              >
                <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                  {item.name}
                </span>
                <span className="flex items-center gap-2 text-xs text-muted-foreground whitespace-nowrap">
                  {item.role}
                  <ArrowRight className="w-3.5 h-3.5 opacity-40" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}