import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight, Building2 } from "lucide-react";
import DutyBoostLogo from "@/components/DutyBoostLogo";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import TravelerIcon from "@/components/TravelerIcon";
import { getEntryStrings } from "@/lib/i18nEntry";

// Front page: the one decision a visitor makes before anything else —
// traveller (B2C) or company (B2B).
export default function EntryPage() {
  const { i18n } = useTranslation();
  const s = getEntryStrings(i18n.language);

  const options = [
    {
      key: "traveller",
      to: "/claim-duty-credit",
      icon: TravelerIcon,
      tone: "bg-blue-50 text-blue-600",
      title: s.traveller_title,
      description: s.traveller_desc,
      cta: s.traveller_cta,
    },
    {
      key: "company",
      to: "/partners",
      icon: Building2,
      tone: "bg-emerald-50 text-emerald-600",
      title: s.company_title,
      description: s.company_desc,
      cta: s.company_cta,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col font-body">
      <header className="px-4 sm:px-6">
        <div className="max-w-6xl mx-auto h-16 sm:h-20 flex items-center justify-between gap-3">
          <span className="sm:hidden"><DutyBoostLogo height={36} /></span>
          <span className="hidden sm:inline-flex"><DutyBoostLogo height={52} /></span>
          <LanguageSwitcher />
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
        <div className="w-full max-w-3xl mx-auto text-center space-y-6 sm:space-y-8">
          <h1 className="text-2xl sm:text-4xl font-heading font-bold tracking-tight leading-tight">
            {s.title}
          </h1>

          <div className="grid sm:grid-cols-2 gap-3 sm:gap-5">
            {options.map((option) => {
              const Icon = option.icon;
              return (
                <Link
                  key={option.key}
                  to={option.to}
                  className="group flex flex-col text-left bg-card rounded-2xl border border-border p-5 sm:p-7 transition-all hover:shadow-lg hover:border-primary/40"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${option.tone}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h2 className="font-heading font-bold text-lg sm:text-xl mb-1.5">{option.title}</h2>
                  <p className="text-muted-foreground text-sm leading-snug mb-5">{option.description}</p>
                  <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    {option.cta}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}