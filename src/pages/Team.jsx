import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import DutyBoostLogo from "@/components/DutyBoostLogo";
import PageFooter from "@/components/PageFooter";
import LinkedInIcon from "@/components/LinkedInIcon";
import { TEAM_MEMBERS, TEAM_INTRO } from "@/data/teamMembers";

export default function Team() {
  return (
    <div className="min-h-screen bg-background font-body">
      <nav className="sticky top-0 z-50 backdrop-blur border-b border-border bg-background/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          <span className="sm:hidden"><DutyBoostLogo height={36} /></span>
          <span className="hidden sm:inline-flex"><DutyBoostLogo height={55} /></span>
          <Link
            to="/"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Home
          </Link>
        </div>
      </nav>

      <section className="relative overflow-hidden pt-10 pb-6 px-4 sm:px-6">
        <div className="absolute top-0 right-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-3xl mx-auto text-center space-y-3">
          <span className="text-primary text-xs sm:text-sm font-semibold uppercase tracking-widest">Our Team</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold tracking-tight leading-tight">
            The People Behind DutyBoost
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{TEAM_INTRO}</p>
        </div>
      </section>

      <section className="pb-14 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {TEAM_MEMBERS.map((m) => (
            <article
              key={m.name}
              className="bg-card border border-border rounded-2xl p-6 flex flex-col shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-4 border-primary/10 shrink-0">
                  <img src={m.photo} alt={m.name} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="min-w-0">
                  <h2 className="font-heading font-bold text-lg leading-tight">{m.name}</h2>
                  <p className="text-primary text-sm font-medium mt-0.5 leading-snug">{m.role}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 mt-4">
                {m.focus.map((f) => (
                  <span
                    key={f}
                    className="text-[11px] uppercase tracking-wide bg-primary/10 text-primary rounded-full px-2.5 py-1"
                  >
                    {f}
                  </span>
                ))}
              </div>

              <div className="mt-4 space-y-3 flex-1">
                {m.bio.map((para, i) => (
                  <p key={i} className="text-sm text-muted-foreground leading-relaxed">{para}</p>
                ))}
              </div>

              <a
                href={m.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center justify-center gap-2 border border-border rounded-xl px-4 py-2.5 text-sm font-medium hover:border-primary hover:text-primary transition-colors"
              >
                <LinkedInIcon className="w-4 h-4" />
                View LinkedIn profile
              </a>
            </article>
          ))}
        </div>
      </section>

      <PageFooter />
    </div>
  );
}