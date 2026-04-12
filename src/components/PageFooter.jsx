import { useTranslation } from "react-i18next";
import DutyBoostLogo from "./DutyBoostLogo";
import FooterLinks from "./FooterLinks";
import { Linkedin } from "lucide-react";

export default function PageFooter() {
  const { t } = useTranslation();
  return (
    <footer className="border-t border-border py-8 sm:py-10 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <DutyBoostLogo height={150} />
            <span>{t('footer.tagline')}</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/company/dutyboost"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
            <p>{t('footer.rights')}</p>
          </div>
        </div>
        <FooterLinks />
      </div>
    </footer>
  );
}