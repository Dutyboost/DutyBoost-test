import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import DutyBoostLogo from "./DutyBoostLogo";
import LanguageSwitcher from "./LanguageSwitcher";
import PageBackdrop from "./PageBackdrop";

/**
 * Locked frame for every traveller-facing screen.
 * Logo and language switching only — no navigation into the commercial site.
 */
export default function TravellerShell({ children }) {
  const { t } = useTranslation();
  const tr = (key, opts) => t(`traveller.${key}`, opts);

  return (
    <div className="min-h-screen font-body flex flex-col relative">
      <PageBackdrop />
      <nav className="sticky top-0 z-50 backdrop-blur border-b border-border bg-background/80">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <DutyBoostLogo height={45} linkTo={null} />
          <LanguageSwitcher />
        </div>
      </nav>

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-14">
        {children}
      </main>

      <footer className="border-t border-border py-6 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>{tr('footer', { year: new Date().getFullYear() })}</p>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="hover:text-foreground transition-colors">{tr('legal_privacy')}</Link>
            <Link to="/terms" className="hover:text-foreground transition-colors">{tr('legal_terms')}</Link>
            <Link to="/cookies" className="hover:text-foreground transition-colors">{tr('legal_cookies')}</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}