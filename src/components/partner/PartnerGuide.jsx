import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

/** Implementation / onboarding guidance for a partner type. */
export default function PartnerGuide({ guide }) {
  if (!guide) return null;

  return (
    <div className="max-w-3xl space-y-6">
      <div className="space-y-1">
        <h1 className="text-xl font-heading font-bold">{guide.title}</h1>
        <p className="text-muted-foreground text-sm">{guide.blurb}</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        {guide.steps.map((s, i) => (
          <div key={s.title} className="bg-card border border-border rounded-xl p-4 space-y-2">
            <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">
              {i + 1}
            </div>
            <p className="font-semibold text-sm">{s.title}</p>
            <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>

      {guide.link ? (
        <Link
          to={guide.link.to}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors"
        >
          {guide.link.label} <ArrowRight className="w-4 h-4" />
        </Link>
      ) : null}

      <div className="bg-card border border-border rounded-xl p-4 text-sm">
        <p className="font-semibold mb-1">Need help?</p>
        <p className="text-muted-foreground">
          Contact your DutyBoost partner manager at{" "}
          <a href="mailto:partners@dutyboost.com" className="text-primary underline">
            partners@dutyboost.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}